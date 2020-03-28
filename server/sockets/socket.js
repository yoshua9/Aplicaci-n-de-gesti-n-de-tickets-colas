const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (mensaje, callback) => {

        let siguiente = ticketControl.siguiente();

        if (mensaje) {
            callback(siguiente);
            console.log(siguiente, mensaje);

        }
    });

    //Enviar un evento que lance el estado actual de los tickets
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        // actualizar y notificar los cambios en los 4 ultimos ticket en la pantalla publica
        client.broadcast.emit('estadoActual', {
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        });

        callback(atenderTicket);

    });

});