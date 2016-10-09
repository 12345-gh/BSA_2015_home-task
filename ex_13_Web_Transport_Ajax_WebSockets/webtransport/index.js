var express = require('express');
var bodyPraser = require('body-parser');
var socketio = require('socket.io');

var app = express();
var server = app.listen(5555);
var io = socketio.listen(server);

var staticDir = __dirname + '/public/';
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded( {extended: false} ));

var messages = [];
var roomMessage = {};

app.get('/', function (req, res){
	res.sendFile(staticDir + 'index.html')
});

app.get('/jquery', function (req, res){
	res.sendFile(staticDir + 'index_jquery.html')
});

app.get('/socket', function (req, res){
	res.sendFile(staticDir + 'index_socket.html')
});

app.get('/socketroom', function (req, res){
	res.sendFile(staticDir + 'index_socket_room.html')
});

app.get('/messages', function (req,res){
	res.json(messages);
});

app.post('/messages', function (req, res){
	var message = req.body;
	messages.push(message);
	res.json(message);
});

io.on('connection', function(socket){
	
	console.log('Client connected');

	socket.on('disconnected', function(){
		console.log('Client disconnected');
	});

	socket.on('join room', function(room) {
		socket.join(room);
		if (!roomMessage[room]) {
			roomMessage[room] = [];
		}
		socket.emit('room history', roomMessage[room]);
	});

	socket.on('chat message', function(msg) {
		messages.push(msg);
		io.emit('chat message', msg);
	});

	socket.on('room message', function(msg) {
		var room = socket.rooms[1];
		roomMessage[room].push(msg);
		io.sockets.in(room).emit('room message', msg);
	});

	socket.emit('chat history', messages);
});