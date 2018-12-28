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



var anas, mouse = null;
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
	

	anas = new joueur("anas", context);
	/* window.addEventListener("mousemove", function(e){
		mouse = new Vector(e.clientX, e.clientY);
		clearArc(anas.position.x, anas.position.y, anas.size+1);

		mouse.sub(anas.position);
		mouse.setLength(5);
		anas.position.add(mouse.div(anas.vitesse));
		//anas.draw();
	}); */
	//anas.draw();
	window.requestAnimationFrame(onFrame);
	
}
// var a = 1;
function onFrame(){
	let mouseTmp = mouse;
	frameLoop = window.requestAnimationFrame(onFrame);
	drawGrid();
	clearArc(anas.position.x, anas.position.y, anas.size);
	if(mouse.x !== anas.position.x && mouse.y !== anas.position.y){
		if(moving){
			mouseTmp.sub(anas.position);
			anas.position.add(mouseTmp.div(anas.vitesse).round());
			moving = false;
			/* if(a==60){
				log(mouseTmp);
				a=1;
			}
			a++; */
		}else{
			anas.position.add(mouseTmp);
			//log("2");
		}
	}
	
	anas.draw();
}

function drawGrid(){
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
}


