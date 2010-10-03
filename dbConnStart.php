<?php
//dane lokalne
$dbHost = "localhost";
$dbUser = "root";
$dbPass = "";
$dbName = "test";

mysql_connect($dbHost, $dbUser, $dbPass);

mysql_select_db($dbName)
	or die(mysql_error());
?>