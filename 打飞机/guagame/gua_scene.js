class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnable = true
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        //这里的this是scenetitle
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }

    draw() {
        for (var e of this.elements) {
            // this.game.drawImage(e)
            if (e.alive) {
                e.draw()
            }

        }
    }
    update() {
        if (this.debugModeEnable) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}

