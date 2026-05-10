// Importa NavigationContainer
import { NavigationContainer } from '@react-navigation/native';

// Importa Stack Navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa pantallas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';

// Crea stack
const Stack = createNativeStackNavigator();

// App principal
export default function App() {

  return (

    // Contenedor navegación
    <NavigationContainer>

      {/* Stack Navigator */}
      <Stack.Navigator

        // Pantalla inicial
        initialRouteName="Login"

        // Configuración general
        screenOptions={{

          headerStyle: {
            backgroundColor: '#FFF1F4',
          },

          headerShadowVisible: false,

          headerTitleStyle: {
            color: '#F29EB0',
            fontWeight: 'bold',
          },

          headerTintColor: '#F29EB0',

          contentStyle: {
            backgroundColor: '#FFF1F4',
          },

        }}
      >

        {/* Pantalla Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}

          options={{
            title: 'Bienvenida 🌸',
            headerBackVisible: false,
          }}
        />

        {/* Pantalla Registro */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}

          options={{
            title: 'Crear Cuenta 🌸',
          }}
        />

        {/* Pantalla Home */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}

          options={{
            title: 'Mis Compritas 🛒',
            headerBackVisible: false,
          }}
        />

        {/* Pantalla Agregar Producto */}
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}

          options={{
            title: 'Nueva Comprita 🌸',
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}