

exports.log = function (message){
	console.log(message);
}

exports.randomColorHex = function (){
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

exports.random = function (min, max){
	return Math.floor((Math.random() * (max - min)) + min);
}

// J'ai trouvé cette fonction sur :  http://stackoverflow.com/a/12895687/1250044

exports.clearArc = function (x, y, radius) {
  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
  context.restore();
}