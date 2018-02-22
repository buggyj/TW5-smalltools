/*\
title: $:/bj/modules/macro/modify.js
type: application/javascript
module-type: macro


 var tiddlerFieldsArray = [tidfields];					
		self.dispatchEvent({type: "tm-import-tiddlers", param: JSON.stringify(tiddlerFieldsArray)});	
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";
exports.params = [
	{name: "title"}
];

exports.name ="modify";
exports.run  = function(title) {
	title = title||this.getVariable("currentTiddler");
	var tiddler = $tw.wiki.getTiddler(title)||{},tidfields = tiddler.fields||{},tiddlerFieldsArray;	
	var fields = new  Object();
	for(var field in tidfields) {
		fields[field] = tiddler.getFieldString(field);
	}
	tiddlerFieldsArray = [fields];
	return JSON.stringify(tiddlerFieldsArray);
}
})();
