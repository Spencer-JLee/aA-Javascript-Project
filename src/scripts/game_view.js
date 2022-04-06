import Game from "./game"

class GameView{
    constructor(ctx){
        this.game = new Game();
        this.ctx = ctx;
        this.player = this.game.player;
        this.paused = false;
    }
    
    start(){
        this.bindKeyHandlers();
        requestAnimationFrame(this.render.bind(this));
    }

    bindKeyHandlers(){
        document.addEventListener("keydown", this.keydown.bind(this), false);
        document.addEventListener("click", this.fire.bind(this), false)
    }

    keydown(e){
        switch(e.key){
            case 'w':
                this.player.travel([0, -3]);
                break;
            case 'a':
                this.player.travel([-3, 0]);
                break;
            case 's':
                this.player.travel([0, 3]);
                break;
            case 'd':
                this.player.travel([3, 0]);
                break;
            case 'q':
                this.player.backWeapon();
                break;
            case 'e':
                this.player.forwardWeapon();
                break;
            case 'p':
                this.paused = !this.paused;
                requestAnimationFrame(this.render.bind(this));
                break;
            case 'r':
                this.game = new Game();
                this.player = this.game.player;
                this.paused = false;
                break;
                
        }
    }

    fire(e){
        let x = e.clientX - this.ctx.canvas.offsetLeft;
        let y = e.clientY - this.ctx.canvas.offsetTop;
        // debugger;
        // x = Math.floor(x * this.ctx.canvas.width / this.ctx.canvas.clientWidth);
        // y = Math.floor(y * this.ctx.canvas.height / this.ctx.canvas.clientHeight);
        // console.log(x);
        // console.log(y)
        this.player.shoot([x, y]);
    }

    render(){
        if(!(this.paused) && !(this.game.gameOver)){
            this.game.step();
            this.game.draw(this.ctx);
            requestAnimationFrame(this.render.bind(this));
        }
    }
}

export default GameView;