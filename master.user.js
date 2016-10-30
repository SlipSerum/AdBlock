// ==UserScript==
// @name       AdRemover
// @author     SlipSerum
// @version    1.0
// @homepage http://github.com/SlipSerum
// @description  Enjoy the web without ads!
// @match      http://*/*
// @match      https://*/*
// @exclude    https://www.google.*/*tbm=isch*
// @downloadURL https://github.com/SlipSerum/AdBlock/raw/master/master.user.js
// @copyright  2016, jHeight
// @namespace https://github.com/SlipSerum/AdBlock
// @updateURL https://github.com/SlipSerum/AdBlock/raw/master/master.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// ==/UserScript==
//unsafeWindow
var uw = (this.unsafeWindow) ? this.unsafeWindow : window;
//AdRemover object
uw.adremover = {
thisScriptVersion: "8.5",
startTime: new Date().getMilliseconds(),
startTimeSeconds: new Date().getSeconds(),
isfirefox: false,
keyWordList: [],
keyURLList: [],
keyPopupList: [],
keyInPagePopupList: [],
labelTextes: [],
removedElements: 0,
removedImages: 0,
removedObjects: 0,
removedPlaceholders: 0,
removedSpecialPopups: 0,
AR_elements_activated: true,
AR_objects_activated: true,
AR_images_activated: true,
AR_minimode_activated: false,
AR_placeholders_activated: true,
removedElementsArray: [],
removedImagesArray: [],
removedObjectsArray: [],
removedPlaceholdersArray: [],
removedSpecialPopupsArray: [],
AR_milliseconds: 0,
regexp_adsearch: "",
regexp_iframesearch: "",
regexp_popupsearch: "",
regexp_inpagepopupsearch: "",
testForForbiddenKeywords: function(words) {
	var h_Regexp = new RegExp("badge|radio|logo|acad|Ads_BA_TakeOver|fad|load|shad|read|head|add|pad|advanced|grad|admin|nonpro_adslayout|captcha|masthead-|yt-masthead","i");
    if (words.search(h_Regexp)>-1) {
		return true;   
    } else {
		return false;   
    }
},
initAdRegexp: function() {
	var newRegexpString = adremover.keyWordList[0];
	for (var i = 1;i<adremover.keyWordList.length;i++) {
		newRegexpString+="|"+adremover.keyWordList[i];
	}
	var a_Regexp = new RegExp(newRegexpString,"i");
	adremover.regexp_adsearch = a_Regexp;
},
initIframeRegexp: function() {
	var newRegexpString = adremover.keyURLList[0];
	for (var i = 1;i<adremover.keyURLList.length;i++) {
		newRegexpString+="|"+adremover.keyURLList[i];
	}
	var a_Regexp = new RegExp(newRegexpString,"i");
	adremover.regexp_iframesearch = a_Regexp;
},
initPopupRegexp: function() {
	var newRegexpString = adremover.keyPopupList[0];
	for (var i = 1;i<adremover.keyPopupList.length;i++) {
		newRegexpString+="|"+adremover.keyPopupList[i];
	}
	var a_Regexp = new RegExp(newRegexpString,"i");
	adremover.regexp_popupsearch = a_Regexp;
},
initInPagePopupRegexp: function() {
	var newRegexpString = adremover.keyInPagePopupList[0];
	for (var i = 1;i<adremover.keyInPagePopupList.length;i++) {
		newRegexpString+="|"+adremover.keyInPagePopupList[i];
	}
	var a_Regexp = new RegExp(newRegexpString,"i");
	adremover.regexp_inpagepopupsearch = a_Regexp;
},
handleIframe: function(iframe) {
	if (iframe) {
		var oldSRC = iframe.getAttribute("src");
		adremover.removedObjectsArray.push(oldSRC);
		iframe.outerHTML="";
	}
},
getBrowserLanguage: function() {
	adremover.labelTextes = [];
	adremover.labelTextes[0] = "Total";
	adremover.labelTextes[1] = "Elements";
	adremover.labelTextes[2] = "Images";
	adremover.labelTextes[3] = "Objects";
	adremover.labelTextes[4] = "Click for Popup!";
	adremover.labelTextes[5] = "Close popup";
	adremover.labelTextes[6] = "Restore ads partially";
	adremover.labelTextes[7] = "Enable AdRemover on this domain";
	adremover.labelTextes[8] = "General Settings";
	adremover.labelTextes[9] = "Remove normal elements";
	adremover.labelTextes[10] = "Remove images";
	adremover.labelTextes[11] = "Remove iframes";
	adremover.labelTextes[12] = "Remove placeholders";
	adremover.labelTextes[13] = "Ads restored!";
	adremover.labelTextes[14] = "An unknown error occurred in AdRemover "+adremover.thisScriptVersion+".";
	adremover.labelTextes[15] = "AdRemover is now disabled on this domain!";
	adremover.labelTextes[16] = "AdRemover is now enabled on this domain!";
	adremover.labelTextes[17] = "Placeholders";
	adremover.labelTextes[18] = "About";
	adremover.labelTextes[19] = "Author";
	adremover.labelTextes[20] = "Minimized info";
	if (navigator.language.indexOf("de")>=0) {
		//German translation
		adremover.labelTextes[0] = "Gesamt";
		adremover.labelTextes[1] = "Elemente";
		adremover.labelTextes[2] = "Grafiken";
		adremover.labelTextes[3] = "Objekte";
		adremover.labelTextes[4] = "Klick f&uuml;r Popup!";
		adremover.labelTextes[5] = "Popup schlie&szlig;en";
		adremover.labelTextes[6] = "Werbung teilweise wiederherstellen";
		adremover.labelTextes[7] = "Werbeblocker auf dieser Domain aktivieren";
		adremover.labelTextes[8] = "Allgemeine Einstellungen";
		adremover.labelTextes[9] = "Normale Elemente entfernen";
		adremover.labelTextes[10] = "Grafiken entfernen";
		adremover.labelTextes[11] = "Eingebundene Frames entfernen";
		adremover.labelTextes[12] = "Platzhalter entfernen";
		adremover.labelTextes[13] = "Werbung wiederhergestellt";
		adremover.labelTextes[14] = "Ein unbekannter Fehler trat in AdRemover "+adremover.thisScriptVersion+" auf.";
		adremover.labelTextes[15] = "AdRemover ist nun auf dieser Domain deaktiviert!";
		adremover.labelTextes[16] = "AdRemover ist nun auf dieser Domain wieder aktiviert!";
		adremover.labelTextes[17] = "Platzhalter";
		adremover.labelTextes[18] = "&Uuml;ber";
		adremover.labelTextes[19] = "Autor";
		adremover.labelTextes[20] = "Winzige Info";
	}
},
createInfoElement: function(removed_elements, removed_images, removed_objects) {
	document.getElementsByTagName("body")[0].appendChild(document.createElement("adremover"));
	var adrel = document.getElementsByTagName("adremover")[0];
	adrel.style.textAlign="left";
	adrel.style.lineHeight="12px";
	adrel.style.opacity="0.85";
	adrel.style.color="black";
	adrel.style.position="fixed";
	adrel.style.zIndex="9999999999999";
	adrel.style.fontSize="11px";
	adrel.style.top="0px";
	adrel.style.right="0px";
	adrel.style.background="rgba(238, 238, 238,0.9)";
	adrel.style.borderLeft="2px solid cyan";
	adrel.style.borderBottom="2px solid cyan";
	adrel.style.boxShadow="cyan -2px 2px 4px 1px";
	adrel.style.display="block";
	adrel.style.padding="4px";
	adrel.style.maxHeight="150px";
	adrel.style.maxWidth="150px";
	adrel.style.borderBottomLeftRadius="3px";
	adrel.style.transition="all 0.8s ease-out";
	adrel.style.fontFamily="Arial";
	adrel.style.cursor="pointer";
	adrel.addEventListener("click", function() {adremover.createPopup();});
	var allString = "<span style='font-family:Arial;font-weight:bold;font-size:15px;'>AdRemover "+adremover.thisScriptVersion+"</span><br>";
	allString+="<span style='font-family:Arial;font-weight:bold;'>"+adremover.labelTextes[0]+":</span> "+(adremover.removedElements+adremover.removedImages+adremover.removedObjects)+"<br>";
	if (adremover.removedElements>0) {
		allString+=adremover.labelTextes[1]+": "+adremover.removedElements+"<br>";
	}
	if (adremover.removedImages>0) {
		allString+=adremover.labelTextes[2]+": "+adremover.removedImages+"<br>";
	}
	if (adremover.removedObjects>0) {
		allString+=adremover.labelTextes[3]+": "+adremover.removedObjects+"<br>";
	}
	if (adremover.removedPlaceholders>0) {
		allString+=adremover.labelTextes[17]+": "+adremover.removedPlaceholders+"<br>";
	}
	if (adremover.removedSpecialPopups>0) {
		allString+="Special Popups: "+adremover.removedSpecialPopups+"<br>";
	}
	allString+="<span style='font-family:Arial;font-weight:bold;'>"+adremover.labelTextes[4]+"</span>";
	document.getElementsByTagName("adremover")[0].innerHTML=allString;
	setTimeout("adremover.hideInfoElement()", 6000);
},
createMiniInfoElement: function() {
	document.getElementsByTagName("body")[0].appendChild(document.createElement("adremover"));
	var adrel = document.getElementsByTagName("adremover")[0];
	adrel.style.textAlign="left";
	adrel.style.lineHeight="12px";
	adrel.style.opacity="0.85";
	adrel.style.color="black";
	adrel.style.position="fixed";
	adrel.style.zIndex="9999999999999";
	adrel.style.fontSize="11px";
	adrel.style.top="0px";
	adrel.style.right="0px";
	adrel.style.background="rgba(238, 238, 238,0.9)";
	adrel.style.borderLeft="2px solid cyan";
	adrel.style.borderBottom="2px solid cyan";
	adrel.style.boxShadow="cyan -2px 2px 4px 1px";
	adrel.style.display="block";
	adrel.style.padding="4px";
	adrel.style.maxHeight="150px";
	adrel.style.maxWidth="150px";
	adrel.style.borderBottomLeftRadius="3px";
	adrel.style.transition="all 0.8s ease-out";
	adrel.style.fontFamily="Arial";
	adrel.style.cursor="pointer";
	adrel.addEventListener("click", function() {adremover.createPopup();});
	var allString = "<span style='font-family:Arial;font-weight:normal;font-size:12px;'>AdRemover</span><br>";
	document.getElementsByTagName("adremover")[0].innerHTML=allString;
	setTimeout("adremover.hideInfoElement()", 6000);
},
hideInfoElement: function() {
	var adrel = document.getElementsByTagName("adremover")[0];
	adrel.style.opacity="0";
	setTimeout("adremover.hideInfoElement2()", 900);
},
hideInfoElement2: function() {
	var adrel = document.getElementsByTagName("adremover")[0];
	adrel.style.display="none";
	adrel.outerHTML="";
},
checkFirefox: function() {
	if (navigator.userAgent.toLowerCase().indexOf("firefox")>-1) {
		adremover.isfirefox = true;
	}
},
initAdremover: function() {
	adremover.getBrowserLanguage();
	console.log("Starting AdRemover "+adremover.thisScriptVersion+" on "+document.location+" ...");
	//Check for blacklistet Popup
	adremover.initBlacklistPopups();
	adremover.initPopupRegexp();
	if (document.location.toString().toLowerCase().search(adremover.regexp_popupsearch)>-1) {
		window.open('','_self');
        window.close();
	}
	//Start cleaning
	if (adremover.checkForBlacklist(document.location)==false) {
		adremover.getARSettings();
		adremover.initKeyWordList();
		adremover.initKeyURLList();
		adremover.initInPagePopups();
		adremover.initInPagePopupRegexp();
		adremover.initAdRegexp();
		adremover.initIframeRegexp();
		adremover.startCleaning();
	} else {
		adremover.getARSettings();
		adremover.createMiniInfoElement();
	}
},
secondRun: function() {
	console.log("Starting AdRemover "+adremover.thisScriptVersion+" on "+document.location+" 4 seconds after page load ...");
	//Check for blacklistet Popup
	if (document.location.toString().toLowerCase().search(adremover.regexp_popupsearch)>-1) {
		window.open('','_self');
        window.close();
	}
	//Start cleaning
	if (adremover.checkForBlacklist(document.location)==false) {
		adremover.startCleaning();
	}
},
checkForBlacklist: function() {
	if (localStorage.getItem("AR_userblacklist")!=undefined && localStorage.getItem("AR_userblacklist")!=null) {
		if (localStorage.getItem("AR_userblacklist").indexOf(document.location.host)>=0) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
},
changeBlacklist: function(formelement) {
	if (formelement.checked==false) {
		localStorage.setItem("AR_userblacklist",localStorage.getItem("AR_userblacklist")+";"+document.location.host);
		alert(adremover.labelTextes[15]);
	} else if (formelement.checked==true) {
		var firstChar = localStorage.getItem("AR_userblacklist").indexOf(document.location.host);
		localStorage.setItem("AR_userblacklist",localStorage.getItem("AR_userblacklist").substring(0,firstChar-1)+localStorage.getItem("AR_userblacklist").substring(firstChar+document.location.host.length));
		alert(adremover.labelTextes[16]);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
initKeyWordList: function() {
	adremover.keyWordList.push("afc");
	adremover.keyWordList.push("brandbox");
	adremover.keyWordList.push("watch-channel-brand-div");
	adremover.keyWordList.push("ad");
	adremover.keyWordList.push("rwidesky");
	adremover.keyWordList.push("tvcap");
	adremover.keyWordList.push("werbung");
	adremover.keyWordList.push("billboardcontainer");
	adremover.keyWordList.push("medrec");
	adremover.keyWordList.push("aswift_");
	adremover.keyWordList.push("eyecatcher");
	adremover.keyWordList.push("sponsored");
	adremover.keyWordList.push("sky");
	adremover.keyWordList.push("commercial");
	adremover.keyWordList.push("superlayer");
	adremover.keyWordList.push("sidebanner");
	adremover.keyWordList.push("pyv-watch-related-dest-url");
	adremover.keyWordList.push("masthead");
	adremover.keyWordList.push("aswift");
	adremover.keyWordList.push("adsense");
	adremover.keyWordList.push("bannerzone");
},
initKeyURLList: function() {
	adremover.keyURLList.push("atdmt.com/MRT");
	adremover.keyURLList.push("cdn.movad.net/");
	adremover.keyURLList.push("redintelligence.net/request");
	adremover.keyURLList.push("ads.adtiger.de/ad");
	adremover.keyURLList.push("ads.newtentionassets.net/asset");
	adremover.keyURLList.push("hosting.adjug.com/AdJug");
	adremover.keyURLList.push("adclient.uimserv.net/html.ng");
	adremover.keyURLList.push("creativeproxy.uimserv.net/?LogoutAdProxy");
	adremover.keyURLList.push("a.ligatus.com/");
	adremover.keyURLList.push("2mdn.net/");
	adremover.keyURLList.push("track.adform.net/ad");
	adremover.keyURLList.push("hosting.adjug.com/Ad");
	adremover.keyURLList.push("ad4mat.de/ads");
	adremover.keyURLList.push("zanox-affiliate.de/ppc");
	adremover.keyURLList.push("ads.bluelithium.com/iframe");
	adremover.keyURLList.push("pagead2.googlesyndication.com/simgad");
	adremover.keyURLList.push("ads.tlvmedia.com/st?ad");
	adremover.keyURLList.push("ad.xtendmedia.com/st?ad");
	adremover.keyURLList.push("zanox-affiliate.de/ppc");
	adremover.keyURLList.push("content.yieldmanager.edgesuite.net/atoms");
	adremover.keyURLList.push("network.adsmarket.com/ceas");
	adremover.keyURLList.push(".ib.adnxs.com/if?");
	adremover.keyURLList.push("adserver.freenet.de/Ads");
	adremover.keyURLList.push("i.ligatus.com/com_ms");
	adremover.keyURLList.push("ds.serving-sys.com/burstingRes");
	adremover.keyURLList.push("tags.qservz.com/ct_adi");
	adremover.keyURLList.push("image.adjug.com/Advertiser");
	adremover.keyURLList.push("tags.qservz.com/ct_adi");
	adremover.keyURLList.push("g.doubleclick.net/pagead");
	adremover.keyURLList.push("doubleclick.net/");
	adremover.keyURLList.push("content-result-ads");
	adremover.keyURLList.push("ads.newtention.net/ads");
	adremover.keyURLList.push("uk-ads.openx.net");
	adremover.keyURLList.push("tag.admeld.com/imp/iframe");
	adremover.keyURLList.push("ad.ad-srv.net/request_content.php");
	adremover.keyURLList.push("ads.yahoo.com/i");
	adremover.keyURLList.push("coinurl.com/get.php?id=");
	adremover.keyURLList.push("ad.a-ads.com/");
	adremover.keyURLList.push("cpalead.com/banner.php?");
	adremover.keyURLList.push("ads.trafficjunky.net/ads");
	adremover.keyURLList.push("2mdn.net/ads");
	adremover.keyURLList.push("adx.chip.de/www");
	adremover.keyURLList.push("ad.ad-srv.net/request_content.php");
	adremover.keyURLList.push("img.propellerads.com/www/images");
	adremover.keyURLList.push("ad.propellerads.com/a");
	adremover.keyURLList.push("101com.com");
adremover.keyURLList.push("10order.com");
adremover.keyURLList.push("123found.com");
adremover.keyURLList.push("180hits.de");
adremover.keyURLList.push("180searchassistant.com");
adremover.keyURLList.push("1xrank.com");
adremover.keyURLList.push("207.net");
adremover.keyURLList.push("247media.com");
adremover.keyURLList.push("24log.com");
adremover.keyURLList.push("24log.de");
adremover.keyURLList.push("24pm-affiliation.com");
adremover.keyURLList.push("2mdn.net");
adremover.keyURLList.push("2o7.net");
adremover.keyURLList.push("360yield.com");
adremover.keyURLList.push("4affiliate.net");
adremover.keyURLList.push("4d5.net");
adremover.keyURLList.push("50websads.com");
adremover.keyURLList.push("58ad.com");
adremover.keyURLList.push("5yes.com");
adremover.keyURLList.push("600z.com");
adremover.keyURLList.push("777partner.com");
adremover.keyURLList.push("77tracking.com");
adremover.keyURLList.push("7bpeople.com");
adremover.keyURLList.push("7search.com");
adremover.keyURLList.push("99count.com");
adremover.keyURLList.push("a-ads.com");
adremover.keyURLList.push("a-counter.kiev.ua");
adremover.keyURLList.push("a.0day.kiev.ua");
adremover.keyURLList.push("a.aproductmsg.com");
adremover.keyURLList.push("a.collective-media.net");
adremover.keyURLList.push("a.consumer.net");
adremover.keyURLList.push("a.mktw.net");
adremover.keyURLList.push("a.sakh.com");
adremover.keyURLList.push("a.ucoz.net");
adremover.keyURLList.push("a.ucoz.ru");
adremover.keyURLList.push("a.xanga.com");
adremover.keyURLList.push("a32.g.a.yimg.com");
adremover.keyURLList.push("aaddzz.com");
adremover.keyURLList.push("abacho.net");
adremover.keyURLList.push("abc-ads.com");
adremover.keyURLList.push("absoluteclickscom.com");
adremover.keyURLList.push("abz.com");
adremover.keyURLList.push("ac.rnm.ca");
adremover.keyURLList.push("accounts.pkr.com.invalid");
adremover.keyURLList.push("acsseo.com");
adremover.keyURLList.push("actionsplash.com");
adremover.keyURLList.push("actualdeals.com");
adremover.keyURLList.push("acuityads.com");
adremover.keyURLList.push("ad-balancer.at");
adremover.keyURLList.push("ad-balancer.net");
adremover.keyURLList.push("ad-center.com");
adremover.keyURLList.push("ad-images.suntimes.com");
adremover.keyURLList.push("ad-pay.de");
adremover.keyURLList.push("ad-rotator.com");
adremover.keyURLList.push("ad-server.gulasidorna.se");
adremover.keyURLList.push("ad-serverparc.nl");
adremover.keyURLList.push("ad-souk.com");
adremover.keyURLList.push("ad-space.net");
adremover.keyURLList.push("ad-tech.com");
adremover.keyURLList.push("ad-up.com");
adremover.keyURLList.push("ad.00.tbn.ru");
adremover.keyURLList.push("ad.7i.de");
adremover.keyURLList.push("ad.980x.com");
adremover.keyURLList.push("ad.a8.net");
adremover.keyURLList.push("ad.abcnews.com");
adremover.keyURLList.push("ad.abctv.com");
adremover.keyURLList.push("ad.about.com");
adremover.keyURLList.push("ad.aboutwebservices.com");
adremover.keyURLList.push("ad.abum.com");
adremover.keyURLList.push("ad.afy.net");
adremover.keyURLList.push("ad.allstar.cz");
adremover.keyURLList.push("ad.altervista.org");
adremover.keyURLList.push("ad.amgdgt.com");
adremover.keyURLList.push("ad.anuntis.com");
adremover.keyURLList.push("ad.auditude.com");
adremover.keyURLList.push("ad.bizo.com");
adremover.keyURLList.push("ad.bnmla.com");
adremover.keyURLList.push("ad.bondage.com");
adremover.keyURLList.push("ad.caradisiac.com");
adremover.keyURLList.push("ad.centrum.cz");
adremover.keyURLList.push("ad.cgi.cz");
adremover.keyURLList.push("ad.choiceradio.com");
adremover.keyURLList.push("ad.clix.pt");
adremover.keyURLList.push("ad.cooks.com");
adremover.keyURLList.push("ad.crwdcntrl.net");
adremover.keyURLList.push("ad.digitallook.com");
adremover.keyURLList.push("ad.directrev.com");
adremover.keyURLList.push("ad.doctissimo.fr");
adremover.keyURLList.push("ad.domainfactory.de");
adremover.keyURLList.push("ad.e-kolay.net");
adremover.keyURLList.push("ad.eurosport.com");
adremover.keyURLList.push("ad.fcd.ru");
adremover.keyURLList.push("ad.flurry.com");
adremover.keyURLList.push("ad.foxnetworks.com");
adremover.keyURLList.push("ad.freecity.de");
adremover.keyURLList.push("ad.gate24.ch");
adremover.keyURLList.push("ad.globe7.com");
adremover.keyURLList.push("ad.grafika.cz");
adremover.keyURLList.push("ad.hbv.de");
adremover.keyURLList.push("ad.hodomobile.com");
adremover.keyURLList.push("ad.httpool.com");
adremover.keyURLList.push("ad.hyena.cz");
adremover.keyURLList.push("ad.iinfo.cz");
adremover.keyURLList.push("ad.ilove.ch");
adremover.keyURLList.push("ad.infoseek.com");
adremover.keyURLList.push("ad.jamba.net");
adremover.keyURLList.push("ad.jamster.co.uk");
adremover.keyURLList.push("ad.jetsoftware.com");
adremover.keyURLList.push("ad.keenspace.com");
adremover.keyURLList.push("ad.leadbolt.net");
adremover.keyURLList.push("ad.liveinternet.ru");
adremover.keyURLList.push("ad.lupa.cz");
adremover.keyURLList.push("ad.m5prod.net");
adremover.keyURLList.push("ad.media-servers.net");
adremover.keyURLList.push("ad.mediastorm.hu");
adremover.keyURLList.push("ad.mgd.de");
adremover.keyURLList.push("ad.musicmatch.com");
adremover.keyURLList.push("ad.nachtagenten.de");
adremover.keyURLList.push("ad.nozonedata.com");
adremover.keyURLList.push("ad.nttnavi.co.jp");
adremover.keyURLList.push("ad.nwt.cz");
adremover.keyURLList.push("ad.onad.eu");
adremover.keyURLList.push("ad.pandora.tv");
adremover.keyURLList.push("ad.preferances.com");
adremover.keyURLList.push("ad.profiwin.de");
adremover.keyURLList.push("ad.prv.pl");
adremover.keyURLList.push("ad.rambler.ru");
adremover.keyURLList.push("ad.reunion.com");
adremover.keyURLList.push("ad.scanmedios.com");
adremover.keyURLList.push("ad.sensismediasmart.com.au");
adremover.keyURLList.push("ad.seznam.cz");
adremover.keyURLList.push("ad.simgames.net");
adremover.keyURLList.push("ad.slutload.com");
adremover.keyURLList.push("ad.smartclip.net");
adremover.keyURLList.push("ad.tbn.ru");
adremover.keyURLList.push("ad.technoratimedia.com");
adremover.keyURLList.push("ad.thewheelof.com");
adremover.keyURLList.push("ad.turn.com");
adremover.keyURLList.push("ad.tv2.no");
adremover.keyURLList.push("ad.twitchguru.com");
adremover.keyURLList.push("ad.usatoday.com");
adremover.keyURLList.push("ad.virtual-nights.com");
adremover.keyURLList.push("ad.watch.impress.co.jp");
adremover.keyURLList.push("ad.wavu.hu");
adremover.keyURLList.push("ad.way.cz");
adremover.keyURLList.push("ad.weatherbug.com");
adremover.keyURLList.push("ad.wsod.com");
adremover.keyURLList.push("ad.wz.cz");
adremover.keyURLList.push("ad.yadro.ru");
adremover.keyURLList.push("ad.yourmedia.com");
adremover.keyURLList.push("ad.zanox.com");
adremover.keyURLList.push("ad0.bigmir.net");
adremover.keyURLList.push("ad0.mediacorpsingapore.com");
adremover.keyURLList.push("ad.emediate.dk");
adremover.keyURLList.push("ad.emule-project.org");
adremover.keyURLList.push("ad.kde.cz");
adremover.keyURLList.push("ad.pamedia.com.au");
adremover.keyURLList.push("ad2.iinfo.cz");
adremover.keyURLList.push("ad2.ip.ro");
adremover.keyURLList.push("ad2.linxcz.cz");
adremover.keyURLList.push("ad2.lupa.cz");
adremover.keyURLList.push("ad2flash.com");
adremover.keyURLList.push("ad2games.com");
adremover.keyURLList.push("ad3.iinfo.cz");
adremover.keyURLList.push("ad3.pamedia.com.au");
adremover.keyURLList.push("ad4game.com");
adremover.keyURLList.push("adaction.de");
adremover.keyURLList.push("adadvisor.net");
adremover.keyURLList.push("adap.tv");
adremover.keyURLList.push("adapt.tv");
adremover.keyURLList.push("adbanner.ro");
adremover.keyURLList.push("adbard.net");
adremover.keyURLList.push("adblade.com");
adremover.keyURLList.push("adblockanalytics.com");
adremover.keyURLList.push("adboost.de.vu");
adremover.keyURLList.push("adboost.net");
adremover.keyURLList.push("adbooth.net");
adremover.keyURLList.push("adbot.com");
adremover.keyURLList.push("adbrite.com");
adremover.keyURLList.push("adbroker.de");
adremover.keyURLList.push("adbunker.com");
adremover.keyURLList.push("adbutler.com");
adremover.keyURLList.push("adbutler.de");
adremover.keyURLList.push("adbuyer.com");
adremover.keyURLList.push("adbuyer3.lycos.com");
adremover.keyURLList.push("adcash.com");
adremover.keyURLList.push("adcast.deviantart.com");
adremover.keyURLList.push("adcell.de");
adremover.keyURLList.push("adcenter.mdf.se");
adremover.keyURLList.push("adcenter.net");
adremover.keyURLList.push("adcentriconline.com");
adremover.keyURLList.push("adcept.net");
adremover.keyURLList.push("adclick.com");
adremover.keyURLList.push("adclient.uimserv.net");
adremover.keyURLList.push("adclient.tucows.com");
adremover.keyURLList.push("adcloud.net");
adremover.keyURLList.push("adcomplete.com");
adremover.keyURLList.push("adconion.com");
adremover.keyURLList.push("adcontent.gamespy.com");
adremover.keyURLList.push("adcycle.com");
adremover.keyURLList.push("add.newmedia.cz");
adremover.keyURLList.push("addealing.com");
adremover.keyURLList.push("addesktop.com");
adremover.keyURLList.push("addfreestats.com");
adremover.keyURLList.push("addme.com");
adremover.keyURLList.push("adecn.com");
adremover.keyURLList.push("ademails.com");
adremover.keyURLList.push("adengage.com");
adremover.keyURLList.push("adexpose.com");
adremover.keyURLList.push("adext.inkclub.com");
adremover.keyURLList.push("adf.ly");
adremover.keyURLList.push("adfactor.nl");
adremover.keyURLList.push("adfarm.mediaplex.com");
adremover.keyURLList.push("adflight.com");
adremover.keyURLList.push("adforce.com");
adremover.keyURLList.push("adform.com");
adremover.keyURLList.push("adgardener.com");
adremover.keyURLList.push("adgoto.com");
adremover.keyURLList.push("adgridwork.com");
adremover.keyURLList.push("adhese.be");
adremover.keyURLList.push("adhese.com");
adremover.keyURLList.push("adi.mainichi.co.jp");
adremover.keyURLList.push("adimage.asiaone.com.sg");
adremover.keyURLList.push("adimage.guardian.co.uk");
adremover.keyURLList.push("adimages.been.com");
adremover.keyURLList.push("adimages.carsoup.com");
adremover.keyURLList.push("adimages.go.com");
adremover.keyURLList.push("adimages.homestore.com");
adremover.keyURLList.push("adimages.omroepzeeland.nl");
adremover.keyURLList.push("adimages.sanomawsoy.fi");
adremover.keyURLList.push("adimg.cnet.com");
adremover.keyURLList.push("adimg.com.com");
adremover.keyURLList.push("adimg.uimserv.net");
adremover.keyURLList.push("adimg.chosun.com");
adremover.keyURLList.push("adimgs.sapo.pt");
adremover.keyURLList.push("adimpact.com");
adremover.keyURLList.push("adinjector.net");
adremover.keyURLList.push("adinterax.com");
adremover.keyURLList.push("adisfy.com");
adremover.keyURLList.push("adition.com");
adremover.keyURLList.push("adition.de");
adremover.keyURLList.push("adition.net");
adremover.keyURLList.push("adizio.com");
adremover.keyURLList.push("adjix.com");
adremover.keyURLList.push("adjug.com");
adremover.keyURLList.push("adjuggler.com");
adremover.keyURLList.push("adjuggler.yourdictionary.com");
adremover.keyURLList.push("adjustnetwork.com");
adremover.keyURLList.push("adk2.com");
adremover.keyURLList.push("adk2ads.tictacti.com");
adremover.keyURLList.push("adland.ru");
adremover.keyURLList.push("adlantic.nl");
adremover.keyURLList.push("adledge.com");
adremover.keyURLList.push("adlegend.com");
adremover.keyURLList.push("adlog.com.com");
adremover.keyURLList.push("adloox.com");
adremover.keyURLList.push("adlooxtracking.com");
adremover.keyURLList.push("adlure.net");
adremover.keyURLList.push("admagnet.net");
adremover.keyURLList.push("admailtiser.com");
adremover.keyURLList.push("adman.gr");
adremover.keyURLList.push("adman.in.gr");
adremover.keyURLList.push("adman.otenet.gr");
adremover.keyURLList.push("admanagement.ch");
adremover.keyURLList.push("admanager.btopenworld.com");
adremover.keyURLList.push("admanager.carsoup.com");
adremover.keyURLList.push("admarketplace.net");
adremover.keyURLList.push("admarvel.com");
adremover.keyURLList.push("admax.nexage.com");
adremover.keyURLList.push("admedia.com");
adremover.keyURLList.push("admedia.ro");
adremover.keyURLList.push("admeld.com");
adremover.keyURLList.push("admerize.be");
adremover.keyURLList.push("admeta.com");
adremover.keyURLList.push("admex.com");
adremover.keyURLList.push("adminder.com");
adremover.keyURLList.push("adminshop.com");
adremover.keyURLList.push("admized.com");
adremover.keyURLList.push("admob.com");
adremover.keyURLList.push("admonitor.com");
adremover.keyURLList.push("admotion.com.ar");
adremover.keyURLList.push("adnet-media.net");
adremover.keyURLList.push("adnet.asahi.com");
adremover.keyURLList.push("adnet.biz");
adremover.keyURLList.push("adnet.de");
adremover.keyURLList.push("adnet.ru");
adremover.keyURLList.push("adnet.worldreviewer.com");
adremover.keyURLList.push("adnetinteractive.com");
adremover.keyURLList.push("adnetwork.net");
adremover.keyURLList.push("adnetworkperformance.com");
adremover.keyURLList.push("adnews.maddog2000.de");
adremover.keyURLList.push("adnotch.com");
adremover.keyURLList.push("adnxs.com");
adremover.keyURLList.push("adocean.pl");
adremover.keyURLList.push("adonspot.com");
adremover.keyURLList.push("adoperator.com");
adremover.keyURLList.push("adorigin.com");
adremover.keyURLList.push("adpepper.dk");
adremover.keyURLList.push("adpepper.nl");
adremover.keyURLList.push("adperium.com");
adremover.keyURLList.push("adpia.vn");
adremover.keyURLList.push("adplus.co.id");
adremover.keyURLList.push("adplxmd.com");
adremover.keyURLList.push("adprofile.net");
adremover.keyURLList.push("adprojekt.pl");
adremover.keyURLList.push("adq.nextag.com");
adremover.keyURLList.push("adrazzi.com");
adremover.keyURLList.push("adreactor.com");
adremover.keyURLList.push("adrecreate.com");
adremover.keyURLList.push("adremedy.com");
adremover.keyURLList.push("adreporting.com");
adremover.keyURLList.push("adres.internet.com");
adremover.keyURLList.push("adrevolver.com");
adremover.keyURLList.push("adriver.ru");
adremover.keyURLList.push("adrolays.de");
adremover.keyURLList.push("adrotate.de");
adremover.keyURLList.push("adrotator.se");
adremover.keyURLList.push("ads-click.com");
adremover.keyURLList.push("ads.4tube.com");
adremover.keyURLList.push("ads.5ci.lt");
adremover.keyURLList.push("ads.abovetopsecret.com");
adremover.keyURLList.push("ads.aceweb.net");
adremover.keyURLList.push("ads.activestate.com");
adremover.keyURLList.push("ads.adfox.ru");
adremover.keyURLList.push("ads.administrator.de");
adremover.keyURLList.push("ads.adshareware.net");
adremover.keyURLList.push("ads.adultfriendfinder.com");
adremover.keyURLList.push("ads.adultswim.com");
adremover.keyURLList.push("ads.advance.net");
adremover.keyURLList.push("ads.adverline.com");
adremover.keyURLList.push("ads.affiliates.match.com");
adremover.keyURLList.push("ads.ak.facebook.com.edgesuite.net");
adremover.keyURLList.push("ads.allvatar.com");
adremover.keyURLList.push("ads.alt.com");
adremover.keyURLList.push("ads.amdmb.com");
adremover.keyURLList.push("ads.amigos.com");
adremover.keyURLList.push("ads.aol.co.uk");
adremover.keyURLList.push("ads.aol.com");
adremover.keyURLList.push("ads.apn.co.nz");
adremover.keyURLList.push("ads.appsgeyser.com");
adremover.keyURLList.push("ads.as4x.tmcs.net");
adremover.keyURLList.push("ads.as4x.tmcs.ticketmaster.com");
adremover.keyURLList.push("ads.asia.com.sg");
adremover.keyURLList.push("ads.asiafriendfinder.com");
adremover.keyURLList.push("ads.ask.com");
adremover.keyURLList.push("ads.aspalliance.com");
adremover.keyURLList.push("ads.avazu.net");
adremover.keyURLList.push("ads.batpmturner.com");
adremover.keyURLList.push("ads.beenetworks.net");
adremover.keyURLList.push("ads.belointeractive.com");
adremover.keyURLList.push("ads.berlinonline.de");
adremover.keyURLList.push("ads.betanews.com");
adremover.keyURLList.push("ads.betfair.com");
adremover.keyURLList.push("ads.betfair.com.au");
adremover.keyURLList.push("ads.bigchurch.com");
adremover.keyURLList.push("ads.bigfoot.com");
adremover.keyURLList.push("ads.billiton.de");
adremover.keyURLList.push("ads.bing.com");
adremover.keyURLList.push("ads.bittorrent.com");
adremover.keyURLList.push("ads.blog.com");
adremover.keyURLList.push("ads.bloomberg.com");
adremover.keyURLList.push("ads.bluelithium.com");
adremover.keyURLList.push("ads.bluemountain.com");
adremover.keyURLList.push("ads.bluesq.com");
adremover.keyURLList.push("ads.bonniercorp.com");
adremover.keyURLList.push("ads.boylesports.com");
adremover.keyURLList.push("ads.brabys.com");
adremover.keyURLList.push("ads.brain.pk");
adremover.keyURLList.push("ads.brazzers.com");
adremover.keyURLList.push("ads.bumq.com");
adremover.keyURLList.push("ads.businessweek.com");
adremover.keyURLList.push("ads.canalblog.com");
adremover.keyURLList.push("ads.canoe.ca");
adremover.keyURLList.push("ads.casinocity.com");
adremover.keyURLList.push("ads.cbc.ca");
adremover.keyURLList.push("ads.cc");
adremover.keyURLList.push("ads.cc-dt.com");
adremover.keyURLList.push("ads.centraliprom.com");
adremover.keyURLList.push("ads.cgnetworks.com");
adremover.keyURLList.push("ads.channel4.com");
adremover.keyURLList.push("ads.cimedia.com");
adremover.keyURLList.push("ads.clearchannel.com");
adremover.keyURLList.push("ads.co.com");
adremover.keyURLList.push("ads.com.com");
adremover.keyURLList.push("ads.contactmusic.com");
adremover.keyURLList.push("ads.contentabc.com");
adremover.keyURLList.push("ads.contextweb.com");
adremover.keyURLList.push("ads.crakmedia.com");
adremover.keyURLList.push("ads.creative-serving.com");
adremover.keyURLList.push("ads.creativematch.com");
adremover.keyURLList.push("ads.cricbuzz.com");
adremover.keyURLList.push("ads.cybersales.cz");
adremover.keyURLList.push("ads.dada.it");
adremover.keyURLList.push("ads.datinggold.com");
adremover.keyURLList.push("ads.datingyes.com");
adremover.keyURLList.push("ads.dazoot.ro");
adremover.keyURLList.push("ads.deltha.hu");
adremover.keyURLList.push("ads.dennisnet.co.uk");
adremover.keyURLList.push("ads.desmoinesregister.com");
adremover.keyURLList.push("ads.detelefoongids.nl");
adremover.keyURLList.push("ads.deviantart.com");
adremover.keyURLList.push("ads.digital-digest.com");
adremover.keyURLList.push("ads.digitalmedianet.com");
adremover.keyURLList.push("ads.digitalpoint.com");
adremover.keyURLList.push("ads.directionsmag.com");
adremover.keyURLList.push("ads.domeus.com");
adremover.keyURLList.push("ads.eagletribune.com");
adremover.keyURLList.push("ads.easy-forex.com");
adremover.keyURLList.push("ads.eatinparis.com");
adremover.keyURLList.push("ads.economist.com");
adremover.keyURLList.push("ads.edbindex.dk");
adremover.keyURLList.push("ads.egrana.com.br");
adremover.keyURLList.push("ads.einmedia.com");
adremover.keyURLList.push("ads.electrocelt.com");
adremover.keyURLList.push("ads.elitetrader.com");
adremover.keyURLList.push("ads.emirates.net.ae");
adremover.keyURLList.push("ads.epltalk.com");
adremover.keyURLList.push("ads.esmas.com");
adremover.keyURLList.push("ads.eu.msn.com");
adremover.keyURLList.push("ads.exactdrive.com");
adremover.keyURLList.push("ads.expat-blog.biz");
adremover.keyURLList.push("ads.expedia.com");
adremover.keyURLList.push("ads.ezboard.com");
adremover.keyURLList.push("ads.factorymedia.com");
adremover.keyURLList.push("ads.fairfax.com.au");
adremover.keyURLList.push("ads.faxo.com");
adremover.keyURLList.push("ads.ferianc.com");
adremover.keyURLList.push("ads.filmup.com");
adremover.keyURLList.push("ads.financialcontent.com");
adremover.keyURLList.push("ads.flooble.com");
adremover.keyURLList.push("ads.fool.com");
adremover.keyURLList.push("ads.footymad.net");
adremover.keyURLList.push("ads.forbes.com");
adremover.keyURLList.push("ads.forbes.net");
adremover.keyURLList.push("ads.forium.de");
adremover.keyURLList.push("ads.fortunecity.com");
adremover.keyURLList.push("ads.fotosidan.se");
adremover.keyURLList.push("ads.foxkidseurope.net");
adremover.keyURLList.push("ads.foxnetworks.com");
adremover.keyURLList.push("ads.foxnews.com");
adremover.keyURLList.push("ads.freecity.de");
adremover.keyURLList.push("ads.friendfinder.com");
adremover.keyURLList.push("ads.ft.com");
adremover.keyURLList.push("ads.futurenet.com");
adremover.keyURLList.push("ads.gamecity.net");
adremover.keyURLList.push("ads.gameforgeads.de");
adremover.keyURLList.push("ads.gamershell.com");
adremover.keyURLList.push("ads.gamespyid.com");
adremover.keyURLList.push("ads.gamigo.de");
adremover.keyURLList.push("ads.gaming-universe.de");
adremover.keyURLList.push("ads.gawker.com");
adremover.keyURLList.push("ads.geekswithblogs.net");
adremover.keyURLList.push("ads.glispa.com");
adremover.keyURLList.push("ads.globeandmail.com");
adremover.keyURLList.push("ads.gmodules.com");
adremover.keyURLList.push("ads.godlikeproductions.com");
adremover.keyURLList.push("ads.goyk.com");
adremover.keyURLList.push("ads.gplusmedia.com");
adremover.keyURLList.push("ads.gradfinder.com");
adremover.keyURLList.push("ads.grindinggears.com");
adremover.keyURLList.push("ads.groundspeak.com");
adremover.keyURLList.push("ads.gsm-exchange.com");
adremover.keyURLList.push("ads.gsmexchange.com");
adremover.keyURLList.push("ads.guardian.co.uk");
adremover.keyURLList.push("ads.guardianunlimited.co.uk");
adremover.keyURLList.push("ads.guru3d.com");
adremover.keyURLList.push("ads.hardwaresecrets.com");
adremover.keyURLList.push("ads.harpers.org");
adremover.keyURLList.push("ads.hbv.de");
adremover.keyURLList.push("ads.hearstmags.com");
adremover.keyURLList.push("ads.heartlight.org");
adremover.keyURLList.push("ads.heias.com");
adremover.keyURLList.push("ads.hideyourarms.com");
adremover.keyURLList.push("ads.hollywood.com");
adremover.keyURLList.push("ads.horsehero.com");
adremover.keyURLList.push("ads.horyzon-media.com");
adremover.keyURLList.push("ads.iafrica.com");
adremover.keyURLList.push("ads.ibest.com.br");
adremover.keyURLList.push("ads.ibryte.com");
adremover.keyURLList.push("ads.icq.com");
adremover.keyURLList.push("ads.ign.com");
adremover.keyURLList.push("ads.img.co.za");
adremover.keyURLList.push("ads.imgur.com");
adremover.keyURLList.push("ads.indiatimes.com");
adremover.keyURLList.push("ads.infi.net");
adremover.keyURLList.push("ads.internic.co.il");
adremover.keyURLList.push("ads.ipowerweb.com");
adremover.keyURLList.push("ads.isoftmarketing.com");
adremover.keyURLList.push("ads.itv.com");
adremover.keyURLList.push("ads.iwon.com");
adremover.keyURLList.push("ads.jewishfriendfinder.com");
adremover.keyURLList.push("ads.jiwire.com");
adremover.keyURLList.push("ads.jobsite.co.uk");
adremover.keyURLList.push("ads.jpost.com");
adremover.keyURLList.push("ads.jubii.dk");
adremover.keyURLList.push("ads.justhungry.com");
adremover.keyURLList.push("ads.kaktuz.net");
adremover.keyURLList.push("ads.kelbymediagroup.com");
adremover.keyURLList.push("ads.kinobox.cz");
adremover.keyURLList.push("ads.kinxxx.com");
adremover.keyURLList.push("ads.kompass.com");
adremover.keyURLList.push("ads.krawall.de");
adremover.keyURLList.push("ads.lesbianpersonals.com");
adremover.keyURLList.push("ads.linuxfoundation.org");
adremover.keyURLList.push("ads.linuxjournal.com");
adremover.keyURLList.push("ads.linuxsecurity.com");
adremover.keyURLList.push("ads.livenation.com");
adremover.keyURLList.push("ads.mariuana.it");
adremover.keyURLList.push("ads.massinfra.nl");
adremover.keyURLList.push("ads.mcafee.com");
adremover.keyURLList.push("ads.mediaodyssey.com");
adremover.keyURLList.push("ads.mediaturf.net");
adremover.keyURLList.push("ads.medienhaus.de");
adremover.keyURLList.push("ads.mgnetwork.com");
adremover.keyURLList.push("ads.mmania.com");
adremover.keyURLList.push("ads.moceanads.com");
adremover.keyURLList.push("ads.motor-forum.nl");
adremover.keyURLList.push("ads.motormedia.nl");
adremover.keyURLList.push("ads.msn.com");
adremover.keyURLList.push("ads.multimania.lycos.fr");
adremover.keyURLList.push("ads.nationalgeographic.com");
adremover.keyURLList.push("ads.ncm.com");
adremover.keyURLList.push("ads.netclusive.de");
adremover.keyURLList.push("ads.netmechanic.com");
adremover.keyURLList.push("ads.networksolutions.com");
adremover.keyURLList.push("ads.newdream.net");
adremover.keyURLList.push("ads.newgrounds.com");
adremover.keyURLList.push("ads.newmedia.cz");
adremover.keyURLList.push("ads.newsint.co.uk");
adremover.keyURLList.push("ads.newsquest.co.uk");
adremover.keyURLList.push("ads.ninemsn.com.au");
adremover.keyURLList.push("ads.nj.com");
adremover.keyURLList.push("ads.nola.com");
adremover.keyURLList.push("ads.nordichardware.com");
adremover.keyURLList.push("ads.nordichardware.se");
adremover.keyURLList.push("ads.nwsource.com");
adremover.keyURLList.push("ads.nyi.net");
adremover.keyURLList.push("ads.nytimes.com");
adremover.keyURLList.push("ads.nyx.cz");
adremover.keyURLList.push("ads.nzcity.co.nz");
adremover.keyURLList.push("ads.o2.pl");
adremover.keyURLList.push("ads.oddschecker.com");
adremover.keyURLList.push("ads.okcimg.com");
adremover.keyURLList.push("ads.ole.com");
adremover.keyURLList.push("ads.olivebrandresponse.com");
adremover.keyURLList.push("ads.oneplace.com");
adremover.keyURLList.push("ads.ookla.com");
adremover.keyURLList.push("ads.optusnet.com.au");
adremover.keyURLList.push("ads.outpersonals.com");
adremover.keyURLList.push("ads.passion.com");
adremover.keyURLList.push("ads.pennet.com");
adremover.keyURLList.push("ads.penny-arcade.com");
adremover.keyURLList.push("ads.pheedo.com");
adremover.keyURLList.push("ads.phpclasses.org");
adremover.keyURLList.push("ads.pickmeup-ltd.com");
adremover.keyURLList.push("ads.pkr.com");
adremover.keyURLList.push("ads.planet.nl");
adremover.keyURLList.push("ads.pni.com");
adremover.keyURLList.push("ads.pof.com");
adremover.keyURLList.push("ads.powweb.com");
adremover.keyURLList.push("ads.primissima.it");
adremover.keyURLList.push("ads.printscr.com");
adremover.keyURLList.push("ads.prisacom.com");
adremover.keyURLList.push("ads.program3.com");
adremover.keyURLList.push("ads.psd2html.com");
adremover.keyURLList.push("ads.pushplay.com");
adremover.keyURLList.push("ads.quoka.de");
adremover.keyURLList.push("ads.rcs.it");
adremover.keyURLList.push("ads.recoletos.es");
adremover.keyURLList.push("ads.rediff.com");
adremover.keyURLList.push("ads.redlightcenter.com");
adremover.keyURLList.push("ads.redtube.com");
adremover.keyURLList.push("ads.resoom.de");
adremover.keyURLList.push("ads.returnpath.net");
adremover.keyURLList.push("ads.rpgdot.com");
adremover.keyURLList.push("ads.s3.sitepoint.com");
adremover.keyURLList.push("ads.satyamonline.com");
adremover.keyURLList.push("ads.savannahnow.com");
adremover.keyURLList.push("ads.saymedia.com");
adremover.keyURLList.push("ads.scifi.com");
adremover.keyURLList.push("ads.seniorfriendfinder.com");
adremover.keyURLList.push("ads.sexinyourcity.com");
adremover.keyURLList.push("ads.shizmoo.com");
adremover.keyURLList.push("ads.shopstyle.com");
adremover.keyURLList.push("ads.sift.co.uk");
adremover.keyURLList.push("ads.silverdisc.co.uk");
adremover.keyURLList.push("ads.slim.com");
adremover.keyURLList.push("ads.smartclick.com");
adremover.keyURLList.push("ads.soft32.com");
adremover.keyURLList.push("ads.space.com");
adremover.keyURLList.push("ads.sptimes.com");
adremover.keyURLList.push("ads.stackoverflow.com");
adremover.keyURLList.push("ads.stationplay.com");
adremover.keyURLList.push("ads.sun.com");
adremover.keyURLList.push("ads.supplyframe.com");
adremover.keyURLList.push("ads.t-online.de");
adremover.keyURLList.push("ads.tahono.com");
adremover.keyURLList.push("ads.techtv.com");
adremover.keyURLList.push("ads.techweb.com");
adremover.keyURLList.push("ads.telegraph.co.uk");
adremover.keyURLList.push("ads.theglobeandmail.com");
adremover.keyURLList.push("ads.themovienation.com");
adremover.keyURLList.push("ads.thestar.com");
adremover.keyURLList.push("ads.timeout.com");
adremover.keyURLList.push("ads.tmcs.net");
adremover.keyURLList.push("ads.totallyfreestuff.com");
adremover.keyURLList.push("ads.townhall.com");
adremover.keyURLList.push("ads.trinitymirror.co.uk");
adremover.keyURLList.push("ads.tripod.com");
adremover.keyURLList.push("ads.tripod.lycos.co.uk");
adremover.keyURLList.push("ads.tripod.lycos.de");
adremover.keyURLList.push("ads.tripod.lycos.es");
adremover.keyURLList.push("ads.tripod.lycos.it");
adremover.keyURLList.push("ads.tripod.lycos.nl");
adremover.keyURLList.push("ads.tripod.spray.se");
adremover.keyURLList.push("ads.tso.dennisnet.co.uk");
adremover.keyURLList.push("ads.uknetguide.co.uk");
adremover.keyURLList.push("ads.ultimate-guitar.com");
adremover.keyURLList.push("ads.uncrate.com");
adremover.keyURLList.push("ads.undertone.com");
adremover.keyURLList.push("ads.usatoday.com");
adremover.keyURLList.push("ads.v3.com");
adremover.keyURLList.push("ads.verticalresponse.com");
adremover.keyURLList.push("ads.vgchartz.com");
adremover.keyURLList.push("ads.videosz.com");
adremover.keyURLList.push("ads.virtual-nights.com");
adremover.keyURLList.push("ads.virtualcountries.com");
adremover.keyURLList.push("ads.vnumedia.com");
adremover.keyURLList.push("ads.waps.cn");
adremover.keyURLList.push("ads.wapx.cn");
adremover.keyURLList.push("ads.weather.ca");
adremover.keyURLList.push("ads.web.aol.com");
adremover.keyURLList.push("ads.web.cs.com");
adremover.keyURLList.push("ads.web.de");
adremover.keyURLList.push("ads.webmasterpoint.org");
adremover.keyURLList.push("ads.websiteservices.com");
adremover.keyURLList.push("ads.whi.co.nz");
adremover.keyURLList.push("ads.whoishostingthis.com");
adremover.keyURLList.push("ads.wiezoekje.nl");
adremover.keyURLList.push("ads.wikia.nocookie.net");
adremover.keyURLList.push("ads.wineenthusiast.com");
adremover.keyURLList.push("ads.wunderground.com");
adremover.keyURLList.push("ads.wwe.biz");
adremover.keyURLList.push("ads.xhamster.com");
adremover.keyURLList.push("ads.xtra.co.nz");
adremover.keyURLList.push("ads.y-0.net");
adremover.keyURLList.push("ads.yimg.com");
adremover.keyURLList.push("ads.yldmgrimg.net");
adremover.keyURLList.push("ads.yourfreedvds.com");
adremover.keyURLList.push("ads.youtube.com");
adremover.keyURLList.push("ads.zdnet.com");
adremover.keyURLList.push("ads.ztod.com");
adremover.keyURLList.push("ads03.redtube.com");
adremover.keyURLList.push("ads.canoe.ca");
adremover.keyURLList.push("ads.mediacapital.pt");
adremover.keyURLList.push("ads.msn.com");
adremover.keyURLList.push("ads.rne.com");
adremover.keyURLList.push("ads.theglobeandmail.com");
adremover.keyURLList.push("ads.virtual-nights.com");
adremover.keyURLList.push("ads0.speedbit.com");
adremover.keyURLList.push("ads80.com");
adremover.keyURLList.push("ads2.brazzers.com");
adremover.keyURLList.push("ads2.clearchannel.com");
adremover.keyURLList.push("ads2.contentabc.com");
adremover.keyURLList.push("ads2.gamecity.net");
adremover.keyURLList.push("ads2.jubii.dk");
adremover.keyURLList.push("ads2.net-communities.co.uk");
adremover.keyURLList.push("ads2.oneplace.com");
adremover.keyURLList.push("ads2.rne.com");
adremover.keyURLList.push("ads2.virtual-nights.com");
adremover.keyURLList.push("ads2.xnet.cz");
adremover.keyURLList.push("ads2004.treiberupdate.de");
adremover.keyURLList.push("ads3.contentabc.com");
adremover.keyURLList.push("ads3.gamecity.net");
adremover.keyURLList.push("ads3.virtual-nights.com");
adremover.keyURLList.push("ads4.clearchannel.com");
adremover.keyURLList.push("ads4.gamecity.net");
adremover.keyURLList.push("ads4.virtual-nights.com");
adremover.keyURLList.push("ads4homes.com");
adremover.keyURLList.push("ads5.canoe.ca");
adremover.keyURLList.push("ads5.virtual-nights.com");
adremover.keyURLList.push("ads6.gamecity.net");
adremover.keyURLList.push("ads7.gamecity.net");
adremover.keyURLList.push("ads8.com");
adremover.keyURLList.push("adsatt.abc.starwave.com");
adremover.keyURLList.push("Adsatt.ABCNews.starwave.com");
adremover.keyURLList.push("adsatt.espn.go.com");
adremover.keyURLList.push("adsatt.espn.starwave.com");
adremover.keyURLList.push("Adsatt.go.starwave.com");
adremover.keyURLList.push("adsby.bidtheatre.com");
adremover.keyURLList.push("adscale.de");
adremover.keyURLList.push("adscholar.com");
adremover.keyURLList.push("adscience.nl");
adremover.keyURLList.push("adscpm.com");
adremover.keyURLList.push("adsdaq.com");
adremover.keyURLList.push("adsdk.com");
adremover.keyURLList.push("adsend.de");
adremover.keyURLList.push("adserv.evo-x.de");
adremover.keyURLList.push("adserv.gamezone.de");
adremover.keyURLList.push("adserv.iafrica.com");
adremover.keyURLList.push("adserv.qconline.com");
adremover.keyURLList.push("adserve.ams.rhythmxchange.com");
adremover.keyURLList.push("adserver-live.yoc.mobi");
adremover.keyURLList.push("adserver.43plc.com");
adremover.keyURLList.push("adserver.7i.de");
adremover.keyURLList.push("adserver.adultfriendfinder.com");
adremover.keyURLList.push("adserver.aidameter.com");
adremover.keyURLList.push("adserver.aol.fr");
adremover.keyURLList.push("adserver.beggarspromo.com");
adremover.keyURLList.push("adserver.betandwin.de");
adremover.keyURLList.push("adserver.bing.com");
adremover.keyURLList.push("adserver.bizhat.com");
adremover.keyURLList.push("adserver.break-even.it");
adremover.keyURLList.push("adserver.cams.com");
adremover.keyURLList.push("adserver.com");
adremover.keyURLList.push("adserver.digitoday.com");
adremover.keyURLList.push("adserver.dotcommedia.de");
adremover.keyURLList.push("adserver.finditquick.com");
adremover.keyURLList.push("adserver.flossiemediagroup.com");
adremover.keyURLList.push("adserver.freecity.de");
adremover.keyURLList.push("adserver.freenet.de");
adremover.keyURLList.push("adserver.friendfinder.com");
adremover.keyURLList.push("adserver.hardsextube.com");
adremover.keyURLList.push("adserver.hardwareanalysis.com");
adremover.keyURLList.push("adserver.html.it");
adremover.keyURLList.push("adserver.irishwebmasterforum.com");
adremover.keyURLList.push("adserver.janes.com");
adremover.keyURLList.push("adserver.kyoceramita-europe.com");
adremover.keyURLList.push("adserver.libero.it");
adremover.keyURLList.push("adserver.news.com.au");
adremover.keyURLList.push("adserver.ngz-network.de");
adremover.keyURLList.push("adserver.nydailynews.com");
adremover.keyURLList.push("adserver.o2.pl");
adremover.keyURLList.push("adserver.oddschecker.com");
adremover.keyURLList.push("adserver.omroepzeeland.nl");
adremover.keyURLList.push("adserver.pl");
adremover.keyURLList.push("adserver.portalofevil.com");
adremover.keyURLList.push("adserver.portugalmail.net");
adremover.keyURLList.push("adserver.portugalmail.pt");
adremover.keyURLList.push("adserver.realhomesex.net");
adremover.keyURLList.push("adserver.sanomawsoy.fi");
adremover.keyURLList.push("adserver.sciflicks.com");
adremover.keyURLList.push("adserver.sharewareonline.com");
adremover.keyURLList.push("adserver.spankaway.com");
adremover.keyURLList.push("adserver.startnow.com");
adremover.keyURLList.push("adserver.theonering.net");
adremover.keyURLList.push("adserver.twitpic.com");
adremover.keyURLList.push("adserver.viagogo.com");
adremover.keyURLList.push("adserver.virginmedia.com");
adremover.keyURLList.push("adserver.yahoo.com");
adremover.keyURLList.push("adserver0.de");
adremover.keyURLList.push("adserver-images.backbeatmedia.com");
adremover.keyURLList.push("adserver.backbeatmedia.com");
adremover.keyURLList.push("adserver.mindshare.de");
adremover.keyURLList.push("adserver.ogilvy-interactive.de");
adremover.keyURLList.push("adserver2.mindshare.de");
adremover.keyURLList.push("adserverplus.com");
adremover.keyURLList.push("adserversolutions.com");
adremover.keyURLList.push("adservinginternational.com");
adremover.keyURLList.push("adsfac.eu");
adremover.keyURLList.push("adsfac.net");
adremover.keyURLList.push("adsfac.us");
adremover.keyURLList.push("adshost.com");
adremover.keyURLList.push("adside.com");
adremover.keyURLList.push("adsk2.co");
adremover.keyURLList.push("adskape.ru");
adremover.keyURLList.push("adsklick.de");
adremover.keyURLList.push("adsmarket.com");
adremover.keyURLList.push("adsmart.co.uk");
adremover.keyURLList.push("adsmart.com");
adremover.keyURLList.push("adsmart.net");
adremover.keyURLList.push("adsmogo.com");
adremover.keyURLList.push("adsnative.com");
adremover.keyURLList.push("adsoftware.com");
adremover.keyURLList.push("adsoldier.com");
adremover.keyURLList.push("adsonar.com");
adremover.keyURLList.push("adspace.ro");
adremover.keyURLList.push("adspeed.net");
adremover.keyURLList.push("adspirit.de");
adremover.keyURLList.push("adsponse.de");
adremover.keyURLList.push("adsremote.scrippsnetworks.com");
adremover.keyURLList.push("adsrevenue.net");
adremover.keyURLList.push("adsrv.deviantart.com");
adremover.keyURLList.push("adsrv.eacdn.com");
adremover.keyURLList.push("adsrv.iol.co.za");
adremover.keyURLList.push("adsrvr.org");
adremover.keyURLList.push("adsstat.com");
adremover.keyURLList.push("adstat.4u.pl");
adremover.keyURLList.push("adstest.weather.com");
adremover.keyURLList.push("adsupply.com");
adremover.keyURLList.push("adswitcher.com");
adremover.keyURLList.push("adsymptotic.com");
adremover.keyURLList.push("adsynergy.com");
adremover.keyURLList.push("adsys.townnews.com");
adremover.keyURLList.push("adsystem.simplemachines.org");
adremover.keyURLList.push("adtech.de");
adremover.keyURLList.push("adtechus.com");
adremover.keyURLList.push("adtegrity.net");
adremover.keyURLList.push("adthis.com");
adremover.keyURLList.push("adtiger.de");
adremover.keyURLList.push("adtoll.com");
adremover.keyURLList.push("adtology.com");
adremover.keyURLList.push("adtoma.com");
adremover.keyURLList.push("adtrace.org");
adremover.keyURLList.push("adtrade.net");
adremover.keyURLList.push("adtrading.de");
adremover.keyURLList.push("adtrak.net");
adremover.keyURLList.push("adtriplex.com");
adremover.keyURLList.push("adultadvertising.com");
adremover.keyURLList.push("adv-adserver.com");
adremover.keyURLList.push("adv-banner.libero.it");
adremover.keyURLList.push("adv.cooperhosting.net");
adremover.keyURLList.push("adv.freeonline.it");
adremover.keyURLList.push("adv.hwupgrade.it");
adremover.keyURLList.push("adv.livedoor.com");
adremover.keyURLList.push("adv.webmd.com");
adremover.keyURLList.push("adv.wp.pl");
adremover.keyURLList.push("adv.yo.cz");
adremover.keyURLList.push("advariant.com");
adremover.keyURLList.push("adventory.com");
adremover.keyURLList.push("advert.bayarea.com");
adremover.keyURLList.push("advert.dyna.ultraweb.hu");
adremover.keyURLList.push("adverticum.com");
adremover.keyURLList.push("adverticum.net");
adremover.keyURLList.push("adverticus.de");
adremover.keyURLList.push("advertise.com");
adremover.keyURLList.push("advertiseireland.com");
adremover.keyURLList.push("advertisespace.com");
adremover.keyURLList.push("advertising.com");
adremover.keyURLList.push("advertising.guildlaunch.net");
adremover.keyURLList.push("advertisingbanners.com");
adremover.keyURLList.push("advertisingbox.com");
adremover.keyURLList.push("advertmarket.com");
adremover.keyURLList.push("advertmedia.de");
adremover.keyURLList.push("advertpro.sitepoint.com");
adremover.keyURLList.push("advertpro.ya.com");
adremover.keyURLList.push("adverts.carltononline.com");
adremover.keyURLList.push("advertserve.com");
adremover.keyURLList.push("advertstream.com");
adremover.keyURLList.push("advertwizard.com");
adremover.keyURLList.push("advideo.uimserv.net");
adremover.keyURLList.push("adview.ppro.de");
adremover.keyURLList.push("advisormedia.cz");
adremover.keyURLList.push("adviva.com");
adremover.keyURLList.push("adviva.net");
adremover.keyURLList.push("advnt.com");
adremover.keyURLList.push("adwareremovergold.com");
adremover.keyURLList.push("adwhirl.com");
adremover.keyURLList.push("adwitserver.com");
adremover.keyURLList.push("adworldnetwork.com");
adremover.keyURLList.push("adworx.at");
adremover.keyURLList.push("adworx.be");
adremover.keyURLList.push("adworx.nl");
adremover.keyURLList.push("adx.allstar.cz");
adremover.keyURLList.push("adx.atnext.com");
adremover.keyURLList.push("adxpansion.com");
adremover.keyURLList.push("adxpose.com");
adremover.keyURLList.push("adxvalue.com");
adremover.keyURLList.push("adyea.com");
adremover.keyURLList.push("adzerk.net");
adremover.keyURLList.push("adzerk.s3.amazonaws.com");
adremover.keyURLList.push("adzones.com");
adremover.keyURLList.push("af-ad.co.uk");
adremover.keyURLList.push("affbuzzads.com");
adremover.keyURLList.push("affili.net");
adremover.keyURLList.push("affiliate.800flowers.com");
adremover.keyURLList.push("affiliate.7host.com");
adremover.keyURLList.push("affiliate.doubleyourdating.com");
adremover.keyURLList.push("affiliate.dtiserv.com");
adremover.keyURLList.push("affiliate.gamestop.com");
adremover.keyURLList.push("affiliate.mercola.com");
adremover.keyURLList.push("affiliate.mogs.com");
adremover.keyURLList.push("affiliate.offgamers.com");
adremover.keyURLList.push("affiliate.travelnow.com");
adremover.keyURLList.push("affiliate.viator.com");
adremover.keyURLList.push("affiliatefuel.com");
adremover.keyURLList.push("affiliatefuture.com");
adremover.keyURLList.push("affiliates.allposters.com");
adremover.keyURLList.push("affiliates.babylon.com");
adremover.keyURLList.push("affiliates.digitalriver.com");
adremover.keyURLList.push("affiliates.globat.com");
adremover.keyURLList.push("affiliates.ige.com");
adremover.keyURLList.push("affiliates.internationaljock.com");
adremover.keyURLList.push("affiliates.streamray.com");
adremover.keyURLList.push("affiliates.thinkhost.net");
adremover.keyURLList.push("affiliates.thrixxx.com");
adremover.keyURLList.push("affiliates.ultrahosting.com");
adremover.keyURLList.push("affiliatetracking.com");
adremover.keyURLList.push("affiliatetracking.net");
adremover.keyURLList.push("affiliatewindow.com");
adremover.keyURLList.push("affiliation-france.com");
adremover.keyURLList.push("afftracking.justanswer.com");
adremover.keyURLList.push("ah-ha.com");
adremover.keyURLList.push("ahalogy.com");
adremover.keyURLList.push("aidu-ads.de");
adremover.keyURLList.push("aim4media.com");
adremover.keyURLList.push("aistat.net");
adremover.keyURLList.push("aktrack.pubmatic.com");
adremover.keyURLList.push("alclick.com");
adremover.keyURLList.push("alenty.com");
adremover.keyURLList.push("alexa-sitestats.s3.amazonaws.com");
adremover.keyURLList.push("all4spy.com");
adremover.keyURLList.push("alladvantage.com");
adremover.keyURLList.push("allosponsor.com");
adremover.keyURLList.push("amazingcounters.com");
adremover.keyURLList.push("amazon-adsystem.com");
adremover.keyURLList.push("amung.us");
adremover.keyURLList.push("an.tacoda.net");
adremover.keyURLList.push("anahtars.com");
adremover.keyURLList.push("analytics.adpost.org");
adremover.keyURLList.push("analytics.google.com");
adremover.keyURLList.push("analytics.live.com");
adremover.keyURLList.push("analytics.yahoo.com");
adremover.keyURLList.push("anm.intelli-direct.com");
adremover.keyURLList.push("annonser.dagbladet.no");
adremover.keyURLList.push("apex-ad.com");
adremover.keyURLList.push("api.intensifier.de");
adremover.keyURLList.push("apture.com");
adremover.keyURLList.push("arc.msn.com");
adremover.keyURLList.push("arcadebanners.com");
adremover.keyURLList.push("ard.xxxblackbook.com");
adremover.keyURLList.push("are-ter.com");
adremover.keyURLList.push("as.webmd.com");
adremover.keyURLList.push("as.advfn.com");
adremover.keyURLList.push("as2.advfn.com");
adremover.keyURLList.push("assets.exgfnetwork.com");
adremover.keyURLList.push("assoc-amazon.com");
adremover.keyURLList.push("at-adserver.alltop.com");
adremover.keyURLList.push("atdmt.com");
adremover.keyURLList.push("athena-ads.wikia.com");
adremover.keyURLList.push("atwola.com");
adremover.keyURLList.push("auctionads.com");
adremover.keyURLList.push("auctionads.net");
adremover.keyURLList.push("audience2media.com");
adremover.keyURLList.push("audit.median.hu");
adremover.keyURLList.push("audit.webinform.hu");
adremover.keyURLList.push("auto-bannertausch.de");
adremover.keyURLList.push("autohits.dk");
adremover.keyURLList.push("avenuea.com");
adremover.keyURLList.push("avpa.javalobby.org");
adremover.keyURLList.push("avres.net");
adremover.keyURLList.push("avsads.com");
adremover.keyURLList.push("awempire.com");
adremover.keyURLList.push("awin.com");
adremover.keyURLList.push("azfront.com");
adremover.keyURLList.push("b-st.com");
adremover.keyURLList.push("b.aol.com");
adremover.keyURLList.push("b.engadget.com");
adremover.keyURLList.push("ba.afl.rakuten.co.jp");
adremover.keyURLList.push("babs.tv2.dk");
adremover.keyURLList.push("backbeatmedia.com");
adremover.keyURLList.push("banik.redigy.cz");
adremover.keyURLList.push("banner-exchange-24.de");
adremover.keyURLList.push("banner.ad.nu");
adremover.keyURLList.push("banner.ambercoastcasino.com");
adremover.keyURLList.push("banner.blogranking.net");
adremover.keyURLList.push("banner.buempliz-online.ch");
adremover.keyURLList.push("banner.casino.net");
adremover.keyURLList.push("banner.casinodelrio.com");
adremover.keyURLList.push("banner.cotedazurpalace.com");
adremover.keyURLList.push("banner.coza.com");
adremover.keyURLList.push("banner.cz");
adremover.keyURLList.push("banner.easyspace.com");
adremover.keyURLList.push("banner.elisa.net");
adremover.keyURLList.push("banner.eurogrand.com");
adremover.keyURLList.push("banner.featuredusers.com");
adremover.keyURLList.push("banner.getgo.de");
adremover.keyURLList.push("banner.goldenpalace.com");
adremover.keyURLList.push("banner.img.co.za");
adremover.keyURLList.push("banner.inyourpocket.com");
adremover.keyURLList.push("banner.joylandcasino.com");
adremover.keyURLList.push("banner.kiev.ua");
adremover.keyURLList.push("banner.linux.se");
adremover.keyURLList.push("banner.media-system.de");
adremover.keyURLList.push("banner.mindshare.de");
adremover.keyURLList.push("banner.nixnet.cz");
adremover.keyURLList.push("banner.noblepoker.com");
adremover.keyURLList.push("banner.northsky.com");
adremover.keyURLList.push("banner.orb.net");
adremover.keyURLList.push("banner.penguin.cz");
adremover.keyURLList.push("banner.prestigecasino.com");
adremover.keyURLList.push("banner.rbc.ru");
adremover.keyURLList.push("banner.relcom.ru");
adremover.keyURLList.push("banner.tanto.de");
adremover.keyURLList.push("banner.titan-dsl.de");
adremover.keyURLList.push("banner.vadian.net");
adremover.keyURLList.push("banner.wirenode.com");
adremover.keyURLList.push("bannerads.de");
adremover.keyURLList.push("bannerboxes.com");
adremover.keyURLList.push("bannercommunity.de");
adremover.keyURLList.push("bannerconnect.com");
adremover.keyURLList.push("bannerconnect.net");
adremover.keyURLList.push("bannerexchange.cjb.net");
adremover.keyURLList.push("bannerflow.com");
adremover.keyURLList.push("bannergrabber.internet.gr");
adremover.keyURLList.push("bannerhost.com");
adremover.keyURLList.push("bannerimage.com");
adremover.keyURLList.push("bannerlandia.com.ar");
adremover.keyURLList.push("bannermall.com");
adremover.keyURLList.push("bannermarkt.nl");
adremover.keyURLList.push("bannerpower.com");
adremover.keyURLList.push("banners.adultfriendfinder.com");
adremover.keyURLList.push("banners.amigos.com");
adremover.keyURLList.push("banners.apnuk.com");
adremover.keyURLList.push("banners.asiafriendfinder.com");
adremover.keyURLList.push("banners.audioholics.com");
adremover.keyURLList.push("banners.babylon-x.com");
adremover.keyURLList.push("banners.bol.com.br");
adremover.keyURLList.push("banners.cams.com");
adremover.keyURLList.push("banners.clubseventeen.com");
adremover.keyURLList.push("banners.czi.cz");
adremover.keyURLList.push("banners.dine.com");
adremover.keyURLList.push("banners.direction-x.com");
adremover.keyURLList.push("banners.directnic.com");
adremover.keyURLList.push("banners.easydns.com");
adremover.keyURLList.push("banners.ebay.com");
adremover.keyURLList.push("banners.freett.com");
adremover.keyURLList.push("banners.friendfinder.com");
adremover.keyURLList.push("banners.getiton.com");
adremover.keyURLList.push("banners.iq.pl");
adremover.keyURLList.push("banners.isoftmarketing.com");
adremover.keyURLList.push("banners.lifeserv.com");
adremover.keyURLList.push("banners.linkbuddies.com");
adremover.keyURLList.push("banners.passion.com");
adremover.keyURLList.push("banners.resultonline.com");
adremover.keyURLList.push("banners.sexsearch.com");
adremover.keyURLList.push("banners.sys-con.com");
adremover.keyURLList.push("banners.thomsonlocal.com");
adremover.keyURLList.push("banners.videosz.com");
adremover.keyURLList.push("banners.virtuagirlhd.com");
adremover.keyURLList.push("banners.wunderground.com");
adremover.keyURLList.push("bannerserver.com");
adremover.keyURLList.push("bannersgomlm.com");
adremover.keyURLList.push("bannershotlink.perfectgonzo.com");
adremover.keyURLList.push("bannersng.yell.com");
adremover.keyURLList.push("bannerspace.com");
adremover.keyURLList.push("bannerswap.com");
adremover.keyURLList.push("bannertesting.com");
adremover.keyURLList.push("bannery.cz");
adremover.keyURLList.push("bannieres.acces-contenu.com");
adremover.keyURLList.push("bans.adserver.co.il");
adremover.keyURLList.push("bans.bride.ru");
adremover.keyURLList.push("barnesandnoble.bfast.com");
adremover.keyURLList.push("baypops.com");
adremover.keyURLList.push("bbelements.com");
adremover.keyURLList.push("bbn.img.com.ua");
adremover.keyURLList.push("begun.ru");
adremover.keyURLList.push("belstat.com");
adremover.keyURLList.push("belstat.nl");
adremover.keyURLList.push("berp.com");
adremover.keyURLList.push("best-pr.info");
adremover.keyURLList.push("best-top.ro");
adremover.keyURLList.push("bestsearch.net");
adremover.keyURLList.push("bhclicks.com");
adremover.keyURLList.push("bidclix.com");
adremover.keyURLList.push("bidclix.net");
adremover.keyURLList.push("bidtrk.com");
adremover.keyURLList.push("bidvertiser.com");
adremover.keyURLList.push("bigads.guj.de");
adremover.keyURLList.push("bigbangmedia.com");
adremover.keyURLList.push("bigclicks.com");
adremover.keyURLList.push("billboard.cz");
adremover.keyURLList.push("bitads.net");
adremover.keyURLList.push("bitmedianetwork.com");
adremover.keyURLList.push("bizad.nikkeibp.co.jp");
adremover.keyURLList.push("bizrate.com");
adremover.keyURLList.push("blast4traffic.com");
adremover.keyURLList.push("blingbucks.com");
adremover.keyURLList.push("blogads.com");
adremover.keyURLList.push("blogcounter.de");
adremover.keyURLList.push("blogherads.com");
adremover.keyURLList.push("blogrush.com");
adremover.keyURLList.push("blogtoplist.se");
adremover.keyURLList.push("blogtopsites.com");
adremover.keyURLList.push("blueadvertise.com");
adremover.keyURLList.push("bluekai.com");
adremover.keyURLList.push("bluelithium.com");
adremover.keyURLList.push("bluewhaleweb.com");
adremover.keyURLList.push("bm.annonce.cz");
adremover.keyURLList.push("bn.bfast.com");
adremover.keyURLList.push("boersego-ads.de");
adremover.keyURLList.push("boldchat.com");
adremover.keyURLList.push("boom.ro");
adremover.keyURLList.push("boomads.com");
adremover.keyURLList.push("boost-my-pr.de");
adremover.keyURLList.push("box.anchorfree.net");
adremover.keyURLList.push("bpath.com");
adremover.keyURLList.push("braincash.com");
adremover.keyURLList.push("brandreachsys.com");
adremover.keyURLList.push("bravenet.com.invalid");
adremover.keyURLList.push("bridgetrack.com");
adremover.keyURLList.push("brightinfo.com");
adremover.keyURLList.push("british-banners.com");
adremover.keyURLList.push("bs.yandex.ru");
adremover.keyURLList.push("budsinc.com");
adremover.keyURLList.push("bullseye.backbeatmedia.com");
adremover.keyURLList.push("buyhitscheap.com");
adremover.keyURLList.push("buysellads.com");
adremover.keyURLList.push("buzzonclick.com");
adremover.keyURLList.push("bvalphaserver.com");
adremover.keyURLList.push("bwp.download.com");
adremover.keyURLList.push("c.bigmir.net");
adremover.keyURLList.push("c.compete.com");
adremover.keyURLList.push("c.nowlinux.com");
adremover.keyURLList.push("campaign.bharatmatrimony.com");
adremover.keyURLList.push("caniamedia.com");
adremover.keyURLList.push("carbonads.com");
adremover.keyURLList.push("carbonads.net");
adremover.keyURLList.push("casalemedia.com");
adremover.keyURLList.push("casalmedia.com");
adremover.keyURLList.push("cash4members.com");
adremover.keyURLList.push("cash4popup.de");
adremover.keyURLList.push("cashcrate.com");
adremover.keyURLList.push("cashengines.com");
adremover.keyURLList.push("cashfiesta.com");
adremover.keyURLList.push("cashlayer.com");
adremover.keyURLList.push("cashpartner.com");
adremover.keyURLList.push("casinogames.com");
adremover.keyURLList.push("casinopays.com");
adremover.keyURLList.push("casinorewards.com");
adremover.keyURLList.push("casinotraffic.com");
adremover.keyURLList.push("casinotreasure.com");
adremover.keyURLList.push("cbanners.virtuagirlhd.com");
adremover.keyURLList.push("cben.net");
adremover.keyURLList.push("cbmall.com");
adremover.keyURLList.push("cbx.net");
adremover.keyURLList.push("cdn.freefacti.com");
adremover.keyURLList.push("cdn.freefarcy.com");
adremover.keyURLList.push("cecash.com");
adremover.keyURLList.push("ceskydomov.alias.ngs.modry.cz");
adremover.keyURLList.push("cetrk.com");
adremover.keyURLList.push("cgicounter.puretec.de");
adremover.keyURLList.push("ch.questionmarket.com");
adremover.keyURLList.push("channelintelligence.com");
adremover.keyURLList.push("chart.dk");
adremover.keyURLList.push("chartbeat.com");
adremover.keyURLList.push("chartbeat.net");
adremover.keyURLList.push("checkm8.com");
adremover.keyURLList.push("checkstat.nl");
adremover.keyURLList.push("chestionar.ro");
adremover.keyURLList.push("chitika.net");
adremover.keyURLList.push("cibleclick.com");
adremover.keyURLList.push("cityads.telus.net");
adremover.keyURLList.push("cj.com");
adremover.keyURLList.push("cjbmanagement.com");
adremover.keyURLList.push("cjlog.com");
adremover.keyURLList.push("claria.com");
adremover.keyURLList.push("class-act-clicks.com");
adremover.keyURLList.push("click.absoluteagency.com");
adremover.keyURLList.push("click.fool.com");
adremover.keyURLList.push("click.kmindex.ru");
adremover.keyURLList.push("click2freemoney.com");
adremover.keyURLList.push("click2paid.com");
adremover.keyURLList.push("clickability.com");
adremover.keyURLList.push("clickadz.com");
adremover.keyURLList.push("clickagents.com");
adremover.keyURLList.push("clickbank.com");
adremover.keyURLList.push("clickbank.net");
adremover.keyURLList.push("clickbooth.com");
adremover.keyURLList.push("clickboothlnk.com");
adremover.keyURLList.push("clickbrokers.com");
adremover.keyURLList.push("clickcompare.co.uk");
adremover.keyURLList.push("clickdensity.com");
adremover.keyURLList.push("clickedyclick.com");
adremover.keyURLList.push("clickhereforcellphones.com");
adremover.keyURLList.push("clickhouse.com");
adremover.keyURLList.push("clickhype.com");
adremover.keyURLList.push("clicklink.jp");
adremover.keyURLList.push("clickmedia.ro");
adremover.keyURLList.push("clicks.equantum.com");
adremover.keyURLList.push("clicks.mods.de");
adremover.keyURLList.push("clickserve.cc-dt.com");
adremover.keyURLList.push("clicksor.com");
adremover.keyURLList.push("clicktag.de");
adremover.keyURLList.push("clickthrucash.com");
adremover.keyURLList.push("clickthruserver.com");
adremover.keyURLList.push("clickthrutraffic.com");
adremover.keyURLList.push("clicktrace.info");
adremover.keyURLList.push("clicktrack.ziyu.net");
adremover.keyURLList.push("clicktracks.com");
adremover.keyURLList.push("clicktrade.com");
adremover.keyURLList.push("clickxchange.com");
adremover.keyURLList.push("clickz.com");
adremover.keyURLList.push("clickzxc.com");
adremover.keyURLList.push("clicmanager.fr");
adremover.keyURLList.push("clients.tbo.com");
adremover.keyURLList.push("clixgalore.com");
adremover.keyURLList.push("clkads.com");
adremover.keyURLList.push("clkrev.com");
adremover.keyURLList.push("cluster.adultworld.com");
adremover.keyURLList.push("clustrmaps.com");
adremover.keyURLList.push("cmpstar.com");
adremover.keyURLList.push("cnomy.com");
adremover.keyURLList.push("cnt.spbland.ru");
adremover.keyURLList.push("cnt.pocitadlo.cz");
adremover.keyURLList.push("code-server.biz");
adremover.keyURLList.push("colonize.com");
adremover.keyURLList.push("comclick.com");
adremover.keyURLList.push("commindo-media-ressourcen.de");
adremover.keyURLList.push("commissionmonster.com");
adremover.keyURLList.push("compactbanner.com");
adremover.keyURLList.push("comprabanner.it");
adremover.keyURLList.push("confirmed-profits.com");
adremover.keyURLList.push("connextra.com");
adremover.keyURLList.push("contaxe.de");
adremover.keyURLList.push("content.acc-hd.de");
adremover.keyURLList.push("content.ad");
adremover.keyURLList.push("contextweb.com");
adremover.keyURLList.push("conversantmedia.com");
adremover.keyURLList.push("conversionruler.com");
adremover.keyURLList.push("cookies.cmpnet.com");
adremover.keyURLList.push("coremetrics.com");
adremover.keyURLList.push("count.rbc.ru");
adremover.keyURLList.push("count.rin.ru");
adremover.keyURLList.push("count.west263.com");
adremover.keyURLList.push("counted.com");
adremover.keyURLList.push("counter.bloke.com");
adremover.keyURLList.push("counter.cnw.cz");
adremover.keyURLList.push("counter.cz");
adremover.keyURLList.push("counter.dreamhost.com");
adremover.keyURLList.push("counter.fateback.com");
adremover.keyURLList.push("counter.mirohost.net");
adremover.keyURLList.push("counter.mojgorod.ru");
adremover.keyURLList.push("counter.nowlinux.com");
adremover.keyURLList.push("counter.rambler.ru");
adremover.keyURLList.push("counter.search.bg");
adremover.keyURLList.push("counter.sparklit.com");
adremover.keyURLList.push("counter.yadro.ru");
adremover.keyURLList.push("counters.honesty.com");
adremover.keyURLList.push("counting.kmindex.ru");
adremover.keyURLList.push("counts.tucows.com");
adremover.keyURLList.push("coupling-media.de");
adremover.keyURLList.push("cpalead.com");
adremover.keyURLList.push("cpays.com");
adremover.keyURLList.push("cpmaffiliation.com");
adremover.keyURLList.push("cpmstar.com");
adremover.keyURLList.push("cpxadroit.com");
adremover.keyURLList.push("cpxinteractive.com");
adremover.keyURLList.push("cqcounter.com");
adremover.keyURLList.push("crakmedia.com");
adremover.keyURLList.push("craktraffic.com");
adremover.keyURLList.push("crawlability.com");
adremover.keyURLList.push("crazypopups.com");
adremover.keyURLList.push("creafi-online-media.com");
adremover.keyURLList.push("creative.ak.facebook.com");
adremover.keyURLList.push("creative.whi.co.nz");
adremover.keyURLList.push("creatives.as4x.tmcs.net");
adremover.keyURLList.push("creatives.livejasmin.com");
adremover.keyURLList.push("crispads.com");
adremover.keyURLList.push("criteo.com");
adremover.keyURLList.push("crowdgravity.com");
adremover.keyURLList.push("crtv.mate.com");
adremover.keyURLList.push("crwdcntrl.net");
adremover.keyURLList.push("ctnetwork.hu");
adremover.keyURLList.push("cubics.com");
adremover.keyURLList.push("customad.cnn.com");
adremover.keyURLList.push("cyberbounty.com");
adremover.keyURLList.push("cybermonitor.com");
adremover.keyURLList.push("d.adroll.com");
adremover.keyURLList.push("dakic-ia-300.com");
adremover.keyURLList.push("danban.com");
adremover.keyURLList.push("dapper.net");
adremover.keyURLList.push("datashreddergold.com");
adremover.keyURLList.push("dbbsrv.com");
adremover.keyURLList.push("dc-storm.com");
adremover.keyURLList.push("de7a.com");
adremover.keyURLList.push("dealdotcom.com");
adremover.keyURLList.push("debtbusterloans.com");
adremover.keyURLList.push("decknetwork.net");
adremover.keyURLList.push("deloo.de");
adremover.keyURLList.push("demandbase.com");
adremover.keyURLList.push("di.shopping.com");
adremover.keyURLList.push("dialerporn.com");
adremover.keyURLList.push("didtheyreadit.com");
adremover.keyURLList.push("direct-xxx-access.com");
adremover.keyURLList.push("directaclick.com");
adremover.keyURLList.push("directivepub.com");
adremover.keyURLList.push("directleads.com");
adremover.keyURLList.push("directorym.com");
adremover.keyURLList.push("directtrack.com");
adremover.keyURLList.push("discountclick.com");
adremover.keyURLList.push("displayadsmedia.com");
adremover.keyURLList.push("dist.belnk.com");
adremover.keyURLList.push("dmtracker.com");
adremover.keyURLList.push("dmtracking.alibaba.com");
adremover.keyURLList.push("dmtracking2.alibaba.com");
adremover.keyURLList.push("dnads.directnic.com");
adremover.keyURLList.push("domaining.in");
adremover.keyURLList.push("domainsponsor.com");
adremover.keyURLList.push("domainsteam.de");
adremover.keyURLList.push("domdex.com");
adremover.keyURLList.push("doubleclick.com");
adremover.keyURLList.push("doubleclick.de");
adremover.keyURLList.push("doubleclick.net");
adremover.keyURLList.push("doublepimp.com");
adremover.keyURLList.push("drumcash.com");
adremover.keyURLList.push("dynamic.fmpub.net");
adremover.keyURLList.push("e-adimages.scrippsnetworks.com");
adremover.keyURLList.push("e-bannerx.com");
adremover.keyURLList.push("e-debtconsolidation.com");
adremover.keyURLList.push("e-m.fr");
adremover.keyURLList.push("e-n-t-e-r-n-e-x.com");
adremover.keyURLList.push("e-planning.net");
adremover.keyURLList.push("e.kde.cz");
adremover.keyURLList.push("eas.almamedia.fi");
adremover.keyURLList.push("easyhits4u.com");
adremover.keyURLList.push("ebayadvertising.com");
adremover.keyURLList.push("ebocornac.com");
adremover.keyURLList.push("ebuzzing.com");
adremover.keyURLList.push("ecircle-ag.com");
adremover.keyURLList.push("eclick.vn");
adremover.keyURLList.push("ecoupons.com");
adremover.keyURLList.push("edgeio.com");
adremover.keyURLList.push("effectivemeasure.com");
adremover.keyURLList.push("effectivemeasure.net");
adremover.keyURLList.push("eiv.baidu.com");
adremover.keyURLList.push("elitedollars.com");
adremover.keyURLList.push("elitetoplist.com");
adremover.keyURLList.push("emarketer.com");
adremover.keyURLList.push("emediate.dk");
adremover.keyURLList.push("emediate.eu");
adremover.keyURLList.push("engine.espace.netavenir.com");
adremover.keyURLList.push("enginenetwork.com");
adremover.keyURLList.push("enoratraffic.com");
adremover.keyURLList.push("enquisite.com");
adremover.keyURLList.push("entercasino.com");
adremover.keyURLList.push("entrecard.s3.amazonaws.com");
adremover.keyURLList.push("eqads.com");
adremover.keyURLList.push("ero-advertising.com");
adremover.keyURLList.push("esellerate.net");
adremover.keyURLList.push("estat.com");
adremover.keyURLList.push("etahub.com");
adremover.keyURLList.push("etargetnet.com");
adremover.keyURLList.push("etracker.de");
adremover.keyURLList.push("eu-adcenter.net");
adremover.keyURLList.push("eu.madsone.com");
adremover.keyURLList.push("eur.a.yimg.com");
adremover.keyURLList.push("eurekster.com");
adremover.keyURLList.push("euro-linkindex.de");
adremover.keyURLList.push("euroclick.com");
adremover.keyURLList.push("euros4click.de");
adremover.keyURLList.push("eusta.de");
adremover.keyURLList.push("evergage.com");
adremover.keyURLList.push("evidencecleanergold.com");
adremover.keyURLList.push("ewebcounter.com");
adremover.keyURLList.push("exchange-it.com");
adremover.keyURLList.push("exchange.bg");
adremover.keyURLList.push("exchangead.com");
adremover.keyURLList.push("exchangeclicksonline.com");
adremover.keyURLList.push("exit76.com");
adremover.keyURLList.push("exitexchange.com");
adremover.keyURLList.push("exitfuel.com");
adremover.keyURLList.push("exoclick.com");
adremover.keyURLList.push("exogripper.com");
adremover.keyURLList.push("experteerads.com");
adremover.keyURLList.push("exponential.com");
adremover.keyURLList.push("express-submit.de");
adremover.keyURLList.push("extractorandburner.com");
adremover.keyURLList.push("extreme-dm.com");
adremover.keyURLList.push("extremetracking.com");
adremover.keyURLList.push("eyeblaster.com");
adremover.keyURLList.push("eyereturn.com");
adremover.keyURLList.push("eyeviewads.com");
adremover.keyURLList.push("eyewonder.com");
adremover.keyURLList.push("ezula.com");
adremover.keyURLList.push("f5biz.com");
adremover.keyURLList.push("fast-adv.it");
adremover.keyURLList.push("fastclick.com");
adremover.keyURLList.push("fastclick.com.edgesuite.net");
adremover.keyURLList.push("fastclick.net");
adremover.keyURLList.push("fb-promotions.com");
adremover.keyURLList.push("fc.webmasterpro.de");
adremover.keyURLList.push("feedbackresearch.com");
adremover.keyURLList.push("feedjit.com");
adremover.keyURLList.push("ffxcam.fairfax.com.au");
adremover.keyURLList.push("fimc.net");
adremover.keyURLList.push("fimserve.com");
adremover.keyURLList.push("findcommerce.com");
adremover.keyURLList.push("findyourcasino.com");
adremover.keyURLList.push("fineclicks.com");
adremover.keyURLList.push("first.nova.cz");
adremover.keyURLList.push("firstlightera.com");
adremover.keyURLList.push("flashtalking.com");
adremover.keyURLList.push("fleshlightcash.com");
adremover.keyURLList.push("flexbanner.com");
adremover.keyURLList.push("flowgo.com");
adremover.keyURLList.push("flurry.com");
adremover.keyURLList.push("fonecta.leiki.com");
adremover.keyURLList.push("foo.cosmocode.de");
adremover.keyURLList.push("forex-affiliate.net");
adremover.keyURLList.push("fpctraffic.com");
adremover.keyURLList.push("fpctraffic2.com");
adremover.keyURLList.push("fragmentserv.iac-online.de");
adremover.keyURLList.push("free-banners.com");
adremover.keyURLList.push("freebanner.com");
adremover.keyURLList.push("freelogs.com");
adremover.keyURLList.push("freeonlineusers.com");
adremover.keyURLList.push("freepay.com");
adremover.keyURLList.push("freestats.com");
adremover.keyURLList.push("freestats.tv");
adremover.keyURLList.push("freewebcounter.com");
adremover.keyURLList.push("funklicks.com");
adremover.keyURLList.push("funpageexchange.com");
adremover.keyURLList.push("fusionads.net");
adremover.keyURLList.push("fusionquest.com");
adremover.keyURLList.push("fxclix.com");
adremover.keyURLList.push("fxstyle.net");
adremover.keyURLList.push("galaxien.com");
adremover.keyURLList.push("game-advertising-online.com");
adremover.keyURLList.push("gamehouse.com");
adremover.keyURLList.push("gamesites00.net");
adremover.keyURLList.push("gamesites200.com");
adremover.keyURLList.push("gamesitestop00.com");
adremover.keyURLList.push("gator.com");
adremover.keyURLList.push("gbanners.hornymatches.com");
adremover.keyURLList.push("gemius.pl");
adremover.keyURLList.push("geo.digitalpoint.com");
adremover.keyURLList.push("geobanner.adultfriendfinder.com");
adremover.keyURLList.push("geovisite.com");
adremover.keyURLList.push("getclicky.com");
adremover.keyURLList.push("globalismedia.com");
adremover.keyURLList.push("globaltakeoff.net");
adremover.keyURLList.push("globaltrack.com");
adremover.keyURLList.push("globe7.com");
adremover.keyURLList.push("globus-inter.com");
adremover.keyURLList.push("gmads.net");
adremover.keyURLList.push("go-clicks.de");
adremover.keyURLList.push("go-rank.de");
adremover.keyURLList.push("goingplatinum.com");
adremover.keyURLList.push("gold.weborama.fr");
adremover.keyURLList.push("goldstats.com");
adremover.keyURLList.push("google-analytics.com");
adremover.keyURLList.push("googleadservices.com");
adremover.keyURLList.push("googlesyndication.com");
adremover.keyURLList.push("gostats.com");
adremover.keyURLList.push("gp.dejanews.com");
adremover.keyURLList.push("gpr.hu");
adremover.keyURLList.push("grafstat.ro");
adremover.keyURLList.push("grapeshot.co.uk");
adremover.keyURLList.push("greystripe.com");
adremover.keyURLList.push("gtop.ro");
adremover.keyURLList.push("gtop00.com");
adremover.keyURLList.push("harrenmedia.com");
adremover.keyURLList.push("harrenmedianetwork.com");
adremover.keyURLList.push("havamedia.net");
adremover.keyURLList.push("heias.com");
adremover.keyURLList.push("hentaicounter.com");
adremover.keyURLList.push("herbalaffiliateprogram.com");
adremover.keyURLList.push("hexusads.fluent.ltd.uk");
adremover.keyURLList.push("heyos.com");
adremover.keyURLList.push("hgads.com");
adremover.keyURLList.push("hidden.gogoceleb.com");
adremover.keyURLList.push("hightrafficads.com");
adremover.keyURLList.push("histats.com");
adremover.keyURLList.push("hit-parade.com");
adremover.keyURLList.push("hit.bg");
adremover.keyURLList.push("hit.ua");
adremover.keyURLList.push("hit.webcentre.lycos.co.uk");
adremover.keyURLList.push("hitbox.com");
adremover.keyURLList.push("hitcents.com");
adremover.keyURLList.push("hitfarm.com");
adremover.keyURLList.push("hitiz.com");
adremover.keyURLList.push("hitlist.ru");
adremover.keyURLList.push("hitlounge.com");
adremover.keyURLList.push("hitometer.com");
adremover.keyURLList.push("hits.europuls.eu");
adremover.keyURLList.push("hits.informer.com");
adremover.keyURLList.push("hits.puls.lv");
adremover.keyURLList.push("hits.theguardian.com");
adremover.keyURLList.push("hits4me.com");
adremover.keyURLList.push("hits4pay.com");
adremover.keyURLList.push("hitslink.com");
adremover.keyURLList.push("hittail.com");
adremover.keyURLList.push("hollandbusinessadvertising.nl");
adremover.keyURLList.push("homepageking.de");
adremover.keyURLList.push("hostedads.realitykings.com");
adremover.keyURLList.push("hotkeys.com");
adremover.keyURLList.push("hotlog.ru");
adremover.keyURLList.push("hotrank.com.tw");
adremover.keyURLList.push("httpool.com");
adremover.keyURLList.push("hurricanedigitalmedia.com");
adremover.keyURLList.push("hydramedia.com");
adremover.keyURLList.push("hyperbanner.net");
adremover.keyURLList.push("hypertracker.com");
adremover.keyURLList.push("i-clicks.net");
adremover.keyURLList.push("i.xx.openx.com");
adremover.keyURLList.push("iimg.com");
adremover.keyURLList.push("imedia.no");
adremover.keyURLList.push("ia.iinfo.cz");
adremover.keyURLList.push("iad.anm.co.uk");
adremover.keyURLList.push("iadnet.com");
adremover.keyURLList.push("iasds0.com");
adremover.keyURLList.push("iconadserver.com");
adremover.keyURLList.push("icptrack.com");
adremover.keyURLList.push("idcounter.com");
adremover.keyURLList.push("identads.com");
adremover.keyURLList.push("idot.cz");
adremover.keyURLList.push("idregie.com");
adremover.keyURLList.push("idtargeting.com");
adremover.keyURLList.push("ientrymail.com");
adremover.keyURLList.push("iesnare.com");
adremover.keyURLList.push("ifa.tube8live.com");
adremover.keyURLList.push("ilbanner.com");
adremover.keyURLList.push("ilead.itrack.it");
adremover.keyURLList.push("ilovecheating.com");
adremover.keyURLList.push("imageads.canoe.ca");
adremover.keyURLList.push("imagecash.net");
adremover.keyURLList.push("images-pw.secureserver.net");
adremover.keyURLList.push("images.v3.com");
adremover.keyURLList.push("imarketservices.com");
adremover.keyURLList.push("img.prohardver.hu");
adremover.keyURLList.push("imgpromo.easyrencontre.com");
adremover.keyURLList.push("imitrk.com");
adremover.keyURLList.push("imonitor.nethost.cz");
adremover.keyURLList.push("imprese.cz");
adremover.keyURLList.push("impressionmedia.cz");
adremover.keyURLList.push("impressionz.co.uk");
adremover.keyURLList.push("imrworldwide.com");
adremover.keyURLList.push("inboxdollars.com");
adremover.keyURLList.push("incentaclick.com");
adremover.keyURLList.push("indexstats.com");
adremover.keyURLList.push("indieclick.com");
adremover.keyURLList.push("industrybrains.com");
adremover.keyURLList.push("inetlog.ru");
adremover.keyURLList.push("infinite-ads.com");
adremover.keyURLList.push("infinityads.com");
adremover.keyURLList.push("infolinks.com");
adremover.keyURLList.push("information.com");
adremover.keyURLList.push("inringtone.com");
adremover.keyURLList.push("insightexpress.com");
adremover.keyURLList.push("insightexpressai.com");
adremover.keyURLList.push("inspectorclick.com");
adremover.keyURLList.push("instantmadness.com");
adremover.keyURLList.push("intelliads.com");
adremover.keyURLList.push("intellitxt.com");
adremover.keyURLList.push("interactive.forthnet.gr");
adremover.keyURLList.push("intergi.com");
adremover.keyURLList.push("internetfuel.com");
adremover.keyURLList.push("interreklame.de");
adremover.keyURLList.push("interstat.hu");
adremover.keyURLList.push("ip.ro");
adremover.keyURLList.push("ip93.cn");
adremover.keyURLList.push("iperceptions.com");
adremover.keyURLList.push("ipro.com");
adremover.keyURLList.push("ireklama.cz");
adremover.keyURLList.push("itfarm.com");
adremover.keyURLList.push("itop.cz");
adremover.keyURLList.push("its-that-easy.com");
adremover.keyURLList.push("itsptp.com");
adremover.keyURLList.push("jcount.com");
adremover.keyURLList.push("jinkads.de");
adremover.keyURLList.push("joetec.net");
adremover.keyURLList.push("jokedollars.com");
adremover.keyURLList.push("js.users.5.la");
adremover.keyURLList.push("juicyads.com");
adremover.keyURLList.push("jumptap.com");
adremover.keyURLList.push("justrelevant.com");
adremover.keyURLList.push("justwebads.com");
adremover.keyURLList.push("k.iinfo.cz");
adremover.keyURLList.push("kanoodle.com");
adremover.keyURLList.push("keymedia.hu");
adremover.keyURLList.push("kissmetrics.com");
adremover.keyURLList.push("kliks.nl");
adremover.keyURLList.push("komoona.com");
adremover.keyURLList.push("kompasads.com");
adremover.keyURLList.push("kontera.com");
adremover.keyURLList.push("kt-g.de");
adremover.keyURLList.push("ktu.sv2.biz");
adremover.keyURLList.push("lakequincy.com");
adremover.keyURLList.push("layer-ad.de");
adremover.keyURLList.push("layer-ads.de");
adremover.keyURLList.push("lbn.ru");
adremover.keyURLList.push("lct.salesforce.com");
adremover.keyURLList.push("lead-analytics.nl");
adremover.keyURLList.push("leadboltads.net");
adremover.keyURLList.push("leadclick.com");
adremover.keyURLList.push("leadingedgecash.com");
adremover.keyURLList.push("leadzupc.com");
adremover.keyURLList.push("levelrate.de");
adremover.keyURLList.push("lfstmedia.com");
adremover.keyURLList.push("liftdna.com");
adremover.keyURLList.push("ligatus.com");
adremover.keyURLList.push("ligatus.de");
adremover.keyURLList.push("lightningcast.net");
adremover.keyURLList.push("lightspeedcash.com");
adremover.keyURLList.push("link-booster.de");
adremover.keyURLList.push("link4ads.com");
adremover.keyURLList.push("linkadd.de");
adremover.keyURLList.push("linkbuddies.com");
adremover.keyURLList.push("linkexchange.com");
adremover.keyURLList.push("linkprice.com");
adremover.keyURLList.push("linkrain.com");
adremover.keyURLList.push("linkreferral.com");
adremover.keyURLList.push("links-ranking.de");
adremover.keyURLList.push("linkshighway.com");
adremover.keyURLList.push("linkstorms.com");
adremover.keyURLList.push("linkswaper.com");
adremover.keyURLList.push("linktarget.com");
adremover.keyURLList.push("liquidad.narrowcastmedia.com");
adremover.keyURLList.push("liveintent.com");
adremover.keyURLList.push("liverail.com");
adremover.keyURLList.push("loading32.com");
adremover.keyURLList.push("log.btopenworld.com");
adremover.keyURLList.push("logua.com");
adremover.keyURLList.push("lop.com");
adremover.keyURLList.push("lucidmedia.com");
adremover.keyURLList.push("lzjl.com");
adremover.keyURLList.push("m.webtrends.com");
adremover.keyURLList.push("m.webstats4u.com");
adremover.keyURLList.push("m4n.nl");
adremover.keyURLList.push("mackeeperapp.mackeeper.com");
adremover.keyURLList.push("madclient.uimserv.net");
adremover.keyURLList.push("madisonavenue.com");
adremover.keyURLList.push("mads.cnet.com");
adremover.keyURLList.push("madvertise.de");
adremover.keyURLList.push("marchex.com");
adremover.keyURLList.push("market-buster.com");
adremover.keyURLList.push("marketing.888.com");
adremover.keyURLList.push("marketing.hearstmagazines.nl");
adremover.keyURLList.push("marketing.nyi.net");
adremover.keyURLList.push("marketing.osijek03.com");
adremover.keyURLList.push("marketingsolutions.yahoo.com");
adremover.keyURLList.push("maroonspider.com");
adremover.keyURLList.push("mas.sector.sk");
adremover.keyURLList.push("mastermind.com");
adremover.keyURLList.push("matchcraft.com");
adremover.keyURLList.push("mathtag.com");
adremover.keyURLList.push("max.i2.de");
adremover.keyURLList.push("maximumcash.com");
adremover.keyURLList.push("mbn.com.ua");
adremover.keyURLList.push("mbs.megaroticlive.com");
adremover.keyURLList.push("mbuyu.nl");
adremover.keyURLList.push("mdotm.com");
adremover.keyURLList.push("measuremap.com");
adremover.keyURLList.push("media-adrunner.mycomputer.com");
adremover.keyURLList.push("media-servers.net");
adremover.keyURLList.push("media.ftv-publicite.fr");
adremover.keyURLList.push("media.funpic.de");
adremover.keyURLList.push("media6degrees.com");
adremover.keyURLList.push("mediaarea.eu");
adremover.keyURLList.push("mediacharger.com");
adremover.keyURLList.push("mediadvertising.ro");
adremover.keyURLList.push("mediageneral.com");
adremover.keyURLList.push("mediamath.com");
adremover.keyURLList.push("mediamgr.ugo.com");
adremover.keyURLList.push("mediaplazza.com");
adremover.keyURLList.push("mediaplex.com");
adremover.keyURLList.push("mediascale.de");
adremover.keyURLList.push("mediatext.com");
adremover.keyURLList.push("mediax.angloinfo.com");
adremover.keyURLList.push("mediaz.angloinfo.com");
adremover.keyURLList.push("medleyads.com");
adremover.keyURLList.push("medyanetads.com");
adremover.keyURLList.push("megacash.de");
adremover.keyURLList.push("megago.com");
adremover.keyURLList.push("megastats.com");
adremover.keyURLList.push("megawerbung.de");
adremover.keyURLList.push("metaffiliation.com");
adremover.keyURLList.push("metanetwork.com");
adremover.keyURLList.push("methodcash.com");
adremover.keyURLList.push("metrics.windowsitpro.com");
adremover.keyURLList.push("mgid.com");
adremover.keyURLList.push("miarroba.com");
adremover.keyURLList.push("microstatic.pl");
adremover.keyURLList.push("microticker.com");
adremover.keyURLList.push("midnightclicking.com");
adremover.keyURLList.push("misstrends.com");
adremover.keyURLList.push("mixpanel.com");
adremover.keyURLList.push("mixtraffic.com");
adremover.keyURLList.push("mjxads.internet.com");
adremover.keyURLList.push("mlm.de");
adremover.keyURLList.push("mmismm.com");
adremover.keyURLList.push("mmtro.com");
adremover.keyURLList.push("moatads.com");
adremover.keyURLList.push("mobclix.com");
adremover.keyURLList.push("mocean.mobi");
adremover.keyURLList.push("moneyexpert.com");
adremover.keyURLList.push("monsterpops.com");
adremover.keyURLList.push("mopub.com");
adremover.keyURLList.push("mouseflow.com");
adremover.keyURLList.push("mpstat.us");
adremover.keyURLList.push("mr-rank.de");
adremover.keyURLList.push("mrskincash.com");
adremover.keyURLList.push("mtree.com");
adremover.keyURLList.push("musiccounter.ru");
adremover.keyURLList.push("muwmedia.com");
adremover.keyURLList.push("myaffiliateprogram.com");
adremover.keyURLList.push("mybloglog.com");
adremover.keyURLList.push("mycounter.ua");
adremover.keyURLList.push("mymoneymakingapp.com");
adremover.keyURLList.push("mypagerank.net");
adremover.keyURLList.push("mypagerank.ru");
adremover.keyURLList.push("mypowermall.com");
adremover.keyURLList.push("mystat-in.net");
adremover.keyURLList.push("mystat.pl");
adremover.keyURLList.push("mytop-in.net");
adremover.keyURLList.push("n69.com");
adremover.keyURLList.push("naiadsystems.com.invalid");
adremover.keyURLList.push("naj.sk");
adremover.keyURLList.push("namimedia.com");
adremover.keyURLList.push("nastydollars.com");
adremover.keyURLList.push("navigator.io");
adremover.keyURLList.push("navrcholu.cz");
adremover.keyURLList.push("nbjmp.com");
adremover.keyURLList.push("ndparking.com");
adremover.keyURLList.push("nedstat.com");
adremover.keyURLList.push("nedstat.nl");
adremover.keyURLList.push("nedstatbasic.net");
adremover.keyURLList.push("nedstatpro.net");
adremover.keyURLList.push("nend.net");
adremover.keyURLList.push("neocounter.neoworx-blog-tools.net");
adremover.keyURLList.push("neoffic.com");
adremover.keyURLList.push("net-filter.com");
adremover.keyURLList.push("netaffiliation.com");
adremover.keyURLList.push("netagent.cz");
adremover.keyURLList.push("netclickstats.com");
adremover.keyURLList.push("netcommunities.com");
adremover.keyURLList.push("netdirect.nl");
adremover.keyURLList.push("netincap.com");
adremover.keyURLList.push("netpool.netbookia.net");
adremover.keyURLList.push("netshelter.net");
adremover.keyURLList.push("network.business.com");
adremover.keyURLList.push("neudesicmediagroup.com");
adremover.keyURLList.push("newads.bangbros.com");
adremover.keyURLList.push("newbie.com");
adremover.keyURLList.push("newnet.qsrch.com");
adremover.keyURLList.push("newnudecash.com");
adremover.keyURLList.push("newopenx.detik.com");
adremover.keyURLList.push("newt.adultadworld.com");
adremover.keyURLList.push("newt.adultworld.com");
adremover.keyURLList.push("newtopsites.com");
adremover.keyURLList.push("ng3.ads.warnerbros.com");
adremover.keyURLList.push("ngs.impress.co.jp");
adremover.keyURLList.push("nitroclicks.com");
adremover.keyURLList.push("novem.pl");
adremover.keyURLList.push("nuggad.net");
adremover.keyURLList.push("numax.nu-.com");
adremover.keyURLList.push("nuseek.com");
adremover.keyURLList.push("oas.benchmark.fr");
adremover.keyURLList.push("oas.foxnews.com");
adremover.keyURLList.push("oas.repubblica.it");
adremover.keyURLList.push("oas.roanoke.com");
adremover.keyURLList.push("oas.salon.com");
adremover.keyURLList.push("oas.toronto.com");
adremover.keyURLList.push("oas.uniontrib.com");
adremover.keyURLList.push("oas.villagevoice.com");
adremover.keyURLList.push("oascentral.businessweek.com");
adremover.keyURLList.push("oascentral.chicagobusiness.com");
adremover.keyURLList.push("oascentral.fortunecity.com");
adremover.keyURLList.push("oascentral.register.com");
adremover.keyURLList.push("oewa.at");
adremover.keyURLList.push("oewabox.at");
adremover.keyURLList.push("offerforge.com");
adremover.keyURLList.push("offermatica.com");
adremover.keyURLList.push("olivebrandresponse.com");
adremover.keyURLList.push("omniture.com");
adremover.keyURLList.push("onclasrv.com");
adremover.keyURLList.push("onclickads.net");
adremover.keyURLList.push("oneandonlynetwork.com");
adremover.keyURLList.push("onenetworkdirect.com");
adremover.keyURLList.push("onestat.com");
adremover.keyURLList.push("onestatfree.com");
adremover.keyURLList.push("onewaylinkexchange.net");
adremover.keyURLList.push("online-metrix.net");
adremover.keyURLList.push("onlinecash.com");
adremover.keyURLList.push("onlinecashmethod.com");
adremover.keyURLList.push("onlinerewardcenter.com");
adremover.keyURLList.push("openad.tf.fr");
adremover.keyURLList.push("openad.travelnow.com");
adremover.keyURLList.push("openads.friendfinder.com");
adremover.keyURLList.push("openads.org");
adremover.keyURLList.push("openx.angelsgroup.org.uk");
adremover.keyURLList.push("openx.blindferret.com");
adremover.keyURLList.push("opienetwork.com");
adremover.keyURLList.push("optimost.com");
adremover.keyURLList.push("optmd.com");
adremover.keyURLList.push("ordingly.com");
adremover.keyURLList.push("ota.cartrawler.com");
adremover.keyURLList.push("otto-images.developershed.com");
adremover.keyURLList.push("outbrain.com");
adremover.keyURLList.push("overture.com");
adremover.keyURLList.push("owebmoney.ru");
adremover.keyURLList.push("oxado.com");
adremover.keyURLList.push("oxcash.com");
adremover.keyURLList.push("oxen.hillcountrytexas.com");
adremover.keyURLList.push("p.adpdx.com");
adremover.keyURLList.push("pagead.l.google.com");
adremover.keyURLList.push("pagefair.com");
adremover.keyURLList.push("pagerank-ranking.com");
adremover.keyURLList.push("pagerank-ranking.de");
adremover.keyURLList.push("pagerank-submitter.de");
adremover.keyURLList.push("pagerank-suchmaschine.de");
adremover.keyURLList.push("pagerank-united.de");
adremover.keyURLList.push("pagerank4you.com");
adremover.keyURLList.push("pageranktop.com");
adremover.keyURLList.push("parse.ly");
adremover.keyURLList.push("parsely.com");
adremover.keyURLList.push("partage-facile.com");
adremover.keyURLList.push("partner-ads.com");
adremover.keyURLList.push("partner.pelikan.cz");
adremover.keyURLList.push("partner.topcities.com");
adremover.keyURLList.push("partnerad.l.google.com");
adremover.keyURLList.push("partnercash.de");
adremover.keyURLList.push("partners.priceline.com");
adremover.keyURLList.push("passion-4.net");
adremover.keyURLList.push("pay-ads.com");
adremover.keyURLList.push("paycounter.com");
adremover.keyURLList.push("paypopup.com");
adremover.keyURLList.push("payserve.com");
adremover.keyURLList.push("pbnet.ru");
adremover.keyURLList.push("pcash.imlive.com");
adremover.keyURLList.push("peep-auktion.de");
adremover.keyURLList.push("peer39.com");
adremover.keyURLList.push("pennyweb.com");
adremover.keyURLList.push("pepperjamnetwork.com");
adremover.keyURLList.push("percentmobile.com");
adremover.keyURLList.push("perf.weborama.fr");
adremover.keyURLList.push("perfectaudience.com");
adremover.keyURLList.push("perfiliate.com");
adremover.keyURLList.push("performancerevenue.com");
adremover.keyURLList.push("performancerevenues.com");
adremover.keyURLList.push("performancing.com");
adremover.keyURLList.push("pgmediaserve.com");
adremover.keyURLList.push("pgpartner.com");
adremover.keyURLList.push("pheedo.com");
adremover.keyURLList.push("phoenix-adrunner.mycomputer.com");
adremover.keyURLList.push("phpadsnew.new.natuurpark.nl");
adremover.keyURLList.push("phpmyvisites.net");
adremover.keyURLList.push("picadmedia.com");
adremover.keyURLList.push("pillscash.com");
adremover.keyURLList.push("pimproll.com");
adremover.keyURLList.push("pixel.adsafeprotected.com");
adremover.keyURLList.push("pixel.jumptap.com");
adremover.keyURLList.push("pixel.redditmedia.com");
adremover.keyURLList.push("planetactive.com");
adremover.keyURLList.push("play4traffic.com");
adremover.keyURLList.push("playhaven.com");
adremover.keyURLList.push("plista.com");
adremover.keyURLList.push("plugrush.com");
adremover.keyURLList.push("pointroll.com");
adremover.keyURLList.push("pop-under.ru");
adremover.keyURLList.push("popads.net");
adremover.keyURLList.push("popub.com");
adremover.keyURLList.push("popunder.ru");
adremover.keyURLList.push("popup.msn.com");
adremover.keyURLList.push("popupmoney.com");
adremover.keyURLList.push("popupnation.com");
adremover.keyURLList.push("popups.infostart.com");
adremover.keyURLList.push("popuptraffic.com");
adremover.keyURLList.push("porngraph.com");
adremover.keyURLList.push("porntrack.com");
adremover.keyURLList.push("postrelease.com");
adremover.keyURLList.push("potenza.cz");
adremover.keyURLList.push("pr-ten.de");
adremover.keyURLList.push("praddpro.de");
adremover.keyURLList.push("prchecker.info");
adremover.keyURLList.push("precisioncounter.com");
adremover.keyURLList.push("predictad.com");
adremover.keyURLList.push("premium-offers.com");
adremover.keyURLList.push("primaryads.com");
adremover.keyURLList.push("primetime.net");
adremover.keyURLList.push("privatecash.com");
adremover.keyURLList.push("pro-advertising.com");
adremover.keyURLList.push("pro.i-doctor.co.kr");
adremover.keyURLList.push("proext.com");
adremover.keyURLList.push("profero.com");
adremover.keyURLList.push("projectwonderful.com");
adremover.keyURLList.push("promo.badoink.com");
adremover.keyURLList.push("promo.ulust.com");
adremover.keyURLList.push("promo.webcams.nl");
adremover.keyURLList.push("promobenef.com");
adremover.keyURLList.push("promos.fling.com");
adremover.keyURLList.push("promote.pair.com");
adremover.keyURLList.push("promotion-campaigns.com");
adremover.keyURLList.push("pronetadvertising.com");
adremover.keyURLList.push("propellerads.com");
adremover.keyURLList.push("proranktracker.com");
adremover.keyURLList.push("proton-tm.com");
adremover.keyURLList.push("protraffic.com");
adremover.keyURLList.push("provexia.com");
adremover.keyURLList.push("prsitecheck.com");
adremover.keyURLList.push("psstt.com");
adremover.keyURLList.push("pub.chez.com");
adremover.keyURLList.push("pub.club-internet.fr");
adremover.keyURLList.push("pub.hardware.fr");
adremover.keyURLList.push("pub.realmedia.fr");
adremover.keyURLList.push("pubdirecte.com");
adremover.keyURLList.push("publicidad.elmundo.es");
adremover.keyURLList.push("pubmatic.com");
adremover.keyURLList.push("pubs.lemonde.fr");
adremover.keyURLList.push("pulse360.com");
adremover.keyURLList.push("q.azcentral.com");
adremover.keyURLList.push("qctop.com");
adremover.keyURLList.push("qnsr.com");
adremover.keyURLList.push("quantcast.com");
adremover.keyURLList.push("quantserve.com");
adremover.keyURLList.push("quarterserver.de");
adremover.keyURLList.push("questaffiliates.net");
adremover.keyURLList.push("quigo.com");
adremover.keyURLList.push("quinst.com");
adremover.keyURLList.push("quisma.com");
adremover.keyURLList.push("rad.msn.com");
adremover.keyURLList.push("radar.cedexis.com");
adremover.keyURLList.push("radarurl.com");
adremover.keyURLList.push("radiate.com");
adremover.keyURLList.push("rampidads.com");
adremover.keyURLList.push("rank-master.com");
adremover.keyURLList.push("rankchamp.de");
adremover.keyURLList.push("ranking-charts.de");
adremover.keyURLList.push("ranking-hits.de");
adremover.keyURLList.push("ranking-id.de");
adremover.keyURLList.push("ranking-links.de");
adremover.keyURLList.push("ranking-liste.de");
adremover.keyURLList.push("ranking-street.de");
adremover.keyURLList.push("rankingchart.de");
adremover.keyURLList.push("rankingscout.com");
adremover.keyURLList.push("rankyou.com");
adremover.keyURLList.push("rapidcounter.com");
adremover.keyURLList.push("rate.ru");
adremover.keyURLList.push("ratings.lycos.com");
adremover.keyURLList.push("rb.design.ru");
adremover.keyURLList.push("re-directme.com");
adremover.keyURLList.push("reachjunction.com");
adremover.keyURLList.push("reactx.com");
adremover.keyURLList.push("readserver.net");
adremover.keyURLList.push("realcastmedia.com");
adremover.keyURLList.push("realclix.com");
adremover.keyURLList.push("realmedia-a800.d4p.net");
adremover.keyURLList.push("realtechnetwork.com");
adremover.keyURLList.push("realtracker.com");
adremover.keyURLList.push("reduxmedia.com");
adremover.keyURLList.push("reduxmediagroup.com");
adremover.keyURLList.push("reedbusiness.com.invalid");
adremover.keyURLList.push("reefaquarium.biz");
adremover.keyURLList.push("referralware.com");
adremover.keyURLList.push("regnow.com");
adremover.keyURLList.push("reinvigorate.net");
adremover.keyURLList.push("reklam.rfsl.se");
adremover.keyURLList.push("reklama.mironet.cz");
adremover.keyURLList.push("reklama.reflektor.cz");
adremover.keyURLList.push("reklamcsere.hu");
adremover.keyURLList.push("reklame.unwired-i.net");
adremover.keyURLList.push("reklamer.com.ua");
adremover.keyURLList.push("relevanz0.de");
adremover.keyURLList.push("relmaxtop.com");
adremover.keyURLList.push("remotead.cnet.com");
adremover.keyURLList.push("republika.onet.pl");
adremover.keyURLList.push("retargeter.com");
adremover.keyURLList.push("revenue.net");
adremover.keyURLList.push("revenuedirect.com");
adremover.keyURLList.push("revsci.net");
adremover.keyURLList.push("revstats.com");
adremover.keyURLList.push("richmails.com");
adremover.keyURLList.push("richmedia.yimg.com");
adremover.keyURLList.push("richwebmaster.com");
adremover.keyURLList.push("rightstats.com");
adremover.keyURLList.push("rlcdn.com");
adremover.keyURLList.push("rle.ru");
adremover.keyURLList.push("rmads.msn.com");
adremover.keyURLList.push("rmedia.boston.com");
adremover.keyURLList.push("roar.com");
adremover.keyURLList.push("robotreplay.com");
adremover.keyURLList.push("roia.biz");
adremover.keyURLList.push("rok.com.com");
adremover.keyURLList.push("rose.ixbt.com");
adremover.keyURLList.push("rotabanner.com");
adremover.keyURLList.push("roxr.net");
adremover.keyURLList.push("rtbpop.com");
adremover.keyURLList.push("rtbpopd.com");
adremover.keyURLList.push("ru-traffic.com");
adremover.keyURLList.push("ru4.com");
adremover.keyURLList.push("rubiconproject.com");
adremover.keyURLList.push("s.adroll.com");
adremover.keyURLList.push("s2d6.com");
adremover.keyURLList.push("sageanalyst.net");
adremover.keyURLList.push("sbx.pagesjaunes.fr");
adremover.keyURLList.push("scambiobanner.aruba.it");
adremover.keyURLList.push("scanscout.com");
adremover.keyURLList.push("scopelight.com");
adremover.keyURLList.push("scorecardresearch.com");
adremover.keyURLList.push("scratch2cash.com");
adremover.keyURLList.push("scripte-monster.de");
adremover.keyURLList.push("searchfeast.com");
adremover.keyURLList.push("searchmarketing.com");
adremover.keyURLList.push("searchramp.com");
adremover.keyURLList.push("secure.webconnect.net");
adremover.keyURLList.push("sedoparking.com");
adremover.keyURLList.push("sedotracker.com");
adremover.keyURLList.push("seeq.com.invalid");
adremover.keyURLList.push("sensismediasmart.com.au");
adremover.keyURLList.push("seo4india.com");
adremover.keyURLList.push("serv0.com");
adremover.keyURLList.push("servedbyadbutler.com");
adremover.keyURLList.push("servedbyopenx.com");
adremover.keyURLList.push("servethis.com");
adremover.keyURLList.push("services.hearstmags.com");
adremover.keyURLList.push("serving-sys.com");
adremover.keyURLList.push("sexaddpro.de");
adremover.keyURLList.push("sexadvertentiesite.nl");
adremover.keyURLList.push("sexcounter.com");
adremover.keyURLList.push("sexinyourcity.com");
adremover.keyURLList.push("sexlist.com");
adremover.keyURLList.push("sextracker.com");
adremover.keyURLList.push("sexystat.com");
adremover.keyURLList.push("shareadspace.com");
adremover.keyURLList.push("shareasale.com");
adremover.keyURLList.push("sharepointads.com");
adremover.keyURLList.push("sher.index.hu");
adremover.keyURLList.push("shinystat.com");
adremover.keyURLList.push("shinystat.it");
adremover.keyURLList.push("shoppingads.com");
adremover.keyURLList.push("siccash.com");
adremover.keyURLList.push("sidebar.angelfire.com");
adremover.keyURLList.push("sinoa.com");
adremover.keyURLList.push("sitemerkezi.net");
adremover.keyURLList.push("sitemeter.com");
adremover.keyURLList.push("sitestat.com");
adremover.keyURLList.push("sixsigmatraffic.com");
adremover.keyURLList.push("skimresources.com");
adremover.keyURLList.push("skylink.vn");
adremover.keyURLList.push("slickaffiliate.com");
adremover.keyURLList.push("slopeaota.com");
adremover.keyURLList.push("smart4ads.com");
adremover.keyURLList.push("smartadserver.com");
adremover.keyURLList.push("smowtion.com");
adremover.keyURLList.push("snapads.com");
adremover.keyURLList.push("snoobi.com");
adremover.keyURLList.push("socialspark.com");
adremover.keyURLList.push("softclick.com.br");
adremover.keyURLList.push("spacash.com");
adremover.keyURLList.push("sparkstudios.com");
adremover.keyURLList.push("specificmedia.co.uk");
adremover.keyURLList.push("specificpop.com");
adremover.keyURLList.push("spezialreporte.de");
adremover.keyURLList.push("spinbox.techtracker.com");
adremover.keyURLList.push("spinbox.versiontracker.com");
adremover.keyURLList.push("sponsorads.de");
adremover.keyURLList.push("sponsorpro.de");
adremover.keyURLList.push("sponsors.thoughtsmedia.com");
adremover.keyURLList.push("spot.fitness.com");
adremover.keyURLList.push("spotxchange.com");
adremover.keyURLList.push("sprinks-clicks.about.com");
adremover.keyURLList.push("spylog.com");
adremover.keyURLList.push("spywarelabs.com");
adremover.keyURLList.push("spywarenuker.com");
adremover.keyURLList.push("spywords.com");
adremover.keyURLList.push("srwww.com");
adremover.keyURLList.push("starffa.com");
adremover.keyURLList.push("start.freeze.com");
adremover.keyURLList.push("stat.cliche.se");
adremover.keyURLList.push("stat.dealtime.com");
adremover.keyURLList.push("stat.dyna.ultraweb.hu");
adremover.keyURLList.push("stat.pl");
adremover.keyURLList.push("stat.su");
adremover.keyURLList.push("stat.tudou.com");
adremover.keyURLList.push("stat.webmedia.pl");
adremover.keyURLList.push("stat.zenon.net");
adremover.keyURLList.push("stat24.com");
adremover.keyURLList.push("stat24.meta.ua");
adremover.keyURLList.push("statcounter.com");
adremover.keyURLList.push("static.fmpub.net");
adremover.keyURLList.push("static.itrack.it");
adremover.keyURLList.push("staticads.btopenworld.com");
adremover.keyURLList.push("statistik-gallup.net");
adremover.keyURLList.push("statm.the-adult-company.com");
adremover.keyURLList.push("stats.blogger.com");
adremover.keyURLList.push("stats.cts-bv.nl");
adremover.keyURLList.push("stats.directnic.com");
adremover.keyURLList.push("stats.hyperinzerce.cz");
adremover.keyURLList.push("stats.mirrorfootball.co.uk");
adremover.keyURLList.push("stats.olark.com");
adremover.keyURLList.push("stats.suite0.com");
adremover.keyURLList.push("stats.surfaid.ihost.com");
adremover.keyURLList.push("stats.townnews.com");
adremover.keyURLList.push("stats.unwired-i.net");
adremover.keyURLList.push("stats.wordpress.com");
adremover.keyURLList.push("stats.x4.eu");
adremover.keyURLList.push("stats4all.com");
adremover.keyURLList.push("statsie.com");
adremover.keyURLList.push("statxpress.com");
adremover.keyURLList.push("steelhouse.com");
adremover.keyURLList.push("steelhousemedia.com");
adremover.keyURLList.push("stickyadstv.com");
adremover.keyURLList.push("suavalds.com");
adremover.keyURLList.push("subscribe.hearstmags.com");
adremover.keyURLList.push("sugoicounter.com");
adremover.keyURLList.push("superclix.de");
adremover.keyURLList.push("superstats.com");
adremover.keyURLList.push("supertop.ru");
adremover.keyURLList.push("supertop00.com");
adremover.keyURLList.push("suptullog.com");
adremover.keyURLList.push("surfmusik-adserver.de");
adremover.keyURLList.push("swan-swan-goose.com");
adremover.keyURLList.push("swissadsolutions.com");
adremover.keyURLList.push("swordfishdc.com");
adremover.keyURLList.push("sx.trhnt.com");
adremover.keyURLList.push("t.insigit.com");
adremover.keyURLList.push("t.pusk.ru");
adremover.keyURLList.push("taboola.com");
adremover.keyURLList.push("tacoda.net");
adremover.keyURLList.push("tagular.com");
adremover.keyURLList.push("tailsweep.co.uk");
adremover.keyURLList.push("tailsweep.com");
adremover.keyURLList.push("tailsweep.se");
adremover.keyURLList.push("takru.com");
adremover.keyURLList.push("tangerinenet.biz");
adremover.keyURLList.push("tapad.com");
adremover.keyURLList.push("targad.de");
adremover.keyURLList.push("targetingnow.com");
adremover.keyURLList.push("targetnet.com");
adremover.keyURLList.push("targetpoint.com");
adremover.keyURLList.push("tatsumi-sys.jp");
adremover.keyURLList.push("tcads.net");
adremover.keyURLList.push("techclicks.net");
adremover.keyURLList.push("teenrevenue.com");
adremover.keyURLList.push("teliad.de");
adremover.keyURLList.push("text-link-ads.com");
adremover.keyURLList.push("textad.sexsearch.com");
adremover.keyURLList.push("textads.biz");
adremover.keyURLList.push("textads.opera.com");
adremover.keyURLList.push("textlinks.com");
adremover.keyURLList.push("tfag.de");
adremover.keyURLList.push("theadhost.com");
adremover.keyURLList.push("theads.me");
adremover.keyURLList.push("thebugs.ws");
adremover.keyURLList.push("thecounter.com");
adremover.keyURLList.push("therapistla.com");
adremover.keyURLList.push("therichkids.com");
adremover.keyURLList.push("thrnt.com");
adremover.keyURLList.push("thruport.com");
adremover.keyURLList.push("tinybar.com");
adremover.keyURLList.push("tizers.net");
adremover.keyURLList.push("tlvmedia.com");
adremover.keyURLList.push("tntclix.co.uk");
adremover.keyURLList.push("top-casting-termine.de");
adremover.keyURLList.push("top-site-list.com");
adremover.keyURLList.push("top.list.ru");
adremover.keyURLList.push("top.mail.ru");
adremover.keyURLList.push("top.proext.com");
adremover.keyURLList.push("top00-images.rambler.ru");
adremover.keyURLList.push("top00.mafia.ru");
adremover.keyURLList.push("top23.ro");
adremover.keyURLList.push("top20.com");
adremover.keyURLList.push("top20free.com");
adremover.keyURLList.push("top90.ro");
adremover.keyURLList.push("topbarh.box.sk");
adremover.keyURLList.push("topblogarea.se");
adremover.keyURLList.push("topbucks.com");
adremover.keyURLList.push("topforall.com");
adremover.keyURLList.push("topgamesites.net");
adremover.keyURLList.push("toplist.cz");
adremover.keyURLList.push("toplist.pornhost.com");
adremover.keyURLList.push("toplista.mw.hu");
adremover.keyURLList.push("toplistcity.com");
adremover.keyURLList.push("topmmorpgsites.com");
adremover.keyURLList.push("topping.com.ua");
adremover.keyURLList.push("toprebates.com");
adremover.keyURLList.push("topsafelist.net");
adremover.keyURLList.push("topsearcher.com");
adremover.keyURLList.push("topsir.com");
adremover.keyURLList.push("topsite.lv");
adremover.keyURLList.push("topsites.com.br");
adremover.keyURLList.push("topstats.com");
adremover.keyURLList.push("totemcash.com");
adremover.keyURLList.push("touchclarity.com");
adremover.keyURLList.push("touchclarity.natwest.com");
adremover.keyURLList.push("tour.brazzers.com");
adremover.keyURLList.push("tpnads.com");
adremover.keyURLList.push("track.adform.net");
adremover.keyURLList.push("track.anchorfree.com");
adremover.keyURLList.push("track.gawker.com");
adremover.keyURLList.push("trackalyzer.com");
adremover.keyURLList.push("tracker.icerocket.com");
adremover.keyURLList.push("tracker.marinsm.com");
adremover.keyURLList.push("tracking.crunchiemedia.com");
adremover.keyURLList.push("tracking.gajmp.com");
adremover.keyURLList.push("tracking.internetstores.de");
adremover.keyURLList.push("tracking.yourfilehost.com");
adremover.keyURLList.push("tracking0.com");
adremover.keyURLList.push("trackingsoft.com");
adremover.keyURLList.push("trackmysales.com");
adremover.keyURLList.push("tradeadexchange.com");
adremover.keyURLList.push("tradedoubler.com");
adremover.keyURLList.push("traffic-exchange.com");
adremover.keyURLList.push("traffic.liveuniversenetwork.com");
adremover.keyURLList.push("trafficadept.com");
adremover.keyURLList.push("trafficcdn.liveuniversenetwork.com");
adremover.keyURLList.push("trafficfactory.biz");
adremover.keyURLList.push("trafficholder.com");
adremover.keyURLList.push("traffichunt.com");
adremover.keyURLList.push("trafficjunky.net");
adremover.keyURLList.push("trafficleader.com");
adremover.keyURLList.push("trafficsecrets.com");
adremover.keyURLList.push("trafficspaces.net");
adremover.keyURLList.push("trafficstrategies.com");
adremover.keyURLList.push("trafficswarm.com");
adremover.keyURLList.push("traffictrader.net");
adremover.keyURLList.push("trafficz.com");
adremover.keyURLList.push("trafficz.net");
adremover.keyURLList.push("traffiq.com");
adremover.keyURLList.push("trafic.ro");
adremover.keyURLList.push("travis.bosscasinos.com");
adremover.keyURLList.push("trekblue.com");
adremover.keyURLList.push("trekdata.com");
adremover.keyURLList.push("trendcounter.com");
adremover.keyURLList.push("trhunt.com");
adremover.keyURLList.push("tribalfusion.com");
adremover.keyURLList.push("trix.net");
adremover.keyURLList.push("truehits.net");
adremover.keyURLList.push("truehits.gits.net.th");
adremover.keyURLList.push("truehits2.gits.net.th");
adremover.keyURLList.push("tsms-ad.tsms.com");
adremover.keyURLList.push("tubemogul.com");
adremover.keyURLList.push("turn.com");
adremover.keyURLList.push("tvmtracker.com");
adremover.keyURLList.push("twittad.com");
adremover.keyURLList.push("tyroo.com");
adremover.keyURLList.push("uarating.com");
adremover.keyURLList.push("ukbanners.com");
adremover.keyURLList.push("ultramercial.com");
adremover.keyURLList.push("unanimis.co.uk");
adremover.keyURLList.push("untd.com");
adremover.keyURLList.push("updated.com");
adremover.keyURLList.push("urlcash.net");
adremover.keyURLList.push("us.a.yimg.com");
adremover.keyURLList.push("usapromotravel.com");
adremover.keyURLList.push("usmsad.tom.com");
adremover.keyURLList.push("utarget.co.uk");
adremover.keyURLList.push("utils.mediageneral.net");
adremover.keyURLList.push("v.cnzz.com");
adremover.keyURLList.push("validclick.com");
adremover.keyURLList.push("valuead.com");
adremover.keyURLList.push("valueclick.com");
adremover.keyURLList.push("valueclickmedia.com");
adremover.keyURLList.push("valuecommerce.com");
adremover.keyURLList.push("valuesponsor.com");
adremover.keyURLList.push("veille-referencement.com");
adremover.keyURLList.push("ventivmedia.com");
adremover.keyURLList.push("vericlick.com");
adremover.keyURLList.push("vertadnet.com");
adremover.keyURLList.push("veruta.com");
adremover.keyURLList.push("vervewireless.com");
adremover.keyURLList.push("vibrantmedia.com");
adremover.keyURLList.push("video-stats.video.google.com");
adremover.keyURLList.push("videoegg.com");
adremover.keyURLList.push("view4cash.de");
adremover.keyURLList.push("viewpoint.com");
adremover.keyURLList.push("visistat.com");
adremover.keyURLList.push("visit.webhosting.yahoo.com");
adremover.keyURLList.push("visitbox.de");
adremover.keyURLList.push("visual-pagerank.fr");
adremover.keyURLList.push("visualrevenue.com");
adremover.keyURLList.push("voicefive.com");
adremover.keyURLList.push("vpon.com");
adremover.keyURLList.push("vrs.cz");
adremover.keyURLList.push("vs.tucows.com");
adremover.keyURLList.push("vungle.com");
adremover.keyURLList.push("wads.webteh.com");
adremover.keyURLList.push("warlog.ru");
adremover.keyURLList.push("wdads.sx.atl.publicus.com");
adremover.keyURLList.push("web-stat.com");
adremover.keyURLList.push("web.informer.com");
adremover.keyURLList.push("web2.deja.com");
adremover.keyURLList.push("webads.co.nz");
adremover.keyURLList.push("webads.nl");
adremover.keyURLList.push("webangel.ru");
adremover.keyURLList.push("webcash.nl");
adremover.keyURLList.push("webcounter.cz");
adremover.keyURLList.push("webcounter.goweb.de");
adremover.keyURLList.push("webgains.com");
adremover.keyURLList.push("webmaster-partnerprogramme24.de");
adremover.keyURLList.push("webmasterplan.com");
adremover.keyURLList.push("webmasterplan.de");
adremover.keyURLList.push("weborama.fr");
adremover.keyURLList.push("webpower.com");
adremover.keyURLList.push("webreseau.com");
adremover.keyURLList.push("webseoanalytics.com");
adremover.keyURLList.push("websponsors.com");
adremover.keyURLList.push("webstat.channel4.com");
adremover.keyURLList.push("webstat.com");
adremover.keyURLList.push("webstat.net");
adremover.keyURLList.push("webstats4u.com");
adremover.keyURLList.push("webtrackerplus.com");
adremover.keyURLList.push("webtraffic.se");
adremover.keyURLList.push("webtraxx.de");
adremover.keyURLList.push("webtrendslive.com");
adremover.keyURLList.push("wegcash.com");
adremover.keyURLList.push("werbung.meteoxpress.com");
adremover.keyURLList.push("wetrack.it");
adremover.keyURLList.push("whaleads.com");
adremover.keyURLList.push("whenu.com");
adremover.keyURLList.push("whispa.com");
adremover.keyURLList.push("whoisonline.net");
adremover.keyURLList.push("wholesaletraffic.info");
adremover.keyURLList.push("widespace.com");
adremover.keyURLList.push("widgetbucks.com");
adremover.keyURLList.push("wikia-ads.wikia.com");
adremover.keyURLList.push("window.nixnet.cz");
adremover.keyURLList.push("wintricksbanner.googlepages.com");
adremover.keyURLList.push("witch-counter.de");
adremover.keyURLList.push("wlmarketing.com");
adremover.keyURLList.push("wmirk.ru");
adremover.keyURLList.push("wonderlandads.com");
adremover.keyURLList.push("wondoads.de");
adremover.keyURLList.push("woopra.com");
adremover.keyURLList.push("worldwide-cash.net");
adremover.keyURLList.push("wtlive.com");
adremover.keyURLList.push("www-banner.chat.ru");
adremover.keyURLList.push("www-google-analytics.l.google.com");
adremover.keyURLList.push("www.banner-link.com.br");
adremover.keyURLList.push("www.dnps.com");
adremover.keyURLList.push("www.kaplanindex.com");
adremover.keyURLList.push("www.money4exit.de");
adremover.keyURLList.push("www.photo-ads.co.uk");
adremover.keyURLList.push("www.gto-media.com");
adremover.keyURLList.push("www8.glam.com");
adremover.keyURLList.push("x-traceur.com");
adremover.keyURLList.push("x6.yakiuchi.com");
adremover.keyURLList.push("xchange.ro");
adremover.keyURLList.push("xclicks.net");
adremover.keyURLList.push("xertive.com");
adremover.keyURLList.push("xg4ken.com");
adremover.keyURLList.push("xiti.com");
adremover.keyURLList.push("xplusone.com");
adremover.keyURLList.push("xponsor.com");
adremover.keyURLList.push("xq.net");
adremover.keyURLList.push("xrea.com");
adremover.keyURLList.push("xtendmedia.com");
adremover.keyURLList.push("xtremetop00.com");
adremover.keyURLList.push("xxxcounter.com");
adremover.keyURLList.push("xxxmyself.com");
adremover.keyURLList.push("y.ibsys.com");
adremover.keyURLList.push("yab-adimages.s3.amazonaws.com");
adremover.keyURLList.push("yabuka.com");
adremover.keyURLList.push("yadro.ru");
adremover.keyURLList.push("yesads.com");
adremover.keyURLList.push("yesadvertising.com");
adremover.keyURLList.push("yieldads.com");
adremover.keyURLList.push("yieldlab.net");
adremover.keyURLList.push("yieldmanager.com");
adremover.keyURLList.push("yieldmanager.net");
adremover.keyURLList.push("yieldmo.com");
adremover.keyURLList.push("yieldtraffic.com");
adremover.keyURLList.push("yoc.mobi");
adremover.keyURLList.push("yoggrt.com");
adremover.keyURLList.push("z5x.net");
adremover.keyURLList.push("zangocash.com");
adremover.keyURLList.push("zanox-affiliate.de");
adremover.keyURLList.push("zanox.com");
adremover.keyURLList.push("zantracker.com");
adremover.keyURLList.push("zedo.com");
adremover.keyURLList.push("zencudo.co.uk");
adremover.keyURLList.push("zenkreka.com");
adremover.keyURLList.push("zenzuu.com");
adremover.keyURLList.push("zeus.developershed.com");
adremover.keyURLList.push("zeusclicks.com");
adremover.keyURLList.push("zintext.com");
adremover.keyURLList.push("zmedia.com");
adremover.keyURLList.push("zv.november-lax.com");
},
initInPagePopups: function() {
	adremover.keyInPagePopupList.push("adflad.*");
	adremover.keyInPagePopupList.push("sponsorads.*");
},
initBlacklistPopups: function() {
	adremover.keyPopupList.push("http://www.*mpnrs.com/");
	adremover.keyPopupList.push("sunmaker.com/.*/home.html?a_aid=.*&chan=");
	adremover.keyPopupList.push("32d1d3b9c.se/?placement=");
	adremover.keyPopupList.push("http://cdn.anyoption.com/landing.shtml");
	adremover.keyPopupList.push("http://www.adcash.com/script/pop_pack");
	adremover.keyPopupList.push("ih.adscale.de/adscale-ih/show");
},
removeNormalElement: function(anElement) {
	var acChildren;
	if (anElement) {
		anElement.style.display="none";
		for (var i = 0;i<anElement.children.length;i++) {
			acChildren = anElement.children[i];
			if (acChildren) {
				if  (acChildren.nodeName && (acChildren.nodeName=="IFRAME" || acChildren.nodeName=="OBJECT" || acChildren.nodeName=="EMBED")) {
					adremover.handleIframe(acChildren);
					adremover.removedObjects++;
				}
			}
		}
	}
	adremover.removedElementsArray.push(anElement);
},
removeElements: function() {
	var acEl, acElId, acElClass, acElNodeName, acElSrc, setRemoved;
	for (var i = 0;i<document.getElementsByTagName("*").length;i++) {
		setRemoved = false;
		acEl = document.getElementsByTagName("*")[i];
		if (acEl) {
			acElNodeName = acEl.nodeName;
			//ID and Class check
			if (acElNodeName=="DIV" || acElNodeName=="IFRAME" || acElNodeName=="IMG" || acElNodeName=="A" || acElNodeName=="OBJECT" || acElNodeName=="P" || acElNodeName=="SECTION") {
				if (acEl.getAttribute("id")) {
					acElId = acEl.getAttribute("id").toLowerCase();
				} else {
					acElId="";
				}
				if (acEl.className) {
					if (acEl.className.baseVal) {
						acElClass = acEl.className.baseVal.toString().toLowerCase();
					} else if (acEl.className) {
						acElClass = acEl.className.toLowerCase();
					} else {
						acElClass = "";
					}
				} else {
					acElClass = "";
				}
				if (setRemoved==false && adremover.testForForbiddenKeywords(acElClass)==false && adremover.testForForbiddenKeywords(acElId)==false) {
					if (acElId.search(adremover.regexp_adsearch)>-1) {
						setRemoved = true;
						adremover.removeNormalElement(acEl);
						adremover.removedElements++;
					}
					//Class name check
					if (setRemoved==false && acElClass.search(adremover.regexp_adsearch)>-1) {
						setRemoved = true;
						adremover.removeNormalElement(acEl);
						adremover.removedElements++;
					}
					//Special inpage popup check
					if (acElId.search(adremover.regexp_inpagepopupsearch)>-1) {
						adremover.removedSpecialPopups++;
						adremover.removedSpecialPopupsArray.push(acElId);
						acEl.setRemoved = true;
						acEl.outerHTML = "";
						console.log("Removed a special popup!");
					}
				}
			}
			//Iframe and object
			if (adremover.AR_objects_activated==true && (acElNodeName=="IFRAME" || acElNodeName=="OBJECT" || acElNodeName=="EMBED")) {
				acElSrc = acEl.getAttribute("src");
				if (acElSrc) {
					acElSrc = acElSrc.toLowerCase();
					if (acElSrc.search(adremover.regexp_iframesearch)>-1) {
						adremover.handleIframe(acEl);
						setRemoved = true;
						adremover.removedObjects++;
					}
				}
			}
			//image check
			if (adremover.AR_images_activated==true && acElNodeName=="IMG") {
				acElSrc = acEl.getAttribute("src");
				if (acElSrc) {
					acElSrc = acElSrc.toLowerCase();
					if (acElSrc.search(adremover.regexp_iframesearch)>-1) {
						adremover.removedImagesArray.push(acEl);
						acEl.style.display="none";
						setRemoved = true;
						adremover.removedImages++;
					} else {
						var filename = acElSrc.substring(acElSrc.lastIndexOf("/"));
						if (filename.search(adremover.regexp_adsearch)>-1 && adremover.testForForbiddenKeywords(filename)==false) {
							adremover.removedImagesArray.push(acEl);
							acEl.style.display="none";
							setRemoved = true;
							adremover.removedImages++;
						}
					}
				}
			}
		}
	}
},
removePlaceholders: function() {
	var firstRemoved = false;
	for (var i = 0;i<adremover.removedElementsArray.length;i++)  {
		if (adremover.removedElementsArray[i].parentNode!=null && adremover.removedElementsArray[i].parentNode.nodeName!="BODY") {
			if (adremover.removedElementsArray[i].parentNode.children.length==1) {
				adremover.removedElementsArray[i].parentNode.style.display="none";
				adremover.removedPlaceholdersArray.push(adremover.removedElementsArray[i].parentNode);
				adremover.removedPlaceholders++;
				firstRemoved = true;
			}
			if (adremover.removedElementsArray[i].parentNode.parentNode!=null  && adremover.removedElementsArray[i].parentNode.parentNode.nodeName!="BODY") {
				if (adremover.removedElementsArray[i].parentNode.parentNode.children.length==1 && firstRemoved==true) {
						adremover.removedElementsArray[i].parentNode.parentNode.style.display="none";
						adremover.removedPlaceholdersArray.push(adremover.removedElementsArray[i].parentNode.parentNode);
						adremover.removedPlaceholders++;
				}
			}
		}
		firstRemoved = false;
	}
	for (var j = 0;j<adremover.removedImagesArray.length;j++)  {
		if (adremover.removedImagesArray[j].parentNode!=null) {
			if (adremover.removedImagesArray[j].parentNode.children.length==1 && adremover.removedImagesArray[j].parentNode.nodeName!="BODY") {
				adremover.removedImagesArray[j].parentNode.style.display="none";
				adremover.removedPlaceholdersArray.push(adremover.removedImagesArray[j].parentNode);
				adremover.removedPlaceholders++;
				firstRemoved = true;
			}
			if (adremover.removedImagesArray[j].parentNode.parentNode!=null && adremover.removedImagesArray[j].parentNode.parentNode.nodeName!="BODY") {
				if (adremover.removedImagesArray[j].parentNode.parentNode.children.length==1 && firstRemoved==true) {
						adremover.removedImagesArray[j].parentNode.parentNode.style.display="none";
						adremover.removedPlaceholdersArray.push(adremover.removedImagesArray[j].parentNode.parentNode);
						adremover.removedPlaceholders++;
				}
			}
		}
		firstRemoved = false;
	}
},
createPopup: function() {
	//getting information about removed elements
	var string2 = "";
	for (var h = 0;h<adremover.removedSpecialPopupsArray.length;h++) {
		string2+="Special Popup [id="+adremover.removedSpecialPopupsArray[h]+"]<br>";
	}
	for (var i = 0;i<adremover.removedElementsArray.length;i++) {
		if (adremover.removedElementsArray[i]!=null) {
			string2+=adremover.removedElementsArray[i].tagName+" [class="+adremover.removedElementsArray[i].className+"] [id="+adremover.removedElementsArray[i].getAttribute("id")+"]<br>";
		}
	}
	for (var j = 0;j<adremover.removedImagesArray.length;j++) {
		if (adremover.removedImagesArray[j]!=null) {
			string2+=adremover.removedImagesArray[j].tagName+" [class="+adremover.removedImagesArray[j].className+"] [id="+adremover.removedImagesArray[j].getAttribute("id")+"] [src="+adremover.removedImagesArray[j].getAttribute("src")+"]<br>";
		}
	}
	for (var k = 0;k<adremover.removedObjectsArray.length;k++) {
		string2+="Iframe/Object [src="+adremover.removedObjectsArray[k]+"]<br>";
	}
	for (var l = 0;l<adremover.removedPlaceholdersArray.length;l++) {
		string2+="PH: "+adremover.removedPlaceholdersArray[l].tagName+" [class="+adremover.removedPlaceholdersArray[l].className+"] [id="+adremover.removedPlaceholdersArray[l].getAttribute("id")+"]<br>";
	}
	//Create popup
	document.getElementsByTagName("body")[0].appendChild(document.createElement("adremoverpopup"));
	var adpopup = document.getElementsByTagName("adremoverpopup")[0];
	var left = (window.innerWidth - 500) / 2;
	var top = (window.innerHeight - 350) / 2;
	adpopup.style.top=top + "px";
	adpopup.style.left=left + "px";
	adpopup.style.background="rgba(200,200,200,0.9)";
	adpopup.style.border="1px black solid";
	adpopup.style.position="fixed";
	adpopup.style.fontFamily="Arial";
	adpopup.style.lineHeight="17px";
	adpopup.style.display="block";
	adpopup.style.width="500px";
	adpopup.style.height="350px";
	adpopup.style.zIndex="999999999999";
	adpopup.style.borderRadius="3px";
	adpopup.style.transition="opacity 0.2s ease";
	adpopup.style.textAlign="left";
	adpopup.style.paddingLeft="5px";
	adpopup.style.overflow="scroll";
	adpopup.style.color="black";
	adpopup.style.boxShadow="0px 0px 2px 3px rgba(0,0,0,0.5)";
	adpopup.style.opacity="1";
	var string1 = "<span style='left:-1px;background:rgb(245,233,237);width:97%;margin-left:0px;position:absolute;padding:7px;font-family:Arial;font-size:16px;font-weight:bold;color:black;'>AdRemover " + adremover.thisScriptVersion +"</span>";
	string1+="<br><br>";
	string1+="<span style='background-color:rgba(118,105,199,0.7);color:white;font-weight:bold;font-famliy:Arial;width:50%;border-radius:3px;padding:1px;position:absolute;'>Status</span><br>";
	string1+="Runtime: "+adremover.AR_milliseconds+" ms";
	string1+="<br>"+adremover.labelTextes[0]+": "+(adremover.removedElements+adremover.removedObjects+adremover.removedImages);
	string1+="<br>"+adremover.labelTextes[1]+": "+adremover.removedElements;
	string1+="<br>"+adremover.labelTextes[2]+": "+adremover.removedImages;
	string1+="<br>"+adremover.labelTextes[3]+": "+adremover.removedObjects;
	string1+="<br>"+adremover.labelTextes[17]+": "+adremover.removedPlaceholders;
	string1+="<br><input type=button value='"+adremover.labelTextes[5]+"' onclick=adremover.closePopup();>";
	string1+="<br><br>";
	string1+="<span style='background-color:rgba(118,105,199,0.7);color:white;font-weight:bold;font-family:Arial;width:50%;border-radius:3px;padding:1px;position:absolute;'>Extras</span><br>";
	string1+="<input type=button value='"+adremover.labelTextes[6]+"' onclick=adremover.restoreAds(this);><br>";
	string1+="<input onchange=adremover.changeBlacklist(this); type=checkbox";
	if (adremover.checkForBlacklist(document.location.host)==false) {
		string1+=" checked";
	}	
	string1+="> "+adremover.labelTextes[7];
	string1+="<br><br>";
	string1+="<span style='background-color:rgba(118,105,199,0.7);color:white;font-weight:bold;font-famliy:Arial;width:50%;border-radius:3px;padding:1px;position:absolute;'>"+adremover.labelTextes[8]+"</span><br>";
	string1+="<input onclick=adremover.setAR_elements_activated(this); type=checkbox";
	if (adremover.AR_elements_activated==true) {
		string1+=" checked";
	}
	string1+="> "+adremover.labelTextes[9]+"<br>";
	string1+="<input onclick=adremover.setAR_images_activated(this); type=checkbox";
	if (adremover.AR_images_activated==true) {
		string1+=" checked";
	}
	string1+="> "+adremover.labelTextes[10]+"<br>";
	string1+="<input onclick=adremover.setAR_objects_activated(this); type=checkbox";
	if (adremover.AR_objects_activated==true) {
		string1+=" checked";
	}
	string1+="> "+adremover.labelTextes[11]+"<br>";
	string1+="<input onclick=adremover.setAR_placeholders_activated(this); type=checkbox";
	if (adremover.AR_placeholders_activated==true) {
		string1+=" checked";
	}
	string1+="> "+adremover.labelTextes[12]+"<br>";
	string1+="<input onclick=adremover.setAR_minimode_activated(this); type=checkbox";
	if (adremover.AR_minimode_activated==true) {
		string1+=" checked";
	}
	string1+="> "+adremover.labelTextes[20]+"<br>";
	string1+="<br>";
	string1+="<span style='background-color:rgba(118,105,199,0.7);color:white;font-weight:bold;font-famliy:Arial;width:50%;border-radius:3px;padding:1px;position:absolute;'>"+adremover.labelTextes[18]+"</span><br>";
	string1+=adremover.labelTextes[19]+": ich01";
	string1+="<br>Homepage: <a href=http://userscripts.org/scripts/show/159351 target=_blank alt=Homepage>*click*</a>";
	string1+="<br>Copyright: 2014+, ich01";
	string1+="<br><br>";
	string1+="<span style='background-color:rgba(118,105,199,0.7);color:white;font-weight:bold;font-famliy:Arial;width:50%;border-radius:3px;padding:1px;position:absolute;'>Details</span><br>";
	string1+=string2;
	adpopup.innerHTML=string1;
},
startCleaning: function() {
	if (adremover.AR_elements_activated==true) {
		adremover.removeElements();
	}
	if (adremover.AR_placeholders_activated==true) {
		adremover.removePlaceholders();
	}
	if (adremover.removedElements>0 || adremover.removedObjects>0 || adremover.removedImages>0) {
		if (adremover.AR_minimode_activated==false) {
			adremover.createInfoElement();
		} else {
			adremover.createMiniInfoElement();
		}
	}
},
closePopup: function() {
	var adpopup = document.getElementsByTagName("adremoverpopup")[0];
	adpopup.style.opacity="0";
	setTimeout("adremover.closePopup2()", 300);
},
closePopup2: function() {
	var adpopup = document.getElementsByTagName("adremoverpopup")[0];
	adpopup.style.display="none";
	adpopup.outerHTML="";
},
setAR_elements_activated: function(formelement) {
	if (formelement.checked==true) {
		GM_setValue("AR_elements_activated",true);
	} else if (formelement.checked==false) {
		GM_setValue("AR_elements_activated",false);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
setAR_images_activated: function(formelement) {
	if (formelement.checked==true) {
		GM_setValue("AR_images_activated",true);
	} else if (formelement.checked==false) {
		GM_setValue("AR_images_activated",false);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
setAR_objects_activated: function(formelement) {
	if (formelement.checked==true) {
		GM_setValue("AR_objects_activated",true);
	} else if (formelement.checked==false) {
		GM_setValue("AR_objects_activated",false);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
setAR_placeholders_activated: function(formelement) {
	if (formelement.checked==true) {
		GM_setValue("AR_placeholders_activated",true);
	} else if (formelement.checked==false) {
		GM_setValue("AR_placeholders_activated",false);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
setAR_minimode_activated: function(formelement) {
	if (formelement.checked==true) {
		GM_setValue("AR_minimode_activated",true);
	} else if (formelement.checked==false) {
		GM_setValue("AR_minimode_activated",false);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
getARSettings: function() {
	//Elements
	if (GM_getValue("AR_elements_activated")!=null && GM_getValue("AR_elements_activated")!=undefined) {
		adremover.AR_elements_activated = GM_getValue("AR_elements_activated");
	} else {
		GM_setValue("AR_elements_activated",true);
		adremover.AR_elements_activated = true;
	}
	//Objects
	if (GM_getValue("AR_objects_activated")!=null && GM_getValue("AR_objects_activated")!=undefined) {
		adremover.AR_objects_activated = GM_getValue("AR_objects_activated");
	} else {
		GM_setValue("AR_objects_activated",true);
		adremover.AR_objects_activated = true;
	}
	//Images
	if (GM_getValue("AR_images_activated")!=null && GM_getValue("AR_images_activated")!=undefined) {
		adremover.AR_images_activated = GM_getValue("AR_images_activated");
	} else {
		GM_setValue("AR_images_activated",true);
		adremover.AR_images_activated = true;
	}
	//Placeholders
	if (GM_getValue("AR_placeholders_activated")!=null && GM_getValue("AR_placeholders_activated")!=undefined) {
		adremover.AR_placeholders_activated = GM_getValue("AR_placeholders_activated");
	} else {
		GM_setValue("AR_placeholders_activated",true);
		adremover.AR_placeholder_activated = true;
	}
	//Mini Info enabled
	if (GM_getValue("AR_minimode_activated")!=null && GM_getValue("AR_minimode_activated")!=undefined) {
		adremover.AR_minimode_activated = GM_getValue("AR_minimode_activated");
	} else {
		GM_setValue("AR_minimode_actived",false);
		adremover.AR_minimode_activated = false;
	}
},
restoreAds: function(formelement) {
	var restoredElements = 0;
	for (var i = 0;i<adremover.removedElementsArray.length;i++) {
		if	(adremover.removedElementsArray[i]!=null) {
			adremover.removedElementsArray[i].style.display="block";
			restoredElements++;
		}
	}
	for (var j = 0;j<adremover.removedImagesArray.length;j++) {
		if (adremover.removedImagesArray[j]!=null) {
			adremover.removedImagesArray[j].style.display="block";
			restoredElements++;
		}
	}
	for (var k = 0;k<adremover.removedPlaceholdersArray.length;k++) {
		if (adremover.removedPlaceholdersArray[k]!=null) {
			adremover.removedPlaceholdersArray[k].style.display="block";
			restoredElements++;
		}
	}
	console.log("Restored "+restoredElements+" elements");
	formelement.value=adremover.labelTextes[13];
	formelement.disabled=true;
}
};
//Init AdRemover
if (navigator.userAgent.toLowerCase().indexOf("firefox")>-1) {
		window.adremover = uw.adremover;
		console.log("Firefox detected. Compatibility mode enabled.");
}
adremover.initAdremover();
var endTime = new Date().getMilliseconds();
var endTimeSeconds = new Date().getSeconds();
var fullTime = -1;
fullTime = endTime - adremover.startTime;
fullTime+= ((endTimeSeconds-adremover.startTimeSeconds)*1000);
GM_registerMenuCommand("AdRemover Settings",function() {adremover.createPopup();});
adremover.AR_milliseconds=fullTime;
console.log("AdRemover "+adremover.thisScriptVersion+" has finished it's work! ["+fullTime+" ms]");
setTimeout("adremover.secondRun()",4000);
