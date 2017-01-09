let grid1;
let grid2;
let canvas;
let ctx;
let cartedList = [];
let softLoaderInterval;

const MIN_GRIDBOX_WIDTH = 230;
const CANVAS_PADDING = 10;


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

    loadCatalog(grid1);

    grid1.attachEvent("onRowSelect", onSelectCatalog);
    grid1.attachEvent("onRowDblClicked", onDblClickCatalog);
    grid2.attachEvent("onRowSelect", onSelectCart);
    grid2.attachEvent("onRowDblClicked", onDblClickCart);

    drawClear(ctx, canvas.width, canvas.height);
    drawFrame(ctx);

    $("#btnShare").on("click", onClickBtnShare);
    $("#btnCart").on("click", onClickBtnCart);
    $("#btnUncart").on("click", onClickBtnUncart);
    $("#btnUncartAll").on("click", onClickBtnUncartAll);
});



function setSizes()
{
    let docuWidth = $(document).width();
    let size = docuWidth - (canvas.width+CANVAS_PADDING);
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
    grid.setHeader("코드,과목명,분반,교수,대상,학점,설계,비고,정원,개설학부");
    grid.setInitWidths("55,150,40,60,70,40,40,40,40,100");
    grid.setColAlign("left,left,left,left,left,left,left,left,left");
    grid.setColTypes("txt,txt,txt,txt,txt,txt,txt,txt,txt,txt");
    grid.setColSorting("str,str,str,str,str,str,str,str,str,str");
    grid.setEditable(false);
    dhtmlxEvent(window, "resize", function(){grid.setSizes();});
    grid.init();
}


function loadCatalog(grid)
{
    grid.clearAll();
    let k=0;

    clearInterval(softLoaderInterval);
    softLoaderInterval = setInterval(function()
    {
        if(k*100 >= SUBJECT_DATA.length) {
            clearInterval(softLoaderInterval);
            return;
        }
        for(let i=k*100; i<(k+1)*100 && i<SUBJECT_DATA.length; i++) {
            addRow(grid, i, i+1);
        }
        ++k;
    }, 50);
}


function addRow(grid, idx, row)
{
    let cod = SUBJECT_DATA[idx][0]; //code
    let ttk = SUBJECT_DATA[idx][1]; //title korean
    let cls = SUBJECT_DATA[idx][3]; //class
    let prf = SUBJECT_DATA[idx][7]; //professor
    let tar = SUBJECT_DATA[idx][6]; //target
    let crd = SUBJECT_DATA[idx][2]; //credits
    let dsg = SUBJECT_DATA[idx][9]; //design credits
    let spe = SUBJECT_DATA[idx][8] + SUBJECT_DATA[idx][10];//special information
    let cap = SUBJECT_DATA[idx][4]; //capacity
    let dep = SUBJECT_DATA[idx][5]; //depeartment
    grid.addRow(row, [cod, ttk, cls, prf, tar, crd, dsg, spe, cap, dep]);
}


function cartItem(pk, grid)
{

    for(let i in cartedList) {
        if(cartedList[i] == pk) {
            alert("중복된 과목입니다.");
            return;
        }
    }

    let db = SUBJECT_DATA;
    for(var i=0; i<cartedList.length; i++) {
        let jTarget = db[pkToIdx(cartedList[i])];
        let jLen = jTarget[11].length;
        for(var j=0; j<jLen; j++) {
            let kTarget = db[pkToIdx(pk)];
            let kLen = kTarget[11].length;
            for(var k=0; k<kLen; k++) {
                if(jTarget[11][j] == kTarget[11][k]) {
                    let str = "시간이 중복됩니다!\n"+kTarget[1]+" 과목이 "+
                                jTarget[1]+" 과목과 충돌합니다.";
                    alert(str);
                    return;
                }
            }
        }
    }

    cartedList.push(pk);
    let idx = pkToIdx(pk);
    addRow(grid, idx, idx+1);
}


function uncartItem(pk, grid)
{
    for(let i in cartedList) {
        if(cartedList[i] == pk) {
            cartedList.splice(i, 1);
            break;
        }
    }
    grid.deleteSelectedRows();
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
    drawClear(ctx, canvas.width, canvas.height);
    drawFrame(ctx);
    drawSelection(ctx, mergeNum(SUBJECT_DATA[row-1][11]), 5);

    for(let i in SUBJECT_DATA) {
        if(SUBJECT_DATA[i][0] == SUBJECT_DATA[row-1][0]) {
            drawSelection(ctx, mergeNum(SUBJECT_DATA[i][11]), 2);
        }
    }
}


function onDblClickCatalog(row, col)
{
    cartItem(idxToPk(row-1), grid2);
}


function onSelectCart(row, col)
{

}


function onDblClickCart(row, col)
{
    uncartItem(idxToPk(row-1), grid2);
}


function onClickBtnShare()
{
    let popup = window.open(
        "https://www.facebook.com/sharer/sharer.php?u=v2.hanpyo.com/s?test=3",
    "pop", "width=600, height=400, scrollbars=no");
}


function onClickBtnCart()
{
    cartItem(idxToPk(grid1.getSelectedId()-1), grid2);
}


function onClickBtnUncart()
{
    uncartItem(idxToPk(grid2.getSelectedId()-1), grid2);
}


function onClickBtnUncartAll()
{
    cartedList = [];
    grid2.clearAll();
}
