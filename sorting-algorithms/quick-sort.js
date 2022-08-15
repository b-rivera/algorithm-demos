import { printHeader, printFooter } from './utils/print-helper.js';

var __tracking = {};

function algorithmWrapper(inputArr, algorithm, note = '', printSteps = true) {
    
    function printArray(arr, text, markers){
        let {pivot, pivotIndex, swap} = markers;
        let str = [];

        for (let index = 0; index < arr.length; index++) {
            let element = arr[index];
            if (index === swap)
                str.push(`"${element}"`);
            else if (index === pivotIndex)
                str.push(`(${element})`);
            else if (index === pivot)
                str.push(`{${element}}`);
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

// https://stackabuse.com/quicksort-in-javascript/
function partition(arr, start, end){
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    // pivotIndex will hold the target index to move the pivot
    let pivotIndex = start; 

    // for each element before the pivot
    for (let i = start; i < end; i++) {
        // If the value is less than the pivot
        if (arr[i] < pivotValue) {
            // Swapping element at i with the element at pivotIndex
            // This will allows us to keep all elements lower than pivot to the left
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Moving to next element
            pivotIndex++;

            __tracking.print(arr, '  swapped elements', {pivot:end, pivotIndex:pivotIndex-1, swap:i});
        }
        else
            __tracking.print(arr, '  did not swap elements', {pivot:end, pivotIndex:pivotIndex-1, swap:i});

        __tracking.iterations++;
    }
    
    // Swap last element (current pivot) with element at pivotIndex,
    // placing the pivot right after the last element with a value lower than the pivot
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 

    __tracking.print(arr, '  centered pivot', {pivot:pivotIndex});

    return pivotIndex;
};

function innerQuickSortRecursive(arr, start, end) {
    // Base case or terminating case
    if (start >= end)
        return;
    
    // Returns pivotIndex
    let index = partition(arr, start, end);
    
    // Recursively apply the same logic to the left and right subarrays
    innerQuickSortRecursive(arr, start, index - 1);
    innerQuickSortRecursive(arr, index + 1, end);
}

function quickSortRecursive(arr){
    __tracking.print(arr, '', {});
    innerQuickSortRecursive(arr, 0, arr.length - 1);
    return arr;
}

function quickSortIterative(arr) {
    // Creating an array that we'll use as a stack, using the push() and pop() functions
    let stack = [];
    
    __tracking.print(arr, '', {});

    // Adding the entire initial array as an "unsorted subarray"
    stack.push(0);
    stack.push(arr.length - 1);
    
    // There isn't an explicit peek() function
    // The loop repeats as long as we have unsorted subarrays
    while(stack[stack.length - 1] >= 0){
        
        // Extracting the top unsorted subarray
    	let end = stack.pop();
        let start = stack.pop();
        
        let pivotIndex = partition(arr, start, end);
        
        // If there are unsorted elements to the "left" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex - 1 > start){
        	stack.push(start);
            stack.push(pivotIndex - 1);
		}
        
        // If there are unsorted elements to the "right" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex + 1 < end){
        	stack.push(pivotIndex + 1);
            stack.push(end);
        }
    }

    return arr;
}

// In this version of the algorithm, having an orderd list
// in either direction will result in the worst performance given
// that the pivot ends up on either end
algorithmWrapper([1,2,3,4,5,6], quickSortRecursive, '"Best" Case', false);
algorithmWrapper([8,1,3,9,5,7], quickSortRecursive, '');
algorithmWrapper([9,8,7,6,5,4], quickSortRecursive, 'Worse Case', false);

// You can run this file in VSCode in the debug console