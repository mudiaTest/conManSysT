//var

var rm_ST_ADO = new Array();
var rm_ST_DDO = new Array();
var rm_ds;

// show/hide kontrolki cms'a
function shMenu (){
	getEl('hintDiv2').innerHTML = '';
	if (!vMenu){
		vMenu = true;
		rm_MenuEditOn();

	}
	else{
		vMenu = false;
		rm_MenuEditOff();
	}
	rm_grpList.sort(rm_sortGrpByLvl);
	for (var i=0; i<rm_grpList.length; i++)
		rm_UstawCSSGrp(rm_grpList[i]);
}

// on kontrolek cms'a
function rm_MenuEditOn(){
	for each(posObj in rm_posList)
		rm_MenuPosEditOn(posObj.obj);
	for each(grpObj in rm_grpList)
		rm_MenuGrpEditOn(grpObj.hid);
	//showBlockGrad('menuPosAddBtn');
	
}

function rm_MenuPosEditOn(apos){
	disHref(getEl(apos.hid + suf_a));
	//showBlockGrad(apos.hid + suf_color);
	//showBlockGrad(apos.hid + suf_visibility);
	//showBlockGrad(apos.hid + suf_delete);
	showBlockGrad(apos.hid + suf_subMenu);
	showBlockGrad(apos.hid + suf_dragIn);
	showBlockGrad(apos.hid + suf_actions);
	showBlockGrad(apos.hid + suf_actionsDiv);
	enDrag(apos.hid + suf_a);
	rm_UstawCSSPos(apos);
}

function rm_MenuGrpEditOn(ahid){
	showBlockGrad(ahid + suf_add);
}

// off kontrolek cms'a
function rm_MenuEditOff(){
	for each(posObj in rm_posList){
		//hideBlockGrad('menuPosAddBtn');
		rm_MenuPosEditOff(posObj.obj);
	}
	for each(grpObj in rm_grpList)
		rm_MenuGrpEditOff(grpObj.hid);
}

function rm_MenuGrpEditOff(ahid){
	hideBlockGrad(ahid + suf_add);
}

function rm_MenuPosEditOff(apos){
	enHref(getEl(apos.hid + suf_a));
	//hideBlockGrad(apos.hid + suf_color);
	//hideBlockGrad(apos.hid + suf_visibility);
	//hideBlockGrad(apos.hid + suf_delete);
	hideBlockGrad(apos.hid + suf_subMenu);
	showBlockGrad(apos.hid + suf_dragIn);
	hideBlockGrad(apos.hid + suf_actions);
	hideBlockGrad(apos.hid + suf_actionsDiv);
	disDrag(apos.hid + suf_a);
	rm_UstawCSSPos(apos);
}

// funkcja zmiany widzialnoĹ›ci pozycji menu
function rm_MenuPosActionsClick(aid){
	var pos = rm_PosById(aid);
	var tmpDiv = getEl(pos.hid + suf_actionsDiv);
	if (cropPx(getStyle(tmpDiv, "width"))<=0)
		setStyle(tmpDiv, "width", addPx("100"));
	else
		setStyle(tmpDiv, "width", addPx("0"));
}

// funcja zmiany koloru pozycji menu
function rm_MenuPosColorClick(aid){
	var pos = rm_PosById(aid);
	if (!pos.dbDelete){
		var tmpDiv = getEl(pos.hid + suf_body);
		if (getStyle(tmpDiv, "backgroundColor") == 'red'){
			setStyle(tmpDiv, "backgroundColor", "black");
			pos.stColor = "black";
		} else {
			setStyle(tmpDiv, "backgroundColor", "red");
			pos.stColor = "red";
		}
		pos.dbUpdate = true;
	}
}

// funkcja zmiany widzialnoĹ›ci pozycji menu
function rm_MenuPosVisClick(aid){
	var pos = rm_PosById(aid);
	var tmpDivBody = getEl(pos.hid + suf_body);
	var tmpDivDrag = getEl(pos.hid + suf_dragIn);
	if (!pos.dbDelete){
		if (getStyle(tmpDivBody, "opacity") == 1){
			setStyle(tmpDivBody, "opacity", "0.55");
			setStyle(tmpDivDrag, "opacity", "0.55");
			pos.kdVisible = 0;
		}
		else{
			setStyle(tmpDivBody, "opacity", "1");
			setStyle(tmpDivDrag, "opacity", "1");
			pos.kdVisible = 1;
		}
		pos.dbUpdate = true;
	}
}

// funcja kasowania pozycji menu
function rm_MenuPosDelClick(aid){
	var pos = rm_PosById(aid);
	var tmpDiv = getEl(pos.hid + suf_body);
	if (!pos.dbDelete){
		setStyle(tmpDiv, "backgroundColor", "grey");
		pos.dbDelete = true;
	} else {
		setStyle(tmpDiv, "backgroundColor", pos.stColor);
		pos.dbDelete = false;
	}
}

function rm_MenuPosTextBlur(aid){
	pos = rm_PosById(aid);
	pos.stNazwa = getEl('menuOpt_Text').value;
	getEl(pos.hid + suf_text).innerHTML = 'p'+pos.idParent+'->'+'p'+pos.id+' ('+pos.stNazwa+')'
	if (kd2tf(pos.kdBranch))
		getEl(pos.hid + suf_text).innerHTML = getEl(pos.hid + suf_text).innerHTML + '<br>&gt;&gt;';
	pos.dbUpdate = true;
}

function rm_MenuPosVisBraClick(aid){
	pos = rm_PosById(aid);
	pos.kdBranch= tf2kd(getEl('menuOpt_Bra').checked);
	getEl(pos.hid + suf_text).innerHTML = 'p'+pos.idParent+'->'+'p'+pos.id+' ('+pos.stNazwa+')'
	if (kd2tf(pos.kdBranch))
		getEl(pos.hid + suf_text).innerHTML = getEl(pos.hid + suf_text).innerHTML + '<br>&gt;&gt;';
	pos.dbUpdate = true;
}

function rm_MenuPosAdd(aid){
	var grpObj = rm_GrpById(aid);
	var tmp    = grpObj.pos.length;
	var newDiv;
	
	var newPos = clone(pr_menuPos);
	newPos.un = null;
	newPos.id = (parseInt(rm_MaxPosIdWLiscie()) + 1)+'';
	if (rm_PosById(aid) != null)
		newPos.unParent = aid
	else
		newPos.unParent = 0;
	newPos.kdPoz = tmp;
	newPos.stNazwa = 'menu';
	newPos.dbCreate = true;
	rm_PosReinitId(newPos);
	//newPos.nodeId = getMenuPosNodeId(menuPosList.length+1);
	rm_addToPosList(newPos);
	rm_addToGrpList(newPos);
	//rm_initGrpList(grpObj);
	
	rm_BudujPosMenu(newPos, getEl(grpObj.hid + suf_body), 'green');
	
	//swapNode(getEl(getMenuPosNodeId('dummy')+'_div'), getEl(newPos.hid + suf_container));


	//menuPosEditOn(getMenuPosListNr(newPos.id));
	//menuPosNodeSetStartStyle(newPos);
	
	//menuPosChangeAll();
}

function rm_MaxPosIdWGrupie(grpObj){
	rm_posList.sort(rm_sortById);
	var ret = grpObj.pos[grpObj.pos.length-1];
	rm_posList.sort(rm_sortBykdPoz);
	return ret;
}

function rm_MaxPosIdWLiscie(){
	rm_posList.sort(rm_sortById);
	var ret = rm_posList[rm_posList.length-1].obj.id;
	rm_posList.sort(rm_sortBykdPoz);
	return ret;
}


// DRAG

function rm_DragStart(ev, adraggedId) {
    var t = 0;
	draggedId = adraggedId;
    dss = adraggedId;
	dragIdElt = '';
	hint('rm_DragStart /' + draggedId);
	ev.dataTransfer.setData("Text", "dummy");
	ev.dataTransfer.setData("Text", "");
	disHref( getEl(rm_PosById(draggedId).hid + suf_a) );
    //ev.dataTransfer.setDragImage(ev.target,0,0);
    hint('rm_DragStart /');
    rm_ds = true;
    return true;
}

function rm_DragEnd(ev) {
	hint('rm_DragEnd');
    //ev.dataTransfer.clearData("Text");
    rm_ds = false;
    draggedId = null;
    return true;
}

function rm_DragEnter(ev) {
    var t='p';
    ddss = '0';
	while (rm_ST_DDO.length>0){
		clearTimeout(rm_ST_DDO[0]);
		rm_ST_DDO.shift();
	}
	hint('rm_DragEnter \ ' + ev.currentTarget.getAttribute('id'));
	var startH =  cropPx(getStyle(ev.currentTarget, 'height'));

	//id rodzica grupy = id grupy i 
	// nie przenosimy na samego siebie
	
	if (rm_czyMoznaPrzeniesc(draggedId, ev))
		rm_ActivateDragOver(ev.currentTarget.getAttribute('id'), startH, 40, 5)
	else {
		prvColor = getStyle(getEl(ev.currentTarget.getAttribute('id')), 'backgroundColor');
		setStyle(getEl(ev.currentTarget.getAttribute('id')), 'backgroundColor', 'black');
	}
    //return true;
}

	function rm_ActivateDragOver(aid, wysOd, wysDo, skok){
		//hint2('A0');
		var div = getEl(aid);
		setStyle(div, 'height', addPx(wysOd));
		var newWys = parseFloat(wysOd)+skok;
		if (wysOd < wysDo) {
			//hint2('A11 ' + wysOd + '<' + wysDo);
			rm_ST_ADO.push(setTimeout("rm_ActivateDragOver('" + aid + "', " + newWys + ", " + wysDo + ", " + skok + ")", 5))
		}
		else {
			//hint2('A12 ' + wysOd + '<' + wysDo);
			setStyle(div, 'height', addPx(wysDo));
		}
	}

function rm_DragLeave(ev){
	while (rm_ST_ADO.length>0){
		clearTimeout(rm_ST_ADO[0]);
		rm_ST_ADO.shift();
	}
	hint('dragLEAVE \ ' + ev.currentTarget.getAttribute('id'));
	//hint2('L \ ' + rm_ST_ADO);
	//var divTmpL = getEl(ev.currentTarget.getAttribute('id'));
	var format = ev.dataTransfer.types ? "text/plain" : "Text";
	setStyle(getEl(ev.currentTarget.getAttribute('id')), 'backgroundColor', prvColor);	
	var startH =  cropPx(getStyle(ev.currentTarget, 'height'));
	rm_DeactivateDragOver(ev.currentTarget.getAttribute('id'), startH, 5, 5);
    //return true;
}

	function rm_DeactivateDragOver(aid, wysOd, wysDo, skok){
		//hint2('D0');
		var div = getEl(aid);
		setStyle(div, 'height', addPx(wysOd));
		var newWys = parseInt(wysOd)-skok;
		if (wysOd > wysDo) {
			//hint2('D11 ' + wysOd + '>' + wysDo);
			rm_ST_DDO.push(setTimeout("rm_DeactivateDragOver('" + aid + "', " + newWys + ", " + wysDo + ", " + skok + ")", 20))
		}
		else {
			//hint2('D12 ' + wysOd + '>' + wysDo);
			setStyle(div, 'height', addPx(wysDo));
		}
	}

function rm_DragOver(ev) {
    // dragIdElt = ev.dataTransfer.getData("Text");
    // dragIdTarget = ev.target.getAttribute('id');
    // a1 = ev.originalTarget.getAttribute('id');
    // a2 = self.id;
    // a3 =
    // hint('rm_DragOver - ' + dragIdElt+' \ '+dragIdTarget+' \ '+a1+' \ '+a2);
    // if( (id =='boxB' || id =='boxA') && (idelt == 'drag' || idelt=='drag2'))
    // return false;
    // else if( id =='boxC' && idelt == 'drag3')
    // return false;
    // else
        return false;
}

function rm_DragDrop(ev, last) {
	var dragIdElt = ev.dataTransfer.getData("Text");
	//var curId = getIdFromNodeId(ev.currentTarget.getAttribute('id'));
	// przeszukaÄ‡ wlÄ…Ĺ›ciwoĹ›Ä‡i datatranster dla poruszanego obiektu,
	var nodeToMove = getEl(rm_PosById(draggedId).hid + suf_container);
	// var node = getEl(getMenuPosNameA(MLGetByUn(draggedId).kdPoz));
	// var parent = node.parentNode.id;
	// moveNode(node.parentNode, ev.target, getEl('loadTestDiv'), last);

	if (rm_czyMoznaPrzeniesc(draggedId, ev))
		rm_MoveMenuNode(ev.currentTarget, nodeToMove);
	else {
		//ev.dataTransfer.setData("Text", "");//getStyle(getEl(ev.currentTarget.getAttribute('id')), 'backgroundColor'));
		//setStyle(getEl(ev.currentTarget.getAttribute('id')), 'backgroundColor', 'black');
	}
	
	return false; // return false so the event will not be propagated to the
					// browser
}

// przesuniďż˝cie pozycji

// przesuwa Node pozycji menu
function rm_MoveMenuNode(target, moved){
    if (rm_DummyDragId(getIdFromNodeId(target.id))){

    }
    else{
        // aa(target.id + ' / ' + moved.id);
        var posTarget = rm_PosById(getIdFromNodeId(target.id));
        var posMoved  = rm_PosById(getIdFromNodeId(moved.id));
        var inner = moved.innerHTML;
        var movedId = moved.id;
        var movedClass = moved.Class;
        var movedOnOver = moved.onmouseover;
        var toLastPos = false;
        if (posTarget == null)
            toLastPos = true;


        var movedParent   = moved.parentNode;
        if (!toLastPos){
            var targetParent  = target.parentNode.parentNode;
            var targetChildNr = getNrChildById( targetParent, posTarget.hid + suf_container );
        }
        else{
            var targetObj = rm_GrpById(getIdFromDummyNodeId(target.id));
            targetParent = getEl(targetObj.hid + suf_body);
            var targetChildNr = targetParent.childNodes.length - 1;
        }
        var movedChildNr  = getNrChildById( movedParent, posMoved.hid + suf_container );

        //wypełnienie wartościami nowej pozytcji - głównie przepisanie ich ze starej
        var newMenuNode = document.createElement('div');
        newMenuNode.id = 'tmpMenuNode';
        newMenuNode.class = movedClass;
        newMenuNode.onMouseOver = movedOnOver;
        targetParent.appendChild(newMenuNode);
        moved.innerHTML = '';
        newMenuNode.innerHTML = inner;
        newMenuNode.id = movedId;
        moved.id = 'oldMenuPos';

        moveChildToPos(newMenuNode, targetParent, targetChildNr);
        movedParent.removeChild(getEl(moved.id)); //usuwa starą pozycję id do usunięcia

        if (!toLastPos){
            setStyle(target, 'height', addPx(20));
        }
        else{  
        }

        if (toLastPos){
            posMoved.unParent = targetObj.un;
            posMoved.idParent = targetObj.id;
        }
        else{
            posMoved.unParent = posTarget.unParent;
            posMoved.idParent = posTarget.idParent;
        }




        rm_UaktualnijKdPoz(targetParent);
        if (targetParent.id != movedParent.id)
            rm_UaktualnijKdPoz(movedParent);
        rm_BudujMenu(true);
    }
}

	// wyciďż˝ga id pozycji z id Node'a; oddaje null gdy jest zďż˝y format
	function getIdFromNodeId(anodeId){
		if (anodeId != null && anodeId.split("_")[0] == pr_menuPos.hidPrefix)
			return anodeId.split("_")[1];
		else
			return null;	                          
	}
	function getIdFromDummyNodeId(anodeId){
		if (anodeId != null && rm_DummyDragId(anodeId))
			return anodeId.split("_")[2];
		else
			return null;	                          
	}
	function rm_DummyDragId(anodeId){
		if (anodeId != null && anodeId.split("_")[1] == 'dummy')
			return true;
		else
			return false;
	}
	
	//uaktualnia kdPoz w obiekcjie zaleďż˝nie od tego, ktďż˝ry w kolejnoďż˝ci jest dany node
	function rm_UaktualnijKdPoz(parent){
		var tmpId;
		var pos = 0;
		for(var i=0; i<parent.childNodes.length; i++){
			tmpId = getIdFromNodeId(parent.childNodes[i].id); 
			if (tmpId == parseInt(tmpId)) {
				if (rm_PosById(tmpId).kdPoz != pos || tmpId == draggedId) {
					rm_PosById(tmpId).dbUpdate = true;
					rm_PosById(tmpId).kdPoz = pos;
				}
				pos++;
			}
		}
	}
	
function rm_czyMoznaPrzeniesc(dragId, ev){

    if (rm_DummyDragId(ev.currentTarget.getAttribute('id'))) {
		var curId = getIdFromDummyNodeId(ev.currentTarget.getAttribute('id'));
		var parentType = const_last;
	}
	else {
		var curId = getIdFromNodeId(ev.currentTarget.getAttribute('id'));
		var parentType = const_pos;
    }

    //w tym przypadku curId to id pozycji menu
	if (parentType == const_pos) {
		var prvPos = rm_GetPrvPosKdPos(curId);
		// NIE dragID -> curId
		// NIE dragID = curId
		// dragId nie poprzedza curId w tym samym podmenu
		if (rm_PrzodekPotomek(dragId, curId, false) != 1 &&
		    dragId != curId && (prvPos == null || dragId != prvPos.id))
			return true
		else 
			return false;
	}
    //w tym przypadku curId tp id grupy, więc dragId zmieniamy na id grupy w której się zawiera
	else if (parentType == const_last) {
		var lastPos = rm_GetLastPosKdPos(curId);
		// NIE dragID -> curId
		// NIE dragID = curId
		// dragId nie poprzedza curId w tym samym podmenu
		
		//curId jest id grupy
		var dragGrpId = rm_PosById(dragId).idParent;
		if ((dragGrpId == curId) || (rm_PrzodekPotomek(dragGrpId, curId, true) != 1 &&
		    dragGrpId != curId && lastPos == null))
			return true
		else 
			return false;
	}
}
