
// var mapWidth = 8000;
// var mapHeight = 8000;
//var global = require('./global');



function drawPlayer(player){
	//context.translate(player.position.x - w / 2, player.position.y - h / 2);
	context.save();
	context.beginPath();
	context.fillStyle = player.getColor;
	context.arc(w/2, h/2/* player.position.x, player.position.y */, player.getRadius, 0, 2 * Math.PI);
	context.fill();
	context.restore();
}

function drawEnemy(enemy){
	context.save();
	context.translate(w/2 - player.position.x, h/2 - player.position.y);
	context.beginPath();
	context.fillStyle = enemy.color;
	context.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
	context.fill();
	context.restore();
}

function drawCircle(cercle){
	context.save();
	context.translate(w/2 - player.position.x, h/2 - player.position.y);
	context.beginPath();
	context.fillStyle = cercle.getColor;
	context.arc(cercle.position.x, cercle.position.y, cercle.getRadius, 0, 2 * Math.PI);
	context.fill();
	context.restore();
}

function drawGrid(){
	// let nombreGridWidth = w / 10;
	// let nombreGridHeight = h / 10;
	context.save();
	context.lineWidth = 1;
	context.strokeStyle = "#dddddd";
	//context.globalAlpha = 1;
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
	//context.globalAlpha = 1;
}

function createMap(){
	let map = document.createElement("canvas");
	map.width = w;
	map.height = h;
	document.body.appendChild(map);
	return map;
}

function drawGameOver(){
	context.save();
	//context.translate(mapWidth / 4, 50);
	context.font = "bold 60px arial";
	context.beginPath();
	
	context.fillText('GAME OVER', w / 4, 100);
	
	context.restore();
}

function clearArc(x, y, radius) {
	context.save();
	// context.globalCompositeOperation = 'destination-out';
	context.beginPath();
	context.fillStyle = 'white';
	context.arc(x, y, radius, 0, 2 * Math.PI);
	context.fill();
	context.restore();
}
