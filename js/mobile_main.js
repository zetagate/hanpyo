var data1 = [
{"a":"MEE430","b":"LED광학","c":"3","d":"01","e":"45","f":"기계공학부","g":"기계 4","h":"주병윤","i":"N","j":"1","k":"N","l":"[8,9,10,11,310,311,312,313,]"},
{"a":"MED711","b":"계측공학","c":"3","d":"01","e":"20","f":"기계공학부","g":"기계 4","h":"정경석","i":"N","j":"1","k":"N","l":"[112,113,114,115,314,315,316,317,]"},
{"a":"MEG861","b":"공학설계Ⅰ(캡스톤디자인)","c":"1","d":"01","e":"50","f":"기계공학부","g":"기계 3","h":"조병관","i":"N","j":"1","k":"N","l":"[318,319,]"},
{"a":"MEG871","b":"공학설계Ⅱ(캡스톤디자인)","c":"1","d":"01","e":"150","f":"기계공학부","g":"기계 3","h":"조병관","i":"N","j":"1","k":"N","l":"[318,319,]"},
{"a":"MEC581","b":"그래피칼프로그래밍","c":"3","d":"01","e":"20","f":"기계공학부","g":"기계 4","h":"최성주","i":"N","j":"1","k":"N","l":"[100,101,102,103,204,205,206,207,]"},
{"a":"MEC365","b":"기계재료학","c":"2","d":"01","e":"45","f":"기계공학부","g":"기계 2","h":"이광주","i":"N","j":"0","k":"N","l":"[314,315,316,317,]"},
{"a":"MEC365","b":"기계재료학","c":"2","d":"02","e":"45","f":"기계공학부","g":"기계 2","h":"양승용","i":"N","j":"0","k":"N","l":"[314,315,316,317,]"},
{"a":"MEC365","b":"기계재료학","c":"2","d":"03","e":"45","f":"기계공학부","g":"기계 2","h":"주병윤","i":"N","j":"0","k":"N","l":"[4,5,208,209,]"},
{"a":"MEC365","b":"기계재료학","c":"2","d":"04","e":"45","f":"기계공학부","g":"기계 2","h":"이해성","i":"N","j":"0","k":"N","l":"[4,5,208,209,]"},
{"a":"MED600","b":"기초유한요소법","c":"3","d":"01","e":"45","f":"기계공학부","g":"기계 3","h":"양승용","i":"N","j":"1","k":"N","l":"[204,205,206,207,310,311,312,313,]"},
{"a":"MEB321","b":"동역학","c":"3","d":"01","e":"40","f":"기계공학부","g":"기계 2","h":"조병관","i":"N","j":"0","k":"N","l":"[14,15,16,17,200,201,]"},
{"a":"MEB321","b":"동역학","c":"3","d":"02","e":"40","f":"기계공학부","g":"기계 2","h":"조병관","i":"N","j":"0","k":"N","l":"[100,101,102,103,202,203,]"},
{"a":"MEB321","b":"동역학","c":"3","d":"03","e":"40","f":"기계공학부","g":"기계 2","h":"정해일","i":"N","j":"0","k":"N","l":"[4,5,204,205,206,207,]"},
{"a":"MEB321","b":"동역학","c":"3","d":"04","e":"40","f":"기계공학부","g":"기계 2","h":"신동호","i":"N","j":"0","k":"N","l":"[204,205,206,207,304,305,]"},
{"a":"MEB321","b":"동역학","c":"3","d":"05","e":"40","f":"기계공학부","g":"기계 2","h":"다니엘트레이너","i":"Y","j":"0","k":"N","l":"[4,5,200,201,202,203,]"},
{"a":"MEH220","b":"로봇공학개론","c":"3","d":"01","e":"45","f":"기계공학부","g":"기계 3","h":"이고르","i":"Y","j":"1","k":"N","l":"[4,5,6,7,200,201,202,203,]"},
];

cart_index = new Array;
cart_choice_time = new Array;

var select_index = -1;

var select_cart_index = -1;

//카트에 저장된 과목들의 시간값 저장 배열
var cart_time_array = new Array();

$(document).ready(function(){

  //event 등록
  /*$("#btnShare").on("click", onClickBtnShare);
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
  */
  //$("p").append("<p>appended text</p>");

  

  $.each(data1, function(index,value){
  		//alert(data1[1].a);
  		//$("p").append("<p>"+data1[index].a+"</p>");

     $("#print").append("<tr onclick='test(this)'><td>"+data1[index].a+"</td><td>"+data1[index].b+"</td><td>"+data1[index].c+"</td><td>"+data1[index].d+"</td><td>"+data1[index].e+"</td><td>"+data1[index].f+"</td><td>"+data1[index].g
       +"</td><td>"+data1[index].h+"</td><td>"+data1[index].i+"</td><td>"+data1[index].j+"</td><td>"+data1[index].k+"</td></tr>");
   });

    //$("#print").bind("click", function(){
      //  console.log("클릭");
        //console.log($("#print > td").text());
    //});

  $("#print tr").on("dblclick", dbclick_print);
  

  for(var i = 0; i<cart_index.length; i++){
		add_sub_cart(cart_index[i]);
  }

  //if(print.addEventListener){
    //print.attachEvent("onRowselect", onSelectCatalog);  
  //

});
///////////////////////////////////////////////


$(document).on('dblclick','#cart', function(){
	console.log("카트 더블클릭");
	/*if(select_cart_index!=-1){
		removeSub();
		console.log("카트더블클릭 이프");	
	}
	
	select_cart_index=-1;*/


	////////////////////////////////////////////////
	if(select_cart_index!=-1){
		document.getElementById('cart').deleteRow(select_cart_index-1);
		console.log("과목 빼기");
	}
	console.log("select_cart_index:"+select_cart_index);

	console.log(cart_time_array[select_cart_index-1]);
	
	cart_time_array.splice(select_cart_index-1,1);
	


	for(var i=0; i<cart_time_array.length; i++){
		console.log("과목빼기 여기여기");
		for(var j=0; j<cart_time_array[i].length; j++){
			console.log(cart_time_array[i][j]);		
		}
	}
	
	select_cart_index=-1;
	///////////////////////////////////////////////
});

/////////////////////////////////////////////////////////
function searchBySub(){
	var key = $("#searchId").val();

	var existData = 0;

	if(key=='' && existData==0){
		$.each(data1, function(index,value){
			$('tbody > tr').remove();

		});

		$.each(data1, function(index,value){

      //alert(data1[1].a);
      //$("p").append("<p>"+data1[index].a+"</p>");

      $("#print").append("<tr  onclick='test(this)'><td>"+data1[index].a+"</td><td>"+data1[index].b+"</td><td>"+data1[index].c+"</td><td>"+data1[index].d+"</td><td>"+data1[index].e+"</td><td>"+data1[index].f+"</td><td>"+data1[index].g
      	+"</td><td>"+data1[index].h+"</td><td>"+data1[index].i+"</td><td>"+data1[index].j+"</td><td>"+data1[index].k+"</td></tr>");
    });

	}

	else if(key=='' && existData==1){

	}

	else{
		$.each(data1, function(index,value){
			$('tbody > tr').remove();
			existData=0;
		});

		$.each(data1, function(index,value){
			if(key==data1[index].b){
				$("#print").append("<tr  onclick='test(this)'><td>"+data1[index].a+"</td><td>"+data1[index].b+"</td><td>"+data1[index].c+"</td><td>"+data1[index].d+"</td><td>"+data1[index].e+"</td><td>"+data1[index].f+"</td><td>"+data1[index].g
					+"</td><td>"+data1[index].h+"</td><td>"+data1[index].i+"</td><td>"+data1[index].j+"</td><td>"+data1[index].k+"</td></tr>");
			}
		});

		
	}
	$("#print tr").on("dblclick", dbclick_print);
	

	for(var i = 0; i<cart_index.length; i++){
		console.log("되냐이거??????");
		add_sub_cart(cart_index[i]);
	}

}
/*

function onSelectCatalog(row, col)
{
  console.log("온클릭");
    /*redrawCanvas(ctx);
    drawSelection(ctx, mergeNum(SUBJECT_DATA[row-1][D_TME]), 5);

    //same code, different class
    for(var i in SUBJECT_DATA) {
        if(SUBJECT_DATA[i][D_COD] == SUBJECT_DATA[row-1][D_COD]) {
            drawSelection(ctx, mergeNum(SUBJECT_DATA[i][D_TME]), 2);
        }
      }*/
  //  }


function test(obj){
     var code_num;
     var class_num;

     //console.log("테스트 실행");
     var temp = document.getElementById('focused');


    if(document.getElementById('focused')==null){
      $(obj).attr("id", "focused");
      temp = obj;
    }

    else if(document.getElementById('focused')==obj){
      $(obj).attr("id","null");
    }

    else{
      $(temp).attr("id","null");
      $(obj).attr("id","focused");
    }

    var select_code = $(obj).find("td:first").text();
    var select_class_num = $(obj).find("td:eq(3)").text();

    select_index = get_index(select_code, select_class_num);

    //console.log(select_index);

    //$("#print").on("dblclick", function(){
      //console.log("더블클릭");
      


      //console.log($("tr.obj").text());

    //console.log($(obj).find("td").text());

    /*$(this).find(function(){
      console.log("돼냐");
      console.log($("this td:first").text());
      console.log($("this td:eq(3)").text());
    });*/


    //console.log(obj);

    //var addCartObj = obj;
      
      //$("#cart").append(addCartObj);
      
      //console.log($(obj).text());
        //console.log($("#print > td").text());
    //});

  }

/*
function add_cart(obj){
  //$("#cart").append($(obj).)
}*/


 function get_index(code, class_number){

   for(var i=0; i<data1.length; i++){
    if(data1[i].a==code){
     if(data1[i].d==class_number){
      //console.log(i);
      return i;
    }
  }
}

}



function dbclick_print(){
        console.log("더블클릭");
        //console.log($(this).find("td:first").text());
        //console.log($(this).find("td:eq(3)").text());

        var select_code = $(this).find("td:first").text();
        var select_class_num = $(this).find("td:eq(3)").text();

        select_index = get_index(select_code, select_class_num);
        //console.log(select_index);

        

        //cart_index.push(select_index);

        //console.log("asdf");
        //for(var i=0; i<cart_index.length; i++){
        //  console.log(cart_index[i]);
        //}

        //console.log(data1[select_index].l);
        //console.log(data1[select_index].l[5]);
        
        var temp = data1[select_index].l.replace("[","");
        temp = temp.replace("]", "");

        //console.log("temp = "+temp);

        var temp= temp.split(',');
        //console.log(typeof temp);
        
        /*for(var i=0; i<temp.length-1; i++){
          console.log(temp[i]);
        }*/
        
        
        
        

        
        for(var i=0; i<cart_time_array.length; i++){
        	console.log("---------------");
        	for(var j=0; j<cart_time_array[i].length-1; j++){
        		for(var k=0; k<temp.length-1; k++){
        				if(temp[k]==cart_time_array[i][j]){
        					alert("시간표 중복 발생");
        					return
        				}
        					//console.log(cart_time_array[i][j]);
        		}
        	}
        }
        
        cart_time_array.push(temp);
        

        console.log("------------------------------------------------***");
        for(var i=0; i<cart_time_array.length; i++){
			for(var j=0; j<cart_time_array[i].length; j++){
				console.log(cart_time_array[i][j]);		
			}
		}
        
        console.log("------------------------------------------------***");
        //console.log(temp[1]);

        //console.log(cart_choice_time[1]);
        cart_index.push(select_index);
      	add_sub_cart(select_index);
      	//select_index=-1;
      	console.log("카트 시간 배열 값 "+cart_time_array.length);

      	
}

function select_cart(obj){
    var temp = document.getElementById('focused');

    if(document.getElementById('focused')==null){
      $(obj).attr("id", "focused");
      temp = obj;
    }

    else if(document.getElementById('focused')==obj){
      $(obj).attr("id","null");
    }

    else{
      $(temp).attr("id","null");
      $(obj).attr("id","focused");
    }

	select_cart_index = obj.rowIndex;
	//console.log("select_cart_index : "+ select_cart_index);
}


function add_sub_cart(index){
	$("#cart").append("<tr onclick='select_cart(this)'><td>"+data1[index].a+"</td><td>"+data1[index].b+"</td><td>"+data1[index].c+"</td><td>"+data1[index].d+"</td><td>"+data1[index].e+"</td><td>"+data1[index].f+"</td><td>"+data1[index].g
       +"</td><td>"+data1[index].h+"</td><td>"+data1[index].i+"</td><td>"+data1[index].j+"</td><td>"+data1[index].k+"</td></tr>");
	
}	

/*
function dbclick_cart(){
	console.log($(this).text());
	console.log("돼지");
}*/








////////////////////////////////////////////////////////

function insertSub(){
	

	/*if(select_index>0){
		add_sub_cart(select_index);
		//dbclick_print();	
	}*/
	


	var temp = data1[select_index].l.replace("[","");
    temp = temp.replace("]", "");

    //console.log("temp = "+temp);

    var temp= temp.split(',');
    //console.log(typeof temp);
        
        /*for(var i=0; i<temp.length-1; i++){
          console.log(temp[i]);
        }*/
        
    
        
        

        
    for(var i=0; i<cart_time_array.length; i++){
    	console.log("---------------");
    	for(var j=0; j<cart_time_array[i].length-1; j++){
    		for(var k=0; k<temp.length-1; k++){
    				if(temp[k]==cart_time_array[i][j]){
    					alert("시간표 중복 발생");
    					return
        			}
        					//console.log(cart_time_array[i][j]);
        	}
        }
    }
        
    cart_time_array.push(temp);
        
        
        //console.log(temp[1]);

        //console.log(cart_choice_time[1]);
    cart_index.push(select_index);
    add_sub_cart(select_index);
      	
    console.log("카트 시간 배열 값 "+cart_time_array.length);
	console.log("과목담기 실행");
	console.log("select_index"+select_index);
}


function cartReset(){
	console.log("초기화");
	//$('tbody > tr').remove();
	$("#cart tr").remove();


	cart_time_array=[];

	
	/*for(var i=0; i<cart_time_array.length; i++){
		for(var j=0; j<cart_time_array[i].length; j++){
			cart_time_array[i].pop();
		}
	}*/


}

//여기 수정  
function removeSub(){
	if(select_cart_index!=-1){
		document.getElementById('cart').deleteRow(select_cart_index-1);
		console.log("과목 빼기");
	}
	console.log("select_cart_index:"+select_cart_index);

	console.log(cart_time_array[select_cart_index-1]);
	
	//cart_time_array[select_cart_index-1]=[];
	cart_time_array.splice(select_cart_index-1,1);
	console.log("제거 이후");
	console.log(cart_time_array[select_index-1]);


	for(var i=0; i<cart_time_array.length; i++){
		for(var j=0; j<cart_time_array[i].length; j++){
			console.log(cart_time_array[i][j]);		
		}
	}
	
	select_cart_index=-1;	
}