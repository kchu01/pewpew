// Classes
// xwing ship
class Ship {
    constructor(x, y, color, width, height, img) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
        this.img = img
    }
    render() {
        ctx.fillStyle = this.color
        // this.img.height = this.height
        // this.img.width = this.width
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)

    }
}
// xwing laser
class Laser {
    constructor(x, y, color, width, height, img) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.img = img
    }
    render() {
        ctx.fillStyle = this.color
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)

        this.y = this.y - 10
    }
}

//  tiefighter laser
class EnemyLasers {
    constructor(x, y, color, width, height, img) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.img = img
    }
    //need to render 
    render() {
        ctx.fillStyle = this.color
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)

        this.y = this.y + 10
    }
}

// Variables and DOM Selectors
const xwingMovement = document.getElementById('movement')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')



// buttons
let startBtn = document.getElementById('startBtn')

// images
const tieFighterImg = new Image()
tieFighterImg.src = "./imgs/tie_fighter.PNG"

const xwingImg = new Image()
xwingImg.src = "./imgs/xwing.PNG"

const tieFighterLaserImg = new Image()
tieFighterLaserImg.src = "./imgs/enemy_laser.png"

const xwingLaserImg = new Image()
xwingLaserImg.src = "./imgs/xwing_laser.png"

const CANVAS_HEIGHT = canvas.height
const CANVAS_WIDTH = canvas.width

var ArrowLeft = false;
var ArrowRight = false;
var shooting = false;

let xwing = new Ship(300, 340, "red", 30, 30, xwingImg)

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
    const shipHeight = 30;
    const shipWidth = 30;

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
            let tieFighter = new Ship(canvasX, canvasY, "white", shipWidth, shipHeight, tieFighterImg);
            tieFighterArray.push(tieFighter)
        }
    }
}

// keypresses
function buttonHandler(e) {
    const speed = 10
    // console.log(`Button [${e.key}] pressed`)
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

function shoot() {
    let laser = new Laser(xwing.x, xwing.y, "rgb(255, 81, 0)", 5, 20, xwingLaserImg)
    playerLasers.push(laser)
    // console.log(laser.x, laser.y)
}



function enemyShoot(x, y) {

    let tiefighterShoot = new EnemyLasers(x, y, "green", 5, 20, tieFighterLaserImg)
    enemyLasers.push(tiefighterShoot)
    // console.log(enemyLasers);
}

// can run detction game over, deletes both, gameover can detct hit 
function detectHit() {
    hitDection:
    for (let enemy = 0; enemy < tieFighterArray.length; enemy++) {
        for (let laser = 0; laser < playerLasers.length; laser++) {
            if (
                // bottom 
                playerLasers[laser].y <= tieFighterArray[enemy].y + tieFighterArray[enemy].height &&
                // top
                playerLasers[laser].y + playerLasers[laser].height >= tieFighterArray[enemy].y &&
                // left
                playerLasers[laser].x + playerLasers[laser].width >= tieFighterArray[enemy].x &&
                //right
                playerLasers[laser].x <= tieFighterArray[enemy].x + tieFighterArray[enemy].width
            ) {
                tieFighterArray.splice(enemy, 1);
                playerLasers.splice(laser, 1);
                // console.log('hit detected')
                break hitDection;
            }
        }
    }
}

function dectectXwingHit() {
    for (let enemyShoot = 0; enemyShoot < enemyLasers.length; enemyShoot++) {
        if (
            // bottom
            enemyLasers[enemyShoot].y <= xwing.y + xwing.height &&
            // top
            enemyLasers[enemyShoot].y + enemyLasers[enemyShoot].height >= xwing.y &&
            // left
            enemyLasers[enemyShoot].x + enemyLasers[enemyShoot].width >= xwing.x &&
            // right
            enemyLasers[enemyShoot].x <= xwing.x + xwing.width
        ) {
            xwing.alive = false
        }
    }
}



// the game loop | render game
function gameLoop() {

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dectectXwingHit()
    detectHit()

    // console.log(tieFighterArray.length)

    // tried making a for loop to state if !alive then end game
    // tried setting to 0, but didnt end after all ships were destroyed
    for (let index = 0; index < tieFighterArray.length; index++) {
        // (tieFighterArray[index].alive) {
        tieFighterArray[index].render()

        let shootRandom = Math.random()
        if (shootRandom < .01) {
            enemyShoot(tieFighterArray[index].x, tieFighterArray[index].y)
            // console.log(tieFighterArray[index].alive)
        }
        // }

    }
    xwing.render()
    for (let i = 0; i < playerLasers.length; i++) {

        playerLasers[i].render()

    }
    // if xwing.alive = true, use equality

    for (let j = 0; j < enemyLasers.length; j++) {
        enemyLasers[j].render()

    }
    // debugger
    if (tieFighterArray.length === 0) {

        // alert("You win")
    }

    if (!xwing.alive) {
        alert('you lose')
    }
}



// ends the game status
// function isGameOver() {
//     let gameOver = false

//     ctx.fillStyle = 'black';
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     clearInterval(gameLoop)

//     if (tieFighterArray.length === 0) {
//         // gameOver = true
//         // alert("YOU WON")
//         // document.location.reload();
//     }

//     xwingMovement.innerText = 'You saved the galaxy!'
// }

// console.log(gameOver)

createTieFighters()
document.addEventListener('keydown', buttonHandler)
const GAME_LOOP_IN_MILLISECONDS = 60
const GAME_INTERVAL_TIMER = setInterval(gameLoop, GAME_LOOP_IN_MILLISECONDS)