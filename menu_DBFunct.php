<?php
$menuPosList = array();

function readAllMenu($ash){
	echo "<div id='test'>";
	foreach(readPossibleMenuPos() as $key => $value){
		$tmpMenuPoz = new menuPos($ash, $value, false);
		$menuPosList[$value] = $tmpMenuPoz;
		$tmpMenuPoz->selectObj();
		echo serialize($tmpMenuPoz);
	}
	echo "</div>";
	
	/*$menuBuilder1 = new menuPos($sh, '1');
	//echo "<br><br>" . $menuBuilder1->list2Str() . "<bre><br>";
	$qry = $menuBuilder1->selectObj();
	echo "<div id='test'>";
	echo serialize($menuBuilder1);
	echo "</div>";*/
}

//zwracamy listę wszystkich pozycji menu z DB
function readPossibleMenuPos(){
	$unMenuList = array();
	$query = "SELECT un from menupos ORDER BY kdPoz";
	$result = mysql_query($query)
		or die (mysql_error());	
	while ($row = mysql_fetch_array($result, MYSQL_NUM)) {
		$unMenuList[count($unMenuList)] = $row[0];
	}
	return $unMenuList;
}
?>