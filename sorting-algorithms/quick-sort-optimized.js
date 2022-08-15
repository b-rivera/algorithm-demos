import { printHeader, printFooter } from './utils/print-helper.js';

var __tracking = {};

function algorithmWrapper(inputArr, algorithm, note = '', printSteps = true) {
    
    function printArray(arr, text, markers){
        let {pivot, leftPivot, rightPivot} = markers;
        let str = [];

        for (let index = 0; index < arr.length; index++) {
            let element = arr[index];
            
            if (index === pivot)
                str.push(`{${element}}`);
            else if (index === leftPivot || index === rightPivot)
                str.push(`(${element})`);
            else 
                str.push(` ${element} `);
        }
    
        console.log(`[${str.join(",")}] ${text}`)
    }

    let original = [...inputArr];
    let len = original.length;

    printHeader(`${algorithm.name} - ${note}`, printSteps, [
        "Element in '{}' is the pivot",
        'Element in \'""\' is the element being evaluated',
        "Element in '()' is new pivot index being determined.",
    ]);

    // Assign print functions, reset iterations
    __tracking.iterations =  0;
    __tracking.print = (a,b,c) => {
        if (!printSteps) return;
        printArray(a,b,c);
    };  

    let sorted = algorithm(inputArr, __tracking);

    printFooter({
        printSteps,
        inArr: original, 
        outArr: sorted, 
        loopActual: __tracking.iterations, 
        loopWorseCase: (len*(len-1))/2, 
        worseCaseText: '(n(n-1))/2)',
        arrPrinter: printArray
    });
}

// https://www.guru99.com/quicksort-in-javascript.html
function partition(arr, start, end){
    // Taking the last element as the pivot
    const pivot = Math.floor((end-start)/2) + start;
    const pivotValue = arr[pivot];

    let leftPivot = start;
    let rightPivot = end;

    __tracking.print(arr, '  finding left pivot', {pivot, pivot, leftPivot, rightPivot});

    while (leftPivot <= rightPivot) {
        // track iterations that don't hit while
        if (arr[leftPivot] >= pivotValue && arr[rightPivot] <= pivotValue)
            __tracking.iterations++;

        while (arr[leftPivot] < pivotValue) {
            leftPivot++;
            __tracking.print(arr, '  finding left pivot', {pivot, leftPivot, rightPivot});
            __tracking.iterations++;
        }
        while (arr[rightPivot] > pivotValue) {
            rightPivot--;
            __tracking.print(arr, '  finding right pivot', {pivot, leftPivot, rightPivot});
            __tracking.iterations++;
        }

        if (leftPivot <= rightPivot) {
            [arr[leftPivot], arr[rightPivot]] = [arr[rightPivot], arr[leftPivot]]
            leftPivot++;
            rightPivot--;
            
            __tracking.print(arr, '  swapped elements', {pivot, leftPivot:leftPivot-1, rightPivot:rightPivot+1});
        }
        else {
            __tracking.print(arr, '  did not swap elements', {pivot, leftPivot, rightPivot});
        }
    }

    return leftPivot;
};

function innerQuickSortRecursive(arr, start, end) {
    // Base case or terminating case
    if (start >= end)
        return;
    
    // Returns pivotIndex
    let index = partition(arr, start, end);
    
    // Recursively apply the same logic to the left and right subarrays
    // If there are more elements on that side of the pivot
    if (start < index - 1) 
        innerQuickSortRecursive(arr, start, index - 1);
    if (index < end)
        innerQuickSortRecursive(arr, index, end);
}

function quickSortOptimized(arr){
    __tracking.print(arr, '', {});
    innerQuickSortRecursive(arr, 0, arr.length - 1);
    return arr;
}

algorithmWrapper([1,2,3,4,5,6], quickSortOptimized, '"Best" Case', false);
algorithmWrapper([8,1,3,9,5,7], quickSortOptimized, '');
algorithmWrapper([9,8,7,6,5,4], quickSortOptimized, 'Worse Case', false);

// You can run this file in VSCode in the debug console