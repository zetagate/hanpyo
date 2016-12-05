
var grid1;
var grid2;
var canvas;
var ctx;



$(window).on("load", function()
{
    canvas = $("#canvas")[0];
    ctx = canvas.getContext("2d");
    grid1 = new dhtmlXGridObject("grid1");
    initGrid(grid1);

    grid2 = new dhtmlXGridObject("grid2");
    initGrid(grid2);

    setSizes();
    grid1.setSizes();
    grid2.setSizes();

    loadCatalog(grid1);
});

window.onresize = function()
{
    setSizes();
}

function setSizes()
{
    var docuWidth = $(document).width();
    var size = docuWidth - (canvas.width+20);
    if(size > 230) {
        $(gridBox).width(docuWidth - (canvas.width+30));
    }
    else {
        $(gridBox).width(docuWidth-20);
    }
}


function initGrid(grid)
{
    grid.setImagePath("dhtmlx/skins/web/imgs/dhxgrid_terrace/");
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
        let cod = SUBJECT_DATA[i][0]; //code
        let ttk = SUBJECT_DATA[i][1]; //title korean
        let cls = SUBJECT_DATA[i][3]; //class
        let prf = SUBJECT_DATA[i][7]; //professor
        let tar = SUBJECT_DATA[i][6]; //target
        let crd = SUBJECT_DATA[i][2]; //credits
        let dsg = SUBJECT_DATA[i][9]; //design credits
        let spe = SUBJECT_DATA[i][8] + SUBJECT_DATA[i][10];//special information
        let cap = SUBJECT_DATA[i][4]; //capacity
        let dep = SUBJECT_DATA[i][5]; //depeartment
        grid.addRow(i+1, [cod, ttk, cls, prf, tar, crd, dsg, spe, cap, dep]);
    }
}
