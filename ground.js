import { incrementProperty,setPropertyValue,getProperty } from "./propertySet.js";

let groundEles = document.querySelectorAll('[data-ground]')

const GROUND_SPEED = 0.05

export function setUpGround(){
    setPropertyValue(groundEles[0],"--left",0)
    setPropertyValue(groundEles[1],"--left",300)
}

export function update(delta,speedScale){
    groundEles.forEach((ground)=>{
        incrementProperty(ground,"--left",delta * speedScale * GROUND_SPEED * -1)
        if(getProperty(ground,"--left")<=-300){
            incrementProperty(ground,"--left",600)
        }
    })
}