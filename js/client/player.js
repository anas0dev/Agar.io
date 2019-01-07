/**
* Une classe représentant le joueur dans le jeu
* @extends Circle
*/
class Player extends Circle {
	/** 
	* Crée une instance de Player
	*
	* @constructor
	* @this {Player}
	* @param {String} id: un identifiant unique pour chaque Player
	* @param {String} color: La couleur du Player
	* @param {number} x: La position x du centre du cercle Player
	* @param {number} y: La position y du centre du cercle Player
	*/
	constructor (id, color, x, y){
		super();
		this.id = id;		// {String} id: l'identifiant du cercle player
		this.color = color;	// {String} color: la couleur du cercle player
		this.radius = 30;	// {number} radius: le diamètre du cercle player
		this.speed = 100;	// {number} speed: 	la vitesse du cercle player
		this.position = new Vector(x, y); 	// {Vector} position: la position du cercle player
		this.inMoving = false;		// {boolean} inMoving: indique si le cercle player à bouger
	}

	
	// get getId(){
		// return this.id;
	// }
	// set setId(newId){
		// this.id = newId;
	// }

	// get getspeed(){
		// return this.speed;
	// }
	// set setspeed(newspeed){
		// this.speed = newspeed;
	// }
	
	/**
	* @method Rectifie la position du Player quand il est à la limite de la map (carte du jeu)
	*/
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
	
	/**
	* @method Ajout la mass du cercle manger a sa mass et recalul son diamètre et sa position
	*
	* @param {Circle} circle: le cercle manger
	*/
	eatCircle(circle) {		
		let newMass = this.calculateMass() + circle.getMass;
		this.mass = newMass;
		this.radius = Math.sqrt(newMass / Math.PI);
		
		this.limiteMap();
	}
	
	/**
	* @method Ajout la mass du Player manger a sa mass et recalul son diamètre et sa position
	*
	* @param {Object} Player: le player manger
	*/
	eatPlayer(player){
		let newMass = this.calculateMass() + player.mass;
		this.mass = newMass;
		this.radius = Math.sqrt(newMass / Math.PI);
		
		this.limiteMap();
	}
	
	/**
	* @method Calcul la prochaine position du Player et vérifie la possibilité 
	* de la faire et si oui l'appliquer sinon ne rien faire
	*/
	move(){
		let deplacement;
		if(mouse !== undefined){
			if(mouse.y === player.position.y || mouse.x === player.position.x) 	// verifie si la souris est sur le centre du Player
				return;
			
			let nextX = this.position.x + ((mouseBis.x - this.position.x) / this.speed); 	// calcul le prochain position.x
			let nextY = this.position.y + ((mouseBis.y - this.position.y) / this.speed);	// calcul le prochain position.y
			
			//verifie si le player est arrive à la limite de la map (ici j'uttilise -10 et mapWidth+10 et mapHeight+10 
			//pour pouvoir manger si il y'a des cercle et player dans les coin)
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

			mouseBis.sub(this.position);
			deplacement = mouseBis.div(this.speed);
			this.position.add(deplacement);
			mouse.add(deplacement);		//j'ajout à la souris la prochain position si elle ne bouge pas
			mouseBis.setVector(mouse);	// je remet mouseBis à la meme valeur de mouse
			this.inMoving = true;	
		}
	}

}

