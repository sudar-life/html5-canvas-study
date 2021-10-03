export class Dialog{
    constructor() {
        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.startX = 0;
        this.startY = 0;
        this.width = 200;
        this.height = 200;
        this.followSpeed = 0.1;
    }

    draw(ctx) {

        var distanceX = (this.targetX - this.x) * this.followSpeed;
        var distanceY = (this.targetY - this.y) * this.followSpeed;
        
        this.x += distanceX;
        this.y += distanceY;

        ctx.fillStyle = '#f4e55a';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    down(x, y) {
        if (this.x < x && this.x+this.width >= x && this.y <= y && this.y+this.height >= y) {
            return this;
        } else {
            return null;
        }
    }

    move(x, y) {
         this.targetX = x;
         this.targetY = y;
    }

    targetPoint(targetPointX,targetPointY) {
        this.startX = targetPointX;
        this.startY = targetPointY;
    }
}