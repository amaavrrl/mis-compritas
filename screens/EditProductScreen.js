import { useState } from 'react';

import { useProductStore } from '../store/productStore';

import {
  tomarFoto,
  elegirImagen
} from '../services/imageService';

import {
  obtenerUbicacionActual,
  buscarUbicacionPorTexto
} from '../services/locationService';

import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { showPrettyAlert } from '../components/PrettyAlert';

export default function EditProductScreen({ route, navigation }) {

  const { indexProducto } = route.params;

  const productoActual =
    useProductStore((state) => state.productos[indexProducto]);

  const actualizarProducto =
    useProductStore((state) => state.actualizarProducto);

  const [producto, setProducto] = useState(productoActual?.nombre || '');

  const [imagenUri, setImagenUri] = useState(productoActual?.imagenUri || null);

  const [ubicacion, setUbicacion] = useState(productoActual?.ubicacion || null);

  const [mostrarOpcionesUbicacion, setMostrarOpcionesUbicacion] = useState(false);
  const [mostrarUbicacionManual, setMostrarUbicacionManual] = useState(false);
  const [direccionManual, setDireccionManual] = useState(productoActual?.ubicacion?.direccion || '');
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);

  const guardarCambios = async () => {

    if (producto === '') {

      showPrettyAlert(
        'Error',
        'Ingrese un producto'
      );

      return;
    }

    await actualizarProducto(
      indexProducto,
      {
        nombre: producto,
        imagenUri,
        ubicacion,
      }
    );

    showPrettyAlert(
      'Exito',
      'Producto actualizado!'
    );

    navigation.goBack();
  };

  const manejarTomarFoto = async () => {

    const uri = await tomarFoto();

    if (uri) {
      setImagenUri(uri);
    }
  };

  const manejarElegirImagen = async () => {

    const uri = await elegirImagen();

    if (uri) {
      setImagenUri(uri);
    }
  };

  const manejarAgregarUbicacion = () => {

    setMostrarOpcionesUbicacion(true);
    setMostrarUbicacionManual(false);
  };

  const manejarUsarUbicacionActual = async () => {

    setCargandoUbicacion(true);

    const ubicacionActual = await obtenerUbicacionActual();

    setCargandoUbicacion(false);

    if (!ubicacionActual) {
      return;
    }

    setUbicacion(ubicacionActual);
    setMostrarOpcionesUbicacion(false);

    showPrettyAlert(
      'Ubicacion guardada',
      'La ubicacion del comercio se guardo correctamente.'
    );
  };

  const manejarMostrarUbicacionManual = () => {

    setMostrarUbicacionManual(true);
  };

  const manejarCancelarUbicacion = () => {

    setMostrarOpcionesUbicacion(false);
    setMostrarUbicacionManual(false);
    setDireccionManual(productoActual?.ubicacion?.direccion || '');
    setCargandoUbicacion(false);
  };

  const manejarGuardarUbicacionManual = async () => {

    const textoUbicacion = direccionManual.trim();

    if (textoUbicacion === '') {

      showPrettyAlert(
        'Error',
        'Ingrese una direccion o nombre de comercio'
      );

      return;
    }

    const ubicacionManual =
      await buscarUbicacionPorTexto(textoUbicacion);

    setUbicacion(ubicacionManual);
    setMostrarOpcionesUbicacion(false);
    setMostrarUbicacionManual(false);

    showPrettyAlert(
      'Ubicacion guardada',
      'La ubicacion del comercio se guardo correctamente.'
    );
  };

  if (!productoActual) {

    return (

      <View style={styles.containerError}>

        <Text style={styles.errorTexto}>
          Producto no encontrado
        </Text>

      </View>
    );
  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >

      <Text style={styles.titulo}>
        Editar producto
      </Text>

      <Text style={styles.subtitulo}>
        Actualiza los datos
      </Text>

      <View style={styles.card}>

        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          placeholderTextColor="#999"
          value={producto}
          onChangeText={setProducto}
        />

        {imagenUri && (

          <Image
            source={{ uri: imagenUri }}
            style={styles.preview}
          />

        )}

        <View style={styles.botonesImagen}>

          <TouchableOpacity
            style={styles.botonSecundario}
            onPress={manejarTomarFoto}
          >

            <Text style={styles.textoBotonSecundario}>
              Sacar foto
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonSecundario}
            onPress={manejarElegirImagen}
          >

            <Text style={styles.textoBotonSecundario}>
              Elegir galeria
            </Text>

          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={[
            styles.botonUbicacion,
            ubicacion && styles.botonUbicacionGuardada,
          ]}
          onPress={manejarAgregarUbicacion}
        >

          <Text style={styles.textoBotonUbicacion}>
            {ubicacion
              ? 'Cambiar ubicacion'
              : 'Agregar ubicacion'}
          </Text>

        </TouchableOpacity>

        {ubicacion && (

          <Text style={styles.ubicacionGuardada}>
            Ubicacion guardada
          </Text>

        )}

        <TouchableOpacity
          style={styles.boton}
          onPress={guardarCambios}
        >

          <Text style={styles.textoBoton}>
            Guardar cambios
          </Text>

        </TouchableOpacity>

      </View>

      <Modal
        visible={mostrarOpcionesUbicacion}
        transparent={true}
        animationType="fade"
        onRequestClose={manejarCancelarUbicacion}
      >

        <View style={styles.modalFondo}>

          <View style={styles.modalCard}>

            <Text style={styles.modalTitulo}>
              Cambiar ubicacion
            </Text>

            <Text style={styles.modalTexto}>
              Elegi como queres guardar el comercio.
            </Text>

            {cargandoUbicacion ? (

              <View style={styles.cargandoContainer}>

                <ActivityIndicator color="#F29EB0" />

                <Text style={styles.modalTexto}>
                  Obteniendo ubicacion...
                </Text>

              </View>

            ) : (

              <>

                <TouchableOpacity
                  style={styles.botonSecundarioCompleto}
                  onPress={manejarUsarUbicacionActual}
                >

                  <Text style={styles.textoBotonSecundario}>
                    Usar ubicacion actual
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botonSecundarioCompleto}
                  onPress={manejarMostrarUbicacionManual}
                >

                  <Text style={styles.textoBotonSecundario}>
                    Escribir comercio o direccion
                  </Text>

                </TouchableOpacity>

                {mostrarUbicacionManual && (

                  <View style={styles.ubicacionManualContainer}>

                    <TextInput
                      style={styles.inputModal}
                      placeholder="Ej: Supermercado del barrio"
                      placeholderTextColor="#999"
                      value={direccionManual}
                      onChangeText={setDireccionManual}
                    />

                    <TouchableOpacity
                      style={styles.botonGuardarModal}
                      onPress={manejarGuardarUbicacionManual}
                    >

                      <Text style={styles.textoBoton}>
                        Guardar ubicacion
                      </Text>

                    </TouchableOpacity>

                  </View>

                )}

                <TouchableOpacity
                  style={styles.botonCancelar}
                  onPress={manejarCancelarUbicacion}
                >

                  <Text style={styles.textoBotonCancelar}>
                    Cancelar
                  </Text>

                </TouchableOpacity>

              </>

            )}

          </View>

        </View>

      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF1F4',
  },

  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
  },

  containerError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF1F4',
  },

  errorTexto: {
    color: '#777',
    fontSize: 16,
  },

  titulo: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F29EB0',
  },

  subtitulo: {
    textAlign: 'center',
    color: '#777',
    marginTop: 10,
    marginBottom: 40,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  input: {
    backgroundColor: '#FFF7F9',
    borderWidth: 1,
    borderColor: '#F8D7DF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#4B4B4B',
  },

  preview: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#FFF7F9',
  },

  botonesImagen: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  botonSecundario: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F29EB0',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
  },

  textoBotonSecundario: {
    color: '#F29EB0',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },

  botonUbicacion: {
    borderWidth: 1,
    borderColor: '#F29EB0',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 8,
  },

  botonUbicacionGuardada: {
    backgroundColor: '#FFF7F9',
  },

  textoBotonUbicacion: {
    color: '#F29EB0',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },

  ubicacionGuardada: {
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 13,
  },

  boton: {
    backgroundColor: '#F29EB0',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  ubicacionManualContainer: {
    marginTop: 12,
  },

  botonSecundarioCompleto: {
    borderWidth: 1,
    borderColor: '#F29EB0',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
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
    textAlign: 'center',
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

  cargandoContainer: {
    gap: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  inputModal: {
    backgroundColor: '#FFF7F9',
    borderWidth: 1,
    borderColor: '#F8D7DF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    fontSize: 16,
    color: '#4B4B4B',
  },

  botonGuardarModal: {
    backgroundColor: '#F29EB0',
    padding: 13,
    borderRadius: 15,
    alignItems: 'center',
  },

});

