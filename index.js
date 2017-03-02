var grid1;
var grid2;
var canvas;
var ctx;
var cartedList = [];
var softLoaderInterval;

var MIN_GRIDBOX_WIDTH = 230;
var CANVAS_PADDING = 10;

var COOKIE_NAME = "v2017001";

var D_COD = 0;
var D_KOR = 1;
var D_CLS = 3;
var D_PRO = 7;
var D_TAR = 6;
var D_CRD = 2;
var D_DCR = 9;
var D_ENG = 8;
var D_ELR = 10;
var D_CAP = 4;
var D_DEP = 5;
var D_TME = 11;

$(window).on("load", function()
{

    canvas = $("#canvas")[0];
    ctx = canvas.getContext("2d");

    grid1 = new dhtmlXGridObject("grid1");
    grid2 = new dhtmlXGridObject("grid2");

    initGrid(grid1);
    initGrid(grid2);

    setSizes();
    grid1.setSizes();
    grid2.setSizes();

    loadCatalog(grid1, [""]);

    grid1.attachEvent("onRowSelect", onSelectCatalog);
    grid1.attachEvent("onRowDblClicked", onDblClickCatalog);
    grid2.attachEvent("onRowSelect", onSelectCart);
    grid2.attachEvent("onRowDblClicked", onDblClickCart);

    drawClear(ctx, canvas.width, canvas.height);
    drawFrame(ctx);

    $("#btnShare").on("click", onClickBtnShare);
    $("#btnLinkShare").on("click", onClickBtnLinkShare);
    $("#btnCart").on("click", onClickBtnCart);
    $("#btnUncart").on("click", onClickBtnUncart);
    $("#btnUncartAll").on("click", onClickBtnUncartAll);
    $("#btnEnter").on("click", onClickBtnEnter);
    $("#btnInfo").on("click", onClickBtnInfo);
    $("#btnSave").on("click", onClickBtnSave);
    $("#canvas").on("mouseover", onActCanvas);
    $("#canvas").on("click", onActCanvas);
    $("#canvas").on("contextmenu", onActCanvas);

    $("#comboDep").change(onSelectDep);
    $("#filter").change(onChangeFilter);


    var variables = window.location.search;
    if(variables.indexOf("c=0") == -1)
        loadCookie();
    else {
        var vArr = window.location.search.split(/[&?]/);
        for(var i in vArr) {
            if(vArr[i].substr(0, 2) == "d=") {
                loadCart(vArr[i].substr(2));
                break;
            }
        }

    }

});



function setSizes()
{
    var docuWidth = $(document).width();
    var size = docuWidth - (canvas.width+CANVAS_PADDING);
    if(size > MIN_GRIDBOX_WIDTH) {
        $(gridBox).width(docuWidth - canvas.width - 3*CANVAS_PADDING);
    }
    else {
        $(gridBox).width(docuWidth-2*CANVAS_PADDING);
    }
}


function initGrid(grid)
{
    //grid.setImagePath("dhtmlx/skins/web/imgs/dhxgrid_terrace/");
    grid.setHeader("코드,과목명,분반,교수님,대상,학점,비고,정원,신청,개설학부");
    grid.setInitWidths("55,150,40,60,70,40,40,40,40,100");
    grid.setColAlign("left,left,left,left,left,left,left,left,left");
    grid.setColTypes("txt,txt,txt,txt,txt,txt,txt,txt,txt,txt");
    grid.setColSorting("str,str,str,str,str,str,str,str,str,str");
    grid.setEditable(false);
    dhtmlxEvent(window, "resize", function(){grid.setSizes();});
    grid.init();
}


function loadCatalog(grid, filter)
{

    var k = 0;
    var fLen = filter.length;
    var keyword = filter[0].toUpperCase();
    var delay;

    if(fLen == 1) delay = 60;
    else delay = 2;

    grid.clearAll();

    clearInterval(softLoaderInterval);
    softLoaderInterval = setInterval(function()
    {
        if(k*100 >= SUBJECT_DATA.length) {
            clearInterval(softLoaderInterval);
            return;
        }
        for(var i=k*100; i<(k+1)*100 && i<SUBJECT_DATA.length; i++) {
            if(fLen == 1) {
                addRow(grid, i, i+1);
            }
            else {
                for(var j=1; j<fLen; j++) {
                    if(SUBJECT_DATA[i][filter[j]].toUpperCase().indexOf(keyword)
                    != -1) {
                        addRow(grid, i, i+1);
                        break;
                    }
                }
            }
        }
        ++k;
    }, delay);
}


function addRow(grid, idx, row)
{
    var cod = SUBJECT_DATA[idx][D_COD]; //code
    var ttk = SUBJECT_DATA[idx][D_KOR]; //title korean
    var cls = SUBJECT_DATA[idx][D_CLS]; //class
    var prf = SUBJECT_DATA[idx][D_PRO]; //professor
    var tar = SUBJECT_DATA[idx][D_TAR]; //target
    var crd = SUBJECT_DATA[idx][D_CRD]; //credits
    var spe = "";
    var cap = SUBJECT_DATA[idx][D_CAP]; //capacity
    var dsg = SUBJECT_DATA[idx][D_DCR]; //design credits
    var dep = SUBJECT_DATA[idx][D_DEP]; //depeartment


    if(SUBJECT_DATA[idx][D_ENG] == "Y" && SUBJECT_DATA[idx][D_ELR] == "Y")
        spe += "영+e";
    else if(SUBJECT_DATA[idx][D_ENG] == "Y")
        spe += "영강";
    else if(SUBJECT_DATA[idx][D_ELR] == "Y")
        spe += "e러닝";



    grid.addRow(row, [cod, ttk, cls, prf, tar, crd, spe, cap, dsg, dep]);
}


function cartItem(pk, grid)
{
    var idx = pkToIdx(pk);
    if(idx == -1) {
        alert("폐강되었거나, 데이터가 잘못된 과목입니다.");
        return;
    }

    for(var i in cartedList) {
        if(cartedList[i] == pk) {
            alert("중복된 과목입니다.");
            return;
        }
    }

    var db = SUBJECT_DATA;
    for(var i=0; i<cartedList.length; i++) {
        var jTarget = db[pkToIdx(cartedList[i])];
        var jLen = jTarget[D_TME].length;
        for(var j=0; j<jLen; j++) {
            var kTarget = db[pkToIdx(pk)];
            var kLen = kTarget[D_TME].length;
            for(var k=0; k<kLen; k++) {
                if(jTarget[D_TME][j] == kTarget[D_TME][k]) {
                    var str = "시간이 중복됩니다!\n"+kTarget[D_KOR]+" 과목이 "+
                                jTarget[D_KOR]+" 과목과 충돌합니다.";
                    alert(str);
                    return;
                }
            }
        }
    }

    cartedList.push(pk);

    addRow(grid, idx, idx+1);
}


function uncartItem(pk, grid)
{
    for(var i in cartedList) {
        if(cartedList[i] == pk) {
            cartedList.splice(i, 1);
            break;
        }
    }
    grid.deleteSelectedRows();

    document.cookie = COOKIE_NAME+"="+serializeCart(cartedList)+";";
}


function redrawCanvas(ctx)
{
    var totalCredits = 0;

    drawClear(ctx, canvas.width, canvas.height);
    drawFrame(ctx);
    drawCartList(ctx, SUBJECT_DATA, cartedList);

    for(var i in cartedList) {
        var sbj = SUBJECT_DATA[pkToIdx(cartedList[i])];
        totalCredits += Number(sbj[D_CRD]);
    }

    $("#totalCredits")[0].innerHTML = "수강학점 : " + totalCredits;
}


function loadCart(str)
{
    var temp = unserializeCart(str);
    for(var j in temp) {
        cartItem(temp[j], grid2);
    }
    redrawCanvas(ctx);
}


function loadCookie()
{
    var cookieArr = document.cookie.split(";");
    for(var i=0; i<cookieArr.length; i++) {
        if(cookieArr[i].indexOf(COOKIE_NAME) != -1) {
        //cookieArr can has 2 cases.
        //["target=value", " not=value"] //not including space
        //["not=value", " target=value"] //including space
            var cookieStr = cookieArr[i].substr(cookieArr[i].indexOf(COOKIE_NAME)
                            + COOKIE_NAME.length+1);
            if(cookieStr.length > 0) {
                loadCart(cookieStr);
            }
            break;
        }
    }
}




//*********************
// Events
//********************



window.onresize = function()
{
    setSizes();
}


function onSelectCatalog(row, col)
{
    redrawCanvas(ctx);
    drawSelection(ctx, mergeNum(SUBJECT_DATA[row-1][D_TME]), 5);

    //same code, different class
    for(var i in SUBJECT_DATA) {
        if(SUBJECT_DATA[i][D_COD] == SUBJECT_DATA[row-1][D_COD]) {
            drawSelection(ctx, mergeNum(SUBJECT_DATA[i][D_TME]), 2);
        }
    }
}


function onDblClickCatalog(row, col)
{
    var pk = idxToPk(row-1);
    cartItem(pk, grid2);
    document.cookie = COOKIE_NAME+"="+serializeCart(cartedList)+";";
    redrawCanvas(ctx);
    send(pk);
}


function onSelectCart(row, col)
{

}


function onDblClickCart(row, col)
{
    uncartItem(idxToPk(row-1), grid2);
    redrawCanvas(ctx);
}


function onClickBtnShare()
{
    var popup = window.open(
        "https://www.facebook.com/sharer/sharer.php?u=hanpyo.com/s?d="
        + serializeCart(cartedList),
    "pop", "width=600, height=400, scrollbars=no");
}


function onClickBtnLinkShare()
{
    $("#svtxt").html("http://hanpyo.com/s?d="+serializeCart(cartedList));
    alert("페이지 맨 하단의 주소를 복사하여 공유하세요.");
}


function onClickBtnCart()
{
    var sel = Number(grid1.getSelectedId());
    if(sel > 0) {
        var pk = idxToPk(sel-1);
        cartItem(pk, grid2);
        document.cookie = COOKIE_NAME+"="+serializeCart(cartedList)+";";
        redrawCanvas(ctx);
        send(pk);
    }
}


function onClickBtnUncart()
{
    var sel = Number(grid2.getSelectedId());
    if(sel > 0) {
        uncartItem(idxToPk(sel-1), grid2);
    }
    redrawCanvas(ctx);
}


function onClickBtnUncartAll()
{
    cartedList = [];
    grid2.clearAll();
    redrawCanvas(ctx);
    document.cookie = COOKIE_NAME+"=;";
}


function onSelectDep(e)
{
    loadCatalog(grid1, [e.target.value, D_DEP]);
}


function onChangeFilter()
{
    $("#comboDep")[0].selectedIndex = 0;
    if($("#filter")[0].value.length > 0) {
        loadCatalog(grid1, [$("#filter")[0].value, D_COD, D_PRO, D_KOR]);
    }
    else {
        loadCatalog(grid1, [""]);
    }
}


function onClickBtnEnter()
{
    onChangeFilter();
}


function onClickBtnInfo()
{
    openPopup("info.html?v=1", 400, 600);
}


function onClickBtnSave()
{
    var dt = canvas.toDataURL("image/png");

    if (("download" in $("#btnSave").get(0)) && !isEdge()) {
        this.href = dt;
    }
    else {
        var p = openPopup("down.html", 505, 705);
        var div = p.document.getElementById("savingImg");
        div.innerHTML = "<img src='"+dt+"'alt='from canvas'/>";
    }
}


function onActCanvas()
{
    redrawCanvas(ctx);
}
