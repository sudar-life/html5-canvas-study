import { Point } from './point.js';

const FOLLOW_SPEED = 0.08;
const ROTATE_SPEED = 0.12;
const SPEED_REDUCE = 0.8;
const MAX_ANGLE = 30;
const FPS = 1000 / 60;
const WIDTH = 260;
const HEIGHT = 260;

export class Dialog{
    constructor() {
        this.pos = new Point();
        this.target = new Point();
        this.prevPos = new Point();
        this.downPos = new Point();
        this.speedPos = new Point();
        this.startPos = new Point();
        this.mousePos = new Point();
        this.centerPos = new Point();
        this.rotation = 0;
        this.isDown = false;

    }

    resize(stageWidth, stageHeight) {
        this.pos.x = Math.random() * (stageWidth - WIDTH);
        this.pos.y = Math.random() * (stageHeight - HEIGHT);
        this.target = this.pose.clone();
        this.prevPos = this.pose.clone();
    }

    animate(ctx) {
        const move = this.target.clone().subtract(this.pos).reduce(FOLLOW_SPEED);
        this.pos.add(move);

        this.centerPos = this.pos.clone().add(this.mousePos);

        this.swingDrag(ctx);

        this.prevPos = this.pos.clone();
    }

    swingDrag(ctx) {
        const dx = this.pos.x - this.prevPos.x;
        const speedX = Math.abs(dx)/FPS;
        const speed = Math.min(speedX, 1);

        let rotation = MAX_ANGLE * speed;
        rotation = rotation * (dx > 0 ? 1 : -1);

        this.rotation += (rotation - this.rotation) * ROTATE_SPEED;

        const tmpPos = this.pos.clone().add(this.mousePos);
        ctx.save();
        ctx.translate(tmpPos.x, tmpPos.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.fillStyle = `#f4e55a`;
        ctx.fillRect(-this.mousePos.x, -this.mousePos.y, WIDTH, HEIGHT);
        ctx.restore();
    }

    down(point) {
        if (point.collide(this.pos, WIDTH, HEIGHT)) {
            this.isDown = true;
            this.startPos = this.pos.clone();
            this.downPos = point.clone();
            this.mousePos = point.clone().subtract(this.pos);
            return this;
        } else {
            return null;
        }
    }

    move(point) {
        if (this.isDown) {
            this.target = this.startPos.clone().add(point).subtract(this.downPos);
        }
    }

    up() {
        this.isDown = false;
    }
}