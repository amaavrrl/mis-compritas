import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';

import { PrettyAlertHost } from './components/PrettyAlert';
import { pedirPermisos } from './services/notifications';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {

    const temporizador = setTimeout(() => {

      pedirPermisos();

    }, 300);

    return () => clearTimeout(temporizador);

  }, []);

  return (

    <>

      <NavigationContainer>

        <Stack.Navigator
          initialRouteName="Login"
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

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Bienvenida',
              headerBackVisible: false,
            }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: 'Crear Cuenta',
            }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Mis Compritas',
              headerBackVisible: false,
            }}
          />

          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{
              title: 'Nuevo producto',
            }}
          />

          <Stack.Screen
            name="EditProduct"
            component={EditProductScreen}
            options={{
              title: 'Editar producto',
            }}
          />

        </Stack.Navigator>

      </NavigationContainer>

      <PrettyAlertHost />

    </>
  );
}

