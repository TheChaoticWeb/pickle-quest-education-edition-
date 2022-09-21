const DEFAULT_DATA = {
    "ads": [
        /*
        {
            "id": "cat"
,           "icon": false
,           "name": "cat"
,           "origin": "http.cat"
        }
        */
/*,*/       {
            "id": "grammarly2"
,           "icon": false
,           "name": "Grammarly"
,           "origin": "grammarly.com"
        }
,       {
            "id": "grammarly"
,           "icon": false
,           "name": "Grammarly"
,           "origin": "grammarly.com"
        }
        /*
,       {
            "id": "portal"
,           "icon": false
,           "name": "Portal"
,           "origin": "thinkwithportals.com"
        }
        
,       {
            "id": "portal2"
,           "icon": false
,           "name": "Portal 2"
,           "origin": "thinkwithportals.com"
        }
        */
,       {
            "id": "honey"
,           "icon": false
,           "name": "Honey"
,           "origin": "joinhoney.com"
        }
        ,       {
            "id": "billnye"
,           "icon": false
,           "name": "Bill Nye"
,           "origin": "example.com"
        }
        ,       {
            "id": "billnye2"
,           "icon": false
,           "name": "Bill Nye"
,           "origin": "example.com"
        }
    ]
,   "chance": 0.01
,   "delay": 14
};

function choice(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}
function $(sel) {
    return document.querySelector(sel);
}
class AdManager {
    constructor(adData) {
        this.data = adData;
        var self = this;
        $("AdManager AdManagerMainVideo video").onloadeddata = function() {
            $("AdManager AdManagerLoadingAnimation").hidden = true;
            $("AdManager AdManagerMainVideo video").play();
            $("AdManager AdManagerSkipAdButton").dataset.disabled = "disabled";
            self.skipAdDelay();
        }
        $("AdManager AdManagerMainVideo video").onended = function() {
            $("AdManager").hidden = true;
            $("AdManagerModal").hidden = true;
        }
        $("AdManager AdManagerSkipAdButton").dataset.disabled = "disabled";
        $("AdManager AdManagerSkipAdButton").onclick = function() {
            if(this.dataset.disabled) return;
            $("AdManager AdManagerMainVideo video").playbackRate = 16;
            this.dataset.disabled = "disabled";
        }
    }
    getAd() {
        return choice(this.data.ads);
    }
    loadAd(ad) {
        if(!$("AdManager").hidden) return;
        $("AdManager").hidden = false
        $("AdManagerModal").hidden = false;
        $("AdManager AdManagerLoadingAnimation").hidden = false;
        $("AdManager AdManagerLink a").href = "http://" + ad.origin + "/";
        $("AdManager AdManagerLink a").innerHTML = ad.name + "<br><i>" + ad.origin + "</i>";
        $("AdManager AdManagerMainVideo video").src = "ads/" + ad.id + ".mp4";
    }
    loadRandomAd() {
        return this.loadAd(this.getAd());
    }
    skipAdDelay() {
        var delay = this.data.delay;
        $("AdManager AdManagerSkipAdButton").innerText = delay;
        var delayId = setInterval(function() {
            delay--;
            $("AdManager AdManagerSkipAdButton").innerText = delay;
            if(delay < 1) {
                clearInterval(delayId);
                $("AdManager AdManagerSkipAdButton").dataset.disabled = "";
                $("AdManager AdManagerSkipAdButton").innerText = "Skip Ad";
            }
        }, 1000);
    }
}
AdManager.fetchData = async function() {
    if(location.protocol != "file:") {
        var res = await fetch("ads.json"), text = await res.text(), data = JSON.parse(text);
    } else {
        var data = DEFAULT_DATA;
    }
    return new AdManager(data);
}
