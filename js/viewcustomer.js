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
            var gender = "";
            var status = "";
            var address = "";
            document.getElementById("ic").value = customer[0]['ic'];
            document.getElementById("name").value = customer[0]['name'];
            if (customer[0]['gender'] == "M") {
                gender = "Male";
            } else if (customer[0]['gender'] == "F") {
                gender = "Female";
            }
            document.getElementById("gender").value = gender;
            document.getElementById("dob").value = customer[0]['dob'];
            document.getElementById("mobilenumber").value = customer[0]['mobilenumber'];
            address = customer[0]['address1'] + "&#13;&#10;" + customer[0]['address2'];
            if (customer[0]['address3'] != "") {
                address += "&#13;&#10;" + customer[0]['address3'];
            }
            address += "&#13;&#10;" + customer[0]['postcode'] + "," + customer[0]['city'] + "," + customer[0]['state'];
            document.getElementById("address").innerHTML = address;
            document.getElementById("registerdate").value = customer[0]['registerdate'];
            if (customer[0]['status'] == "A") {
                status = "Active";
            } else if (customer[0]['status'] == "B") {
                status = "Blacklist";
            }
            document.getElementById("status").value = status;
        },
    });

}