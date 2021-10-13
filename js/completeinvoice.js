viewpendinginvoice();

function viewpendinginvoice() {
    $.ajax({
        type: 'post',
        url: './php/invoice.php',
        data: { action: "viewallpendinginvoice" },
        dataType: "json",
        success: function(data) {
            var invoicedata = data;
            var table_content = "";
            var status = "";
            $(".th-sm").addClass("bg-warning text-white");
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
                        invoicedata[i]['expirydate'] + "</td><td class='text-center'>" + invoicedata[i]['ic'] +
                        "</td><td class='text-center'>" + invoicedata[i]['name'] + "</td><td class='text-center'>" + invoicedata[i]['model'] +
                        "</td><td class='text-center'>" + invoicedata[i]['amount'] + "</td><td class='text-center'>" + invoicedata[i]['actualamount'] +
                        "</td><td class='text-center'>" + status + "</td><td class='text-center'><a href='completeinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-edit edit-icon'></a></td></tr>";
                }
                document.getElementById("table_content").innerHTML = table_content;
                $('#tableinvoice').DataTable({
                    columnDefs: [

                        { targets: 5, width: '30%' },
                        { targets: 6, width: '30%' }
                    ]
                });
                $('.dataTables_length').addClass('bs-select');
            }

        },
        error: function(ajaxContext) {
            alert("The action of view all invoice is failed.");

        }

    });
}