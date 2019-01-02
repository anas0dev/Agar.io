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

	//player = new Player("anas");
	if(player == undefined)
	window.requestAnimationFrame(onFrame);
	
}

function onFrame(){
	frameLoop = window.requestAnimationFrame(onFrame);
	//if(player.inMoving)
	clearArc(player.position.x, player.position.y, player.radius+1);
	//context.translate(w / 2 - player.position.x, h / 2 - player.position.y);

	drawGrid();
	
	for(let i = 0; i < foods.length; i++){
		drawCircle(foods[i]);
	}
	//player.inMoving = false;
	player.move();
	
	for(let i = 0; i < foods.length; i++){
		if(player.distanceToCircle(foods[i]) < player.getRadius - 2){
			player.eatCircle(foods[i]);
			clearArc(foods[i].position.x, foods[i].position.y, foods[i].radius+1);
			foods.splice(i, 1);
		}
	}
	drawPlayer(player);
}

