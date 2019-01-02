//var socket = io.connect('http://localhost:3600');

window.onload = main;

var socket;

var map, context;
var player, players = [];
var foods = [];
var mouse, mouseBis, mouseIsMoving = false;
var frameLoop;



var distMouse;



function main() {
	
	socket = io.connect('http://localhost:3600');
	
	map = createMap();
	context = map.getContext("2d");
	
	/* for(let i = 0; i < 100; i++){
		foods[i] = new Circle();
	} */
	
	socket.on('newGame', function(data){
		players = data.players;
		for(let i = 0; i < players.length; i++)
			if(players[i].id === data.id)
					player = new Player(players[i].id, players[i].x, players[i].y);
		for(let i = 0; i < data.foods.length; i++)
			foods[i] = new Circle(data.foods[i].x, data.foods[i].y);
	});
	
	socket.on('newPlayer', function(data){
		players.push(data.player);
	});
	
	socket.on('updatePosition', function(data){
		for(let i = 0; i < players.length; i++){
			if(players[i].id === data.id){
				players[i].x = data.x;
				players[i].y = data.y;
				break;
			}
		}
	});

	//player = new Player("anas");
	
	window.requestAnimationFrame(onFrame);
	
}



function onFrame(){
	frameLoop = window.requestAnimationFrame(onFrame);
	//if(player.inMoving)
	
	if(player !== undefined){
		
		context.clearRect(0, 0, w, h);
		// clearArc(player.position.x, player.position.y, player.radius+1);
		// for(let i = 0; i < players.length; i++){
			// if(players[i].id !== player.name)
				// clearArc(players[i].x, players[i].y, players[i].radius+1);
		// }
		// context.translate(w / 2 - player.position.x, h / 2 - player.position.y);

		player.inMoving = false;
		player.move();
		
		
		for(let i = 0; i < foods.length; i++){
			if(player.distanceToCircle(foods[i]) < player.getRadius - 2){
				player.eatCircle(foods[i]);
				clearArc(foods[i].position.x, foods[i].position.y, foods[i].radius+1);
				foods.splice(i, 1);
			}
		}
		
		if(player.inMoving){
			socket.emit('playerMove', {
				id : player.name,
				x : player.position.x,
				y : player.position.y
			});
		}
		
		
		drawGrid();
		
		for(let i = 0; i < foods.length; i++){
			drawCircle(foods[i]);
		}
		
		for(let i = 0; i < players.length; i++){
			if(players[i].id !== player.name)
				drawEnemy(players[i]);
		}
		
		drawPlayer(player);
	}
}



