class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
        this.alive = false
    }
    setup() {
        if (this.发射 === false) {
            this.life = 0
        }else {
            this.life = 10
        }
    }
    //设置烟花的位置
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }

}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game, text) {
        return new this(game, text)
    }
    setup() {
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 100
        this.particles = []
    }
    update() {
        this.duration--

        //添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            //设置初始化坐标
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        //更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
        //删除死掉的小火花
        this.particles= this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            //TODO, 这是一个临时方案
            return
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
}