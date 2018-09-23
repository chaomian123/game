var SceneEnd = function (game) {
    var s = {
        game: game,

    }
    //init

    s.draw = function () {
        //draw background

        // draw labels
        game.context.fillText('游戏结束: ', 100, 290)
    }
    s.update = function () {

    }
    return s
}