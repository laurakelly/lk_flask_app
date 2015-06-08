$(document).ready(function() {  
    $("#gallery a").hover(function() {
            $(this).first('img').animate(
            {
                opacity: "0.25",
            }, 300);
        }, function() {
            $(this).first('img').animate(
            {   
                opacity: "1",
            }, 300);
        }); 

    $("#gallery a").fancybox({
        cyclic: true,
        overlayColor: '#000',
        overlayOpacity: .7
    });
    
    $("#icons img").hover(function() {
        var original = $(this).attr('id')
        var inverse = "../static/" + original + "_inverse.png";
        $(this).attr('src', inverse);
    }, function() {
        var inverse = $(this).attr('id');
        var original = "../static/" + inverse + ".png";
        $(this).attr('src', original);
    });    
});