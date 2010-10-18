/**
 * @author mudia
 * 
 * Menu rozwijane
 * 
 */

//zmienne globalne

//lista wszystkich grup z pozycjemi menuR
var rm_grpList = new Array();
//lista pozycji rozwijanego menu
var rm_posList = new Array();


// metody

//zdarzenie na Over od menuRoz
function rm_Over(aid, force){
	if (getStyle(getEl('menuOpt_cont'), 'display') == 'none' || force)
		for each (grpObj in rm_grpList){
			rm_ReDrawMenu(grpObj, aid);
			if (grpObj.id == aid)
				rm_UstawCSSGrp(grpObj);
		}	
}

//zwraca kontener w ktĂłrym znajduje siÄ™ pozycja menu 
function rm_DajGrupeMenu(id){
	return 'rm'+id+'_div';
}

//dodaje do listy widocznych kontenerĂłw pozycji kontenery wszystkich przodkĂłw
function rm_dodajPrzodkowDoShowList(aid){
	if (rm_ParentList[aid] != null){
		rm_ShowList.push(dajGrupeMenu(rm_ParentList[aid]));
		rm_dodajPrzodkowDoShowList(rm_ParentList[aid]);
	}
}

//przerysowuje menu od nowa
var rm_ReDrawMenu = function(grpObj, posId){
	var res = false;
	//wyświetl grupÄ™ jeśli:
	//1) zawiera element.onOver	
	if ( grpObj.pos.indexOf(posId) >= 0)
		res = true;
	//2) zawiera element -> element.onOver	
	for (var i = 0; i < grpObj.pos.length; i++) {
		if (rm_PrzodekPotomek(posId, grpObj.pos[i]) == -1){
			res = true;
			break;
		}
	}
	//3) zawiera element wskazywany przez elemet.onOver
	for (var i = 0; i < grpObj.pos.length; i++) {
		if (posId == grpObj.id){
			res = true;
			break;
		}		
	}
	if (res)	
		setStyle(getEl(grpObj.hid), 'display', 'block')
	else
		setStyle(getEl(grpObj.hid), 'display', 'none')
}

// pobieranie ustawieĹ„ menu
function rm_LoadMenu(){
	mainGetStr = "&load_menu=1";
	postStr = "./dbConnCMS.php?dummy=0" + "&dys_load_menuRoz=true";
	ask('get', postStr, true, rm_RespLoad);
}
	// akcja po odczytaniu z db info o budowie menu
	function rm_RespLoad(){
		var ans; // odpowiedďż˝ do zparsowania
		var lstSerializedObj = new Array(); // lista stringw reprezentujďż˝cych
											// zserializowane obiekty
		var tmpPos; // tymczasowa pozycja menu
		var tmpIHTML;   // kod inner HTML
		var menuGrp = getEl('loadTestDiv');
		var newDivMenuId = '';
		var newDivEmptyId = '';
		vMenu = false;  // ustawia, ďż˝e edycja menu jest wyďż˝ďż˝czona
		showResp();// drukuje odpowiedz w div 'ans'
		lstSerializedObj = getLstSerializedObj(getEl("test").innerHTML);
		
		menuGrp.innerHTML = '';
		
		// wyczyszczenie listy menuPos
		for (var i=rm_posList.length-1; i>=0; i--){
			rm_posList[i]['obj'].free;
			rm_posList[i].free;
			rm_posList.pop();
		}
		
		// zbudowanie od nowa menu z wgranych pozycji
		nr = 0;
		for (var i=0; i<lstSerializedObj.length; i++){
			if (lstSerializedObj[i] != ''){

				tmpPos = getSerializedObj(lstSerializedObj[i]);
				//tmpPos.id = i;
				tmpPos.loaded = true;
				rm_addToPosList(tmpPos);
				//menu_placeInPage(menuGrp, tmpPos);
			}
		}
		beep();
		//budowanie menu
		rm_BudujMenu(true);
		
		/*for (var i=0; i<rm_posList.length; i++)
			rm_placeMenuInPage(rm_posList[i].obj);*/
		beep();
		
		//dodanie ostatniej dummy pozycji - do przesuniďż˝cia pozycji menu na koniec
		/*var newMenuPosDivNode = document.createElement('div');
		newMenuPosDivNode.id = 'menuPos_dummy_div';
		menuGrp.appendChild(newMenuPosDivNode);
		newMenuPosDivNode.innerHTML = 
			'<div id="menuPos_dummy_dragIn" '+
			'ondragenter="return rm_DragEnter(event)" '+
			'ondrop="return rm_DragDrop(event, false)" '+
			'ondragover="return rm_DragOver(event)" '+
			'ondragleave="return rm_DragLeave(event)"'+
			'class ="menuPosDragOver">'+
			'WWW'+'</div>';*/
	}
		function getLstSerializedObj(aAns){
			return aAns.split('<br>');
		}
	
//ustawia wartości CSS grup menu 	
function rm_UstawCSSGrp(amenuGrp){
	var grpDiv = getEl(rm_GrpById(amenuGrp.id).hid);
	if (amenuGrp.idParent == null) {
		amenuGrp.left = 50;
		amenuGrp.top = 300;
	}
	else {
		//pobieramy LEFT diva ojca i dodajemy 100 do szerokości
		amenuGrp.left = rm_GrpById(amenuGrp.idParent).left + cropPx(getStyle(getEl(rm_GrpById(amenuGrp.idParent).hid), 'width')); //!!!
		//pobieramy numer kolejnośÄ‡ pozycji * 20 i dodajemy TOP diva ojca
		amenuGrp.top =  rm_GrpById(amenuGrp.idParent).top + 
						getEl(rm_PosById(amenuGrp.id).hid+'_div').offsetTop - 
						(getEl(rm_PosById(amenuGrp.pos[0]).hid+'_div').offsetTop);
						// - getEl(amenuGrp.hid+'_tyt').offsetTop);
	}	
		setStyle(grpDiv, "top", addPx(amenuGrp.top));
		setStyle(grpDiv, "left", addPx(amenuGrp.left));
		setStyle(grpDiv, "position", 'absolute');
}
		
// wstawia pozycje menu do list i do HTMLa
function rm_BudujMenu(kodHtml){
	
	//sortujemy listÄ™ RM po kdPoz (asc)
	rm_posList.sort(rm_sortBykdPoz);
	//czyszczenie listy grup menu
	rm_grpList = [];
	//budowanie listy grup pozycji menu
	rm_DodajGrp0();
	for (var i=0; i<rm_posList.length; i++)
		rm_addToGrpList(rm_posList[i].obj);
	for (var i=0; i<rm_posList.length; i++)
		rm_addPosToGrpList(rm_posList[i].obj);
	//for (var i=0; i<rm_grpList.length; i++)
		//rm_initGrpList(rm_grpList[i]);
		
	if (kodHtml){
		//czyszczenie kodu html odpowiadającego za menu
		rm_WyczyscMenu();
		for (var i = 0; i < rm_grpList.length; i++) {
			var tmpGrp = rm_grpList[i];
			
			switch(i) {
			case 0:
				var color = 'red';
				break;
			case 1:
				var color = 'green';
				break;
			case 2:
				var color = 'grey';
				break;
			case 3:
				var color = 'yellow';
				break;
			}
				
			var newGrpDiv = document.createElement('div');
			newGrpDiv.setAttribute("id", tmpGrp.hid);
			getEl('rm_div').appendChild(newGrpDiv);
			//rm_GrpDodajTytul(tmpGrp, newGrpDiv);
					
				var newGrpBodyDiv = document.createElement('div');
				newGrpBodyDiv.setAttribute("id", tmpGrp.hid + suf_body);
				newGrpDiv.appendChild(newGrpBodyDiv);
			
					for each (var pos in rm_posList){
						if (pos.obj.idParent == tmpGrp.id)
							rm_BudujPosMenu(pos.obj, newGrpBodyDiv, color);
					}
			//buduj pusty div to swapa
			
			var addPosDiv = document.createElement('div');
			addPosDiv.setAttribute("id", tmpGrp.hid + suf_add);
			addPosDiv.setAttribute("onClick", 'rm_MenuPosAdd('+tmpGrp.id+')');
			addPosDiv.setAttribute("class", 'menuPosAdd');
			addPosDiv.innerHTML = '+';
			newGrpDiv.appendChild(addPosDiv);	
	
		}
	}
	
	rm_grpList.sort(rm_sortGrpByLvl);
	for (var i=0; i<rm_grpList.length; i++)
		rm_UstawCSSGrp(rm_grpList[i]);
	for (var i=0; i<rm_posList.length; i++)
		rm_UstawCSSPos(rm_posList[i].obj);
			
}

function rm_WyczyscMenu(){
	hideBlock('menuOpt' + '_cont');
	document.body.appendChild(getEl('menuOpt' + '_cont'));
	getEl('rm_div').innerHTML = '';
}

//dodaje pierwszy wiesz - tytuĹ‚ podgrupy
function rm_GrpDodajTytul(tmpGrp, divGrp){
	var tytulDiv = document.createElement('div');
	tytulDiv.setAttribute("id", tmpGrp.hid+'_tyt');
	setStyle(tytulDiv, "height", addPx('30'));
	setStyle(tytulDiv, "width", addPx('100'));
	setStyle(tytulDiv, "backgroundColor", 'magenta');
	tytulDiv.innerHTML = 'tytul grupy';
	divGrp.appendChild(tytulDiv);
	beep();
}

//dodaje pojedynczÄ… pozycjÄ™ menu
function rm_BudujPosMenu(pos, divGrp, color){
	rm_PrintMenuPos(pos, divGrp, color);
}

//dopisuje do listy menu pozycjďż˝ nowo dodanego menu
function rm_addToPosList(amenuPos){
	var tmp = rm_posList.length;
	rm_posList[tmp] = new Array;
	rm_posList[tmp]['obj'] = amenuPos;	
}

//inicjalizacja pustych wartości w rm_grpList
function rm_initGrpList(amenuGrp){
	for (var i = 0; i < rm_grpList.length; i++) {
		var tmpGrp = rm_grpList[i];
		if (tmpGrp.pos.indexOf(rm_PosByUn(amenuGrp.pos[0]).idParent) >= 0) {
			amenuGrp.idParent = tmpGrp.id;
			break;
		}
	}
}

function rm_DodajGrp0(){
	var newGrp = clone(pr_menuPosGrp);
	rm_grpList.push(newGrp);
	newGrp.id = 0;
	newGrp.lvl = 0;
	newGrp.pos = new Array();
	rm_GrpReinitId(newGrp);
	newGrp.idParent = null;
}

function rm_addToGrpList(amenuPos){
	if (kd2tf(amenuPos.kdBranch) && rm_GrpById(amenuPos.id) == null) {
		var newGrp = clone(pr_menuPosGrp);
		rm_grpList.push(newGrp);
		newGrp.id = amenuPos.id;
		newGrp.lvl = rm_dajPosLv(amenuPos)+1;
		newGrp.pos = new Array();
		rm_GrpReinitId(newGrp);
		newGrp.idParent = amenuPos.idParent;
	}
}
	//oddaje level pozycji
	//jako arg podajemy pozycję menu
	function rm_dajPosLv(amenuPos){
		var tmpPos = rm_PosById(amenuPos.idParent);
		if (tmpPos == null)
			return(0)
		else	
			return (rm_dajPosLv(tmpPos) + 1);
	}
	
function rm_addPosToGrpList(amenuPos){
	rm_GrpById(amenuPos.idParent).pos.push(amenuPos.id);
}
	
function rm_UstawCSSPos(amenuPos){
	var menuPosNodeId = getMenuPosNodeId(amenuPos.id);
	setStyle(getEl(amenuPos.hid + suf_body), "backgroundColor", amenuPos.stColor);
	if (amenuPos.kdVisible == 1){
		setStyle(getEl(amenuPos.hid + suf_body), "opacity", "1");
	}
	else if (amenuPos.kdVisible == 0){
		setStyle(getEl(amenuPos.hid + suf_body), "opacity", "0.85");
	}
	
	var obj = null;
	if (amenuPos.idParent > 0) {
		obj = getEl(rm_PosById(amenuPos.idParent).hid + suf_body);
		if (obj != null) 
			var parDisp = getStyle(obj, "display")
	}
	
	if (!vMenu && (amenuPos.kdVisible == 0 || (obj != null && parDisp == "none")) ) {
		setStyle(getEl(amenuPos.hid + suf_body), "display", "none");
		setStyle(getEl(amenuPos.hid + suf_dragIn), "display", "none");
	}
	else {
		setStyle(getEl(amenuPos.hid + suf_body), "display", "block");
		setStyle(getEl(amenuPos.hid + suf_dragIn), "display", "block");
		}
}




//SAVE MENU
// zapisanie ustawieĹ„ menu
function rm_SaveMenu(){
	var i; // petla
	var mainGetStr = ''; // str z obiektami
	for(var i=0; i < rm_posList.length; i++){
		if (rm_Changed(rm_posList[i]['obj'])){
			mainGetStr += rm_getPosToSave(rm_posList[i]['obj']);
		}
	}
	postStr = "./dbConnCMS.php?dummy=0" + mainGetStr;
	ask('get', postStr, true, showResp);
	rm_resetDBActions();
}
	// dodanie do post/get obiektu do przekazania
	function rm_getPosToSave(pos){
		var t = serialize(pos);
		return ("&obj_" + pos.id + "=" + serialize(pos)); 
	}
	
function rm_resetDBActions(){
	for (var i=0; i<rm_posList.length; i++){
		rm_posList[i]['obj'].dbSelect = false;
		rm_posList[i]['obj'].dbCreate = false;
		rm_posList[i]['obj'].dbUpdate = false;
		rm_posList[i]['obj'].dbDelete = false;	
	}
}

// oddaje t/f czy menuPos do zapisu - przyjmuje obiekt
function rm_Changed(tmpRM){
	return (tmpRM.dbUpdate || tmpRM.dbCreate || tmpRM.dbDelete);
}









//rĂłĹĽne dla RM

//rm_grpList

function rm_GrpReinitId(grpObj){
	grpObj.idParent = grpObj.unParent;
	grpObj.hid = grpObj.hidPrefix + '_' + grpObj.id;
}

function rm_GrpById(wartosc){
	return rm_GrpByVal(rm_grpList, 'id', wartosc);
}

function rm_GrpByVal(lista, pole, wartosc){
	var tmpGrp;
	for(var i=0; i<lista.length; i++){
		tmpGrp = lista[i];
		if (tmpGrp[pole] == wartosc){
			return tmpGrp;
		}
	}
	return null;
}

//rm_posList

function rm_PosReinitId(posObj){
	posObj.idParent = posObj.unParent;
	posObj.hid = posObj.hidPrefix + '_' + posObj.id;
}

//sortowania
function rm_sortBykdPoz(a, b) {
    var x = a.obj.kdPoz;
    var y = b.obj.kdPoz;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function rm_sortById(a, b) {
    var x = parseInt(a.obj.id);
    var y = parseInt(b.obj.id);
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function rm_sortGrpByLvl(a, b) {
	var x = a.lvl;
    var y = b.lvl;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function rm_SortGrpListByLvl(){
	var tmpGrpList = new Array();
	for (var i=0; i<rm_grpList.length; i++){
		
	}
}

// oddaje pierwszy obiekt jeśli jego pole ma wartośÄ‡
function rm_PosByVar(lista, pole, wartosc){
	var tmpObj;
	for(var i=0; i<lista.length; i++){
		tmpObj = lista[i]['obj'];
		if (tmpObj[pole] == wartosc){
			return tmpObj;
		}
	}
	return null;
}

function rm_PosByUn(wartosc){
	return rm_PosByVar(rm_posList, 'un', wartosc);
}

function rm_PosByIdParent(wartosc){
	return rm_PosByVar(rm_posList, 'idParent', wartosc);
}

function rm_PosById(wartosc){
	return rm_PosByVar(rm_posList, 'id', wartosc);
}

//jeśli asked -> current  to -1
//jeśli current -> asked to 1
//jeśli niespokrewnione to 0
function rm_PrzodekPotomek(current, asked){
	if (rm_MaPrzodka(current, asked)) 
		return -1
	else if (rm_MaPotomka(current, asked)) 
		return 1
	else
		return 0;
}

//jeśli asked -> current
function rm_MaPrzodka(current, asked){
	var curPos = rm_PosById(current);
	//var askPos = rm_PosById(asked);
	if (curPos.idParent == null || curPos.idParent == 0 || curPos.idParent == '0')
		return false
	else if (curPos.idParent == asked)
		return true
	else 
		return rm_MaPrzodka(curPos.idParent, asked);
}

//jeśli current -> asked
function rm_MaPotomka(current, asked){
	var askPos = rm_PosById(asked);
	if (askPos.idParent == current) 
		return true
	else if (askPos.idParent == null || askPos.idParent == 0 || askPos.idParent == '0')
		return false
	else
		return rm_MaPotomka(current, askPos.idParent);	
}

//oddaje obiekt poprzedający (w danym podmenu) obiekt zadany
function rm_GetPrvPosKdPos(posId){
	var pos = rm_PosById(posId);
	var res = null;
	for each(tmpPos in rm_posList){
		if (tmpPos.obj.idParent == pos.idParent &&
			tmpPos.obj.kdPoz < pos.kdPoz &&
			(res == null || res.kdPoz < tmpPos.obj.kdPoz))
			res = tmpPos.obj;
	}
	return res;
}

// oddaje htmlową… postać pozycji menu
function rm_PrintMenuPos(amenuPos, grpDiv, color){
	var menuPosContainer = document.createElement('div');
	menuPosContainer.setAttribute("id", amenuPos.hid + suf_container);
	menuPosContainer.setAttribute("onMouseOver", "rm_Over('" + amenuPos.id + "', false)");
	menuPosContainer.setAttribute("ondragover", "rm_Over('" + amenuPos.id + "', false)");
	menuPosContainer.setAttribute("class", "menuPosContainer");
	grpDiv.appendChild(menuPosContainer);
	
		var menuPosDiv = document.createElement('div');
		menuPosDiv.setAttribute("id", amenuPos.hid + suf_dragIn);
		menuPosDiv.setAttribute("ondragenter", "return rm_DragEnter(event)");
		menuPosDiv.setAttribute("ondrop", "return rm_DragDrop(event, false)");
		menuPosDiv.setAttribute("ondragover", "return rm_DragOver(event)");
		menuPosDiv.setAttribute("ondragleave", "return rm_DragLeave(event)");
		menuPosDiv.setAttribute("class", "menuPosDragOver");
		//menuPosDiv.innerHTML = 'WWW';
		menuPosContainer.appendChild(menuPosDiv);
			
		var menuPosA = document.createElement('div');
		menuPosA.setAttribute("id", amenuPos.hid + suf_a);
		menuPosA.setAttribute("draggable", "false");
		menuPosA.setAttribute("ondragstart", "return rm_DragStart(event, '" + amenuPos.id + "')");
		menuPosA.setAttribute("ondragend", "return rm_DragEnd(event)");
		menuPosA.setAttribute("href", "cms");
		menuPosA.setAttribute("class", "menuPosA");
		menuPosA.setAttribute("onclick", "return true");
		menuPosContainer.appendChild(menuPosA);
			
		var menuPosSubMenu= document.createElement('div');
		menuPosSubMenu.setAttribute("id", amenuPos.hid + suf_subMenu);
		menuPosSubMenu.setAttribute("class", "menuPosSubMenu");
		menuPosContainer.appendChild(menuPosSubMenu);
				
			var menuPosBody= document.createElement('div');
			menuPosBody.setAttribute("id", amenuPos.hid + suf_body);
			menuPosBody.setAttribute("class", "menuPos");
			menuPosA.appendChild(menuPosBody);
			
				var menuPosText= document.createElement('div');
				menuPosText.setAttribute("id", amenuPos.hid + suf_text);
				//menuPosText.setAttribute("class", "menuPos");
				menuPosText.innerHTML = 'p'+amenuPos.idParent+'->'+'p'+amenuPos.id+' ('+amenuPos.stNazwa+')'
				if (kd2tf(amenuPos.kdBranch)) {
					menuPosText.innerHTML = menuPosText.innerHTML + '<br>&gt;&gt;';
				}
				menuPosBody.appendChild(menuPosText);
			
			
				rm_AddMenuEditPanel(menuPosBody, amenuPos);
}

	function rm_AddMenuEditPanel(menuPosDiv, amenuPos){
		var menuPosActions= document.createElement('div');
		menuPosActions.setAttribute("id", amenuPos.hid + suf_actions);
		//menuPosActions.setAttribute("onClick", "rm_MenuPosActionsClick('" + amenuPos.id + "')");
		menuPosActions.setAttribute("onClick", "showMenuOpt('" + amenuPos.id + "')");
		menuPosActions.setAttribute("class", "menuPosActions");
		menuPosActions.innerHTML = '>>';
		menuPosDiv.appendChild(menuPosActions);
		
		var menuPosActionsDiv= document.createElement('div');
		menuPosActionsDiv.setAttribute("id", amenuPos.hid + suf_actionsDiv);
		menuPosActionsDiv.setAttribute("class", "menuActionsDiv");
		/*menuPosActionsDiv.innerHTML = 'Menu edycji';*/
		menuPosDiv.appendChild(menuPosActionsDiv);
		
			//rm_AddMenuEditRow(menuPosActionsDiv, amenuPos, suf_color, 'menuPosColor', "rm_MenuPosColorClick('" + amenuPos.id + "')", 'C');
			//rm_AddMenuEditRow(menuPosActionsDiv, amenuPos, suf_visibility, 'menuPosVis', "rm_MenuPosVisClick('" + amenuPos.id + "')", 'V');
			//rm_AddMenuEditRow(menuPosActionsDiv, amenuPos, suf_delete, 'menuPosDel', "rm_MenuPosDelClick('" + amenuPos.id + "')", 'X');
	}
	
		function rm_AddMenuEditRow(menuPosActionsDiv, amenuPos, asufix, aclass, aonClick, atext){
			var menuPosAction= document.createElement('div');
			menuPosAction.setAttribute("id", amenuPos.hid+asufix);
			menuPosAction.setAttribute("onClick", aonClick);
			menuPosAction.setAttribute("class", aclass);
			menuPosAction.innerHTML = atext;
			menuPosActionsDiv.appendChild(menuPosAction);
		}

//EDYCJA MENU