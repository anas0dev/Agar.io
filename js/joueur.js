class Joueur extends Cercle {

	constructor (name){
		super();
		this.name = name;
		//this.color = randomColorHex();
		this.size = 30;
		this.vitesse = 50;
		//this.position = new Vector(random(1, w), random(1, h));
		//this.context = context;
	}

	/* draw(){
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
		context.fill();
	} */
	
	get getName(){
		return this.name;
	}
	set setName(newName){
		this.name = newName;
	}

	/* get getSize(){
		return this.size;
	}
	set setSize(newSize){
		this.size = newSize;
	} */

	get getVitesse(){
		return this.vitesse;
	}
	set setVitesse(newVitesse){
		this.vitesse = newVitesse;
	}
	
	eatCercle(cercle) {
		this.size = this.size + cercle.getSize;
		//foods.splice(foods.indexOf(cercle), 1);
	}
	
	move(){
		var copyThis = this.position.copy();
		var mouseTmp = mouse;
		if(mouse !== undefined /*&& mouse.greaterOrEqualTo(copyThis.add(new Vector(5, 5))) 
			/*&& mouse.greaterOrEqualTo(copyThis.sub(new Vector(10, 10)))*/ ){
			if(moving){
				mouseTmp.sub(player.position);
				player.position.add(mouseTmp.div(player.vitesse)/* .round() */);
				
				// log("player " +log( player.position.add(mouseTmp.div(player.vitesse)/* .round() */)));
				// log("mouseTmp " +log( mouseTmp));
				// log("mouseTmp.div(player.vitesse) " + log(mouseTmp.div(player.vitesse)));
				moving = false;
			}else{
				player.position.add(mouse);
			}
		}
	}

}

// Object.setPrototypeOf(Joueur.prototype, Cercle);