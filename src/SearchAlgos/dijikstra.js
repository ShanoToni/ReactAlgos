export default function dijikstra(p) {
    const height = 400;
    const width = 600;

    let chance = 0.2;

    let nodes = 10;

    let w, h;

    let grid = new Array(nodes);
    let goal = grid[nodes - 1];

    p.setup = function () {
        w = width / nodes;
        h = height / nodes;

        for (let i = 0; i < nodes; i++) {
            grid[i] = new Node(i);
        }
        for (let i = 0; i < nodes; i++) {
            grid[i].addConnections();
        }
        p.createCanvas(width, height);


        //add diji here
        dijikstra();
    };
    function Node(i) {
        this.i = i;
        this.connectedNodes = [];
        this.visited = false;
        this.inQ = false;
        this.found = false;
        this.x = this.i * w + w / 2;
        this.y = (Math.random() * nodes * h + h / 2);
        let r1 = w / 1.5;
        let r2 = h / 1.5;

        this.show = () => {
            if (this.found) {
                p.fill(138, 43, 226);
            } else if (this.inQ && !this.visited) {
                p.fill(124, 252, 0);
            } else if (this.visited) {
                p.fill(255, 99, 71)
            } else {
                p.fill(255);
            }
            for (let i = 0; i < this.connectedNodes.length; i++) {
                p.line(this.x, this.y, this.connectedNodes[i].x, this.connectedNodes[i].y);
            }
            p.ellipse(this.x, this.y, r1, r2);
        }

        this.addConnections = () => {
            //always connect to next
            if (this.i < nodes - 1) {
                this.connectedNodes.push(grid[this.i + 1]);
            }
            for (let i = this.i; i < nodes - 1; i++) {
                if (Math.round(Math.random())) {
                    this.connectedNodes.push(grid[i]);
                }
            }

        }
    }

    function distance(x1, y1, x2, y2) {
        return Math.sqrt((Math.pow(x1 - x2, 2)) + (Math.pow(y2 - y1, 2)))
    }

    async function dijikstra() {

        let queue = [];

        queue.push(grid[0]);
        grid[0].inQ = true;

        while (queue.length !== 0) {
            for (let i = 0; i < queue.length; i++) {
                let node = queue.shift();
                node.visited = true;
                if (node === goal) {
                    node.found = true;
                    return;
                }
                let dis = Number.MAX_VALUE;
                let idx = -1;
                for (let j = 0; j < node.connectedNodes.length; j++) {
                    if (node.connectedNodes[j]) {
                        await sleep(200);
                        let tmp_dis = distance(node.x, node.y, node.connectedNodes[j].x, node.connectedNodes[j].y);
                        if (dis > tmp_dis && !node.connectedNodes[j].inQ) {
                            dis = tmp_dis;
                            idx = j;
                        }
                    }
                }
                if (idx != -1) {
                    queue.push(node.connectedNodes[idx]);
                    node.connectedNodes[idx].inQ = true;
                }

            }
        }
        return;
    }

    p.draw = function () {
        p.background(255);

        for (let i = 0; i < nodes; i++) {
            grid[i].show();
        }

    };



    let sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};