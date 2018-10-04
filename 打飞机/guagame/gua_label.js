class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.setup(text)
    }
    static new(game, text) {
        return new this(game, text)
    }
    setup(text) {
        this.text = text
        this.x = 50
        this.y = 50
    }
    draw() {
        this.game.context.fillText(this.text, this.x, this.y)
    }
    update() {

    }
}