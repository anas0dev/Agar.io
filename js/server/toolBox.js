
/**
* @method Cette methode retourne une couleur hexadicimale aleatoire
*/
exports.randomColorHex = function (){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
};
/**
* @method Cette methode retourne un nombre aleatoire entre min et max
*
* @param {number} min: le nombre minimale
* @param {number} max: le nombre maximale
*/
exports.random = function (min, max){
	return Math.floor((Math.random() * (max - min)) + min);
};
