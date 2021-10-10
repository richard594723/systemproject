getParameters();

function getParameters() {
    let urlString = window.location.href;

    let paramString = urlString.split('?')[1];

    let params_arr = paramString.split('&');
    let parameter = [
        []
    ];
    for (let i = 0; i < params_arr.length; i++) {

        let pair = params_arr[i].split('=');
        parameter[i][0] = pair[0];
        parameter[i][1] = pair[1];

    }

    $.ajax({
        type: 'post',
        url: './php/customer.php',
        data: { action: "viewspecificcustomer", customerid: parameter[0][1] },
        dataType: "json",
        success: function(data) {
            var customer = data;
            document.getElementById("ic").value = customer[0]['ic'];
            document.getElementById("name").value = customer[0]['name'];
            if (customer[0]['gender'] == "M") {
                document.getElementById("male").checked = true;
            } else if (customer[0]['gender'] == "F") {
                document.getElementById("female").checked = true;
            }
            document.getElementById("dob").value = customer[0]['dob'];
            document.getElementById("mobilenumber").value = customer[0]['mobilenumber'];
            document.getElementById("address1").value = customer[0]['address1'];
            document.getElementById("address2").value = customer[0]['address2'];
            document.getElementById("address3").value = customer[0]['address3'];
            document.getElementById("postcode").value = customer[0]['postcode'];
            document.getElementById("city").value = customer[0]['city'];
            document.getElementById("state").value = customer[0]['state'];
            if (customer[0]['status'] == "A") {
                document.getElementById("status").value = "A";
            } else if (customer[0]['status'] == "B") {
                document.getElementById("status").value = "B";
            }
            document.getElementById("customerid").value = customer[0]['customerid'];
        },
        error: function(ajaxContext) {
            alert("The action of specific customer details is failed.");
        }
    });

}


$('#formeditcustomer').on('submit', function(e) {
    e.preventDefault();
    var data = $('#formeditcustomer').serialize();
    data += "&action=editcustomer";
    $.ajax({
        type: 'post',
        url: './php/customer.php',
        data: data,
        dataType: "json",
        success: function(data) {
            alert(data['Message']);
            window.location.href = "./editcustomer.html";


        },
        error: function(ajaxContext) {
            alert("The action of edit customer is failed.");

        }
    });

});