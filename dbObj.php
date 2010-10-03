<?php

//includeOnce('./functDisp.php');

//podstawowy obiekt generyczny
class dbObj{
	var $un;
	var $TableName;
	var $parentUn;
	var $varList = array(); //lista par nazwa zmiannej-pole w db
	var $objList = array(); //lista podobiektów
	var $where   = '';		//wyrażenie where używane w zapytaniach
	//var $line;

	function __construct($aun){
		//$this->line = new SQLLine();
		if (empty($aun) || $aun == null){
			$this->un = null;
		}
		else{
			$this->un = $aun;
		}
		$this->parentUn = null;
		$this->addList("parentUn", "parentUn");
	}

	//dodaje do tabeli wpis nazwa zmiannej|nazwa pola w db
	function addList($apole, $akolumna = null){
		if (isSet($akolumna)){
			$nr = count($this->varList);
			$this->varList[$nr]["var"] = $apole;
			$this->varList[$nr]["tab"] = $akolumna;
		}
		else{
			$nr = count($this->objList);
			$this->objList[$nr] = $apole;
		}
	}
	
	function kol2Pole($akolumna){
		if ($akolumna <> "un"){
			foreach($this->varList as $key => $value){
				if ($value["tab"] == $akolumna){
					return $value["var"];
				}
			}
		}
		else{
			return $akolumna;
		}
	}
	
	function pole2Kol($apole){
		if ($apole <> "un"){
			foreach($this->$value as $key => $value){
				if ($value["var"] == $apole){
					return $valuear["tab"];
				}
			}
		}
		else{
			return $apole;
		}
	}

	//dodaje obiekt do listy obiektów
	function addObj(){
			
	}

	//wyświetla string kontrolny z liniami pól/wartości
	function varList2Str(){
		$str = '';
		$str .= "--: un v: " . $this->un . "<br>";
		$str .= "--: tableName v: " . $this->TableName . "<br>";
		foreach($this->varList as $key => $value){
			$str .= $value['var'] . ": " . $value['tab'] . " v:" . $this->$value['var'] . "<br>";
		}
		return $str;
	}

	//dla każdego podobiektu wywołuje list2Str
	function objList2Str(){
		$str = '';
		foreach($this->objList as $key => $obj){
			$str .= " O: " . $obj . "<br>";
			//$str .= $obj->varList2Str . "<br>";
			$str .= $obj->list2Str . "<br>";
		}
		return $str;
	}

	//wyświetla wszystkie wartości w obiekcie - korzysta z varList2Str i objList2Str
	function list2Str(){
		return $this->varList2Str() . "\n" .$this->objList2Str();
		//return $this->varList2Str();// . "\n" . objList2Str();
	}

	//ustala parent id zgodnie z praktyką dla obiektu
	function setParentId(){
	}

	//przepisuje id z self do wszystkich obiektów z listy
	function setParentIdAtChild($aList){
		foreach($aList as $value){
			$value->parentUn = $this->un;
			$t = 0;
		}
	}

	//przepisuje id z self do wszystkich obiektów z lisy w argumencie jako parentId
	function setParentIdAtObj($aList){
		foreach($aList as $value){
			if (isSet($this->$value)){
				$this->$value->parentUn = $this->un;
				$t = 0;
			}
		}
	}

	
	//INSERT

	//oddaje stringa z zaptaniem INSERT dla pojdyńczego OBIEKTU wartości z $varList 
	function dajInsertSQL(){
		$queryTmp = "INSERT INTO " . $this->TableName . " (";
		$innerSQL = "";
		foreach ($this->varList as $value){
			if ($value["tab"]=="parentUn" && $this->$value["var"] == null){
				continue;
			}
			if ($innerSQL != ""){
				$innerSQL .= ', ';
			}
			$innerSQL .= $value["tab"];
		}
		$queryTmp .= $innerSQL.") VALUES (";
		$innerSQL = '';
		foreach ($this->varList as $value){
			if ($value["tab"]=="parentUn" && $this->$value["var"] == null){
				continue;
			}
			if ($innerSQL != ''){
				$innerSQL .= ', ';
			}
			$innerSQL .= "'".$this->$value["var"]."'";
		}
		$queryTmp .= $innerSQL.")";
		return($queryTmp);
	}

	//wstawia do bazy obiekt z podobiektmi: 
	//	dajInsertSQL
	//	setParentId
	//	insertObjList (r)
	//	insertAllChildren
	function insertObj(){
		$query = $this->dajInsertSQL();
		$result = mysql_query($query)
		or die (mysql_error());
		$this->un = mysql_insert_id(); //ustawia wygenerowany un
		$this->setParentId(); //wstawia un'a jako parentUn do wszystkich dzieci
		$this->insertObjList($this->objList); //wpisuje do bazy wszystkie podobiekty z listy objList
		$this->insertAllChildren(); //wpisuje do bazy wszystkie "dzieci"
		return $query;
	}

	//uruchamia insertObj dla wszystkich obiektów z listy w argumencie:
	//	insertObj 
	function insertChildrenList($aList){
		foreach($aList as $value){
			$value->insertObj();
			$t = 0;
		}
	}

	//uruchamia insertObj dla wszystkich obiektów,
	//których nazwy są liście podanej w argumencie:
	//	insertObj 
	function insertObjList($aList){
		foreach($aList as $value){
			$this->$value->insertObj();
			$t = 0;
		}
	}

	//wpisuje do bazy wszystkie "dzieci"
	function insertAllChildren(){
	}

	//UPDATE

	function dajUpdateSQL(){
		$queryTmp = "UPDATE " . $this->TableName . " SET ";
		$innerSQL = "";
		foreach ($this->varList as $value){
			if ($value["tab"]=="parentUn" && $this->$value["var"] == null){
				continue;
			}
			if ($innerSQL != ""){
				$innerSQL .= ', ';
			}
			$innerSQL .= $value["tab"] . "='" . $this->$value["var"] . "'";
		}
		$queryTmp .= $innerSQL;
		$queryTmp .= " WHERE un=" . $this->un;
		return($queryTmp);
	}

	function updateObj(){
		$query = $this->dajUpdateSQL();
		//echo $query.'<br>';
		$result = mysql_query($query)
		or die (mysql_error());
		$this->un = mysql_insert_id();
		$this->setParentId();
		$this->updateObjList($this->objList);
		$this->updateAllChildren();
		$t = 0;
	}

	function updateChildrenList($aList){
		foreach($aList as $value){
			$value->updateObj();
			$t = 0;
		}
	}

	function updateObjList($aList){
		foreach($aList as $value){
			$this->$value->updateObj();
			$t = 0;
		}
	}

	function updateAllChildren(){
	}

	//DELETE

	function dajDeleteSQL($idPole = ''){
		if ($idPole == ''){
			$idPole = 'un';
		}
		$queryTmp = 'DELETE FROM ' . $this->TableName .
			' WHERE ' . $idPole . ' = ' . $this->$idPole;
		return($queryTmp);
	}

	function deleteObj($idPole = null){
		$query = $this->dajDeleteSQL($idPole);
		$result = mysql_query($query)
		or die (mysql_error());
		$this->setParentId();
		$this->deleteObjList($this->objList);
		$this->deleteAllChildren();
		$t = 0;
	}

	function deleteChildrenList($aList){
		$value = $aList[0];
		$value->deleteObj("parentUn");
		$t = 0;
	}

	function deleteObjList($aList){
		foreach($aList as $value){
			if (isSet($this->$value)){
				$this->$value->deleteObj("parentUn");
				$t = 0;
			}
		}
	}

	function deleteAllChildren(){
	}

	//SELECT

	function dajSelectSQL($idPole = ''){
		if ($idPole == ''){
			$idPole = 'un';
		}
		$queryTmp = "SELECT * FROM " . $this->TableName .
			" WHERE " . $idPole . " = '" . $this->$idPole . "'" . $this->where;
		return($queryTmp);
	}

	function selectObj($idPole = null){
		$query = $this->dajSelectSQL($idPole);
		//echo $query.'<br>';
		$result = mysql_query($query)
			or die (mysql_error());
			//tu parsujemy wynik
			$this->parseResult($result);

		$this->setParentId();
		$this->selectObjList($this->objList);
		$this->selectAllChildren();
		$t = 0;
	}

	function selectChildrenList($aList){
		$value = $aList[0];
		$value->selectObj("parentUn");
		$t = 0;
	}

	function selectObjList($aList){
		foreach($aList as $value){
			if (isSet($this->$value)){
				$this->$value->selectObj("parentUn");
				$t = 0;
			}
		}
	}

	function selectAllChildren(){
	}

	function parseFields($aresult){
		$i = 0;
		$headFields = array();
		while ($i < mysql_num_fields($aresult)){
			$field = mysql_fetch_field($aresult, $i);
			$headFields[$i] = $field->name;
			$i++;
		}
		mysql_data_seek($aresult, 0);
		return $headFields;
	}

	function parseResult($aresult){
		$headFields = $this->parseFields($aresult);
		while ($row = mysql_fetch_array($aresult, MYSQL_NUM)) {
			foreach($headFields as $key => $value){
				//echo $value.":".$row[$key];
				$pole = $this->kol2Pole($value);
				$this->$pole = $row[$key];
			}
		}
		echo "<br>";
	}

}

//dbObj z "sh"
class dbObjSh extends dbObj{
	var $sh;

	function __construct($ash, $aun){
		parent::__construct($aun);
		$this->sh = $ash;
	}
}

//obiekty z tabeli T1
class tabT1 extends dbObj{
	var $varPole1;
	var $varPole2;
	var $objPole3;
	var $listt2 = array();
	var $listt3 = array();

	function __construct($aun){
		parent::__construct($aun);
		$this->objPole3  = null;
		$this->TableName = 't1';
		$this->addList("varPole1", "pole1");
		$this->addList("varPole2", "pole2");
		$this->addList("objPole3");
	}
	function addT2($aobj = null){
		if ($aobj == null){
			$aobj = new tabT2('');
		}
		$nr = count($this->listt2);
		$this->listt2[$nr] = $aobj;
	}
	function addT31($aobj = null){
		if ($aobj == null){
			$aobj = new tabT31('');
		}
		$nr = count($this->listt3);
		$aobj->where = 'AND typ = 1';
		$this->listt3[$nr] = $aobj;
	}

	function setParentId(){
		parent::setParentId();
		$this->setParentIdAtChild($this->listt2);
		$this->setParentIdAtChild($this->listt3);
		$this->setParentIdAtObj($this->objList);
	}

	function insertAllChildren(){
		parent::insertAllChildren();
		$this->insertChildrenList($this->listt2);
		$this->insertChildrenList($this->listt3);
	}

	function updateAllChildren(){
		parent::updateAllChildren();
		$this->updateChildrenList($this->listt2);
		$this->updateChildrenList($this->listt3);
	}

	function deleteAllChildren(){
		parent::deleteAllChildren();
		$this->deleteChildrenList($this->listt2);
		$this->deleteChildrenList($this->listt3);
	}

	function selectAllChildren(){
		parent::selectAllChildren();
		$this->selectChildrenList($this->listt2);
		$this->selectChildrenList($this->listt3);
	}

	function prepareDelete(){
		$this->addT2();
		$this->addT31();
		$this->objPole3 = new tabT30('');
		$this->objPole3->where = 'AND typ = 0';
		$this->addObj($this->objPole3);
	}
}

//obiekty z tabeli T2
class tabT2 extends dbObj{
	var $varPole11;
	var $varPole21;
	function __construct($aun){
		parent::__construct($aun);
		$this->un = null;
		$this->TableName = 't2';
		$this->addList("varPole11", "pole11");
		$this->addList("varPole21", "pole21");
	}
}

//obietkty z taeli T3
class tabT3 extends dbObj{
	var $varPole12;
	var $varPole22;
	var $typ;
	function __construct($aun){
		parent::__construct($aun);
		$this->un = null;
		$this->TableName = 't3';
		$this->addList("varPole12", "pole12");
		$this->addList("varPole22", "pole22");
		$this->addList("typ"      , "typ");
	}

}

//obiekty z tej samej tabeli co T3, ale z własnością, że typ = 0;
class tabT30 extends tabT3{
	function __construct($aun){
		parent::__construct($aun);
		$this->typ = 0;
		$this->where = ' AND typ = 0';
	}
}

//obiekty z tej samej tabeli co T3, ale z własnością, że typ = 1;
class tabT31 extends tabT3{
	function __construct($aun){
		parent::__construct($aun);
		$this->typ = 1;
		$this->where = ' AND typ = 1';
	}
}

//tworzy wzorce klas obiektów - kopie, na ich podstawie, tworzone
//są przez metodę clone
function createTamplate($ash){
	//tworzy deserializowany obiekt-wzór z podanego stringa
	function printJSObj($name, $serObj, $ash){
		$ash->sh("<script language='javascript'>var pr_".$name." = PHP_Unserialize('" . $serObj ."');</script>");
	}
	printJSObj('tabT1',   serialize(new tabT1('')  ), $ash);
	printJSObj('tabT2',   serialize(new tabT2('')  ), $ash);
	printJSObj('tabT3',   serialize(new tabT3('')  ), $ash);
	printJSObj('tabT30',  serialize(new tabT30('') ), $ash);
	printJSObj('tabT31',  serialize(new tabT31('') ), $ash);
	printJSObj('menuPos', serialize(new menuPos('', '')), $ash);
}
?>