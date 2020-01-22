function getChildren(element) {
	var arrayChildren = new Array();
	var childrenElement = element.children;
	for (var i = 0; i < childrenElement.length; i++) {
		if (childrenElement[i].className == 'treeItem') {
			arrayChildren.push(childrenElement[i]);
		}
	}
	return arrayChildren;
}
function build(element, position) {
	var varChildren = getChildren(element);
	for (var i = 0; i < varChildren.length; i++) {
		position.push(i);
		var positionJoin=position.join('');
		varChildren[i].id = "treeItemID"+positionJoin;
		var childTree = varChildren[i].getElementsByClassName("treeItemBody")[0].getElementsByClassName("tree")[0];
		if (childTree !== undefined) {
			build(childTree, position);
		}
		position.pop();
	}
}
function closeAll() {
	var tree = document.getElementById("tree-base");
	var treeItems = tree.getElementsByClassName("treeItem");
	for (var i = 0; i < treeItems.length; i++) {
		treeItems[i].className = 'treeItem hide';
	}
}
function open(position) {
	var openItem = "";
	for (var i = 0; i < position.length; i++) {
		openItem += position[i];
		document.getElementById("treeItemID" + openItem).className = 'treeItem';
	}
}
function toggle() {
	var position = this.parentNode.id.substring(10).split("");
	var className = this.parentNode.className;
	closeAll();
	if (className == 'treeItem hide') {
		open(position);
	} else {
		position.pop();
		open(position);
	}
}
function goTo(position) {
	closeAll();
	open(position);
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function startPosition() {
	var shortUrl = getParameterByName('s');
	var patternTest = /\w\w\w/.test(shortUrl);
	var keyTest = Object.keys(shortUrls).indexOf(shortUrl) >= 0;
	if (!!shortUrls && !!shortUrl && patternTest && keyTest) {
		goTo(shortUrls[shortUrl]);
	} else {
		goTo([0]);
	}
}
function redirect() {
	var redirectUrl = getParameterByName('r');
	var keyTest = Object.keys(redirectUrls).indexOf(redirectUrl) >= 0;
	if (!!redirectUrls && !!redirectUrl && keyTest) {
		window.location.href = window.location.protocol + "//" + window.location.host + "/" + redirectUrls[redirectUrl]
	}
}
function initialisation() {
	var tree = document.getElementById("tree-base");
	var position = new Array();
	build(tree, position);
	var treeItems = tree.getElementsByClassName("treeItem");
	for (var i = 0; i < treeItems.length; i++) {
		treeItems[i].className = "treeItem hide";
		var treeItemTitle = treeItems[i].getElementsByClassName("treeItemTitle")[0];
		treeItemTitle.onclick = toggle;
	}
	tree.style.visibility = "visible";
}
function onload() {
	redirect();
	initialisation();
	startPosition();
}