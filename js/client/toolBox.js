
var w = window.innerWidth; 	// la largeur de la fenetre
var h = window.innerHeight;	// la longeur de la fenetre

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
* ecoute l'evenement resize et enregistre les dimension de la de la fenetre dans 
* les variable globale w et h puis supprime l'ancien canvas et cree un nouveau
*/
window.addEventListener('resize', function(e){
	w = window.innerWidth;
	h = window.innerHeight;
	deleteMap(map);
	map = createMap();
	context = map.getContext("2d");
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
/**
* @method Cette methode permet de supprimer un canvas
*
* @param {Object} map: le canvas à supprimer
*/
function deleteMap(map){
	document.body.removeChild(map);
}


