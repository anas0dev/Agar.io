/** Une classe représentant un vecteur */
class Vector{
		/** 
	* Crée une instance de Vector
	*
	* @constructor
	* @this {Vector}
	* @param {number} x: La position x du vecteur
	* @param {number} y: La position y du vecteur
	*/
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	/**
	* modifie la valeur de x et de y du vecteur
	* @param {Vector} v: le nouveau vecteur
	*/
	setVector(v){
		this.x = v.x;
		this.y = v.y;
	}
	/**
	* retourne le vecteur
	* @return {Vector} : le vecteur
	*/
	get getVector(){
		return this;
	}
	/**
	* @method addition le vecteur (this) avec le vecteur v passé en parametre
	*
	* @param {Vector} v: le vecteur a additionné
	*/
	add(v){
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	/**
	* @method soustraire le vecteur v du vecteur (this)
	*
	* @param {Vector} v: le vecteur a soustraire
	*/
	sub(v){
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	/**
	* @method diviser le vecteur par le nombre n
	*
	* @param {number} n: le nombre sur lequel on divise
	*/
	div(n){
		this.x /= n;
		this.y /= n;
		return this;
	}
	/**
	* retourne un vecteur qui est la copy du notre
	* @return {Vectore} : un nouveau vecteur
	*/
	copy(){
		return new Vector(this.x, this.y);
	}
	/**
	* retourne la longueur du vecteur
	* @return {number} : la longueur du vecteur
	*/
	lengthVector(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	/**
	* @method calcul et retourne la distance entre notre vecteur et le vecteur v
	*
	* @param {Vector} v: le vecteur duquel on cherche la distance
	*/
	distanceToVector(v){
		let copyThis = this.copy();
		copyThis.sub(v);
		return copyThis.lengthVector();
	}
}