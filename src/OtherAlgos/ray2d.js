import p5 from "p5"

export default function ray2d(p) {
    const height = 400;
    const width = 400;

    class Boundary {
        constructor(x1, y1, x2, y2) {
            this.a = p.createVector(x1, y1);
            this.b = p.createVector(x2, y2);
        }

        show() {
            p.stroke(255);
            p.line(this.a.x, this.a.y, this.b.x, this.b.y);
        }
    }

    class Ray {
        constructor(pos, angle) {
            this.pos = pos;
            this.dir = p5.Vector.fromAngle(angle);
        }

        show() {
            p.stroke(255);
            p.push();
            p.translate(this.pos.x, this.pos.y);
            p.line(0, 0, this.dir.x * 10, this.dir.y * 10);
            p.pop()
        }

        setAngle(angle) {
            this.dir = p5.Vector.fromAngle(angle);
        }

        lookAt(x, y) {
            this.dir.x = x - this.pos.x;
            this.dir.y = y - this.pos.y;
            this.dir.normalize();
        }

        cast(wall) {
            const x1 = wall.a.x;
            const y1 = wall.a.y;
            const x2 = wall.b.x;
            const y2 = wall.b.y;

            const x3 = this.pos.x;
            const y3 = this.pos.y;
            const x4 = this.pos.x + this.dir.x;
            const y4 = this.pos.y + this.dir.y;

            const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

            if (den === 0) {
                return;
            }

            const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

            if (t > 0 && t < 1 && u > 0) {
                const pt = p.createVector();
                pt.x = x1 + t * (x2 - x1);
                pt.y = y1 + t * (y2 - y1);
                return pt;
            } else {
                return;
            }

        }
    }

    class Particle {
        constructor() {
            this.pos = p.createVector(width / 2, height / 2);
            this.rays = [];
            this.heading = 0;
            this.previousPos = p.createVector(width / 2, height / 2);
            for (let i = -40; i < 40; i++) {
                this.rays.push(new Ray(this.pos, p.radians(i)));
            }
        }

        rotate(angle) {
            this.heading += angle;
            for (let i = 0; i < this.rays.length; i++) {
                this.rays[i].setAngle(p.radians(i) + this.heading);
            }
        }

        show() {
            p.fill(255);
            p.ellipse(this.pos.x, this.pos.y, 4);
            for (let i = 0; i < this.rays.length; i++) {
                this.rays[i].show();
            }
        }

        look(walls) {
            const scene = [];
            for (let i = 0; i < this.rays.length; i++) {
                const ray = this.rays[i];
                let closest = null;
                let record = Infinity;

                for (let wall of walls) {
                    const pt = ray.cast(wall);
                    if (pt) {
                        let d = p5.Vector.dist(this.pos, pt);
                        const a = ray.dir.heading() - this.heading;
                        d = d * p.cos(a);
                        if (d < record) {
                            record = d;
                            closest = pt;
                        }
                    }
                }
                if (closest) {
                    p.stroke(255, 100);
                    p.line(this.pos.x, this.pos.y, closest.x, closest.y);
                }
                scene[i] = record;
            }
            return scene;
        }

        update(x, y) {
            this.pos.set(x, y);
        }
    }



    let walls = [];
    let particle;
    let scene = [];

    let keyPress = () =>{
        if(p.keyIsDown(81)){
            particle.rotate(-0.05);
        }
        if(p.keyIsDown(69)){
            particle.rotate(0.05);
        }

    }

    p.setup = function () {
        p.createCanvas(width * 2, height);
        walls.push(new Boundary(0, 0, width, 0));
        walls.push(new Boundary(0, height, width, height));
        walls.push(new Boundary(0, 0, 0, height));
        walls.push(new Boundary(width, 0, width, height));
        for (let i = 0; i < 5; i++) {
            let x1 = p.random(width);
            let y1 = p.random(height);
            let x2 = p.random(width);
            let y2 = p.random(height);
            walls.push(new Boundary(x1, y1, x2, y2));
        }


        particle = new Particle();
    };


  

    p.draw = function () {
        p.background(0);
        for (let wall of walls) {
            wall.show();
        }
        scene = particle.look(walls);
        particle.show();
        particle.update(p.mouseX, p.mouseY);
        
        keyPress();

        const w = width / scene.length;
        p.push();
        p.translate(width, 0);
        for (let i = 0; i < scene.length; i++) {
            const sq = scene[i] * scene[i];
            const wSq = width * width;
            const b = p.map(sq, 0, wSq, 255, 0);
            const h = p.map(sq, 0, wSq, height, 0);
            p.noStroke();
            p.fill(b);
            p.rectMode(p.CENTER);
            p.rect(i * w + w / 2, height / 2, w, h);
        }
        p.pop();
    };



};