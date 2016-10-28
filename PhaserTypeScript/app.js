var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SimpleGame = (function (_super) {
    __extends(SimpleGame, _super);
    function SimpleGame() {
        _super.call(this, 640, 400, Phaser.CANVAS, 'content', State);
    }
    return SimpleGame;
}(Phaser.Game));
var State = (function (_super) {
    __extends(State, _super);
    function State() {
        _super.apply(this, arguments);
    }
    State.prototype.preload = function () {
        this.game.load.image("BG", "bg.jpg");
        // load sprite images in atlas
        this.game.load.atlas("Atlas", "atlas.png", "atlas.json");
    };
    State.prototype.create = function () {
        // background
        this.add.image(0, 0, "BG");
        // dron sprite
        this.add.sprite(320, 100, "Atlas", "dron1", this.world);
    };
    return State;
}(Phaser.State));
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=app.js.map