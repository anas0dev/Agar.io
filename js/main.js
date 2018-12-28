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

document.addEventListener("mousemove", function(e){
	mouse = new Vector(e.clientX, e.clientY);
	moving = true;
});

function main() {

	map = createMap();
	context = map.getContext("2d");
	
	for(let i = 0; i < 100; i++){
		foods[i] = new Cercle();
	}

	player = new Joueur("anas");
	/* window.addEventListener("mousemove", function(e){
		mouse = new Vector(e.clientX, e.clientY);
		clearArc(player.position.x, player.position.y, player.size+1);

		mouse.sub(player.position);
		mouse.setLength(5);
		player.position.add(mouse.div(player.vitesse));
		//player.draw();
	}); */
	//player.draw();
	window.requestAnimationFrame(onFrame);
	
}
// var a = 1;
function onFrame(){
	//let mouseTmp = mouse;
	frameLoop = window.requestAnimationFrame(onFrame);
	drawGrid();
	for(let i = 0; i < foods.length; i++){
		drawCercle(foods[i]);
	}
	clearArc(player.position.x, player.position.y, player.size);
	/* if(mouse !== undefined && mouse !== player.position){
		if(moving){
			mouseTmp.sub(player.position);
			player.position.add(mouseTmp.div(player.vitesse).round());
			moving = false;
			
		}else{
			player.position.add(mouseTmp);
			//log("2");
		}
	} */
	player.move();
	
	for(let i = 0; i < foods.length; i++){
		log(player.distanceToCercle(foods[i]));
		if(player.distanceToCercle(foods[i]) < player.getSize + foods[i].getSize){
			player.eatCercle(foods[i]);
			foods.splice(i, 1);
		}
	}
	// hits(player);
	drawPlayer(player);
}

/* function drawGrid(){
	// let nombreGridWidth = w / 10;
	// let nombreGridHeight = h / 10;
	
	context.lineWidth = 1;
	context.strokeStyle = "#dddddd";
	context.globalAlpha = 0.1;
	context.beginPath();
	
	for(let i=50; i < w; i += 50){
		context.moveTo(i, 0);
		context.lineTo(i, h);
	}
	
	for(let i=50; i < h; i += 50){
		context.moveTo(0, i);
		context.lineTo(w, i);
	}
	
	context.stroke();
	context.globalAlpha = 1;
} */


