function serializeCart(arr)
{
    let ret = "";
    arr.forEach(function(entry){
        let sum = 0;
        sum += (entry[0].charCodeAt()-65) * 26*26*100000;
        sum += (entry[1].charCodeAt()-65) * 26*100000;
        sum += (entry[2].charCodeAt()-65) * 100000;
        sum += Number(entry[3]) * 10000;
        sum += Number(entry[4]) * 1000;
        sum += Number(entry[5]) * 100;
        sum += Number(entry[6]) * 10;
        sum += Number(entry[7]);
        //console.log(sum);

        for(let i=0; i<6; ++i) {
            let rest = sum%62;
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
    let cart [];

    for(let i=0; i<str.length/6; ++i) {
        //console.log(str.substring(i*6,i*6+6));
        let sum = 0;
        let item = str.substring(i*6,i*6+6);
        let code = "";
        let quot;

        for(let i=0; i<6; ++i) {
            let cc = item[i].charCodeAt();
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
