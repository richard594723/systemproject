$('#formlogin').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: './php/login.php',
        data: $('#formlogin').serialize(),
        dataType: "json",
        success: function(data) {
            console.log(data['Message']);
            if (data['Message'] == "Success") {
                if (data['Status'] == "A") {
                    document.cookie = "username=" + data['Username'] + ";AccType=" + data['AccType'] + ";";
                    window.location.href = "./menubar.html";
                }


            } else {
                console.log(data['Message']);
            }

        },
    });

});