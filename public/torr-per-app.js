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
//var docs = {
//    "/index.html": "fdc3847a90aa0370aced0ced0798ea9214f087f9",
//    "/link.html": "caf83582da8c16230d73c1a5034e7d94c8d6982b"
//}

announceList = [
 ['udp://tracker.openbittorrent.com:80'],
 ['udp://tracker.internetwarriors.net:1337'],
 ['udp://tracker.leechers-paradise.org:6969'],
 ['udp://tracker.coppersurfer.tk:6969'],
 ['udp://exodus.desync.com:6969'],
 ['wss://tracker.btorrent.xyz'],
 ['wss://tracker.openwebtorrent.com'],
]
// "69bb1c7ec527703166bf3d217259e008f12aa9e1"
//docs[window.location.pathname] 
var magnet = 'magnet:?xt=urn:btih:' + "86ca860cfe67e2b7c676525fdb7e3850b41cdd1f" + '&dn=Unnamed+Torrent+1476541118022&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'


torrent = client.add(magnet, onTorrent);
console.log(torrent);

function onTorrent(torrent) {
    console.log(torrent);

   // var file_array = [];
    torrent.files.forEach(function (file) {
        //file_array.push a
        console.log(file);
        var scriptTags = Array.from(document.getElementsByTagName("script"));
        var imageTags = Array.from(document.getElementsByTagName("img"));
        var styleTags = Array.from(document.getElementsByTagName("link"));

        imageTags.forEach(function (listItem, index) {
            var altern = listItem.getAttribute("altern");
            if (altern != null) {
                altern = altern.split("/");
                altern = altern[altern.length - 1];
                if (file.name == altern) {
                    //file.appendTo(listItem);


                    file.getBlobURL(function (err, url) {
                        if (err) throw err
                        console.log(url);
                        listItem.setAttribute("src", url);
                    })
                }
            }
        });

        scriptTags.forEach(function (listItem, index) {
            var altern = listItem.getAttribute("altern");
            if (altern != null) {
                altern = altern.split("/");
                altern = altern[altern.length - 1];
                if (file.name == altern) {
                    //file.appendTo(listItem);


                    file.getBlobURL(function (err, url) {
                        if (err) throw err
                        console.log(url);
                        listItem.setAttribute("src", url);
                    })
                }
            }
          
        });

        styleTags.forEach(function (listItem, index) {
            var altern = listItem.getAttribute("altern");
            if (altern != null) {
                altern = altern.split("/");
                altern = altern[altern.length - 1];
                if (file.name == altern) {
                    //file.appendTo(listItem);


                    file.getBlobURL(function (err, url) {
                        if (err) throw err
                        console.log(url);
                        listItem.setAttribute("href", url);
                    })
                }
            }
        });
        
    })
}

var start = Date.now();
setInterval(function () {
    //Ideally, here we stop the torrent from downloading
    var end = Date.now();
    var scriptTags = Array.from(document.getElementsByTagName("script"));
    var imageTags = Array.from(document.getElementsByTagName("img"));
    var styleTags = Array.from(document.getElementsByTagName("link"));

    if (end - start > 10000) {
        //for scripts, check each one and add them after each other
        scriptTags.forEach(function (listItem, index) {
            if (listItem.getAttribute("src") == null || listItem.getAttribute("src") == "#") {
                listItem.setAttribute("src", listItem.getAttribute("altern"));
                console.log("set");
            }
        })

        styleTags.forEach(function (listItem, index) {
            if (listItem.getAttribute("href") == null || listItem.getAttribute("href") == "#") {
                listItem.setAttribute("href", listItem.getAttribute("altern"));
                
                console.log("set");
            }
        })

        imageTags.forEach(function (listItem, index) {
            if (listItem.getAttribute("src") == null || listItem.getAttribute("src") == "#") {
                listItem.setAttribute("src", listItem.getAttribute("altern"));
               
                console.log("set");
            }
        })
    }
}, 3000);