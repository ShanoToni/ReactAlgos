export default function bubble(p) {
    const height = 400;
    const width = 600;

    let color = -1;
    let valuesSize = 6;
    let values = [valuesSize];

    p.setup = function () {
        p.createCanvas(width, height);

        for (let i = 0; i < valuesSize; i++) {
            values[i] = Math.random() * height;
        }

        //sorting magic
        bogosort();
    };

    async function isSorted(){
        let sorted = true;
        for(let i = 0; i < values.length; i++){
            if(values[i - 1] > values[i]) {
                sorted =  false;
                color = -1;
            }
        }
        await sleep(200);
        if(sorted){
            color = 1;
        }
        await sleep(200);
        return sorted;
    }

    async function shuffle(){
        for (let i = values.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [values[i], values[j]] = [values[j], values[i]]; // Swap elements
          }
    }

    async function bogosort() {
        let sorted = await isSorted();
        while(!sorted){
            await shuffle();
            color = 0;
            await sleep(200);
            sorted = await isSorted();
       }
    }


    p.draw = function () {
        p.background(100);
        for (let i = 0; i < values.length; i++) {
            if (color === 1) {
                p.fill(0, 255, 0);
            }
            else if (color === -1) {
                p.fill(255, 0, 0);
            } else {
                p.fill(255);                
            }
            p.rect(i * 100, height, 95, -values[i]);
        }
    };

    let sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};