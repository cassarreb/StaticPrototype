var start = Date.now();
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
var download_count = 0;
var magnet = 'magnet:?xt=urn:btih:' + "5b9cbb7e198d501278906b977164ea57683e2266" + '&dn=Unnamed+Torrent+1476541118022&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'
function logLocalStorage(message, req_no, status, timestamp) {

    var currentStack = localStorage.getItem("log-p2p");
    if (currentStack != null)
        localStorage.setItem("log-p2p", currentStack + req_no + "," + message + "," + status + "," + timestamp + "\n");
    else
        localStorage.setItem("log-p2p", req_no + "," + message + "," + status + "," + timestamp + "\n");
}

torrent = client.add(magnet, onTorrent);
var start = Date.now();
console.log(torrent);

client.on('torrent', function (torrent) {
    var end = Date.now(); console.log("CLIENT.ONTORRENT has launched " + (end - start));
    logLocalStorage("client.ONTORRENT", client.peerId, (end - start), Date.now());
})
//torrent.on('infoHash', function (infoHash) { console.log("TORRENT.INFOHASH has launched" + infoHash); })

torrent.on('metadata', function (meta) {
    var end = Date.now(); console.log("TORRENT.METADATA has launched " + meta + " " + (end - start));
    logLocalStorage("torrent.METADATA", client.peerId, (end - start), Date.now());
})

torrent.on('ready', function (data) { var end = Date.now(); console.log("TORRENT.READY has launched" + (end - start) + data); })

//torrent.on('warning', function (err) { console.log("TORRENT.WARNING has launched" + err); })
torrent.on('error', function (err) { var end = Date.now(); console.log("TORRENT.ERROR has launched" + (end - start)); })
torrent.on('download', function (bytes) {
    var end = Date.now(); console.log("TORRENT.DOWNLOAD has launched" + bytes + (end - start));
    if (download_count == 0) {
        logLocalStorage("torrent.DOWNLOAD-START", client.peerId, (end - start), Date.now());
        download_count++;
    }
})
torrent.on('upload', function (bytes) { var end = Date.now(); console.log("TORRENT.UPLOAD has launched" + bytes + (end - start)); })
torrent.on('wire', function (wire) { var end = Date.now(); console.log("TORRENT.WIRE has launched" + wire.remoteAddress + " " + wire.type + " " + (end - start)); })
torrent.on('done', function () {
    console.log('torrent finished downloading');
    logLocalStorage("torrent.DOWNLOAD-END", client.peerId, (end - start), Date.now());
    torrent.files.forEach(function (file) {
        // do something with file
        var end = Date.now();

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


                    console.log(file);
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


                    console.log(file);
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


                    console.log(file);
                    file.getBlobURL(function (err, url) {
                        if (err) throw err
                        console.log(url);
                        listItem.setAttribute("href", url);
                    })
                }
            }
        });
    })
})

function onTorrent(torrent) {
    console.log(torrent);
    
   
   //// var file_array = [];
   // torrent.files.forEach(function (file) {
   //     //file_array.push a
     
        
   // })
}

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


(function (console) {

    console.save = function (data, filename) {

        if (!data) {
            console.error('Console.save: No data')
            return;
        }

        if (!filename) filename = 'console.json'

        if (typeof data === "object") {
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], { type: 'text/json' }),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)
//console.save(localStorage.getItem("log-p2p"), "logging-" + Date.now() + ".txt")