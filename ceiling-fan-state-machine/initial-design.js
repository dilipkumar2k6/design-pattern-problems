class CeilingFanPullChain {
  constructor() {
    this.currentState = 0;
  }
  pull() {
    if (this.currentState === 0) {
      this.currentState = 1;
      console.log("low speed");
    } else if (this.currentState === 1) {
      this.currentState = 2;
      console.log("medium speed");
    } else if (this.currentState === 2) {
        this.currentState = 3;
        console.log("high speed");
    } else {
        this.currentState = 0;
        console.log("turning off");
      }
  }
}
const stateDemo = () => {
    const chain = new CeilingFanPullChain();
    while(true) {
        console.log('PRESS ENTER');
        chain.pull();
    }
}

stateDemo();