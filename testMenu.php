

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

class menuPosGrp extends htmlObj{
	var $idParent;  //        - idRodzica - pozycji w menu
	var $kdVisible; //integer - widoczność grupy menu (0/1)
	var $stNazwa;   //string  - nazwa grupy menu
	var $top;		//integer - CSS top
	var $left;		//integer - CSS left
	var $lvl;		//integer - poziom menu
	var $pos;		//array   - lista id pozycji
	
	function __construct($ash, $aun = null, $hidP = 'mrPosGrp'){
		global $defaultV;
		global $defaultC;
		parent::__construct($ash, $aun, $hidP);
		
		//ustawienie domyślnych wartości dla pozycji menu
		$this->idParent   	= null;
		$this->kdVisible  	= false;
		$this->stNazwa    	= '';
		$this->top		 	= null;
		$this->left			= null;
		$this->lvl			= null;
		$this->pos			= null;
	}
}

class menuPos extends htmlObj{			
	var $kdVisible; //integer - widoczność menu (0/1)
	var $stColor;   //string  - kolor menu
	var $kdPoz;     //integer - kolejność wyświetlania - jest ściśle powiązana z numerem
	var $stNazwa;   //string  - nazwa menu
	var $kdBranch;  //integer - czy jest gałęzią (0/1) 
	
	var $loaded;   //boolean - true jeśli wgrany z bazy danych
	var $dbSelect; //boolean
	var $dbCreate; //boolean
	var $dbUpdate; //boolean
	var $dbDelete; //boolean
	var $nodeId;   //string - zawiera aktualny id noda menu z ktrym jest związany
	
	function __construct($ash, $aun = null, $print = true, $hidP = 'mrPos'){
		global $defaultV;
		global $defaultC;
		parent::__construct($ash, $aun, $hidP);
		$this->addList("kdVisible", "kdVisibility");	
		$this->addList("stColor",   "stColor");	
		$this->addList("kdPoz",     "kdPoz");
		$this->addList("stNazwa",   "stNazwa");
		$this->addList("kdBranch",  "kdBranch");
		$this->TableName = "menuposroz";
		
		//ustawienie domyślnych wartości dla pozycji menu
		$this->unParent   = null;
		$this->idParent   = null;
		$this->kdVisible  = $defaultV;
		$this->stColor    = $defaultC;
		$this->kdBranch   = 0;
		$this->id         = null;
		$this->loaded     = false;
		$this->dbSelect   = false;
		$this->dbCreate	  = false;
		$this->dbUpdate   = false;
		$this->dbDelete	  = false;
		$this->prevKdOper = null;
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
		
		printOnOff($this->sh);
	}
	
	//utworzenie w JS instancji pozycji menu
	function buildJSObj(){
		$this->sh->sh("<script language='javascript'>");
		$this->sh->sh("		var menuPos" . $this->un . " = getSerializedObj('" . serialize($this) ."');");
		$this->sh->sh("</script>");
	}
	//chyba nieużywane
	//wydrukowanie w HTMLu pozycji menu ze wszystkimi eventami
	function printBtn($idMenu){
		$name = "menuPos".$idMenu; 
		$this->sh->sh('<a id="'.$name.'_a" href=\'/\' onclick="return true">');
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