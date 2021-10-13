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
        data: { action: "viewcustomercompleteinvoice", customerid: parameter[0][1] },
        dataType: "json",
        success: function(data) {
            var invoicedata = data;
            var table_content = "";
            var status = "";

            if (invoicedata == "There are no record in the database.") {
                $('#tableinvoice').DataTable();
            } else {
                for (i = 0; i < invoicedata.length; i++) {
                    if (invoicedata[i]['status'] == "C") {
                        status = "Complete";
                    } else if (invoicedata[i]['status'] == "P") {
                        status = "Pending";
                    } else if (invoicedata[i]['status'] == "V") {
                        status = "Void";
                    }
                    table_content += "<tr><td class='text-center'>" + (i + 1) + "</td><td class='text-center'>" + invoicedata[i]['billno'] +
                        "</td><td class='text-center'>" + invoicedata[i]['billdatetime'] + "</td><td class='text-center'>" +
                        invoicedata[i]['expirydate'] + "</td><td class='text-center'>" + invoicedata[i]['model'] +
                        "</td><td class='text-center'>" + invoicedata[i]['amount'] + "</td><td class='text-center'>" + invoicedata[i]['actualamount'] +
                        "</td><td class='text-center'>" + status + "</td><td class='text-center'><a href='editinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-edit edit-icon'></a><a href='viewinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-file-alt'></td></tr>";
                }
                document.getElementById("table_content").innerHTML = table_content;
                $('#tableinvoice').DataTable();
                $('.dataTables_length').addClass('bs-select');
            }

        },
        error: function(ajaxContext) {
            alert("The action of view all invoice is failed.");

        }

    });

    $.ajax({
        type: 'post',
        url: './php/invoice.php',
        data: { action: "viewcustomerpendinginvoice", customerid: parameter[0][1] },
        dataType: "json",
        success: function(data) {
            var invoicedata = data;
            var table_content = "";
            var status = "";
            if (invoicedata == "There are no record in the database.") {
                $('#tableinvoice1').DataTable();
            } else {

                for (i = 0; i < invoicedata.length; i++) {
                    if (invoicedata[i]['status'] == "C") {
                        status = "Complete";
                    } else if (invoicedata[i]['status'] == "P") {
                        status = "Pending";
                    } else if (invoicedata[i]['status'] == "V") {
                        status = "Void";
                    }
                    table_content += "<tr><td class='text-center'>" + (i + 1) + "</td><td class='text-center'>" + invoicedata[i]['billno'] +
                        "</td><td class='text-center'>" + invoicedata[i]['billdatetime'] + "</td><td class='text-center'>" +
                        invoicedata[i]['expirydate'] + "</td><td class='text-center'>" + invoicedata[i]['model'] +
                        "</td><td class='text-center'>" + invoicedata[i]['amount'] + "</td><td class='text-center'>" + invoicedata[i]['actualamount'] +
                        "</td><td class='text-center'>" + status + "</td><td class='text-center'><a href='completeinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-edit edit-icon'></a><a href='viewinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-file-alt'></a></td></tr>";
                }
                document.getElementById("table_content1").innerHTML = table_content;
                $('#tableinvoice').DataTable();
                $('.dataTables_length').addClass('bs-select');
            }

        },
        error: function(ajaxContext) {
            alert("The action of view all invoice is failed.");

        }

    });
}