// Imports modulos necesarios 
const { client, xml } = require("@xmpp/client");
// const debug = require("@xmpp/debug");
// const readline = require('readline');

// // Desactivacion de certificados SSL/TLS 
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const server = require('./Conection');
const archivoAImportar = require('./Functions');

// // Conexion al servidor 
// const xmpp = client({
//     service: "xmpp://alumchat.xyz:5222", // Puerto y protocolo
//     domain: "alumchat.xyz", // Dominio del servidor XMPP
//     username: "gabycon20213", // Username
//     password: "12345", // Contraseña 

//     // permite que nodejs acepte o no conexiones
//     tls: {
//         rejectUnauthorized: true,
//     }

// });

// function configurarEventoOnline(user, person, text) {
//   return () => {
//       console.log('Connected to XMPP server');
//       console.log(text);

//       const messageXml = xml(
//           "message",
//           { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "chat" },
//           xml("body", {}, text)
//       );

//       xmpp.send(messageXml);
//   };
// }

// Valores de ejemplo para los parámetros
const user = server.username;
const person = "paolaContreras";
const text = "¡Hola! Este es un mensaje de FEARLESS.";

// Configurar el evento 'online' con los parámetros utilizando una función de cierre
server.xmpp.on('online', archivoAImportar.configurarEventoOnline(user, person, text));

server.xmpp.start().catch(console.error);


// xmpp.on('online', (user,person, text) => {
//     console.log('Connected to XMPP server');
//     console.log(person)
//     const messageXml = xml(
//         "message",
//         { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "chat" },
//         xml("body", {}, "AYUDA")
//     );

//     xmpp.send(messageXml);
// });
// const user = "gabycon20213";
// const person = "paolaContreras";
// const text = "¡Hola! Este es un mensaje de ejemplo.";
// xmpp.start().catch(console.error);



server.xmpp.on('error', (err) => {
    console.error('Error:', err);
});




// Registrar una nueva cuenta en el servidor
// 2) Iniciar sesión con una cuenta
// 3) Cerrar sesión con una cuenta
// 4) Eliminar la cuenta del servidor
// Comunicación (80% del funcionamiento, 10% cada funcionalidad)
// 1) Mostrar todos los contactos y su estado
// 2) Agregar un usuario a los contactos
// 3) Mostrar detalles de contacto de un usuario
// 4) Comunicación 1 a 1 con cualquier usuario/contacto
// 5) Participar en conversaciones grupales
// 6) Definir mensaje de presencia
// 7) Enviar/recibir notificaciones
// 8) Enviar/recibir archivos


// module.exports = {
//   xmpp
// };