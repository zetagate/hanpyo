var W_C = 80; //cell
var W_AX = 80; //axis
var H_C = 30; //cell
var H_AX = 40; //axis
var MGN = 2.5; //margin

var COLOR_BG1 = "#FFFFFF";
var COLOR_BG2 = "#FFFFFF";
var COLOR_LINE = "#000000";
var COLOR_TEXT = "#000000";
var FONT_TEXT = "13px dotum";
var COLOR_SET = ["#42BAFF","#00DC6D","#F1BE5B","#FFA6E9","#FFAB6E",
                "#FFFD66","#A4A4A4","#E191FF","#85E4FF","#FF7F32"];

var TIME_NAME = ["01A","01B","02A","02B","03A","03B","04A","04B","05A","05B","06A","06B","07A","07B","08A","08B","09A","09B"];
var CLOCK_NAME = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];
var WEEK_NAME = ["월요일", "화요일", "수요일", "목요일", "금요일"];


function drawClear(ctx, w, h)
{
    ctx.clearRect(0, 0, w, h);
}


function drawFrame(ctx)
{
    var xs;
    var ys;

    ctx.beginPath();

    var grd = ctx.createLinearGradient(0, 0, 0, 600);
    grd.addColorStop(0, COLOR_BG1);
    grd.addColorStop(1, COLOR_BG2);

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = COLOR_LINE;
    ctx.fillStyle = COLOR_TEXT;
    ctx.font = FONT_TEXT;
    //ctx.rect(MGN, MGN, canvas.width-MGN*2, canvas.height-MGN*2);


    ctx.rect(MGN, MGN, W_AX, H_AX);
    for(var i=0; i<18; i++) {
        xs = MGN;
        ys = MGN+i*H_C+H_AX;
        var divWidth = 38;
        ctx.rect(xs, ys, divWidth, H_C);
        ctx.rect(xs+divWidth, ys, W_AX-divWidth, H_C);
        ctx.fillText(TIME_NAME[i],xs+8,ys+19);
        ctx.fillText(CLOCK_NAME[i],xs+4+W_AX/2,ys+19);
    }
    ctx.rect(xs, ys+H_C, W_AX, H_C*2);
    ctx.fillText("이후",xs+26,ys+H_C+34);

    ctx.lineWidth = 1;
    for(var j=0; j<WEEK_NAME.length; j++) {
        ctx.rect(MGN+j*W_C+W_AX, MGN, W_C, H_AX);
        ctx.fillText(WEEK_NAME[j],MGN+j*W_C+W_AX+21,MGN+25);
        for(var i=0; i<18; i++) {
            xs = MGN+j*W_C+W_AX;
            ys = MGN+i*H_C+H_AX;
            ctx.rect(xs, ys, W_C, H_C);
        }
        ctx.rect(xs, ys+H_C, W_C, H_C*2);
    }

    ctx.stroke();
}


function drawSelection(ctx, times, thickness)
{

    var tgt;
    var xs;
    var ys;
    var height;

    ctx.beginPath();
    ctx.lineWidth = thickness;
    ctx.strokeStyle="#F72244";

    if(times.length == 0) return;
    for(var i=0; i<times.length; i++) {
        tgt = times[i][0];
        xs = MGN + W_AX + Math.floor(tgt/100)*W_C;
        if(tgt%100<17) {
            ys = MGN + H_AX + (tgt%100)*H_C;
            height = H_C*times[i][1];
        }
        else {
            ys = MGN + H_AX + 18*H_C;
            height = H_C*2;
        }
        ctx.rect(xs, ys, W_C, height);
    }
    ctx.stroke();
}


function drawCartList(ctx, db, list)
{
    ctx.lineWidth = 2;
    ctx.strokeStyle="#000000";
    ctx.fillStyle="#000000";
    //ctx.font="12px Nanum Gothic";

    for(var i=0; i<list.length; i++) {
        var sbj = db[pkToIdx(list[i])];
        var times = mergeNum(sbj[D_TME]);
        for(var j=0; j<times.length; j++) {
            var xs;
            var ys;
            var height;
            var tgt = times[j][0];
            var proFlag = true;
            xs = MGN + W_AX + Math.floor(tgt/100)*W_C;
            if(tgt%100<17) {
                ys = MGN + H_AX + (tgt%100)*H_C;
                height = H_C*times[j][1];
            }
            else {
                ys = MGN + H_AX + 18*H_C;
                height = H_C*2;
                //proFlag = false;
            }

            ctx.fillStyle = COLOR_SET[i%COLOR_SET.length];
            ctx.fillRect(xs, ys, W_C, height);
            ctx.fillStyle="#000000";
            ctx.strokeStyle="#000000";
            ctx.lineWidth=2;
            ctx.strokeRect(xs, ys, W_C, height);
            var text = sbj[D_KOR] + "\n" + sbj[D_CLS];
            if(proFlag) text += " " + sbj[D_PRO];
            drawTextBox(ctx, text, xs+2, ys+20, W_C-4);
        }
    }
}


function drawTextBox(ctx, text, x, y, fieldWidth) {
    var line = "";
    for(var i=0; i<text.length; i++) {
        var tempLine = line + text[i];
        var tempWidth = ctx.measureText(tempLine).width;
        if (tempWidth < fieldWidth && text[i] != "\n") {
            line = tempLine;
        }
        else {
            ctx.fillText(line, x, y);
            line = text[i];
            y += 15;
        }
    }
    ctx.fillText(line, x, y);
}
