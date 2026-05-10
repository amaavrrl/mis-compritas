// Importa hooks
import React, { useState } from 'react';

// Importa AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa useFocusEffect
import { useFocusEffect } from '@react-navigation/native';

// Importa componente reutilizable
import ProductItem from '../components/ProductItem';


// Importa componentes React Native
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';

// Pantalla Home
export default function HomeScreen({ navigation }) {

  // Estado productos
  const [productos, setProductos] = useState([]);

  // Se ejecuta cuando vuelve a enfocarse la pantalla
  useFocusEffect(

    React.useCallback(() => {

      cargarProductos();

    }, [])

  );

  // Función cargar productos
  const cargarProductos = async () => {

    // Obtiene productos guardados
    const productosGuardados =
      await AsyncStorage.getItem('productos');

    // Si existen productos
    if (productosGuardados !== null) {

      // Convierte texto a array
      setProductos(
        JSON.parse(productosGuardados)
      );

    } else {

      // Si no hay productos
      setProductos([]);
    }
  };

  // Función eliminar producto
  const eliminarProducto = async (indexProducto) => {

    // Filtra productos
    const nuevaLista = productos.filter(
      (item, index) => index !== indexProducto
    );

    // Actualiza estado
    setProductos(nuevaLista);

    // Guarda cambios
    await AsyncStorage.setItem(
      'productos',
      JSON.stringify(nuevaLista)
    );
  };

  // Función marcar comprado
  const toggleComprado = async (indexProducto) => {

    // Copia array
    const nuevosProductos = [...productos];

    // Cambia estado comprado
    nuevosProductos[indexProducto].comprado =
      !nuevosProductos[indexProducto].comprado;

    // Actualiza estado
    setProductos(nuevosProductos);

    // Guarda cambios
    await AsyncStorage.setItem(
      'productos',
      JSON.stringify(nuevosProductos)
    );
  };

  // Cuenta productos comprados
  const productosComprados = productos.filter(
    producto => producto.comprado
  ).length;

  return (

    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        {/* Título */}
        <Text style={styles.titulo}>
          Mis Compritas 🛒
        </Text>

        {/* Contador */}
        <Text style={styles.contador}>
          {productosComprados}/{productos.length} comprados
        </Text>

      </View>

      {/* Botón agregar */}
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

      {/* Si no hay productos */}
      {productos.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyEmoji}>
            🛒
          </Text>

          <Text style={styles.emptyText}>
            No hay compritas todavía
          </Text>

        </View>

      ) : (

        // Lista productos
        <FlatList
          data={productos}

          showsVerticalScrollIndicator={false}

          // Key única
          keyExtractor={(item, index) =>
            index.toString()
          }

          // Renderiza componente reutilizable
          renderItem={({ item, index }) => (

            <ProductItem

              item={item}

              // Eliminar
              onDelete={() =>
                eliminarProducto(index)
              }

              // Marcar comprado
              onToggle={() =>
                toggleComprado(index)
              }
            />

          )}
        />

      )}

    </View>
  );
}

// Estilos
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

  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F29EB0',
    textAlign: 'center',
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

});