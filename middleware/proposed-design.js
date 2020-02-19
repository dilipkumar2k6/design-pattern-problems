class Middleware {
    constructor(){
        this.next = null;
    }
    linkWith(next){
        this.next = next;
        return next;
    }
    check(email, password){
        throw new Error('Override me.')
    }
    /**
     * Runs check on the next object in chain or ends traversing if we're in
     * last object in chain.
     */
    checkNext(email, password){
        if(!this.next) {
            return true;
        }
        return this.next.check(email, password);
    }
}

class ThrottlingMiddleware extends Middleware{
    constructor(requestPerMinute){
        super();
        this.requestPerMinute = requestPerMinute;
        this.currentTime = Date.now();
        this.request = 0;
    }
    check(email, password){
        // if new request is made after 60 seconds then reset request/currentTime
        if(Date.now() - this.currentTime > 60000) {
            this.request = 0;
            this.currentTime = Date.now();
        }
        // request is made under 60 seconds; increment counter
        this.request++;
        // If total request made is greater than limit then throw error
        if(this.request > this.requestPerMinute) {
            console.log('Request limit exceeded');
            return false;
        }
        // move to next check
        return this.checkNext(email, password);
    }
}

class UserExistMiddleware extends Middleware {
    constructor(server){
        super();
        this.server = server;
    }
    check(email, password) {
        if(!this.server.hasEmail(email)) {
            console.log('This email is not registered');
            return false;
        }
        if(!this.server.hasValidPassword(email, password)) {
            console.log('Email and password is not valid');
            return false;
        }
        this.checkNext(email, password);
    }
}
class RoleCheckMiddleware extends Middleware {
    constructor(){
        super();
    }
    check(email, password){
        if(email === 'admin@example.com') {
            console.log('Hello, admin');
            return true;
        }
        console.log('Hello user');
        this.checkNext(email, password);
    }
}
class Server {
    constructor(){
        this.middleware = null;
        this.users = {};
    }
    logIn(email, password){
        if(this.middleware.check(email, password)) {
            console.log('Successful authorization ');
            return true;
        }
        return false;
    }
    register(email, password){
        this.users[email] = password;
    }
    hasEmail(email) {
        return !!this.users[email];
    }
    hasValidPassword(email, password) {
        return this.users[email] === password;
    }
}

const test = ()=>{
    const server = new Server();
    server.register('admin@example.com', 'admin_pass');
    server.register('user@example.com', 'user_pass');
    const middleware = new ThrottlingMiddleware(2);
    middleware.linkWith(new UserExistMiddleware(server))
    .linkWith(new RoleCheckMiddleware());

    // server gets a chain for client code
    server.middleware = middleware;

    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    server.logIn('user@example.com', 'user_pass');
}

test();