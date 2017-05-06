var date = new Date();
var timestamp = Math.floor(date.getTime()/60000);

var pureIndex = window.location.search.indexOf("u=");
var pureQuery;
if(pureIndex == -1)
pureQuery = window.location.search.substr(0, pureIndex-1);


if(window.location.search.indexOf("u="+timestamp) == -1) {
    window.location.replace("http://hanpyo.com/?u="+timestamp);
}
else {
    history.pushState("","한표 :: 한기대 시간표 웹","http://hanpyo.com");
}
