function algorithmWrapper(inputArr, algorithm) {
    
    function printArray(arr, i, j, other){
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
    
        console.log(`[${str.join(",")}] ${other}`)
    }

    let original = [...inputArr];
    let len = original.length;

    let tracking = {
        iterations: 0,
        print: printArray
    }

    console.log("Element in '()' is the item being inserted (i).")
    console.log("Element in '{}' is the element being compared to (j)");
    console.log(".....")
    

    let sorted = algorithm(inputArr, tracking);

    console.log(".....")
    printArray(original,-1,-1,'ORIGINAL');
    printArray(sorted,-1,-1,'FINAL');
    console.log(".....");
    console.log(`Performance (iterations for n=${len}):`);
    console.log(`Actual: ${tracking.iterations}`);
    console.log(`Worse:  ${(len*(len-1))/2}`);
    console.log(`*expected based on worst case [(n(n-1))/2)] for algorithm`);
    console.log(".....");
}

function insertionSort(inputArr, __tracking) {
    // IGNORE all calls to '__tracking' object as these are not
    // part of the algorithm

    let len = inputArr.length;

    for (let i = 1; i < len; i++) {
        // Choosing the first element in our unsorted subarray
        let current = inputArr[i];
        // The last element of our sorted subarray
        let j = i-1; 
        
        __tracking.print(inputArr, i, j, `starting for ${current}`);

        while ((j > -1) && (current < inputArr[j])) {
            inputArr[j+1] = inputArr[j];
            j--;

            __tracking.print(inputArr, i, j, `shifted ${inputArr[j+1]} right, holding ${current}`);
            __tracking.iterations++;
        }
        
        inputArr[j+1] = current;

        __tracking.print(inputArr, j+1, j, `inserted ${current}`);
        __tracking.iterations += (j === i-1) ? 1 : 0; //if j hasn't changed, while didn't run, so count for loop
    }

    return inputArr;
}

algorithmWrapper([8,1,3,9,5,7], insertionSort);

// You can run this file in VSCode in the debug console