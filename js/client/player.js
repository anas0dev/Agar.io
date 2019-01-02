
//var Circle = require('./circle');

class Player extends Circle {

	constructor (name , x, y){
		super();
		this.name = name;

		this.radius = 30;
		this.vitesse = 70;
		this.position = new Vector(x, y);
		this.inMoving = false;
	}

	
	get getName(){
		return this.name;
	}
	set setName(newName){
		this.name = newName;
	}
	


	/* get getRadius(){
		return this.radius;
	}
	set setRadius(newRadius){
		this.radius = newRadius;
	} */

	get getVitesse(){
		return this.vitesse;
	}
	set setVitesse(newVitesse){
		this.vitesse = newVitesse;
	}
	
	/*generatePosition(){
		var newPosition = new Vector(random(1, w), random(1, h));
		for(let i = 0; i < players.length; i++){
			if(this.distanceToCircle(players[i]) < this.radius + players[i].radius + 100){
				newPosition.setVectorXY(random(1, w), random(1, h));
				i = -1;
			}
		}
	}*/
	
	
	
	eatCircle(circle) {
		
		let newMass = this.calculateMass() + circle.getMass;
		this.mass = newMass;
		this.radius = Math.sqrt(newMass / Math.PI);
		
		
		if(this.position.x - this.radius < -10)
			this.position.x += -(this.position.x - this.radius) - 10;
		if(this.position.y - this.radius < -10)
			this.position.y += -(this.position.y - this.radius) - 10;
		if(this.position.x + this.radius > w+10)
			this.position.x += -(this.position.x + this.radius) + w+10;
		if(this.position.y + this.radius > h+10)
			this.position.y += -(this.position.y + this.radius) + h+10;
		
	}
	
	move(){
		var copyThis = this.position.copy();
		if(mouse !== undefined /*&& mouse.greaterOrEqualTo(copyThis.add(new Vector(5, 5))) 
			/*&& mouse.greaterOrEqualTo(copyThis.sub(new Vector(10, 10)))*/ ){
			if(mouse.y === player.position.y || mouse.x === player.position.x)
				return;
			var nextX = this.position.x + ((mouse.x - this.position.x) / this.vitesse);
			var nextY = this.position.y + ((mouse.y - this.position.y) / this.vitesse);
			if(nextX - this.radius <= -10 || nextX + this.radius >= w+10){
				if(nextY - this.radius <= -10 || nextY + this.radius >= h+10)
					return;
				this.position.y = nextY;
				this.inMoving = true;
				return;
			}
			
			if(nextY - this.radius <= -10 || nextY + this.radius >= h+10){
				if(nextX - this.radius <= -10 || nextX + this.radius >= w+10)
					return;
				this.position.x = nextX;
				this.inMoving = true;
				return;
			}
			
			
			mouseBis.sub(this.position);
			this.position.add(mouseBis.div(this.vitesse)/* .round() */);
			mouseBis.setVector(mouse);
			this.inMoving = true;
			
		}
	}

}

//module.exports.Circle = Circle;
//module.exports = Player;
