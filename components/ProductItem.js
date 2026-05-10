// Importa componentes
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

// Componente reutilizable
export default function ProductItem({

  item,
  onDelete,
  onToggle

}) {

  return (

    <View style={styles.card}>

      {/* Producto clickeable */}
      <TouchableOpacity
        style={styles.productoContainer}
        onPress={onToggle}
      >

        {/* Checkbox visual */}
        <Text style={styles.check}>
          {item.comprado ? '✔' : '○'}
        </Text>

        {/* Nombre producto */}
        <Text
          style={[

            styles.producto,

            // Si está comprado aplica estilo tachado
            item.comprado &&
            styles.productoComprado

          ]}
        >
          {item.nombre}
        </Text>

      </TouchableOpacity>

      {/* Botón eliminar */}
      <TouchableOpacity
        onPress={onDelete}
      >

        <Text style={styles.eliminar}>
          🗑
        </Text>

      </TouchableOpacity>

    </View>
  );
}

// Estilos
const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginTop: 12,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  productoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  check: {
    fontSize: 20,
    marginRight: 10,
    color: '#F29EB0',
  },

  producto: {
    fontSize: 18,
    color: '#4B4B4B',
  },

  productoComprado: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  eliminar: {
    fontSize: 20,
  },

});