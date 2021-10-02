export class Point {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;

    }

    add(point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    }

    subtract() {

    }
}