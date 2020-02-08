import p5 from "p5"

export default function quadtree(p) {
    const height = 400;
    const width = 600;

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    function Rectangle(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.contains = (point) => {
            return (point.x >= this.x - this.w &&
                point.x <= this.x + this.w &&
                point.y >= this.y - this.h &&
                point.y <= this.y + this.h);
        }

        this.intersects = (range) => {
            return !(range.x - range.w > this.x + this.w ||
                range.x + range.w < this.x - this.w ||
                range.y - range.h > this.y + this.h ||
                range.y + range.h < this.y - this.w)
        }
    }

    function Quadtree(boundary, cap) {
        this.boundary = boundary;
        this.capacity = cap;
        this.points = [];
        this.divided = false;

        this.insert = (point) => {

            if (!this.boundary.contains(point)) {
                return false;
            }

            if (this.points.length < this.capacity) {
                this.points.push(point);
                return true;
            } else {
                if (!this.divided) {
                    this.subdivide();
                }
                if (this.topLeft.insert(point)) {
                    return true;
                } else if (this.topRight.insert(point)) {
                    return true;
                } else if (this.botLeft.insert(point)) {
                    return true;
                } else if (this.botRight.insert(point)) {
                    return true;
                }
            }
        }

        this.subdivide = () => {
            let x = this.boundary.x;
            let y = this.boundary.y;
            let w = this.boundary.w;
            let h = this.boundary.h;

            let tr = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
            this.topRight = new Quadtree(tr, this.capacity);

            let tl = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
            this.topLeft = new Quadtree(tl, this.capacity);

            let br = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
            this.botRight = new Quadtree(br, this.capacity);

            let bl = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
            this.botLeft = new Quadtree(bl, this.capacity);

            this.divided = true;
        }

        this.query = (range, found) => {
            if (!this.boundary.intersects(range)) {
                return;
            } else {
                for (let point of this.points) {
                    if (range.contains(point)) {
                        found.push(point);
                    }
                }

                if (this.divided) {
                    this.topLeft.query(range, found);
                    this.topRight.query(range, found);
                    this.botLeft.query(range, found);
                    this.botRight.query(range, found);
                }
                return found;
            }
        }

        this.show = () => {
            p.stroke(255);
            p.strokeWeight(1);
            p.rectMode(p.CENTER);
            p.noFill();
            p.rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
            if (this.divided) {
                this.topLeft.show();
                this.topRight.show();
                this.botLeft.show();
                this.botRight.show();
            }
            for (let point of this.points) {
                p.strokeWeight(2);
                p.point(point.x, point.y);
            }
        }
    }

    let boundary;
    let qt;

    p.setup = function () {
        p.createCanvas(width, height);

        boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
        qt = new Quadtree(boundary, 4);
        for (let i = 0; i < 300; i++) {
            let x = p.randomGaussian(width/2, width/6);
            let y = p.randomGaussian(height/2, height/6);
            let point = new Point(x,y);
            qt.insert(point);
        }

    };




    p.draw = function () {
        p.background(0);

        p.stroke(0, 255, 0);
        p.rectMode(p.CENTER);

        let range = new Rectangle(p.mouseX, p.mouseY, 107, 74);
        p.rect(range.x, range.y, range.w * 2, range.h * 2);
        let points = new Array();
        qt.query(range, points);
        for (let point of points) {
            p.strokeWeight(8);
            p.point(point.x, point.y);
        }

        qt.show();
    };



};