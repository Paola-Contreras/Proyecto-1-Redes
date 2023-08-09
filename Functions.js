const { client, xml } = require("@xmpp/client");


const Server = require('./Conection');
  
  
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
    console.log("Se ha actualizado presencia")
    return(messageXml)
  }

module.exports = {
    message_one_one,
    subscribe,
    presence_message,
    acceptSubscription,
    presence,
    register,
    delete_account,
    message_file
};