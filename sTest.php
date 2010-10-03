<?php
include_once "functDisp.php";
include_once "functSystem.php";
include_once("./dbObj.php");
echo count($_REQUEST) . "<br>";
foreach ($_REQUEST as $key => $val){
	echo $key . " : " . $val . "<br><br>";
}
$obj = strToObj( $_REQUEST['obj2'] );
?>