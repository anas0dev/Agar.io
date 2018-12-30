window.onload = main;

var map, context;
var player, players = [];
var foods = [];
var mouse, mouseBis, mouseIsMoving = false;
var frameLoop;




var distMouse;



function main() {

	map = createMap();
	context = map.getContext("2d");
	
	for(let i = 0; i < 100; i++){
		foods[i] = new Circle();
	}

	player = new Joueur("anas");

	window.requestAnimationFrame(onFrame);
	
}

function onFrame(){
	frameLoop = window.requestAnimationFrame(onFrame);
	
	clearArc(player.position.x, player.position.y, player.radius+1);
	//context.translate(w / 2 - player.position.x, h / 2 - player.position.y);

	drawGrid();
	
	for(let i = 0; i < foods.length; i++){
		drawCircle(foods[i]);
	}
	
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

