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
        var data = reader.result;
        var output = processData(data);
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
    var output = "var SUBJECT_DATA = [\r\n";
    for(var i=0; i<xmlData.length; i++) {
        var subject = xmlData[i];
        var obj = {};
        output += "[";
        for(var j=0; j<subject.children.length; j++) {
            if(subject.children[j].tagName == "dvi") continue;
            if(subject.children[j].tagName == "pfi") continue;
            obj[subject.children[j].tagName] = subject.children[j].innerHTML;
        }

        var cols = ["cod", "ttk", "cls", "dvi", "pla", "crd", "dsg", "dep", "pfn", "cap", "elr", "eng"];
        for(var j=0; j<cols.length; j++) {
            if(obj.hasOwnProperty(cols[j])) {
                output += "\"" + packSpace(obj[cols[j]]) + "\",";
            }
            else {
                output += "\"\",";
            }
        }

        var str = obj["sch"];
        delete obj["sch"];
        output += "["
        var unit = str.split(",");
        for(var j=0; j<unit.length; j++) {
            if(unit[j].length == 8) {
                var startStr = unit[j].substr(1,3);
                var endStr = unit[j].substr(5,3);
                var startTime = DAY_TIME[unit[j].charAt(0)] + 2*(parseInt(startStr.substr(0,2))-1) + AB_TIME[startStr.charAt(2)];
                var endTime = DAY_TIME[unit[j].charAt(0)] + 2*(parseInt(endStr.substr(0,2))-1) + AB_TIME[endStr.charAt(2)];

                for(var k=startTime; k<=endTime; k++) {
                    output += k + ",";
                }
            }
            else if(unit[j].length == 4) {
                var startStr = unit[j].substr(1,3);
                var startTime = DAY_TIME[unit[j].charAt(0)] + 2*(parseInt(startStr.substr(0,2))-1) + AB_TIME[startStr.charAt(2)];
                output += startTime + ",";
            }
            else {
                console.log(subject);
            }
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

