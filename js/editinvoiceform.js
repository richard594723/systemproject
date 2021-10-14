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
        url: './php/invoice.php',
        data: { action: "viewspecificinvoice", invoiceid: parameter[0][1] },
        dataType: "json",
        success: function(data) {
            var invoicedata = data;
            invoicedata[0]['billdatetime'] = invoicedata[0]['billdatetime'].replace(/\s/g, 'T');
            document.getElementById("billno").value = invoicedata[0]['billno'];
            document.getElementById("billdatetime").value = invoicedata[0]['billdatetime'];
            document.getElementById("expirydate").value = invoicedata[0]['expirydate'];
            document.getElementById("ic").value = invoicedata[0]['ic'];
            document.getElementById("name").value = invoicedata[0]['name'];
            document.getElementById("model").value = invoicedata[0]['model'];
            document.getElementById("imei").value = invoicedata[0]['imei'];
            document.getElementById("phonelock").value = invoicedata[0]['phonelock'];
            document.getElementById("amount").value = invoicedata[0]['amount'];
            document.getElementById("actualamount").value = invoicedata[0]['actualamount'];
            document.getElementById("invoiceid").value = invoicedata[0]['invoiceid'];
            document.getElementById("customerid").value = invoicedata[0]['customerid'];
            if (invoicedata[0]['status'] == "P" || invoicedata[0]['status'] == "V") {
                document.getElementById("showstatus").style.display = "block";
                document.getElementById("showstatus").value = invoicedata[0]['status'];
            }


        },
        error: function(ajaxContext) {
            alert("The action of view specific invoice is failed.");

        }
    });

}

$.ajax({
    type: 'post',
    url: './php/customer.php',
    data: { action: "viewallactivecustomer" },
    dataType: "json",
    success: function(data) {
        var customerdata = data;
        var table_content = "";
        for (i = 0; i < customerdata.length; i++) {
            table_content += "<tr><td class='text-center'>" + customerdata[i]['ic'] + "</td><td class='text-center'>" +
                customerdata[i]['name'] + "</td><td class='text-center'><button type='button' onclick='selectic(" + '"' + customerdata[i]['customerid'] + '"' + "," + '"' + customerdata[i]['ic'] + '"' + "," + '"' + customerdata[i]['name'] + '"' + ")'><i class='fas fa-edit edit-icon'></i></button></td></tr>";
        }
        document.getElementById("table_content_customer").innerHTML = table_content;

        $('#tablecustomer').DataTable({
            "lengthChange": false
        });



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

$('#invoice_edit_form').on('submit', function(e) {
    e.preventDefault();
    var data = $('#invoice_edit_form').serialize();
    data += "&action=editinvoice";
    $.ajax({
        type: 'post',
        url: './php/invoice.php',
        data: data,
        dataType: "json",
        success: function(data) {
            alert(data['Message']);
            window.location.href = "./invoiceaction.html";


        },
        error: function(ajaxContext) {
            alert("The action of edit invoice is failed.");

        }
    });

});