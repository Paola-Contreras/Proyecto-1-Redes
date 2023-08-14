const { client, xml } = require("@xmpp/client");

const Server = require('./Conection');

function message_one_one(user, person, text) {
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
  

function subscribe(user, person) {
return () => {
    console.log('Sending invite');

    const messageXml = xml(
        "presence",
        { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "subscribe" }
    );

    Server.xmpp.send(messageXml);
};
}

function friends(user, person) {
    return () => {
        console.log('Showing Friends');
    
        const messageXml = xml(
            "iq",
            { from: `${user}@alumchat.xyz`, to: `${user}@alumchat.xyz`, type: "get" },
            xml("query", {}, "jabber:iq:roster")
        );
    
        Server.xmpp.send(messageXml);
    };
}


module.exports = {
    message_one_one,
    subscribe,
    friends
};