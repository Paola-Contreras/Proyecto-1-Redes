const { client, xml } = require("@xmpp/client");


const Server = require('./Conection');

function message_one_one(user, person, text) {
    return () => {
  
        const messageXml = xml(
            "message",
            { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "chat" },
            xml("body", {}, text)
        );
  
        Server.xmpp.send(messageXml);
        console.log(messageXml);
        return messageXml;
    };
  }
  
  function message_file(user, person, fileUrl) {
    return () => {
  
        const messageXml = xml(
            "message",
            { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "chat" },
            xml("body", {}, fileUrl)
        );

  
        Server.xmpp.send(messageXml);
        console.log(messageXml);
        return messageXml;
    };
  }
  

// function message_one_one(user, person, text) {
//     console.log(user)
//     console.log(text)
//     const messageXml = xml(
//         "message",
//         { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "chat" },
//         xml("body", {}, text)
//     );
    
//     console.log(messageXml)
//     return messageXml;
// }

// function message_file(user, person, fileUrl) {
//     const messageXml = xml(
//         "message",
//         { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "chat" },
//         xml("body", {}, fileUrl)
//     );

//     return messageXml;
// }


function subscribe(user, person) {
return () => {
    console.log('Sending invite');

    const request = xml(
        "presence",
        { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "subscribe" }
    );

    Server.xmpp.send(request);
};
}


function acceptSubscription(user, person) {
    return () => {
    const request = xml(
        "presence",
        { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "subscribed" }
    );

    Server.xmpp.send(request);
    console.log(`Accepted subscription from ${person}`);
};
}


function presence_message(user, show, status) {
    return () => {
        console.log('Connected to XMPP server');
        console.log(status);
        console.log(user);
  
        const messageXml = xml(
            "presence",
            { from: `${user}@alumchat.xyz`},
            xml("show", {}, show),
            xml("status", {}, status)

        );
        console.log(show);
        Server.xmpp.send(messageXml);
    };
  }

module.exports = {
    message_one_one,
    subscribe,
    presence_message,
    acceptSubscription,
    message_file
};