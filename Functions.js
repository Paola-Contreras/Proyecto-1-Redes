const { client, xml } = require("@xmpp/client");

const Server = require('./Conection');

function configurarEventoOnline(user, person, text) {
    return () => {
        console.log('Connected to XMPP server');
        console.log(text);
  
        const messageXml = xml(
            "message",
            { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "chat" },
            xml("body", {}, text)
        );
  
        Server.xmpp.send(messageXml);
    };
  }
  
module.exports = {
    configurarEventoOnline
};