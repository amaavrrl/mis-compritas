import { useEffect, useState } from 'react';

import {
  Alert,
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

let mostrarAlertaGlobal = null;

export function showPrettyAlert(titulo, mensaje, botones = null) {

  if (!mostrarAlertaGlobal) {

    Alert.alert(titulo, mensaje, botones);
    return;
  }

  mostrarAlertaGlobal({
    titulo,
    mensaje,
    botones,
  });
}

export function PrettyAlertHost() {

  const [alerta, setAlerta] = useState(null);

  useEffect(() => {

    mostrarAlertaGlobal = setAlerta;

    return () => {
      mostrarAlertaGlobal = null;
    };

  }, []);

  const cerrarAlerta = (boton) => {

    setAlerta(null);

    if (boton?.onPress) {
      boton.onPress();
    }
  };

  const botones =
    alerta?.botones && alerta.botones.length > 0
      ? alerta.botones
      : [{ text: 'Aceptar' }];

  return (

    <Modal
      visible={Boolean(alerta)}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setAlerta(null)}
    >

      <View style={styles.fondo}>

        <View style={styles.card}>

          <Text style={styles.titulo}>
            {alerta?.titulo}
          </Text>

          <Text style={styles.mensaje}>
            {alerta?.mensaje}
          </Text>

          <View style={styles.botones}>

            {botones.map((boton, index) => {

              const esCancelar =
                boton.style === 'cancel';

              const esDestructivo =
                boton.style === 'destructive';

              return (

                <TouchableOpacity
                  key={`${boton.text}-${index}`}
                  style={[
                    styles.boton,
                    esCancelar && styles.botonCancelar,
                    esDestructivo && styles.botonDestructivo,
                  ]}
                  onPress={() => cerrarAlerta(boton)}
                >

                  <Text
                    style={[
                      styles.textoBoton,
                      esCancelar && styles.textoCancelar,
                    ]}
                  >
                    {boton.text}
                  </Text>

                </TouchableOpacity>
              );
            })}

          </View>

        </View>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({

  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    padding: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 22,
    gap: 14,
  },

  titulo: {
    color: '#F29EB0',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  mensaje: {
    color: '#666',
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },

  botones: {
    gap: 10,
    marginTop: 4,
  },

  boton: {
    backgroundColor: '#F29EB0',
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: 'center',
  },

  botonCancelar: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F29EB0',
  },

  botonDestructivo: {
    backgroundColor: '#D9534F',
  },

  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  textoCancelar: {
    color: '#F29EB0',
  },

});

