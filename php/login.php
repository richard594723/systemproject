<?php
include "dbconnection.php";
if (trim($_POST['username']) != "" && trim($_POST['password'] != "")) {
    $data_list = array();
    $Sql_selectusername = "SELECT * FROM tbluser where Username = '" . strtoupper(trim($_POST['username'])) . "'";
    $Result_selectusername = mysqli_query($Link, $Sql_selectusername);
    if (mysqli_num_rows($Result_selectusername) == 1) {
        $Sql_selectuser = "SELECT * FROM tbluser where Username='" . strtoupper(trim($_POST['username'])) . "' AND Password ='" . md5(trim($_POST['password'])) . "'";
        $Result_selectuser = mysqli_query($Link, $Sql_selectuser);
        if (mysqli_num_rows($Result_selectuser) == 1) {
            $row = mysqli_fetch_assoc($Result_selectuser);
            $data_list['Username'] = $row['Username'];
            $data_list['AccType'] = $row['AccType'];
            $data_list['Status'] = $row['Status'];
            $data_list['Message'] = "Success";
        } else {
            $data_list['Message'] = "The username or the password is not correct.";
        }
    } else {
        $data_list['Message'] = "No such user exist.";
    }
    echo json_encode($data_list);
}
?>