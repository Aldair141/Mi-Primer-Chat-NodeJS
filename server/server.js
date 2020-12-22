const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('https');

const app = express();
let server = http.createServer(app);
let io = socketIO(server);

const rutaPublic = path.resolve(__dirname, '../public');
const puerto = process.env.PORT || 3000;

app.use(express.static(rutaPublic));

io.on('connection', (client) => {
    client.broadcast.emit('usuarioConectado', {
        message: 'Un usuario se conectó a la sala'
    });

    client.on('enviarMensaje', (data, callback) => {
        //Emitir mensaje
        client.broadcast.emit('nuevoMensaje', data);

        callback({
            ok: true
        });
    });

    client.on('disconnect', () => {
        client.broadcast.emit('usuarioDesconectado', {
            message: 'Un usuario se desconectó de la sala'
        });
    });
});

server.listen(puerto, (err) => {
    if (err) throw err;
    console.log(`Escuchando el puerto ${ puerto }`);
});