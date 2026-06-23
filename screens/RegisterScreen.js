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

export default function RegisterScreen({ navigation }) {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const registrarUsuario = async () => {

    try {

      if (usuario === '' || password === '') {

        showPrettyAlert(
          'Error',
          'Completa todos los campos'
        );

        return;
      }

      const nuevoUsuario = {
        usuario,
        password
      };

      await AsyncStorage.setItem(
        'usuario',
        JSON.stringify(nuevoUsuario)
      );

      showPrettyAlert(
        'Bienvenida',
        'Usuario registrado correctamente'
      );

      navigation.navigate('Login');

    } catch (error) {

      showPrettyAlert(
        'Error',
        'Ocurrio un problema al guardar'
      );

      console.log(error);
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Crear Cuenta
      </Text>

      <Text style={styles.subtitulo}>
        Guarda tus compritas favoritas
      </Text>

      <View style={styles.card}>

        <TextInput
          style={styles.input}
          placeholder="Nuevo usuario"
          placeholderTextColor="#999"
          value={usuario}
          onChangeText={setUsuario}
        />

        <TextInput
          style={styles.input}
          placeholder="Nueva contrasena"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.boton}
          onPress={registrarUsuario}
        >

          <Text style={styles.textoBoton}>
            Registrarme
          </Text>

        </TouchableOpacity>

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

