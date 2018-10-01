var Scene = function (game) {
    var s = {
        game: game,
        
    }
    //init
    var paddle = Paddle(game)
    var ball = Ball(game)

    var score = 0

    var blocks = loadLevel(game, 1)

    var paused = false
    game.registerAction('a', function(){
        paddle.moveLeft()
    })
    game.registerAction('d', function(){
        paddle.moveRight()
    })
    game.registerAction('f', function(){
        ball.fire()
    })

    s.draw = function () {
        //draw background
        game.context.fillStyle = '#ccc'
        game.context.fillRect(0, 0, 400, 300)
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillText('分数: ' + score, 10, 290)
    }
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log('x, y', x, y)
        if (ball.hasPoint(x, y)) {
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        // log('move', x, y)
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        log('up', x, y)
        enableDrag = false
    })
    s.update = function () {
        if (window.paused) {
            return
        }
        ball.move()
        //判断游戏结束
        if (ball.y > paddle.y) {
            //跳转到游戏结束的场景
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                // log('block 相撞')
                block.kill()
                ball.反弹()
                // 更新分数
                score += 100
            }
        }
    }

    return s
}