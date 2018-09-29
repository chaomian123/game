var SceneEnd = function (game) {
    var s = {
        game: game,

    }
    //init
    game.registerAction('r', function () {
        var s = SceneTitle(game)
        game.replaceScene(s)
    })

    s.draw = function () {
        //draw background

        // draw labels
        game.context.fillText('游戏结束: 按 r 重玩', 100, 290)
    }
    s.update = function () {

    }
    return s
}