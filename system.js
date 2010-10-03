/* GLOBAL VARS */

var req = getXMLHttpRequest();
req.onreadystatechange = procResponse;

// var wait = false; // czy ma czeka� - obeznie nieu�ywany
// var clicked = false; // czy klikni�to na klawiszw info/ask-Box
var menuPosList = new Array;  	 // lista pozycji menu
var menuPosAddList = new Array;  // lista przyciskow dodających nową
									// pozycję menu
var ser_menuBuilder = new Array; // lista pozycji serStr menu
// var menuPosPrefix = 'menuPos'; / /przedrostek pozycji menu


/* FUNCT */

function aa(aText){
	alert(aText);
}

function getEl(id){
	return document.getElementById(id);
}

function disHref(el){
	el.setAttribute('onClick', 'return false');
}

function listToStr(alist){
	var result = '';
	/*for(var i=0; i<alist.length; i++){
		if(result != '')
			result += ' ';
		result += alist[i];
	}*/
	for ( var i in alist )
	{
		if(result != '')
			result += ' ';
		result += i + '>' + alist[i];
	}
	return result;
}

function enHref(el){
	el.setAttribute('onClick', 'return true');
}

function enDrag(el){
	var tmpEl = getEl(el);
	/*
	 * tmpEl.ondragenter = 'return false'; tmpEl.ondrop = 'return false';
	 * tmpEl.ondragover = 'return false'; tmpEl.ondragleave = 'return false';
	 */
	tmpEl.draggable = true;
	var t = 0;
}

function disDrag(el){
	var tmpEl = getEl(el);
	/*
	 * tmpEl.ondragenter = 'return false'; tmpEl.ondrop = 'return false';
	 * tmpEl.ondragover = 'return false'; tmpEl.ondragleave = 'return false';
	 */
	tmpEl.draggable = false;
	var t = 0;

}

/*
 * ondragenter="return dragEnter(event)"' + ' ondrop="return dragDrop(event,
 * false)"' + ' ondragover="return dragOver(event)"' + ' ondragleave="return
 * dragLeave(event)"';
 */

function getWindowW(){
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			return window.innerWidth-16;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			return document.body.offsetWidth-20;
		}
	}
}

function getWindowH(){
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			return window.innerHeight-16;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			return document.body.offsetHeight-20;
		}
	}
}

function clone(obj, copied) {
	/*
	 * if(obj == null || typeof(obj) != 'object'){ return obj; } var copied =
	 * copied || {}; var temp = new obj.constructor(); // changed (twice)
	 * copied[obj] = temp; for(var key in obj) { if (copied[obj[key]]) temp[key] =
	 * copied[obj[key]]; else { temp[key] = clone(obj[key], copied);
	 * copied[obj[key]] = temp[key]; } } return temp;
	 */
	return cloneObj(obj);
}

function cloneObj(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}


	function toCamelCase( sInput ) {
	  var oStringList = sInput.split('-');
	  if(oStringList.length == 1)  
	    return oStringList[0];
	  var ret = sInput.indexOf("-") == 0 ?
	      oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1) : oStringList[0];
	  for(var i = 1, len = oStringList.length; i < len; i++){
	    var s = oStringList[i];
	    ret += s.charAt(0).toUpperCase() + s.substring(1);
	  }
	  return ret;
	}

function getStyle(el, style) {
  if(!document.getElementById) return;
  
  var value = el.style[toCamelCase(style)];
  if(!value)
    if(document.defaultView)
      value = document.defaultView.
         getComputedStyle(el, "").getPropertyValue(style);
   
    else if(el.currentStyle)
      value = el.currentStyle[toCamelCase(style)];
   return value;
}

// pobiera nr dziecka (ojciec, idDziecko)
function getNrChildById(node, id){
	var curId = '';
	var nr = 0;
	for (var i=0; i<node.childNodes.length; i++){
		curId = node.childNodes[i].id;
		if (curId != null){

			if (curId == id){
				return i;
			}
			nr++;
		}
	}
}

function setStyle(el, style, value) {
	// aa(el.style[style]);
	el.style[style] = value;
}

function addPx(value){
	return value + 'px';
}

function cropPx(value){
	return value.substr(0, value.length-2);
}

function getXMLHttpRequest(){
	var request = false;
	try{
		request = new XMLHttpRequest();
	}
	catch(err1){
		try{
			request = new ActiveXObject('Msxml2.XMLHTTP');
		}
		catch(err2){
			try{
				request = new ActiveXObject('Microsoft.XMLHTTP');
			}
			catch(err3){
				request = false;
			}
		}
	}
	return request;
}

function procResponse(){
	if (req.readyState == 4){
		if (req.status == 200)
		{
			prif();
		}
	}
}

function ask(aPG, aUrl, aAsynch, aprif){
	req.open(aPG, aUrl, aAsynch);
	// prif = showResp;
	prif = aprif;
	req.send(null);
	req.close;
}

function askSleep(){
	// prif = showSleepResp;
	reqSleep.open('post', '/cms/sleep.php', false);
	reqSleep.onreadystatechange = procResponse;
	prif = showSleepResp;
	reqSleep.send(null);
	reqSleep.close;	
}

function showResp(){
	getEl("ans").innerHTML = req.responseText;
}

function showSleepResp(){
	getEl("ans").innerHTML = "Spa�em: " + req.responseText + "/100000 sec";
}

function getSerializedObj(aStr){
	return serialize(aStr);
}