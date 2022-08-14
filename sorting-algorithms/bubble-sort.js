import { printHeader, printFooter } from './utils/print-helper.js';

function algorithmWrapper(inputArr, algorithm, printSteps = true) {
    
    function printArray(array, text, markers){   
        let {i, j, j2} = markers;
        let str = [];
        for (let index = 0; index < array.length; index++) {
            let element = array[index];
            if (index === j || index === j2)
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
        "Element in '{}' is (i).",
        "Elements in '()' are the elements just swapped"
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

function bubbleSort(arr, __tracking) {
    // IGNORE all calls to '__tracking' object as these are not
    // part of the algorithm

    let len = arr.length;

    for(var i = 0; i < len; i++){
        __tracking.print(arr, '', {i});
        // Last i elements are already in place 
        for(var j = 0; j < ( len - i -1 ); j++){
           
            // Checking if the item at present iteration
            // is greater than the next iteration
            if(arr[j] > arr[j+1]){
                
                // If the condition is true then swap them
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp

                __tracking.print(arr, `swaped`, {i, j , j2: j + 1});
            }
            else
                __tracking.print(arr, `not swaped`, {i, j , j2: j + 1});

            __tracking.iterations++;
        }
    }

    return arr;
}

// https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/
// note I did change the for loop definition from the optimized alg
function optimizedBubbleSort(arr, __tracking) {
    // IGNORE all calls to '__tracking' object as these are not
    // part of the algorithm

    let len = arr.length;
    let swapped = false;

    for(var i = 0; i < len; i++){
        __tracking.print(arr, '', {i});
        
        swapped = false;

        for(var j = 0; j < ( len - i - 1 ); j++){
            // Checking if the item at present iteration
            // is greater than the next iteration, else swap
            if(arr[j] > arr[j+1]){
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                swapped = true;

                __tracking.print(arr, `swaped`, {i, j , j2: j + 1});
            }
            else
                __tracking.print(arr, `not swaped`, {i, j , j2: j + 1});

            __tracking.iterations++;
        }
        
        // optimization if no more swaps, we're sorted
        if (!swapped) break;
    }

    return arr;
}

// algorithmWrapper([9,8,7,6,5,4], optimizedBubbleSort);
// algorithmWrapper([9,8,7,6,5,4], bubbleSort);

// algorithmWrapper([1,2,3,4,5,6], optimizedBubbleSort);
// algorithmWrapper([1,2,3,4,5,6], bubbleSort);

algorithmWrapper([9,8,4,3,5,7], optimizedBubbleSort);
algorithmWrapper([9,8,4,3,5,7], bubbleSort);

// You can run this file in VSCode in the debug console