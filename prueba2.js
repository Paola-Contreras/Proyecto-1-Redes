
const { client, xml } = require("@xmpp/client");
const debug = require("@xmpp/debug");

// Desactivacion de certificados SSL/TLS 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'


const xmpp = client({
    service: "xmpp://alumchat.xyz:5222", // Puerto y protocolo
    domain: "alumchat.xyz", // Dominio del servidor XMPP
    username: "paolaContreras", // Username
    password: "Uvg12345", // Contraseña 

    // permite que nodejs acepte o no conexiones
    tls: {
        rejectUnauthorized: true,
    }
});
const receiverJID = 'paolaContreras@alumchat.xyz'; // Adjust this
xmpp.on('stanza', (stanza) => {
    console.log(stanza)
    if (stanza.is('iq')){
        console.log(`Message received from `);
      }
    });

xmpp.start().catch(console.error);
