/// <reference path="phaser.d.ts" />

var counter = document.createElement("div");
counter.style.bottom = 0;
counter.style.position = "absolute";
counter.style.backgroundColor = "#FFFFFF";
document.body.appendChild(counter);
var game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'phaser', { create: create, update: update });
var group;
var totalCount = 0;
window.onorientationchange = resize;
window.onresize = resize;

function create() {
    appendStats();
    group = game.add.group();
    game.input.onDown.add(function() {
        addBlocks(100);
    });
    addBlocks(100);
}

function appendStats() {
    var stats = new Stats();
    //stats.showPanel( 0 );
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = 0;
    var oldUpdate = game.update;
    game.update = function() {
        stats.begin();
        oldUpdate.apply(game, arguments);
        stats.end();
    };
    document.getElementById('phaser').appendChild( stats.domElement );
}

function update() {
    group.x--;
}

var bmd;
var width = 0;
function addBlocks(count) {
    if (!bmd) {
        bmd = new Phaser.BitmapData(game, 'texture', 1, 1);
        bmd.setPixel(0, 0, 0xFF, 0xFF, 0);
    }

    for (var i = 0;i < count; i++) {
        var sprite = game.add.sprite(width,0, bmd);
        sprite.width = game.rnd.between(50, 200);
        width += sprite.width;
        sprite.height = game.rnd.between(50, 200);
        group.add(sprite);
    }
    totalCount += count;
    counter.innerText = totalCount + " blocks";
}

function resize() {
    game.scale.setGameSize(window.innerWidth, window.innerHeight);
}