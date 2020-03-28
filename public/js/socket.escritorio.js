//Comando para establecer la conexión
var socket = io();

var label = $('small');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio }, function(respuesta) {
        if (respuesta === 'No hay tickets') {
            label.text(respuesta);
            alert(respuesta);
            return;
        }
        label.text("Ticket " + respuesta.numero);
    });

});