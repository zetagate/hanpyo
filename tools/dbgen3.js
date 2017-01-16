/**
 * Created by user on 2016-12-05.
 */


var DAY_TIME = {"월":0, "화":100, "수":200, "목":300, "금":400, "토":500};
var AB_TIME = {"A":0, "B":1};

var depDict = {};
var divDict = {};


function doOnLoad()
{
    $("#fileInput").change(doOpenFile);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function doOpenFile() {
    var reader = new FileReader();
    reader.onload = function(e) {
        let data = reader.result;
        let output = processData(data);
        download("output.jsd", output);
        //console.log("res = " + reader.result);
    }
    reader.onerror = function(evt) {
        console.log(evt.target.error.code);
    }
    reader.readAsText(this.files[0]);
}

function processData(data)
{
    var xmlDoc = $.parseXML(data);
    var xmlData = xmlDoc.documentElement.children;

    /*
     let SUBJECT_OBJDATA = [
     {key1:"val1", key2:"val2",...},
     {key1:"val1", key2:"val2",...},
     {key1:"val1", key2:"val2",...},
     ...
     ...
     ];
     */
    var output = "let SUBJECT_DATA = [\r\n";
    for(var i=0; i<xmlData.length; i++) {
        var subject = xmlData[i];
        var obj = {};
        output += "[";
        for(var j=0; j<subject.children.length; j++) {
            if(subject.children[j].tagName == "tty") continue;
            if(subject.children[j].tagName == "dvi") continue;
            obj[subject.children[j].tagName] = subject.children[j].innerHTML;
            if(subject.children[j].tagName.search("tm") != 0) {
                output += "\"" + packSpace(subject.children[j].innerHTML) + "\",";
            }
        }
        output += "["
        obj.tm = new Array();
        for(let j=0; j<16; j++) {
            let str = obj["tm"+(j+1)];
            delete obj["tm"+(j+1)];
            if(!str || str.length<5) continue;
            let tm = 0;
            tm += DAY_TIME[str.charAt(0)];
            tm += 2*(parseInt(str.substr(2,2)-1));
            tm += AB_TIME[str.charAt(4)];
            obj.tm[j] = tm;
            output += tm + ",";
        }
        output += "]";
        output += "],\r\n";
    }
    output += "];";

    return output;

}

function packSpace(str)
{
    var len = str.length;
    var i;
    for(i=len-1; i>=0; --i) {
        if(str[i] != ' ') break;
    }
    return str.substr(0, i+1);
}

