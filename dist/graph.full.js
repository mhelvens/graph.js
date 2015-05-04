(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Graph"] = factory();
	else
		root["Graph"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	module.exports = __webpack_require__(21);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}
	
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}
	
	var $ = module.exports = __webpack_require__(36)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  it: function(it){
	    return it;
	  },
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  mix: function(target, src){
	    for(var key in src)hide(target, key, src[key]);
	    return target;
	  },
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(1)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	global.core = core;
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    if(type & $def.B && own)exp = ctx(out, global);
	    else exp = type & $def.P && isFunction(out) ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own){
	      if(isGlobal)target[key] = out;
	      else delete target[key] && $.hide(target, key, out);
	    }
	    // export
	    if(exports[key] != out)$.hide(exports, key, exp);
	  }
	}
	module.exports = $def;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(1)
	  , TAG      = __webpack_require__(5)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1).g
	  , store  = {};
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(7).safe('Symbol.' + name));
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(1)
	  , cof               = __webpack_require__(4)
	  , assertObject      = __webpack_require__(3).obj
	  , SYMBOL_ITERATOR   = __webpack_require__(5)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = {}
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}
	
	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol
	      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
	    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
	  },
	  get: function(it){
	    var Symbol  = $.g.Symbol
	      , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
	      , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol(' + key + ')_' + (++sid + Math.random()).toString(36);
	}
	uid.safe = __webpack_require__(1).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(3).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var $           = __webpack_require__(1)
	  , UNSCOPABLES = __webpack_require__(5)('unscopables');
	if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
	module.exports = function(key){
	  if($.FW)[][UNSCOPABLES][key] = true;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var ctx  = __webpack_require__(8)
	  , get  = __webpack_require__(6).get
	  , call = __webpack_require__(28);
	module.exports = function(iterable, entries, fn, that){
	  var iterator = get(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done){
	    if(call(iterator, f, step.value, entries) === false){
	      return call.close(iterator);
	    }
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var $   = __webpack_require__(1)
	  , ctx = __webpack_require__(8);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = Object($.assertDefined($this))
	      , self   = $.ES5Object(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = $.toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $     = __webpack_require__(1)
	  , $def  = __webpack_require__(2)
	  , BUGGY = __webpack_require__(6).BUGGY
	  , forOf = __webpack_require__(10)
	  , species = __webpack_require__(14)
	  , assertInstance = __webpack_require__(3).inst;
	
	module.exports = function(NAME, methods, common, IS_MAP, IS_WEAK){
	  var Base  = $.g[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  function fixMethod(KEY, CHAIN){
	    var method = proto[KEY];
	    if($.FW)proto[KEY] = function(a, b){
	      var result = method.call(this, a === 0 ? 0 : a, b);
	      return CHAIN ? this : result;
	    };
	  }
	  if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
	    // create collection constructor
	    C = common.getConstructor(NAME, IS_MAP, ADDER);
	    $.mix(C.prototype, methods);
	  } else {
	    var inst  = new C
	      , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
	      , buggyZero;
	    // wrap for init collections from iterable
	    if(!__webpack_require__(16)(function(iter){ new C(iter); })){ // eslint-disable-line no-new
	      C = function(){
	        assertInstance(this, C, NAME);
	        var that     = new Base
	          , iterable = arguments[0];
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      };
	      C.prototype = proto;
	      if($.FW)proto.constructor = C;
	    }
	    IS_WEAK || inst.forEach(function(val, key){
	      buggyZero = 1 / key === -Infinity;
	    });
	    // fix converting -0 key to +0
	    if(buggyZero){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    // + fix .add & .set for chaining
	    if(buggyZero || chain !== inst)fixMethod(ADDER, true);
	  }
	
	  __webpack_require__(4).set(C, NAME);
	
	  O[NAME] = C;
	  $def($def.G + $def.W + $def.F * (C != Base), O);
	  species(C);
	  species($.core[NAME]); // for wrapper
	
	  if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(1)
	  , SPECIES = __webpack_require__(5)('species');
	module.exports = function(C){
	  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: $.that
	  });
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(2)
	  , $               = __webpack_require__(1)
	  , cof             = __webpack_require__(4)
	  , $iter           = __webpack_require__(6)
	  , SYMBOL_ITERATOR = __webpack_require__(5)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$.hide(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(5)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(regExp, replace, isStatic){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(isStatic ? it : this).replace(regExp, replacer);
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var $      = __webpack_require__(1)
	  , assert = __webpack_require__(3);
	function check(O, proto){
	  assert.obj(O);
	  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(8)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(1);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(exec){
	  try {
	    exec();
	    return false;
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _get = function get(_x8, _x9, _x10) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x8,
	    property = _x9,
	    receiver = _x10; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x8 = parent; _x9 = property; _x10 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	'use strict';
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Graph class /////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @class Graph
	 * @classdesc The main class of this library, to be used for representing a mathematical (di)graph.
	 *
	 * @description Constructor arguments can be used to supply initial vertices and edges.
	 * @param ...parts {Array.<Array>}
	 *        a short notation for vertices and edges to initially add to the graph;
	 *        A vertex should be an array of the form `[key, value]`.
	 *        An edge should be an array of the form `[[from, to], value]`.
	 *        Later values of vertices or edges in this list will overwrite earlier
	 *        values, but vertices need not precede their edges. Vertices that are
	 *        connected but store no value need not be listed at all.
	 * @example
	 * var map = new Graph(
	 *     ['Amsterdam',             { population: 825000 }], // vertex
	 *     ['Leiden',                { population: 122000 }], // vertex
	 *     [['Amsterdam', 'Leiden'], { distance:   "40km" }]  // edge
	 * );
	 */
	
	var Graph = (function () {
		function Graph() {
			for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
				parts[_key] = arguments[_key];
			}
	
			_classCallCheck(this, Graph);
	
			/* storage */
			this._vertices = new Map(); // Map.< string, * >
			this._edges = new Map(); // Map.< string, Map.<string, *> >
	
			/* bookkeeping */
			this._reverseEdges = new Map(); // Map.< string, Set.<*> >
			this._sources = new Set(); // Set.< string >
			this._sinks = new Set(); // Set.< string >
			this._vertexCount = 0;
			this._edgeCount = 0;
	
			/* add vertices and values from constructor arguments */
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _slicedToArray(_step.value, 2);
	
					var key = _step$value[0];
					var value = _step$value[1];
	
					if (Array.isArray(key)) {
						/////////////// an edge
	
						var _key2 = _slicedToArray(key, 2);
	
						var from = _key2[0];
						var to = _key2[1];
	
						this.createEdge(from, to, value);
					} else {
						//////////////////////////////// a vertex
						this.addVertex(key, value);
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	
		_createClass(Graph, [{
			key: 'addNewVertex',
	
			//////////////////////////////
			////////// Vertices //////////
			//////////////////////////////
	
			////////// creating them //////////
	
			/**
	   * Add a new vertex to this graph.
	   * @throws {Graph.VertexExistsError} if a vertex with this key already exists
	   * @param  key    {string} the key with which to refer to this new vertex
	   * @param [value] {*}      the value to store in this new vertex
	   */
			value: function addNewVertex(key, value) {
				if (this.hasVertex(key)) {
					throw new Graph.VertexExistsError(key, this._vertices.get(key));
				}
				this._vertices.set(key, value);
				this._edges.set(key, new Map());
				this._reverseEdges.set(key, new Set());
				this._vertexCount += 1;
				this._sources.add(key);
				this._sinks.add(key);
			}
		}, {
			key: 'setVertex',
	
			/**
	   * Set the value of an existing vertex in this graph.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param  key    {string} the key belonging to the vertex
	   * @param [value] {*}      the value to store in this vertex
	   */
			value: function setVertex(key, value) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
				}
				this._vertices.set(key, value);
			}
		}, {
			key: 'ensureVertex',
	
			/**
	   * Make sure a vertex with a specific key exists in this graph. If it already exists,
	   * do nothing. If it does not yet exist, add a new vertex with the given value.
	   * @param  key    {string} the key for the vertex
	   * @param [value] {*}      the value to store if a new vertex is added
	   */
			value: function ensureVertex(key, value) {
				if (!this.hasVertex(key)) {
					this.addNewVertex(key, value);
				}
			}
		}, {
			key: 'addVertex',
	
			/**
	   * Add a new vertex to this graph. If a vertex with this key already exists,
	   * the value of that vertex is overwritten.
	   * @param  key    {string} the key with which to refer to this new vertex
	   * @param [value] {*}      the value to store in this new vertex
	   */
			value: function addVertex(key, value) {
				if (this.hasVertex(key)) {
					this.setVertex(key, value);
				} else {
					this.addNewVertex(key, value);
				}
			}
		}, {
			key: 'removeExistingVertex',
	
			////////// removing them //////////
	
			/**
	   * Remove an existing vertex from this graph.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
			value: function removeExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
				}
				if (this._edges.get(key).size > 0 || this._reverseEdges.get(key).size > 0) {
					throw new Graph.HasConnectedEdgesError(key);
				}
				this._vertices['delete'](key);
				this._vertexCount -= 1;
				this._sources['delete'](key);
				this._sinks['delete'](key);
			}
		}, {
			key: 'destroyExistingVertex',
	
			/**
	   * Remove an existing vertex from this graph, as well as all edges connected to it.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to remove
	   */
			value: function destroyExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
				}
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = this.verticesFrom(key)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 1);
	
						var to = _step2$value[0];
	
						this.removeEdge(key, to);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2['return']) {
							_iterator2['return']();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
	
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;
	
				try {
					for (var _iterator3 = this.verticesTo(key)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var _step3$value = _slicedToArray(_step3.value, 1);
	
						var from = _step3$value[0];
	
						this.removeEdge(from, key);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3['return']) {
							_iterator3['return']();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
	
				this.removeExistingVertex(key);
			}
		}, {
			key: 'removeVertex',
	
			/**
	   * Remove an existing vertex from this graph.
	   * If a vertex with this key does not exist, nothing happens.
	   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
			value: function removeVertex(key) {
				if (this.hasVertex(key)) {
					this.removeExistingVertex(key);
				}
			}
		}, {
			key: 'destroyVertex',
	
			/**
	   * Remove a vertex from this graph, as well as all edges connected to it.
	   * If a vertex with this key does not exist, nothing happens.
	   * @param key {string} the key of the vertex to remove
	   */
			value: function destroyVertex(key) {
				if (this.hasVertex(key)) {
					this.destroyExistingVertex(key);
				}
			}
		}, {
			key: 'vertexCount',
	
			////////// querying them //////////
	
			/**
	   * @returns {number} the number of vertices in the whole graph
	   */
			value: function vertexCount() {
				return this._vertexCount;
			}
		}, {
			key: 'hasVertex',
	
			/**
	   * Ask whether a vertex with a given key exists.
	   * @param key {string} the key to query
	   * @returns {boolean} whether there is a vertex with the given key
	   */
			value: function hasVertex(key) {
				return this._vertices.has(key);
			}
		}, {
			key: 'vertexValue',
	
			/**
	   * Get the value associated with the vertex of a given key.
	   * @param key {string} the key to query
	   * @returns {*} the value associated with the vertex of the given key.
	   * Note that a return value of `undefined` can mean
	   *
	   * 1. that there is no such vertex, or
	   * 2. that the stored value is actually `undefined`.
	   *
	   * Use {@link Graph#hasVertex} to distinguish these cases.
	   */
			value: function vertexValue(key) {
				return this._vertices.get(key);
			}
		}, {
			key: 'addNewEdge',
	
			///////////////////////////
			////////// Edges //////////
			///////////////////////////
	
			////////// adding them //////////
	
			/**
	   * Add a new edge to this graph.
	   * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
			value: function addNewEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					throw new Graph.EdgeExistsError(from, to, this.edgeValue(from, to));
				}
				if (!this.hasVertex(from)) {
					if (this.hasVertex(to)) {
						throw new Graph.VertexNotExistsError(from);
					} else {
						throw new Graph.VertexNotExistsError(from).v(to);
					}
				} else if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
				}
				this._edges.get(from).set(to, value);
				this._reverseEdges.get(to).add(from);
				this._edgeCount += 1;
				this._sources['delete'](to);
				this._sinks['delete'](from);
			}
		}, {
			key: 'createNewEdge',
	
			/**
	   * Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
			value: function createNewEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					throw new Graph.EdgeExistsError(from, to, this.edgeValue(from, to));
				}
				this.ensureVertex(from);
				this.ensureVertex(to);
				this.addNewEdge(from, to, value);
			}
		}, {
			key: 'setEdge',
	
			/**
	   * Set the value of an existing edge in this graph.
	   * @throws {Graph.EdgeNotExistsError} if an edge between `from` and `to` does not yet exist
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this edge
	   */
			value: function setEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					throw new Graph.EdgeNotExistsError(from, to);
				}
				this._edges.get(from).set(to, value);
			}
		}, {
			key: 'spanEdge',
	
			/**
	   * Make sure an edge between the `from` and `to` vertices in this graph.
	   * If one already exists, nothing is done.
	   * If one does not yet exist, a new edge is added with the given value.
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
	   */
			value: function spanEdge(from, to, value) {
				if (!this.hasVertex(from)) {
					if (this.hasVertex(to)) {
						throw new Graph.VertexNotExistsError(from);
					} else {
						throw new Graph.VertexNotExistsError(from).v(to);
					}
				} else if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
				}
				if (!this.hasEdge(from, to)) {
					this.addNewEdge(from, to, value);
				}
			}
		}, {
			key: 'addEdge',
	
			/**
	   * Add a new edge to this graph. If an edge between `from` and `to` already exists,
	   * the value of that edge is overwritten.
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
			value: function addEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.addNewEdge(from, to, value);
				}
			}
		}, {
			key: 'ensureEdge',
	
			/**
	   * Make sure an edge between the `from` and `to` vertices exists in this graph.
	   * If it already exists, nothing is done.
	   * If it does not yet exist, a new edge is added with the given value.
	   * If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
	   */
			value: function ensureEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					this.createNewEdge(from, to, value);
				}
			}
		}, {
			key: 'createEdge',
	
			/**
	   * Add a new edge to this graph. If an edge between the `from` and `to`
	   * vertices already exists, the value of that edge is overwritten.
	   * If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
	   */
			value: function createEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.createNewEdge(from, to, value);
				}
			}
		}, {
			key: 'removeExistingEdge',
	
			////////// removing them //////////
	
			/**
	   * Remove an existing edge from this graph.
	   * @throws {Graph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
			value: function removeExistingEdge(from, to) {
				if (!this.hasEdge(from, to)) {
					throw new Graph.EdgeNotExistsError(from, to);
				}
				this._edges.get(from)['delete'](to);
				this._reverseEdges.get(to)['delete'](from);
				this._edgeCount -= 1;
				if (this.inDegree(to) === 0) {
					this._sources.add(to);
				}
				if (this.outDegree(from) === 0) {
					this._sinks.add(from);
				}
			}
		}, {
			key: 'removeEdge',
	
			/**
	   * Remove an edge from this graph.
	   * If an edge between the `from` and `to` vertices doesn't exist, nothing happens.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
			value: function removeEdge(from, to) {
				if (this.hasEdge(from, to)) {
					this.removeExistingEdge(from, to);
				}
			}
		}, {
			key: 'edgeCount',
	
			////////// querying them //////////
	
			/**
	   * @returns {number} the number of edges in the whole graph
	   */
			value: function edgeCount() {
				return this._edgeCount;
			}
		}, {
			key: 'hasEdge',
	
			/**
	   * Ask whether an edge between given `from` and `to` vertices exist.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   * @returns {boolean} whether there is an edge between the given `from` and `to` vertices
	   */
			value: function hasEdge(from, to) {
				return this.hasVertex(from) && this.hasVertex(to) && this._edges.has(from) && this._edges.get(from).has(to);
			}
		}, {
			key: 'edgeValue',
	
			/**
	   * Get the value associated with the edge between given `from` and `to` vertices.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   * @returns {*} the value associated with the edge between the given `from` and `to` vertices
	   * Note that a return value of `undefined` can mean
	   *
	   * 1. that there is no such edge, or
	   * 2. that the stored value is actually `undefined`.
	   *
	   * Use {@link Graph#hasEdge} to distinguish these cases.
	   */
			value: function edgeValue(from, to) {
				return this.hasEdge(from, to) ? this._edges.get(from).get(to) : undefined;
			}
		}, {
			key: 'vertices',
	
			///////////////////////////////////////////////
			//////////// ES6 Iterable interfaces //////////
			///////////////////////////////////////////////
	
			/**
	   * Iterate over all vertices of the graph, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.vertices(), kv = it.next(); !kv.done; kv = it.next()) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.vertices()) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link Graph#@@iterator}
	   */
			value: regeneratorRuntime.mark(function vertices() {
				var done, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, key, value;
	
				return regeneratorRuntime.wrap(function vertices$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion4 = true;
							_didIteratorError4 = false;
							_iteratorError4 = undefined;
							context$2$0.prev = 4;
							_iterator4 = this._vertices[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
								context$2$0.next = 17;
								break;
							}
	
							_step4$value = _slicedToArray(_step4.value, 2);
							key = _step4$value[0];
							value = _step4$value[1];
	
							if (!(this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 14;
								break;
							}
	
							done.add(key);
							context$2$0.next = 14;
							return [key, value];
	
						case 14:
							_iteratorNormalCompletion4 = true;
							context$2$0.next = 6;
							break;
	
						case 17:
							context$2$0.next = 23;
							break;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.t0 = context$2$0['catch'](4);
							_didIteratorError4 = true;
							_iteratorError4 = context$2$0.t0;
	
						case 23:
							context$2$0.prev = 23;
							context$2$0.prev = 24;
	
							if (!_iteratorNormalCompletion4 && _iterator4['return']) {
								_iterator4['return']();
							}
	
						case 26:
							context$2$0.prev = 26;
	
							if (!_didIteratorError4) {
								context$2$0.next = 29;
								break;
							}
	
							throw _iteratorError4;
	
						case 29:
							return context$2$0.finish(26);
	
						case 30:
							return context$2$0.finish(23);
	
						case 31:
						case 'end':
							return context$2$0.stop();
					}
				}, vertices, this, [[4, 19, 23, 31], [24,, 26, 30]]);
			})
		}, {
			key: Symbol.iterator,
	
			/**
	   * A {@link Graph} object is itself {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol|iterable},
	   * and serves as a short notation in ECMAScript 6 to iterate over all vertices in the graph, in no particular order.
	   * @method Graph#@@iterator
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (let [key, value] of graph) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link Graph#vertices}
	   */
			value: function () {
				return this.vertices();
			}
		}, {
			key: 'edges',
	
			/**
	   * Iterate over all edges of the graph, in no particular order.
	   * @returns { Iterator.<string, string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.edges(), kv = it.next(); !kv.done; kv = it.next()) {
	   *     var from  = kv.value[0],
	   *         to    = kv.value[1],
	   *         value = kv.value[2];
	   *     // iterates over all edges of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, to, value] of graph.edges()) {
	   *     // iterates over all vertices of the graph
	   * }
	   */
			value: regeneratorRuntime.mark(function edges() {
				var done, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, from, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, to;
	
				return regeneratorRuntime.wrap(function edges$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Map();
							_iteratorNormalCompletion5 = true;
							_didIteratorError5 = false;
							_iteratorError5 = undefined;
							context$2$0.prev = 4;
							_iterator5 = this._edges.keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
								context$2$0.next = 40;
								break;
							}
	
							from = _step5.value;
	
							done.set(from, new Set());
							_iteratorNormalCompletion6 = true;
							_didIteratorError6 = false;
							_iteratorError6 = undefined;
							context$2$0.prev = 12;
							_iterator6 = this._edges.get(from).keys()[Symbol.iterator]();
	
						case 14:
							if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
								context$2$0.next = 23;
								break;
							}
	
							to = _step6.value;
	
							if (!(this.hasEdge(from, to) && !done.get(from).has(to))) {
								context$2$0.next = 20;
								break;
							}
	
							done.get(from).add(to);
							context$2$0.next = 20;
							return [from, to, this._edges.get(from).get(to)];
	
						case 20:
							_iteratorNormalCompletion6 = true;
							context$2$0.next = 14;
							break;
	
						case 23:
							context$2$0.next = 29;
							break;
	
						case 25:
							context$2$0.prev = 25;
							context$2$0.t1 = context$2$0['catch'](12);
							_didIteratorError6 = true;
							_iteratorError6 = context$2$0.t1;
	
						case 29:
							context$2$0.prev = 29;
							context$2$0.prev = 30;
	
							if (!_iteratorNormalCompletion6 && _iterator6['return']) {
								_iterator6['return']();
							}
	
						case 32:
							context$2$0.prev = 32;
	
							if (!_didIteratorError6) {
								context$2$0.next = 35;
								break;
							}
	
							throw _iteratorError6;
	
						case 35:
							return context$2$0.finish(32);
	
						case 36:
							return context$2$0.finish(29);
	
						case 37:
							_iteratorNormalCompletion5 = true;
							context$2$0.next = 6;
							break;
	
						case 40:
							context$2$0.next = 46;
							break;
	
						case 42:
							context$2$0.prev = 42;
							context$2$0.t2 = context$2$0['catch'](4);
							_didIteratorError5 = true;
							_iteratorError5 = context$2$0.t2;
	
						case 46:
							context$2$0.prev = 46;
							context$2$0.prev = 47;
	
							if (!_iteratorNormalCompletion5 && _iterator5['return']) {
								_iterator5['return']();
							}
	
						case 49:
							context$2$0.prev = 49;
	
							if (!_didIteratorError5) {
								context$2$0.next = 52;
								break;
							}
	
							throw _iteratorError5;
	
						case 52:
							return context$2$0.finish(49);
	
						case 53:
							return context$2$0.finish(46);
	
						case 54:
						case 'end':
							return context$2$0.stop();
					}
				}, edges, this, [[4, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
			})
		}, {
			key: 'verticesFrom',
	
			/**
	   * Iterate over the outgoing edges of a given vertex in the graph, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the outgoing edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesFrom(from), kv = it.next(); !kv.done; kv = it.next()) {
	   *     var to          = kv.value[0],
	   *         vertexValue = kv.value[1],
	   *         edgeValue   = kv.value[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [to, vertexValue, edgeValue] of graph.verticesFrom(from)) {
	   *     // iterates over all outgoing edges of the `from` vertex
	   * }
	   */
			value: function verticesFrom(from) {
				if (!this.hasVertex(from)) {
					throw new Graph.VertexNotExistsError(from);
				}
				return this._verticesFrom(from);
			}
		}, {
			key: '_verticesFrom',
			value: regeneratorRuntime.mark(function _verticesFrom(from) {
				var done, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, to;
	
				return regeneratorRuntime.wrap(function _verticesFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion7 = true;
							_didIteratorError7 = false;
							_iteratorError7 = undefined;
							context$2$0.prev = 4;
							_iterator7 = this._edges.get(from).keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step7.value;
	
							if (!(this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 12;
							return [to, this._vertices.get(to), this._edges.get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion7 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t3 = context$2$0['catch'](4);
							_didIteratorError7 = true;
							_iteratorError7 = context$2$0.t3;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion7 && _iterator7['return']) {
								_iterator7['return']();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError7) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError7;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case 'end':
							return context$2$0.stop();
					}
				}, _verticesFrom, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: 'verticesTo',
	
			/**
	   * Iterate over the incoming edges of a given vertex in the graph, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the incoming edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesTo(to), kv = it.next(); !kv.done; kv = it.next()) {
	   *     var from        = kv.value[0],
	   *         vertexValue = kv.value[1],
	   *         edgeValue   = kv.value[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, vertexValue, edgeValue] of graph.verticesTo(to)) {
	   *     // iterates over all incoming edges of the `to` vertex
	   * }
	   */
			value: function verticesTo(to) {
				if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
				}
				return this._verticesTo(to);
			}
		}, {
			key: '_verticesTo',
			value: regeneratorRuntime.mark(function _verticesTo(to) {
				var done, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, from;
	
				return regeneratorRuntime.wrap(function _verticesTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion8 = true;
							_didIteratorError8 = false;
							_iteratorError8 = undefined;
							context$2$0.prev = 4;
							_iterator8 = this._reverseEdges.get(to)[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step8.value;
	
							if (!(this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 12;
							return [from, this._vertices.get(from), this._edges.get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion8 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t4 = context$2$0['catch'](4);
							_didIteratorError8 = true;
							_iteratorError8 = context$2$0.t4;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion8 && _iterator8['return']) {
								_iterator8['return']();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError8) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError8;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case 'end':
							return context$2$0.stop();
					}
				}, _verticesTo, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: 'verticesWithPathFrom',
	
			/**
	   * Iterate over all vertices reachable from a given vertex in the graph, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesWithPathFrom(from), kv = it.next(); !kv.done; kv = it.next()) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices reachable from `from`
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.verticesWithPathFrom(from)) {
	   *     // iterates over all vertices reachable from `from`
	   * }
	   */
			value: function verticesWithPathFrom(from) {
				if (!this.hasVertex(from)) {
					throw new Graph.VertexNotExistsError(from);
				}
				return this._verticesWithPathFrom(from, new Set());
			}
		}, {
			key: '_verticesWithPathFrom',
			value: regeneratorRuntime.mark(function _verticesWithPathFrom(from, done) {
				var _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, to;
	
				return regeneratorRuntime.wrap(function _verticesWithPathFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion9 = true;
							_didIteratorError9 = false;
							_iteratorError9 = undefined;
							context$2$0.prev = 3;
							_iterator9 = this._edges.get(from).keys()[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step9.value;
	
							if (!(this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 11;
							return [to, this._vertices.get(to)];
	
						case 11:
							return context$2$0.delegateYield(this._verticesWithPathFrom(to, done), 't5', 12);
	
						case 12:
							_iteratorNormalCompletion9 = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t6 = context$2$0['catch'](3);
							_didIteratorError9 = true;
							_iteratorError9 = context$2$0.t6;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion9 && _iterator9['return']) {
								_iterator9['return']();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError9) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError9;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case 'end':
							return context$2$0.stop();
					}
				}, _verticesWithPathFrom, this, [[3, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: 'verticesWithPathTo',
	
			/**
	   * Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesWithPathTo(to), kv = it.next(); !kv.done; kv = it.next()) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.verticesWithPathTo(to)) {
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   */
			value: function verticesWithPathTo(to) {
				if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
				}
				return this._verticesWithPathTo(to, new Set());
			}
		}, {
			key: '_verticesWithPathTo',
			value: regeneratorRuntime.mark(function _verticesWithPathTo(to, done) {
				var _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, from;
	
				return regeneratorRuntime.wrap(function _verticesWithPathTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion10 = true;
							_didIteratorError10 = false;
							_iteratorError10 = undefined;
							context$2$0.prev = 3;
							_iterator10 = this._reverseEdges.get(to)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step10.value;
	
							if (!(this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 11;
							return [from, this._vertices.get(from)];
	
						case 11:
							return context$2$0.delegateYield(this._verticesWithPathTo(from, done), 't7', 12);
	
						case 12:
							_iteratorNormalCompletion10 = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t8 = context$2$0['catch'](3);
							_didIteratorError10 = true;
							_iteratorError10 = context$2$0.t8;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion10 && _iterator10['return']) {
								_iterator10['return']();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError10) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError10;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case 'end':
							return context$2$0.stop();
					}
				}, _verticesWithPathTo, this, [[3, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: 'sources',
	
			/**
	   * Iterate over all vertices that have no incoming edges, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.sources(), kv = it.next(); !kv.done; kv = it.next()) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices with no incoming edges
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.sources()) {
	   *     // iterates over all vertices with no incoming edges
	   * }
	   */
			value: regeneratorRuntime.mark(function sources() {
				var done, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, key;
	
				return regeneratorRuntime.wrap(function sources$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion11 = true;
							_didIteratorError11 = false;
							_iteratorError11 = undefined;
							context$2$0.prev = 4;
							_iterator11 = this._sources[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							key = _step11.value;
	
							if (!(this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(key);
							context$2$0.next = 12;
							return [key, this.vertexValue(key)];
	
						case 12:
							_iteratorNormalCompletion11 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t9 = context$2$0['catch'](4);
							_didIteratorError11 = true;
							_iteratorError11 = context$2$0.t9;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion11 && _iterator11['return']) {
								_iterator11['return']();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError11) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError11;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case 'end':
							return context$2$0.stop();
					}
				}, sources, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: 'sinks',
	
			/**
	   * Iterate over all vertices that have no outgoing edges, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.sinks(), kv = it.next(); !kv.done; kv = it.next()) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices with no outgoing edges
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.sinks()) {
	   *     // iterates over all vertices with no outgoing edges
	   * }
	   */
			value: regeneratorRuntime.mark(function sinks() {
				var done, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, key;
	
				return regeneratorRuntime.wrap(function sinks$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion12 = true;
							_didIteratorError12 = false;
							_iteratorError12 = undefined;
							context$2$0.prev = 4;
							_iterator12 = this._sinks[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							key = _step12.value;
	
							if (!(this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(key);
							context$2$0.next = 12;
							return [key, this.vertexValue(key)];
	
						case 12:
							_iteratorNormalCompletion12 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t10 = context$2$0['catch'](4);
							_didIteratorError12 = true;
							_iteratorError12 = context$2$0.t10;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion12 && _iterator12['return']) {
								_iterator12['return']();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError12) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError12;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case 'end':
							return context$2$0.stop();
					}
				}, sinks, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: 'vertices_topologically',
	
			/**
	   * Iterate over all vertices of the graph in topological order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.vertices_topologically(), kv = it.next(); !kv.done; kv = it.next()) {
	   *     var key   = kv.value[0],
	   *         value = kv.value[1];
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.vertices_topologically()) {
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   */
			value: regeneratorRuntime.mark(function vertices_topologically() {
				var marked2$0, visited, handled, _this, visit, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, _step14$value, a;
	
				return regeneratorRuntime.wrap(function vertices_topologically$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							visit = function visit(a) {
								var i, cycle, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, _step13$value, b;
	
								return regeneratorRuntime.wrap(function visit$(context$3$0) {
									while (1) switch (context$3$0.prev = context$3$0.next) {
										case 0:
											visited.push(a);
											i = visited.indexOf(a);
	
											if (!(i !== visited.length - 1)) {
												context$3$0.next = 5;
												break;
											}
	
											cycle = visited.slice(i + 1).reverse();
											throw new Graph.CycleError(cycle);
	
										case 5:
											if (handled.has(a)) {
												context$3$0.next = 36;
												break;
											}
	
											_iteratorNormalCompletion13 = true;
											_didIteratorError13 = false;
											_iteratorError13 = undefined;
											context$3$0.prev = 9;
											_iterator13 = _this.verticesTo(a)[Symbol.iterator]();
	
										case 11:
											if (_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done) {
												context$3$0.next = 18;
												break;
											}
	
											_step13$value = _slicedToArray(_step13.value, 1);
											b = _step13$value[0];
											return context$3$0.delegateYield(visit(b), 't11', 15);
	
										case 15:
											_iteratorNormalCompletion13 = true;
											context$3$0.next = 11;
											break;
	
										case 18:
											context$3$0.next = 24;
											break;
	
										case 20:
											context$3$0.prev = 20;
											context$3$0.t12 = context$3$0['catch'](9);
											_didIteratorError13 = true;
											_iteratorError13 = context$3$0.t12;
	
										case 24:
											context$3$0.prev = 24;
											context$3$0.prev = 25;
	
											if (!_iteratorNormalCompletion13 && _iterator13['return']) {
												_iterator13['return']();
											}
	
										case 27:
											context$3$0.prev = 27;
	
											if (!_didIteratorError13) {
												context$3$0.next = 30;
												break;
											}
	
											throw _iteratorError13;
	
										case 30:
											return context$3$0.finish(27);
	
										case 31:
											return context$3$0.finish(24);
	
										case 32:
											if (!_this.hasVertex(a)) {
												context$3$0.next = 35;
												break;
											}
	
											context$3$0.next = 35;
											return [a, _this._vertices.get(a)];
	
										case 35:
											handled.add(a);
	
										case 36:
											visited.pop();
	
										case 37:
										case 'end':
											return context$3$0.stop();
									}
								}, marked2$0[0], this, [[9, 20, 24, 32], [25,, 27, 31]]);
							};
	
							marked2$0 = [visit].map(regeneratorRuntime.mark);
							visited = [];
							handled = new Set();
							_this = this;
							_iteratorNormalCompletion14 = true;
							_didIteratorError14 = false;
							_iteratorError14 = undefined;
							context$2$0.prev = 8;
							_iterator14 = this.vertices()[Symbol.iterator]();
	
						case 10:
							if (_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done) {
								context$2$0.next = 18;
								break;
							}
	
							_step14$value = _slicedToArray(_step14.value, 1);
							a = _step14$value[0];
	
							if (handled.has(a)) {
								context$2$0.next = 15;
								break;
							}
	
							return context$2$0.delegateYield(visit(a), 't13', 15);
	
						case 15:
							_iteratorNormalCompletion14 = true;
							context$2$0.next = 10;
							break;
	
						case 18:
							context$2$0.next = 24;
							break;
	
						case 20:
							context$2$0.prev = 20;
							context$2$0.t14 = context$2$0['catch'](8);
							_didIteratorError14 = true;
							_iteratorError14 = context$2$0.t14;
	
						case 24:
							context$2$0.prev = 24;
							context$2$0.prev = 25;
	
							if (!_iteratorNormalCompletion14 && _iterator14['return']) {
								_iterator14['return']();
							}
	
						case 27:
							context$2$0.prev = 27;
	
							if (!_didIteratorError14) {
								context$2$0.next = 30;
								break;
							}
	
							throw _iteratorError14;
	
						case 30:
							return context$2$0.finish(27);
	
						case 31:
							return context$2$0.finish(24);
	
						case 32:
						case 'end':
							return context$2$0.stop();
					}
				}, vertices_topologically, this, [[8, 20, 24, 32], [25,, 27, 31]]);
			})
		}, {
			key: 'clearEdges',
	
			//////////////////////////////
			////////// Clearing //////////
			//////////////////////////////
	
			/**
	   * Remove all edges from the graph, but leave the vertices intact.
	   */
			value: function clearEdges() {
				var _iteratorNormalCompletion15 = true;
				var _didIteratorError15 = false;
				var _iteratorError15 = undefined;
	
				try {
					for (var _iterator15 = this.edges()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
						var _step15$value = _slicedToArray(_step15.value, 2);
	
						var from = _step15$value[0];
						var to = _step15$value[1];
						this.removeEdge(from, to);
					}
				} catch (err) {
					_didIteratorError15 = true;
					_iteratorError15 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion15 && _iterator15['return']) {
							_iterator15['return']();
						}
					} finally {
						if (_didIteratorError15) {
							throw _iteratorError15;
						}
					}
				}
			}
		}, {
			key: 'clear',
	
			/**
	   * Remove all edges and vertices from the graph, putting it back in its initial state.
	   */
			value: function clear() {
				var _iteratorNormalCompletion16 = true;
				var _didIteratorError16 = false;
				var _iteratorError16 = undefined;
	
				try {
					for (var _iterator16 = this.vertices()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
						var _step16$value = _slicedToArray(_step16.value, 1);
	
						var v = _step16$value[0];
						this.destroyVertex(v);
					}
				} catch (err) {
					_didIteratorError16 = true;
					_iteratorError16 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion16 && _iterator16['return']) {
							_iterator16['return']();
						}
					} finally {
						if (_didIteratorError16) {
							throw _iteratorError16;
						}
					}
				}
			}
		}, {
			key: 'equals',
	
			////////////////////////////////////////
			////////// (Advanced) Queries //////////
			////////////////////////////////////////
	
			/**
	   * Ask whether `this` graph and a given `other` graph are equal.
	   * Two graphs are equal if they have the same vertices and the same edges.
	   * @param other {Graph} the other graph to compare to `this` one
	   * @param [eqV] {function(*, *, string): boolean}
	   *     a custom equality function for values stored in vertices;
	   *     defaults to `===` comparison; The first two arguments are the
	   *     values to compare. The third is the corresponding `key`.
	   * @param [eqE] {function(*, *, string, string): boolean}
	   *     a custom equality function for values stored in edges;
	   *     defaults to the function given for `trV`; The first two arguments
	   *     are the values to compare. The third and fourth are the `from`
	   *     and `to` keys respectively.
	   * @returns {boolean} `true` if the two graphs are equal; `false` otherwise
	   */
			value: function equals(other) {
				var eqV = arguments[1] === undefined ? function (x, y) {
					return x === y;
				} : arguments[1];
				var eqE = arguments[2] === undefined ? eqV : arguments[2];
				return (function () {
					if (!(other instanceof Graph)) {
						return false;
					}
					if (this.vertexCount() !== other.vertexCount()) {
						return false;
					}
					if (this.edgeCount() !== other.edgeCount()) {
						return false;
					}
					var _iteratorNormalCompletion17 = true;
					var _didIteratorError17 = false;
					var _iteratorError17 = undefined;
	
					try {
						for (var _iterator17 = this.vertices()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
							var _step17$value = _slicedToArray(_step17.value, 2);
	
							var key = _step17$value[0];
							var value = _step17$value[1];
	
							if (!other.hasVertex(key)) {
								return false;
							}
							if (!eqV(value, other.vertexValue(key), key)) {
								return false;
							}
						}
					} catch (err) {
						_didIteratorError17 = true;
						_iteratorError17 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion17 && _iterator17['return']) {
								_iterator17['return']();
							}
						} finally {
							if (_didIteratorError17) {
								throw _iteratorError17;
							}
						}
					}
	
					var _iteratorNormalCompletion18 = true;
					var _didIteratorError18 = false;
					var _iteratorError18 = undefined;
	
					try {
						for (var _iterator18 = this.edges()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
							var _step18$value = _slicedToArray(_step18.value, 3);
	
							var from = _step18$value[0];
							var to = _step18$value[1];
							var value = _step18$value[2];
	
							if (!other.hasEdge(from, to)) {
								return false;
							}
							if (!eqE(value, other.edgeValue(from, to), from, to)) {
								return false;
							}
						}
					} catch (err) {
						_didIteratorError18 = true;
						_iteratorError18 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion18 && _iterator18['return']) {
								_iterator18['return']();
							}
						} finally {
							if (_didIteratorError18) {
								throw _iteratorError18;
							}
						}
					}
	
					return true;
				}).apply(this, arguments);
			}
		}, {
			key: 'cycle',
	
			/**
	   * Find any directed cycle in this graph.
	   * @returns {?Array} an array with the keys of a cycle in order;
	   *                   `null`, if there is no cycle
	   */
			value: function cycle() {
				var _this2 = this;
	
				var visited = []; // stack
				var handled = new Set();
	
				var visit = function visit(a) {
					/* if a cycle is found, record it and return */
					var i = visited.indexOf(a);
					if (i >= 0) {
						return visited.slice(i);
					}
	
					/* if this vertex was already handled, no cycle can be found here */
					if (handled.has(a)) {
						return null;
					}
					handled.add(a);
	
					/* recursively visit successors to check for cycles */
					visited.push(a);
					var _iteratorNormalCompletion19 = true;
					var _didIteratorError19 = false;
					var _iteratorError19 = undefined;
	
					try {
						for (var _iterator19 = _this2.verticesFrom(a)[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
							var _step19$value = _slicedToArray(_step19.value, 1);
	
							var b = _step19$value[0];
	
							var result = visit(b);
							if (result) {
								return result;
							}
						}
					} catch (err) {
						_didIteratorError19 = true;
						_iteratorError19 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion19 && _iterator19['return']) {
								_iterator19['return']();
							}
						} finally {
							if (_didIteratorError19) {
								throw _iteratorError19;
							}
						}
					}
	
					visited.pop();
				};
	
				var _iteratorNormalCompletion20 = true;
				var _didIteratorError20 = false;
				var _iteratorError20 = undefined;
	
				try {
					for (var _iterator20 = this.vertices()[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
						var _step20$value = _slicedToArray(_step20.value, 1);
	
						var a = _step20$value[0];
	
						var result = visit(a);
						if (result) {
							return result;
						}
					}
				} catch (err) {
					_didIteratorError20 = true;
					_iteratorError20 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion20 && _iterator20['return']) {
							_iterator20['return']();
						}
					} finally {
						if (_didIteratorError20) {
							throw _iteratorError20;
						}
					}
				}
	
				return null;
			}
		}, {
			key: 'hasCycle',
	
			/**
	   * Test whether this graph contains a directed cycle.
	   * @returns {boolean} whether this graph contains a directed cycle
	   */
			value: function hasCycle() {
				return !!this.cycle();
			}
		}, {
			key: 'path',
	
			/**
	   * Find any path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @returns {?array} an array with the keys of the path found between the two vertices,
	   *                   including those two vertices themselves; `null` if no such path exists
	   */
			value: function path(from, to) {
				var _this3 = this;
	
				if (!this.hasVertex(from) || !this.hasVertex(to)) {
					return null;
				}
	
				var visited = [];
	
				/* recursive auxiliary function: find a path from 'current' to 'to' */
				var hasPathAux = function hasPathAux(current) {
					visited.push(current);
					if (_this3.hasEdge(current, to)) {
						return [].concat(visited, [to]);
					}
					var _iteratorNormalCompletion21 = true;
					var _didIteratorError21 = false;
					var _iteratorError21 = undefined;
	
					try {
						for (var _iterator21 = _this3.verticesFrom(current)[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
							var _step21$value = _slicedToArray(_step21.value, 1);
	
							var next = _step21$value[0];
	
							if (visited.indexOf(next) === -1) {
								var result = hasPathAux(next);
								if (result) {
									return result;
								}
							}
						}
					} catch (err) {
						_didIteratorError21 = true;
						_iteratorError21 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion21 && _iterator21['return']) {
								_iterator21['return']();
							}
						} finally {
							if (_didIteratorError21) {
								throw _iteratorError21;
							}
						}
					}
	
					visited.pop();
					return null;
				};
	
				return hasPathAux(from);
			}
		}, {
			key: 'hasPath',
	
			/**
	   * Test whether there is a directed path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @returns {boolean} whether such a path exists
	   */
			value: function hasPath(from, to) {
				return !!this.path(from, to);
			}
		}, {
			key: 'outDegree',
	
			/**
	   * Get the number of edges going out of a given vertex.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to query
	   * @returns {number} the number of edges going out of the `key` vertex
	   */
			value: function outDegree(key) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
				}
				return this._edges.get(key).size;
			}
		}, {
			key: 'inDegree',
	
			/**
	   * Get the number of edges coming into a given vertex.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to query
	   * @returns {number} the number of edges coming into the `key` vertex
	   */
			value: function inDegree(key) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
				}
				return this._reverseEdges.get(key).size;
			}
		}, {
			key: 'degree',
	
			/**
	   * Get the number of edges connected to a given vertex.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to query
	   * @returns {number} the number of edges connected to the `key` vertex
	   */
			value: function degree(key) {
				return this.outDegree(key) + this.inDegree(key);
			}
		}, {
			key: 'mergeIn',
	
			///////////////////////////////////////
			////////// Cloning and stuff //////////
			///////////////////////////////////////
	
			/**
	   * Merge another graph into this graph.
	   * @param other {Graph} the other graph to merge into this one
	   * @param [mV] {function(*, *, string): *}
	   *     a custom merge function for values stored in vertices;
	   *     defaults to whichever of the two values is not `undefined`,
	   *     giving preference to that of the other graph; The first and
	   *     second arguments are the vertex values of `this` graph and the
	   *     `other` graph respectively. The third is the corresponding `key`.
	   * @param [mE] {function(*, *, string, string): *}
	   *     a custom merge function for values stored in edges;
	   *     defaults to whichever of the two values is not `undefined`,
	   *     giving preference to that of the other graph; The first and
	   *     second arguments are the edge values of `this` graph and the
	   *     `other` graph respectively. The third and fourth are the
	   *     corresponding `from` and `to` keys.
	   */
			value: function mergeIn(other, mV, mE) {
				if (!mV) {
					mV = function (v1, v2) {
						return typeof v2 === 'undefined' ? v1 : v2;
					};
				}
				if (!mE) {
					mE = mV;
				}
				var _iteratorNormalCompletion22 = true;
				var _didIteratorError22 = false;
				var _iteratorError22 = undefined;
	
				try {
					for (var _iterator22 = other.vertices()[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
						var _step22$value = _slicedToArray(_step22.value, 1);
	
						var key = _step22$value[0];
	
						this.addVertex(key, mV(this.vertexValue(key), other.vertexValue(key)));
					}
				} catch (err) {
					_didIteratorError22 = true;
					_iteratorError22 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion22 && _iterator22['return']) {
							_iterator22['return']();
						}
					} finally {
						if (_didIteratorError22) {
							throw _iteratorError22;
						}
					}
				}
	
				var _iteratorNormalCompletion23 = true;
				var _didIteratorError23 = false;
				var _iteratorError23 = undefined;
	
				try {
					for (var _iterator23 = other.edges()[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
						var _step23$value = _slicedToArray(_step23.value, 2);
	
						var from = _step23$value[0];
						var to = _step23$value[1];
	
						this.addEdge(from, to, mE(this.edgeValue(from, to), other.edgeValue(from, to), from, to));
					}
				} catch (err) {
					_didIteratorError23 = true;
					_iteratorError23 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion23 && _iterator23['return']) {
							_iterator23['return']();
						}
					} finally {
						if (_didIteratorError23) {
							throw _iteratorError23;
						}
					}
				}
			}
		}, {
			key: 'clone',
	
			/**
	   * Create a clone of this graph.
	   * @param [trV] {function(*, string): *}
	   *     a custom transformation function for values stored in vertices;
	   *     defaults to the identity function; The first argument is the
	   *     value to clone. The second is the corresponding `key`.
	   * @param [trE] {function(*, string, string): *}
	   *     a custom transformation function for values stored in edges;
	   *     defaults to the function given for `trV`; The first argument
	   *     is the value to clone. The second and third are the `from`
	   *     and `to` keys respectively.
	   * @returns {Graph} a clone of this graph
	   */
			value: function clone() {
				var trV = arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
				var trE = arguments[1] === undefined ? trV : arguments[1];
				return (function () {
					var result = new Graph();
					result.mergeIn(this, function (v1, v2) {
						return trV(v2);
					}, function (v1, v2) {
						return trE(v2);
					});
					return result;
				}).apply(this, arguments);
			}
		}, {
			key: 'transitiveReduction',
	
			/**
	   * Create a clone of this graph, but without any transitive edges.
	   * @param [trV] {function(*, string): *}
	   *     a custom transformation function for values stored in vertices;
	   *     defaults to the identity function; The first argument is the
	   *     value to clone. The second is the corresponding `key`.
	   * @param [trE] {function(*, string, string): *}
	   *     a custom transformation function for values stored in edges;
	   *     defaults to the function given for `trV`; The first argument
	   *     is the value to clone. The second and third are the `from`
	   *     and `to` keys respectively.
	   * @returns {Graph} a clone of this graph with all transitive edges removed
	   */
			value: function transitiveReduction(trV, trE) {
				// argument defaults are handled in `clone`
				var result = this.clone(trV, trE);
				var _iteratorNormalCompletion24 = true;
				var _didIteratorError24 = false;
				var _iteratorError24 = undefined;
	
				try {
					for (var _iterator24 = this.vertices()[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
						var _step24$value = _slicedToArray(_step24.value, 1);
	
						var x = _step24$value[0];
						var _iteratorNormalCompletion25 = true;
						var _didIteratorError25 = false;
						var _iteratorError25 = undefined;
	
						try {
							for (var _iterator25 = this.vertices()[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
								var _step25$value = _slicedToArray(_step25.value, 1);
	
								var y = _step25$value[0];
	
								if (result.hasEdge(x, y)) {
									var _iteratorNormalCompletion26 = true;
									var _didIteratorError26 = false;
									var _iteratorError26 = undefined;
	
									try {
										for (var _iterator26 = this.vertices()[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
											var _step26$value = _slicedToArray(_step26.value, 1);
	
											var z = _step26$value[0];
	
											if (result.hasPath(y, z)) result.removeEdge(x, z);
										}
									} catch (err) {
										_didIteratorError26 = true;
										_iteratorError26 = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion26 && _iterator26['return']) {
												_iterator26['return']();
											}
										} finally {
											if (_didIteratorError26) {
												throw _iteratorError26;
											}
										}
									}
								}
							}
						} catch (err) {
							_didIteratorError25 = true;
							_iteratorError25 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion25 && _iterator25['return']) {
									_iterator25['return']();
								}
							} finally {
								if (_didIteratorError25) {
									throw _iteratorError25;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError24 = true;
					_iteratorError24 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion24 && _iterator24['return']) {
							_iterator24['return']();
						}
					} finally {
						if (_didIteratorError24) {
							throw _iteratorError24;
						}
					}
				}
	
				return result;
			}
		}, {
			key: 'contractPaths',
	
			/**
	   * This method replaces stretches of non-branching directed pathway into single edges.
	   * More specifically, it identifies all 'nexus' vertices in the graph and preserves them.
	   * It then removes all other vertices and all edges from the graph, then inserts edges
	   * between nexuses that summarize the connectivity that was there before.
	   *
	   * A nexus is any vertex that is *not* characterized by '1 edge in, 1 edge out'.
	   * A custom `isNexus` function may be provided to manually select additional vertices
	   * that should be preserved as nexus.
	   * @param [isNexus] {function(string, *): boolean}
	   *                  a predicate for identifying additional vertices that should be treated as nexus;
	   *                  It receives a `key` and `value` associated to a vertex and should return
	   *                  true if and only if that vertex should be a nexus.
	   * @throws {Graph.BranchlessCycleError} if the graph contains a cycle with no branches or nexuses
	   */
			value: function contractPaths() {
				var _this4 = this;
	
				var isNexus = arguments[0] === undefined ? function () {
					return false;
				} : arguments[0];
	
				/* what makes a a vertex a nexus (start/end-point) */
				var nexuses = new Set([].concat(_toConsumableArray(this.vertices())).filter(function (_ref) {
					var _ref2 = _slicedToArray(_ref, 2);
	
					var key = _ref2[0];
					var val = _ref2[1];
					return _this4.outDegree(key) !== 1 || _this4.inDegree(key) !== 1 || isNexus(key, val);
				}).map(function (_ref3) {
					var _ref32 = _slicedToArray(_ref3, 1);
	
					var key = _ref32[0];
					return key;
				}));
	
				/* error if there is a branch-less cycle */
				{
					var _iteratorNormalCompletion29;
	
					var _didIteratorError29;
	
					var _iteratorError29;
	
					var _iterator29, _step29;
	
					(function () {
						var unhandledVertices = new Set([].concat(_toConsumableArray(_this4.vertices())).map(function (_ref4) {
							var _ref42 = _slicedToArray(_ref4, 1);
	
							var key = _ref42[0];
							return key;
						}));
						var checkForBlCycle = function checkForBlCycle(key) {
							if (!unhandledVertices.has(key)) {
								return;
							}
							unhandledVertices['delete'](key);
							var _iteratorNormalCompletion27 = true;
							var _didIteratorError27 = false;
							var _iteratorError27 = undefined;
	
							try {
								for (var _iterator27 = _this4.verticesFrom(key)[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
									var _step27$value = _slicedToArray(_step27.value, 1);
	
									var next = _step27$value[0];
									checkForBlCycle(next);
								}
							} catch (err) {
								_didIteratorError27 = true;
								_iteratorError27 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion27 && _iterator27['return']) {
										_iterator27['return']();
									}
								} finally {
									if (_didIteratorError27) {
										throw _iteratorError27;
									}
								}
							}
	
							var _iteratorNormalCompletion28 = true;
							var _didIteratorError28 = false;
							var _iteratorError28 = undefined;
	
							try {
								for (var _iterator28 = _this4.verticesTo(key)[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
									var _step28$value = _slicedToArray(_step28.value, 1);
	
									var next = _step28$value[0];
									checkForBlCycle(next);
								}
							} catch (err) {
								_didIteratorError28 = true;
								_iteratorError28 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion28 && _iterator28['return']) {
										_iterator28['return']();
									}
								} finally {
									if (_didIteratorError28) {
										throw _iteratorError28;
									}
								}
							}
						};
						_iteratorNormalCompletion29 = true;
						_didIteratorError29 = false;
						_iteratorError29 = undefined;
	
						try {
							for (_iterator29 = nexuses[Symbol.iterator](); !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
								var key = _step29.value;
								checkForBlCycle(key);
							}
						} catch (err) {
							_didIteratorError29 = true;
							_iteratorError29 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion29 && _iterator29['return']) {
									_iterator29['return']();
								}
							} finally {
								if (_didIteratorError29) {
									throw _iteratorError29;
								}
							}
						}
	
						if (unhandledVertices.size > 0) {
							var startingKey = unhandledVertices.values().next().value,
							    cycle = [],
							    current = startingKey;
							do {
								cycle.push(current);
								current = _this4.verticesFrom(current).next().value[0];
							} while (current !== startingKey);
							throw new Graph.BranchlessCycleError(cycle);
						}
					})();
				}
	
				/* bookkeeping */
				var contractionsToAdd = new Map();
	
				/* register the path starting with the given edge */
				var startPath = function startPath(start, next, backwards) {
					/* functions to help branch on `backwards` */
					var fromTo = function fromTo() {
						var strt = arguments[0] === undefined ? start : arguments[0];
						var nxt = arguments[1] === undefined ? next : arguments[1];
						return backwards ? [nxt, strt] : [strt, nxt];
					};
					var verticesNext = function verticesNext(v) {
						return backwards ? _this4.verticesTo(v) : _this4.verticesFrom(v);
					};
	
					/* bookkeeping */
					var verticesToRemove = new Set();
					var edgesToRemove = new Set();
					var path = new Graph();
	
					/* process the start of the path */
					path.addVertex(start, _this4.vertexValue(start));
					path.addVertex(next, _this4.vertexValue(next));
					path.addNewEdge.apply(path, _toConsumableArray(fromTo()).concat([_this4.edgeValue.apply(_this4, _toConsumableArray(fromTo()))]));
					edgesToRemove.add(fromTo());
	
					/* process as [current, next] moves across the path */
					var current = undefined;
					while (!nexuses.has(next)) {
						var _ref5 = [next, verticesNext(next).next().value[0]];
						current = _ref5[0];
						next = _ref5[1];
	
						path.addVertex(next, _this4.vertexValue(next));
						path.addNewEdge.apply(path, _toConsumableArray(fromTo(current, next)).concat([_this4.edgeValue.apply(_this4, _toConsumableArray(fromTo(current, next)))]));
						verticesToRemove.add(current);
						edgesToRemove.add(fromTo(current, next));
					}
	
					/* register new path contraction */
					if (!contractionsToAdd.get(fromTo()[0])) {
						contractionsToAdd.set(fromTo()[0], new Map());
					}
					if (!contractionsToAdd.get(fromTo()[0]).get(fromTo()[1])) {
						contractionsToAdd.get(fromTo()[0]).set(fromTo()[1], new Graph());
					}
					contractionsToAdd.get(fromTo()[0]).get(fromTo()[1]).mergeIn(path);
	
					/* remove old edges and vertices */
					var _iteratorNormalCompletion30 = true;
					var _didIteratorError30 = false;
					var _iteratorError30 = undefined;
	
					try {
						for (var _iterator30 = edgesToRemove[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
							var key = _step30.value;
							_this4.removeExistingEdge.apply(_this4, _toConsumableArray(key));
						}
					} catch (err) {
						_didIteratorError30 = true;
						_iteratorError30 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion30 && _iterator30['return']) {
								_iterator30['return']();
							}
						} finally {
							if (_didIteratorError30) {
								throw _iteratorError30;
							}
						}
					}
	
					var _iteratorNormalCompletion31 = true;
					var _didIteratorError31 = false;
					var _iteratorError31 = undefined;
	
					try {
						for (var _iterator31 = verticesToRemove[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
							var key = _step31.value;
							_this4.destroyExistingVertex(key);
						}
					} catch (err) {
						_didIteratorError31 = true;
						_iteratorError31 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion31 && _iterator31['return']) {
								_iterator31['return']();
							}
						} finally {
							if (_didIteratorError31) {
								throw _iteratorError31;
							}
						}
					}
				};
	
				/* process paths starting at all nexus points */
				var _iteratorNormalCompletion32 = true;
				var _didIteratorError32 = false;
				var _iteratorError32 = undefined;
	
				try {
					for (var _iterator32 = nexuses[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
						var first = _step32.value;
						var _iteratorNormalCompletion34 = true;
						var _didIteratorError34 = false;
						var _iteratorError34 = undefined;
	
						try {
							for (var _iterator34 = this.verticesFrom(first)[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
								var _step34$value = _slicedToArray(_step34.value, 1);
	
								var next = _step34$value[0];
								startPath(first, next, false);
							}
						} catch (err) {
							_didIteratorError34 = true;
							_iteratorError34 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion34 && _iterator34['return']) {
									_iterator34['return']();
								}
							} finally {
								if (_didIteratorError34) {
									throw _iteratorError34;
								}
							}
						}
	
						var _iteratorNormalCompletion35 = true;
						var _didIteratorError35 = false;
						var _iteratorError35 = undefined;
	
						try {
							for (var _iterator35 = this.verticesTo(first)[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
								var _step35$value = _slicedToArray(_step35.value, 1);
	
								var next = _step35$value[0];
								startPath(first, next, true);
							}
						} catch (err) {
							_didIteratorError35 = true;
							_iteratorError35 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion35 && _iterator35['return']) {
									_iterator35['return']();
								}
							} finally {
								if (_didIteratorError35) {
									throw _iteratorError35;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError32 = true;
					_iteratorError32 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion32 && _iterator32['return']) {
							_iterator32['return']();
						}
					} finally {
						if (_didIteratorError32) {
							throw _iteratorError32;
						}
					}
				}
	
				/* add the replacement edges */
				var _iteratorNormalCompletion33 = true;
				var _didIteratorError33 = false;
				var _iteratorError33 = undefined;
	
				try {
					for (var _iterator33 = contractionsToAdd[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
						var _step33$value = _slicedToArray(_step33.value, 2);
	
						var from = _step33$value[0];
						var toVal = _step33$value[1];
						var _iteratorNormalCompletion36 = true;
						var _didIteratorError36 = false;
						var _iteratorError36 = undefined;
	
						try {
							for (var _iterator36 = toVal[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
								var _step36$value = _slicedToArray(_step36.value, 2);
	
								var to = _step36$value[0];
								var rememberedPath = _step36$value[1];
	
								this.addNewEdge(from, to, rememberedPath);
							}
						} catch (err) {
							_didIteratorError36 = true;
							_iteratorError36 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion36 && _iterator36['return']) {
									_iterator36['return']();
								}
							} finally {
								if (_didIteratorError36) {
									throw _iteratorError36;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError33 = true;
					_iteratorError33 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion33 && _iterator33['return']) {
							_iterator33['return']();
						}
					} finally {
						if (_didIteratorError33) {
							throw _iteratorError33;
						}
					}
				}
			}
		}]);
	
		return Graph;
	})();
	
	exports['default'] = Graph;
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Errors //////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected not to exist, but do.
	 * @extends Error
	 */
	Graph.VertexExistsError = (function (_Error) {
		function VertexExistsError(key, value) {
			_classCallCheck(this, VertexExistsError);
	
			_get(Object.getPrototypeOf(VertexExistsError.prototype), 'constructor', this).call(this);
			/**
	   * the set of relevant vertices as `[key, value]` shaped arrays
	   * @public
	   * @constant vertices
	   * @memberof Graph.VertexExistsError
	   * @instance
	   * @type {Set.<array>}
	   */
			this.vertices = new Set();
			this.v(key, value);
		}
	
		_inherits(VertexExistsError, _Error);
	
		_createClass(VertexExistsError, [{
			key: 'v',
			value: function v(key, value) {
				this.vertices.add([key, value]);
				this._refreshMessage();
				return this;
			}
		}, {
			key: '_refreshMessage',
			value: function _refreshMessage() {
				this.message = 'This graph has ' + (this.vertices.size === 1 ? 'a vertex' : 'vertices') + ' \'' + [].concat(_toConsumableArray(this.vertices)).map(function (_ref6) {
					var _ref62 = _slicedToArray(_ref6, 1);
	
					var key = _ref62[0];
					return key;
				}).join('\', \'') + '\'';
			}
		}]);
	
		return VertexExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
	 * @extends Error
	 */
	Graph.VertexNotExistsError = (function (_Error2) {
		function VertexNotExistError(key) {
			_classCallCheck(this, VertexNotExistError);
	
			_get(Object.getPrototypeOf(VertexNotExistError.prototype), 'constructor', this).call(this);
			/**
	   * the set of relevant vertex keys
	   * @public
	   * @constant vertices
	   * @memberof Graph.VertexNotExistsError
	   * @instance
	   * @type {Set.<string>}
	   */
			this.vertices = new Set();
			this.v(key);
		}
	
		_inherits(VertexNotExistError, _Error2);
	
		_createClass(VertexNotExistError, [{
			key: 'v',
			value: function v(key) {
				this.vertices.add(key);
				this._refreshMessage();
				return this;
			}
		}, {
			key: '_refreshMessage',
			value: function _refreshMessage() {
				this.message = 'This graph does not have ' + (this.vertices.size === 1 ? 'a vertex' : 'vertices') + ' \'' + [].concat(_toConsumableArray(this.vertices)).join('\', \'') + '\'';
			}
		}]);
	
		return VertexNotExistError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
	 * @extends Error
	 */
	Graph.EdgeExistsError = (function (_Error3) {
		function EdgeExistsError(from, to, value) {
			_classCallCheck(this, EdgeExistsError);
	
			_get(Object.getPrototypeOf(EdgeExistsError.prototype), 'constructor', this).call(this);
			/**
	   * the set of relevant edges as `[[from, to], value]` shaped arrays
	   * @public
	   * @constant edges
	   * @memberof Graph.EdgeExistsError
	   * @instance
	   * @type {Set.<Array>}
	   */
			this.edges = new Set();
			this.e(from, to, value);
		}
	
		_inherits(EdgeExistsError, _Error3);
	
		_createClass(EdgeExistsError, [{
			key: 'e',
			value: function e(from, to, value) {
				this.edges.add([[from, to], value]);
				this._refreshMessage();
				return this;
			}
		}, {
			key: '_refreshMessage',
			value: function _refreshMessage() {
				this.message = 'This graph has ' + (this.edges.size === 1 ? 'an edge' : 'edges') + ' ' + [].concat(_toConsumableArray(this.edges)).map(function (_ref7) {
					var _ref72 = _slicedToArray(_ref7, 1);
	
					var _ref72$0 = _slicedToArray(_ref72[0], 2);
	
					var from = _ref72$0[0];
					var to = _ref72$0[1];
					return '(\'' + from + '\', \'' + to + '\')';
				}).join(', ');
			}
		}]);
	
		return EdgeExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
	 * @extends Error
	 */
	Graph.EdgeNotExistsError = (function (_Error4) {
		function EdgeNotExistsError(from, to) {
			_classCallCheck(this, EdgeNotExistsError);
	
			_get(Object.getPrototypeOf(EdgeNotExistsError.prototype), 'constructor', this).call(this);
			/**
	   * the set of relevant edge keys as `[from, to]` shaped arrays
	   * @public
	   * @constant edges
	   * @memberof Graph.EdgeNotExistsError
	   * @instance
	   * @type {Set.<Array.<string>>}
	   */
			this.edges = new Set();
			this.e(from, to);
		}
	
		_inherits(EdgeNotExistsError, _Error4);
	
		_createClass(EdgeNotExistsError, [{
			key: 'e',
			value: function e(from, to) {
				this.edges.add([from, to]);
				this._refreshMessage();
				return this;
			}
		}, {
			key: '_refreshMessage',
			value: function _refreshMessage() {
				this.message = 'This graph does not have ' + (this.edges.size === 1 ? 'an edge' : 'edges') + ' ' + [].concat(_toConsumableArray(this.edges)).map(function (_ref8) {
					var _ref82 = _slicedToArray(_ref8, 2);
	
					var from = _ref82[0];
					var to = _ref82[1];
					return '(\'' + from + '\', \'' + to + '\')';
				}).join(', ');
			}
		}]);
	
		return EdgeNotExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a vertex is expected not to have connected edges, but does.
	 * @extends Error
	 */
	Graph.HasConnectedEdgesError = (function (_Error5) {
		function HasConnectedEdgesError(key) {
			_classCallCheck(this, HasConnectedEdgesError);
	
			_get(Object.getPrototypeOf(HasConnectedEdgesError.prototype), 'constructor', this).call(this);
			/**
	   * the key of the relevant vertex
	   * @public
	   * @constant key
	   * @memberof Graph.HasConnectedEdgesError
	   * @instance
	   * @type {string}
	   */
			this.key = key;
			this.message = 'The \'' + key + '\' vertex has connected edges';
		}
	
		_inherits(HasConnectedEdgesError, _Error5);
	
		return HasConnectedEdgesError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a graph is expected not to have a directed cycle, but does.
	 * @extends Error
	 */
	Graph.CycleError = (function (_Error6) {
		function CycleError(cycle) {
			_classCallCheck(this, CycleError);
	
			_get(Object.getPrototypeOf(CycleError.prototype), 'constructor', this).call(this);
			/**
	   * the vertices involved in the cycle, in order but with an unspecified starting point
	   * @public
	   * @constant cycle
	   * @memberof Graph.CycleError
	   * @instance
	   * @type {Array.<string>}
	   */
			this.cycle = cycle;
			this.message = 'This graph contains a cycle: ' + cycle;
		}
	
		_inherits(CycleError, _Error6);
	
		return CycleError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a graph is expected not to have a branch-less directed cycle, but does.
	 * @extends Error
	 */
	Graph.BranchlessCycleError = (function (_Error7) {
		function BranchlessCycleError(cycle) {
			_classCallCheck(this, BranchlessCycleError);
	
			_get(Object.getPrototypeOf(BranchlessCycleError.prototype), 'constructor', this).call(this);
			/**
	   * the vertices involved in the branch-less cycle, in order but with an unspecified starting point
	   * @public
	   * @constant cycle
	   * @memberof Graph.BranchlessCycleError
	   * @instance
	   * @type {Array.<string>}
	   */
			this.cycle = cycle;
			this.message = 'This graph contains a branch-less cycle: ' + cycle;
		}
	
		_inherits(BranchlessCycleError, _Error7);
	
		return BranchlessCycleError;
	})(Error);
	module.exports = exports['default'];
	// stack

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var $ = __webpack_require__(1);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = $.toObject($this)
	      , length = $.toLength(O.length)
	      , index  = $.toIndex(fromIndex, length)
	      , value;
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(1)
	  , ctx      = __webpack_require__(8)
	  , safe     = __webpack_require__(7).safe
	  , assert   = __webpack_require__(3)
	  , forOf    = __webpack_require__(10)
	  , step     = __webpack_require__(6).step
	  , has      = $.has
	  , set      = $.set
	  , isObject = $.isObject
	  , hide     = $.hide
	  , isFrozen = Object.isFrozen || $.core.Object.isFrozen
	  , ID       = safe('id')
	  , O1       = safe('O1')
	  , LAST     = safe('last')
	  , FIRST    = safe('first')
	  , ITER     = safe('iter')
	  , SIZE     = $.DESC ? safe('size') : 'size'
	  , id       = 0;
	
	function fastKey(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
	  // can't set id to frozen object
	  if(isFrozen(it))return 'F';
	  if(!has(it, ID)){
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	}
	
	function getEntry(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index != 'F')return that[O1][index];
	  // frozen object case
	  for(entry = that[FIRST]; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	}
	
	module.exports = {
	  getConstructor: function(NAME, IS_MAP, ADDER){
	    function C(){
	      var that     = assert.inst(this, C, NAME)
	        , iterable = arguments[0];
	      set(that, O1, $.create(null));
	      set(that, SIZE, 0);
	      set(that, LAST, undefined);
	      set(that, FIRST, undefined);
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    }
	    $.mix(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that[FIRST] = that[LAST] = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that[O1][entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that[FIRST] == entry)that[FIRST] = next;
	          if(that[LAST] == entry)that[LAST] = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments[1], 3)
	          , entry;
	        while(entry = entry ? entry.n : this[FIRST]){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if($.DESC)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return assert.def(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index != 'F')that[O1][index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  // add .keys, .values, .entries, [@@iterator]
	  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	  setIter: function(C, NAME, IS_MAP){
	    __webpack_require__(15)(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        iter.o = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $def  = __webpack_require__(2)
	  , forOf = __webpack_require__(10);
	module.exports = function(NAME){
	  $def($def.P, NAME, {
	    toJSON: function toJSON(){
	      var arr = [];
	      forOf(this, false, arr.push, arr);
	      return arr;
	    }
	  });
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $         = __webpack_require__(1)
	  , safe      = __webpack_require__(7).safe
	  , assert    = __webpack_require__(3)
	  , forOf     = __webpack_require__(10)
	  , _has      = $.has
	  , isObject  = $.isObject
	  , hide      = $.hide
	  , isFrozen  = Object.isFrozen || $.core.Object.isFrozen
	  , id        = 0
	  , ID        = safe('id')
	  , WEAK      = safe('weak')
	  , LEAK      = safe('leak')
	  , method    = __webpack_require__(11)
	  , find      = method(5)
	  , findIndex = method(6);
	function findFrozen(store, key){
	  return find(store.array, function(it){
	    return it[0] === key;
	  });
	}
	// fallback for frozen keys
	function leakStore(that){
	  return that[LEAK] || hide(that, LEAK, {
	    array: [],
	    get: function(key){
	      var entry = findFrozen(this, key);
	      if(entry)return entry[1];
	    },
	    has: function(key){
	      return !!findFrozen(this, key);
	    },
	    set: function(key, value){
	      var entry = findFrozen(this, key);
	      if(entry)entry[1] = value;
	      else this.array.push([key, value]);
	    },
	    'delete': function(key){
	      var index = findIndex(this.array, function(it){
	        return it[0] === key;
	      });
	      if(~index)this.array.splice(index, 1);
	      return !!~index;
	    }
	  })[LEAK];
	}
	
	module.exports = {
	  getConstructor: function(NAME, IS_MAP, ADDER){
	    function C(){
	      $.set(assert.inst(this, C, NAME), ID, id++);
	      var iterable = arguments[0];
	      if(iterable != undefined)forOf(iterable, IS_MAP, this[ADDER], this);
	    }
	    $.mix(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(isFrozen(key))return leakStore(this)['delete'](key);
	        return _has(key, WEAK) && _has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(isFrozen(key))return leakStore(this).has(key);
	        return _has(key, WEAK) && _has(key[WEAK], this[ID]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(isFrozen(assert.obj(key))){
	      leakStore(that).set(key, value);
	    } else {
	      _has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that[ID]] = value;
	    } return that;
	  },
	  leakStore: leakStore,
	  WEAK: WEAK,
	  ID: ID
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(1)
	  , document = $.g.document
	  , isObject = $.isObject
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(3).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var $            = __webpack_require__(1)
	  , assertObject = __webpack_require__(3).obj;
	module.exports = function ownKeys(it){
	  assertObject(it);
	  var keys       = $.getNames(it)
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// http://wiki.ecmascript.org/doku.php?id=strawman:string_padding
	var $      = __webpack_require__(1)
	  , repeat = __webpack_require__(31);
	
	module.exports = function(that, minLength, fillChar, left){
	  // 1. Let O be CheckObjectCoercible(this value).
	  // 2. Let S be ToString(O).
	  var S = String($.assertDefined(that));
	  // 4. If intMinLength is undefined, return S.
	  if(minLength === undefined)return S;
	  // 4. Let intMinLength be ToInteger(minLength).
	  var intMinLength = $.toInteger(minLength);
	  // 5. Let fillLen be the number of characters in S minus intMinLength.
	  var fillLen = intMinLength - S.length;
	  // 6. If fillLen < 0, then throw a RangeError exception.
	  // 7. If fillLen is +∞, then throw a RangeError exception.
	  if(fillLen < 0 || fillLen === Infinity){
	    throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
	  }
	  // 8. Let sFillStr be the string represented by fillStr.
	  // 9. If sFillStr is undefined, let sFillStr be a space character.
	  var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
	  // 10. Let sFillVal be a String made of sFillStr, repeated until fillLen is met.
	  var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
	  // truncate if we overflowed
	  if(sFillVal.length > fillLen)sFillVal = left
	    ? sFillVal.slice(sFillVal.length - fillLen)
	    : sFillVal.slice(0, fillLen);
	  // 11. Return a string made from sFillVal, followed by S.
	  // 11. Return a String made from S, followed by sFillVal.
	  return left ? sFillVal.concat(S) : S.concat(sFillVal);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(1);
	
	module.exports = function repeat(count){
	  var str = String($.assertDefined(this))
	    , res = ''
	    , n   = $.toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(1)
	  , ctx    = __webpack_require__(8)
	  , cof    = __webpack_require__(4)
	  , invoke = __webpack_require__(13)
	  , cel    = __webpack_require__(26)
	  , global             = $.g
	  , isFunction         = $.isFunction
	  , html               = $.html
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , postMessage        = global.postMessage
	  , addEventListener   = global.addEventListener
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	function run(){
	  var id = +this;
	  if($.has(queue, id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	}
	function listner(event){
	  run.call(event.data);
	}
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!isFunction(setTask) || !isFunction(clearTask)){
	  setTask = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
	    defer = function(id){
	      postMessage(id, '*');
	    };
	    addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(1)
	  , setUnscope = __webpack_require__(9)
	  , ITER       = __webpack_require__(7).safe('iter')
	  , $iter      = __webpack_require__(6)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(15)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	__webpack_require__(86);
	
	__webpack_require__(87);
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel/polyfill is allowed");
	}
	global._babelPolyfill = true;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(1)
	  , enumKeys = __webpack_require__(27);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = Object($.assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = $.ES5Object(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function($){
	  $.FW   = true;
	  $.path = $.g;
	  return $;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	module.exports = function(object, el){
	  var O      = $.toObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(1)
	  , invoke = __webpack_require__(13)
	  , assertFunction = __webpack_require__(3).fn;
	module.exports = function(/* ...pargs */){
	  var fn     = assertFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = $.path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that    = this
	      , _length = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !_length)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(_length > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var $                = __webpack_require__(1)
	  , cel              = __webpack_require__(26)
	  , cof              = __webpack_require__(4)
	  , $def             = __webpack_require__(2)
	  , invoke           = __webpack_require__(13)
	  , arrayMethod      = __webpack_require__(11)
	  , IE_PROTO         = __webpack_require__(7).safe('__proto__')
	  , assert           = __webpack_require__(3)
	  , assertObject     = assert.obj
	  , ObjectProto      = Object.prototype
	  , A                = []
	  , slice            = A.slice
	  , indexOf          = A.indexOf
	  , classof          = cof.classof
	  , has              = $.has
	  , defineProperty   = $.setDesc
	  , getOwnDescriptor = $.getDesc
	  , defineProperties = $.setDescs
	  , isFunction       = $.isFunction
	  , toObject         = $.toObject
	  , toLength         = $.toLength
	  , IE8_DOM_DEFINE   = false
	  , $indexOf         = __webpack_require__(22)(false)
	  , $forEach         = arrayMethod(0)
	  , $map             = arrayMethod(1)
	  , $filter          = arrayMethod(2)
	  , $some            = arrayMethod(3)
	  , $every           = arrayMethod(4);
	
	if(!$.DESC){
	  try {
	    IE8_DOM_DEFINE = defineProperty(cel('div'), 'x',
	      {get: function(){ return 8; }}
	    ).x == 8;
	  } catch(e){ /* empty */ }
	  $.setDesc = function(O, P, Attributes){
	    if(IE8_DOM_DEFINE)try {
	      return defineProperty(O, P, Attributes);
	    } catch(e){ /* empty */ }
	    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	    if('value' in Attributes)assertObject(O)[P] = Attributes.value;
	    return O;
	  };
	  $.getDesc = function(O, P){
	    if(IE8_DOM_DEFINE)try {
	      return getOwnDescriptor(O, P);
	    } catch(e){ /* empty */ }
	    if(has(O, P))return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
	  };
	  $.setDescs = defineProperties = function(O, Properties){
	    assertObject(O);
	    var keys   = $.getKeys(Properties)
	      , length = keys.length
	      , i = 0
	      , P;
	    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
	    return O;
	  };
	}
	$def($def.S + $def.F * !$.DESC, 'Object', {
	  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $.getDesc,
	  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	  defineProperty: $.setDesc,
	  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties
	});
	
	  // IE 8- don't enum bug keys
	var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
	            'toLocaleString,toString,valueOf').split(',')
	  // Additional keys for getOwnPropertyNames
	  , keys2 = keys1.concat('length', 'prototype')
	  , keysLen1 = keys1.length;
	
	// Create object with `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe')
	    , i      = keysLen1
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  $.html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict.prototype[keys1[i]];
	  return createDict();
	};
	function createGetKeys(names, length){
	  return function(object){
	    var O      = toObject(object)
	      , i      = 0
	      , result = []
	      , key;
	    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	    // Don't enum bug & hidden keys
	    while(length > i)if(has(O, key = names[i++])){
	      ~indexOf.call(result, key) || result.push(key);
	    }
	    return result;
	  };
	}
	function isPrimitive(it){ return !$.isObject(it); }
	function Empty(){}
	$def($def.S, 'Object', {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  getPrototypeOf: $.getProto = $.getProto || function(O){
	    O = Object(assert.def(O));
	    if(has(O, IE_PROTO))return O[IE_PROTO];
	    if(isFunction(O.constructor) && O instanceof O.constructor){
	      return O.constructor.prototype;
	    } return O instanceof Object ? ObjectProto : null;
	  },
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  create: $.create = $.create || function(O, /*?*/Properties){
	    var result;
	    if(O !== null){
	      Empty.prototype = assertObject(O);
	      result = new Empty();
	      Empty.prototype = null;
	      // add "__proto__" for Object.getPrototypeOf shim
	      result[IE_PROTO] = O;
	    } else result = createDict();
	    return Properties === undefined ? result : defineProperties(result, Properties);
	  },
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
	  // 19.1.2.17 / 15.2.3.8 Object.seal(O)
	  seal: $.it, // <- cap
	  // 19.1.2.5 / 15.2.3.9 Object.freeze(O)
	  freeze: $.it, // <- cap
	  // 19.1.2.15 / 15.2.3.10 Object.preventExtensions(O)
	  preventExtensions: $.it, // <- cap
	  // 19.1.2.13 / 15.2.3.11 Object.isSealed(O)
	  isSealed: isPrimitive, // <- cap
	  // 19.1.2.12 / 15.2.3.12 Object.isFrozen(O)
	  isFrozen: isPrimitive, // <- cap
	  // 19.1.2.11 / 15.2.3.13 Object.isExtensible(O)
	  isExtensible: $.isObject // <- cap
	});
	
	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	$def($def.P, 'Function', {
	  bind: function(that /*, args... */){
	    var fn       = assert.fn(this)
	      , partArgs = slice.call(arguments, 1);
	    function bound(/* args... */){
	      var args = partArgs.concat(slice.call(arguments));
	      return invoke(fn, args, this instanceof bound ? $.create(fn.prototype) : that);
	    }
	    if(fn.prototype)bound.prototype = fn.prototype;
	    return bound;
	  }
	});
	
	// Fix for not array-like ES3 string
	function arrayMethodFix(fn){
	  return function(){
	    return fn.apply($.ES5Object(this), arguments);
	  };
	}
	if(!(0 in Object('z') && 'z'[0] == 'z')){
	  $.ES5Object = function(it){
	    return cof(it) == 'String' ? it.split('') : Object(it);
	  };
	}
	$def($def.P + $def.F * ($.ES5Object != Object), 'Array', {
	  slice: arrayMethodFix(slice),
	  join: arrayMethodFix(A.join)
	});
	
	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	$def($def.S, 'Array', {
	  isArray: function(arg){
	    return cof(arg) == 'Array';
	  }
	});
	function createArrayReduce(isRight){
	  return function(callbackfn, memo){
	    assert.fn(callbackfn);
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = isRight ? length - 1 : 0
	      , i      = isRight ? -1 : 1;
	    if(arguments.length < 2)for(;;){
	      if(index in O){
	        memo = O[index];
	        index += i;
	        break;
	      }
	      index += i;
	      assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
	    }
	    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
	      memo = callbackfn(memo, O[index], index, this);
	    }
	    return memo;
	  };
	}
	$def($def.P, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: $.each = $.each || function forEach(callbackfn/*, that = undefined */){
	    return $forEach(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn/*, that = undefined */){
	    return $map(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn/*, that = undefined */){
	    return $filter(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn/*, that = undefined */){
	    return $some(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn/*, that = undefined */){
	    return $every(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: createArrayReduce(false),
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: createArrayReduce(true),
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: indexOf = indexOf || function indexOf(el /*, fromIndex = 0 */){
	    return $indexOf(this, el, arguments[1]);
	  },
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, $.toInteger(fromIndex));
	    if(index < 0)index = toLength(length + index);
	    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
	    return -1;
	  }
	});
	
	// 21.1.3.25 / 15.5.4.20 String.prototype.trim()
	$def($def.P, 'String', {trim: __webpack_require__(17)(/^\s*([\s\S]*\S)?\s*$/, '$1')});
	
	// 20.3.3.1 / 15.9.4.4 Date.now()
	$def($def.S, 'Date', {now: function(){
	  return +new Date;
	}});
	
	function lz(num){
	  return num > 9 ? num : '0' + num;
	}
	
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	// PhantomJS and old webkit had a broken Date implementation.
	var date       = new Date(-5e13 - 1)
	  , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
	      && __webpack_require__(20)(function(){ new Date(NaN).toISOString(); }));
	$def($def.P + $def.F * brokenDate, 'Date', {toISOString: function(){
	  if(!isFinite(this))throw RangeError('Invalid time value');
	  var d = this
	    , y = d.getUTCFullYear()
	    , m = d.getUTCMilliseconds()
	    , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	}});
	
	if(classof(function(){ return arguments; }()) == 'Object')cof.classof = function(it){
	  var tag = classof(it);
	  return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(1)
	  , $def    = __webpack_require__(2)
	  , toIndex = $.toIndex;
	$def($def.P, 'Array', {
	  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	  copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
	    var O     = Object($.assertDefined(this))
	      , len   = $.toLength(O.length)
	      , to    = toIndex(target, len)
	      , from  = toIndex(start, len)
	      , end   = arguments[2]
	      , fin   = end === undefined ? len : toIndex(end, len)
	      , count = Math.min(fin - from, len - to)
	      , inc   = 1;
	    if(from < to && to < from + count){
	      inc  = -1;
	      from = from + count - 1;
	      to   = to   + count - 1;
	    }
	    while(count-- > 0){
	      if(from in O)O[to] = O[from];
	      else delete O[to];
	      to   += inc;
	      from += inc;
	    } return O;
	  }
	});
	__webpack_require__(9)('copyWithin');

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(1)
	  , $def    = __webpack_require__(2)
	  , toIndex = $.toIndex;
	$def($def.P, 'Array', {
	  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	  fill: function fill(value /*, start = 0, end = @length */){
	    var O      = Object($.assertDefined(this))
	      , length = $.toLength(O.length)
	      , index  = toIndex(arguments[1], length)
	      , end    = arguments[2]
	      , endPos = end === undefined ? length : toIndex(end, length);
	    while(endPos > index)O[index++] = value;
	    return O;
	  }
	});
	__webpack_require__(9)('fill');

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var KEY    = 'findIndex'
	  , $def   = __webpack_require__(2)
	  , forced = true
	  , $find  = __webpack_require__(11)(6);
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$def($def.P + $def.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments[1]);
	  }
	});
	__webpack_require__(9)(KEY);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var KEY    = 'find'
	  , $def   = __webpack_require__(2)
	  , forced = true
	  , $find  = __webpack_require__(11)(5);
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$def($def.P + $def.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments[1]);
	  }
	});
	__webpack_require__(9)(KEY);

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var $     = __webpack_require__(1)
	  , ctx   = __webpack_require__(8)
	  , $def  = __webpack_require__(2)
	  , $iter = __webpack_require__(6)
	  , call  = __webpack_require__(28);
	$def($def.S + $def.F * !__webpack_require__(16)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = Object($.assertDefined(arrayLike))
	      , mapfn   = arguments[1]
	      , mapping = mapfn !== undefined
	      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
	      , index   = 0
	      , length, result, step, iterator;
	    if($iter.is(O)){
	      iterator = $iter.get(O);
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result   = new (typeof this == 'function' ? this : Array);
	      for(; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
	      }
	    } else {
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
	      for(; length > index; index++){
	        result[index] = mapping ? f(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var $def = __webpack_require__(2);
	$def($def.S, 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , length = arguments.length
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      , result = new (typeof this == 'function' ? this : Array)(length);
	    while(length > index)result[index] = arguments[index++];
	    result.length = length;
	    return result;
	  }
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14)(Array);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var $             = __webpack_require__(1)
	  , HAS_INSTANCE  = __webpack_require__(5)('hasInstance')
	  , FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(!$.isFunction(this) || !$.isObject(O))return false;
	  if(!$.isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = $.getProto(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(1)
	  , NAME = 'name'
	  , setDesc = $.setDesc
	  , FunctionProto = Function.prototype;
	// 19.2.4.2 name
	NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = String(this).match(/^\s*function ([^ (]*)/)
	      , name  = match ? match[1] : '';
	    $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
	    return name;
	  },
	  set: function(value){
	    $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
	  }
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(23);
	
	// 23.1 Map Objects
	__webpack_require__(12)('Map', {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var Infinity = 1 / 0
	  , $def  = __webpack_require__(2)
	  , E     = Math.E
	  , pow   = Math.pow
	  , abs   = Math.abs
	  , exp   = Math.exp
	  , log   = Math.log
	  , sqrt  = Math.sqrt
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	function roundTiesToEven(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	}
	
	// 20.2.2.28 Math.sign(x)
	function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	}
	// 20.2.2.5 Math.asinh(x)
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
	}
	// 20.2.2.14 Math.expm1(x)
	function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
	}
	
	$def($def.S, 'Math', {
	  // 20.2.2.3 Math.acosh(x)
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
	  },
	  // 20.2.2.5 Math.asinh(x)
	  asinh: asinh,
	  // 20.2.2.7 Math.atanh(x)
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
	  },
	  // 20.2.2.9 Math.cbrt(x)
	  cbrt: function cbrt(x){
	    return sign(x = +x) * pow(abs(x), 1 / 3);
	  },
	  // 20.2.2.11 Math.clz32(x)
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
	  },
	  // 20.2.2.12 Math.cosh(x)
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  },
	  // 20.2.2.14 Math.expm1(x)
	  expm1: expm1,
	  // 20.2.2.16 Math.fround(x)
	  fround: function fround(x){
	    var $abs  = abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  },
	  // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , len1 = arguments.length
	      , len2 = len1
	      , args = Array(len1)
	      , larg = -Infinity
	      , arg;
	    while(len1--){
	      arg = args[len1] = +arguments[len1];
	      if(arg == Infinity || arg == -Infinity)return Infinity;
	      if(arg > larg)larg = arg;
	    }
	    larg = arg || 1;
	    while(len2--)sum += pow(args[len2] / larg, 2);
	    return larg * sqrt(sum);
	  },
	  // 20.2.2.18 Math.imul(x, y)
	  imul: function imul(x, y){
	    var UInt16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UInt16 & xn
	      , yl = UInt16 & yn;
	    return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
	  },
	  // 20.2.2.20 Math.log1p(x)
	  log1p: function log1p(x){
	    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
	  },
	  // 20.2.2.21 Math.log10(x)
	  log10: function log10(x){
	    return log(x) / Math.LN10;
	  },
	  // 20.2.2.22 Math.log2(x)
	  log2: function log2(x){
	    return log(x) / Math.LN2;
	  },
	  // 20.2.2.28 Math.sign(x)
	  sign: sign,
	  // 20.2.2.30 Math.sinh(x)
	  sinh: function sinh(x){
	    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
	  },
	  // 20.2.2.33 Math.tanh(x)
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  },
	  // 20.2.2.34 Math.trunc(x)
	  trunc: function trunc(it){
	    return (it > 0 ? floor : ceil)(it);
	  }
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(1)
	  , isObject   = $.isObject
	  , isFunction = $.isFunction
	  , NUMBER     = 'Number'
	  , $Number    = $.g[NUMBER]
	  , Base       = $Number
	  , proto      = $Number.prototype;
	function toPrimitive(it){
	  var fn, val;
	  if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
	  if(isFunction(fn = it.toString) && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to number");
	}
	function toNumber(it){
	  if(isObject(it))it = toPrimitive(it);
	  if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
	    var binary = false;
	    switch(it.charCodeAt(1)){
	      case 66 : case 98  : binary = true;
	      case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
	    }
	  } return +it;
	}
	if($.FW && !($Number('0o1') && $Number('0b1'))){
	  $Number = function Number(it){
	    return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
	  };
	  $.each.call($.DESC ? $.getNames(Base) : (
	      // ES3:
	      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	      // ES6 (in case, if modules with ES6 Number statics required before):
	      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	    ).split(','), function(key){
	      if($.has(Base, key) && !$.has($Number, key)){
	        $.setDesc($Number, key, $.getDesc(Base, key));
	      }
	    }
	  );
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  $.hide($.g, NUMBER, $Number);
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var $     = __webpack_require__(1)
	  , $def  = __webpack_require__(2)
	  , abs   = Math.abs
	  , floor = Math.floor
	  , _isFinite = $.g.isFinite
	  , MAX_SAFE_INTEGER = 0x1fffffffffffff; // pow(2, 53) - 1 == 9007199254740991;
	function isInteger(it){
	  return !$.isObject(it) && _isFinite(it) && floor(it) === it;
	}
	$def($def.S, 'Number', {
	  // 20.1.2.1 Number.EPSILON
	  EPSILON: Math.pow(2, -52),
	  // 20.1.2.2 Number.isFinite(number)
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  },
	  // 20.1.2.3 Number.isInteger(number)
	  isInteger: isInteger,
	  // 20.1.2.4 Number.isNaN(number)
	  isNaN: function isNaN(number){
	    return number != number;
	  },
	  // 20.1.2.5 Number.isSafeInteger(number)
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
	  },
	  // 20.1.2.6 Number.MAX_SAFE_INTEGER
	  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
	  // 20.1.2.10 Number.MIN_SAFE_INTEGER
	  MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
	  // 20.1.2.12 Number.parseFloat(string)
	  parseFloat: parseFloat,
	  // 20.1.2.13 Number.parseInt(string, radix)
	  parseInt: parseInt
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(2);
	$def($def.S, 'Object', {assign: __webpack_require__(35)});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $def = __webpack_require__(2);
	$def($def.S, 'Object', {
	  is: function is(x, y){
	    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	  }
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(2);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(18).set});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(1)
	  , $def     = __webpack_require__(2)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	function wrapObjectMethod(METHOD, MODE){
	  var fn  = ($.core.Object || {})[METHOD] || Object[METHOD]
	    , f   = 0
	    , o   = {};
	  o[METHOD] = MODE == 1 ? function(it){
	    return isObject(it) ? fn(it) : it;
	  } : MODE == 2 ? function(it){
	    return isObject(it) ? fn(it) : true;
	  } : MODE == 3 ? function(it){
	    return isObject(it) ? fn(it) : false;
	  } : MODE == 4 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : MODE == 5 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : function(it){
	    return fn(toObject(it));
	  };
	  try {
	    fn('z');
	  } catch(e){
	    f = 1;
	  }
	  $def($def.S + $def.F * f, 'Object', o);
	}
	wrapObjectMethod('freeze', 1);
	wrapObjectMethod('seal', 1);
	wrapObjectMethod('preventExtensions', 1);
	wrapObjectMethod('isFrozen', 2);
	wrapObjectMethod('isSealed', 2);
	wrapObjectMethod('isExtensible', 3);
	wrapObjectMethod('getOwnPropertyDescriptor', 4);
	wrapObjectMethod('getPrototypeOf', 5);
	wrapObjectMethod('keys');
	wrapObjectMethod('getOwnPropertyNames');

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var $   = __webpack_require__(1)
	  , cof = __webpack_require__(4)
	  , tmp = {};
	tmp[__webpack_require__(5)('toStringTag')] = 'z';
	if($.FW && cof(tmp) != 'z')$.hide(Object.prototype, 'toString', function toString(){
	  return '[object ' + cof.classof(this) + ']';
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(1)
	  , ctx      = __webpack_require__(8)
	  , cof      = __webpack_require__(4)
	  , $def     = __webpack_require__(2)
	  , assert   = __webpack_require__(3)
	  , forOf    = __webpack_require__(10)
	  , setProto = __webpack_require__(18).set
	  , species  = __webpack_require__(14)
	  , SPECIES  = __webpack_require__(5)('species')
	  , RECORD   = __webpack_require__(7).safe('record')
	  , PROMISE  = 'Promise'
	  , global   = $.g
	  , process  = global.process
	  , asap     = process && process.nextTick || __webpack_require__(32).set
	  , P        = global[PROMISE]
	  , isFunction     = $.isFunction
	  , isObject       = $.isObject
	  , assertFunction = assert.fn
	  , assertObject   = assert.obj;
	
	var useNative = function(){
	  var test, works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = isFunction(P) && isFunction(P.resolve) && P.resolve(test = new P(function(){})) == test;
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	function getConstructor(C){
	  var S = assertObject(C)[SPECIES];
	  return S != undefined ? S : C;
	}
	function isThenable(it){
	  var then;
	  if(isObject(it))then = it.then;
	  return isFunction(then) ? then : false;
	}
	function notify(record){
	  var chain = record.c;
	  if(chain.length)asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    function run(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    }
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	  });
	}
	function isUnhandled(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	}
	function $reject(value){
	  var record = this
	    , promise;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  setTimeout(function(){
	    asap(function(){
	      if(isUnhandled(promise = record.p)){
	        if(cof(process) == 'process'){
	          process.emit('unhandledRejection', value, promise);
	        } else if(global.console && isFunction(console.error)){
	          console.error('Unhandled promise rejection', value);
	        }
	      }
	      record.a = undefined;
	    });
	  }, 1);
	  notify(record);
	}
	function $resolve(value){
	  var record = this
	    , then, wrapper;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      wrapper = {r: record, d: false}; // wrap
	      then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record);
	    }
	  } catch(err){
	    $reject.call(wrapper || {r: record, d: false}, err); // wrap
	  }
	}
	
	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    assertFunction(executor);
	    var record = {
	      p: assert.inst(this, P, PROMISE),       // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false                                // <- handled rejection
	    };
	    $.hide(this, RECORD, record);
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  $.mix(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = assertObject(assertObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   isFunction(onFulfilled) ? onFulfilled : true,
	        fail: isFunction(onRejected)  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = assertFunction(res);
	        react.rej = assertFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      record.s && notify(record);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	cof.set(P, PROMISE);
	species(P);
	species($.core[PROMISE]); // for wrapper
	
	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new (getConstructor(this))(function(res, rej){
	      rej(r);
	    });
	  },
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isObject(x) && RECORD in x && $.getProto(x) === this.prototype
	      ? x : new (getConstructor(this))(function(res){
	        res(x);
	      });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(16)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(1)
	  , $def      = __webpack_require__(2)
	  , setProto  = __webpack_require__(18)
	  , $iter     = __webpack_require__(6)
	  , ITERATOR  = __webpack_require__(5)('iterator')
	  , ITER      = __webpack_require__(7).safe('iter')
	  , step      = $iter.step
	  , assert    = __webpack_require__(3)
	  , isObject  = $.isObject
	  , getProto  = $.getProto
	  , $Reflect  = $.g.Reflect
	  , _apply    = Function.apply
	  , assertObject = assert.obj
	  , _isExtensible = Object.isExtensible || $.isObject
	  , _preventExtensions = Object.preventExtensions || $.it
	  // IE TP has broken Reflect.enumerate
	  , buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));
	
	function Enumerate(iterated){
	  $.set(this, ITER, {o: iterated, k: undefined, i: 0});
	}
	$iter.create(Enumerate, 'Object', function(){
	  var iter = this[ITER]
	    , keys = iter.k
	    , key;
	  if(keys == undefined){
	    iter.k = keys = [];
	    for(key in iter.o)keys.push(key);
	  }
	  do {
	    if(iter.i >= keys.length)return step(1);
	  } while(!((key = keys[iter.i++]) in iter.o));
	  return step(0, key);
	});
	
	var reflect = {
	  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  },
	  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	  construct: function construct(target, argumentsList /*, newTarget*/){
	    var proto    = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype
	      , instance = $.create(isObject(proto) ? proto : Object.prototype)
	      , result   = _apply.call(target, instance, argumentsList);
	    return isObject(result) ? result : instance;
	  },
	  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    assertObject(target);
	    try {
	      $.setDesc(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  },
	  // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = $.getDesc(assertObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  },
	  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	  get: function get(target, propertyKey/*, receiver*/){
	    var receiver = arguments.length < 3 ? target : arguments[2]
	      , desc = $.getDesc(assertObject(target), propertyKey), proto;
	    if(desc)return $.has(desc, 'value')
	      ? desc.value
	      : desc.get === undefined
	        ? undefined
	        : desc.get.call(receiver);
	    return isObject(proto = getProto(target))
	      ? get(proto, propertyKey, receiver)
	      : undefined;
	  },
	  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return $.getDesc(assertObject(target), propertyKey);
	  },
	  // 26.1.8 Reflect.getPrototypeOf(target)
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(assertObject(target));
	  },
	  // 26.1.9 Reflect.has(target, propertyKey)
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  },
	  // 26.1.10 Reflect.isExtensible(target)
	  isExtensible: function isExtensible(target){
	    return _isExtensible(assertObject(target));
	  },
	  // 26.1.11 Reflect.ownKeys(target)
	  ownKeys: __webpack_require__(29),
	  // 26.1.12 Reflect.preventExtensions(target)
	  preventExtensions: function preventExtensions(target){
	    assertObject(target);
	    try {
	      _preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  },
	  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	  set: function set(target, propertyKey, V/*, receiver*/){
	    var receiver = arguments.length < 4 ? target : arguments[3]
	      , ownDesc  = $.getDesc(assertObject(target), propertyKey)
	      , existingDescriptor, proto;
	    if(!ownDesc){
	      if(isObject(proto = getProto(target))){
	        return set(proto, propertyKey, V, receiver);
	      }
	      ownDesc = $.desc(0);
	    }
	    if($.has(ownDesc, 'value')){
	      if(ownDesc.writable === false || !isObject(receiver))return false;
	      existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
	      existingDescriptor.value = V;
	      $.setDesc(receiver, propertyKey, existingDescriptor);
	      return true;
	    }
	    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	  }
	};
	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	if(setProto)reflect.setPrototypeOf = function setPrototypeOf(target, proto){
	  setProto.check(target, proto);
	  try {
	    setProto.set(target, proto);
	    return true;
	  } catch(e){
	    return false;
	  }
	};
	
	$def($def.G, {Reflect: {}});
	
	$def($def.S + $def.F * buggyEnumerate, 'Reflect', {
	  // 26.1.5 Reflect.enumerate(target)
	  enumerate: function enumerate(target){
	    return new Enumerate(assertObject(target));
	  }
	});
	
	$def($def.S, 'Reflect', reflect);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(1)
	  , cof     = __webpack_require__(4)
	  , $RegExp = $.g.RegExp
	  , Base    = $RegExp
	  , proto   = $RegExp.prototype
	  , re      = /a/g
	  // "new" creates a new object
	  , CORRECT_NEW = new $RegExp(re) !== re
	  // RegExp allows a regex with flags as the pattern
	  , ALLOWS_RE_WITH_FLAGS = function(){
	    try {
	      return $RegExp(re, 'i') == '/a/i';
	    } catch(e){ /* empty */ }
	  }();
	if($.FW && $.DESC){
	  if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
	    $RegExp = function RegExp(pattern, flags){
	      var patternIsRegExp  = cof(pattern) == 'RegExp'
	        , flagsIsUndefined = flags === undefined;
	      if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
	      return CORRECT_NEW
	        ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
	        : new Base(patternIsRegExp ? pattern.source : pattern
	          , patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
	    };
	    $.each.call($.getNames(Base), function(key){
	      key in $RegExp || $.setDesc($RegExp, key, {
	        configurable: true,
	        get: function(){ return Base[key]; },
	        set: function(it){ Base[key] = it; }
	      });
	    });
	    proto.constructor = $RegExp;
	    $RegExp.prototype = proto;
	    $.hide($.g, 'RegExp', $RegExp);
	  }
	  // 21.2.5.3 get RegExp.prototype.flags()
	  if(/./g.flags != 'g')$.setDesc(proto, 'flags', {
	    configurable: true,
	    get: __webpack_require__(17)(/^.*\/(\w*)$/, '$1')
	  });
	}
	__webpack_require__(14)($RegExp);

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(23);
	
	// 23.2 Set Objects
	__webpack_require__(12)('Set', {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(2)
	  , $at  = __webpack_require__(19)(false);
	$def($def.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(1)
	  , cof  = __webpack_require__(4)
	  , $def = __webpack_require__(2)
	  , toLength = $.toLength;
	
	// should throw error on regex
	$def($def.P + $def.F * !__webpack_require__(20)(function(){ 'q'.endsWith(/./); }), 'String', {
	  // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    if(cof(searchString) == 'RegExp')throw TypeError();
	    var that = String($.assertDefined(this))
	      , endPosition = arguments[1]
	      , len = toLength(that.length)
	      , end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
	    searchString += '';
	    return that.slice(end - searchString.length, end) === searchString;
	  }
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var $def    = __webpack_require__(2)
	  , toIndex = __webpack_require__(1).toIndex
	  , fromCharCode = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res = []
	      , len = arguments.length
	      , i   = 0
	      , code;
	    while(len > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(1)
	  , cof  = __webpack_require__(4)
	  , $def = __webpack_require__(2);
	
	$def($def.P, 'String', {
	  // 21.1.3.7 String.prototype.includes(searchString, position = 0)
	  includes: function includes(searchString /*, position = 0 */){
	    if(cof(searchString) == 'RegExp')throw TypeError();
	    return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
	  }
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(1).set
	  , $at   = __webpack_require__(19)(true)
	  , ITER  = __webpack_require__(7).safe('iter')
	  , $iter = __webpack_require__(6)
	  , step  = $iter.step;
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(15)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var $    = __webpack_require__(1)
	  , $def = __webpack_require__(2);
	
	$def($def.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl = $.toObject(callSite.raw)
	      , len = $.toLength(tpl.length)
	      , sln = arguments.length
	      , res = []
	      , i   = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < sln)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var $def = __webpack_require__(2);
	
	$def($def.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(31)
	});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(1)
	  , cof  = __webpack_require__(4)
	  , $def = __webpack_require__(2);
	
	// should throw error on regex
	$def($def.P + $def.F * !__webpack_require__(20)(function(){ 'q'.startsWith(/./); }), 'String', {
	  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    if(cof(searchString) == 'RegExp')throw TypeError();
	    var that  = String($.assertDefined(this))
	      , index = $.toLength(Math.min(arguments[1], that.length));
	    searchString += '';
	    return that.slice(index, index + searchString.length) === searchString;
	  }
	});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $        = __webpack_require__(1)
	  , setTag   = __webpack_require__(4).set
	  , uid      = __webpack_require__(7)
	  , $def     = __webpack_require__(2)
	  , keyOf    = __webpack_require__(37)
	  , enumKeys = __webpack_require__(27)
	  , assertObject = __webpack_require__(3).obj
	  , has      = $.has
	  , $create  = $.create
	  , getDesc  = $.getDesc
	  , setDesc  = $.setDesc
	  , desc     = $.desc
	  , getNames = $.getNames
	  , toObject = $.toObject
	  , $Symbol  = $.g.Symbol
	  , setter   = false
	  , TAG      = uid('tag')
	  , HIDDEN   = uid('hidden')
	  , SymbolRegistry = {}
	  , AllSymbols = {}
	  , useNative = $.isFunction($Symbol);
	
	function wrap(tag){
	  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
	  $.DESC && setter && setDesc(Object.prototype, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setDesc(this, tag, desc(1, value));
	    }
	  });
	  return sym;
	}
	
	function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D.enumerable = false;
	    }
	  } return setDesc(it, key, D);
	}
	function defineProperties(it, P){
	  assertObject(it);
	  var keys = enumKeys(P = toObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)defineProperty(it, key = keys[i++], P[key]);
	  return it;
	}
	function create(it, P){
	  return P === undefined ? $create(it) : defineProperties($create(it), P);
	}
	function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	}
	function getOwnPropertyNames(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	}
	function getOwnPropertySymbols(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	}
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(description){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
	    return wrap(uid(description));
	  };
	  $.hide($Symbol.prototype, 'toString', function(){
	    return this[TAG];
	  });
	
	  $.create     = create;
	  $.setDesc    = defineProperty;
	  $.getDesc    = getOwnPropertyDescriptor;
	  $.setDescs   = defineProperties;
	  $.getNames   = getOwnPropertyNames;
	  $.getSymbols = getOwnPropertySymbols;
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	    'species,split,toPrimitive,toStringTag,unscopables'
	  ).split(','), function(it){
	    var sym = __webpack_require__(5)(it);
	    symbolStatics[it] = useNative ? sym : wrap(sym);
	  }
	);
	
	setter = true;
	
	$def($def.G + $def.W, {Symbol: $Symbol});
	
	$def($def.S, 'Symbol', symbolStatics);
	
	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: getOwnPropertySymbols
	});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag($.g.JSON, 'JSON', true);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $         = __webpack_require__(1)
	  , weak      = __webpack_require__(25)
	  , leakStore = weak.leakStore
	  , ID        = weak.ID
	  , WEAK      = weak.WEAK
	  , has       = $.has
	  , isObject  = $.isObject
	  , isFrozen  = Object.isFrozen || $.core.Object.isFrozen
	  , tmp       = {};
	
	// 23.3 WeakMap Objects
	var WeakMap = __webpack_require__(12)('WeakMap', {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(isFrozen(key))return leakStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this[ID]];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if($.FW && new WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var method = WeakMap.prototype[key];
	    WeakMap.prototype[key] = function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && isFrozen(a)){
	        var result = leakStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    };
	  });
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(25);
	
	// 23.4 WeakSet Objects
	__webpack_require__(12)('WeakSet', {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/domenic/Array.prototype.includes
	var $def      = __webpack_require__(2)
	  , $includes = __webpack_require__(22)(true);
	$def($def.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments[1]);
	  }
	});
	__webpack_require__(9)('includes');

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	__webpack_require__(24)('Map');

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $       = __webpack_require__(1)
	  , $def    = __webpack_require__(2)
	  , ownKeys = __webpack_require__(29);
	
	$def($def.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O      = $.toObject(object)
	      , result = {};
	    $.each.call(ownKeys(O), function(key){
	      $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
	    });
	    return result;
	  }
	});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $    = __webpack_require__(1)
	  , $def = __webpack_require__(2);
	function createObjectToArray(isEntries){
	  return function(object){
	    var O      = $.toObject(object)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = Array(length)
	      , key;
	    if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
	    else while(length > i)result[i] = O[keys[i++]];
	    return result;
	  };
	}
	$def($def.S, 'Object', {
	  values:  createObjectToArray(false),
	  entries: createObjectToArray(true)
	});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/kangax/9698100
	var $def = __webpack_require__(2);
	$def($def.S, 'RegExp', {
	  escape: __webpack_require__(17)(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	__webpack_require__(24)('Set');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/mathiasbynens/String.prototype.at
	'use strict';
	var $def = __webpack_require__(2)
	  , $at  = __webpack_require__(19)(true);
	$def($def.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(2)
	  , $pad = __webpack_require__(30);
	$def($def.P, 'String', {
	  lpad: function lpad(n){
	    return $pad(this, n, arguments[1], true);
	  }
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(2)
	  , $pad = __webpack_require__(30);
	$def($def.P, 'String', {
	  rpad: function rpad(n){
	    return $pad(this, n, arguments[1], false);
	  }
	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// JavaScript 1.6 / Strawman array statics shim
	var $       = __webpack_require__(1)
	  , $def    = __webpack_require__(2)
	  , $Array  = $.core.Array || Array
	  , statics = {};
	function setStatics(keys, length){
	  $.each.call(keys.split(','), function(key){
	    if(length == undefined && key in $Array)statics[key] = $Array[key];
	    else if(key in [])statics[key] = __webpack_require__(8)(Function.call, [][key], length);
	  });
	}
	setStatics('pop,reverse,shift,keys,values,entries', 1);
	setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	           'reduce,reduceRight,copyWithin,fill,turn');
	$def($def.S, 'Array', statics);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33);
	var $           = __webpack_require__(1)
	  , Iterators   = __webpack_require__(6).Iterators
	  , ITERATOR    = __webpack_require__(5)('iterator')
	  , ArrayValues = Iterators.Array
	  , NodeList    = $.g.NodeList;
	if($.FW && NodeList && !(ITERATOR in NodeList.prototype)){
	  $.hide(NodeList.prototype, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = ArrayValues;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var $def  = __webpack_require__(2)
	  , $task = __webpack_require__(32);
	$def($def.G + $def.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var $         = __webpack_require__(1)
	  , $def      = __webpack_require__(2)
	  , invoke    = __webpack_require__(13)
	  , partial   = __webpack_require__(38)
	  , navigator = $.g.navigator
	  , MSIE      = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	function wrap(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      $.isFunction(fn) ? fn : Function(fn)
	    ), time);
	  } : set;
	}
	$def($def.G + $def.B + $def.F * MSIE, {
	  setTimeout:  wrap($.g.setTimeout),
	  setInterval: wrap($.g.setInterval)
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	__webpack_require__(70);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(57);
	__webpack_require__(56);
	__webpack_require__(48);
	__webpack_require__(47);
	__webpack_require__(51);
	__webpack_require__(52);
	__webpack_require__(50);
	__webpack_require__(64);
	__webpack_require__(67);
	__webpack_require__(66);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(65);
	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(33);
	__webpack_require__(46);
	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(43);
	__webpack_require__(42);
	__webpack_require__(60);
	__webpack_require__(58);
	__webpack_require__(49);
	__webpack_require__(61);
	__webpack_require__(71);
	__webpack_require__(72);
	__webpack_require__(59);
	__webpack_require__(73);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(77);
	__webpack_require__(75);
	__webpack_require__(76);
	__webpack_require__(74);
	__webpack_require__(78);
	__webpack_require__(82);
	__webpack_require__(85);
	__webpack_require__(84);
	__webpack_require__(83);
	module.exports = __webpack_require__(1).core;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	
	    generator._invoke = makeInvokeMethod(
	      innerFn, self || null,
	      new Context(tryLocsList || [])
	    );
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    genFun.__proto__ = GeneratorFunctionPrototype;
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    return new Promise(function(resolve, reject) {
	      var generator = wrap(innerFn, outerFn, self, tryLocsList);
	      var callNext = step.bind(generator, "next");
	      var callThrow = step.bind(generator, "throw");
	
	      function step(method, arg) {
	        var record = tryCatch(generator[method], generator, arg);
	        if (record.type === "throw") {
	          reject(record.arg);
	          return;
	        }
	
	        var info = record.arg;
	        if (info.done) {
	          resolve(info.value);
	        } else {
	          Promise.resolve(info.value).then(callNext, callThrow);
	        }
	      }
	
	      callNext();
	    });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            delete context.sent;
	          }
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  function defineGeneratorMethod(method) {
	    Gp[method] = function(arg) {
	      return this._invoke(method, arg);
	    };
	  }
	  defineGeneratorMethod("next");
	  defineGeneratorMethod("throw");
	  defineGeneratorMethod("return");
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset();
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function() {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      // Pre-initialize at least 20 temporary variables to enable hidden
	      // class optimizations for simple generators.
	      for (var tempIndex = 0, tempName;
	           hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20;
	           ++tempIndex) {
	        this[tempName] = null;
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	
	      return ContinueSentinel;
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          return this.complete(entry.completion, entry.afterLoc);
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(34);


/***/ }
/******/ ])
});
;
//# sourceMappingURL=graph.full.js.map