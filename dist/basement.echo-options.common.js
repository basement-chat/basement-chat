'use strict';

require('core-js/modules/es.object.keys.js');

var _container$getAttribu;
var container = document.querySelector('.basement-chat-box');
var echoOptions = JSON.parse((_container$getAttribu = container === null || container === void 0 ? void 0 : container.getAttribute('data-echo-options')) !== null && _container$getAttribu !== void 0 ? _container$getAttribu : '{}');

module.exports = echoOptions;
//# sourceMappingURL=basement.echo-options.common.js.map
