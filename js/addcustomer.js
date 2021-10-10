$('#formaddcustomer').on('submit', function(e) {
    e.preventDefault();
    var data = $('#formaddcustomer').serialize();
    data += "&action=addcustomer";
    $.ajax({
        type: 'post',
        url: './php/customer.php',
        data: data,
        dataType: "json",
        success: function(data) {
            if (data['Message'] == "Success") {
                alert("The data is successfully added!");
                location.reload();
            }


        },
        error: function(ajaxContext) {
            alert("The action of add customer details is failed.");
        }
    });

});