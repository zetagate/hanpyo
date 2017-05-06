function idxToPk(idx)
{
    return SUBJECT_DATA[idx][0] + SUBJECT_DATA[idx][3];
}


function pkToIdx(pk)
{
    var cod = pk.substring(0,6);
    var cls = pk.substring(6,8);
    for(var i in SUBJECT_DATA) {
        if(cod == SUBJECT_DATA[i][0] && cls == SUBJECT_DATA[i][3]) {
            return Number(i);
        }
    }
    return -1;
}


function serializeCart(arr)
{
    var ret = "";
    arr.forEach(function(entry){
        var sum = 0;
        sum += (entry[0].charCodeAt()-65) * 26*26*100000;
        sum += (entry[1].charCodeAt()-65) * 26*100000;
        sum += (entry[2].charCodeAt()-65) * 100000;
        sum += Number(entry[3]) * 10000;
        sum += Number(entry[4]) * 1000;
        sum += Number(entry[5]) * 100;
        sum += Number(entry[6]) * 10;
        sum += Number(entry[7]);
        //console.log(sum);

        for(var i=0; i<6; ++i) {
            var rest = sum%62;
            if(rest < 26) {
                ret += String.fromCharCode(rest+65);
            }
            else if(rest < 52) {
                ret += String.fromCharCode(rest-26+97);
            }
            else {
                ret += String.fromCharCode(rest-52+48);
            }
            sum = Math.floor(sum/62);
        }

    });
    return ret;
}


function unserializeCart(str)
{
    var cart = [];
    for(var n=0; n<str.length/6; ++n) {
        //console.log(str.substring(i*6,i*6+6));
        var sum = 0;
        var item = str.substring(n*6,n*6+6);
        var code = "";
        var quot;

        for(var i=0; i<6; ++i) {
            var cc = item[i].charCodeAt();
            if(cc >= 65 && cc <= 90)
                sum += (cc-65)*Math.pow(62, i);
            else if(cc >= 97 && cc <= 122)
                sum += (cc-97+26)*Math.pow(62, i);
            else if(cc >= 48 && cc <= 57)
                sum += (cc-48+52)*Math.pow(62, i);
            else
                return -1;
        }
        //console.log(sum);

        quot = Math.floor(sum/(26*26*100000));
        code += String.fromCharCode((quot+65).toString());
        sum %= 26*26*100000;

        quot = Math.floor(sum/(26*100000));
        code += String.fromCharCode((quot+65).toString());
        sum %= 26*100000;

        quot = Math.floor(sum/100000);
        code += String.fromCharCode((quot+65).toString());
        sum %= 100000;

        quot = Math.floor(sum/10000);
        code += quot.toString();
        sum %= 10000;

        quot = Math.floor(sum/1000);
        code += quot.toString();
        sum %= 1000;

        quot = Math.floor(sum/100);
        code += quot.toString();
        sum %= 100;

        quot = Math.floor(sum/10);
        code += quot.toString();
        sum %= 10;

        quot = Math.floor(sum);
        code += quot.toString();

        //console.log(code);

        cart.push(code);
    }

    return cart;
}


//example
//input : [100, 101, 102, 200, 300, 301]
//output : [100, 3, 200, 1, 300, 2]
function mergeNum(arr)
{
    if(arr.length == 0)
        return [];

    var result = [[arr[0],1]];
    var prev = arr[0];

    for(var i=1; i<arr.length; i++) {
        if(arr[i]-prev == 1)
            ++result[result.length-1][1];
        else
            result.push([arr[i], 1]);
        prev = arr[i];
    }
    return result;
}


function openPopup(url, w, h)
{
    var wd = window.open(url,"","height="+h+",width="+w+
        ",left=20,top=20,resizable=yes,scrollbars=yes,toolbar=no,menubar=no"+
        ",location=no,directories=no,status=no");
    return wd;
}


function send(content)
{
    /*
    $.ajax({
        url: 'http://vs.zetagate.com:8020/register2/',
        async: true,
        type: 'POST',
    	crossDomain: true,
        data: {
            msg: content
        },
        dataType: 'text',
        success: function(jqXHR) {},
        error: function(jqXHR) {},
    });
    */
}
