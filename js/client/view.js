
var mapWidth = 6000;
var mapHeight = 5000;

function drawPlayer(player){
	//context.translate(player.position.x - w / 2, player.position.y - h / 2);
	context.beginPath();
	context.fillStyle = player.getColor;
	context.arc(player.position.x, player.position.y, player.getRadius, 0, 2 * Math.PI);
	context.fill();
}

function drawEnemy(enemy){
	context.beginPath();
	context.fillStyle = enemy.color;
	context.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
	context.fill();
}

function drawCircle(cercle){
	context.beginPath();
	context.fillStyle = cercle.getColor;
	context.arc(cercle.position.x, cercle.position.y, cercle.getRadius, 0, 2 * Math.PI);
	context.fill();
}

function drawGrid(){
	// let nombreGridWidth = w / 10;
	// let nombreGridHeight = h / 10;
	
	context.lineWidth = 1;
	context.strokeStyle = "#dddddd";
	//context.globalAlpha = 0.1;
	context.beginPath();
	
	for(let i=50; i < mapWidth; i += 50){
		context.moveTo(i, 0);
		context.lineTo(i, mapHeight);
	}
	
	for(let i=50; i < mapHeight; i += 50){
		context.moveTo(0, i);
		context.lineTo(mapWidth, i);
	}
	
	context.stroke();
	//context.globalAlpha = 1;
}

function createMap(){
	let map = document.createElement("canvas");
	map.width = w;
	map.height = h;
	map.top = 100;
	document.body.appendChild(map);
	return map;
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
