
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
		//let newRadius = Math.sqrt(newMass / Math.PI);
		this.radius = Math.sqrt(newMass / Math.PI);
		//foods.splice(foods.indexOf(circle), 1);
	}
	
	move(){
		var copyThis = this.position.copy();
		if(mouse !== undefined /*&& mouse.greaterOrEqualTo(copyThis.add(new Vector(5, 5))) 
			/*&& mouse.greaterOrEqualTo(copyThis.sub(new Vector(10, 10)))*/ ){
			if(mouse.y === player.position.y || mouse.x === player.position.x)
				return;
			
			mouseBis.sub(player.position);
			player.position.add(mouseBis.div(player.vitesse)/* .round() */);
			mouseBis.setVector(mouse);
			this.inMoving = true;
			
		}
	}

}

//module.exports.Circle = Circle;
//module.exports = Player;
