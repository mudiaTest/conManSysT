<?php 
class a{
	var $namae;
	function __construct($aname){
		$namae = $aname;
		$namae = $aname;
	}
	function get(){
		return $namae.':z '.get_class($this);
	}
}

class b Extends a{
	function get(){
		a::get();
		return $namae.':z '.get_class($this);
	}
}
?> 