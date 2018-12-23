window.onload = main;

var w = window.innerWidth;
var h = window.innerHeight;

var frameLoop;

class Vector{
	constructor (x, y, length){
		this.x = x;
		this.y = y;
		if(length)
			this.length = length;
		else
			this.length = this.lengthVector();
	}
	
	set setVector(v){
		this.x = v.x;
		this.y = v.y;
		this.length = v.length;
	}
	get getVector(){
		return this;
	}
	
	get getLength(){
		return this.length;
	}
	setLength(length){
		this.length = length;
	}
	
	add(v){
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	
	sub(v){
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	div(n){
		this.x /= n;
		this.y /= n;
		return this;
	}
	
	copy(){
		return new Vector(this.x, this.y);
	}
	
	lengthVector(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	
	
}

class joueur{
	/*name;
	size = 5;
	positionDeDepare = {
		x;
		y;
	}*/

	constructor (name, context){
		this.name = name;
		this.color = randomColorHex();
		this.size = 15;
		this.vitesse = 25;
		this.position = new Vector(random(1, w), random(1, h));
		this.context = context;
		//this.mouse = new MouseEvent("mouse");
		//this.draw();
	}

	draw(){
		this.context.beginPath();
		this.context.fillStyle = this.color;
		this.context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
		this.context.fill();
	}
	
	/*this.addEventListener("mousemove", function(e){
		let mouse = new Vector(e.clientX, e.clientY);
		mouse.sub(this.position);
		mouse.setLength(5);
		this.position.add(mouse);
	});*/

	get getName(){
		return this.name;
	}
	set setName(newName){
		this.name = newName;
	}

	get getSize(){
		return this.size;
	}
	set setSize(newSize){
		this.size = newSize;
	}

	get getVitesse(){
		return this.vitesse;
	}
	set setVitesse(newVitesse){
		this.vitesse = newVitesse;
	}

}

function log(message){
	console.log(message);
}

function randomColorHex(){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

function random(min, max){
	return Math.floor((Math.random() * (max - min)) + min);
}

function createMap(){
	let map = document.createElement("canvas");
	map.width = w;
	map.height = h;
	document.body.appendChild(map);
	return map;
}

var anas;
var map;
var context;

function main() {

	map = createMap();
	context = map.getContext("2d");
	

	anas = new joueur("anas", context);
	window.addEventListener("mousemove", function(e){
		let mouse = new Vector(e.clientX, e.clientY);
	clearArc(context, anas.position.x, anas.position.y, anas.size);

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

function clearArc(context, x, y, radius) {
  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
  context.restore();
}