class Model {
    constructor(){}
}

class User extends Model {
    constructor() {
        super();
        this.sayHello();
    }

    sayHello() {
        return "Hello World!";
    }
}

share.User = User;