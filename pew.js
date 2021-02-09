// Classes
// xwing ship
class Ship {
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

// xwing laser
class Laser {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)

        this.y = this.y - 10
    }
}

//  tiefighter laser
class EnemyLasers {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
    }
    //need to render 
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)

        this.y = this.y + 10
    }
}

// Variables
// DOM Selectors
const xwingMovement = document.getElementById('movement')
const canvas = document.getElementById('canvas')

// canvas setup
const ctx = canvas.getContext('2d')

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

var ArrowLeft = false;
var ArrowRight = false;
var shooting = false;

let xwing = new Ship(300, 340, "red", 20, 20)
let tieFighter = new Ship(300, 0, "white", 20, 20)

let playerLasers = []
let enemyLasers = []

// Functions
function drawBox(x, y, height, width, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, height, width)
}

// game menu
// function menu() {
//     erase();
//     var img = document.getElementById("title");
//     var pat = ctx.createMenu(img, "repeat");
//     ctx.rect(0, 0, 600, 360);
//     ctx.fillStyle = pat;
//     ctx.fill();
// }

// keypresses
function buttonHandler(e) {
    const speed = 10
    console.log(`Button [${e.key}] pressed`)
    // xwingMovement.innerText = `X: ${xwing.x} Y: ${xwing.y}`
    switch (e.key) {
        case ('ArrowLeft'):
            xwing.x = xwing.x - speed
            break
        case ('ArrowRight'):
            xwing.x = xwing.x + speed
            break
        case (' '):
            shoot();
            break
    }
}

function enemy() {

}

// shoot lasers
function shoot() {
    playerLasers.push(new Laser(xwing.x, xwing.y, "green", 10, 10))
    console.log(playerLasers)
}

// the game loop | render game
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
    for (let i = 0; i < playerLasers.length; i++) {
        playerLasers[i].render()
    }
}

// start game
document.addEventListener('keydown', buttonHandler)
const GAME_LOOP_IN_MILLISECONDS = 60
const GAME_INTERVAL_TIMER = setInterval(gameLoop, GAME_LOOP_IN_MILLISECONDS)

// update method or make whole new class for titeFighter lasers