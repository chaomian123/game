const e = sel => document.querySelector(sel)
const log = console.log.bind(console)
var container = e('.gua-bc')
var leftLimited = window.getComputedStyle(container, null).getPropertyValue('width').slice(0, -2)


var bar = e('.gua-fg')
var guaMoving = false
var initX = 0
var initLeft
bar.addEventListener('mousedown', event => {
    event.preventDefault()
    guaMoving = true
    initX = event.clientX
    initLeft = pos(bar)
})

bar.addEventListener('mousemove', event => {
    if (guaMoving) {
        log(event.clientX)
        var offset = event.clientX - initX
        log(initLeft, 'initLeft')
        log(offset,'offset')
        setPos(bar, initLeft + offset)
    }
})

bar.addEventListener('mouseup', event => {
    event.preventDefault()
    guaMoving = false

})

const pos = (elem) => {
    var left = window.getComputedStyle(elem, null).getPropertyValue('left')
    left = left.slice(0, -2)
    // log(left)
    return left
}
const setPos = (elem, left) => {
    // if (left)
    // if (left > leftLimited) {
    //     left = leftLimited
    // }
    elem.style.left = left + 'px'

}