(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
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

	__webpack_require__(75);
	module.exports = __webpack_require__(39);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(18)
	  , hide      = __webpack_require__(16)
	  , redefine  = __webpack_require__(12)
	  , ctx       = __webpack_require__(14)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)redefine(target, key, out);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(3);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(68)('wks')
	  , uid    = __webpack_require__(23)
	  , Symbol = __webpack_require__(6).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(28)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(7)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(1)
	  , core    = __webpack_require__(18)
	  , fails   = __webpack_require__(7);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// add fake Function#toString
	// for correct work wrapped methods / constructors with methods like LoDash isNative
	var global    = __webpack_require__(6)
	  , hide      = __webpack_require__(16)
	  , SRC       = __webpack_require__(23)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(18).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  if(typeof val == 'function'){
	    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    val.hasOwnProperty('name') || hide(val, 'name', key);
	  }
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    hide(O, key, val);
	  }
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(34)
	  , defined = __webpack_require__(15);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(21);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
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
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(2)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(10) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(15);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(5)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(16)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(14)
	  , call        = __webpack_require__(61)
	  , isArrayIter = __webpack_require__(58)
	  , anObject    = __webpack_require__(4)
	  , toLength    = __webpack_require__(9)
	  , getIterFn   = __webpack_require__(72);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(2).setDesc
	  , has = __webpack_require__(8)
	  , TAG = __webpack_require__(5)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(28)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(14)
	  , IObject  = __webpack_require__(34)
	  , toObject = __webpack_require__(19)
	  , toLength = __webpack_require__(9)
	  , asc      = __webpack_require__(78);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(17)
	  , TAG = __webpack_require__(5)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(6)
	  , $export        = __webpack_require__(1)
	  , redefine       = __webpack_require__(12)
	  , redefineAll    = __webpack_require__(35)
	  , forOf          = __webpack_require__(24)
	  , strictNew      = __webpack_require__(37)
	  , isObject       = __webpack_require__(3)
	  , fails          = __webpack_require__(7)
	  , $iterDetect    = __webpack_require__(43)
	  , setToStringTag = __webpack_require__(26);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO;
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        strictNew(target, C, NAME);
	        var that = new Base;
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    IS_WEAK || instance.forEach(function(val, key){
	      BUGGY_ZERO = 1 / key === -Infinity;
	    });
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(16)
	  , redefine = __webpack_require__(12)
	  , fails    = __webpack_require__(7)
	  , defined  = __webpack_require__(15)
	  , wks      = __webpack_require__(5);
	
	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , original = ''[KEY];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, exec(defined, SYMBOL, original));
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return original.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return original.call(string, this); }
	    );
	  }
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
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
	  } return              fn.apply(that, args);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(17);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(12);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(6)
	  , $           = __webpack_require__(2)
	  , DESCRIPTORS = __webpack_require__(10)
	  , SPECIES     = __webpack_require__(5)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(1)
	  , defined = __webpack_require__(15)
	  , fails   = __webpack_require__(7)
	  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');
	
	var exporter = function(KEY, exec){
	  var exp  = {};
	  exp[KEY] = exec(trim);
	  $export($export.P + $export.F * fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  }), 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};
	
	module.exports = exporter;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Symbols for private members /////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var _bind = Function.prototype.bind;
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	var _get = function get(_x9, _x10, _x11) { var _again = true; _function: while (_again) { var object = _x9, property = _x10, receiver = _x11; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x9 = parent; _x10 = property; _x11 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _vertices = Symbol("vertices");
	var _edges = Symbol("edges");
	var _reverseEdges = Symbol("reverse edges");
	var _sources = Symbol("sources");
	var _sinks = Symbol("sinks");
	var _edgeCount = Symbol("edge count");
	
	var _listeners = Symbol("listeners");
	var _trigger = Symbol("trigger");
	
	var _verticesFrom = Symbol("vertices from");
	var _verticesTo = Symbol("vertices to");
	var _verticesWithPathTo = Symbol("vertices with path to");
	var _verticesWithPathFrom = Symbol("vertices with path from");
	var _paths = Symbol("paths");
	
	var _expectVertices = Symbol("expect vertices");
	var _expectVerticesAbsent = Symbol("expect vertex absent");
	var _expectEdges = Symbol("expect edge");
	var _expectEdgesAbsent = Symbol("expect edge absent");
	var _expectNoConnectedEdges = Symbol("expect no connected edges");
	
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
			_classCallCheck(this, Graph);
	
			/* storage */
			this[_vertices] = new Map(); // Map.< string, * >
			this[_edges] = new Map(); // Map.< string, Map.<string, *> >
	
			/* bookkeeping */
			this[_reverseEdges] = new Map(); // Map.< string, Set.<*> >
			this[_sources] = new Set(); // Set.< string >
			this[_sinks] = new Set(); // Set.< string >
			this[_edgeCount] = 0;
	
			/* listeners */
			this[_listeners] = new Map();
	
			/* add vertices and values from constructor arguments */
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
					parts[_key] = arguments[_key];
				}
	
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
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	
		//  ////////////////////////////////////////////////////////////////////////////////////////////////
		//  // Errors //////////////////////////////////////////////////////////////////////////////////////
		//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
		/**
	  * @class
	  * @classdesc This type of error is thrown when specific vertices are expected not to exist, but do.
	  * @extends Error
	  */
	
		/////////////////////////////////////
		////////// Event Handling //////////
		/////////////////////////////////////
	
		/**
	  * Register an event handler.
	  * @param event   {string}   the event to listen for
	  * @param handler {Function} the function to call for each such event fired, receiving its corresponding value
	  */
	
		_createClass(Graph, [{
			key: "on",
			value: function on(event, handler) {
				if (!this[_listeners].has(event)) {
					this[_listeners].set(event, new Set());
				}
				this[_listeners].get(event).add(handler);
			}
	
			/**
	   * Deregister a previously registered event handler.
	   * @param event   {string}   the event used to originally register a handler
	   * @param handler {Function} the handler originally registered
	   */
		}, {
			key: "off",
			value: function off(event, handler) {
				if (this[_listeners].has(event)) {
					this[_listeners].get(event)["delete"](handler);
				}
			}
		}, {
			key: _trigger,
			value: function value(event, _value) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = (this[_listeners].get(event) || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var handler = _step2.value;
	
						handler(_value);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
	
			/**
	   * An event that is triggered just after a vertex is added to this graph.
	   * Handlers receive the new vertex `[key, value]` as an argument.
	   * @event vertex-added
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
			/**
	   * An event that is triggered just after a vertex is removed from this graph.
	   * Handlers receive the vertex key as an argument.
	   * @event vertex-removed
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
			/**
	   * An event that is triggered after a vertex in this graph is modified.
	   * It is also triggered after any {@link #Graph#event_vertex-added|"vertex-added"} event.
	   * Handlers receive the vertex `[key, value]` as an argument.
	   * @event vertex-modified
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
			/**
	   * An event that is triggered just after an edge is added to this graph.
	   * Handlers receive the new edge `[[from, to], value]` as an argument.
	   * @event edge-added
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
			/**
	   * An event that is triggered just after an edge is removed from this graph.
	   * Handlers receive the edge key `[from, to]` as an argument.
	   * @event edge-removed
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
			/**
	   * An event that is triggered after an edge in this graph is modified.
	   * It is also triggered after any {@link #Graph#event_edge-added|"edge-added"} event.
	   * Handlers receive the edge `[[from, to], value]` as an argument.
	   * @event edge-modified
	   * @memberof Graph
	   * @instance
	   * @see {@link Graph#on}
	   * @see {@link Graph#off}
	   */
	
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
		}, {
			key: "addNewVertex",
			value: function addNewVertex(key, value) {
				this[_expectVerticesAbsent](key);
				this[_vertices].set(key, value);
				this[_edges].set(key, new Map());
				this[_reverseEdges].set(key, new Set());
				this[_sources].add(key);
				this[_sinks].add(key);
				this[_trigger]('vertex-added', [key, value]);
				this[_trigger]('vertex-modified', [key, value]);
			}
	
			/**
	   * Set the value of an existing vertex in this graph.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param  key    {string} the key belonging to the vertex
	   * @param [value] {*}      the value to store in this vertex
	   */
		}, {
			key: "setVertex",
			value: function setVertex(key, value) {
				this[_expectVertices](key);
				this[_vertices].set(key, value);
				this[_trigger]('vertex-modified', [key, value]);
			}
	
			/**
	   * Make sure a vertex with a specific key exists in this graph. If it already exists,
	   * do nothing. If it does not yet exist, add a new vertex with the given value.
	   * @param  key    {string} the key for the vertex
	   * @param [value] {*}      the value to store if a new vertex is added
	   */
		}, {
			key: "ensureVertex",
			value: function ensureVertex(key, value) {
				if (!this.hasVertex(key)) {
					this.addNewVertex(key, value);
				}
			}
	
			/**
	   * Add a new vertex to this graph. If a vertex with this key already exists,
	   * the value of that vertex is overwritten.
	   * @param  key    {string} the key with which to refer to this new vertex
	   * @param [value] {*}      the value to store in this new vertex
	   */
		}, {
			key: "addVertex",
			value: function addVertex(key, value) {
				if (this.hasVertex(key)) {
					this.setVertex(key, value);
				} else {
					this.addNewVertex(key, value);
				}
			}
	
			////////// removing them //////////
	
			/**
	   * Remove an existing vertex from this graph.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
		}, {
			key: "removeExistingVertex",
			value: function removeExistingVertex(key) {
				this[_expectVertices](key);
				this[_expectNoConnectedEdges](key);
				this[_vertices]["delete"](key);
				this[_sources]["delete"](key);
				this[_sinks]["delete"](key);
				this[_trigger]('vertex-removed', key);
			}
	
			/**
	   * Remove an existing vertex from this graph, as well as all edges connected to it.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to remove
	   */
		}, {
			key: "destroyExistingVertex",
			value: function destroyExistingVertex(key) {
				this[_expectVertices](key);
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;
	
				try {
					for (var _iterator3 = this.verticesFrom(key)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var _step3$value = _slicedToArray(_step3.value, 1);
	
						var to = _step3$value[0];
						this.removeEdge(key, to);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
							_iterator3["return"]();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
	
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;
	
				try {
					for (var _iterator4 = this.verticesTo(key)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var _step4$value = _slicedToArray(_step4.value, 1);
	
						var from = _step4$value[0];
						this.removeEdge(from, key);
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
							_iterator4["return"]();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}
	
				this.removeExistingVertex(key);
			}
	
			/**
	   * Remove an existing vertex from this graph.
	   * If a vertex with this key does not exist, nothing happens.
	   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
		}, {
			key: "removeVertex",
			value: function removeVertex(key) {
				if (this.hasVertex(key)) {
					this.removeExistingVertex(key);
				}
			}
	
			/**
	   * Remove a vertex from this graph, as well as all edges connected to it.
	   * If a vertex with this key does not exist, nothing happens.
	   * @param key {string} the key of the vertex to remove
	   */
		}, {
			key: "destroyVertex",
			value: function destroyVertex(key) {
				if (this.hasVertex(key)) {
					this.destroyExistingVertex(key);
				}
			}
	
			////////// querying them //////////
	
			/**
	   * @returns {number} the number of vertices in the whole graph
	   */
		}, {
			key: "vertexCount",
			value: function vertexCount() {
				return this[_vertices].size;
			}
	
			/**
	   * Ask whether a vertex with a given key exists.
	   * @param key {string} the key to query
	   * @returns {boolean} whether there is a vertex with the given key
	   */
		}, {
			key: "hasVertex",
			value: function hasVertex(key) {
				return this[_vertices].has(key);
			}
	
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
		}, {
			key: "vertexValue",
			value: function vertexValue(key) {
				return this[_vertices].get(key);
			}
	
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
		}, {
			key: "addNewEdge",
			value: function addNewEdge(from, to, value) {
				this[_expectEdgesAbsent]([from, to]);
				this[_expectVertices](from, to);
				this[_edges].get(from).set(to, value);
				this[_reverseEdges].get(to).add(from);
				this[_edgeCount] += 1;
				this[_sources]["delete"](to);
				this[_sinks]["delete"](from);
				this[_trigger]('edge-added', [[from, to], value]);
				this[_trigger]('edge-modified', [[from, to], value]);
			}
	
			/**
	   * Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
		}, {
			key: "createNewEdge",
			value: function createNewEdge(from, to, value) {
				this[_expectEdgesAbsent]([from, to]);
				this.ensureVertex(from);
				this.ensureVertex(to);
				this.addNewEdge(from, to, value);
			}
	
			/**
	   * Set the value of an existing edge in this graph.
	   * @throws {Graph.EdgeNotExistsError} if an edge between `from` and `to` does not yet exist
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this edge
	   */
		}, {
			key: "setEdge",
			value: function setEdge(from, to, value) {
				this[_expectEdges]([from, to]);
				this[_edges].get(from).set(to, value);
				this[_trigger]('edge-modified', [[from, to], value]);
			}
	
			/**
	   * Make sure an edge between the `from` and `to` vertices in this graph.
	   * If one already exists, nothing is done.
	   * If one does not yet exist, a new edge is added with the given value.
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
	   */
		}, {
			key: "spanEdge",
			value: function spanEdge(from, to, value) {
				this[_expectVertices](from, to);
				if (!this.hasEdge(from, to)) {
					this.addNewEdge(from, to, value);
				}
			}
	
			/**
	   * Add a new edge to this graph. If an edge between `from` and `to` already exists,
	   * the value of that edge is overwritten.
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
		}, {
			key: "addEdge",
			value: function addEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.addNewEdge(from, to, value);
				}
			}
	
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
		}, {
			key: "ensureEdge",
			value: function ensureEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					this.createNewEdge(from, to, value);
				}
			}
	
			/**
	   * Add a new edge to this graph. If an edge between the `from` and `to`
	   * vertices already exists, the value of that edge is overwritten.
	   * If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
	   */
		}, {
			key: "createEdge",
			value: function createEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.createNewEdge(from, to, value);
				}
			}
	
			////////// removing them //////////
	
			/**
	   * Remove an existing edge from this graph.
	   * @throws {Graph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
		}, {
			key: "removeExistingEdge",
			value: function removeExistingEdge(from, to) {
				this[_expectEdges]([from, to]);
				this[_edges].get(from)["delete"](to);
				this[_reverseEdges].get(to)["delete"](from);
				this[_edgeCount] -= 1;
				if (this.inDegree(to) === 0) {
					this[_sources].add(to);
				}
				if (this.outDegree(from) === 0) {
					this[_sinks].add(from);
				}
				this[_trigger]('edge-removed', [from, to]);
			}
	
			/**
	   * Remove an edge from this graph.
	   * If an edge between the `from` and `to` vertices doesn't exist, nothing happens.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
		}, {
			key: "removeEdge",
			value: function removeEdge(from, to) {
				if (this.hasEdge(from, to)) {
					this.removeExistingEdge(from, to);
				}
			}
	
			////////// querying them //////////
	
			/**
	   * @returns {number} the number of edges in the whole graph
	   */
		}, {
			key: "edgeCount",
			value: function edgeCount() {
				return this[_edgeCount];
			}
	
			/**
	   * Ask whether an edge between given `from` and `to` vertices exist.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   * @returns {boolean} whether there is an edge between the given `from` and `to` vertices
	   */
		}, {
			key: "hasEdge",
			value: function hasEdge(from, to) {
				return this.hasVertex(from) && this.hasVertex(to) && this[_edges].has(from) && this[_edges].get(from).has(to);
			}
	
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
		}, {
			key: "edgeValue",
			value: function edgeValue(from, to) {
				return this.hasEdge(from, to) ? this[_edges].get(from).get(to) : undefined;
			}
	
			///////////////////////////////////////////////
			//////////// ES6 Iterable interfaces //////////
			///////////////////////////////////////////////
	
			/**
	   * Iterate over all vertices of the graph, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.vertices(), kv; !(kv = it.next()).done;) {
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
		}, {
			key: "vertices",
			value: regeneratorRuntime.mark(function vertices() {
				var done, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _step5$value, key, value;
	
				return regeneratorRuntime.wrap(function vertices$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion5 = true;
							_didIteratorError5 = false;
							_iteratorError5 = undefined;
							context$2$0.prev = 4;
							_iterator5 = this[_vertices][Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
								context$2$0.next = 17;
								break;
							}
	
							_step5$value = _slicedToArray(_step5.value, 2);
							key = _step5$value[0];
							value = _step5$value[1];
	
							if (!(this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 14;
								break;
							}
	
							done.add(key);
							context$2$0.next = 14;
							return [key, value];
	
						case 14:
							_iteratorNormalCompletion5 = true;
							context$2$0.next = 6;
							break;
	
						case 17:
							context$2$0.next = 23;
							break;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError5 = true;
							_iteratorError5 = context$2$0.t0;
	
						case 23:
							context$2$0.prev = 23;
							context$2$0.prev = 24;
	
							if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
								_iterator5["return"]();
							}
	
						case 26:
							context$2$0.prev = 26;
	
							if (!_didIteratorError5) {
								context$2$0.next = 29;
								break;
							}
	
							throw _iteratorError5;
	
						case 29:
							return context$2$0.finish(26);
	
						case 30:
							return context$2$0.finish(23);
	
						case 31:
						case "end":
							return context$2$0.stop();
					}
				}, vertices, this, [[4, 19, 23, 31], [24,, 26, 30]]);
			})
	
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
		}, {
			key: Symbol.iterator,
			value: function value() {
				return this.vertices();
			}
	
			/**
	   * Iterate over all edges of the graph, in no particular order.
	   * @returns { Iterator.<string, string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.edges(), kv; !(kv = it.next()).done;) {
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
		}, {
			key: "edges",
			value: regeneratorRuntime.mark(function edges() {
				var done, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, from, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, to;
	
				return regeneratorRuntime.wrap(function edges$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Map();
							_iteratorNormalCompletion6 = true;
							_didIteratorError6 = false;
							_iteratorError6 = undefined;
							context$2$0.prev = 4;
							_iterator6 = this[_edges].keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
								context$2$0.next = 40;
								break;
							}
	
							from = _step6.value;
	
							done.set(from, new Set());
							_iteratorNormalCompletion7 = true;
							_didIteratorError7 = false;
							_iteratorError7 = undefined;
							context$2$0.prev = 12;
							_iterator7 = this[_edges].get(from).keys()[Symbol.iterator]();
	
						case 14:
							if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
								context$2$0.next = 23;
								break;
							}
	
							to = _step7.value;
	
							if (!(this.hasEdge(from, to) && !done.get(from).has(to))) {
								context$2$0.next = 20;
								break;
							}
	
							done.get(from).add(to);
							context$2$0.next = 20;
							return [from, to, this[_edges].get(from).get(to)];
	
						case 20:
							_iteratorNormalCompletion7 = true;
							context$2$0.next = 14;
							break;
	
						case 23:
							context$2$0.next = 29;
							break;
	
						case 25:
							context$2$0.prev = 25;
							context$2$0.t0 = context$2$0["catch"](12);
							_didIteratorError7 = true;
							_iteratorError7 = context$2$0.t0;
	
						case 29:
							context$2$0.prev = 29;
							context$2$0.prev = 30;
	
							if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
								_iterator7["return"]();
							}
	
						case 32:
							context$2$0.prev = 32;
	
							if (!_didIteratorError7) {
								context$2$0.next = 35;
								break;
							}
	
							throw _iteratorError7;
	
						case 35:
							return context$2$0.finish(32);
	
						case 36:
							return context$2$0.finish(29);
	
						case 37:
							_iteratorNormalCompletion6 = true;
							context$2$0.next = 6;
							break;
	
						case 40:
							context$2$0.next = 46;
							break;
	
						case 42:
							context$2$0.prev = 42;
							context$2$0.t1 = context$2$0["catch"](4);
							_didIteratorError6 = true;
							_iteratorError6 = context$2$0.t1;
	
						case 46:
							context$2$0.prev = 46;
							context$2$0.prev = 47;
	
							if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
								_iterator6["return"]();
							}
	
						case 49:
							context$2$0.prev = 49;
	
							if (!_didIteratorError6) {
								context$2$0.next = 52;
								break;
							}
	
							throw _iteratorError6;
	
						case 52:
							return context$2$0.finish(49);
	
						case 53:
							return context$2$0.finish(46);
	
						case 54:
						case "end":
							return context$2$0.stop();
					}
				}, edges, this, [[4, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
			})
	
			/**
	   * Iterate over the outgoing edges of a given vertex in the graph, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the outgoing edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesFrom(from), kv; !(kv = it.next()).done;) {
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
		}, {
			key: "verticesFrom",
			value: function verticesFrom(from) {
				this[_expectVertices](from);
				return this[_verticesFrom](from);
			}
		}, {
			key: _verticesFrom,
			value: regeneratorRuntime.mark(function value(from) {
				var done, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, to;
	
				return regeneratorRuntime.wrap(function value$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion8 = true;
							_didIteratorError8 = false;
							_iteratorError8 = undefined;
							context$2$0.prev = 4;
							_iterator8 = this[_edges].get(from).keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step8.value;
	
							if (!(this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 12;
							return [to, this[_vertices].get(to), this[_edges].get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion8 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError8 = true;
							_iteratorError8 = context$2$0.t0;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
								_iterator8["return"]();
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
						case "end":
							return context$2$0.stop();
					}
				}, value, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over the incoming edges of a given vertex in the graph, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the incoming edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesTo(to), kv; !(kv = it.next()).done;) {
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
		}, {
			key: "verticesTo",
			value: function verticesTo(to) {
				this[_expectVertices](to);
				return this[_verticesTo](to);
			}
		}, {
			key: _verticesTo,
			value: regeneratorRuntime.mark(function value(to) {
				var done, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, from;
	
				return regeneratorRuntime.wrap(function value$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion9 = true;
							_didIteratorError9 = false;
							_iteratorError9 = undefined;
							context$2$0.prev = 4;
							_iterator9 = this[_reverseEdges].get(to)[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step9.value;
	
							if (!(this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 12;
							return [from, this[_vertices].get(from), this[_edges].get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion9 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError9 = true;
							_iteratorError9 = context$2$0.t0;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
								_iterator9["return"]();
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
						case "end":
							return context$2$0.stop();
					}
				}, value, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over all vertices reachable from a given vertex in the graph, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesWithPathFrom(from), kv; !(kv = it.next()).done;) {
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
		}, {
			key: "verticesWithPathFrom",
			value: function verticesWithPathFrom(from) {
				this[_expectVertices](from);
				return this[_verticesWithPathFrom](from, new Set());
			}
		}, {
			key: _verticesWithPathFrom,
			value: regeneratorRuntime.mark(function value(from, done) {
				var _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, to;
	
				return regeneratorRuntime.wrap(function value$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion10 = true;
							_didIteratorError10 = false;
							_iteratorError10 = undefined;
							context$2$0.prev = 3;
							_iterator10 = this[_edges].get(from).keys()[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step10.value;
	
							if (!(this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 11;
							return [to, this[_vertices].get(to)];
	
						case 11:
							return context$2$0.delegateYield(this[_verticesWithPathFrom](to, done), "t0", 12);
	
						case 12:
							_iteratorNormalCompletion10 = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t1 = context$2$0["catch"](3);
							_didIteratorError10 = true;
							_iteratorError10 = context$2$0.t1;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
								_iterator10["return"]();
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
						case "end":
							return context$2$0.stop();
					}
				}, value, this, [[3, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesWithPathTo(to), kv; !(kv = it.next()).done;) {
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
		}, {
			key: "verticesWithPathTo",
			value: function verticesWithPathTo(to) {
				this[_expectVertices](to);
				return this[_verticesWithPathTo](to, new Set());
			}
		}, {
			key: _verticesWithPathTo,
			value: regeneratorRuntime.mark(function value(to, done) {
				var _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, from;
	
				return regeneratorRuntime.wrap(function value$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion11 = true;
							_didIteratorError11 = false;
							_iteratorError11 = undefined;
							context$2$0.prev = 3;
							_iterator11 = this[_reverseEdges].get(to)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step11.value;
	
							if (!(this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 11;
							return [from, this[_vertices].get(from)];
	
						case 11:
							return context$2$0.delegateYield(this[_verticesWithPathTo](from, done), "t0", 12);
	
						case 12:
							_iteratorNormalCompletion11 = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t1 = context$2$0["catch"](3);
							_didIteratorError11 = true;
							_iteratorError11 = context$2$0.t1;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
								_iterator11["return"]();
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
						case "end":
							return context$2$0.stop();
					}
				}, value, this, [[3, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over all vertices that have no incoming edges, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.sources(), kv; !(kv = it.next()).done;) {
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
		}, {
			key: "sources",
			value: regeneratorRuntime.mark(function sources() {
				var done, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, key;
	
				return regeneratorRuntime.wrap(function sources$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion12 = true;
							_didIteratorError12 = false;
							_iteratorError12 = undefined;
							context$2$0.prev = 4;
							_iterator12 = this[_sources][Symbol.iterator]();
	
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
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError12 = true;
							_iteratorError12 = context$2$0.t0;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
								_iterator12["return"]();
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
						case "end":
							return context$2$0.stop();
					}
				}, sources, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over all vertices that have no outgoing edges, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.sinks(), kv; !(kv = it.next()).done;) {
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
		}, {
			key: "sinks",
			value: regeneratorRuntime.mark(function sinks() {
				var done, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, key;
	
				return regeneratorRuntime.wrap(function sinks$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion13 = true;
							_didIteratorError13 = false;
							_iteratorError13 = undefined;
							context$2$0.prev = 4;
							_iterator13 = this[_sinks][Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							key = _step13.value;
	
							if (!(this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(key);
							context$2$0.next = 12;
							return [key, this.vertexValue(key)];
	
						case 12:
							_iteratorNormalCompletion13 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError13 = true;
							_iteratorError13 = context$2$0.t0;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
								_iterator13["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError13) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError13;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, sinks, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
	
			/**
	   * Iterate over all vertices of the graph in topological order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.vertices_topologically(), kv; !(kv = it.next()).done;) {
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
		}, {
			key: "vertices_topologically",
			value: regeneratorRuntime.mark(function vertices_topologically() {
				var marked2$0, visited, handled, _this, visit, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, _step15$value, a;
	
				return regeneratorRuntime.wrap(function vertices_topologically$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							visit = function visit(a) {
								var i, cycle, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, _step14$value, b;
	
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
	
											_iteratorNormalCompletion14 = true;
											_didIteratorError14 = false;
											_iteratorError14 = undefined;
											context$3$0.prev = 9;
											_iterator14 = _this.verticesTo(a)[Symbol.iterator]();
	
										case 11:
											if (_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done) {
												context$3$0.next = 18;
												break;
											}
	
											_step14$value = _slicedToArray(_step14.value, 1);
											b = _step14$value[0];
											return context$3$0.delegateYield(visit(b), "t0", 15);
	
										case 15:
											_iteratorNormalCompletion14 = true;
											context$3$0.next = 11;
											break;
	
										case 18:
											context$3$0.next = 24;
											break;
	
										case 20:
											context$3$0.prev = 20;
											context$3$0.t1 = context$3$0["catch"](9);
											_didIteratorError14 = true;
											_iteratorError14 = context$3$0.t1;
	
										case 24:
											context$3$0.prev = 24;
											context$3$0.prev = 25;
	
											if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
												_iterator14["return"]();
											}
	
										case 27:
											context$3$0.prev = 27;
	
											if (!_didIteratorError14) {
												context$3$0.next = 30;
												break;
											}
	
											throw _iteratorError14;
	
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
											return [a, _this[_vertices].get(a)];
	
										case 35:
											handled.add(a);
	
										case 36:
											visited.pop();
	
										case 37:
										case "end":
											return context$3$0.stop();
									}
								}, marked2$0[0], this, [[9, 20, 24, 32], [25,, 27, 31]]);
							};
	
							marked2$0 = [visit].map(regeneratorRuntime.mark);
							visited = [];
							handled = new Set();
							_this = this;
							_iteratorNormalCompletion15 = true;
							_didIteratorError15 = false;
							_iteratorError15 = undefined;
							context$2$0.prev = 8;
							_iterator15 = this.vertices()[Symbol.iterator]();
	
						case 10:
							if (_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done) {
								context$2$0.next = 18;
								break;
							}
	
							_step15$value = _slicedToArray(_step15.value, 1);
							a = _step15$value[0];
	
							if (handled.has(a)) {
								context$2$0.next = 15;
								break;
							}
	
							return context$2$0.delegateYield(visit(a), "t0", 15);
	
						case 15:
							_iteratorNormalCompletion15 = true;
							context$2$0.next = 10;
							break;
	
						case 18:
							context$2$0.next = 24;
							break;
	
						case 20:
							context$2$0.prev = 20;
							context$2$0.t1 = context$2$0["catch"](8);
							_didIteratorError15 = true;
							_iteratorError15 = context$2$0.t1;
	
						case 24:
							context$2$0.prev = 24;
							context$2$0.prev = 25;
	
							if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
								_iterator15["return"]();
							}
	
						case 27:
							context$2$0.prev = 27;
	
							if (!_didIteratorError15) {
								context$2$0.next = 30;
								break;
							}
	
							throw _iteratorError15;
	
						case 30:
							return context$2$0.finish(27);
	
						case 31:
							return context$2$0.finish(24);
	
						case 32:
						case "end":
							return context$2$0.stop();
					}
				}, vertices_topologically, this, [[8, 20, 24, 32], [25,, 27, 31]]);
			})
	
			//////////////////////////////
			////////// Clearing //////////
			//////////////////////////////
	
			/**
	   * Remove all edges from the graph, but leave the vertices intact.
	   */
		}, {
			key: "clearEdges",
			value: function clearEdges() {
				var _iteratorNormalCompletion16 = true;
				var _didIteratorError16 = false;
				var _iteratorError16 = undefined;
	
				try {
					for (var _iterator16 = this.edges()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
						var _step16$value = _slicedToArray(_step16.value, 2);
	
						var from = _step16$value[0];
						var to = _step16$value[1];
						this.removeEdge(from, to);
					}
				} catch (err) {
					_didIteratorError16 = true;
					_iteratorError16 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion16 && _iterator16["return"]) {
							_iterator16["return"]();
						}
					} finally {
						if (_didIteratorError16) {
							throw _iteratorError16;
						}
					}
				}
			}
	
			/**
	   * Remove all edges and vertices from the graph, putting it back in its initial state.
	   */
		}, {
			key: "clear",
			value: function clear() {
				var _iteratorNormalCompletion17 = true;
				var _didIteratorError17 = false;
				var _iteratorError17 = undefined;
	
				try {
					for (var _iterator17 = this.vertices()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
						var _step17$value = _slicedToArray(_step17.value, 1);
	
						var v = _step17$value[0];
						this.destroyVertex(v);
					}
				} catch (err) {
					_didIteratorError17 = true;
					_iteratorError17 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion17 && _iterator17["return"]) {
							_iterator17["return"]();
						}
					} finally {
						if (_didIteratorError17) {
							throw _iteratorError17;
						}
					}
				}
			}
	
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
		}, {
			key: "equals",
			value: function equals(other) {
				var eqV = arguments.length <= 1 || arguments[1] === undefined ? function (x, y) {
					return x === y;
				} : arguments[1];
				var eqE = arguments.length <= 2 || arguments[2] === undefined ? eqV : arguments[2];
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
					var _iteratorNormalCompletion18 = true;
					var _didIteratorError18 = false;
					var _iteratorError18 = undefined;
	
					try {
						for (var _iterator18 = this.vertices()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
							var _step18$value = _slicedToArray(_step18.value, 2);
	
							var key = _step18$value[0];
							var value = _step18$value[1];
	
							if (!other.hasVertex(key)) {
								return false;
							}
							if (!eqV(value, other.vertexValue(key), key)) {
								return false;
							}
						}
					} catch (err) {
						_didIteratorError18 = true;
						_iteratorError18 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion18 && _iterator18["return"]) {
								_iterator18["return"]();
							}
						} finally {
							if (_didIteratorError18) {
								throw _iteratorError18;
							}
						}
					}
	
					var _iteratorNormalCompletion19 = true;
					var _didIteratorError19 = false;
					var _iteratorError19 = undefined;
	
					try {
						for (var _iterator19 = this.edges()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
							var _step19$value = _slicedToArray(_step19.value, 3);
	
							var from = _step19$value[0];
							var to = _step19$value[1];
							var value = _step19$value[2];
	
							if (!other.hasEdge(from, to)) {
								return false;
							}
							if (!eqE(value, other.edgeValue(from, to), from, to)) {
								return false;
							}
						}
					} catch (err) {
						_didIteratorError19 = true;
						_iteratorError19 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion19 && _iterator19["return"]) {
								_iterator19["return"]();
							}
						} finally {
							if (_didIteratorError19) {
								throw _iteratorError19;
							}
						}
					}
	
					return true;
				}).apply(this, arguments);
			}
	
			/**
	   * Iterate over all simple directed cycles in this graph, in no particular order.
	   * If you mutate the graph in between iterations, behavior of the iterator
	   * becomes unspecified. (So, don't.)
	   * @returns { Iterator.< Array.<string> > }
	   *          an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}.
	   *          Each iterated value is an array containing the vertex keys describing the cycle.
	   *          These arrays will contain each vertex key only once — even the first/last one.
	   * @example
	   * for (var it = graph.cycles(), kv; !(kv = it.next()).done;) {
	   *     var cycle = kv.value;
	   *     // iterates over all cycles of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let cycle of graph.cycles()) {
	   *     // iterates over all cycles of the graph
	   * }
	   */
		}, {
			key: "cycles",
			value: regeneratorRuntime.mark(function cycles() {
				var marked2$0, pointStack, markedStack, mark, _this, backtrack, _iteratorNormalCompletion20, _didIteratorError20, _iteratorError20, _iterator20, _step20, _step20$value, a;
	
				return regeneratorRuntime.wrap(function cycles$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							backtrack = function backtrack(v) {
								var out = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
								var _arr, _i, _arr$_i, w, o, u;
	
								return regeneratorRuntime.wrap(function backtrack$(context$3$0) {
									while (1) switch (context$3$0.prev = context$3$0.next) {
										case 0:
											pointStack.push(v);
											mark.add(v);
											markedStack.push(v);
											_arr = [].concat(_toConsumableArray(_this.verticesFrom(v)));
											_i = 0;
	
										case 5:
											if (!(_i < _arr.length)) {
												context$3$0.next = 23;
												break;
											}
	
											_arr$_i = _slicedToArray(_arr[_i], 1);
											w = _arr$_i[0];
	
											if (!(w < pointStack[0])) {
												context$3$0.next = 10;
												break;
											}
	
											return context$3$0.abrupt("continue", 20);
	
										case 10:
											if (!(w === pointStack[0])) {
												context$3$0.next = 16;
												break;
											}
	
											context$3$0.next = 13;
											return [].concat(pointStack);
	
										case 13:
											out.found = true;
											context$3$0.next = 20;
											break;
	
										case 16:
											if (mark.has(w)) {
												context$3$0.next = 20;
												break;
											}
	
											o = {};
											return context$3$0.delegateYield(backtrack(w, o), "t0", 19);
	
										case 19:
											out.found = out.found || o.found;
	
										case 20:
											_i++;
											context$3$0.next = 5;
											break;
	
										case 23:
											if (out.found) {
												u = undefined;
	
												do {
													u = markedStack.pop();
													mark["delete"](u);
												} while (u !== v);
											}
											pointStack.pop();
	
										case 25:
										case "end":
											return context$3$0.stop();
									}
								}, marked2$0[0], this);
							};
	
							marked2$0 = [backtrack].map(regeneratorRuntime.mark);
							pointStack = [];
							markedStack = undefined, mark = undefined;
							_this = this;
							_iteratorNormalCompletion20 = true;
							_didIteratorError20 = false;
							_iteratorError20 = undefined;
							context$2$0.prev = 8;
							_iterator20 = this.vertices()[Symbol.iterator]();
	
						case 10:
							if (_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done) {
								context$2$0.next = 19;
								break;
							}
	
							_step20$value = _slicedToArray(_step20.value, 1);
							a = _step20$value[0];
	
							markedStack = [];
							mark = new Set();
							return context$2$0.delegateYield(backtrack(a), "t0", 16);
	
						case 16:
							_iteratorNormalCompletion20 = true;
							context$2$0.next = 10;
							break;
	
						case 19:
							context$2$0.next = 25;
							break;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.t1 = context$2$0["catch"](8);
							_didIteratorError20 = true;
							_iteratorError20 = context$2$0.t1;
	
						case 25:
							context$2$0.prev = 25;
							context$2$0.prev = 26;
	
							if (!_iteratorNormalCompletion20 && _iterator20["return"]) {
								_iterator20["return"]();
							}
	
						case 28:
							context$2$0.prev = 28;
	
							if (!_didIteratorError20) {
								context$2$0.next = 31;
								break;
							}
	
							throw _iteratorError20;
	
						case 31:
							return context$2$0.finish(28);
	
						case 32:
							return context$2$0.finish(25);
	
						case 33:
						case "end":
							return context$2$0.stop();
					}
				}, cycles, this, [[8, 21, 25, 33], [26,, 28, 32]]);
			})
	
			/**
	   * Find any directed cycle in this graph.
	   * @returns {?Array} an array containing the vertex keys describing the cycle; `null`, if there is no cycle;
	   *                   The array will contain each vertex key only once — even the first/last one.
	   */
		}, {
			key: "cycle",
			value: function cycle() {
				var result = this.cycles().next();
				return result.done ? null : result.value;
			}
	
			/**
	   * Test whether this graph contains a directed cycle.
	   * @returns {boolean} whether this graph contains any directed cycle
	   */
		}, {
			key: "hasCycle",
			value: function hasCycle() {
				return !this.cycles().next().done;
			}
	
			/**
	   * Iterate over all paths between two given keys in this graph, in no particular order.
	   * If you mutate the graph in between iterations, behavior of the iterator
	   * becomes unspecified. (So, don't.)
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @returns { Iterator.< Array.<string> > }
	   *          an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}.
	   *          Each iterated value is an array containing the vertex-keys describing the path.
	   * @example
	   * for (var it = graph.paths(), kv; !(kv = it.next()).done;) {
	   *     var path = kv.value;
	   *     // iterates over all paths between `from` and `to` in the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let path of graph.paths()) {
	   *     // iterates over all paths between `from` and `to` in the graph
	   * }
	   */
		}, {
			key: "paths",
			value: function paths(from, to) {
				this[_expectVertices](from, to);
				return this[_paths](from, to);
			}
		}, {
			key: _paths,
			value: regeneratorRuntime.mark(function value(from, to) {
				var marked2$0, stack, _this, pathsFromPrefix;
	
				return regeneratorRuntime.wrap(function value$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							pathsFromPrefix = function pathsFromPrefix(current) {
								var _iteratorNormalCompletion21, _didIteratorError21, _iteratorError21, _iterator21, _step21, _step21$value, next;
	
								return regeneratorRuntime.wrap(function pathsFromPrefix$(context$3$0) {
									while (1) switch (context$3$0.prev = context$3$0.next) {
										case 0:
											stack.push(current);
											_iteratorNormalCompletion21 = true;
											_didIteratorError21 = false;
											_iteratorError21 = undefined;
											context$3$0.prev = 4;
											_iterator21 = _this.verticesFrom(current)[Symbol.iterator]();
	
										case 6:
											if (_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done) {
												context$3$0.next = 19;
												break;
											}
	
											_step21$value = _slicedToArray(_step21.value, 1);
											next = _step21$value[0];
	
											if (!(next === to)) {
												context$3$0.next = 14;
												break;
											}
	
											context$3$0.next = 12;
											return [].concat(stack, [to]);
	
										case 12:
											context$3$0.next = 16;
											break;
	
										case 14:
											if (!(stack.indexOf(next) === -1)) {
												context$3$0.next = 16;
												break;
											}
	
											return context$3$0.delegateYield(pathsFromPrefix(next), "t0", 16);
	
										case 16:
											_iteratorNormalCompletion21 = true;
											context$3$0.next = 6;
											break;
	
										case 19:
											context$3$0.next = 25;
											break;
	
										case 21:
											context$3$0.prev = 21;
											context$3$0.t1 = context$3$0["catch"](4);
											_didIteratorError21 = true;
											_iteratorError21 = context$3$0.t1;
	
										case 25:
											context$3$0.prev = 25;
											context$3$0.prev = 26;
	
											if (!_iteratorNormalCompletion21 && _iterator21["return"]) {
												_iterator21["return"]();
											}
	
										case 28:
											context$3$0.prev = 28;
	
											if (!_didIteratorError21) {
												context$3$0.next = 31;
												break;
											}
	
											throw _iteratorError21;
	
										case 31:
											return context$3$0.finish(28);
	
										case 32:
											return context$3$0.finish(25);
	
										case 33:
											stack.pop();
	
										case 34:
										case "end":
											return context$3$0.stop();
									}
								}, marked2$0[0], this, [[4, 21, 25, 33], [26,, 28, 32]]);
							};
	
							marked2$0 = [pathsFromPrefix].map(regeneratorRuntime.mark);
							stack = [];
							_this = this;
							return context$2$0.delegateYield(pathsFromPrefix(from), "t0", 5);
	
						case 5:
						case "end":
							return context$2$0.stop();
					}
				}, value, this);
			})
	
			/**
	   * Find any path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @returns {?Array} an array with the keys of the path found between the two vertices,
	   *                   including those two vertices themselves; `null` if no such path exists
	   */
		}, {
			key: "path",
			value: function path(from, to) {
				var result = this.paths(from, to).next();
				return result.done ? null : result.value;
			}
	
			/**
	   * Test whether there is a directed path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @returns {boolean} whether such a path exists
	   */
		}, {
			key: "hasPath",
			value: function hasPath(from, to) {
				return !this.paths(from, to).next().done;
			}
	
			/**
	   * Get the number of edges going out of a given vertex.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to query
	   * @returns {number} the number of edges going out of the `key` vertex
	   */
		}, {
			key: "outDegree",
			value: function outDegree(key) {
				this[_expectVertices](key);
				return this[_edges].get(key).size;
			}
	
			/**
	   * Get the number of edges coming into a given vertex.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to query
	   * @returns {number} the number of edges coming into the `key` vertex
	   */
		}, {
			key: "inDegree",
			value: function inDegree(key) {
				this[_expectVertices](key);
				return this[_reverseEdges].get(key).size;
			}
	
			/**
	   * Get the number of edges connected to a given vertex.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to query
	   * @returns {number} the number of edges connected to the `key` vertex
	   */
		}, {
			key: "degree",
			value: function degree(key) {
				return this.outDegree(key) + this.inDegree(key);
			}
	
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
		}, {
			key: "mergeIn",
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
	
						this.addVertex(key, mV(this.vertexValue(key), other.vertexValue(key), key));
					}
				} catch (err) {
					_didIteratorError22 = true;
					_iteratorError22 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion22 && _iterator22["return"]) {
							_iterator22["return"]();
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
						if (!_iteratorNormalCompletion23 && _iterator23["return"]) {
							_iterator23["return"]();
						}
					} finally {
						if (_didIteratorError23) {
							throw _iteratorError23;
						}
					}
				}
			}
	
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
		}, {
			key: "clone",
			value: function clone() {
				var trV = arguments.length <= 0 || arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
				var trE = arguments.length <= 1 || arguments[1] === undefined ? trV : arguments[1];
				return (function () {
					var result = new Graph();
					result.mergeIn(this, function (v1, v2, key) {
						return trV(v2, key);
					}, function (v1, v2, from, to) {
						return trE(v2, from, to);
					});
					return result;
				}).apply(this, arguments);
			}
	
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
		}, {
			key: "transitiveReduction",
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
											if (!_iteratorNormalCompletion26 && _iterator26["return"]) {
												_iterator26["return"]();
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
								if (!_iteratorNormalCompletion25 && _iterator25["return"]) {
									_iterator25["return"]();
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
						if (!_iteratorNormalCompletion24 && _iterator24["return"]) {
							_iterator24["return"]();
						}
					} finally {
						if (_didIteratorError24) {
							throw _iteratorError24;
						}
					}
				}
	
				return result;
			}
	
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
		}, {
			key: "contractPaths",
			value: function contractPaths() {
				var _this2 = this;
	
				var isNexus = arguments.length <= 0 || arguments[0] === undefined ? function () {
					return false;
				} : arguments[0];
	
				/* what makes a a vertex a nexus (start/end-point) */
				var nexuses = new Set([].concat(_toConsumableArray(this.vertices())).filter(function (_ref) {
					var _ref2 = _slicedToArray(_ref, 2);
	
					var key = _ref2[0];
					var val = _ref2[1];
					return _this2.outDegree(key) !== 1 || _this2.inDegree(key) !== 1 || isNexus(key, val);
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
						var unhandledVertices = new Set([].concat(_toConsumableArray(_this2.vertices())).map(function (_ref4) {
							var _ref42 = _slicedToArray(_ref4, 1);
	
							var key = _ref42[0];
							return key;
						}));
						var checkForBlCycle = function checkForBlCycle(key) {
							if (!unhandledVertices.has(key)) {
								return;
							}
							unhandledVertices["delete"](key);
							var _iteratorNormalCompletion27 = true;
							var _didIteratorError27 = false;
							var _iteratorError27 = undefined;
	
							try {
								for (var _iterator27 = _this2.verticesFrom(key)[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
									var _step27$value = _slicedToArray(_step27.value, 1);
	
									var next = _step27$value[0];
									checkForBlCycle(next);
								}
							} catch (err) {
								_didIteratorError27 = true;
								_iteratorError27 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion27 && _iterator27["return"]) {
										_iterator27["return"]();
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
								for (var _iterator28 = _this2.verticesTo(key)[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
									var _step28$value = _slicedToArray(_step28.value, 1);
	
									var next = _step28$value[0];
									checkForBlCycle(next);
								}
							} catch (err) {
								_didIteratorError28 = true;
								_iteratorError28 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion28 && _iterator28["return"]) {
										_iterator28["return"]();
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
								if (!_iteratorNormalCompletion29 && _iterator29["return"]) {
									_iterator29["return"]();
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
								current = _this2.verticesFrom(current).next().value[0];
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
						var strt = arguments.length <= 0 || arguments[0] === undefined ? start : arguments[0];
						var nxt = arguments.length <= 1 || arguments[1] === undefined ? next : arguments[1];
						return backwards ? [nxt, strt] : [strt, nxt];
					};
					var verticesNext = function verticesNext(v) {
						return backwards ? _this2.verticesTo(v) : _this2.verticesFrom(v);
					};
	
					/* bookkeeping */
					var verticesToRemove = new Set();
					var edgesToRemove = new Set();
					var path = new Graph();
	
					/* process the start of the path */
					path.addVertex(start, _this2.vertexValue(start));
					path.addVertex(next, _this2.vertexValue(next));
					path.addNewEdge.apply(path, _toConsumableArray(fromTo()).concat([_this2.edgeValue.apply(_this2, _toConsumableArray(fromTo()))]));
					edgesToRemove.add(fromTo());
	
					/* process as [current, next] moves across the path */
					var current = undefined;
					while (!nexuses.has(next)) {
						var _ref5 = [next, verticesNext(next).next().value[0]];
						current = _ref5[0];
						next = _ref5[1];
	
						path.addVertex(next, _this2.vertexValue(next));
						path.addNewEdge.apply(path, _toConsumableArray(fromTo(current, next)).concat([_this2.edgeValue.apply(_this2, _toConsumableArray(fromTo(current, next)))]));
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
							_this2.removeExistingEdge.apply(_this2, _toConsumableArray(key));
						}
					} catch (err) {
						_didIteratorError30 = true;
						_iteratorError30 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion30 && _iterator30["return"]) {
								_iterator30["return"]();
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
							_this2.destroyExistingVertex(key);
						}
					} catch (err) {
						_didIteratorError31 = true;
						_iteratorError31 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion31 && _iterator31["return"]) {
								_iterator31["return"]();
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
								if (!_iteratorNormalCompletion34 && _iterator34["return"]) {
									_iterator34["return"]();
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
								if (!_iteratorNormalCompletion35 && _iterator35["return"]) {
									_iterator35["return"]();
								}
							} finally {
								if (_didIteratorError35) {
									throw _iteratorError35;
								}
							}
						}
					}
	
					/* add the replacement edges */
				} catch (err) {
					_didIteratorError32 = true;
					_iteratorError32 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion32 && _iterator32["return"]) {
							_iterator32["return"]();
						}
					} finally {
						if (_didIteratorError32) {
							throw _iteratorError32;
						}
					}
				}
	
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
								if (!_iteratorNormalCompletion36 && _iterator36["return"]) {
									_iterator36["return"]();
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
						if (!_iteratorNormalCompletion33 && _iterator33["return"]) {
							_iterator33["return"]();
						}
					} finally {
						if (_didIteratorError33) {
							throw _iteratorError33;
						}
					}
				}
			}
	
			///////////////////////////////////
			////////// Serialization //////////
			///////////////////////////////////
	
			/**
	   * Serialize this graph into a JSON string.
	   * The resulting string can be deserialized with `Graph.fromJSON`
	   * @returns {string} a JSON string representation of the current state of this graph
	   * @see {@link Graph.fromJSON}
	   * @example
	   * let json   = graph1.toJSON();
	   * let graph2 = Graph.fromJSON(json);
	   * console.log(graph1.equals(graph2)); // true
	   */
		}, {
			key: "toJSON",
			value: function toJSON() {
				var result = [];
				var _iteratorNormalCompletion37 = true;
				var _didIteratorError37 = false;
				var _iteratorError37 = undefined;
	
				try {
					for (var _iterator37 = this.vertices()[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
						var _step37$value = _slicedToArray(_step37.value, 2);
	
						var key = _step37$value[0];
						var val = _step37$value[1];
	
						if (typeof val === 'undefined') {
							result.push([key]);
						} else {
							result.push([key, val]);
						}
					}
				} catch (err) {
					_didIteratorError37 = true;
					_iteratorError37 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion37 && _iterator37["return"]) {
							_iterator37["return"]();
						}
					} finally {
						if (_didIteratorError37) {
							throw _iteratorError37;
						}
					}
				}
	
				var _iteratorNormalCompletion38 = true;
				var _didIteratorError38 = false;
				var _iteratorError38 = undefined;
	
				try {
					for (var _iterator38 = this.edges()[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
						var _step38$value = _slicedToArray(_step38.value, 3);
	
						var from = _step38$value[0];
						var to = _step38$value[1];
						var val = _step38$value[2];
	
						if (typeof val === 'undefined') {
							result.push([[from, to]]);
						} else {
							result.push([[from, to], val]);
						}
					}
				} catch (err) {
					_didIteratorError38 = true;
					_iteratorError38 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion38 && _iterator38["return"]) {
							_iterator38["return"]();
						}
					} finally {
						if (_didIteratorError38) {
							throw _iteratorError38;
						}
					}
				}
	
				return JSON.stringify(result);
			}
	
			/**
	   * Deserialize a string returned from `.toJSON()`
	   * into a new `Graph` instance equal to the original.
	   * @param json {string} a string originally returned from `.toJSON()`
	   * @returns {Graph} a graph equal to the original
	   * @see {@link Graph#toJSON}
	   * @example
	   * let json   = graph1.toJSON();
	   * let graph2 = Graph.fromJSON(json);
	   * console.log(graph1.equals(graph2)); // true
	   */
		}, {
			key: _expectVertices,
	
			////////////////////////////////
			////////// Assertions //////////
			////////////////////////////////
	
			value: function value() {
				var _this3 = this;
	
				for (var _len2 = arguments.length, keys = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
					keys[_key3] = arguments[_key3];
				}
	
				var missingVertices = keys.filter(function (k) {
					return !_this3.hasVertex(k);
				});
				if (missingVertices.length) {
					throw new (_bind.apply(Graph.VertexNotExistsError, [null].concat(_toConsumableArray(missingVertices))))();
				}
			}
		}, {
			key: _expectVerticesAbsent,
			value: function value() {
				var _this4 = this;
	
				for (var _len3 = arguments.length, keys = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
					keys[_key4] = arguments[_key4];
				}
	
				var presentVertices = keys.filter(function (k) {
					return _this4.hasVertex(k);
				});
				if (presentVertices.length) {
					throw new (_bind.apply(Graph.VertexExistsError, [null].concat(_toConsumableArray(presentVertices.map(function (k) {
						return [k, _this4.vertexValue(k)];
					})))))();
				}
			}
		}, {
			key: _expectEdges,
			value: function value() {
				var _this5 = this;
	
				for (var _len4 = arguments.length, keys = Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
					keys[_key5] = arguments[_key5];
				}
	
				var absentEdges = keys.filter(function (k) {
					return !_this5.hasEdge.apply(_this5, _toConsumableArray(k));
				});
				if (absentEdges.length) {
					throw new (_bind.apply(Graph.EdgeNotExistsError, [null].concat(_toConsumableArray(absentEdges))))();
				}
			}
		}, {
			key: _expectEdgesAbsent,
			value: function value() {
				var _this6 = this;
	
				for (var _len5 = arguments.length, keys = Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
					keys[_key6] = arguments[_key6];
				}
	
				var presentEdges = keys.filter(function (k) {
					return _this6.hasEdge.apply(_this6, _toConsumableArray(k));
				});
				if (presentEdges.length) {
					throw new (_bind.apply(Graph.EdgeExistsError, [null].concat(_toConsumableArray(presentEdges.map(function (k) {
						return [k, _this6.edgeValue.apply(_this6, _toConsumableArray(k))];
					})))))();
				}
			}
		}, {
			key: _expectNoConnectedEdges,
			value: function value(key) {
				var edges = [];
				var _iteratorNormalCompletion39 = true;
				var _didIteratorError39 = false;
				var _iteratorError39 = undefined;
	
				try {
					for (var _iterator39 = this.verticesFrom(key)[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
						var _step39$value = _slicedToArray(_step39.value, 1);
	
						var to = _step39$value[0];
						edges.push([[key, to], this.edgeValue(key, to)]);
					}
				} catch (err) {
					_didIteratorError39 = true;
					_iteratorError39 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion39 && _iterator39["return"]) {
							_iterator39["return"]();
						}
					} finally {
						if (_didIteratorError39) {
							throw _iteratorError39;
						}
					}
				}
	
				var _iteratorNormalCompletion40 = true;
				var _didIteratorError40 = false;
				var _iteratorError40 = undefined;
	
				try {
					for (var _iterator40 = this.verticesTo(key)[Symbol.iterator](), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
						var _step40$value = _slicedToArray(_step40.value, 1);
	
						var from = _step40$value[0];
						edges.push([[from, key], this.edgeValue(from, key)]);
					}
				} catch (err) {
					_didIteratorError40 = true;
					_iteratorError40 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion40 && _iterator40["return"]) {
							_iterator40["return"]();
						}
					} finally {
						if (_didIteratorError40) {
							throw _iteratorError40;
						}
					}
				}
	
				if (edges.length) {
					throw new (_bind.apply(Graph.HasConnectedEdgesError, [null].concat([key], edges)))();
				}
			}
		}], [{
			key: "fromJSON",
			value: function fromJSON(json) {
				return new (_bind.apply(this, [null].concat(_toConsumableArray(JSON.parse(json)))))();
			}
		}]);
	
		return Graph;
	})();
	
	exports["default"] = Graph;
	Graph.VertexExistsError = (function (_Error) {
		_inherits(VertexExistsError, _Error);
	
		function VertexExistsError() {
			_classCallCheck(this, VertexExistsError);
	
			_get(Object.getPrototypeOf(VertexExistsError.prototype), "constructor", this).call(this);
			/**
	   * the set of relevant vertices as `[key, value]` shaped arrays
	   * @public
	   * @constant vertices
	   * @memberof Graph.VertexExistsError
	   * @instance
	   * @type {Set.<Array>}
	   */
	
			for (var _len6 = arguments.length, vertices = Array(_len6), _key7 = 0; _key7 < _len6; _key7++) {
				vertices[_key7] = arguments[_key7];
			}
	
			this.vertices = new Set(vertices);
			this.message = "This graph has " + (this.vertices.size === 1 ? "a vertex" : "vertices") + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (_ref6) {
				var _ref62 = _slicedToArray(_ref6, 1);
	
				var key = _ref62[0];
				return key;
			}).join("', '") + "'";
		}
	
		return VertexExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
	 * @extends Error
	 */
	Graph.VertexNotExistsError = (function (_Error2) {
		_inherits(VertexNotExistsError, _Error2);
	
		function VertexNotExistsError() {
			_classCallCheck(this, VertexNotExistsError);
	
			_get(Object.getPrototypeOf(VertexNotExistsError.prototype), "constructor", this).call(this);
			/**
	   * the set of relevant vertex keys
	   * @public
	   * @constant vertices
	   * @memberof Graph.VertexNotExistsError
	   * @instance
	   * @type {Set.<string>}
	   */
	
			for (var _len7 = arguments.length, keys = Array(_len7), _key8 = 0; _key8 < _len7; _key8++) {
				keys[_key8] = arguments[_key8];
			}
	
			this.vertices = new Set(keys);
			this.message = "This graph does not have " + (this.vertices.size === 1 ? "a vertex" : "vertices") + " '" + [].concat(_toConsumableArray(this.vertices)).join("', '") + "'";
		}
	
		return VertexNotExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
	 * @extends Error
	 */
	Graph.EdgeExistsError = (function (_Error3) {
		_inherits(EdgeExistsError, _Error3);
	
		function EdgeExistsError() {
			_classCallCheck(this, EdgeExistsError);
	
			_get(Object.getPrototypeOf(EdgeExistsError.prototype), "constructor", this).call(this);
			/**
	   * the set of relevant edges as `[[from, to], value]` shaped arrays
	   * @public
	   * @constant edges
	   * @memberof Graph.EdgeExistsError
	   * @instance
	   * @type {Set.<Array>}
	   */
	
			for (var _len8 = arguments.length, edges = Array(_len8), _key9 = 0; _key9 < _len8; _key9++) {
				edges[_key9] = arguments[_key9];
			}
	
			this.edges = new Set(edges);
			this.message = "This graph has " + (this.edges.size === 1 ? "an edge" : "edges") + " " + [].concat(_toConsumableArray(this.edges)).map(function (_ref7) {
				var _ref72 = _slicedToArray(_ref7, 1);
	
				var _ref72$0 = _slicedToArray(_ref72[0], 2);
	
				var from = _ref72$0[0];
				var to = _ref72$0[1];
				return "['" + from + "', '" + to + "']";
			}).join(", ");
		}
	
		return EdgeExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
	 * @extends Error
	 */
	Graph.EdgeNotExistsError = (function (_Error4) {
		_inherits(EdgeNotExistsError, _Error4);
	
		function EdgeNotExistsError() {
			_classCallCheck(this, EdgeNotExistsError);
	
			_get(Object.getPrototypeOf(EdgeNotExistsError.prototype), "constructor", this).call(this);
			/**
	   * the set of relevant edge keys as `[from, to]` shaped arrays
	   * @public
	   * @constant edges
	   * @memberof Graph.EdgeNotExistsError
	   * @instance
	   * @type {Set.<Array.<string>>}
	   */
	
			for (var _len9 = arguments.length, edges = Array(_len9), _key10 = 0; _key10 < _len9; _key10++) {
				edges[_key10] = arguments[_key10];
			}
	
			this.edges = new Set(edges);
			this.message = "This graph does not have " + (this.edges.size === 1 ? "an edge" : "edges") + " " + [].concat(_toConsumableArray(this.edges)).map(function (_ref8) {
				var _ref82 = _slicedToArray(_ref8, 2);
	
				var from = _ref82[0];
				var to = _ref82[1];
				return "['" + from + "', '" + to + "']";
			}).join(", ");
		}
	
		return EdgeNotExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a vertex is expected not to have any connected edges, but does.
	 * @extends Graph.EdgeExistsError
	 */
	Graph.HasConnectedEdgesError = (function (_Graph$EdgeExistsError) {
		_inherits(HasConnectedEdgesError, _Graph$EdgeExistsError);
	
		function HasConnectedEdgesError(key) {
			_classCallCheck(this, HasConnectedEdgesError);
	
			for (var _len10 = arguments.length, edges = Array(_len10 > 1 ? _len10 - 1 : 0), _key11 = 1; _key11 < _len10; _key11++) {
				edges[_key11 - 1] = arguments[_key11];
			}
	
			_get(Object.getPrototypeOf(HasConnectedEdgesError.prototype), "constructor", this).apply(this, edges);
			/**
	   * the key of the vertex that has connected edges
	   * @public
	   * @constant vertex
	   * @memberof Graph.HasConnectedEdgesError
	   * @instance
	   * @type {string}
	   */
			this.vertex = key;
			this.message = "The '" + key + "' vertex has connected " + (this.edges.size === 1 ? "an edge" : "edges") + " " + [].concat(_toConsumableArray(this.edges)).map(function (_ref9) {
				var _ref92 = _slicedToArray(_ref9, 1);
	
				var _ref92$0 = _slicedToArray(_ref92[0], 2);
	
				var from = _ref92$0[0];
				var to = _ref92$0[1];
				return "['" + from + "', '" + to + "']";
			}).join(", ");
		}
	
		return HasConnectedEdgesError;
	})(Graph.EdgeExistsError);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a graph is expected not to have a directed cycle, but does.
	 * @extends Error
	 */
	Graph.CycleError = (function (_Error5) {
		_inherits(CycleError, _Error5);
	
		function CycleError(cycle) {
			_classCallCheck(this, CycleError);
	
			_get(Object.getPrototypeOf(CycleError.prototype), "constructor", this).call(this);
			/**
	   * the vertices involved in the cycle, in order but with an unspecified starting point
	   * @public
	   * @constant cycle
	   * @memberof Graph.CycleError
	   * @instance
	   * @type {Array.<string>}
	   */
			this.cycle = cycle;
			this.message = "This graph contains a cycle: " + cycle;
		}
	
		return CycleError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a graph is expected not to have a branch-less directed cycle, but does.
	 * @extends Graph.CycleError
	 */
	Graph.BranchlessCycleError = (function (_Graph$CycleError) {
		_inherits(BranchlessCycleError, _Graph$CycleError);
	
		function BranchlessCycleError(cycle) {
			_classCallCheck(this, BranchlessCycleError);
	
			_get(Object.getPrototypeOf(BranchlessCycleError.prototype), "constructor", this).call(this, cycle);
			this.message = "This graph contains a branch-less cycle: " + cycle;
		}
	
		return BranchlessCycleError;
	})(Graph.CycleError);
	module.exports = exports["default"];
	// stack

	// This algorithm is based on the following article:
	// Enumeration of the elementary circuits of a directed graph
	// R. Tarjan, SIAM Journal on Computing, 2 (1973), pp. 211-216
	// http://dx.doi.org/10.1137/0202017
	// -----
	// TODO: implement the improved version as defined by Johnson:
	// Finding all the elementary circuits of a directed graph.
	// D. B. Johnson, SIAM Journal on Computing 4, no. 1, 77-84, 1975.
	// http://dx.doi.org/10.1137/0204007

	/* bookkeeping */

	/* the main recursive backtracking algorithm */
	// if a simple cycle continuing the partial path on the pointStack has been found

	/* start backtracking from each vertex in the graph */

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(5)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(17);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(44)
	  , $export        = __webpack_require__(1)
	  , redefine       = __webpack_require__(12)
	  , hide           = __webpack_require__(16)
	  , has            = __webpack_require__(8)
	  , Iterators      = __webpack_require__(25)
	  , $iterCreate    = __webpack_require__(62)
	  , setToStringTag = __webpack_require__(26)
	  , getProto       = __webpack_require__(2).getProto
	  , ITERATOR       = __webpack_require__(5)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(5)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 45 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	module.exports = Math.expm1 || function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(2).getDesc
	  , isObject = __webpack_require__(3)
	  , anObject = __webpack_require__(4);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(14)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(28)
	  , defined   = __webpack_require__(15);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(60)
	  , defined  = __webpack_require__(15);
	
	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(13)
	  , toLength  = __webpack_require__(9)
	  , toIndex   = __webpack_require__(27);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(2)
	  , hide         = __webpack_require__(16)
	  , redefineAll  = __webpack_require__(35)
	  , ctx          = __webpack_require__(14)
	  , strictNew    = __webpack_require__(37)
	  , defined      = __webpack_require__(15)
	  , forOf        = __webpack_require__(24)
	  , $iterDefine  = __webpack_require__(42)
	  , step         = __webpack_require__(63)
	  , ID           = __webpack_require__(23)('id')
	  , $has         = __webpack_require__(8)
	  , isObject     = __webpack_require__(3)
	  , setSpecies   = __webpack_require__(36)
	  , DESCRIPTORS  = __webpack_require__(10)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;
	
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
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
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
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
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
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
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(24)
	  , classof = __webpack_require__(30);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide              = __webpack_require__(16)
	  , redefineAll       = __webpack_require__(35)
	  , anObject          = __webpack_require__(4)
	  , isObject          = __webpack_require__(3)
	  , strictNew         = __webpack_require__(37)
	  , forOf             = __webpack_require__(24)
	  , createArrayMethod = __webpack_require__(29)
	  , $has              = __webpack_require__(8)
	  , WEAK              = __webpack_require__(23)('weak')
	  , isExtensible      = Object.isExtensible || isObject
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for frozen keys
	var frozenStore = function(that){
	  return that._l || (that._l = new FrozenStore);
	};
	var FrozenStore = function(){
	  this.a = [];
	};
	var findFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	FrozenStore.prototype = {
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
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(!isExtensible(anObject(key))){
	      frozenStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that._i] = value;
	    } return that;
	  },
	  frozenStore: frozenStore,
	  WEAK: WEAK
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(3)
	  , document = __webpack_require__(6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(4);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(13)
	  , getNames  = __webpack_require__(2).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(25)
	  , ITERATOR   = __webpack_require__(5)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(3)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(3)
	  , cof      = __webpack_require__(17)
	  , MATCH    = __webpack_require__(5)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(4);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(2)
	  , descriptor     = __webpack_require__(20)
	  , setToStringTag = __webpack_require__(26)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(16)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(2)
	  , toIObject = __webpack_require__(13)
	  , isEnum    = $.isEnum;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var $        = __webpack_require__(2)
	  , anObject = __webpack_require__(4)
	  , Reflect  = __webpack_require__(6).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = $.getNames(anObject(it))
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-string-pad-left-right
	var toLength = __webpack_require__(9)
	  , repeat   = __webpack_require__(70)
	  , defined  = __webpack_require__(15);
	
	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength)return S;
	  if(fillStr == '')fillStr = ' ';
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(28)
	  , defined   = __webpack_require__(15);
	
	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(14)
	  , invoke             = __webpack_require__(33)
	  , html               = __webpack_require__(57)
	  , cel                = __webpack_require__(54)
	  , global             = __webpack_require__(6)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(17)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(30)
	  , ITERATOR  = __webpack_require__(5)('iterator')
	  , Iterators = __webpack_require__(25);
	module.exports = __webpack_require__(18).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(22)
	  , step             = __webpack_require__(63)
	  , Iterators        = __webpack_require__(25)
	  , toIObject        = __webpack_require__(13);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(42)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	__webpack_require__(190);
	
	__webpack_require__(192);
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel/polyfill is allowed");
	}
	global._babelPolyfill = true;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(74);


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(19)
	  , toIndex  = __webpack_require__(27)
	  , toLength = __webpack_require__(9);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , $$    = arguments
	    , end   = $$.length > 2 ? $$[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(19)
	  , toIndex  = __webpack_require__(27)
	  , toLength = __webpack_require__(9);
	module.exports = [].fill || function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , $$     = arguments
	    , $$len  = $$.length
	    , index  = toIndex($$len > 1 ? $$[1] : undefined, length)
	    , end    = $$len > 2 ? $$[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(3)
	  , isArray  = __webpack_require__(41)
	  , SPECIES  = __webpack_require__(5)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(2);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(2)
	  , toIObject = __webpack_require__(13);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , macrotask = __webpack_require__(71).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(17)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(2)
	  , toObject = __webpack_require__(19)
	  , IObject  = __webpack_require__(34);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(7)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(84)
	  , invoke    = __webpack_require__(33)
	  , aFunction = __webpack_require__(21);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that  = this
	      , $$    = arguments
	      , $$len = $$.length
	      , j = 0, k = 0, args;
	    if(!holder && !$$len)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = $$[k++];
	    while($$len > k)args.push($$[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);

/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(4)
	  , aFunction = __webpack_require__(21)
	  , SPECIES   = __webpack_require__(5)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(3);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(2)
	  , $export           = __webpack_require__(1)
	  , DESCRIPTORS       = __webpack_require__(10)
	  , createDesc        = __webpack_require__(20)
	  , html              = __webpack_require__(57)
	  , cel               = __webpack_require__(54)
	  , has               = __webpack_require__(8)
	  , cof               = __webpack_require__(17)
	  , invoke            = __webpack_require__(33)
	  , fails             = __webpack_require__(7)
	  , anObject          = __webpack_require__(4)
	  , aFunction         = __webpack_require__(21)
	  , isObject          = __webpack_require__(3)
	  , toObject          = __webpack_require__(19)
	  , toIObject         = __webpack_require__(13)
	  , toInteger         = __webpack_require__(28)
	  , toIndex           = __webpack_require__(27)
	  , toLength          = __webpack_require__(9)
	  , IObject           = __webpack_require__(34)
	  , IE_PROTO          = __webpack_require__(23)('__proto__')
	  , createArrayMethod = __webpack_require__(29)
	  , arrayIndexOf      = __webpack_require__(50)(false)
	  , ObjectProto       = Object.prototype
	  , ArrayProto        = Array.prototype
	  , arraySlice        = ArrayProto.slice
	  , arrayJoin         = ArrayProto.join
	  , defineProperty    = $.setDesc
	  , getOwnDescriptor  = $.getDesc
	  , defineProperties  = $.setDescs
	  , factories         = {}
	  , IE8_DOM_DEFINE;
	
	if(!DESCRIPTORS){
	  IE8_DOM_DEFINE = !fails(function(){
	    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
	  });
	  $.setDesc = function(O, P, Attributes){
	    if(IE8_DOM_DEFINE)try {
	      return defineProperty(O, P, Attributes);
	    } catch(e){ /* empty */ }
	    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	    if('value' in Attributes)anObject(O)[P] = Attributes.value;
	    return O;
	  };
	  $.getDesc = function(O, P){
	    if(IE8_DOM_DEFINE)try {
	      return getOwnDescriptor(O, P);
	    } catch(e){ /* empty */ }
	    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
	  };
	  $.setDescs = defineProperties = function(O, Properties){
	    anObject(O);
	    var keys   = $.getKeys(Properties)
	      , length = keys.length
	      , i = 0
	      , P;
	    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
	    return O;
	  };
	}
	$export($export.S + $export.F * !DESCRIPTORS, 'Object', {
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
	  html.appendChild(iframe);
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
	var createGetKeys = function(names, length){
	  return function(object){
	    var O      = toIObject(object)
	      , i      = 0
	      , result = []
	      , key;
	    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	    // Don't enum bug & hidden keys
	    while(length > i)if(has(O, key = names[i++])){
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	    return result;
	  };
	};
	var Empty = function(){};
	$export($export.S, 'Object', {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  getPrototypeOf: $.getProto = $.getProto || function(O){
	    O = toObject(O);
	    if(has(O, IE_PROTO))return O[IE_PROTO];
	    if(typeof O.constructor == 'function' && O instanceof O.constructor){
	      return O.constructor.prototype;
	    } return O instanceof Object ? ObjectProto : null;
	  },
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  create: $.create = $.create || function(O, /*?*/Properties){
	    var result;
	    if(O !== null){
	      Empty.prototype = anObject(O);
	      result = new Empty();
	      Empty.prototype = null;
	      // add "__proto__" for Object.getPrototypeOf shim
	      result[IE_PROTO] = O;
	    } else result = createDict();
	    return Properties === undefined ? result : defineProperties(result, Properties);
	  },
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
	});
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }
	  return factories[len](F, args);
	};
	
	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	$export($export.P, 'Function', {
	  bind: function bind(that /*, args... */){
	    var fn       = aFunction(this)
	      , partArgs = arraySlice.call(arguments, 1);
	    var bound = function(/* args... */){
	      var args = partArgs.concat(arraySlice.call(arguments));
	      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	    };
	    if(isObject(fn.prototype))bound.prototype = fn.prototype;
	    return bound;
	  }
	});
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * fails(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});
	$export($export.P + $export.F * (IObject != Object), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(IObject(this), separator === undefined ? ',' : separator);
	  }
	});
	
	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	$export($export.S, 'Array', {isArray: __webpack_require__(41)});
	
	var createArrayReduce = function(isRight){
	  return function(callbackfn, memo){
	    aFunction(callbackfn);
	    var O      = IObject(this)
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
	      if(isRight ? index < 0 : length <= index){
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
	      memo = callbackfn(memo, O[index], index, this);
	    }
	    return memo;
	  };
	};
	
	var methodize = function($fn){
	  return function(arg1/*, arg2 = undefined */){
	    return $fn(this, arg1, arguments[1]);
	  };
	};
	
	$export($export.P, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: $.each = $.each || methodize(createArrayMethod(0)),
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: methodize(createArrayMethod(1)),
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: methodize(createArrayMethod(2)),
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: methodize(createArrayMethod(3)),
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: methodize(createArrayMethod(4)),
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: createArrayReduce(false),
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: createArrayReduce(true),
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: methodize(arrayIndexOf),
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
	    if(index < 0)index = toLength(length + index);
	    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
	    return -1;
	  }
	});
	
	// 20.3.3.1 / 15.9.4.4 Date.now()
	$export($export.S, 'Date', {now: function(){ return +new Date; }});
	
	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};
	
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(this))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(1);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(76)});
	
	__webpack_require__(22)('copyWithin');

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(1);
	
	$export($export.P, 'Array', {fill: __webpack_require__(77)});
	
	__webpack_require__(22)('fill');

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(1)
	  , $find   = __webpack_require__(29)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(22)(KEY);

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(1)
	  , $find   = __webpack_require__(29)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(22)(KEY);

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(14)
	  , $export     = __webpack_require__(1)
	  , toObject    = __webpack_require__(19)
	  , call        = __webpack_require__(61)
	  , isArrayIter = __webpack_require__(58)
	  , toLength    = __webpack_require__(9)
	  , getIterFn   = __webpack_require__(72);
	$export($export.S + $export.F * !__webpack_require__(43)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , $$     = arguments
	      , $$len  = $$.length
	      , result = new (typeof this == 'function' ? this : Array)($$len);
	    while($$len > index)result[index] = $$[index++];
	    result.length = $$len;
	    return result;
	  }
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36)('Array');

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $             = __webpack_require__(2)
	  , isObject      = __webpack_require__(3)
	  , HAS_INSTANCE  = __webpack_require__(5)('hasInstance')
	  , FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = $.getProto(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var setDesc    = __webpack_require__(2).setDesc
	  , createDesc = __webpack_require__(20)
	  , has        = __webpack_require__(8)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(10) && setDesc(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = ('' + this).match(nameRE)
	      , name  = match ? match[1] : '';
	    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
	    return name;
	  }
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(51);
	
	// 23.1 Map Objects
	__webpack_require__(31)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(1)
	  , log1p   = __webpack_require__(64)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;
	
	// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
	$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(1);
	
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	$export($export.S, 'Math', {asinh: asinh});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(1)
	  , sign    = __webpack_require__(46);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(1)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {expm1: __webpack_require__(45)});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(1)
	  , sign      = __webpack_require__(46)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	
	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	
	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(1)
	  , abs     = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum   = 0
	      , i     = 0
	      , $$    = arguments
	      , $$len = $$.length
	      , larg  = 0
	      , arg, div;
	    while(i < $$len){
	      arg = abs($$[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(1)
	  , $imul   = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {log1p: __webpack_require__(64)});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {sign: __webpack_require__(46)});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(1)
	  , expm1   = __webpack_require__(45)
	  , exp     = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(1)
	  , expm1   = __webpack_require__(45)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $           = __webpack_require__(2)
	  , global      = __webpack_require__(6)
	  , has         = __webpack_require__(8)
	  , cof         = __webpack_require__(17)
	  , toPrimitive = __webpack_require__(87)
	  , fails       = __webpack_require__(7)
	  , $trim       = __webpack_require__(38).trim
	  , NUMBER      = 'Number'
	  , $Number     = global[NUMBER]
	  , Base        = $Number
	  , proto       = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF  = cof($.create(proto)) == NUMBER
	  , TRIM        = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};
	
	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? new Base(toNumber(it)) : toNumber(it);
	  };
	  $.each.call(__webpack_require__(10) ? $.getNames(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), function(key){
	    if(has(Base, key) && !has($Number, key)){
	      $.setDesc($Number, key, $.getDesc(Base, key));
	    }
	  });
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(12)(global, NUMBER, $Number);
	}

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(1)
	  , _isFinite = __webpack_require__(6).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(59)});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(1)
	  , isInteger = __webpack_require__(59)
	  , abs       = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.12 Number.parseFloat(string)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {parseFloat: parseFloat});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.13 Number.parseInt(string, radix)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {parseInt: parseInt});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(1);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(82)});

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(13);
	
	__webpack_require__(11)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(11)('getOwnPropertyNames', function(){
	  return __webpack_require__(56).get;
	});

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(19);
	
	__webpack_require__(11)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(1);
	$export($export.S, 'Object', {is: __webpack_require__(67)});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(19);
	
	__webpack_require__(11)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
	  };
	});

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(it) : it;
	  };
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(1);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(47).set});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(30)
	  , test    = {};
	test[__webpack_require__(5)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(12)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(2)
	  , LIBRARY    = __webpack_require__(44)
	  , global     = __webpack_require__(6)
	  , ctx        = __webpack_require__(14)
	  , classof    = __webpack_require__(30)
	  , $export    = __webpack_require__(1)
	  , isObject   = __webpack_require__(3)
	  , anObject   = __webpack_require__(4)
	  , aFunction  = __webpack_require__(21)
	  , strictNew  = __webpack_require__(37)
	  , forOf      = __webpack_require__(24)
	  , setProto   = __webpack_require__(47).set
	  , same       = __webpack_require__(67)
	  , SPECIES    = __webpack_require__(5)('species')
	  , speciesConstructor = __webpack_require__(86)
	  , asap       = __webpack_require__(81)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , empty      = function(){ /* empty */ }
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(empty), promise;
	  if(sub)test.constructor = function(exec){
	    exec(empty, empty);
	  };
	  (promise = P.resolve(test))['catch'](empty);
	  return promise === test;
	};
	
	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(10)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(35)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(26)(P, PROMISE);
	__webpack_require__(36)(PROMISE);
	Wrapper = __webpack_require__(18)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(43)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export  = __webpack_require__(1)
	  , _apply   = Function.apply
	  , anObject = __webpack_require__(4);
	
	$export($export.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, anObject(argumentsList));
	  }
	});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $         = __webpack_require__(2)
	  , $export   = __webpack_require__(1)
	  , aFunction = __webpack_require__(21)
	  , anObject  = __webpack_require__(4)
	  , isObject  = __webpack_require__(3)
	  , bind      = Function.bind || __webpack_require__(18).Function.prototype.bind;
	
	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  function F(){}
	  return !(Reflect.construct(function(){}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch(args.length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = $.create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var $        = __webpack_require__(2)
	  , $export  = __webpack_require__(1)
	  , anObject = __webpack_require__(4);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    try {
	      $.setDesc(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(1)
	  , getDesc  = __webpack_require__(2).getDesc
	  , anObject = __webpack_require__(4);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = getDesc(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(1)
	  , anObject = __webpack_require__(4);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(62)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var $        = __webpack_require__(2)
	  , $export  = __webpack_require__(1)
	  , anObject = __webpack_require__(4);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return $.getDesc(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(1)
	  , getProto = __webpack_require__(2).getProto
	  , anObject = __webpack_require__(4);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var $        = __webpack_require__(2)
	  , has      = __webpack_require__(8)
	  , $export  = __webpack_require__(1)
	  , isObject = __webpack_require__(3)
	  , anObject = __webpack_require__(4);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(1)
	  , anObject      = __webpack_require__(4)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(66)});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(1)
	  , anObject           = __webpack_require__(4)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(1)
	  , setProto = __webpack_require__(47);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var $          = __webpack_require__(2)
	  , has        = __webpack_require__(8)
	  , $export    = __webpack_require__(1)
	  , createDesc = __webpack_require__(20)
	  , anObject   = __webpack_require__(4)
	  , isObject   = __webpack_require__(3);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = $.getDesc(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = $.getProto(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    $.setDesc(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(2)
	  , global   = __webpack_require__(6)
	  , isRegExp = __webpack_require__(60)
	  , $flags   = __webpack_require__(55)
	  , $RegExp  = global.RegExp
	  , Base     = $RegExp
	  , proto    = $RegExp.prototype
	  , re1      = /a/g
	  , re2      = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW = new $RegExp(re1) !== re1;
	
	if(__webpack_require__(10) && (!CORRECT_NEW || __webpack_require__(7)(function(){
	  re2[__webpack_require__(5)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p
	      : CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
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
	  __webpack_require__(12)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(36)('RegExp');

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	var $ = __webpack_require__(2);
	if(__webpack_require__(10) && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(55)
	});

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(32)('match', 1, function(defined, MATCH){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  };
	});

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(32)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  };
	});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(32)('search', 1, function(defined, SEARCH){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  };
	});

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(32)('split', 2, function(defined, SPLIT, $split){
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return function split(separator, limit){
	    'use strict';
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined
	      ? fn.call(separator, O, limit)
	      : $split.call(String(O), separator, limit);
	  };
	});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(51);
	
	// 23.2 Set Objects
	__webpack_require__(31)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1)
	  , $at     = __webpack_require__(48)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(1)
	  , toLength  = __webpack_require__(9)
	  , context   = __webpack_require__(49)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(40)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , $$   = arguments
	      , endPosition = $$.length > 1 ? $$[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(1)
	  , toIndex        = __webpack_require__(27)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res   = []
	      , $$    = arguments
	      , $$len = $$.length
	      , i     = 0
	      , code;
	    while($$len > i){
	      code = +$$[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(1)
	  , context  = __webpack_require__(49)
	  , INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(40)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(48)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(42)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(1)
	  , toIObject = __webpack_require__(13)
	  , toLength  = __webpack_require__(9);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl   = toIObject(callSite.raw)
	      , len   = toLength(tpl.length)
	      , $$    = arguments
	      , $$len = $$.length
	      , res   = []
	      , i     = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < $$len)res.push(String($$[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(1);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(70)
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(1)
	  , toLength    = __webpack_require__(9)
	  , context     = __webpack_require__(49)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(40)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , $$     = arguments
	      , index  = toLength(Math.min($$.length > 1 ? $$[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(38)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(2)
	  , global         = __webpack_require__(6)
	  , has            = __webpack_require__(8)
	  , DESCRIPTORS    = __webpack_require__(10)
	  , $export        = __webpack_require__(1)
	  , redefine       = __webpack_require__(12)
	  , $fails         = __webpack_require__(7)
	  , shared         = __webpack_require__(68)
	  , setToStringTag = __webpack_require__(26)
	  , uid            = __webpack_require__(23)
	  , wks            = __webpack_require__(5)
	  , keyOf          = __webpack_require__(80)
	  , $names         = __webpack_require__(56)
	  , enumKeys       = __webpack_require__(79)
	  , isArray        = __webpack_require__(41)
	  , anObject       = __webpack_require__(4)
	  , toIObject      = __webpack_require__(13)
	  , createDesc     = __webpack_require__(20)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(44)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
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
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(2)
	  , redefine     = __webpack_require__(12)
	  , weak         = __webpack_require__(53)
	  , isObject     = __webpack_require__(3)
	  , has          = __webpack_require__(8)
	  , frozenStore  = weak.frozenStore
	  , WEAK         = weak.WEAK
	  , isExtensible = Object.isExtensible || isObject
	  , tmp          = {};
	
	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(31)('WeakMap', function(get){
	  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(!isExtensible(key))return frozenStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this._i];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && !isExtensible(a)){
	        var result = frozenStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(53);
	
	// 23.4 WeakSet Objects
	__webpack_require__(31)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(1)
	  , $includes = __webpack_require__(50)(true);
	
	$export($export.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(22)('includes');

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(1);
	
	$export($export.P, 'Map', {toJSON: __webpack_require__(52)('Map')});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export  = __webpack_require__(1)
	  , $entries = __webpack_require__(65)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $          = __webpack_require__(2)
	  , $export    = __webpack_require__(1)
	  , ownKeys    = __webpack_require__(66)
	  , toIObject  = __webpack_require__(13)
	  , createDesc = __webpack_require__(20);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , setDesc = $.setDesc
	      , getDesc = $.getDesc
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i){
	      D = getDesc(O, key = keys[i++]);
	      if(key in result)setDesc(result, key, createDesc(0, D));
	      else result[key] = D;
	    } return result;
	  }
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export = __webpack_require__(1)
	  , $values = __webpack_require__(65)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(1)
	  , $re     = __webpack_require__(85)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(1);
	
	$export($export.P, 'Set', {toJSON: __webpack_require__(52)('Set')});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(1)
	  , $at     = __webpack_require__(48)(true);
	
	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1)
	  , $pad    = __webpack_require__(69);
	
	$export($export.P, 'String', {
	  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1)
	  , $pad    = __webpack_require__(69);
	
	$export($export.P, 'String', {
	  padRight: function padRight(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(38)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(38)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	});

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// JavaScript 1.6 / Strawman array statics shim
	var $       = __webpack_require__(2)
	  , $export = __webpack_require__(1)
	  , $ctx    = __webpack_require__(14)
	  , $Array  = __webpack_require__(18).Array || Array
	  , statics = {};
	var setStatics = function(keys, length){
	  $.each.call(keys.split(','), function(key){
	    if(length == undefined && key in $Array)statics[key] = $Array[key];
	    else if(key in [])statics[key] = $ctx(Function.call, [][key], length);
	  });
	};
	setStatics('pop,reverse,shift,keys,values,entries', 1);
	setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	           'reduce,reduceRight,copyWithin,fill');
	$export($export.S, 'Array', statics);

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(73);
	var global      = __webpack_require__(6)
	  , hide        = __webpack_require__(16)
	  , Iterators   = __webpack_require__(25)
	  , ITERATOR    = __webpack_require__(5)('iterator')
	  , NL          = global.NodeList
	  , HTC         = global.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype
	  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
	if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
	if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(1)
	  , $task   = __webpack_require__(71);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(6)
	  , $export    = __webpack_require__(1)
	  , invoke     = __webpack_require__(33)
	  , partial    = __webpack_require__(83)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	__webpack_require__(171);
	__webpack_require__(126);
	__webpack_require__(134);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(127);
	__webpack_require__(137);
	__webpack_require__(136);
	__webpack_require__(132);
	__webpack_require__(133);
	__webpack_require__(131);
	__webpack_require__(128);
	__webpack_require__(130);
	__webpack_require__(135);
	__webpack_require__(129);
	__webpack_require__(97);
	__webpack_require__(96);
	__webpack_require__(116);
	__webpack_require__(117);
	__webpack_require__(118);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(121);
	__webpack_require__(122);
	__webpack_require__(123);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(99);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	__webpack_require__(103);
	__webpack_require__(104);
	__webpack_require__(105);
	__webpack_require__(106);
	__webpack_require__(107);
	__webpack_require__(108);
	__webpack_require__(109);
	__webpack_require__(110);
	__webpack_require__(111);
	__webpack_require__(112);
	__webpack_require__(113);
	__webpack_require__(114);
	__webpack_require__(115);
	__webpack_require__(164);
	__webpack_require__(167);
	__webpack_require__(170);
	__webpack_require__(166);
	__webpack_require__(162);
	__webpack_require__(163);
	__webpack_require__(165);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(73);
	__webpack_require__(95);
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(92);
	__webpack_require__(91);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(140);
	__webpack_require__(98);
	__webpack_require__(161);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(141);
	__webpack_require__(142);
	__webpack_require__(143);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(148);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(154);
	__webpack_require__(153);
	__webpack_require__(174);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(185);
	__webpack_require__(179);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(176);
	__webpack_require__(175);
	__webpack_require__(180);
	__webpack_require__(186);
	__webpack_require__(189);
	__webpack_require__(188);
	__webpack_require__(187);
	module.exports = __webpack_require__(18);

/***/ },
/* 191 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
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
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
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
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
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
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
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
	            context.sent = undefined;
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
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
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
	    this.reset(true);
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
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
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
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(191)))

/***/ }
/******/ ])
});
;
//# sourceMappingURL=graph.full.js.map