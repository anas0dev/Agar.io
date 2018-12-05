window.onload = main;

var w = window.innerWidth;
var h = window.innerHeight;

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
		this.vitesse = 2;
		this.positionX = random(1, w);
		this.positionY = random(1, h);
		this.context = context;
		//draw();
	}

	draw(){
		this.context.beginPath();
		this.context.fillStyle = this.color;
		this.context.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI);
		this.context.fill();
	}

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

function main() {
	
	var map = createMap();
	var context = map.getContext("2d");

	var anas = new joueur("anas", context);
	anas.draw();

	
}