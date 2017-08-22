// Same ajax call but made for the result's page, it allows user to try again w/o users putting in city name again over and over
// I know, it's ugly but it's good UX experience
$(".resubmit-form").submit(function(e) {
    var url = "/results";
    console.log(location);
    $.ajax({
        type: "GET",
        url: url,
        // seralize form elements
        data: $(".resubmit-form").serialize(),
        success: function(data) {
            document.getElementsByTagName('body')[0].innerHTML = data;
        },
        error: function() {
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