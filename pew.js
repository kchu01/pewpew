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

// canvas.setAttribute("height", getComputedStyle(canvas)["height"])
// canvas.setAttribute("width", getComputedStyle(canvas)["width"])
// const CANVAS_HEIGHT = getComputedStyle(canvas)["height"];
// const CANVAS_WIDTH = getComputedStyle(canvas)["width"];
const CANVAS_HEIGHT = canvas.height
const CANVAS_WIDTH = canvas.width

var ArrowLeft = false;
var ArrowRight = false;
var shooting = false;

let xwing = new Ship(300, 340, "red", 20, 20)
// let tieFighter = new Ship(300, 0, "white", 20, 20)
let tieFighterArray = []

let playerLasers = []
let enemyLasers = []

// Functions
function drawBox(x, y, height, width, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, height, width)
}

function createTieFighters() {
    const numRows = 3;
    const numCols = 7;
    const shipHeight = 20;
    const shipWidth = 20;

    // calculate offset between ships in the x
    let fleetWidth = numCols * shipWidth;
    let fleetHeight = numRows * shipHeight;
    const widthBetweenShips = (CANVAS_WIDTH - fleetWidth) / (numCols + 1)
    const heightBetweenShips = ((CANVAS_HEIGHT / 3) - fleetHeight) / (numRows - 1)

    //  _____________________________________________
    // |' ' x ' ' x ' ' x ' ' x ' ' x ' ' x ' ' x ' '|
    // |                                             |
    // |' ' x ' ' x ' ' x ' ' x ' ' x ' ' x ' ' x ' '|
    // |                                             |
    // |' ' x ' ' x ' ' x ' ' x ' ' x ' ' x ' ' x ' '|
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            // calc x
            const widthOfPreviousShips = (col * shipWidth);
            const widthOfEmptySpaces = ((col + 1) * widthBetweenShips);
            const canvasX = widthOfPreviousShips + widthOfEmptySpaces

            // calc y
            const heightOfPreviousShips = (row * shipHeight);
            const heightOfEmptySpaces = (row * heightBetweenShips);
            const canvasY = heightOfPreviousShips + heightOfEmptySpaces;

            // create enemy ship
            let tieFighter = new Ship(canvasX, canvasY, "white", shipWidth, shipHeight);
            tieFighterArray.push(tieFighter)
        }
    }
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

    for (let index = 0; index < tieFighterArray.length; index++) {
        if (tieFighterArray[index].alive) {
            tieFighterArray[index].render()
        }
    }
    xwing.render()
    for (let i = 0; i < playerLasers.length; i++) {
        playerLasers[i].render()
    }
}

// start game
createTieFighters()
document.addEventListener('keydown', buttonHandler)
const GAME_LOOP_IN_MILLISECONDS = 60
const GAME_INTERVAL_TIMER = setInterval(gameLoop, GAME_LOOP_IN_MILLISECONDS)

// update method or make whole new class for titeFighter lasers