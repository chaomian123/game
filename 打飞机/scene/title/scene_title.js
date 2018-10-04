class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        var w = GuaAnimation.new(game)
        w.x = 100
        w.y = 200
        this.addElement(w)
    }
    static new(game) {
        var i = new this(game)
        //这里的this是scenetitle
        return i
    }
}