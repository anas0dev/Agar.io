
var w = window.innerWidth;
var h = window.innerHeight;


function log(message){
	console.log(message);
}

function randomColorHex(){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

function random(min, max){
	return Math.floor((Math.random() * (max - min)) + min);
}

// J'ai trouvé cette fonction sur :  http://stackoverflow.com/a/12895687/1250044

function clearArc(x, y, radius) {
  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
  context.restore();
}

document.addEventListener("mousemove", function(e){
	mouse = new Vector(e.clientX, e.clientY);
	mouseBis = mouse.copy();
	/*mouse.x = e.clientX;
	mouse.y = e.clientY;*/
	mouseIsMoving = true;
});
