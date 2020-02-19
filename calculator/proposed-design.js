class IOperation {
  constructor(name) {
    this.name = name;
  }
}

class IUnaryOperation extends IOperation {
  constructor(operator) {
    super(operator);
  }
  execute(operand) {
    throw new Error("Override this function.");
  }
}

class IBinaryOperation extends IOperation {
  constructor(operator) {
    super(operator);
  }
  execute(operand1, operand2) {
    throw new Error("Override this function.");
  }
}

class SinOperation extends IUnaryOperation {
  constructor() {
    super("sin");
  }
  execute(operand) {
    return Math.sin(Number.parseFloat(operand));
  }
}
class CosOperation extends IUnaryOperation {
  constructor() {
    super("cos");
  }
  execute(operand) {
    return Math.cos(Number.parseFloat(operand));
  }
}
class SumOperation extends IBinaryOperation {
  constructor() {
    super("+");
  }
  execute(operand1, operand2) {
    return Number.parseFloat(operand1) + Number.parseFloat(operand2);
  }
}

class DiffOperation extends IBinaryOperation {
  constructor() {
    super("-");
  }
  execute(operand1, operand2) {
    return Number.parseFloat(operand1) - Number.parseFloat(operand2);
  }
}

class Calculator {
  constructor() {
    this.operations = {
      sin: new SinOperation(),
      cos: new CosOperation(),
      "+": new SumOperation(),
      "-": new DiffOperation()
    };
  }
  setOperation(operation) {
      this.operations[operation.name] = operation;
  }
  execute(line) {
    const tokens = line.split(" "); // operator and operands are separated by space
    if (tokens.length === 2) {
      // support unary operation
      const [operator, operand] = tokens;
      return this.operations[operator].execute(operand);
    } else if (tokens.length === 3) {
      // support binary operation
      const [operand1, operator, operand2] = tokens;
      return this.operations[operator].execute(operand1, operand2);
    }
    throw new Error("Invalid operation exception");
  }
}

const test = () => {
  const calculator = new Calculator();
  const line1 = "2 + 3";
  const line2 = "cos 45";
  console.log(calculator.execute(line1));
  console.log(calculator.execute(line2));

  class MultiplyOperation extends IBinaryOperation {
    constructor() {
      super("*");
    }
    execute(operand1, operand2) {
      return Number.parseFloat(operand1) * Number.parseFloat(operand2);
    }
  }
  const multiplyOperation = new MultiplyOperation();
  calculator.setOperation(multiplyOperation);
  const line3 = "2 * 3";
  console.log(calculator.execute(line3));
};

test();
