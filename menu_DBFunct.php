<?php
$menuPosList = array();

function readAllMenu($ash, $table){
	echo "<div id='test'>";
	foreach(readPossibleMenuPos($table) as $key => $value){
		$tmpMenuPoz = new menuPos($ash, $value, false);

		$menuPosList[$value] = $tmpMenuPoz;
		$tmpMenuPoz->selectObj();
		echo serialize($tmpMenuPoz);
	}
	echo "</div>";
}

//zwracamy listę wszystkich pozycji menu z DB
function readPossibleMenuPos($table){
	$unMenuList = array();
	$query = "SELECT un from " . $table . " ORDER BY kdPoz";	
	$result = mysql_query($query)
		or die (mysql_error());	
	while ($row = mysql_fetch_array($result, MYSQL_NUM)) {
		$unMenuList[count($unMenuList)] = $row[0];
	}
	return $unMenuList;
}
?>