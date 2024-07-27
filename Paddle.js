const speed=0.02
export default class Paddle{
    constructor(paddleelem){
        this.paddleelem=paddleelem
        this.reset()
    }
    get postion(){
        return parseFloat(getComputedStyle(this.paddleelem).getPropertyValue("--postion"))
    }

    set postion(value){
        this.paddleelem.style.setProperty("--postion",value)
    }
    rect(){
        return this.paddleelem.getBoundingClientRect()
    }
    reset(){
        this.postion=50
    }
    update(delta,ballHeight){
        this.postion+=speed*delta*(ballHeight-this.postion)
    }
   
}