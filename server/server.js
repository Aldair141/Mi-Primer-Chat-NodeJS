const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
let server = http.createServer(app);

const rutaPublic = path.resolve(__dirname, '../public');
const puerto = process.env.PORT || 3000;

app.use(express.static(rutaPublic));

module.exports.io = socketIO(server);

require('./sockets/socket');

server.listen(puerto, (err) => {
    if (err) throw err;
    console.log(`Escuchando el puerto ${ puerto }`);
});