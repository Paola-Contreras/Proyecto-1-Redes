// IMPORTS
const { xml, client } = require('@xmpp/client');
const readline = require('readline');
const Server = require('./Conection');
const Func = require('./Functions');

let xmppInstance;
let using_user;
let showing;
let list = [];
let roomN;
let GM = [];
let PM = [];

// Input 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sleep(ms) {
const startTime = new Date().getTime();
while (new Date().getTime() - startTime < ms) {
    // Espera activa
}
}
  // Functions that contains menus 
function Main_menu(){
    console.log("-- INGRESO --\n")
    console.log("1. Iniciar Seción")
    console.log("2. Registrarse")
    console.log("3. Salir")
}

function Func_menu() {
    console.log("\n-- FUNCIONES --");
    console.log("1. Mostrar Contactos");
    console.log("2. Agregar Amigos");
    console.log("3. Ver detalles de un contacto");
    console.log("4. Chat Privado");
    console.log("5. Chat Grupal");
    console.log("6. Definir Presencia");
    console.log("7. Enviar Archivos");
    console.log("8. Cerrar Sesion");
    console.log("9. Eliminar Cuenta");
  
    rl.question("Ingresa tu elección: ", function(choice) {
      Choice_FuncMenu(choice);
    });
}

function Pres_menu(){
    console.log("-- PRESENCIA --\n")
    console.log("1. Busy")
    console.log("2. No Available")
    console.log("3. Away")
    console.log("4. Offline")
    console.log("5. Online")

    rl.question("Ingresa tu elección: ", function(choice) {
        Choice_presence(choice);
      });
}

function Group_menu(){
  console.log("-- CHAT GRUPAL --\n");
  console.log("1. Crear grupo");
  console.log("2. Ver mensajes");
  console.log("3. Invitar amigo a un grupo");
  console.log("4. Enviar mensaje a un grupo");
  console.log("5. Regresar");

  rl.question("Ingresa tu elección: ", function(choice) {
    Choice_group(choice);
  });
}

function private_menu(){
  console.log("-- CHAT PRIVADO --\n");
  console.log("1. Enviar mensaje");
  console.log("2. Ver mensajes");
  console.log("3. Regresar");

  rl.question("Ingresa tu elección: ", function(choice) {
    Choice_privateChat(choice);
  });
}
  // Main Actions
async function processRegistration() {
    rl.question("Ingresa tu nombre: ", async (name) => {
      rl.question("Ingresa contraseña: ", async (password) => {
        console.log(`Registrando ${name} en el servidor ...`);
        try {
          const registrationSuccess = await Func.register(name, password);
  
          if (registrationSuccess === true) {
            console.log("\nRegistro exitoso");
            mainMenu(); 
          } else {
            console.log("\nHubo un problema con el registro");
          }
        } catch (error) {
          console.error("Error en el registro:", error);
        }
      });
    });
}

function delete_user() {
      rl.question("Ingresa contraseña: ", (password) => {
        eliminate_friends();
        st2 = Func. delete_account(using_user, password);
        xmppInstance.send(st2);
        sleep(2000);
        xmppInstance.stop();
        mainMenu();
      });

}

function processLogin() {
rl.question("Ingresa tu usuario: ", (username) => {
    rl.question("Ingresa tu contraseña: ", (password) => {
      /// CONECTION 
        const { xmpp } = Server.createXMPPConnection(username, password);
        xmpp.start().catch(console.error);
        xmpp.on('stanza', (stanza) => {
          // console.log(stanza.toString())

        // LISTENER & NOTIFICATIONS
        if (stanza.is('message') && stanza.attrs.type === 'chat') {
            const from = stanza.attrs.from;
            const body = stanza.getChildText('body');
            const id = stanza.attrs.id;
            const receivedElement = stanza.getChild('received', 'urn:xmpp:chat-markers:0');
            const displayedElement = stanza.getChild('displayed', 'urn:xmpp:chat-markers:0');


            if (body !== null){
              received = Func.received_one_one(username,from,id),
              xmpp.send(received);
              sleep(1000);
              console.log(`\n NOTIFICATION  >>> Message from: ${from} \n\t\t content: ${body}`);

              const messageObject = {
                person: from,
                body: body,
                id: id
              };
              PM.push(messageObject);
            }

            if (receivedElement) {
              const parts = from.split('@');
              const part_Ineed =parts[0]
              console.log(`\n NOTIFICATION  >>> ${part_Ineed} Received your message`);
            }

            if (displayedElement) {
                const parts = from.split('@');
                const part_Ineed =parts[0]
                console.log(`\n NOTIFICATION  >>> ${part_Ineed} saw your message`);
            }
            
        } else if (stanza.is('presence') && stanza.attrs.type === 'subscribe') {
            const from = stanza.attrs.from;
            const me = `${username}@alumchat.xyz`
            if (from !== me){
              console.log(`\n NOTIFICATION >>> Friend request from: ${from}`);
              st2 = Func.acceptSubscription(username, from);
              xmpp.send(st2);
            }

        } else if (stanza.is('presence') && stanza.attrs.type === 'unsubscribe') {
          const from = stanza.attrs.from;
          const me = `${username}@alumchat.xyz`
          if (from !== username){
            console.log(`\n NOTIFICATION >>> ${from} eliminated you form rooster`);
          }
      } else if (stanza.is('presence') && stanza.attrs.type === 'unavailable'){
          const from = stanza.attrs.from;
          const parts = from.split('@');
          const part_Ineed =parts[0]

          if (part_Ineed !== username){
            console.log(`\n NOTIFICATION >>> ${part_Ineed} has gone offline`);
          }
      } else if (stanza.is('presence') && stanza.getChild('show')){
            const from = stanza.attrs.from;
            const me = `${username}@alumchat.xyz`
          if (from !== username){
            const parts = from.split('@');
            const part_Ineed =parts[0]
            console.log(`\n NOTIFICATION >>> ${part_Ineed} has changed status`);
          }
    }else if (stanza.is('iq')  && stanza.getChild('query', 'jabber:iq:roster') && stanza.attrs.type === "result" ){
        
          const query = stanza.getChild('query', 'jabber:iq:roster');
          const items = query.getChildren('item');
          
          list = items.map(item => ({
            name: item.attrs.jid,
            subscription: item.attrs.subscription
        }));
          console.log(list);
          Func_menu();
    }else if (stanza.is('message')  && stanza.getChild('x')  && stanza.getChild('x').attrs.xmlns === 'jabber:x:conference'){
      const xElement = stanza.getChild('x');
      const jid = xElement.attrs.jid;

      const parts = jid.split('@');
      const jid_Ineed =parts[0]
      console.log(`\n NOTIFICATION >>> You have been invated and accepted to be part of ${jid_Ineed}`);
      st = Func.acceptInvate(username, jid_Ineed)
      st2 = Func.joinRoom(jid_Ineed,username)
      xmpp.send(st);
      sleep(2000);
      xmpp.send(st2);

    }else if(stanza.is('message') && stanza.attrs.type === 'groupchat'){
      const from = stanza.attrs.from;
      const parts = from.split('@');
      const group_Ineed =parts[0];
      const partN = from.split('/');
      const person_Ineed =partN[1];
      const body = stanza.getChildText('body');
      
      if (body !== null){
        if( person_Ineed !== username){
          console.log(`\n NOTIFICATION >>> Message from ${person_Ineed} in ${group_Ineed} \n\t\t content: ${body}`);
        }
        const messageObject = {
          group: group_Ineed,
          person: person_Ineed,
          body: body
        };
        GM.push(messageObject);
      }
      
    }
      
    });

      xmpp.on('online', async (address) => {
          const online_stanza = xml('presence', { type: 'online' });
          xmpp.send(online_stanza);

      });

      // INSTANCE 
        xmppInstance  = xmpp;
        using_user = username;
        sleep(2000);
        console.log(`\n--- Bienvenida ${username} ---`);
        
        xmpp.on('online', () => {
            console.log('XMPP connection online');
            xmpp.send(Func.my_presence(using_user))
            Func_menu();
          });
    });
});
}

function closeConnection() {
    if (xmppInstance) {
      xmppInstance.stop();
      console.log("Disconnected from XMPP server.\n");
    } else {
      console.log("No XMPP connection to close.");
    }
    sleep(2000);
    mainMenu()
}


// FUNCTIONS ASK 
async function rooster_list() {
  st = Func.rooster(using_user)
  xmppInstance.send(st);
}

function privateChat(){
  rl.question("Ingresa usuario a contactar: ", async (person) => {
    rl.question("Ingresa mensaje : ", async (message) => {
      st = Func.message_one_one(using_user,person,message);
      xmppInstance.send(st);
      private_menu();
      });
  });
}

function friend_request() {
    const user = using_user;
    rl.question("Ingresa el nombre de la persona: ", (person) => {
        st = Func.subscribe(user, person);
        xmppInstance.send(st);
        sleep(2000);
        Func_menu();
    });

}

function update_presence(show) {
    const user = using_user;
    rl.question("Ingresa mensaje para status : ", (status) => {
        st = Func.presence_message(user, show, status);
        xmppInstance.send(st);
        Func_menu();
    });
}

function update_presence_type() {
    const user = using_user;
    st = Func.presence(user, "unavailable");
    xmppInstance.send(st);

}

function eliminate_friends(){
  for (const item of list) {
    const nombre = item.name;
    const part = nombre.split('@');
    const part_Ineed =part[0]

    Func.declineSubscription(using_user,part_Ineed)
}
}

function new_group(){
  rl.question("Ingresa nombre para el grupo: ", (room) => {
    roomN = room;
    st = Func.create_group(room,using_user);
    xmppInstance.send(st);
    Group_menu();
});
}


function group_invite(){
  rl.question("Ingresa nombre del grupo: ", (room) => {
    rl.question("Ingresa nombre de la persona: ", (person) => {
      st1 = Func.invite_group(room, person);
      xmppInstance.send(st1);
      st2 = Func.not_invateGroup(room,person)
      xmppInstance.send(st2);
      Group_menu();
  })
});
}

function group(){
  rl.question("Ingrese el grupo: ", async (room) => {
    rl.question("Ingresa mensaje : ", async (message) => {
      st = Func.message_group(using_user,room,message);
      await xmppInstance.send(st);
      Group_menu();
      });
  });
}

function showGM(){
  for (const message of GM) {
    console.log(`From Grupo: ${message.group}, From: ${message.person}: ${message.body}`);
    console.log("------------------------------------");
    console.log("\n");
  }

  Group_menu();
}

function showPM(){
  console.log("\n");
  for (const message of PM) {
    from = message.person
    id = message.id
    console.log(`From: ${message.person}: ${message.body}`);
    console.log("------------------------------------");
    console.log("\n");
    read = Func.mark_read_one_one(using_user,from,id);
    xmppInstance.send(read);
  }
  private_menu();
}
function Choice_FuncMenu(choice,) {
    switch (choice) {
        case '1':
            console.log("\nSeleccionaste Mostrar Contactos");
            rooster_list();

            break;
        case '2':
            console.log("\nSeleccionaste Agregar Amigos");
            friend_request()
            break;
        case '3':
            console.log("\nSeleccionaste Ver detalles de un contacto");
            break;
        case '4':
            console.log("\nSeleccionaste Chat Privado");
            private_menu()
            break;
        case '5':
            console.log("\nSeleccionaste Chat Grupal");
            Group_menu();
            break;
        case '6':
            console.log("\nSeleccionaste Definir Presencia");
            Pres_menu();
            break;
        case '7':
            console.log("\nSeleccionaste Enviar Archivos");
            break;
        case '8':
            update_presence_type();
            console.log("\nCerrando sesión...");
            closeConnection();
        
            break;
        case '9':
            console.log("\nEliminar Cuenta");
            delete_user();
            break;
        default:
            console.log("Opcion invalida, intenta de nuevo");
            Func_menu();
            break;
    }
}

function Choice_presence(choice) {
    switch (choice) {
        case '1':
            console.log("Seleccionaste Ocupado");
            showing = "dnd";
            update_presence(showing);
            break;
        case '2':
            console.log("Seleccionaste No disponible");
            showing = "xa";
            update_presence(showing);
            break;
        case '3':
            console.log("Seleccionaste Ausente");
            showing = "away";
            update_presence(showing);
            break;
        case '4':
            console.log("Seleccionaste Online");
            showing = "available";
            update_presence(showing);
            break;
        default:
            console.log("Opcion invalida, intenta de nuevo");
            Choice_presence();
            break;
    }
}

function Choice_privateChat(choice) {
  switch (choice) {
      case '1':
          console.log("Enviar mensaje");
          privateChat();
          break;
      case '2':
          console.log("Ver mensajes");
          showPM();
          break;
      case '3':
          console.log("Regresar al menu principal");
          Func_menu();
          break;
      default:
          console.log("Opcion invalida, intenta de nuevo");
          Choice_privateChat();
          break;
  }
}

function Choice_group(choice){
  switch (choice) {
    case '1':
        console.log("\nSeleccionaste Crear grupo");
        new_group();
        break;
    case '2':
        console.log("\nSeleccionaste Ver mensajes");
        showGM();
        break;
    case '3':
        console.log("\nSeleccionaste Invitar a un Amigo");
        group_invite();
        break;
    case '4':
        console.log("\nSeleccionaste Enviar Mnesaje");
        group();
        break;
    case '5':
        console.log("\nRegresar menu anterior");
        Func_menu();
        break;
    default:
      console.log("Opcion invalida, intenta de nuevo");
      Group_menu();
      break;
    }
}


function mainMenu() {
    Main_menu();
    rl.question("Ingresa tu elección: ", function(choice) {
      switch (choice) {
        case '1':
          console.log("\nSeleccionaste Ingresar.");
          processLogin();
          break;
        case '2':
          console.log("\nSeleccionaste Registrar.");
          processRegistration();
          break;
        case '3':
          console.log("Saliendo...");
          rl.close();
          break;
        default:
          console.log("Opción inválida. Por favor, selecciona una opción válida.");
          mainMenu();
          break;
      }
    });
}
  
mainMenu(); // Start the main menu loop
  
  