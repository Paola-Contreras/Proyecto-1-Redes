const readline = require('readline');
const server = require('./Conection');
const archivoAImportar = require('./Functions');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// server.xmpp.on('stanza', (stanza) => {
//   if (stanza.is('message') && stanza.attrs.type === 'chat') {
//     const from = stanza.attrs.from;
//     const bodyElement = stanza.getChild('body');
  
//     if (bodyElement) {
//       const text = bodyElement.getText();
//       console.log(`Mensaje recibido de ${from}: ${text}`);
//     }
//   }
// });

// // Pregunta al usuario
// rl.question('Por favor, ingresa algo: ', (respuesta) => {
//   const userInput = respuesta; // Captura la entrada del usuario
//   console.log(`Ingresaste: ${userInput}`);
  
//   // Valores de ejemplo para los parámetros
//   const user = "gabycon20213";
//   const person = "paolaContreras";
//   const text = userInput;

//   // Configurar el evento 'online' con los parámetros utilizando una función de cierre
//   // ENVIAR UN MENSAJE 1 A 1 
//   server.xmpp.on('online', archivoAImportar.message_one_one(user, person, text));
//   server.xmpp.start().catch(console.error);      

//   server.xmpp.on('error', (err) => {
//     console.error('Error:', err);
//   });

//   rl.close(); // Cierra la interfaz readline
// });
// // Pregunta al usuario
// rl.question('Por favor, ingresa algo: ', (respuesta) => {
//   const userInput = respuesta; // Captura la entrada del usuario
//   console.log(`Ingresaste: ${userInput}`);
  
//   // Valores de ejemplo para los parámetros
//   const user = "gabycon20213";
//   const person = "paolaContreras";
//   const text = userInput;

  // Configurar el evento 'online' con los parámetros utilizando una función de cierre
  // ENVIAR UN MENSAJE 1 A 1 
//   const messageXml = archivoAImportar.message_one_one(user, person, text);
//   server.xmpp.on('online', archivoAImportar.message_one_one(user, person, text));
//   server.xmpp.start().catch(console.error);      

//   server.xmpp.on('error', (err) => {
//     console.error('Error:', err);
//   });

//   rl.close(); // Cierra la interfaz readline
// });
// // Configuración del evento 'stanza' para recibir mensajes entrantes
// server.xmpp.on('stanza', (stanza) => {
//   if (stanza.is('message') && stanza.attrs.type === 'chat') {
//     const from = stanza.attrs.from;
//     const bodyElement = stanza.getChild('body');
  
//     if (bodyElement) {
//       const text = bodyElement.getText();
//       console.log(`Mensaje recibido de ${from}: ${text}`);
//       // Aquí puedes agregar lógica para responder al mensaje entrante si es necesario
//     }
//   }
// });

//   server.xmpp.on('error', (err) => {
//   console.error('Error en el cliente XMPP:', err);
// });

// // // Enviar y aceptar un usuario a los contactos
// const user = server.username;
// const person = "paoBot";

// server.xmpp.on('online', archivoAImportar.subscribe(user, person));
// server.xmpp.on('online', archivoAImportar.acceptSubscription(user, person));
// server.xmpp.start().catch(console.error);

// const user = "gabycon20213";

// const type = "xa"; // or 'unavailable', 'available', etc.
// const status = 'Enjoying';


// server.xmpp.on('online', archivoAImportar.presence_message(user,type,status));
// server.xmpp.start().catch(console.error);

const user1 = 'gabycon20213@alumchat.xyz';
const person1 = 'paoBot@alumchat.xyz';
const fileUrl = "C:\Users\Contreras GP\Downloads\Diseño sin título (2)-PhotoRoom.png-PhotoRoom";
server.xmpp.on('online', archivoAImportar.message_file(user1,person1,fileUrl));
server.xmpp.start().catch(console.error);

// -------------------------------------------------------------------------------------------------------

console.log("1. Ver grupos");
console.log("2. Crear grupo");
console.log("3. Ver mensajes");
console.log("4. Invitar amigo a un grupo");
console.log("5. Enviar mensaje a un grupo");
console.log("6. Regresar");                   


// 3) Mostrar detalles de contacto de un usuario
// 2.1) Almacenar mensajes
// 5.1) Crear grupo 
// 5.2) Enviar y recibir mensajes grupales 
// 5.3) Enviar y aceptar solicitud 
// 5.4) Almacenar mensajes
// 7) Terminar notificiaciones 
// 8) Enviar archivos
// 8.1) recibir archivos


// Grajim
// - Paola_Contreras 
// - Uvg12345

// -gaby20213
// -12345

// -paoBot -pao 
