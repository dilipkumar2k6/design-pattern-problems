class State {
    pull(){
        throw new Error('implement me');
    }
}
class Off extends State{
    constructor(){
        super();
    }
    pull(wrapper){
        wrapper.setState(new Low());
        console.log('low speed')
    }
}

class Low extends State{
    constructor(){
        super();
    }
    pull(wrapper){
        wrapper.setState(new Medium());
        console.log('medium speed')
    }
}


class Medium extends State{
    constructor(){
        super();
    }
    pull(wrapper){
        wrapper.setState(new High());
        console.log('high speed')
    }
}

class High extends State{
    constructor(){
        super();
    }
    pull(wrapper){
        wrapper.setState(new Off());
        console.log('tunning off speed')
    }
}

class CeilingFanPullChain {
    constructor(){
        this.currentState = new Off();
    }
    setState(s) {
        this.currentState = s;
    }
    pull() {
        this.currentState.pull(this);
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