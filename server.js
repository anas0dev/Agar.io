
var http = require('http');

var express = require('express');
var app = express();

var server = app.listen(3600);

var io = require('socket.io')(server);

var path    = require("path");

var global = require('./js/client/global');

//var Player = require('./js/client/player');
//var Circle = require('./js/client/circle');
//var toolBox = require('./js/client/toolBox');


//app.set('port', 3030);
app.use(express.static('/'));
app.use('/js/client', express.static(__dirname + '/js/client'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

var maxFood = 1000;
var massFood = Math.PI * 100;

var massNewPlayer = Math.PI * 30 * 30;

var players = [];
var foods = [];

var idFood = 0;

var data, dataForAll;

/* function connection(socket){
	console.log("Un nouveau joueur viens de se connecté");
	
	if(players.length === 0){
		newGame();
	}
	
	var player = new Player(socket.id);
	players.push(player);
	
	
} */

function newGame(){
	for(let i = 0; i < maxFood; i++){
		foods[i] = new Circle(random(10, 3950), random(10, 3950));
		//console.log(foods[i].id);
	}
}


io.sockets.on('connection', function(socket){
	console.log("Le joueur " + socket.id + " viens de se connecté");
	
	var player = new Player(socket.id ,random(50, 3950), random(50, 3950));
	players.push(player);
	
	
	if(players.length === 1){
		newGame();
		data = new Data(socket.id, foods, players);
		socket.emit('newGame', data);
		console.log('newGame');
	}else{
		data = new Data(socket.id, foods, players);
		socket.emit('newGame', data);
		socket.broadcast.emit('newPlayer', {
			player : player,
			foods : foods
		});
	}

	
	socket.on('playerMove', function(data){
		var indexPlayer = players.indexOf(player);
		players[indexPlayer].x = data.x;
		players[indexPlayer].y = data.y;
		socket.broadcast.emit('updatePlayers', {
			// id : player.id,
			// x : data.x,
			// y : data.y
			player : player
		});
	});
	
	socket.on('eatCircle', function(data){
		var indexPlayer = players.indexOf(player);
		var indexFood = foods.indexOf(data.food);
		players[indexPlayer].mass = data.playerMass;
		players[indexPlayer].radius = data.playerRadius;
		players[indexPlayer].x = data.playerX;
		players[indexPlayer].y = data.playerY;

		socket.broadcast.emit('updateFoods', {
			player : player,
			food : data.food.id
		});
		
		foods.splice(indexFood, 1);
	});
	
	
	
	socket.on('disconnect', function(){
		players.splice(players.indexOf(player), 1);
		console.log("Le joueur " + socket.id + " viens de se déconnecté");
	});
	
	
});




function generateIdFood(){
	return idFood++;
}

function Data(id, foods, players){
	this.id = id;
	this.foods = foods;
	this.players = players;
}

function Circle(x, y){
	this.id = generateIdFood();
	this.x = x;
	this.y = y;
}

function Player(id, x, y){
	this.id = id;
	this.radius = 30;
	this.x = x;
	this.y = y;
	this.mass = massNewPlayer;
	this.vitesse = 50;
	this.color = randomColorHex();
}

function random(min, max){
	return Math.floor((Math.random() * (max - min)) + min);
}

function randomColorHex(){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}


//server.listen(3600);


 