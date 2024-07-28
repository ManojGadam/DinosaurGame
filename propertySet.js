export function getProperty(ele,prop){
   return parseFloat(getComputedStyle(ele).getPropertyValue(prop)) || 0
}

export function setPropertyValue(ele,prop,val){
    ele.style.setProperty(prop,val) 
}

export function incrementProperty(ele,prop,inc){
    setPropertyValue(ele,prop,getProperty(ele,prop)+inc)
}