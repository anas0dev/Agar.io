/** Une classe représentant un cercle */
class Circle {
	/** 
	* Crée une instance de Circle
	*
	* @constructor
	* @this {Circle}
	* @param {String} id: un identifiant unique pour chaque Circle
	* @param {number} x: La position x du centre du cercle
	* @param {number} y: La position y du centre du cercle
	*/
	constructor (id, x, y){
		this.id = id;
		this.color = randomColorHex();
		this.radius = 10;
		this.mass = this.calculateMass();
		this.position = new Vector(x ,y);
	}
	
	/**
	* retourne la valeur du radius
	* @return {number} : le diamètre du cercle
	*/
	get getRadius(){
		return this.radius;
	}
	/**
	* modifie la valeur de radius
	* @param {number} newRadius: le diamètre du cercle
	*/
	set setRadius(newRadius){
		this.radius = newRadius;
	}
	/**
	* retourne la valeur de color
	* @return {number} : la couleur du cercle
	*/
	get getColor(){
		return this.color;
	}
	/**
	* modifie la valeur de color
	* @param {number} newColor: la couleur du cercle
	*/
	set setColor(newColor){
		this.color = newColor;
	}
	/**
	* retourne la valeur de mass
	* @return {number} : la masse du cercle
	*/
	get getMass(){
		return this.mass;
	}
	/**
	* modifie la valeur de mass
	* @param {number} newMass: la masse du cercle
	*/
	set setMass(newMass){
		this.mass = newMass;
	}
	/**
	* @method calcul et retourne la distance entre la position de se cercle et celui passé en parametre
	*
	* @param {Circle} Circle: le cercle qu'on veut calculer la distance qui nous separe de lui
	*/
	distanceToCircle(circle){
		return this.position.distanceToVector(circle.position);	
	}
	/**
	* @method calcul et retourne la surface du cercle (pour nous c'est la mass)
	*/
	calculateMass(){
		return Math.PI * this.radius * this.radius;
	}
}
