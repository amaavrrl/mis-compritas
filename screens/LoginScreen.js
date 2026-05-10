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

// Pantalla Login
export default function LoginScreen({ navigation }) {

  // Estado usuario
  const [usuario, setUsuario] = useState('');

  // Estado contraseña
  const [password, setPassword] = useState('');

  // Función login
  const iniciarSesion = async () => {

    try {

      // Obtiene usuario guardado
      const usuarioGuardado =
        await AsyncStorage.getItem('usuario');

      // Convierte texto a objeto
      const usuarioParseado =
        JSON.parse(usuarioGuardado);

      // Verifica usuario y contraseña
      if (
        usuario === usuarioParseado.usuario &&
        password === usuarioParseado.password
      ) {

        // Login correcto
        Alert.alert(
          'Bienvenida 🌸',
          'Inicio de sesión correcto'
        );

        // Navega al Home
        navigation.navigate('Home');

      } else {

        // Datos incorrectos
        Alert.alert(
          'Error',
          'Usuario o contraseña incorrectos'
        );
      }

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'Ocurrió un problema'
      );
    }
  };

  return (

    <View style={styles.container}>

      {/* Título principal */}
      <Text style={styles.titulo}>
        Mis Compritas 🛒
      </Text>

      {/* Subtítulo */}
      <Text style={styles.subtitulo}>
        Organizá tus compras de forma simple
      </Text>

      {/* Card login */}
      <View style={styles.card}>

        {/* Input usuario */}
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#999"
          value={usuario}
          onChangeText={setUsuario}
        />

        {/* Input contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        {/* Botón ingresar */}
        <TouchableOpacity
          style={styles.boton}
          onPress={iniciarSesion}
        >

          <Text style={styles.textoBoton}>
            Ingresar
          </Text>

        </TouchableOpacity>

        {/* Botón registro */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Register')
          }
        >

          <Text style={styles.registro}>
            ¿No tenés cuenta? Registrate
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
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F29EB0',
  },

  subtitulo: {
    textAlign: 'center',
    color: '#666',
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

  registro: {
    textAlign: 'center',
    marginTop: 20,
    color: '#F29EB0',
    fontWeight: '600',
  },

});