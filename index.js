const express = require('express');
const socket = require('socket.io');

//App setup
const app = express();
const server = app.listen(4000, () => {
    console.log('listening on port 4000')
});

//Static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection',(socket) => {
    console.log('Made socket connection',socket.id);

    socket.on("chat",(data) => {
        io.sockets.emit('chat',data);
    });

    //Handle typing event
    socket.on('typing',(data) => {
        socket.broadcast.emit('typing',data);
    });
}); 

