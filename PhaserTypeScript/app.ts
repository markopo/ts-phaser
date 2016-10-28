class SimpleGame extends Phaser.Game {

    constructor() {
        super(640, 400, Phaser.CANVAS, 'content', State);
    }


   
}

class State extends Phaser.State {


    preload() {
        this.game.load.image("BG", "bg.jpg");
        // load sprite images in atlas
        this.game.load.atlas("Atlas", "atlas.png", "atlas.json");
    }

    create() {
        // background
        this.add.image(0, 0, "BG");

        // set physiscs to P2 physics engin
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        // dron sprite
        var dron: Dron = new Dron(this.game, 320, 100, "Atlas", "dron1");
        // physics
        this.game.physics.enable(dron, Phaser.Physics.P2JS);
        dron.body.kinematic = true;
        // setup drton
        dron.setUp();
        // add dron to world group
        this.world.add(dron);
    }


}

class Dron extends Phaser.Sprite {

    public setUp() {
        this.anchor.setTo(0.5, 0.5);
        // random position
        this.reset(this.game.rnd.between(40, 600), this.game.rnd.between(60, 150));

        // random movement range
        var range: number = this.game.rnd.between(60, 120);
        // random duration of complete move
        var duration: number = this.game.rnd.between(30000, 50000);
        // random parameters for wiggle easing function
        var xPeriod1: number = this.game.rnd.between(2, 13);
        var xPeriod2: number = this.game.rnd.between(2, 13);
        var yPeriod1: number = this.game.rnd.between(2, 13);
        var yPeriod2: number = this.game.rnd.between(2, 13);

        // set tweens for horizontal and vertical movement
        var xTween = this.game.add.tween(this.body)
        xTween.to({ x: this.position.x + range }, duration, function (aProgress: number) {
            return wiggle(aProgress, xPeriod1, xPeriod2);
        }, true, 0, -1);

        var yTween = this.game.add.tween(this.body)
        yTween.to({ y: this.position.y + range }, duration, function (aProgress: number) {
            return wiggle(aProgress, yPeriod1, yPeriod2);
        }, true, 0, -1);

        // define animations
        this.animations.add("anim", ["dron1", "dron2"], this.game.rnd.between(2, 5), true);
        this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1, 6, "", 3));

        // play first animation as default
        this.play("anim");


    }

    public explode() {
        // remove movement tweens
        this.game.tweens.removeFrom(this.body);
        // explode dron and kill it on complete
        this.play("explosion", 8, false, true);
    }

  

}


/**
functions 
*/ 
function wiggle(aProgress: number, aPeriod1: number, aPeriod2: number): number {
    var current1: number = aProgress * Math.PI * 2 * aPeriod1;
    var current2: number = aProgress * Math.PI * 2 * aPeriod2;
    return Math.sin(current1) * Math.cos(current2);
}


window.onload = () => {

    var game = new SimpleGame();

};