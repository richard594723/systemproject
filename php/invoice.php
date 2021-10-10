<?php
include "dbconnection.php";

if($_POST['action']=="submitinvoice")
{
    $data_list=array();
	$Sql_checkduplicate="Select billno FROM tblinvoice where billno='".$_POST['billno']."'";
	$Result_checkduplicate=mysqli_query($Link,$Sql_checkduplicate);
	if(mysqli_num_rows($Result_checkduplicate)>0)
	{
		$data_list['Message']="Duplicated";
	}
	else
	{

        
        $Sql_insertinvoice="INSERT INTO tblinvoice(invoiceid,billno,billdatetime,expirydate,customerid,model,imei,phonelock,amount,actualamount,status) VALUES(
        '',    
        '".$_POST['billno']."',
        '".$_POST['billdatetime']."',
        '".$_POST['expirydate']."',
        '".$_POST['customerid']."',
        '".$_POST['model']."',
        '".$_POST['imei']."',
        '".$_POST['phonelock']."',
        '".$_POST['amount']."',
        '".$_POST['actualamount']."',
        'C'
        )";
        $Result_insertinvoice=mysqli_query($Link,$Sql_insertinvoice);
        if($Result_insertinvoice)
        {
            $data_list['Message']="Success";
        }
        else
        {
            $data_list['Message']=$Sql_insertinvoice;
        }
	}
    echo json_encode($data_list);
			
}
else if($_POST['action']=="viewallinvoice")
{
    $data_list=array();
    $Sql_selectallinvoice="Select * FROM tblinvoice";
    $Result_selectallinvoice=mysqli_query($Link,$Sql_selectallinvoice);
    if(mysqli_num_rows($Result_selectallinvoice)>0)
    {
        for($i=0;$i<mysqli_num_rows($Result_selectallinvoice);$i++)
        {
            $row = mysqli_fetch_assoc($Result_selectallinvoice);
            $data_list[$i]['invoiceid']=$row['invoiceid'];
            $data_list[$i]['billno']=$row['billno'];
            $data_list[$i]['billdatetime']=$row['billdatetime'];
            $data_list[$i]['expirydate']=$row['expirydate'];
            $data_list[$i]['customerid']=$row['customerid'];
            $data_list[$i]['model']=$row['model'];
            $data_list[$i]['imei']=$row['imei'];
            $data_list[$i]['phonelock']=$row['phonelock'];
            $data_list[$i]['amount']=$row['amount'];
            $data_list[$i]['actualamount']=$row['actualamount'];
            $data_list[$i]['status']=$row['status'];
            $Sql_selectname="Select ic,name FROM tblcustomer where customerid='".$row['customerid']."'";
            $Result_selectname=mysqli_query($Link,$Sql_selectname);
            $row=mysqli_fetch_assoc($Result_selectname);
            $data_list[$i]['ic']=$row['ic'];
            $data_list[$i]['name']=$row['name'];
        }
        echo json_encode($data_list);
    }
    else
    {
        echo json_encode("There are no record in the database.");
    }    
}
else if($_POST['action']=="viewspecificinvoice")
{
    $data_list=array();
    $Sql_selectspecificinvoice="Select * FROM tblinvoice where invoiceid='".$_POST['invoiceid']."'";
    $Result_selectspecificinvoice=mysqli_query($Link,$Sql_selectspecificinvoice);
    if(mysqli_num_rows($Result_selectspecificinvoice)>0)
    {
        for($i=0;$i<mysqli_num_rows($Result_selectspecificinvoice);$i++)
        {
            $row = mysqli_fetch_assoc($Result_selectspecificinvoice);
            $data_list[$i]['invoiceid']=$row['invoiceid'];
            $data_list[$i]['billno']=$row['billno'];
            $data_list[$i]['billdatetime']=$row['billdatetime'];
            $data_list[$i]['expirydate']=$row['expirydate'];
            $data_list[$i]['customerid']=$row['customerid'];
            $data_list[$i]['model']=$row['model'];
            $data_list[$i]['imei']=$row['imei'];
            $data_list[$i]['phonelock']=$row['phonelock'];
            $data_list[$i]['amount']=$row['amount'];
            $data_list[$i]['actualamount']=$row['actualamount'];
            $data_list[$i]['status']=$row['status'];
            $Sql_selectname="Select ic,name FROM tblcustomer where customerid='".$row['customerid']."'";
            $Result_selectname=mysqli_query($Link,$Sql_selectname);
            $row=mysqli_fetch_assoc($Result_selectname);
            $data_list[$i]['name']=$row['name'];
            $data_list[$i]['ic']=$row['ic'];

        }
        echo json_encode($data_list);
    }
    else
    {
        echo json_encode("There are no such record in the database.");
    }    
}
else if($_POST['action']=="editinvoice")
{
    $data_list=array();
    $Sql_editinvoice="Update tblinvoice SET billno='".$_POST['billno']."', 
                                             billdatetime='".$_POST['billdatetime']."',
                                             expirydate='".$_POST['expirydate']."',
                                             customerid='".$_POST['customerid']."',
                                             model='".$_POST['model']."',
                                             imei='".$_POST['imei']."',
                                             phonelock='".$_POST['phonelock']."',
                                             amount='".$_POST['amount']."',
                                             actualamount='".$_POST['actualamount']."',
                                             status='C'
                                             where invoiceid='".$_POST['invoiceid']."'";
    $Result_editinvoice=mysqli_query($Link,$Sql_editinvoice);
    if($Result_editinvoice)
    {
        $data_list['Message']="The data of invoice is edited successfully!";
    }
    else
    {
        $data_list['Message']="The data of invoice is failed to be edited!";
    }
    echo json_encode($data_list);
}
else{
    echo json_encode("There is no action send.");
}
?>