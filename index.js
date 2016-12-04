
var grid1;
var grid2;
var canvas;
var ctx;

function setSizes()
{
    var docuWidth = $(document).width();
    var size = docuWidth-(canvas.width+20);
    if(size>230) {
        $(gridBox).width(docuWidth-(canvas.width+30));
    }
    else {
        $(gridBox).width(docuWidth-20);
    }
}

function onLoad()
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
}

window.onresize = function()
{
    setSizes();
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

    grid.addRow(1,["cod","컴퓨터","01","김이박","컴공","2","1","Y","40","컴공"]);
    grid.addRow(2,["cod","컴퓨터","01","김이박","컴공","2","1","Y","40","컴공"]);
    grid.addRow(3,["cod","컴퓨터","01","김이박","컴공","2","1","Y","40","컴공"]);
    grid.addRow(4,["cod","컴퓨터","01","김이박","컴공","2","1","Y","40","컴공"]);
}
