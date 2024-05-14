//Importar os módulos FRAMEWORKS
const express = require('express');

const {Socket} = require('socket.io');

const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.static('public'));

//Rota para a página principal
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

//Evento para quando o usuário conectar ao servidor
io.on('connection', (socket) => {
    console.log('Usuário conectado')

    //Evento para quando envia uma mensagem
    socket.on('chat message', (data) => io.emit('chat message', data));

    //Evento para quando o usuário desconectar
    socket.on('disconnect', () => console.log('Usuário desconectado'));
});

const porta = 3000;

//Iniciar o servidor
http.listen(`${porta}`, () => {
    console.log(`Servidor rodando - Link http://localhost:${porta}`)
})