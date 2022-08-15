import { printHeader, printFooter } from './utils/print-helper.js';

var __tracking = {};

function algorithmWrapper(inputArr, algorithm, note = '', printSteps = true) {
    
    function printArray(arr, text, markers){
        let str = [];
        for (let index = 0; index < arr.length; index++) {
            str.push(` ${arr[index]} `);
        }
    
        console.log(`[${str.join(",")}] ${text}`)
    }
    
    function printDualArrays(arr1, arr2, text) {
        let str1 = [];
        let str2 = [];
        for (let index = 0; index < arr1.length; index++) {
            str1.push(` ${arr1[index]} `);
        }
        for (let index = 0; index < arr2.length; index++) {
            str2.push(` ${arr2[index]} `);
        }
        console.log(`[${str1.join(",")}]  [${str2.join(",")}] ${text}`);
    }

    let original = [...inputArr];
    let len = original.length;

    printHeader(`${algorithm.name} - ${note}`, printSteps, [
        "Element in '{}' is represents (i).",
        "Element in '()' is the min element being swapped"
    ]);

    // Assign print functions, reset iterations
    __tracking.iterations =  0;
    __tracking.print = (a,b,c) => {
        if (!printSteps) return;
        printArray(a,b,c);
    };
    __tracking.printDual = (a,b,c) => {
        if (!printSteps) return;
        printDualArrays(a,b,c);
    };

    let sorted = algorithm(inputArr);

    printFooter({
        printSteps,
        inArr: original, 
        outArr: sorted, 
        loopActual: __tracking.iterations, 
        loopWorseCase: (len*(Math.log(len)).toFixed(2)), 
        worseCaseText: '(n*log(n))',
        arrPrinter: printArray
    });
}

// https://stackabuse.com/merge-sort-in-javascript/
function merge(left, right) {
    // IGNORE all calls to '__tracking' object as these are not
    // part of the algorithm

    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {

        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }

        __tracking.iterations++;
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    let response = [ ...arr, ...left, ...right ];    
    __tracking.print(response, '  merge', {});

    return [ ...arr, ...left, ...right ]
}

function mergeSort(inputArr) {
    // IGNORE all calls to '__tracking' object as these are not
    // part of the algorithm

    const half = inputArr.length / 2;
  
    // Base case or terminating case
    if(inputArr.length < 2)
        return inputArr;
  
    const left = inputArr.splice(0, half);

    __tracking.printDual(left, inputArr, '  breakdown');

    return merge(mergeSort(left), mergeSort(inputArr));
}

//algorithmWrapper([8,1,3,9,5,7], mergeSort);

algorithmWrapper([1,2,3,4,5,6], mergeSort, 'Best Case',);
algorithmWrapper([8,1,3,9,5,7], mergeSort, '',);
algorithmWrapper([9,8,7,6,5,4], mergeSort, 'Worse Case',);

// You can run this file in VSCode in the debug console