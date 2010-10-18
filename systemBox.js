// ??old
var answered;

var menuOptId;

//centruje diva po środku pola przeglądarki
function doBoxResize(aid){
	var box = getEl(aid);
	var boxDisplay = getStyle(box, 'display');

	if (boxDisplay != "none"){
		var ww 	= getWindowW();
		var wh 	= getWindowH();
		var boxW= cropPx(getStyle(box, 'width'));
		var boxH= cropPx(getStyle(box, 'height'));
		var marginL = Math.round((ww-boxW)/2);
		var marginT = Math.round((wh-boxH)/2);
		setStyle(box, 'marginLeft', addPx(marginL));
		setStyle(box, 'marginTop',  addPx(marginT));
	}
}

//??old
function doInfoBoxResize(){
	//doBoxResize('infoBox');
}

//??old
function doAskBoxResize(){
	//doBoxResize('askBox');
}

//"ujawnia" div'a przez ustalenie parametru display
function showBlock(aid){
	var el = document.getElementById(aid);
	setStyle(el, 'display', 'block');
}

//krok ujawniania stopniowo diva przez Opacity
function showBlockOpac(aid, opac, timeOut){
	var el = document.getElementById(aid);
	setStyle(el, "opacity", opac/100 );
	if (getStyle(el, "opacity") < 1){
		setTimeout("showBlockOpac('"+aid+"', "+(opac+15)+", "+timeOut+")", timeOut);
	}
}

//ujawnia stopniowo div'a
function showBlockGrad(aid){
	showBlock(aid);
	//showBlockOpac(aid, 0, 50);
	showBlockOpac(aid, 100, 0);
}

//ukrywa div'a przez ustalenie display = none
function hideBlock(aid){
	var el = document.getElementById(aid);
	setStyle(el, 'display', 'none');
}

//krok ukrywania diova przez paranetr Opacity
function hideBlockOpac(aid, opac, timeOut){
	var el = document.getElementById(aid);
	setStyle(el, "opacity", opac/100 );
	if (getStyle(el, "opacity") > 0){
		setTimeout("hideBlockOpac('"+aid+"', "+(opac - 15)+", "+timeOut+")", timeOut);
	}
	else
		setTimeout("hideBlock('"+aid+"')");
}

//ukrywa stopniowo diva
function hideBlockGrad(aid){
	//hideBlockOpac(aid, 100, 50);
	hideBlockOpac(aid, 0, 0);
}

// ??Old
function showInfo(aName, aQuestion, xxx){
	var el = document.getElementById('infoBox' + '_cont');
	var elTopStrip = document.getElementById('infoBox'+'_titleStrip');
	var elQusetion = document.getElementById('infoBox'+'_main');
	var btnOk      = document.getElementById('infoBox'+'_ok');
	if (getStyle(el, 'display')=='none'){
		showBlock('infoBox'+ '_cont');
		//doBoxResize('infoBox'+ '_cont');
		elTopStrip.innerHTML = aName;
		elQusetion.innerHTML = aQuestion;
		btnOk.setAttribute('onclick', xxx);
	}
	else{
		hideBlock('infoBox'+ '_cont');
		elTopStrip.innerHTML = '';
		elQusetion.innerHTML = '';
	}
}

function showMenuOpt(aPosId){
	rm_Over(aPosId, true);
	var pos = rm_PosById(aPosId);
	var cont = getEl('menuOpt' + '_cont');
	var title = getEl('menuOpt'+'_titleStrip');
	
	if (getEl(pos.hid + suf_subMenu).innerHTML == '' || getStyle(cont, 'display') == 'none') {
		
		var prvPos = rm_PosById(getIdFromNodeId(cont.parentNode.getAttribute('id')));
		if (prvPos != null)
			getEl(prvPos.hid + suf_actions).innerHTML = '->>';
		cont.parentNode.removeChild(cont);
		getEl(pos.hid + suf_subMenu).appendChild(cont);
		showBlock('menuOpt' + '_cont');
		//doBoxResize('menuOpt' + '_cont');
		title.innerHTML = 'Menu options';
		
		getEl('menuOpt_Vis').checked = (pos.kdVisible == 1);
		getEl('menuOpt_Vis').setAttribute("onClick", "rm_MenuPosVisClick(" + aPosId + ")");
		
		getEl('menuOpt_Bra').checked = kd2tf(pos.kdBranch);
		getEl('menuOpt_Bra').setAttribute("onClick", "rm_MenuPosVisBraClick(" + aPosId + ")");
		
		getEl('menuOpt_Text').value = (pos.stNazwa);
		getEl('menuOpt_Text').setAttribute("onBlur", "rm_MenuPosTextBlur(" + aPosId + ")");
		
		getEl('menuOpt_Del').checked = (pos.dbDelete == true);
		getEl('menuOpt_Del').setAttribute("onClick", "rm_MenuPosDelClick(" + aPosId + ")");
		
		getEl(pos.hid + suf_actions).innerHTML = '<<-';
		//var top = getElAbsoluteTopPos(getEl(pos.hid + suf_container), document.body);
		//var left = getElAbsoluteLeftPos(getEl(pos.hid + suf_container), document.body);
		//top -= parseInt(getStyle(cont, 'height')) / 2;
		//left += parseInt(getStyle(cont, 'width'));
		//setStyle(cont, 'top', addPx(top));
		//setStyle(cont, 'left', addPx(left));
		beep();
	}
	else{
		hideBlock('menuOpt' + '_cont');
		title.innerHTML = '';
		getEl('menuOpt_Vis').setAttribute("onClick", "");
		getEl('menuOpt_Bra').setAttribute("onClick", "");
		getEl('menuOpt_Text').setAttribute("onBlur", "");
		getEl('menuOpt_Del').setAttribute("onClick", "");
		getEl(pos.hid + suf_actions).innerHTML = '->>';
	}
}

// ??old
function okClick(){
	aa("ok");
	//clicked = true;
	hideBlock('infoBox');
}

// ??old
function showAsk(aName, aQuestion, takF, nieF){
	var el = document.getElementById('askBox');
	var elTopStrip = document.getElementById('askBox'+'_titleStrip');
	var elQusetion = document.getElementById('askBox'+'_main');
	var btnTak      = document.getElementById('askBox'+'_tak');
	var btnNie      = document.getElementById('askBox'+'_nie');
	if (getStyle(el, 'display')=='none'){
		showBlock('askBox');
		//doBoxResize('askBox');
		elTopStrip.innerHTML = aName;
		elQusetion.innerHTML = aQuestion;
		btnTak.setAttribute('onclick', takF);
		btnNie.setAttribute('onclick', nieF); 
		elTopStrip.innerHTML = aName;
	}
	else{
		hideBlock('askBox');
		elTopStrip.innerHTML = '';
		elQusetion.innerHTML = '';
	}
}

// ??old
function takClick(){
	aa("tak");
	//clicked = true;
	hideBlock('askBox');
}

//??old
function nieClick(){
	aa("nie");
	//clicked = true;
	hideBlock('askBox');
}