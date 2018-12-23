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



var anas, mouse;
var map;
var context;

function main() {

	map = createMap();
	context = map.getContext("2d");
	

	anas = new joueur("anas", context);
	window.addEventListener("mousemove", function(e){
		mouse = new Vector(e.clientX, e.clientY);
		clearArc(anas.position.x, anas.position.y, anas.size+1);

		mouse.sub(anas.position);
		mouse.setLength(5);
		anas.position.add(mouse.div(anas.vitesse));
		//anas.draw();
	});
	//anas.draw();
	window.requestAnimationFrame(onFrame);
	
}

function onFrame(){
	frameLoop = window.requestAnimationFrame(onFrame);
	anas.draw();
}


