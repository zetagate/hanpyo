function isIE()
{
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("msie")!=-1) {
        return true;
    }
    return false;
}


function isIE11()
{
    if(navigator.userAgent.indexOf("Trident")!=-1) {
        return true;
    }
    return false;
}


function isEdge()
{
    if(navigator.userAgent.indexOf("Edge")!=-1) {
        return true;
    }
    return false;
}


function isMobile()
{
    var filter = "win16|win32|win64|mac|macintel";
    if(navigator.platform) {
        if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            return true;
        } else {
            return false;
        }
    }
}


function isFacebookApp()
{
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}

function isKakaoApp()
{
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("KAKAO") > -1);
}


if(isIE()) {
    alert("인터넷 익스플로러 11 미만에서는\n사용할 수 없습니다.");
}

if(isIE11()) {
    alert("인터넷 익스플로러에서는 느릴 수 있습니다.\n다른 브라우저를 추천합니다.");
}
