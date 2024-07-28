import { getProperty, incrementProperty, setPropertyValue } from "./propertySet.js"

const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100 //every frame of our animation should last for 100 millisec
const dino = document.querySelector('[data-dino]')


let isJumping = false
let currentFrameTime = 0
let dinoFrame,yVelocity

export function update(delta,speedScale){
  handleJump(delta)
  handleRun(delta,speedScale)
}

export function setUpDino(){
    isJumping = false
    currentFrameTime = 0
    dinoFrame = 0
    yVelocity = 0
    setPropertyValue(dino,"--bottom",0)
    document.removeEventListener("keydown",onJump)
    document.addEventListener("keydown",onJump)
} 

function handleRun(delta,speedScale){
    if(isJumping){
        dino.src = "imgs/dino-stationary.png"
        return
    }
    if(currentFrameTime >= FRAME_TIME){
        dinoFrame = (dinoFrame+1)%DINO_FRAME_COUNT
        dino.src = `imgs/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta*speedScale
}

export function setUpLose(){
    dino.src = "imgs/dino-lose.png"
}


function handleJump(delta){
    if(!isJumping)return
    incrementProperty(dino,"--bottom",yVelocity*delta)
    if(getProperty(dino,"--bottom") <= 0){
        setPropertyValue(dino,"--bottom",0)
        isJumping = false
    }
    yVelocity -= GRAVITY * delta
}

function onJump(e){
    if(e.code !== "Space" || isJumping)return
    yVelocity = JUMP_SPEED
    isJumping = true
}

export function getDinoBounds(){
    return dino.getBoundingClientRect()
}