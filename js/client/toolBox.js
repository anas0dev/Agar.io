
var w = window.innerWidth;
var h = window.innerHeight;
var w = h = 600;


var log = function (message){
	console.log(message);
}

var randomColorHex = function (){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

function random(min, max){
	return Math.floor((Math.random() * (max - min)) + min);
}

// J'ai trouvé cette fonction sur :  http://stackoverflow.com/a/12895687/1250044



document.addEventListener("mousemove", function(e){
	if(!gameOver){
		mouse = new Vector(player.position.x - w / 2 + e.clientX, player.position.y - h / 2 + e.clientY);
		mouseBis = mouse.copy();
		mouseIsMoving = true;
	}else{
		mouse = new Vector(e.clientX, e.clientY);
		mouseBis = mouse.copy();
	}
});


