 const inital_velcoity=0.023
 const acceleration=0.000012
export default class Ball{
    constructor(ballelem){
        this.ballelem=ballelem
        this.reset()
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballelem).getPropertyValue("--x"))
    }

    set x(value){
        this.ballelem.style.setProperty("--x",value)
    }
    get y(){
        return parseFloat(getComputedStyle(this.ballelem).getPropertyValue("--y"))
    }

    set y(value){
        this.ballelem.style.setProperty("--y",value)
    }
    rect(){
        return this.ballelem.getBoundingClientRect()
    }
    reset(){
        this.x=50
        this.y=50
        this.direction={x:0}
        while(Math.abs(this.direction.x)<=0.2||Math.abs(this.direction.x)>=0.9){
            let heading=randomNumberBetweenTwo(0,2*Math.PI)
            this.direction={x:Math.cos(heading),y:Math.sin(heading)}
        }
        this.velocity=inital_velcoity
    }
    update(delta,paddleRects){
        this.x+=this.direction.x*this.velocity*delta
        this.y+=this.direction.y*this.velocity*delta
        this.velocity+=acceleration*delta
        const rect= this.rect()

        if(rect.bottom >=window.innerHeight||rect.top<0){
            this.direction.y*=-1
        }
        if(paddleRects.some(r => iscollosion(r,rect))){
            this.direction.x*=-1
        }
    }
}
function randomNumberBetweenTwo(min,max){
    return Math.random()*(max-min)+min
}
function  iscollosion(rect1,rect2)
{
     return rect1.left<=rect2.right &&
      rect1.right>=rect2.left && 
      rect1.top<=rect2.bottom &&
       rect1.bottom>=rect2.top
    }