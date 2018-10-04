class SceneEnd extends GuaScene{
    constructor(game) {
        super(game)

        game.registerAction('r', function () {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
        // this.score = score
    }
    // __init() {}

    draw() {
        // log(this.score)
        //TODO 本来想做个得分
        // this.game.context.fillText('得分:'+ this.score, 100, 260)
        this.game.context.fillStyle = "blue";
        this.game.context.font = "bold 20px Arial";
        this.game.context.fillText('游戏结束: 按 r 重玩', (this.game.canvas.width / 2) - 17, (this.game.canvas.height / 2) + 8);
        //
        // this.game.context.fillText(, 100, 290)
    }
    update() {

    }
}