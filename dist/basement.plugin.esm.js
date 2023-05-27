var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$m =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$t = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$s = fails$t;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$s(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var fails$r = fails$t;

var functionBindNative = !fails$r(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$4 = functionBindNative;

var call$d = Function.prototype.call;

var functionCall = NATIVE_BIND$4 ? call$d.bind(call$d) : function () {
  return call$d.apply(call$d, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$3(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$5 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$3 = functionBindNative;

var FunctionPrototype$3 = Function.prototype;
var call$c = FunctionPrototype$3.call;
var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$3.bind.bind(call$c, call$c);

var functionUncurryThisRaw = function (fn) {
  return NATIVE_BIND$3 ? uncurryThisWithBind(fn) : function () {
    return call$c.apply(fn, arguments);
  };
};

var uncurryThisRaw$1 = functionUncurryThisRaw;

var toString$c = uncurryThisRaw$1({}.toString);
var stringSlice$4 = uncurryThisRaw$1(''.slice);

var classofRaw$2 = function (it) {
  return stringSlice$4(toString$c(it), 8, -1);
};

var classofRaw$1 = classofRaw$2;
var uncurryThisRaw = functionUncurryThisRaw;

var functionUncurryThis = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw$1(fn) === 'Function') return uncurryThisRaw(fn);
};

var uncurryThis$s = functionUncurryThis;
var fails$q = fails$t;
var classof$b = classofRaw$2;

var $Object$4 = Object;
var split = uncurryThis$s(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$q(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$b(it) == 'String' ? split(it, '') : $Object$4(it);
} : $Object$4;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$7 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$6 = isNullOrUndefined$7;

var $TypeError$g = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$8 = function (it) {
  if (isNullOrUndefined$6(it)) throw $TypeError$g("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$3 = indexedObject;
var requireObjectCoercible$7 = requireObjectCoercible$8;

var toIndexedObject$7 = function (it) {
  return IndexedObject$3(requireObjectCoercible$7(it));
};

var documentAll$2 = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA: IS_HTMLDDA
};

var $documentAll$1 = documentAll_1;

var documentAll$1 = $documentAll$1.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$l = $documentAll$1.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll$1;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$k = isCallable$l;
var $documentAll = documentAll_1;

var documentAll = $documentAll.all;

var isObject$e = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable$k(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable$k(it);
};

var global$l = global$m;
var isCallable$j = isCallable$l;

var aFunction = function (argument) {
  return isCallable$j(argument) ? argument : undefined;
};

var getBuiltIn$7 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$l[namespace]) : global$l[namespace] && global$l[namespace][method];
};

var uncurryThis$r = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$r({}.isPrototypeOf);

var getBuiltIn$6 = getBuiltIn$7;

var engineUserAgent = getBuiltIn$6('navigator', 'userAgent') || '';

var global$k = global$m;
var userAgent$1 = engineUserAgent;

var process$1 = global$k.process;
var Deno = global$k.Deno;
var versions = process$1 && process$1.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match$1, version;

if (v8) {
  match$1 = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match$1[0] > 0 && match$1[0] < 4 ? 1 : +(match$1[0] + match$1[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent$1) {
  match$1 = userAgent$1.match(/Edge\/(\d+)/);
  if (!match$1 || match$1[1] >= 74) {
    match$1 = userAgent$1.match(/Chrome\/(\d+)/);
    if (match$1) version = +match$1[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION$1 = engineV8Version;
var fails$p = fails$t;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$p(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$5 = getBuiltIn$7;
var isCallable$i = isCallable$l;
var isPrototypeOf$4 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$5('Symbol');
  return isCallable$i($Symbol) && isPrototypeOf$4($Symbol.prototype, $Object$3(it));
};

var $String$3 = String;

var tryToString$4 = function (argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$h = isCallable$l;
var tryToString$3 = tryToString$4;

var $TypeError$f = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$5 = function (argument) {
  if (isCallable$h(argument)) return argument;
  throw $TypeError$f(tryToString$3(argument) + ' is not a function');
};

var aCallable$4 = aCallable$5;
var isNullOrUndefined$5 = isNullOrUndefined$7;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$5 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$5(func) ? undefined : aCallable$4(func);
};

var call$b = functionCall;
var isCallable$g = isCallable$l;
var isObject$d = isObject$e;

var $TypeError$e = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$g(fn = input.toString) && !isObject$d(val = call$b(fn, input))) return val;
  if (isCallable$g(fn = input.valueOf) && !isObject$d(val = call$b(fn, input))) return val;
  if (pref !== 'string' && isCallable$g(fn = input.toString) && !isObject$d(val = call$b(fn, input))) return val;
  throw $TypeError$e("Can't convert object to primitive value");
};

var sharedExports = {};
var shared$4 = {
  get exports(){ return sharedExports; },
  set exports(v){ sharedExports = v; },
};

var global$j = global$m;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$9 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$9(global$j, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$j[key] = value;
  } return value;
};

var global$i = global$m;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$i[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.25.5',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.25.5/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var requireObjectCoercible$6 = requireObjectCoercible$8;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$9 = function (argument) {
  return $Object$2(requireObjectCoercible$6(argument));
};

var uncurryThis$q = functionUncurryThis;
var toObject$8 = toObject$9;

var hasOwnProperty$1 = uncurryThis$q({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty$1(toObject$8(it), key);
};

var uncurryThis$p = functionUncurryThis;

var id$1 = 0;
var postfix = Math.random();
var toString$b = uncurryThis$p(1.0.toString);

var uid$3 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$b(++id$1 + postfix, 36);
};

var global$h = global$m;
var shared$3 = sharedExports;
var hasOwn$c = hasOwnProperty_1;
var uid$2 = uid$3;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$3('wks');
var Symbol$1 = global$h.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

var wellKnownSymbol$i = function (name) {
  if (!hasOwn$c(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$c(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var call$a = functionCall;
var isObject$c = isObject$e;
var isSymbol$2 = isSymbol$3;
var getMethod$4 = getMethod$5;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$h = wellKnownSymbol$i;

var $TypeError$d = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$h('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$2 = function (input, pref) {
  if (!isObject$c(input) || isSymbol$2(input)) return input;
  var exoticToPrim = getMethod$4(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$a(exoticToPrim, input, pref);
    if (!isObject$c(result) || isSymbol$2(result)) return result;
    throw $TypeError$d("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive$1 = toPrimitive$2;
var isSymbol$1 = isSymbol$3;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$3 = function (argument) {
  var key = toPrimitive$1(argument, 'string');
  return isSymbol$1(key) ? key : key + '';
};

var global$g = global$m;
var isObject$b = isObject$e;

var document$1 = global$g.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$b(document$1) && isObject$b(document$1.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$f = descriptors;
var fails$o = fails$t;
var createElement = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$f && !fails$o(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$e = descriptors;
var call$9 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$4 = createPropertyDescriptor$5;
var toIndexedObject$6 = toIndexedObject$7;
var toPropertyKey$2 = toPropertyKey$3;
var hasOwn$b = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$e ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$6(O);
  P = toPropertyKey$2(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$b(O, P)) return createPropertyDescriptor$4(!call$9(propertyIsEnumerableModule.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$d = descriptors;
var fails$n = fails$t;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$d && fails$n(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var isObject$a = isObject$e;

var $String$2 = String;
var $TypeError$c = TypeError;

// `Assert: Type(argument) is Object`
var anObject$d = function (argument) {
  if (isObject$a(argument)) return argument;
  throw $TypeError$c($String$2(argument) + ' is not an object');
};

var DESCRIPTORS$c = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$c = anObject$d;
var toPropertyKey$1 = toPropertyKey$3;

var $TypeError$b = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$c ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$c(O);
  P = toPropertyKey$1(P);
  anObject$c(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$c(O);
  P = toPropertyKey$1(P);
  anObject$c(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$b('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$b = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var createPropertyDescriptor$3 = createPropertyDescriptor$5;

var createNonEnumerableProperty$8 = DESCRIPTORS$b ? function (object, key, value) {
  return definePropertyModule$5.f(object, key, createPropertyDescriptor$3(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltInExports = {};
var makeBuiltIn$2 = {
  get exports(){ return makeBuiltInExports; },
  set exports(v){ makeBuiltInExports = v; },
};

var DESCRIPTORS$a = descriptors;
var hasOwn$a = hasOwnProperty_1;

var FunctionPrototype$2 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$a && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$a(FunctionPrototype$2, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$a || (DESCRIPTORS$a && getDescriptor(FunctionPrototype$2, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$o = functionUncurryThis;
var isCallable$f = isCallable$l;
var store$1 = sharedStore;

var functionToString$1 = uncurryThis$o(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$f(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString$1(it);
  };
}

var inspectSource$2 = store$1.inspectSource;

var global$f = global$m;
var isCallable$e = isCallable$l;

var WeakMap$1 = global$f.WeakMap;

var weakMapBasicDetection = isCallable$e(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$2 = sharedExports;
var uid$1 = uid$3;

var keys$1 = shared$2('keys');

var sharedKey$3 = function (key) {
  return keys$1[key] || (keys$1[key] = uid$1(key));
};

var hiddenKeys$5 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$e = global$m;
var isObject$9 = isObject$e;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;
var hasOwn$9 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$4 = hiddenKeys$5;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$2 = global$e.TypeError;
var WeakMap = global$e.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$9(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$4[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$9(it, STATE)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$7(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$9(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$9(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var fails$m = fails$t;
var isCallable$d = isCallable$l;
var hasOwn$8 = hasOwnProperty_1;
var DESCRIPTORS$9 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource$1 = inspectSource$2;
var InternalStateModule$3 = internalState;

var enforceInternalState = InternalStateModule$3.enforce;
var getInternalState$3 = InternalStateModule$3.get;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$8 = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS$9 && !fails$m(function () {
  return defineProperty$8(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$8(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
    if (DESCRIPTORS$9) defineProperty$8(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$8(options, 'arity') && value.length !== options.arity) {
    defineProperty$8(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$8(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$9) defineProperty$8(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$8(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$d(this) && getInternalState$3(this).source || inspectSource$1(this);
}, 'toString');

var isCallable$c = isCallable$l;
var definePropertyModule$4 = objectDefineProperty;
var makeBuiltIn = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$9 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$c(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$4.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$1 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$1 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$7 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$6 = toIntegerOrInfinity$7;

var max$4 = Math.max;
var min$4 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$3 = function (index, length) {
  var integer = toIntegerOrInfinity$6(index);
  return integer < 0 ? max$4(integer + length, 0) : min$4(integer, length);
};

var toIntegerOrInfinity$5 = toIntegerOrInfinity$7;

var min$3 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$2 = function (argument) {
  return argument > 0 ? min$3(toIntegerOrInfinity$5(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$1 = toLength$2;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$9 = function (obj) {
  return toLength$1(obj.length);
};

var toIndexedObject$5 = toIndexedObject$7;
var toAbsoluteIndex$2 = toAbsoluteIndex$3;
var lengthOfArrayLike$8 = lengthOfArrayLike$9;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$4 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$5($this);
    var length = lengthOfArrayLike$8(O);
    var index = toAbsoluteIndex$2(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$4(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$4(false)
};

var uncurryThis$n = functionUncurryThis;
var hasOwn$7 = hasOwnProperty_1;
var toIndexedObject$4 = toIndexedObject$7;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$3 = hiddenKeys$5;

var push$2 = uncurryThis$n([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$4(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$7(hiddenKeys$3, key) && hasOwn$7(O, key) && push$2(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$7(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$2(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$2);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$4 = getBuiltIn$7;
var uncurryThis$m = functionUncurryThis;
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$b = anObject$d;

var concat$2 = uncurryThis$m([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$2 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule$1.f(anObject$b(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$6 = hasOwnProperty_1;
var ownKeys$1 = ownKeys$2;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$3 = objectDefineProperty;

var copyConstructorProperties$2 = function (target, source, exceptions) {
  var keys = ownKeys$1(source);
  var defineProperty = definePropertyModule$3.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$6(target, key) && !(exceptions && hasOwn$6(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$l = fails$t;
var isCallable$b = isCallable$l;

var replacement = /#|\.prototype\./;

var isForced$3 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$b(detection) ? fails$l(detection)
    : !!detection;
};

var normalize = isForced$3.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$3.data = {};
var NATIVE = isForced$3.NATIVE = 'N';
var POLYFILL = isForced$3.POLYFILL = 'P';

var isForced_1 = isForced$3;

var global$d = global$m;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
var defineBuiltIn$8 = defineBuiltIn$9;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties$1 = copyConstructorProperties$2;
var isForced$2 = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$d;
  } else if (STATIC) {
    target = global$d[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$d[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor$2(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties$1(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$6(sourceProperty, 'sham', true);
    }
    defineBuiltIn$8(target, key, sourceProperty, options);
  }
};

var uncurryThis$l = functionUncurryThis;

var arraySlice$4 = uncurryThis$l([].slice);

var uncurryThis$k = functionUncurryThis;
var aCallable$3 = aCallable$5;
var isObject$8 = isObject$e;
var hasOwn$5 = hasOwnProperty_1;
var arraySlice$3 = arraySlice$4;
var NATIVE_BIND$2 = functionBindNative;

var $Function = Function;
var concat$1 = uncurryThis$k([].concat);
var join = uncurryThis$k([].join);
var factories = {};

var construct$1 = function (C, argsLength, args) {
  if (!hasOwn$5(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
var functionBind = NATIVE_BIND$2 ? $Function.bind : function bind(that /* , ...args */) {
  var F = aCallable$3(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice$3(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat$1(partArgs, arraySlice$3(arguments));
    return this instanceof boundFunction ? construct$1(F, args.length, args) : F.apply(that, args);
  };
  if (isObject$8(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};

// TODO: Remove from `core-js@4`
var $$o = _export;
var bind$4 = functionBind;

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$$o({ target: 'Function', proto: true, forced: Function.bind !== bind$4 }, {
  bind: bind$4
});

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

var max$3 = Math.max;
var min$2 = Math.min;
var round = Math.round;

function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
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

function within(min, value, max) {
  return max$3(min, min$2(value, max));
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

  if (process.env.NODE_ENV !== "production") {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

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

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
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
  }) : {
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

  if (process.env.NODE_ENV !== "production") {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

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
  var width = max$3(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max$3(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += max$3(html.clientWidth, body ? body.clientWidth : 0) - width;
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
    accRect.top = max$3(rect.top, accRect.top);
    accRect.right = min$2(rect.right, accRect.right);
    accRect.bottom = min$2(rect.bottom, accRect.bottom);
    accRect.left = max$3(rect.left, accRect.left);
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

    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
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
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
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
    var preventedOffset = within(tether ? min$2(min, tetherMin) : min, offset, tether ? max$3(max, tetherMax) : max);
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

function format$2(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(format$2(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(format$2(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format$2(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(format$2(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error(format$2(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format$2(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format$2(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format$2(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
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

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
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
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (process.env.NODE_ENV !== "production") {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);

          if (getBasePlacement$1(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = getComputedStyle(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

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
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }

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
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (process.env.NODE_ENV !== "production") {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

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
      if (process.env.NODE_ENV !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }

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
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

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

var chatBoxComponent = (function () {
  return {
    isMinimized: true,
    isContactOpened: true,
    isMessageBoxOpened: false,
    isNotificationAllowed: window.localStorage.getItem('basement.notification') === NotificationStatus$1.Allowed,
    hasNotificationPermission: Push.Permission.has(),
    online: true,
    totalUnreadMessages: 0,
    /**
     * Hook during the initialization phase of the current Alpine component.
     */init: function init() {
      var _this = this;
      void window.axios.get('/sanctum/csrf-cookie');
      window.addEventListener('online', function () {
        _this.online = true;
      });
      window.addEventListener('offline', function () {
        _this.online = false;
      });
      this.$watch('isNotificationAllowed', this.watchNotificationStatus.bind(this));
      this.$el.addEventListener('send-push-notification', this.sendPushNotification.bind(this));
      this.registerTippy();
    },
    /**
     * Request push notification permission to the browser.
     */requestNotificationPermission: function requestNotificationPermission() {
      var _this2 = this;
      Push.Permission.request(function () {
        _this2.isNotificationAllowed = true;
        _this2.hasNotificationPermission = true;
      }, function () {
        _this2.hasNotificationPermission = false;
      });
    },
    /**
     * Send push notification permission to the browser if allowed.
     */sendPushNotification: function sendPushNotification(event) {
      if (this.isNotificationAllowed === false) {
        return;
      }
      void Push.create(event.detail.title, {
        body: event.detail.body,
        icon: event.detail.icon,
        timeout: 4000,
        onClick: function onClick() {
          window.focus();
          this.close();
        }
      });
    },
    /**
     * Register tippy.js instance creation for child elements.
     */registerTippy: function registerTippy() {
      delegate(this.$el, {
        animation: 'fade',
        arrow: true,
        target: '.basement [data-title]',
        onShow: function onShow(instance) {
          var title = instance.reference.getAttribute('data-title');
          if (title !== null) {
            instance.setContent(title);
          }
        }
      });
    },
    /**
     * Watch when the notification status changes.
     */watchNotificationStatus: function watchNotificationStatus(newValue) {
      var status = newValue === true ? NotificationStatus$1.Allowed : NotificationStatus$1.Muted;
      window.localStorage.setItem('basement.notification', status);
    }
  };
});

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var uncurryThis$j = functionUncurryThis;
var aCallable$2 = aCallable$5;
var NATIVE_BIND$1 = functionBindNative;

var bind$3 = uncurryThis$j(uncurryThis$j.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$2(fn);
  return that === undefined ? fn : NATIVE_BIND$1 ? bind$3(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var classof$a = classofRaw$2;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$3 = Array.isArray || function isArray(argument) {
  return classof$a(argument) == 'Array';
};

var wellKnownSymbol$g = wellKnownSymbol$i;

var TO_STRING_TAG$3 = wellKnownSymbol$g('toStringTag');
var test$1 = {};

test$1[TO_STRING_TAG$3] = 'z';

var toStringTagSupport = String(test$1) === '[object z]';

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$a = isCallable$l;
var classofRaw = classofRaw$2;
var wellKnownSymbol$f = wellKnownSymbol$i;

var TO_STRING_TAG$2 = wellKnownSymbol$f('toStringTag');
var $Object$1 = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$9 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$2)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$a(O.callee) ? 'Arguments' : result;
};

var uncurryThis$i = functionUncurryThis;
var fails$k = fails$t;
var isCallable$9 = isCallable$l;
var classof$8 = classof$9;
var getBuiltIn$3 = getBuiltIn$7;
var inspectSource = inspectSource$2;

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn$3('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$1 = uncurryThis$i(constructorRegExp.exec);
var INCORRECT_TO_STRING$1 = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$9(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$9(argument)) return false;
  switch (classof$8(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING$1 || !!exec$1(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$1 = !construct || fails$k(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isArray$2 = isArray$3;
var isConstructor = isConstructor$1;
var isObject$7 = isObject$e;
var wellKnownSymbol$e = wellKnownSymbol$i;

var SPECIES$3 = wellKnownSymbol$e('species');
var $Array$1 = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$2(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array$1 || isArray$2(C.prototype))) C = undefined;
    else if (isObject$7(C)) {
      C = C[SPECIES$3];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array$1 : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$2 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var bind$2 = functionBindContext;
var uncurryThis$h = functionUncurryThis;
var IndexedObject$2 = indexedObject;
var toObject$7 = toObject$9;
var lengthOfArrayLike$7 = lengthOfArrayLike$9;
var arraySpeciesCreate$1 = arraySpeciesCreate$2;

var push$1 = uncurryThis$h([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod$3 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$7($this);
    var self = IndexedObject$2(O);
    var boundFunction = bind$2(callbackfn, that);
    var length = lengthOfArrayLike$7(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate$1;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push$1(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push$1(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$3(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$3(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$3(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$3(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$3(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$3(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$3(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$3(7)
};

var fails$j = fails$t;
var wellKnownSymbol$d = wellKnownSymbol$i;
var V8_VERSION = engineV8Version;

var SPECIES$2 = wellKnownSymbol$d('species');

var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails$j(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$2] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$n = _export;
var $map = arrayIteration.map;
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$$n({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var classof$7 = classof$9;

var $String$1 = String;

var toString$a = function (argument) {
  if (classof$7(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String$1(argument);
};

var anObject$a = anObject$d;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$a(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

var fails$i = fails$t;
var global$c = global$m;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$c.RegExp;

var UNSUPPORTED_Y$1 = fails$i(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$i(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$i(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1
};

var objectDefineProperties = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$1 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$8 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$2 = objectDefineProperty;
var anObject$9 = anObject$d;
var toIndexedObject$3 = toIndexedObject$7;
var objectKeys = objectKeys$1;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$8 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$9(O);
  var props = toIndexedObject$3(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$2 = getBuiltIn$7;

var html$1 = getBuiltIn$2('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */

var anObject$8 = anObject$d;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys$1 = hiddenKeys$5;
var html = html$1;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$1 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$1('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys$1[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$8(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var fails$h = fails$t;
var global$b = global$m;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$b.RegExp;

var regexpUnsupportedDotAll = fails$h(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$g = fails$t;
var global$a = global$m;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$a.RegExp;

var regexpUnsupportedNcg = fails$g(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$8 = functionCall;
var uncurryThis$g = functionUncurryThis;
var toString$9 = toString$a;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = sharedExports;
var create$4 = objectCreate;
var getInternalState$2 = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$5 = uncurryThis$g(''.charAt);
var indexOf = uncurryThis$g(''.indexOf);
var replace$3 = uncurryThis$g(''.replace);
var stringSlice$3 = uncurryThis$g(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$8(nativeExec, re1, 'a');
  call$8(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState$2(re);
    var str = toString$9(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$8(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$8(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$3(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$3(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$5(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call$8(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$3(match.input, charsAdded);
        match[0] = stringSlice$3(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call$8(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create$4(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $$m = _export;
var exec = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$m({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var uncurryThis$f = functionUncurryThis;
var defineBuiltIn$7 = defineBuiltIn$9;
var regexpExec$1 = regexpExec$2;
var fails$f = fails$t;
var wellKnownSymbol$c = wellKnownSymbol$i;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;

var SPECIES$1 = wellKnownSymbol$c('species');
var RegExpPrototype = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$c(KEY);

  var DELEGATES_TO_SYMBOL = !fails$f(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$f(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$1] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis$f(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$f(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn$7(String.prototype, KEY, methods[0]);
    defineBuiltIn$7(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty$5(RegExpPrototype[SYMBOL], 'sham', true);
};

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
var sameValue$1 = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

var call$7 = functionCall;
var anObject$7 = anObject$d;
var isCallable$8 = isCallable$l;
var classof$6 = classofRaw$2;
var regexpExec = regexpExec$2;

var $TypeError$a = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$8(exec)) {
    var result = call$7(exec, R, S);
    if (result !== null) anObject$7(result);
    return result;
  }
  if (classof$6(R) === 'RegExp') return call$7(regexpExec, R, S);
  throw $TypeError$a('RegExp#exec called on incompatible receiver');
};

var call$6 = functionCall;
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var anObject$6 = anObject$d;
var isNullOrUndefined$4 = isNullOrUndefined$7;
var requireObjectCoercible$5 = requireObjectCoercible$8;
var sameValue = sameValue$1;
var toString$8 = toString$a;
var getMethod$3 = getMethod$5;
var regExpExec$2 = regexpExecAbstract;

// @@search logic
fixRegExpWellKnownSymbolLogic$1('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible$5(this);
      var searcher = isNullOrUndefined$4(regexp) ? undefined : getMethod$3(regexp, SEARCH);
      return searcher ? call$6(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$8(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject$6(this);
      var S = toString$8(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec$2(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var $$l = _export;
var $filter = arrayIteration.filter;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$$l({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$5 = classof$9;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof$5(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var defineBuiltIn$6 = defineBuiltIn$9;
var toString$7 = objectToString;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn$6(Object.prototype, 'toString', toString$7, { unsafe: true });
}

var DESCRIPTORS$7 = descriptors;
var FUNCTION_NAME_EXISTS = functionName.EXISTS;
var uncurryThis$e = functionUncurryThis;
var defineProperty$7 = objectDefineProperty.f;

var FunctionPrototype$1 = Function.prototype;
var functionToString = uncurryThis$e(FunctionPrototype$1.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec$1 = uncurryThis$e(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS$7 && !FUNCTION_NAME_EXISTS) {
  defineProperty$7(FunctionPrototype$1, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec$1(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}

var wellKnownSymbol$b = wellKnownSymbol$i;
var create$3 = objectCreate;
var defineProperty$6 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$b('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  defineProperty$6(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$3(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$5 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var $$k = _export;
var $includes = arrayIncludes.includes;
var fails$e = fails$t;
var addToUnscopables$4 = addToUnscopables$5;

// FF99+ bug
var BROKEN_ON_SPARSE = fails$e(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$$k({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$4('includes');

var isObject$6 = isObject$e;
var classof$4 = classofRaw$2;
var wellKnownSymbol$a = wellKnownSymbol$i;

var MATCH$1 = wellKnownSymbol$a('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$6(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$4(it) == 'RegExp');
};

var isRegExp = isRegexp;

var $TypeError$9 = TypeError;

var notARegexp = function (it) {
  if (isRegExp(it)) {
    throw $TypeError$9("The method doesn't accept regular expressions");
  } return it;
};

var wellKnownSymbol$9 = wellKnownSymbol$i;

var MATCH = wellKnownSymbol$9('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};

var $$j = _export;
var uncurryThis$d = functionUncurryThis;
var notARegExp = notARegexp;
var requireObjectCoercible$4 = requireObjectCoercible$8;
var toString$6 = toString$a;
var correctIsRegExpLogic = correctIsRegexpLogic;

var stringIndexOf$1 = uncurryThis$d(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$$j({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf$1(
      toString$6(requireObjectCoercible$4(this)),
      toString$6(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});

var $$i = _export;
var $findIndex = arrayIteration.findIndex;
var addToUnscopables$3 = addToUnscopables$5;

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES$1 = true;

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES$1 = false; });

// `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex
$$i({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$3(FIND_INDEX);

var $$h = _export;
var toObject$6 = toObject$9;
var lengthOfArrayLike$6 = lengthOfArrayLike$9;
var toIntegerOrInfinity$4 = toIntegerOrInfinity$7;
var addToUnscopables$2 = addToUnscopables$5;

// `Array.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$$h({ target: 'Array', proto: true }, {
  at: function at(index) {
    var O = toObject$6(this);
    var len = lengthOfArrayLike$6(O);
    var relativeIndex = toIntegerOrInfinity$4(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : O[k];
  }
});

addToUnscopables$2('at');

var $$g = _export;
var uncurryThis$c = functionUncurryThis;
var requireObjectCoercible$3 = requireObjectCoercible$8;
var toIntegerOrInfinity$3 = toIntegerOrInfinity$7;
var toString$5 = toString$a;
var fails$d = fails$t;

var charAt$4 = uncurryThis$c(''.charAt);

var FORCED$1 = fails$d(function () {
  // eslint-disable-next-line es/no-array-string-prototype-at -- safe
  return '𠮷'.at(-2) !== '\uD842';
});

// `String.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$$g({ target: 'String', proto: true, forced: FORCED$1 }, {
  at: function at(index) {
    var S = toString$5(requireObjectCoercible$3(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity$3(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt$4(S, k);
  }
});

var fails$c = fails$t;

var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$c(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};

var $forEach = arrayIteration.forEach;
var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;

var STRICT_METHOD$3 = arrayMethodIsStrict$3('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
var arrayForEach = !STRICT_METHOD$3 ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

var $$f = _export;
var forEach$1 = arrayForEach;

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$$f({ target: 'Array', proto: true, forced: [].forEach != forEach$1 }, {
  forEach: forEach$1
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

var global$9 = global$m;
var DOMIterables$1 = domIterables;
var DOMTokenListPrototype$1 = domTokenListPrototype;
var forEach = arrayForEach;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;

var handlePrototype$1 = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty$4(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME$1 in DOMIterables$1) {
  if (DOMIterables$1[COLLECTION_NAME$1]) {
    handlePrototype$1(global$9[COLLECTION_NAME$1] && global$9[COLLECTION_NAME$1].prototype);
  }
}

handlePrototype$1(DOMTokenListPrototype$1);

var DESCRIPTORS$6 = descriptors;
var isArray$1 = isArray$3;

var $TypeError$8 = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$6 && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray$1(O) && !getOwnPropertyDescriptor$1(O, 'length').writable) {
    throw $TypeError$8('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};

var $TypeError$7 = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

var doesNotExceedSafeInteger$3 = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError$7('Maximum allowed index exceeded');
  return it;
};

var $$e = _export;
var toObject$5 = toObject$9;
var lengthOfArrayLike$5 = lengthOfArrayLike$9;
var setArrayLength$2 = arraySetLength;
var doesNotExceedSafeInteger$2 = doesNotExceedSafeInteger$3;
var fails$b = fails$t;

var INCORRECT_TO_LENGTH = fails$b(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 and Safari <= 15.4, FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var SILENT_ON_NON_WRITABLE_LENGTH$1 = !function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
}();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$$e({ target: 'Array', proto: true, arity: 1, forced: INCORRECT_TO_LENGTH || SILENT_ON_NON_WRITABLE_LENGTH$1 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject$5(this);
    var len = lengthOfArrayLike$5(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger$2(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength$2(O, len);
    return len;
  }
});

var $$d = _export;
var uncurryThis$b = functionUncurryThis;
var IndexedObject$1 = indexedObject;
var toIndexedObject$2 = toIndexedObject$7;
var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;

var nativeJoin = uncurryThis$b([].join);

var ES3_STRINGS = IndexedObject$1 != Object;
var STRICT_METHOD$2 = arrayMethodIsStrict$2('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$$d({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$2 }, {
  join: function join(separator) {
    return nativeJoin(toIndexedObject$2(this), separator === undefined ? ',' : separator);
  }
});

var toPropertyKey = toPropertyKey$3;
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$5;

var createProperty$2 = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$2(0, value));
  else object[propertyKey] = value;
};

var tryToString$2 = tryToString$4;

var $TypeError$6 = TypeError;

var deletePropertyOrThrow$2 = function (O, P) {
  if (!delete O[P]) throw $TypeError$6('Cannot delete property ' + tryToString$2(P) + ' of ' + tryToString$2(O));
};

var $$c = _export;
var toObject$4 = toObject$9;
var toAbsoluteIndex$1 = toAbsoluteIndex$3;
var toIntegerOrInfinity$2 = toIntegerOrInfinity$7;
var lengthOfArrayLike$4 = lengthOfArrayLike$9;
var setArrayLength$1 = arraySetLength;
var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$3;
var arraySpeciesCreate = arraySpeciesCreate$2;
var createProperty$1 = createProperty$2;
var deletePropertyOrThrow$1 = deletePropertyOrThrow$2;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max$2 = Math.max;
var min$1 = Math.min;

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$$c({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject$4(this);
    var len = lengthOfArrayLike$4(O);
    var actualStart = toAbsoluteIndex$1(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$1(max$2(toIntegerOrInfinity$2(deleteCount), 0), len - actualStart);
    }
    doesNotExceedSafeInteger$1(len + insertCount - actualDeleteCount);
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty$1(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow$1(O, to);
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow$1(O, k - 1);
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow$1(O, to);
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    setArrayLength$1(O, len - actualDeleteCount + insertCount);
    return A;
  }
});

var $$b = _export;
var toObject$3 = toObject$9;
var lengthOfArrayLike$3 = lengthOfArrayLike$9;
var setArrayLength = arraySetLength;
var deletePropertyOrThrow = deletePropertyOrThrow$2;
var doesNotExceedSafeInteger = doesNotExceedSafeInteger$3;

// IE8-
var INCORRECT_RESULT = [].unshift(0) !== 1;

// V8 ~ Chrome < 71 and Safari <= 15.4, FF < 23 throws InternalError
var SILENT_ON_NON_WRITABLE_LENGTH = !function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).unshift();
  } catch (error) {
    return error instanceof TypeError;
  }
}();

// `Array.prototype.unshift` method
// https://tc39.es/ecma262/#sec-array.prototype.unshift
$$b({ target: 'Array', proto: true, arity: 1, forced: INCORRECT_RESULT || SILENT_ON_NON_WRITABLE_LENGTH }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function unshift(item) {
    var O = toObject$3(this);
    var len = lengthOfArrayLike$3(O);
    var argCount = arguments.length;
    if (argCount) {
      doesNotExceedSafeInteger(len + argCount);
      var k = len;
      while (k--) {
        var to = k + argCount;
        if (k in O) O[to] = O[k];
        else deletePropertyOrThrow(O, to);
      }
      for (var j = 0; j < argCount; j++) {
        O[j] = arguments[j];
      }
    } return setArrayLength(O, len + argCount);
  }
});

var aCallable$1 = aCallable$5;
var toObject$2 = toObject$9;
var IndexedObject = indexedObject;
var lengthOfArrayLike$2 = lengthOfArrayLike$9;

var $TypeError$5 = TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$2 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable$1(callbackfn);
    var O = toObject$2(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike$2(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw $TypeError$5('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod$2(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod$2(true)
};

var classof$3 = classofRaw$2;
var global$8 = global$m;

var engineIsNode = classof$3(global$8.process) == 'process';

var $$a = _export;
var $reduce = arrayReduce.left;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
var CHROME_VERSION = engineV8Version;
var IS_NODE = engineIsNode;

var STRICT_METHOD$1 = arrayMethodIsStrict$1('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$$a({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDate;

	var _index = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
	  return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
	}

	module.exports = exports.default;
} (isDate, isDateExports));

var toDateExports$1 = {};
var toDate$2 = {
  get exports(){ return toDateExports$1; },
  set exports(v){ toDateExports$1 = v; },
};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toDate;

	var _index = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
	  var argStr = Object.prototype.toString.call(argument); // Clone the date

	  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
	    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
	    return new Date(argument.getTime());
	  } else if (typeof argument === 'number' || argStr === '[object Number]') {
	    return new Date(argument);
	  } else {
	    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
	      // eslint-disable-next-line no-console
	      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

	      console.warn(new Error().stack);
	    }

	    return new Date(NaN);
	  }
	}

	module.exports = exports.default;
} (toDate$2, toDateExports$1));

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isValid;

	var _index = _interopRequireDefault(isDateExports);

	var _index2 = _interopRequireDefault(toDateExports$1);

	var _index3 = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = addMilliseconds;

	var _index = _interopRequireDefault(toIntegerExports);

	var _index2 = _interopRequireDefault(toDateExports$1);

	var _index3 = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = subMilliseconds;

	var _index = _interopRequireDefault(addMillisecondsExports);

	var _index2 = _interopRequireDefault(requiredArgsExports);

	var _index3 = _interopRequireDefault(toIntegerExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUTCDayOfYear;

	var _index = _interopRequireDefault(toDateExports$1);

	var _index2 = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startOfUTCISOWeek;

	var _index = _interopRequireDefault(toDateExports$1);

	var _index2 = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUTCISOWeekYear;

	var _index = _interopRequireDefault(toDateExports$1);

	var _index2 = _interopRequireDefault(requiredArgsExports);

	var _index3 = _interopRequireDefault(startOfUTCISOWeekExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startOfUTCISOWeekYear;

	var _index = _interopRequireDefault(getUTCISOWeekYearExports);

	var _index2 = _interopRequireDefault(startOfUTCISOWeekExports);

	var _index3 = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUTCISOWeek;

	var _index = _interopRequireDefault(toDateExports$1);

	var _index2 = _interopRequireDefault(startOfUTCISOWeekExports);

	var _index3 = _interopRequireDefault(startOfUTCISOWeekYearExports);

	var _index4 = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MILLISECONDS_IN_WEEK = 604800000;

	function getUTCISOWeek(dirtyDate) {
	  (0, _index4.default)(1, arguments);
	  var date = (0, _index.default)(dirtyDate);
	  var diff = (0, _index2.default)(date).getTime() - (0, _index3.default)(date).getTime(); // Round the number of days to the nearest integer
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startOfUTCWeek;

	var _index = _interopRequireDefault(toDateExports$1);

	var _index2 = _interopRequireDefault(requiredArgsExports);

	var _index3 = _interopRequireDefault(toIntegerExports);

	var _index4 = defaultOptions$1;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startOfUTCWeek(dirtyDate, options) {
	  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;

	  (0, _index2.default)(1, arguments);
	  var defaultOptions = (0, _index4.getDefaultOptions)();
	  var weekStartsOn = (0, _index3.default)((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUTCWeekYear;

	var _index = _interopRequireDefault(toDateExports$1);

	var _index2 = _interopRequireDefault(requiredArgsExports);

	var _index3 = _interopRequireDefault(startOfUTCWeekExports);

	var _index4 = _interopRequireDefault(toIntegerExports);

	var _index5 = defaultOptions$1;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getUTCWeekYear(dirtyDate, options) {
	  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;

	  (0, _index2.default)(1, arguments);
	  var date = (0, _index.default)(dirtyDate);
	  var year = date.getUTCFullYear();
	  var defaultOptions = (0, _index5.getDefaultOptions)();
	  var firstWeekContainsDate = (0, _index4.default)((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startOfUTCWeekYear;

	var _index = _interopRequireDefault(getUTCWeekYearExports);

	var _index2 = _interopRequireDefault(requiredArgsExports);

	var _index3 = _interopRequireDefault(startOfUTCWeekExports);

	var _index4 = _interopRequireDefault(toIntegerExports);

	var _index5 = defaultOptions$1;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUTCWeek;

	var _index = _interopRequireDefault(toDateExports$1);

	var _index2 = _interopRequireDefault(startOfUTCWeekExports);

	var _index3 = _interopRequireDefault(startOfUTCWeekYearExports);

	var _index4 = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MILLISECONDS_IN_WEEK = 604800000;

	function getUTCWeek(dirtyDate, options) {
	  (0, _index4.default)(1, arguments);
	  var date = (0, _index.default)(dirtyDate);
	  var diff = (0, _index2.default)(date, options).getTime() - (0, _index3.default)(date, options).getTime(); // Round the number of days to the nearest integer
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _index = _interopRequireDefault(addLeadingZerosExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	      var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

	      var year = signedYear > 0 ? signedYear : 1 - signedYear;
	      return localize.ordinalNumber(year, {
	        unit: 'year'
	      });
	    }

	    return _index7.default.y(date, token);
	  },
	  // Local week-numbering year
	  Y: function Y(date, token, localize, options) {
	    var signedWeekYear = (0, _index5.default)(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

	    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

	    if (token === 'YY') {
	      var twoDigitYear = weekYear % 100;
	      return (0, _index6.default)(twoDigitYear, 2);
	    } // Ordinal number


	    if (token === 'Yo') {
	      return localize.ordinalNumber(weekYear, {
	        unit: 'year'
	      });
	    } // Padding


	    return (0, _index6.default)(weekYear, token.length);
	  },
	  // ISO week-numbering year
	  R: function R(date, token) {
	    var isoWeekYear = (0, _index3.default)(date); // Padding

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _index = _interopRequireDefault(buildFormatLongFnExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex; // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!

	    return valuesArray[index];
	  };
	}

	module.exports = exports.default;
} (buildLocalizeFn, buildLocalizeFnExports));

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _index = _interopRequireDefault(buildLocalizeFnExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var eraValues = {
	  narrow: ['B', 'A'],
	  abbreviated: ['BC', 'AD'],
	  wide: ['Before Christ', 'Anno Domini']
	};
	var quarterValues = {
	  narrow: ['1', '2', '3', '4'],
	  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
	  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
	}; // Note: in English, the names of days of the week and months are capitalized.
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
	  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _index = _interopRequireDefault(buildMatchFnExports);

	var _index2 = _interopRequireDefault(buildMatchPatternFnExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _index = _interopRequireDefault(formatDistanceExports);

	var _index2 = _interopRequireDefault(formatLongExports);

	var _index3 = _interopRequireDefault(formatRelativeExports);

	var _index4 = _interopRequireDefault(localizeExports);

	var _index5 = _interopRequireDefault(matchExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    weekStartsOn: 0
	    /* Sunday */
	    ,
	    firstWeekContainsDate: 1
	  }
	};
	var _default = locale;
	exports.default = _default;
	module.exports = exports.default;
} (enUS, enUSExports));

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;

	var _index = _interopRequireDefault(enUSExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _default = _index.default;
	exports.default = _default;
	module.exports = exports.default;
} (defaultLocale, defaultLocaleExports));

(function (module, exports) {

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
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
	  var firstWeekContainsDate = (0, _index8.default)((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

	  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
	    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
	  }

	  var weekStartsOn = (0, _index8.default)((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

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
	  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
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

	  if (timezoneString === '') {
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
	 * @param {Date|String|Number} date - the original date
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = cloneObject;

	var _index = _interopRequireDefault(assignExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
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
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

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

var DateFormatter = /*#__PURE__*/function () {
  /**
   * @example December 31, 2022
   */

  /**
   * @example 12/31/22
   */

  /**
   * @example 12:15 PM
   */

  /**
   * @example December 31, 2022 at 12:15 PM
   */

  /**
   * @example Saturday, December 31, 2022 at 12:15 PM
   */

  function DateFormatter(date) {
    _classCallCheck(this, DateFormatter);
    _defineProperty(this, "date", void 0);
    _defineProperty(this, "dateFormat", {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    _defineProperty(this, "shortDateFormat", {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit'
    });
    _defineProperty(this, "timeFormat", {
      hour: 'numeric',
      hour12: true,
      minute: 'numeric'
    });
    _defineProperty(this, "dateTimeFormat", _objectSpread2(_objectSpread2({}, this.dateFormat), this.timeFormat));
    _defineProperty(this, "dayDateTimeFormat", _objectSpread2(_objectSpread2({
      weekday: 'long'
    }, this.dateFormat), this.timeFormat));
    this.date = date;
  }
  _createClass(DateFormatter, [{
    key: "withinDifferenceDateFormat",
    get: function get() {
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
  }, {
    key: "withinDateFormat",
    get: function get() {
      return this.date === null ? '' : intlFormat(this.date, this.dateFormat);
    }
  }, {
    key: "withinTimeFormat",
    get: function get() {
      return this.date === null ? '' : intlFormat(this.date, this.timeFormat);
    }
  }, {
    key: "withinDateTimeFormat",
    get: function get() {
      return this.date === null ? '' : intlFormat(this.date, this.dateTimeFormat);
    }
  }, {
    key: "withinDayDateTimeFormat",
    get: function get() {
      return this.date === null ? '' : intlFormat(this.date, this.dayDateTimeFormat);
    }
  }]);
  return DateFormatter;
}();

var PrivateMessageData = /*#__PURE__*/function () {
  function PrivateMessageData(id, receiverId, senderId, type, value, createdAt, readAt) {
    _classCallCheck(this, PrivateMessageData);
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "receiverId", void 0);
    _defineProperty(this, "senderId", void 0);
    _defineProperty(this, "type", void 0);
    _defineProperty(this, "value", void 0);
    _defineProperty(this, "createdAt", void 0);
    _defineProperty(this, "readAt", void 0);
    this.id = id;
    this.receiverId = receiverId;
    this.senderId = senderId;
    this.type = type;
    this.value = value;
    this.createdAt = createdAt;
    this.readAt = readAt;
  }
  _createClass(PrivateMessageData, [{
    key: "setReadAtTime",
    value: function setReadAtTime(time) {
      this.readAt = new DateFormatter(dateFnsTz.utcToZonedTime(time, PrivateMessageData.timeZone));
    }
  }], [{
    key: "from",
    value: function from(message) {
      return new this(message.id, message.receiver_id, message.sender_id, MessageType$1[{
        DOCUMENT: 'Document',
        TEXT: 'Text'
      }[message.type]], message.value, new DateFormatter(dateFnsTz.utcToZonedTime(message.created_at, PrivateMessageData.timeZone)), new DateFormatter(message.read_at !== null ? dateFnsTz.utcToZonedTime(message.read_at, PrivateMessageData.timeZone) : null));
    }
  }]);
  return PrivateMessageData;
}();
_defineProperty(PrivateMessageData, "timeZone", Intl.DateTimeFormat().resolvedOptions().timeZone);

var ContactData = /*#__PURE__*/function () {
  function ContactData(id, name, avatar, unreadMessages, lastPrivateMessage) {
    var isOnline = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    _classCallCheck(this, ContactData);
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "name", void 0);
    _defineProperty(this, "avatar", void 0);
    _defineProperty(this, "unreadMessages", void 0);
    _defineProperty(this, "lastPrivateMessage", void 0);
    _defineProperty(this, "isOnline", void 0);
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.unreadMessages = unreadMessages;
    this.lastPrivateMessage = lastPrivateMessage;
    this.isOnline = isOnline;
  }
  _createClass(ContactData, null, [{
    key: "from",
    value: function from(contact) {
      return new this(contact.id, contact.name, contact.avatar, contact.unread_messages, contact.last_private_message !== null ? PrivateMessageData.from(contact.last_private_message) : null);
    }
  }]);
  return ContactData;
}();

var contactComponent = (function () {
  var container = document.querySelector('.basement-contacts');
  var url = container.getAttribute('data-url');
  return {
    contacts: [],
    search: '',
    unreadMessages: 0,
    url: url,
    /**
     * Hook during the initialization phase of the current Alpine component.
     */init: function init() {
      this.$watch('contacts', this.watchContacts.bind(this));
      this.$refs.basementChatBox.addEventListener('update-last-private-message', this.updateLastPrivateMessage.bind(this));
    },
    /**
     * Load initial component data.
     */mount: function mount() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return window.axios.get(_this.url).then(function (_ref) {
                  var data = _ref.data;
                  return data;
                });
              case 2:
                response = _context.sent;
                _this.contacts = response.data.map(function (contact) {
                  return ContactData.from(contact);
                });
                _this.registerEchoEventListeners();
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    /**
     * Get contacts filtered by search keywords.
     */
    get filteredContacts() {
      var _this2 = this;
      if (this.search === '') {
        return this.contacts;
      }
      return this.contacts.filter(function (_ref2) {
        var name = _ref2.name;
        return name.toLowerCase().includes(_this2.search.toLowerCase());
      });
    },
    /**
     * Find the same contact with the given id in the current component.
     */findSameContact: function findSameContact(searchId) {
      var sameContactIndex = this.contacts.findIndex(function (_ref3) {
        var id = _ref3.id;
        return id === searchId;
      });
      if (sameContactIndex === -1) {
        return {
          index: null,
          contact: null
        };
      }
      return {
        index: sameContactIndex,
        contact: this.contacts.at(sameContactIndex)
      };
    },
    /**
     * Laravel Echo event listener to see other contacts that are on the current channel.
     */onHere: function onHere(contacts) {
      var _this3 = this;
      contacts.forEach(function (contact) {
        var sameContact = _this3.findSameContact(contact.id).contact;
        if (sameContact !== null) {
          sameContact.isOnline = true;
        }
      });
    },
    /**
     * Laravel Echo event listener when someone joins the channel.
     */onSomeoneJoining: function onSomeoneJoining(contact) {
      var sameContact = this.findSameContact(contact.id).contact;
      if (sameContact !== null) {
        sameContact.isOnline = true;
      } else {
        var newContact = ContactData.from(contact);
        newContact.isOnline = true;
        this.contacts.push(newContact);
      }
    },
    /**
     * Laravel Echo event listener when someone leaves the channel.
     */onSomeoneLeaving: function onSomeoneLeaving(contact) {
      var sameContact = this.findSameContact(contact.id).contact;
      if (sameContact !== null) {
        sameContact.isOnline = false;
      }
    },
    /**
     * Register Laravel Echo event listeners.
     */registerEchoEventListeners: function registerEchoEventListeners() {
      window.Echo.join('basement.contacts').here(this.onHere.bind(this)).joining(this.onSomeoneJoining.bind(this)).leaving(this.onSomeoneLeaving.bind(this));
    },
    /**
     * HTML DOM event listener to update the last private message in the current component.
     */updateLastPrivateMessage: function updateLastPrivateMessage(event) {
      var sameContactIndex = this.findSameContact(event.detail.senderId).index;
      if (sameContactIndex === null) {
        return;
      }
      var sameContact = this.contacts.splice(sameContactIndex, 1).at(0);
      sameContact.lastPrivateMessage = event.detail;
      if (sameContact.id !== event.detail.receiverId) {
        sameContact.unreadMessages += 1;
      }
      this.contacts.unshift(sameContact);
    },
    /**
     * Trigger update receiver event to the chat box component.
     */updateReceiver: function updateReceiver(contact) {
      this.$dispatch('update-receiver', contact);
    },
    /**
     * Watch when the contacts changes.
     */watchContacts: function watchContacts(newValue) {
      this.unreadMessages = newValue.reduce(function (total, contact) {
        return total + contact.unreadMessages;
      }, 0);
    }
  };
});

var isCallable$7 = isCallable$l;

var $String = String;
var $TypeError$4 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$7(argument)) return argument;
  throw $TypeError$4("Can't set " + $String(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$a = functionUncurryThis;
var anObject$5 = anObject$d;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis$a(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$5(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var isCallable$6 = isCallable$l;
var isObject$5 = isObject$e;
var setPrototypeOf$2 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$3 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$2 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$6(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject$5(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$2($this, NewTargetPrototype);
  return $this;
};

var uncurryThis$9 = functionUncurryThis;

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
var thisNumberValue$1 = uncurryThis$9(1.0.valueOf);

// a string of all valid unicode whitespaces
var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var uncurryThis$8 = functionUncurryThis;
var requireObjectCoercible$2 = requireObjectCoercible$8;
var toString$4 = toString$a;
var whitespaces$1 = whitespaces$2;

var replace$2 = uncurryThis$8(''.replace);
var whitespace = '[' + whitespaces$1 + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$1 = function (TYPE) {
  return function ($this) {
    var string = toString$4(requireObjectCoercible$2($this));
    if (TYPE & 1) string = replace$2(string, ltrim, '');
    if (TYPE & 2) string = replace$2(string, rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$1(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$1(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$1(3)
};

var DESCRIPTORS$5 = descriptors;
var global$7 = global$m;
var uncurryThis$7 = functionUncurryThis;
var isForced$1 = isForced_1;
var defineBuiltIn$5 = defineBuiltIn$9;
var hasOwn$4 = hasOwnProperty_1;
var inheritIfRequired$2 = inheritIfRequired$3;
var isPrototypeOf$3 = objectIsPrototypeOf;
var isSymbol = isSymbol$3;
var toPrimitive = toPrimitive$2;
var fails$a = fails$t;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var defineProperty$5 = objectDefineProperty.f;
var thisNumberValue = thisNumberValue$1;
var trim = stringTrim.trim;

var NUMBER = 'Number';
var NativeNumber = global$7[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError$1 = global$7.TypeError;
var arraySlice$2 = uncurryThis$7(''.slice);
var charCodeAt$1 = uncurryThis$7(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError$1('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt$1(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt$1(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt$1(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice$2(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt$1(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced$1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf$3(NumberPrototype, dummy) && fails$a(function () { thisNumberValue(dummy); })
      ? inheritIfRequired$2(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS$5 ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn$4(NativeNumber, key = keys[j]) && !hasOwn$4(NumberWrapper, key)) {
      defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  defineBuiltIn$5(global$7, NUMBER, NumberWrapper, { constructor: true });
}

var NATIVE_BIND = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$3 = FunctionPrototype.apply;
var call$5 = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$5.bind(apply$3) : function () {
  return call$5.apply(apply$3, arguments);
});

var $TypeError$3 = TypeError;

var validateArgumentsLength$1 = function (passed, required) {
  if (passed < required) throw $TypeError$3('Not enough arguments');
  return passed;
};

var global$6 = global$m;
var apply$2 = functionApply;
var isCallable$5 = isCallable$l;
var userAgent = engineUserAgent;
var arraySlice$1 = arraySlice$4;
var validateArgumentsLength = validateArgumentsLength$1;

var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var Function$1 = global$6.Function;

var wrap = function (scheduler) {
  return MSIE ? function (handler, timeout /* , ...arguments */) {
    var boundArgs = validateArgumentsLength(arguments.length, 1) > 2;
    var fn = isCallable$5(handler) ? handler : Function$1(handler);
    var args = boundArgs ? arraySlice$1(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      apply$2(fn, this, args);
    } : fn, timeout);
  } : scheduler;
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
var schedulersFix = {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global$6.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global$6.setInterval)
};

var $$9 = _export;
var global$5 = global$m;
var setInterval$1 = schedulersFix.setInterval;

// ie9- setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
$$9({ global: true, bind: true, forced: global$5.setInterval !== setInterval$1 }, {
  setInterval: setInterval$1
});

var $$8 = _export;
var global$4 = global$m;
var setTimeout$1 = schedulersFix.setTimeout;

// ie9- setTimeout additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
$$8({ global: true, bind: true, forced: global$4.setTimeout !== setTimeout$1 }, {
  setTimeout: setTimeout$1
});

var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
var fails$9 = fails$t;
var whitespaces = whitespaces$2;

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
var stringTrimForced = function (METHOD_NAME) {
  return fails$9(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME$1 && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};

var $$7 = _export;
var $trim = stringTrim.trim;
var forcedStringTrimMethod = stringTrimForced;

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$$7({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

var defineProperty$4 = objectDefineProperty.f;

var proxyAccessor$1 = function (Target, Source, key) {
  key in Target || defineProperty$4(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};

var toString$3 = toString$a;

var normalizeStringArgument$2 = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$3(argument);
};

var isObject$4 = isObject$e;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$8;

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
var installErrorCause$1 = function (O, options) {
  if (isObject$4(options) && 'cause' in options) {
    createNonEnumerableProperty$3(O, 'cause', options.cause);
  }
};

var uncurryThis$6 = functionUncurryThis;

var $Error = Error;
var replace$1 = uncurryThis$6(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

var errorStackClear = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace$1(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};

var fails$8 = fails$t;
var createPropertyDescriptor$1 = createPropertyDescriptor$5;

var errorStackInstallable = !fails$8(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor$1(1, 7));
  return error.stack !== 7;
});

var getBuiltIn$1 = getBuiltIn$7;
var hasOwn$3 = hasOwnProperty_1;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$8;
var isPrototypeOf$2 = objectIsPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var copyConstructorProperties = copyConstructorProperties$2;
var proxyAccessor = proxyAccessor$1;
var inheritIfRequired$1 = inheritIfRequired$3;
var normalizeStringArgument$1 = normalizeStringArgument$2;
var installErrorCause = installErrorCause$1;
var clearErrorStack = errorStackClear;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;
var DESCRIPTORS$4 = descriptors;

var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn$1.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (hasOwn$3(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn$1('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument$1(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty$2(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty$2(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf$2(OriginalErrorPrototype, this)) inheritIfRequired$1(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf$1) setPrototypeOf$1(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS$4 && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty$2(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};

/* eslint-disable no-unused-vars -- required for functions `.length` */

var $$6 = _export;
var global$3 = global$m;
var apply$1 = functionApply;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global$3[WEB_ASSEMBLY];

var FORCED = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $$6({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $$6({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply$1(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply$1(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply$1(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply$1(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply$1(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply$1(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply$1(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply$1(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply$1(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply$1(init, this, arguments); };
});

var DESCRIPTORS$3 = descriptors;
var fails$7 = fails$t;
var anObject$4 = anObject$d;
var create$2 = objectCreate;
var normalizeStringArgument = normalizeStringArgument$2;

var nativeErrorToString = Error.prototype.toString;

var INCORRECT_TO_STRING = fails$7(function () {
  if (DESCRIPTORS$3) {
    // Chrome 32- incorrectly call accessor
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var object = create$2(Object.defineProperty({}, 'name', { get: function () {
      return this === object;
    } }));
    if (nativeErrorToString.call(object) !== 'true') return true;
  }
  // FF10- does not properly handle non-strings
  return nativeErrorToString.call({ message: 1, name: 2 }) !== '2: 1'
    // IE8 does not properly handle defaults
    || nativeErrorToString.call({}) !== 'Error';
});

var errorToString$1 = INCORRECT_TO_STRING ? function toString() {
  var O = anObject$4(this);
  var name = normalizeStringArgument(O.name, 'Error');
  var message = normalizeStringArgument(O.message);
  return !name ? message : !message ? name : name + ': ' + message;
} : nativeErrorToString;

var defineBuiltIn$4 = defineBuiltIn$9;
var errorToString = errorToString$1;

var ErrorPrototype = Error.prototype;

// `Error.prototype.toString` method fix
// https://tc39.es/ecma262/#sec-error.prototype.tostring
if (ErrorPrototype.toString !== errorToString) {
  defineBuiltIn$4(ErrorPrototype, 'toString', errorToString);
}

var iterators = {};

var fails$6 = fails$t;

var correctPrototypeGetter = !fails$6(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$2 = hasOwnProperty_1;
var isCallable$4 = isCallable$l;
var toObject$1 = toObject$9;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject$1(O);
  if (hasOwn$2(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$4(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};

var fails$5 = fails$t;
var isCallable$3 = isCallable$l;
var isObject$3 = isObject$e;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$3 = defineBuiltIn$9;
var wellKnownSymbol$8 = wellKnownSymbol$i;

var ITERATOR$5 = wellKnownSymbol$8('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject$3(IteratorPrototype$2) || fails$5(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$3(IteratorPrototype$2[ITERATOR$5])) {
  defineBuiltIn$3(IteratorPrototype$2, ITERATOR$5, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$3 = objectDefineProperty.f;
var hasOwn$1 = hasOwnProperty_1;
var wellKnownSymbol$7 = wellKnownSymbol$i;

var TO_STRING_TAG$1 = wellKnownSymbol$7('toStringTag');

var setToStringTag$3 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$1(target, TO_STRING_TAG$1)) {
    defineProperty$3(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$1 = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$5;
var setToStringTag$2 = setToStringTag$3;
var Iterators$4 = iterators;

var returnThis$1 = function () { return this; };

var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var $$5 = _export;
var call$4 = functionCall;
var FunctionName = functionName;
var isCallable$2 = isCallable$l;
var createIteratorConstructor = iteratorCreateConstructor;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag$1 = setToStringTag$3;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$8;
var defineBuiltIn$2 = defineBuiltIn$9;
var wellKnownSymbol$6 = wellKnownSymbol$i;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$4 = wellKnownSymbol$6('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$4]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$2(CurrentIteratorPrototype[ITERATOR$4])) {
          defineBuiltIn$2(CurrentIteratorPrototype, ITERATOR$4, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$1(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$4(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn$2(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$5({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
    defineBuiltIn$2(IterablePrototype, ITERATOR$4, defaultIterator, { name: DEFAULT });
  }
  Iterators$3[NAME] = defaultIterator;

  return methods;
};

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
var createIterResultObject$3 = function (value, done) {
  return { value: value, done: done };
};

var toIndexedObject$1 = toIndexedObject$7;
var addToUnscopables$1 = addToUnscopables$5;
var Iterators$2 = iterators;
var InternalStateModule$2 = internalState;
var defineProperty$2 = objectDefineProperty.f;
var defineIterator$2 = iteratorDefine;
var createIterResultObject$2 = createIterResultObject$3;
var DESCRIPTORS$2 = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$2 = InternalStateModule$2.set;
var getInternalState$1 = InternalStateModule$2.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
  setInternalState$2(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject$1(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject$2(undefined, true);
  }
  if (kind == 'keys') return createIterResultObject$2(index, false);
  if (kind == 'values') return createIterResultObject$2(target[index], false);
  return createIterResultObject$2([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators$2.Arguments = Iterators$2.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$1('keys');
addToUnscopables$1('values');
addToUnscopables$1('entries');

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$2 && values.name !== 'values') try {
  defineProperty$2(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

var internalMetadataExports = {};
var internalMetadata = {
  get exports(){ return internalMetadataExports; },
  set exports(v){ internalMetadataExports = v; },
};

var objectGetOwnPropertyNamesExternal = {};

var toAbsoluteIndex = toAbsoluteIndex$3;
var lengthOfArrayLike$1 = lengthOfArrayLike$9;
var createProperty = createProperty$2;

var $Array = Array;
var max$1 = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$1(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array(max$1(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};

/* eslint-disable es/no-object-getownpropertynames -- safe */

var classof$2 = classofRaw$2;
var toIndexedObject = toIndexedObject$7;
var $getOwnPropertyNames = objectGetOwnPropertyNames.f;
var arraySlice = arraySliceSimple;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && classof$2(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails$4 = fails$t;

var arrayBufferNonExtensible = fails$4(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});

var fails$3 = fails$t;
var isObject$2 = isObject$e;
var classof$1 = classofRaw$2;
var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails$3(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
var objectIsExtensible = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject$2(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$1(it) == 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;

var fails$2 = fails$t;

var freezing = !fails$2(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});

var $$4 = _export;
var uncurryThis$5 = functionUncurryThis;
var hiddenKeys = hiddenKeys$5;
var isObject$1 = isObject$e;
var hasOwn = hasOwnProperty_1;
var defineProperty$1 = objectDefineProperty.f;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
var isExtensible = objectIsExtensible;
var uid = uid$3;
var FREEZING = freezing;

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

var setMetadata = function (it) {
  defineProperty$1(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey$1 = function (it, create) {
  // return a primitive with prefix
  if (!isObject$1(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis$5([].splice);
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $$4({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = internalMetadata.exports = {
  enable: enable,
  fastKey: fastKey$1,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;

var wellKnownSymbol$5 = wellKnownSymbol$i;
var Iterators$1 = iterators;

var ITERATOR$3 = wellKnownSymbol$5('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$3] === it);
};

var classof = classof$9;
var getMethod$2 = getMethod$5;
var isNullOrUndefined$3 = isNullOrUndefined$7;
var Iterators = iterators;
var wellKnownSymbol$4 = wellKnownSymbol$i;

var ITERATOR$2 = wellKnownSymbol$4('iterator');

var getIteratorMethod$2 = function (it) {
  if (!isNullOrUndefined$3(it)) return getMethod$2(it, ITERATOR$2)
    || getMethod$2(it, '@@iterator')
    || Iterators[classof(it)];
};

var call$3 = functionCall;
var aCallable = aCallable$5;
var anObject$3 = anObject$d;
var tryToString$1 = tryToString$4;
var getIteratorMethod$1 = getIteratorMethod$2;

var $TypeError$2 = TypeError;

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject$3(call$3(iteratorMethod, argument));
  throw $TypeError$2(tryToString$1(argument) + ' is not iterable');
};

var call$2 = functionCall;
var anObject$2 = anObject$d;
var getMethod$1 = getMethod$5;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$2(iterator);
  try {
    innerResult = getMethod$1(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$2(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$2(innerResult);
  return value;
};

var bind$1 = functionBindContext;
var call$1 = functionCall;
var anObject$1 = anObject$d;
var tryToString = tryToString$4;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var lengthOfArrayLike = lengthOfArrayLike$9;
var isPrototypeOf$1 = objectIsPrototypeOf;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;

var $TypeError$1 = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$2 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$1(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$1(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError$1(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf$1(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$1(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf$1(ResultPrototype, result)) return result;
  } return new Result(false);
};

var isPrototypeOf = objectIsPrototypeOf;

var $TypeError = TypeError;

var anInstance$2 = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw $TypeError('Incorrect invocation');
};

var wellKnownSymbol$3 = wellKnownSymbol$i;

var ITERATOR$1 = wellKnownSymbol$3('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$1] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$1] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var $$3 = _export;
var global$2 = global$m;
var uncurryThis$4 = functionUncurryThis;
var isForced = isForced_1;
var defineBuiltIn$1 = defineBuiltIn$9;
var InternalMetadataModule = internalMetadataExports;
var iterate$1 = iterate$2;
var anInstance$1 = anInstance$2;
var isCallable$1 = isCallable$l;
var isNullOrUndefined$2 = isNullOrUndefined$7;
var isObject = isObject$e;
var fails$1 = fails$t;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var setToStringTag = setToStringTag$3;
var inheritIfRequired = inheritIfRequired$3;

var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global$2[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis$4(NativePrototype[KEY]);
    defineBuiltIn$1(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    !isCallable$1(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$1(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails$1(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails$1(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance$1(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (!isNullOrUndefined$2(iterable)) iterate$1(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $$3({ global: true, constructor: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var defineBuiltIn = defineBuiltIn$9;

var defineBuiltIns$1 = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};

var getBuiltIn = getBuiltIn$7;
var definePropertyModule = objectDefineProperty;
var wellKnownSymbol$2 = wellKnownSymbol$i;
var DESCRIPTORS$1 = descriptors;

var SPECIES = wellKnownSymbol$2('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var defineProperty = objectDefineProperty.f;
var create = objectCreate;
var defineBuiltIns = defineBuiltIns$1;
var bind = functionBindContext;
var anInstance = anInstance$2;
var isNullOrUndefined$1 = isNullOrUndefined$7;
var iterate = iterate$2;
var defineIterator$1 = iteratorDefine;
var createIterResultObject$1 = createIterResultObject$3;
var setSpecies = setSpecies$1;
var DESCRIPTORS = descriptors;
var fastKey = internalMetadataExports.fastKey;
var InternalStateModule$1 = internalState;

var setInternalState$1 = InternalStateModule$1.set;
var internalStateGetterFor = InternalStateModule$1.getterFor;

var collectionStrong$1 = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState$1(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (!isNullOrUndefined$1(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    defineBuiltIns(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    defineBuiltIns(Prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(Prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator$1(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState$1(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return createIterResultObject$1(undefined, true);
      }
      // return step by kind
      if (kind == 'keys') return createIterResultObject$1(entry.key, false);
      if (kind == 'values') return createIterResultObject$1(entry.value, false);
      return createIterResultObject$1([entry.key, entry.value], false);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};

var collection = collection$1;
var collectionStrong = collectionStrong$1;

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

var uncurryThis$3 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$7;
var toString$2 = toString$a;
var requireObjectCoercible$1 = requireObjectCoercible$8;

var charAt$3 = uncurryThis$3(''.charAt);
var charCodeAt = uncurryThis$3(''.charCodeAt);
var stringSlice$2 = uncurryThis$3(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$2(requireObjectCoercible$1($this));
    var position = toIntegerOrInfinity$1(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$3(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice$2(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

var charAt$2 = stringMultibyte.charAt;
var toString$1 = toString$a;
var InternalStateModule = internalState;
var defineIterator = iteratorDefine;
var createIterResultObject = createIterResultObject$3;

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString$1(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt$2(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});

var global$1 = global$m;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty = createNonEnumerableProperty$8;
var wellKnownSymbol$1 = wellKnownSymbol$i;

var ITERATOR = wellKnownSymbol$1('iterator');
var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

var $$2 = _export;
var uncurryThis$2 = functionUncurryThis;
var isArray = isArray$3;

var nativeReverse = uncurryThis$2([].reverse);
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$$2({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray(this)) this.length = this.length;
    return nativeReverse(this);
  }
});

var $$1 = _export;
var $find = arrayIteration.find;
var addToUnscopables = addToUnscopables$5;

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$$1({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);

var $ = _export;
var $some = arrayIteration.some;
var arrayMethodIsStrict = arrayMethodIsStrict$4;

var STRICT_METHOD = arrayMethodIsStrict('some');

// `Array.prototype.some` method
// https://tc39.es/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

var uncurryThis$1 = functionUncurryThis;
var toObject = toObject$9;

var floor = Math.floor;
var charAt = uncurryThis$1(''.charAt);
var replace = uncurryThis$1(''.replace);
var stringSlice$1 = uncurryThis$1(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice$1(str, 0, position);
      case "'": return stringSlice$1(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var apply = functionApply;
var call = functionCall;
var uncurryThis = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var fails = fails$t;
var anObject = anObject$d;
var isCallable = isCallable$l;
var isNullOrUndefined = isNullOrUndefined$7;
var toIntegerOrInfinity = toIntegerOrInfinity$7;
var toLength = toLength$2;
var toString = toString$a;
var requireObjectCoercible = requireObjectCoercible$8;
var advanceStringIndex = advanceStringIndex$1;
var getMethod = getMethod$5;
var getSubstitution = getSubstitution$1;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol = wellKnownSymbol$i;

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

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

var privateMessageComponent = (function () {
  var container = document.querySelector('.basement-private-messages');
  var highlighter = new Mark('.basement-private-messages__message-value');
  var lastMessageObserver;
  var urlTemplate = container.getAttribute('data-url');
  var urlBatchRequest = container.getAttribute('data-batch-request-url');
  var userId = Number(container.getAttribute('data-user-id'));
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
    urlTemplate: urlTemplate,
    urlBatchRequest: urlBatchRequest,
    urlShowMore: null,
    /**
     * Hook during the initialization phase of the current Alpine component.
     */init: function init() {
      this.$refs.basementChatBox.addEventListener('update-receiver', this.updateReceiver.bind(this));
      this.$watch('messages', this.watchMessages.bind(this));
      setInterval(this.markSeenMessagesAsRead.bind(this), 3000);
      this.registerEchoEventListeners();
      lastMessageObserver = new IntersectionObserver(this.lastMessageObserver.bind(this), {
        root: this.$el,
        threshold: [0, 1]
      });
    },
    /**
     * Load initial component data.
     */mount: function mount() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response, _this$unreadMessageCu;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.isLoading = true;
                _context.next = 3;
                return window.axios.get(_this.url, {
                  params: {
                    keyword: _this.searchKeyword.trim()
                  }
                }).then(function (_ref) {
                  var data = _ref.data;
                  return data;
                });
              case 3:
                response = _context.sent;
                _this.urlShowMore = response.links.next;
                _this.messages = response.data.map(function (message) {
                  return PrivateMessageData.from(message);
                });
                _this.isLoading = false;
                if (_this.messages.length > 0) {
                  _this.setUnreadMessagesMarker();
                  _this.scrollTo((_this$unreadMessageCu = _this.unreadMessageCursor) !== null && _this$unreadMessageCu !== void 0 ? _this$unreadMessageCu : _this.messages.at(0).id, {
                    block: 'center'
                  });
                }
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    /**
     * Load more component data.
     */mountMore: function mountMore() {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this2$messages;
        var response, messages, currentCursor;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this2.urlShowMore === null)) {
                  _context2.next = 2;
                  break;
                }
                throw new Error('Next page to load more private messages is not available');
              case 2:
                _this2.isLoadingShowMore = true;
                _context2.next = 5;
                return window.axios.get(_this2.urlShowMore, {
                  params: {
                    keyword: _this2.searchKeyword.trim()
                  }
                }).then(function (_ref2) {
                  var data = _ref2.data;
                  return data;
                });
              case 5:
                response = _context2.sent;
                messages = response.data.map(function (message) {
                  return PrivateMessageData.from(message);
                });
                currentCursor = _this2.messages.at(-1);
                (_this2$messages = _this2.messages).push.apply(_this2$messages, _toConsumableArray(messages));
                _this2.urlShowMore = response.links.next;
                _this2.isLoadingShowMore = false;
                if (currentCursor !== undefined) {
                  _this2.scrollTo(currentCursor.id);
                }
              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    /**
     * Get messages grouped by day of creation.
     */
    get groupedMessages() {
      var messages = new Map();
      _toConsumableArray(this.messages).reverse().forEach(function (message) {
        var date = message.createdAt.withinDateFormat;
        if (messages.has(date) === false) {
          messages.set(date, []);
        }
        messages.get(date).push(message);
      });
      return _toConsumableArray(messages.values());
    },
    /**
     * Action when the last message is hidden or shown.
     */lastMessageObserver: function lastMessageObserver(entries) {
      var _entries$at = entries.at(0),
        intersectionRatio = _entries$at.intersectionRatio;
      if (intersectionRatio > 0.5) {
        this.isLastMessageShown = true;
      } else {
        this.isLastMessageShown = false;
      }
    },
    /**
     * Update messages that have been seen to the database.
     */markSeenMessagesAsRead: function markSeenMessagesAsRead() {
      if (this.seenMessages.length === 0) {
        return;
      }
      if (this.receiver === null) {
        throw new Error('Receiver cannot be empty');
      }
      void window.axios.patch(this.urlBatchRequest, this.seenMessages.map(function (value) {
        return {
          operation: 'mark as read',
          value: {
            id: value
          }
        };
      }));
      this.seenMessages = [];
    },
    /**
     * Assign observer for the last message.
     */observeLastMessage: function observeLastMessage() {
      var lastMessage = this.messages.at(0);
      if (lastMessage === undefined) {
        return;
      }
      void this.$nextTick(function () {
        var lastMessageElement = document.querySelector(".basement-private-messages__message-value[data-id=\"".concat(lastMessage.id, "\"]"));
        lastMessageObserver.disconnect();
        lastMessageObserver.observe(lastMessageElement);
      });
    },
    /**
     * Laravel Echo event listener when a message is received.
     */onMessageReceived: function onMessageReceived(event) {
      var _this$receiver;
      var receivedMessage = PrivateMessageData.from(event.detail);
      if (event.detail.sender_id === ((_this$receiver = this.receiver) === null || _this$receiver === void 0 ? void 0 : _this$receiver.id) && event.detail.value.includes(this.searchKeyword.trim())) {
        this.messages.unshift(receivedMessage);
      }
      this.$dispatch('update-last-private-message', receivedMessage);
      if (userId !== event.detail.sender_id) {
        this.$dispatch('send-push-notification', {
          title: event.detail.sender.name,
          body: event.detail.value,
          icon: event.detail.sender.avatar
        });
      }
      if (this.isLastMessageShown === true) {
        this.scrollToLastMessage();
      }
    },
    /**
     * Laravel Echo event listener when a message is marked as read.
     */onMessageMarkedAsRead: function onMessageMarkedAsRead(event) {
      var _this$receiver2,
        _this3 = this;
      if (((_this$receiver2 = this.receiver) === null || _this$receiver2 === void 0 ? void 0 : _this$receiver2.id) === event.detail.receiver.id) {
        event.detail.messages.forEach(function (value) {
          var sameMessage = _this3.messages.find(function (_ref3) {
            var id = _ref3.id;
            return id === value.id;
          });
          if (sameMessage !== undefined) {
            sameMessage.setReadAtTime(value.read_at);
          }
        });
      }
    },
    /**
     * Register Laravel Echo event listeners.
     */registerEchoEventListeners: function registerEchoEventListeners() {
      window.Echo.join("basement.contacts.".concat(userId)).listen('.basement.message.sent', this.onMessageReceived.bind(this)).listen('.basement.message.marked-as-read', this.onMessageMarkedAsRead.bind(this));
    },
    /**
     * Scroll component view to given message id.
     */scrollTo: function scrollTo(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (id === null) {
        return;
      }
      void this.$nextTick(function () {
        var _document$querySelect;
        (_document$querySelect = document.querySelector(".basement-private-messages__message-value[data-id=\"".concat(id, "\"]"))) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.scrollIntoView(options);
      });
    },
    /**
     * Scroll component view to the last message.
     */scrollToLastMessage: function scrollToLastMessage() {
      var _lastMessage$id;
      var lastMessage = this.messages.at(0);
      this.scrollTo((_lastMessage$id = lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.id) !== null && _lastMessage$id !== void 0 ? _lastMessage$id : null, {
        behavior: 'smooth'
      });
    },
    /**
     * Action when a given message is visible.
     */seeMessage: function seeMessage(message) {
      if (this.receiver === null || message.receiverId === this.receiver.id || message.readAt.date !== null) {
        return;
      }
      this.seenMessages.push(message.id);
      this.receiver.unreadMessages -= 1;
    },
    /**
     * Send a new message.
     */sendNewMessage: function sendNewMessage() {
      var _this4 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var response, message;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(_this4.receiver === null)) {
                  _context3.next = 2;
                  break;
                }
                throw new Error('Receiver cannot be empty');
              case 2:
                _this4.isLoadingSentMessage = true;
                _context3.next = 5;
                return window.axios.post(_this4.url, {
                  value: _this4.newMessageValue
                }).then(function (_ref4) {
                  var data = _ref4.data;
                  return data;
                });
              case 5:
                response = _context3.sent;
                message = PrivateMessageData.from(response.data);
                if (_this4.receiver.id !== userId) {
                  _this4.messages.unshift(message);
                  _this4.scrollToLastMessage();
                }
                _this4.receiver.lastPrivateMessage = message;
                _this4.newMessageValue = '';
                _this4.isLoadingSentMessage = false;
              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    /**
     * Add unread messages marker to the component.
     */setUnreadMessagesMarker: function setUnreadMessagesMarker() {
      var _this5 = this;
      this.messages.some(function (message) {
        var _this5$receiver;
        if (message.readAt.date !== null) {
          return true;
        }
        if (message.senderId === ((_this5$receiver = _this5.receiver) === null || _this5$receiver === void 0 ? void 0 : _this5$receiver.id)) {
          _this5.unreadMessageCursor = message.id;
        }
        return false;
      });
    },
    /**
     * HTML DOM event listener to update the current receiver.
     */updateReceiver: function updateReceiver(event) {
      this.unreadMessageCursor = null;
      this.searchKeyword = '';
      this.receiver = event.detail;
      this.url = this.urlTemplate.replace(':contact', String(event.detail.id));
      void this.mount();
    },
    /**
     * Watch when the messages changes.
     */watchMessages: function watchMessages() {
      if (this.searchKeyword.trim() === '') {
        highlighter.unmark();
      } else {
        highlighter.mark(this.searchKeyword.trim());
      }
      this.observeLastMessage();
    }
  };
});

var basement = (function (alpine) {
  alpine.data('basementChatBox', chatBoxComponent);
  alpine.data('basementContact', contactComponent);
  alpine.data('basementPrivateChat', privateMessageComponent);
});

export { basement as default };
//# sourceMappingURL=basement.plugin.esm.js.map
