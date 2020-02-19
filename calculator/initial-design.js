class Calculator {
    execute(line) {
        const tokens = line.split(' '); // assume operand and operator separated by space
        if(tokens.length === 2) {
            // support unary operation
            const [operator, operand] = tokens;
            switch(operator) {
                case 'sin':
                    return Math.sin(Number.parseFloat(operand));
                case 'cos':
                    return Math.cos(Number.parseFloat(operand));
            }
        } else if(tokens.length === 3){
            const [operand1, operator, operand2] = tokens;
            switch(operator) {
                case '+':
                    return Number.parseFloat(operand1) + Number.parseFloat(operand2);
                case '-':
                    return Number.parseFloat(operand1) - Number.parseFloat(operand2);                    
            }
        }
        throw new Error('Invalid operation exception');
    }
}

const test = () => {
    const calculator = new Calculator();
    const line1 = '2 + 3';
    const line2 = 'cos 45';
    console.log(calculator.execute(line1));
    console.log(calculator.execute(line2));
}

test();