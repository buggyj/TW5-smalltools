/*\
title: $:/bj/modules/widgets/dolist.js
type: application/javascript
module-type: widget



\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";
var Widget = require("$:/core/modules/widgets/widget.js").widget;

var MPlayListWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
		this.addEventListeners([
	{type: "tm-do-next", handler: "handleNextEvent"}
	]);
};
/*
Inherit from the base widget class
*/
MPlayListWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
MPlayListWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.nextSibling = nextSibling;
	this.computeAttributes();
	this.execute();
		this.doNext(true);
	this.renderChildren(this.parentDomNode,this.nextSibling);

};

/*
Compute the internal state of the widget
*/
MPlayListWidget.prototype.execute = function() {
	// Compose the list elements
	this.list = this.getTiddlerList();
	this.n =0;
	this.tabletid = this.getAttribute("$tabletid",null);
	this.catname = this.getAttribute("$catname",null);
	this.onEmptyPara=this.getAttribute("onEmptyPara",null);
	this.onEmptyMsg=this.getAttribute("onEmptyMsg",null);
	this.mode = this.getAttribute("mode",null);
	this.makeChildWidgets();
		// Construct the child widgets
};

MPlayListWidget.prototype.getTiddlerList = function() {
	var defaultFilter = "[!is[system]sort[title]]";
	return this.wiki.filterTiddlers(this.getAttribute("filter",defaultFilter),this);
};
/*
Refresh the widget by ensuring our attributes are up to date
*/
MPlayListWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	//alert(this.attributes.filter);
	if(changedAttributes.filter || changedAttributes["$tiddler"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};


MPlayListWidget.prototype.doNext = function(first) {
var pagedata = {data:{}};
	if(this.list.length === this.n) {
		if (this.mode == "loop") {
			this.list = this.getTiddlerList();
			this.n =0;		
			if (this.list.length === 0 && this.tabletid){

	pagedata.data.category=this.catname;
this.dispatchEvent({type: "tiddlyclip-create", category:this.catname, pagedata: pagedata, currentsection:null, localsection:this.tabletid});
				//this.dispatchEvent({type: this.onEmptyMsg,param:this.onEmptyPara	});	
			}
			if (this.list.length !== 0) {
		                    this.setVariable("currentTiddler",this.list[this.n]);//alert(this.list[this.n])
		                    this.n = this.n+1;
			}
		
		}
		else {
			if (this.tabletid){
	pagedata.data.category=this.catname;
this.dispatchEvent({type: "tiddlyclip-create", category:this.catname, pagedata: pagedata, currentsection:null, localsection:this.tabletid});
				//this.dispatchEvent({type: this.onEmptyMsg,param:this.onEmptyPara});	
			}
		}
		//do nothing
	} else {
		this.setVariable("currentTiddler",this.list[this.n]);//alert(this.list[this.n])
		this.n = this.n+1;
		if(!first)this.refreshChildren({});
	}
}

MPlayListWidget.prototype.handleNextEvent = function(event) {

	this.doNext();
	return false; // dont propegate
}
	

exports["dolist"] = MPlayListWidget;

})();
