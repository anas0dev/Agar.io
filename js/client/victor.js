class Vector{
	constructor(x, y, length){
		this.x = x;
		this.y = y;
		/*if(length)
			this.length = length;
		else
			this.length = this.lengthVector();*/
	}
	
	setVector(v){
		this.x = v.x;
		this.y = v.y;
		//this.length = v.length;
	}
	get getVector(){
		return this;
	}
	
	/*get getLength(){
		return this.length;
	}
	setLength(length){
		this.length = length;
	}*/
	
	add(v){
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	
	sub(v){
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	div(n){
		this.x /= n;
		this.y /= n;
		return this;
	}
	
	round(){
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}
	
	lowerOrEqualTo(v){
		if(this.x <= v.x && this.y <= v.y)
			return true;
		return false;
	}
	
	lowerTo(v){
		if(this.x < v.x && this.y < v.y)
			return true;
		return false;
	}
	
	greaterOrEqualTo(v){
		if(this.x >= v.x && this.y >= v.y)
			return true;
		return false;
	}
	
	greaterTo(v){
		if(this.x > v.x && this.y > v.y)
			return true;
		return false;
	}
	
	equalTo(v){
		if(this.x === v.x && this.y === v.y)
			return true;
		return false;
	}
	
	copy(){
		return new Vector(this.x, this.y);
	}
	
	lengthVector(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	
	distanceToVector(v){
		let copyThis = this.copy();
		copyThis.sub(v);
		return copyThis.lengthVector();
	}
	
	
}