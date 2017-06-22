
$(window).on("load", function()
{
    var imgURL = $(opener.document).contents().find("#intent").attr("value");
    $("#savingImg").append("<img src='"+imgURL+"'/>");
});
