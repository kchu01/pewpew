// DOM Selectors
const xwingMovement = document.getElementById('movement')
const canvas = document.getElementById('canvas')

// canvas setup
const ctx = canvas.getContext('2d')

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

function drawBox(x, y, height, width, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, height, width)
}

let gameLoopInterval = setInterval(gameLoop, 60)

// classes
class Ships {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// game objects
let xwing = new Ships(300, 340, "red", 20, 20)
let tieFighter = new Ships(0, 0, "white", 20, 20)
// let bullet = new Ships(0, 0, "green", 1, 4)

// keypresses
function movement(e) {
    const speed = 10
    console.log(e)
    xwingMovement.innerText = `X: ${xwing.x} Y: ${xwing.y}`
    switch (e.key) {
        case ('a'):
            xwing.x = xwing.x - speed
            break
        case ('d'):
            xwing.x = xwing.x + speed
            break
    }
}

function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // check for collisions
    // detectHit()
    // render our game objects!
    if (tieFighter.alive) {
        tieFighter.render()
    }
    xwing.render()
}


document.addEventListener('keydown', movement)
