export default function bfs (p) {
    const height = 400;
    const width = 600;
    
    let chance = 0.2;

    let cols = 30;
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
    
    createBlocks();

    BFS();
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
            p.stroke(0)
            p.rect(this.i*w, this.j*h,w,h)
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

    function createBlocks(){
        for(let i=0; i<cols; i++){
            for(let j=0; j< rows; j++){
                if(i !== 0 && j !==0 ||  i !== cols-1 && j !==rows-1)
                {
                    if(Math.random()<chance){
                        grid[i][j].blocked = true;
                    }
                }
            }
        }

    }

   async function BFS(){
        let queue = [];

        queue.push(grid[0][0]);
        grid[0][0].inQ = true;

        while(queue.length !== 0){
            for(let i =0; i<queue.length; i++){
                let node = queue.shift();
                node.visited = true;
                if(node === grid[cols-1][rows-1]){
                    node.found= true;;
                }
                for(let j = 0; j < node.connectedSqures.length; j++){
                    if(node.connectedSqures[j]) {
                        await sleep(1);
                        if(!node.connectedSqures[j].visited && !node.connectedSqures[j].inQ && !node.connectedSqures[j].blocked){
                            queue.push(node.connectedSqures[j]);
                            node.connectedSqures[j].inQ = true;
                        }
                    }
                }

            }
        }
        return;
    }
    

    p.draw = function () {
        p.background(100);

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