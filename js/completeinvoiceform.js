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

        },
        error: function(ajaxContext) {
            alert("The action of view specific invoice is failed.");

        }
    });

}

$('#invoice_edit_form').on('submit', function(e) {
    e.preventDefault();
    var data = $('#invoice_edit_form').serialize();
    data += "&action=paytheinvoice";
    $.ajax({
        type: 'post',
        url: './php/invoice.php',
        data: data,
        dataType: "json",
        success: function(data) {
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
            alert(data['Message']);
            window.location.href = "./viewinvoiceform.html?ID=" + parameter[0][1];


        },
        error: function(ajaxContext) {
            alert("The action of edit invoice is failed.");

        }
    });

});