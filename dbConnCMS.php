<?php
include_once "functDisp.php";
include_once "functSystem.php";
include_once("./dbConnStart.php");
include_once("./dbObj.php");
include_once("./testMenu.php");
include_once("./menu_DBFunct.php");
$sh = new DispLine();
/*
$queryNr = $_REQUEST['q'];

if ($queryNr == 1){ //Insert
	$query = "INSERT INTO menuPos VALUES (3, 'menuPos3', 'menu 3', 1);"; 
}

if ($queryNr == 2){ //delete
	$query = "DELETE FROM menuPos WHERE un = 3;"; 
}

if ($queryNr == 3){ //delete
	$query = "UPDATE menuPos SET kdVisibility=".$_REQUEST['v']." WHERE un = ".$_REQUEST['u'].";"; 
}

$result = mysql_query($query)
	or die (mysql_error());
*/


?>

<?php 

	/*
{
$r = new tabT1("kkk");
}
	
	$tmp = new tabT2("iii");
	$tmp->varPole11 = 51;
	$tmp->varPole21 = "51_";
	$r->addT2($tmp);
	
	$tmp = new tabT2("jjj");
	$tmp->varPole11 = 52;
	$tmp->varPole21 = "52_";
	$r->addT2($tmp);
	
	$tmp = new tabT3("kkk");
	$tmp->varPole12 = 53;
	$tmp->varPole22 = "53_";
	$r->addT31($tmp);
	
	$r->varPole1 = 5;
	$r->varPole2 = "5_";
	
	$r->objPole3 = new tabT3("www"); 
	
	//$r->insertObj();
	
	//*
	$w = new tabT1("kkk");
	$w->un = 51;
	
		/*$tmp = new tabT2("iii");
		$tmp->un = 31;
		$tmp->varPole11 = 51;
		$tmp->varPole21 = "51_";
		$r->addT2($tmp);
		
		$tmp = new tabT2("jjj");
		$tmp->un = 32;
		$tmp->varPole11 = 1152;
		$tmp->varPole21 = "52_";
		$r->addT2($tmp);
		
		$tmp = new tabT3("kkk");
		$tmp->un = 27;
		$tmp->varPole12 = 53;
		$tmp->varPole22 = "53_";
		$r->addT31($tmp);
		
		$r->varPole1 = 5;
		$r->varPole2 = "5_";
		
		$tmp = new tabT30("www");
		$tmp->varPole12 = 1153;
		$tmp->un = 28;
		$r->objPole3 = $tmp;*/ 
		
		/*$w->prepareDelete();
		//$w->selectObj();//*/
		
		/*$sObj = serialize($r);
	
	
	/*
	$w = new tabT1(50);
	$w->prepareDelete();
	$w->deleteObj();
	
	$w = new tabT1(48);
	$w->prepareDelete();
	$w->deleteObj();
	
	$t = "o";
	//*/
	//$query = "INSERT INTO menuPos VALUES (3, 'menuPos3', 'menu 3', 1);"; 
//}

	//echo count($_REQUEST) . "<br>";
	foreach ($_REQUEST as $key => $value){
		//echo $key . " : " . $value . "<br><br>";
		if (strncmp($key, 'obj_', 4) == 0){
			$obj = strToObj( $_REQUEST[$key] );
			//echo "<br><br>" . $obj->list2Str() . "<bre><br>";
			//jeśli pozycja menu istnieje już w bazie danych
			if ($obj->loaded){
				if ($obj->dbDelete){				
					$qry = $obj->deleteObj();
				}
				else 
				if ($obj->dbCreate){
					$qry = $obj->insertObj();
				}
				else 
				if ($obj->dbUpdate){
					$qry = $obj->updateObj();
				}
			}
			else 
			if (!$obj->loaded){
				if ($obj->dbDelete)
					{}
				else 
				if ($obj->dbCreate){
					$qry = $obj->insertObj();
				}
			}			
		}
		if ($key == 'dys_load_menu' && $value == 'true'){	
			readAllMenu($sh, 'menuPos');
		}
		if ($key == 'dys_load_menuRoz' && $value == 'true'){	
			readAllMenu($sh, 'menuPosRoz');
		}
	}
	//echo "<br><br>" . $obj->list2Str() . "<bre><br>";
	//$qry = $obj->insertObj();
	//echo $qry;
?>