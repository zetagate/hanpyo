// 문서가 로드된 이후에 처리되는 함수 정의
$(document).ready(function() {
    // 탭메뉴 타이틀이 선택되지 않은 내용은 숨김 처리
    // 탭메뉴 타이틀의 a태그가 가지는 href의 값과 내용의 id가 동일한가를 확인함
    $(".tab_panel li:not("+$(".tab_title li a.selected").attr("href")+")").hide();

    // 탭메뉴 타이틀 클릭시 내용 보이기
    $(".tab_title li a").click(function(){
        $(".tab_title li a").removeClass("selected");
        $(this).addClass("selected");
        $(".tab_panel li").hide();
        $($(this).attr("href")).show();
        return false;
    });
});