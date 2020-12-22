var socket = io();

socket.on('disconnect', function() {
    alert("Hemos perdido conexión con el servidor");
});

socket.on('connect', function() {
    alert("Conectado a la sala de chat");
});

socket.on('nuevoMensaje', function(data) {
    $(".list-group").append(`<li class="list-group-item">${ data.nombre } dice: ${ data.mensaje }</li>`);
});

socket.on('usuarioDesconectado', function(data) {
    alert(data.message);
});

socket.on('usuarioConectado', function(data) {
    alert(data.message);
})

$("#btnenviar").click(function() {
    var nombre = $("#txtnombre").val();
    var mensaje = $("#txtmensaje").val();

    socket.emit('enviarMensaje', {
        nombre: nombre,
        mensaje: mensaje
    }, (res) => {
        if (res.ok) {
            $(".list-group").append(`<li class="list-group-item">${ nombre } dice: ${ mensaje }</li>`);

            $("#txtnombre").val("");
            $("#txtmensaje").val("");
        }
    });
});