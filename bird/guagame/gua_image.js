class GuaImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.alive = true
    }
    static  new(game, name) {
        var i = new this(game, name)
        //这里的this是scenetitle
        return i
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }

}

//这里不应该继承GuaImage 但是先这样做了
// class Player extends GuaImage {
//     constructor(game, name) {
//         super(game, name)
//
//     }
//
// }
