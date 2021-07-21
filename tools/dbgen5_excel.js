/**
 * Created by user on 2021-07-21.
 */

 var DAY_TIME = {"월":0, "화":100, "수":200, "목":300, "금":400, "토":500};
 var AB_TIME = {"A":0, "B":1};
 
 function doOnLoad() {
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
         const _data = reader.result;
         const data = XLSX.read(_data, { type: 'binary'});

         var output = processData(data);
         download("output.jsd", output);
     }
     reader.onerror = function(evt) {
         console.log(evt.target.error.code);
     }
     reader.readAsBinaryString(this.files[0]);
 }
 
 function processData(data) {
    let output = "var SUBJECT_DATA = [\r\n";
    
    data.SheetNames.forEach(sheetName => {
        let rows = XLSX.utils.sheet_to_json(data.Sheets[sheetName]);
        
        rows.forEach(row => {
            const wantedInfomation = [
                "과목코드",
                "교과목명",
                "분반",
                "수강대상",
                "강의실",
                "학\r\n점",
                "설\r\n계",
                "개설학부(과)",
                "담당교수",
                "수강\r\n정원",
            ]

            let subjectInfo = "[";
            wantedInfomation.forEach(info => {
                if (row.hasOwnProperty(info)) subjectInfo += `"${row[info]}",`;
                else subjectInfo += `"",`;
            })

            if (row.hasOwnProperty("강의시간")) {
                subjectInfo += "[";
                const str = row["강의시간"];
                var unit = str.split(",");
                for(var j=0; j<unit.length; j++) {
                    if(unit[j].length == 8) {
                        var startStr = unit[j].substr(1,3);
                        var endStr = unit[j].substr(5,3);
                        var startTime = DAY_TIME[unit[j].charAt(0)] + 2*(parseInt(startStr.substr(0,2))-1) + AB_TIME[startStr.charAt(2)];
                        var endTime = DAY_TIME[unit[j].charAt(0)] + 2*(parseInt(endStr.substr(0,2))-1) + AB_TIME[endStr.charAt(2)];
        
                        for(var k=startTime; k<=endTime; k++) {
                            subjectInfo += k + ",";
                        }
                    }
                    else if(unit[j].length == 4) {
                        var startStr = unit[j].substr(1,3);
                        var startTime = DAY_TIME[unit[j].charAt(0)] + 2*(parseInt(startStr.substr(0,2))-1) + AB_TIME[startStr.charAt(2)];
                        subjectInfo += startTime + ",";
                    }
                    else {
                        console.log(row);
                    }
                }
                subjectInfo += "]],";
            }
            else subjectInfo += "[]],";

            output += `${subjectInfo}\r\n`;
        })
    })

    output += "];";
    return output;
 }
