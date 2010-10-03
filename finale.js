function doWindowResize(){
	doInfoBoxResize();
	doAskBoxResize();
}

window.onresize = doWindowResize;

var reqSleep = getXMLHttpRequest();
reqSleep.onreadystatechange = procResponse;
/*
req.open('get', '/cms/dbConnCMS.php?4=1', true);
//req.onreadystatechange = procResponse;
prif = showResp;
req.send(null);
req.close;//*/
