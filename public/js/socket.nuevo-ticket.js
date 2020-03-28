//Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//on sirve para escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', function(ticketActual) {
    label.text(ticketActual.actual);
});

$('button').on('click', function() {

    socket.emit('siguienteTicket', {
            Ticket: 'Yoshua',
        },
        function(siguienteTicket) {
            label.text(siguienteTicket);
        });
});

//emit sirven para enviar información
socket.emit('enviarMensaje', {
        usuario: 'Yoshua',
        mensaje: 'Hola Mundo'
    },
    function(resp) {
        console.log('respuesta server: ', resp);
    });