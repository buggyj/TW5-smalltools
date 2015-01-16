/*\
title: $:/bj/modules/wikiadapter/norefesh.js
type: application/javascript
module-type: global

overrides for wiki.js

\*/
(function(){
var wiki = require("$:/core/modules/wiki.js");
 wiki.oldenqueueTiddlerEvent = wiki.enqueueTiddlerEvent;
wiki.enqueueTiddlerEvent = function(title,isDeleted) {
	if (title.substring(0,17) !== "$:/temp/__priv__/") this.oldenqueueTiddlerEvent(title,isDeleted);
};
})();
