export default function selection (p) {
    const height = 400;
    const width = 600;
    
    
    let values = [60];
    let firstUnsortedIdx;
    let selectedItemIdx;
    let comparingIdx;

    p.setup = function () {
      p.createCanvas(width, height);
      
      for(let i = 0; i < 60; i++){
          values[i] = Math.random()*height;
      }
      

      //sorting magic
      selectionSort();
    };
    
    async function selectionSort(){
        for(let j = 0; j< values.length; j++){
            firstUnsortedIdx = j;
            selectedItemIdx = j;
            for(let i = firstUnsortedIdx; i < values.length; i++)
            {
                comparingIdx = i;
                if(values[selectedItemIdx] > values[i])
                {
                    selectedItemIdx = i;
                }
                await sleep(25);
            }
            await swap(values, selectedItemIdx, firstUnsortedIdx);
        }
       
    }


    p.draw = function () {
        p.background(100);
        for(let i = 0; i< values.length; i++)
        {
            if(i< firstUnsortedIdx){
                p.fill(255,0,0);
            } else {
                p.fill(255);
            }

            if(i === selectedItemIdx) {
                p.fill(255,165,0);
            }
            if(i === comparingIdx){
                p.fill(0,255,0);
            }
            p.rect(i*10 , height, 10, -values[i] );
        }
    };

   let swap = (arr, idx1, idx2) =>{
        let temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }

    let sleep = (ms)=> {
        return new Promise(resolve => setTimeout(resolve,ms));
    }
  };