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
function c$(sel) {
    return document.querySelector(sel);
}
class AdManager {
    constructor(adData) {
        this.data = adData;
        var self = this;
        c$("AdManager AdManagerMainVideo video").onloadeddata = function() {
            c$("AdManager AdManagerLoadingAnimation").hidden = true;
            c$("AdManager AdManagerMainVideo video").play();
            c$("AdManager AdManagerSkipAdButton").dataset.disabled = "disabled";
            self.skipAdDelay();
        }
        c$("AdManager AdManagerMainVideo video").onended = function() {
            c$("AdManager").hidden = true;
            c$("AdManagerModal").hidden = true;
        }
        c$("AdManager AdManagerSkipAdButton").dataset.disabled = "disabled";
        c$("AdManager AdManagerSkipAdButton").onclick = function() {
            if(this.dataset.disabled) return;
            c$("AdManager AdManagerMainVideo video").playbackRate = 16;
            this.dataset.disabled = "disabled";
        }
    }
    getAd() {
        return choice(this.data.ads);
    }
    loadAd(ad) {
        if(!c$("AdManager").hidden) return;
        c$("AdManager").hidden = false
        c$("AdManagerModal").hidden = false;
        c$("AdManager AdManagerLoadingAnimation").hidden = false;
        c$("AdManager AdManagerLink a").href = "http://" + ad.origin + "/";
        c$("AdManager AdManagerLink a").innerHTML = ad.name + "<br><i>" + ad.origin + "</i>";
        c$("AdManager AdManagerMainVideo video").src = "ads/" + ad.id + ".mp4";
    }
    loadRandomAd() {
        return this.loadAd(this.getAd());
    }
    skipAdDelay() {
        var delay = this.data.delay;
        c$("AdManager AdManagerSkipAdButton").innerText = delay;
        var delayId = setInterval(function() {
            delay--;
            c$("AdManager AdManagerSkipAdButton").innerText = delay;
            if(delay < 1) {
                clearInterval(delayId);
                c$("AdManager AdManagerSkipAdButton").dataset.disabled = "";
                c$("AdManager AdManagerSkipAdButton").innerText = "Skip Ad";
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
