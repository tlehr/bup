'use strict';

var utils = (function() {

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

return {
	uuid: uuid,
}
})();

if (typeof module !== 'undefined') {
	module.exports = utils;
}
