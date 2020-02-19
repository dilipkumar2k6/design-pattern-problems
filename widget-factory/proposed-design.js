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
    return "draw circle";
  }
}

class Rectangle extends IShape {
  constructor() {
    super();
  }
  draw() {
    return "draw rectangle";
  }
}

class Triangle extends IShape {
  constructor() {
    super();
  }
  draw() {
    return "draw triangle";
  }
}

class IColor {
  static RED() {
    return "red";
  }
  static BLUE() {
    return "blue";
  }
  static GREEN() {
    return "green";
  }
  static YELLOW() {
    return "yellow";
  }
}
class IShade {
    static SOLID() {
      return "solid";
    }
    static DOTTED() {
      return "dotted";
    }
    static LINE() {
      return "line";
    }
  }

class ColoredShape extends IShape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }
  draw() {
    return this.shape.draw() + " with color " + this.color;
  }
}

class ShadedShape extends IShape {
    constructor(shape, shade) {
      super();
      this.shape = shape;
      this.shade = shade;
    }
    draw() {
      return this.shape.draw() + " with shade " + this.shade;
    }
  }

const test = () => {
  const triangle = new Triangle();
  const rectangle = new Rectangle();
  const circle = new Circle();

  console.log(circle.draw());
  console.log(rectangle.draw());
  console.log(triangle.draw());

  // test extended shape
  const redCircle = new ColoredShape(circle, IColor.RED());
  console.log(redCircle.draw());

  const solidCircle = new ShadedShape(circle, IShade.SOLID());
  console.log(solidCircle.draw());
};

test();
