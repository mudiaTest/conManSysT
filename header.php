<?php
function printHeader(){
	global $sh;
	$sh->sh('<!doctype html>'); 
	$sh->sh('<html>');
	$sh->sh('	<head>');
	$sh->sh('		<link rel="stylesheet" type="text/css" href="./system.css">');
	$sh->sh('		<link rel="stylesheet" type="text/css" href="./systemBox.css">');
	$sh->sh('		<link rel="stylesheet" type="text/css" href="./menu.css">');
	$sh->sh('		<link type="text/css" href="css/basic.css" rel="stylesheet" media="screen" />');
	$sh->sh('		<script type="text/javascript" src="./system.js"></script>'); 
	$sh->sh('		<script type="text/javascript" src="./systemBox.js"></script>');   
	$sh->sh('		<script type="text/javascript" src="./menu.js"></script>');
	$sh->sh('		<script type="text/javascript" src="./finale.js"></script>');
	$sh->sh('		<script type="text/javascript" src="./serialize.js"></script>');
	$sh->sh('		<script type="text/javascript" src="./sys_const.js"></script>');
	$sh->sh('	</head>');
	$sh->sh('<body>');	
}

function printFooter(){
	global $sh;
	//$sh->sh("<script type=\"text/javascript\">askSleep();</script>");
	$sh->sh('</body>');
	$sh->sh('</head>');
}
?>