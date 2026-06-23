import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { showPrettyAlert } from '../components/PrettyAlert';

export default function LoginScreen({ navigation }) {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const iniciarSesion = async () => {

    try {

      const usuarioGuardado =
        await AsyncStorage.getItem('usuario');

      const usuarioParseado =
        JSON.parse(usuarioGuardado);

      if (
        usuario === usuarioParseado.usuario &&
        password === usuarioParseado.password
      ) {

        showPrettyAlert(
          'Bienvenida',
          'Se inicio sesion correctamente'
        );

        navigation.navigate('Home');

      } else {

        showPrettyAlert(
          'Error',
          'Usuario o contrasena incorrectos'
        );
      }

    } catch (error) {

      console.log(error);

      showPrettyAlert(
        'Error',
        'Ocurrio un problema'
      );
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Mis Compritas
      </Text>

      <Text style={styles.subtitulo}>
        Organiza tus compras
      </Text>

      <View style={styles.card}>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#999"
          value={usuario}
          onChangeText={setUsuario}
        />

        <TextInput
          style={styles.input}
          placeholder="Contrasena"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.boton}
          onPress={iniciarSesion}
        >

          <Text style={styles.textoBoton}>
            Ingresar
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Register')
          }
        >

          <Text style={styles.registro}>
            No tenes cuenta? Registrate
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

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

