
/*\
title: $:/bj/modules/widgets/setvar.js
type: application/javascript
module-type: widget

setvarWiget - 

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var setvarWiget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
setvarWiget.prototype = new Widget();

/*
Render this widget into the DOM
*/
setvarWiget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	this.renderChildren(parent,nextSibling);
};

/*
Compute the internal state of the widget
*/
setvarWiget.prototype.execute = function() {
	// Get our parameters
    this.msg=this.getAttribute("msg");
    this.dorefresh=this.getAttribute("refresh");
    if (this.msg) {
		this.eventListeners = {};
		this.addEventListeners([
			{type: this.msg, handler: "handleSetvarEvent"}
		]);
	}
    // Construct the child widgets
	this.makeChildWidgets();
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
setvarWiget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["msg"] ) {
		this.refreshSelf();
		return true;
	}
	else {
		return this.refreshChildren(changedTiddlers);
	}
};

setvarWiget.prototype.handleSetvarEvent = function(event) {
	var additionalFields,setvar,setval;
		if(typeof event.paramObject === "object") {
			additionalFields = event.paramObject;
			setvar = additionalFields.setvar;
			setval = additionalFields.setval;
		}
		if (setvar && setval) 
		this.setVariable(setvar,setval);
		if (this.dorefresh) this.refreshChildren({});
	return true;
};

exports.setvar = setvarWiget;

})();
