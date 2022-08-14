import { printHeader, printFooter } from './utils/print-helper.js';

function algorithmWrapper(inputArr, algorithm, printSteps = true) {
    
    function printArray(arr, text, markers){
        let {i, j} = markers;
        let str = [];
        for (let index = 0; index < arr.length; index++) {
            let element = arr[index];
            if (index === j)
                str.push(`(${element})`);
            else if (index === i)
                str.push(`{${element}}`);
            else
            str.push(` ${element} `);
        }
    
        console.log(`[${str.join(",")}] ${text}`)
    }

    let original = [...inputArr];
    let len = original.length;

    printHeader(algorithm.name, printSteps, [
        "Element in '{}' is represents (i).",
        "Element in '()' is the min element being swapped"
    ]);

    let tracking = {
        iterations: 0,
        print: (a,b,c) => {
            if (!printSteps) return;
            printArray(a,b,c);
        }
    }    

    let sorted = algorithm(inputArr, tracking);

    printFooter({
        printSteps,
        inArr: original, 
        outArr: sorted, 
        loopActual: tracking.iterations, 
        loopWorseCase: (len*(len-1))/2, 
        worseCaseText: '(n(n-1))/2)',
        arrPrinter: printArray
    });
}

// https://stackabuse.com/selection-sort-in-javascript/
function selectionSort(inputArr, __tracking) {
    // IGNORE all calls to '__tracking' object as these are not
    // part of the algorithm

    let len = inputArr.length;

    for(let i = 0; i < len; i++) {
        // Finding the smallest number in the subarray
        __tracking.print(inputArr, ``, {i});
        let min = i;
        for(let j = i+1; j < len; j++){
            if(inputArr[j] < inputArr[min]) {
                min=j;                 
            }
            
            __tracking.iterations++;
         }
         __tracking.print(inputArr, `found min`, {i, j:min});

         if (min != i) {
             // Swapping the elements
             let tmp = inputArr[i]; 
             inputArr[i] = inputArr[min];
             inputArr[min] = tmp;      
         __tracking.print(inputArr, `swapped min`, {i, j:i});
        }
    }
    return inputArr;
}

algorithmWrapper([8,1,3,9,5,7], selectionSort);

// You can run this file in VSCode in the debug console