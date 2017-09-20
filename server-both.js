var express = require('express');
var path = require('path');
var port = 3000;
var app = express();
var count = 0;
var countscript5 = 0;
var countscript2 = 0;
var countscript7 = 0;
var countidex = 0;
var start = Date.now();
var mid1 = 0;
var mid2 = 0;
var served = 0;
var k = 38;
console.log(k);


app.use(function (req, res, next) {
    if (req.url.includes("script_5.js"))
        countscript5++;
    else if (req.url.includes("script_7.js"))
        countscript7++;
    else if (req.url.includes("script_2.js"))
        countscript2++;
    else if (req.url.includes("index"))
        countidex++;

    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    served++;
    count++;
   // setTimeout(function () {
        console.log(countscript2 + " " + countscript5 + " " + countscript7 + " " + countidex);
        var end = Date.now();
        console.log('time elapsed: ' + (end - start));
        mid1 = Date.now();
       
        console.log("hit #" + count);
       
   // }, 4000)
//  setTimeout(function () {
               


    //console.log(format(firstkfib(k)));
        format(firstkfib(k));

        mid2 = Date.now();
        console.log('DELAY: ' + (mid2 - mid1));
        next();
//}, 2000);
});

//calculation



app.use(express.static(path.join(__dirname, '/public'))); // The Express routes handler.
app.disable('view cache');


var server = app.listen(port);
server.timeout = 10000;
//var served = 
//setInterval(function () {
//    console.log('Requests per second:' + served);
//    served = 0;
//}, 1000);


var Buffer = require('safe-buffer').Buffer
var debug = require('debug')('all')
var sha = require('simple-sha1')
var WebTorrent = require('webtorrent-hybrid')
var debug = require('debug')('all')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var System = require('systemjs')



announceList = [
 ['udp://tracker.openbittorrent.com:80'],
 ['udp://tracker.internetwarriors.net:1337'],
 ['udp://tracker.leechers-paradise.org:6969'],
 ['udp://tracker.coppersurfer.tk:6969'],
 ['udp://exodus.desync.com:6969'],
 ['wss://tracker.btorrent.xyz'],
 ['wss://tracker.openwebtorrent.com'],
]
var opts = {
    maxConns: 100,
    dht: false,
  //  announce: announceList
};

var client = new WebTorrent(opts);
if (WebTorrent.WEBRTC_SUPPORT) {
    console.log("webrtc supported");
} else {
    console.log("webrtc NOT supported");
}
var torrent = client.seed("seed", { announceList: announceList, maxWebConns: 100 }, function (torrent) {

    //var torrent = client.seed(buffer_payload, { forced_id: url_hash, announceList: announceList }, function (torrent) {
    console.log(torrent.magnetURI);

    torrent.on('upload', function (bytes) {
        console.log('Sending this object to peer (' + bytes + ' bytes)')
    })
    torrent.on('wire', function (wire) {
        console.log('Peer (' + wire.remoteAddress + ') connected over ' + wire.type + '.')
    })
});


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

//var k = 42;
//console.log("firstkfib(" + k + ")");

//console.log(format(firstkfib(k)));

