<?php
include_once "sys_const.php";
$defaultV = "1";
$defaultC = "red";


function printOnOff($ash){
	$ash->sh('<br>');
	$ash->sh('	<button id="menuButton" onClick="shMenu()">menu show</button>');
	$ash->sh('<br>');
}

function printMenuPosAdder($ash){
	$ash->sh('<br>');
	$ash->sh('<div id="menuNewDiv"></div>');
	$ash->sh('<br>');
	$ash->sh('<div id="menuPosAddBtn" class="menuPosAdd" onClick="menuPosAdd()">');
	$ash->sh('+');
	$ash->sh('</div>');
	$ash->sh('<br>');
}



class menuPos extends dbObjSh{
	var $id;        //integer - numer ID pozycji menu - nie jest zapisywany do bazy, tylko 
					//dodawany podczas tworzenia i niezmienny podczas ca�ego �ycia "strony"
	var $kdVisible; //integer - widoczność menu (0/1)
	var $stColor;   //string  - kolor menu
	var $kdPoz;     //integer - kolejność wyświetlania - jest ściśle powiązana z numerem
					//dziecka z ktrym jest powiązany
	var $stNazwa;   //string  - nazwa menu
	
	var $loaded;   //boolean - true jeśli wgrany z bazy danych
	var $dbSelect; //boolean
	var $dbCreate; //boolean
	var $dbUpdate; //boolean
	var $dbDelete; //boolean
	var $nodeId;   //string - zawiera aktualny id noda menu z ktrym jest związany
	
	function __construct($ash, $aun, $print = true){
		global $defaultV;
		global $defaultC;
		parent::__construct($ash, $aun);
		$this->addList("kdVisible", "kdVisibility");	
		$this->addList("stColor",   "stColor");	
		$this->addList("kdPoz",     "kdPoz");
		$this->addList("stNazwa",   "stNazwa");
		$this->TableName = "menupos";
		
//		ustawienie domyślnych wartości dla pozycji menu
		$this->id         = kdPinecha;
		$this->kdVisible  = $defaultV;
		$this->stColor    = $defaultC;
		$this->loaded     = false;
		$this->dbSelect   = false;
		$this->dbCreate	  = false;
		$this->dbUpdate   = false;
		$this->dbDelete	  = false;
		$this->prevKdOper = kdPinecha;
		$this->nodeId     = '';
		//$this->printJSFunctions();
		
		//dodanie pozycji menu do listy pozycji w JS
		if ($this->sh <> null and $print){
			$this->buildJSObj();
			$this->sh->sh("<script language='javascript'>");
			$this->sh->sh("		var tmp = menuPosList.length;");
			$this->sh->sh("		menuPosList[tmp] = new Array;");
			//$this->sh->sh("		menuPosList[tmp]['id']="."'menuPos".$this->un."';");
			$this->sh->sh("		menuPosList[tmp]['obj']="."menuPos".$this->un.";");
			$this->sh->sh("</script>");
		}
	}
	
	//dodanie menu do listy - wykonywane tylko w php podczas tworzenia
	function printJSFunctions(){
		$this->sh->sh("<script language='javascript'>");
		$this->sh->sh("		var tmp = menuPosList.length;");
		$this->sh->sh("		menuPosList[tmp] = new Array;");
		//$this->sh->sh("		menuPosList[tmp]['id']="."'menuPos".$this->un."';");
		$this->sh->sh("		menuPosList[tmp]['obj']="."menuPos".$this->un.";");
		$this->sh->sh("</script>");	
	}
	
	//utwoprzenie w JS instancji pozycji menu
	function buildJSObj(){
		$this->sh->sh("<script language='javascript'>");
		$this->sh->sh("		var menuPos" . $this->un . " = getSerializedObj('" . serialize($this) ."');");
		$this->sh->sh("</script>");
	}
	
	//wydrukowanie w HTMLu pozycji menu ze wszystkimi eventami
	function printBtn($idMenu){
		$name = "menuPos".$idMenu; 
		$this->sh->sh('<a id="'.$name.'_a" href=\'/cms/\' onclick="return true">');
		$this->sh->sh('<div id="'.$name.'" class="menuPos">');
		$this->sh->sh('	<div id="'.$name.'_Color" class="menuPosColor" onClick="menuPosColorClick(\''.$idMenu.'\', \''.$name.')">C');
		$this->sh->sh('	</div>');
		$this->sh->sh('	<div id="'.$name.'_Vis"   class="menuPosVis"   onClick="menuPosVisClick  (\''.$idMenu.'\', \''.$name.')">V');
		$this->sh->sh('	</div>');
		$this->sh->sh('</div>');
		$this->sh->sh('</a>');	
	}
}

?>

<?php
function printSecondTestMenu($ash){
	$ash->sh('<div id="rm_div" class="menu_rm_div" style="top:260px; left:20px">');
	$ash->sh('<div id="rm1" class="menu_rm0" onMouseOver="rmEnter(\'1\')">--- rm1 ---</div>');
	$ash->sh('<div id="rm2" class="menu_rm0" onMouseOver="rmEnter(\'2\')">--- rm2 ---</div>');
	$ash->sh('<div id="rm3" class="menu_rm0" onMouseOver="rmEnter(\'3\')">--- rm3 ---</div>');
	$ash->sh('</div>');
	
	$ash->sh('<div id="rm1_div" class="menu_rm_div" style="top:260px; left:87px">');
	$ash->sh('<div id="rm11" class="menu_rm1" onMouseOver="rmEnter(\'11\')">--- rm11 ---</div>');
	$ash->sh('</div>');
	
	$ash->sh('<div id="rm2_div" class="menu_rm_div" style="top:280px; left:87px">');
	$ash->sh('<div id="rm21" class="menu_rm2" onMouseOver="rmEnter(\'21\')">--- rm21 ---</div>');
	$ash->sh('<div id="rm22" class="menu_rm2" onMouseOver="rmEnter(\'22\')">--- rm22 ---</div>');
	$ash->sh('<div id="rm23" class="menu_rm2" onMouseOver="rmEnter(\'23\')">--- rm23 ---</div>');
	$ash->sh('</div>');
	
	$ash->sh('<div id="rm22_div" class="menu_rm_div" style="top:300px; left:162px">');
	$ash->sh('<div id="rm221" class="menu_rm22" onMouseOver="rmEnter(\'221\')">--- rm221 ---</div>');
	$ash->sh('<div id="rm222" class="menu_rm22" onMouseOver="rmEnter(\'222\')">--- rm222 ---</div>');
	$ash->sh('</div>');
	
	$ash->sh("<script language='javascript'>");
	$ash->sh("	rmParentList = new Array;");
	$ash->sh("	rmParentList['1']   = null;");
	$ash->sh("	rmParentList['2']   = null;");
	$ash->sh("	rmParentList['3']   = null;");
	$ash->sh("	rmParentList['11']  = 1;");
	$ash->sh("	rmParentList['21']  = 2;");
	$ash->sh("	rmParentList['22']  = 2;");
	$ash->sh("	rmParentList['23']  = 2;");
	$ash->sh("	rmParentList['221'] = 22;");
	$ash->sh("	rmParentList['222'] = 22;");
	$ash->sh("</script>");
	
	$ash->sh("<script language='javascript'>");
	$ash->sh("	rmOverList = new Array;");
	$ash->sh("</script>");
}
?>