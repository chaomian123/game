class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello gua')
        this.addElement(label)

        var road = GuaImage.new(game, 'road')
        this.addElement(road)
        var w = GuaAnimation.new(game)
        w.x = 100
        // w.y = 800 - w.texture.height - 80
        this.w = w
        this.addElement(w)
        this.setupInputs()

    }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function (keyStatus) {
            self.w.move(-10, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            self.w.move(10, keyStatus)
        })
        self.game.registerAction('j', function () {
            self.w.move(0, 'down')
        })
    }
}