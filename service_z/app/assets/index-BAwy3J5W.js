(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();function Vc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ks={exports:{}},kl={},_s={exports:{}},z={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dr=Symbol.for("react.element"),Hc=Symbol.for("react.portal"),Qc=Symbol.for("react.fragment"),Yc=Symbol.for("react.strict_mode"),Kc=Symbol.for("react.profiler"),Xc=Symbol.for("react.provider"),Gc=Symbol.for("react.context"),Zc=Symbol.for("react.forward_ref"),Jc=Symbol.for("react.suspense"),qc=Symbol.for("react.memo"),ed=Symbol.for("react.lazy"),sa=Symbol.iterator;function td(e){return e===null||typeof e!="object"?null:(e=sa&&e[sa]||e["@@iterator"],typeof e=="function"?e:null)}var Ss={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Cs=Object.assign,Ns={};function xn(e,t,n){this.props=e,this.context=t,this.refs=Ns,this.updater=n||Ss}xn.prototype.isReactComponent={};xn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};xn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Es(){}Es.prototype=xn.prototype;function co(e,t,n){this.props=e,this.context=t,this.refs=Ns,this.updater=n||Ss}var fo=co.prototype=new Es;fo.constructor=co;Cs(fo,xn.prototype);fo.isPureReactComponent=!0;var ua=Array.isArray,js=Object.prototype.hasOwnProperty,po={current:null},Rs={key:!0,ref:!0,__self:!0,__source:!0};function Ts(e,t,n){var r,l={},i=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)js.call(t,r)&&!Rs.hasOwnProperty(r)&&(l[r]=t[r]);var a=arguments.length-2;if(a===1)l.children=n;else if(1<a){for(var s=Array(a),c=0;c<a;c++)s[c]=arguments[c+2];l.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:dr,type:e,key:i,ref:o,props:l,_owner:po.current}}function nd(e,t){return{$$typeof:dr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function go(e){return typeof e=="object"&&e!==null&&e.$$typeof===dr}function rd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ca=/\/+/g;function Bl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?rd(""+e.key):t.toString(36)}function Mr(e,t,n,r,l){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case dr:case Hc:o=!0}}if(o)return o=e,l=l(o),e=r===""?"."+Bl(o,0):r,ua(l)?(n="",e!=null&&(n=e.replace(ca,"$&/")+"/"),Mr(l,t,n,"",function(c){return c})):l!=null&&(go(l)&&(l=nd(l,n+(!l.key||o&&o.key===l.key?"":(""+l.key).replace(ca,"$&/")+"/")+e)),t.push(l)),1;if(o=0,r=r===""?".":r+":",ua(e))for(var a=0;a<e.length;a++){i=e[a];var s=r+Bl(i,a);o+=Mr(i,t,n,s,l)}else if(s=td(e),typeof s=="function")for(e=s.call(e),a=0;!(i=e.next()).done;)i=i.value,s=r+Bl(i,a++),o+=Mr(i,t,n,s,l);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function wr(e,t,n){if(e==null)return e;var r=[],l=0;return Mr(e,r,"","",function(i){return t.call(n,i,l++)}),r}function ld(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var pe={current:null},Or={transition:null},id={ReactCurrentDispatcher:pe,ReactCurrentBatchConfig:Or,ReactCurrentOwner:po};function bs(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:wr,forEach:function(e,t,n){wr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return wr(e,function(){t++}),t},toArray:function(e){return wr(e,function(t){return t})||[]},only:function(e){if(!go(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};z.Component=xn;z.Fragment=Qc;z.Profiler=Kc;z.PureComponent=co;z.StrictMode=Yc;z.Suspense=Jc;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=id;z.act=bs;z.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Cs({},e.props),l=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=po.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in t)js.call(t,s)&&!Rs.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&a!==void 0?a[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){a=Array(s);for(var c=0;c<s;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:dr,type:e.type,key:l,ref:i,props:r,_owner:o}};z.createContext=function(e){return e={$$typeof:Gc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Xc,_context:e},e.Consumer=e};z.createElement=Ts;z.createFactory=function(e){var t=Ts.bind(null,e);return t.type=e,t};z.createRef=function(){return{current:null}};z.forwardRef=function(e){return{$$typeof:Zc,render:e}};z.isValidElement=go;z.lazy=function(e){return{$$typeof:ed,_payload:{_status:-1,_result:e},_init:ld}};z.memo=function(e,t){return{$$typeof:qc,type:e,compare:t===void 0?null:t}};z.startTransition=function(e){var t=Or.transition;Or.transition={};try{e()}finally{Or.transition=t}};z.unstable_act=bs;z.useCallback=function(e,t){return pe.current.useCallback(e,t)};z.useContext=function(e){return pe.current.useContext(e)};z.useDebugValue=function(){};z.useDeferredValue=function(e){return pe.current.useDeferredValue(e)};z.useEffect=function(e,t){return pe.current.useEffect(e,t)};z.useId=function(){return pe.current.useId()};z.useImperativeHandle=function(e,t,n){return pe.current.useImperativeHandle(e,t,n)};z.useInsertionEffect=function(e,t){return pe.current.useInsertionEffect(e,t)};z.useLayoutEffect=function(e,t){return pe.current.useLayoutEffect(e,t)};z.useMemo=function(e,t){return pe.current.useMemo(e,t)};z.useReducer=function(e,t,n){return pe.current.useReducer(e,t,n)};z.useRef=function(e){return pe.current.useRef(e)};z.useState=function(e){return pe.current.useState(e)};z.useSyncExternalStore=function(e,t,n){return pe.current.useSyncExternalStore(e,t,n)};z.useTransition=function(){return pe.current.useTransition()};z.version="18.3.1";_s.exports=z;var re=_s.exports;const od=Vc(re);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ad=re,sd=Symbol.for("react.element"),ud=Symbol.for("react.fragment"),cd=Object.prototype.hasOwnProperty,dd=ad.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,fd={key:!0,ref:!0,__self:!0,__source:!0};function Ps(e,t,n){var r,l={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)cd.call(t,r)&&!fd.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:sd,type:e,key:i,ref:o,props:l,_owner:dd.current}}kl.Fragment=ud;kl.jsx=Ps;kl.jsxs=Ps;ks.exports=kl;var u=ks.exports,zs={exports:{}},Ee={},Ls={exports:{}},Ds={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(N,b){var P=N.length;N.push(b);e:for(;0<P;){var Q=P-1>>>1,q=N[Q];if(0<l(q,b))N[Q]=b,N[P]=q,P=Q;else break e}}function n(N){return N.length===0?null:N[0]}function r(N){if(N.length===0)return null;var b=N[0],P=N.pop();if(P!==b){N[0]=P;e:for(var Q=0,q=N.length,yr=q>>>1;Q<yr;){var jt=2*(Q+1)-1,Ul=N[jt],Rt=jt+1,xr=N[Rt];if(0>l(Ul,P))Rt<q&&0>l(xr,Ul)?(N[Q]=xr,N[Rt]=P,Q=Rt):(N[Q]=Ul,N[jt]=P,Q=jt);else if(Rt<q&&0>l(xr,P))N[Q]=xr,N[Rt]=P,Q=Rt;else break e}}return b}function l(N,b){var P=N.sortIndex-b.sortIndex;return P!==0?P:N.id-b.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var s=[],c=[],g=1,m=null,h=3,v=!1,x=!1,w=!1,L=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function d(N){for(var b=n(c);b!==null;){if(b.callback===null)r(c);else if(b.startTime<=N)r(c),b.sortIndex=b.expirationTime,t(s,b);else break;b=n(c)}}function y(N){if(w=!1,d(N),!x)if(n(s)!==null)x=!0,Fl(_);else{var b=n(c);b!==null&&$l(y,b.startTime-N)}}function _(N,b){x=!1,w&&(w=!1,p(j),j=-1),v=!0;var P=h;try{for(d(b),m=n(s);m!==null&&(!(m.expirationTime>b)||N&&!Me());){var Q=m.callback;if(typeof Q=="function"){m.callback=null,h=m.priorityLevel;var q=Q(m.expirationTime<=b);b=e.unstable_now(),typeof q=="function"?m.callback=q:m===n(s)&&r(s),d(b)}else r(s);m=n(s)}if(m!==null)var yr=!0;else{var jt=n(c);jt!==null&&$l(y,jt.startTime-b),yr=!1}return yr}finally{m=null,h=P,v=!1}}var S=!1,E=null,j=-1,H=5,D=-1;function Me(){return!(e.unstable_now()-D<H)}function _n(){if(E!==null){var N=e.unstable_now();D=N;var b=!0;try{b=E(!0,N)}finally{b?Sn():(S=!1,E=null)}}else S=!1}var Sn;if(typeof f=="function")Sn=function(){f(_n)};else if(typeof MessageChannel<"u"){var aa=new MessageChannel,Wc=aa.port2;aa.port1.onmessage=_n,Sn=function(){Wc.postMessage(null)}}else Sn=function(){L(_n,0)};function Fl(N){E=N,S||(S=!0,Sn())}function $l(N,b){j=L(function(){N(e.unstable_now())},b)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(N){N.callback=null},e.unstable_continueExecution=function(){x||v||(x=!0,Fl(_))},e.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<N?Math.floor(1e3/N):5},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_getFirstCallbackNode=function(){return n(s)},e.unstable_next=function(N){switch(h){case 1:case 2:case 3:var b=3;break;default:b=h}var P=h;h=b;try{return N()}finally{h=P}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(N,b){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var P=h;h=N;try{return b()}finally{h=P}},e.unstable_scheduleCallback=function(N,b,P){var Q=e.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?Q+P:Q):P=Q,N){case 1:var q=-1;break;case 2:q=250;break;case 5:q=1073741823;break;case 4:q=1e4;break;default:q=5e3}return q=P+q,N={id:g++,callback:b,priorityLevel:N,startTime:P,expirationTime:q,sortIndex:-1},P>Q?(N.sortIndex=P,t(c,N),n(s)===null&&N===n(c)&&(w?(p(j),j=-1):w=!0,$l(y,P-Q))):(N.sortIndex=q,t(s,N),x||v||(x=!0,Fl(_))),N},e.unstable_shouldYield=Me,e.unstable_wrapCallback=function(N){var b=h;return function(){var P=h;h=b;try{return N.apply(this,arguments)}finally{h=P}}}})(Ds);Ls.exports=Ds;var pd=Ls.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gd=re,Se=pd;function k(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Is=new Set,Qn={};function Bt(e,t){cn(e,t),cn(e+"Capture",t)}function cn(e,t){for(Qn[e]=t,e=0;e<t.length;e++)Is.add(t[e])}var nt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),vi=Object.prototype.hasOwnProperty,md=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,da={},fa={};function hd(e){return vi.call(fa,e)?!0:vi.call(da,e)?!1:md.test(e)?fa[e]=!0:(da[e]=!0,!1)}function vd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function yd(e,t,n,r){if(t===null||typeof t>"u"||vd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ge(e,t,n,r,l,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var oe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){oe[e]=new ge(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];oe[t]=new ge(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){oe[e]=new ge(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){oe[e]=new ge(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){oe[e]=new ge(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){oe[e]=new ge(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){oe[e]=new ge(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){oe[e]=new ge(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){oe[e]=new ge(e,5,!1,e.toLowerCase(),null,!1,!1)});var mo=/[\-:]([a-z])/g;function ho(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(mo,ho);oe[t]=new ge(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(mo,ho);oe[t]=new ge(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(mo,ho);oe[t]=new ge(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){oe[e]=new ge(e,1,!1,e.toLowerCase(),null,!1,!1)});oe.xlinkHref=new ge("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){oe[e]=new ge(e,1,!1,e.toLowerCase(),null,!0,!0)});function vo(e,t,n,r){var l=oe.hasOwnProperty(t)?oe[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(yd(t,n,l,r)&&(n=null),r||l===null?hd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ot=gd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,kr=Symbol.for("react.element"),Ht=Symbol.for("react.portal"),Qt=Symbol.for("react.fragment"),yo=Symbol.for("react.strict_mode"),yi=Symbol.for("react.profiler"),As=Symbol.for("react.provider"),Ms=Symbol.for("react.context"),xo=Symbol.for("react.forward_ref"),xi=Symbol.for("react.suspense"),wi=Symbol.for("react.suspense_list"),wo=Symbol.for("react.memo"),st=Symbol.for("react.lazy"),Os=Symbol.for("react.offscreen"),pa=Symbol.iterator;function Cn(e){return e===null||typeof e!="object"?null:(e=pa&&e[pa]||e["@@iterator"],typeof e=="function"?e:null)}var W=Object.assign,Wl;function Ln(e){if(Wl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Wl=t&&t[1]||""}return`
`+Wl+e}var Vl=!1;function Hl(e,t){if(!e||Vl)return"";Vl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var l=c.stack.split(`
`),i=r.stack.split(`
`),o=l.length-1,a=i.length-1;1<=o&&0<=a&&l[o]!==i[a];)a--;for(;1<=o&&0<=a;o--,a--)if(l[o]!==i[a]){if(o!==1||a!==1)do if(o--,a--,0>a||l[o]!==i[a]){var s=`
`+l[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=a);break}}}finally{Vl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Ln(e):""}function xd(e){switch(e.tag){case 5:return Ln(e.type);case 16:return Ln("Lazy");case 13:return Ln("Suspense");case 19:return Ln("SuspenseList");case 0:case 2:case 15:return e=Hl(e.type,!1),e;case 11:return e=Hl(e.type.render,!1),e;case 1:return e=Hl(e.type,!0),e;default:return""}}function ki(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Qt:return"Fragment";case Ht:return"Portal";case yi:return"Profiler";case yo:return"StrictMode";case xi:return"Suspense";case wi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ms:return(e.displayName||"Context")+".Consumer";case As:return(e._context.displayName||"Context")+".Provider";case xo:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case wo:return t=e.displayName||null,t!==null?t:ki(e.type)||"Memo";case st:t=e._payload,e=e._init;try{return ki(e(t))}catch{}}return null}function wd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ki(t);case 8:return t===yo?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function _t(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Fs(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function kd(e){var t=Fs(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function _r(e){e._valueTracker||(e._valueTracker=kd(e))}function $s(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Fs(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Gr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function _i(e,t){var n=t.checked;return W({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ga(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=_t(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Us(e,t){t=t.checked,t!=null&&vo(e,"checked",t,!1)}function Si(e,t){Us(e,t);var n=_t(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ci(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ci(e,t.type,_t(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ma(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ci(e,t,n){(t!=="number"||Gr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Dn=Array.isArray;function rn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+_t(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Ni(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(k(91));return W({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ha(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(k(92));if(Dn(n)){if(1<n.length)throw Error(k(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:_t(n)}}function Bs(e,t){var n=_t(t.value),r=_t(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function va(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ws(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ei(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ws(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Sr,Vs=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Sr=Sr||document.createElement("div"),Sr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Sr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Yn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Mn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},_d=["Webkit","ms","Moz","O"];Object.keys(Mn).forEach(function(e){_d.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Mn[t]=Mn[e]})});function Hs(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Mn.hasOwnProperty(e)&&Mn[e]?(""+t).trim():t+"px"}function Qs(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=Hs(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var Sd=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ji(e,t){if(t){if(Sd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(k(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(k(61))}if(t.style!=null&&typeof t.style!="object")throw Error(k(62))}}function Ri(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ti=null;function ko(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var bi=null,ln=null,on=null;function ya(e){if(e=gr(e)){if(typeof bi!="function")throw Error(k(280));var t=e.stateNode;t&&(t=El(t),bi(e.stateNode,e.type,t))}}function Ys(e){ln?on?on.push(e):on=[e]:ln=e}function Ks(){if(ln){var e=ln,t=on;if(on=ln=null,ya(e),t)for(e=0;e<t.length;e++)ya(t[e])}}function Xs(e,t){return e(t)}function Gs(){}var Ql=!1;function Zs(e,t,n){if(Ql)return e(t,n);Ql=!0;try{return Xs(e,t,n)}finally{Ql=!1,(ln!==null||on!==null)&&(Gs(),Ks())}}function Kn(e,t){var n=e.stateNode;if(n===null)return null;var r=El(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(k(231,t,typeof n));return n}var Pi=!1;if(nt)try{var Nn={};Object.defineProperty(Nn,"passive",{get:function(){Pi=!0}}),window.addEventListener("test",Nn,Nn),window.removeEventListener("test",Nn,Nn)}catch{Pi=!1}function Cd(e,t,n,r,l,i,o,a,s){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(g){this.onError(g)}}var On=!1,Zr=null,Jr=!1,zi=null,Nd={onError:function(e){On=!0,Zr=e}};function Ed(e,t,n,r,l,i,o,a,s){On=!1,Zr=null,Cd.apply(Nd,arguments)}function jd(e,t,n,r,l,i,o,a,s){if(Ed.apply(this,arguments),On){if(On){var c=Zr;On=!1,Zr=null}else throw Error(k(198));Jr||(Jr=!0,zi=c)}}function Wt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Js(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function xa(e){if(Wt(e)!==e)throw Error(k(188))}function Rd(e){var t=e.alternate;if(!t){if(t=Wt(e),t===null)throw Error(k(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return xa(l),e;if(i===r)return xa(l),t;i=i.sibling}throw Error(k(188))}if(n.return!==r.return)n=l,r=i;else{for(var o=!1,a=l.child;a;){if(a===n){o=!0,n=l,r=i;break}if(a===r){o=!0,r=l,n=i;break}a=a.sibling}if(!o){for(a=i.child;a;){if(a===n){o=!0,n=i,r=l;break}if(a===r){o=!0,r=i,n=l;break}a=a.sibling}if(!o)throw Error(k(189))}}if(n.alternate!==r)throw Error(k(190))}if(n.tag!==3)throw Error(k(188));return n.stateNode.current===n?e:t}function qs(e){return e=Rd(e),e!==null?eu(e):null}function eu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=eu(e);if(t!==null)return t;e=e.sibling}return null}var tu=Se.unstable_scheduleCallback,wa=Se.unstable_cancelCallback,Td=Se.unstable_shouldYield,bd=Se.unstable_requestPaint,Y=Se.unstable_now,Pd=Se.unstable_getCurrentPriorityLevel,_o=Se.unstable_ImmediatePriority,nu=Se.unstable_UserBlockingPriority,qr=Se.unstable_NormalPriority,zd=Se.unstable_LowPriority,ru=Se.unstable_IdlePriority,_l=null,Ke=null;function Ld(e){if(Ke&&typeof Ke.onCommitFiberRoot=="function")try{Ke.onCommitFiberRoot(_l,e,void 0,(e.current.flags&128)===128)}catch{}}var Be=Math.clz32?Math.clz32:Ad,Dd=Math.log,Id=Math.LN2;function Ad(e){return e>>>=0,e===0?32:31-(Dd(e)/Id|0)|0}var Cr=64,Nr=4194304;function In(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function el(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var a=o&~l;a!==0?r=In(a):(i&=o,i!==0&&(r=In(i)))}else o=n&~l,o!==0?r=In(o):i!==0&&(r=In(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,i=t&-t,l>=i||l===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Be(t),l=1<<n,r|=e[n],t&=~l;return r}function Md(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Od(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-Be(i),a=1<<o,s=l[o];s===-1?(!(a&n)||a&r)&&(l[o]=Md(a,t)):s<=t&&(e.expiredLanes|=a),i&=~a}}function Li(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function lu(){var e=Cr;return Cr<<=1,!(Cr&4194240)&&(Cr=64),e}function Yl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function fr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Be(t),e[t]=n}function Fd(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Be(n),i=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~i}}function So(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Be(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var A=0;function iu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var ou,Co,au,su,uu,Di=!1,Er=[],gt=null,mt=null,ht=null,Xn=new Map,Gn=new Map,ct=[],$d="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ka(e,t){switch(e){case"focusin":case"focusout":gt=null;break;case"dragenter":case"dragleave":mt=null;break;case"mouseover":case"mouseout":ht=null;break;case"pointerover":case"pointerout":Xn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Gn.delete(t.pointerId)}}function En(e,t,n,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},t!==null&&(t=gr(t),t!==null&&Co(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Ud(e,t,n,r,l){switch(t){case"focusin":return gt=En(gt,e,t,n,r,l),!0;case"dragenter":return mt=En(mt,e,t,n,r,l),!0;case"mouseover":return ht=En(ht,e,t,n,r,l),!0;case"pointerover":var i=l.pointerId;return Xn.set(i,En(Xn.get(i)||null,e,t,n,r,l)),!0;case"gotpointercapture":return i=l.pointerId,Gn.set(i,En(Gn.get(i)||null,e,t,n,r,l)),!0}return!1}function cu(e){var t=zt(e.target);if(t!==null){var n=Wt(t);if(n!==null){if(t=n.tag,t===13){if(t=Js(n),t!==null){e.blockedOn=t,uu(e.priority,function(){au(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Fr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ii(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ti=r,n.target.dispatchEvent(r),Ti=null}else return t=gr(n),t!==null&&Co(t),e.blockedOn=n,!1;t.shift()}return!0}function _a(e,t,n){Fr(e)&&n.delete(t)}function Bd(){Di=!1,gt!==null&&Fr(gt)&&(gt=null),mt!==null&&Fr(mt)&&(mt=null),ht!==null&&Fr(ht)&&(ht=null),Xn.forEach(_a),Gn.forEach(_a)}function jn(e,t){e.blockedOn===t&&(e.blockedOn=null,Di||(Di=!0,Se.unstable_scheduleCallback(Se.unstable_NormalPriority,Bd)))}function Zn(e){function t(l){return jn(l,e)}if(0<Er.length){jn(Er[0],e);for(var n=1;n<Er.length;n++){var r=Er[n];r.blockedOn===e&&(r.blockedOn=null)}}for(gt!==null&&jn(gt,e),mt!==null&&jn(mt,e),ht!==null&&jn(ht,e),Xn.forEach(t),Gn.forEach(t),n=0;n<ct.length;n++)r=ct[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<ct.length&&(n=ct[0],n.blockedOn===null);)cu(n),n.blockedOn===null&&ct.shift()}var an=ot.ReactCurrentBatchConfig,tl=!0;function Wd(e,t,n,r){var l=A,i=an.transition;an.transition=null;try{A=1,No(e,t,n,r)}finally{A=l,an.transition=i}}function Vd(e,t,n,r){var l=A,i=an.transition;an.transition=null;try{A=4,No(e,t,n,r)}finally{A=l,an.transition=i}}function No(e,t,n,r){if(tl){var l=Ii(e,t,n,r);if(l===null)ri(e,t,r,nl,n),ka(e,r);else if(Ud(l,e,t,n,r))r.stopPropagation();else if(ka(e,r),t&4&&-1<$d.indexOf(e)){for(;l!==null;){var i=gr(l);if(i!==null&&ou(i),i=Ii(e,t,n,r),i===null&&ri(e,t,r,nl,n),i===l)break;l=i}l!==null&&r.stopPropagation()}else ri(e,t,r,null,n)}}var nl=null;function Ii(e,t,n,r){if(nl=null,e=ko(r),e=zt(e),e!==null)if(t=Wt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Js(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return nl=e,null}function du(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Pd()){case _o:return 1;case nu:return 4;case qr:case zd:return 16;case ru:return 536870912;default:return 16}default:return 16}}var ft=null,Eo=null,$r=null;function fu(){if($r)return $r;var e,t=Eo,n=t.length,r,l="value"in ft?ft.value:ft.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===l[i-r];r++);return $r=l.slice(e,1<r?1-r:void 0)}function Ur(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function jr(){return!0}function Sa(){return!1}function je(e){function t(n,r,l,i,o){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?jr:Sa,this.isPropagationStopped=Sa,this}return W(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=jr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=jr)},persist:function(){},isPersistent:jr}),t}var wn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},jo=je(wn),pr=W({},wn,{view:0,detail:0}),Hd=je(pr),Kl,Xl,Rn,Sl=W({},pr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ro,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Rn&&(Rn&&e.type==="mousemove"?(Kl=e.screenX-Rn.screenX,Xl=e.screenY-Rn.screenY):Xl=Kl=0,Rn=e),Kl)},movementY:function(e){return"movementY"in e?e.movementY:Xl}}),Ca=je(Sl),Qd=W({},Sl,{dataTransfer:0}),Yd=je(Qd),Kd=W({},pr,{relatedTarget:0}),Gl=je(Kd),Xd=W({},wn,{animationName:0,elapsedTime:0,pseudoElement:0}),Gd=je(Xd),Zd=W({},wn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Jd=je(Zd),qd=W({},wn,{data:0}),Na=je(qd),ef={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},tf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},nf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function rf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=nf[e])?!!t[e]:!1}function Ro(){return rf}var lf=W({},pr,{key:function(e){if(e.key){var t=ef[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ur(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?tf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ro,charCode:function(e){return e.type==="keypress"?Ur(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ur(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),of=je(lf),af=W({},Sl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ea=je(af),sf=W({},pr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ro}),uf=je(sf),cf=W({},wn,{propertyName:0,elapsedTime:0,pseudoElement:0}),df=je(cf),ff=W({},Sl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),pf=je(ff),gf=[9,13,27,32],To=nt&&"CompositionEvent"in window,Fn=null;nt&&"documentMode"in document&&(Fn=document.documentMode);var mf=nt&&"TextEvent"in window&&!Fn,pu=nt&&(!To||Fn&&8<Fn&&11>=Fn),ja=" ",Ra=!1;function gu(e,t){switch(e){case"keyup":return gf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function mu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Yt=!1;function hf(e,t){switch(e){case"compositionend":return mu(t);case"keypress":return t.which!==32?null:(Ra=!0,ja);case"textInput":return e=t.data,e===ja&&Ra?null:e;default:return null}}function vf(e,t){if(Yt)return e==="compositionend"||!To&&gu(e,t)?(e=fu(),$r=Eo=ft=null,Yt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return pu&&t.locale!=="ko"?null:t.data;default:return null}}var yf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ta(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!yf[e.type]:t==="textarea"}function hu(e,t,n,r){Ys(r),t=rl(t,"onChange"),0<t.length&&(n=new jo("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var $n=null,Jn=null;function xf(e){ju(e,0)}function Cl(e){var t=Gt(e);if($s(t))return e}function wf(e,t){if(e==="change")return t}var vu=!1;if(nt){var Zl;if(nt){var Jl="oninput"in document;if(!Jl){var ba=document.createElement("div");ba.setAttribute("oninput","return;"),Jl=typeof ba.oninput=="function"}Zl=Jl}else Zl=!1;vu=Zl&&(!document.documentMode||9<document.documentMode)}function Pa(){$n&&($n.detachEvent("onpropertychange",yu),Jn=$n=null)}function yu(e){if(e.propertyName==="value"&&Cl(Jn)){var t=[];hu(t,Jn,e,ko(e)),Zs(xf,t)}}function kf(e,t,n){e==="focusin"?(Pa(),$n=t,Jn=n,$n.attachEvent("onpropertychange",yu)):e==="focusout"&&Pa()}function _f(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cl(Jn)}function Sf(e,t){if(e==="click")return Cl(t)}function Cf(e,t){if(e==="input"||e==="change")return Cl(t)}function Nf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ve=typeof Object.is=="function"?Object.is:Nf;function qn(e,t){if(Ve(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!vi.call(t,l)||!Ve(e[l],t[l]))return!1}return!0}function za(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function La(e,t){var n=za(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=za(n)}}function xu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?xu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function wu(){for(var e=window,t=Gr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Gr(e.document)}return t}function bo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Ef(e){var t=wu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&xu(n.ownerDocument.documentElement,n)){if(r!==null&&bo(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=La(n,i);var o=La(n,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var jf=nt&&"documentMode"in document&&11>=document.documentMode,Kt=null,Ai=null,Un=null,Mi=!1;function Da(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Mi||Kt==null||Kt!==Gr(r)||(r=Kt,"selectionStart"in r&&bo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Un&&qn(Un,r)||(Un=r,r=rl(Ai,"onSelect"),0<r.length&&(t=new jo("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Kt)))}function Rr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Xt={animationend:Rr("Animation","AnimationEnd"),animationiteration:Rr("Animation","AnimationIteration"),animationstart:Rr("Animation","AnimationStart"),transitionend:Rr("Transition","TransitionEnd")},ql={},ku={};nt&&(ku=document.createElement("div").style,"AnimationEvent"in window||(delete Xt.animationend.animation,delete Xt.animationiteration.animation,delete Xt.animationstart.animation),"TransitionEvent"in window||delete Xt.transitionend.transition);function Nl(e){if(ql[e])return ql[e];if(!Xt[e])return e;var t=Xt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ku)return ql[e]=t[n];return e}var _u=Nl("animationend"),Su=Nl("animationiteration"),Cu=Nl("animationstart"),Nu=Nl("transitionend"),Eu=new Map,Ia="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ct(e,t){Eu.set(e,t),Bt(t,[e])}for(var ei=0;ei<Ia.length;ei++){var ti=Ia[ei],Rf=ti.toLowerCase(),Tf=ti[0].toUpperCase()+ti.slice(1);Ct(Rf,"on"+Tf)}Ct(_u,"onAnimationEnd");Ct(Su,"onAnimationIteration");Ct(Cu,"onAnimationStart");Ct("dblclick","onDoubleClick");Ct("focusin","onFocus");Ct("focusout","onBlur");Ct(Nu,"onTransitionEnd");cn("onMouseEnter",["mouseout","mouseover"]);cn("onMouseLeave",["mouseout","mouseover"]);cn("onPointerEnter",["pointerout","pointerover"]);cn("onPointerLeave",["pointerout","pointerover"]);Bt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Bt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Bt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Bt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Bt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Bt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var An="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bf=new Set("cancel close invalid load scroll toggle".split(" ").concat(An));function Aa(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,jd(r,t,void 0,e),e.currentTarget=null}function ju(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var a=r[o],s=a.instance,c=a.currentTarget;if(a=a.listener,s!==i&&l.isPropagationStopped())break e;Aa(l,a,c),i=s}else for(o=0;o<r.length;o++){if(a=r[o],s=a.instance,c=a.currentTarget,a=a.listener,s!==i&&l.isPropagationStopped())break e;Aa(l,a,c),i=s}}}if(Jr)throw e=zi,Jr=!1,zi=null,e}function O(e,t){var n=t[Bi];n===void 0&&(n=t[Bi]=new Set);var r=e+"__bubble";n.has(r)||(Ru(t,e,2,!1),n.add(r))}function ni(e,t,n){var r=0;t&&(r|=4),Ru(n,e,r,t)}var Tr="_reactListening"+Math.random().toString(36).slice(2);function er(e){if(!e[Tr]){e[Tr]=!0,Is.forEach(function(n){n!=="selectionchange"&&(bf.has(n)||ni(n,!1,e),ni(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Tr]||(t[Tr]=!0,ni("selectionchange",!1,t))}}function Ru(e,t,n,r){switch(du(t)){case 1:var l=Wd;break;case 4:l=Vd;break;default:l=No}n=l.bind(null,t,n,e),l=void 0,!Pi||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function ri(e,t,n,r,l){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;o=o.return}for(;a!==null;){if(o=zt(a),o===null)return;if(s=o.tag,s===5||s===6){r=i=o;continue e}a=a.parentNode}}r=r.return}Zs(function(){var c=i,g=ko(n),m=[];e:{var h=Eu.get(e);if(h!==void 0){var v=jo,x=e;switch(e){case"keypress":if(Ur(n)===0)break e;case"keydown":case"keyup":v=of;break;case"focusin":x="focus",v=Gl;break;case"focusout":x="blur",v=Gl;break;case"beforeblur":case"afterblur":v=Gl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Ca;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Yd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=uf;break;case _u:case Su:case Cu:v=Gd;break;case Nu:v=df;break;case"scroll":v=Hd;break;case"wheel":v=pf;break;case"copy":case"cut":case"paste":v=Jd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Ea}var w=(t&4)!==0,L=!w&&e==="scroll",p=w?h!==null?h+"Capture":null:h;w=[];for(var f=c,d;f!==null;){d=f;var y=d.stateNode;if(d.tag===5&&y!==null&&(d=y,p!==null&&(y=Kn(f,p),y!=null&&w.push(tr(f,y,d)))),L)break;f=f.return}0<w.length&&(h=new v(h,x,null,n,g),m.push({event:h,listeners:w}))}}if(!(t&7)){e:{if(h=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",h&&n!==Ti&&(x=n.relatedTarget||n.fromElement)&&(zt(x)||x[rt]))break e;if((v||h)&&(h=g.window===g?g:(h=g.ownerDocument)?h.defaultView||h.parentWindow:window,v?(x=n.relatedTarget||n.toElement,v=c,x=x?zt(x):null,x!==null&&(L=Wt(x),x!==L||x.tag!==5&&x.tag!==6)&&(x=null)):(v=null,x=c),v!==x)){if(w=Ca,y="onMouseLeave",p="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(w=Ea,y="onPointerLeave",p="onPointerEnter",f="pointer"),L=v==null?h:Gt(v),d=x==null?h:Gt(x),h=new w(y,f+"leave",v,n,g),h.target=L,h.relatedTarget=d,y=null,zt(g)===c&&(w=new w(p,f+"enter",x,n,g),w.target=d,w.relatedTarget=L,y=w),L=y,v&&x)t:{for(w=v,p=x,f=0,d=w;d;d=Vt(d))f++;for(d=0,y=p;y;y=Vt(y))d++;for(;0<f-d;)w=Vt(w),f--;for(;0<d-f;)p=Vt(p),d--;for(;f--;){if(w===p||p!==null&&w===p.alternate)break t;w=Vt(w),p=Vt(p)}w=null}else w=null;v!==null&&Ma(m,h,v,w,!1),x!==null&&L!==null&&Ma(m,L,x,w,!0)}}e:{if(h=c?Gt(c):window,v=h.nodeName&&h.nodeName.toLowerCase(),v==="select"||v==="input"&&h.type==="file")var _=wf;else if(Ta(h))if(vu)_=Cf;else{_=_f;var S=kf}else(v=h.nodeName)&&v.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(_=Sf);if(_&&(_=_(e,c))){hu(m,_,n,g);break e}S&&S(e,h,c),e==="focusout"&&(S=h._wrapperState)&&S.controlled&&h.type==="number"&&Ci(h,"number",h.value)}switch(S=c?Gt(c):window,e){case"focusin":(Ta(S)||S.contentEditable==="true")&&(Kt=S,Ai=c,Un=null);break;case"focusout":Un=Ai=Kt=null;break;case"mousedown":Mi=!0;break;case"contextmenu":case"mouseup":case"dragend":Mi=!1,Da(m,n,g);break;case"selectionchange":if(jf)break;case"keydown":case"keyup":Da(m,n,g)}var E;if(To)e:{switch(e){case"compositionstart":var j="onCompositionStart";break e;case"compositionend":j="onCompositionEnd";break e;case"compositionupdate":j="onCompositionUpdate";break e}j=void 0}else Yt?gu(e,n)&&(j="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(j="onCompositionStart");j&&(pu&&n.locale!=="ko"&&(Yt||j!=="onCompositionStart"?j==="onCompositionEnd"&&Yt&&(E=fu()):(ft=g,Eo="value"in ft?ft.value:ft.textContent,Yt=!0)),S=rl(c,j),0<S.length&&(j=new Na(j,e,null,n,g),m.push({event:j,listeners:S}),E?j.data=E:(E=mu(n),E!==null&&(j.data=E)))),(E=mf?hf(e,n):vf(e,n))&&(c=rl(c,"onBeforeInput"),0<c.length&&(g=new Na("onBeforeInput","beforeinput",null,n,g),m.push({event:g,listeners:c}),g.data=E))}ju(m,t)})}function tr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function rl(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=Kn(e,n),i!=null&&r.unshift(tr(e,i,l)),i=Kn(e,t),i!=null&&r.push(tr(e,i,l))),e=e.return}return r}function Vt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ma(e,t,n,r,l){for(var i=t._reactName,o=[];n!==null&&n!==r;){var a=n,s=a.alternate,c=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&c!==null&&(a=c,l?(s=Kn(n,i),s!=null&&o.unshift(tr(n,s,a))):l||(s=Kn(n,i),s!=null&&o.push(tr(n,s,a)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Pf=/\r\n?/g,zf=/\u0000|\uFFFD/g;function Oa(e){return(typeof e=="string"?e:""+e).replace(Pf,`
`).replace(zf,"")}function br(e,t,n){if(t=Oa(t),Oa(e)!==t&&n)throw Error(k(425))}function ll(){}var Oi=null,Fi=null;function $i(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ui=typeof setTimeout=="function"?setTimeout:void 0,Lf=typeof clearTimeout=="function"?clearTimeout:void 0,Fa=typeof Promise=="function"?Promise:void 0,Df=typeof queueMicrotask=="function"?queueMicrotask:typeof Fa<"u"?function(e){return Fa.resolve(null).then(e).catch(If)}:Ui;function If(e){setTimeout(function(){throw e})}function li(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Zn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Zn(t)}function vt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function $a(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var kn=Math.random().toString(36).slice(2),Ye="__reactFiber$"+kn,nr="__reactProps$"+kn,rt="__reactContainer$"+kn,Bi="__reactEvents$"+kn,Af="__reactListeners$"+kn,Mf="__reactHandles$"+kn;function zt(e){var t=e[Ye];if(t)return t;for(var n=e.parentNode;n;){if(t=n[rt]||n[Ye]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=$a(e);e!==null;){if(n=e[Ye])return n;e=$a(e)}return t}e=n,n=e.parentNode}return null}function gr(e){return e=e[Ye]||e[rt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Gt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function El(e){return e[nr]||null}var Wi=[],Zt=-1;function Nt(e){return{current:e}}function F(e){0>Zt||(e.current=Wi[Zt],Wi[Zt]=null,Zt--)}function M(e,t){Zt++,Wi[Zt]=e.current,e.current=t}var St={},ce=Nt(St),ve=Nt(!1),Mt=St;function dn(e,t){var n=e.type.contextTypes;if(!n)return St;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in n)l[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function ye(e){return e=e.childContextTypes,e!=null}function il(){F(ve),F(ce)}function Ua(e,t,n){if(ce.current!==St)throw Error(k(168));M(ce,t),M(ve,n)}function Tu(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(k(108,wd(e)||"Unknown",l));return W({},n,r)}function ol(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||St,Mt=ce.current,M(ce,e),M(ve,ve.current),!0}function Ba(e,t,n){var r=e.stateNode;if(!r)throw Error(k(169));n?(e=Tu(e,t,Mt),r.__reactInternalMemoizedMergedChildContext=e,F(ve),F(ce),M(ce,e)):F(ve),M(ve,n)}var Je=null,jl=!1,ii=!1;function bu(e){Je===null?Je=[e]:Je.push(e)}function Of(e){jl=!0,bu(e)}function Et(){if(!ii&&Je!==null){ii=!0;var e=0,t=A;try{var n=Je;for(A=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Je=null,jl=!1}catch(l){throw Je!==null&&(Je=Je.slice(e+1)),tu(_o,Et),l}finally{A=t,ii=!1}}return null}var Jt=[],qt=0,al=null,sl=0,Re=[],Te=0,Ot=null,qe=1,et="";function Tt(e,t){Jt[qt++]=sl,Jt[qt++]=al,al=e,sl=t}function Pu(e,t,n){Re[Te++]=qe,Re[Te++]=et,Re[Te++]=Ot,Ot=e;var r=qe;e=et;var l=32-Be(r)-1;r&=~(1<<l),n+=1;var i=32-Be(t)+l;if(30<i){var o=l-l%5;i=(r&(1<<o)-1).toString(32),r>>=o,l-=o,qe=1<<32-Be(t)+l|n<<l|r,et=i+e}else qe=1<<i|n<<l|r,et=e}function Po(e){e.return!==null&&(Tt(e,1),Pu(e,1,0))}function zo(e){for(;e===al;)al=Jt[--qt],Jt[qt]=null,sl=Jt[--qt],Jt[qt]=null;for(;e===Ot;)Ot=Re[--Te],Re[Te]=null,et=Re[--Te],Re[Te]=null,qe=Re[--Te],Re[Te]=null}var _e=null,ke=null,$=!1,Ue=null;function zu(e,t){var n=be(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Wa(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,_e=e,ke=vt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,_e=e,ke=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Ot!==null?{id:qe,overflow:et}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=be(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,_e=e,ke=null,!0):!1;default:return!1}}function Vi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Hi(e){if($){var t=ke;if(t){var n=t;if(!Wa(e,t)){if(Vi(e))throw Error(k(418));t=vt(n.nextSibling);var r=_e;t&&Wa(e,t)?zu(r,n):(e.flags=e.flags&-4097|2,$=!1,_e=e)}}else{if(Vi(e))throw Error(k(418));e.flags=e.flags&-4097|2,$=!1,_e=e}}}function Va(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;_e=e}function Pr(e){if(e!==_e)return!1;if(!$)return Va(e),$=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!$i(e.type,e.memoizedProps)),t&&(t=ke)){if(Vi(e))throw Lu(),Error(k(418));for(;t;)zu(e,t),t=vt(t.nextSibling)}if(Va(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ke=vt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ke=null}}else ke=_e?vt(e.stateNode.nextSibling):null;return!0}function Lu(){for(var e=ke;e;)e=vt(e.nextSibling)}function fn(){ke=_e=null,$=!1}function Lo(e){Ue===null?Ue=[e]:Ue.push(e)}var Ff=ot.ReactCurrentBatchConfig;function Tn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(k(309));var r=n.stateNode}if(!r)throw Error(k(147,e));var l=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var a=l.refs;o===null?delete a[i]:a[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(k(284));if(!n._owner)throw Error(k(290,e))}return e}function zr(e,t){throw e=Object.prototype.toString.call(t),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ha(e){var t=e._init;return t(e._payload)}function Du(e){function t(p,f){if(e){var d=p.deletions;d===null?(p.deletions=[f],p.flags|=16):d.push(f)}}function n(p,f){if(!e)return null;for(;f!==null;)t(p,f),f=f.sibling;return null}function r(p,f){for(p=new Map;f!==null;)f.key!==null?p.set(f.key,f):p.set(f.index,f),f=f.sibling;return p}function l(p,f){return p=kt(p,f),p.index=0,p.sibling=null,p}function i(p,f,d){return p.index=d,e?(d=p.alternate,d!==null?(d=d.index,d<f?(p.flags|=2,f):d):(p.flags|=2,f)):(p.flags|=1048576,f)}function o(p){return e&&p.alternate===null&&(p.flags|=2),p}function a(p,f,d,y){return f===null||f.tag!==6?(f=fi(d,p.mode,y),f.return=p,f):(f=l(f,d),f.return=p,f)}function s(p,f,d,y){var _=d.type;return _===Qt?g(p,f,d.props.children,y,d.key):f!==null&&(f.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===st&&Ha(_)===f.type)?(y=l(f,d.props),y.ref=Tn(p,f,d),y.return=p,y):(y=Kr(d.type,d.key,d.props,null,p.mode,y),y.ref=Tn(p,f,d),y.return=p,y)}function c(p,f,d,y){return f===null||f.tag!==4||f.stateNode.containerInfo!==d.containerInfo||f.stateNode.implementation!==d.implementation?(f=pi(d,p.mode,y),f.return=p,f):(f=l(f,d.children||[]),f.return=p,f)}function g(p,f,d,y,_){return f===null||f.tag!==7?(f=At(d,p.mode,y,_),f.return=p,f):(f=l(f,d),f.return=p,f)}function m(p,f,d){if(typeof f=="string"&&f!==""||typeof f=="number")return f=fi(""+f,p.mode,d),f.return=p,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case kr:return d=Kr(f.type,f.key,f.props,null,p.mode,d),d.ref=Tn(p,null,f),d.return=p,d;case Ht:return f=pi(f,p.mode,d),f.return=p,f;case st:var y=f._init;return m(p,y(f._payload),d)}if(Dn(f)||Cn(f))return f=At(f,p.mode,d,null),f.return=p,f;zr(p,f)}return null}function h(p,f,d,y){var _=f!==null?f.key:null;if(typeof d=="string"&&d!==""||typeof d=="number")return _!==null?null:a(p,f,""+d,y);if(typeof d=="object"&&d!==null){switch(d.$$typeof){case kr:return d.key===_?s(p,f,d,y):null;case Ht:return d.key===_?c(p,f,d,y):null;case st:return _=d._init,h(p,f,_(d._payload),y)}if(Dn(d)||Cn(d))return _!==null?null:g(p,f,d,y,null);zr(p,d)}return null}function v(p,f,d,y,_){if(typeof y=="string"&&y!==""||typeof y=="number")return p=p.get(d)||null,a(f,p,""+y,_);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case kr:return p=p.get(y.key===null?d:y.key)||null,s(f,p,y,_);case Ht:return p=p.get(y.key===null?d:y.key)||null,c(f,p,y,_);case st:var S=y._init;return v(p,f,d,S(y._payload),_)}if(Dn(y)||Cn(y))return p=p.get(d)||null,g(f,p,y,_,null);zr(f,y)}return null}function x(p,f,d,y){for(var _=null,S=null,E=f,j=f=0,H=null;E!==null&&j<d.length;j++){E.index>j?(H=E,E=null):H=E.sibling;var D=h(p,E,d[j],y);if(D===null){E===null&&(E=H);break}e&&E&&D.alternate===null&&t(p,E),f=i(D,f,j),S===null?_=D:S.sibling=D,S=D,E=H}if(j===d.length)return n(p,E),$&&Tt(p,j),_;if(E===null){for(;j<d.length;j++)E=m(p,d[j],y),E!==null&&(f=i(E,f,j),S===null?_=E:S.sibling=E,S=E);return $&&Tt(p,j),_}for(E=r(p,E);j<d.length;j++)H=v(E,p,j,d[j],y),H!==null&&(e&&H.alternate!==null&&E.delete(H.key===null?j:H.key),f=i(H,f,j),S===null?_=H:S.sibling=H,S=H);return e&&E.forEach(function(Me){return t(p,Me)}),$&&Tt(p,j),_}function w(p,f,d,y){var _=Cn(d);if(typeof _!="function")throw Error(k(150));if(d=_.call(d),d==null)throw Error(k(151));for(var S=_=null,E=f,j=f=0,H=null,D=d.next();E!==null&&!D.done;j++,D=d.next()){E.index>j?(H=E,E=null):H=E.sibling;var Me=h(p,E,D.value,y);if(Me===null){E===null&&(E=H);break}e&&E&&Me.alternate===null&&t(p,E),f=i(Me,f,j),S===null?_=Me:S.sibling=Me,S=Me,E=H}if(D.done)return n(p,E),$&&Tt(p,j),_;if(E===null){for(;!D.done;j++,D=d.next())D=m(p,D.value,y),D!==null&&(f=i(D,f,j),S===null?_=D:S.sibling=D,S=D);return $&&Tt(p,j),_}for(E=r(p,E);!D.done;j++,D=d.next())D=v(E,p,j,D.value,y),D!==null&&(e&&D.alternate!==null&&E.delete(D.key===null?j:D.key),f=i(D,f,j),S===null?_=D:S.sibling=D,S=D);return e&&E.forEach(function(_n){return t(p,_n)}),$&&Tt(p,j),_}function L(p,f,d,y){if(typeof d=="object"&&d!==null&&d.type===Qt&&d.key===null&&(d=d.props.children),typeof d=="object"&&d!==null){switch(d.$$typeof){case kr:e:{for(var _=d.key,S=f;S!==null;){if(S.key===_){if(_=d.type,_===Qt){if(S.tag===7){n(p,S.sibling),f=l(S,d.props.children),f.return=p,p=f;break e}}else if(S.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===st&&Ha(_)===S.type){n(p,S.sibling),f=l(S,d.props),f.ref=Tn(p,S,d),f.return=p,p=f;break e}n(p,S);break}else t(p,S);S=S.sibling}d.type===Qt?(f=At(d.props.children,p.mode,y,d.key),f.return=p,p=f):(y=Kr(d.type,d.key,d.props,null,p.mode,y),y.ref=Tn(p,f,d),y.return=p,p=y)}return o(p);case Ht:e:{for(S=d.key;f!==null;){if(f.key===S)if(f.tag===4&&f.stateNode.containerInfo===d.containerInfo&&f.stateNode.implementation===d.implementation){n(p,f.sibling),f=l(f,d.children||[]),f.return=p,p=f;break e}else{n(p,f);break}else t(p,f);f=f.sibling}f=pi(d,p.mode,y),f.return=p,p=f}return o(p);case st:return S=d._init,L(p,f,S(d._payload),y)}if(Dn(d))return x(p,f,d,y);if(Cn(d))return w(p,f,d,y);zr(p,d)}return typeof d=="string"&&d!==""||typeof d=="number"?(d=""+d,f!==null&&f.tag===6?(n(p,f.sibling),f=l(f,d),f.return=p,p=f):(n(p,f),f=fi(d,p.mode,y),f.return=p,p=f),o(p)):n(p,f)}return L}var pn=Du(!0),Iu=Du(!1),ul=Nt(null),cl=null,en=null,Do=null;function Io(){Do=en=cl=null}function Ao(e){var t=ul.current;F(ul),e._currentValue=t}function Qi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function sn(e,t){cl=e,Do=en=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(he=!0),e.firstContext=null)}function Le(e){var t=e._currentValue;if(Do!==e)if(e={context:e,memoizedValue:t,next:null},en===null){if(cl===null)throw Error(k(308));en=e,cl.dependencies={lanes:0,firstContext:e}}else en=en.next=e;return t}var Lt=null;function Mo(e){Lt===null?Lt=[e]:Lt.push(e)}function Au(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Mo(t)):(n.next=l.next,l.next=n),t.interleaved=n,lt(e,r)}function lt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ut=!1;function Oo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Mu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function tt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function yt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,I&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,lt(e,n)}return l=r.interleaved,l===null?(t.next=t,Mo(r)):(t.next=l.next,l.next=t),r.interleaved=t,lt(e,n)}function Br(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,So(e,n)}}function Qa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function dl(e,t,n,r){var l=e.updateQueue;ut=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var s=a,c=s.next;s.next=null,o===null?i=c:o.next=c,o=s;var g=e.alternate;g!==null&&(g=g.updateQueue,a=g.lastBaseUpdate,a!==o&&(a===null?g.firstBaseUpdate=c:a.next=c,g.lastBaseUpdate=s))}if(i!==null){var m=l.baseState;o=0,g=c=s=null,a=i;do{var h=a.lane,v=a.eventTime;if((r&h)===h){g!==null&&(g=g.next={eventTime:v,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var x=e,w=a;switch(h=t,v=n,w.tag){case 1:if(x=w.payload,typeof x=="function"){m=x.call(v,m,h);break e}m=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=w.payload,h=typeof x=="function"?x.call(v,m,h):x,h==null)break e;m=W({},m,h);break e;case 2:ut=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,h=l.effects,h===null?l.effects=[a]:h.push(a))}else v={eventTime:v,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},g===null?(c=g=v,s=m):g=g.next=v,o|=h;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;h=a,a=h.next,h.next=null,l.lastBaseUpdate=h,l.shared.pending=null}}while(!0);if(g===null&&(s=m),l.baseState=s,l.firstBaseUpdate=c,l.lastBaseUpdate=g,t=l.shared.interleaved,t!==null){l=t;do o|=l.lane,l=l.next;while(l!==t)}else i===null&&(l.shared.lanes=0);$t|=o,e.lanes=o,e.memoizedState=m}}function Ya(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(k(191,l));l.call(r)}}}var mr={},Xe=Nt(mr),rr=Nt(mr),lr=Nt(mr);function Dt(e){if(e===mr)throw Error(k(174));return e}function Fo(e,t){switch(M(lr,t),M(rr,e),M(Xe,mr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ei(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ei(t,e)}F(Xe),M(Xe,t)}function gn(){F(Xe),F(rr),F(lr)}function Ou(e){Dt(lr.current);var t=Dt(Xe.current),n=Ei(t,e.type);t!==n&&(M(rr,e),M(Xe,n))}function $o(e){rr.current===e&&(F(Xe),F(rr))}var U=Nt(0);function fl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var oi=[];function Uo(){for(var e=0;e<oi.length;e++)oi[e]._workInProgressVersionPrimary=null;oi.length=0}var Wr=ot.ReactCurrentDispatcher,ai=ot.ReactCurrentBatchConfig,Ft=0,B=null,G=null,ee=null,pl=!1,Bn=!1,ir=0,$f=0;function ae(){throw Error(k(321))}function Bo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ve(e[n],t[n]))return!1;return!0}function Wo(e,t,n,r,l,i){if(Ft=i,B=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Wr.current=e===null||e.memoizedState===null?Vf:Hf,e=n(r,l),Bn){i=0;do{if(Bn=!1,ir=0,25<=i)throw Error(k(301));i+=1,ee=G=null,t.updateQueue=null,Wr.current=Qf,e=n(r,l)}while(Bn)}if(Wr.current=gl,t=G!==null&&G.next!==null,Ft=0,ee=G=B=null,pl=!1,t)throw Error(k(300));return e}function Vo(){var e=ir!==0;return ir=0,e}function Qe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ee===null?B.memoizedState=ee=e:ee=ee.next=e,ee}function De(){if(G===null){var e=B.alternate;e=e!==null?e.memoizedState:null}else e=G.next;var t=ee===null?B.memoizedState:ee.next;if(t!==null)ee=t,G=e;else{if(e===null)throw Error(k(310));G=e,e={memoizedState:G.memoizedState,baseState:G.baseState,baseQueue:G.baseQueue,queue:G.queue,next:null},ee===null?B.memoizedState=ee=e:ee=ee.next=e}return ee}function or(e,t){return typeof t=="function"?t(e):t}function si(e){var t=De(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=G,l=r.baseQueue,i=n.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}r.baseQueue=l=i,n.pending=null}if(l!==null){i=l.next,r=r.baseState;var a=o=null,s=null,c=i;do{var g=c.lane;if((Ft&g)===g)s!==null&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var m={lane:g,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};s===null?(a=s=m,o=r):s=s.next=m,B.lanes|=g,$t|=g}c=c.next}while(c!==null&&c!==i);s===null?o=r:s.next=a,Ve(r,t.memoizedState)||(he=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do i=l.lane,B.lanes|=i,$t|=i,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ui(e){var t=De(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);Ve(i,t.memoizedState)||(he=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Fu(){}function $u(e,t){var n=B,r=De(),l=t(),i=!Ve(r.memoizedState,l);if(i&&(r.memoizedState=l,he=!0),r=r.queue,Ho(Wu.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||ee!==null&&ee.memoizedState.tag&1){if(n.flags|=2048,ar(9,Bu.bind(null,n,r,l,t),void 0,null),te===null)throw Error(k(349));Ft&30||Uu(n,t,l)}return l}function Uu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=B.updateQueue,t===null?(t={lastEffect:null,stores:null},B.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Bu(e,t,n,r){t.value=n,t.getSnapshot=r,Vu(t)&&Hu(e)}function Wu(e,t,n){return n(function(){Vu(t)&&Hu(e)})}function Vu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ve(e,n)}catch{return!0}}function Hu(e){var t=lt(e,1);t!==null&&We(t,e,1,-1)}function Ka(e){var t=Qe();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:or,lastRenderedState:e},t.queue=e,e=e.dispatch=Wf.bind(null,B,e),[t.memoizedState,e]}function ar(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=B.updateQueue,t===null?(t={lastEffect:null,stores:null},B.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Qu(){return De().memoizedState}function Vr(e,t,n,r){var l=Qe();B.flags|=e,l.memoizedState=ar(1|t,n,void 0,r===void 0?null:r)}function Rl(e,t,n,r){var l=De();r=r===void 0?null:r;var i=void 0;if(G!==null){var o=G.memoizedState;if(i=o.destroy,r!==null&&Bo(r,o.deps)){l.memoizedState=ar(t,n,i,r);return}}B.flags|=e,l.memoizedState=ar(1|t,n,i,r)}function Xa(e,t){return Vr(8390656,8,e,t)}function Ho(e,t){return Rl(2048,8,e,t)}function Yu(e,t){return Rl(4,2,e,t)}function Ku(e,t){return Rl(4,4,e,t)}function Xu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Gu(e,t,n){return n=n!=null?n.concat([e]):null,Rl(4,4,Xu.bind(null,t,e),n)}function Qo(){}function Zu(e,t){var n=De();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Bo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ju(e,t){var n=De();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Bo(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function qu(e,t,n){return Ft&21?(Ve(n,t)||(n=lu(),B.lanes|=n,$t|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,he=!0),e.memoizedState=n)}function Uf(e,t){var n=A;A=n!==0&&4>n?n:4,e(!0);var r=ai.transition;ai.transition={};try{e(!1),t()}finally{A=n,ai.transition=r}}function ec(){return De().memoizedState}function Bf(e,t,n){var r=wt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},tc(e))nc(t,n);else if(n=Au(e,t,n,r),n!==null){var l=fe();We(n,e,r,l),rc(n,t,r)}}function Wf(e,t,n){var r=wt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(tc(e))nc(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,a=i(o,n);if(l.hasEagerState=!0,l.eagerState=a,Ve(a,o)){var s=t.interleaved;s===null?(l.next=l,Mo(t)):(l.next=s.next,s.next=l),t.interleaved=l;return}}catch{}finally{}n=Au(e,t,l,r),n!==null&&(l=fe(),We(n,e,r,l),rc(n,t,r))}}function tc(e){var t=e.alternate;return e===B||t!==null&&t===B}function nc(e,t){Bn=pl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function rc(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,So(e,n)}}var gl={readContext:Le,useCallback:ae,useContext:ae,useEffect:ae,useImperativeHandle:ae,useInsertionEffect:ae,useLayoutEffect:ae,useMemo:ae,useReducer:ae,useRef:ae,useState:ae,useDebugValue:ae,useDeferredValue:ae,useTransition:ae,useMutableSource:ae,useSyncExternalStore:ae,useId:ae,unstable_isNewReconciler:!1},Vf={readContext:Le,useCallback:function(e,t){return Qe().memoizedState=[e,t===void 0?null:t],e},useContext:Le,useEffect:Xa,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Vr(4194308,4,Xu.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Vr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Vr(4,2,e,t)},useMemo:function(e,t){var n=Qe();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Qe();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Bf.bind(null,B,e),[r.memoizedState,e]},useRef:function(e){var t=Qe();return e={current:e},t.memoizedState=e},useState:Ka,useDebugValue:Qo,useDeferredValue:function(e){return Qe().memoizedState=e},useTransition:function(){var e=Ka(!1),t=e[0];return e=Uf.bind(null,e[1]),Qe().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=B,l=Qe();if($){if(n===void 0)throw Error(k(407));n=n()}else{if(n=t(),te===null)throw Error(k(349));Ft&30||Uu(r,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,Xa(Wu.bind(null,r,i,e),[e]),r.flags|=2048,ar(9,Bu.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Qe(),t=te.identifierPrefix;if($){var n=et,r=qe;n=(r&~(1<<32-Be(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=ir++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=$f++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Hf={readContext:Le,useCallback:Zu,useContext:Le,useEffect:Ho,useImperativeHandle:Gu,useInsertionEffect:Yu,useLayoutEffect:Ku,useMemo:Ju,useReducer:si,useRef:Qu,useState:function(){return si(or)},useDebugValue:Qo,useDeferredValue:function(e){var t=De();return qu(t,G.memoizedState,e)},useTransition:function(){var e=si(or)[0],t=De().memoizedState;return[e,t]},useMutableSource:Fu,useSyncExternalStore:$u,useId:ec,unstable_isNewReconciler:!1},Qf={readContext:Le,useCallback:Zu,useContext:Le,useEffect:Ho,useImperativeHandle:Gu,useInsertionEffect:Yu,useLayoutEffect:Ku,useMemo:Ju,useReducer:ui,useRef:Qu,useState:function(){return ui(or)},useDebugValue:Qo,useDeferredValue:function(e){var t=De();return G===null?t.memoizedState=e:qu(t,G.memoizedState,e)},useTransition:function(){var e=ui(or)[0],t=De().memoizedState;return[e,t]},useMutableSource:Fu,useSyncExternalStore:$u,useId:ec,unstable_isNewReconciler:!1};function Fe(e,t){if(e&&e.defaultProps){t=W({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Yi(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:W({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Tl={isMounted:function(e){return(e=e._reactInternals)?Wt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=fe(),l=wt(e),i=tt(r,l);i.payload=t,n!=null&&(i.callback=n),t=yt(e,i,l),t!==null&&(We(t,e,l,r),Br(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=fe(),l=wt(e),i=tt(r,l);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=yt(e,i,l),t!==null&&(We(t,e,l,r),Br(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=fe(),r=wt(e),l=tt(n,r);l.tag=2,t!=null&&(l.callback=t),t=yt(e,l,r),t!==null&&(We(t,e,r,n),Br(t,e,r))}};function Ga(e,t,n,r,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!qn(n,r)||!qn(l,i):!0}function lc(e,t,n){var r=!1,l=St,i=t.contextType;return typeof i=="object"&&i!==null?i=Le(i):(l=ye(t)?Mt:ce.current,r=t.contextTypes,i=(r=r!=null)?dn(e,l):St),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Tl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),t}function Za(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Tl.enqueueReplaceState(t,t.state,null)}function Ki(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Oo(e);var i=t.contextType;typeof i=="object"&&i!==null?l.context=Le(i):(i=ye(t)?Mt:ce.current,l.context=dn(e,i)),l.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Yi(e,t,i,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Tl.enqueueReplaceState(l,l.state,null),dl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function mn(e,t){try{var n="",r=t;do n+=xd(r),r=r.return;while(r);var l=n}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:l,digest:null}}function ci(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Xi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Yf=typeof WeakMap=="function"?WeakMap:Map;function ic(e,t,n){n=tt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){hl||(hl=!0,io=r),Xi(e,t)},n}function oc(e,t,n){n=tt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){Xi(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Xi(e,t),typeof r!="function"&&(xt===null?xt=new Set([this]):xt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Ja(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Yf;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=ap.bind(null,e,t,n),t.then(e,e))}function qa(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function es(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=tt(-1,1),t.tag=2,yt(n,t,1))),n.lanes|=1),e)}var Kf=ot.ReactCurrentOwner,he=!1;function de(e,t,n,r){t.child=e===null?Iu(t,null,n,r):pn(t,e.child,n,r)}function ts(e,t,n,r,l){n=n.render;var i=t.ref;return sn(t,l),r=Wo(e,t,n,r,i,l),n=Vo(),e!==null&&!he?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,it(e,t,l)):($&&n&&Po(t),t.flags|=1,de(e,t,r,l),t.child)}function ns(e,t,n,r,l){if(e===null){var i=n.type;return typeof i=="function"&&!ea(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,ac(e,t,i,r,l)):(e=Kr(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&l)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:qn,n(o,r)&&e.ref===t.ref)return it(e,t,l)}return t.flags|=1,e=kt(i,r),e.ref=t.ref,e.return=t,t.child=e}function ac(e,t,n,r,l){if(e!==null){var i=e.memoizedProps;if(qn(i,r)&&e.ref===t.ref)if(he=!1,t.pendingProps=r=i,(e.lanes&l)!==0)e.flags&131072&&(he=!0);else return t.lanes=e.lanes,it(e,t,l)}return Gi(e,t,n,r,l)}function sc(e,t,n){var r=t.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},M(nn,we),we|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,M(nn,we),we|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,M(nn,we),we|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,M(nn,we),we|=r;return de(e,t,l,n),t.child}function uc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Gi(e,t,n,r,l){var i=ye(n)?Mt:ce.current;return i=dn(t,i),sn(t,l),n=Wo(e,t,n,r,i,l),r=Vo(),e!==null&&!he?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,it(e,t,l)):($&&r&&Po(t),t.flags|=1,de(e,t,n,l),t.child)}function rs(e,t,n,r,l){if(ye(n)){var i=!0;ol(t)}else i=!1;if(sn(t,l),t.stateNode===null)Hr(e,t),lc(t,n,r),Ki(t,n,r,l),r=!0;else if(e===null){var o=t.stateNode,a=t.memoizedProps;o.props=a;var s=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Le(c):(c=ye(n)?Mt:ce.current,c=dn(t,c));var g=n.getDerivedStateFromProps,m=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||s!==c)&&Za(t,o,r,c),ut=!1;var h=t.memoizedState;o.state=h,dl(t,r,o,l),s=t.memoizedState,a!==r||h!==s||ve.current||ut?(typeof g=="function"&&(Yi(t,n,g,r),s=t.memoizedState),(a=ut||Ga(t,n,a,r,h,s,c))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),o.props=r,o.state=s,o.context=c,r=a):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Mu(e,t),a=t.memoizedProps,c=t.type===t.elementType?a:Fe(t.type,a),o.props=c,m=t.pendingProps,h=o.context,s=n.contextType,typeof s=="object"&&s!==null?s=Le(s):(s=ye(n)?Mt:ce.current,s=dn(t,s));var v=n.getDerivedStateFromProps;(g=typeof v=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==m||h!==s)&&Za(t,o,r,s),ut=!1,h=t.memoizedState,o.state=h,dl(t,r,o,l);var x=t.memoizedState;a!==m||h!==x||ve.current||ut?(typeof v=="function"&&(Yi(t,n,v,r),x=t.memoizedState),(c=ut||Ga(t,n,c,r,h,x,s)||!1)?(g||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,x,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,x,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),o.props=r,o.state=x,o.context=s,r=c):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return Zi(e,t,n,r,i,l)}function Zi(e,t,n,r,l,i){uc(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return l&&Ba(t,n,!1),it(e,t,i);r=t.stateNode,Kf.current=t;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=pn(t,e.child,null,i),t.child=pn(t,null,a,i)):de(e,t,a,i),t.memoizedState=r.state,l&&Ba(t,n,!0),t.child}function cc(e){var t=e.stateNode;t.pendingContext?Ua(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ua(e,t.context,!1),Fo(e,t.containerInfo)}function ls(e,t,n,r,l){return fn(),Lo(l),t.flags|=256,de(e,t,n,r),t.child}var Ji={dehydrated:null,treeContext:null,retryLane:0};function qi(e){return{baseLanes:e,cachePool:null,transitions:null}}function dc(e,t,n){var r=t.pendingProps,l=U.current,i=!1,o=(t.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),M(U,l&1),e===null)return Hi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,i?(r=t.mode,i=t.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=zl(o,r,0,null),e=At(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=qi(n),t.memoizedState=Ji,e):Yo(t,o));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return Xf(e,t,o,r,a,l,n);if(i){i=r.fallback,o=t.mode,l=e.child,a=l.sibling;var s={mode:"hidden",children:r.children};return!(o&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=kt(l,s),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?i=kt(a,i):(i=At(i,o,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,o=e.child.memoizedState,o=o===null?qi(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=Ji,r}return i=e.child,e=i.sibling,r=kt(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Yo(e,t){return t=zl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Lr(e,t,n,r){return r!==null&&Lo(r),pn(t,e.child,null,n),e=Yo(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Xf(e,t,n,r,l,i,o){if(n)return t.flags&256?(t.flags&=-257,r=ci(Error(k(422))),Lr(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,l=t.mode,r=zl({mode:"visible",children:r.children},l,0,null),i=At(i,l,o,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&pn(t,e.child,null,o),t.child.memoizedState=qi(o),t.memoizedState=Ji,i);if(!(t.mode&1))return Lr(e,t,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(k(419)),r=ci(i,r,void 0),Lr(e,t,o,r)}if(a=(o&e.childLanes)!==0,he||a){if(r=te,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|o)?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,lt(e,l),We(r,e,l,-1))}return qo(),r=ci(Error(k(421))),Lr(e,t,o,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=sp.bind(null,e),l._reactRetry=t,null):(e=i.treeContext,ke=vt(l.nextSibling),_e=t,$=!0,Ue=null,e!==null&&(Re[Te++]=qe,Re[Te++]=et,Re[Te++]=Ot,qe=e.id,et=e.overflow,Ot=t),t=Yo(t,r.children),t.flags|=4096,t)}function is(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Qi(e.return,t,n)}function di(e,t,n,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=l)}function fc(e,t,n){var r=t.pendingProps,l=r.revealOrder,i=r.tail;if(de(e,t,r.children,n),r=U.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&is(e,n,t);else if(e.tag===19)is(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(M(U,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&fl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),di(t,!1,l,n,i);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&fl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}di(t,!0,n,null,i);break;case"together":di(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Hr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function it(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),$t|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(k(153));if(t.child!==null){for(e=t.child,n=kt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=kt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Gf(e,t,n){switch(t.tag){case 3:cc(t),fn();break;case 5:Ou(t);break;case 1:ye(t.type)&&ol(t);break;case 4:Fo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;M(ul,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(M(U,U.current&1),t.flags|=128,null):n&t.child.childLanes?dc(e,t,n):(M(U,U.current&1),e=it(e,t,n),e!==null?e.sibling:null);M(U,U.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return fc(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),M(U,U.current),r)break;return null;case 22:case 23:return t.lanes=0,sc(e,t,n)}return it(e,t,n)}var pc,eo,gc,mc;pc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};eo=function(){};gc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,Dt(Xe.current);var i=null;switch(n){case"input":l=_i(e,l),r=_i(e,r),i=[];break;case"select":l=W({},l,{value:void 0}),r=W({},r,{value:void 0}),i=[];break;case"textarea":l=Ni(e,l),r=Ni(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ll)}ji(n,r);var o;n=null;for(c in l)if(!r.hasOwnProperty(c)&&l.hasOwnProperty(c)&&l[c]!=null)if(c==="style"){var a=l[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Qn.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var s=r[c];if(a=l!=null?l[c]:void 0,r.hasOwnProperty(c)&&s!==a&&(s!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in s)s.hasOwnProperty(o)&&a[o]!==s[o]&&(n||(n={}),n[o]=s[o])}else n||(i||(i=[]),i.push(c,n)),n=s;else c==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(i=i||[]).push(c,s)):c==="children"?typeof s!="string"&&typeof s!="number"||(i=i||[]).push(c,""+s):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Qn.hasOwnProperty(c)?(s!=null&&c==="onScroll"&&O("scroll",e),i||a===s||(i=[])):(i=i||[]).push(c,s))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};mc=function(e,t,n,r){n!==r&&(t.flags|=4)};function bn(e,t){if(!$)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Zf(e,t,n){var r=t.pendingProps;switch(zo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return se(t),null;case 1:return ye(t.type)&&il(),se(t),null;case 3:return r=t.stateNode,gn(),F(ve),F(ce),Uo(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Pr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ue!==null&&(so(Ue),Ue=null))),eo(e,t),se(t),null;case 5:$o(t);var l=Dt(lr.current);if(n=t.type,e!==null&&t.stateNode!=null)gc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(k(166));return se(t),null}if(e=Dt(Xe.current),Pr(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Ye]=t,r[nr]=i,e=(t.mode&1)!==0,n){case"dialog":O("cancel",r),O("close",r);break;case"iframe":case"object":case"embed":O("load",r);break;case"video":case"audio":for(l=0;l<An.length;l++)O(An[l],r);break;case"source":O("error",r);break;case"img":case"image":case"link":O("error",r),O("load",r);break;case"details":O("toggle",r);break;case"input":ga(r,i),O("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},O("invalid",r);break;case"textarea":ha(r,i),O("invalid",r)}ji(n,i),l=null;for(var o in i)if(i.hasOwnProperty(o)){var a=i[o];o==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&br(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&br(r.textContent,a,e),l=["children",""+a]):Qn.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&O("scroll",r)}switch(n){case"input":_r(r),ma(r,i,!0);break;case"textarea":_r(r),va(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=ll)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ws(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Ye]=t,e[nr]=r,pc(e,t,!1,!1),t.stateNode=e;e:{switch(o=Ri(n,r),n){case"dialog":O("cancel",e),O("close",e),l=r;break;case"iframe":case"object":case"embed":O("load",e),l=r;break;case"video":case"audio":for(l=0;l<An.length;l++)O(An[l],e);l=r;break;case"source":O("error",e),l=r;break;case"img":case"image":case"link":O("error",e),O("load",e),l=r;break;case"details":O("toggle",e),l=r;break;case"input":ga(e,r),l=_i(e,r),O("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=W({},r,{value:void 0}),O("invalid",e);break;case"textarea":ha(e,r),l=Ni(e,r),O("invalid",e);break;default:l=r}ji(n,l),a=l;for(i in a)if(a.hasOwnProperty(i)){var s=a[i];i==="style"?Qs(e,s):i==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Vs(e,s)):i==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Yn(e,s):typeof s=="number"&&Yn(e,""+s):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Qn.hasOwnProperty(i)?s!=null&&i==="onScroll"&&O("scroll",e):s!=null&&vo(e,i,s,o))}switch(n){case"input":_r(e),ma(e,r,!1);break;case"textarea":_r(e),va(e);break;case"option":r.value!=null&&e.setAttribute("value",""+_t(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?rn(e,!!r.multiple,i,!1):r.defaultValue!=null&&rn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=ll)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return se(t),null;case 6:if(e&&t.stateNode!=null)mc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(k(166));if(n=Dt(lr.current),Dt(Xe.current),Pr(t)){if(r=t.stateNode,n=t.memoizedProps,r[Ye]=t,(i=r.nodeValue!==n)&&(e=_e,e!==null))switch(e.tag){case 3:br(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&br(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ye]=t,t.stateNode=r}return se(t),null;case 13:if(F(U),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if($&&ke!==null&&t.mode&1&&!(t.flags&128))Lu(),fn(),t.flags|=98560,i=!1;else if(i=Pr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(k(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(k(317));i[Ye]=t}else fn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;se(t),i=!1}else Ue!==null&&(so(Ue),Ue=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||U.current&1?Z===0&&(Z=3):qo())),t.updateQueue!==null&&(t.flags|=4),se(t),null);case 4:return gn(),eo(e,t),e===null&&er(t.stateNode.containerInfo),se(t),null;case 10:return Ao(t.type._context),se(t),null;case 17:return ye(t.type)&&il(),se(t),null;case 19:if(F(U),i=t.memoizedState,i===null)return se(t),null;if(r=(t.flags&128)!==0,o=i.rendering,o===null)if(r)bn(i,!1);else{if(Z!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=fl(e),o!==null){for(t.flags|=128,bn(i,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return M(U,U.current&1|2),t.child}e=e.sibling}i.tail!==null&&Y()>hn&&(t.flags|=128,r=!0,bn(i,!1),t.lanes=4194304)}else{if(!r)if(e=fl(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),bn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!$)return se(t),null}else 2*Y()-i.renderingStartTime>hn&&n!==1073741824&&(t.flags|=128,r=!0,bn(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Y(),t.sibling=null,n=U.current,M(U,r?n&1|2:n&1),t):(se(t),null);case 22:case 23:return Jo(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?we&1073741824&&(se(t),t.subtreeFlags&6&&(t.flags|=8192)):se(t),null;case 24:return null;case 25:return null}throw Error(k(156,t.tag))}function Jf(e,t){switch(zo(t),t.tag){case 1:return ye(t.type)&&il(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return gn(),F(ve),F(ce),Uo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return $o(t),null;case 13:if(F(U),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(k(340));fn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return F(U),null;case 4:return gn(),null;case 10:return Ao(t.type._context),null;case 22:case 23:return Jo(),null;case 24:return null;default:return null}}var Dr=!1,ue=!1,qf=typeof WeakSet=="function"?WeakSet:Set,C=null;function tn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){V(e,t,r)}else n.current=null}function to(e,t,n){try{n()}catch(r){V(e,t,r)}}var os=!1;function ep(e,t){if(Oi=tl,e=wu(),bo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,a=-1,s=-1,c=0,g=0,m=e,h=null;t:for(;;){for(var v;m!==n||l!==0&&m.nodeType!==3||(a=o+l),m!==i||r!==0&&m.nodeType!==3||(s=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(v=m.firstChild)!==null;)h=m,m=v;for(;;){if(m===e)break t;if(h===n&&++c===l&&(a=o),h===i&&++g===r&&(s=o),(v=m.nextSibling)!==null)break;m=h,h=m.parentNode}m=v}n=a===-1||s===-1?null:{start:a,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Fi={focusedElem:e,selectionRange:n},tl=!1,C=t;C!==null;)if(t=C,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,C=e;else for(;C!==null;){t=C;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var w=x.memoizedProps,L=x.memoizedState,p=t.stateNode,f=p.getSnapshotBeforeUpdate(t.elementType===t.type?w:Fe(t.type,w),L);p.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var d=t.stateNode.containerInfo;d.nodeType===1?d.textContent="":d.nodeType===9&&d.documentElement&&d.removeChild(d.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(y){V(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,C=e;break}C=t.return}return x=os,os=!1,x}function Wn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&to(t,n,i)}l=l.next}while(l!==r)}}function bl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function no(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function hc(e){var t=e.alternate;t!==null&&(e.alternate=null,hc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ye],delete t[nr],delete t[Bi],delete t[Af],delete t[Mf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function vc(e){return e.tag===5||e.tag===3||e.tag===4}function as(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||vc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ro(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ll));else if(r!==4&&(e=e.child,e!==null))for(ro(e,t,n),e=e.sibling;e!==null;)ro(e,t,n),e=e.sibling}function lo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(lo(e,t,n),e=e.sibling;e!==null;)lo(e,t,n),e=e.sibling}var le=null,$e=!1;function at(e,t,n){for(n=n.child;n!==null;)yc(e,t,n),n=n.sibling}function yc(e,t,n){if(Ke&&typeof Ke.onCommitFiberUnmount=="function")try{Ke.onCommitFiberUnmount(_l,n)}catch{}switch(n.tag){case 5:ue||tn(n,t);case 6:var r=le,l=$e;le=null,at(e,t,n),le=r,$e=l,le!==null&&($e?(e=le,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):le.removeChild(n.stateNode));break;case 18:le!==null&&($e?(e=le,n=n.stateNode,e.nodeType===8?li(e.parentNode,n):e.nodeType===1&&li(e,n),Zn(e)):li(le,n.stateNode));break;case 4:r=le,l=$e,le=n.stateNode.containerInfo,$e=!0,at(e,t,n),le=r,$e=l;break;case 0:case 11:case 14:case 15:if(!ue&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&to(n,t,o),l=l.next}while(l!==r)}at(e,t,n);break;case 1:if(!ue&&(tn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){V(n,t,a)}at(e,t,n);break;case 21:at(e,t,n);break;case 22:n.mode&1?(ue=(r=ue)||n.memoizedState!==null,at(e,t,n),ue=r):at(e,t,n);break;default:at(e,t,n)}}function ss(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new qf),t.forEach(function(r){var l=up.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Oe(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var i=e,o=t,a=o;e:for(;a!==null;){switch(a.tag){case 5:le=a.stateNode,$e=!1;break e;case 3:le=a.stateNode.containerInfo,$e=!0;break e;case 4:le=a.stateNode.containerInfo,$e=!0;break e}a=a.return}if(le===null)throw Error(k(160));yc(i,o,l),le=null,$e=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(c){V(l,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)xc(t,e),t=t.sibling}function xc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Oe(t,e),He(e),r&4){try{Wn(3,e,e.return),bl(3,e)}catch(w){V(e,e.return,w)}try{Wn(5,e,e.return)}catch(w){V(e,e.return,w)}}break;case 1:Oe(t,e),He(e),r&512&&n!==null&&tn(n,n.return);break;case 5:if(Oe(t,e),He(e),r&512&&n!==null&&tn(n,n.return),e.flags&32){var l=e.stateNode;try{Yn(l,"")}catch(w){V(e,e.return,w)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&Us(l,i),Ri(a,o);var c=Ri(a,i);for(o=0;o<s.length;o+=2){var g=s[o],m=s[o+1];g==="style"?Qs(l,m):g==="dangerouslySetInnerHTML"?Vs(l,m):g==="children"?Yn(l,m):vo(l,g,m,c)}switch(a){case"input":Si(l,i);break;case"textarea":Bs(l,i);break;case"select":var h=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var v=i.value;v!=null?rn(l,!!i.multiple,v,!1):h!==!!i.multiple&&(i.defaultValue!=null?rn(l,!!i.multiple,i.defaultValue,!0):rn(l,!!i.multiple,i.multiple?[]:"",!1))}l[nr]=i}catch(w){V(e,e.return,w)}}break;case 6:if(Oe(t,e),He(e),r&4){if(e.stateNode===null)throw Error(k(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(w){V(e,e.return,w)}}break;case 3:if(Oe(t,e),He(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Zn(t.containerInfo)}catch(w){V(e,e.return,w)}break;case 4:Oe(t,e),He(e);break;case 13:Oe(t,e),He(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(Go=Y())),r&4&&ss(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(ue=(c=ue)||g,Oe(t,e),ue=c):Oe(t,e),He(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!g&&e.mode&1)for(C=e,g=e.child;g!==null;){for(m=C=g;C!==null;){switch(h=C,v=h.child,h.tag){case 0:case 11:case 14:case 15:Wn(4,h,h.return);break;case 1:tn(h,h.return);var x=h.stateNode;if(typeof x.componentWillUnmount=="function"){r=h,n=h.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(w){V(r,n,w)}}break;case 5:tn(h,h.return);break;case 22:if(h.memoizedState!==null){cs(m);continue}}v!==null?(v.return=h,C=v):cs(m)}g=g.sibling}e:for(g=null,m=e;;){if(m.tag===5){if(g===null){g=m;try{l=m.stateNode,c?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=m.stateNode,s=m.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=Hs("display",o))}catch(w){V(e,e.return,w)}}}else if(m.tag===6){if(g===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(w){V(e,e.return,w)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;g===m&&(g=null),m=m.return}g===m&&(g=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Oe(t,e),He(e),r&4&&ss(e);break;case 21:break;default:Oe(t,e),He(e)}}function He(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(vc(n)){var r=n;break e}n=n.return}throw Error(k(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Yn(l,""),r.flags&=-33);var i=as(e);lo(e,i,l);break;case 3:case 4:var o=r.stateNode.containerInfo,a=as(e);ro(e,a,o);break;default:throw Error(k(161))}}catch(s){V(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function tp(e,t,n){C=e,wc(e)}function wc(e,t,n){for(var r=(e.mode&1)!==0;C!==null;){var l=C,i=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||Dr;if(!o){var a=l.alternate,s=a!==null&&a.memoizedState!==null||ue;a=Dr;var c=ue;if(Dr=o,(ue=s)&&!c)for(C=l;C!==null;)o=C,s=o.child,o.tag===22&&o.memoizedState!==null?ds(l):s!==null?(s.return=o,C=s):ds(l);for(;i!==null;)C=i,wc(i),i=i.sibling;C=l,Dr=a,ue=c}us(e)}else l.subtreeFlags&8772&&i!==null?(i.return=l,C=i):us(e)}}function us(e){for(;C!==null;){var t=C;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ue||bl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ue)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Fe(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Ya(t,i,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ya(t,o,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var g=c.memoizedState;if(g!==null){var m=g.dehydrated;m!==null&&Zn(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}ue||t.flags&512&&no(t)}catch(h){V(t,t.return,h)}}if(t===e){C=null;break}if(n=t.sibling,n!==null){n.return=t.return,C=n;break}C=t.return}}function cs(e){for(;C!==null;){var t=C;if(t===e){C=null;break}var n=t.sibling;if(n!==null){n.return=t.return,C=n;break}C=t.return}}function ds(e){for(;C!==null;){var t=C;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{bl(4,t)}catch(s){V(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(s){V(t,l,s)}}var i=t.return;try{no(t)}catch(s){V(t,i,s)}break;case 5:var o=t.return;try{no(t)}catch(s){V(t,o,s)}}}catch(s){V(t,t.return,s)}if(t===e){C=null;break}var a=t.sibling;if(a!==null){a.return=t.return,C=a;break}C=t.return}}var np=Math.ceil,ml=ot.ReactCurrentDispatcher,Ko=ot.ReactCurrentOwner,Pe=ot.ReactCurrentBatchConfig,I=0,te=null,X=null,ie=0,we=0,nn=Nt(0),Z=0,sr=null,$t=0,Pl=0,Xo=0,Vn=null,me=null,Go=0,hn=1/0,Ze=null,hl=!1,io=null,xt=null,Ir=!1,pt=null,vl=0,Hn=0,oo=null,Qr=-1,Yr=0;function fe(){return I&6?Y():Qr!==-1?Qr:Qr=Y()}function wt(e){return e.mode&1?I&2&&ie!==0?ie&-ie:Ff.transition!==null?(Yr===0&&(Yr=lu()),Yr):(e=A,e!==0||(e=window.event,e=e===void 0?16:du(e.type)),e):1}function We(e,t,n,r){if(50<Hn)throw Hn=0,oo=null,Error(k(185));fr(e,n,r),(!(I&2)||e!==te)&&(e===te&&(!(I&2)&&(Pl|=n),Z===4&&dt(e,ie)),xe(e,r),n===1&&I===0&&!(t.mode&1)&&(hn=Y()+500,jl&&Et()))}function xe(e,t){var n=e.callbackNode;Od(e,t);var r=el(e,e===te?ie:0);if(r===0)n!==null&&wa(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&wa(n),t===1)e.tag===0?Of(fs.bind(null,e)):bu(fs.bind(null,e)),Df(function(){!(I&6)&&Et()}),n=null;else{switch(iu(r)){case 1:n=_o;break;case 4:n=nu;break;case 16:n=qr;break;case 536870912:n=ru;break;default:n=qr}n=Rc(n,kc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function kc(e,t){if(Qr=-1,Yr=0,I&6)throw Error(k(327));var n=e.callbackNode;if(un()&&e.callbackNode!==n)return null;var r=el(e,e===te?ie:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=yl(e,r);else{t=r;var l=I;I|=2;var i=Sc();(te!==e||ie!==t)&&(Ze=null,hn=Y()+500,It(e,t));do try{ip();break}catch(a){_c(e,a)}while(!0);Io(),ml.current=i,I=l,X!==null?t=0:(te=null,ie=0,t=Z)}if(t!==0){if(t===2&&(l=Li(e),l!==0&&(r=l,t=ao(e,l))),t===1)throw n=sr,It(e,0),dt(e,r),xe(e,Y()),n;if(t===6)dt(e,r);else{if(l=e.current.alternate,!(r&30)&&!rp(l)&&(t=yl(e,r),t===2&&(i=Li(e),i!==0&&(r=i,t=ao(e,i))),t===1))throw n=sr,It(e,0),dt(e,r),xe(e,Y()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(k(345));case 2:bt(e,me,Ze);break;case 3:if(dt(e,r),(r&130023424)===r&&(t=Go+500-Y(),10<t)){if(el(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){fe(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Ui(bt.bind(null,e,me,Ze),t);break}bt(e,me,Ze);break;case 4:if(dt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var o=31-Be(r);i=1<<o,o=t[o],o>l&&(l=o),r&=~i}if(r=l,r=Y()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*np(r/1960))-r,10<r){e.timeoutHandle=Ui(bt.bind(null,e,me,Ze),r);break}bt(e,me,Ze);break;case 5:bt(e,me,Ze);break;default:throw Error(k(329))}}}return xe(e,Y()),e.callbackNode===n?kc.bind(null,e):null}function ao(e,t){var n=Vn;return e.current.memoizedState.isDehydrated&&(It(e,t).flags|=256),e=yl(e,t),e!==2&&(t=me,me=n,t!==null&&so(t)),e}function so(e){me===null?me=e:me.push.apply(me,e)}function rp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],i=l.getSnapshot;l=l.value;try{if(!Ve(i(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function dt(e,t){for(t&=~Xo,t&=~Pl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Be(t),r=1<<n;e[n]=-1,t&=~r}}function fs(e){if(I&6)throw Error(k(327));un();var t=el(e,0);if(!(t&1))return xe(e,Y()),null;var n=yl(e,t);if(e.tag!==0&&n===2){var r=Li(e);r!==0&&(t=r,n=ao(e,r))}if(n===1)throw n=sr,It(e,0),dt(e,t),xe(e,Y()),n;if(n===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,bt(e,me,Ze),xe(e,Y()),null}function Zo(e,t){var n=I;I|=1;try{return e(t)}finally{I=n,I===0&&(hn=Y()+500,jl&&Et())}}function Ut(e){pt!==null&&pt.tag===0&&!(I&6)&&un();var t=I;I|=1;var n=Pe.transition,r=A;try{if(Pe.transition=null,A=1,e)return e()}finally{A=r,Pe.transition=n,I=t,!(I&6)&&Et()}}function Jo(){we=nn.current,F(nn)}function It(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Lf(n)),X!==null)for(n=X.return;n!==null;){var r=n;switch(zo(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&il();break;case 3:gn(),F(ve),F(ce),Uo();break;case 5:$o(r);break;case 4:gn();break;case 13:F(U);break;case 19:F(U);break;case 10:Ao(r.type._context);break;case 22:case 23:Jo()}n=n.return}if(te=e,X=e=kt(e.current,null),ie=we=t,Z=0,sr=null,Xo=Pl=$t=0,me=Vn=null,Lt!==null){for(t=0;t<Lt.length;t++)if(n=Lt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=l,r.next=o}n.pending=r}Lt=null}return e}function _c(e,t){do{var n=X;try{if(Io(),Wr.current=gl,pl){for(var r=B.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}pl=!1}if(Ft=0,ee=G=B=null,Bn=!1,ir=0,Ko.current=null,n===null||n.return===null){Z=1,sr=t,X=null;break}e:{var i=e,o=n.return,a=n,s=t;if(t=ie,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var c=s,g=a,m=g.tag;if(!(g.mode&1)&&(m===0||m===11||m===15)){var h=g.alternate;h?(g.updateQueue=h.updateQueue,g.memoizedState=h.memoizedState,g.lanes=h.lanes):(g.updateQueue=null,g.memoizedState=null)}var v=qa(o);if(v!==null){v.flags&=-257,es(v,o,a,i,t),v.mode&1&&Ja(i,c,t),t=v,s=c;var x=t.updateQueue;if(x===null){var w=new Set;w.add(s),t.updateQueue=w}else x.add(s);break e}else{if(!(t&1)){Ja(i,c,t),qo();break e}s=Error(k(426))}}else if($&&a.mode&1){var L=qa(o);if(L!==null){!(L.flags&65536)&&(L.flags|=256),es(L,o,a,i,t),Lo(mn(s,a));break e}}i=s=mn(s,a),Z!==4&&(Z=2),Vn===null?Vn=[i]:Vn.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var p=ic(i,s,t);Qa(i,p);break e;case 1:a=s;var f=i.type,d=i.stateNode;if(!(i.flags&128)&&(typeof f.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(xt===null||!xt.has(d)))){i.flags|=65536,t&=-t,i.lanes|=t;var y=oc(i,a,t);Qa(i,y);break e}}i=i.return}while(i!==null)}Nc(n)}catch(_){t=_,X===n&&n!==null&&(X=n=n.return);continue}break}while(!0)}function Sc(){var e=ml.current;return ml.current=gl,e===null?gl:e}function qo(){(Z===0||Z===3||Z===2)&&(Z=4),te===null||!($t&268435455)&&!(Pl&268435455)||dt(te,ie)}function yl(e,t){var n=I;I|=2;var r=Sc();(te!==e||ie!==t)&&(Ze=null,It(e,t));do try{lp();break}catch(l){_c(e,l)}while(!0);if(Io(),I=n,ml.current=r,X!==null)throw Error(k(261));return te=null,ie=0,Z}function lp(){for(;X!==null;)Cc(X)}function ip(){for(;X!==null&&!Td();)Cc(X)}function Cc(e){var t=jc(e.alternate,e,we);e.memoizedProps=e.pendingProps,t===null?Nc(e):X=t,Ko.current=null}function Nc(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Jf(n,t),n!==null){n.flags&=32767,X=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Z=6,X=null;return}}else if(n=Zf(n,t,we),n!==null){X=n;return}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);Z===0&&(Z=5)}function bt(e,t,n){var r=A,l=Pe.transition;try{Pe.transition=null,A=1,op(e,t,n,r)}finally{Pe.transition=l,A=r}return null}function op(e,t,n,r){do un();while(pt!==null);if(I&6)throw Error(k(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Fd(e,i),e===te&&(X=te=null,ie=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ir||(Ir=!0,Rc(qr,function(){return un(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Pe.transition,Pe.transition=null;var o=A;A=1;var a=I;I|=4,Ko.current=null,ep(e,n),xc(n,e),Ef(Fi),tl=!!Oi,Fi=Oi=null,e.current=n,tp(n),bd(),I=a,A=o,Pe.transition=i}else e.current=n;if(Ir&&(Ir=!1,pt=e,vl=l),i=e.pendingLanes,i===0&&(xt=null),Ld(n.stateNode),xe(e,Y()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(hl)throw hl=!1,e=io,io=null,e;return vl&1&&e.tag!==0&&un(),i=e.pendingLanes,i&1?e===oo?Hn++:(Hn=0,oo=e):Hn=0,Et(),null}function un(){if(pt!==null){var e=iu(vl),t=Pe.transition,n=A;try{if(Pe.transition=null,A=16>e?16:e,pt===null)var r=!1;else{if(e=pt,pt=null,vl=0,I&6)throw Error(k(331));var l=I;for(I|=4,C=e.current;C!==null;){var i=C,o=i.child;if(C.flags&16){var a=i.deletions;if(a!==null){for(var s=0;s<a.length;s++){var c=a[s];for(C=c;C!==null;){var g=C;switch(g.tag){case 0:case 11:case 15:Wn(8,g,i)}var m=g.child;if(m!==null)m.return=g,C=m;else for(;C!==null;){g=C;var h=g.sibling,v=g.return;if(hc(g),g===c){C=null;break}if(h!==null){h.return=v,C=h;break}C=v}}}var x=i.alternate;if(x!==null){var w=x.child;if(w!==null){x.child=null;do{var L=w.sibling;w.sibling=null,w=L}while(w!==null)}}C=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,C=o;else e:for(;C!==null;){if(i=C,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Wn(9,i,i.return)}var p=i.sibling;if(p!==null){p.return=i.return,C=p;break e}C=i.return}}var f=e.current;for(C=f;C!==null;){o=C;var d=o.child;if(o.subtreeFlags&2064&&d!==null)d.return=o,C=d;else e:for(o=f;C!==null;){if(a=C,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:bl(9,a)}}catch(_){V(a,a.return,_)}if(a===o){C=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,C=y;break e}C=a.return}}if(I=l,Et(),Ke&&typeof Ke.onPostCommitFiberRoot=="function")try{Ke.onPostCommitFiberRoot(_l,e)}catch{}r=!0}return r}finally{A=n,Pe.transition=t}}return!1}function ps(e,t,n){t=mn(n,t),t=ic(e,t,1),e=yt(e,t,1),t=fe(),e!==null&&(fr(e,1,t),xe(e,t))}function V(e,t,n){if(e.tag===3)ps(e,e,n);else for(;t!==null;){if(t.tag===3){ps(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(xt===null||!xt.has(r))){e=mn(n,e),e=oc(t,e,1),t=yt(t,e,1),e=fe(),t!==null&&(fr(t,1,e),xe(t,e));break}}t=t.return}}function ap(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=fe(),e.pingedLanes|=e.suspendedLanes&n,te===e&&(ie&n)===n&&(Z===4||Z===3&&(ie&130023424)===ie&&500>Y()-Go?It(e,0):Xo|=n),xe(e,t)}function Ec(e,t){t===0&&(e.mode&1?(t=Nr,Nr<<=1,!(Nr&130023424)&&(Nr=4194304)):t=1);var n=fe();e=lt(e,t),e!==null&&(fr(e,t,n),xe(e,n))}function sp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ec(e,n)}function up(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(t),Ec(e,n)}var jc;jc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ve.current)he=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return he=!1,Gf(e,t,n);he=!!(e.flags&131072)}else he=!1,$&&t.flags&1048576&&Pu(t,sl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Hr(e,t),e=t.pendingProps;var l=dn(t,ce.current);sn(t,n),l=Wo(null,t,r,e,l,n);var i=Vo();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ye(r)?(i=!0,ol(t)):i=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Oo(t),l.updater=Tl,t.stateNode=l,l._reactInternals=t,Ki(t,r,e,n),t=Zi(null,t,r,!0,i,n)):(t.tag=0,$&&i&&Po(t),de(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Hr(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=dp(r),e=Fe(r,e),l){case 0:t=Gi(null,t,r,e,n);break e;case 1:t=rs(null,t,r,e,n);break e;case 11:t=ts(null,t,r,e,n);break e;case 14:t=ns(null,t,r,Fe(r.type,e),n);break e}throw Error(k(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Fe(r,l),Gi(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Fe(r,l),rs(e,t,r,l,n);case 3:e:{if(cc(t),e===null)throw Error(k(387));r=t.pendingProps,i=t.memoizedState,l=i.element,Mu(e,t),dl(t,r,null,n);var o=t.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){l=mn(Error(k(423)),t),t=ls(e,t,r,n,l);break e}else if(r!==l){l=mn(Error(k(424)),t),t=ls(e,t,r,n,l);break e}else for(ke=vt(t.stateNode.containerInfo.firstChild),_e=t,$=!0,Ue=null,n=Iu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(fn(),r===l){t=it(e,t,n);break e}de(e,t,r,n)}t=t.child}return t;case 5:return Ou(t),e===null&&Hi(t),r=t.type,l=t.pendingProps,i=e!==null?e.memoizedProps:null,o=l.children,$i(r,l)?o=null:i!==null&&$i(r,i)&&(t.flags|=32),uc(e,t),de(e,t,o,n),t.child;case 6:return e===null&&Hi(t),null;case 13:return dc(e,t,n);case 4:return Fo(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=pn(t,null,r,n):de(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Fe(r,l),ts(e,t,r,l,n);case 7:return de(e,t,t.pendingProps,n),t.child;case 8:return de(e,t,t.pendingProps.children,n),t.child;case 12:return de(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,i=t.memoizedProps,o=l.value,M(ul,r._currentValue),r._currentValue=o,i!==null)if(Ve(i.value,o)){if(i.children===l.children&&!ve.current){t=it(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var a=i.dependencies;if(a!==null){o=i.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(i.tag===1){s=tt(-1,n&-n),s.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var g=c.pending;g===null?s.next=s:(s.next=g.next,g.next=s),c.pending=s}}i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Qi(i.return,n,t),a.lanes|=n;break}s=s.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(k(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Qi(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}de(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,sn(t,n),l=Le(l),r=r(l),t.flags|=1,de(e,t,r,n),t.child;case 14:return r=t.type,l=Fe(r,t.pendingProps),l=Fe(r.type,l),ns(e,t,r,l,n);case 15:return ac(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Fe(r,l),Hr(e,t),t.tag=1,ye(r)?(e=!0,ol(t)):e=!1,sn(t,n),lc(t,r,l),Ki(t,r,l,n),Zi(null,t,r,!0,e,n);case 19:return fc(e,t,n);case 22:return sc(e,t,n)}throw Error(k(156,t.tag))};function Rc(e,t){return tu(e,t)}function cp(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function be(e,t,n,r){return new cp(e,t,n,r)}function ea(e){return e=e.prototype,!(!e||!e.isReactComponent)}function dp(e){if(typeof e=="function")return ea(e)?1:0;if(e!=null){if(e=e.$$typeof,e===xo)return 11;if(e===wo)return 14}return 2}function kt(e,t){var n=e.alternate;return n===null?(n=be(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Kr(e,t,n,r,l,i){var o=2;if(r=e,typeof e=="function")ea(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Qt:return At(n.children,l,i,t);case yo:o=8,l|=8;break;case yi:return e=be(12,n,t,l|2),e.elementType=yi,e.lanes=i,e;case xi:return e=be(13,n,t,l),e.elementType=xi,e.lanes=i,e;case wi:return e=be(19,n,t,l),e.elementType=wi,e.lanes=i,e;case Os:return zl(n,l,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case As:o=10;break e;case Ms:o=9;break e;case xo:o=11;break e;case wo:o=14;break e;case st:o=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return t=be(o,n,t,l),t.elementType=e,t.type=r,t.lanes=i,t}function At(e,t,n,r){return e=be(7,e,r,t),e.lanes=n,e}function zl(e,t,n,r){return e=be(22,e,r,t),e.elementType=Os,e.lanes=n,e.stateNode={isHidden:!1},e}function fi(e,t,n){return e=be(6,e,null,t),e.lanes=n,e}function pi(e,t,n){return t=be(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function fp(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Yl(0),this.expirationTimes=Yl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Yl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function ta(e,t,n,r,l,i,o,a,s){return e=new fp(e,t,n,a,s),t===1?(t=1,i===!0&&(t|=8)):t=0,i=be(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Oo(i),e}function pp(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ht,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Tc(e){if(!e)return St;e=e._reactInternals;e:{if(Wt(e)!==e||e.tag!==1)throw Error(k(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ye(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(k(171))}if(e.tag===1){var n=e.type;if(ye(n))return Tu(e,n,t)}return t}function bc(e,t,n,r,l,i,o,a,s){return e=ta(n,r,!0,e,l,i,o,a,s),e.context=Tc(null),n=e.current,r=fe(),l=wt(n),i=tt(r,l),i.callback=t??null,yt(n,i,l),e.current.lanes=l,fr(e,l,r),xe(e,r),e}function Ll(e,t,n,r){var l=t.current,i=fe(),o=wt(l);return n=Tc(n),t.context===null?t.context=n:t.pendingContext=n,t=tt(i,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=yt(l,t,o),e!==null&&(We(e,l,o,i),Br(e,l,o)),o}function xl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function gs(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function na(e,t){gs(e,t),(e=e.alternate)&&gs(e,t)}function gp(){return null}var Pc=typeof reportError=="function"?reportError:function(e){console.error(e)};function ra(e){this._internalRoot=e}Dl.prototype.render=ra.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(k(409));Ll(e,t,null,null)};Dl.prototype.unmount=ra.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ut(function(){Ll(null,e,null,null)}),t[rt]=null}};function Dl(e){this._internalRoot=e}Dl.prototype.unstable_scheduleHydration=function(e){if(e){var t=su();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ct.length&&t!==0&&t<ct[n].priority;n++);ct.splice(n,0,e),n===0&&cu(e)}};function la(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Il(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ms(){}function mp(e,t,n,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var c=xl(o);i.call(c)}}var o=bc(t,r,e,0,null,!1,!1,"",ms);return e._reactRootContainer=o,e[rt]=o.current,er(e.nodeType===8?e.parentNode:e),Ut(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var c=xl(s);a.call(c)}}var s=ta(e,0,!1,null,null,!1,!1,"",ms);return e._reactRootContainer=s,e[rt]=s.current,er(e.nodeType===8?e.parentNode:e),Ut(function(){Ll(t,s,n,r)}),s}function Al(e,t,n,r,l){var i=n._reactRootContainer;if(i){var o=i;if(typeof l=="function"){var a=l;l=function(){var s=xl(o);a.call(s)}}Ll(t,o,e,l)}else o=mp(n,t,e,l,r);return xl(o)}ou=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=In(t.pendingLanes);n!==0&&(So(t,n|1),xe(t,Y()),!(I&6)&&(hn=Y()+500,Et()))}break;case 13:Ut(function(){var r=lt(e,1);if(r!==null){var l=fe();We(r,e,1,l)}}),na(e,1)}};Co=function(e){if(e.tag===13){var t=lt(e,134217728);if(t!==null){var n=fe();We(t,e,134217728,n)}na(e,134217728)}};au=function(e){if(e.tag===13){var t=wt(e),n=lt(e,t);if(n!==null){var r=fe();We(n,e,t,r)}na(e,t)}};su=function(){return A};uu=function(e,t){var n=A;try{return A=e,t()}finally{A=n}};bi=function(e,t,n){switch(t){case"input":if(Si(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=El(r);if(!l)throw Error(k(90));$s(r),Si(r,l)}}}break;case"textarea":Bs(e,n);break;case"select":t=n.value,t!=null&&rn(e,!!n.multiple,t,!1)}};Xs=Zo;Gs=Ut;var hp={usingClientEntryPoint:!1,Events:[gr,Gt,El,Ys,Ks,Zo]},Pn={findFiberByHostInstance:zt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},vp={bundleType:Pn.bundleType,version:Pn.version,rendererPackageName:Pn.rendererPackageName,rendererConfig:Pn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ot.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=qs(e),e===null?null:e.stateNode},findFiberByHostInstance:Pn.findFiberByHostInstance||gp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ar=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ar.isDisabled&&Ar.supportsFiber)try{_l=Ar.inject(vp),Ke=Ar}catch{}}Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=hp;Ee.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!la(t))throw Error(k(200));return pp(e,t,null,n)};Ee.createRoot=function(e,t){if(!la(e))throw Error(k(299));var n=!1,r="",l=Pc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=ta(e,1,!1,null,null,n,!1,r,l),e[rt]=t.current,er(e.nodeType===8?e.parentNode:e),new ra(t)};Ee.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=qs(t),e=e===null?null:e.stateNode,e};Ee.flushSync=function(e){return Ut(e)};Ee.hydrate=function(e,t,n){if(!Il(t))throw Error(k(200));return Al(null,e,t,!0,n)};Ee.hydrateRoot=function(e,t,n){if(!la(e))throw Error(k(405));var r=n!=null&&n.hydratedSources||null,l=!1,i="",o=Pc;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=bc(t,null,e,1,n??null,l,!1,i,o),e[rt]=t.current,er(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Dl(t)};Ee.render=function(e,t,n){if(!Il(t))throw Error(k(200));return Al(null,e,t,!1,n)};Ee.unmountComponentAtNode=function(e){if(!Il(e))throw Error(k(40));return e._reactRootContainer?(Ut(function(){Al(null,null,e,!1,function(){e._reactRootContainer=null,e[rt]=null})}),!0):!1};Ee.unstable_batchedUpdates=Zo;Ee.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Il(n))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return Al(e,t,n,!1,r)};Ee.version="18.3.1-next-f1338f8080-20240426";function zc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(zc)}catch(e){console.error(e)}}zc(),zs.exports=Ee;var yp=zs.exports,Lc,hs=yp;Lc=hs.createRoot,hs.hydrateRoot;const ur={REPORTS:{SERVICE_CALL_LOG:"Service_Call_Logs",SERVICE_REPORT:"All_Service_Reports",SERVICE_FEEDBACK:"All_Service_Feedback1",FIELD_EXECUTIVE:"Field_Executives",EMPLOYEES:"All_Employees",SERVICE_QUOTATION:"Service_Quotations",SERVICE_INVOICE:"Service_Invoice_Follow_up_Un_paid",REJECTION_REPLACEMENT:"Rejection_And_Replacement_Register_Report",STANDBY_UNIT:"Stand_By_Unit1",AMC_CONTRACT:"All_Amc_Contracts",PRODUCT:"All_Product",EXPENSE_ENGINEER:"Expense_of_Engineer_Report",REWORK:"All_Reworks",TRAINING_REPORT:"Training_Reports",TOOL_KIT:"Production_Tool_Kit_of_Engineers1",VEHICLE_SERVICE:"Vehicle_Service_Reports",INTERNAL_CALIBRATION:"Internal_Calibrations"},PAGE_SIZE:1e3,SERVICE_DEPARTMENT_ROLE_ID:"302392000000624113",WEEK_STARTS_ON:1},ne=ur.REPORTS,hr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],xp=["January","February","March","April","May","June","July","August","September","October","November","December"],wp=864e5,wl=e=>String(e).padStart(2,"0"),cr=e=>new Date(e.getFullYear(),e.getMonth(),e.getDate()),vr=(e,t)=>new Date(e.getFullYear(),e.getMonth(),e.getDate()+t),kp=(e,t)=>new Date(e.getFullYear()+t,e.getMonth(),e.getDate()),Ie=e=>new Date(e.getFullYear(),e.getMonth(),1),_p=e=>new Date(e.getFullYear(),e.getMonth()+1,0),Dc=e=>new Date(e.getFullYear(),0,1),Ae=e=>vr(cr(e),-((e.getDay()-ur.WEEK_STARTS_ON+7)%7)),vs=(e,t)=>e<t?e:t,Ic=(e,t)=>Math.round((cr(t)-cr(e))/wp);function Ac(e){if(e==null||e==="")return null;if(e instanceof Date)return Number.isNaN(e.getTime())?null:e;const t=String(e).trim(),n="(?:[ T,]+(\\d{1,2}):(\\d{2})(?::(\\d{2}))?)?";let r,l,i,o;if(r=t.match(new RegExp("^(\\d{4})[-/.](\\d{1,2})[-/.](\\d{1,2})"+n)))l=+r[1],i=+r[2]-1,o=+r[3];else if(r=t.match(new RegExp("^(\\d{1,2})[-/. ]([A-Za-z]{3,9})[-/. ,]+(\\d{2,4})"+n))){if(i=hr.findIndex(a=>a.toLowerCase()===r[2].slice(0,3).toLowerCase()),i<0)return null;o=+r[1],l=+r[3]}else if(r=t.match(new RegExp("^(\\d{1,2})[-/.](\\d{1,2})[-/.](\\d{2,4})"+n)))o=+r[1],i=+r[2]-1,l=+r[3];else return null;return l<100&&(l+=2e3),i<0||i>11||o<1||o>31?null:new Date(l,i,o,+(r[4]||0),+(r[5]||0),+(r[6]||0))}function Ce(e){const t=Ac(e);return t?cr(t):null}const Ml=(e,t)=>{const n=Ce(e);return n!==null&&n.getTime()===t.getTime()},J=(e,t,n)=>{const r=Ce(e);return r!==null&&r>=t&&r<=n},Sp=(e,t)=>{const n=Ce(e);return n!==null&&n<=t},Cp=(e,t)=>{const n=Ce(e);return n!==null&&n>=t},Mc=e=>e?`${wl(e.getDate())}-${wl(e.getMonth()+1)}-${e.getFullYear()}`:"",Oc=e=>e?`${wl(e.getDate())}-${hr[e.getMonth()]}-${e.getFullYear()}`:"",ys=e=>e?`${wl(e.getDate())} ${hr[e.getMonth()]} ${e.getFullYear()}`:"",Fc=e=>e==null||e===""||Array.isArray(e)&&e.length===0||typeof e=="object"&&!Array.isArray(e)&&Object.keys(e).length===0,K=e=>!Fc(e);function Ge(e){return e==null||e===""?"":typeof e=="object"?e.ID!==void 0?String(e.ID):e.id!==void 0?String(e.id):"":String(e)}function T(e){if(e==null)return"";if(Array.isArray(e))return e.map(T).join(", ");if(typeof e=="object"){const t=e.display_value??e.zc_display_value;return t==null?"":String(t)}return String(e)}function ze(e){if(e==null||e==="")return 0;const t=typeof e=="number"?e:Number(String(e).replace(/,/g,"").trim());return Number.isFinite(t)?t:0}function Ol(e){const t=T(e).trim();if(t==="")return NaN;const n=Number(t);return Number.isFinite(n)?n:NaN}const Np=e=>e===!0||String(e).toLowerCase()==="true",vn=e=>Array.isArray(e)?e:[],Ne=(e,t)=>e.reduce((n,r)=>n+t(r),0),R=(e,t=1)=>{const n=10**t;return Math.round((e+Number.EPSILON)*n)/n},ia=e=>T(e.Nature_Of_Calls);function oa(e,t){const n=new Map;return e.forEach(r=>{const l=t(r);n.set(l,(n.get(l)||0)+1)}),n}const gi=Oc,uo={serviceCallLogs:{report:ne.SERVICE_CALL_LOG,label:"Service Call Log",stage:"today",criteria:e=>`(Date_field >= "${gi(vs(Dc(e),Ae(e)))}" || Status == "Pending")`,fields:["Date_field","Status","Customer_Name","Service_Engineer_Name","Nature_Of_Calls","Repeat_Call_Reason","Service_Call_Log_No"]},serviceReports:{report:ne.SERVICE_REPORT,label:"Service Report",stage:"today",criteria:e=>`(Call_Attended_Date >= "${gi(vs(Ae(e),Ie(e)))}" || Added_Time >= "${gi(Ie(e))} 00:00:00")`,fields:["Call_Attended_Date","Call_Received_Date","Service_Call_Log","Service_Engineer_Name","Status","Product","Added_Time","Spare_Replaced"]},feedbacks:{report:ne.SERVICE_FEEDBACK,label:"Service Feedback",stage:"today",fields:["Company_Name","Rating","Call_attended_date","Any_additional_comments_or_suggestions_would_be_appreciated1"]},fieldExecutives:{report:ne.FIELD_EXECUTIVE,label:"Field Executive",stage:"today",fields:["Date_field","Leave_Break","Employee_Name","Did_you_collect_google_rating"]},employees:{report:ne.EMPLOYEES,label:"Employees",stage:"today",fields:["Employee_Name","Department_Role"]},quotations:{report:ne.SERVICE_QUOTATION,label:"Service Quotation",stage:"today",fields:["Date_field","Status","Customer_Name","Nature_of_Calls"]},invoices:{report:ne.SERVICE_INVOICE,label:"Service Invoice",stage:"today",fields:["Date_field","Customer","Final_Total","Spare_Amount","Service_Amount","Service_Call_Log"]},replacements:{report:ne.REJECTION_REPLACEMENT,label:"Rejection & Replacement",stage:"weekly",fields:["Department","Date_field","Status"]},standbyUnits:{report:ne.STANDBY_UNIT,label:"Stand By Unit",stage:"weekly",fields:["StandBy_To","Outward_Date","Inward_Date"]},amcContracts:{report:ne.AMC_CONTRACT,label:"AMC Contract",stage:"weekly",fields:["Quotation_Number"]},products:{report:ne.PRODUCT,label:"Product",stage:"weekly",criteria:()=>"Is_Red_Tag_Material == true",fields:["Product_Name","Is_Red_Tag_Material"]},engineerExpenses:{report:ne.EXPENSE_ENGINEER,label:"Engineer Expense",stage:"monthly",fields:["Date_field1234567890","Service_Engineer_Name","Overall_Engineer","Material_Replaced1"]},reworks:{report:ne.REWORK,label:"Rework",stage:"monthly",fields:["Date_field","Approximate_Cost"]},trainingReports:{report:ne.TRAINING_REPORT,label:"Training Report",stage:"monthly",fields:["Report"]},toolReports:{report:ne.TOOL_KIT,label:"Tool Kit",stage:"monthly",fields:["Month_field","Status","Service_Tools_Kit_of_Engineers"]},vehicleReports:{report:ne.VEHICLE_SERVICE,label:"Vehicle Service",stage:"monthly",fields:["Month_field","Status","Service_Tools_Kit_of_Engineers|Report"]},calibrationRecords:{report:ne.INTERNAL_CALIBRATION,label:"Internal Calibration",stage:"monthly",fields:["UUC_E","Meter_Type","Meter_Make","Meter_S","Calibration_Type","Rev_Date","Approved_By","Tested_By","Rev_No"]}},Ep=e=>Object.keys(uo).filter(t=>uo[t].stage===e);let xs=Promise.resolve();const mi=new Map,zn={fieldConfig:"unknown"},yn={datasets:{},data:{},results:{}};yn.text=()=>Object.values(yn.results).flat().map(e=>`${e.tab}	${e.label}	${e.value}`).join(`
`);typeof window<"u"&&(window.__ADROIT_DEBUG__=yn);function jp(e){const t=xs.then(e);return xs=t.catch(()=>{}),t}function Xr(e){if(!e)return"unknown error";if(typeof e=="string")return e;if(e.message)return e.code?`${e.code}: ${e.message}`:e.message;try{return JSON.stringify(e)}catch{return String(e)}}async function hi(e,t,n){const r=[];let l=null;do{const i={report_name:e,max_records:ur.PAGE_SIZE};n&&(i.field_config="all"),t&&(i.criteria=t),l&&(i.record_cursor=l);const o=await window.ZOHO.CREATOR.DATA.getRecords(i),a=(o==null?void 0:o.data)||[];r.push(...a),l=(o==null?void 0:o.record_cursor)||null,!l&&a.length>=ur.PAGE_SIZE&&console.warn(`[Creator] ${e}: got ${a.length} records and no record_cursor - the list may be truncated.`)}while(l);return r}async function Rp(e,t,n){const r=zn.fieldConfig!=="unsupported";try{const l=await hi(e.report,t,r);return r&&(zn.fieldConfig="ok"),l}catch(l){n.error=Xr(l)}if(t){n.criteriaRejected=!0;try{const l=await hi(e.report,"",r);return r&&(zn.fieldConfig="ok"),l}catch(l){n.error=Xr(l)}}if(r&&zn.fieldConfig!=="ok")try{const l=await hi(e.report,"",!1);return zn.fieldConfig="unsupported",n.fieldConfigRejected=!0,l}catch(l){n.error=Xr(l)}return[]}function Tp(e,t,n){if(!n.length||!t.fields)return;const r=new Set;n.forEach(i=>Object.keys(i||{}).forEach(o=>r.add(o)));const l=t.fields.filter(i=>!i.split("|").some(o=>r.has(o)));l.length&&console.warn(`[Creator] ${e} (${t.report}): field(s) not returned - ${l.join(", ")}. Check the field link names / the report's columns. Returned fields: `+[...r].join(", "))}async function bp(e,t,n){const r=Date.now(),l={report:t.report,criteria:n||null,count:0,ms:0,error:null,criteriaRejected:!1,fieldConfigRejected:!1},i=await Rp(t,n,l);l.count=i.length,l.ms=Date.now()-r,i.length&&(l.error=null),yn.datasets[e]=l,yn.data[e]=i;{const o=[];l.criteriaRejected&&o.push("criteria rejected -> loaded unfiltered"),l.fieldConfigRejected&&o.push("field_config rejected"),i.length||o.push(l.error?`no records (${l.error})`:"no records"),console.log(`[Creator] ${t.label} (${t.report}): ${i.length} records in ${l.ms} ms`+(o.length?` - ${o.join("; ")}`:"")),Tp(e,t,i)}return i}function Pp(e,t){const n=uo[e],r=n.criteria?n.criteria(t):"",l=`${e}|${r}`;return mi.has(l)||mi.set(l,jp(()=>bp(e,n,r))),mi.get(l)}const $c=e=>(e.employees||[]).filter(t=>Ge(t.Department_Role)===ur.SERVICE_DEPARTMENT_ROLE_ID);function Pt(e,t,n){let r=R(e*n/t,1);return e>0&&r<10&&(r=10),r===0&&(r=2),r}function zp(e,t){const n=e.serviceCallLogs||[],r=e.feedbacks||[],l=d=>Ml(d,t),i=n.filter(d=>l(d.Date_field)).length,o=["Emergency Leave","Informed Leave"],a=(e.fieldExecutives||[]).filter(d=>l(d.Date_field)&&!o.includes(T(d.Leave_Break))).length,s=new Set(n.filter(d=>T(d.Status)==="Completed").map(d=>String(d.ID))),c=new Set;(e.serviceReports||[]).forEach(d=>{if(!l(d.Call_Attended_Date))return;const y=Ge(d.Service_Call_Log);y&&s.has(y)&&c.add(y)});const g=(e.quotations||[]).filter(d=>l(d.Date_field)&&T(d.Status)==="Sent").length,m=r.filter(d=>K(d.Company_Name)&&l(d.Call_attended_date)).length,h=vr(t,-2),v=n.filter(d=>T(d.Status)==="Pending"&&Sp(d.Date_field,h)).length,x=(d,y)=>T(d.Rating)===y,w=r.filter(d=>x(d,"2")||x(d,"1")&&l(d.Call_attended_date)).length,L=oa(n.filter(d=>l(d.Date_field)&&T(d.Status)==="Pending"),d=>Ge(d.Customer_Name));let p=0;L.forEach((d,y)=>{y&&d>=2&&(p+=1)});const f=(e.invoices||[]).filter(d=>l(d.Date_field)&&K(d.Customer));return{total_calls_today:i,executives_act_today:a,service_reports_submitted_count:c.size,quot_sent_today:g,cust_feedback_rec:m,pending_calls:v,customer_regret_cases_count:w,repeated_calls_count:p,invoices_gen_today:f.length,total_invoiced_amt_today:R(Ne(f,d=>ze(d.Final_Total)),2)}}function Lp(e,t){const n=(e.serviceReports||[]).filter(i=>Ml(i.Call_Attended_Date,t)),r=$c(e).map(i=>{const o=n.filter(a=>Ge(a.Service_Engineer_Name)===String(i.ID));return{Engineer_Name:T(i.Employee_Name),assignedToday:o.length,completedToday:o.filter(a=>T(a.Status)==="Completed").length}});let l=0;return r.forEach(i=>{l=Math.max(l,i.assignedToday,i.completedToday)}),l===0?l=1:l<10&&(l=10),r.map(i=>({...i,assignedHeight:Pt(i.assignedToday,l,155),completedHeight:Pt(i.completedToday,l,155)}))}function Dp(e,t){const n=(e.invoices||[]).filter(m=>Ml(m.Date_field,t)),r=e.serviceCallLogs||[],l=new Map(r.map(m=>[String(m.ID),m])),i=new Map(r.map(m=>[T(m.Service_Call_Log_No),m]));let o=0,a=0,s=0;n.forEach(m=>{const h=l.get(Ge(m.Service_Call_Log))||i.get(T(m.Service_Call_Log)),v=h?ia(h):"",x=ze(m.Final_Total);v==="AMC"?o+=x:v==="Installation"?a+=x:v==="Repair"&&(s+=x)});const c={amc_amt:R(o,2),installtion_amt:R(a,2),repair_amt:R(s,2),service_amt:R(Ne(n,m=>ze(m.Service_Amount)),2),spares_amt:R(Ne(n,m=>ze(m.Spare_Amount)),2)};let g=Math.max(0,...Object.values(c));return g===0?g=1:g<1e4&&(g=1e4),{...c,amc_height:Pt(c.amc_amt,g,180),install_height:Pt(c.installtion_amt,g,180),repair_height:Pt(c.repair_amt,g,180),service_height:Pt(c.service_amt,g,180),spares_height:Pt(c.spares_amt,g,180)}}function Ip(e,t){let n=0,r=0,l=0,i=0;(e.serviceCallLogs||[]).filter(a=>Ml(a.Date_field,t)).forEach(a=>{const s=T(a.Repeat_Call_Reason);s!==""&&(i+=1,s==="Lack of Knowledge"?n+=1:s==="Parts Unavailability"?r+=1:s==="Power Issue"&&(l+=1))});const o=a=>i>0?a*100/i:0;return{lackOfKnowledge:o(n),partsUnavailability:o(r),powerIssue:o(l),totalRepeatCalls:i}}function Ap(e){const t=(e.feedbacks||[]).filter(r=>K(r.Company_Name)&&K(r.Rating));if(!t.length)return{average_rating:0,percentage:0,total_count:0};const n=Ne(t,r=>ze(r.Rating))/t.length;return{average_rating:R(n,1),percentage:R(n/5*100,1),total_count:t.length}}function Mp(e,t){const n=Ae(t);return(e.fieldExecutives||[]).filter(r=>J(r.Date_field,n,t)&&K(r.Employee_Name)&&T(r.Did_you_collect_google_rating)==="Yes").length}function Op(e,t){const n=Ae(t),r=(e.serviceCallLogs||[]).filter(a=>J(a.Date_field,n,t)),l=$c(e);let i=0;const o=l.map(a=>{const s=r.filter(w=>Ge(w.Service_Engineer_Name)===String(a.ID)),c=s.length,g=s.filter(w=>T(w.Status)==="Completed").length,m=s.filter(w=>T(w.Status)==="Pending").length;i+=c;let h=0,v=0;c>0&&(h=R(g*100/c,1),v=R(m*100/c,1)),g>0&&h<5&&(h=5),m>0&&v<5&&(v=5);const x=h+v;return x>100&&(h=R(h*100/x,1),v=R(v*100/x,1)),{engineer_id:a.ID,engineer_name:T(a.Employee_Name),total_calls_this_week:c,calls_completed:g,calls_pending:m,completed_height:h,pending_height:v}});return{from_date:n,to_date:t,per_engineer:o,total_calls:i,num_engineers:l.length,average_calls_per_engineer_week:l.length>0?R(i/l.length,1):0}}function Fp(e,t){const n=vr(t,-6),r=(e.serviceCallLogs||[]).filter(i=>K(i.Customer_Name)&&J(i.Date_field,n,t)&&T(i.Status)!=="Pending");if(r.length===0)return 0;let l=0;return oa(r,i=>Ge(i.Customer_Name)).forEach(i=>{i>1&&(l+=i)}),R(l*100/r.length,1)}function $p(e,t){const n=Ae(t),r=(e.feedbacks||[]).filter(i=>K(i.Company_Name)&&J(i.Call_attended_date,n,t));return r.length===0?0:r.filter(i=>["1","2","3"].includes(T(i.Rating))).length*100/r.length}function Up(e,t){const n=Ae(t);return(e.serviceCallLogs||[]).filter(r=>ia(r)==="AMC"&&J(r.Date_field,n,t)&&T(r.Status)==="Completed").length}function Bp(e,t){const n=Ae(t);return(e.replacements||[]).filter(r=>T(r.Department)==="Service"&&J(r.Date_field,n,t)&&T(r.Status)==="Pending").length}function Wp(e,t){const n=Ae(t);return(e.standbyUnits||[]).filter(r=>K(r.StandBy_To)&&J(r.Outward_Date,n,t)&&Fc(r.Inward_Date)).length}function Vp(e,t){const n=Ie(t),r=(e.serviceCallLogs||[]).filter(i=>T(i.Status)==="Pending"),l=[];return[0,7,14,21].forEach(i=>{const o=vr(t,-i);if(i>0&&o<n)return;let a=Ae(o);a<n&&(a=n);let s=0,c=0,g=0;r.filter(m=>J(m.Date_field,a,o)).forEach(m=>{const h=Math.abs(Ic(o,Ce(m.Date_field)));h<=2?s+=1:h<=5?c+=1:g+=1}),l.push({"0-2_Days":s,"3-5_Days":c,above_5_Days:g,Total:s+c+g})}),l}function Hp(e,t){const n=Ae(t),r=(e.quotations||[]).filter(s=>K(s.Customer_Name)&&T(s.Nature_of_Calls)==="AMC"&&J(s.Date_field,n,t)),l=new Set((e.amcContracts||[]).map(s=>Ge(s.Quotation_Number))),i=r.filter(s=>l.has(String(s.ID))).length,o=r.length,a=o-i;return{week_start:n,week_end:t,total:o,closed:i,pending:a,closed_percent:o>0?R(i*100/o,1):0,pending_percent:o>0?R(a*100/o,1):0}}function Qp(e,t){const n=Ie(t),r=_p(t),l=new Set((e.products||[]).filter(o=>Np(o.Is_Red_Tag_Material)).map(o=>T(o.Product_Name))),i=[0,0,0,0];return(e.serviceReports||[]).forEach(o=>{const a=Ce(o.Call_Attended_Date);if(!a||a<n||a>r)return;const s=T(o.Product);s===""||!l.has(s)||(i[Math.min(3,Math.floor(Ic(n,a)/7))]+=1)}),{week1:i[0],week2:i[1],week3:i[2],week4:i[3],maxValue:Math.max(1,...i)}}function Yp(e,t){const n=(e.feedbacks||[]).filter(l=>K(l.Company_Name)),r=[];return[1,2,3,4].forEach(l=>{const i=vr(t,-(l-1)*7),o=Ae(i),a=n.filter(g=>J(g.Call_attended_date,o,i));let s=0;a.length>0&&(s=R(Ne(a,g=>ze(g.Rating))/a.length,1));let c=R(s/5*150,1);s>0&&c<10&&(c=10),r.push({week_number:l,week_label:`Week ${l}`,average_rating:s,total_feedback:a.length,bar_height:c})}),r.reverse()}function Kp(e){return(e.feedbacks||[]).filter(t=>K(t.Company_Name)).slice(0,5).map(t=>{const n=T(t.Any_additional_comments_or_suggestions_would_be_appreciated1),r=Ol(t.Rating);return{id:t.ID,created_date:Ce(t.Call_attended_date),customer_name:T(t.Company_Name),rating:Number.isFinite(r)?r:0,comments:n!==""?n:"No comments"}})}function Xp(e,t){const n=Ae(t),r=(e.serviceReports||[]).filter(o=>K(o.Call_Received_Date)&&K(o.Service_Call_Log)&&J(o.Call_Attended_Date,n,t));if(r.length===0)return"0";let l=0,i=0;return r.forEach(o=>{const a=Ce(o.Call_Received_Date),s=Ce(o.Call_Attended_Date);if(!a||!s)return;const c=(s-a)/36e5;c>=0&&(l+=c,i+=1)}),i>0?String(R(l/i,1)):"0"}function Gp(e,t){const n=Ie(t);let r=0,l=0,i=0;return(e.serviceCallLogs||[]).filter(o=>J(o.Date_field,n,t)).forEach(o=>{const a=ia(o);a==="Warranty"?r+=1:a==="PW"?l+=1:a==="AMC"&&(i+=1)}),{warranty_count:r,post_warranty:l,amc_count:i,warranty_amount:0,post_warranty_amount:0}}const Uc=(e,t,n)=>(e.engineerExpenses||[]).filter(r=>J(r.Date_field1234567890,t,n)),Bc=(e,t,n)=>Ne((e.reworks||[]).filter(r=>J(r.Date_field,t,n)),r=>ze(r.Approximate_Cost));function Zp(e,t){const n=Ie(t),r=Ne(Uc(e,n,t),l=>Ne(vn(l.Material_Replaced1),i=>ze(i.Engineer_Expenses)));return R(r+Bc(e,n,t),2)}function Jp(e,t){const n=Ie(t),r=(e.serviceCallLogs||[]).filter(i=>K(i.Customer_Name)&&J(i.Date_field,n,t)&&T(i.Status)==="Pending");let l=0;return oa(r,i=>Ge(i.Customer_Name)).forEach(i=>{i>1&&(l+=1)}),{repead_calls:l}}function qp(e,t){const n=Ie(t);return(e.serviceReports||[]).filter(r=>T(r.Status)==="Pending For Spares"&&J(r.Call_Attended_Date,n,t)).length}function eg(e,t){const n=Ie(t);let r=0;return(e.trainingReports||[]).forEach(l=>{vn(l.Report).forEach(i=>{J(i.Date_field,n,t)&&(r+=ze(i.Total_Hours))})}),R(r,2)}function tg(e,t){const n=xp[t.getMonth()],r=(s,c)=>{let g=0,m=0;return s.filter(h=>T(h.Month_field)===n).forEach(h=>{const v=c.find(w=>vn(h[w]).length>0),x=v?vn(h[v]):[];g+=x.length,T(h.Status)==="Approved"&&(m+=x.length)}),{required:g,completed:m}},l=r(e.toolReports||[],["Service_Tools_Kit_of_Engineers"]),i=r(e.vehicleReports||[],["Service_Tools_Kit_of_Engineers","Report"]),o=l.required+i.required,a=l.completed+i.completed;return{tool_required:l.required,tool_completed:l.completed,vehicle_required:i.required,vehicle_completed:i.completed,total_required:o,total_completed:a,compliance_percentage:o>0?R(a/o*100,2):0}}function ng(e){const t=(e.feedbacks||[]).filter(r=>K(r.Company_Name));if(t.length===0)return{positive_feedback_percentage:0,avg_feedback:0};const n=t.filter(r=>Ol(r.Rating)>=4).length;return{positive_feedback_percentage:R(n*100/t.length,1),avg_feedback:R(Ne(t,r=>ze(r.Rating))/t.length,1)}}function rg(e,t){const n=Ie(t);let r=0,l=0,i=0;(e.serviceReports||[]).forEach(s=>{const c=Ac(s.Added_Time);!c||c<n||c>t||vn(s.Spare_Replaced).forEach(g=>{if(!J(g.Date_field,n,t))return;const m=T(g.Nature_of_Calls);m==="AMC"?r+=1:m==="PW"?l+=1:m==="Warranty"&&(i+=1)})});const o=r+l+i,a=s=>o>0?s/o*100:0;return{amc_percentage:a(r),pw_percentage:a(l),w_percentage:a(i),has_data:o>0}}function lg(e,t){const n=Ie(t),r=Uc(e,n,t).filter(s=>K(s.Service_Engineer_Name)),l=Bc(e,n,t);let i=0,o=0;r.forEach(s=>{i+=Ne(vn(s.Material_Replaced1),c=>ze(c.Direct_Expense)),o+=ze(s.Overall_Engineer),o+=l});const a=i+o;return{direct_expense:R(i,2),indirect_expense:R(o,2),total_expense:R(a,2),direct_percent:a>0?R(i*100/a,1):0,indirect_percent:a>0?R(o*100/a,1):0}}function ig(e,t){const n=Dc(t),r=Array.from({length:12},()=>new Map);return(e.serviceCallLogs||[]).filter(l=>J(l.Date_field,n,t)&&T(l.Status)!=="Pending"&&K(l.Customer_Name)).forEach(l=>{const i=r[Ce(l.Date_field).getMonth()],o=Ge(l.Customer_Name);i.set(o,(i.get(o)||0)+1)}),hr.slice(0,t.getMonth()+1).map((l,i)=>{let o=0;return r[i].forEach(a=>{a>1&&(o+=a)}),{month:l,repeat_calls:o}})}function og(e,t){const n=t.getFullYear(),r=hr.map(o=>({name:o,total:0,count:0}));(e.feedbacks||[]).forEach(o=>{const a=Ce(o.Call_attended_date);if(!a||a.getFullYear()!==n)return;const s=Ol(o.Rating);!Number.isFinite(s)||s<=0||s>5||(r[a.getMonth()].total+=s,r[a.getMonth()].count+=1)});const l=Ne(r,o=>o.total),i=Ne(r,o=>o.count);return{months:r.map(o=>({name:o.name,average:o.count>0?R(o.total/o.count,2):0,count:o.count})),overall_average:i>0?R(l/i,2):0,overall_count:i}}function ag(e,t){const n=Ie(t);return(e.feedbacks||[]).filter(r=>Cp(r.Call_attended_date,n)&&K(r.Company_Name)&&Ol(r.Rating)<=3).map(r=>({customer_name:T(r.Company_Name),customer_feedback:T(r.Any_additional_comments_or_suggestions_would_be_appreciated1),feedback_date:Ce(r.Call_attended_date)}))}function sg(e,t){const n=t.getMonth(),r=t.getFullYear();return(e.calibrationRecords||[]).map(l=>{let i=T(l.UUC_E);i===""&&(i=`${T(l.Meter_Type)} - ${T(l.Meter_Make)}`);let o=T(l.Calibration_Type);o===""&&(o="Calibration Report");const a=Ce(l.Rev_Date);let s=null,c=!1,g=!1;a&&(s=kp(a,1),c=s.getMonth()===n&&s.getFullYear()===r,g=s<t);let m="Not Assigned";K(l.Approved_By)?m=T(l.Approved_By):K(l.Tested_By)&&(m=T(l.Tested_By));let h="Pending",v="orange";return K(l.Approved_By)?c?(h="Completed",v="green"):(h="Up to Date",v="blue"):g&&(h="Overdue",v="red"),{equipment:i,report_type:o,last_service_date:a?ys(a):"N/A",next_service_date:s?ys(s):"N/A",is_due_this_month:c,is_overdue:g,service_person:m,status:h,status_color:v}})}function ug(e,t){return{tiles:zp(e,t),executives:Lp(e,t),invoiceTrend:Dp(e,t),repeatReasons:Ip(e,t),feedbackTrend:Ap(e)}}function cg(e,t){const n=Yp(e,t),r=n.filter(o=>o.average_rating>0),l=r.length>0?R(Ne(r,o=>o.average_rating)/r.length,1):0,i=Math.floor(l);return{googleReviews:Mp(e,t),engineer:Op(e,t),avgResponseTime:Xp(e,t),repeatCallPercent:Fp(e,t),regretPercent:$p(e,t),amcLeads:Up(e,t),pendingReplacements:Bp(e,t),standbyPending:Wp(e,t),aging:Vp(e,t),amc:Hp(e,t),redTag:Qp(e,t),satisfaction:n,overallAvg:l,fullStars:i,hasHalfStar:l-i>=.5,recentFeedbacks:Kp(e)}}function dg(e,t){return{callLogs:Gp(e,t),indirectExpense:Zp(e,t),repeatCalls:Jp(e,t).repead_calls,stockDelays:qp(e,t),trainingHours:eg(e,t),compliance:tg(e,t),positiveFeedback:ng(e),costByCategory:rg(e,t),expense:lg(e,t),repeatTrend:ig(e,t),satisfaction:og(e,t),complaints:ag(e,t),calibration:sg(e,t)}}function fg(e,t){const n=[],r=(l,i)=>n.push({tab:e,label:l,value:String(i)});if(e==="today"){const l=t.tiles;r("Total Calls Logged Today",l.total_calls_today),r("Service Executives Active Today",l.executives_act_today),r("Service Reports Submitted",l.service_reports_submitted_count),r("Quotations Sent Today",l.quot_sent_today),r("Customer Feedbacks Collected",l.cust_feedback_rec),r("Pending Calls > 48 Hrs",l.pending_calls),r("Customer Regret Cases",l.customer_regret_cases_count),r("Repeat Calls Logged",l.repeated_calls_count),r("Invoices Generated Today",l.invoices_gen_today),r("Invoice Amounts (₹)",l.total_invoiced_amt_today),t.executives.forEach(s=>r(`Executive ${s.Engineer_Name}: assigned / closed`,`${s.assignedToday} / ${s.completedToday}`));const i=t.invoiceTrend;r("Invoice Amount Trend: AMC",i.amc_amt),r("Invoice Amount Trend: Install",i.installtion_amt),r("Invoice Amount Trend: Repair",i.repair_amt),r("Invoice Amount Trend: Service",i.service_amt),r("Invoice Amount Trend: Spares",i.spares_amt);const o=t.repeatReasons;r("Repeat Calls Reason: total calls",o.totalRepeatCalls),r("Repeat Calls Reason: Lack of Knowledge %",R(o.lackOfKnowledge,1)),r("Repeat Calls Reason: Parts Unavailability %",R(o.partsUnavailability,1)),r("Repeat Calls Reason: Power Issue %",R(o.powerIssue,1));const a=t.feedbackTrend;r("Service Feedback Trend: average rating",a.average_rating),r("Service Feedback Trend: percent",`${a.percentage}%`),r("Service Feedback Trend: feedback count",a.total_count)}if(e==="weekly"&&(r("Avg Calls Attended per Engineer",t.engineer.average_calls_per_engineer_week),r("Average Response Time (hrs)",t.avgResponseTime),r("Repeat Call %",`${t.repeatCallPercent.toFixed(1)}%`),r("Customer Regret %",`${R(t.regretPercent,2).toFixed(2)}%`),r("Google Review Collection %",`${t.googleReviews}%`),r("AMC Leads Generated",t.amcLeads),r("Pending Replacements",t.pendingReplacements),r("Standby Units Pending Collection",t.standbyPending),t.engineer.per_engineer.forEach(l=>r(`Engineer-wise Call Volume ${l.engineer_name}: total / completed / pending`,`${l.total_calls_this_week} / ${l.calls_completed} / ${l.calls_pending}`)),r("Customer Satisfaction: average rating",t.overallAvg),t.satisfaction.forEach(l=>r(`Weekly Rating Trend ${l.week_label} (${l.total_feedback} feedbacks)`,l.average_rating)),r("Recent Feedbacks: rows shown",t.recentFeedbacks.length),t.aging.forEach((l,i)=>r(`Pending Call Ageing Week ${i+1}: 0-2 / 3-5 / >5 days`,`${l["0-2_Days"]} / ${l["3-5_Days"]} / ${l.above_5_Days}`)),r("AMC Offer vs Closed: offered",t.amc.total),r("AMC Offer vs Closed: closed",t.amc.closed),r("AMC Offer vs Closed: closed %",`${t.amc.closed_percent}%`),r("Red Tag Item Trend: Week 1",t.redTag.week1),r("Red Tag Item Trend: Week 2",t.redTag.week2),r("Red Tag Item Trend: Week 3",t.redTag.week3),r("Red Tag Item Trend: Week 4",t.redTag.week4)),e==="monthly"){r("Total Calls Logged: Warranty",t.callLogs.warranty_count),r("Total Calls Logged: Post Warranty",t.callLogs.post_warranty),r("Total Calls Logged: AMC",t.callLogs.amc_count),r("Expenses for Complaints: Warranty Expense",t.callLogs.warranty_amount),r("Expenses for Complaints: Post Warranty",t.callLogs.post_warranty_amount),r("Indirect Expenses",t.indirectExpense),r("Repeat Call Analysis (calls)",t.repeatCalls),r("Stock Unavailability Delays (cases)",t.stockDelays),r("Training Hours Conducted (hrs)",t.trainingHours),r("Tool & Vehicle Inspections Completed",`${t.compliance.compliance_percentage}%`),r("Customer Feedback Summary: average",t.positiveFeedback.avg_feedback),r("Customer Feedback Summary: % positive",`${t.positiveFeedback.positive_feedback_percentage}%`);const l=t.expense;r("Expense Breakdown: Direct",`${l.direct_expense} (${l.direct_percent}%)`),r("Expense Breakdown: Indirect",`${l.indirect_expense} (${l.indirect_percent}%)`);const i=t.costByCategory;r("Complaint Cost by Category: has data",i.has_data),r("Complaint Cost by Category: Under Warranty %",R(i.w_percentage,1)),r("Complaint Cost by Category: Post Warranty %",R(i.pw_percentage,1)),r("Complaint Cost by Category: AMC %",R(i.amc_percentage,1)),t.repeatTrend.forEach(o=>r(`Repeat Call Trend ${o.month}`,o.repeat_calls)),r("Customer Satisfaction: average rating",t.satisfaction.overall_average),r("Customer Satisfaction: reviews",t.satisfaction.overall_count),r("Recent Complaints: rows shown",t.complaints.length),t.calibration.forEach(o=>r(`Calibration: ${o.equipment}`,`${o.status} (next ${o.next_service_date})`))}return n}const pg=`
/* ================= TABS ================= */
.tab-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 100%;
    margin: 0;
    padding: 0;
}
.tab-input { display: none; }
.tab-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
}
.tab-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background: #91b6ff;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    color: #374151;
    transition: all 0.3s ease;
}
.tab-label:hover { background: #d1d5db; }
.tab-input:checked + label.tab-label {
    background-color: #2563eb !important;
    color: #ffffff !important;
}
.tab-content {
    display: none;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f4f7fb;
    margin-top: 20px;
}
#tab1:checked ~ .tab-contents #content1,
#tab2:checked ~ .tab-contents #content2,
#tab3:checked ~ .tab-contents #content3 { display: block; }

/* ================= RESPONSIVE ================= */
@media (max-width:1000px){ .kpi-row{ grid-template-columns: repeat(3, 1fr); } .main-grid{ grid-template-columns:1fr; } }
@media (max-width:640px){ .kpi-row{ grid-template-columns:repeat(2,1fr); } .donut-wrapper{ flex-direction:column; gap:20px; } }

/* ================= BODY ================= */
body{margin:0;padding:0;font-family:'Poppins',sans-serif;background:#f4f7fb;color:#0f172a;line-height:1.4;}

/* ================= TODAY DASHBOARD ================= */
header{padding:18px 26px;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.05);display:flex;justify-content:space-between;align-items:center;}
  header h1{font-size:18px;font-weight:600;}
  header .date{font-size:13px;color:#6b7280;}
  .container{
   /* max-width:1400px; */
    margin:18px auto;
    width: 100%;
      max-width: inherit;
    }
  
  /* COUNT TILES */
  .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-bottom:18px;}
  .tile{background:#fff;padding:14px;border-radius:12px;box-shadow:0 6px 12px rgba(16,24,40,0.04);}
  .tile .label{font-size:13px;color:#6b7280;margin-bottom:6px;}
  .tile .value{font-weight:700;font-size:20px;margin-bottom:4px;text-align: center;}

  .red{color:#ef4444;}

  /* CHARTS */
  .charts{display:grid;grid-template-columns:2fr 1fr;gap:14px;}
  .card{background:#fff;padding:16px;border-radius:12px;box-shadow:0 6px 12px rgba(16,24,40,0.04);}
  .card h3{font-size:16px;margin-bottom:12px;}

  /* VERTICAL BAR CHART */
  .legend{display:flex;gap:20px;margin-bottom:20px;}
  .legend span{display:flex;align-items:center;gap:6px;font-size:14px;}
  .dot{width:14px;height:14px;border-radius:3px;}
  .assigned-dot{background:#3b82f6;}
  .closed-dot{background:#16a34a;}

  .bar-chart-row{
    display:flex;
    align-items:flex-end;
    justify-content:space-around;
    height:200px;
    gap:20px;
    border-left:1px solid #ccc;
    border-bottom:1px solid #ccc;
    padding-bottom:10px;
}
.bar-group{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:6px;
}
.bars{
    display:flex;
    gap:6px;
    align-items:flex-end;
    height:180px;
}
.bar-container{
    display:flex;
    flex-direction:column;
    align-items:center;
}
.bar{
    width:30px;
    border-radius:6px 6px 0 0;
}
/* ===== BAR CHART ANIMATION (CSS ONLY) ===== */
.bar {
    transform-origin: bottom;
    transform: scaleY(0);
    animation: grow 1.4s ease-out forwards;
}

/* Delay each bar slightly using nth-child */
.bar-container:nth-child(1) .bar {
    animation-delay: .1s;
}
.bar-container:nth-child(2) .bar {
    animation-delay: .2s;
}

@keyframes grow {
    to { transform: scaleY(1); }
}
.assigned{background:#3b82f6;}
.closed{background:#16a34a;}
.exec-label{font-size:14px;margin-top:6px;text-align:center;}

/* Number on top of each bar */
.bar-number{
    font-size:12px;
    font-weight:600;
    color:#0f172a;
    margin-bottom:4px;
}

  /* Placeholders for other charts */
  .line-chart,.pie-chart,.gauge-chart{height:120px;background:linear-gradient(90deg,#2463eb,#9db9ff);border-radius:6px;}
  .small-cards{display:flex;flex-direction:column;gap:12px;}
  table{width:100%;border-collapse:collapse;}
  th,td{padding:8px 10px;text-align:left;border-bottom:1px solid rgba(15,23,42,0.05);font-size:13px;}
  th{color:#6b7280;font-weight:600;}

  @media(max-width:900px){.charts{grid-template-columns:1fr;}}
.pie-chart{
  width:150px;
  height:150px;
  border-radius:50%;
  margin:auto;
  position:relative;
  /* Using CSS variables to define slices dynamically */
  --k: calc(var(--knowledge) * 1%);
  --p: calc(var(--parts) * 1%);
  --pw: calc(var(--power) * 1%);
  background:
    conic-gradient(
      #3b82f6 0% var(--k),
      #16a34a var(--k) calc(var(--k) + var(--p)),
      #f59e0b calc(var(--k) + var(--p)) 100%
    );
}

.pie-chart .label{
  position:absolute;
  font-size:12px;
  font-weight:600;
  color:#fff;
  text-shadow:0 0 3px rgba(0,0,0,0.5);
  display:flex;
  align-items:center;
  justify-content:center;
  width:35px;
  height:20px;
  border-radius:6px;
}
/* ===== PIE CHART ANIMATION (CSS ONLY) ===== */
.pie-chart {
    transform: rotate(-90deg);
    animation: pieSpin 1.2s ease-out forwards;
}

@keyframes pieSpin {
    to { transform: rotate(0deg); }
}
.pie-chart .knowledge{top:20px;left:50%;}
.pie-chart .parts{bottom:90px;left:30px;}
.pie-chart .power{bottom:30px;right:70px;}

.legend{
  display:flex;
  justify-content:space-around;
  font-size:13px;
  gap:5px;
}
.dot{
  width:14px;
  height:14px;
  border-radius:50%;
  display:inline-block;
  margin-right:6px;
}
  /* -------------------- gauge-cnt2 -------------------- */
    .gauge-cnt2-wrapper {
      flex: 0 0 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .gauge-cnt2-container {
      position: relative;
      width: 450px;
      height: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .gauge-cnt2-arc-container {
      position: relative;
      width: 160px;
      height: 80px;
    }

    .gauge-cnt2-bg-arc {
      width: 160px;
      height: 80px;
      border-radius: 80px 80px 0 0;
      background: #e8ecef;
      position: relative;
      overflow: hidden;
    }

    .gauge-cnt2-progress-arc {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 160px;
      height: 80px;
      border-radius: 80px 80px 0 0;
      background: linear-gradient(90deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #1dd1a1 75%, #10ac84 100%);
      clip-path: polygon(0 100%,
          0 0,
          calc(var(--percentage, 0) * 1%) 0,
          calc(var(--percentage, 0) * 1%) 100%);
      animation: fillgauge-cnt2Arc 2s ease-out forwards;
    }

    @keyframes fillgauge-cnt2Arc {
      from {
        clip-path: polygon(0 100%, 0 100%, 0 100%, 0 100%);
      }

      to {
        clip-path: polygon(0 100%,
            0 0,
            calc(var(--percentage, 0) * 1%) 0,
            calc(var(--percentage, 0) * 1%) 100%);

      }
    }

    .gauge-cnt2-inner-cutout {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 60px;
      background: #fff;
      border-radius: 60px 60px 0 0;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .gauge-cnt2-value-display {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      z-index: 10;
    }

    .gauge-cnt2-percentage {
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 4px;
    }

    .gauge-cnt2-text {
      font-size: 11px;
      color: #6c757d;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .gauge-cnt2-wrapper {
      position: relative;
      /* make wrapper relative for absolute positioning */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }



    .gauge-cnt2-indicator {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 4px;
      height: 60px;
      background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
      transform-origin: bottom center;
      transform: translateX(-50%) rotate(calc(-90deg + (var(--percentage, 0) * 1.8deg)));
      border-radius: 4px 4px 0 0;
      animation: rotateIndicator 2s ease-out forwards;
      z-index: 5;
      box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    }

    .gauge-cnt2-indicator::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    @keyframes rotateIndicator {
      from {
        transform: translateX(-50%) rotate(-90deg);
      }

      to {
        transform: translateX(-50%) rotate(calc(-90deg + (var(--percentage, 0) * 1.8deg)));
      }
    }

    .gauge-cnt2-labels {
      position: absolute;
      bottom: -5px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      font-size: 10px;
      color: #adb5bd;
      font-weight: 600;
    }

    /* Heading inside the gauge-cnt2 curve */
    /* Heading inside the gauge-cnt2, above the arc */
    .gauge-cnt2-inside-heading {
      position: absolute;
      top: 10px;
      /* adjust as needed to sit in the red box area */
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      font-weight: 700;
      color: #333;
      text-align: center;
      z-index: 10;
      pointer-events: none;
      /* ensures it doesn’t interfere with gauge-cnt2 hover/animation */
    }
    /* ================== INVOICE COLUMN CHART ================== */
.invoice-chart{
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    height:220px;
    padding:10px 6px 0;
    border-bottom:1px solid #d1d5db;
    border-left:1px solid #d1d5db;
}

.col{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:6px;
    flex:1;
}

.col-bar{
    width:32px;
    background:#3b82f6;
    border-radius:6px 6px 0 0;
    height:var(--h);
    
    /* Animation */
    transform-origin:bottom;
    transform:scaleY(0);
    animation:growCol 1.4s ease-out forwards;
}

@keyframes growCol{
    to{ transform:scaleY(1); }
}

.col-label{
    font-size:13px;
    font-weight:600;
    margin-top:4px;
}

.col-value{
    font-size:12px;
    color:#4b5563;
}

.label {
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
}

/* ================= WEEKLY DASHBOARD ================= */
:root {
  --bg:#f8f9fa;
  --card:#ffffff;
  --muted:#6b7280;
  --completed:#5dc35a;
  --pending:#e84c3d;
  --radius:12px;
}
/* Reset */
*{box-sizing:border-box;margin:0;padding:0;}
body{
  font-family:Inter, sans-serif;
  background:var(--bg);
  color:#111827;
}
/* WRAPPER */
.weekly-wrap{
  width:100%;
  max-width:1200px;
  margin:20px auto;
  padding:0 16px;
  box-sizing:border-box;
}
/* Heading Card */
.weekly-heading-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 20px 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #111827;
  border-left: 6px solid #a3dda1;
  width:100%;
}
/* KPI Tiles */
.weekly-kpi-grid{
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  gap:16px;
  margin-bottom:40px;
}
.weekly-kpi-card{
  background:var(--card);
  border-radius:var(--radius);
  padding:20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  box-shadow:0 2px 8px rgba(0,0,0,0.08);
  transition:.3s;
  border-bottom: 4px solid #5dc35a91;
}
.weekly-kpi-card:hover{
  transform:translateY(-5px);
  box-shadow:0 4px 16px rgba(0,0,0,0.15);
}
.weekly-kpi-title{color:var(--muted);font-size:13px;margin-bottom:8px;text-align:center;}
.weekly-kpi-value{font-size:22px;font-weight:700;color:#000;text-align:center;}
/* Chart Cards */
.weekly-chart-card{
  background:var(--card);
  border-radius:var(--radius);
  padding:20px;
  box-shadow:0 2px 8px rgba(0,0,0,0.08);
  margin-bottom:40px;
}
.weekly-chart-title{
  font-weight:600;
  margin-bottom:16px;
  text-align:center;
  font-size: 18px;
}
/* Legend */
.weekly-legend{display:flex;justify-content:center;gap:20px;margin-bottom:15px;font-size:13px;color:#111;}
.weekly-legend-item{display:flex;align-items:center;gap:6px;}
.weekly-legend-color{width:15px;height:15px;border-radius:3px;}
/* Bar Chart */
.weekly-bar-chart{
  display:flex;
  align-items:flex-end;
  justify-content: space-around;
  height:250px;
  border-left:2px solid #444;
  border-bottom:2px solid #444;
  padding-bottom:10px;
  gap:20px;
}
.weekly-bar-group{display:flex;flex-direction:column;align-items:center;}
.weekly-bar {
  width:100px;
  height:180px;
  border-radius:0px;
  overflow:hidden;
  display:flex;
  flex-direction:column-reverse;
}
.weekly-bar .weekly-segment:last-child {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.weekly-bar .weekly-segment:first-child {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.weekly-segment{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-size:10px;
  font-weight:600;
  opacity:0;
  animation: grow 1s forwards;
}
.completed{background:var(--completed);}
.pending{background:var(--pending);}
.weekly-value{font-size:12px;font-weight:600;margin-bottom:6px;text-align:center;}
.weekly-label{font-size:13px;margin-top:6px;text-align:center;}
@keyframes grow{
  0%{opacity:0;transform:translateY(20px);}
  100%{opacity:1;transform:translateY(0);}
}
/* Donut Chart */
.weekly-donut-container {position: relative;width: 200px;height: 200px;margin: auto;}
.weekly-donut {
  width: 100%;height: 100%;border-radius: 50%;
  background: conic-gradient(#3b82f6 0% 50%, #10b981 50% 100%);
  display: flex;align-items: center;justify-content: center;
  animation: rotateDonut 2s ease-out;
}
@keyframes rotateDonut{0%{transform:rotate(-360deg);}100%{transform:rotate(0deg);}}
.weekly-donut-inner{
  width:60%;height:60%;background:#fff;
  border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-weight:600;font-size:16px;
}
/* Satisfaction Grid */
.weekly-satisfaction-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:25px;
}
/* Customer Satisfaction Styles */
.weekly-rating-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
}
.weekly-rating-display {
  text-align: center;
  margin-bottom: 30px;
}
.weekly-rating-score {
  font-size: 56px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 10px;
}
.weekly-stars-container {
  font-size: 32px;
  margin-bottom: 10px;
  letter-spacing: 4px;
}
.weekly-star.filled {
  color: #fbbf24;
  text-shadow: 0 2px 4px rgba(251, 191, 36, 0.3);
}
.weekly-star.empty {
  color: #d1d5db;
}
.weekly-rating-label {
  font-size: 14px;
  color: var(--muted);
  font-weight: 500;
}
/* Weekly Trend Bars */
.weekly-trend-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 15px;
  text-align: center;
}
.weekly-trend {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 180px;
  width: 100%;
  padding: 0 20px 30px 15px;
  border-left: 2px solid #d1d5db;
  border-bottom: 2px solid #d1d5db;
  gap: 30px;
  position: relative;
}
.weekly-week-bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 50px;
}
.weekly-week-bar {
  width: 50px;
  background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 6px 6px 0 0;
  box-shadow: 0 -2px 10px rgba(251, 191, 36, 0.4);
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: growBar 1.2s ease forwards;
  opacity: 0;
  min-height: 20px;
}
.weekly-week-bar:hover {
  transform: translateY(-5px);
  box-shadow: 0 -4px 15px rgba(251, 191, 36, 0.6);
  filter: brightness(1.1);
}
.weekly-week-bar::after {
  content: attr(data-rating);
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 700;
  color: #111827;
  background: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  opacity: 0;
  transition: opacity 0.3s;
  white-space: nowrap;
}
.weekly-week-bar:hover::after {
  opacity: 1;
}
.weekly-week-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
  margin-top: 8px;
}
@keyframes growBar {
  0% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
  100% { opacity: 1; transform: scaleY(1); transform-origin: bottom; }
}
/* Feedback Section */
.weekly-feedback-section {
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}
.weekly-feedback-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #111827;
}
.weekly-complaints-list {
  max-height: 340px;
  overflow-y: auto;
  padding-right: 10px;
}
.weekly-feedback-item {
  padding: 15px;
  border-left: 4px solid #10b981;
  background: #f0fdf4;
  margin-bottom: 12px;
  border-radius: 6px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.weekly-feedback-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.weekly-feedback-item.positive { border-left-color: #10b981; background: #f0fdf4; }
.weekly-feedback-item.neutral { border-left-color: #f59e0b; background: #fffbeb; }
.weekly-feedback-item.negative { border-left-color: #ef4444; background: #fef2f2; }
.weekly-feedback-date { font-size: 11px; color: #6b7280; margin-bottom: 6px; font-weight: 500; }
.weekly-feedback-text { font-size: 13px; color: #111827; margin-bottom: 8px; line-height: 1.5; }
.weekly-feedback-rating { font-size: 14px; color: #fbbf24; display: flex; align-items: center; gap: 6px; }
.weekly-rating-number { font-weight: 600; color: #111827; font-size: 12px; }
/* Responsive */
@media(max-width:1200px){ .weekly-kpi-grid{grid-template-columns:repeat(2,1fr);} }
@media(max-width:700px){ .weekly-kpi-grid{grid-template-columns:1fr;} .weekly-satisfaction-grid{grid-template-columns:1fr;} }

/* ================= MONTHLY DASHBOARD ================= */
:root{
  --bg33:#f0f2f5;
  --card33:#ffffff;
  --accent-blue33:#3b82f6;
  --accent-green33:#10b981;
  --accent-amber33:#f59e0b;
  --text-dark33:#1f2937;
  --text-muted33:#6b7280;
  --border-grey3:#d1d5db;
}
/* Dashboard Wrapper */
.dashboard-container3 {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}
.page-title3{
  font-size:28px;
  background:var(--card33);
  border-radius:14px;
  padding:16px;
  box-shadow:0 2px 6px rgba(0,0,0,0.07);
  border-top:6px solid #9ea7b5;
  margin:16px 0;
  font-weight:500;
  text-align:center;
}

/* Cards */
.card3{
  background:var(--card33);
  border-radius:14px;
  padding:16px;
  box-shadow:0 2px 6px rgba(0,0,0,0.07);
  border-bottom:3px solid var(--border-grey3);
  margin-bottom:16px;
}
.cards3{
  margin-bottom:16px;
}
.card3 h3{
  margin:0 0 16px 0;
  font-size:16px;
  font-weight:600;
}

/* Top Section */
.top-section3{
  display:flex;
  gap:16px;
  margin-bottom:16px;
}
.top-section3 .card3{
  flex:1;
}
.top-section3 .cards3{
  flex:1;
}

/* Tiles */
.tiles3{
  display:flex;
  gap:16px;
}
.tile3{
  flex:1;
  background:#ffffff;
  border-radius:5px;
  padding:16px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  box-shadow:0 4px 12px rgba(0,0,0,0.04);
  transition:all .2s ease;
  cursor:pointer;
}
.tile3:hover{
  transform:translateY(-3px);
  box-shadow:0 10px 24px rgba(0,0,0,0.1);
}
.label3{font-size:14px;font-weight:500;text-align:center;color: #626262;}
.value3{font-size:20px;font-weight:600;text-align:center;}

/* Service Insights Grid */
.service-grid3{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
}
@media(max-width:1100px){
  .service-grid3{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:700px){
  .service-grid3{grid-template-columns:1fr;}
}

/* FLEX ROW FOR PIE + BAR CHART */
.flex-chart-container3{
  display:flex;
  gap:16px;
  flex-wrap:wrap;
  justify-content:space-between;
}

/* Charts Cards */
.flex-chart-container3 .card3{
  flex:1;
  min-width:300px;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:16px;
}

/* PIE CHART */
.pie-chart3{
  width:200px;
  height:200px;
  border-radius:50%;
  --direct3:60;
  --indirect3:40;
  background: conic-gradient(var(--accent-blue33) 0% calc(var(--direct3)*1%), var(--accent-green33) calc(var(--direct3)*1%) 100%);
  transform: rotate(-90deg);
  animation: pieSpin3 1.2s ease-out forwards;
  position: relative;
}
@keyframes pieSpin3{
  from { transform: rotate(-90deg) scale(0.7); opacity:0;}
  to { transform: rotate(-90deg) scale(1); opacity:1;}
}

/* Pie Tooltips */
.pie-chart-container3 {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pie-chart-container3 .tooltip3 {
  position:absolute;
  padding:5px 10px;
  background:#1f2937;
  color:#fff;
  border-radius:6px;
  font-size:12px;
  font-weight:600;
  white-space:nowrap;
  opacity:0;
  pointer-events:none;
  transition:opacity .2s;
}
.direct-tooltip3{
  top:10%;
  left:50%;
  transform:translateX(-50%);
}
.indirect-tooltip3{
  bottom:10%;
  left:50%;
  transform:translateX(-50%);
}
.pie-chart-container3:hover .tooltip3{
  opacity:1;
}

/* Legend */
.legend3{
  display:flex;
  justify-content:center;
  gap:16px;
  margin-top:16px;
  font-size:14px;
}
.dot3{
  width:14px;
  height:14px;
  border-radius:50%;
  display:inline-block;
  margin-right:6px;
}
.direct-dot3{background:var(--accent-blue33);}
.indirect-dot3{background:var(--accent-green33);}

/* BAR CHART */
.bar-chart-container3{
  width:100%;
}
.bar3{
  background:#f8f9fa;
  border-radius:12px;
  padding:16px;
  margin-bottom:16px;
  display:flex;
  flex-direction:column;
  gap:8px;
}
.bar-label3{
  font-size:14px;
  font-weight:500;
  color:#636161;
}
.bar-inner3{
  height:25px;
  border-radius:12px;
  position:relative;
  overflow:hidden;
}
.bar-fill3{
  height:100%;
  border-radius:12px;
  width:0%;
  animation: fillBar3 1.2s forwards;
  position:relative;
  background:#837459;
}
.bar-fill3.post3{background:#837459;}
.bar-fill3.amc3{background:#837459;}
.bar-fills3{
  height:100%;
  border-radius:12px;
  width:0%;
  animation: fillBar3 1.2s forwards;
  position:relative;
  background:#f59e0b;
}
.bar-fill3.posts3{background:#10b981;}
.bar-value3{
  position:absolute;
  right:8px;
  top:0;
  bottom:0;
  display:flex;
  align-items:center;
  color:#fff;
  font-weight:600;
  font-size:12px;
}
@keyframes fillBar3{
  to { width: var(--bar-width); }
}

/* Responsive */
@media(max-width:1000px){
  .flex-chart-container3{
    flex-direction:column;
    align-items:center;
  }
  .flex-chart-container3 .card3{
    max-width:100%;
  }
}

/* Line Chart */
.line-chart3 {
  position: relative;
  height: 250px;
  margin-top:16px;
}
.line-chart3 svg {
  width: 100%;
  height: 100%;
}
.stroke_blue3 {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine3 2s forwards ease-out;
}
@keyframes drawLine3 {
  to { stroke-dashoffset: 0; }
}
.point3 {
  opacity: 0;
  transform: scale(0);
  animation: appearPoint3 2s forwards ease-out;
  animation-delay: 2s;
}
@keyframes appearPoint3 {
  to { opacity: 1; transform: scale(1); }
}

/* Legend */
.legend3 {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}
.legend-item3 {
  display: flex;
  align-items: center;
  gap: 8px;
}
.legend-color3 {
  width: 20px;
  height: 4px;
  border-radius: 2px;
}

/* Table */
.table3 th, .table3 td {
  padding: 16px;
  border-bottom:1px solid #eee;
}
.table3 th {
  border-bottom:2px solid #ddd;
  background:#f3f4f6;
  text-align:left;
}
 /* Customer Satisfaction */
      .satisfaction-grid3 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 25px;
      }

      .rating-display3 {
        text-align: center;
        padding: 20px;
      }

      .rating-score3 {
        font-size: 64px;
        font-weight: 700;
        color: #667eea;
        margin-bottom: 10px;
      }

      .rating-stars3 {
        font-size: 32px;
        color: #fbbf24;
        margin-bottom: 10px;
      }

      .rating-label3 {
        color: #6b7280;
        font-size: 14px;
      }

      /* Complaints List */
      .complaints-list3 {
        max-height: 300px;
        overflow-y: auto;
      }

      .complaint-item3 {
        padding: 15px;
        border-left: 4px solid #ef4444;
        background: #fef2f2;
        margin-bottom: 12px;
        border-radius: 6px;
        transition: transform 0.3s ease;
      }

      .complaint-item3:hover {
        transform: translateX(5px);
      }

      .complaint-date3 {
        font-size: 11px;
        color: #991b1b;
        font-weight: 600;
        margin-bottom: 5px;
      }

      .complaint-text3{
        font-size: 13px;
        color: #7f1d1d;
      }

      /* Competitors Section */
      .competitors-table3 {
        width: 100%;
        border-collapse: collapse;
      }

      .competitors-table3 th {
        background: #c1c1c1;
        color: #141414;
        padding: 15px;
        text-align: left;
        font-weight: 600;
      }

      .competitors-table3 td {
        padding: 15px;
        border-bottom: 1px solid #e5e7eb;
      }

      .competitors-table3 tr:hover {
        background: #f9fafb;
      }

      /* Stacked Bar Chart */
      .stacked-bar-chart3 {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 10px 0;
      }

      .stacked-bar-row3 {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .stacked-bar-label3 {
        width: 80px;
        font-size: 13px;
        font-weight: 500;
        color: #4b5563;
      }

      .stacked-bar3 {
        flex: 1;
        height: 40px;
        display: flex;
        border-radius: 6px;
        overflow: hidden;
        background: #f3f4f6;
      }

      .stacked-segment3 {
        height: 100%;
        transition: all 0.6s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
      }

      .stacked-segment3:hover {
        opacity: 0.8;
        filter: brightness(1.1);
      }

      .segment-price3 {
        background: #ef4444;
      }

      .segment-quality3 {
        background: #f59e0b;
      }

      .segment-delivery3 {
        background: #8b5cf6;
      }

      .segment-other3 {
        background: #6b7280;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .charts-grid3 {
          grid-template-columns: 1fr;
        }

        .satisfaction-grid3 {
          grid-template-columns: 1fr;
        }
      }

      /* Animation Classes */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-in3 {
        animation: fadeInUp 0.6s ease forwards;
      }
        /* Bar Chart */
      .bar-chart3 {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        height: 250px;
        gap: 15px;
      }


      .bar-group-yoy3 {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .bars-yoy3 {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 200px;
        width: 100%;
        justify-content: center;
      }

      .bar-yoy3 {
        width: 70px;
        border-radius: 4px 4px 0 0;
        transition: all 0.6s ease;
        position: relative;
        cursor: pointer;
      }

      .bar-yoy3:hover {
        opacity: 0.8;
        transform: scaleY(1.05);
      }

      .bar-yoy3:hover .bar-value-label3 {
        opacity: 1;
        transform: translateY(-5px);
      }

      .bar-group3 {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .bars3 {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 200px;
        width: 100%;
        justify-content: center;
      }

      .bars3 {
        width: 20px;
        border-radius: 4px 4px 0 0;
        transition: all 0.6s ease;
        position: relative;
        cursor: pointer;
      }

      .bars3:hover {
        opacity: 0.8;
        transform: scaleY(1.05);
      }

      .bars3:hover .bar-value-label3 {
        opacity: 1;
        transform: translateY(-5px);
      }

      .bar-value-label3 {
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        background: #1f2937;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 600;
        white-space: nowrap;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        z-index: 10;
      }

      .bar-value-label3::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #1f2937;
      }

      .bar.sales3 {
        background: linear-gradient(180deg, #10b981 0%, #059669 100%);
      }

      .bar.cost3 {
        background: linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%);
      }

      .bar.profit3 {
        background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);
      }

      .bar-label3 {
        font-size: 11px;
        color: #6b7280;
        font-weight: 500;
        text-align: center;
      }

      /* Horizontal Bar Chart */
      .horizontal-bar-chart3 {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 10px 0;
      }

      .horizontal-bar-row3 {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .horizontal-bar-label3 {
        min-width: 100px;
        font-size: 13px;
        font-weight: 600;
        color: #1f2937;
      }

      .horizontal-bar-wrapper3 {
        flex: 1;
        position: relative;
      }

      .horizontal-bar3 {
        height: 40px;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        transition: all 0.6s ease;
        cursor: pointer;
      }

      .horizontal-bar3:hover {
        transform: scaleX(1.02);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .horizontal-bar-value3 {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        font-size: 14px;
        font-weight: 700;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }

      .horizontal-bar.q13 {
        background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
      }

      .horizontal-bar.q23 {
        background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
      }

      .horizontal-bar.q33 {
        background: linear-gradient(90deg, #10b981 0%, #059669 100%);
      }

      .horizontal-bar.q43 {
        background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
      }
       /* -------------------- Gauge -------------------- */
    .gauge-wrapper3 {
      flex: 0 0 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .gauge-container3 {
      position: relative;
      width: 450px;
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .gauge-arc-container3 {
      position: relative;
      width: 160px;
      height: 80px;
    }

    .gauge-bg-arc3 {
      width: 160px;
      height: 80px;
      border-radius: 80px 80px 0 0;
      background: #e8ecef;
      position: relative;
      overflow: hidden;
    }

    .gauge-progress-arc3 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 160px;
      height: 80px;
      border-radius: 80px 80px 0 0;
      background: linear-gradient(90deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #1dd1a1 75%, #10ac84 100%);
      clip-path: polygon(0 100%,
          0 0,
          calc(var(--percentage, 0) * 1%) 0,
          calc(var(--percentage, 0) * 1%) 100%);
      animation: fillGaugeArc 2s ease-out forwards;
    }

    @keyframes fillGaugeArc {
      from {
        clip-path: polygon(0 100%, 0 100%, 0 100%, 0 100%);
      }

      to {
        clip-path: polygon(0 100%,
            0 0,
            calc(var(--percentage, 0) * 1%) 0,
            calc(var(--percentage, 0) * 1%) 100%);

      }
    }

    .gauge-inner-cutout3 {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 60px;
      background: #fff;
      border-radius: 60px 60px 0 0;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .gauge-value-display3 {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      z-index: 10;
    }

    .gauge-percentage3 {
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 4px;
    }

    .gauge-text3 {
      font-size: 11px;
      color: #6c757d;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
   .gauge-wrapper3 {
  position: relative; /* make wrapper relative for absolute positioning */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 6px;
  margin-bottom: 16px;
  border-radius: 14px;
    padding: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.07);
    border-bottom: 3px solid var(--border-grey3);
}



    .gauge-indicator3 {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 4px;
      height: 60px;
      background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
      transform-origin: bottom center;
      transform: translateX(-50%) rotate(calc(-90deg + (var(--percentage, 0) * 1.8deg)));
      border-radius: 4px 4px 0 0;
      animation: rotateIndicator 2s ease-out forwards;
      z-index: 5;
      box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    }

    .gauge-indicator3::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    @keyframes rotateIndicator {
      from {
        transform: translateX(-50%) rotate(-90deg);
      }

      to {
        transform: translateX(-50%) rotate(calc(-90deg + (var(--percentage, 0) * 1.8deg)));
      }
    }

    .gauge-labels3 {
      position: absolute;
      bottom: -5px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      font-size: 10px;
      color: #adb5bd;
      font-weight: 600;
    }
    /* Heading inside the gauge curve */
/* Heading inside the gauge, above the arc */
.gauge-inside-heading3 {
  position: absolute;
  top: 10px; /* adjust as needed to sit in the red box area */
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 700;
  color: #333;
  text-align: center;
  z-index: 10;
  pointer-events: none; /* ensures it doesn’t interfere with gauge hover/animation */
}
.chart-gauge-wrapper3{
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.chart-gauge-wrapper3 .card3,
.chart-gauge-wrapper3 .gauge-wrapper3 {
  flex: 1;
  min-width: 300px;
}
    .benchmarks-section3 {
      background: #ffffff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
      max-width: 1360px;
      margin: 0 auto;
    margin-bottom : 15px;
    }

    .section-header3 {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
    }

    .section-title3 {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
    }

    .benchmark-table3 {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      border: 2px solid #d1d5db; /* full table border */
    }

    .benchmark-table3 th,
    .benchmark-table3 td {
      padding: 12px 10px;
      border: 1px solid #d1d5db; /* all cell borders */
      vertical-align: middle;
      text-align: center;
    }

    .benchmark-table3 th {
      background: #f3f4f6;
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    .benchmark-table3 td:first-child {
      text-align: left;
      font-weight: 500;
    }
`,gg=`
.widget-status{padding:40px 20px;text-align:center;color:#6b7280;font-size:14px;}
.widget-error{color:#b91c1c;}
`,mg=e=>{let t="";for(let n=1;n<=5;n+=1)t+=n<=e?"★":"☆";return t};function hg({view:e,today:t}){const{tiles:n,executives:r,invoiceTrend:l,repeatReasons:i,feedbackTrend:o}=e,a=502.65,s=!i.totalRepeatCalls,c=s?0:i.lackOfKnowledge,g=s?0:i.partsUnavailability,m=s?0:i.powerIssue,h=c/100*a,v=g/100*a,x=m/100*a,w=0-h,L=0-(h+v),p=[["Total Calls Logged Today",n.total_calls_today],["Service Executives Active Today",n.executives_act_today],["Service Reports Submitted",n.service_reports_submitted_count],["Quotations Sent Today",n.quot_sent_today],["Customer Feedbacks Collected",n.cust_feedback_rec],["Pending Calls > 48 Hrs",n.pending_calls,!0],["Customer Regret Cases",n.customer_regret_cases_count,!0],["Repeat Calls Logged",n.repeated_calls_count],["Invoices Generated Today",n.invoices_gen_today],["Invoice Amounts (₹)",`₹ ${n.total_invoiced_amt_today}`]],f=[["AMC",l.amc_height,l.amc_amt],["Install",l.install_height,l.installtion_amt],["Repair",l.repair_height,l.repair_amt],["Service",l.service_height,l.service_amt],["Spares",l.spares_height,l.spares_amt]],d=[["#3b82f6","Lack of Knowledge",c],["#16a34a","Parts Unavailability",g],["#f59e0b","Power Issue",m]];return u.jsxs(u.Fragment,{children:[u.jsxs("header",{children:[u.jsx("h1",{children:"TAB 1 — TODAY'S"}),u.jsxs("div",{className:"date",children:["Date: ",Mc(t)]})]}),u.jsxs("main",{className:"container",children:[u.jsx("section",{className:"tiles",children:p.map(([y,_,S])=>u.jsxs("div",{className:"tile",children:[u.jsx("div",{className:"label",children:y}),u.jsx("div",{className:S?"value red":"value",children:_})]},y))}),u.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:[u.jsxs("div",{className:"card",children:[u.jsx("h3",{children:"Service Executive Performance (Today)"}),u.jsxs("div",{className:"legend",children:[u.jsxs("span",{children:[u.jsx("span",{className:"dot assigned-dot"}),"Assigned"]}),u.jsxs("span",{children:[u.jsx("span",{className:"dot closed-dot"}),"Closed"]})]}),u.jsx("div",{className:"bar-chart-row",children:r.map((y,_)=>u.jsxs("div",{className:"bar-group",children:[u.jsxs("div",{className:"bars",children:[u.jsxs("div",{className:"bar-container",children:[u.jsx("div",{className:"bar-number",children:y.assignedToday}),u.jsx("div",{className:"bar assigned",style:{height:`${y.assignedHeight}px`}})]}),u.jsxs("div",{className:"bar-container",children:[u.jsx("div",{className:"bar-number",children:y.completedToday}),u.jsx("div",{className:"bar closed",style:{height:`${y.completedHeight}px`}})]})]}),u.jsx("div",{className:"exec-label",children:y.Engineer_Name})]},_))})]}),u.jsxs("div",{className:"card",children:[u.jsx("h3",{children:"Invoice Amount Trend (Today)"}),u.jsx("div",{className:"invoice-chart",children:f.map(([y,_,S])=>u.jsxs("div",{className:"col",children:[u.jsx("div",{className:"col-bar",style:{"--h":`${_}px`}}),u.jsx("div",{className:"col-label",children:y}),u.jsxs("div",{className:"col-value",children:["₹ ",S]})]},y))})]}),u.jsxs("div",{style:{display:"flex",gap:"14px",margin:"10px"},children:[u.jsxs("div",{className:"card",style:{flex:1},children:[u.jsx("h3",{children:"Repeat Calls Reason Breakdown"}),u.jsx("div",{style:{position:"relative",width:"250px",height:"250px",margin:"20px auto"},children:s?u.jsxs("svg",{viewBox:"0 0 200 200",style:{width:"100%",height:"100%"},children:[u.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"#e5e7eb",strokeWidth:"60"}),u.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"white"}),u.jsx("text",{x:"100",y:"105",textAnchor:"middle",style:{fontSize:"16px",fill:"#999",fontWeight:600},children:"No Data"})]}):u.jsxs(u.Fragment,{children:[u.jsxs("svg",{viewBox:"0 0 200 200",style:{width:"100%",height:"100%",transform:"rotate(-90deg)"},children:[c>0&&u.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"#3b82f6",strokeWidth:"60",strokeDasharray:`${h} ${a}`,strokeDashoffset:0,style:{transition:"all 1s ease"}}),g>0&&u.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"#16a34a",strokeWidth:"60",strokeDasharray:`${v} ${a}`,strokeDashoffset:w,style:{transition:"all 1s ease"}}),m>0&&u.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"#f59e0b",strokeWidth:"60",strokeDasharray:`${x} ${a}`,strokeDashoffset:L,style:{transition:"all 1s ease"}}),u.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"white"})]}),u.jsxs("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",textAlign:"center"},children:[u.jsx("div",{style:{fontSize:"32px",fontWeight:700,color:"#1f2937"},children:i.totalRepeatCalls}),u.jsx("div",{style:{fontSize:"12px",color:"#6b7280"},children:"Total Calls"})]})]})}),u.jsx("div",{style:{marginTop:"24px",display:"flex",flexDirection:"column",gap:"10px",alignItems:"center"},children:d.map(([y,_,S])=>u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[u.jsx("span",{style:{width:"14px",height:"14px",borderRadius:"50%",background:y,display:"inline-block"}}),u.jsxs("span",{style:{fontSize:"14px",color:"#555"},children:[_,": ",R(S,1),"%"]})]},_))})]}),u.jsxs("div",{className:"gauge-cnt2-container",style:{"--percentage":o.percentage},children:[u.jsxs("div",{className:"gauge-cnt2-inside-heading",children:["Service Feedback Trend (Avg: ",o.average_rating,"/5)"]}),u.jsxs("div",{className:"gauge-cnt2-arc-container",children:[u.jsx("div",{className:"gauge-cnt2-bg-arc",children:u.jsx("div",{className:"gauge-cnt2-progress-arc"})}),u.jsx("div",{className:"gauge-cnt2-inner-cutout"}),u.jsx("div",{className:"gauge-cnt2-indicator"}),u.jsxs("div",{className:"gauge-cnt2-value-display",children:[u.jsxs("div",{className:"gauge-cnt2-percentage",children:[o.percentage,"%"]}),u.jsx("div",{className:"gauge-cnt2-text",children:"Average"})]})]}),u.jsxs("div",{className:"gauge-cnt2-labels",children:[u.jsx("span",{children:"0%"}),u.jsx("span",{children:"100%"})]})]})]})]})]})]})}function vg({view:e}){const{engineer:t,aging:n,amc:r,redTag:l,satisfaction:i,recentFeedbacks:o}=e,a=[["Avg Calls Attended per Engineer",t.average_calls_per_engineer_week],["Average Response Time (hrs)",e.avgResponseTime],["Repeat Call %",`${e.repeatCallPercent.toFixed(1)}%`],["Customer Regret %",`${R(e.regretPercent,2).toFixed(2)}%`],["Google Review Collection %",`${e.googleReviews}%`],["AMC Leads Generated",e.amcLeads],["Pending Replacements",e.pendingReplacements],["Standby Units Pending Collection",e.standbyPending]],s=[l.week1,l.week2,l.week3,l.week4].map(c=>{let g=l.maxValue>0?c*200/l.maxValue:0;return c>0&&g<30&&(g=30),{count:c,height:g}});return u.jsxs("div",{className:"weekly-wrap",children:[u.jsx("h1",{className:"weekly-heading-card",children:"Weekly Performance Dashboard"}),u.jsx("div",{className:"weekly-kpi-grid",children:a.map(([c,g])=>u.jsxs("div",{className:"weekly-kpi-card",children:[u.jsx("div",{className:"weekly-kpi-title",children:c}),u.jsx("div",{className:"weekly-kpi-value",children:g})]},c))}),u.jsxs("div",{className:"weekly-chart-card",children:[u.jsx("div",{className:"weekly-chart-title",children:"Engineer-wise Call Volume"}),u.jsxs("div",{className:"weekly-legend",children:[u.jsxs("div",{className:"weekly-legend-item",children:[u.jsx("div",{className:"weekly-legend-color completed"})," Completed"]}),u.jsxs("div",{className:"weekly-legend-item",children:[u.jsx("div",{className:"weekly-legend-color pending"})," Pending"]})]}),u.jsx("div",{className:"weekly-bar-chart",children:t.per_engineer.map((c,g)=>u.jsxs("div",{className:"weekly-bar-group",children:[u.jsxs("div",{className:"weekly-bar",children:[u.jsx("div",{className:"weekly-segment completed",style:{height:`${c.completed_height}%`},children:c.calls_completed}),u.jsx("div",{className:"weekly-segment pending",style:{height:`${c.pending_height}%`},children:c.calls_pending})]}),u.jsxs("div",{className:"weekly-value",children:["Total: ",c.total_calls_this_week]}),u.jsx("div",{className:"weekly-label",children:c.engineer_name})]},g))})]}),u.jsxs("div",{className:"weekly-chart-card",children:[u.jsx("div",{className:"weekly-chart-title",children:"Customer Satisfaction"}),u.jsxs("div",{className:"weekly-satisfaction-grid",children:[u.jsxs("div",{className:"weekly-rating-section",children:[u.jsxs("div",{className:"weekly-rating-display",children:[u.jsx("div",{className:"weekly-rating-score",children:e.overallAvg}),u.jsx("div",{className:"weekly-stars-container",children:[1,2,3,4,5].map(c=>{const g=c<=e.fullStars||c===e.fullStars+1&&e.hasHalfStar;return u.jsx("span",{className:g?"weekly-star filled":"weekly-star empty",children:"★"},c)})}),u.jsx("div",{className:"weekly-rating-label",children:"Average Customer Rating"})]}),u.jsx("div",{className:"weekly-trend-title",children:"Weekly Rating Trend"}),u.jsx("div",{className:"weekly-trend",children:i.length>0?i.map((c,g)=>u.jsxs("div",{className:"weekly-week-bar-group",children:[u.jsx("div",{className:"weekly-week-bar","data-rating":c.average_rating,style:{height:`${c.bar_height}%`,animationDelay:`${g*.2}s`}}),u.jsx("div",{className:"weekly-week-label",children:c.week_label})]},c.week_label)):u.jsx("div",{style:{textAlign:"center",padding:"20px",color:"#6b7280"},children:"No data available"})})]}),u.jsxs("div",{className:"weekly-feedback-section",children:[u.jsx("h3",{className:"weekly-feedback-title",children:"Recent Feedbacks"}),u.jsx("div",{className:"weekly-complaints-list",children:o.length>0?o.map((c,g)=>{const m=c.rating>=4?"positive":c.rating<=2?"negative":"neutral";return u.jsxs("div",{className:`weekly-feedback-item ${m}`,children:[u.jsx("div",{className:"weekly-feedback-date",children:Oc(c.created_date)}),u.jsxs("div",{className:"weekly-feedback-text",children:[c.comments," – Customer: ",c.customer_name]}),u.jsxs("div",{className:"weekly-feedback-rating",children:[mg(c.rating)," ",u.jsx("span",{className:"weekly-rating-number",children:c.rating})]})]},c.id||g)}):u.jsx("div",{style:{textAlign:"center",padding:"20px",color:"#6b7280"},children:"No feedback available"})})]})]})]}),u.jsxs("div",{className:"weekly-chart-card",children:[u.jsx("div",{className:"weekly-chart-title",children:"Pending Call Ageing"}),u.jsxs("div",{className:"weekly-legend",children:[u.jsxs("div",{className:"weekly-legend-item",children:[u.jsx("div",{className:"weekly-legend-color",style:{background:"#3b82f6"}})," 0-2 Days"]}),u.jsxs("div",{className:"weekly-legend-item",children:[u.jsx("div",{className:"weekly-legend-color",style:{background:"#10b981"}})," 3-5 Days"]}),u.jsxs("div",{className:"weekly-legend-item",children:[u.jsx("div",{className:"weekly-legend-color",style:{background:"#f59e0b"}})," >5 Days"]})]}),u.jsx("div",{className:"weekly-bar-chart",children:n.map((c,g)=>{const m=c["0-2_Days"],h=c["3-5_Days"],v=c.above_5_Days,x=m+h+v,w=L=>(x>0?L*100/x:0)||2;return u.jsxs("div",{className:"weekly-bar-group",children:[u.jsxs("div",{className:"weekly-bar",children:[u.jsx("div",{className:"weekly-segment",style:{height:`${w(m)}%`,background:"#3b82f6"},children:m}),u.jsx("div",{className:"weekly-segment",style:{height:`${w(h)}%`,background:"#10b981"},children:h}),u.jsx("div",{className:"weekly-segment",style:{height:`${w(v)}%`,background:"#f59e0b"},children:v})]}),u.jsxs("div",{className:"weekly-value",children:["Total: ",x]}),u.jsxs("div",{className:"weekly-label",children:["Week ",g+1]})]},g)})})]}),u.jsxs("div",{className:"weekly-chart-card",style:{textAlign:"center"},children:[u.jsx("div",{className:"weekly-chart-title",children:"AMC Offer vs Closed – Conversion Chart"}),u.jsx("div",{className:"weekly-donut-container",children:u.jsx("div",{className:"weekly-donut",style:{background:`conic-gradient(from 0deg, #10b981 0% ${r.closed_percent}%, #3b82f6 ${r.closed_percent}% 100%)`},children:u.jsx("div",{className:"weekly-donut-inner",children:r.total})})}),u.jsxs("div",{className:"weekly-legend",style:{justifyContent:"center",display:"flex",gap:"20px",marginTop:"15px"},children:[u.jsxs("div",{className:"weekly-legend-item",style:{display:"flex",alignItems:"center",gap:"6px"},children:[u.jsx("div",{className:"weekly-legend-color",style:{width:"15px",height:"15px",background:"#10b981"}}),"Closed - ",r.closed," (",r.closed_percent,"%)"]}),u.jsxs("div",{className:"weekly-legend-item",style:{display:"flex",alignItems:"center",gap:"6px"},children:[u.jsx("div",{className:"weekly-legend-color",style:{width:"15px",height:"15px",background:"#3b82f6"}}),"Offered - ",r.total]})]})]}),u.jsxs("div",{className:"weekly-chart-card",children:[u.jsx("div",{className:"weekly-chart-title",children:"Red Tag Item Trend (Service Dept)"}),u.jsx("div",{className:"weekly-legend",children:u.jsxs("div",{className:"weekly-legend-item",children:[u.jsx("div",{className:"weekly-legend-color",style:{background:"#ef4444"}})," Red Tag Items"]})}),u.jsx("div",{className:"weekly-bar-chart",style:{height:"200px",gap:"20px",borderLeft:"2px solid #444",borderBottom:"2px solid #444",paddingBottom:"10px",justifyContent:"space-around"},children:s.map((c,g)=>u.jsxs("div",{className:"weekly-bar-group",children:[u.jsx("div",{className:"weekly-bar",style:{height:`${c.height}px`},children:u.jsx("span",{className:"weekly-segment",style:{color:"#ffffff",fontSize:"12px",fontWeight:600},children:c.count})}),u.jsxs("div",{className:"weekly-label",children:["Week ",g+1]})]},g))})]})]})}const yg={display:"inline-block",padding:"5px 12px",borderRadius:"12px",fontSize:"12px",fontWeight:600},xg={green:{backgroundColor:"#d4edda",color:"#155724"},orange:{backgroundColor:"#fff3cd",color:"#856404"},red:{backgroundColor:"#f8d7da",color:"#721c24"},blue:{backgroundColor:"#d1ecf1",color:"#0c5460"}};function wg({trend:e}){const t=e.length,n=Math.max(700,80+t*90);let r=Math.max(0,...e.map(c=>c.repeat_calls));r=r>0?r+10:100;const l=80,i=t<=1?0:(n-l-40)/(t-1),o=180,a=o-20,s=e.map((c,g)=>({x:l+g*i,y:o-c.repeat_calls/r*a,month:c.month}));return u.jsxs("svg",{viewBox:`0 0 ${n} 220`,preserveAspectRatio:"xMidYMid meet",children:[u.jsx("line",{x1:"50",y1:"20",x2:"50",y2:"180",stroke:"#e0e0e0",strokeWidth:"1"}),u.jsx("line",{x1:"50",y1:"180",x2:n-20,y2:"180",stroke:"#e0e0e0",strokeWidth:"2"}),u.jsx("text",{x:"30",y:"185",fontSize:"11",fill:"#666",children:"0"}),u.jsx("text",{x:"30",y:"140",fontSize:"11",fill:"#666",children:"25"}),u.jsx("text",{x:"30",y:"95",fontSize:"11",fill:"#666",children:"50"}),u.jsx("text",{x:"30",y:"50",fontSize:"11",fill:"#666",children:"75"}),u.jsx("text",{x:"25",y:"25",fontSize:"11",fill:"#666",children:"100"}),u.jsx("polyline",{points:s.map(c=>`${c.x},${c.y}`).join(" "),fill:"none",stroke:"#3b82f6",strokeWidth:"3",className:"stroke_blue3"}),s.map((c,g)=>u.jsxs(od.Fragment,{children:[u.jsx("circle",{cx:c.x,cy:c.y,r:"5",fill:"#3b82f6",className:"point3"}),u.jsx("text",{x:c.x,y:"200",textAnchor:"middle",fontSize:"12",fill:"#666",children:c.month})]},g))]})}function kg({view:e}){const{callLogs:t,expense:n,costByCategory:r,positiveFeedback:l,satisfaction:i,complaints:o,calibration:a}=e,s=i.overall_average,c=Math.floor(s),g=s-c>=.5;let m="";for(let v=1;v<=5;v+=1)m+=v<=c||v===c+1&&g?"★":"☆";const h=[["Under Warranty",r.w_percentage,""],["Post Warranty",r.pw_percentage," post3"],["AMC",r.amc_percentage," amc3"]];return u.jsxs("div",{className:"dashboard-container3",children:[u.jsx("div",{className:"page-title3",children:"Monthly Insights"}),u.jsxs("div",{className:"top-section3",children:[u.jsxs("div",{className:"cards3",children:[u.jsx("h3",{children:"Total Calls Logged (Month)"}),u.jsxs("div",{className:"tiles3",children:[u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"Warranty"}),u.jsx("div",{className:"value3",children:t.warranty_count})]}),u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"Post Warranty"}),u.jsx("div",{className:"value3",children:t.post_warranty})]}),u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"AMC"}),u.jsx("div",{className:"value3",children:t.amc_count})]})]})]}),u.jsxs("div",{className:"cards3",children:[u.jsx("h3",{children:"Expenses for Complaints"}),u.jsxs("div",{className:"tiles3",children:[u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"Warranty Expense"}),u.jsxs("div",{className:"value3",children:["₹ ",t.warranty_amount]})]}),u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"Post Warranty"}),u.jsxs("div",{className:"value3",children:["₹ ",t.post_warranty_amount]})]})]})]})]}),u.jsxs("div",{className:"cards3",children:[u.jsx("h3",{children:"Service Insights"}),u.jsxs("div",{className:"service-grid3",children:[u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"Indirect Expenses"}),u.jsxs("div",{className:"value3",children:["₹ ",e.indirectExpense]})]}),u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"Repeat Call Analysis"}),u.jsxs("div",{className:"value3",children:[e.repeatCalls," calls"]})]}),u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"Stock Unavailability Delays"}),u.jsxs("div",{className:"value3",children:[e.stockDelays," cases"]})]}),u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"Training Hours Conducted"}),u.jsxs("div",{className:"value3",children:[e.trainingHours," hrs"]})]}),u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"Tool & Vehicle Inspections Completed"}),u.jsxs("div",{className:"value3",children:[e.compliance.compliance_percentage,"%"]})]}),u.jsxs("div",{className:"tile3",children:[u.jsx("div",{className:"label3",children:"Customer Feedback Summary"}),u.jsxs("div",{className:"value3",children:[l.avg_feedback," ⭐ | ",l.positive_feedback_percentage,"% Positive"]})]})]})]}),u.jsxs("div",{className:"flex-chart-container3",children:[u.jsxs("div",{className:"card3 pie-chart-container3",children:[u.jsx("h3",{children:"Expense Breakdown"}),u.jsx("div",{className:"pie-chart3",style:{"--direct3":n.direct_percent,"--indirect3":n.indirect_percent}}),u.jsxs("div",{className:"tooltip3 direct-tooltip3",children:["Direct: ₹ ",n.direct_expense," (",n.direct_percent,"%)"]}),u.jsxs("div",{className:"tooltip3 indirect-tooltip3",children:["Indirect: ₹ ",n.indirect_expense," (",n.indirect_percent,"%)"]}),u.jsxs("div",{className:"legend3",children:[u.jsxs("span",{children:[u.jsx("span",{className:"dot3 direct-dot3"}),"Direct - ₹ ",n.direct_expense," (",n.direct_percent,"%)"]}),u.jsxs("span",{children:[u.jsx("span",{className:"dot3 indirect-dot3"}),"Indirect - ₹ ",n.indirect_expense," (",n.indirect_percent,"%)"]})]})]}),r.has_data?u.jsxs("div",{className:"card3 bar-chart-container3",children:[u.jsx("h3",{children:"Complaint Cost by Category"}),h.map(([v,x,w])=>u.jsxs("div",{className:"bar3",children:[u.jsx("div",{className:"bar-label3",children:v}),u.jsx("div",{className:"bar-inner3",children:u.jsx("div",{className:`bar-fill3${w}`,style:{"--bar-width":`${x}%`},children:u.jsxs("div",{className:"bar-value3",children:[R(x,1),"%"]})})})]},v))]}):u.jsx("div",{className:"card3 bar-chart-container3",style:{display:"flex",alignItems:"center",justifyContent:"center",height:"300px"},children:u.jsx("div",{style:{color:"#6b7280",fontSize:"16px"},children:"No complaint cost category data available for this period"})})]}),u.jsxs("div",{className:"chart-gauge-wrapper3",children:[u.jsxs("div",{className:"card3",children:[u.jsx("h3",{children:"Repeat Call Trend – Month-over-Month"}),u.jsx("div",{className:"line-chart3",children:u.jsx(wg,{trend:e.repeatTrend})}),u.jsx("div",{className:"legend3",children:u.jsxs("div",{className:"legend-item3",children:[u.jsx("div",{className:"legend-color3",style:{background:"#3b82f6"}}),u.jsx("span",{children:"Repeat Calls"})]})})]}),u.jsx("div",{className:"gauge-wrapper3",children:u.jsxs("div",{className:"gauge-container3",style:{"--percentage":l.positive_feedback_percentage},children:[u.jsx("div",{className:"gauge-inside-heading3",children:"% Positive Feedback"}),u.jsxs("div",{className:"gauge-arc-container3",children:[u.jsx("div",{className:"gauge-bg-arc3",children:u.jsx("div",{className:"gauge-progress-arc3"})}),u.jsx("div",{className:"gauge-inner-cutout3"}),u.jsx("div",{className:"gauge-indicator3"}),u.jsxs("div",{className:"gauge-value-display3",children:[u.jsx("div",{className:"gauge-percentage3",children:l.positive_feedback_percentage}),u.jsx("div",{className:"gauge-text3",children:"Feedback"})]})]}),u.jsxs("div",{className:"gauge-labels3",children:[u.jsx("span",{children:"0%"}),u.jsx("span",{children:"100%"})]})]})})]}),u.jsxs("div",{className:"benchmarks-section3 animate-in",children:[u.jsx("div",{className:"section-header3",children:u.jsxs("div",{className:"section-title3",children:["Customer Satisfaction (",i.overall_count," reviews)"]})}),u.jsxs("div",{className:"satisfaction-grid3",children:[u.jsxs("div",{children:[u.jsxs("div",{className:"rating-display3",children:[u.jsx("div",{className:"rating-score3",children:s}),u.jsx("div",{className:"rating-stars3",children:m}),u.jsx("div",{className:"rating-label3",children:"Average Customer Rating"})]}),u.jsx("div",{className:"bar-chart3",style:{height:"180px",marginTop:"20px"},children:i.months.map(v=>{let x=0;return v.average>0&&(x=v.average/5*100,x<5&&(x=5)),u.jsxs("div",{className:"bar-group3",children:[u.jsx("div",{className:"bars3",children:u.jsx("div",{className:"bar3",style:v.count>0?{height:`${x}%`,background:"linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)"}:{height:"5%",background:"#e5e7eb"}})}),u.jsx("div",{className:"bar-label3",children:v.name})]},v.name)})})]}),u.jsxs("div",{children:[u.jsx("h3",{style:{fontSize:"16px",fontWeight:600,marginBottom:"15px",color:"#1f2937"},children:"Recent Complaints"}),u.jsx("div",{className:"complaints-list3",children:o.length>0?o.map((v,x)=>u.jsxs("div",{className:"complaint-item3",children:[u.jsx("div",{className:"complaint-date3",children:Mc(v.feedback_date)}),u.jsxs("div",{className:"complaint-text3",children:[v.customer_feedback," - Customer: ",v.customer_name]})]},x)):u.jsxs("div",{className:"complaint-item3",children:[u.jsx("div",{className:"complaint-date3",children:"Empty"}),u.jsx("div",{className:"complaint-text3",children:"No Data found!"})]})})]})]})]}),u.jsxs("div",{className:"card3",children:[u.jsx("h3",{children:"Calibration / Maintenance Reports"}),u.jsxs("table",{className:"table3",style:{width:"100%",borderCollapse:"collapse",fontSize:"14px"},children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Equipment"}),u.jsx("th",{children:"Report Type"}),u.jsx("th",{children:"Last Service Date"}),u.jsx("th",{children:"Next Service Date"}),u.jsx("th",{children:"Service Person"}),u.jsx("th",{children:"Status"})]})}),u.jsx("tbody",{children:a.map((v,x)=>{let w={};return v.is_due_this_month?w={backgroundColor:"#fffacd"}:v.is_overdue&&(w={backgroundColor:"#ffe6e6"}),u.jsxs("tr",{style:w,children:[u.jsx("td",{children:v.equipment}),u.jsx("td",{children:v.report_type}),u.jsx("td",{children:v.last_service_date}),u.jsx("td",{children:v.next_service_date}),u.jsx("td",{children:v.service_person}),u.jsx("td",{style:{textAlign:"center"},children:u.jsx("span",{style:{...yg,...xg[v.status_color]},children:v.status})})]},x)})})]})]})]})}function ws({children:e,error:t}){return u.jsx("div",{className:t?"widget-status widget-error":"widget-status",children:e})}function _g(){const e=re.useMemo(()=>cr(new Date),[]),[t,n]=re.useState("today"),[r,l]=re.useState({}),[i,o]=re.useState({today:"idle",weekly:"idle",monthly:"idle"}),[a,s]=re.useState(""),c=re.useRef({}),g=re.useRef({}),m=re.useCallback(async d=>{if(!c.current[d]){c.current[d]=!0,o(y=>({...y,[d]:"loading"}));try{for(const y of Ep(d)){const _=await Pp(y,e);l(S=>({...S,[y]:_}))}o(y=>({...y,[d]:"done"}))}catch(y){console.error("Dashboard loading error:",y),s(Xr(y))}}},[e]);re.useEffect(()=>{var d,y,_;if(!((_=(y=(d=window.ZOHO)==null?void 0:d.CREATOR)==null?void 0:y.DATA)!=null&&_.getRecords)){s("Zoho Creator Widget SDK is not available.");return}m("today")},[m]),re.useEffect(()=>{a||(t==="weekly"&&m("weekly"),t==="monthly"&&m("monthly"))},[t,a,m]);const h=i.today==="done",v=h&&i.weekly==="done",x=h&&i.monthly==="done",w=re.useMemo(()=>h?ug(r,e):null,[h,r,e]),L=re.useMemo(()=>v?cg(r,e):null,[v,r,e]),p=re.useMemo(()=>x?dg(r,e):null,[x,r,e]);re.useEffect(()=>{[["today",w],["weekly",L],["monthly",p]].forEach(([d,y])=>{if(!y||g.current[d])return;g.current[d]=!0;const _=fg(d,y);yn.results[d]=_,console.log(`[Dashboard] ${d} values - compare with the Deluge dashboard (copy(__ADROIT_DEBUG__.text()) copies all tabs)`),console.table(_.map(({label:S,value:E})=>({label:S,value:E})))})},[w,L,p]);const f=u.jsx(ws,{children:a?"":"Loading dashboard data..."});return u.jsxs(u.Fragment,{children:[u.jsx("style",{children:pg}),u.jsx("style",{children:gg}),u.jsxs("div",{className:"tab-container",children:[a&&u.jsx(ws,{error:!0,children:a}),u.jsx("input",{type:"radio",name:"tabs",id:"tab1",className:"tab-input",checked:t==="today",onChange:()=>n("today")}),u.jsx("input",{type:"radio",name:"tabs",id:"tab2",className:"tab-input",checked:t==="weekly",onChange:()=>n("weekly")}),u.jsx("input",{type:"radio",name:"tabs",id:"tab3",className:"tab-input",checked:t==="monthly",onChange:()=>n("monthly")}),u.jsxs("div",{className:"tab-buttons",children:[u.jsx("label",{htmlFor:"tab1",className:"tab-label",children:"Today's"}),u.jsx("label",{htmlFor:"tab2",className:"tab-label",children:"Weekly"}),u.jsx("label",{htmlFor:"tab3",className:"tab-label",children:"Monthly"})]}),u.jsxs("div",{className:"tab-contents",children:[u.jsx("div",{id:"content1",className:"tab-content",children:w?u.jsx(hg,{view:w,today:e}):f}),u.jsx("div",{id:"content2",className:"tab-content",children:L?u.jsx(vg,{view:L}):t==="weekly"?f:null}),u.jsx("div",{id:"content3",className:"tab-content",children:p?u.jsx(kg,{view:p}):t==="monthly"?f:null})]})]})]})}Lc(document.getElementById("root")).render(u.jsx(_g,{}));
