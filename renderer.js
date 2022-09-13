const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");
var grass = new Image;
grass.src = "";
function setup() {
    requestAnimationFrame(loop);
}
function loop() {
    requestAnimationFrame(loop);
    canv.width = innerWidth;
    canv.height = innerHeight;
    ctx.drawImage();
}

window.onload = function() {
    setup();
}