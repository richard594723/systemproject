viewinvoice();

function viewinvoice() {
    $.ajax({
        type: 'post',
        url: './php/invoice.php',
        data: { action: "viewallinvoice" },
        dataType: "json",
        success: function(data) {
            var invoicedata = data;
            var table_content = "";
            console.log(data);
            for (i = 0; i < invoicedata.length; i++) {
                table_content += "<tr><td class='text-center'>" + (i + 1) + "</td><td class='text-center'>" + invoicedata[i]['billno'] +
                    "</td><td class='text-center'>" + invoicedata[i]['billdatetime'] + "</td><td class='text-center'>" +
                    invoicedata[i]['expirydate'] + "</td><td class='text-center'>" + invoicedata[i]['ic'] +
                    "</td><td class='text-center'>" + invoicedata[i]['name'] + "</td><td class='text-center'>" + invoicedata[i]['model'] +
                    "</td><td class='text-center'>" + invoicedata[i]['amount'] + "</td><td class='text-center'>" + invoicedata[i]['actualamount'] +
                    "</td><td class='text-center'>" + invoicedata[i]['status'] + "</td><td class='text-center'><a href='editinvoiceform.html?ID=" +
                    invoicedata[i]['invoiceid'] + "' class='fas fa-edit edit-icon'></a><a href='viewinvoiceform.html?ID=" +
                    invoicedata[i]['invoiceid'] + "' class='fas fa-file-alt'></a></td></tr>";
            }
            document.getElementById("table_content").innerHTML = table_content;
            $('#tableinvoice').DataTable();
            $('.dataTables_length').addClass('bs-select');
        },
        error: function(ajaxContext) {
            alert("The action of view all invoice is failed.");

        }

    });
}