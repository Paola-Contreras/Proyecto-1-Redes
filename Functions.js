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
    return stanza;
}

function rooster(user){
    const stanza = xml(
        "iq",
        { to: `${user}@alumchat.xyz`, type: "get" },
        xml("query", { xmlns: "jabber:iq:roster" })
    )
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

function my_presence(user) {
    const messageXml = xml(
        "presence",
        { from: `${user}@alumchat.xyz`, type: "available"},
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

function create_group(room, user){ 
    const Stanza = xml(
      "presence",
      { to: `${room}@conference.alumchat.xyz/${user}`, from: `${room}@conference.alumchat.xyz/${user}`}
    );
  
    const xElement = xml(
      "x",
      {xmlns: "http://jabber.org/protocol/muc#user"}
    );
  
    const itemElement = xml(
      "item",
      {jid: `${user}`, affiliation: "owner", role: "moderator"}
    );
  
    xElement.append(itemElement);
    Stanza.append(xElement);
    
    console.log(Stanza.toString())
    return Stanza;
}

function invite_group( room, person){
    const stanza = xml(
        "iq",
        {xmlns:"jabber:client", to: `${room}@conference.alumchat.xyz`, type: "set" },
        xml("query", { xmlns: "http://jabber.org/protocol/muc#admin" },
        xml("item", { jid: `${person}@alumchat.xyz`, affiliation: "member" })
    ));
    console.log(stanza.toString())
    return stanza;  
}


function not_invateGroup(room,person){
    const messageXml = xml(
        "message",
        {xmlns:"jabber:client", to: `${person}@alumchat.xyz`},
        xml("x", { xmlns:"jabber:x:conference" , jid: `${room}@conference.alumchat.xyz` })
    );
    return messageXml;
}

function acceptInvate(user,room){
    const stanza = xml(
        "presence",
        { xmlns:"jabber:client", to: `${room}@conference.alumchat.xyz/${user}`},
        xml("x", {xmlns:"http://jabber.org/protocol/muc"})

    );
    return(stanza)
}

function joinRoom(room,user){
    const stanza = xml(
        "iq",
        {xmlns:"jabber:client", type:"set"},
        xml("pubsub",{ xmlns:"http://jabber.org/protocol/pubsub"},
        xml("publish",{ node:"storage:bookmarks"},
        xml("item",{ id:"current"},
        xml("storage ",{ xmlns:"storage:bookmarks"},
        xml("conference ",{ jid:`${room}@conference.alumchat.xyz`,  autojoin:"true"},
        xml("nick ",{}, user)
        )))),

        xml("publish-options",{},
        xml("x",{ xmlns:"jabber:x:data", type:"submit"},
        xml("field",{ var:"FORM_TYPE",type:"hidden"},
        xml("value ",{}, "http://jabber.org/protocol/pubsub#publish-option")),
        
        xml("field",{ var:"pubsub#persist_items"},
        xml("value ",{}, true)),

        xml("field",{ var:"pubsub#access_model"},
        xml("value ",{}, "whitelist")),

        )))
    )

    return(stanza)
}

function message_group( user, room, text) {
    const messageId = uuidv4();
    const messageXml = xml(
        "message",
        { to:`${room}@conference.alumchat.xyz`, type: "groupchat", xmlns:"jabber:client", id: messageId},
        xml("nick",{},user),
        xml("body", {}, text)
    );
    console.log(messageXml.toString())
    return messageXml;
}

module.exports = {
    rooster,
    presence,
    register,
    joinRoom,
    subscribe,
    my_presence,
    acceptInvate,
    invite_group,
    create_group,
    message_group,
    delete_account,
    not_invateGroup,
    message_one_one,
    presence_message,
    received_one_one,
    mark_read_one_one,
    acceptSubscription,
    declineSubscription
};