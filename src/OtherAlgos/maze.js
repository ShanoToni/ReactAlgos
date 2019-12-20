export default function bfs (p) {
    const height = 400;
    const width = 600;
    
    let chance = 0.2;

    let cols = 20;
    let rows = 20;
    
    let w,h;

    let grid = new Array(cols);

    p.setup = function () {
      p.createCanvas(width, height);
      
        w = width / cols;
        h = height / rows;

      for(let i = 0; i< cols; i++){
          grid[i] = new Array(rows);
      }

      for(let i = 0; i< cols; i++){
          for(let j = 0; j < rows; j++){
            grid[i][j] = new Square(i,j);
        }
    }
    for(let i = 0; i< cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j].addConnections();
        }
    }
    
    createMaze( 0, 0, cols, rows, true,0);
};      
    function Square(i,j){
        this.i = i
        this.j = j;
        this.connectedSqures = [];
        this.blocked = false;
        this.visited = false;
        this.inQ = false;
        this.found = false;

        this.show = ()=>{
            if(this.blocked){
                p.fill(0);
            }else if(this.found){
                p.fill(0,255,0);
            } else if(this.inQ && !this.visited){
                p.fill(0,0,255);
            } else if(this.visited){
                p.fill(255,0,0);
            }else {
                p.fill(255);
            }
            p.noStroke();
            p.ellipse(this.i*w+w/2, this.j*h+h/2,w,h)
        }

        this.addConnections = ()=>{
            if(this.i < cols-1){
                this.connectedSqures.push(grid[this.i+1][this.j]);
            }
            if(this.i > 0){
                this.connectedSqures.push(grid[this.i-1][this.j]);
            }
            if(this.j>0){
                this.connectedSqures.push(grid[this.i][this.j-1]);
            }
            if(this.j< rows-1){
                this.connectedSqures.push(grid[this.i][this.j+1]);
            }
        }
    }

    async function createMaze(startH, startV, endH, endV, horizontal, passageIdx) 
    {
        if(horizontal && endV-startV >3){
            let splitIdx = createSplitIdx(passageIdx, startV, endV);

            for(let i=startH; i< endH; i++){
                grid[i][splitIdx].blocked = true;
            }
            let passage = Math.floor(startH + ( Math.random() * (endH-startH-1)) );
            grid[passage][splitIdx].blocked = false;
            await sleep(1000);
            await Promise.all([
                createMaze(startH, startV, endH, splitIdx, !horizontal,passage),
                createMaze(startH, splitIdx, endH, endV, !horizontal,passage)
            ]);

        } else if(!horizontal && endH-startH > 3){
            let splitIdx = createSplitIdx(passageIdx, startH, endH);
            if(splitIdx === passageIdx)
            {
                splitIdx++;
            }
            for(let i=startV; i< endV; i++){
                grid[splitIdx][i].blocked = true;
            }
            let passage = Math.floor(startV + ( Math.random() * (endV-startV-1)) );
            grid[splitIdx][passage].blocked = false;
            await sleep(1000);
            await Promise.all([
                createMaze(startH, startV, splitIdx, endV, !horizontal,passage),
                createMaze(splitIdx, startV, endH, endV, !horizontal,passage)
            ]);
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

 

    let sleep = (ms)=> {
        return new Promise(resolve => setTimeout(resolve,ms));
    }
  };