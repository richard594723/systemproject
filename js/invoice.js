setinfo();

function setinfo() {
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-" +
        ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-" +
        ("0" + (currentdate.getDate())).slice(-2) + "T" +
        ("0" + (currentdate.getHours())).slice(-2) + ":" +
        ("0" + (currentdate.getMinutes())).slice(-2) + ":" +
        ("0" + (currentdate.getSeconds())).slice(-2);

    document.getElementById("billdatetime").value = datetime;
    var expirydate = currentdate.getFullYear() + "-" +
        ("0" + (currentdate.getMonth() + 2)).slice(-2) + "-" +
        ("0" + (currentdate.getDate())).slice(-2);
    document.getElementById("expirydate").value = expirydate;
    var billno = ("0" + (currentdate.getHours())).slice(-2) +
        ("0" + (currentdate.getMinutes())).slice(-2) +
        ("0" + (currentdate.getSeconds())).slice(-2) +
        ("0" + (currentdate.getDate())).slice(-2) +
        ("0" + (currentdate.getMonth() + 1)).slice(-2) +
        currentdate.getFullYear();
    document.getElementById("billno").value = billno;

}



$.ajax({
    type: 'post',
    url: './php/customer.php',
    data: { action: "viewallactivecustomer" },
    dataType: "json",
    success: function(data) {
        var customerdata = data;
        var table_content = "";
        if (customerdata == "There are no record in the database.") {

        } else {
            for (i = 0; i < customerdata.length; i++) {
                table_content += "<tr><td class='text-center'>" + customerdata[i]['ic'] + "</td><td class='text-center'>" + customerdata[i]['name'] +
                    "</td><td class='text-center'><button type='button' onclick='selectic(" + '"' + customerdata[i]['customerid'] + '"' + "," + '"' + customerdata[i]['ic'] + '"' + "," + '"' +
                    customerdata[i]['name'] + '"' + ")'><i class='fas fa-edit edit-icon'></i></button></td></tr>";
            }
            document.getElementById("table_content_customer").innerHTML = table_content;

            $('#tablecustomer').DataTable({
                    "lengthChange": false
                }



            );
        }



    },
    error: function(ajaxContext) {
        alert("The action of view all customer is failed.");

    }
})

function selectic(customerid, ic, name) {
    document.getElementById("customerid").value = customerid;
    document.getElementById("ic").value = ic;
    document.getElementById("name").value = name;
    $("#Modal").modal('hide');
}


$('#invoice_form').on('submit', function(e) {
    e.preventDefault();
    var data = $('#invoice_form').serialize();
    data += "&action=submitinvoice";
    if (document.getElementById("ic").value != "") {
        $.ajax({
            type: 'post',
            url: './php/invoice.php',
            data: data,
            dataType: "json",
            success: function(data) {
                if (data['Message'] == "Success") {
                    alert("The data is successfully added!");
                    location.reload();
                }


            },
            error: function(ajaxContext) {
                alert("The action of submit invoice is failed.");

            }
        });
    } else {
        alert("The ic number of customer must be entered.");
    }


});