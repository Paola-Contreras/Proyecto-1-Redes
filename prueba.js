const { client, xml } = require("@xmpp/client");
const debug = require("@xmpp/debug");

// Desactivacion de certificados SSL/TLS 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const functions = require('./Functions'); // Assuming this is where message_one_one is defined

const xmpp = client({
    service: "xmpp://alumchat.xyz:5222", // Puerto y protocolo
    domain: "alumchat.xyz", // Dominio del servidor XMPP
    username: "gabycon20213", // Username
    password: "12345", // Contraseña 

    // permite que nodejs acepte o no conexiones
    tls: {
        rejectUnauthorized: true,
    }
});

const user1 = 'gabycon20213@alumchat.xyz';
const person1 = 'paoBot@alumchat.xyz';
const text1 = 'Hello f!';
const fileUrl = "C:\Users\Contreras GP\Downloads\Diseño sin título (2)-PhotoRoom.png-PhotoRoom";

// console.log("MENSAJE");
// xmpp.on('online', async () => {
//     const messageXml = functions.message_one_one(user1, person1, text1);
//     xmpp.send(messageXml);
//   });
// xmpp.start().catch(console.error);  
// console.log("DONE");

xmpp.on('online', functions.message_one_one(user1, person1, text1));
xmpp.start().catch(console.error);

// console.log("ARCHIVO");
// xmpp.on('online', async () => {
// const messageXml = functions.message_file(user1, person1, fileUrl);
// xmpp.send(messageXml);
// });
// xmpp.start().catch(console.error); 


