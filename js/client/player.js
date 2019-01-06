
//var Circle = require('./circle');

class Player extends Circle {

	constructor (name, color, x, y){
		super();
		this.name = name;
		this.color = color;
		this.radius = 30;
		//this.v = 0;
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
		var newPosition = new Vector(random(1, global.mapWidth), random(1, global.mapHeight));
		for(let i = 0; i < players.length; i++){
			if(this.distanceToCircle(players[i]) < this.radius + players[i].radius + 100){
				newPosition.setVectorXY(random(1, global.mapWidth), random(1, global.mapHeight));
				i = -1;
			}
		}
	}*/
	
	limiteMap(){
		if(this.position.x - this.radius < -10)
			this.position.x += -(this.position.x - this.radius) - 10;
		if(this.position.y - this.radius < -10)
			this.position.y += -(this.position.y - this.radius) - 10;
		if(this.position.x + this.radius > global.mapWidth+10)
			this.position.x += -(this.position.x + this.radius) + global.mapWidth+10;
		if(this.position.y + this.radius > global.mapHeight+10)
			this.position.y += -(this.position.y + this.radius) + global.mapHeight+10;
	}
	
	eatCircle(circle) {
		
		let newMass = this.calculateMass() + circle.getMass;
		this.mass = newMass;
		this.radius = Math.sqrt(newMass / Math.PI);
		
		this.limiteMap();
		// if(this.position.x - this.radius < -10)
			// this.position.x += -(this.position.x - this.radius) - 10;
		// if(this.position.y - this.radius < -10)
			// this.position.y += -(this.position.y - this.radius) - 10;
		// if(this.position.x + this.radius > global.mapWidth+10)
			// this.position.x += -(this.position.x + this.radius) + global.mapWidth+10;
		// if(this.position.y + this.radius > global.mapHeight+10)
			// this.position.y += -(this.position.y + this.radius) + global.mapHeight+10;
		
	}
	
	eatPlayer(player){
		let newMass = this.calculateMass() + player.mass;
		this.mass = newMass;
		this.radius = Math.sqrt(newMass / Math.PI);
		
		this.limiteMap();
	}
	
	move(){
		//var copyThis = this.position.copy();
		var deplacement;
		if(mouse !== undefined /*&& mouse.greaterOrEqualTo(copyThis.add(new Vector(5, 5))) 
			/*&& mouse.greaterOrEqualTo(copyThis.sub(new Vector(10, 10)))*/ ){
			if(mouse.y === player.position.y || mouse.x === player.position.x)
				return;
			var nextX = this.position.x + ((mouseBis.x - this.position.x) / this.vitesse);
			var nextY = this.position.y + ((mouseBis.y - this.position.y) / this.vitesse);
			if(nextX - this.radius <= -10 || nextX + this.radius >= global.mapWidth+10){
				if(nextY - this.radius <= -10 || nextY + this.radius >= global.mapHeight+10)
					return;
				this.position.y = nextY;
				this.inMoving = true;
				return;
			}
			
			if(nextY - this.radius <= -10 || nextY + this.radius >= global.mapHeight+10){
				if(nextX - this.radius <= -10 || nextX + this.radius >= global.mapWidth+10)
					return;
				this.position.x = nextX;
				this.inMoving = true;
				return;
			}
			
			// var mouseBis1 = new Vector(nextX, nextY);
			mouseBis.sub(this.position);
			deplacement = mouseBis.div(this.vitesse);
			this.position.add(deplacement);
			mouse.add(deplacement);
			// this.position.add(mouseBis1);
			mouseBis.setVector(mouse);
			//mouseBis.add(this.v);
			this.inMoving = true;
			
		}
	}

}

//module.exports.Circle = Circle;
//module.exports = Player;
