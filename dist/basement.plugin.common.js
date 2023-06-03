'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var push_minExports = {};
var push_min = {
  get exports(){ return push_minExports; },
  set exports(v){ push_minExports = v; },
};

/**
 * @license
 *
 * Push v1.0.9
 * =========
 * A compact, cross-browser solution for the JavaScript Notifications API
 *
 * Credits
 * -------
 * Tsvetan Tsvetkov (ttsvetko)
 * Alex Gibson (alexgibson)
 *
 * License
 * -------
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015-2017 Tyler Nickerson
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function (module, exports) {
	!function(i,t){module.exports=t();}(commonjsGlobal,function(){var i={errors:{incompatible:"".concat("PushError:"," Push.js is incompatible with browser."),invalid_plugin:"".concat("PushError:"," plugin class missing from plugin manifest (invalid plugin). Please check the documentation."),invalid_title:"".concat("PushError:"," title of notification must be a string"),permission_denied:"".concat("PushError:"," permission request declined"),sw_notification_error:"".concat("PushError:"," could not show a ServiceWorker notification due to the following reason: "),sw_registration_error:"".concat("PushError:"," could not register the ServiceWorker due to the following reason: "),unknown_interface:"".concat("PushError:"," unable to create notification: unknown interface")}};function t(i){return (t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(i){return typeof i}:function(i){return i&&"function"==typeof Symbol&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i})(i)}function n(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}function e(i,t){for(var n=0;n<t.length;n++){var e=t[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e);}}function o(i,t,n){return t&&e(i.prototype,t),n&&e(i,n),i}function r(i,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");i.prototype=Object.create(t&&t.prototype,{constructor:{value:i,writable:!0,configurable:!0}}),t&&c(i,t);}function s(i){return (s=Object.setPrototypeOf?Object.getPrototypeOf:function(i){return i.__proto__||Object.getPrototypeOf(i)})(i)}function c(i,t){return (c=Object.setPrototypeOf||function(i,t){return i.__proto__=t,i})(i,t)}function a(i,t){return !t||"object"!=typeof t&&"function"!=typeof t?function(i){if(void 0===i)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}(i):t}var u=function(){function i(t){n(this,i),this._win=t,this.GRANTED="granted",this.DEFAULT="default",this.DENIED="denied",this._permissions=[this.GRANTED,this.DEFAULT,this.DENIED];}return o(i,[{key:"request",value:function(i,t){return arguments.length>0?this._requestWithCallback.apply(this,arguments):this._requestAsPromise()}},{key:"_requestWithCallback",value:function(i,t){var n,e=this,o=this.get(),r=!1,s=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e._win.Notification.permission;r||(r=!0,void 0===n&&e._win.webkitNotifications&&(n=e._win.webkitNotifications.checkPermission()),n===e.GRANTED||0===n?i&&i():t&&t());};o!==this.DEFAULT?s(o):this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission?this._win.webkitNotifications.requestPermission(s):this._win.Notification&&this._win.Notification.requestPermission?(n=this._win.Notification.requestPermission(s))&&n.then&&n.then(s).catch(function(){t&&t();}):i&&i();}},{key:"_requestAsPromise",value:function(){var i=this,t=this.get(),n=t!==this.DEFAULT,e=this._win.Notification&&this._win.Notification.requestPermission,o=this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission;return new Promise(function(r,s){var c,a=!1,u=function(t){a||(a=!0,!function(t){return t===i.GRANTED||0===t}(t)?s():r());};n?u(t):o?i._win.webkitNotifications.requestPermission(function(i){u(i);}):e?(c=i._win.Notification.requestPermission(u))&&c.then&&c.then(u).catch(s):r();})}},{key:"has",value:function(){return this.get()===this.GRANTED}},{key:"get",value:function(){return this._win.Notification&&this._win.Notification.permission?this._win.Notification.permission:this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission?this._permissions[this._win.webkitNotifications.checkPermission()]:navigator.mozNotification?this.GRANTED:this._win.external&&this._win.external.msIsSiteMode?this._win.external.msIsSiteMode()?this.GRANTED:this.DEFAULT:this.GRANTED}}]),i}(),f=function(){function i(){n(this,i);}return o(i,null,[{key:"isUndefined",value:function(i){return void 0===i}},{key:"isNull",value:function(i){return null===obj}},{key:"isString",value:function(i){return "string"==typeof i}},{key:"isFunction",value:function(i){return i&&"[object Function]"==={}.toString.call(i)}},{key:"isObject",value:function(i){return "object"===t(i)}},{key:"objectMerge",value:function(i,t){for(var n in t)i.hasOwnProperty(n)&&this.isObject(i[n])&&this.isObject(t[n])?this.objectMerge(i[n],t[n]):i[n]=t[n];}}]),i}(),l=function i(t){n(this,i),this._win=t;},h=function(i){function t(){return n(this,t),a(this,s(t).apply(this,arguments))}return r(t,l),o(t,[{key:"isSupported",value:function(){return void 0!==this._win.Notification}},{key:"create",value:function(i,t){return new this._win.Notification(i,{icon:f.isString(t.icon)||f.isUndefined(t.icon)||f.isNull(t.icon)?t.icon:t.icon.x32,body:t.body,tag:t.tag,requireInteraction:t.requireInteraction})}},{key:"close",value:function(i){i.close();}}]),t}(),_=function(t){function e(){return n(this,e),a(this,s(e).apply(this,arguments))}return r(e,l),o(e,[{key:"isSupported",value:function(){return void 0!==this._win.navigator&&void 0!==this._win.navigator.serviceWorker}},{key:"getFunctionBody",value:function(i){var t=i.toString().match(/function[^{]+{([\s\S]*)}$/);return null!=t&&t.length>1?t[1]:null}},{key:"create",value:function(t,n,e,o,r){var s=this;this._win.navigator.serviceWorker.register(o),this._win.navigator.serviceWorker.ready.then(function(o){var c={id:t,link:e.link,origin:document.location.href,onClick:f.isFunction(e.onClick)?s.getFunctionBody(e.onClick):"",onClose:f.isFunction(e.onClose)?s.getFunctionBody(e.onClose):""};void 0!==e.data&&null!==e.data&&(c=Object.assign(c,e.data)),o.showNotification(n,{icon:e.icon,body:e.body,vibrate:e.vibrate,tag:e.tag,data:c,requireInteraction:e.requireInteraction,silent:e.silent}).then(function(){o.getNotifications().then(function(i){o.active.postMessage(""),r(i);});}).catch(function(t){throw new Error(i.errors.sw_notification_error+t.message)});}).catch(function(t){throw new Error(i.errors.sw_registration_error+t.message)});}},{key:"close",value:function(){}}]),e}(),v=function(i){function t(){return n(this,t),a(this,s(t).apply(this,arguments))}return r(t,l),o(t,[{key:"isSupported",value:function(){return void 0!==this._win.navigator.mozNotification}},{key:"create",value:function(i,t){var n=this._win.navigator.mozNotification.createNotification(i,t.body,t.icon);return n.show(),n}}]),t}(),d=function(i){function t(){return n(this,t),a(this,s(t).apply(this,arguments))}return r(t,l),o(t,[{key:"isSupported",value:function(){return void 0!==this._win.external&&void 0!==this._win.external.msIsSiteMode}},{key:"create",value:function(i,t){return this._win.external.msSiteModeClearIconOverlay(),this._win.external.msSiteModeSetIconOverlay(f.isString(t.icon)||f.isUndefined(t.icon)?t.icon:t.icon.x16,i),this._win.external.msSiteModeActivate(),null}},{key:"close",value:function(){this._win.external.msSiteModeClearIconOverlay();}}]),t}(),w=function(i){function t(){return n(this,t),a(this,s(t).apply(this,arguments))}return r(t,l),o(t,[{key:"isSupported",value:function(){return void 0!==this._win.webkitNotifications}},{key:"create",value:function(i,t){var n=this._win.webkitNotifications.createNotification(t.icon,i,t.body);return n.show(),n}},{key:"close",value:function(i){i.cancel();}}]),t}();return new(function(){function t(i){n(this,t),this._currentId=0,this._notifications={},this._win=i,this.Permission=new u(i),this._agents={desktop:new h(i),chrome:new _(i),firefox:new v(i),ms:new d(i),webkit:new w(i)},this._configuration={serviceWorker:"/serviceWorker.min.js",fallback:function(i){}};}return o(t,[{key:"_closeNotification",value:function(t){var n=!0,e=this._notifications[t];if(void 0!==e){if(n=this._removeNotification(t),this._agents.desktop.isSupported())this._agents.desktop.close(e);else if(this._agents.webkit.isSupported())this._agents.webkit.close(e);else {if(!this._agents.ms.isSupported())throw n=!1,new Error(i.errors.unknown_interface);this._agents.ms.close();}return n}return !1}},{key:"_addNotification",value:function(i){var t=this._currentId;return this._notifications[t]=i,this._currentId++,t}},{key:"_removeNotification",value:function(i){var t=!1;return this._notifications.hasOwnProperty(i)&&(delete this._notifications[i],t=!0),t}},{key:"_prepareNotification",value:function(i,t){var n,e=this;return n={get:function(){return e._notifications[i]},close:function(){e._closeNotification(i);}},t.timeout&&setTimeout(function(){n.close();},t.timeout),n}},{key:"_serviceWorkerCallback",value:function(i,t,n){var e=this,o=this._addNotification(i[i.length-1]);navigator&&navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",function(i){var t=JSON.parse(i.data);"close"===t.action&&Number.isInteger(t.id)&&e._removeNotification(t.id);}),n(this._prepareNotification(o,t))),n(null);}},{key:"_createCallback",value:function(i,t,n){var e,o=this,r=null;if(t=t||{},e=function(i){o._removeNotification(i),f.isFunction(t.onClose)&&t.onClose.call(o,r);},this._agents.desktop.isSupported())try{r=this._agents.desktop.create(i,t);}catch(e){var s=this._currentId,c=this.config().serviceWorker;this._agents.chrome.isSupported()&&this._agents.chrome.create(s,i,t,c,function(i){return o._serviceWorkerCallback(i,t,n)});}else this._agents.webkit.isSupported()?r=this._agents.webkit.create(i,t):this._agents.firefox.isSupported()?this._agents.firefox.create(i,t):this._agents.ms.isSupported()?r=this._agents.ms.create(i,t):(t.title=i,this.config().fallback(t));if(null!==r){var a=this._addNotification(r),u=this._prepareNotification(a,t);f.isFunction(t.onShow)&&r.addEventListener("show",t.onShow),f.isFunction(t.onError)&&r.addEventListener("error",t.onError),f.isFunction(t.onClick)&&r.addEventListener("click",t.onClick),r.addEventListener("close",function(){e(a);}),r.addEventListener("cancel",function(){e(a);}),n(u);}n(null);}},{key:"create",value:function(t,n){var e,o=this;if(!f.isString(t))throw new Error(i.errors.invalid_title);return e=this.Permission.has()?function(i,e){try{o._createCallback(t,n,i);}catch(i){e(i);}}:function(e,r){o.Permission.request().then(function(){o._createCallback(t,n,e);}).catch(function(){r(i.errors.permission_denied);});},new Promise(e)}},{key:"count",value:function(){var i,t=0;for(i in this._notifications)this._notifications.hasOwnProperty(i)&&t++;return t}},{key:"close",value:function(i){var t;for(t in this._notifications)if(this._notifications.hasOwnProperty(t)&&this._notifications[t].tag===i)return this._closeNotification(t)}},{key:"clear",value:function(){var i,t=!0;for(i in this._notifications)this._notifications.hasOwnProperty(i)&&(t=t&&this._closeNotification(i));return t}},{key:"supported",value:function(){var i=!1;for(var t in this._agents)this._agents.hasOwnProperty(t)&&(i=i||this._agents[t].isSupported());return i}},{key:"config",value:function(i){return (void 0!==i||null!==i&&f.isObject(i))&&f.objectMerge(this._configuration,i),this._configuration}},{key:"extend",value:function(t){var n,e={}.hasOwnProperty;if(!e.call(t,"plugin"))throw new Error(i.errors.invalid_plugin);for(var o in e.call(t,"config")&&f.isObject(t.config)&&null!==t.config&&this.config(t.config),n=new(t.plugin)(this.config()))e.call(n,o)&&f.isFunction(n[o])&&(this[o]=n[o]);}}]),t}())("undefined"!=typeof window?window:commonjsGlobal)});
	
} (push_min));

var Push = push_minExports;

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement$1(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement$1(placement) {
  return placement.split('-')[0];
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = isElement$1(element) ? getWindow(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement$1(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getVariation(placement) {
  return placement.split('-')[1];
}

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
      y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, getWindow(popper)) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement$1(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement$1(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement$1(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement$1(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement$1(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement$1(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement$1(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement$1(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement$1(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement$1(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = offset + overflow[mainSide];
    var max$1 = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce$1(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce$1(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref) {
        var name = _ref.name,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            effect = _ref.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

/**!
* tippy.js v6.3.7
* (c) 2017-2021 atomiks
* MIT License
*/
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};
var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
  return document.body;
};

function hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}
function getValueAtIndexOrReturn(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
  }

  return value;
}
function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
  return typeof value === 'function' ? value.apply(void 0, args) : value;
}
function debounce(fn, ms) {
  // Avoid wrapping in `setTimeout` if ms is 0 anyway
  if (ms === 0) {
    return fn;
  }

  var timeout;
  return function (arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(arg);
    }, ms);
  };
}
function removeProperties(obj, keys) {
  var clone = Object.assign({}, obj);
  keys.forEach(function (key) {
    delete clone[key];
  });
  return clone;
}
function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
  return [].concat(value);
}
function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
function unique(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item) === index;
  });
}
function getBasePlacement(placement) {
  return placement.split('-')[0];
}
function arrayFrom(value) {
  return [].slice.call(value);
}
function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

function div() {
  return document.createElement('div');
}
function isElement(value) {
  return ['Element', 'Fragment'].some(function (type) {
    return isType(value, type);
  });
}
function isNodeList(value) {
  return isType(value, 'NodeList');
}
function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}
function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
  if (isElement(value)) {
    return [value];
  }

  if (isNodeList(value)) {
    return arrayFrom(value);
  }

  if (Array.isArray(value)) {
    return value;
  }

  return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
  els.forEach(function (el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}
function setVisibilityState(els, state) {
  els.forEach(function (el) {
    if (el) {
      el.setAttribute('data-state', state);
    }
  });
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;

  var _normalizeToArray = normalizeToArray(elementOrElements),
      element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body


  return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX,
      clientY = event.clientY;
  return popperTreeData.every(function (_ref) {
    var popperRect = _ref.popperRect,
        popperState = _ref.popperState,
        props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;

    if (!offsetData) {
      return true;
    }

    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}
function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
  // `webkitTransitionEnd`...

  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
    box[method](event, listener);
  });
}
/**
 * Compared to xxx.contains, this function works for dom structures with shadow
 * dom
 */

function actualContains(parent, child) {
  var target = child;

  while (target) {
    var _target$getRootNode;

    if (parent.contains(target)) {
      return true;
    }

    target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
  }

  return false;
}

var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
/**
 * When a `touchstart` event is fired, it's assumed the user is using touch
 * input. We'll bind a `mousemove` event listener to listen for mouse input in
 * the future. This way, the `isTouch` property is fully dynamic and will handle
 * hybrid devices that use a mix of touch + mouse input.
 */

function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }

  currentInput.isTouch = true;

  if (window.performance) {
    document.addEventListener('mousemove', onDocumentMouseMove);
  }
}
/**
 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
 * the user is using mouse input again. `mousemove` can fire on touch devices as
 * well, but very rarely that quickly.
 */

function onDocumentMouseMove() {
  var now = performance.now();

  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  lastMouseMoveTime = now;
}
/**
 * When an element is in focus and has a tippy, leaving the tab/window and
 * returning causes it to show again. For mouse users this is unexpected, but
 * for keyboard use it makes sense.
 * TODO: find a better technique to solve this problem
 */

function onWindowBlur() {
  var activeElement = document.activeElement;

  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;

    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}
function bindGlobalEventListeners() {
  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener('blur', onWindowBlur);
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isIE11 = isBrowser ? // @ts-ignore
!!window.msCrypto : false;

function createMemoryLeakWarning(method) {
  var txt = method === 'destroy' ? 'n already-' : ' ';
  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", 'indicates a potential memory leak.'].join(' ');
}
function clean(value) {
  var spacesAndTabs = /[ \t]{2,}/g;
  var lineStartWithSpaces = /^[ \t]*/gm;
  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
}

function getDevMessage(message) {
  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
}

function getFormattedMessage(message) {
  return [getDevMessage(message), // title
  'color: #00C584; font-size: 1.3em; font-weight: bold;', // message
  'line-height: 1.5', // footer
  'color: #a6a095;'];
} // Assume warnings and errors never have the same message

var visitedMessages;

if (process.env.NODE_ENV !== "production") {
  resetVisitedMessages();
}

function resetVisitedMessages() {
  visitedMessages = new Set();
}
function warnWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console;

    visitedMessages.add(message);

    (_console = console).warn.apply(_console, getFormattedMessage(message));
  }
}
function errorWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console2;

    visitedMessages.add(message);

    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
  }
}
function validateTargets(targets) {
  var didPassFalsyValue = !targets;
  var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
  errorWhen(didPassFalsyValue, ['tippy() was passed', '`' + String(targets) + '`', 'as its targets (first) argument. Valid types are: String, Element,', 'Element[], or NodeList.'].join(' '));
  errorWhen(didPassPlainObject, ['tippy() was passed a plain object which is not supported as an argument', 'for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));
}

var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: 'fade',
  arrow: true,
  content: '',
  inertia: false,
  maxWidth: 350,
  role: 'tooltip',
  theme: '',
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: TIPPY_DEFAULT_APPEND_TO,
  aria: {
    content: 'auto',
    expanded: 'auto'
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: '',
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {},
  onBeforeUpdate: function onBeforeUpdate() {},
  onCreate: function onCreate() {},
  onDestroy: function onDestroy() {},
  onHidden: function onHidden() {},
  onHide: function onHide() {},
  onMount: function onMount() {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onTrigger: function onTrigger() {},
  onUntrigger: function onUntrigger() {},
  onClickOutside: function onClickOutside() {},
  placement: 'top',
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: 'mouseenter focus',
  triggerTarget: null
}, pluginProps, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps(partialProps) {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    validateProps(partialProps, []);
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (key) {
    defaultProps[key] = partialProps[key];
  });
};
function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps = plugins.reduce(function (acc, plugin) {
    var name = plugin.name,
        defaultValue = plugin.defaultValue;

    if (name) {
      var _name;

      acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
    }

    return acc;
  }, {});
  return Object.assign({}, passedProps, pluginProps);
}
function getDataAttributeProps(reference, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins: plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function (acc, key) {
    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

    if (!valueAsString) {
      return acc;
    }

    if (key === 'content') {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key] = valueAsString;
      }
    }

    return acc;
  }, {});
  return props;
}
function evaluateProps(reference, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, out.aria);
  out.aria = {
    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
  };
  return out;
}
function validateProps(partialProps, plugins) {
  if (partialProps === void 0) {
    partialProps = {};
  }

  if (plugins === void 0) {
    plugins = [];
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (prop) {
    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
    var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop); // Check if the prop exists in `plugins`

    if (didPassUnknownProp) {
      didPassUnknownProp = plugins.filter(function (plugin) {
        return plugin.name === prop;
      }).length === 0;
    }

    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", 'a plugin, forgot to pass it in an array as props.plugins.', '\n\n', 'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n', 'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));
  });
}

var innerHTML = function innerHTML() {
  return 'innerHTML';
};

function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}

function createArrowElement(value) {
  var arrow = div();

  if (value === true) {
    arrow.className = ARROW_CLASS;
  } else {
    arrow.className = SVG_ARROW_CLASS;

    if (isElement(value)) {
      arrow.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow, value);
    }
  }

  return arrow;
}

function setContent(content, props) {
  if (isElement(props.content)) {
    dangerouslySetInnerHTML(content, '');
    content.appendChild(props.content);
  } else if (typeof props.content !== 'function') {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}
function getChildren(popper) {
  var box = popper.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box: box,
    content: boxChildren.find(function (node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function (node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function (node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}
function render(instance) {
  var popper = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute('data-state', 'hidden');
  box.setAttribute('tabindex', '-1');
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute('data-state', 'hidden');
  setContent(content, instance.props);
  popper.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);

  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper),
        box = _getChildren.box,
        content = _getChildren.content,
        arrow = _getChildren.arrow;

    if (nextProps.theme) {
      box.setAttribute('data-theme', nextProps.theme);
    } else {
      box.removeAttribute('data-theme');
    }

    if (typeof nextProps.animation === 'string') {
      box.setAttribute('data-animation', nextProps.animation);
    } else {
      box.removeAttribute('data-animation');
    }

    if (nextProps.inertia) {
      box.setAttribute('data-inertia', '');
    } else {
      box.removeAttribute('data-inertia');
    }

    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

    if (nextProps.role) {
      box.setAttribute('role', nextProps.role);
    } else {
      box.removeAttribute('role');
    }

    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content, instance.props);
    }

    if (nextProps.arrow) {
      if (!arrow) {
        box.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box.removeChild(arrow);
        box.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow) {
      box.removeChild(arrow);
    }
  }

  return {
    popper: popper,
    onUpdate: onUpdate
  };
} // Runtime check to identify if the render function is the default one; this
// way we can apply default CSS transitions logic and it can be tree-shaken away

render.$$tippy = true;

var idCounter = 1;
var mouseMoveListeners = []; // Used by `hideAll()`

var mountedInstances = [];
function createTippy(reference, passedProps) {
  var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
  // 🔒 Private members
  // ===========================================================================

  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget; // ===========================================================================
  // 🔑 Public members
  // ===========================================================================

  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id: id,
    reference: reference,
    popper: div(),
    popperInstance: popperInstance,
    props: props,
    state: state,
    plugins: plugins,
    // methods
    clearDelayTimeouts: clearDelayTimeouts,
    setProps: setProps,
    setContent: setContent,
    show: show,
    hide: hide,
    hideWithInteractivity: hideWithInteractivity,
    enable: enable,
    disable: disable,
    unmount: unmount,
    destroy: destroy
  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
  // it doesn't seem to happen in the browser

  /* istanbul ignore if */

  if (!props.render) {
    if (process.env.NODE_ENV !== "production") {
      errorWhen(true, 'render() function has not been supplied.');
    }

    return instance;
  } // ===========================================================================
  // Initial mutations
  // ===========================================================================


  var _props$render = props.render(instance),
      popper = _props$render.popper,
      onUpdate = _props$render.onUpdate;

  popper.setAttribute('data-tippy-root', '');
  popper.id = "tippy-" + instance.id;
  instance.popper = popper;
  reference._tippy = instance;
  popper._tippy = instance;
  var pluginsHooks = plugins.map(function (plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook('onCreate', [instance]);

  if (props.showOnCreate) {
    scheduleShow();
  } // Prevent a tippy with a delay from hiding if the cursor left then returned
  // before it started hiding


  popper.addEventListener('mouseenter', function () {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper.addEventListener('mouseleave', function () {
    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    }
  });
  return instance; // ===========================================================================
  // 🔒 Private methods
  // ===========================================================================

  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }

  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === 'hold';
  }

  function getIsDefaultRenderFn() {
    var _instance$props$rende;

    // @ts-ignore
    return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
  }

  function getCurrentTarget() {
    return currentTarget || reference;
  }

  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }

  function getDefaultTemplateChildren() {
    return getChildren(popper);
  }

  function getDelay(isShow) {
    // For touch or keyboard input, force `0` delay for UX reasons
    // Also if the instance is mounted but not visible (transitioning out),
    // ignore delay
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
      return 0;
    }

    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }

  function handleStyles(fromHide) {
    if (fromHide === void 0) {
      fromHide = false;
    }

    popper.style.pointerEvents = instance.props.interactive && !fromHide ? '' : 'none';
    popper.style.zIndex = "" + instance.props.zIndex;
  }

  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }

    pluginsHooks.forEach(function (pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(pluginHooks, args);
      }
    });

    if (shouldInvokePropsHook) {
      var _instance$props;

      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }

  function handleAriaContentAttribute() {
    var aria = instance.props.aria;

    if (!aria.content) {
      return;
    }

    var attr = "aria-" + aria.content;
    var id = popper.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      var currentValue = node.getAttribute(attr);

      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
      } else {
        var nextValue = currentValue && currentValue.replace(id, '').trim();

        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }

  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      if (instance.props.interactive) {
        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
      } else {
        node.removeAttribute('aria-expanded');
      }
    });
  }

  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
      return listener !== debouncedOnMouseMove;
    });
  }

  function onDocumentPress(event) {
    // Moved finger to scroll instead of an intentional tap outside
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === 'mousedown') {
        return;
      }
    }

    var actualTarget = event.composedPath && event.composedPath()[0] || event.target; // Clicked on interactive popper

    if (instance.props.interactive && actualContains(popper, actualTarget)) {
      return;
    } // Clicked on the event listeners target


    if (normalizeToArray(instance.props.triggerTarget || reference).some(function (el) {
      return actualContains(el, actualTarget);
    })) {
      if (currentInput.isTouch) {
        return;
      }

      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
        return;
      }
    } else {
      invokeHook('onClickOutside', [instance, event]);
    }

    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
      // currentTarget. This lets a tippy with `focus` trigger know that it
      // should not show

      didHideDueToDocumentMouseDown = true;
      setTimeout(function () {
        didHideDueToDocumentMouseDown = false;
      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
      // before it shows, and hide()'s early bail-out behavior can prevent it
      // from being cleaned up

      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }

  function onTouchMove() {
    didTouchMove = true;
  }

  function onTouchStart() {
    didTouchMove = false;
  }

  function addDocumentPress() {
    var doc = getDocument();
    doc.addEventListener('mousedown', onDocumentPress, true);
    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function removeDocumentPress() {
    var doc = getDocument();
    doc.removeEventListener('mousedown', onDocumentPress, true);
    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function () {
      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
        callback();
      }
    });
  }

  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }

  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;

    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, 'remove', listener);
        callback();
      }
    } // Make callback synchronous if duration is 0
    // `transitionend` won't fire otherwise


    if (duration === 0) {
      return callback();
    }

    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
    updateTransitionEndListener(box, 'add', listener);
    currentTransitionEndListener = listener;
  }

  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node: node,
        eventType: eventType,
        handler: handler,
        options: options
      });
    });
  }

  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on('touchstart', onTrigger, {
        passive: true
      });
      on('touchend', onMouseLeave, {
        passive: true
      });
    }

    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
      if (eventType === 'manual') {
        return;
      }

      on(eventType, onTrigger);

      switch (eventType) {
        case 'mouseenter':
          on('mouseleave', onMouseLeave);
          break;

        case 'focus':
          on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
          break;

        case 'focusin':
          on('focusout', onBlurOrFocusOut);
          break;
      }
    });
  }

  function removeListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function onTrigger(event) {
    var _lastTriggerEvent;

    var shouldScheduleClickHide = false;

    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }

    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();

    if (!instance.state.isVisible && isMouseEvent(event)) {
      // If scrolling, `mouseenter` events can be fired if the cursor lands
      // over a new target, but `mousemove` events don't get fired. This
      // causes interactive tooltips to get stuck open until the cursor is
      // moved
      mouseMoveListeners.forEach(function (listener) {
        return listener(event);
      });
    } // Toggle show/hide when clicking click-triggered tooltips


    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }

    if (event.type === 'click') {
      isVisibleFromClick = !shouldScheduleClickHide;
    }

    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }

  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
      return;
    }

    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
      var _instance$popperInsta;

      var instance = popper._tippy;
      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

      if (state) {
        return {
          popperRect: popper.getBoundingClientRect(),
          popperState: state,
          props: props
        };
      }

      return null;
    }).filter(Boolean);

    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }

  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

    if (shouldBail) {
      return;
    }

    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }

    scheduleHide(event);
  }

  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
      return;
    } // If focus was moved to within the popper


    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
      return;
    }

    scheduleHide(event);
  }

  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
  }

  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props,
        popperOptions = _instance$props2.popperOptions,
        placement = _instance$props2.placement,
        offset = _instance$props2.offset,
        getReferenceClientRect = _instance$props2.getReferenceClientRect,
        moveTransition = _instance$props2.moveTransition;
    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference;
    var tippyModifier = {
      name: '$$tippy',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh.box;

          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
            if (attr === 'placement') {
              box.setAttribute('data-placement', state.placement);
            } else {
              if (state.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, '');
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: 'offset',
      options: {
        offset: offset
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: 'flip',
      options: {
        padding: 5
      }
    }, {
      name: 'computeStyles',
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];

    if (getIsDefaultRenderFn() && arrow) {
      modifiers.push({
        name: 'arrow',
        options: {
          element: arrow,
          padding: 3
        }
      });
    }

    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = createPopper(computedReference, popper, Object.assign({}, popperOptions, {
      placement: placement,
      onFirstUpdate: onFirstUpdate,
      modifiers: modifiers
    }));
  }

  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }

  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
    // it's directly after the reference element so the elements inside the
    // tippy can be tabbed to
    // If there are clipping issues, the user can specify a different appendTo
    // and ensure focus management is handled correctly manually

    var node = getCurrentTarget();

    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    } // The popper element needs to exist on the DOM before its position can be
    // updated as Popper needs to read its dimensions


    if (!parentNode.contains(popper)) {
      parentNode.appendChild(popper);
    }

    instance.state.isMounted = true;
    createPopperInstance();
    /* istanbul ignore else */

    if (process.env.NODE_ENV !== "production") {
      // Accessibility check
      warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ['Interactive tippy element may not be accessible via keyboard', 'navigation because it is not directly after the reference element', 'in the DOM source order.', '\n\n', 'Using a wrapper <div> or <span> tag around the reference element', 'solves this by creating a new parentNode context.', '\n\n', 'Specifying `appendTo: document.body` silences this warning, but it', 'assumes you are using a focus management solution to handle', 'keyboard navigation.', '\n\n', 'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));
    }
  }

  function getNestedPopperTree() {
    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
  }

  function scheduleShow(event) {
    instance.clearDelayTimeouts();

    if (event) {
      invokeHook('onTrigger', [instance, event]);
    }

    addDocumentPress();
    var delay = getDelay(true);

    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
        touchValue = _getNormalizedTouchSe[0],
        touchDelay = _getNormalizedTouchSe[1];

    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
      delay = touchDelay;
    }

    if (delay) {
      showTimeout = setTimeout(function () {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }

  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook('onUntrigger', [instance, event]);

    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    } // For interactive tippies, scheduleHide is added to a document.body handler
    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
    // events when trigger contains mouseenter and click, and the tip is
    // currently shown as a result of a click.


    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }

    var delay = getDelay(false);

    if (delay) {
      hideTimeout = setTimeout(function () {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      // Fixes a `transitionend` problem when it fires 1 frame too
      // late sometimes, we don't want hide() to be called.
      scheduleHideAnimationFrame = requestAnimationFrame(function () {
        instance.hide();
      });
    }
  } // ===========================================================================
  // 🔑 Public methods
  // ===========================================================================


  function enable() {
    instance.state.isEnabled = true;
  }

  function disable() {
    // Disabling the instance should also hide it
    // https://github.com/atomiks/tippy.js-react/issues/106
    instance.hide();
    instance.state.isEnabled = false;
  }

  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }

  function setProps(partialProps) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('setProps'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    invokeHook('onBeforeUpdate', [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();

    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
    } // Ensure stale aria-expanded attributes are removed


    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
        node.removeAttribute('aria-expanded');
      });
    } else if (nextProps.triggerTarget) {
      reference.removeAttribute('aria-expanded');
    }

    handleAriaExpandedAttribute();
    handleStyles();

    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }

    if (instance.popperInstance) {
      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
      // and the nested ones get re-rendered first.
      // https://github.com/atomiks/tippyjs-react/issues/177
      // TODO: find a cleaner / more efficient solution(!)

      getNestedPopperTree().forEach(function (nestedPopper) {
        // React (and other UI libs likely) requires a rAF wrapper as it flushes
        // its work in one
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }

    invokeHook('onAfterUpdate', [instance, partialProps]);
  }

  function setContent(content) {
    instance.setProps({
      content: content
    });
  }

  function show() {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('show'));
    } // Early bail-out


    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    } // Normalize `disabled` behavior across browsers.
    // Firefox allows events on disabled elements, but Chrome doesn't.
    // Using a wrapper element (i.e. <span>) is recommended.


    if (getCurrentTarget().hasAttribute('disabled')) {
      return;
    }

    invokeHook('onShow', [instance], false);

    if (instance.props.onShow(instance) === false) {
      return;
    }

    instance.state.isVisible = true;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'visible';
    }

    handleStyles();
    addDocumentPress();

    if (!instance.state.isMounted) {
      popper.style.transition = 'none';
    } // If flipping to the opposite side after hiding at least once, the
    // animation will use the wrong placement without resetting the duration


    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh2.box,
          content = _getDefaultTemplateCh2.content;

      setTransitionDuration([box, content], 0);
    }

    onFirstUpdate = function onFirstUpdate() {
      var _instance$popperInsta2;

      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }

      ignoreOnFirstUpdate = true; // reflow

      void popper.offsetHeight;
      popper.style.transition = instance.props.moveTransition;

      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
            _box = _getDefaultTemplateCh3.box,
            _content = _getDefaultTemplateCh3.content;

        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], 'visible');
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance); // certain modifiers (e.g. `maxSize`) require a second update after the
      // popper has been positioned for the first time

      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
      invokeHook('onMount', [instance]);

      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function () {
          instance.state.isShown = true;
          invokeHook('onShown', [instance]);
        });
      }
    };

    mount();
  }

  function hide() {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hide'));
    } // Early bail-out


    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }

    invokeHook('onHide', [instance], false);

    if (instance.props.onHide(instance) === false) {
      return;
    }

    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'hidden';
    }

    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles(true);

    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh4.box,
          content = _getDefaultTemplateCh4.content;

      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], 'hidden');
      }
    }

    handleAriaContentAttribute();
    handleAriaExpandedAttribute();

    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }

  function hideWithInteractivity(event) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
    }

    getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }

  function unmount() {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('unmount'));
    }

    if (instance.state.isVisible) {
      instance.hide();
    }

    if (!instance.state.isMounted) {
      return;
    }

    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
    // tree by default. This seems mainly for interactive tippies, but we should
    // find a workaround if possible

    getNestedPopperTree().forEach(function (nestedPopper) {
      nestedPopper._tippy.unmount();
    });

    if (popper.parentNode) {
      popper.parentNode.removeChild(popper);
    }

    mountedInstances = mountedInstances.filter(function (i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook('onHidden', [instance]);
  }

  function destroy() {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('destroy'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference._tippy;
    instance.state.isDestroyed = true;
    invokeHook('onDestroy', [instance]);
  }
}

function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }

  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
  /* istanbul ignore else */

  if (process.env.NODE_ENV !== "production") {
    validateTargets(targets);
    validateProps(optionalProps, plugins);
  }

  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins: plugins
  });
  var elements = getArrayOfElements(targets);
  /* istanbul ignore else */

  if (process.env.NODE_ENV !== "production") {
    var isSingleContentElement = isElement(passedProps.content);
    var isMoreThanOneReferenceElement = elements.length > 1;
    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ['tippy() was passed an Element as the `content` prop, but more than', 'one tippy instance was created by this invocation. This means the', 'content element will only be appended to the last tippy instance.', '\n\n', 'Instead, pass the .innerHTML of the element, or use a function that', 'returns a cloned version of the element instead.', '\n\n', '1) content: element.innerHTML\n', '2) content: () => element.cloneNode(true)'].join(' '));
  }

  var instances = elements.reduce(function (acc, reference) {
    var instance = reference && createTippy(reference, passedProps);

    if (instance) {
      acc.push(instance);
    }

    return acc;
  }, []);
  return isElement(targets) ? instances[0] : instances;
}

tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;

// every time the popper is destroyed (i.e. a new target), removing the styles
// and causing transitions to break for singletons when the console is open, but
// most notably for non-transform styles being used, `gpuAcceleration: false`.

Object.assign({}, applyStyles$1, {
  effect: function effect(_ref) {
    var state = _ref.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    } // intentionally return no cleanup function
    // return () => { ... }

  }
});

var BUBBLING_EVENTS_MAP = {
  mouseover: 'mouseenter',
  focusin: 'focus',
  click: 'click'
};
/**
 * Creates a delegate instance that controls the creation of tippy instances
 * for child elements (`target` CSS selector).
 */

function delegate(targets, props) {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    errorWhen(!(props && props.target), ['You must specity a `target` prop indicating a CSS selector string matching', 'the target elements that should receive a tippy.'].join(' '));
  }

  var listeners = [];
  var childTippyInstances = [];
  var disabled = false;
  var target = props.target;
  var nativeProps = removeProperties(props, ['target']);
  var parentProps = Object.assign({}, nativeProps, {
    trigger: 'manual',
    touch: false
  });
  var childProps = Object.assign({
    touch: defaultProps.touch
  }, nativeProps, {
    showOnCreate: true
  });
  var returnValue = tippy(targets, parentProps);
  var normalizedReturnValue = normalizeToArray(returnValue);

  function onTrigger(event) {
    if (!event.target || disabled) {
      return;
    }

    var targetNode = event.target.closest(target);

    if (!targetNode) {
      return;
    } // Get relevant trigger with fallbacks:
    // 1. Check `data-tippy-trigger` attribute on target node
    // 2. Fallback to `trigger` passed to `delegate()`
    // 3. Fallback to `defaultProps.trigger`


    var trigger = targetNode.getAttribute('data-tippy-trigger') || props.trigger || defaultProps.trigger; // @ts-ignore

    if (targetNode._tippy) {
      return;
    }

    if (event.type === 'touchstart' && typeof childProps.touch === 'boolean') {
      return;
    }

    if (event.type !== 'touchstart' && trigger.indexOf(BUBBLING_EVENTS_MAP[event.type]) < 0) {
      return;
    }

    var instance = tippy(targetNode, childProps);

    if (instance) {
      childTippyInstances = childTippyInstances.concat(instance);
    }
  }

  function on(node, eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    node.addEventListener(eventType, handler, options);
    listeners.push({
      node: node,
      eventType: eventType,
      handler: handler,
      options: options
    });
  }

  function addEventListeners(instance) {
    var reference = instance.reference;
    on(reference, 'touchstart', onTrigger, TOUCH_OPTIONS);
    on(reference, 'mouseover', onTrigger);
    on(reference, 'focusin', onTrigger);
    on(reference, 'click', onTrigger);
  }

  function removeEventListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function applyMutations(instance) {
    var originalDestroy = instance.destroy;
    var originalEnable = instance.enable;
    var originalDisable = instance.disable;

    instance.destroy = function (shouldDestroyChildInstances) {
      if (shouldDestroyChildInstances === void 0) {
        shouldDestroyChildInstances = true;
      }

      if (shouldDestroyChildInstances) {
        childTippyInstances.forEach(function (instance) {
          instance.destroy();
        });
      }

      childTippyInstances = [];
      removeEventListeners();
      originalDestroy();
    };

    instance.enable = function () {
      originalEnable();
      childTippyInstances.forEach(function (instance) {
        return instance.enable();
      });
      disabled = false;
    };

    instance.disable = function () {
      originalDisable();
      childTippyInstances.forEach(function (instance) {
        return instance.disable();
      });
      disabled = true;
    };

    addEventListeners(instance);
  }

  normalizedReturnValue.forEach(applyMutations);
  return returnValue;
}

tippy.setDefaultProps({
  render: render
});

var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["Allowed"] = "ALLOWED";
    NotificationStatus["Muted"] = "MUTED";
})(NotificationStatus || (NotificationStatus = {}));
var NotificationStatus$1 = NotificationStatus;

var chatBoxComponent = () => ({
    isMinimized: true,
    isContactOpened: true,
    isMessageBoxOpened: false,
    isNotificationAllowed: window.localStorage.getItem('basement.notification') === NotificationStatus$1.Allowed,
    hasNotificationPermission: Push.Permission.has(),
    online: true,
    totalUnreadMessages: 0,
    /**
     * Hook during the initialization phase of the current Alpine component.
     */
    init() {
        void window.axios.get('/sanctum/csrf-cookie');
        window.addEventListener('online', () => {
            this.online = true;
        });
        window.addEventListener('offline', () => {
            this.online = false;
        });
        this.$watch('isNotificationAllowed', this.watchNotificationStatus.bind(this));
        this.$el.addEventListener('send-push-notification', this.sendPushNotification.bind(this));
        this.registerTippy();
    },
    /**
     * Request push notification permission to the browser.
     */
    requestNotificationPermission() {
        Push.Permission.request(() => {
            this.isNotificationAllowed = true;
            this.hasNotificationPermission = true;
        }, () => {
            this.hasNotificationPermission = false;
        });
    },
    /**
     * Send push notification permission to the browser if allowed.
     */
    sendPushNotification(event) {
        if (this.isNotificationAllowed === false) {
            return;
        }
        void Push.create(event.detail.title, {
            body: event.detail.body,
            icon: event.detail.icon,
            timeout: 4000,
            onClick() {
                window.focus();
                this.close();
            },
        });
    },
    /**
     * Register tippy.js instance creation for child elements.
     */
    registerTippy() {
        delegate(this.$el, {
            animation: 'fade',
            arrow: true,
            target: '.basement [data-title]',
            onShow(instance) {
                const title = instance.reference.getAttribute('data-title');
                if (title !== null) {
                    instance.setContent(title);
                }
            },
        });
    },
    /**
     * Watch when the notification status changes.
     */
    watchNotificationStatus(newValue) {
        const status = newValue === true ? NotificationStatus$1.Allowed
            : NotificationStatus$1.Muted;
        window.localStorage.setItem('basement.notification', status);
    },
});

var formatExports$1 = {};
var format$1 = {
  get exports(){ return formatExports$1; },
  set exports(v){ formatExports$1 = v; },
};

var formatExports = {};
var format = {
  get exports(){ return formatExports; },
  set exports(v){ formatExports = v; },
};

var interopRequireDefaultExports = {};
var interopRequireDefault = {
  get exports(){ return interopRequireDefaultExports; },
  set exports(v){ interopRequireDefaultExports = v; },
};

(function (module) {
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	}
	module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (interopRequireDefault));

var isValidExports = {};
var isValid = {
  get exports(){ return isValidExports; },
  set exports(v){ isValidExports = v; },
};

var isDateExports = {};
var isDate = {
  get exports(){ return isDateExports; },
  set exports(v){ isDateExports = v; },
};

var _typeofExports = {};
var _typeof$1 = {
  get exports(){ return _typeofExports; },
  set exports(v){ _typeofExports = v; },
};

(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
	}
	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (_typeof$1));

var requiredArgsExports = {};
var requiredArgs$1 = {
  get exports(){ return requiredArgsExports; },
  set exports(v){ requiredArgsExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = requiredArgs;
	function requiredArgs(required, args) {
	  if (args.length < required) {
	    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
	  }
	}
	module.exports = exports.default;
} (requiredArgs$1, requiredArgsExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDate;
	var _typeof2 = _interopRequireDefault(_typeofExports);
	var _index = _interopRequireDefault(requiredArgsExports);
	/**
	 * @name isDate
	 * @category Common Helpers
	 * @summary Is the given value a date?
	 *
	 * @description
	 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
	 *
	 * @param {*} value - the value to check
	 * @returns {boolean} true if the given value is a date
	 * @throws {TypeError} 1 arguments required
	 *
	 * @example
	 * // For a valid date:
	 * const result = isDate(new Date())
	 * //=> true
	 *
	 * @example
	 * // For an invalid date:
	 * const result = isDate(new Date(NaN))
	 * //=> true
	 *
	 * @example
	 * // For some value:
	 * const result = isDate('2014-02-31')
	 * //=> false
	 *
	 * @example
	 * // For an object:
	 * const result = isDate({})
	 * //=> false
	 */
	function isDate(value) {
	  (0, _index.default)(1, arguments);
	  return value instanceof Date || (0, _typeof2.default)(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
	}
	module.exports = exports.default;
} (isDate, isDateExports));

var toDateExports$1 = {};
var toDate$2 = {
  get exports(){ return toDateExports$1; },
  set exports(v){ toDateExports$1 = v; },
};

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toDate;
	var _typeof2 = _interopRequireDefault(_typeofExports);
	var _index = _interopRequireDefault(requiredArgsExports);
	/**
	 * @name toDate
	 * @category Common Helpers
	 * @summary Convert the given argument to an instance of Date.
	 *
	 * @description
	 * Convert the given argument to an instance of Date.
	 *
	 * If the argument is an instance of Date, the function returns its clone.
	 *
	 * If the argument is a number, it is treated as a timestamp.
	 *
	 * If the argument is none of the above, the function returns Invalid Date.
	 *
	 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
	 *
	 * @param {Date|Number} argument - the value to convert
	 * @returns {Date} the parsed date in the local time zone
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Clone the date:
	 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
	 * //=> Tue Feb 11 2014 11:30:30
	 *
	 * @example
	 * // Convert the timestamp to date:
	 * const result = toDate(1392098430000)
	 * //=> Tue Feb 11 2014 11:30:30
	 */
	function toDate(argument) {
	  (0, _index.default)(1, arguments);
	  var argStr = Object.prototype.toString.call(argument);

	  // Clone the date
	  if (argument instanceof Date || (0, _typeof2.default)(argument) === 'object' && argStr === '[object Date]') {
	    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
	    return new Date(argument.getTime());
	  } else if (typeof argument === 'number' || argStr === '[object Number]') {
	    return new Date(argument);
	  } else {
	    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
	      // eslint-disable-next-line no-console
	      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
	      // eslint-disable-next-line no-console
	      console.warn(new Error().stack);
	    }
	    return new Date(NaN);
	  }
	}
	module.exports = exports.default;
} (toDate$2, toDateExports$1));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isValid;
	var _index = _interopRequireDefault(isDateExports);
	var _index2 = _interopRequireDefault(toDateExports$1);
	var _index3 = _interopRequireDefault(requiredArgsExports);
	/**
	 * @name isValid
	 * @category Common Helpers
	 * @summary Is the given date valid?
	 *
	 * @description
	 * Returns false if argument is Invalid Date and true otherwise.
	 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
	 * Invalid Date is a Date, whose time value is NaN.
	 *
	 * Time value of Date: http://es5.github.io/#x15.9.1.1
	 *
	 * @param {*} date - the date to check
	 * @returns {Boolean} the date is valid
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // For the valid date:
	 * const result = isValid(new Date(2014, 1, 31))
	 * //=> true
	 *
	 * @example
	 * // For the value, convertable into a date:
	 * const result = isValid(1393804800000)
	 * //=> true
	 *
	 * @example
	 * // For the invalid date:
	 * const result = isValid(new Date(''))
	 * //=> false
	 */
	function isValid(dirtyDate) {
	  (0, _index3.default)(1, arguments);
	  if (!(0, _index.default)(dirtyDate) && typeof dirtyDate !== 'number') {
	    return false;
	  }
	  var date = (0, _index2.default)(dirtyDate);
	  return !isNaN(Number(date));
	}
	module.exports = exports.default;
} (isValid, isValidExports));

var subMillisecondsExports = {};
var subMilliseconds = {
  get exports(){ return subMillisecondsExports; },
  set exports(v){ subMillisecondsExports = v; },
};

var addMillisecondsExports = {};
var addMilliseconds = {
  get exports(){ return addMillisecondsExports; },
  set exports(v){ addMillisecondsExports = v; },
};

var toIntegerExports = {};
var toInteger$1 = {
  get exports(){ return toIntegerExports; },
  set exports(v){ toIntegerExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toInteger;
	function toInteger(dirtyNumber) {
	  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
	    return NaN;
	  }
	  var number = Number(dirtyNumber);
	  if (isNaN(number)) {
	    return number;
	  }
	  return number < 0 ? Math.ceil(number) : Math.floor(number);
	}
	module.exports = exports.default;
} (toInteger$1, toIntegerExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = addMilliseconds;
	var _index = _interopRequireDefault(toIntegerExports);
	var _index2 = _interopRequireDefault(toDateExports$1);
	var _index3 = _interopRequireDefault(requiredArgsExports);
	/**
	 * @name addMilliseconds
	 * @category Millisecond Helpers
	 * @summary Add the specified number of milliseconds to the given date.
	 *
	 * @description
	 * Add the specified number of milliseconds to the given date.
	 *
	 * @param {Date|Number} date - the date to be changed
	 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
	 * @returns {Date} the new date with the milliseconds added
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
	 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
	 * //=> Thu Jul 10 2014 12:45:30.750
	 */
	function addMilliseconds(dirtyDate, dirtyAmount) {
	  (0, _index3.default)(2, arguments);
	  var timestamp = (0, _index2.default)(dirtyDate).getTime();
	  var amount = (0, _index.default)(dirtyAmount);
	  return new Date(timestamp + amount);
	}
	module.exports = exports.default;
} (addMilliseconds, addMillisecondsExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = subMilliseconds;
	var _index = _interopRequireDefault(addMillisecondsExports);
	var _index2 = _interopRequireDefault(requiredArgsExports);
	var _index3 = _interopRequireDefault(toIntegerExports);
	/**
	 * @name subMilliseconds
	 * @category Millisecond Helpers
	 * @summary Subtract the specified number of milliseconds from the given date.
	 *
	 * @description
	 * Subtract the specified number of milliseconds from the given date.
	 *
	 * @param {Date|Number} date - the date to be changed
	 * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
	 * @returns {Date} the new date with the milliseconds subtracted
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
	 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
	 * //=> Thu Jul 10 2014 12:45:29.250
	 */
	function subMilliseconds(dirtyDate, dirtyAmount) {
	  (0, _index2.default)(2, arguments);
	  var amount = (0, _index3.default)(dirtyAmount);
	  return (0, _index.default)(dirtyDate, -amount);
	}
	module.exports = exports.default;
} (subMilliseconds, subMillisecondsExports));

var formattersExports$1 = {};
var formatters$1 = {
  get exports(){ return formattersExports$1; },
  set exports(v){ formattersExports$1 = v; },
};

var getUTCDayOfYearExports = {};
var getUTCDayOfYear = {
  get exports(){ return getUTCDayOfYearExports; },
  set exports(v){ getUTCDayOfYearExports = v; },
};

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUTCDayOfYear;
	var _index = _interopRequireDefault(toDateExports$1);
	var _index2 = _interopRequireDefault(requiredArgsExports);
	var MILLISECONDS_IN_DAY = 86400000;
	function getUTCDayOfYear(dirtyDate) {
	  (0, _index2.default)(1, arguments);
	  var date = (0, _index.default)(dirtyDate);
	  var timestamp = date.getTime();
	  date.setUTCMonth(0, 1);
	  date.setUTCHours(0, 0, 0, 0);
	  var startOfYearTimestamp = date.getTime();
	  var difference = timestamp - startOfYearTimestamp;
	  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
	}
	module.exports = exports.default;
} (getUTCDayOfYear, getUTCDayOfYearExports));

var getUTCISOWeekExports = {};
var getUTCISOWeek = {
  get exports(){ return getUTCISOWeekExports; },
  set exports(v){ getUTCISOWeekExports = v; },
};

var startOfUTCISOWeekExports = {};
var startOfUTCISOWeek = {
  get exports(){ return startOfUTCISOWeekExports; },
  set exports(v){ startOfUTCISOWeekExports = v; },
};

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startOfUTCISOWeek;
	var _index = _interopRequireDefault(toDateExports$1);
	var _index2 = _interopRequireDefault(requiredArgsExports);
	function startOfUTCISOWeek(dirtyDate) {
	  (0, _index2.default)(1, arguments);
	  var weekStartsOn = 1;
	  var date = (0, _index.default)(dirtyDate);
	  var day = date.getUTCDay();
	  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	  date.setUTCDate(date.getUTCDate() - diff);
	  date.setUTCHours(0, 0, 0, 0);
	  return date;
	}
	module.exports = exports.default;
} (startOfUTCISOWeek, startOfUTCISOWeekExports));

var startOfUTCISOWeekYearExports = {};
var startOfUTCISOWeekYear = {
  get exports(){ return startOfUTCISOWeekYearExports; },
  set exports(v){ startOfUTCISOWeekYearExports = v; },
};

var getUTCISOWeekYearExports = {};
var getUTCISOWeekYear = {
  get exports(){ return getUTCISOWeekYearExports; },
  set exports(v){ getUTCISOWeekYearExports = v; },
};

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUTCISOWeekYear;
	var _index = _interopRequireDefault(toDateExports$1);
	var _index2 = _interopRequireDefault(requiredArgsExports);
	var _index3 = _interopRequireDefault(startOfUTCISOWeekExports);
	function getUTCISOWeekYear(dirtyDate) {
	  (0, _index2.default)(1, arguments);
	  var date = (0, _index.default)(dirtyDate);
	  var year = date.getUTCFullYear();
	  var fourthOfJanuaryOfNextYear = new Date(0);
	  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
	  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
	  var startOfNextYear = (0, _index3.default)(fourthOfJanuaryOfNextYear);
	  var fourthOfJanuaryOfThisYear = new Date(0);
	  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
	  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
	  var startOfThisYear = (0, _index3.default)(fourthOfJanuaryOfThisYear);
	  if (date.getTime() >= startOfNextYear.getTime()) {
	    return year + 1;
	  } else if (date.getTime() >= startOfThisYear.getTime()) {
	    return year;
	  } else {
	    return year - 1;
	  }
	}
	module.exports = exports.default;
} (getUTCISOWeekYear, getUTCISOWeekYearExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startOfUTCISOWeekYear;
	var _index = _interopRequireDefault(getUTCISOWeekYearExports);
	var _index2 = _interopRequireDefault(startOfUTCISOWeekExports);
	var _index3 = _interopRequireDefault(requiredArgsExports);
	function startOfUTCISOWeekYear(dirtyDate) {
	  (0, _index3.default)(1, arguments);
	  var year = (0, _index.default)(dirtyDate);
	  var fourthOfJanuary = new Date(0);
	  fourthOfJanuary.setUTCFullYear(year, 0, 4);
	  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
	  var date = (0, _index2.default)(fourthOfJanuary);
	  return date;
	}
	module.exports = exports.default;
} (startOfUTCISOWeekYear, startOfUTCISOWeekYearExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUTCISOWeek;
	var _index = _interopRequireDefault(toDateExports$1);
	var _index2 = _interopRequireDefault(startOfUTCISOWeekExports);
	var _index3 = _interopRequireDefault(startOfUTCISOWeekYearExports);
	var _index4 = _interopRequireDefault(requiredArgsExports);
	var MILLISECONDS_IN_WEEK = 604800000;
	function getUTCISOWeek(dirtyDate) {
	  (0, _index4.default)(1, arguments);
	  var date = (0, _index.default)(dirtyDate);
	  var diff = (0, _index2.default)(date).getTime() - (0, _index3.default)(date).getTime();

	  // Round the number of days to the nearest integer
	  // because the number of milliseconds in a week is not constant
	  // (e.g. it's different in the week of the daylight saving time clock shift)
	  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
	}
	module.exports = exports.default;
} (getUTCISOWeek, getUTCISOWeekExports));

var getUTCWeekExports = {};
var getUTCWeek = {
  get exports(){ return getUTCWeekExports; },
  set exports(v){ getUTCWeekExports = v; },
};

var startOfUTCWeekExports = {};
var startOfUTCWeek = {
  get exports(){ return startOfUTCWeekExports; },
  set exports(v){ startOfUTCWeekExports = v; },
};

var defaultOptions$1 = {};

Object.defineProperty(defaultOptions$1, "__esModule", {
  value: true
});
defaultOptions$1.getDefaultOptions = getDefaultOptions;
defaultOptions$1.setDefaultOptions = setDefaultOptions;
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startOfUTCWeek;
	var _index = _interopRequireDefault(toDateExports$1);
	var _index2 = _interopRequireDefault(requiredArgsExports);
	var _index3 = _interopRequireDefault(toIntegerExports);
	var _index4 = defaultOptions$1;
	function startOfUTCWeek(dirtyDate, options) {
	  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
	  (0, _index2.default)(1, arguments);
	  var defaultOptions = (0, _index4.getDefaultOptions)();
	  var weekStartsOn = (0, _index3.default)((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

	  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
	  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
	    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
	  }
	  var date = (0, _index.default)(dirtyDate);
	  var day = date.getUTCDay();
	  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	  date.setUTCDate(date.getUTCDate() - diff);
	  date.setUTCHours(0, 0, 0, 0);
	  return date;
	}
	module.exports = exports.default;
} (startOfUTCWeek, startOfUTCWeekExports));

var startOfUTCWeekYearExports = {};
var startOfUTCWeekYear = {
  get exports(){ return startOfUTCWeekYearExports; },
  set exports(v){ startOfUTCWeekYearExports = v; },
};

var getUTCWeekYearExports = {};
var getUTCWeekYear = {
  get exports(){ return getUTCWeekYearExports; },
  set exports(v){ getUTCWeekYearExports = v; },
};

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUTCWeekYear;
	var _index = _interopRequireDefault(toDateExports$1);
	var _index2 = _interopRequireDefault(requiredArgsExports);
	var _index3 = _interopRequireDefault(startOfUTCWeekExports);
	var _index4 = _interopRequireDefault(toIntegerExports);
	var _index5 = defaultOptions$1;
	function getUTCWeekYear(dirtyDate, options) {
	  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
	  (0, _index2.default)(1, arguments);
	  var date = (0, _index.default)(dirtyDate);
	  var year = date.getUTCFullYear();
	  var defaultOptions = (0, _index5.getDefaultOptions)();
	  var firstWeekContainsDate = (0, _index4.default)((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);

	  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
	  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
	    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
	  }
	  var firstWeekOfNextYear = new Date(0);
	  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
	  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
	  var startOfNextYear = (0, _index3.default)(firstWeekOfNextYear, options);
	  var firstWeekOfThisYear = new Date(0);
	  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
	  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
	  var startOfThisYear = (0, _index3.default)(firstWeekOfThisYear, options);
	  if (date.getTime() >= startOfNextYear.getTime()) {
	    return year + 1;
	  } else if (date.getTime() >= startOfThisYear.getTime()) {
	    return year;
	  } else {
	    return year - 1;
	  }
	}
	module.exports = exports.default;
} (getUTCWeekYear, getUTCWeekYearExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startOfUTCWeekYear;
	var _index = _interopRequireDefault(getUTCWeekYearExports);
	var _index2 = _interopRequireDefault(requiredArgsExports);
	var _index3 = _interopRequireDefault(startOfUTCWeekExports);
	var _index4 = _interopRequireDefault(toIntegerExports);
	var _index5 = defaultOptions$1;
	function startOfUTCWeekYear(dirtyDate, options) {
	  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
	  (0, _index2.default)(1, arguments);
	  var defaultOptions = (0, _index5.getDefaultOptions)();
	  var firstWeekContainsDate = (0, _index4.default)((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
	  var year = (0, _index.default)(dirtyDate, options);
	  var firstWeek = new Date(0);
	  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
	  firstWeek.setUTCHours(0, 0, 0, 0);
	  var date = (0, _index3.default)(firstWeek, options);
	  return date;
	}
	module.exports = exports.default;
} (startOfUTCWeekYear, startOfUTCWeekYearExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUTCWeek;
	var _index = _interopRequireDefault(toDateExports$1);
	var _index2 = _interopRequireDefault(startOfUTCWeekExports);
	var _index3 = _interopRequireDefault(startOfUTCWeekYearExports);
	var _index4 = _interopRequireDefault(requiredArgsExports);
	var MILLISECONDS_IN_WEEK = 604800000;
	function getUTCWeek(dirtyDate, options) {
	  (0, _index4.default)(1, arguments);
	  var date = (0, _index.default)(dirtyDate);
	  var diff = (0, _index2.default)(date, options).getTime() - (0, _index3.default)(date, options).getTime();

	  // Round the number of days to the nearest integer
	  // because the number of milliseconds in a week is not constant
	  // (e.g. it's different in the week of the daylight saving time clock shift)
	  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
	}
	module.exports = exports.default;
} (getUTCWeek, getUTCWeekExports));

var addLeadingZerosExports = {};
var addLeadingZeros = {
  get exports(){ return addLeadingZerosExports; },
  set exports(v){ addLeadingZerosExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = addLeadingZeros;
	function addLeadingZeros(number, targetLength) {
	  var sign = number < 0 ? '-' : '';
	  var output = Math.abs(number).toString();
	  while (output.length < targetLength) {
	    output = '0' + output;
	  }
	  return sign + output;
	}
	module.exports = exports.default;
} (addLeadingZeros, addLeadingZerosExports));

var lightFormattersExports = {};
var lightFormatters = {
  get exports(){ return lightFormattersExports; },
  set exports(v){ lightFormattersExports = v; },
};

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	var _index = _interopRequireDefault(addLeadingZerosExports);
	/*
	 * |     | Unit                           |     | Unit                           |
	 * |-----|--------------------------------|-----|--------------------------------|
	 * |  a  | AM, PM                         |  A* |                                |
	 * |  d  | Day of month                   |  D  |                                |
	 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
	 * |  m  | Minute                         |  M  | Month                          |
	 * |  s  | Second                         |  S  | Fraction of second             |
	 * |  y  | Year (abs)                     |  Y  |                                |
	 *
	 * Letters marked by * are not implemented but reserved by Unicode standard.
	 */

	var formatters = {
	  // Year
	  y: function y(date, token) {
	    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
	    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
	    // |----------|-------|----|-------|-------|-------|
	    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
	    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
	    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
	    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
	    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

	    var signedYear = date.getUTCFullYear();
	    // Returns 1 for 1 BC (which is year 0 in JavaScript)
	    var year = signedYear > 0 ? signedYear : 1 - signedYear;
	    return (0, _index.default)(token === 'yy' ? year % 100 : year, token.length);
	  },
	  // Month
	  M: function M(date, token) {
	    var month = date.getUTCMonth();
	    return token === 'M' ? String(month + 1) : (0, _index.default)(month + 1, 2);
	  },
	  // Day of the month
	  d: function d(date, token) {
	    return (0, _index.default)(date.getUTCDate(), token.length);
	  },
	  // AM or PM
	  a: function a(date, token) {
	    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
	    switch (token) {
	      case 'a':
	      case 'aa':
	        return dayPeriodEnumValue.toUpperCase();
	      case 'aaa':
	        return dayPeriodEnumValue;
	      case 'aaaaa':
	        return dayPeriodEnumValue[0];
	      case 'aaaa':
	      default:
	        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
	    }
	  },
	  // Hour [1-12]
	  h: function h(date, token) {
	    return (0, _index.default)(date.getUTCHours() % 12 || 12, token.length);
	  },
	  // Hour [0-23]
	  H: function H(date, token) {
	    return (0, _index.default)(date.getUTCHours(), token.length);
	  },
	  // Minute
	  m: function m(date, token) {
	    return (0, _index.default)(date.getUTCMinutes(), token.length);
	  },
	  // Second
	  s: function s(date, token) {
	    return (0, _index.default)(date.getUTCSeconds(), token.length);
	  },
	  // Fraction of second
	  S: function S(date, token) {
	    var numberOfDigits = token.length;
	    var milliseconds = date.getUTCMilliseconds();
	    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
	    return (0, _index.default)(fractionalSeconds, token.length);
	  }
	};
	var _default = formatters;
	exports.default = _default;
	module.exports = exports.default;
} (lightFormatters, lightFormattersExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	var _index = _interopRequireDefault(getUTCDayOfYearExports);
	var _index2 = _interopRequireDefault(getUTCISOWeekExports);
	var _index3 = _interopRequireDefault(getUTCISOWeekYearExports);
	var _index4 = _interopRequireDefault(getUTCWeekExports);
	var _index5 = _interopRequireDefault(getUTCWeekYearExports);
	var _index6 = _interopRequireDefault(addLeadingZerosExports);
	var _index7 = _interopRequireDefault(lightFormattersExports);
	var dayPeriodEnum = {
	  am: 'am',
	  pm: 'pm',
	  midnight: 'midnight',
	  noon: 'noon',
	  morning: 'morning',
	  afternoon: 'afternoon',
	  evening: 'evening',
	  night: 'night'
	};
	/*
	 * |     | Unit                           |     | Unit                           |
	 * |-----|--------------------------------|-----|--------------------------------|
	 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
	 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
	 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
	 * |  d  | Day of month                   |  D  | Day of year                    |
	 * |  e  | Local day of week              |  E  | Day of week                    |
	 * |  f  |                                |  F* | Day of week in month           |
	 * |  g* | Modified Julian day            |  G  | Era                            |
	 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
	 * |  i! | ISO day of week                |  I! | ISO week of year               |
	 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
	 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
	 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
	 * |  m  | Minute                         |  M  | Month                          |
	 * |  n  |                                |  N  |                                |
	 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
	 * |  p! | Long localized time            |  P! | Long localized date            |
	 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
	 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
	 * |  s  | Second                         |  S  | Fraction of second             |
	 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
	 * |  u  | Extended year                  |  U* | Cyclic year                    |
	 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
	 * |  w  | Local week of year             |  W* | Week of month                  |
	 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
	 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
	 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
	 *
	 * Letters marked by * are not implemented but reserved by Unicode standard.
	 *
	 * Letters marked by ! are non-standard, but implemented by date-fns:
	 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
	 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
	 *   i.e. 7 for Sunday, 1 for Monday, etc.
	 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
	 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
	 *   `R` is supposed to be used in conjunction with `I` and `i`
	 *   for universal ISO week-numbering date, whereas
	 *   `Y` is supposed to be used in conjunction with `w` and `e`
	 *   for week-numbering date specific to the locale.
	 * - `P` is long localized date format
	 * - `p` is long localized time format
	 */

	var formatters = {
	  // Era
	  G: function G(date, token, localize) {
	    var era = date.getUTCFullYear() > 0 ? 1 : 0;
	    switch (token) {
	      // AD, BC
	      case 'G':
	      case 'GG':
	      case 'GGG':
	        return localize.era(era, {
	          width: 'abbreviated'
	        });
	      // A, B
	      case 'GGGGG':
	        return localize.era(era, {
	          width: 'narrow'
	        });
	      // Anno Domini, Before Christ
	      case 'GGGG':
	      default:
	        return localize.era(era, {
	          width: 'wide'
	        });
	    }
	  },
	  // Year
	  y: function y(date, token, localize) {
	    // Ordinal number
	    if (token === 'yo') {
	      var signedYear = date.getUTCFullYear();
	      // Returns 1 for 1 BC (which is year 0 in JavaScript)
	      var year = signedYear > 0 ? signedYear : 1 - signedYear;
	      return localize.ordinalNumber(year, {
	        unit: 'year'
	      });
	    }
	    return _index7.default.y(date, token);
	  },
	  // Local week-numbering year
	  Y: function Y(date, token, localize, options) {
	    var signedWeekYear = (0, _index5.default)(date, options);
	    // Returns 1 for 1 BC (which is year 0 in JavaScript)
	    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

	    // Two digit year
	    if (token === 'YY') {
	      var twoDigitYear = weekYear % 100;
	      return (0, _index6.default)(twoDigitYear, 2);
	    }

	    // Ordinal number
	    if (token === 'Yo') {
	      return localize.ordinalNumber(weekYear, {
	        unit: 'year'
	      });
	    }

	    // Padding
	    return (0, _index6.default)(weekYear, token.length);
	  },
	  // ISO week-numbering year
	  R: function R(date, token) {
	    var isoWeekYear = (0, _index3.default)(date);

	    // Padding
	    return (0, _index6.default)(isoWeekYear, token.length);
	  },
	  // Extended year. This is a single number designating the year of this calendar system.
	  // The main difference between `y` and `u` localizers are B.C. years:
	  // | Year | `y` | `u` |
	  // |------|-----|-----|
	  // | AC 1 |   1 |   1 |
	  // | BC 1 |   1 |   0 |
	  // | BC 2 |   2 |  -1 |
	  // Also `yy` always returns the last two digits of a year,
	  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
	  u: function u(date, token) {
	    var year = date.getUTCFullYear();
	    return (0, _index6.default)(year, token.length);
	  },
	  // Quarter
	  Q: function Q(date, token, localize) {
	    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
	    switch (token) {
	      // 1, 2, 3, 4
	      case 'Q':
	        return String(quarter);
	      // 01, 02, 03, 04
	      case 'QQ':
	        return (0, _index6.default)(quarter, 2);
	      // 1st, 2nd, 3rd, 4th
	      case 'Qo':
	        return localize.ordinalNumber(quarter, {
	          unit: 'quarter'
	        });
	      // Q1, Q2, Q3, Q4
	      case 'QQQ':
	        return localize.quarter(quarter, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
	      case 'QQQQQ':
	        return localize.quarter(quarter, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // 1st quarter, 2nd quarter, ...
	      case 'QQQQ':
	      default:
	        return localize.quarter(quarter, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Stand-alone quarter
	  q: function q(date, token, localize) {
	    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
	    switch (token) {
	      // 1, 2, 3, 4
	      case 'q':
	        return String(quarter);
	      // 01, 02, 03, 04
	      case 'qq':
	        return (0, _index6.default)(quarter, 2);
	      // 1st, 2nd, 3rd, 4th
	      case 'qo':
	        return localize.ordinalNumber(quarter, {
	          unit: 'quarter'
	        });
	      // Q1, Q2, Q3, Q4
	      case 'qqq':
	        return localize.quarter(quarter, {
	          width: 'abbreviated',
	          context: 'standalone'
	        });
	      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
	      case 'qqqqq':
	        return localize.quarter(quarter, {
	          width: 'narrow',
	          context: 'standalone'
	        });
	      // 1st quarter, 2nd quarter, ...
	      case 'qqqq':
	      default:
	        return localize.quarter(quarter, {
	          width: 'wide',
	          context: 'standalone'
	        });
	    }
	  },
	  // Month
	  M: function M(date, token, localize) {
	    var month = date.getUTCMonth();
	    switch (token) {
	      case 'M':
	      case 'MM':
	        return _index7.default.M(date, token);
	      // 1st, 2nd, ..., 12th
	      case 'Mo':
	        return localize.ordinalNumber(month + 1, {
	          unit: 'month'
	        });
	      // Jan, Feb, ..., Dec
	      case 'MMM':
	        return localize.month(month, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // J, F, ..., D
	      case 'MMMMM':
	        return localize.month(month, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // January, February, ..., December
	      case 'MMMM':
	      default:
	        return localize.month(month, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Stand-alone month
	  L: function L(date, token, localize) {
	    var month = date.getUTCMonth();
	    switch (token) {
	      // 1, 2, ..., 12
	      case 'L':
	        return String(month + 1);
	      // 01, 02, ..., 12
	      case 'LL':
	        return (0, _index6.default)(month + 1, 2);
	      // 1st, 2nd, ..., 12th
	      case 'Lo':
	        return localize.ordinalNumber(month + 1, {
	          unit: 'month'
	        });
	      // Jan, Feb, ..., Dec
	      case 'LLL':
	        return localize.month(month, {
	          width: 'abbreviated',
	          context: 'standalone'
	        });
	      // J, F, ..., D
	      case 'LLLLL':
	        return localize.month(month, {
	          width: 'narrow',
	          context: 'standalone'
	        });
	      // January, February, ..., December
	      case 'LLLL':
	      default:
	        return localize.month(month, {
	          width: 'wide',
	          context: 'standalone'
	        });
	    }
	  },
	  // Local week of year
	  w: function w(date, token, localize, options) {
	    var week = (0, _index4.default)(date, options);
	    if (token === 'wo') {
	      return localize.ordinalNumber(week, {
	        unit: 'week'
	      });
	    }
	    return (0, _index6.default)(week, token.length);
	  },
	  // ISO week of year
	  I: function I(date, token, localize) {
	    var isoWeek = (0, _index2.default)(date);
	    if (token === 'Io') {
	      return localize.ordinalNumber(isoWeek, {
	        unit: 'week'
	      });
	    }
	    return (0, _index6.default)(isoWeek, token.length);
	  },
	  // Day of the month
	  d: function d(date, token, localize) {
	    if (token === 'do') {
	      return localize.ordinalNumber(date.getUTCDate(), {
	        unit: 'date'
	      });
	    }
	    return _index7.default.d(date, token);
	  },
	  // Day of year
	  D: function D(date, token, localize) {
	    var dayOfYear = (0, _index.default)(date);
	    if (token === 'Do') {
	      return localize.ordinalNumber(dayOfYear, {
	        unit: 'dayOfYear'
	      });
	    }
	    return (0, _index6.default)(dayOfYear, token.length);
	  },
	  // Day of week
	  E: function E(date, token, localize) {
	    var dayOfWeek = date.getUTCDay();
	    switch (token) {
	      // Tue
	      case 'E':
	      case 'EE':
	      case 'EEE':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // T
	      case 'EEEEE':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // Tu
	      case 'EEEEEE':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'formatting'
	        });
	      // Tuesday
	      case 'EEEE':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Local day of week
	  e: function e(date, token, localize, options) {
	    var dayOfWeek = date.getUTCDay();
	    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
	    switch (token) {
	      // Numerical value (Nth day of week with current locale or weekStartsOn)
	      case 'e':
	        return String(localDayOfWeek);
	      // Padded numerical value
	      case 'ee':
	        return (0, _index6.default)(localDayOfWeek, 2);
	      // 1st, 2nd, ..., 7th
	      case 'eo':
	        return localize.ordinalNumber(localDayOfWeek, {
	          unit: 'day'
	        });
	      case 'eee':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // T
	      case 'eeeee':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // Tu
	      case 'eeeeee':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'formatting'
	        });
	      // Tuesday
	      case 'eeee':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Stand-alone local day of week
	  c: function c(date, token, localize, options) {
	    var dayOfWeek = date.getUTCDay();
	    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
	    switch (token) {
	      // Numerical value (same as in `e`)
	      case 'c':
	        return String(localDayOfWeek);
	      // Padded numerical value
	      case 'cc':
	        return (0, _index6.default)(localDayOfWeek, token.length);
	      // 1st, 2nd, ..., 7th
	      case 'co':
	        return localize.ordinalNumber(localDayOfWeek, {
	          unit: 'day'
	        });
	      case 'ccc':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'standalone'
	        });
	      // T
	      case 'ccccc':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'standalone'
	        });
	      // Tu
	      case 'cccccc':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'standalone'
	        });
	      // Tuesday
	      case 'cccc':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'standalone'
	        });
	    }
	  },
	  // ISO day of week
	  i: function i(date, token, localize) {
	    var dayOfWeek = date.getUTCDay();
	    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
	    switch (token) {
	      // 2
	      case 'i':
	        return String(isoDayOfWeek);
	      // 02
	      case 'ii':
	        return (0, _index6.default)(isoDayOfWeek, token.length);
	      // 2nd
	      case 'io':
	        return localize.ordinalNumber(isoDayOfWeek, {
	          unit: 'day'
	        });
	      // Tue
	      case 'iii':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // T
	      case 'iiiii':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // Tu
	      case 'iiiiii':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'formatting'
	        });
	      // Tuesday
	      case 'iiii':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // AM or PM
	  a: function a(date, token, localize) {
	    var hours = date.getUTCHours();
	    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
	    switch (token) {
	      case 'a':
	      case 'aa':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      case 'aaa':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        }).toLowerCase();
	      case 'aaaaa':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      case 'aaaa':
	      default:
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // AM, PM, midnight, noon
	  b: function b(date, token, localize) {
	    var hours = date.getUTCHours();
	    var dayPeriodEnumValue;
	    if (hours === 12) {
	      dayPeriodEnumValue = dayPeriodEnum.noon;
	    } else if (hours === 0) {
	      dayPeriodEnumValue = dayPeriodEnum.midnight;
	    } else {
	      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
	    }
	    switch (token) {
	      case 'b':
	      case 'bb':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      case 'bbb':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        }).toLowerCase();
	      case 'bbbbb':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      case 'bbbb':
	      default:
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // in the morning, in the afternoon, in the evening, at night
	  B: function B(date, token, localize) {
	    var hours = date.getUTCHours();
	    var dayPeriodEnumValue;
	    if (hours >= 17) {
	      dayPeriodEnumValue = dayPeriodEnum.evening;
	    } else if (hours >= 12) {
	      dayPeriodEnumValue = dayPeriodEnum.afternoon;
	    } else if (hours >= 4) {
	      dayPeriodEnumValue = dayPeriodEnum.morning;
	    } else {
	      dayPeriodEnumValue = dayPeriodEnum.night;
	    }
	    switch (token) {
	      case 'B':
	      case 'BB':
	      case 'BBB':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      case 'BBBBB':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      case 'BBBB':
	      default:
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Hour [1-12]
	  h: function h(date, token, localize) {
	    if (token === 'ho') {
	      var hours = date.getUTCHours() % 12;
	      if (hours === 0) hours = 12;
	      return localize.ordinalNumber(hours, {
	        unit: 'hour'
	      });
	    }
	    return _index7.default.h(date, token);
	  },
	  // Hour [0-23]
	  H: function H(date, token, localize) {
	    if (token === 'Ho') {
	      return localize.ordinalNumber(date.getUTCHours(), {
	        unit: 'hour'
	      });
	    }
	    return _index7.default.H(date, token);
	  },
	  // Hour [0-11]
	  K: function K(date, token, localize) {
	    var hours = date.getUTCHours() % 12;
	    if (token === 'Ko') {
	      return localize.ordinalNumber(hours, {
	        unit: 'hour'
	      });
	    }
	    return (0, _index6.default)(hours, token.length);
	  },
	  // Hour [1-24]
	  k: function k(date, token, localize) {
	    var hours = date.getUTCHours();
	    if (hours === 0) hours = 24;
	    if (token === 'ko') {
	      return localize.ordinalNumber(hours, {
	        unit: 'hour'
	      });
	    }
	    return (0, _index6.default)(hours, token.length);
	  },
	  // Minute
	  m: function m(date, token, localize) {
	    if (token === 'mo') {
	      return localize.ordinalNumber(date.getUTCMinutes(), {
	        unit: 'minute'
	      });
	    }
	    return _index7.default.m(date, token);
	  },
	  // Second
	  s: function s(date, token, localize) {
	    if (token === 'so') {
	      return localize.ordinalNumber(date.getUTCSeconds(), {
	        unit: 'second'
	      });
	    }
	    return _index7.default.s(date, token);
	  },
	  // Fraction of second
	  S: function S(date, token) {
	    return _index7.default.S(date, token);
	  },
	  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
	  X: function X(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();
	    if (timezoneOffset === 0) {
	      return 'Z';
	    }
	    switch (token) {
	      // Hours and optional minutes
	      case 'X':
	        return formatTimezoneWithOptionalMinutes(timezoneOffset);

	      // Hours, minutes and optional seconds without `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `XX`
	      case 'XXXX':
	      case 'XX':
	        // Hours and minutes without `:` delimiter
	        return formatTimezone(timezoneOffset);

	      // Hours, minutes and optional seconds with `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `XXX`
	      case 'XXXXX':
	      case 'XXX': // Hours and minutes with `:` delimiter
	      default:
	        return formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
	  x: function x(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();
	    switch (token) {
	      // Hours and optional minutes
	      case 'x':
	        return formatTimezoneWithOptionalMinutes(timezoneOffset);

	      // Hours, minutes and optional seconds without `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `xx`
	      case 'xxxx':
	      case 'xx':
	        // Hours and minutes without `:` delimiter
	        return formatTimezone(timezoneOffset);

	      // Hours, minutes and optional seconds with `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `xxx`
	      case 'xxxxx':
	      case 'xxx': // Hours and minutes with `:` delimiter
	      default:
	        return formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (GMT)
	  O: function O(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();
	    switch (token) {
	      // Short
	      case 'O':
	      case 'OO':
	      case 'OOO':
	        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
	      // Long
	      case 'OOOO':
	      default:
	        return 'GMT' + formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (specific non-location)
	  z: function z(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();
	    switch (token) {
	      // Short
	      case 'z':
	      case 'zz':
	      case 'zzz':
	        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
	      // Long
	      case 'zzzz':
	      default:
	        return 'GMT' + formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Seconds timestamp
	  t: function t(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timestamp = Math.floor(originalDate.getTime() / 1000);
	    return (0, _index6.default)(timestamp, token.length);
	  },
	  // Milliseconds timestamp
	  T: function T(date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timestamp = originalDate.getTime();
	    return (0, _index6.default)(timestamp, token.length);
	  }
	};
	function formatTimezoneShort(offset, dirtyDelimiter) {
	  var sign = offset > 0 ? '-' : '+';
	  var absOffset = Math.abs(offset);
	  var hours = Math.floor(absOffset / 60);
	  var minutes = absOffset % 60;
	  if (minutes === 0) {
	    return sign + String(hours);
	  }
	  var delimiter = dirtyDelimiter || '';
	  return sign + String(hours) + delimiter + (0, _index6.default)(minutes, 2);
	}
	function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
	  if (offset % 60 === 0) {
	    var sign = offset > 0 ? '-' : '+';
	    return sign + (0, _index6.default)(Math.abs(offset) / 60, 2);
	  }
	  return formatTimezone(offset, dirtyDelimiter);
	}
	function formatTimezone(offset, dirtyDelimiter) {
	  var delimiter = dirtyDelimiter || '';
	  var sign = offset > 0 ? '-' : '+';
	  var absOffset = Math.abs(offset);
	  var hours = (0, _index6.default)(Math.floor(absOffset / 60), 2);
	  var minutes = (0, _index6.default)(absOffset % 60, 2);
	  return sign + hours + delimiter + minutes;
	}
	var _default = formatters;
	exports.default = _default;
	module.exports = exports.default;
} (formatters$1, formattersExports$1));

var longFormattersExports = {};
var longFormatters = {
  get exports(){ return longFormattersExports; },
  set exports(v){ longFormattersExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	var dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
	  switch (pattern) {
	    case 'P':
	      return formatLong.date({
	        width: 'short'
	      });
	    case 'PP':
	      return formatLong.date({
	        width: 'medium'
	      });
	    case 'PPP':
	      return formatLong.date({
	        width: 'long'
	      });
	    case 'PPPP':
	    default:
	      return formatLong.date({
	        width: 'full'
	      });
	  }
	};
	var timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
	  switch (pattern) {
	    case 'p':
	      return formatLong.time({
	        width: 'short'
	      });
	    case 'pp':
	      return formatLong.time({
	        width: 'medium'
	      });
	    case 'ppp':
	      return formatLong.time({
	        width: 'long'
	      });
	    case 'pppp':
	    default:
	      return formatLong.time({
	        width: 'full'
	      });
	  }
	};
	var dateTimeLongFormatter = function dateTimeLongFormatter(pattern, formatLong) {
	  var matchResult = pattern.match(/(P+)(p+)?/) || [];
	  var datePattern = matchResult[1];
	  var timePattern = matchResult[2];
	  if (!timePattern) {
	    return dateLongFormatter(pattern, formatLong);
	  }
	  var dateTimeFormat;
	  switch (datePattern) {
	    case 'P':
	      dateTimeFormat = formatLong.dateTime({
	        width: 'short'
	      });
	      break;
	    case 'PP':
	      dateTimeFormat = formatLong.dateTime({
	        width: 'medium'
	      });
	      break;
	    case 'PPP':
	      dateTimeFormat = formatLong.dateTime({
	        width: 'long'
	      });
	      break;
	    case 'PPPP':
	    default:
	      dateTimeFormat = formatLong.dateTime({
	        width: 'full'
	      });
	      break;
	  }
	  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
	};
	var longFormatters = {
	  p: timeLongFormatter,
	  P: dateTimeLongFormatter
	};
	var _default = longFormatters;
	exports.default = _default;
	module.exports = exports.default;
} (longFormatters, longFormattersExports));

var getTimezoneOffsetInMillisecondsExports = {};
var getTimezoneOffsetInMilliseconds = {
  get exports(){ return getTimezoneOffsetInMillisecondsExports; },
  set exports(v){ getTimezoneOffsetInMillisecondsExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getTimezoneOffsetInMilliseconds;
	/**
	 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
	 * They usually appear for dates that denote time before the timezones were introduced
	 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
	 * and GMT+01:00:00 after that date)
	 *
	 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
	 * which would lead to incorrect calculations.
	 *
	 * This function returns the timezone offset in milliseconds that takes seconds in account.
	 */
	function getTimezoneOffsetInMilliseconds(date) {
	  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
	  utcDate.setUTCFullYear(date.getFullYear());
	  return date.getTime() - utcDate.getTime();
	}
	module.exports = exports.default;
} (getTimezoneOffsetInMilliseconds, getTimezoneOffsetInMillisecondsExports));

var protectedTokens = {};

Object.defineProperty(protectedTokens, "__esModule", {
  value: true
});
protectedTokens.isProtectedDayOfYearToken = isProtectedDayOfYearToken;
protectedTokens.isProtectedWeekYearToken = isProtectedWeekYearToken;
protectedTokens.throwProtectedError = throwProtectedError;
var protectedDayOfYearTokens = ['D', 'DD'];
var protectedWeekYearTokens = ['YY', 'YYYY'];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format, input) {
  if (token === 'YYYY') {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'YY') {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'D') {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'DD') {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}

var defaultLocaleExports = {};
var defaultLocale = {
  get exports(){ return defaultLocaleExports; },
  set exports(v){ defaultLocaleExports = v; },
};

var enUSExports = {};
var enUS = {
  get exports(){ return enUSExports; },
  set exports(v){ enUSExports = v; },
};

var formatDistanceExports = {};
var formatDistance = {
  get exports(){ return formatDistanceExports; },
  set exports(v){ formatDistanceExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	var formatDistanceLocale = {
	  lessThanXSeconds: {
	    one: 'less than a second',
	    other: 'less than {{count}} seconds'
	  },
	  xSeconds: {
	    one: '1 second',
	    other: '{{count}} seconds'
	  },
	  halfAMinute: 'half a minute',
	  lessThanXMinutes: {
	    one: 'less than a minute',
	    other: 'less than {{count}} minutes'
	  },
	  xMinutes: {
	    one: '1 minute',
	    other: '{{count}} minutes'
	  },
	  aboutXHours: {
	    one: 'about 1 hour',
	    other: 'about {{count}} hours'
	  },
	  xHours: {
	    one: '1 hour',
	    other: '{{count}} hours'
	  },
	  xDays: {
	    one: '1 day',
	    other: '{{count}} days'
	  },
	  aboutXWeeks: {
	    one: 'about 1 week',
	    other: 'about {{count}} weeks'
	  },
	  xWeeks: {
	    one: '1 week',
	    other: '{{count}} weeks'
	  },
	  aboutXMonths: {
	    one: 'about 1 month',
	    other: 'about {{count}} months'
	  },
	  xMonths: {
	    one: '1 month',
	    other: '{{count}} months'
	  },
	  aboutXYears: {
	    one: 'about 1 year',
	    other: 'about {{count}} years'
	  },
	  xYears: {
	    one: '1 year',
	    other: '{{count}} years'
	  },
	  overXYears: {
	    one: 'over 1 year',
	    other: 'over {{count}} years'
	  },
	  almostXYears: {
	    one: 'almost 1 year',
	    other: 'almost {{count}} years'
	  }
	};
	var formatDistance = function formatDistance(token, count, options) {
	  var result;
	  var tokenValue = formatDistanceLocale[token];
	  if (typeof tokenValue === 'string') {
	    result = tokenValue;
	  } else if (count === 1) {
	    result = tokenValue.one;
	  } else {
	    result = tokenValue.other.replace('{{count}}', count.toString());
	  }
	  if (options !== null && options !== void 0 && options.addSuffix) {
	    if (options.comparison && options.comparison > 0) {
	      return 'in ' + result;
	    } else {
	      return result + ' ago';
	    }
	  }
	  return result;
	};
	var _default = formatDistance;
	exports.default = _default;
	module.exports = exports.default;
} (formatDistance, formatDistanceExports));

var formatLongExports = {};
var formatLong = {
  get exports(){ return formatLongExports; },
  set exports(v){ formatLongExports = v; },
};

var buildFormatLongFnExports = {};
var buildFormatLongFn = {
  get exports(){ return buildFormatLongFnExports; },
  set exports(v){ buildFormatLongFnExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = buildFormatLongFn;
	function buildFormatLongFn(args) {
	  return function () {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    // TODO: Remove String()
	    var width = options.width ? String(options.width) : args.defaultWidth;
	    var format = args.formats[width] || args.formats[args.defaultWidth];
	    return format;
	  };
	}
	module.exports = exports.default;
} (buildFormatLongFn, buildFormatLongFnExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	var _index = _interopRequireDefault(buildFormatLongFnExports);
	var dateFormats = {
	  full: 'EEEE, MMMM do, y',
	  long: 'MMMM do, y',
	  medium: 'MMM d, y',
	  short: 'MM/dd/yyyy'
	};
	var timeFormats = {
	  full: 'h:mm:ss a zzzz',
	  long: 'h:mm:ss a z',
	  medium: 'h:mm:ss a',
	  short: 'h:mm a'
	};
	var dateTimeFormats = {
	  full: "{{date}} 'at' {{time}}",
	  long: "{{date}} 'at' {{time}}",
	  medium: '{{date}}, {{time}}',
	  short: '{{date}}, {{time}}'
	};
	var formatLong = {
	  date: (0, _index.default)({
	    formats: dateFormats,
	    defaultWidth: 'full'
	  }),
	  time: (0, _index.default)({
	    formats: timeFormats,
	    defaultWidth: 'full'
	  }),
	  dateTime: (0, _index.default)({
	    formats: dateTimeFormats,
	    defaultWidth: 'full'
	  })
	};
	var _default = formatLong;
	exports.default = _default;
	module.exports = exports.default;
} (formatLong, formatLongExports));

var formatRelativeExports = {};
var formatRelative = {
  get exports(){ return formatRelativeExports; },
  set exports(v){ formatRelativeExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	var formatRelativeLocale = {
	  lastWeek: "'last' eeee 'at' p",
	  yesterday: "'yesterday at' p",
	  today: "'today at' p",
	  tomorrow: "'tomorrow at' p",
	  nextWeek: "eeee 'at' p",
	  other: 'P'
	};
	var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
	  return formatRelativeLocale[token];
	};
	var _default = formatRelative;
	exports.default = _default;
	module.exports = exports.default;
} (formatRelative, formatRelativeExports));

var localizeExports = {};
var localize = {
  get exports(){ return localizeExports; },
  set exports(v){ localizeExports = v; },
};

var buildLocalizeFnExports = {};
var buildLocalizeFn = {
  get exports(){ return buildLocalizeFnExports; },
  set exports(v){ buildLocalizeFnExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = buildLocalizeFn;
	function buildLocalizeFn(args) {
	  return function (dirtyIndex, options) {
	    var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
	    var valuesArray;
	    if (context === 'formatting' && args.formattingValues) {
	      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
	      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
	      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
	    } else {
	      var _defaultWidth = args.defaultWidth;
	      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
	      valuesArray = args.values[_width] || args.values[_defaultWidth];
	    }
	    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
	    // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
	    return valuesArray[index];
	  };
	}
	module.exports = exports.default;
} (buildLocalizeFn, buildLocalizeFnExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	var _index = _interopRequireDefault(buildLocalizeFnExports);
	var eraValues = {
	  narrow: ['B', 'A'],
	  abbreviated: ['BC', 'AD'],
	  wide: ['Before Christ', 'Anno Domini']
	};
	var quarterValues = {
	  narrow: ['1', '2', '3', '4'],
	  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
	  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
	};

	// Note: in English, the names of days of the week and months are capitalized.
	// If you are making a new locale based on this one, check if the same is true for the language you're working on.
	// Generally, formatted dates should look like they are in the middle of a sentence,
	// e.g. in Spanish language the weekdays and months should be in the lowercase.
	var monthValues = {
	  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
	  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	};
	var dayValues = {
	  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	};
	var dayPeriodValues = {
	  narrow: {
	    am: 'a',
	    pm: 'p',
	    midnight: 'mi',
	    noon: 'n',
	    morning: 'morning',
	    afternoon: 'afternoon',
	    evening: 'evening',
	    night: 'night'
	  },
	  abbreviated: {
	    am: 'AM',
	    pm: 'PM',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'morning',
	    afternoon: 'afternoon',
	    evening: 'evening',
	    night: 'night'
	  },
	  wide: {
	    am: 'a.m.',
	    pm: 'p.m.',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'morning',
	    afternoon: 'afternoon',
	    evening: 'evening',
	    night: 'night'
	  }
	};
	var formattingDayPeriodValues = {
	  narrow: {
	    am: 'a',
	    pm: 'p',
	    midnight: 'mi',
	    noon: 'n',
	    morning: 'in the morning',
	    afternoon: 'in the afternoon',
	    evening: 'in the evening',
	    night: 'at night'
	  },
	  abbreviated: {
	    am: 'AM',
	    pm: 'PM',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'in the morning',
	    afternoon: 'in the afternoon',
	    evening: 'in the evening',
	    night: 'at night'
	  },
	  wide: {
	    am: 'a.m.',
	    pm: 'p.m.',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'in the morning',
	    afternoon: 'in the afternoon',
	    evening: 'in the evening',
	    night: 'at night'
	  }
	};
	var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
	  var number = Number(dirtyNumber);

	  // If ordinal numbers depend on context, for example,
	  // if they are different for different grammatical genders,
	  // use `options.unit`.
	  //
	  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
	  // 'day', 'hour', 'minute', 'second'.

	  var rem100 = number % 100;
	  if (rem100 > 20 || rem100 < 10) {
	    switch (rem100 % 10) {
	      case 1:
	        return number + 'st';
	      case 2:
	        return number + 'nd';
	      case 3:
	        return number + 'rd';
	    }
	  }
	  return number + 'th';
	};
	var localize = {
	  ordinalNumber: ordinalNumber,
	  era: (0, _index.default)({
	    values: eraValues,
	    defaultWidth: 'wide'
	  }),
	  quarter: (0, _index.default)({
	    values: quarterValues,
	    defaultWidth: 'wide',
	    argumentCallback: function argumentCallback(quarter) {
	      return quarter - 1;
	    }
	  }),
	  month: (0, _index.default)({
	    values: monthValues,
	    defaultWidth: 'wide'
	  }),
	  day: (0, _index.default)({
	    values: dayValues,
	    defaultWidth: 'wide'
	  }),
	  dayPeriod: (0, _index.default)({
	    values: dayPeriodValues,
	    defaultWidth: 'wide',
	    formattingValues: formattingDayPeriodValues,
	    defaultFormattingWidth: 'wide'
	  })
	};
	var _default = localize;
	exports.default = _default;
	module.exports = exports.default;
} (localize, localizeExports));

var matchExports = {};
var match = {
  get exports(){ return matchExports; },
  set exports(v){ matchExports = v; },
};

var buildMatchFnExports = {};
var buildMatchFn = {
  get exports(){ return buildMatchFnExports; },
  set exports(v){ buildMatchFnExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = buildMatchFn;
	function buildMatchFn(args) {
	  return function (string) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var width = options.width;
	    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
	    var matchResult = string.match(matchPattern);
	    if (!matchResult) {
	      return null;
	    }
	    var matchedString = matchResult[0];
	    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
	    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
	      return pattern.test(matchedString);
	    }) : findKey(parsePatterns, function (pattern) {
	      return pattern.test(matchedString);
	    });
	    var value;
	    value = args.valueCallback ? args.valueCallback(key) : key;
	    value = options.valueCallback ? options.valueCallback(value) : value;
	    var rest = string.slice(matchedString.length);
	    return {
	      value: value,
	      rest: rest
	    };
	  };
	}
	function findKey(object, predicate) {
	  for (var key in object) {
	    if (object.hasOwnProperty(key) && predicate(object[key])) {
	      return key;
	    }
	  }
	  return undefined;
	}
	function findIndex(array, predicate) {
	  for (var key = 0; key < array.length; key++) {
	    if (predicate(array[key])) {
	      return key;
	    }
	  }
	  return undefined;
	}
	module.exports = exports.default;
} (buildMatchFn, buildMatchFnExports));

var buildMatchPatternFnExports = {};
var buildMatchPatternFn = {
  get exports(){ return buildMatchPatternFnExports; },
  set exports(v){ buildMatchPatternFnExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = buildMatchPatternFn;
	function buildMatchPatternFn(args) {
	  return function (string) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var matchResult = string.match(args.matchPattern);
	    if (!matchResult) return null;
	    var matchedString = matchResult[0];
	    var parseResult = string.match(args.parsePattern);
	    if (!parseResult) return null;
	    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
	    value = options.valueCallback ? options.valueCallback(value) : value;
	    var rest = string.slice(matchedString.length);
	    return {
	      value: value,
	      rest: rest
	    };
	  };
	}
	module.exports = exports.default;
} (buildMatchPatternFn, buildMatchPatternFnExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	var _index = _interopRequireDefault(buildMatchFnExports);
	var _index2 = _interopRequireDefault(buildMatchPatternFnExports);
	var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
	var parseOrdinalNumberPattern = /\d+/i;
	var matchEraPatterns = {
	  narrow: /^(b|a)/i,
	  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
	  wide: /^(before christ|before common era|anno domini|common era)/i
	};
	var parseEraPatterns = {
	  any: [/^b/i, /^(a|c)/i]
	};
	var matchQuarterPatterns = {
	  narrow: /^[1234]/i,
	  abbreviated: /^q[1234]/i,
	  wide: /^[1234](th|st|nd|rd)? quarter/i
	};
	var parseQuarterPatterns = {
	  any: [/1/i, /2/i, /3/i, /4/i]
	};
	var matchMonthPatterns = {
	  narrow: /^[jfmasond]/i,
	  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
	  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
	};
	var parseMonthPatterns = {
	  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
	  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
	};
	var matchDayPatterns = {
	  narrow: /^[smtwf]/i,
	  short: /^(su|mo|tu|we|th|fr|sa)/i,
	  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
	  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
	};
	var parseDayPatterns = {
	  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
	  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
	};
	var matchDayPeriodPatterns = {
	  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
	  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
	};
	var parseDayPeriodPatterns = {
	  any: {
	    am: /^a/i,
	    pm: /^p/i,
	    midnight: /^mi/i,
	    noon: /^no/i,
	    morning: /morning/i,
	    afternoon: /afternoon/i,
	    evening: /evening/i,
	    night: /night/i
	  }
	};
	var match = {
	  ordinalNumber: (0, _index2.default)({
	    matchPattern: matchOrdinalNumberPattern,
	    parsePattern: parseOrdinalNumberPattern,
	    valueCallback: function valueCallback(value) {
	      return parseInt(value, 10);
	    }
	  }),
	  era: (0, _index.default)({
	    matchPatterns: matchEraPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseEraPatterns,
	    defaultParseWidth: 'any'
	  }),
	  quarter: (0, _index.default)({
	    matchPatterns: matchQuarterPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseQuarterPatterns,
	    defaultParseWidth: 'any',
	    valueCallback: function valueCallback(index) {
	      return index + 1;
	    }
	  }),
	  month: (0, _index.default)({
	    matchPatterns: matchMonthPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseMonthPatterns,
	    defaultParseWidth: 'any'
	  }),
	  day: (0, _index.default)({
	    matchPatterns: matchDayPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseDayPatterns,
	    defaultParseWidth: 'any'
	  }),
	  dayPeriod: (0, _index.default)({
	    matchPatterns: matchDayPeriodPatterns,
	    defaultMatchWidth: 'any',
	    parsePatterns: parseDayPeriodPatterns,
	    defaultParseWidth: 'any'
	  })
	};
	var _default = match;
	exports.default = _default;
	module.exports = exports.default;
} (match, matchExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	var _index = _interopRequireDefault(formatDistanceExports);
	var _index2 = _interopRequireDefault(formatLongExports);
	var _index3 = _interopRequireDefault(formatRelativeExports);
	var _index4 = _interopRequireDefault(localizeExports);
	var _index5 = _interopRequireDefault(matchExports);
	/**
	 * @type {Locale}
	 * @category Locales
	 * @summary English locale (United States).
	 * @language English
	 * @iso-639-2 eng
	 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
	 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
	 */
	var locale = {
	  code: 'en-US',
	  formatDistance: _index.default,
	  formatLong: _index2.default,
	  formatRelative: _index3.default,
	  localize: _index4.default,
	  match: _index5.default,
	  options: {
	    weekStartsOn: 0 /* Sunday */,
	    firstWeekContainsDate: 1
	  }
	};
	var _default = locale;
	exports.default = _default;
	module.exports = exports.default;
} (enUS, enUSExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;
	var _index = _interopRequireDefault(enUSExports);
	var _default = _index.default;
	exports.default = _default;
	module.exports = exports.default;
} (defaultLocale, defaultLocaleExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = format;
	var _index = _interopRequireDefault(isValidExports);
	var _index2 = _interopRequireDefault(subMillisecondsExports);
	var _index3 = _interopRequireDefault(toDateExports$1);
	var _index4 = _interopRequireDefault(formattersExports$1);
	var _index5 = _interopRequireDefault(longFormattersExports);
	var _index6 = _interopRequireDefault(getTimezoneOffsetInMillisecondsExports);
	var _index7 = protectedTokens;
	var _index8 = _interopRequireDefault(toIntegerExports);
	var _index9 = _interopRequireDefault(requiredArgsExports);
	var _index10 = defaultOptions$1;
	var _index11 = _interopRequireDefault(defaultLocaleExports);
	// This RegExp consists of three parts separated by `|`:
	// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
	//   (one of the certain letters followed by `o`)
	// - (\w)\1* matches any sequences of the same letter
	// - '' matches two quote characters in a row
	// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
	//   except a single quote symbol, which ends the sequence.
	//   Two quote characters do not end the sequence.
	//   If there is no matching single quote
	//   then the sequence will continue until the end of the string.
	// - . matches any single character unmatched by previous parts of the RegExps
	var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

	// This RegExp catches symbols escaped by quotes, and also
	// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
	var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
	var escapedStringRegExp = /^'([^]*?)'?$/;
	var doubleQuoteRegExp = /''/g;
	var unescapedLatinCharacterRegExp = /[a-zA-Z]/;

	/**
	 * @name format
	 * @category Common Helpers
	 * @summary Format the date.
	 *
	 * @description
	 * Return the formatted date string in the given format. The result may vary by locale.
	 *
	 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
	 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
	 *
	 * The characters wrapped between two single quotes characters (') are escaped.
	 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
	 * (see the last example)
	 *
	 * Format of the string is based on Unicode Technical Standard #35:
	 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
	 * with a few additions (see note 7 below the table).
	 *
	 * Accepted patterns:
	 * | Unit                            | Pattern | Result examples                   | Notes |
	 * |---------------------------------|---------|-----------------------------------|-------|
	 * | Era                             | G..GGG  | AD, BC                            |       |
	 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
	 * |                                 | GGGGG   | A, B                              |       |
	 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
	 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
	 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
	 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
	 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
	 * |                                 | yyyyy   | ...                               | 3,5   |
	 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
	 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
	 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
	 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
	 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
	 * |                                 | YYYYY   | ...                               | 3,5   |
	 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
	 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
	 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
	 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
	 * |                                 | RRRRR   | ...                               | 3,5,7 |
	 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
	 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
	 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
	 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
	 * |                                 | uuuuu   | ...                               | 3,5   |
	 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
	 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
	 * |                                 | QQ      | 01, 02, 03, 04                    |       |
	 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
	 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
	 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
	 * |                                 | qq      | 01, 02, 03, 04                    |       |
	 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
	 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
	 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
	 * |                                 | MM      | 01, 02, ..., 12                   |       |
	 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
	 * |                                 | MMMM    | January, February, ..., December  | 2     |
	 * |                                 | MMMMM   | J, F, ..., D                      |       |
	 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
	 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
	 * |                                 | LL      | 01, 02, ..., 12                   |       |
	 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
	 * |                                 | LLLL    | January, February, ..., December  | 2     |
	 * |                                 | LLLLL   | J, F, ..., D                      |       |
	 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
	 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
	 * |                                 | ww      | 01, 02, ..., 53                   |       |
	 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
	 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
	 * |                                 | II      | 01, 02, ..., 53                   | 7     |
	 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
	 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
	 * |                                 | dd      | 01, 02, ..., 31                   |       |
	 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
	 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
	 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
	 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
	 * |                                 | DDDD    | ...                               | 3     |
	 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
	 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
	 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
	 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
	 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
	 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
	 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
	 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
	 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
	 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
	 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
	 * |                                 | ee      | 02, 03, ..., 01                   |       |
	 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
	 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
	 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
	 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
	 * |                                 | cc      | 02, 03, ..., 01                   |       |
	 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
	 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
	 * | AM, PM                          | a..aa   | AM, PM                            |       |
	 * |                                 | aaa     | am, pm                            |       |
	 * |                                 | aaaa    | a.m., p.m.                        | 2     |
	 * |                                 | aaaaa   | a, p                              |       |
	 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
	 * |                                 | bbb     | am, pm, noon, midnight            |       |
	 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
	 * |                                 | bbbbb   | a, p, n, mi                       |       |
	 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
	 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
	 * |                                 | BBBBB   | at night, in the morning, ...     |       |
	 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
	 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
	 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
	 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
	 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
	 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
	 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
	 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
	 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
	 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
	 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
	 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
	 * | Minute                          | m       | 0, 1, ..., 59                     |       |
	 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
	 * |                                 | mm      | 00, 01, ..., 59                   |       |
	 * | Second                          | s       | 0, 1, ..., 59                     |       |
	 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
	 * |                                 | ss      | 00, 01, ..., 59                   |       |
	 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
	 * |                                 | SS      | 00, 01, ..., 99                   |       |
	 * |                                 | SSS     | 000, 001, ..., 999                |       |
	 * |                                 | SSSS    | ...                               | 3     |
	 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
	 * |                                 | XX      | -0800, +0530, Z                   |       |
	 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
	 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
	 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
	 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
	 * |                                 | xx      | -0800, +0530, +0000               |       |
	 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
	 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
	 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
	 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
	 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
	 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
	 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
	 * | Seconds timestamp               | t       | 512969520                         | 7     |
	 * |                                 | tt      | ...                               | 3,7   |
	 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
	 * |                                 | TT      | ...                               | 3,7   |
	 * | Long localized date             | P       | 04/29/1453                        | 7     |
	 * |                                 | PP      | Apr 29, 1453                      | 7     |
	 * |                                 | PPP     | April 29th, 1453                  | 7     |
	 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
	 * | Long localized time             | p       | 12:00 AM                          | 7     |
	 * |                                 | pp      | 12:00:00 AM                       | 7     |
	 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
	 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
	 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
	 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
	 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
	 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
	 * Notes:
	 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
	 *    are the same as "stand-alone" units, but are different in some languages.
	 *    "Formatting" units are declined according to the rules of the language
	 *    in the context of a date. "Stand-alone" units are always nominative singular:
	 *
	 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
	 *
	 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
	 *
	 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
	 *    the single quote characters (see below).
	 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
	 *    the output will be the same as default pattern for this unit, usually
	 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
	 *    are marked with "2" in the last column of the table.
	 *
	 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
	 *
	 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
	 *    The output will be padded with zeros to match the length of the pattern.
	 *
	 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
	 *
	 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
	 *    These tokens represent the shortest form of the quarter.
	 *
	 * 5. The main difference between `y` and `u` patterns are B.C. years:
	 *
	 *    | Year | `y` | `u` |
	 *    |------|-----|-----|
	 *    | AC 1 |   1 |   1 |
	 *    | BC 1 |   1 |   0 |
	 *    | BC 2 |   2 |  -1 |
	 *
	 *    Also `yy` always returns the last two digits of a year,
	 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
	 *
	 *    | Year | `yy` | `uu` |
	 *    |------|------|------|
	 *    | 1    |   01 |   01 |
	 *    | 14   |   14 |   14 |
	 *    | 376  |   76 |  376 |
	 *    | 1453 |   53 | 1453 |
	 *
	 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
	 *    except local week-numbering years are dependent on `options.weekStartsOn`
	 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
	 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
	 *
	 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
	 *    so right now these tokens fall back to GMT timezones.
	 *
	 * 7. These patterns are not in the Unicode Technical Standard #35:
	 *    - `i`: ISO day of week
	 *    - `I`: ISO week of year
	 *    - `R`: ISO week-numbering year
	 *    - `t`: seconds timestamp
	 *    - `T`: milliseconds timestamp
	 *    - `o`: ordinal number modifier
	 *    - `P`: long localized date
	 *    - `p`: long localized time
	 *
	 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
	 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
	 *
	 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
	 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
	 *
	 * @param {Date|Number} date - the original date
	 * @param {String} format - the string of tokens
	 * @param {Object} [options] - an object with options.
	 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
	 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
	 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
	 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
	 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
	 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
	 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
	 * @returns {String} the formatted date string
	 * @throws {TypeError} 2 arguments required
	 * @throws {RangeError} `date` must not be Invalid Date
	 * @throws {RangeError} `options.locale` must contain `localize` property
	 * @throws {RangeError} `options.locale` must contain `formatLong` property
	 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
	 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
	 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
	 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
	 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
	 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
	 * @throws {RangeError} format string contains an unescaped latin alphabet character
	 *
	 * @example
	 * // Represent 11 February 2014 in middle-endian format:
	 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
	 * //=> '02/11/2014'
	 *
	 * @example
	 * // Represent 2 July 2014 in Esperanto:
	 * import { eoLocale } from 'date-fns/locale/eo'
	 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
	 *   locale: eoLocale
	 * })
	 * //=> '2-a de julio 2014'
	 *
	 * @example
	 * // Escape string by single quote characters:
	 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
	 * //=> "3 o'clock"
	 */

	function format(dirtyDate, dirtyFormatStr, options) {
	  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
	  (0, _index9.default)(2, arguments);
	  var formatStr = String(dirtyFormatStr);
	  var defaultOptions = (0, _index10.getDefaultOptions)();
	  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _index11.default;
	  var firstWeekContainsDate = (0, _index8.default)((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);

	  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
	  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
	    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
	  }
	  var weekStartsOn = (0, _index8.default)((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);

	  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
	  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
	    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
	  }
	  if (!locale.localize) {
	    throw new RangeError('locale must contain localize property');
	  }
	  if (!locale.formatLong) {
	    throw new RangeError('locale must contain formatLong property');
	  }
	  var originalDate = (0, _index3.default)(dirtyDate);
	  if (!(0, _index.default)(originalDate)) {
	    throw new RangeError('Invalid time value');
	  }

	  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
	  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
	  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
	  var timezoneOffset = (0, _index6.default)(originalDate);
	  var utcDate = (0, _index2.default)(originalDate, timezoneOffset);
	  var formatterOptions = {
	    firstWeekContainsDate: firstWeekContainsDate,
	    weekStartsOn: weekStartsOn,
	    locale: locale,
	    _originalDate: originalDate
	  };
	  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
	    var firstCharacter = substring[0];
	    if (firstCharacter === 'p' || firstCharacter === 'P') {
	      var longFormatter = _index5.default[firstCharacter];
	      return longFormatter(substring, locale.formatLong);
	    }
	    return substring;
	  }).join('').match(formattingTokensRegExp).map(function (substring) {
	    // Replace two single quote characters with one single quote character
	    if (substring === "''") {
	      return "'";
	    }
	    var firstCharacter = substring[0];
	    if (firstCharacter === "'") {
	      return cleanEscapedString(substring);
	    }
	    var formatter = _index4.default[firstCharacter];
	    if (formatter) {
	      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && (0, _index7.isProtectedWeekYearToken)(substring)) {
	        (0, _index7.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
	      }
	      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && (0, _index7.isProtectedDayOfYearToken)(substring)) {
	        (0, _index7.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
	      }
	      return formatter(utcDate, substring, locale.localize, formatterOptions);
	    }
	    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
	      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
	    }
	    return substring;
	  }).join('');
	  return result;
	}
	function cleanEscapedString(input) {
	  var matched = input.match(escapedStringRegExp);
	  if (!matched) {
	    return input;
	  }
	  return matched[1].replace(doubleQuoteRegExp, "'");
	}
	module.exports = exports.default;
} (format, formatExports));

var formattersExports = {};
var formatters = {
  get exports(){ return formattersExports; },
  set exports(v){ formattersExports = v; },
};

var tzIntlTimeZoneNameExports = {};
var tzIntlTimeZoneName = {
  get exports(){ return tzIntlTimeZoneNameExports; },
  set exports(v){ tzIntlTimeZoneNameExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = tzIntlTimeZoneName;

	/**
	 * Returns the formatted time zone name of the provided `timeZone` or the current
	 * system time zone if omitted, accounting for DST according to the UTC value of
	 * the date.
	 */
	function tzIntlTimeZoneName(length, date, options) {
	  var dtf = getDTF(length, options.timeZone, options.locale);
	  return dtf.formatToParts ? partsTimeZone(dtf, date) : hackyTimeZone(dtf, date);
	}

	function partsTimeZone(dtf, date) {
	  var formatted = dtf.formatToParts(date);

	  for (var i = formatted.length - 1; i >= 0; --i) {
	    if (formatted[i].type === 'timeZoneName') {
	      return formatted[i].value;
	    }
	  }
	}

	function hackyTimeZone(dtf, date) {
	  var formatted = dtf.format(date).replace(/\u200E/g, '');
	  var tzNameMatch = / [\w-+ ]+$/.exec(formatted);
	  return tzNameMatch ? tzNameMatch[0].substr(1) : '';
	} // If a locale has been provided `en-US` is used as a fallback in case it is an
	// invalid locale, otherwise the locale is left undefined to use the system locale.


	function getDTF(length, timeZone, locale) {
	  if (locale && !locale.code) {
	    throw new Error("date-fns-tz error: Please set a language code on the locale object imported from date-fns, e.g. `locale.code = 'en-US'`");
	  }

	  return new Intl.DateTimeFormat(locale ? [locale.code, 'en-US'] : undefined, {
	    timeZone: timeZone,
	    timeZoneName: length
	  });
	}

	module.exports = exports.default;
} (tzIntlTimeZoneName, tzIntlTimeZoneNameExports));

var tzParseTimezoneExports = {};
var tzParseTimezone = {
  get exports(){ return tzParseTimezoneExports; },
  set exports(v){ tzParseTimezoneExports = v; },
};

var tzTokenizeDateExports = {};
var tzTokenizeDate = {
  get exports(){ return tzTokenizeDateExports; },
  set exports(v){ tzTokenizeDateExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = tzTokenizeDate;

	/**
	 * Returns the [year, month, day, hour, minute, seconds] tokens of the provided
	 * `date` as it will be rendered in the `timeZone`.
	 */
	function tzTokenizeDate(date, timeZone) {
	  var dtf = getDateTimeFormat(timeZone);
	  return dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
	}

	var typeToPos = {
	  year: 0,
	  month: 1,
	  day: 2,
	  hour: 3,
	  minute: 4,
	  second: 5
	};

	function partsOffset(dtf, date) {
	  try {
	    var formatted = dtf.formatToParts(date);
	    var filled = [];

	    for (var i = 0; i < formatted.length; i++) {
	      var pos = typeToPos[formatted[i].type];

	      if (pos >= 0) {
	        filled[pos] = parseInt(formatted[i].value, 10);
	      }
	    }

	    return filled;
	  } catch (error) {
	    if (error instanceof RangeError) {
	      return [NaN];
	    }

	    throw error;
	  }
	}

	function hackyOffset(dtf, date) {
	  var formatted = dtf.format(date).replace(/\u200E/g, '');
	  var parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted); // var [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed
	  // return [fYear, fMonth, fDay, fHour, fMinute, fSecond]

	  return [parsed[3], parsed[1], parsed[2], parsed[4], parsed[5], parsed[6]];
	} // Get a cached Intl.DateTimeFormat instance for the IANA `timeZone`. This can be used
	// to get deterministic local date/time output according to the `en-US` locale which
	// can be used to extract local time parts as necessary.


	var dtfCache = {};

	function getDateTimeFormat(timeZone) {
	  if (!dtfCache[timeZone]) {
	    // New browsers use `hourCycle`, IE and Chrome <73 does not support it and uses `hour12`
	    var testDateFormatted = new Intl.DateTimeFormat('en-US', {
	      hour12: false,
	      timeZone: 'America/New_York',
	      year: 'numeric',
	      month: 'numeric',
	      day: '2-digit',
	      hour: '2-digit',
	      minute: '2-digit',
	      second: '2-digit'
	    }).format(new Date('2014-06-25T04:00:00.123Z'));
	    var hourCycleSupported = testDateFormatted === '06/25/2014, 00:00:00' || testDateFormatted === '‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00';
	    dtfCache[timeZone] = hourCycleSupported ? new Intl.DateTimeFormat('en-US', {
	      hour12: false,
	      timeZone: timeZone,
	      year: 'numeric',
	      month: 'numeric',
	      day: '2-digit',
	      hour: '2-digit',
	      minute: '2-digit',
	      second: '2-digit'
	    }) : new Intl.DateTimeFormat('en-US', {
	      hourCycle: 'h23',
	      timeZone: timeZone,
	      year: 'numeric',
	      month: 'numeric',
	      day: '2-digit',
	      hour: '2-digit',
	      minute: '2-digit',
	      second: '2-digit'
	    });
	  }

	  return dtfCache[timeZone];
	}

	module.exports = exports.default;
} (tzTokenizeDate, tzTokenizeDateExports));

var newDateUTCExports = {};
var newDateUTC = {
  get exports(){ return newDateUTCExports; },
  set exports(v){ newDateUTCExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = newDateUTC;

	/**
	 * Use instead of `new Date(Date.UTC(...))` to support years below 100 which doesn't work
	 * otherwise due to the nature of the
	 * [`Date` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#interpretation_of_two-digit_years.
	 *
	 * For `Date.UTC(...)`, use `newDateUTC(...).getTime()`.
	 */
	function newDateUTC(fullYear, month, day, hour, minute, second, millisecond) {
	  var utcDate = new Date(0);
	  utcDate.setUTCFullYear(fullYear, month, day);
	  utcDate.setUTCHours(hour, minute, second, millisecond);
	  return utcDate;
	}

	module.exports = exports.default;
} (newDateUTC, newDateUTCExports));

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = tzParseTimezone;

	var _index = _interopRequireDefault(tzTokenizeDateExports);

	var _index2 = _interopRequireDefault(newDateUTCExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MILLISECONDS_IN_HOUR = 3600000;
	var MILLISECONDS_IN_MINUTE = 60000;
	var patterns = {
	  timezone: /([Z+-].*)$/,
	  timezoneZ: /^(Z)$/,
	  timezoneHH: /^([+-]\d{2})$/,
	  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
	}; // Parse various time zone offset formats to an offset in milliseconds

	function tzParseTimezone(timezoneString, date, isUtcDate) {
	  var token;
	  var absoluteOffset; // Empty string

	  if (!timezoneString) {
	    return 0;
	  } // Z


	  token = patterns.timezoneZ.exec(timezoneString);

	  if (token) {
	    return 0;
	  }

	  var hours; // ±hh

	  token = patterns.timezoneHH.exec(timezoneString);

	  if (token) {
	    hours = parseInt(token[1], 10);

	    if (!validateTimezone(hours)) {
	      return NaN;
	    }

	    return -(hours * MILLISECONDS_IN_HOUR);
	  } // ±hh:mm or ±hhmm


	  token = patterns.timezoneHHMM.exec(timezoneString);

	  if (token) {
	    hours = parseInt(token[1], 10);
	    var minutes = parseInt(token[2], 10);

	    if (!validateTimezone(hours, minutes)) {
	      return NaN;
	    }

	    absoluteOffset = Math.abs(hours) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
	    return hours > 0 ? -absoluteOffset : absoluteOffset;
	  } // IANA time zone


	  if (isValidTimezoneIANAString(timezoneString)) {
	    date = new Date(date || Date.now());
	    var utcDate = isUtcDate ? date : toUtcDate(date);
	    var offset = calcOffset(utcDate, timezoneString);
	    var fixedOffset = isUtcDate ? offset : fixOffset(date, offset, timezoneString);
	    return -fixedOffset;
	  }

	  return NaN;
	}

	function toUtcDate(date) {
	  return (0, _index2.default)(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
	}

	function calcOffset(date, timezoneString) {
	  var tokens = (0, _index.default)(date, timezoneString); // ms dropped because it's not provided by tzTokenizeDate

	  var asUTC = (0, _index2.default)(tokens[0], tokens[1] - 1, tokens[2], tokens[3] % 24, tokens[4], tokens[5], 0).getTime();
	  var asTS = date.getTime();
	  var over = asTS % 1000;
	  asTS -= over >= 0 ? over : 1000 + over;
	  return asUTC - asTS;
	}

	function fixOffset(date, offset, timezoneString) {
	  var localTS = date.getTime(); // Our UTC time is just a guess because our offset is just a guess

	  var utcGuess = localTS - offset; // Test whether the zone matches the offset for this ts

	  var o2 = calcOffset(new Date(utcGuess), timezoneString); // If so, offset didn't change, and we're done

	  if (offset === o2) {
	    return offset;
	  } // If not, change the ts by the difference in the offset


	  utcGuess -= o2 - offset; // If that gives us the local time we want, we're done

	  var o3 = calcOffset(new Date(utcGuess), timezoneString);

	  if (o2 === o3) {
	    return o2;
	  } // If it's different, we're in a hole time. The offset has changed, but we don't adjust the time


	  return Math.max(o2, o3);
	}

	function validateTimezone(hours, minutes) {
	  return -23 <= hours && hours <= 23 && (minutes == null || 0 <= minutes && minutes <= 59);
	}

	var validIANATimezoneCache = {};

	function isValidTimezoneIANAString(timeZoneString) {
	  if (validIANATimezoneCache[timeZoneString]) return true;

	  try {
	    new Intl.DateTimeFormat(undefined, {
	      timeZone: timeZoneString
	    });
	    validIANATimezoneCache[timeZoneString] = true;
	    return true;
	  } catch (error) {
	    return false;
	  }
	}

	module.exports = exports.default;
} (tzParseTimezone, tzParseTimezoneExports));

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _index = _interopRequireDefault(tzIntlTimeZoneNameExports);

	var _index2 = _interopRequireDefault(tzParseTimezoneExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MILLISECONDS_IN_MINUTE = 60 * 1000;
	var formatters = {
	  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
	  X: function (date, token, localize, options) {
	    var timezoneOffset = getTimeZoneOffset(options.timeZone, options._originalDate || date);

	    if (timezoneOffset === 0) {
	      return 'Z';
	    }

	    switch (token) {
	      // Hours and optional minutes
	      case 'X':
	        return formatTimezoneWithOptionalMinutes(timezoneOffset);
	      // Hours, minutes and optional seconds without `:` delimeter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `XX`

	      case 'XXXX':
	      case 'XX':
	        // Hours and minutes without `:` delimeter
	        return formatTimezone(timezoneOffset);
	      // Hours, minutes and optional seconds with `:` delimeter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `XXX`

	      case 'XXXXX':
	      case 'XXX': // Hours and minutes with `:` delimeter

	      default:
	        return formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
	  x: function (date, token, localize, options) {
	    var timezoneOffset = getTimeZoneOffset(options.timeZone, options._originalDate || date);

	    switch (token) {
	      // Hours and optional minutes
	      case 'x':
	        return formatTimezoneWithOptionalMinutes(timezoneOffset);
	      // Hours, minutes and optional seconds without `:` delimeter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `xx`

	      case 'xxxx':
	      case 'xx':
	        // Hours and minutes without `:` delimeter
	        return formatTimezone(timezoneOffset);
	      // Hours, minutes and optional seconds with `:` delimeter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `xxx`

	      case 'xxxxx':
	      case 'xxx': // Hours and minutes with `:` delimeter

	      default:
	        return formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (GMT)
	  O: function (date, token, localize, options) {
	    var timezoneOffset = getTimeZoneOffset(options.timeZone, options._originalDate || date);

	    switch (token) {
	      // Short
	      case 'O':
	      case 'OO':
	      case 'OOO':
	        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
	      // Long

	      case 'OOOO':
	      default:
	        return 'GMT' + formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (specific non-location)
	  z: function (date, token, localize, options) {
	    var originalDate = options._originalDate || date;

	    switch (token) {
	      // Short
	      case 'z':
	      case 'zz':
	      case 'zzz':
	        return (0, _index.default)('short', originalDate, options);
	      // Long

	      case 'zzzz':
	      default:
	        return (0, _index.default)('long', originalDate, options);
	    }
	  }
	};

	function getTimeZoneOffset(timeZone, originalDate) {
	  var timeZoneOffset = timeZone ? (0, _index2.default)(timeZone, originalDate, true) / MILLISECONDS_IN_MINUTE : originalDate.getTimezoneOffset();

	  if (Number.isNaN(timeZoneOffset)) {
	    throw new RangeError('Invalid time zone specified: ' + timeZone);
	  }

	  return timeZoneOffset;
	}

	function addLeadingZeros(number, targetLength) {
	  var sign = number < 0 ? '-' : '';
	  var output = Math.abs(number).toString();

	  while (output.length < targetLength) {
	    output = '0' + output;
	  }

	  return sign + output;
	}

	function formatTimezone(offset, dirtyDelimeter) {
	  var delimeter = dirtyDelimeter || '';
	  var sign = offset > 0 ? '-' : '+';
	  var absOffset = Math.abs(offset);
	  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
	  var minutes = addLeadingZeros(Math.floor(absOffset % 60), 2);
	  return sign + hours + delimeter + minutes;
	}

	function formatTimezoneWithOptionalMinutes(offset, dirtyDelimeter) {
	  if (offset % 60 === 0) {
	    var sign = offset > 0 ? '-' : '+';
	    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
	  }

	  return formatTimezone(offset, dirtyDelimeter);
	}

	function formatTimezoneShort(offset, dirtyDelimeter) {
	  var sign = offset > 0 ? '-' : '+';
	  var absOffset = Math.abs(offset);
	  var hours = Math.floor(absOffset / 60);
	  var minutes = absOffset % 60;

	  if (minutes === 0) {
	    return sign + String(hours);
	  }

	  var delimeter = dirtyDelimeter || '';
	  return sign + String(hours) + delimeter + addLeadingZeros(minutes, 2);
	}

	var _default = formatters;
	exports.default = _default;
	module.exports = exports.default;
} (formatters, formattersExports));

var toDateExports = {};
var toDate$1 = {
  get exports(){ return toDateExports; },
  set exports(v){ toDateExports = v; },
};

var tzPatternExports = {};
var tzPattern = {
  get exports(){ return tzPatternExports; },
  set exports(v){ tzPatternExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	/** Regex to identify the presence of a time zone specifier in a date string */
	var tzPattern = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
	var _default = tzPattern;
	exports.default = _default;
	module.exports = exports.default;
} (tzPattern, tzPatternExports));

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toDate;

	var _index = _interopRequireDefault(toIntegerExports);

	var _index2 = _interopRequireDefault(getTimezoneOffsetInMillisecondsExports);

	var _index3 = _interopRequireDefault(tzParseTimezoneExports);

	var _index4 = _interopRequireDefault(tzPatternExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MILLISECONDS_IN_HOUR = 3600000;
	var MILLISECONDS_IN_MINUTE = 60000;
	var DEFAULT_ADDITIONAL_DIGITS = 2;
	var patterns = {
	  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
	  datePattern: /^([0-9W+-]+)(.*)/,
	  plainTime: /:/,
	  // year tokens
	  YY: /^(\d{2})$/,
	  YYY: [/^([+-]\d{2})$/, // 0 additional digits
	  /^([+-]\d{3})$/, // 1 additional digit
	  /^([+-]\d{4})$/ // 2 additional digits
	  ],
	  YYYY: /^(\d{4})/,
	  YYYYY: [/^([+-]\d{4})/, // 0 additional digits
	  /^([+-]\d{5})/, // 1 additional digit
	  /^([+-]\d{6})/ // 2 additional digits
	  ],
	  // date tokens
	  MM: /^-(\d{2})$/,
	  DDD: /^-?(\d{3})$/,
	  MMDD: /^-?(\d{2})-?(\d{2})$/,
	  Www: /^-?W(\d{2})$/,
	  WwwD: /^-?W(\d{2})-?(\d{1})$/,
	  HH: /^(\d{2}([.,]\d*)?)$/,
	  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
	  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
	  // time zone tokens (to identify the presence of a tz)
	  timeZone: _index4.default
	};
	/**
	 * @name toDate
	 * @category Common Helpers
	 * @summary Convert the given argument to an instance of Date.
	 *
	 * @description
	 * Convert the given argument to an instance of Date.
	 *
	 * If the argument is an instance of Date, the function returns its clone.
	 *
	 * If the argument is a number, it is treated as a timestamp.
	 *
	 * If an argument is a string, the function tries to parse it.
	 * Function accepts complete ISO 8601 formats as well as partial implementations.
	 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
	 * If the function cannot parse the string or the values are invalid, it returns Invalid Date.
	 *
	 * If the argument is none of the above, the function returns Invalid Date.
	 *
	 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
	 * All *date-fns* functions will throw `RangeError` if `options.additionalDigits` is not 0, 1, 2 or undefined.
	 *
	 * @param {Date|String|Number} argument - the value to convert
	 * @param {OptionsWithTZ} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
	 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
	 * @param {String} [options.timeZone=''] - used to specify the IANA time zone offset of a date String.
	 * @returns {Date} the parsed date in the local time zone
	 * @throws {TypeError} 1 argument required
	 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
	 *
	 * @example
	 * // Convert string '2014-02-11T11:30:30' to date:
	 * var result = toDate('2014-02-11T11:30:30')
	 * //=> Tue Feb 11 2014 11:30:30
	 *
	 * @example
	 * // Convert string '+02014101' to date,
	 * // if the additional number of digits in the extended year format is 1:
	 * var result = toDate('+02014101', {additionalDigits: 1})
	 * //=> Fri Apr 11 2014 00:00:00
	 */

	function toDate(argument, dirtyOptions) {
	  if (arguments.length < 1) {
	    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
	  }

	  if (argument === null) {
	    return new Date(NaN);
	  }

	  var options = dirtyOptions || {};
	  var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : (0, _index.default)(options.additionalDigits);

	  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
	    throw new RangeError('additionalDigits must be 0, 1 or 2');
	  } // Clone the date


	  if (argument instanceof Date || typeof argument === 'object' && Object.prototype.toString.call(argument) === '[object Date]') {
	    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
	    return new Date(argument.getTime());
	  } else if (typeof argument === 'number' || Object.prototype.toString.call(argument) === '[object Number]') {
	    return new Date(argument);
	  } else if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
	    return new Date(NaN);
	  }

	  var dateStrings = splitDateString(argument);
	  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
	  var year = parseYearResult.year;
	  var restDateString = parseYearResult.restDateString;
	  var date = parseDate(restDateString, year);

	  if (isNaN(date)) {
	    return new Date(NaN);
	  }

	  if (date) {
	    var timestamp = date.getTime();
	    var time = 0;
	    var offset;

	    if (dateStrings.time) {
	      time = parseTime(dateStrings.time);

	      if (isNaN(time)) {
	        return new Date(NaN);
	      }
	    }

	    if (dateStrings.timeZone || options.timeZone) {
	      offset = (0, _index3.default)(dateStrings.timeZone || options.timeZone, new Date(timestamp + time));

	      if (isNaN(offset)) {
	        return new Date(NaN);
	      }
	    } else {
	      // get offset accurate to hour in time zones that change offset
	      offset = (0, _index2.default)(new Date(timestamp + time));
	      offset = (0, _index2.default)(new Date(timestamp + time + offset));
	    }

	    return new Date(timestamp + time + offset);
	  } else {
	    return new Date(NaN);
	  }
	}

	function splitDateString(dateString) {
	  var dateStrings = {};
	  var parts = patterns.dateTimePattern.exec(dateString);
	  var timeString;

	  if (!parts) {
	    parts = patterns.datePattern.exec(dateString);

	    if (parts) {
	      dateStrings.date = parts[1];
	      timeString = parts[2];
	    } else {
	      dateStrings.date = null;
	      timeString = dateString;
	    }
	  } else {
	    dateStrings.date = parts[1];
	    timeString = parts[3];
	  }

	  if (timeString) {
	    var token = patterns.timeZone.exec(timeString);

	    if (token) {
	      dateStrings.time = timeString.replace(token[1], '');
	      dateStrings.timeZone = token[1].trim();
	    } else {
	      dateStrings.time = timeString;
	    }
	  }

	  return dateStrings;
	}

	function parseYear(dateString, additionalDigits) {
	  var patternYYY = patterns.YYY[additionalDigits];
	  var patternYYYYY = patterns.YYYYY[additionalDigits];
	  var token; // YYYY or ±YYYYY

	  token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);

	  if (token) {
	    var yearString = token[1];
	    return {
	      year: parseInt(yearString, 10),
	      restDateString: dateString.slice(yearString.length)
	    };
	  } // YY or ±YYY


	  token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);

	  if (token) {
	    var centuryString = token[1];
	    return {
	      year: parseInt(centuryString, 10) * 100,
	      restDateString: dateString.slice(centuryString.length)
	    };
	  } // Invalid ISO-formatted year


	  return {
	    year: null
	  };
	}

	function parseDate(dateString, year) {
	  // Invalid ISO-formatted year
	  if (year === null) {
	    return null;
	  }

	  var token;
	  var date;
	  var month;
	  var week; // YYYY

	  if (dateString.length === 0) {
	    date = new Date(0);
	    date.setUTCFullYear(year);
	    return date;
	  } // YYYY-MM


	  token = patterns.MM.exec(dateString);

	  if (token) {
	    date = new Date(0);
	    month = parseInt(token[1], 10) - 1;

	    if (!validateDate(year, month)) {
	      return new Date(NaN);
	    }

	    date.setUTCFullYear(year, month);
	    return date;
	  } // YYYY-DDD or YYYYDDD


	  token = patterns.DDD.exec(dateString);

	  if (token) {
	    date = new Date(0);
	    var dayOfYear = parseInt(token[1], 10);

	    if (!validateDayOfYearDate(year, dayOfYear)) {
	      return new Date(NaN);
	    }

	    date.setUTCFullYear(year, 0, dayOfYear);
	    return date;
	  } // yyyy-MM-dd or YYYYMMDD


	  token = patterns.MMDD.exec(dateString);

	  if (token) {
	    date = new Date(0);
	    month = parseInt(token[1], 10) - 1;
	    var day = parseInt(token[2], 10);

	    if (!validateDate(year, month, day)) {
	      return new Date(NaN);
	    }

	    date.setUTCFullYear(year, month, day);
	    return date;
	  } // YYYY-Www or YYYYWww


	  token = patterns.Www.exec(dateString);

	  if (token) {
	    week = parseInt(token[1], 10) - 1;

	    if (!validateWeekDate(year, week)) {
	      return new Date(NaN);
	    }

	    return dayOfISOWeekYear(year, week);
	  } // YYYY-Www-D or YYYYWwwD


	  token = patterns.WwwD.exec(dateString);

	  if (token) {
	    week = parseInt(token[1], 10) - 1;
	    var dayOfWeek = parseInt(token[2], 10) - 1;

	    if (!validateWeekDate(year, week, dayOfWeek)) {
	      return new Date(NaN);
	    }

	    return dayOfISOWeekYear(year, week, dayOfWeek);
	  } // Invalid ISO-formatted date


	  return null;
	}

	function parseTime(timeString) {
	  var token;
	  var hours;
	  var minutes; // hh

	  token = patterns.HH.exec(timeString);

	  if (token) {
	    hours = parseFloat(token[1].replace(',', '.'));

	    if (!validateTime(hours)) {
	      return NaN;
	    }

	    return hours % 24 * MILLISECONDS_IN_HOUR;
	  } // hh:mm or hhmm


	  token = patterns.HHMM.exec(timeString);

	  if (token) {
	    hours = parseInt(token[1], 10);
	    minutes = parseFloat(token[2].replace(',', '.'));

	    if (!validateTime(hours, minutes)) {
	      return NaN;
	    }

	    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
	  } // hh:mm:ss or hhmmss


	  token = patterns.HHMMSS.exec(timeString);

	  if (token) {
	    hours = parseInt(token[1], 10);
	    minutes = parseInt(token[2], 10);
	    var seconds = parseFloat(token[3].replace(',', '.'));

	    if (!validateTime(hours, minutes, seconds)) {
	      return NaN;
	    }

	    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
	  } // Invalid ISO-formatted time


	  return null;
	}

	function dayOfISOWeekYear(isoWeekYear, week, day) {
	  week = week || 0;
	  day = day || 0;
	  var date = new Date(0);
	  date.setUTCFullYear(isoWeekYear, 0, 4);
	  var fourthOfJanuaryDay = date.getUTCDay() || 7;
	  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
	  date.setUTCDate(date.getUTCDate() + diff);
	  return date;
	} // Validation functions


	var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	function isLeapYearIndex(year) {
	  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
	}

	function validateDate(year, month, date) {
	  if (month < 0 || month > 11) {
	    return false;
	  }

	  if (date != null) {
	    if (date < 1) {
	      return false;
	    }

	    var isLeapYear = isLeapYearIndex(year);

	    if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) {
	      return false;
	    }

	    if (!isLeapYear && date > DAYS_IN_MONTH[month]) {
	      return false;
	    }
	  }

	  return true;
	}

	function validateDayOfYearDate(year, dayOfYear) {
	  if (dayOfYear < 1) {
	    return false;
	  }

	  var isLeapYear = isLeapYearIndex(year);

	  if (isLeapYear && dayOfYear > 366) {
	    return false;
	  }

	  if (!isLeapYear && dayOfYear > 365) {
	    return false;
	  }

	  return true;
	}

	function validateWeekDate(year, week, day) {
	  if (week < 0 || week > 52) {
	    return false;
	  }

	  if (day != null && (day < 0 || day > 6)) {
	    return false;
	  }

	  return true;
	}

	function validateTime(hours, minutes, seconds) {
	  if (hours != null && (hours < 0 || hours >= 25)) {
	    return false;
	  }

	  if (minutes != null && (minutes < 0 || minutes >= 60)) {
	    return false;
	  }

	  if (seconds != null && (seconds < 0 || seconds >= 60)) {
	    return false;
	  }

	  return true;
	}

	module.exports = exports.default;
} (toDate$1, toDateExports));

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = format;

	var _index = _interopRequireDefault(formatExports);

	var _index2 = _interopRequireDefault(formattersExports);

	var _index3 = _interopRequireDefault(toDateExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var tzFormattingTokensRegExp = /([xXOz]+)|''|'(''|[^'])+('|$)/g;
	/**
	 * @name format
	 * @category Common Helpers
	 * @summary Format the date.
	 *
	 * @description
	 * Return the formatted date string in the given format. The result may vary by locale.
	 *
	 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
	 * > See: https://git.io/fxCyr
	 *
	 * The characters wrapped between two single quotes characters (') are escaped.
	 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
	 * (see the last example)
	 *
	 * Format of the string is based on Unicode Technical Standard #35:
	 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
	 * with a few additions (see note 7 below the table).
	 *
	 * Accepted patterns:
	 * | Unit                            | Pattern | Result examples                   | Notes |
	 * |---------------------------------|---------|-----------------------------------|-------|
	 * | Era                             | G..GGG  | AD, BC                            |       |
	 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
	 * |                                 | GGGGG   | A, B                              |       |
	 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
	 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
	 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
	 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
	 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
	 * |                                 | yyyyy   | ...                               | 3,5   |
	 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
	 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
	 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
	 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
	 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
	 * |                                 | YYYYY   | ...                               | 3,5   |
	 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
	 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
	 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
	 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
	 * |                                 | RRRRR   | ...                               | 3,5,7 |
	 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
	 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
	 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
	 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
	 * |                                 | uuuuu   | ...                               | 3,5   |
	 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
	 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
	 * |                                 | QQ      | 01, 02, 03, 04                    |       |
	 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
	 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
	 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
	 * |                                 | qq      | 01, 02, 03, 04                    |       |
	 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
	 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
	 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
	 * |                                 | MM      | 01, 02, ..., 12                   |       |
	 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
	 * |                                 | MMMM    | January, February, ..., December  | 2     |
	 * |                                 | MMMMM   | J, F, ..., D                      |       |
	 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
	 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
	 * |                                 | LL      | 01, 02, ..., 12                   |       |
	 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
	 * |                                 | LLLL    | January, February, ..., December  | 2     |
	 * |                                 | LLLLL   | J, F, ..., D                      |       |
	 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
	 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
	 * |                                 | ww      | 01, 02, ..., 53                   |       |
	 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
	 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
	 * |                                 | II      | 01, 02, ..., 53                   | 7     |
	 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
	 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
	 * |                                 | dd      | 01, 02, ..., 31                   |       |
	 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 8     |
	 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
	 * |                                 | DD      | 01, 02, ..., 365, 366             | 8     |
	 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
	 * |                                 | DDDD    | ...                               | 3     |
	 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
	 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
	 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
	 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
	 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
	 * |                                 | iii     | Mon, Tue, Wed, ..., Su            | 7     |
	 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
	 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
	 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
	 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
	 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
	 * |                                 | ee      | 02, 03, ..., 01                   |       |
	 * |                                 | eee     | Mon, Tue, Wed, ..., Su            |       |
	 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
	 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
	 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
	 * |                                 | cc      | 02, 03, ..., 01                   |       |
	 * |                                 | ccc     | Mon, Tue, Wed, ..., Su            |       |
	 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
	 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | AM, PM                          | a..aaa  | AM, PM                            |       |
	 * |                                 | aaaa    | a.m., p.m.                        | 2     |
	 * |                                 | aaaaa   | a, p                              |       |
	 * | AM, PM, noon, midnight          | b..bbb  | AM, PM, noon, midnight            |       |
	 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
	 * |                                 | bbbbb   | a, p, n, mi                       |       |
	 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
	 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
	 * |                                 | BBBBB   | at night, in the morning, ...     |       |
	 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
	 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
	 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
	 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
	 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
	 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
	 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
	 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
	 * |                                 | KK      | 1, 2, ..., 11, 0                  |       |
	 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
	 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
	 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
	 * | Minute                          | m       | 0, 1, ..., 59                     |       |
	 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
	 * |                                 | mm      | 00, 01, ..., 59                   |       |
	 * | Second                          | s       | 0, 1, ..., 59                     |       |
	 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
	 * |                                 | ss      | 00, 01, ..., 59                   |       |
	 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
	 * |                                 | SS      | 00, 01, ..., 99                   |       |
	 * |                                 | SSS     | 000, 0001, ..., 999               |       |
	 * |                                 | SSSS    | ...                               | 3     |
	 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
	 * |                                 | XX      | -0800, +0530, Z                   |       |
	 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
	 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
	 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
	 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
	 * |                                 | xx      | -0800, +0530, +0000               |       |
	 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
	 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
	 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
	 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
	 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
	 * | Timezone (specific non-locat.)  | z...zzz | PDT, EST, CEST                    | 6     |
	 * |                                 | zzzz    | Pacific Daylight Time             | 2,6   |
	 * | Seconds timestamp               | t       | 512969520                         | 7     |
	 * |                                 | tt      | ...                               | 3,7   |
	 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
	 * |                                 | TT      | ...                               | 3,7   |
	 * | Long localized date             | P       | 05/29/1453                        | 7     |
	 * |                                 | PP      | May 29, 1453                      | 7     |
	 * |                                 | PPP     | May 29th, 1453                    | 7     |
	 * |                                 | PPPP    | Sunday, May 29th, 1453            | 2,7   |
	 * | Long localized time             | p       | 12:00 AM                          | 7     |
	 * |                                 | pp      | 12:00:00 AM                       | 7     |
	 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
	 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
	 * | Combination of date and time    | Pp      | 05/29/1453, 12:00 AM              | 7     |
	 * |                                 | PPpp    | May 29, 1453, 12:00:00 AM         | 7     |
	 * |                                 | PPPppp  | May 29th, 1453 at ...             | 7     |
	 * |                                 | PPPPpppp| Sunday, May 29th, 1453 at ...     | 2,7   |
	 * Notes:
	 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
	 *    are the same as "stand-alone" units, but are different in some languages.
	 *    "Formatting" units are declined according to the rules of the language
	 *    in the context of a date. "Stand-alone" units are always nominative singular:
	 *
	 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
	 *
	 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
	 *
	 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
	 *    the single quote characters (see below).
	 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
	 *    the output will be the same as default pattern for this unit, usually
	 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
	 *    are marked with "2" in the last column of the table.
	 *
	 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
	 *
	 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
	 *    The output will be padded with zeros to match the length of the pattern.
	 *
	 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
	 *
	 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
	 *    These tokens represent the shortest form of the quarter.
	 *
	 * 5. The main difference between `y` and `u` patterns are B.C. years:
	 *
	 *    | Year | `y` | `u` |
	 *    |------|-----|-----|
	 *    | AC 1 |   1 |   1 |
	 *    | BC 1 |   1 |   0 |
	 *    | BC 2 |   2 |  -1 |
	 *
	 *    Also `yy` always returns the last two digits of a year,
	 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
	 *
	 *    | Year | `yy` | `uu` |
	 *    |------|------|------|
	 *    | 1    |   01 |   01 |
	 *    | 14   |   14 |   14 |
	 *    | 376  |   76 |  376 |
	 *    | 1453 |   53 | 1453 |
	 *
	 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
	 *    except local week-numbering years are dependent on `options.weekStartsOn`
	 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
	 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
	 *
	 * 6. Specific non-location timezones are created using the Intl browser API. The output is determined by the
	 *    preferred standard of the current locale (en-US by default) which may not always give the expected result.
	 *    For this reason it is recommended to supply a `locale` in the format options when formatting a time zone name.
	 *
	 * 7. These patterns are not in the Unicode Technical Standard #35:
	 *    - `i`: ISO day of week
	 *    - `I`: ISO week of year
	 *    - `R`: ISO week-numbering year
	 *    - `t`: seconds timestamp
	 *    - `T`: milliseconds timestamp
	 *    - `o`: ordinal number modifier
	 *    - `P`: long localized date
	 *    - `p`: long localized time
	 *
	 * 8. These tokens are often confused with others. See: https://git.io/fxCyr
	 *
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole
	 *   library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * - The second argument is now required for the sake of explicitness.
	 *
	 *   ```javascript
	 *   // Before v2.0.0
	 *   format(new Date(2016, 0, 1))
	 *
	 *   // v2.0.0 onward
	 *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
	 *   ```
	 *
	 * - New format string API for `format` function
	 *   which is based on [Unicode Technical Standard
	 *   #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table). See [this
	 *   post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
	 *
	 * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
	 *
	 * @param {Date|Number} date - the original date
	 * @param {String} format - the string of tokens
	 * @param {OptionsWithTZ} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
	 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link
	 *   https://date-fns.org/docs/toDate}
	 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
	 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
	 * @param {Locale} [options.locale=defaultLocale] - the locale object. See
	 *   [Locale]{@link https://date-fns.org/docs/Locale}
	 * @param {Boolean} [options.awareOfUnicodeTokens=false] - if true, allows usage of Unicode tokens causes confusion:
	 *   - Some of the day of year tokens (`D`, `DD`) that are confused with the day of month tokens (`d`, `dd`).
	 *   - Some of the local week-numbering year tokens (`YY`, `YYYY`) that are confused with the calendar year tokens
	 *   (`yy`, `yyyy`). See: https://git.io/fxCyr
	 * @param {String} [options.timeZone=''] - used to specify the IANA time zone offset of a date String.
	 * @returns {String} the formatted date string
	 * @throws {TypeError} 2 arguments required
	 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
	 * @throws {RangeError} `options.locale` must contain `localize` property
	 * @throws {RangeError} `options.locale` must contain `formatLong` property
	 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
	 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
	 * @throws {RangeError} `options.awareOfUnicodeTokens` must be set to `true` to use `XX` token; see:
	 *   https://git.io/fxCyr
	 *
	 * @example
	 * // Represent 11 February 2014 in middle-endian format:
	 * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
	 * //=> '02/11/2014'
	 *
	 * @example
	 * // Represent 2 July 2014 in Esperanto:
	 * import { eoLocale } from 'date-fns/locale/eo'
	 * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
	 *   locale: eoLocale
	 * })
	 * //=> '2-a de julio 2014'
	 *
	 * @example
	 * // Escape string by single quote characters:
	 * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
	 * //=> "3 o'clock"
	 */

	function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
	  var formatStr = String(dirtyFormatStr);
	  var options = dirtyOptions || {};
	  var matches = formatStr.match(tzFormattingTokensRegExp);

	  if (matches) {
	    var date = (0, _index3.default)(dirtyDate, options); // Work through each match and replace the tz token in the format string with the quoted
	    // formatted time zone so the remaining tokens can be filled in by date-fns#format.

	    formatStr = matches.reduce(function (result, token) {
	      if (token[0] === "'") {
	        return result; // This is a quoted portion, matched only to ensure we don't match inside it
	      }

	      var pos = result.indexOf(token);
	      var precededByQuotedSection = result[pos - 1] === "'";
	      var replaced = result.replace(token, "'" + _index2.default[token[0]](date, token, null, options) + "'"); // If the replacement results in two adjoining quoted strings, the back to back quotes
	      // are removed, so it doesn't look like an escaped quote.

	      return precededByQuotedSection ? replaced.substring(0, pos - 1) + replaced.substring(pos + 1) : replaced;
	    }, formatStr);
	  }

	  return (0, _index.default)(dirtyDate, formatStr, options);
	}

	module.exports = exports.default;
} (format$1, formatExports$1));

var formatInTimeZoneExports = {};
var formatInTimeZone = {
  get exports(){ return formatInTimeZoneExports; },
  set exports(v){ formatInTimeZoneExports = v; },
};

var cloneObjectExports = {};
var cloneObject = {
  get exports(){ return cloneObjectExports; },
  set exports(v){ cloneObjectExports = v; },
};

var assignExports = {};
var assign = {
  get exports(){ return assignExports; },
  set exports(v){ assignExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = assign;
	function assign(target, object) {
	  if (target == null) {
	    throw new TypeError('assign requires that input parameter not be null or undefined');
	  }
	  for (var property in object) {
	    if (Object.prototype.hasOwnProperty.call(object, property)) {
	      target[property] = object[property];
	    }
	  }
	  return target;
	}
	module.exports = exports.default;
} (assign, assignExports));

(function (module, exports) {

	var _interopRequireDefault = interopRequireDefaultExports.default;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = cloneObject;
	var _index = _interopRequireDefault(assignExports);
	function cloneObject(object) {
	  return (0, _index.default)({}, object);
	}
	module.exports = exports.default;
} (cloneObject, cloneObjectExports));

var utcToZonedTimeExports = {};
var utcToZonedTime = {
  get exports(){ return utcToZonedTimeExports; },
  set exports(v){ utcToZonedTimeExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = utcToZonedTime;

	var _index = _interopRequireDefault(tzParseTimezoneExports);

	var _index2 = _interopRequireDefault(toDateExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @name utcToZonedTime
	 * @category Time Zone Helpers
	 * @summary Get a date/time representing local time in a given time zone from the UTC date
	 *
	 * @description
	 * Returns a date instance with values representing the local time in the time zone
	 * specified of the UTC time from the date provided. In other words, when the new date
	 * is formatted it will show the equivalent hours in the target time zone regardless
	 * of the current system time zone.
	 *
	 * @param {Date|String|Number} date - the date with the relevant UTC time
	 * @param {String} timeZone - the time zone to get local time for, can be an offset or IANA time zone
	 * @param {OptionsWithTZ} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
	 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
	 * @returns {Date} the new date with the equivalent time in the time zone
	 * @throws {TypeError} 2 arguments required
	 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
	 *
	 * @example
	 * // In June 10am UTC is 6am in New York (-04:00)
	 * const result = utcToZonedTime('2014-06-25T10:00:00.000Z', 'America/New_York')
	 * //=> Jun 25 2014 06:00:00
	 */
	function utcToZonedTime(dirtyDate, timeZone, options) {
	  var date = (0, _index2.default)(dirtyDate, options);
	  var offsetMilliseconds = (0, _index.default)(timeZone, date, true);
	  var d = new Date(date.getTime() - offsetMilliseconds);
	  var resultDate = new Date(0);
	  resultDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
	  resultDate.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
	  return resultDate;
	}

	module.exports = exports.default;
} (utcToZonedTime, utcToZonedTimeExports));

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = formatInTimeZone;

	var _index = _interopRequireDefault(cloneObjectExports);

	var _index2 = _interopRequireDefault(formatExports$1);

	var _index3 = _interopRequireDefault(utcToZonedTimeExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @name formatInTimeZone
	 * @category Time Zone Helpers
	 * @summary Gets the offset in milliseconds between the time zone and Universal Coordinated Time (UTC)
	 *
	 * @param {Date|String|Number} date - the date representing the local time / real UTC time
	 * @param {String} timeZone - the time zone this date should be formatted for; can be an offset or IANA time zone
	 * @param {String} formatStr - the string of tokens
	 * @param {OptionsWithTZ} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
	 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link
	 *   https://date-fns.org/docs/toDate}
	 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
	 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
	 * @param {Locale} [options.locale=defaultLocale] - the locale object. See
	 *   [Locale]{@link https://date-fns.org/docs/Locale}
	 * @param {Boolean} [options.awareOfUnicodeTokens=false] - if true, allows usage of Unicode tokens causes confusion:
	 *   - Some of the day of year tokens (`D`, `DD`) that are confused with the day of month tokens (`d`, `dd`).
	 *   - Some of the local week-numbering year tokens (`YY`, `YYYY`) that are confused with the calendar year tokens
	 *   (`yy`, `yyyy`). See: https://git.io/fxCyr
	 * @param {String} [options.timeZone=''] - used to specify the IANA time zone offset of a date String.
	 * @returns {String} the formatted date string
	 */
	function formatInTimeZone(date, timeZone, formatStr, options) {
	  var extendedOptions = (0, _index.default)(options);
	  extendedOptions.timeZone = timeZone;
	  return (0, _index2.default)((0, _index3.default)(date, timeZone), formatStr, extendedOptions);
	}

	module.exports = exports.default;
} (formatInTimeZone, formatInTimeZoneExports));

var getTimezoneOffsetExports = {};
var getTimezoneOffset = {
  get exports(){ return getTimezoneOffsetExports; },
  set exports(v){ getTimezoneOffsetExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getTimezoneOffset;

	var _index = _interopRequireDefault(tzParseTimezoneExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @name getTimezoneOffset
	 * @category Time Zone Helpers
	 * @summary Gets the offset in milliseconds between the time zone and Universal Coordinated Time (UTC)
	 *
	 * @description
	 * Returns the time zone offset from UTC time in milliseconds for IANA time zones as well
	 * as other time zone offset string formats.
	 *
	 * For time zones where daylight savings time is applicable a `Date` should be passed on
	 * the second parameter to ensure the offset correctly accounts for DST at that time of
	 * year. When omitted, the current date is used.
	 *
	 * @param {String} timeZone - the time zone of this local time, can be an offset or IANA time zone
	 * @param {Date|Number} [date] - the date with values representing the local time
	 * @returns {Number} the time zone offset in milliseconds
	 *
	 * @example
	 * const result = getTimezoneOffset('-07:00')
	 *   //=> -18000000 (-7 * 60 * 60 * 1000)
	 * const result = getTimezoneOffset('Africa/Johannesburg')
	 *   //=> 7200000 (2 * 60 * 60 * 1000)
	 * const result = getTimezoneOffset('America/New_York', new Date(2016, 0, 1))
	 *   //=> -18000000 (-5 * 60 * 60 * 1000)
	 * const result = getTimezoneOffset('America/New_York', new Date(2016, 6, 1))
	 *   //=> -14400000 (-4 * 60 * 60 * 1000)
	 */
	function getTimezoneOffset(timeZone, date) {
	  return -(0, _index.default)(timeZone, date);
	}

	module.exports = exports.default;
} (getTimezoneOffset, getTimezoneOffsetExports));

var zonedTimeToUtcExports = {};
var zonedTimeToUtc = {
  get exports(){ return zonedTimeToUtcExports; },
  set exports(v){ zonedTimeToUtcExports = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = zonedTimeToUtc;

	var _index = _interopRequireDefault(cloneObjectExports);

	var _index2 = _interopRequireDefault(toDateExports);

	var _index3 = _interopRequireDefault(tzPatternExports);

	var _index4 = _interopRequireDefault(tzParseTimezoneExports);

	var _index5 = _interopRequireDefault(newDateUTCExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @name zonedTimeToUtc
	 * @category Time Zone Helpers
	 * @summary Get the UTC date/time from a date representing local time in a given time zone
	 *
	 * @description
	 * Returns a date instance with the UTC time of the provided date of which the values
	 * represented the local time in the time zone specified. In other words, if the input
	 * date represented local time in time time zone, the timestamp of the output date will
	 * give the equivalent UTC of that local time regardless of the current system time zone.
	 *
	 * @param {Date|String|Number} date - the date with values representing the local time
	 * @param {String} timeZone - the time zone of this local time, can be an offset or IANA time zone
	 * @param {OptionsWithTZ} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
	 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
	 * @returns {Date} the new date with the equivalent time in the time zone
	 * @throws {TypeError} 2 arguments required
	 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
	 *
	 * @example
	 * // In June 10am in Los Angeles is 5pm UTC
	 * const result = zonedTimeToUtc(new Date(2014, 5, 25, 10, 0, 0), 'America/Los_Angeles')
	 * //=> 2014-06-25T17:00:00.000Z
	 */
	function zonedTimeToUtc(date, timeZone, options) {
	  if (typeof date === 'string' && !date.match(_index3.default)) {
	    var extendedOptions = (0, _index.default)(options);
	    extendedOptions.timeZone = timeZone;
	    return (0, _index2.default)(date, extendedOptions);
	  }

	  var d = (0, _index2.default)(date, options);
	  var utc = (0, _index5.default)(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()).getTime();
	  var offsetMilliseconds = (0, _index4.default)(timeZone, new Date(utc));
	  return new Date(utc + offsetMilliseconds);
	}

	module.exports = exports.default;
} (zonedTimeToUtc, zonedTimeToUtcExports));

// This file is generated automatically by `scripts/build/indices.js`. Please, don't change it.
var dateFnsTz = {
  format: formatExports$1,
  formatInTimeZone: formatInTimeZoneExports,
  getTimezoneOffset: getTimezoneOffsetExports,
  toDate: toDateExports,
  utcToZonedTime: utcToZonedTimeExports,
  zonedTimeToUtc: zonedTimeToUtcExports
};

var MessageType;
(function (MessageType) {
    MessageType["Document"] = "DOCUMENT";
    MessageType["Text"] = "TEXT";
})(MessageType || (MessageType = {}));
var MessageType$1 = MessageType;

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      // eslint-disable-next-line no-console
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} - the new date with the days added
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day (and year and month)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  var dateRightStartOfDay = startOfDay(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

/**
 * @name intlFormat
 * @category Common Helpers
 * @summary  Format the date with Intl.DateTimeFormat (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).
 *
 * @description
 * Return the formatted date string in the given format.
 * The method uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) inside.
 * formatOptions are the same as [`Intl.DateTimeFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options)
 *
 * > ⚠️ Please note that before Node version 13.0.0, only the locale data for en-US is available by default.
 *
 * @param {Date|Number} argument - the original date.
 * @param {Object} [formatOptions] - an object with options.
 * @param {'lookup'|'best fit'} [formatOptions.localeMatcher='best fit'] - locale selection algorithm.
 * @param {'narrow'|'short'|'long'} [formatOptions.weekday] - representation the days of the week.
 * @param {'narrow'|'short'|'long'} [formatOptions.era] - representation of eras.
 * @param {'numeric'|'2-digit'} [formatOptions.year] - representation of years.
 * @param {'numeric'|'2-digit'|'narrow'|'short'|'long'} [formatOptions.month='numeric'] - representation of month.
 * @param {'numeric'|'2-digit'} [formatOptions.day='numeric'] - representation of day.
 * @param {'numeric'|'2-digit'} [formatOptions.hour='numeric'] - representation of hours.
 * @param {'numeric'|'2-digit'} [formatOptions.minute] - representation of minutes.
 * @param {'numeric'|'2-digit'} [formatOptions.second] - representation of seconds.
 * @param {'short'|'long'} [formatOptions.timeZoneName] - representation of names of time zones.
 * @param {'basic'|'best fit'} [formatOptions.formatMatcher='best fit'] - format selection algorithm.
 * @param {Boolean} [formatOptions.hour12] - determines whether to use 12-hour time format.
 * @param {String} [formatOptions.timeZone] - the time zone to use.
 * @param {Object} [localeOptions] - an object with locale.
 * @param {String|String[]} [localeOptions.locale] - the locale code
 * @returns {String} the formatted date string.
 * @throws {TypeError} 1 argument required.
 * @throws {RangeError} `date` must not be Invalid Date
 *
 * @example
 * // Represent 10 October 2019 in German.
 * // Convert the date with format's options and locale's options.
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *      weekday: 'long',
 *      year: 'numeric',
 *      month: 'long',
 *      day: 'numeric',
 *    }, {
 *      locale: 'de-DE',
 *  })
 * //=> Freitag, 4. Oktober 2019
 *
 * @example
 * // Represent 10 October 2019.
 * // Convert the date with format's options.
 * const result = intlFormat.default(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *      year: 'numeric',
 *      month: 'numeric',
 *      day: 'numeric',
 *      hour: 'numeric',
 *  })
 * //=> 10/4/2019, 12 PM
 *
 * @example
 * // Represent 10 October 2019 in Korean.
 * // Convert the date with locale's options.
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *      locale: 'ko-KR',
 *  })
 * //=> 2019. 10. 4.
 *
 * @example
 * // Represent 10 October 2019 in middle-endian format:
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456))
 * //=> 10/4/2019
 */
function intlFormat(date, formatOrLocale, localeOptions) {
  var _localeOptions;
  requiredArgs(1, arguments);
  var formatOptions;
  if (isFormatOptions(formatOrLocale)) {
    formatOptions = formatOrLocale;
  } else {
    localeOptions = formatOrLocale;
  }
  return new Intl.DateTimeFormat((_localeOptions = localeOptions) === null || _localeOptions === void 0 ? void 0 : _localeOptions.locale, formatOptions).format(date);
}
function isFormatOptions(opts) {
  return opts !== undefined && !('locale' in opts);
}

/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is today
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameDay(dirtyDate, Date.now());
}

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}

/**
 * @name isYesterday
 * @category Day Helpers
 * @summary Is the given date yesterday?
 * @pure false
 *
 * @description
 * Is the given date yesterday?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is yesterday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * const result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
function isYesterday(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameDay(dirtyDate, subDays(Date.now(), 1));
}

class DateFormatter {
    date;
    /**
     * @example December 31, 2022
     */
    dateFormat = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    /**
     * @example 12/31/22
     */
    shortDateFormat = {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
    };
    /**
     * @example 12:15 PM
     */
    timeFormat = {
        hour: 'numeric',
        hour12: true,
        minute: 'numeric',
    };
    /**
     * @example December 31, 2022 at 12:15 PM
     */
    dateTimeFormat = {
        ...this.dateFormat,
        ...this.timeFormat,
    };
    /**
     * @example Saturday, December 31, 2022 at 12:15 PM
     */
    dayDateTimeFormat = {
        weekday: 'long',
        ...this.dateFormat,
        ...this.timeFormat,
    };
    constructor(date) {
        this.date = date;
    }
    get withinDifferenceDateFormat() {
        if (this.date === null) {
            return '';
        }
        if (isToday(this.date) === true) {
            return intlFormat(this.date, this.timeFormat);
        }
        if (isYesterday(this.date) === true) {
            return 'Yesterday';
        }
        return intlFormat(this.date, this.shortDateFormat);
    }
    get withinDateFormat() {
        return this.date === null ? '' : intlFormat(this.date, this.dateFormat);
    }
    get withinTimeFormat() {
        return this.date === null ? '' : intlFormat(this.date, this.timeFormat);
    }
    get withinDateTimeFormat() {
        return this.date === null ? '' : intlFormat(this.date, this.dateTimeFormat);
    }
    get withinDayDateTimeFormat() {
        return this.date === null ? '' : intlFormat(this.date, this.dayDateTimeFormat);
    }
}

class PrivateMessageData {
    id;
    receiverId;
    senderId;
    type;
    value;
    createdAt;
    readAt;
    static timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    constructor(id, receiverId, senderId, type, value, createdAt, readAt) {
        this.id = id;
        this.receiverId = receiverId;
        this.senderId = senderId;
        this.type = type;
        this.value = value;
        this.createdAt = createdAt;
        this.readAt = readAt;
    }
    setReadAtTime(time) {
        this.readAt = new DateFormatter(dateFnsTz.utcToZonedTime(time, PrivateMessageData.timeZone));
    }
    static from(message) {
        return new this(message.id, message.receiver_id, message.sender_id, MessageType$1[{
            DOCUMENT: 'Document',
            TEXT: 'Text',
        }[message.type]], message.value, new DateFormatter(dateFnsTz.utcToZonedTime(message.created_at, PrivateMessageData.timeZone)), new DateFormatter(message.read_at !== null ? dateFnsTz.utcToZonedTime(message.read_at, PrivateMessageData.timeZone) : null));
    }
}

class ContactData {
    id;
    name;
    avatar;
    unreadMessages;
    lastPrivateMessage;
    isOnline;
    typing;
    constructor(id, name, avatar, unreadMessages, lastPrivateMessage, isOnline = false, typing = false) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.unreadMessages = unreadMessages;
        this.lastPrivateMessage = lastPrivateMessage;
        this.isOnline = isOnline;
        this.typing = typing;
    }
    static from(contact) {
        return new this(contact.id, contact.name, contact.avatar, contact.unread_messages, contact.last_private_message !== null ? PrivateMessageData.from(contact.last_private_message) : null);
    }
}

var contactComponent = () => {
    const container = document.querySelector('.basement-contacts');
    const url = container.getAttribute('data-url');
    return {
        contacts: [],
        search: '',
        unreadMessages: 0,
        url,
        /**
         * Hook during the initialization phase of the current Alpine component.
         */
        init() {
            this.$watch('contacts', this.watchContacts.bind(this));
            this.$refs.basementChatBox.addEventListener('update-last-private-message-received', this.updateLastPrivateMessageReceived.bind(this));
            this.$refs.basementChatBox.addEventListener('update-last-private-message-sent', this.updateLastPrivateMessageSent.bind(this));
            this.$refs.basementChatBox.addEventListener('update-currently-typing-contact', this.updateCurrentlyTypingContact.bind(this));
            this.$refs.basementChatBox.addEventListener('update-unread-messages', this.updateUnreadMessages.bind(this));
        },
        /**
         * Load initial component data.
         */
        async mount() {
            const response = await window.axios
                .get(this.url)
                .then(({ data }) => data);
            this.contacts = response
                .data
                .map((contact) => ContactData.from(contact));
            this.registerEchoEventListeners();
        },
        /**
         * Get contacts filtered by search keywords.
         */
        get filteredContacts() {
            if (this.search === '') {
                return this.contacts;
            }
            return this
                .contacts
                .filter(({ name }) => (name
                .toLowerCase()
                .includes(this.search.toLowerCase())));
        },
        /**
         * Find the same contact with the given id in the current component.
         */
        findSameContact(searchId) {
            const sameContactIndex = this
                .contacts
                .findIndex(({ id }) => id === searchId);
            if (sameContactIndex === -1) {
                return { index: null, contact: null };
            }
            return { index: sameContactIndex, contact: this.contacts.at(sameContactIndex) };
        },
        /**
         * Laravel Echo event listener to see other contacts that are on the current channel.
         */
        onHere(contacts) {
            contacts.forEach((contact) => {
                const sameContact = this.findSameContact(contact.id).contact;
                if (sameContact !== null) {
                    sameContact.isOnline = true;
                }
            });
        },
        /**
         * Laravel Echo event listener when someone joins the channel.
         */
        onSomeoneJoining(contact) {
            const sameContact = this.findSameContact(contact.id).contact;
            if (sameContact !== null) {
                sameContact.isOnline = true;
            }
            else {
                const newContact = ContactData.from(contact);
                newContact.isOnline = true;
                this.contacts.push(newContact);
            }
        },
        /**
         * Laravel Echo event listener when someone leaves the channel.
         */
        onSomeoneLeaving(contact) {
            const sameContact = this.findSameContact(contact.id).contact;
            if (sameContact !== null) {
                sameContact.isOnline = false;
            }
        },
        /**
         * Register Laravel Echo event listeners.
         */
        registerEchoEventListeners() {
            window.Echo.join('basement.contacts')
                .here(this.onHere.bind(this))
                .joining(this.onSomeoneJoining.bind(this))
                .leaving(this.onSomeoneLeaving.bind(this));
        },
        /**
         * HTML DOM event listener to update the last private message in the current component when
         * the message has been received.
         */
        updateLastPrivateMessageReceived(event) {
            const sameContactIndex = this.findSameContact(event.detail.senderId).index;
            if (sameContactIndex === null) {
                return;
            }
            const sameContact = this.contacts.splice(sameContactIndex, 1).at(0);
            sameContact.lastPrivateMessage = event.detail;
            if (sameContact.id !== event.detail.receiverId) {
                sameContact.unreadMessages += 1;
            }
            this.contacts.unshift(sameContact);
        },
        /**
         * HTML DOM event listener to update the last private message in the current component when
         * the message has been sent.
         */
        updateLastPrivateMessageSent(event) {
            const sameContactIndex = this.findSameContact(event.detail.receiverId).index;
            if (sameContactIndex === null) {
                return;
            }
            const sameContact = this.contacts.splice(sameContactIndex, 1).at(0);
            sameContact.lastPrivateMessage = event.detail;
            this.contacts.unshift(sameContact);
        },
        /**
         * Trigger update receiver event to the chat box component.
         */
        updateReceiver(contact) {
            this.$dispatch('update-receiver', contact);
        },
        /**
         * HTML DOM event listener to update the typing status of the given contact.
         */
        updateCurrentlyTypingContact(event) {
            const sameContact = this.findSameContact(event.detail.contact.id).contact;
            if (sameContact === null) {
                return;
            }
            sameContact.typing = event.detail.contact.typing;
        },
        /**
         * HTML DOM event listener to update the unread messages count.
         */
        updateUnreadMessages(event) {
            event.detail.messages.forEach(({ sender_id, total }) => {
                const sameContact = this.findSameContact(Number(sender_id)).contact;
                if (sameContact === null) {
                    return;
                }
                sameContact.unreadMessages -= total;
            });
        },
        /**
         * Watch when the contacts changes.
         */
        watchContacts(newValue) {
            this.unreadMessages = newValue.reduce((total, contact) => (total + contact.unreadMessages), 0);
        },
    };
};

var markExports = {};
var mark = {
  get exports(){ return markExports; },
  set exports(v){ markExports = v; },
};

/*!***************************************************
* mark.js v8.11.1
* https://markjs.io/
* Copyright (c) 2014–2018, Julian Kühnel
* Released under the MIT license https://git.io/vwTVl
*****************************************************/

(function (module, exports) {
	(function (global, factory) {
		module.exports = factory() ;
	}(commonjsGlobal, (function () {
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};











	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();







	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var DOMIterator = function () {
	  function DOMIterator(ctx) {
	    var iframes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	    var iframesTimeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;
	    classCallCheck(this, DOMIterator);

	    this.ctx = ctx;
	    this.iframes = iframes;
	    this.exclude = exclude;
	    this.iframesTimeout = iframesTimeout;
	  }

	  createClass(DOMIterator, [{
	    key: 'getContexts',
	    value: function getContexts() {
	      var ctx = void 0,
	          filteredCtx = [];
	      if (typeof this.ctx === 'undefined' || !this.ctx) {
	        ctx = [];
	      } else if (NodeList.prototype.isPrototypeOf(this.ctx)) {
	        ctx = Array.prototype.slice.call(this.ctx);
	      } else if (Array.isArray(this.ctx)) {
	        ctx = this.ctx;
	      } else if (typeof this.ctx === 'string') {
	        ctx = Array.prototype.slice.call(document.querySelectorAll(this.ctx));
	      } else {
	        ctx = [this.ctx];
	      }
	      ctx.forEach(function (ctx) {
	        var isDescendant = filteredCtx.filter(function (contexts) {
	          return contexts.contains(ctx);
	        }).length > 0;
	        if (filteredCtx.indexOf(ctx) === -1 && !isDescendant) {
	          filteredCtx.push(ctx);
	        }
	      });
	      return filteredCtx;
	    }
	  }, {
	    key: 'getIframeContents',
	    value: function getIframeContents(ifr, successFn) {
	      var errorFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	      var doc = void 0;
	      try {
	        var ifrWin = ifr.contentWindow;
	        doc = ifrWin.document;
	        if (!ifrWin || !doc) {
	          throw new Error('iframe inaccessible');
	        }
	      } catch (e) {
	        errorFn();
	      }
	      if (doc) {
	        successFn(doc);
	      }
	    }
	  }, {
	    key: 'isIframeBlank',
	    value: function isIframeBlank(ifr) {
	      var bl = 'about:blank',
	          src = ifr.getAttribute('src').trim(),
	          href = ifr.contentWindow.location.href;
	      return href === bl && src !== bl && src;
	    }
	  }, {
	    key: 'observeIframeLoad',
	    value: function observeIframeLoad(ifr, successFn, errorFn) {
	      var _this = this;

	      var called = false,
	          tout = null;
	      var listener = function listener() {
	        if (called) {
	          return;
	        }
	        called = true;
	        clearTimeout(tout);
	        try {
	          if (!_this.isIframeBlank(ifr)) {
	            ifr.removeEventListener('load', listener);
	            _this.getIframeContents(ifr, successFn, errorFn);
	          }
	        } catch (e) {
	          errorFn();
	        }
	      };
	      ifr.addEventListener('load', listener);
	      tout = setTimeout(listener, this.iframesTimeout);
	    }
	  }, {
	    key: 'onIframeReady',
	    value: function onIframeReady(ifr, successFn, errorFn) {
	      try {
	        if (ifr.contentWindow.document.readyState === 'complete') {
	          if (this.isIframeBlank(ifr)) {
	            this.observeIframeLoad(ifr, successFn, errorFn);
	          } else {
	            this.getIframeContents(ifr, successFn, errorFn);
	          }
	        } else {
	          this.observeIframeLoad(ifr, successFn, errorFn);
	        }
	      } catch (e) {
	        errorFn();
	      }
	    }
	  }, {
	    key: 'waitForIframes',
	    value: function waitForIframes(ctx, done) {
	      var _this2 = this;

	      var eachCalled = 0;
	      this.forEachIframe(ctx, function () {
	        return true;
	      }, function (ifr) {
	        eachCalled++;
	        _this2.waitForIframes(ifr.querySelector('html'), function () {
	          if (! --eachCalled) {
	            done();
	          }
	        });
	      }, function (handled) {
	        if (!handled) {
	          done();
	        }
	      });
	    }
	  }, {
	    key: 'forEachIframe',
	    value: function forEachIframe(ctx, filter, each) {
	      var _this3 = this;

	      var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

	      var ifr = ctx.querySelectorAll('iframe'),
	          open = ifr.length,
	          handled = 0;
	      ifr = Array.prototype.slice.call(ifr);
	      var checkEnd = function checkEnd() {
	        if (--open <= 0) {
	          end(handled);
	        }
	      };
	      if (!open) {
	        checkEnd();
	      }
	      ifr.forEach(function (ifr) {
	        if (DOMIterator.matches(ifr, _this3.exclude)) {
	          checkEnd();
	        } else {
	          _this3.onIframeReady(ifr, function (con) {
	            if (filter(ifr)) {
	              handled++;
	              each(con);
	            }
	            checkEnd();
	          }, checkEnd);
	        }
	      });
	    }
	  }, {
	    key: 'createIterator',
	    value: function createIterator(ctx, whatToShow, filter) {
	      return document.createNodeIterator(ctx, whatToShow, filter, false);
	    }
	  }, {
	    key: 'createInstanceOnIframe',
	    value: function createInstanceOnIframe(contents) {
	      return new DOMIterator(contents.querySelector('html'), this.iframes);
	    }
	  }, {
	    key: 'compareNodeIframe',
	    value: function compareNodeIframe(node, prevNode, ifr) {
	      var compCurr = node.compareDocumentPosition(ifr),
	          prev = Node.DOCUMENT_POSITION_PRECEDING;
	      if (compCurr & prev) {
	        if (prevNode !== null) {
	          var compPrev = prevNode.compareDocumentPosition(ifr),
	              after = Node.DOCUMENT_POSITION_FOLLOWING;
	          if (compPrev & after) {
	            return true;
	          }
	        } else {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'getIteratorNode',
	    value: function getIteratorNode(itr) {
	      var prevNode = itr.previousNode();
	      var node = void 0;
	      if (prevNode === null) {
	        node = itr.nextNode();
	      } else {
	        node = itr.nextNode() && itr.nextNode();
	      }
	      return {
	        prevNode: prevNode,
	        node: node
	      };
	    }
	  }, {
	    key: 'checkIframeFilter',
	    value: function checkIframeFilter(node, prevNode, currIfr, ifr) {
	      var key = false,
	          handled = false;
	      ifr.forEach(function (ifrDict, i) {
	        if (ifrDict.val === currIfr) {
	          key = i;
	          handled = ifrDict.handled;
	        }
	      });
	      if (this.compareNodeIframe(node, prevNode, currIfr)) {
	        if (key === false && !handled) {
	          ifr.push({
	            val: currIfr,
	            handled: true
	          });
	        } else if (key !== false && !handled) {
	          ifr[key].handled = true;
	        }
	        return true;
	      }
	      if (key === false) {
	        ifr.push({
	          val: currIfr,
	          handled: false
	        });
	      }
	      return false;
	    }
	  }, {
	    key: 'handleOpenIframes',
	    value: function handleOpenIframes(ifr, whatToShow, eCb, fCb) {
	      var _this4 = this;

	      ifr.forEach(function (ifrDict) {
	        if (!ifrDict.handled) {
	          _this4.getIframeContents(ifrDict.val, function (con) {
	            _this4.createInstanceOnIframe(con).forEachNode(whatToShow, eCb, fCb);
	          });
	        }
	      });
	    }
	  }, {
	    key: 'iterateThroughNodes',
	    value: function iterateThroughNodes(whatToShow, ctx, eachCb, filterCb, doneCb) {
	      var _this5 = this;

	      var itr = this.createIterator(ctx, whatToShow, filterCb);
	      var ifr = [],
	          elements = [],
	          node = void 0,
	          prevNode = void 0,
	          retrieveNodes = function retrieveNodes() {
	        var _getIteratorNode = _this5.getIteratorNode(itr);

	        prevNode = _getIteratorNode.prevNode;
	        node = _getIteratorNode.node;

	        return node;
	      };
	      while (retrieveNodes()) {
	        if (this.iframes) {
	          this.forEachIframe(ctx, function (currIfr) {
	            return _this5.checkIframeFilter(node, prevNode, currIfr, ifr);
	          }, function (con) {
	            _this5.createInstanceOnIframe(con).forEachNode(whatToShow, function (ifrNode) {
	              return elements.push(ifrNode);
	            }, filterCb);
	          });
	        }
	        elements.push(node);
	      }
	      elements.forEach(function (node) {
	        eachCb(node);
	      });
	      if (this.iframes) {
	        this.handleOpenIframes(ifr, whatToShow, eachCb, filterCb);
	      }
	      doneCb();
	    }
	  }, {
	    key: 'forEachNode',
	    value: function forEachNode(whatToShow, each, filter) {
	      var _this6 = this;

	      var done = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

	      var contexts = this.getContexts();
	      var open = contexts.length;
	      if (!open) {
	        done();
	      }
	      contexts.forEach(function (ctx) {
	        var ready = function ready() {
	          _this6.iterateThroughNodes(whatToShow, ctx, each, filter, function () {
	            if (--open <= 0) {
	              done();
	            }
	          });
	        };
	        if (_this6.iframes) {
	          _this6.waitForIframes(ctx, ready);
	        } else {
	          ready();
	        }
	      });
	    }
	  }], [{
	    key: 'matches',
	    value: function matches(element, selector) {
	      var selectors = typeof selector === 'string' ? [selector] : selector,
	          fn = element.matches || element.matchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
	      if (fn) {
	        var match = false;
	        selectors.every(function (sel) {
	          if (fn.call(element, sel)) {
	            match = true;
	            return false;
	          }
	          return true;
	        });
	        return match;
	      } else {
	        return false;
	      }
	    }
	  }]);
	  return DOMIterator;
	}();

	var Mark$1 = function () {
	  function Mark(ctx) {
	    classCallCheck(this, Mark);

	    this.ctx = ctx;
	    this.ie = false;
	    var ua = window.navigator.userAgent;
	    if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
	      this.ie = true;
	    }
	  }

	  createClass(Mark, [{
	    key: 'log',
	    value: function log(msg) {
	      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'debug';

	      var log = this.opt.log;
	      if (!this.opt.debug) {
	        return;
	      }
	      if ((typeof log === 'undefined' ? 'undefined' : _typeof(log)) === 'object' && typeof log[level] === 'function') {
	        log[level]('mark.js: ' + msg);
	      }
	    }
	  }, {
	    key: 'escapeStr',
	    value: function escapeStr(str) {
	      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	    }
	  }, {
	    key: 'createRegExp',
	    value: function createRegExp(str) {
	      if (this.opt.wildcards !== 'disabled') {
	        str = this.setupWildcardsRegExp(str);
	      }
	      str = this.escapeStr(str);
	      if (Object.keys(this.opt.synonyms).length) {
	        str = this.createSynonymsRegExp(str);
	      }
	      if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
	        str = this.setupIgnoreJoinersRegExp(str);
	      }
	      if (this.opt.diacritics) {
	        str = this.createDiacriticsRegExp(str);
	      }
	      str = this.createMergedBlanksRegExp(str);
	      if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
	        str = this.createJoinersRegExp(str);
	      }
	      if (this.opt.wildcards !== 'disabled') {
	        str = this.createWildcardsRegExp(str);
	      }
	      str = this.createAccuracyRegExp(str);
	      return str;
	    }
	  }, {
	    key: 'createSynonymsRegExp',
	    value: function createSynonymsRegExp(str) {
	      var syn = this.opt.synonyms,
	          sens = this.opt.caseSensitive ? '' : 'i',
	          joinerPlaceholder = this.opt.ignoreJoiners || this.opt.ignorePunctuation.length ? '\0' : '';
	      for (var index in syn) {
	        if (syn.hasOwnProperty(index)) {
	          var value = syn[index],
	              k1 = this.opt.wildcards !== 'disabled' ? this.setupWildcardsRegExp(index) : this.escapeStr(index),
	              k2 = this.opt.wildcards !== 'disabled' ? this.setupWildcardsRegExp(value) : this.escapeStr(value);
	          if (k1 !== '' && k2 !== '') {
	            str = str.replace(new RegExp('(' + this.escapeStr(k1) + '|' + this.escapeStr(k2) + ')', 'gm' + sens), joinerPlaceholder + ('(' + this.processSynomyms(k1) + '|') + (this.processSynomyms(k2) + ')') + joinerPlaceholder);
	          }
	        }
	      }
	      return str;
	    }
	  }, {
	    key: 'processSynomyms',
	    value: function processSynomyms(str) {
	      if (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) {
	        str = this.setupIgnoreJoinersRegExp(str);
	      }
	      return str;
	    }
	  }, {
	    key: 'setupWildcardsRegExp',
	    value: function setupWildcardsRegExp(str) {
	      str = str.replace(/(?:\\)*\?/g, function (val) {
	        return val.charAt(0) === '\\' ? '?' : '\x01';
	      });
	      return str.replace(/(?:\\)*\*/g, function (val) {
	        return val.charAt(0) === '\\' ? '*' : '\x02';
	      });
	    }
	  }, {
	    key: 'createWildcardsRegExp',
	    value: function createWildcardsRegExp(str) {
	      var spaces = this.opt.wildcards === 'withSpaces';
	      return str.replace(/\u0001/g, spaces ? '[\\S\\s]?' : '\\S?').replace(/\u0002/g, spaces ? '[\\S\\s]*?' : '\\S*');
	    }
	  }, {
	    key: 'setupIgnoreJoinersRegExp',
	    value: function setupIgnoreJoinersRegExp(str) {
	      return str.replace(/[^(|)\\]/g, function (val, indx, original) {
	        var nextChar = original.charAt(indx + 1);
	        if (/[(|)\\]/.test(nextChar) || nextChar === '') {
	          return val;
	        } else {
	          return val + '\0';
	        }
	      });
	    }
	  }, {
	    key: 'createJoinersRegExp',
	    value: function createJoinersRegExp(str) {
	      var joiner = [];
	      var ignorePunctuation = this.opt.ignorePunctuation;
	      if (Array.isArray(ignorePunctuation) && ignorePunctuation.length) {
	        joiner.push(this.escapeStr(ignorePunctuation.join('')));
	      }
	      if (this.opt.ignoreJoiners) {
	        joiner.push('\\u00ad\\u200b\\u200c\\u200d');
	      }
	      return joiner.length ? str.split(/\u0000+/).join('[' + joiner.join('') + ']*') : str;
	    }
	  }, {
	    key: 'createDiacriticsRegExp',
	    value: function createDiacriticsRegExp(str) {
	      var sens = this.opt.caseSensitive ? '' : 'i',
	          dct = this.opt.caseSensitive ? ['aàáảãạăằắẳẵặâầấẩẫậäåāą', 'AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ', 'cçćč', 'CÇĆČ', 'dđď', 'DĐĎ', 'eèéẻẽẹêềếểễệëěēę', 'EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ', 'iìíỉĩịîïī', 'IÌÍỈĨỊÎÏĪ', 'lł', 'LŁ', 'nñňń', 'NÑŇŃ', 'oòóỏõọôồốổỗộơởỡớờợöøō', 'OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ', 'rř', 'RŘ', 'sšśșş', 'SŠŚȘŞ', 'tťțţ', 'TŤȚŢ', 'uùúủũụưừứửữựûüůū', 'UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ', 'yýỳỷỹỵÿ', 'YÝỲỶỸỴŸ', 'zžżź', 'ZŽŻŹ'] : ['aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ', 'cçćčCÇĆČ', 'dđďDĐĎ', 'eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ', 'iìíỉĩịîïīIÌÍỈĨỊÎÏĪ', 'lłLŁ', 'nñňńNÑŇŃ', 'oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ', 'rřRŘ', 'sšśșşSŠŚȘŞ', 'tťțţTŤȚŢ', 'uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ', 'yýỳỷỹỵÿYÝỲỶỸỴŸ', 'zžżźZŽŻŹ'];
	      var handled = [];
	      str.split('').forEach(function (ch) {
	        dct.every(function (dct) {
	          if (dct.indexOf(ch) !== -1) {
	            if (handled.indexOf(dct) > -1) {
	              return false;
	            }
	            str = str.replace(new RegExp('[' + dct + ']', 'gm' + sens), '[' + dct + ']');
	            handled.push(dct);
	          }
	          return true;
	        });
	      });
	      return str;
	    }
	  }, {
	    key: 'createMergedBlanksRegExp',
	    value: function createMergedBlanksRegExp(str) {
	      return str.replace(/[\s]+/gmi, '[\\s]+');
	    }
	  }, {
	    key: 'createAccuracyRegExp',
	    value: function createAccuracyRegExp(str) {
	      var _this = this;

	      var chars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~¡¿';
	      var acc = this.opt.accuracy,
	          val = typeof acc === 'string' ? acc : acc.value,
	          ls = typeof acc === 'string' ? [] : acc.limiters,
	          lsJoin = '';
	      ls.forEach(function (limiter) {
	        lsJoin += '|' + _this.escapeStr(limiter);
	      });
	      switch (val) {
	        case 'partially':
	        default:
	          return '()(' + str + ')';
	        case 'complementary':
	          lsJoin = '\\s' + (lsJoin ? lsJoin : this.escapeStr(chars));
	          return '()([^' + lsJoin + ']*' + str + '[^' + lsJoin + ']*)';
	        case 'exactly':
	          return '(^|\\s' + lsJoin + ')(' + str + ')(?=$|\\s' + lsJoin + ')';
	      }
	    }
	  }, {
	    key: 'getSeparatedKeywords',
	    value: function getSeparatedKeywords(sv) {
	      var _this2 = this;

	      var stack = [];
	      sv.forEach(function (kw) {
	        if (!_this2.opt.separateWordSearch) {
	          if (kw.trim() && stack.indexOf(kw) === -1) {
	            stack.push(kw);
	          }
	        } else {
	          kw.split(' ').forEach(function (kwSplitted) {
	            if (kwSplitted.trim() && stack.indexOf(kwSplitted) === -1) {
	              stack.push(kwSplitted);
	            }
	          });
	        }
	      });
	      return {
	        'keywords': stack.sort(function (a, b) {
	          return b.length - a.length;
	        }),
	        'length': stack.length
	      };
	    }
	  }, {
	    key: 'isNumeric',
	    value: function isNumeric(value) {
	      return Number(parseFloat(value)) == value;
	    }
	  }, {
	    key: 'checkRanges',
	    value: function checkRanges(array) {
	      var _this3 = this;

	      if (!Array.isArray(array) || Object.prototype.toString.call(array[0]) !== '[object Object]') {
	        this.log('markRanges() will only accept an array of objects');
	        this.opt.noMatch(array);
	        return [];
	      }
	      var stack = [];
	      var last = 0;
	      array.sort(function (a, b) {
	        return a.start - b.start;
	      }).forEach(function (item) {
	        var _callNoMatchOnInvalid = _this3.callNoMatchOnInvalidRanges(item, last),
	            start = _callNoMatchOnInvalid.start,
	            end = _callNoMatchOnInvalid.end,
	            valid = _callNoMatchOnInvalid.valid;

	        if (valid) {
	          item.start = start;
	          item.length = end - start;
	          stack.push(item);
	          last = end;
	        }
	      });
	      return stack;
	    }
	  }, {
	    key: 'callNoMatchOnInvalidRanges',
	    value: function callNoMatchOnInvalidRanges(range, last) {
	      var start = void 0,
	          end = void 0,
	          valid = false;
	      if (range && typeof range.start !== 'undefined') {
	        start = parseInt(range.start, 10);
	        end = start + parseInt(range.length, 10);
	        if (this.isNumeric(range.start) && this.isNumeric(range.length) && end - last > 0 && end - start > 0) {
	          valid = true;
	        } else {
	          this.log('Ignoring invalid or overlapping range: ' + ('' + JSON.stringify(range)));
	          this.opt.noMatch(range);
	        }
	      } else {
	        this.log('Ignoring invalid range: ' + JSON.stringify(range));
	        this.opt.noMatch(range);
	      }
	      return {
	        start: start,
	        end: end,
	        valid: valid
	      };
	    }
	  }, {
	    key: 'checkWhitespaceRanges',
	    value: function checkWhitespaceRanges(range, originalLength, string) {
	      var end = void 0,
	          valid = true,
	          max = string.length,
	          offset = originalLength - max,
	          start = parseInt(range.start, 10) - offset;
	      start = start > max ? max : start;
	      end = start + parseInt(range.length, 10);
	      if (end > max) {
	        end = max;
	        this.log('End range automatically set to the max value of ' + max);
	      }
	      if (start < 0 || end - start < 0 || start > max || end > max) {
	        valid = false;
	        this.log('Invalid range: ' + JSON.stringify(range));
	        this.opt.noMatch(range);
	      } else if (string.substring(start, end).replace(/\s+/g, '') === '') {
	        valid = false;
	        this.log('Skipping whitespace only range: ' + JSON.stringify(range));
	        this.opt.noMatch(range);
	      }
	      return {
	        start: start,
	        end: end,
	        valid: valid
	      };
	    }
	  }, {
	    key: 'getTextNodes',
	    value: function getTextNodes(cb) {
	      var _this4 = this;

	      var val = '',
	          nodes = [];
	      this.iterator.forEachNode(NodeFilter.SHOW_TEXT, function (node) {
	        nodes.push({
	          start: val.length,
	          end: (val += node.textContent).length,
	          node: node
	        });
	      }, function (node) {
	        if (_this4.matchesExclude(node.parentNode)) {
	          return NodeFilter.FILTER_REJECT;
	        } else {
	          return NodeFilter.FILTER_ACCEPT;
	        }
	      }, function () {
	        cb({
	          value: val,
	          nodes: nodes
	        });
	      });
	    }
	  }, {
	    key: 'matchesExclude',
	    value: function matchesExclude(el) {
	      return DOMIterator.matches(el, this.opt.exclude.concat(['script', 'style', 'title', 'head', 'html']));
	    }
	  }, {
	    key: 'wrapRangeInTextNode',
	    value: function wrapRangeInTextNode(node, start, end) {
	      var hEl = !this.opt.element ? 'mark' : this.opt.element,
	          startNode = node.splitText(start),
	          ret = startNode.splitText(end - start);
	      var repl = document.createElement(hEl);
	      repl.setAttribute('data-markjs', 'true');
	      if (this.opt.className) {
	        repl.setAttribute('class', this.opt.className);
	      }
	      repl.textContent = startNode.textContent;
	      startNode.parentNode.replaceChild(repl, startNode);
	      return ret;
	    }
	  }, {
	    key: 'wrapRangeInMappedTextNode',
	    value: function wrapRangeInMappedTextNode(dict, start, end, filterCb, eachCb) {
	      var _this5 = this;

	      dict.nodes.every(function (n, i) {
	        var sibl = dict.nodes[i + 1];
	        if (typeof sibl === 'undefined' || sibl.start > start) {
	          if (!filterCb(n.node)) {
	            return false;
	          }
	          var s = start - n.start,
	              e = (end > n.end ? n.end : end) - n.start,
	              startStr = dict.value.substr(0, n.start),
	              endStr = dict.value.substr(e + n.start);
	          n.node = _this5.wrapRangeInTextNode(n.node, s, e);
	          dict.value = startStr + endStr;
	          dict.nodes.forEach(function (k, j) {
	            if (j >= i) {
	              if (dict.nodes[j].start > 0 && j !== i) {
	                dict.nodes[j].start -= e;
	              }
	              dict.nodes[j].end -= e;
	            }
	          });
	          end -= e;
	          eachCb(n.node.previousSibling, n.start);
	          if (end > n.end) {
	            start = n.end;
	          } else {
	            return false;
	          }
	        }
	        return true;
	      });
	    }
	  }, {
	    key: 'wrapMatches',
	    value: function wrapMatches(regex, ignoreGroups, filterCb, eachCb, endCb) {
	      var _this6 = this;

	      var matchIdx = ignoreGroups === 0 ? 0 : ignoreGroups + 1;
	      this.getTextNodes(function (dict) {
	        dict.nodes.forEach(function (node) {
	          node = node.node;
	          var match = void 0;
	          while ((match = regex.exec(node.textContent)) !== null && match[matchIdx] !== '') {
	            if (!filterCb(match[matchIdx], node)) {
	              continue;
	            }
	            var pos = match.index;
	            if (matchIdx !== 0) {
	              for (var i = 1; i < matchIdx; i++) {
	                pos += match[i].length;
	              }
	            }
	            node = _this6.wrapRangeInTextNode(node, pos, pos + match[matchIdx].length);
	            eachCb(node.previousSibling);
	            regex.lastIndex = 0;
	          }
	        });
	        endCb();
	      });
	    }
	  }, {
	    key: 'wrapMatchesAcrossElements',
	    value: function wrapMatchesAcrossElements(regex, ignoreGroups, filterCb, eachCb, endCb) {
	      var _this7 = this;

	      var matchIdx = ignoreGroups === 0 ? 0 : ignoreGroups + 1;
	      this.getTextNodes(function (dict) {
	        var match = void 0;
	        while ((match = regex.exec(dict.value)) !== null && match[matchIdx] !== '') {
	          var start = match.index;
	          if (matchIdx !== 0) {
	            for (var i = 1; i < matchIdx; i++) {
	              start += match[i].length;
	            }
	          }
	          var end = start + match[matchIdx].length;
	          _this7.wrapRangeInMappedTextNode(dict, start, end, function (node) {
	            return filterCb(match[matchIdx], node);
	          }, function (node, lastIndex) {
	            regex.lastIndex = lastIndex;
	            eachCb(node);
	          });
	        }
	        endCb();
	      });
	    }
	  }, {
	    key: 'wrapRangeFromIndex',
	    value: function wrapRangeFromIndex(ranges, filterCb, eachCb, endCb) {
	      var _this8 = this;

	      this.getTextNodes(function (dict) {
	        var originalLength = dict.value.length;
	        ranges.forEach(function (range, counter) {
	          var _checkWhitespaceRange = _this8.checkWhitespaceRanges(range, originalLength, dict.value),
	              start = _checkWhitespaceRange.start,
	              end = _checkWhitespaceRange.end,
	              valid = _checkWhitespaceRange.valid;

	          if (valid) {
	            _this8.wrapRangeInMappedTextNode(dict, start, end, function (node) {
	              return filterCb(node, range, dict.value.substring(start, end), counter);
	            }, function (node) {
	              eachCb(node, range);
	            });
	          }
	        });
	        endCb();
	      });
	    }
	  }, {
	    key: 'unwrapMatches',
	    value: function unwrapMatches(node) {
	      var parent = node.parentNode;
	      var docFrag = document.createDocumentFragment();
	      while (node.firstChild) {
	        docFrag.appendChild(node.removeChild(node.firstChild));
	      }
	      parent.replaceChild(docFrag, node);
	      if (!this.ie) {
	        parent.normalize();
	      } else {
	        this.normalizeTextNode(parent);
	      }
	    }
	  }, {
	    key: 'normalizeTextNode',
	    value: function normalizeTextNode(node) {
	      if (!node) {
	        return;
	      }
	      if (node.nodeType === 3) {
	        while (node.nextSibling && node.nextSibling.nodeType === 3) {
	          node.nodeValue += node.nextSibling.nodeValue;
	          node.parentNode.removeChild(node.nextSibling);
	        }
	      } else {
	        this.normalizeTextNode(node.firstChild);
	      }
	      this.normalizeTextNode(node.nextSibling);
	    }
	  }, {
	    key: 'markRegExp',
	    value: function markRegExp(regexp, opt) {
	      var _this9 = this;

	      this.opt = opt;
	      this.log('Searching with expression "' + regexp + '"');
	      var totalMatches = 0,
	          fn = 'wrapMatches';
	      var eachCb = function eachCb(element) {
	        totalMatches++;
	        _this9.opt.each(element);
	      };
	      if (this.opt.acrossElements) {
	        fn = 'wrapMatchesAcrossElements';
	      }
	      this[fn](regexp, this.opt.ignoreGroups, function (match, node) {
	        return _this9.opt.filter(node, match, totalMatches);
	      }, eachCb, function () {
	        if (totalMatches === 0) {
	          _this9.opt.noMatch(regexp);
	        }
	        _this9.opt.done(totalMatches);
	      });
	    }
	  }, {
	    key: 'mark',
	    value: function mark(sv, opt) {
	      var _this10 = this;

	      this.opt = opt;
	      var totalMatches = 0,
	          fn = 'wrapMatches';

	      var _getSeparatedKeywords = this.getSeparatedKeywords(typeof sv === 'string' ? [sv] : sv),
	          kwArr = _getSeparatedKeywords.keywords,
	          kwArrLen = _getSeparatedKeywords.length,
	          sens = this.opt.caseSensitive ? '' : 'i',
	          handler = function handler(kw) {
	        var regex = new RegExp(_this10.createRegExp(kw), 'gm' + sens),
	            matches = 0;
	        _this10.log('Searching with expression "' + regex + '"');
	        _this10[fn](regex, 1, function (term, node) {
	          return _this10.opt.filter(node, kw, totalMatches, matches);
	        }, function (element) {
	          matches++;
	          totalMatches++;
	          _this10.opt.each(element);
	        }, function () {
	          if (matches === 0) {
	            _this10.opt.noMatch(kw);
	          }
	          if (kwArr[kwArrLen - 1] === kw) {
	            _this10.opt.done(totalMatches);
	          } else {
	            handler(kwArr[kwArr.indexOf(kw) + 1]);
	          }
	        });
	      };

	      if (this.opt.acrossElements) {
	        fn = 'wrapMatchesAcrossElements';
	      }
	      if (kwArrLen === 0) {
	        this.opt.done(totalMatches);
	      } else {
	        handler(kwArr[0]);
	      }
	    }
	  }, {
	    key: 'markRanges',
	    value: function markRanges(rawRanges, opt) {
	      var _this11 = this;

	      this.opt = opt;
	      var totalMatches = 0,
	          ranges = this.checkRanges(rawRanges);
	      if (ranges && ranges.length) {
	        this.log('Starting to mark with the following ranges: ' + JSON.stringify(ranges));
	        this.wrapRangeFromIndex(ranges, function (node, range, match, counter) {
	          return _this11.opt.filter(node, range, match, counter);
	        }, function (element, range) {
	          totalMatches++;
	          _this11.opt.each(element, range);
	        }, function () {
	          _this11.opt.done(totalMatches);
	        });
	      } else {
	        this.opt.done(totalMatches);
	      }
	    }
	  }, {
	    key: 'unmark',
	    value: function unmark(opt) {
	      var _this12 = this;

	      this.opt = opt;
	      var sel = this.opt.element ? this.opt.element : '*';
	      sel += '[data-markjs]';
	      if (this.opt.className) {
	        sel += '.' + this.opt.className;
	      }
	      this.log('Removal selector "' + sel + '"');
	      this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT, function (node) {
	        _this12.unwrapMatches(node);
	      }, function (node) {
	        var matchesSel = DOMIterator.matches(node, sel),
	            matchesExclude = _this12.matchesExclude(node);
	        if (!matchesSel || matchesExclude) {
	          return NodeFilter.FILTER_REJECT;
	        } else {
	          return NodeFilter.FILTER_ACCEPT;
	        }
	      }, this.opt.done);
	    }
	  }, {
	    key: 'opt',
	    set: function set$$1(val) {
	      this._opt = _extends({}, {
	        'element': '',
	        'className': '',
	        'exclude': [],
	        'iframes': false,
	        'iframesTimeout': 5000,
	        'separateWordSearch': true,
	        'diacritics': true,
	        'synonyms': {},
	        'accuracy': 'partially',
	        'acrossElements': false,
	        'caseSensitive': false,
	        'ignoreJoiners': false,
	        'ignoreGroups': 0,
	        'ignorePunctuation': [],
	        'wildcards': 'disabled',
	        'each': function each() {},
	        'noMatch': function noMatch() {},
	        'filter': function filter() {
	          return true;
	        },
	        'done': function done() {},
	        'debug': false,
	        'log': window.console
	      }, val);
	    },
	    get: function get$$1() {
	      return this._opt;
	    }
	  }, {
	    key: 'iterator',
	    get: function get$$1() {
	      return new DOMIterator(this.ctx, this.opt.iframes, this.opt.exclude, this.opt.iframesTimeout);
	    }
	  }]);
	  return Mark;
	}();

	function Mark(ctx) {
	  var _this = this;

	  var instance = new Mark$1(ctx);
	  this.mark = function (sv, opt) {
	    instance.mark(sv, opt);
	    return _this;
	  };
	  this.markRegExp = function (sv, opt) {
	    instance.markRegExp(sv, opt);
	    return _this;
	  };
	  this.markRanges = function (sv, opt) {
	    instance.markRanges(sv, opt);
	    return _this;
	  };
	  this.unmark = function (opt) {
	    instance.unmark(opt);
	    return _this;
	  };
	  return this;
	}

	return Mark;

	})));
} (mark));

var Mark = markExports;

var privateMessageComponent = () => {
    const container = document.querySelector('.basement-private-messages');
    const highlighter = new Mark('.basement-private-messages__message-value');
    let lastMessageObserver;
    const urlTemplate = container.getAttribute('data-url');
    const urlBatchRequest = container.getAttribute('data-batch-request-url');
    const urlCurrentlyTypingTemplate = container.getAttribute('data-currently-typing-url');
    const userId = Number(container.getAttribute('data-user-id'));
    const typingsTimeout = new Map();
    return {
        isInfoBoxOpened: false,
        isLastMessageShown: false,
        isLoading: true,
        isLoadingShowMore: false,
        isLoadingSentMessage: false,
        isSearchOpened: false,
        messageIdWithOpenDialog: null,
        messages: [],
        newMessageValue: '',
        receiver: null,
        searchKeyword: '',
        seenMessages: [],
        selectedMessage: null,
        unreadMessageCursor: null,
        url: '',
        urlTemplate,
        urlBatchRequest,
        urlCurrentlyTyping: '',
        urlCurrentlyTypingTemplate,
        urlShowMore: null,
        /**
         * Hook during the initialization phase of the current Alpine component.
         */
        init() {
            this.$refs.basementChatBox.addEventListener('update-receiver', this.updateReceiver.bind(this));
            this.$watch('messages', this.watchMessages.bind(this));
            setInterval(this.markSeenMessagesAsRead.bind(this), 3000);
            this.registerEchoEventListeners();
            lastMessageObserver = new IntersectionObserver(this.lastMessageObserver.bind(this), {
                root: this.$el,
                threshold: [0, 1],
            });
        },
        /**
         * Load initial component data.
         */
        async mount() {
            this.isLoading = true;
            const response = await window.axios.get(this.url, { params: { keyword: this.searchKeyword.trim() } }).then(({ data }) => data);
            this.urlShowMore = response.links.next;
            this.messages = response
                .data
                .map((message) => PrivateMessageData.from(message));
            this.isLoading = false;
            if (this.messages.length > 0) {
                this.setUnreadMessagesMarker();
                this.scrollTo(this.unreadMessageCursor ?? this.messages.at(0).id, {
                    block: 'center',
                });
            }
        },
        /**
         * Load more component data.
         */
        async mountMore() {
            if (this.urlShowMore === null) {
                throw new Error('Next page to load more private messages is not available');
            }
            this.isLoadingShowMore = true;
            const response = await window.axios.get(this.urlShowMore, { params: { keyword: this.searchKeyword.trim() } }).then(({ data }) => data);
            const messages = response
                .data
                .map((message) => PrivateMessageData.from(message));
            const currentCursor = this.messages.at(-1);
            this.messages.push(...messages);
            this.urlShowMore = response.links.next;
            this.isLoadingShowMore = false;
            if (currentCursor !== undefined) {
                this.scrollTo(currentCursor.id);
            }
        },
        /**
         * Get messages grouped by day of creation.
         */
        get groupedMessages() {
            const messages = new Map();
            [...this.messages].reverse().forEach((message) => {
                const date = message.createdAt.withinDateFormat;
                if (messages.has(date) === false) {
                    messages.set(date, []);
                }
                messages.get(date).push(message);
            });
            return [...messages.values()];
        },
        /**
         * Send a HTTP request to the currently typing API endpoint.
         */
        async currentlyTyping() {
            if (this.receiver !== null && this.receiver.id !== userId && this.newMessageValue !== '') {
                await window.axios.get(this.urlCurrentlyTyping);
            }
        },
        /**
         * Action when the last message is hidden or shown.
         */
        lastMessageObserver(entries) {
            const { intersectionRatio } = entries.at(0);
            if (intersectionRatio > 0.5) {
                this.isLastMessageShown = true;
            }
            else {
                this.isLastMessageShown = false;
            }
        },
        /**
         * Update messages that have been seen to the database.
         */
        markSeenMessagesAsRead() {
            if (this.seenMessages.length === 0) {
                return;
            }
            if (this.receiver === null) {
                throw new Error('Receiver cannot be empty');
            }
            void window
                .axios
                .patch(this.urlBatchRequest, this.seenMessages.map((value) => ({
                operation: 'mark as read',
                value: { id: value },
            })));
            this.seenMessages = [];
        },
        /**
         * Assign observer for the last message.
         */
        observeLastMessage() {
            const lastMessage = this.messages.at(0);
            if (lastMessage === undefined) {
                return;
            }
            void this.$nextTick(() => {
                const lastMessageElement = document.querySelector(`.basement-private-messages__message-value[data-id="${lastMessage.id}"]`);
                lastMessageObserver.disconnect();
                lastMessageObserver.observe(lastMessageElement);
            });
        },
        /**
         * Laravel Echo event listener when a message is received.
         */
        onMessageReceived(event) {
            this.setStatusToNotTyping(event.detail.sender_id);
            const receivedMessage = PrivateMessageData.from(event.detail);
            if (event.detail.sender_id === this.receiver?.id
                && event.detail.value.includes(this.searchKeyword.trim())) {
                this.messages.unshift(receivedMessage);
            }
            this.$dispatch('update-last-private-message-received', receivedMessage);
            if (userId !== event.detail.sender_id) {
                this.$dispatch('send-push-notification', {
                    title: event.detail.sender.name,
                    body: event.detail.value,
                    icon: event.detail.sender.avatar,
                });
            }
            if (this.isLastMessageShown === true) {
                this.scrollToLastMessage();
            }
        },
        /**
         * Laravel Echo event listener when a message is sent.
         */
        onMessageSent(event) {
            const sentMessage = PrivateMessageData.from(event.detail);
            if (event.detail.receiver_id === this.receiver?.id
                && event.detail.value.includes(this.searchKeyword.trim())) {
                this.messages.unshift(sentMessage);
            }
            this.$dispatch('update-last-private-message-sent', sentMessage);
            if (this.isLastMessageShown === true) {
                this.scrollToLastMessage();
            }
        },
        /**
         * Laravel Echo event listener when sent messages is marked as read.
         */
        onSentMessagesMarkedAsRead(event) {
            if (this.receiver?.id === event.detail.receiver.id) {
                event.detail.messages.forEach((value) => {
                    const sameMessage = this
                        .messages
                        .find(({ id }) => id === value.id);
                    if (sameMessage !== undefined) {
                        sameMessage.setReadAtTime(value.read_at);
                    }
                });
            }
        },
        /**
         * Laravel Echo event listener when received messages is marked as read.
         */
        onReceivedMessagesMarkedAsRead(event) {
            this.$dispatch('update-unread-messages', event.detail);
        },
        /**
         * Laravel Echo event listener when someone in the contact list types a message.
         */
        onContactCurrentlyTyping(event) {
            if (event.detail.contact.id === userId) {
                return;
            }
            this.setStatusToTyping(event.detail.contact.id, 1500);
            if (this.isLastMessageShown === true) {
                this.scrollToLastMessage();
            }
        },
        /**
         * Register Laravel Echo event listeners.
         */
        registerEchoEventListeners() {
            window.Echo.join(`basement.contacts.${userId}`)
                .listen('.basement.message.received', this.onMessageReceived.bind(this))
                .listen('.basement.message.sent', this.onMessageSent.bind(this))
                .listen('.basement.message.sent-messages-marked-as-read', this.onSentMessagesMarkedAsRead.bind(this))
                .listen('.basement.message.received-messages-marked-as-read', this.onReceivedMessagesMarkedAsRead.bind(this))
                .listen('.basement.contact.currently-typing', this.onContactCurrentlyTyping.bind(this));
        },
        /**
         * Set the status of the given contact to typing for till specified time in ms
         */
        setStatusToTyping(contactId, ms) {
            if (typingsTimeout.has(contactId)) {
                clearTimeout(typingsTimeout.get(contactId));
            }
            else {
                this.$dispatch('update-currently-typing-contact', {
                    contact: {
                        id: contactId,
                        typing: true,
                    },
                });
            }
            typingsTimeout.set(contactId, setTimeout(() => {
                this.$dispatch('update-currently-typing-contact', {
                    contact: {
                        id: contactId,
                        typing: false,
                    },
                });
                typingsTimeout.delete(contactId);
            }, ms));
        },
        /**
         * Set the status of the given contact to not typing.
         */
        setStatusToNotTyping(contactId) {
            if (typingsTimeout.has(contactId)) {
                clearTimeout(typingsTimeout.get(contactId));
                typingsTimeout.delete(contactId);
            }
            this.$dispatch('update-currently-typing-contact', {
                contact: {
                    id: contactId,
                    typing: false,
                },
            });
        },
        /**
         * Scroll component view to given message id.
         */
        scrollTo(id, options = {}) {
            if (id === null) {
                return;
            }
            void this.$nextTick(() => {
                document.querySelector(`.basement-private-messages__message-value[data-id="${id}"]`)?.scrollIntoView(options);
            });
        },
        /**
         * Scroll component view to the last message.
         */
        scrollToLastMessage() {
            const lastMessage = this.messages.at(0);
            this.scrollTo(lastMessage?.id ?? null, {
                behavior: 'smooth',
            });
        },
        /**
         * Action when a given message is visible.
         */
        seeMessage(message) {
            if (this.receiver === null
                || message.receiverId === this.receiver.id
                || message.readAt.date !== null) {
                return;
            }
            this.seenMessages.push(message.id);
        },
        /**
         * Send a new message.
         */
        async sendNewMessage() {
            if (this.receiver === null) {
                throw new Error('Receiver cannot be empty');
            }
            this.isLoadingSentMessage = true;
            await window.axios
                .post(this.url, { value: this.newMessageValue })
                .then(({ data }) => data);
            this.newMessageValue = '';
            this.isLoadingSentMessage = false;
        },
        /**
         * Add unread messages marker to the component.
         */
        setUnreadMessagesMarker() {
            this.messages.some((message) => {
                if (message.readAt.date !== null) {
                    return true;
                }
                if (message.senderId === this.receiver?.id) {
                    this.unreadMessageCursor = message.id;
                }
                return false;
            });
        },
        /**
         * HTML DOM event listener to update the current receiver.
         */
        updateReceiver(event) {
            this.unreadMessageCursor = null;
            this.searchKeyword = '';
            this.receiver = event.detail;
            this.url = this.urlTemplate.replace(':contact', String(event.detail.id));
            this.urlCurrentlyTyping = this.urlCurrentlyTypingTemplate.replace(':contact', String(event.detail.id));
            void this.mount();
        },
        /**
         * Watch when the messages changes.
         */
        watchMessages() {
            if (this.searchKeyword.trim() === '') {
                highlighter.unmark();
            }
            else {
                highlighter.mark(this.searchKeyword.trim());
            }
            this.observeLastMessage();
        },
    };
};

var basement = (alpine) => {
    alpine.data('basementChatBox', chatBoxComponent);
    alpine.data('basementContact', contactComponent);
    alpine.data('basementPrivateChat', privateMessageComponent);
};

module.exports = basement;
//# sourceMappingURL=basement.plugin.common.js.map
