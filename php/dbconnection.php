<?php
$Username = "username";
$Password = "password";
$Localhost = "localhost";
//$Localhost = "http://www.richard.com:3306- ports";
$Dbname = "dbstock";
$Tables = array(
	"CREATE TABLE tbluser(
	Id Int(12) PRIMARY KEY Auto_Increment,
	Username VARCHAR(32),
	Password CHAR(32),
	AccType VARCHAR(15),
	Status CHAR(1)
	)",
	"CREATE TABLE tblcustomer(
		customerid Int(12) PRIMARY KEY Auto_Increment,
		ic VARCHAR(15),
		name VARCHAR(50),
		gender CHAR(1),
		dob DATE,
		address1 VARCHAR(50),
		address2 VARCHAR(50),
		address3 VARCHAR(50),
		postcode CHAR(5),
		city VARCHAR(15),
		state VARCHAR(15),
		mobilenumber VARCHAR(15),
		registerdate DATE,
		status CHAR(1)
	)",
	"CREATE TABLE tblinvoice(
		invoiceid Int(12) PRIMARY KEY Auto_Increment,
		billno VARCHAR(15),
		billdatetime DateTime,
		expirydate Date,
		customerid Int(12),
		model VARCHAR(50),
		imei VARCHAR(50),
		phonelock VARCHAR(50),
		amount Float(10),
		actualamount Float(10),
		status CHAR(1)
	)"
);

$Link = mysqli_connect($Localhost, $Username, $Password);

if ($Link) {
	if (!mysqli_select_db($Link, $Dbname)) {
		$Sql_createdb = "CREATE DATABASE " . $Dbname;
		$Result_createdb = mysqli_query($Link, $Sql_createdb);
	}
	mysqli_select_db($Link, $Dbname);
	for ($i = 0; $i < count($Tables); ++$i) {
		mysqli_query($Link, $Tables[$i]);
	}
	//check default user
	$Sql_selectadmin = "SELECT * FROM tbluser WHERE Username='ADMIN' AND Password = '" . md5('abcd1234') . "'";
	$Result_selectadmin = mysqli_query($Link, $Sql_selectadmin);
	if (mysqli_num_rows($Result_selectadmin) > 0) {
	} else {
		$Sql_insertadmin = "INSERT INTO tbluser(Username,Password,AccType,Status) values('ADMIN','" . md5('abcd1234') . "','ADMIN','A')";
		$Result_insertadmin = mysqli_query($Link, $Sql_insertadmin);
	}
} else {
	echo "Fail connecting to Database server";
}
?>