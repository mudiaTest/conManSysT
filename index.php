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
createTemplate($sh);
/*

$tmpAskBox  = new AskTNBox($sh, 'askBox' , 'askBox' );
*/
$tmpInfoBox = new InfoBox($sh, 'infoBox', 'infoBox');
$tmpMenuPosMenuBox = new MenuOptBox($sh, 'menuOpt', 'menuOpt');
$sh->sh("<div id='hintDiv'>ala</div>");
$sh->sh("<div id='hintDiv2'>ala</div>");

$sh->sh("<button onClick='showInfo(\"Testowe ostrze�enie\",\"Oto testowe ostrze�enie.\", \"okClick()\")'>Test</button>");
/*$sh->sh("<button onClick='showAsk(\"Testowe pytanie\",\"Tak, czy nie?\", \"takClick()\", \"nieClick()\")'>Test2</button>");
*/
$sh->sh("<button onClick='showMenuOpt(\"Testowe opcje menu\", null)'>TestMenuOpt</button>");

printOnOff($sh);
$sh->sh('<input type="button" id="changePos" onClick="changePosTest()" value="Pos">');

$sh->sh("<div id='loadTestDiv'></div>");
$sh->sh("<div id='rm_div'></div>");
$sh->sh('<input type="button" id="sTest" onClick="rm_SaveMenu()" value="SaveMenu()">');
//$sh->sh('<input type="button" id="lTest" onClick="loadMenu()" value="LoadMenu()">');
$sh->sh('<input type="button" id="lrTest" onClick="rm_LoadMenu()" value="loadMenuRoz()">');

$sh->sh("<div id='ans' style='display:none'>");
$sh->sh("</div>");


printFooter();
?>