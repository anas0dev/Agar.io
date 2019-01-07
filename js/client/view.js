/**
* @method Cette methode permet de dessiner un Player dans un canvas
*
* @param {Player} Player: le player à dessiner (le joueur)
*/
function drawPlayer(player){
	context.save();
	
	context.fillStyle = player.getColor;
	
	context.beginPath();

	context.arc(w/2, h/2, player.getRadius, 0, 2 * Math.PI);
	context.fill();
	
	context.restore();
}
/**
* @method Cette methode permet de dessiner un ennemi (autre player) dans un canvas
*
* @param {Object} enemy: le player ennemi à dessiner
*/
function drawEnemy(enemy){
	context.save();
	
	context.fillStyle = enemy.color;
	context.translate(w/2 - player.position.x, h/2 - player.position.y);
	
	context.beginPath();

	context.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
	context.fill();
	
	context.restore();
}
/**
* @method Cette methode permet de dessiner un cercle dans un canvas
*
* @param {Circle} circle: le cercle à dessiner
*/
function drawCircle(circle){
	context.save();
	
	context.translate(w/2 - player.position.x, h/2 - player.position.y);
	context.fillStyle = circle.getColor;
	
	context.beginPath();

	context.arc(circle.position.x, circle.position.y, circle.getRadius, 0, 2 * Math.PI);
	context.fill();
	
	context.restore();
}
/**
* @method Cette methode permet de dessiner un grille dans un canvas
*/
function drawGrid(){
	context.save();
	
	context.lineWidth = 1;
	context.strokeStyle = "#dddddd";
	context.translate(w/2 - player.position.x, h/2 - player.position.y);

	context.beginPath();
	
	for(let i=50; i < global.mapWidth; i += 50){
		context.moveTo(i, 0);
		context.lineTo(i, global.mapHeight);
	}
	
	for(let i=50; i < global.mapHeight; i += 50){
		context.moveTo(0, i);
		context.lineTo(global.mapWidth, i);
	}
	
	context.stroke();
	
	context.restore();
}
/**
* @method Cette methode permet de dessiner un text "GAME OVER" dans un canvas
*/
function drawGameOver(){
	context.save();

	context.font = "bold 60px arial";
	
	context.beginPath();
	
	context.fillText('GAME OVER', w / 4, 100);
	
	context.restore();
}

