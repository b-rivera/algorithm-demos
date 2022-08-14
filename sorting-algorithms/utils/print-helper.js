export const printHeader = (title, printSteps, legendItems) => {
    console.log("==============================================");
    console.log(`Function: ${title}`);
    console.log("==============================================");      
    
    if (printSteps) 
        printSortingHeader(legendItems);
}

const printSortingHeader = (legendItems) => {
    console.log("");
    console.log("# Legend:");
    console.log("----------------------------------");
    legendItems.forEach(element => console.log(element));
    console.log("----------------------------------");
    console.log("");
    console.log("# Sorting Steps:");
    console.log("----------------------------------");       
}

export const printFooter= ({
    printSteps,
    inArr, outArr, 
    loopActual, loopWorseCase, worseCaseText, 
    arrPrinter}) => {        

        if (printSteps) {
            console.log("----------------------------------");
            console.log("")
            console.log("# Sorting Outcome:")
            console.log("----------------------------------");
            arrPrinter(inArr, 'ORIGINAL', {});
            arrPrinter(outArr,'FINAL', {});
            console.log("----------------------------------");
        }
        console.log("");
        console.log(`# Performance (iterations for n=${inArr.length}):`);
        console.log("----------------------------------");
        console.log(`Actual: ${loopActual}`);
        console.log(`Worse:  ${loopWorseCase}`);
        console.log(`*expected based on worst case [${worseCaseText}] for algorithm`);
        console.log("----------------------------------");
        console.log("");
        console.log("");
}

// module.export = {
//     printHeader,
//     printFooter
// }