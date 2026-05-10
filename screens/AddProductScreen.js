// Importa hooks
import { useState } from 'react';
// Importa AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';


// Importa componentes
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

// Pantalla agregar producto
export default function AddProductScreen({ navigation }) {

  // Estado producto
  const [producto, setProducto] = useState('');


  // Función agregar producto
  const agregarProducto = async () => {

    // Verifica campo vacío
    if (producto === '') {

      Alert.alert(
        'Error',
        'Ingrese un producto'
      );

      return;
    }

    // Obtiene productos guardados
    const productosGuardados =
      await AsyncStorage.getItem('productos');

    // Convierte texto a array
    const productos =
      productosGuardados !== null
        ? JSON.parse(productosGuardados)
        : [];

    // Crea objeto producto
    const nuevoProducto = {

      nombre: producto,

      // Estado inicial
      comprado: false

    };

    // Agrega producto al array
    productos.push(nuevoProducto);

    // Guarda lista actualizada
    await AsyncStorage.setItem(
      'productos',
      JSON.stringify(productos)
    );

    // Mensaje éxito
    Alert.alert(
      'Éxito',
      'Producto agregado'
    );

    // Vuelve al Home
    navigation.goBack();
  };

  return (

    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.titulo}>
        Nueva Comprita 🌸
      </Text>

      {/* Subtítulo */}
      <Text style={styles.subtitulo}>
        Agregá algo a tu lista
      </Text>

      {/* Card */}
      <View style={styles.card}>

        {/* Input */}
        <TextInput
          style={styles.input}
          placeholder="Agregar producto"
          placeholderTextColor="#999"
          value={producto}
          onChangeText={setProducto}
        />

        {/* Botón */}
        <TouchableOpacity
          style={styles.boton}
          onPress={agregarProducto}
        >

          <Text style={styles.textoBoton}>
            Guardar producto
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

// Estilos
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#FFF1F4',
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

});