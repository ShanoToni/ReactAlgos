export default function selection (p) {
    const height = 400;
    const width = 600;
    
    
    let values = [60];
    let states = [];
    p.setup = function () {
      p.createCanvas(width, height);
      
      for(let i = 0; i < 60; i++){
          values[i] = Math.random()*height;
          states[i] = -1;
      }
      

      //sorting magic
      quickSort(values,0, values.length-1);
    };
    
    async function quickSort(arr, start, end){
        if(start>=end){
            return;
        }
        let index = await partition(arr,start,end);
        states[index] = -1;
        await Promise.all([quickSort(arr, start, index-1), quickSort(arr, index+1, end)]);
        
    }

    async function partition(arr, start, end){

        for(let i = start; i<=end; i++){
            if(states[i] != 0)
            {
                states[i] = 1;
            }
        }

        let pivotIndex = start;
        let pivotValue = arr[end];
        states[pivotIndex] = 0;
        for(let i=start; i< end; i++){
            if(arr[i]<pivotValue){
                await swap(arr, i, pivotIndex);
                states[pivotIndex] = -1;
                pivotIndex++;
                states[pivotIndex] = 0;
            }
        }
        await swap(arr,pivotIndex, end);

        for(let i = start; i<=end; i++){
            if(states[i] != 0)
            {
                states[i] = -1;
            }
        }

        return pivotIndex;
    }


    p.draw = function () {
        p.background(100);
        for(let i = 0; i< values.length; i++)
        {
            if(states[i] === 0){
                p.fill(255,0,0);
            } else if(states[i] === 1){
                p.fill(0,0,255);
            }else {
                p.fill(255);
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