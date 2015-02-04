Tinytest.add("es6 - extend", function(test) {
    var user = new __es6Share.User();
    test.equal(user.sayHello(), 'Hello World!');
});