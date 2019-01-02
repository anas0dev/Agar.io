
//var ToolBox = require('./toolBox');

class Circle {
	
	constructor (x, y){
		this.color = randomColorHex();
		this.radius = 10;
		this.mass = this.calculateMass();
		this.position = new Vector(x ,y);
	}
	
	get getRadius(){
		return this.radius;
	}
	set setRadius(newRadius){
		this.radius = newRadius;
	}
	
	get getColor(){
		return this.color;
	}
	set setColor(newColor){
		this.color = newColor;
	}
	
	get getMass(){
		return this.mass;
	}
	set setMass(newMass){
		this.mass = newMass;
	}
	
	distanceToCircle(circle){
		return this.position.distanceToVector(circle.position);	
	}
	
	calculateMass(){
		return Math.PI * this.radius * this.radius;
	}
}

//module.exports = Circle;