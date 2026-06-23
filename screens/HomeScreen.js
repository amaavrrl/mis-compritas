import React, { useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import ProductItem from '../components/ProductItem';

import { useProductStore } from '../store/productStore';

import { seleccionarTelefonoContacto } from '../services/contactService';

import { crearEventoCompraSemanal } from '../services/calendarService';

import {
  View,
  Text,
  Linking,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';

export default function HomeScreen({ navigation }) {

  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [diaCalendario, setDiaCalendario] = useState(6);
  const [horarioCalendario, setHorarioCalendario] = useState('10:00');
  const [mostrarDiasCalendario, setMostrarDiasCalendario] = useState(false);

  const [mensajeModal, setMensajeModal] = useState(null);

  const productos =
    useProductStore((state) => state.productos);

  const cargarProductos =
    useProductStore((state) => state.cargarProductos);

  const eliminarProducto =
    useProductStore((state) => state.eliminarProducto);

  const toggleComprado =
    useProductStore((state) => state.toggleComprado);

  useFocusEffect(

    React.useCallback(() => {

      cargarProductos();

    }, [cargarProductos])

  );

  const productosComprados = productos.filter(
    producto => producto.comprado
  ).length;

  const mostrarMensaje = (titulo, mensaje) => {

    setMensajeModal({
      titulo,
      mensaje,
    });
  };

  const compartirLista = async () => {

    const productosPendientes = productos.filter(
      producto => !producto.comprado
    );

    if (productosPendientes.length === 0) {

      mostrarMensaje(
        'Lista vacia',
        'No hay productos pendientes para compartir.'
      );

      return;
    }

    const telefono =
      await seleccionarTelefonoContacto();

    if (!telefono) {
      return;
    }

    const numeroWhatsApp =
      telefono.replace(/\D/g, '');

    const productosTexto =
      productosPendientes
        .map(producto => `* ${producto.nombre}`)
        .join('\n');

    const mensaje =
      `Mi lista de compras:\n\n${productosTexto}`;

    const url =
      `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    Linking.openURL(url);
  };

  const diasCalendario = [
    { label: 'Lunes', value: 1 },
    { label: 'Martes', value: 2 },
    { label: 'Miercoles', value: 3 },
    { label: 'Jueves', value: 4 },
    { label: 'Viernes', value: 5 },
    { label: 'Sabado', value: 6 },
    { label: 'Domingo', value: 0 },
  ];

  const diaSeleccionado = diasCalendario.find(
    dia => dia.value === diaCalendario
  );

  const obtenerProximaFecha = (diaElegido, horarioElegido) => {

    const fecha = new Date();
    const diaActual = fecha.getDay();
    const diferencia =
      diaActual < diaElegido
        ? diaElegido - diaActual
        : 7 - diaActual + diaElegido;

    const partesHorario = horarioElegido.split(':');
    const horas = Number(partesHorario[0]);
    const minutos = Number(partesHorario[1]);

    fecha.setDate(fecha.getDate() + diferencia);
    fecha.setHours(horas, minutos, 0, 0);

    return fecha;
  };

  const horarioValido = (horario) => {

    const partesHorario = horario.split(':');

    if (partesHorario.length !== 2) {
      return false;
    }

    const horas = Number(partesHorario[0]);
    const minutos = Number(partesHorario[1]);

    return (
      Number.isInteger(horas) &&
      Number.isInteger(minutos) &&
      horas >= 0 &&
      horas <= 23 &&
      minutos >= 0 &&
      minutos <= 59
    );
  };

  const abrirOpcionesCalendario = () => {

    setMostrarCalendario(true);
  };

  const crearDiaCompraSemanal = async () => {

    if (!horarioValido(horarioCalendario)) {

      mostrarMensaje(
        'Horario invalido',
        'EscribA el horario con formato HH:MM. Por ejemplo: 10:00 o 18:30.'
      );

      return;
    }

    setMostrarCalendario(false);
    setMostrarDiasCalendario(false);

    const eventoCreado =
      await crearEventoCompraSemanal(
        obtenerProximaFecha(diaCalendario, horarioCalendario)
      );

    if (eventoCreado) {

      mostrarMensaje(
        'Evento creado',
        'Evento creado en calendario'
      );
    }
  };

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.headerSuperior}>

          <Text style={styles.titulo}>
            Mis Compritas
          </Text>

          <View style={styles.accionesHeader}>

            <TouchableOpacity
              style={styles.botonIconoHeader}
              onPress={abrirOpcionesCalendario}
            >

              <Ionicons
                name="calendar-outline"
                size={22}
                color="#F29EB0"
              />

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botonIconoHeader}
              onPress={compartirLista}
            >

              <Ionicons
                name="share-social-outline"
                size={22}
                color="#F29EB0"
              />

            </TouchableOpacity>

          </View>

        </View>

        <Text style={styles.contador}>
          {productosComprados}/{productos.length} comprados
        </Text>

      </View>

      <Modal
        visible={mostrarCalendario}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMostrarCalendario(false)}
      >

        <View style={styles.modalFondo}>

          <View style={styles.modalCard}>

            <Text style={styles.modalTitulo}>
              Dia de compra semanal
            </Text>

            <Text style={styles.modalTexto}>
              Elegi el dia y horario para crear el recordatorio.
            </Text>

            <Text style={styles.labelModal}>
              Dia
            </Text>

            <TouchableOpacity
              style={styles.selector}
              onPress={() =>
                setMostrarDiasCalendario(!mostrarDiasCalendario)
              }
            >

              <Text style={styles.textoSelector}>
                {diaSeleccionado?.label}
              </Text>

              <Ionicons
                name={mostrarDiasCalendario ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#F29EB0"
              />

            </TouchableOpacity>

            {mostrarDiasCalendario && (

              <View style={styles.opcionesSelector}>

              {diasCalendario.map((dia) => (

                <TouchableOpacity
                  key={dia.value}
                  style={[
                    styles.opcionSelector,
                    diaCalendario === dia.value &&
                    styles.opcionSelectorActiva,
                  ]}
                  onPress={() => {
                    setDiaCalendario(dia.value);
                    setMostrarDiasCalendario(false);
                  }}
                >

                  <Text style={styles.textoOpcionSelector}>
                    {dia.label}
                  </Text>

                </TouchableOpacity>

              ))}

              </View>

            )}

            <Text style={styles.labelModal}>
              Horario
            </Text>

            <TextInput
              style={styles.inputHorario}
              value={horarioCalendario}
              onChangeText={setHorarioCalendario}
              placeholder="10:00"
              placeholderTextColor="#999"
              maxLength={5}
            />

            <TouchableOpacity
              style={styles.botonAceptar}
              onPress={crearDiaCompraSemanal}
            >

              <Text style={styles.textoBotonAceptar}>
                Crear evento
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botonCancelar}
              onPress={() => {
                setMostrarCalendario(false);
                setMostrarDiasCalendario(false);
              }}
            >

              <Text style={styles.textoBotonCancelar}>
                Cancelar
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

      <Modal
        visible={Boolean(mensajeModal)}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMensajeModal(null)}
      >

        <View style={styles.modalFondo}>

          <View style={styles.modalCard}>

            <Text style={styles.modalTitulo}>
              {mensajeModal?.titulo}
            </Text>

            <Text style={styles.modalTexto}>
              {mensajeModal?.mensaje}
            </Text>

            <TouchableOpacity
              style={styles.botonAceptar}
              onPress={() => setMensajeModal(null)}
            >

              <Text style={styles.textoBotonAceptar}>
                Aceptar
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() =>
          navigation.navigate('AddProduct')
        }
      >

        <Text style={styles.textoBoton}>
          + Agregar producto
        </Text>

      </TouchableOpacity>

      {productos.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyText}>
            No hay compritas todavia
          </Text>

        </View>

      ) : (

        <FlatList
          data={productos}

          showsVerticalScrollIndicator={false}

          keyExtractor={(item, index) =>
            item.id || index.toString()
          }

          renderItem={({ item, index }) => (

            <ProductItem

              item={item}

              onDelete={() =>
                eliminarProducto(index)
              }

              onToggle={() =>
                toggleComprado(index)
              }

              onEdit={() =>
                navigation.navigate(
                  'EditProduct',
                  { indexProducto: index }
                )
              }
            />

          )}

          contentContainerStyle={styles.listaContenido}
        />

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    marginBottom: 25,
  },

  headerSuperior: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F29EB0',
    textAlign: 'center',
  },

  accionesHeader: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    justifyContent: 'center',
  },

  botonIconoHeader: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F29EB0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7F9',
  },

  contador: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    color: '#777',
  },

  botonAgregar: {
    backgroundColor: '#F29EB0',

    paddingVertical: 15,
    borderRadius: 18,

    alignItems: 'center',

    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyEmoji: {
    fontSize: 70,
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 18,
    color: '#999',
  },

  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    padding: 25,
  },

  modalCard: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 22,
    gap: 12,
  },

  modalTitulo: {
    color: '#F29EB0',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalTexto: {
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
  },

  labelModal: {
    color: '#777',
    fontSize: 13,
    fontWeight: 'bold',
  },

  selector: {
    borderWidth: 1,
    borderColor: '#F29EB0',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: '#FFF7F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textoSelector: {
    color: '#4B4B4B',
    fontSize: 15,
    fontWeight: '600',
  },

  opcionesSelector: {
    borderWidth: 1,
    borderColor: '#F8D7DF',
    borderRadius: 15,
    overflow: 'hidden',
  },

  opcionSelector: {
    padding: 12,
    backgroundColor: '#FFFFFF',
  },

  opcionSelectorActiva: {
    backgroundColor: '#FFF1F4',
  },

  textoOpcionSelector: {
    color: '#F29EB0',
    fontWeight: 'bold',
    fontSize: 14,
  },

  inputHorario: {
    backgroundColor: '#FFF7F9',
    borderWidth: 1,
    borderColor: '#F29EB0',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#4B4B4B',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },

  botonCancelar: {
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F29EB0',
    backgroundColor: '#FFFFFF',
  },

  textoBotonCancelar: {
    color: '#F29EB0',
    fontWeight: 'bold',
    fontSize: 14,
  },

  listaContenido: {
    paddingBottom: 120,
  },

  botonAceptar: {
    backgroundColor: '#F29EB0',
    padding: 13,
    borderRadius: 15,
    alignItems: 'center',
  },

  textoBotonAceptar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

});

