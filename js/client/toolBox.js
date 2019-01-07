
// var w = window.innerWidth;
// var h = window.innerHeight;
var w = h = 600; // 	w c'est le width du canvas et le h c'est son height
/**
* @method Cette methode retourne une couleur hexadicimale aleatoire
*/
var randomColorHex = function (){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}
/**
* @method Cette methode retourne un nombre aleatoire entre min et max
*
* @param {number} min: le nombre minimale
* @param {number} max: le nombre maximale
*/
function random(min, max){
	return Math.floor((Math.random() * (max - min)) + min);
}
/**
* ecoute l'evenement mousemove et enregistre les coordonner de la souris dans 
* les variable globale mouse et mouseBis et indique que la souris à bouger
*/
document.addEventListener("mousemove", function(e){
	if(!gameOver){
		mouse = new Vector(player.position.x - w / 2 + e.clientX, player.position.y - h / 2 + e.clientY);
		mouseBis = mouse.copy();
		mouseIsMoving = true;
	}else{
		mouse = new Vector(e.clientX, e.clientY);
		mouseBis = mouse.copy();
	}
});

/**
* @method Cette methode permet de crée et retourner un canvas
*/
function createMap(){
	let map = document.createElement("canvas");
	map.width = w;
	map.height = h;
	document.body.appendChild(map);
	return map;
}


