var Buffer = require('safe-buffer').Buffer
var debug = require('debug')('all')
var sha = require('simple-sha1')
var WebTorrent = require('webtorrent')
var debug = require('debug')('all')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var System = require('systemjs')
var opts = {
    maxConns: 100,
    dht: false
};

var client = new WebTorrent(opts);

announce = [
 ['udp://tracker.openbittorrent.com:80'],
 ['udp://tracker.internetwarriors.net:1337'],
 ['udp://tracker.leechers-paradise.org:6969'],
 ['udp://tracker.coppersurfer.tk:6969'],
 ['udp://exodus.desync.com:6969'],
 ['wss://tracker.btorrent.xyz'],
 ['wss://tracker.openwebtorrent.com'],
 ["wss://tracker.fastcast.nz"]
]

var script_array = [];

var start = Date.now();

function fetch(altern) {
    var result = sha.sync(altern);
    //   var magnet = 'magnet:?xt=urn:btih:' + result + '&dn=Unnamed+Torrent+1476541118022&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'

    var magnet = 'magnet:?xt=urn:btih:' + result + '&dn=Unnamed+Torrent+1505659169501&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com';

    console.log("fetching " + altern + " " + result);
    var torrent = client.add(magnet, onTorrent);

    console.log(torrent);
    // console.log("time in fetch " + System.nanoTime());

    torrent.on('done', function (info) {
        // endTime = System.nanoTime();
        //  console.log("time in torrent done " + System.nanoTime());
        console.log('Cache received');

        torrent.files.forEach(function (file) {
            file.getBuffer(function (err, b) {


                var end = Date.now();
                console.log("time diff: " + (end - start));
                if (err) return log(err.message)
                var payload = JSON.parse(b.toString('utf8'))
                var obj_base64 = payload.obj;

                if (obj_base64.includes("data:image/png;base64")) {
                    console.log("got image ");

                    var imageTags = Array.from(document.getElementsByTagName("img"));
                    imageTags.forEach(function (listItem, index) {
                        if (listItem.getAttribute("altern") == payload.resource) {
                            listItem.src = obj_base64;
                            localStorage.setItem(listItem.getAttribute("altern"), obj_base64);
                        }
                    });
                }
                //else if (obj_base64.includes("data:text/javascript;base64")) {
                //    console.log("got script");

                //    var scriptTags = Array.from(document.getElementsByTagName("script"));
                //    scriptTags.forEach(function (listItem, index) {
                //        if (listItem.getAttribute("altern") == payload.resource) {
                //            console.log("adding script to array");
                //            script_array.push({
                //                key: listItem.getAttribute("altern"),
                //                value: obj_base64
                //            });
                //            localStorage.setItem(listItem.getAttribute("altern"), obj_base64);
                //        }
                //    });
                //}
                //else if (obj_base64.includes("data:text/css;base64")) {
                //    console.log("got style");

                //    var styleTags = Array.from(document.getElementsByTagName("link"));
                //    styleTags.forEach(function (listItem, index) {
                //        if (listItem.getAttribute("altern") == payload.resource) {
                //            listItem.setAttribute("href", obj_base64);
                //            localStorage.setItem(listItem.getAttribute("altern"), obj_base64);
                //        }
                //    });
                //}
            })
        })

    })
    torrent.on('download', function (bytes) {
        var end = Date.now(); console.log("TORRENT.DOWNLOAD has launched" + bytes + (end - start));
    })
    torrent.on('wire', function (wire) {
        console.log('Peer (' + wire.remoteAddress + ') connected over ' + wire.type + ' (Connection ID: ' + wire.peerId.substr(0, 10) + ').')
    })

    torrent.on('metadata', function (meta) {
        var end = Date.now(); console.log("TORRENT.METADATA has launched " + meta + " " + (end - start));

    })

    torrent.on('upload', function (bytes) { var end = Date.now(); console.log("TORRENT.UPLOAD has launched" + bytes + (end - start)); })

}

function seed(url, base64obj) {
    sha(base64obj, function (base64_hash) {
        sha(url, function (url_hash) {
            var payload = { date: new Date(), resource: url, url_hash: url_hash, obj: base64obj }
            var buffer_payload = Buffer.from(JSON.stringify(payload), 'utf8');
            console.log("Starting to seed " + url + " " + url_hash);


            var torrent = client.seed(buffer_payload, { forced_id: url_hash, announceList: announce }, function (torrent) {
                console.log(torrent);

                torrent.on('upload', function (bytes) {
                    console.log('Sending this object to peer (' + bytes + ' bytes)')
                })
                torrent.on('wire', function (wire) {
                    console.log('Peer (' + wire.remoteAddress + ') connected over ' + wire.type + '.')
                })  
            });
        });
    });
}

window.onload = function () {

   // var rand = Math.random();
    var imageTags = Array.from(document.getElementsByTagName("img"));
    var scriptTags = Array.from(document.getElementsByTagName("script"));
    var styleTags = Array.from(document.getElementsByTagName("link"));

    //scriptTags.forEach(function (listItem, index) {
    //    if (listItem.getAttribute("src") == null || listItem.getAttribute("src") == "#") {
    //        if (localStorage.getItem(listItem.getAttribute("altern")) != null) {
    //            // listItem.setAttribute("src", localStorage.getItem(listItem.getAttribute("altern")));
    //            console.log("OBTAINED " + listItem.getAttribute("altern") + " FROM LOCAL STORAGE");
    //            script_array.push({
    //                key: listItem.getAttribute("altern"),
    //                value: localStorage.getItem(listItem.getAttribute("altern"))
    //            });
    //        }
    //        else {
    //            //have to get from peers
    //            //if peer not found, get from server
    //            console.log("Script Empty. Must find peer.");
    //            console.log("Attempting to fetch from peers : " + listItem.getAttribute("altern"));
    //            fetch(listItem.getAttribute("altern"));
    //        }
    //    }
    //    else {
    //        console.log("Script Src tag not empty. Adding to local storage.");
    //        //start seeding
    //        var url = listItem.getAttribute("src");
    //        if (!url.includes("torr-per"))
    //            getViaHTTP(url, "data:text/javascript;base64,", listItem);
    //    }
    //});

    //styleTags.forEach(function (listItem, index) {

    //    if (listItem.getAttribute("href") == null || listItem.getAttribute("href") == "#") {
    //        if (localStorage.getItem(listItem.getAttribute("altern")) != null) {
    //            listItem.setAttribute("href", localStorage.getItem(listItem.getAttribute("altern")));
    //            console.log("OBTAINED " + listItem.getAttribute("altern") + " FROM LOCAL STORAGE");
    //        }
    //        else {
    //            //have to get from peers
    //            //if peer not found, get from server
    //            console.log("Style Empty. Must find peer.");
    //            console.log("Attempting to fetch from peers: " + listItem.getAttribute("altern"));
    //            fetch(listItem.getAttribute("altern"));
    //        }
    //    }
    //    else {
    //        console.log("Style Link Href tag not empty. Adding to local storage.");
    //        //start seeding
    //        var url = listItem.getAttribute('href');
    //        getViaHTTP(url, "data:text/css;base64,", listItem);
    //    }
    //});

    imageTags.forEach(function (listItem, index) {
        if (listItem.getAttribute("src") == null || listItem.getAttribute("src") == "#") {
            //if empty: check local storage first then fetch
           // if (localStorage.getItem(listItem.getAttribute("altern")) != null) {
              //  listItem.setAttribute("src", localStorage.getItem(listItem.getAttribute("altern")));
              //  console.log("OBTAINED " + listItem.getAttribute("altern") + " FROM LOCAL STORAGE");
           // }
           // else {
                //have to get from peers
                //if peer not found, get from server
                //console.log("Image Empty. Must find peer.");
                console.log("Attempting to fetch from peers : " + listItem.getAttribute("altern"));
                // console.log("time before fetch " + System.currentTimeMillis());
                fetch(listItem.getAttribute("altern"));
           // }
        }
        else {
            console.log("img tag not empty. Starting to seed.");

            // Create an empty canvas element
            var canvas = document.createElement("canvas");
            canvas.width = listItem.width;
            canvas.height = listItem.height;

            // Copy the image contents to the canvas
            var ctx = canvas.getContext("2d");
            ctx.drawImage(listItem, 0, 0);

            // Get the data-URL formatted image
            //PNG OR OTHER TYPES!
            var dataURL = canvas.toDataURL("image/png");

          //  localStorage.setItem(listItem.getAttribute("src"), dataURL);
            seed(url, dataURL);
        }
    });


    var start = Date.now();

    //setInterval(function () {

    //    for (var i = 0; i < localStorage.length; i++) {

    //        var key = sha.sync(localStorage.key(i));
    //        if (client.get(key) == null)
    //            seed(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
    //    }

    //    var scripttags = Array.from(document.getElementsByTagName("script"));
    //    if (script_array.length == scripttags.length - 1) {
    //        scripttags.forEach(function (listitem, index) {
    //            script_array.forEach(function (script, index_inner) {
    //                if (listitem.getAttribute("altern") == script.key) {
    //                    // console.log("script being set here");
    //                    listitem.setAttribute("src", script.value);
    //                }


    //            });

    //        });
    //    }
    //}, 2000, script_array, client);

    setInterval(function () {
        //Ideally, here we stop the torrent from downloading
        var end = Date.now();
        if (end - start > 15000) {
            //for scripts, check each one and add them after each other
            //scriptTags.forEach(function (listItem, index) {
            //    if (listItem.getAttribute("src") == null || listItem.getAttribute("src") == "#") {
            //        listItem.setAttribute("src", listItem.getAttribute("altern"));
            //        var url = listItem.getAttribute("src");
            //        getViaHTTP(url, "data:text/javascript;base64,", listItem);
            //        console.log("set");
            //    }
            //})

            //styleTags.forEach(function (listItem, index) {
            //    if (listItem.getAttribute("href") == null || listItem.getAttribute("href") == "#") {
            //        listItem.setAttribute("href", listItem.getAttribute("altern"));
            //        var url = listItem.getAttribute('href');
            //        getViaHTTP(url, "data:text/css;base64,", listItem);
            //        console.log("set");
            //    }
            //})

            imageTags.forEach(function (listItem, index) {
                if (listItem.getAttribute("src") == null || listItem.getAttribute("src") == "#") {
                    listItem.setAttribute("src", listItem.getAttribute("altern"));
                    getImage(listItem);
                    console.log("set");
                }
            })
        }
    }, 3000);
};

function onTorrent(torrent) {

    console.log("on torrent is called ");
    torrent.files.forEach(function (file) {
        file.getBuffer(function (err, b) {


            var end = Date.now();
            console.log("time diff: " + (end - start));
            if (err) return log(err.message)
            var payload = JSON.parse(b.toString('utf8'))
            var obj_base64 = payload.obj;

            if (obj_base64.includes("data:image/png;base64")) {
                console.log("got image ");

                var imageTags = Array.from(document.getElementsByTagName("img"));
                imageTags.forEach(function (listItem, index) {
                    if (listItem.getAttribute("altern") == payload.resource) {
                        listItem.src = obj_base64;
                        localStorage.setItem(listItem.getAttribute("altern"), obj_base64);
                    }
                });
            }
            //else if (obj_base64.includes("data:text/javascript;base64")) {
            //    console.log("got script");

            //    var scriptTags = Array.from(document.getElementsByTagName("script"));
            //    scriptTags.forEach(function (listItem, index) {
            //        if (listItem.getAttribute("altern") == payload.resource) {
            //            console.log("adding script to array");
            //            script_array.push({
            //                key: listItem.getAttribute("altern"),
            //                value: obj_base64
            //            });
            //            localStorage.setItem(listItem.getAttribute("altern"), obj_base64);
            //        }
            //    });
            //}
            //else if (obj_base64.includes("data:text/css;base64")) {
            //    console.log("got style");

            //    var styleTags = Array.from(document.getElementsByTagName("link"));
            //    styleTags.forEach(function (listItem, index) {
            //        if (listItem.getAttribute("altern") == payload.resource) {
            //            listItem.setAttribute("href", obj_base64);
            //            localStorage.setItem(listItem.getAttribute("altern"), obj_base64);
            //        }
            //    });
            //}
        })
    })
}

function getViaHTTP(url, heading, listItem) {
    var xhr;
    var js_resp;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            js_resp = xhr.responseText;
            var base64img = btoa(unescape(encodeURIComponent(js_resp)));
            if (heading.includes(":text/css"))
                localStorage.setItem(listItem.getAttribute("href"), heading + base64img);
            else {
                localStorage.setItem(listItem.getAttribute("src"), heading + base64img);
                script_array.push({
                    key: listItem.getAttribute("src"),
                    value: heading + base64img
                });
            }
            seed(url, heading + base64img);
        }
    };
    xhr.open("GET", url); //assuming file is plaintext
    xhr.send();
}

function getImage(listItem) {
    var image = new Image();
    var canvas = document.createElement("canvas"),
        canvasContext = canvas.getContext("2d");

    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        canvasContext.drawImage(image, 0, 0, image.width, image.height);

        var dataURL = canvas.toDataURL("image/png");
        localStorage.setItem(listItem.getAttribute("src"), dataURL);
        seed(listItem.getAttribute("src"), dataURL);
    };

    image.src = listItem.getAttribute("src");
}