<?php

class SQLLine{
	public $query;
	
	function add($line){
		$this->query .= $line . "<br>";
	}
	
	function clear(){
		$this->query = "<br>";
	}
}
?>