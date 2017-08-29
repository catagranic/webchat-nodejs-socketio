const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hello-world', function(req,res) {
    res.status(200).send(`Hello world from path!`);
});

var messages = [{
    id: 1,
    text: 'Welcome to my private chat',
    nickname: 'Catuga'
}];

io.on('connection', function(socket){
    console.log('The node\'s IP: ' + socket.handshake.address + 'has connected.');

    socket.emit('messages', messages);

    socket.on('add-message',function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });

});

server.listen(6677,function() {
    console.log('Working server @ http://localhost:6677');
});

