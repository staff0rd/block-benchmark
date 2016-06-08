/// <reference path="pixi.js.d.ts" />

var counter = document.createElement("div");
counter.style.bottom = 0;
counter.style.position = "absolute";
counter.style.backgroundColor = "#FFFFFF";
document.body.appendChild(counter);

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor:0x000});
var stage = new PIXI.Container();
var stats;
var group;
var totalCount = 0;
var width = 0;
var start;
window.onorientationchange = resize;
window.onresize = resize;
document.getElementById('pixi').appendChild(renderer.view);
appendStats();
group = new PIXI.Container();
stage.interactive = true;
stage
    .on('mousedown', add100Blocks)
    .on('touchstart', add100Blocks)
stage.addChild(group);
add100Blocks();
requestAnimationFrame(update);
var tween = TweenLite.to(group, 100, {x: -10000});

function add100Blocks() {
    addBlocks(100);
}

function appendStats() {
    stats = new Stats();
    //stats.showPanel( 0 );
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = 0;
    document.getElementById('pixi').appendChild( stats.domElement );
}

function update(timestamp) {
    stats.begin();
    renderer.render(stage);
    requestAnimationFrame(update);
	stats.end();
}

var texture;

function addBlocks(count) {
    if (!texture) {
        var g = new PIXI.Graphics();
        g.beginFill(0xFFFF00);
        g.drawRect(0, 0, 1, 1);
        g.endFill();
        var texture = g.generateTexture(renderer);
    }

    for (var i = 0;i < count; i++) {
        var sprite = new PIXI.Sprite(texture);
        group.addChild(sprite);
        sprite.x = width;
        sprite.width = getRandomInt(50, 200);
        width += sprite.width;
        sprite.height = getRandomInt(50, 200);
    }
    totalCount += count;
    counter.innerText = totalCount + " blocks";
}

function resize() {
    renderer.view.style.width = window.innerWidth + "px";
    renderer.view.style.height = window.innerHeight + "px"
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}