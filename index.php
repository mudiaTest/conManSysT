<?php
header('Content-Type: text/html; charset=utf-8');
include_once "sys_const.php";
include_once "functDisp.php";
include_once "functSystem.php";
include_once "dbObj.php";
$sh = new DispLine();
//$tmpBox = new InfoBox($sh);
include_once "header.php";
include_once "functTest.php";
include_once "testMenu.php";

printHeader();
?>


<?php 
createTamplate($sh);
$tmpInfoBox = new InfoBox($sh, 'infoBox', 'infoBox');
$tmpAskBox  = new AskTNBox($sh, 'askBox' , 'askBox' );

$sh->sh("<div id='hintDiv'></div>");

$sh->sh("<button onClick='showInfo(\"Testowe ostrze�enie\",\"Oto testowe ostrze�enie.\", \"okClick()\")'>Test</button>");
$sh->sh("<button onClick='showAsk(\"Testowe pytanie\",\"Tak, czy nie?\", \"takClick()\", \"nieClick()\")'>Test2</button>");

printOnOff($sh);
$sh->sh('<input type="button" id="changePos" onClick="changePosTest()" value="Pos">');

$sh->sh("<div id='loadTestDiv'></div>");
printMenuPosAdder($sh);

printSecondTestMenu($sh);

$sh->sh('<input type="button" id="sTest" onClick="saveMenu()" value="SaveMenu()">');
$sh->sh('<input type="button" id="lTest" onClick="loadMenu()" value="LoadMenu()">');



$sh->sh("<div id='ans'>");
$sh->sh("</div>");


printFooter();
?>