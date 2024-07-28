import { update as dinoUpdate,setUpDino,getDinoBounds, setUpLose } from "./dino.js"
import { update as groundUpdate,setUpGround } from "./ground.js"
import { setUpCactus,update as cactusUpdate,getCactusBounds } from "./cactus.js"
const WINDOW_WIDTH = 100
const WINDOW_HEIGHT = 30
let score = 0

let lastRenderTime = null,dinoSpeed = 2,gameBody = document.getElementById('gameBody')
setPixelToWorldScale()
window.addEventListener('resize',setPixelToWorldScale)
window.addEventListener('keydown',startGame,{once:true})
const scoreEle = document.querySelector('[data-score]')
const SPEED_SCALE_INCREASE = 0.000001
let speedScale


function startGame(){
    let text = gameBody.getElementsByClassName('greetText').item(0)
    text.classList.add('hide')
    setUpGround()
    setUpDino()
    setUpCactus()
    score = 0
    speedScale = 1
    lastRenderTime = null
    window.requestAnimationFrame(main)
}

function setPixelToWorldScale(){
    let scale
    if(window.innerWidth/window.innerHeight < WINDOW_WIDTH/WINDOW_HEIGHT){
        scale = window.innerWidth/WINDOW_WIDTH
    }
    else{
        scale = window.innerHeight/WINDOW_HEIGHT
    }
    gameBody.style.width = `${WINDOW_WIDTH*scale}px`
    gameBody.style.height = `${WINDOW_HEIGHT*scale}px`
}

function main(currentTime){
    if(lastRenderTime == null){
        lastRenderTime = currentTime
        window.requestAnimationFrame(main)
        return
    }
    let delta = (currentTime-lastRenderTime)
    update(delta,speedScale)
    updateScore(delta)
    speedScale += delta*SPEED_SCALE_INCREASE
    if(gameOver()){
        return handleLose()
    }
    lastRenderTime = currentTime
    window.requestAnimationFrame(main)
}

function updateScore(time){
    score += time*0.01
    scoreEle.textContent = `Score : ${Math.floor(score)}`
}


function update(delta,speedScale){
    groundUpdate(delta,speedScale)
    dinoUpdate(delta,speedScale)
    cactusUpdate(delta,speedScale)
}

function gameOver(){
    let dinoRect = getDinoBounds()
    return getCactusBounds().some((cactus)=>isCollision(cactus,dinoRect))
}

function isCollision(r1,r2){
    return (r1.left < r2.right && r1.top < r2.bottom && r1.right > r2.left && r1.bottom > r2.top)
}

function handleLose(){
    setUpLose()
    setTimeout(()=>{
        document.addEventListener("keydown",startGame,{once:true})
        let text = gameBody.getElementsByClassName('greetText').item(0)
        text.classList.remove('hide')
    },100)
}