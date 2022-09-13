const canv = document.querySelector("canvas");

function setup() {
    requestAnimationFrame(loop);
}
function loop() {
    requestAnimationFrame(loop);
    canv.width = innerWidth;
    canv.height = innerHeight;
}
var Game = Object.create(null);
Game.WaitUntil = function(apiKey, promise) {
	promise.then(function(value) {
		Game[apiKey] = value;
	});
	return promise;
}
Game.adManager = Game.WaitUntil("adManager", AdManager.fetchData("ads.json"));
onkeydown = function(event) {
	event.preventDefault();
	if(!$("AdManager").hidden) {
		return false;
	}
	if(Math.random() <= Game.adManager.data.chance) {
		Game.adManager.loadRandomAd();
		return false;
	}
	if(Game.checkInputLocked(event)) {
		return false;
	}
	return false;
}
