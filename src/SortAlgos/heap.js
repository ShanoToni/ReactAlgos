export default function heap(p) {
    const height = 400;
    const width = 600;


    let values = [60];
    let states = [];

    p.setup = function () {
        p.createCanvas(width, height);

        for (let i = 0; i < 60; i++) {
            values[i] = Math.random() * height;
            states[i] = -1;
        }

        //sorting magic
        heapSort(values, values.length);
    };

    async function heapSort(arr, n) {
        for (let i = parseInt(n / 2); i >= 0; i--) {
            await heapify(arr, n, i);
        }
        for (let i = n - 1; i >= 0; i--) {
            await swap(arr, 0, i);

            await heapify(arr, n, i);
        }
    }

    async function heapify(arr, n, i) {
        let largest = i;
        states[largest] = 0;
        let l = i + 1;
        states[l] = 1;
        let r = i + 2;
        states[r] = 1;

        if (l < n && arr[l] > arr[largest]) {
            largest = l;
        }

        if (r < n && arr[r] > arr[largest]) {
            largest = r;
        }

        if (largest != i) {
            await swap(arr, i, largest);

            for (let i = 0; i < 60; i++) {
                states[i] = -1;
            }
            await heapify(arr, n, largest);
        }
    }

    p.draw = function () {
        p.background(100);
        for (let i = 0; i < values.length; i++) {
            if (states[i] === 0) {
                p.fill(255, 0, 0);
            } else if (states[i] === 1) {
                p.fill(0, 0, 255);
            } else {
                p.fill(255);
            }
            p.rect(i * 10, height, 10, -values[i]);
        }
    };

    async function swap(arr, idx1, idx2) {
        await sleep(80);
        let temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }

    let sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};