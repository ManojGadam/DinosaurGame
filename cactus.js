import { getProperty, incrementProperty, setPropertyValue } from "./propertySet.js"


const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const gameBody = document.getElementById('gameBody')
let nextCactusTime
export function setUpCactus(){
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll('[data-cactus]').forEach((cactus)=>{
        cactus.remove()
    })
}

export function update(delta,speedScale){
    document.querySelectorAll('[data-cactus]').forEach((cactus)=>{
        incrementProperty(cactus,"--left",speedScale*delta*SPEED*-1)
        if(getProperty(cactus,"--left")<=-100){
            cactus.remove()
        }
    })


    if(nextCactusTime <= 0){
        const cactus = document.createElement('img')
        cactus.src="imgs/cactus.png"
        cactus.classList.add('cactus')
        cactus.dataset.cactus = true
        setPropertyValue(cactus,"--left",100)
        gameBody.appendChild(cactus)

        nextCactusTime = randomNumber(CACTUS_INTERVAL_MIN,CACTUS_INTERVAL_MAX)/speedScale
    }
    nextCactusTime -= delta
}

export function getCactusBounds(){
   return [...document.querySelectorAll('[data-cactus]')].map((cactus)=>{
       return cactus.getBoundingClientRect()
    })
}


function randomNumber(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}