const { io } = require('../server');

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