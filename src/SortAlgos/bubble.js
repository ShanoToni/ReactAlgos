export default function bubble (p) {
    const height = 400;
    const width = 600;
    
    let selected = [2];
    let values = [60];
    let lastIdx;
    p.setup = function () {
      p.createCanvas(width, height);
      
      for(let i = 0; i < 60; i++){
          values[i] = Math.random()*height;
      }
      

      //sorting magic
      bubbleSort();
    };
    
    async function bubbleSort(){
        let swapped;
        lastIdx = values.length-1;
        do {
            swapped = false;
            for(let i=0; i< lastIdx;i++){
                if(values[i]>values[i+1]){
                   await swap(values, i, i+1);
                    selected[0]=i;
                    selected[1]=i+1;
                    swapped = true;
                }
            }
            lastIdx-=1;
        }
        while (swapped);
    }
    
    
    p.draw = function () {
        p.background(100);
        for(let i = 0; i< values.length; i++)
        {
            if(i>lastIdx){
                p.fill(255,0,0);
            } else {
                p.fill(255);
            }
            
            if (i === selected[0] || i === selected[1])
            {
                p.fill(0,255,0);
            }
            p.rect(i*10 , height, 10, -values[i] );
        }
    };
    
    async function swap (arr, idx1, idx2){
        await sleep(25);
         let temp = arr[idx1];
         arr[idx1] = arr[idx2];
         arr[idx2] = temp;
     }

    let sleep = (ms)=> {
        return new Promise(resolve => setTimeout(resolve,ms));
    }
  };