s = require('express');
var path = require('path');
var port = 300p = express();
var count = 0;
var start = Date.now();


app.use(function (req, res, next) {
    console.log(req.url);

    //if (!req.url.includes("index.html"))
    //{
    //    setTimeout(function () {
    //        var end = Date.now();
    //        console.log('time elapsed: ' + (end - start));
    //        console.log("hit");
    //        next();
    //    }, 10000);
    //}
    //else {
    //    setTimeout(function () {
    //        var end = Date.now();
    //        console.log('time elapsed: ' + (end - start));
    //        console.log("hit");
    //        next();
    //    }, 2000);
    //}
  
    setTimeout(function () {
                var end = Date.now();
                console.log('time elapsed: ' + (end - start));
                console.log("hit");
                next();
            }, 10000);
});

//calculation



app.use(express.static(path.join(__dirname, '/public'))); // The Express routes handler.



var server = app.listen(port);
server.timeout = 5000;

var fibonacci = function (n) {
    if (n < 1) { return 0; }
    else if (n == 1 || n == 2) { return 1; }
    else if (n > 2) { return fibonacci(n - 1) + fibonacci(n - 2); }
};

//put in array

var firstkfib = function (k) {
    var i;
    var arr = [];
    for (i = 1; i <= k; i++) {
        arr.push(fibonacci(i));
    }
    return arr

};

//print

var format = function (arr) {
    return arr.join(",");
};

var k = 100;
console.log("firstkfib(" + k + ")");
console.log(format(firstkfib(k)));
