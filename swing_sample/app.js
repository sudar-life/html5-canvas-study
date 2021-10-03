import { Dialog } from './dialog.js';

class App{
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.item = new Dialog();

        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);

        this.animate();
    }
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = `rgba(0,0,0,0.3)`;

        this.ctx.lineWidth = 2;
    }


    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.clearRect();
        this.item.draw(this.ctx);

    }

    clearRect() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }


    onDown(e) {
        const item =  this.item.down(e.clientX, e.clientY);
        if (this.item == item) {
            this.currentItem = item;
            this.item.targetPoint(e.clientX,e.clientY);
        }
    }

    onMove(e) {
        if (this.currentItem) {
            this.currentItem.move(e.clientX, e.clientY);
        }
    }
}

window.onload = ()=> {
    new App();
}