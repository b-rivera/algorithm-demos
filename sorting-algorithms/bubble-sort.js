function algorithmWrapper(inputArr, algorithm, printSteps = true) {
    
    function printArray(arr, i, j, j2, other){        
        let str = [];
        for (let index = 0; index < arr.length; index++) {
            let element = arr[index];
            if (index === j || index === j2)
                str.push(`(${element})`);
            else if (index === i)
                str.push(`{${element}}`);
            else
            str.push(` ${element} `);
        }
    
        console.log(`[${str.join(",")}] ${other}`)
    }

    let original = [...inputArr];
    let len = original.length;

    let tracking = {
        iterations: 0,
        print: (arr, i, j, j2, other) => {
            if (!printSteps) return;
            printArray(arr, i, j, j2, other);
        }
    }
    console.log("==============================================");
    console.log(`Function: ${algorithm.name}`);
    console.log("==============================================");

    if (printSteps) {
        console.log("Element in '{}' is (i).");
        console.log("Elements in '()' are the items being swapped");
        console.log("");
    }

    let sorted = algorithm(inputArr, tracking);

    console.log("")
    console.log("Result:")
    printArray(original,-1,-1,-1,'ORIGINAL');
    printArray(sorted,-1,-1,-1,'FINAL');
    console.log("");
    console.log(`Performance (iterations for n=${len}):`);
    console.log(`Actual: ${tracking.iterations}`);
    console.log(`Worse:  ${(len*(len-1))/2}`);
    console.log(`*expected based on worst case [(n(n-1))/2)] for algorithm`);
    console.log("");
    console.log("");
}

function bubbleSort(arr, __tracking) {
    // IGNORE all calls to '__tracking' object as these are not
    // part of the algorithm

    let len = arr.length;

    for(var i = 0; i < len; i++){
        __tracking.print(arr, i, -1 , -1, '')
        // Last i elements are already in place 
        for(var j = 0; j < ( len - i -1 ); j++){
           
            // Checking if the item at present iteration
            // is greater than the next iteration
            if(arr[j] > arr[j+1]){
                
                // If the condition is true then swap them
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp

                __tracking.print(arr, i, j , j + 1, `swaped`);
            }
            else
                __tracking.print(arr, i, j , j + 1, `not swaped`);

            __tracking.iterations++;
        }
    }

    return arr;
}

function optimizedBubbleSort(arr, __tracking) {
    // IGNORE all calls to '__tracking' object as these are not
    // part of the algorithm

    let len = arr.length;
    let swapped = false;

    for(var i = 0; i < len; i++){
        __tracking.print(arr, i, -1 , -1, '');
        
        swapped = false;

        for(var j = 0; j < ( len - i - 1 ); j++){
            // Checking if the item at present iteration
            // is greater than the next iteration, else swap
            if(arr[j] > arr[j+1]){
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                swapped = true;

                __tracking.print(arr, i, j , j + 1, `swaped`);
            }
            else
                __tracking.print(arr, i, j , j + 1, `not swaped`);

            __tracking.iterations++;
        }
        
        // optimization if no more swaps, we're sorted
        if (!swapped) break;
    }

    return arr;
}

// algorithmWrapper([9,8,7,6,5,4], optimizedBubbleSort);
// algorithmWrapper([9,8,7,6,5,4], bubbleSort);

algorithmWrapper([1,2,3,4,5,6], optimizedBubbleSort);
algorithmWrapper([1,2,3,4,5,6], bubbleSort);

// algorithmWrapper([9,8,4,3,5,7], optimizedBubbleSort);
// algorithmWrapper([9,8,4,3,5,7], bubbleSort);

// You can run this file in VSCode in the debug console