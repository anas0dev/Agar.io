class joueur{

	constructor (name, context){
		this.name = name;
		this.color = randomColorHex();
		this.size = 15;
		this.vitesse = 25;
		this.position = new Vector(random(1, w), random(1, h));
		this.context = context;
	}

	draw(){
		this.context.beginPath();
		this.context.fillStyle = this.color;
		this.context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
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