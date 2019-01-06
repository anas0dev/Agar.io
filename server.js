
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
var x, y;
var foods = [];

var idFood = 0;

var data, dataForAll;


function newGame(){
	for(let i = 0; i < maxFood; i++){
		foods[i] = new Circle(random(10, 3990), random(10, 3990));
		//console.log(foods[i].id);
	}
}

function collisionPlayers(){
	var boucle = true;
	while(boucle){
		boucle = false;
		x = random(100, 3950);
		y = random(100, 3950);
		for(let i = 0; i < players.length && players.length > 0; i++){
			if(x >= players[i].x - 100 && x <= players[i].x + 100 && y >= players[i].y - 100 && y <= players[i].y + 100){
				boucle = true;
				break;
			}
		}
	}
}


io.sockets.on('connection', function(socket){
	console.log("Le joueur " + socket.id + " viens de se connecté");
	
	collisionPlayers();
	var player = new Player(socket.id ,x, y);
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
		//console.log(socket.id);
		// var indexPlayer = players.indexOf(player);
		for(let i = 0; i < players.length; i++){
			if(players[i].id === data.id){
				players[i].x = data.x;
				players[i].y = data.y;
				socket.broadcast.emit('updatePlayers', {
					// id : player.id,
					// x : data.x,
					// y : data.y
					player : player
				});
				break;
			}
		}
	});
	
	socket.on('eatCircle', function(data){
		var indexPlayer = players.indexOf(player);
		var indexFood = foods.indexOf(data.food);
		for(let i = 0; i < players.length; i++){
			if(players[i].id === data.player){
				players[i].mass = data.playerMass;
				players[i].radius = data.playerRadius;
				players[i].x = data.playerX;
				players[i].y = data.playerY;

				socket.broadcast.emit('updateFoods', {
					player : player,
					food : data.food.id
				});
				
				foods.splice(indexFood, 1);
				break;
			}
		}
	});
	
	socket.on('eatPlayer', function(data){
		var i;
		for(i = 0; i < players.length; i++){
			if(data.playerDied === players[i].id){
				var playerDied = players[i];
				// idPlayerDied = i;
				break;
			}
		}

		player.mass = data.playerMass;
		player.radius = data.playerRadius;
		player.x = data.playerX;
		player.y = data.playerY;
		console.log(socket.id);
		
		socket.broadcast.emit('playerDied', {
			idPlayerDied : playerDied.id/* players[indexPlayerDied].id */,
			idPlayerEating : player.id
		});
		
		socket.broadcast.emit('updatePlayers', {
			player : player
		});
		
		// io.sockets.socket[playerDied.id].emit('gameOver');
		io.to(playerDied.id).emit('gameOver');
		
		
		players.splice(i, 1);
		console.log(players.length);
	});
	
	
	
	socket.on('disconnect', function(){
		
		socket.broadcast.emit('playerDisconnect', {
			player : player.id
		});
		
		for(let i = 0; i < players.length; i++){
			if(player.id === players[i].id){
				players.splice(i, 1);
			}
		}
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


 