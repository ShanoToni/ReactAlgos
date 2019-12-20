export default function bfs(p) {
    const height = 400;
    const width = 600;

    let cols = 30;
    let rows = 30;

    let w, h;

    let grid = new Array(cols);

    p.setup = function () {
        p.createCanvas(width, height);

        w = width / cols;
        h = height / rows;

        for (let i = 0; i < cols; i++) {
            grid[i] = new Array(rows);
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = new Square(i, j);
            }
        }
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].addConnections();
            }
        }

        grid[cols - 1][rows - 1].goal = true;

        createMaze( 0, 0, cols, rows, true,0);
        aStar();
    };
    function Square(i, j) {
        this.f = 0;
        this.h = 0;
        this.g = 0;

        this.i = i
        this.j = j;
        this.connectedSqures = [];
        this.previous = undefined;

        this.blocked = false;
        this.visited = false;
        this.inQ = false;
        this.found = false;
        this.goal = false;

        this.show = () => {
            if (this.blocked) {
                p.fill(0);
            } else if (this.goal) {
                p.fill(30,144,255);
            } else if (this.found) {
                p.fill(138, 43, 226);
            } else if (this.inQ && !this.visited) {
                p.fill(124, 252, 0);
            } else if (this.visited) {
                p.fill(255, 99, 71)
            } else {
                p.fill(255);
            }
            p.noStroke();
            p.ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 1.5, h / 1.5)
        }

        this.addConnections = () => {
            if (this.i < cols - 1) {
                this.connectedSqures.push(grid[this.i + 1][this.j]);
            }
            if (this.i > 0) {
                this.connectedSqures.push(grid[this.i - 1][this.j]);
            }
            if (this.j > 0) {
                this.connectedSqures.push(grid[this.i][this.j - 1]);
            }
            if (this.j < rows - 1) {
                this.connectedSqures.push(grid[this.i][this.j + 1]);
            }
            //diagonal
            if (this.i < cols - 1 && this.j < rows - 1) {
                this.connectedSqures.push(grid[this.i + 1][this.j + 1]);
            }
            if (this.i > 0 && this.j < rows - 1) {
                this.connectedSqures.push(grid[this.i - 1][this.j + 1]);
            }
            if (this.i < cols - 1 && this.j > 0) {
                this.connectedSqures.push(grid[this.i + 1][this.j - 1]);
            }
            if (this.i > 0 && this.j > 0) {
                this.connectedSqures.push(grid[this.i - 1][this.j - 1]);
            }

        }
    }

    async function aStar() {
        let openSet = [];
        let closedSet = [];

        openSet.push(grid[0][0]);
        grid[0][0].inQ = true;

        while (openSet.length > 0) {
            let lowestIdx = 0;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[lowestIdx].f) {
                    lowestIdx = i;
                }
            }
            await sleep (10);
            let current = openSet[lowestIdx];

            if (openSet[lowestIdx].goal) {

                let path = [];
                let temp = current;
                path.push(temp);
                while(temp.previous)
                {
                    path.push(temp.previous);
                    temp = temp.previous;
                    temp.goal = true;
                }

                return;
            }

            closedSet.push(current);
            current.visited = true;
            removeFromArray(openSet, current);

            let neighbours = current.connectedSqures;

            for (let i = 0; i < neighbours.length; i++) {
                if(!neighbours[i].blocked)
                {    
                    let neighbour = neighbours[i];
                    
                    if (!closedSet.includes(neighbour)) {
                        let tempG = current.g + 1;
                        
                        if (openSet.includes(neighbour)) {
                            if (tempG < neighbour.g) {
                                neighbour.g = tempG;
                            }
                        } else {
                            neighbour.g = tempG;
                            openSet.push(neighbour);
                            neighbour.inQ = true;
                            neighbour.previous = current;
                        }
                    } 
    
                    neighbour.h = heuristic(neighbour, grid[cols-1][rows-1]);
                    neighbour.f = neighbour.g + neighbour.h;
                }
            }
        }
        return;
    }

    function heuristic(a, b) {
        let d = p.dist(a.i, a.j, b.i, b.j);
        return d;
    }

    function removeFromArray(arr, ele) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == ele) {
                arr.splice(i, 1);
            }
        }
    }

    function createMaze(startH, startV, endH, endV, horizontal, passageIdx) {
        if (horizontal && endV - startV > 3) {
            let splitIdx = createSplitIdx(passageIdx, startV, endV);

            for (let i = startH; i < endH; i++) {
                grid[i][splitIdx].blocked = true;
            }
            let passage = Math.floor(startH + (Math.random() * (endH - startH - 1)));
            grid[passage][splitIdx].blocked = false;


            createMaze(startH, startV, endH, splitIdx, !horizontal, passage);
            createMaze(startH, splitIdx, endH, endV, !horizontal, passage);


        } else if (!horizontal && endH - startH > 3) {
            let splitIdx = createSplitIdx(passageIdx, startH, endH);
            if (splitIdx === passageIdx) {
                splitIdx++;
            }
            for (let i = startV; i < endV; i++) {
                grid[splitIdx][i].blocked = true;
            }
            let passage = Math.floor(startV + (Math.random() * (endV - startV - 1)));
            grid[splitIdx][passage].blocked = false;

            createMaze(startH, startV, splitIdx, endV, !horizontal, passage);
            createMaze(splitIdx, startV, endH, endV, !horizontal, passage);

        }
    }
    function createSplitIdx(passageIdx, start, end){
        let splitIdx = Math.floor((start + end) / 2);
        if(splitIdx === passageIdx)
        {
            if(Math.random()>0.5){
                splitIdx++;
            } else{
                splitIdx-=1;
            }
        }
        return splitIdx;
    }
    p.draw = function () {
        p.background(255);

        for(let i = 0; i< cols; i++){
            for(let j = 0; j < rows; j++){
              grid[i][j].show();
            }
          }
        
    };


    let sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};