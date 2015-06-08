$(document).ready(function() {
    $("#icons img").hover(function() {
        var original = $(this).attr('id')
        var inverse = "static/images/icons/" + original + "_inverse.png";
        $(this).attr('src', inverse);
    }, function() {
        var inverse = $(this).attr('id');
        var original = "static/images/icons/" + inverse + ".png";
        $(this).attr('src', original);
    });
}); 