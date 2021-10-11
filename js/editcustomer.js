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
                        { targets: 2, width: '25%' },
                        { targets: 4, width: '15%' },
                        { targets: 5, width: '30%' },
                        { targets: 6, width: '20%' }
                    ]
                });
            } else {
                for (i = 0; i < customerdata.length; i++) {
                    var gender = "";
                    var status = "";
                    var address = "";
                    if (customerdata[i]['gender'] == 'M') {
                        gender = "Male";
                    } else if (customerdata[i]['gender'] == 'F') {
                        gender = "Female";
                    }
                    if (customerdata[i]['status'] == 'A') {
                        status = "Active";
                    } else if (customerdata[i]['status'] == 'B') {
                        status = "BlackList";
                    }
                    address = customerdata[i]['address1'] + "," + customerdata[i]['address2'] + "," + customerdata[i]['address3'];

                    table_content += "<tr><td class='text-center'>" + (i + 1) + "</td><td class='text-center'>" +
                        customerdata[i]['ic'] + "</td><td class='text-center'>" + customerdata[i]['name'] + "</td><td class='text-center'>" + gender +
                        "</td><td class='text-center'>" + customerdata[i]['dob'] + "</td><td class='text-center'>" + address +
                        "</td><td class='text-center'>" + customerdata[i]['mobilenumber'] + "</td><td class='text-center'>" + status +
                        "</td><td class='text-center'><a href='editcustomerform.html?ID=" + customerdata[i]['customerid'] +
                        "' class='fas fa-edit edit-icon'></a><a href='viewcustomer.html?ID=" + customerdata[i]['customerid'] +
                        "' class='fas fa-file-alt view-icon'></a><button type='button' class='unstyled-button' onclick='deletecustomer(" + '"' + customerdata[i]['customerid'] + '"' + ")'><i class='fas fa-trash-alt delete-icon'></i></button></td></tr>";
                }

                document.getElementById("table_content").innerHTML = table_content;

                $('#dtBasicExample').DataTable({
                    columnDefs: [
                        { targets: 2, width: '25%' },
                        { targets: 4, width: '15%' },
                        { targets: 5, width: '30%' },
                        { targets: 6, width: '20%' }
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
                        { targets: 2, width: '25%' },
                        { targets: 4, width: '15%' },
                        { targets: 5, width: '30%' },
                        { targets: 6, width: '20%' }
                    ]
                });
            } else {
                for (i = 0; i < customerdata.length; i++) {
                    var gender = "";
                    var status = "";
                    var address = "";
                    if (customerdata[i]['gender'] == 'M') {
                        gender = "Male";
                    } else if (customerdata[i]['gender'] == 'F') {
                        gender = "Female";
                    }
                    if (customerdata[i]['status'] == 'A') {
                        status = "Active";
                    } else if (customerdata[i]['status'] == 'B') {
                        status = "BlackList";
                    }
                    address = customerdata[i]['address1'] + "," + customerdata[i]['address2'] + "," + customerdata[i]['address3'];

                    table_content += "<tr><td class='text-center'>" + (i + 1) + "</td><td class='text-center'>" +
                        customerdata[i]['ic'] + "</td><td class='text-center'>" + customerdata[i]['name'] + "</td><td class='text-center'>" + gender +
                        "</td><td class='text-center'>" + customerdata[i]['dob'] + "</td><td class='text-center'>" + address +
                        "</td><td class='text-center'>" + customerdata[i]['mobilenumber'] + "</td><td class='text-center'>" + status +
                        "</td><td class='text-center'><a href='editcustomerform.html?ID=" + customerdata[i]['customerid'] + "' class='fas fa-edit edit-icon'></a><a href='viewcustomer.html?ID=" + customerdata[i]['customerid'] + "' class='fas fa-file-alt view-icon'></a><button type='button' class='unstyled-button' onclick='deletecustomer(" + '"' + customerdata[i]['customerid'] + '"' + ")'><i class='fas fa-trash-alt delete-icon'></i></button></td></tr>";
                }
                document.getElementById("table_content").innerHTML = table_content;

                $('#dtBasicExample').DataTable({
                    columnDefs: [
                        { targets: 2, width: '25%' },
                        { targets: 4, width: '15%' },
                        { targets: 5, width: '30%' },
                        { targets: 6, width: '20%' }
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
            $('.th-sm').addClass("bg-dark text-white");
            if (customerdata == "There are no record in the database.") {
                $('#dtBasicExample').DataTable({
                    columnDefs: [
                        { targets: 2, width: '25%' },
                        { targets: 4, width: '15%' },
                        { targets: 5, width: '30%' },
                        { targets: 6, width: '20%' }
                    ]
                });
            } else {
                for (i = 0; i < customerdata.length; i++) {
                    var gender = "";
                    var status = "";
                    var address = "";
                    if (customerdata[i]['gender'] == 'M') {
                        gender = "Male";
                    } else if (customerdata[i]['gender'] == 'F') {
                        gender = "Female";
                    }
                    if (customerdata[i]['status'] == 'A') {
                        status = "Active";
                    } else if (customerdata[i]['status'] == 'B') {
                        status = "BlackList";
                    }
                    address = customerdata[i]['address1'] + "," + customerdata[i]['address2'] + "," + customerdata[i]['address3'];

                    table_content += "<tr><td class='text-center'>" + (i + 1) + "</td><td class='text-center'>" +
                        customerdata[i]['ic'] + "</td><td class='text-center'>" + customerdata[i]['name'] + "</td><td class='text-center'>" + gender +
                        "</td><td class='text-center'>" + customerdata[i]['dob'] + "</td><td class='text-center'>" + address +
                        "</td><td class='text-center'>" + customerdata[i]['mobilenumber'] + "</td><td class='text-center'>" + status +
                        "</td><td class='text-center'><a href='editcustomerform.html?ID=" + customerdata[i]['customerid'] + "' class='fas fa-edit edit-icon'></a><a href='viewcustomer.html?ID=" + customerdata[i]['customerid'] + "' class='fas fa-file-alt view-icon'></a><button type='button' class='unstyled-button' onclick='deletecustomer(" + '"' + customerdata[i]['customerid'] + '"' + ")'><i class='fas fa-trash-alt delete-icon'></i></button></td></tr>";
                }

                document.getElementById("table_content").innerHTML = table_content;

                $('#dtBasicExample').DataTable({
                    columnDefs: [
                        { targets: 2, width: '25%' },
                        { targets: 4, width: '15%' },
                        { targets: 5, width: '30%' },
                        { targets: 6, width: '20%' }
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

function deletecustomer(id) {
    $.ajax({
        type: 'post',
        url: './php/customer.php',
        data: { action: "deletecustomer", customerid: id },
        dataType: "json",
        success: function(data) {
            alert(data['Message']);
            location.reload();


        },
        error: function(ajaxContext) {
            alert("The action of delete customer details is failed.");
        }
    });
}