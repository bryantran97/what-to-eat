        $(document).ready(function() {// Ajax call
            $("form").submit(function(e) {
                var url = "/results";
                console.log(location);
                $.ajax({
                    type:"GET",
                    url: url,
                    // seralize form elements
                    data: $("form").serialize(),
                    success: function(data) {
                        document.getElementsByTagName('body')[0].innerHTML = data;
                    }
                });

                e.preventDefault();
            });
        });