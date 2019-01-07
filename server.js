
var http = require('http');

var express = require('express');
var app = express();

var server = app.listen(3600);

var io = require('socket.io')(server);

var path = require("path");

var toolBox = require('./js/server/toolBox');


app.use(express.static('/'));
app.use('/js/client', express.static(__dirname + '/js/client'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

var maxFood = 1000;		// le maximum de cercle food à cree
var massFood = Math.PI * 100;	// ça masse par defaut

var massNewPlayer = Math.PI * 30 * 30; // la masse par defaut d'un nouveau player

var players = [];		// la liste de tout les players
var playerX, playerY;	// les coordonnees x et y d'un nouveau player

var foods = [];			// la liste des cercle foods
var idFood = 0;			// pour savoir les id utiliser

var data;				// pour mettre les donner à envoyé au client


io.sockets.on('connection', function(socket){
	console.log("Le joueur " + socket.id + " viens de se connecté");
	
	collisionPlayers();
	var player = new Player(socket.id, playerX, playerY);
	players.push(player);
		
	if(players.length === 1){
		initFoods();
		data = new Data(socket.id, foods, players);
		socket.emit('newGame', data);
	}else{
		data = new Data(socket.id, foods, players);
		socket.emit('newGame', data);
		socket.broadcast.emit('newPlayer', {
			player : player,
			foods : foods
		});
	}

	socket.on('playerMove', function(data){
		for(let i = 0; i < players.length; i++){
			if(players[i].id === data.id){
				players[i].x = data.x;
				players[i].y = data.y;
				socket.broadcast.emit('updatePlayers', {
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
				break;
			}
		}

		player.mass = data.playerMass;
		player.radius = data.playerRadius;
		player.x = data.playerX;
		player.y = data.playerY;
		
		socket.broadcast.emit('playerDied', {
			idPlayerDied : playerDied.id,
			idPlayerEating : player.id
		});
		
		socket.broadcast.emit('updatePlayers', {
			player : player
		});
		
		io.to(playerDied.id).emit('gameOver');
		
		players.splice(i, 1);
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


// function generateIdFood(){
	// return idFood++;
// }
/** 
* Crée une instance de Data
*
* @constructor
* @this {Data}
* @param {String} id: un identifiant unique pour chaque Player
* @param {Array} foods: La liste des cercle foods encore sur la map
* @param {Array} players: La liste de tout les players connecte
*/
function Data(id, foods, players){
	this.id = id;
	this.foods = foods;
	this.players = players;
}
/** 
* Crée une instance de Food
*
* @constructor
* @this {Food}
* @param {number} x: La position x du centre du cercle food
* @param {number} y: La position y du centre du cercle food
*/
function Food(x, y){
	this.id = idFood++;
	this.x = x;
	this.y = y;
}
/** 
* Crée une instance de Player
*
* @constructor
* @this {Player}
* @param {String} id: un identifiant unique pour chaque Player
* @param {number} x: La position x du centre du cercle Player
* @param {number} y: La position y du centre du cercle Player
*/
function Player(id, x, y){
	this.id = id;
	this.radius = 30;
	this.x = x;
	this.y = y;
	this.mass = massNewPlayer;
	this.speed = 50;
	this.color = toolBox.randomColorHex();
}

/**
* @method Cette methode initialise la liste foods
*/
function initFoods(){
	for(let i = 0; i < maxFood; i++){
		foods[i] = new Food(toolBox.random(10, 3990), toolBox.random(10, 3990));
	}
}
/**
* @method Cette methode initialise les variable playerX et playerY avec des valeur 
*			valide (sans collision avec les autre player)
*/
function collisionPlayers(){
	var boucle = true;
	while(boucle){
		boucle = false;
		playerX = toolBox.random(100, 3950);
		playerY = toolBox.random(100, 3950);
		for(let i = 0; i < players.length && players.length > 0; i++){
			if(playerX >= players[i].playerX - 100 && playerX <= players[i].playerX + 100
				&& playerY >= players[i].playerY - 100 && playerY <= players[i].playerY + 100){
				boucle = true;
				break;
			}
		}
	}
}

 