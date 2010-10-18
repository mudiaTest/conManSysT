<?php 
class DispLine{
	public function __construct(){
	}
	//string + NL
	function sh($astring){
		//echo $astring.putchar('c');
		if ($astring !=''){ 
			echo $astring."\n";
		}
	}
	//string
	function shnnl($astring){
		if ($astring !=''){ 
			echo $astring;
		}
	}
	//string + NL => br
	function shb($astring){
		//echo $astring.putchar('c');
		if ($astring !=''){ 
			echo nl2br($astring."\n");
		}
	}
	//string => br
	function shnnlb($astring){
		if ($astring !=''){ 
			echo nl2br($astring);
		}
	}
}

class DispRoundedBox{
	protected $localSh;
	protected $id;
	protected $class;
	public $mainId;
	public function __construct($ash, $aid, $aclass){
		$this->localSh 	= $ash;
		$this->id    	= $aid;
		$this->class 	= $aclass;
		$this->mainId   = $aid.'_framec';		
	}
	public function printMain(){
	}
	//tworzy box'a z 9 pďż˝l
	public function createBox($atopStrip){
		//if ($aclass[0]=='\''){
		//	$this->localSh->sh("<div id='".$aid."' style=".$aclass."'>");
		//}else{
			$this->localSh->sh("<div id='".$this->id."_cont' class='".$this->class."'>");
		//}
			$this->localSh->sh("	<div id='".$this->id."_framelt'    class='".$this->class."_framelt'></div>");
			$this->localSh->sh("	<div id='".$this->id."_framect'    class='".$this->class."_framect'>");
			$this->localSh->sh("		<div id='".$this->id."_titleStrip' class='".$this->class."_titleStrip'>$atopStrip</div>");
			$this->localSh->sh("	</div>");
			$this->localSh->sh("	<div id='".$this->id."_framert'    class='".$this->class."_framert'></div>");
			$this->localSh->sh("	<div id='".$this->id."_framelc'    class='".$this->class."_framelc'></div>");
			//odkomentowanie tego fragmentu spowoduje przykrycie aktywnej cz�ci
			//$this->localSh->sh("<div id='".$aid."_framec'   class='".$aclass."_framec'> </div>");
			$this->localSh->sh("	<div id='".$this->id."_framerc'    class='".$this->class."_framerc'></div>");
			$this->localSh->sh("	<div id='".$this->id."_framelb'    class='".$this->class."_framelb'></div>");
			$this->localSh->sh("	<div id='".$this->id."_framecb'    class='".$this->class."_framecb'></div>");
			$this->localSh->sh("	<div id='".$this->id."_framerb'    class='".$this->class."_framerb'></div>");
			$this->printMain();
		$this->localSh->sh("</div>");
	}
	public function emarge($acode, $aclass, $aid, $atopStrip){
		$this->localSh->sh("<div id='infoBcgBox' class='bcgInfoBox'>");
		$this->localSh->sh("</div>");
		$this->createBox($acode, $aclass, $aid, $atopStrip);	
	}
}

class InfoBox extends DispRoundedBox{
	public function __construct($ash, $aid, $aclass){
		parent::__construct($ash, $aid, $aclass);
		$this->createBox('');		
	}
	public function printMain(){
		$this->localSh->sh("<div id='".$this->id."_main'      class='".$this->class."_main'></div>");
		$this->localSh->sh("<div id='".$this->id."_buttonBox' class='".$this->class."_buttonBox'>");
		$this->localSh->sh("	<button id='".$this->id."_ok' class='okBtn' value='true'>Ok");
		$this->localSh->sh("	</button>");
		$this->localSh->sh("</div>");
	}
}

class MenuOptBox extends DispRoundedBox{
	public function __construct($ash, $aid, $aclass){
		parent::__construct($ash, $aid, $aclass);
		$this->createBox('');		
	}
	public function PrintMain(){
		$this->localSh->sh("<div id='".$this->id."_main' class='".$this->class."_main'>");
		$this->localSh->sh("Widoczność: <input type=checkbox id='menuOpt_Vis' value=''>");
		$this->localSh->sh("<br>");
		$this->localSh->sh("Podmenu: <input type=checkbox id='menuOpt_Bra' value=''>");
		$this->localSh->sh("<br>");
		$this->localSh->sh("Treść: <input type=text id='menuOpt_Text' value=''>");
		$this->localSh->sh("<br>");
		$this->localSh->sh("Usunąć: <input type=checkbox id='menuOpt_Del' value=''>");
		$this->localSh->sh("");
		$this->localSh->sh("");
		$this->localSh->sh("");
		$this->localSh->sh("</div>");	
	}
}

class AskTNBox extends DispRoundedBox{
	public function __construct($ash, $aid, $aclass){
		parent::__construct($ash, $aid, $aclass);
		$this->createBox('');		
	}
	public function printMain(){
		$this->localSh->sh("<div id='".$this->id."_main'      class='".$this->class."_main'></div>");
		$this->localSh->sh("<div id='".$this->id."_buttonBox' class='".$this->class."_buttonBox'>");
		$this->localSh->sh("	<button id='".$this->id."_tak' class='takBtn' value='true'>Tak</button>");
		$this->localSh->sh("	<button id='".$this->id."_nie' class='nieBtn' value='false'>Nie</button>");
		$this->localSh->sh("</div>");
	}
}
?>