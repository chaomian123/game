class SceneEnd extends GuaScene{
    constructor(game) {
        super(game)
        game.registerAction('r', function () {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    // __init() {}

    draw() {
        this.game.context.fillText('得分:'+ this.scene.score, 100, 290)
        this.game.context.fillText('游戏结束: 按 r 重玩', 100, 290)
    }
    update() {

    }
}