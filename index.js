const express = require('express');
const app = express();
const server = require('http').createServer(app); // Create an HTTP server
const io = require('socket.io')(server); // Create a new instance of Socket.io

app.use(express.static('public')); // Serve static files from the 'public' directory

io.on('connection', (socket)=>{ // Listen for incoming connections
    console.log('a user connected');

    socket.on('join-chat', ( name)=>{ // Listen for 'join-chat' events
        // socket.join(chatId);
        console.log(`${name} joined chat`);
    });

    socket.on('send-message', (chatId, message)=>{ // Listen for 'send-message' events
        io.to(chatId).emit('new-message', message); // Emit a 'new-message' event to the chat room
    });

    socket.on('disconnect', (name)=>{ // Listen for 'disconnect' events
        console.log(`${name} disconnected`);
    });
});

server.listen(8000, ()=>{
    console.log('listening on port 8000');
})

