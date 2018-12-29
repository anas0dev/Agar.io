window.onload = main;

var w = window.innerWidth;
var h = window.innerHeight;

var frameLoop;


function createMap(){
	let map = document.createElement("canvas");
	map.width = w;
	map.height = h;
	document.body.appendChild(map);
	return map;
}



var player, mouse;
var foods = [];
var map;
var context;
var moving = false;
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
	drawGrid();
	for(let i = 0; i < foods.length; i++){
		drawCircle(foods[i]);
	}
	clearArc(player.position.x, player.position.y, player.radius+1);

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

