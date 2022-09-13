const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");
function setup() {
    requestAnimationFrame(loop);
}
function loop() {
    requestAnimationFrame(loop);
    canv.width = innerWidth;
    canv.height = innerHeight;
}

window.onload = function() {
    setup();
}