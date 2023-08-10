const { client, xml } = require("@xmpp/client");
const { v4: uuidv4 } = require('uuid');
  
async function register(user, password){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const xmpp = client({
        service: "xmpp://alumchat.xyz:5222",
        domain: "alumchat.xyz",
        username: "gabycon20213",
        password: "12345",
    
        tls: {
          rejectUnauthorized: true,
        }
    });

    xmpp.on('error', (err) => {
        console.error('Error:', err);
    });
    
    try {
        await xmpp.start();

        console.log('XMPP online');

        const stanza = xml(
        'iq', 
        { type: 'set', id: 'register1'},
        xml('query', { xmlns: 'jabber:iq:register' },
        xml("username", {}, user),
        xml("password", {}, password),
        ));

        xmpp.send(stanza);
        console.log('Registration IQ sent successfully');
        
        xmpp.disconnect();
        console.log('Disconnected\n');
       
    } catch (error) {
        console.error('Connection error:', error);
    }
    return true; 
}

function delete_account(user,password){
    const stanza = xml(
        'iq', 
        { type: 'set', id: 'delete-account'},
        xml('query', { xmlns: 'jabber:iq:register' },
        xml("username", {}, user),
        xml("password", {}, password),
        xml("remove"),
        ));
    console.log(stanza.toString())
    return stanza;
}

function subscribe(user, person) {
    console.log('Sending subscribe request .... ');
    const stanza = xml(
      'presence',
      { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: 'subscribe' }
    );
    
    return stanza;
}
  
function acceptSubscription(user, person) {
    const request = xml(
        "presence",
        { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "subscribed" },
    );
    console.log(`Accepted subscription from ${person} `);
    return(request)
}

function declineSubscription(user, person) {
    const request = xml(
        "presence",
        { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "unsubscribe" },
    );
    console.log(`Accepted subscription from ${person} `);
    return(request)
}

function presence_message(user, show, status) {
    const messageXml = xml(
        "presence",
        { from: `${user}@alumchat.xyz`},
        xml("show", {}, show),
        xml("status", {}, status)
    );
    console.log("Se ha actualizado presencia")
    return(messageXml)
}

function presence(user) {
    const messageXml = xml(
        "presence",
        { from: `${user}@alumchat.xyz`, type: "unavailable"},
    );
    return(messageXml)
}

function message_one_one(user, person, text) {
    const messageId = uuidv4();
    const messageXml = xml(
        "message",
        { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "chat", id: messageId},
        xml("body", {}, text)
    );
    return messageXml;
}

function mark_read_one_one(user, person,ID){
    const messageXml = xml(
        "message",
        { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "chat", id:"read" },
        xml("displayed", {xmlns: "urn:xmpp:chat-markers:0",id: ID})
    );
    console.log(">> Mensaje leido");
    return messageXml;  
}

function received_one_one(user, person,ID){
    const messageXml = xml(
        "message",
        { from: `${user}@alumchat.xyz`, to: `${person}@alumchat.xyz`, type: "chat", id:"received" },
        xml("received", { xmlns: 'urn:xmpp:chat-markers:0',id: ID})
    );
    return messageXml;  
}


module.exports = {
    message_one_one,
    subscribe,
    presence_message,
    acceptSubscription,
    presence,
    register,
    delete_account,
    mark_read_one_one,
    received_one_one
};