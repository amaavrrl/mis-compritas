import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { showPrettyAlert } from './PrettyAlert';

export default function ProductItem({
  item,
  onDelete,
  onToggle,
  onEdit
}) {

  const tieneUbicacion = Boolean(
    item.ubicacion &&
    (
      (
        item.ubicacion.latitude !== null &&
        item.ubicacion.latitude !== undefined &&
        item.ubicacion.longitude !== null &&
        item.ubicacion.longitude !== undefined
      ) ||
      item.ubicacion.direccion
    )
  );

  const abrirMapa = () => {

    const {
      latitude,
      longitude,
      direccion
    } = item.ubicacion;

    const tieneCoordenadas =
      latitude !== null &&
      latitude !== undefined &&
      longitude !== null &&
      longitude !== undefined;

    const url = tieneCoordenadas
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;

    Linking.openURL(url);
  };

  const confirmarEliminar = () => {

    showPrettyAlert(
      'Eliminar producto',
      'Seguro que queres eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: onDelete,
        },
      ]
    );
  };

  return (

    <View style={styles.card}>

      <View style={styles.contenido}>

        <TouchableOpacity
          style={styles.productoContainer}
          onPress={onToggle}
        >

          {item.imagenUri && (

            <Image
              source={{ uri: item.imagenUri }}
              style={styles.imagen}
            />

          )}

          <Ionicons
            name={item.comprado ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color="#F29EB0"
            style={styles.check}
          />

          <Text
            style={[
              styles.producto,
              item.comprado &&
              styles.productoComprado
            ]}
          >
            {item.nombre}
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.acciones}>

        {tieneUbicacion && (

          <TouchableOpacity
            onPress={abrirMapa}
          >

            <Ionicons
              name="location-outline"
              size={22}
              color="#F29EB0"
            />

          </TouchableOpacity>

        )}

        <TouchableOpacity
          onPress={onEdit}
        >

          <Ionicons
            name="pencil-outline"
            size={22}
            color="#F29EB0"
          />

        </TouchableOpacity>

        <TouchableOpacity
          onPress={confirmarEliminar}
        >

          <Ionicons
            name="trash-outline"
            size={22}
            color="#D9534F"
          />

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  contenido: {
    flex: 1,
  },

  productoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  imagen: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#FFF7F9',
  },

  check: {
    marginRight: 10,
  },

  producto: {
    flex: 1,
    fontSize: 18,
    color: '#4B4B4B',
  },

  productoComprado: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  acciones: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 8,
  },

});

