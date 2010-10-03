<?php
function objToStr($aobj){
	return addSlashes( htmlspecialchars(serialize($aobj)));
}

function strToObj($astr){
	$str = htmlspecialchars_decode(stripslashes($astr));
	return unserialize($str);
}
?>