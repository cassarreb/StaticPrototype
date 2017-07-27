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