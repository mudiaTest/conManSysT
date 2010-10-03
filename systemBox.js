// ??old
var answered;

//centruje diva po środku pola przeglądarki
function doBoxResize(aid){
	var box = document.getElementById(aid);
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
	doBoxResize('infoBox');
}

//??old
function doAskBoxResize(){
	doBoxResize('askBox');
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
	showBlockOpac(aid, 0, 50);
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
	hideBlockOpac(aid, 100, 50);
}

// ??Old
function showInfo(aName, aQuestion, xxx){
	var el = document.getElementById('infoBox');
	var elTopStrip = document.getElementById('infoBox'+'_titleStrip');
	var elQusetion = document.getElementById('infoBox'+'_main');
	var btnOk      = document.getElementById('infoBox'+'_ok');
	if (getStyle(el, 'display')=='none'){
		showBlock('infoBox');
		doBoxResize('infoBox');
		elTopStrip.innerHTML = aName;
		elQusetion.innerHTML = aQuestion;
		btnOk.setAttribute('onclick', xxx); 
		elTopStrip.innerHTML = aName;
	}
	else{
		hideBlock('infoBox');
		elTopStrip.innerHTML = '';
		elQusetion.innerHTML = '';
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
		doBoxResize('askBox');
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