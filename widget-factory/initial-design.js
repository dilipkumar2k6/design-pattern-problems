class IShape {
  constructor() {}
  draw() {
    throw new Error("Cannot call abstract method");
  }
}
class Circle extends IShape {
  constructor() {
    super();
  }
  draw() {
    console.log("draw circle");
  }
}

class Rectangle extends IShape {
  constructor() {
    super();
  }
  draw() {
    console.log("draw rectangle");
  }
}

class Triangle extends IShape {
  constructor() {
    super();
  }
  draw() {
    console.log("draw triangle");
  }
}

const test = () => {
  const triangle = new Triangle();
  const rectangle = new Rectangle();
  const circle = new Circle();

  circle.draw();
  rectangle.draw();
  triangle.draw();
};

test();
