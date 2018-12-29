

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
	moving = true;
});

/* function hit(r1, r2) { // hit test box
     return (((r1.x + r1.w >= r2.x) && (r1.x <= r2.x + r2.w)) && ((r1.y
				+ r1.h >= r2.y) && (r1.y <= r2.y + r2.h)));
}

function hits(test) { // hittest against multiple boxes
     for(let food of foods) if(hit(test, food)) return true;
     return false;
} */

