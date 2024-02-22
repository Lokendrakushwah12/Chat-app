const socket = io('http://localhost:8000/');

const send = document.querySelector('#send-button');
const messageInput = document.querySelector('#message-input');
const messages = document.querySelector('.messages');

const name = prompt('What is your name?');
socket.emit('join-chat', name);

// Add event listener to send button
send.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('send-message', message);
        messageInput.value = ''; // Clear input field after sending message
    }
});

// Receive new messages from the server
socket.on('new-message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messages.appendChild(messageElement);
});
