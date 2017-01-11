
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


if(isIE()) {
    alert("인터넷 익스플로러 11 미만에서는\n사용할 수 없습니다.");
}

if(isIE11()) {
    alert("인터넷 익스플로러에서는 느릴 수 있습니다.\n다른 브라우저를 추천합니다.");
}
