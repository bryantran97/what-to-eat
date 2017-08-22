$(document).ready(function() { // Ajax call

    $('body').hide().fadeIn(1300);

    $("form").submit(function(e) {
        var url = "/results";
        console.log(location);
        $.ajax({
            type: "GET",
            url: url,
            // seralize form elements
            data: $("form").serialize(),
            success: function(data) {
                document.getElementsByTagName('body')[0].innerHTML = data;
                $('body').hide().fadeIn('slow');
            },
            error: function () {
                console.log("Error loading content");
            },
            complete: function() {
                $.getScript("js/loaded.js", function() {
                    console.log("loaded script and content");
                })
            }
            
        });

        e.preventDefault();
    });
});