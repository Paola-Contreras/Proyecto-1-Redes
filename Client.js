const readline = require('readline');
const server = require('./Conection');
const archivoAImportar = require('./Functions');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Pregunta al usuario
rl.question('Por favor, ingresa algo: ', (respuesta) => {
  const userInput = respuesta; // Captura la entrada del usuario
  console.log(`Ingresaste: ${userInput}`);
  
  // Valores de ejemplo para los parámetros
  const user = server.username;
  const person = "paolaContreras";
  const text = userInput;

  // Configurar el evento 'online' con los parámetros utilizando una función de cierre
  // // ENVIAR UN MENSAJE 1 A 1 
  // server.xmpp.on('online', archivoAImportar.message_one_one(user, person, text));
  // server.xmpp.start().catch(console.error);
  
  server.xmpp.on('error', (err) => {
    console.error('Error:', err);
  });

  rl.close(); // Cierra la interfaz readline
});


// // Agregar un usuario a los contactos
// const user = server.username;
// const person = "paoBot";

// server.xmpp.on('online', archivoAImportar.subscribe(user, person));
// server.xmpp.start().catch(console.error);

const user = server.username;


server.xmpp.on('online', archivoAImportar.friends(user));
server.xmpp.start().catch(console.error);



// Registrar una nueva cuenta en el servidor
// 2) Iniciar sesión con una cuenta
// 3) Cerrar sesión con una cuenta
// 4) Eliminar la cuenta del servidor
// Comunicación (80% del funcionamiento, 10% cada funcionalidad)
// 1) Mostrar todos los contactos y su estado
// 2) Agregar un usuario a los contactos                              DONE
// 3) Mostrar detalles de contacto de un usuario
// 4) Comunicación 1 a 1 con cualquier usuario/contacto               DONE
// 5) Participar en conversaciones grupales
// 6) Definir mensaje de presencia
// 7) Enviar/recibir notificaciones
// 8) Enviar/recibir archivos


// module.exports = {
//   xmpp
// };