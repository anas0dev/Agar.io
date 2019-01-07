
window.onload = main;

var socket;

var map, context;

var player;

var foods = [], players = [];

var mouse, mouseBis;

var frameLoop;

var mouseIsMoving = false;
var gameOver = false;


var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame 
							|| window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


function main() {
	
	socket = io.connect('http://localhost:3600');
	
	map = createMap();
	context = map.getContext("2d");
	
	socket.on('newGame', function(data){
		players = data.players;
		for(let i = 0; i < players.length; i++)
			if(players[i].id === data.id)
				player = new Player(players[i].id, players[i].color, players[i].x, players[i].y);
		for(let i = 0; i < data.foods.length; i++)
			foods[i] = new Circle(data.foods[i].id, data.foods[i].x, data.foods[i].y);
	});
	
	socket.on('newPlayer', function(data){
		players.push(data.player);
		for(let i = 0; i < data.foods.length; i++)
			foods[i] = new Circle(data.foods[i].id, data.foods[i].x, data.foods[i].y);
	});
	
	socket.on('updatePlayers', function(data){
		for(let i = 0; i < players.length; i++){
			if(players[i].id === data.player.id){
				players[i].x = data.player.x;
				players[i].y = data.player.y;
				players[i].mass = data.player.mass;
				players[i].radius = data.player.radius;
				break;
			}
		}
	});
	
	socket.on('updateFoods', function(data){
		if(data.player.id !== player.id){
			for(let i = 0; i < foods.length; i++){
				if(foods[i].id === data.food){
					foods.splice(i, 1);
					break;
				}
			}
		}
	});
	
	socket.on('playerDied', function(data){
		if(data.idPlayerEating !== player.id){
			for(let i = 0; i < players.length; i++){
				if(players[i].id === data.idPlayerDied){
					players.splice(i, 1);
					break;
				}
			}
		}
	});
	
	socket.on('gameOver', function(){
		gameOver = true;
		//cancelAnimationFrame(frameLoop);
	});
	
	socket.on('playerDisconnect', function(data){
		for(let i = 0; i < players.length; i++){
			if(players[i].id === data.player){
				players.splice(i, 1);
				break;
			}
		}
	});

	frameLoop = requestAnimationFrame(onFrame);
}


function onFrame(){
	frameLoop = requestAnimationFrame(onFrame);

	if(player !== undefined){
		context.clearRect(0, 0, global.mapWidth, global.mapHeight);
		player.inMoving = false;
		
		if(!gameOver){
			player.move();
			for(let i = 0; i < foods.length; i++){
				if(player.distanceToCircle(foods[i]) < player.getRadius - 2){
					player.eatCircle(foods[i]);	
					socket.emit('eatCircle', {
						player : player.id,
						playerMass : player.mass,
						playerRadius : player.radius,
						playerX : player.position.x,
						playerY : player.position.y,
						food : foods[i]
					});
					foods.splice(i, 1);
				}
			}
			
			for(let i = 0; i < players.length; i++){
				if(players[i].id !== player.id){
					if(player.position.distanceToVector(new Vector(players[i].x, players[i].y)) < player.radius - players[i].radius * 0.1 
						&& player.mass > players[i].mass){
						player.eatPlayer(players[i]);
						
						socket.emit('eatPlayer', {
							playerDied : players[i].id,
							playerMass : player.mass,
							playerRadius : player.radius,
							playerX : player.position.x,
							playerY : player.position.y
						});
						
						players.splice(i, 1);
					}
				}
			}

			if(player.inMoving){
				socket.emit('playerMove', {
					id : player.id,
					x : player.position.x,
					y : player.position.y
				});
			}
		}
		
		drawGrid();
		
		for(let i = 0; i < foods.length; i++){
			drawCircle(foods[i]);
		}
		
		for(let i = 0; i < players.length; i++){
			if(players[i].id !== player.id)
				drawEnemy(players[i]);
		}
		
		if(!gameOver)
			drawPlayer(player);
		else
			drawGameOver();
	}
}



