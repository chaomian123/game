const config = {
    player_speed: 10,
    cloud_speed:1,
    enemy_speed:5,
    bullet_speed:5,
    fire_cooldown:10,
    cloud_speed:5,
    player_life: 10,
}
//这是一个单例

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        this.alive = true
        this.speed = 2

    }

    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
        this.killEnemies()

    }

    killEnemies() {
        var enemy = this.scene.enemies
        var p = this.scene.player
        for (var i = 0; i < enemy.length; i++) {
            var e = enemy[i]
            var b = this
            if (e.alive && b.alive && (rectIntersects(e, b) || rectIntersects(b, e))) {
                var ps = GuaParticleSystem.new(this.game)
                ps.x = e.x
                ps.y = e.y
                this.scene.addElement(ps)
                e.kill()
                b.kill()
                p.getScore()
            }
        }
    }

    kill() {
        this.alive = false
        this.life = 0
    }


}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.score = 0
        this.alive = true
        this.life = config.player_life
        this.speed = 10
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown --
        }
        if (!this.alive) {
            this.score = 0
        }
        this.crushed()
    }

    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)

        }
    }
    crushed() {
        var enemy = this.scene.enemies
        for (var i = 0; i < enemy.length; i++) {
            var e = enemy[i]
            var p = this
            if (p.alive && e.alive && (rectIntersects(p, e) || rectIntersects(e, p))) {
                var ps = GuaParticleSystem.new(this.game)
                ps.x = p.x
                ps.y = p.y
                this.scene.addElement(ps)
                e.kill()
                p.kill()
            }
        }
    }
    getScore() {
        this.score += 10
    }

    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    kill() {
        this.alive = false
        this.life --
    }
}

const randomBetween = function (start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()


    }
    setup() {
        this.cooldown = 3
        this.alive = true
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)

    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
        if (this.cooldown > 0) {
            this.cooldown --
        }
    }
    kill() {
        this.alive = false
        // this.life = 0

    }
    fire() {
        // if (this.cooldown == 0) {
        //     this.cooldown = 3
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            log(b,'b')
            this.scene.addElement(b)
        // }
    }

}
class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)

    }
    update() {
        this.speed = config.cloud_speed
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {

    }

}
class Scene extends GuaScene{
    constructor(game) {
        super(game)
        this.setup()
        this.setupInput()

    }

    setup() {
        var game = this.game

        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = Cloud.new(game)

        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150

        this.elements = []
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)
        //add enemys
        this.addEnemies()


    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInput() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })
    }


    update() {
        super.update()
        this.cloud.y += 1
    }

    draw() {
        super.draw()
        this.game.context.fillText('分数: '+ this.player.score, 50, 50)
    }
}

// var Scene = function (game) {
//     var s = {
//         game: game,
//
//     }
//     //init
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     var blocks = loadLevel(game, 1)
//
//     var paused = false
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//     s.draw = function () {
//         //draw background
//         game.context.fillStyle = '#ccc'
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log('x, y', x, y)
//         if (ball.hasPoint(x, y)) {
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function (event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log('move', x, y)
//         if (enableDrag) {
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function (event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log('up', x, y)
//         enableDrag = false
//     })
//     s.update = function () {
//         if (window.paused) {
//             return
//         }
//         ball.move()
//         //判断游戏结束
//         if (ball.y > paddle.y) {
//             //跳转到游戏结束的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//
//     return s
// }