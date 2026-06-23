# MIS COMPRITAS - App de lista de compras

La aplicacion fue desarrollada en React Native utilizando Expo, aplicando conceptos como componentes, hooks, navegacion, almacenamiento local, estado global, permisos del dispositivo y diseno UX/UI.

El proyecto cuenta con:

- Componentes reutilizables
- Navegacion entre pantallas
- Autenticacion local
- Persistencia con AsyncStorage
- Estado global con Zustand
- CRUD de productos
- Uso de camara, galeria, ubicacion, contactos y calendario


## Funcionalidades implementadas

-Registro de usuario

-Inicio de sesion

-Validacion de usuario local

-Persistencia de datos con AsyncStorage

-Agregar productos

-Mostrar, editar y eliminar productos

-Marcar productos como comprados

-Contador de progreso

-Navegacion entre pantallas con React Navigation

-Componentes reutilizables

-Store global de productos con Zustand

-Foto del producto usando camara o galeria

-Ubicacion del comercio utilizando GPS o agregado manualmente

-Apertura de la ubicacion en Google Maps

-Compartir lista de compras pendientes por WhatsApp

-Creacion de evento en calendario "Dia de compra semanal"

-Notificaciones locales

-Tests con Jest y React Native Testing Library

## Permisos utilizados

La app solicita permisos para:

- Camara
- Galeria
- Ubicacion
- Contactos
- Calendario
- Notificaciones

## Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- React Navigation
- AsyncStorage
- Zustand
- Expo Image Picker
- Expo Location
- Expo Contacts
- Expo Calendar
- Expo Notifications
- Jest
- React Native Testing Library

## Tests

El proyecto incluye 3 tests:

 Test de componente reutilizable

 Test de logica de negocio

 Test del store global de Zustand

Para ejecutarlos:

```bash
npm test
```

Tambien se puede ejecutar:

```bash
npm test -- --watchAll=false
```

## Video DEMO

Link YouTube:

https://youtube.com/shorts/tWJLzyrvXfE?si=P8blGm7eISiskecf

## Como ejecutar la app

1- Instalar dependencias:

```bash
npm install
```

2- Ejecutar el proyecto:

```bash
npx expo start
```

3- Abrir en el celular:

Descargar la aplicacion Expo Go y escanear el codigo QR generado en la terminal.

```bash
npx expo start -c
```

