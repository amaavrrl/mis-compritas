// Importa useState
import { useState } from 'react';

// Importa AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa componentes React Native
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

// Pantalla Registro
export default function RegisterScreen({ navigation }) {

  // Estado usuario
  const [usuario, setUsuario] = useState('');

  // Estado contraseña
  const [password, setPassword] = useState('');

  // Función registrar usuario
  const registrarUsuario = async () => {

    try {

      // Verifica campos vacíos
      if (usuario === '' || password === '') {

        Alert.alert(
          'Error',
          'Complete todos los campos'
        );

        return;
      }

      // Crea objeto usuario
      const nuevoUsuario = {
        usuario,
        password
      };

      // Guarda usuario en AsyncStorage
      await AsyncStorage.setItem(
        'usuario',
        JSON.stringify(nuevoUsuario)
      );

      // Mensaje éxito
      Alert.alert(
        'Bienvenida 🌸',
        'Usuario registrado correctamente'
      );

      // Navega al login
      navigation.navigate('Login');

    } catch (error) {

      // Muestra error si algo falla
      Alert.alert(
        'Error',
        'Ocurrió un problema al guardar'
      );

      console.log(error);
    }
  };

  return (

    <View style={styles.container}>

      {/* Título principal */}
      <Text style={styles.titulo}>
        Crear Cuenta 🌸
      </Text>

      {/* Subtítulo */}
      <Text style={styles.subtitulo}>
        Guardá tus compritas favoritas
      </Text>

      {/* Card */}
      <View style={styles.card}>

        {/* Input usuario */}
        <TextInput
          style={styles.input}
          placeholder="Nuevo usuario"
          placeholderTextColor="#999"
          value={usuario}
          onChangeText={setUsuario}
        />

        {/* Input contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        {/* Botón registrarse */}
        <TouchableOpacity
          style={styles.boton}
          onPress={registrarUsuario}
        >

          <Text style={styles.textoBoton}>
            Registrarme
          </Text>

        </TouchableOpacity>

        {/* Volver login */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Login')
          }
        >

          <Text style={styles.login}>
            Ya tengo cuenta
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
    backgroundColor: '#FFF1F4',
    justifyContent: 'center',
    padding: 25,
  },

  titulo: {
    fontSize: 36,
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

    marginBottom: 15,

    fontSize: 16,
    color: '#4B4B4B',
  },

  boton: {
    backgroundColor: '#F29EB0',

    padding: 15,
    borderRadius: 15,

    alignItems: 'center',

    marginTop: 10,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  login: {
    textAlign: 'center',
    marginTop: 20,
    color: '#F29EB0',
    fontWeight: '600',
  },

});