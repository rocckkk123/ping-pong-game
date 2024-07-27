import Ball from "./Ball.js";
import Paddle from "./Paddle.js"

const ball=new Ball(document.getElementById('ball'))
const playerPaddle=new Paddle(document.getElementById('player-paddle'))
const computerPaddle=new Paddle(document.getElementById('computer-paddle'))
const playerscore=document.getElementById('player-score')
const computerscore=document.getElementById('computer-score')
let lastTime
function update(time){
    if(lastTime != null){
        const delta=time-lastTime
     ball.update(delta,[playerPaddle.rect(),computerPaddle.rect()])
       computerPaddle.update(delta,ball.y)
       if(islose() )handlelose()
     const hue=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
   document.documentElement.style.setProperty("--hue",hue+delta*0.001)
    }
    lastTime=time
   
    window.requestAnimationFrame(update)
    
}
function islose(){
    const rect=ball.rect()
     return rect.left >=window.innerWidth||rect.right<0
}



function handlelose(){
    const rect=ball.rect()
    if(rect.left >=window.innerWidth){
        playerscore.textContent=parseInt( playerscore.textContent)+1
    }
    else{
        computerscore.textContent=parseInt( computerscore.textContent)+1   
    }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.postion=(e.y/window.innerHeight)*100
 })   
    window.requestAnimationFrame(update)

  