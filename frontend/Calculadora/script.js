function getOperation() {
    return document.getElementById("operation").innerText;
}

function removeCharacterFromOperation() {
    let operation = getOperation();

    document.getElementById("operation").innerText = operation.slice(0, -1);
}

function addStringToOperation(value) {
    if (document.getElementById("output").innerText) {
        document.getElementById("output").innerText = "";
    }

    document.getElementById("operation").innerText += value;

    snipped();
}

function snipped() {
    console.log("snipped");
    let operation = getOperation();

    if (checkIfValidOperation(operation) && checkIfStringContainsOperators(operation).length > 0) {
        let fixedOperation = operation.replace(/,/g, ".");

        let result = eval(fixedOperation).toString();

        if (result.includes(".")) {
            result = result.replace(".", ",")
        }

        console.log(result);

        document.getElementById("output").innerHTML = `<p id="snipped">${result}</p>`;

        return;
    }
}

function calculate() {
    let operation = getOperation();

    if (operation) {

        let fixedOperation = operation.replace(/,/g, ".");

        let result = eval(fixedOperation).toString();

        if (result.includes(".")) {
            result = result.replace(".", ",")
        }

        console.log(result);

        document.getElementById("output").innerText = result;
        document.getElementById("operation").innerText = "";
    }
}

function addNumber(number) {
    let operation = getOperation();


    if (!/[0-9]/.test(operation.substring(operation.length - 1)) &&
        operation.substring(operation.length - 1) !== ",") {

        addStringToOperation(` ${number}`);

        return;
    }

    addStringToOperation(number);
}


function addComma(comma) {
    let operation = getOperation();

    if (!/[0-9]/.test(operation.substring(operation.length - 1)) ||
        operation.substring(operation.length - 1) === comma) {

        return;
    }

    let operatorsIndexes = checkIfStringContainsOperators(operation);

    if (operatorsIndexes.length === 0) {

        if (operation.includes(comma)) {
            return;
        }

        addStringToOperation(comma);
        return;
    }
    else {
        const lastIndex = Math.max(...operatorsIndexes);

        console.log(lastIndex);

        if (operation.substring(lastIndex, operation.length - 1).includes(comma)) {
            return;
        }

        addStringToOperation(comma);
    }
}

function addOperator(operator) {
    let operation = getOperation();

    if (operation === "") return;

    if (/[0-9]/.test(operation.substring(operation.length - 1)) ||
        !operation.substring(operation.length - 1) === ",") {
        addStringToOperation(` ${operator}`);
    }
}


function checkIfValidOperation(operation) {
    const condition = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

    let fixedOperation = operation.replace(/,/g, ".");

    return condition.test(fixedOperation);
}

function checkIfStringContainsOperators(operation) {
    let operatorsIndexes = [];
    const operators = ["*", "+", "-", "/"];

    let i = 0;

    do {

        let found = operation.lastIndexOf(operators[i], operation.length - 1);

        if (found !== -1) {
            operatorsIndexes.push(found);
        }

        i++;

    } while (i < operators.length);

    return operatorsIndexes;
}