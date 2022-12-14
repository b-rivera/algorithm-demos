import { printHeader, printFooter } from './utils/print-helper.js';

function algorithmWrapper(inputArr, algorithm, printSteps = true) {
    
    function printArray(arr, text, markers){
        let {i, j} = markers;
        let str = [];
        for (let index = 0; index < arr.length; index++) {
            let element = arr[index];
            if (index === i)
                str.push(`(${element})`);
            else if (index === j)
                str.push(`{${element}}`);
            else
            str.push(` ${element} `);
        }
    
        console.log(`[${str.join(",")}] ${text}`)
    }

    let original = [...inputArr];
    let len = original.length;

    printHeader(algorithm.name, printSteps, [
        "Element in '()' is the item being inserted (i).",
        "Element in '{}' is the element being compared to (j)"
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

// https://stackabuse.com/insertion-sort-in-javascript/ 
function insertionSort(inputArr, __tracking) {
    // IGNORE all calls to '__tracking' object as these are not
    // part of the algorithm

    let len = inputArr.length;

    for (let i = 1; i < len; i++) {
        // Choosing the first element in our unsorted subarray
        let current = inputArr[i];
        // The last element of our sorted subarray
        let j = i-1; 
        
        __tracking.print(inputArr, '', {i, j});

        while ((j > -1) && (current < inputArr[j])) {
            inputArr[j+1] = inputArr[j];
            j--;

            __tracking.print(inputArr, `shifted ${inputArr[j+1]} right, holding ${current}`, {i, j});
            __tracking.iterations++;
        }
        
        inputArr[j+1] = current;

        __tracking.print(inputArr, `inserted ${current}`, {i:j+1, j});
        __tracking.iterations += (j === i-1) ? 1 : 0; //if j hasn't changed, while didn't run, so count for loop
    }

    return inputArr;
}

algorithmWrapper([8,1,3,9,5,7], insertionSort);

algorithmWrapper([1,2,3,4,5,6], insertionSort, 'Best Case', false);
algorithmWrapper([8,1,3,9,5,7], insertionSort, '', false);
algorithmWrapper([9,8,7,6,5,4], insertionSort, 'Worse Case', false);

// You can run this file in VSCode in the debug console