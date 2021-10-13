<?php
include "dbconnection.php";

if($_POST['action']=="requestData")
{
    $data_list=array();
    $str = "";
    if($_POST['month']!=-1){
        $str .= "-".(($_POST['month']+1)<10? '0':'').($_POST['month']+1);
    }
    $Sql_selectallinvoice="SELECT * FROM tblinvoice WHERE billdatetime LIKE '".$_POST['year'].$str."-%'";
    $Result_selectallinvoice=mysqli_query($Link,$Sql_selectallinvoice);
    if(mysqli_num_rows($Result_selectallinvoice)>0)
    {
        for($i=0;$i<mysqli_num_rows($Result_selectallinvoice);$i++)
        {
            $row = mysqli_fetch_assoc($Result_selectallinvoice);
            $data_list[$i]['billdatetime']=$row['billdatetime'];
            $data_list[$i]['amount']=$row['amount'];
            $data_list[$i]['actualamount']=$row['actualamount'];
            $data_list[$i]['status']=$row['status'];
        }
        echo json_encode($data_list);
    }
    else
    {
        echo json_encode("There are no record in the database.");
    }    
}
else if($_POST['action']=="getYear")
{
    $data_list=array();
    $Sql_selectspecificinvoice="SELECT * FROM tblinvoice";
    $Result_selectspecificinvoice=mysqli_query($Link,$Sql_selectspecificinvoice);
    if(mysqli_num_rows($Result_selectspecificinvoice)>0)
    {
        for($i=0;$i<mysqli_num_rows($Result_selectspecificinvoice);$i++)
        {
            $row = mysqli_fetch_assoc($Result_selectspecificinvoice);
            $data_list[$i]['billdatetime']=$row['billdatetime'];
        }
        echo json_encode($data_list);
    }
    else
    {
        echo json_encode("There are no such record in the database.");
    }    
}
else{
    echo json_encode("There is no action send.");
}
?>