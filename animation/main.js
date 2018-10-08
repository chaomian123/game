var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

// var blocks = []
var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

const __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/plane.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'img/fire.png',
        //走路动画
        // w1: 'img/walking/0.png',
        // w2: 'img/walking/1.png',
        // w3: 'img/walking/2.png',
        // w4: 'img/walking/3.png',
        // w5: 'img/walking/4.png',
        // w6: 'img/walking/5.png',
        // w7: 'img/walking/6.png',
        // w8: 'img/walking/7.png',
        // w9: 'img/walking/8.png',
        //多状态动画
        //闲置
        idle1: 'img/idle_mini/0.png',
        idle2: 'img/idle_mini/1.png',
        idle3: 'img/idle_mini/2.png',
        idle4: 'img/idle_mini/3.png',
        idle5: 'img/idle_mini/4.png',
        //跑动
        run1: 'img/running_mini/0.png',
        run2: 'img/running_mini/1.png',
        run3: 'img/running_mini/2.png',
        run4: 'img/running_mini/3.png',
        run5: 'img/running_mini/4.png',
        run6: 'img/running_mini/5.png',
        //攻击
        attack1:'img/attack_mini/0.png',
        attack2:'img/attack_mini/1.png',
        attack3:'img/attack_mini/2.png',
        attack4:'img/attack_mini/3.png',
        attack5:'img/attack_mini/4.png',
        attack6:'img/attack_mini/5.png',
        attack7:'img/attack_mini/6.png',
        attack8:'img/attack_mini/7.png',
        attack9:'img/attack_mini/8.png',
        attack10:'img/attack_mini/9.png',
        //background
        road: 'img/NY.jpg',
    }
    // var scene = Scene(game)
    var game = GuaGame.instance(30, images, function (g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })


    enableDebugMode(game, true)

    // drag ball
    //mouse event

}

__main()
