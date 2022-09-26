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
    let grassimgxtarget = Math.ceil(innerWidth / 150) * 150;
    let grassimgytarget = Math.ceil(innerHeight / 150) * 150;
    
    var grassimgxpos = 0;
    var grassimgypos = 0;
    while(grassimgxpos < grassimgxtarget) {
        while(grassimgypos < grassimgytarget) {
            ctx.drawImage(grass, grassimgxpos, grassimgypos);
//            grassimgypos += 150;
        }
        grassimgxpos += 150;
        if (grassimgxpos == grassimgxtarget) {
            if (grassimgypos < grassimgytarget) {
                //grassimgypos += 150;
                //grassimgxpos = 0;
            }
        }
    }
    
}

window.onload = function() {
    setup();
}