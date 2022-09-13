const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");
var grass = new Image;
grass.src = "grass.png";
function setup() {
    requestAnimationFrame(loop);
}
function loop() {
    requestAnimationFrame(loop);
    canv.width = innerWidth;
    canv.height = innerHeight;
    ctx.drawImage(grass, 0, 0);
}

window.onload = function() {
    setup();
}