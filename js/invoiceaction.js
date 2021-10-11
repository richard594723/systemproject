viewinvoice();

$('#showstatus').on('change', function() {
    if (this.value == "All") {
        viewinvoice();
    } else if (this.value == "Complete") {
        viewcompleteinvoice();
    } else if (this.value == "Pending") {
        viewpendinginvoice();
    } else if (this.value == "Void") {
        viewvoidinvoice();
    }
});

function viewinvoice() {
    $.ajax({
        type: 'post',
        url: './php/invoice.php',
        data: { action: "viewallinvoice" },
        dataType: "json",
        success: function(data) {
            var invoicedata = data;
            var table_content = "";
            var status = "";
            $('#tableinvoice').DataTable().clear();
            $('#tableinvoice').DataTable().destroy();
            $(".th-sm").removeClass("bg-dark bg-warning bg-primary text-white");
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
                        "</td><td class='text-center'>" + status + "</td><td class='text-center'><a href='editinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-edit edit-icon'></a><a href='viewinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-file-alt'></a><button type='button' class='unstyled-button' onclick='deleteinvoice(" + '"' +
                        invoicedata[i]['invoiceid'] + '"' + ")'><i class='fas fa-trash-alt delete-icon'></i></button></td></tr>";
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

function viewcompleteinvoice() {
    $.ajax({
        type: 'post',
        url: './php/invoice.php',
        data: { action: "viewallcompleteinvoice" },
        dataType: "json",
        success: function(data) {
            var invoicedata = data;
            var table_content = "";
            var status = "";
            $('#tableinvoice').DataTable().clear();
            $('#tableinvoice').DataTable().destroy();
            $(".th-sm").removeClass("bg-dark bg-warning");
            $(".th-sm").addClass("bg-primary text-white");
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
                        "</td><td class='text-center'>" + status + "</td><td class='text-center'><a href='editinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-edit edit-icon'></a><a href='viewinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-file-alt'></a><button type='button' class='unstyled-button' onclick='deleteinvoice(" + '"' +
                        invoicedata[i]['invoiceid'] + '"' + ")'><i class='fas fa-trash-alt delete-icon'></i></button></td></tr>";
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
            $('#tableinvoice').DataTable().clear();
            $('#tableinvoice').DataTable().destroy();
            $(".th-sm").removeClass("bg-dark bg-primary");
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
                        "</td><td class='text-center'>" + status + "</td><td class='text-center'><a href='editinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-edit edit-icon'></a><a href='viewinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-file-alt'></a><button type='button' class='unstyled-button' onclick='deleteinvoice(" + '"' +
                        invoicedata[i]['invoiceid'] + '"' + ")'><i class='fas fa-trash-alt delete-icon'></i></button></td></tr>";
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

function viewvoidinvoice() {
    $.ajax({
        type: 'post',
        url: './php/invoice.php',
        data: { action: "viewallvoidinvoice" },
        dataType: "json",
        success: function(data) {
            var invoicedata = data;
            var table_content = "";
            var status = "";
            $('#tableinvoice').DataTable().clear();
            $('#tableinvoice').DataTable().destroy();
            $(".th-sm").removeClass("bg-primary bg-warning");
            $(".th-sm").addClass("bg-dark text-white");
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
                        "</td><td class='text-center'>" + status + "</td><td class='text-center'><a href='editinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-edit edit-icon'></a><a href='viewinvoiceform.html?ID=" +
                        invoicedata[i]['invoiceid'] + "' class='fas fa-file-alt'></a></td></tr>";
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

function deleteinvoice(id) {
    $.ajax({
        type: 'post',
        url: './php/invoice.php',
        data: { action: "deleteinvoice", invoiceid: id },
        dataType: "json",
        success: function(data) {
            alert(data['Message']);
            location.reload();


        },
        error: function(ajaxContext) {
            alert("The action of delete invoice details is failed.");
        }
    });
}