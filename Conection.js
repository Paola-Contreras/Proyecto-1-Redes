/* This document reprecents the conection with the client */

// Imports modulos necesarios 
const { client, xml } = require("@xmpp/client");
const debug = require("@xmpp/debug");
const readline = require('readline');

// Desactivacion de certificados SSL/TLS 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'


// Variables a utilizar
const user = "gabycon20213";

// Conexion al servidor 
const xmpp = client({
    service: "xmpp://alumchat.xyz:5222", // Puerto y protocolo
    domain: "alumchat.xyz", // Dominio del servidor XMPP
    username: user, // Username
    password: "12345", // Contraseña 

    // permite que nodejs acepte o no conexiones
    tls: {
        rejectUnauthorized: true,
    }

});

module.exports = {
    xmpp,
    user
  };