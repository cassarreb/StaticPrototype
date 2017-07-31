var express = require('express');
var path = require('path');
var port = process.env.port || 1337;
var app = express();
var count = 0;


var logger = function (req, res, next) {

    count++;
    console.log(count);
    next();
}


    app.use(logger); // Here you add your logger to the stack.
    app.use(express.static(path.join(__dirname, '/public'))); // The Express routes handler.



var server = app.listen(port);

var Buffer = require('safe-buffer').Buffer
var debug = require('debug')('all')
var sha = require('simple-sha1')
var WebTorrent = require('webtorrent-hybrid')
var debug = require('debug')('all')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var System = require('systemjs')
var opts = {
    maxConns: 100
};

var client = new WebTorrent(opts);

announceList = [
 ['udp://tracker.openbittorrent.com:80'],
 ['udp://tracker.internetwarriors.net:1337'],
 ['udp://tracker.leechers-paradise.org:6969'],
 ['udp://tracker.coppersurfer.tk:6969'],
 ['udp://exodus.desync.com:6969'],
 ['wss://tracker.btorrent.xyz'],
 ['wss://tracker.openwebtorrent.com'],
]
if (WebTorrent.WEBRTC_SUPPORT) {
    console.log("webrtc supported");
} else {
    console.log("webrtc NOT supported");
}
var torrent = client.seed("seed", { announceList: announceList }, function (torrent) {

//var torrent = client.seed(buffer_payload, { forced_id: url_hash, announceList: announceList }, function (torrent) {
    console.log(torrent.magnetURI);

    torrent.on('upload', function (bytes) {
        console.log('Sending this object to peer (' + bytes + ' bytes)')
    })
    torrent.on('wire', function (wire) {
        console.log('Peer (' + wire.remoteAddress + ') connected over ' + wire.type + '.')
    })
});



//var torrent = client.seed("seed/page2/", { announceList: announceList }, function (torrent) {

//    //var torrent = client.seed(buffer_payload, { forced_id: url_hash, announceList: announceList }, function (torrent) {
//    console.log(torrent.magnetURI);

//    torrent.on('upload', function (bytes) {
//        console.log('Sending this object to peer (' + bytes + ' bytes)')
//    })
//    torrent.on('wire', function (wire) {
//        console.log('Peer (' + wire.remoteAddress + ') connected over ' + wire.type + '.')
//    })
//});

//var start = Date.now();
//var dest = false;
//setInterval(function () {
//    //Ideally, here we stop the torrent from downloading
//    var end = Date.now();
   

//    if (end - start > 30000 && !dest) {
//        client.destroy(function callback(err) { console.log("client has been destroyed")})
//        dest = true;
//    }
//}, 10000, client);