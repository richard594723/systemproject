viewcustomer();

$('#showstatus').on('change', function() {
    if (this.value == "All") {
        viewcustomer();
    } else if (this.value == "Active") {
        viewactivecustomer();
    } else if (this.value == "Blacklist") {
        viewblacklistcustomer();
    }
});


function viewcustomer() {
    $.ajax({
        type: 'post',
        url: './php/customer.php',
        data: { action: "viewallcustomer" },
        dataType: "json",
        success: function(data) {
            var customerdata = data;
            var table_content = "";
            $('#dtBasicExample').DataTable().clear();
            $('#dtBasicExample').DataTable().destroy();
            $(".th-sm").removeClass('bg-dark bg-primary text-white');
            if (customerdata == "There are no record in the database.") {
                $('#dtBasicExample').DataTable({
                    columnDefs: [
                        { targets: 2, width: '40%' }
                    ]
                });
            } else {
                for (i = 0; i < customerdata.length; i++) {
                    var status = "";

                    if (customerdata[i]['status'] == 'A') {
                        status = "Active";
                    } else if (customerdata[i]['status'] == 'B') {
                        status = "BlackList";
                    }

                    table_content += "<tr><td class='text-center'>" + (i + 1) + "</td><td class='text-center'>" +
                        customerdata[i]['ic'] + "</td><td class='text-center'>" + customerdata[i]['name'] + "</td><td class='text-center'>" + status +
                        "</td><td class='text-center'><a href='customerreport.html?ID=" + customerdata[i]['customerid'] +
                        "' class='fas fa-hand-pointer hand-icon'></a></td></tr>";
                }

                document.getElementById("table_content").innerHTML = table_content;

                $('#dtBasicExample').DataTable({
                    columnDefs: [
                        { targets: 2, width: '40%' }

                    ]
                });
                $('.dataTables_length').addClass('bs-select');
            }

        },
        error: function(ajaxContext) {
            alert("The action of view all customer details is failed.");
        }
    });
}

function viewactivecustomer() {
    $.ajax({
        type: 'post',
        url: './php/customer.php',
        data: { action: "viewallactivecustomer" },
        dataType: "json",
        success: function(data) {

            var customerdata = data;
            var table_content = "";
            $('#dtBasicExample').DataTable().clear();
            $('#dtBasicExample').DataTable().destroy();
            $(".th-sm").removeClass('bg-dark text-white');
            $(".th-sm").addClass('bg-primary text-white');

            if (customerdata == "There are no record in the database.") {
                $('#dtBasicExample').DataTable({
                    columnDefs: [
                        { targets: 2, width: '40%' }
                    ]
                });
            } else {
                for (i = 0; i < customerdata.length; i++) {
                    var status = "";

                    if (customerdata[i]['status'] == 'A') {
                        status = "Active";
                    } else if (customerdata[i]['status'] == 'B') {
                        status = "BlackList";
                    }

                    table_content += "<tr><td class='text-center'>" + (i + 1) + "</td><td class='text-center'>" +
                        customerdata[i]['ic'] + "</td><td class='text-center'>" + customerdata[i]['name'] + "</td><td class='text-center'>" + status +
                        "</td><td class='text-center'><a href='customerreport.html?ID=" + customerdata[i]['customerid'] +
                        "' class='fas fa-hand-pointer hand-icon'></a></td></tr>";
                }

                document.getElementById("table_content").innerHTML = table_content;

                $('#dtBasicExample').DataTable({
                    columnDefs: [
                        { targets: 2, width: '40%' }

                    ]
                });
                $('.dataTables_length').addClass('bs-select');
            }

        },
        error: function(ajaxContext) {
            alert("The action of view all customer details is failed.");
        }
    });
}

function viewblacklistcustomer() {
    $.ajax({
        type: 'post',
        url: './php/customer.php',
        data: { action: "viewallblacklistcustomer" },
        dataType: "json",
        success: function(data) {

            var customerdata = data;
            var table_content = "";
            $('#dtBasicExample').DataTable().clear();
            $('#dtBasicExample').DataTable().destroy();
            $(".th-sm").removeClass('bg-primary text-white');
            $(".th-sm").addClass('bg-dark text-white');

            if (customerdata == "There are no record in the database.") {
                $('#dtBasicExample').DataTable({
                    columnDefs: [
                        { targets: 2, width: '40%' }
                    ]
                });
            } else {
                for (i = 0; i < customerdata.length; i++) {
                    var status = "";

                    if (customerdata[i]['status'] == 'A') {
                        status = "Active";
                    } else if (customerdata[i]['status'] == 'B') {
                        status = "BlackList";
                    }

                    table_content += "<tr><td class='text-center'>" + (i + 1) + "</td><td class='text-center'>" +
                        customerdata[i]['ic'] + "</td><td class='text-center'>" + customerdata[i]['name'] + "</td><td class='text-center'>" + status +
                        "</td><td class='text-center'><a href='customerreport.html?ID=" + customerdata[i]['customerid'] +
                        "' class='fas fa-hand-pointer hand-icon'></a></td></tr>";
                }

                document.getElementById("table_content").innerHTML = table_content;

                $('#dtBasicExample').DataTable({
                    columnDefs: [
                        { targets: 2, width: '40%' }

                    ]
                });
                $('.dataTables_length').addClass('bs-select');
            }

        },
        error: function(ajaxContext) {
            alert("The action of view all customer details is failed.");
        }
    });
}