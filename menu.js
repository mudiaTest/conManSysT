// -- tymczasowe - finalnie nie powinno być nic w tym bloku --

function as(){
	aa(this);
}

var t = 99;

// -- koniec tymczasowych ------------------------------------

// zmienna "show" kontrolek pozycji menu
var vMenu = false;
var menuDivCount = 0;
var dragIdElt = '';
var dragIdTarget = '';
var draggedId;
var prvColor;

// show/hide kontrolki cms'a
/*function shMenu (){
	if (!vMenu){
		menuEditOn();
		vMenu = true;
	}
	else{
		menuEditOff();
		vMenu = false;
	}
}*/

function hint(stIH){
	getEl('hintDiv').innerHTML = stIH;
}

function hint2(stIH){
	getEl('hintDiv2').innerHTML = getEl('hintDiv2').innerHTML + ' | ' + stIH;
}

// on kontrolek cms'a
/*function menuEditOn(){
	for (var i=0; i<menuPosList.length; i++){
		menuPosEditOn(i);
		showBlockGrad('menuPosAddBtn');
	}
}*/

function menuPosEditOn(i){
	/*
	 * disHref(getEl(getMenuPosName(menuPosList[i]['obj'].kdPoz) + "_a"));
	 * showBlockGrad(getMenuPosName(menuPosList[i]['obj'].kdPoz) + "_Color");
	 * showBlockGrad(getMenuPosName(menuPosList[i]['obj'].kdPoz) + "_Vis");
	 * showBlockGrad(getMenuPosName(menuPosList[i]['obj'].kdPoz) + "_Del");
	 * showBlockGrad(getMenuPosName(menuPosList[i]['obj'].kdPoz) +
	 * "_menuPosActions");
	 * showBlockGrad(getMenuPosName(menuPosList[i]['obj'].kdPoz) +
	 * "_menuActionsDiv"); enDrag(getMenuPosName(menuPosList[i]['obj'].kdPoz));
	 * enDrag(getMenuPosName(menuPosList[i]['obj'].kdPoz)+'_a');
	 */
	var menuPosNodeId = getMenuPosNodeId(menuPosList[i]['obj'].id);
	disHref(getEl(menuPosNodeId + "_a"));
	showBlockGrad(menuPosNodeId + "_Color");
	showBlockGrad(menuPosNodeId + "_Vis");
	showBlockGrad(menuPosNodeId + "_Del");
	showBlockGrad(menuPosNodeId + "_menuPosActions");
	showBlockGrad(menuPosNodeId + "_menuActionsDiv");
	enDrag(menuPosNodeId);
	enDrag(menuPosNodeId);
}

// off kontrolek cms'a
function menuEditOff(){
	for (var i=0; i<menuPosList.length; i++){
		//hideBlockGrad('menuPosAddBtn');
		menuPosEditOff(i);
	}
}

function menuPosEditOff(i){
/*
 * enHref(getEl(getMenuPosName(menuPosList[i]['obj'].kdPoz) + "_a"));
 * hideBlockGrad(getMenuPosName(menuPosList[i]['obj'].kdPoz) + "_Color");
 * hideBlockGrad(getMenuPosName(menuPosList[i]['obj'].kdPoz) + "_Vis");
 * hideBlockGrad(getMenuPosName(menuPosList[i]['obj'].kdPoz) + "_Del");
 * hideBlockGrad(getMenuPosName(menuPosList[i]['obj'].kdPoz) +
 * "_menuPosActions"); hideBlockGrad(getMenuPosName(menuPosList[i]['obj'].kdPoz) +
 * "_menuActionsDiv"); disDrag(getMenuPosName(menuPosList[i]['obj'].kdPoz));
 * disDrag(getMenuPosName(menuPosList[i]['obj'].kdPoz)+'_a');
 */
	
	var menuPosNodeId = getMenuPosNodeId(menuPosList[i]['obj'].id);
	enHref(getEl(menuPosNodeId + "_a"));
	hideBlockGrad(menuPosNodeId + "_Color");
	hideBlockGrad(menuPosNodeId + "_Vis");
	hideBlockGrad(menuPosNodeId + "_Del");
	hideBlockGrad(menuPosNodeId + "_menuPosActions");
	hideBlockGrad(menuPosNodeId + "_menuActionsDiv");
	disDrag(menuPosNodeId);
	disDrag(menuPosNodeId + '_a');
}

// buduje id w menuPosObj na podstawie jej danych i oddaje t/f potwierdzenie
function MOBudujId(menuPosObj){
	menuPosObj.id = -1;
	if (menuPosObj.un > 0){
		menuPosObj.id = menuPosObj.prefix + menuPosObj.kdPoz;
		return true;
	}
	else{
		return false;
	}
}

// oddaje pierwszy obiekt jeśli jego pole ma wartość
function MLGetByVar(pole, wartosc){
	var tmpObj;
	for(var i=0; i<menuPosList.length; i++){
		tmpObj = menuPosList[i]['obj'];
		if (tmpObj[pole] == wartosc){
			return tmpObj;
		}
	}
	return null;
}

// oddaje pierwszy obiekt o zadanym id
function MLGetById(wartosc){
	return MLGetByVar('id', wartosc);
}

// oddaje pierwszy obiekt o zadanym nodeId
function MLGetByNodeId(wartosc){
	return MLGetByVar('nodeId', wartosc);
}

// oddaje pierwszy obiekt o zadanym kdPoz
function MLGetByPoz(wartosc){
	return MLGetByVar('kdPoz', wartosc);
}

// oddaje pierwszy obiekt o zadanym un
function MLGetByUn(wartosc){
	return MLGetByVar('un', wartosc);
}

// oddaje t/f czy menuPos do zapisu - przyjmuje obiekt
function MLChanged(tmpMPO){
	return (tmpMPO.dbUpdate || tmpMPO.dbCreate || tmpMPO.dbDelete);
}

// oddaje t/f czy menuPos do zapisu - przyjmuje key w liście
function MLChangedKey(i){
	var tmpMPO = menuPosList[i]['obj'];
	return MLChanged(tmpMPO);
}

function getMenuPosNodeId(aid){
	return 'menuPos_' + aid;
}

function getMenuPosName(aun){
	return 'menuPos' + aun;
}

function getMenuPosNameA(aun){ 
	return getMenuPosName(aun)+'_a';
}

// zwraca obiekt menu przetrzymywany w liście po id jego noda (nie noda
// DIV'a!!!)
function getMenuPos(aid){
	for(var i=0; i<menuPosList.length; i++){
		if (getMenuPosName(menuPosList[i]['obj'].kdPoz) == aid){
			return menuPosList[i]['obj'];
		}
	}	
}

// zwraca obiekt menu przetrzymywany w liście po jego id
function getMenuPosUn(aun){
	for(var i=0; i<menuPosList.length; i++){
		if (menuPosList[i]['obj'].un == aun){
			return menuPosList[i]['obj'];
		}
	}	
}

// zwraca numer z menuPoszList obiektu po jego id
function getMenuPosListNr(aid){
	for(var i=0; i<menuPosList.length; i++){
		if (menuPosList[i]['obj'].id == aid){
			return i;
		}
	}	
}
/*
// funcja zmiany koloru pozycji menu
function menuPosColorClick(aid){
	
	var tmpMenuPos = MLGetById(aid);
	if (!tmpMenuPos.dbDelete){
		var tmpDiv = getEl(getMenuPosNodeId(aid));
		if (getStyle(tmpDiv, "backgroundColor") == 'red'){
			setStyle(tmpDiv, "backgroundColor", "black");
			tmpMenuPos.stColor = "black";
		} else {
			setStyle(tmpDiv, "backgroundColor", "red");
			tmpMenuPos.stColor = "red";
		}
		tmpMenuPos.dbUpdate = true;
	}
}

// funcja kasowania pozycji menu
function menuPosDelClick(aid){
	var tmpMenuPos = MLGetById(aid);
	var tmpDiv = getEl(getMenuPosNodeId(aid));
	if (!tmpMenuPos.dbDelete){
		setStyle(tmpDiv, "backgroundColor", "grey");
		tmpMenuPos.dbDelete = true;
	} else {
		setStyle(tmpDiv, "backgroundColor", tmpMenuPos.stColor);
		tmpMenuPos.dbDelete = false;
	}
}

// funkcja zmiany widzialności pozycji menu
function menuPosVisClick(aid){
	var tmpMenuPos = MLGetById(aid);
	var tmpDiv = getEl(getMenuPosNodeId(aid));
	if (!tmpMenuPos.dbDelete){
		if (getStyle(tmpDiv, "opacity") == 1){
			setStyle(tmpDiv, "opacity", "0.5");
			tmpMenuPos.kdVisible = 0;
		}
		else{
			setStyle(tmpDiv, "opacity", "1");
			tmpMenuPos.kdVisible = 1;
		}
		tmpMenuPos.dbUpdate = true;
	}
}*/

// funkcja zmiany widzialności pozycji menu
/*function menuPosActionsClick(aid){
	var tmpDiv = getEl(getMenuPosNodeId(aid) + suf_actionsDiv);
	if (cropPx(getStyle(tmpDiv, "width"))<=0)
		setStyle(tmpDiv, "width", addPx("100"));
	else
		setStyle(tmpDiv, "width", addPx("0"));
}*/

/*function menuPosAdd(){
	var tmp    = menuPosList.length;
	var place  = '';
	var tmpIHTML = '';
	var menuDiv = getEl('loadTestDiv');
	var newDiv;
	
	newDiv = document.createElement('div');
	newDiv.setAttribute("id", getMenuPosNodeId(menuPosList.length+1)+"_Div");
	// loadTestDiv.appendChild(newDiv);

	newPos = clone(pr_menuPos);
	newPos.un = (tmp+'_n');
	newPos.id = menuPosList.length+1;
	newPos.kdPoz = tmp;
	newPos.stNazwa = 'menu';
	newPos.dbCreate = true;
	newPos.nodeId = getMenuPosNodeId(menuPosList.length+1);
	// place = newPos.nodeId;
	// menu_placeInPage(newPos);
	menu_addToMenuPosList(newPos);	
	menu_placeInPage(menuDiv, newPos);
	swapNode(getEl(getMenuPosNodeId('dummy')+'_div'), getEl(newPos.nodeId+'_div'));

	// swapNode(loadTestDiv.childNodes[loadTestDiv.childNodes.length-2],
	// loadTestDiv.lastChild, null, false);

	menuPosEditOn(getMenuPosListNr(newPos.id));
	menuPosNodeSetStartStyle(newPos);
	
	menuPosChangeAll();
}*/

function menuPosChangeAll(){
	for (var i=0; i<menuPosList.length; i++){
		menuPosList[i]['obj'].dbUpdate = true;
	}
}

// tewstowe przesunięcie menu
function changePosTest(){
	menuDiv = getEl('loadTestDiv');
	swapNode('menuDiv_1', 'menuDiv_3');
}

function moveChildToPos(nodeToMove, parent, newPosNr){
	for (var i=parent.childNodes.length-2; i>=newPosNr; i--){
		swapNode(parent.childNodes[i+1], parent.childNodes[i]);
	}
}

function swapMenuId(node1, node2){
	swapId(node1, node2);
	if (node1.childNodes.length == node2.childNodes.length)
		for (i=0; i<node1.childNodes.length; i++){
			if (
				node1.defined && node2.defined &&
				node1.childNodes[i].id != null && node2.childNodes[i].id != null &&
			    node1.childNodes[i].id != '' && node2.childNodes[i].id != ''){
				// swapId(node1.childNodes[i], node2.childNodes[i]);
				// lkjlkj
				if (node1.childNodes.length > 0)
					swapMenuId(node1.childNodes[i], node2.childNodes[i]);
			}
		}
	// swapId(node1, node2);
}
function swapId(node1, node2){
	var tmp = node1.id;
	node1.id = node2.id;
	node2.id = tmp;
}

function MPNSetId(node, oldIdNrPart, newIdNrPart){
	var childNode;
	// swapId(node1, node2);
	for (var i=0; i<node.childNodes.length; i++){
		childNode = node.childNodes[i];
		if (childNode.id != null)			
			childNode.id = childNode.id.replace(('menuPos'+oldIdNrPart), ('menuPos'+newIdNrPart));
		MPNSetId(childNode, oldIdNrPart, newIdNrPart);
	}
	var t = 0;
}

function swapNode(element1, element2/* , parent, swapID */){
	if(typeof element1=="string"){element1=document.getElementById(element1);};
	if(typeof element2=="string"){element2=document.getElementById(element2);};
	if(!element1 || !element2){return null;};
	var clone1=element1.cloneNode(true);
	var clone2=element2.cloneNode(true);
	/*
	 * if (swapID){ // wymiana id pomiędzy divami pozycji menu clone1.id =
	 * element2.id; clone2.id = element1.id; // swapMenuId(clone1, clone2); //
	 * ustawienie odpowienich id dla noda menuPos w swapowanych divach
	 * MPNSetId(clone1, getNrChildById(parent, element1.id),
	 * getNrChildById(parent, element2.id)); MPNSetId(clone2,
	 * getNrChildById(parent, element2.id), getNrChildById(parent,
	 * element1.id)); }
	 */
	var replaced1=element1.parentNode.replaceChild(clone2, element1);
	var replaced2=element2.parentNode.replaceChild(clone1, element2);
}

function moveNode(node, target, parent, last){
	var nr = 0;
	var finished = false;
	var i = 0;
	var curId = '';
	var nrNode = getNrChildById(parent, node.id);
	var nrTarget = getNrChildById(parent, target.id);
	if (last) {
		nrTarget = parent.childNodes.length;
	}
	var newNodeNr = nrNode;
	
	// jeśli menu prZeswany w gorę
	if  (nrTarget<nrNode){
		for (var i=nrNode-1; i>nrTarget; i--){
			// jeśli kolejny node nie jest tekstem i zawiera coś w sobie
			// (tylko pozycje menu)
			if (parent.childNodes[i].id !=null && parent.childNodes[i].childNodes.length>1){
				swapNode(parent.childNodes[newNodeNr], parent.childNodes[i], parent, true);
				updateObjAfterMove(newNodeNr ,i, parent.childNodes[newNodeNr].id, parent.childNodes[i].id);
				newNodeNr = i;// przeswany id od teraz na numer i bo go
								// zmieniliśmy
			}
		}
	}
	// jeśli menu przeswany w dol
	if  (nrTarget>nrNode){
		for (var i=nrNode+1; i<nrTarget; i++){
			// jeśli kolejny node nie jedt tekstem i zawiera ciś w sibue
			// (tylko pozycje menu)
			if (parent.childNodes[i].id !=null && parent.childNodes[i].childNodes.length>1){
				swapNode(parent.childNodes[newNodeNr], parent.childNodes[i], parent, true);
				updateObjAfterMove(newNodeNr ,i , parent.childNodes[newNodeNr].id, parent.childNodes[i].id);
				newNodeNr = i;// przeswany id od teraz na numer i bo go
								// zmieniliśmy
			}
		}
	}
	var f =0;	
}

// po zmianie pozycji noda updatujemy wszelkie nazwy i pozycje w obiekcie menu
function updateObjAfterMove(oldNr, newNr, oldNodeId, newNodeId){
	var tmpMPOMoved  = MLGetByPoz(oldNr);
	var tmpMPOTarget = MLGetByPoz(newNr);
	tmpMPOMoved.kdPoz  = newNr;
	tmpMPOTarget.kdPoz = oldNr;
	tmpMPOMoved.nodeId = newNodeId;
	tmpMPOTarget.nodeId = oldNodeId;
	tmpMPOMoved.dbUpdate  = true;
	tmpMPOTarget.dbUpdate = true;
}
// -- pobieranie i wysyłka do DB --

// zapisanie ustawień menu
/*function saveMenu(){
	var i; // petla
	var mainGetStr = ''; // str z obiektami
	for(var i=0; i < menuPosList.length; i++){
		if (MLChangedKey(i)){
			mainGetStr += getMenuPosToSave(menuPosList[i]['obj']);
		}
	}
	postStr = "./dbConnCMS.php?dummy=0" + mainGetStr;
	ask('get', postStr, true, showResp);
	resetDBActions();
}
	// dodanie do post/get obiektu do przekazania
	function getMenuPosToSave(obj){
		var t = serialize(obj);
		return ("&obj_" + obj.id + "=" + serialize(obj)); 
	}
	
function resetDBActions(){
	for (var i=0; i<menuPosList.length; i++){
		menuPosList[i]['obj'].dbSelect = false;
		menuPosList[i]['obj'].dbCreate = false;
		menuPosList[i]['obj'].dbUpdate = false;
		menuPosList[i]['obj'].dbDelete = false;	
	}
}
*/
// pobieranie ustawień menu
function loadMenu(){
	mainGetStr = "&load_menu=1";
	postStr = "./dbConnCMS.php?dummy=0" + "&dys_load_menu=true";
	ask('get', postStr, true, menu_respLoad);
}
	// akcja po odczytaniu z db info o budowie menu
	function menu_respLoad(){
		var ans; // odpowiedż do zparsowania
		var lstSerializedObj = new Array(); // lista stringw reprezentujących
											// zserializowane obiekty
		var tmpMenuPos; // tymczasowa pozycja menu
		var tmpIHTML;   // kod inner HTML
		var menuDiv = getEl('loadTestDiv');
		var newDivMenuId = '';
		var newDivEmptyId = '';
		vMenu = false;  // ustawia, że edycja menu jest wyłączona
		showResp();// drukuje odpowiedz w div 'ans'
		lstSerializedObj = getLstSerializedObj(getEl("test").innerHTML);
		
		menuDiv.innerHTML = '';
		
		// wyczyszczenie listy menuPos
		for (var i=menuPosList.length-1; i>=0; i--){
			menuPosList[i]['obj'].free;
			menuPosList[i].free;
			menuPosList.pop();
		}
		for (var i=menuPosAddList.length-1; i>=0; i--){
			menuPosAddList[i].free;
			menuPosAddList.pop();
		}
		
		// zbudowanie od nowa menu z wgranych pozycji
		nr = 0;
		for (var i=0; i<lstSerializedObj.length; i++){
			if (lstSerializedObj[i] != ''){

				tmpMenuPos = getSerializedObj(lstSerializedObj[i]);
				tmpMenuPos.id = i;
				tmpMenuPos.loaded = true;
				menu_addToMenuPosList(tmpMenuPos);
				menu_placeInPage(menuDiv, tmpMenuPos);
			}
		}
		//dodanie ostatniej dummy pozycji - do przesunięcia pozycji menu na koniec
		
		var newMenuPosDivNode = document.createElement('div');
		newMenuPosDivNode.id = 'menuPos_dummy_div';
		menuDiv.appendChild(newMenuPosDivNode);
		newMenuPosDivNode.innerHTML = 
			'<div id="menuPos_dummy_dragIn" '+
			'ondragenter="return rm_DragEnter(event)" '+
			'ondrop="return rm_DragDrop(event, false)" '+
			'ondragover="return rm_DragOver(event)" '+
			'ondragleave="return rm_DragLeave(event)"'+
			'class ="menuPosDragOver">'+
			'WWW'+'</div>';
	}
		function getLstSerializedObj(aAns){
			return aAns.split('<br>');
		}


// -- funkcje dla pobranych menu --

// oddaje htmlową postać pozycji menu
function printMenuPos(amenuPos){
	var stIH = ''; // string z kt�rego wype�nimy InnerHTML;
	var posNodeId = getMenuPosNodeId(amenuPos.id);
	// stIH += '<div>';
	
	stIH = 
	'<div id="' + posNodeId + '_dragIn" '+
	'ondragenter="return rm_DragEnter(event)" '+
	'ondrop="return rm_DragDrop(event, false)" '+
	'ondragover="return rm_DragOver(event)" '+
	'ondragleave="return rm_DragLeave(event)"'+
	'class ="menuPosDragOver">'+
	'WWW'+
	'</div>'+	
	'<a draggable="false" ondragstart="return rm_DragStart(event, \''+amenuPos.id+'\')" ondragend="return rm_DragEnd(event)" '+
	'id="' + posNodeId + '_a" href="cms" onclick="return true">'+
		'<div id="' + posNodeId + '" class="menuPos">'+
			'<div id="' + posNodeId + '_menuPosActions" class="menuPosActions" onClick="menuPosActionsClick(\'' + amenuPos.id + '\')">S</div>'+
			'<div id="' + posNodeId + '_menuActionsDiv" class="menuActionsDiv">'+
				'<div id="' + posNodeId + '_Color" class="menuPosColor" onClick="menuPosColorClick(\'' + amenuPos.id + '\')">C'+
				'</div>'+
				'<div id="' + posNodeId + '_Vis"   class="menuPosVis"   onClick="menuPosVisClick  (\'' + amenuPos.id + '\')">V'+
				'</div>'+
				'<div id="' + posNodeId + '_Del"   class="menuPosDel"   onClick="menuPosDelClick  (\'' + amenuPos.id + '\')">X'+
				'</div>'+
			'</div>'+
			amenuPos.stNazwa + '_' + posNodeId + ' - ' + amenuPos.kdPoz+
		'</div>'+
	'</a>';
	
	// stIH += '</div>';

	return stIH;
}

// wstawia do HTMLa graficzn� reprezentacj� pozycji menu
function menu_placeInPage(amenuDiv, amenuPos){
	var elString = printMenuPos(amenuPos);
	var newMenuPosDivNode = document.createElement('div');
	newMenuPosDivNode.id = getMenuPosNodeId(amenuPos.id) + '_div';
	amenuDiv.appendChild(newMenuPosDivNode);
	newMenuPosDivNode.innerHTML = elString;

	menuPosNodeSetStartStyle(amenuPos);
	var t = 0;
}

function menuPosNodeSetStartStyle(amenuPos){
	var menuPosNodeId = getMenuPosNodeId(amenuPos.id);
	setStyle(getEl(menuPosNodeId), "backgroundColor", amenuPos.stColor);
	if (amenuPos.kdVisible == 1){
		setStyle(getEl(menuPosNodeId), "opacity", "1");
	}
	else if (amenuPos.kdVisible == 0){
		setStyle(getEl(menuPosNodeId), "opacity", "0.5");
	}
	if (vMenu){
		
	}
}

// dopisuje do listy menu pozycj� nowo dodanego menu
function menu_addToMenuPosList(amenuPos){
	var tmp = menuPosList.length;
	var tmp2 = menuPosAddList.length;
	menuPosList[tmp] = new Array;
	menuPosList[tmp]['obj'] = amenuPos;	
}

// -- inne --
