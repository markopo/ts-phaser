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
        // dron sprite
        this.add.sprite(320, 100, "Atlas", "dron1", this.world);
    }


}



window.onload = () => {

    var game = new SimpleGame();

};