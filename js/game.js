//import { Application, Sprite, Assets } from '../pixi.js';

const app = new Application();

document.body.appendChild(app.view);

const grassTexture = await Assets.load('grass.png');

const grass = new Sprite(grassTexture);

grass.x = app.renderer.width / 2;
grass.y = app.renderer.height / 2;

app.stage.addChild(grass);

/*
function setup() {
    requestAnimationFrame(loop);
}
function loop() {
    requestAnimationFrame(loop);
    
}

window.onload = function() {
    setup();
}
*/

