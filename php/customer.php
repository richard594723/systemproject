<?php
include "dbconnection.php";

if($_POST['action']=="addcustomer")
{
    $data_list=array();
	$Sql_checkduplicate="Select IC FROM tblcustomer where ic='".$_POST['ic']."'";
	$Result_checkduplicate=mysqli_query($Link,$Sql_checkduplicate);
	if(mysqli_num_rows($Result_checkduplicate)>0)
	{
		$data_list['Message']="Duplicated";
	}
	else
	{
        
        $Sql_insertcustomer="INSERT INTO tblcustomer(customerid,ic,name,gender,dob,address1,address2,address3,postcode,city,state,mobilenumber,registerdate,status) VALUES(
        '',    
        '".$_POST['ic']."',
        '".$_POST['name']."',
        '".$_POST['gender']."',
        '".$_POST['dob']."',
        '".$_POST['address1']."',
        '".$_POST['address2']."',
        '".$_POST['address3']."',
        '".$_POST['postcode']."',
        '".$_POST['city']."',
        '".$_POST['state']."',
        '".$_POST['mobilenumber']."',
        '".date('Y-m-d')."',
        '".$_POST['status']."'
        )";
        $Result_insertcustomer=mysqli_query($Link,$Sql_insertcustomer);
        if($Result_insertcustomer)
        {
            $data_list['Message']="Success";
        }
        else
        {
            $data_list['Message']=$Sql_insertcustomer;
        }
	}
    echo json_encode($data_list);
			
}
else if($_POST['action']=="viewallcustomer")
{
    $data_list=array();
    $Sql_selectallcustomer="Select * FROM tblcustomer";
    $Result_selectallcustomer=mysqli_query($Link,$Sql_selectallcustomer);
    if(mysqli_num_rows($Result_selectallcustomer)>0)
    {
        for($i=0;$i<mysqli_num_rows($Result_selectallcustomer);$i++)
        {
            $row = mysqli_fetch_assoc($Result_selectallcustomer);
            $data_list[$i]['customerid']=$row['customerid'];
            $data_list[$i]['ic']=$row['ic'];
            $data_list[$i]['name']=$row['name'];
            $data_list[$i]['gender']=$row['gender'];
            $data_list[$i]['dob']=$row['dob'];
            $data_list[$i]['address1']=$row['address1'];
            $data_list[$i]['address2']=$row['address2'];
            $data_list[$i]['address3']=$row['address3'];
            $data_list[$i]['postcode']=$row['postcode'];
            $data_list[$i]['city']=$row['city'];
            $data_list[$i]['state']=$row['state'];
            $data_list[$i]['mobilenumber']=$row['mobilenumber'];
            $data_list[$i]['status']=$row['status'];

        }
        echo json_encode($data_list);
    }
    else
    {
        echo json_encode("There are no record in the database.");
    }    
}
else if($_POST['action']=="viewallactivecustomer")
{
    $data_list=array();
    $Sql_selectallcustomer="Select * FROM tblcustomer where status='A'";
    $Result_selectallcustomer=mysqli_query($Link,$Sql_selectallcustomer);
    if(mysqli_num_rows($Result_selectallcustomer)>0)
    {
        for($i=0;$i<mysqli_num_rows($Result_selectallcustomer);$i++)
        {
            $row = mysqli_fetch_assoc($Result_selectallcustomer);
            $data_list[$i]['customerid']=$row['customerid'];
            $data_list[$i]['ic']=$row['ic'];
            $data_list[$i]['name']=$row['name'];
            $data_list[$i]['gender']=$row['gender'];
            $data_list[$i]['dob']=$row['dob'];
            $data_list[$i]['address1']=$row['address1'];
            $data_list[$i]['address2']=$row['address2'];
            $data_list[$i]['address3']=$row['address3'];
            $data_list[$i]['postcode']=$row['postcode'];
            $data_list[$i]['city']=$row['city'];
            $data_list[$i]['state']=$row['state'];
            $data_list[$i]['mobilenumber']=$row['mobilenumber'];
            $data_list[$i]['status']=$row['status'];

        }
        echo json_encode($data_list);
    }
    else
    {
        echo json_encode("There are no record in the database.");
    }    
}
else if($_POST['action']=="viewallblacklistcustomer")
{
    $data_list=array();
    $Sql_selectallcustomer="Select * FROM tblcustomer where status='B'";
    $Result_selectallcustomer=mysqli_query($Link,$Sql_selectallcustomer);
    if(mysqli_num_rows($Result_selectallcustomer)>0)
    {
        for($i=0;$i<mysqli_num_rows($Result_selectallcustomer);$i++)
        {
            $row = mysqli_fetch_assoc($Result_selectallcustomer);
            $data_list[$i]['customerid']=$row['customerid'];
            $data_list[$i]['ic']=$row['ic'];
            $data_list[$i]['name']=$row['name'];
            $data_list[$i]['gender']=$row['gender'];
            $data_list[$i]['dob']=$row['dob'];
            $data_list[$i]['address1']=$row['address1'];
            $data_list[$i]['address2']=$row['address2'];
            $data_list[$i]['address3']=$row['address3'];
            $data_list[$i]['postcode']=$row['postcode'];
            $data_list[$i]['city']=$row['city'];
            $data_list[$i]['state']=$row['state'];
            $data_list[$i]['mobilenumber']=$row['mobilenumber'];
            $data_list[$i]['status']=$row['status'];

        }
        echo json_encode($data_list);
    }
    else
    {
        echo json_encode("There are no record in the database.");
    }    
}
else if($_POST['action']=="viewspecificcustomer")
{
    $data_list=array();
    $Sql_selectspecificcustomer="Select * FROM tblcustomer where customerid='".$_POST['customerid']."'";
    $Result_selectspecificcustomer=mysqli_query($Link,$Sql_selectspecificcustomer);
    if(mysqli_num_rows($Result_selectspecificcustomer)>0)
    {
        for($i=0;$i<mysqli_num_rows($Result_selectspecificcustomer);$i++)
        {
            $row = mysqli_fetch_assoc($Result_selectspecificcustomer);
            $data_list[$i]['customerid']=$row['customerid'];
            $data_list[$i]['ic']=$row['ic'];
            $data_list[$i]['name']=$row['name'];
            $data_list[$i]['gender']=$row['gender'];
            $data_list[$i]['dob']=$row['dob'];
            $data_list[$i]['address1']=$row['address1'];
            $data_list[$i]['address2']=$row['address2'];
            $data_list[$i]['address3']=$row['address3'];
            $data_list[$i]['postcode']=$row['postcode'];
            $data_list[$i]['city']=$row['city'];
            $data_list[$i]['state']=$row['state'];
            $data_list[$i]['registerdate']=$row['registerdate'];
            $data_list[$i]['mobilenumber']=$row['mobilenumber'];
            $data_list[$i]['status']=$row['status'];

        }
        echo json_encode($data_list);
    }
    else
    {
        echo json_encode("There are no such record in the database.");
    }    
}
else if($_POST['action']=="editcustomer")
{
    $data_list=array();
    $Sql_editcustomer="Update tblcustomer SET ic='".$_POST['ic']."', 
                                              name='".$_POST['name']."',
                                              gender='".$_POST['gender']."',
                                              dob='".$_POST['dob']."',
                                              address1='".$_POST['address1']."',
                                              address2='".$_POST['address2']."',
                                              address3='".$_POST['address3']."',
                                              postcode='".$_POST['postcode']."',
                                              city='".$_POST['city']."',
                                              state='".$_POST['state']."',
                                              mobilenumber='".$_POST['mobilenumber']."',
                                              status='".$_POST['status']."'
                                              where customerid='".$_POST['customerid']."'";
    $Result_editcustomer=mysqli_query($Link,$Sql_editcustomer);
    if($Result_editcustomer)
    {
        $data_list['Message']="The data of customer is edited successfully!";
    }
    else
    {
        $data_list['Message']="The data of customer is failed to be edited!";
    }
    echo json_encode($data_list);
}
else{
    echo json_encode("There is no action send.");
}
?>