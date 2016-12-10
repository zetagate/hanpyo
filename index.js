
let grid1;
let grid2;
let canvas;
let ctx;
let cartList = [];

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
    for(let i=0; i<SUBJECT_DATA.length; ++i) {
        addRow(grid1, i, i+1);
    }
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


function idxToPk(idx)
{
    return SUBJECT_DATA[idx][0] + SUBJECT_DATA[idx][3];
}


function pkToIdx(pk)
{
    let cod = pk.substring(0,6);
    let cls = pk.substring(6,8);
    for(let i in SUBJECT_DATA) {
        if(cod == SUBJECT_DATA[i][0] && cls == SUBJECT_DATA[i][3]) {
            return i;
        }
    }
    return -1;
}


function putCart(pk, grid)
{
    cartList.push(pk);
    addRow(grid2, pkToIdx(pk), cartList.length+1);
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

}


function onDblClickCatalog(row, col)
{
    putCart(idxToPk(row-1), grid2);
}
