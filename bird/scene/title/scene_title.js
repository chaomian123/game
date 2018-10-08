class GroundMove {
    constructor(game) {

    }

}


class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello gua')
        this.addElement(label)

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 200
            g.y = 550
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5

        //player
        var w = GuaAnimation.new(game)
        w.x = 100
        w.y = 480
        this.w = w
        this.addElement(w)
        this.setupInputs()

    }
    update() {
        super.update()
        //地面移动
        this.skipCount--
        var offest = -5
        if (this.skipCount == 0) {
            this.skipCount = 5
            offest = 15
        }
        for (var i = 0; i < 10; i++) {
            var g = this.grounds[i]
            g.x += offest

        }
    }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function (keyStatus) {
            self.w.move(-10, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            self.w.move(10, keyStatus)
        })

    }
}