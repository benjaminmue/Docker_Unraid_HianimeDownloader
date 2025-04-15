var _s=Object.create;var cr=Object.defineProperty;var ws=Object.getOwnPropertyDescriptor;var xs=Object.getOwnPropertyNames;var As=Object.getPrototypeOf,ks=Object.prototype.hasOwnProperty;var Cs=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Ss=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of xs(e))!ks.call(t,i)&&i!==o&&cr(t,i,{get:()=>e[i],enumerable:!(r=ws(e,i))||r.enumerable});return t};var ur=(t,e,o)=>(o=t!=null?_s(As(t)):{},Ss(e||!t||!t.__esModule?cr(o,"default",{value:t,enumerable:!0}):o,t));var er=Cs((tr,as)=>{(function(t,e){if(typeof define=="function"&&define.amd)define("webextension-polyfill",["module"],e);else if(typeof tr<"u")e(as);else{var o={exports:{}};e(o),t.browser=o.exports}})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:tr,function(t){"use strict";if(!globalThis.chrome?.runtime?.id)throw new Error("This script should only be loaded in a browser extension.");if(typeof globalThis.browser>"u"||Object.getPrototypeOf(globalThis.browser)!==Object.prototype){let e="The message port closed before a response was received.",o=r=>{let i={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(Object.keys(i).length===0)throw new Error("api-metadata.json has not been included in browser-polyfill");class s extends WeakMap{constructor(f,x=void 0){super(x),this.createItem=f}get(f){return this.has(f)||this.set(f,this.createItem(f)),super.get(f)}}let a=g=>g&&typeof g=="object"&&typeof g.then=="function",u=(g,f)=>(...x)=>{r.runtime.lastError?g.reject(new Error(r.runtime.lastError.message)):f.singleCallbackArg||x.length<=1&&f.singleCallbackArg!==!1?g.resolve(x[0]):g.resolve(x)},c=g=>g==1?"argument":"arguments",d=(g,f)=>function(E,...F){if(F.length<f.minArgs)throw new Error(`Expected at least ${f.minArgs} ${c(f.minArgs)} for ${g}(), got ${F.length}`);if(F.length>f.maxArgs)throw new Error(`Expected at most ${f.maxArgs} ${c(f.maxArgs)} for ${g}(), got ${F.length}`);return new Promise((J,ot)=>{if(f.fallbackToNoCallback)try{E[g](...F,u({resolve:J,reject:ot},f))}catch(T){console.warn(`${g} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,T),E[g](...F),f.fallbackToNoCallback=!1,f.noCallback=!0,J()}else f.noCallback?(E[g](...F),J()):E[g](...F,u({resolve:J,reject:ot},f))})},h=(g,f,x)=>new Proxy(f,{apply(E,F,J){return x.call(F,g,...J)}}),p=Function.call.bind(Object.prototype.hasOwnProperty),v=(g,f={},x={})=>{let E=Object.create(null),F={has(ot,T){return T in g||T in E},get(ot,T,U){if(T in E)return E[T];if(!(T in g))return;let q=g[T];if(typeof q=="function")if(typeof f[T]=="function")q=h(g,g[T],f[T]);else if(p(x,T)){let et=d(T,x[T]);q=h(g,g[T],et)}else q=q.bind(g);else if(typeof q=="object"&&q!==null&&(p(f,T)||p(x,T)))q=v(q,f[T],x[T]);else if(p(x,"*"))q=v(q,f[T],x["*"]);else return Object.defineProperty(E,T,{configurable:!0,enumerable:!0,get(){return g[T]},set(et){g[T]=et}}),q;return E[T]=q,q},set(ot,T,U,q){return T in E?E[T]=U:g[T]=U,!0},defineProperty(ot,T,U){return Reflect.defineProperty(E,T,U)},deleteProperty(ot,T){return Reflect.deleteProperty(E,T)}},J=Object.create(g);return new Proxy(J,F)},m=g=>({addListener(f,x,...E){f.addListener(g.get(x),...E)},hasListener(f,x){return f.hasListener(g.get(x))},removeListener(f,x){f.removeListener(g.get(x))}}),b=new s(g=>typeof g!="function"?g:function(x){let E=v(x,{},{getContent:{minArgs:0,maxArgs:0}});g(E)}),$=new s(g=>typeof g!="function"?g:function(x,E,F){let J=!1,ot,T=new Promise(lt=>{ot=function(X){J=!0,lt(X)}}),U;try{U=g(x,E,ot)}catch(lt){U=Promise.reject(lt)}let q=U!==!0&&a(U);if(U!==!0&&!q&&!J)return!1;let et=lt=>{lt.then(X=>{F(X)},X=>{let yt;X&&(X instanceof Error||typeof X.message=="string")?yt=X.message:yt="An unexpected error occurred",F({__mozWebExtensionPolyfillReject__:!0,message:yt})}).catch(X=>{console.error("Failed to send onMessage rejected reply",X)})};return et(q?U:T),!0}),V=({reject:g,resolve:f},x)=>{r.runtime.lastError?r.runtime.lastError.message===e?f():g(new Error(r.runtime.lastError.message)):x&&x.__mozWebExtensionPolyfillReject__?g(new Error(x.message)):f(x)},z=(g,f,x,...E)=>{if(E.length<f.minArgs)throw new Error(`Expected at least ${f.minArgs} ${c(f.minArgs)} for ${g}(), got ${E.length}`);if(E.length>f.maxArgs)throw new Error(`Expected at most ${f.maxArgs} ${c(f.maxArgs)} for ${g}(), got ${E.length}`);return new Promise((F,J)=>{let ot=V.bind(null,{resolve:F,reject:J});E.push(ot),x.sendMessage(...E)})},L={devtools:{network:{onRequestFinished:m(b)}},runtime:{onMessage:m($),onMessageExternal:m($),sendMessage:z.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:z.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},R={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return i.privacy={network:{"*":R},services:{"*":R},websites:{"*":R}},v(r,L,i)};t.exports=o(chrome)}else t.exports=globalThis.browser})});var Qe=globalThis,Ye=Qe.ShadowRoot&&(Qe.ShadyCSS===void 0||Qe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Co=Symbol(),dr=new WeakMap,Ae=class{constructor(e,o,r){if(this._$cssResult$=!0,r!==Co)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(Ye&&e===void 0){let r=o!==void 0&&o.length===1;r&&(e=dr.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&dr.set(o,e))}return e}toString(){return this.cssText}},pr=t=>new Ae(typeof t=="string"?t:t+"",void 0,Co),A=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((r,i,s)=>r+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new Ae(o,t,Co)},So=(t,e)=>{if(Ye)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let r=document.createElement("style"),i=Qe.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=o.cssText,t.appendChild(r)}},Xe=Ye?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let r of e.cssRules)o+=r.cssText;return pr(o)})(t):t;var{is:$s,defineProperty:Es,getOwnPropertyDescriptor:Ts,getOwnPropertyNames:Os,getOwnPropertySymbols:zs,getPrototypeOf:Ms}=Object,Ze=globalThis,hr=Ze.trustedTypes,Ps=hr?hr.emptyScript:"",Ls=Ze.reactiveElementPolyfillSupport,ke=(t,e)=>t,Nt={toAttribute(t,e){switch(e){case Boolean:t=t?Ps:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},to=(t,e)=>!$s(t,e),mr={attribute:!0,type:String,converter:Nt,reflect:!1,hasChanged:to};Symbol.metadata??=Symbol("metadata"),Ze.litPropertyMetadata??=new WeakMap;var Pt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=mr){if(o.state&&(o.attribute=!1),this._$Ei(),this.elementProperties.set(e,o),!o.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(e,r,o);i!==void 0&&Es(this.prototype,e,i)}}static getPropertyDescriptor(e,o,r){let{get:i,set:s}=Ts(this.prototype,e)??{get(){return this[o]},set(a){this[o]=a}};return{get(){return i?.call(this)},set(a){let u=i?.call(this);s.call(this,a),this.requestUpdate(e,u,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??mr}static _$Ei(){if(this.hasOwnProperty(ke("elementProperties")))return;let e=Ms(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ke("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ke("properties"))){let o=this.properties,r=[...Os(o),...zs(o)];for(let i of r)this.createProperty(i,o[i])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[r,i]of o)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let i=this._$Eu(o,r);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let i of r)o.unshift(Xe(i))}else e!==void 0&&o.push(Xe(e));return o}static _$Eu(e,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return So(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,r){this._$AK(e,r)}_$EC(e,o){let r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){let s=(r.converter?.toAttribute!==void 0?r.converter:Nt).toAttribute(o,r.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,o){let r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let s=r.getPropertyOptions(i),a=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Nt;this._$Em=i,this[i]=a.fromAttribute(o,s.type),this._$Em=null}}requestUpdate(e,o,r){if(e!==void 0){if(r??=this.constructor.getPropertyOptions(e),!(r.hasChanged??to)(this[e],o))return;this.P(e,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,o,r){this._$AL.has(e)||this._$AL.set(e,o),r.reflect===!0&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,s]of r)s.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.P(i,this[i],s)}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(o)):this._$EU()}catch(r){throw e=!1,this._$EU(),r}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach(o=>this._$EC(o,this[o])),this._$EU()}updated(e){}firstUpdated(e){}};Pt.elementStyles=[],Pt.shadowRootOptions={mode:"open"},Pt[ke("elementProperties")]=new Map,Pt[ke("finalized")]=new Map,Ls?.({ReactiveElement:Pt}),(Ze.reactiveElementVersions??=[]).push("2.0.4");var Eo=globalThis,eo=Eo.trustedTypes,fr=eo?eo.createPolicy("lit-html",{createHTML:t=>t}):void 0,To="$lit$",Lt=`lit$${(Math.random()+"").slice(9)}$`,Oo="?"+Lt,Rs=`<${Oo}>`,Jt=document,Se=()=>Jt.createComment(""),$e=t=>t===null||typeof t!="object"&&typeof t!="function",wr=Array.isArray,xr=t=>wr(t)||typeof t?.[Symbol.iterator]=="function",$o=`[ 	
\f\r]`,Ce=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gr=/-->/g,br=/>/g,Wt=RegExp(`>|${$o}(?:([^\\s"'>=/]+)(${$o}*=${$o}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yr=/'/g,vr=/"/g,Ar=/^(?:script|style|textarea|title)$/i,kr=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),y=kr(1),Cr=kr(2),ct=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),_r=new WeakMap,Kt=Jt.createTreeWalker(Jt,129);function Sr(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return fr!==void 0?fr.createHTML(e):e}var $r=(t,e)=>{let o=t.length-1,r=[],i,s=e===2?"<svg>":"",a=Ce;for(let u=0;u<o;u++){let c=t[u],d,h,p=-1,v=0;for(;v<c.length&&(a.lastIndex=v,h=a.exec(c),h!==null);)v=a.lastIndex,a===Ce?h[1]==="!--"?a=gr:h[1]!==void 0?a=br:h[2]!==void 0?(Ar.test(h[2])&&(i=RegExp("</"+h[2],"g")),a=Wt):h[3]!==void 0&&(a=Wt):a===Wt?h[0]===">"?(a=i??Ce,p=-1):h[1]===void 0?p=-2:(p=a.lastIndex-h[2].length,d=h[1],a=h[3]===void 0?Wt:h[3]==='"'?vr:yr):a===vr||a===yr?a=Wt:a===gr||a===br?a=Ce:(a=Wt,i=void 0);let m=a===Wt&&t[u+1].startsWith("/>")?" ":"";s+=a===Ce?c+Rs:p>=0?(r.push(d),c.slice(0,p)+To+c.slice(p)+Lt+m):c+Lt+(p===-2?u:m)}return[Sr(t,s+(t[o]||"<?>")+(e===2?"</svg>":"")),r]},Ee=class t{constructor({strings:e,_$litType$:o},r){let i;this.parts=[];let s=0,a=0,u=e.length-1,c=this.parts,[d,h]=$r(e,o);if(this.el=t.createElement(d,r),Kt.currentNode=this.el.content,o===2){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=Kt.nextNode())!==null&&c.length<u;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(To)){let v=h[a++],m=i.getAttribute(p).split(Lt),b=/([.?@])?(.*)/.exec(v);c.push({type:1,index:s,name:b[2],strings:m,ctor:b[1]==="."?ro:b[1]==="?"?io:b[1]==="@"?so:Qt}),i.removeAttribute(p)}else p.startsWith(Lt)&&(c.push({type:6,index:s}),i.removeAttribute(p));if(Ar.test(i.tagName)){let p=i.textContent.split(Lt),v=p.length-1;if(v>0){i.textContent=eo?eo.emptyScript:"";for(let m=0;m<v;m++)i.append(p[m],Se()),Kt.nextNode(),c.push({type:2,index:++s});i.append(p[v],Se())}}}else if(i.nodeType===8)if(i.data===Oo)c.push({type:2,index:s});else{let p=-1;for(;(p=i.data.indexOf(Lt,p+1))!==-1;)c.push({type:7,index:s}),p+=Lt.length-1}s++}}static createElement(e,o){let r=Jt.createElement("template");return r.innerHTML=e,r}};function Gt(t,e,o=t,r){if(e===ct)return e;let i=r!==void 0?o._$Co?.[r]:o._$Cl,s=$e(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(t),i._$AT(t,o,r)),r!==void 0?(o._$Co??=[])[r]=i:o._$Cl=i),i!==void 0&&(e=Gt(t,i._$AS(t,e.values),i,r)),e}var oo=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:r}=this._$AD,i=(e?.creationScope??Jt).importNode(o,!0);Kt.currentNode=i;let s=Kt.nextNode(),a=0,u=0,c=r[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new ce(s,s.nextSibling,this,e):c.type===1?d=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(d=new no(s,this,e)),this._$AV.push(d),c=r[++u]}a!==c?.index&&(s=Kt.nextNode(),a++)}return Kt.currentNode=Jt,i}p(e){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,o),o+=r.strings.length-2):r._$AI(e[o])),o++}},ce=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,r,i){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=Gt(this,e,o),$e(e)?e===j||e==null||e===""?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==ct&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):xr(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==j&&$e(this._$AH)?this._$AA.nextSibling.data=e:this.T(Jt.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Ee.createElement(Sr(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(o);else{let s=new oo(i,this),a=s.u(this.options);s.p(o),this.T(a),this._$AH=s}}_$AC(e){let o=_r.get(e.strings);return o===void 0&&_r.set(e.strings,o=new Ee(e)),o}k(e){wr(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,i=0;for(let s of e)i===o.length?o.push(r=new t(this.S(Se()),this.S(Se()),this,this.options)):r=o[i],r._$AI(s),i++;i<o.length&&(this._$AR(r&&r._$AB.nextSibling,i),o.length=i)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e&&e!==this._$AB;){let r=e.nextSibling;e.remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Qt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,r,i,s){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=o,this._$AM=i,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=j}_$AI(e,o=this,r,i){let s=this.strings,a=!1;if(s===void 0)e=Gt(this,e,o,0),a=!$e(e)||e!==this._$AH&&e!==ct,a&&(this._$AH=e);else{let u=e,c,d;for(e=s[0],c=0;c<s.length-1;c++)d=Gt(this,u[r+c],o,c),d===ct&&(d=this._$AH[c]),a||=!$e(d)||d!==this._$AH[c],d===j?e=j:e!==j&&(e+=(d??"")+s[c+1]),this._$AH[c]=d}a&&!i&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ro=class extends Qt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}},io=class extends Qt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}},so=class extends Qt{constructor(e,o,r,i,s){super(e,o,r,i,s),this.type=5}_$AI(e,o=this){if((e=Gt(this,e,o,0)??j)===ct)return;let r=this._$AH,i=e===j&&r!==j||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==j&&(r===j||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},no=class{constructor(e,o,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Gt(this,e)}},Er={P:To,A:Lt,C:Oo,M:1,L:$r,R:oo,D:xr,V:Gt,I:ce,H:Qt,N:io,U:so,B:ro,F:no},Ds=Eo.litHtmlPolyfillSupport;Ds?.(Ee,ce),(Eo.litHtmlVersions??=[]).push("3.1.2");var Tr=(t,e,o)=>{let r=o?.renderBefore??e,i=r._$litPart$;if(i===void 0){let s=o?.renderBefore??null;r._$litPart$=i=new ce(e.insertBefore(Se(),s),s,void 0,o??{})}return i._$AI(t),i};var Ft=class extends Pt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Tr(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ct}};Ft._$litElement$=!0,Ft.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:Ft});var Vs=globalThis.litElementPolyfillSupport;Vs?.({LitElement:Ft});(globalThis.litElementVersions??=[]).push("4.0.4");var C=A`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;var Or=A`
  ${C}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;var zo=new Set,Is=new MutationObserver(Pr),ue=new Map,zr=document.documentElement.dir||"ltr",Mr=document.documentElement.lang||navigator.language,Yt;Is.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});function Te(...t){t.map(e=>{let o=e.$code.toLowerCase();ue.has(o)?ue.set(o,Object.assign(Object.assign({},ue.get(o)),e)):ue.set(o,e),Yt||(Yt=e)}),Pr()}function Pr(){zr=document.documentElement.dir||"ltr",Mr=document.documentElement.lang||navigator.language,[...zo.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var ao=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){zo.add(this.host)}hostDisconnected(){zo.delete(this.host)}dir(){return`${this.host.dir||zr}`.toLowerCase()}lang(){return`${this.host.lang||Mr}`.toLowerCase()}getTranslationData(e){var o,r;let i=new Intl.Locale(e.replace(/_/g,"-")),s=i?.language.toLowerCase(),a=(r=(o=i?.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",u=ue.get(`${s}-${a}`),c=ue.get(s);return{locale:i,language:s,region:a,primary:u,secondary:c}}exists(e,o){var r;let{primary:i,secondary:s}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(i&&i[e]||s&&s[e]||o.includeFallback&&Yt&&Yt[e])}term(e,...o){let{primary:r,secondary:i}=this.getTranslationData(this.lang()),s;if(r&&r[e])s=r[e];else if(i&&i[e])s=i[e];else if(Yt&&Yt[e])s=Yt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof s=="function"?s(...o):s}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,o)}};var Lr={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Te(Lr);var Rr=Lr;var H=class extends ao{};Te(Rr);var Ir=Object.defineProperty,Bs=Object.defineProperties,Ns=Object.getOwnPropertyDescriptor,Fs=Object.getOwnPropertyDescriptors,Dr=Object.getOwnPropertySymbols,Hs=Object.prototype.hasOwnProperty,Us=Object.prototype.propertyIsEnumerable,Mo=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Vr=(t,e,o)=>e in t?Ir(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,pt=(t,e)=>{for(var o in e||(e={}))Hs.call(e,o)&&Vr(t,o,e[o]);if(Dr)for(var o of Dr(e))Us.call(e,o)&&Vr(t,o,e[o]);return t},Rt=(t,e)=>Bs(t,Fs(e)),n=(t,e,o,r)=>{for(var i=r>1?void 0:r?Ns(e,o):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(i=(r?a(e,o,i):a(i))||i);return r&&i&&Ir(e,o,i),i},js=function(t,e){this[0]=t,this[1]=e},Br=t=>{var e=t[Mo("asyncIterator")],o=!1,r,i={};return e==null?(e=t[Mo("iterator")](),r=s=>i[s]=a=>e[s](a)):(e=e.call(t),r=s=>i[s]=a=>{if(o){if(o=!1,s==="throw")throw a;return a}return o=!0,{done:!1,value:new js(new Promise(u=>{var c=e[s](a);if(!(c instanceof Object))throw TypeError("Object expected");u(c)}),1)}}),i[Mo("iterator")]=()=>i,r("next"),"throw"in e?r("throw"):i.throw=s=>{throw s},"return"in e&&r("return"),i};var qs={attribute:!0,type:String,converter:Nt,reflect:!1,hasChanged:to},Ws=(t=qs,e,o)=>{let{kind:r,metadata:i}=o,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(o.name,t),r==="accessor"){let{name:a}=o;return{set(u){let c=e.get.call(this);e.set.call(this,u),this.requestUpdate(a,c,t)},init(u){return u!==void 0&&this.P(a,void 0,t),u}}}if(r==="setter"){let{name:a}=o;return function(u){let c=this[a];e.call(this,u),this.requestUpdate(a,c,t)}}throw Error("Unsupported decorator location: "+r)};function l(t){return(e,o)=>typeof o=="object"?Ws(t,e,o):((r,i,s)=>{let a=i.hasOwnProperty(s);return i.constructor.createProperty(s,a?{...r,wrapped:!0}:r),a?Object.getOwnPropertyDescriptor(i,s):void 0})(t,e,o)}function Z(t){return l({...t,state:!0,attribute:!1})}var Xt=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function k(t,e){return(o,r,i)=>{let s=a=>a.renderRoot?.querySelector(t)??null;if(e){let{get:a,set:u}=typeof r=="object"?o:i??(()=>{let c=Symbol();return{get(){return this[c]},set(d){this[c]=d}}})();return Xt(o,r,{get(){let c=a.call(this);return c===void 0&&(c=s(this),(c!==null||this.hasUpdated)&&u.call(this,c)),c}})}return Xt(o,r,{get(){return s(this)}})}}var w=class extends Ft{constructor(){super(),Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){let o=new CustomEvent(t,pt({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){let r=customElements.get(t);if(!r){customElements.define(t,class extends e{},o);return}let i=" (unknown version)",s=i;"version"in e&&e.version&&(i=" v"+e.version),"version"in r&&r.version&&(s=" v"+r.version),!(i&&s&&i===s)&&console.warn(`Attempted to register <${t}>${i}, but <${t}>${s} has already been registered.`)}};w.version="2.13.1";w.dependencies={};n([l()],w.prototype,"dir",2);n([l()],w.prototype,"lang",2);var Zt=class extends w{constructor(){super(...arguments),this.localize=new H(this)}render(){return y`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Zt.styles=Or;var Oe=new WeakMap,ze=new WeakMap,Me=new WeakMap,Po=new WeakSet,lo=new WeakMap,Tt=class{constructor(t,e){this.handleFormData=o=>{let r=this.options.disabled(this.host),i=this.options.name(this.host),s=this.options.value(this.host),a=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!r&&!a&&typeof i=="string"&&i.length>0&&typeof s<"u"&&(Array.isArray(s)?s.forEach(u=>{o.formData.append(i,u.toString())}):o.formData.append(i,s.toString()))},this.handleFormSubmit=o=>{var r;let i=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&((r=Oe.get(this.form))==null||r.forEach(a=>{this.setUserInteracted(a,!0)})),this.form&&!this.form.noValidate&&!i&&!s(this.host)&&(o.preventDefault(),o.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),lo.set(this.host,[])},this.handleInteraction=o=>{let r=lo.get(this.host);r.includes(o.type)||r.push(o.type),r.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){let o=this.form.querySelectorAll("*");for(let r of o)if(typeof r.checkValidity=="function"&&!r.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){let o=this.form.querySelectorAll("*");for(let r of o)if(typeof r.reportValidity=="function"&&!r.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=pt({form:o=>{let r=o.form;if(r){let s=o.getRootNode().getElementById(r);if(s)return s}return o.closest("form")},name:o=>o.name,value:o=>o.value,defaultValue:o=>o.defaultValue,disabled:o=>{var r;return(r=o.disabled)!=null?r:!1},reportValidity:o=>typeof o.reportValidity=="function"?o.reportValidity():!0,checkValidity:o=>typeof o.checkValidity=="function"?o.checkValidity():!0,setValue:(o,r)=>o.value=r,assumeInteractionOn:["sl-input"]},e)}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),lo.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),lo.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,Oe.has(this.form)?Oe.get(this.form).add(this.host):Oe.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),ze.has(this.form)||(ze.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Me.has(this.form)||(Me.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;let t=Oe.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),ze.has(this.form)&&(this.form.reportValidity=ze.get(this.form),ze.delete(this.form)),Me.has(this.form)&&(this.form.checkValidity=Me.get(this.form),Me.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?Po.add(t):Po.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){let o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(r=>{e.hasAttribute(r)&&o.setAttribute(r,e.getAttribute(r))})),this.form.append(o),o.click(),o.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){let e=this.host,o=!!Po.has(e),r=!!e.required;e.toggleAttribute("data-required",r),e.toggleAttribute("data-optional",!r),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&o),e.toggleAttribute("data-user-valid",t&&o)}updateValidity(){let t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){let e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t?.preventDefault()}},de=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),Nr=Object.freeze(Rt(pt({},de),{valid:!1,valueMissing:!0})),Fr=Object.freeze(Rt(pt({},de),{valid:!1,customError:!0}));var co=A`
  ${C}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`;var rt=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{let r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};function Hr(t){if(!t)return"";let e=t.assignedNodes({flatten:!0}),o="";return[...e].forEach(r=>{r.nodeType===Node.TEXT_NODE&&(o+=r.textContent)}),o}var Lo="";function Pe(t){Lo=t}function Ro(t=""){if(!Lo){let e=[...document.getElementsByTagName("script")],o=e.find(r=>r.hasAttribute("data-shoelace"));if(o)Pe(o.getAttribute("data-shoelace"));else{let r=e.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src)),i="";r&&(i=r.getAttribute("src")),Pe(i.split("/").slice(0,-1).join("/"))}}return Lo.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var Ks={name:"default",resolver:t=>Ro(`assets/icons/${t}.svg`)},Ur=Ks;var jr={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},Js={name:"system",resolver:t=>t in jr?`data:image/svg+xml,${encodeURIComponent(jr[t])}`:""},qr=Js;var Gs=[Ur,qr],Do=[];function Wr(t){Do.push(t)}function Kr(t){Do=Do.filter(e=>e!==t)}function Vo(t){return Gs.find(e=>e.name===t)}var Jr=A`
  ${C}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function S(t,e){let o=pt({waitUntilFirstUpdate:!1},e);return(r,i)=>{let{update:s}=r,a=Array.isArray(t)?t:[t];r.update=function(u){a.forEach(c=>{let d=c;if(u.has(d)){let h=u.get(d),p=this[d];h!==p&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[i](h,p)}}),s.call(this,u)}}}var{I:Sl}=Er;var Gr=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e;var uo=t=>t.strings===void 0;var Qs={},Qr=(t,e=Qs)=>t._$AH=e;var Le=Symbol(),po=Symbol(),Io,Bo=new Map,G=class extends w{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let r;if(e?.spriteSheet)return y`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`;try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?Le:po}catch{return po}try{let i=document.createElement("div");i.innerHTML=await r.text();let s=i.firstElementChild;if(((o=s?.tagName)==null?void 0:o.toLowerCase())!=="svg")return Le;Io||(Io=new DOMParser);let u=Io.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return u?(u.part.add("svg"),document.adoptNode(u)):Le}catch{return Le}}connectedCallback(){super.connectedCallback(),Wr(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Kr(this)}getIconSource(){let t=Vo(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;let{url:e,fromLibrary:o}=this.getIconSource(),r=o?Vo(this.library):void 0;if(!e){this.svg=null;return}let i=Bo.get(e);if(i||(i=this.resolveIcon(e,r),Bo.set(e,i)),!this.initialRender)return;let s=await i;if(s===po&&Bo.delete(e),e===this.getIconSource().url){if(Gr(s)){this.svg=s;return}switch(s){case po:case Le:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(!0),(t=r?.mutator)==null||t.call(r,this.svg),this.emit("sl-load")}}}render(){return this.svg}};G.styles=Jr;n([Z()],G.prototype,"svg",2);n([l({reflect:!0})],G.prototype,"name",2);n([l()],G.prototype,"src",2);n([l()],G.prototype,"label",2);n([l({reflect:!0})],G.prototype,"library",2);n([S("label")],G.prototype,"handleLabelChange",1);n([S(["name","src","library"])],G.prototype,"setIcon",1);var ht={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Dt=t=>(...e)=>({_$litDirective$:t,values:e}),kt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var M=Dt(class extends kt{constructor(t){if(super(t),t.type!==ht.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}let o=t.element.classList;for(let r of this.st)r in e||(o.remove(r),this.st.delete(r));for(let r in e){let i=!!e[r];i===this.st.has(r)||this.nt?.has(r)||(i?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return ct}});var Xr=Symbol.for(""),Ys=t=>{if(t?.r===Xr)return t?._$litStatic$};var pe=(t,...e)=>({_$litStatic$:e.reduce((o,r,i)=>o+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[i+1],t[0]),r:Xr}),Yr=new Map,Zr=t=>(e,...o)=>{let r=o.length,i,s,a=[],u=[],c,d=0,h=!1;for(;d<r;){for(c=e[d];d<r&&(s=o[d],(i=Ys(s))!==void 0);)c+=i+e[++d],h=!0;d!==r&&u.push(s),a.push(c),d++}if(d===r&&a.push(e[r]),h){let p=a.join("$$lit$$");(e=Yr.get(p))===void 0&&(a.raw=a,Yr.set(p,e=a)),o=u}return t(e,...o)},Ht=Zr(y),Jl=Zr(Cr);var _=t=>t??j;var B=class extends w{constructor(){super(...arguments),this.formControlController=new Tt(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new rt(this,"[default]","prefix","suffix"),this.localize=new H(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:de}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){let t=this.isLink(),e=t?pe`a`:pe`button`;return Ht`
      <${e}
        part="base"
        class=${M({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${_(t?void 0:this.disabled)}
        type=${_(t?void 0:this.type)}
        title=${this.title}
        name=${_(t?void 0:this.name)}
        value=${_(t?void 0:this.value)}
        href=${_(t?this.href:void 0)}
        target=${_(t?this.target:void 0)}
        download=${_(t?this.download:void 0)}
        rel=${_(t?this.rel:void 0)}
        role=${_(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?Ht` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?Ht`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};B.styles=co;B.dependencies={"sl-icon":G,"sl-spinner":Zt};n([k(".button")],B.prototype,"button",2);n([Z()],B.prototype,"hasFocus",2);n([Z()],B.prototype,"invalid",2);n([l()],B.prototype,"title",2);n([l({reflect:!0})],B.prototype,"variant",2);n([l({reflect:!0})],B.prototype,"size",2);n([l({type:Boolean,reflect:!0})],B.prototype,"caret",2);n([l({type:Boolean,reflect:!0})],B.prototype,"disabled",2);n([l({type:Boolean,reflect:!0})],B.prototype,"loading",2);n([l({type:Boolean,reflect:!0})],B.prototype,"outline",2);n([l({type:Boolean,reflect:!0})],B.prototype,"pill",2);n([l({type:Boolean,reflect:!0})],B.prototype,"circle",2);n([l()],B.prototype,"type",2);n([l()],B.prototype,"name",2);n([l()],B.prototype,"value",2);n([l()],B.prototype,"href",2);n([l()],B.prototype,"target",2);n([l()],B.prototype,"rel",2);n([l()],B.prototype,"download",2);n([l()],B.prototype,"form",2);n([l({attribute:"formaction"})],B.prototype,"formAction",2);n([l({attribute:"formenctype"})],B.prototype,"formEnctype",2);n([l({attribute:"formmethod"})],B.prototype,"formMethod",2);n([l({attribute:"formnovalidate",type:Boolean})],B.prototype,"formNoValidate",2);n([l({attribute:"formtarget"})],B.prototype,"formTarget",2);n([S("disabled",{waitUntilFirstUpdate:!0})],B.prototype,"handleDisabledChange",1);B.define("sl-button");var ti=A`
  ${C}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;var Ut=class extends w{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){let e=Re(t.target);e?.classList.add("sl-button-group__button--focus")}handleBlur(t){let e=Re(t.target);e?.classList.remove("sl-button-group__button--focus")}handleMouseOver(t){let e=Re(t.target);e?.classList.add("sl-button-group__button--hover")}handleMouseOut(t){let e=Re(t.target);e?.classList.remove("sl-button-group__button--hover")}handleSlotChange(){let t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach(e=>{let o=t.indexOf(e),r=Re(e);r&&(r.classList.add("sl-button-group__button"),r.classList.toggle("sl-button-group__button--first",o===0),r.classList.toggle("sl-button-group__button--inner",o>0&&o<t.length-1),r.classList.toggle("sl-button-group__button--last",o===t.length-1),r.classList.toggle("sl-button-group__button--radio",r.tagName.toLowerCase()==="sl-radio-button"))})}render(){return y`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Ut.styles=ti;n([k("slot")],Ut.prototype,"defaultSlot",2);n([Z()],Ut.prototype,"disableRole",2);n([l()],Ut.prototype,"label",2);function Re(t){var e;let o="sl-button, sl-radio-button";return(e=t.closest(o))!=null?e:t.querySelector(o)}Ut.define("sl-button-group");G.define("sl-icon");var ei=A`
  ${C}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;var Q=class extends w{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){let t=!!this.href,e=t?pe`a`:pe`button`;return Ht`
      <${e}
        part="base"
        class=${M({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${_(t?void 0:this.disabled)}
        type=${_(t?void 0:"button")}
        href=${_(t?this.href:void 0)}
        target=${_(t?this.target:void 0)}
        download=${_(t?this.download:void 0)}
        rel=${_(t&&this.target?"noreferrer noopener":void 0)}
        role=${_(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${_(this.name)}
          library=${_(this.library)}
          src=${_(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};Q.styles=ei;Q.dependencies={"sl-icon":G};n([k(".icon-button")],Q.prototype,"button",2);n([Z()],Q.prototype,"hasFocus",2);n([l()],Q.prototype,"name",2);n([l()],Q.prototype,"library",2);n([l()],Q.prototype,"src",2);n([l()],Q.prototype,"href",2);n([l()],Q.prototype,"target",2);n([l()],Q.prototype,"download",2);n([l()],Q.prototype,"label",2);n([l({type:Boolean,reflect:!0})],Q.prototype,"disabled",2);Q.define("sl-icon-button");var oi=A`
  ${C}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`;var ri=A`
  ${C}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;var Ot=Math.min,dt=Math.max,Ve=Math.round,Ie=Math.floor,Vt=t=>({x:t,y:t}),Xs={left:"right",right:"left",bottom:"top",top:"bottom"},Zs={start:"end",end:"start"};function mo(t,e,o){return dt(t,Ot(e,o))}function te(t,e){return typeof t=="function"?t(e):t}function It(t){return t.split("-")[0]}function ee(t){return t.split("-")[1]}function No(t){return t==="x"?"y":"x"}function fo(t){return t==="y"?"height":"width"}function he(t){return["top","bottom"].includes(It(t))?"y":"x"}function go(t){return No(he(t))}function ii(t,e,o){o===void 0&&(o=!1);let r=ee(t),i=go(t),s=fo(i),a=i==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(a=De(a)),[a,De(a)]}function si(t){let e=De(t);return[ho(t),e,ho(e)]}function ho(t){return t.replace(/start|end/g,e=>Zs[e])}function tn(t,e,o){let r=["left","right"],i=["right","left"],s=["top","bottom"],a=["bottom","top"];switch(t){case"top":case"bottom":return o?e?i:r:e?r:i;case"left":case"right":return e?s:a;default:return[]}}function ni(t,e,o,r){let i=ee(t),s=tn(It(t),o==="start",r);return i&&(s=s.map(a=>a+"-"+i),e&&(s=s.concat(s.map(ho)))),s}function De(t){return t.replace(/left|right|bottom|top/g,e=>Xs[e])}function en(t){return{top:0,right:0,bottom:0,left:0,...t}}function Fo(t){return typeof t!="number"?en(t):{top:t,right:t,bottom:t,left:t}}function oe(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function ai(t,e,o){let{reference:r,floating:i}=t,s=he(e),a=go(e),u=fo(a),c=It(e),d=s==="y",h=r.x+r.width/2-i.width/2,p=r.y+r.height/2-i.height/2,v=r[u]/2-i[u]/2,m;switch(c){case"top":m={x:h,y:r.y-i.height};break;case"bottom":m={x:h,y:r.y+r.height};break;case"right":m={x:r.x+r.width,y:p};break;case"left":m={x:r.x-i.width,y:p};break;default:m={x:r.x,y:r.y}}switch(ee(e)){case"start":m[a]-=v*(o&&d?-1:1);break;case"end":m[a]+=v*(o&&d?-1:1);break}return m}var li=async(t,e,o)=>{let{placement:r="bottom",strategy:i="absolute",middleware:s=[],platform:a}=o,u=s.filter(Boolean),c=await(a.isRTL==null?void 0:a.isRTL(e)),d=await a.getElementRects({reference:t,floating:e,strategy:i}),{x:h,y:p}=ai(d,r,c),v=r,m={},b=0;for(let $=0;$<u.length;$++){let{name:V,fn:z}=u[$],{x:L,y:R,data:g,reset:f}=await z({x:h,y:p,initialPlacement:r,placement:v,strategy:i,middlewareData:m,rects:d,platform:a,elements:{reference:t,floating:e}});h=L??h,p=R??p,m={...m,[V]:{...m[V],...g}},f&&b<=50&&(b++,typeof f=="object"&&(f.placement&&(v=f.placement),f.rects&&(d=f.rects===!0?await a.getElementRects({reference:t,floating:e,strategy:i}):f.rects),{x:h,y:p}=ai(d,v,c)),$=-1)}return{x:h,y:p,placement:v,strategy:i,middlewareData:m}};async function bo(t,e){var o;e===void 0&&(e={});let{x:r,y:i,platform:s,rects:a,elements:u,strategy:c}=t,{boundary:d="clippingAncestors",rootBoundary:h="viewport",elementContext:p="floating",altBoundary:v=!1,padding:m=0}=te(e,t),b=Fo(m),V=u[v?p==="floating"?"reference":"floating":p],z=oe(await s.getClippingRect({element:(o=await(s.isElement==null?void 0:s.isElement(V)))==null||o?V:V.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(u.floating)),boundary:d,rootBoundary:h,strategy:c})),L=p==="floating"?{...a.floating,x:r,y:i}:a.reference,R=await(s.getOffsetParent==null?void 0:s.getOffsetParent(u.floating)),g=await(s.isElement==null?void 0:s.isElement(R))?await(s.getScale==null?void 0:s.getScale(R))||{x:1,y:1}:{x:1,y:1},f=oe(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:u,rect:L,offsetParent:R,strategy:c}):L);return{top:(z.top-f.top+b.top)/g.y,bottom:(f.bottom-z.bottom+b.bottom)/g.y,left:(z.left-f.left+b.left)/g.x,right:(f.right-z.right+b.right)/g.x}}var ci=t=>({name:"arrow",options:t,async fn(e){let{x:o,y:r,placement:i,rects:s,platform:a,elements:u,middlewareData:c}=e,{element:d,padding:h=0}=te(t,e)||{};if(d==null)return{};let p=Fo(h),v={x:o,y:r},m=go(i),b=fo(m),$=await a.getDimensions(d),V=m==="y",z=V?"top":"left",L=V?"bottom":"right",R=V?"clientHeight":"clientWidth",g=s.reference[b]+s.reference[m]-v[m]-s.floating[b],f=v[m]-s.reference[m],x=await(a.getOffsetParent==null?void 0:a.getOffsetParent(d)),E=x?x[R]:0;(!E||!await(a.isElement==null?void 0:a.isElement(x)))&&(E=u.floating[R]||s.floating[b]);let F=g/2-f/2,J=E/2-$[b]/2-1,ot=Ot(p[z],J),T=Ot(p[L],J),U=ot,q=E-$[b]-T,et=E/2-$[b]/2+F,lt=mo(U,et,q),X=!c.arrow&&ee(i)!=null&&et!==lt&&s.reference[b]/2-(et<U?ot:T)-$[b]/2<0,yt=X?et<U?et-U:et-q:0;return{[m]:v[m]+yt,data:{[m]:lt,centerOffset:et-lt-yt,...X&&{alignmentOffset:yt}},reset:X}}});var ui=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,r;let{placement:i,middlewareData:s,rects:a,initialPlacement:u,platform:c,elements:d}=e,{mainAxis:h=!0,crossAxis:p=!0,fallbackPlacements:v,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:$=!0,...V}=te(t,e);if((o=s.arrow)!=null&&o.alignmentOffset)return{};let z=It(i),L=It(u)===u,R=await(c.isRTL==null?void 0:c.isRTL(d.floating)),g=v||(L||!$?[De(u)]:si(u));!v&&b!=="none"&&g.push(...ni(u,$,b,R));let f=[u,...g],x=await bo(e,V),E=[],F=((r=s.flip)==null?void 0:r.overflows)||[];if(h&&E.push(x[z]),p){let U=ii(i,a,R);E.push(x[U[0]],x[U[1]])}if(F=[...F,{placement:i,overflows:E}],!E.every(U=>U<=0)){var J,ot;let U=(((J=s.flip)==null?void 0:J.index)||0)+1,q=f[U];if(q)return{data:{index:U,overflows:F},reset:{placement:q}};let et=(ot=F.filter(lt=>lt.overflows[0]<=0).sort((lt,X)=>lt.overflows[1]-X.overflows[1])[0])==null?void 0:ot.placement;if(!et)switch(m){case"bestFit":{var T;let lt=(T=F.map(X=>[X.placement,X.overflows.filter(yt=>yt>0).reduce((yt,vs)=>yt+vs,0)]).sort((X,yt)=>X[1]-yt[1])[0])==null?void 0:T[0];lt&&(et=lt);break}case"initialPlacement":et=u;break}if(i!==et)return{reset:{placement:et}}}return{}}}};async function on(t,e){let{placement:o,platform:r,elements:i}=t,s=await(r.isRTL==null?void 0:r.isRTL(i.floating)),a=It(o),u=ee(o),c=he(o)==="y",d=["left","top"].includes(a)?-1:1,h=s&&c?-1:1,p=te(e,t),{mainAxis:v,crossAxis:m,alignmentAxis:b}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...p};return u&&typeof b=="number"&&(m=u==="end"?b*-1:b),c?{x:m*h,y:v*d}:{x:v*d,y:m*h}}var Ho=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,r;let{x:i,y:s,placement:a,middlewareData:u}=e,c=await on(e,t);return a===((o=u.offset)==null?void 0:o.placement)&&(r=u.arrow)!=null&&r.alignmentOffset?{}:{x:i+c.x,y:s+c.y,data:{...c,placement:a}}}}},di=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:o,y:r,placement:i}=e,{mainAxis:s=!0,crossAxis:a=!1,limiter:u={fn:V=>{let{x:z,y:L}=V;return{x:z,y:L}}},...c}=te(t,e),d={x:o,y:r},h=await bo(e,c),p=he(It(i)),v=No(p),m=d[v],b=d[p];if(s){let V=v==="y"?"top":"left",z=v==="y"?"bottom":"right",L=m+h[V],R=m-h[z];m=mo(L,m,R)}if(a){let V=p==="y"?"top":"left",z=p==="y"?"bottom":"right",L=b+h[V],R=b-h[z];b=mo(L,b,R)}let $=u.fn({...e,[v]:m,[p]:b});return{...$,data:{x:$.x-o,y:$.y-r}}}}};var pi=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){let{placement:o,rects:r,platform:i,elements:s}=e,{apply:a=()=>{},...u}=te(t,e),c=await bo(e,u),d=It(o),h=ee(o),p=he(o)==="y",{width:v,height:m}=r.floating,b,$;d==="top"||d==="bottom"?(b=d,$=h===(await(i.isRTL==null?void 0:i.isRTL(s.floating))?"start":"end")?"left":"right"):($=d,b=h==="end"?"top":"bottom");let V=m-c[b],z=v-c[$],L=!e.middlewareData.shift,R=V,g=z;if(p){let x=v-c.left-c.right;g=h||L?Ot(z,x):x}else{let x=m-c.top-c.bottom;R=h||L?Ot(V,x):x}if(L&&!h){let x=dt(c.left,0),E=dt(c.right,0),F=dt(c.top,0),J=dt(c.bottom,0);p?g=v-2*(x!==0||E!==0?x+E:dt(c.left,c.right)):R=m-2*(F!==0||J!==0?F+J:dt(c.top,c.bottom))}await a({...e,availableWidth:g,availableHeight:R});let f=await i.getDimensions(s.floating);return v!==f.width||m!==f.height?{reset:{rects:!0}}:{}}}};function Bt(t){return mi(t)?(t.nodeName||"").toLowerCase():"#document"}function mt(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function zt(t){var e;return(e=(mi(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function mi(t){return t instanceof Node||t instanceof mt(t).Node}function Mt(t){return t instanceof Element||t instanceof mt(t).Element}function Ct(t){return t instanceof HTMLElement||t instanceof mt(t).HTMLElement}function hi(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof mt(t).ShadowRoot}function fe(t){let{overflow:e,overflowX:o,overflowY:r,display:i}=vt(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&!["inline","contents"].includes(i)}function fi(t){return["table","td","th"].includes(Bt(t))}function yo(t){let e=vo(),o=vt(t);return o.transform!=="none"||o.perspective!=="none"||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||["transform","perspective","filter"].some(r=>(o.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(o.contain||"").includes(r))}function Uo(t){let e=re(t);for(;Ct(e)&&!Be(e);){if(yo(e))return e;e=re(e)}return null}function vo(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Be(t){return["html","body","#document"].includes(Bt(t))}function vt(t){return mt(t).getComputedStyle(t)}function Ne(t){return Mt(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function re(t){if(Bt(t)==="html")return t;let e=t.assignedSlot||t.parentNode||hi(t)&&t.host||zt(t);return hi(e)?e.host:e}function gi(t){let e=re(t);return Be(e)?t.ownerDocument?t.ownerDocument.body:t.body:Ct(e)&&fe(e)?e:gi(e)}function me(t,e,o){var r;e===void 0&&(e=[]),o===void 0&&(o=!0);let i=gi(t),s=i===((r=t.ownerDocument)==null?void 0:r.body),a=mt(i);return s?e.concat(a,a.visualViewport||[],fe(i)?i:[],a.frameElement&&o?me(a.frameElement):[]):e.concat(i,me(i,[],o))}function vi(t){let e=vt(t),o=parseFloat(e.width)||0,r=parseFloat(e.height)||0,i=Ct(t),s=i?t.offsetWidth:o,a=i?t.offsetHeight:r,u=Ve(o)!==s||Ve(r)!==a;return u&&(o=s,r=a),{width:o,height:r,$:u}}function jo(t){return Mt(t)?t:t.contextElement}function ge(t){let e=jo(t);if(!Ct(e))return Vt(1);let o=e.getBoundingClientRect(),{width:r,height:i,$:s}=vi(e),a=(s?Ve(o.width):o.width)/r,u=(s?Ve(o.height):o.height)/i;return(!a||!Number.isFinite(a))&&(a=1),(!u||!Number.isFinite(u))&&(u=1),{x:a,y:u}}var rn=Vt(0);function _i(t){let e=mt(t);return!vo()||!e.visualViewport?rn:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function sn(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==mt(t)?!1:e}function ie(t,e,o,r){e===void 0&&(e=!1),o===void 0&&(o=!1);let i=t.getBoundingClientRect(),s=jo(t),a=Vt(1);e&&(r?Mt(r)&&(a=ge(r)):a=ge(t));let u=sn(s,o,r)?_i(s):Vt(0),c=(i.left+u.x)/a.x,d=(i.top+u.y)/a.y,h=i.width/a.x,p=i.height/a.y;if(s){let v=mt(s),m=r&&Mt(r)?mt(r):r,b=v.frameElement;for(;b&&r&&m!==v;){let $=ge(b),V=b.getBoundingClientRect(),z=vt(b),L=V.left+(b.clientLeft+parseFloat(z.paddingLeft))*$.x,R=V.top+(b.clientTop+parseFloat(z.paddingTop))*$.y;c*=$.x,d*=$.y,h*=$.x,p*=$.y,c+=L,d+=R,b=mt(b).frameElement}}return oe({width:h,height:p,x:c,y:d})}var nn=[":popover-open",":modal"];function wi(t){let e=!1,o=0,r=0;function i(s){try{e=e||t.matches(s)}catch{}}if(nn.forEach(s=>{i(s)}),e){let s=Uo(t);if(s){let a=s.getBoundingClientRect();o=a.x,r=a.y}}return[e,o,r]}function an(t){let{elements:e,rect:o,offsetParent:r,strategy:i}=t,s=zt(r),[a]=e?wi(e.floating):[!1];if(r===s||a)return o;let u={scrollLeft:0,scrollTop:0},c=Vt(1),d=Vt(0),h=Ct(r);if((h||!h&&i!=="fixed")&&((Bt(r)!=="body"||fe(s))&&(u=Ne(r)),Ct(r))){let p=ie(r);c=ge(r),d.x=p.x+r.clientLeft,d.y=p.y+r.clientTop}return{width:o.width*c.x,height:o.height*c.y,x:o.x*c.x-u.scrollLeft*c.x+d.x,y:o.y*c.y-u.scrollTop*c.y+d.y}}function ln(t){return Array.from(t.getClientRects())}function xi(t){return ie(zt(t)).left+Ne(t).scrollLeft}function cn(t){let e=zt(t),o=Ne(t),r=t.ownerDocument.body,i=dt(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),s=dt(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight),a=-o.scrollLeft+xi(t),u=-o.scrollTop;return vt(r).direction==="rtl"&&(a+=dt(e.clientWidth,r.clientWidth)-i),{width:i,height:s,x:a,y:u}}function un(t,e){let o=mt(t),r=zt(t),i=o.visualViewport,s=r.clientWidth,a=r.clientHeight,u=0,c=0;if(i){s=i.width,a=i.height;let d=vo();(!d||d&&e==="fixed")&&(u=i.offsetLeft,c=i.offsetTop)}return{width:s,height:a,x:u,y:c}}function dn(t,e){let o=ie(t,!0,e==="fixed"),r=o.top+t.clientTop,i=o.left+t.clientLeft,s=Ct(t)?ge(t):Vt(1),a=t.clientWidth*s.x,u=t.clientHeight*s.y,c=i*s.x,d=r*s.y;return{width:a,height:u,x:c,y:d}}function bi(t,e,o){let r;if(e==="viewport")r=un(t,o);else if(e==="document")r=cn(zt(t));else if(Mt(e))r=dn(e,o);else{let i=_i(t);r={...e,x:e.x-i.x,y:e.y-i.y}}return oe(r)}function Ai(t,e){let o=re(t);return o===e||!Mt(o)||Be(o)?!1:vt(o).position==="fixed"||Ai(o,e)}function pn(t,e){let o=e.get(t);if(o)return o;let r=me(t,[],!1).filter(u=>Mt(u)&&Bt(u)!=="body"),i=null,s=vt(t).position==="fixed",a=s?re(t):t;for(;Mt(a)&&!Be(a);){let u=vt(a),c=yo(a);!c&&u.position==="fixed"&&(i=null),(s?!c&&!i:!c&&u.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||fe(a)&&!c&&Ai(t,a))?r=r.filter(h=>h!==a):i=u,a=re(a)}return e.set(t,r),r}function hn(t){let{element:e,boundary:o,rootBoundary:r,strategy:i}=t,a=[...o==="clippingAncestors"?pn(e,this._c):[].concat(o),r],u=a[0],c=a.reduce((d,h)=>{let p=bi(e,h,i);return d.top=dt(p.top,d.top),d.right=Ot(p.right,d.right),d.bottom=Ot(p.bottom,d.bottom),d.left=dt(p.left,d.left),d},bi(e,u,i));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function mn(t){let{width:e,height:o}=vi(t);return{width:e,height:o}}function fn(t,e,o,r){let i=Ct(e),s=zt(e),a=o==="fixed",u=ie(t,!0,a,e),c={scrollLeft:0,scrollTop:0},d=Vt(0);if(i||!i&&!a)if((Bt(e)!=="body"||fe(s))&&(c=Ne(e)),i){let $=ie(e,!0,a,e);d.x=$.x+e.clientLeft,d.y=$.y+e.clientTop}else s&&(d.x=xi(s));let h=u.left+c.scrollLeft-d.x,p=u.top+c.scrollTop-d.y,[v,m,b]=wi(r);return v&&(h+=m,p+=b,i&&(h+=e.clientLeft,p+=e.clientTop)),{x:h,y:p,width:u.width,height:u.height}}function yi(t,e){return!Ct(t)||vt(t).position==="fixed"?null:e?e(t):t.offsetParent}function ki(t,e){let o=mt(t);if(!Ct(t))return o;let r=yi(t,e);for(;r&&fi(r)&&vt(r).position==="static";)r=yi(r,e);return r&&(Bt(r)==="html"||Bt(r)==="body"&&vt(r).position==="static"&&!yo(r))?o:r||Uo(t)||o}var gn=async function(t){let e=this.getOffsetParent||ki,o=this.getDimensions;return{reference:fn(t.reference,await e(t.floating),t.strategy,t.floating),floating:{x:0,y:0,...await o(t.floating)}}};function bn(t){return vt(t).direction==="rtl"}var Fe={convertOffsetParentRelativeRectToViewportRelativeRect:an,getDocumentElement:zt,getClippingRect:hn,getOffsetParent:ki,getElementRects:gn,getClientRects:ln,getDimensions:mn,getScale:ge,isElement:Mt,isRTL:bn};function yn(t,e){let o=null,r,i=zt(t);function s(){var u;clearTimeout(r),(u=o)==null||u.disconnect(),o=null}function a(u,c){u===void 0&&(u=!1),c===void 0&&(c=1),s();let{left:d,top:h,width:p,height:v}=t.getBoundingClientRect();if(u||e(),!p||!v)return;let m=Ie(h),b=Ie(i.clientWidth-(d+p)),$=Ie(i.clientHeight-(h+v)),V=Ie(d),L={rootMargin:-m+"px "+-b+"px "+-$+"px "+-V+"px",threshold:dt(0,Ot(1,c))||1},R=!0;function g(f){let x=f[0].intersectionRatio;if(x!==c){if(!R)return a();x?a(!1,x):r=setTimeout(()=>{a(!1,1e-7)},100)}R=!1}try{o=new IntersectionObserver(g,{...L,root:i.ownerDocument})}catch{o=new IntersectionObserver(g,L)}o.observe(t)}return a(!0),s}function Ci(t,e,o,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:s=!0,elementResize:a=typeof ResizeObserver=="function",layoutShift:u=typeof IntersectionObserver=="function",animationFrame:c=!1}=r,d=jo(t),h=i||s?[...d?me(d):[],...me(e)]:[];h.forEach(z=>{i&&z.addEventListener("scroll",o,{passive:!0}),s&&z.addEventListener("resize",o)});let p=d&&u?yn(d,o):null,v=-1,m=null;a&&(m=new ResizeObserver(z=>{let[L]=z;L&&L.target===d&&m&&(m.unobserve(e),cancelAnimationFrame(v),v=requestAnimationFrame(()=>{var R;(R=m)==null||R.observe(e)})),o()}),d&&!c&&m.observe(d),m.observe(e));let b,$=c?ie(t):null;c&&V();function V(){let z=ie(t);$&&(z.x!==$.x||z.y!==$.y||z.width!==$.width||z.height!==$.height)&&o(),$=z,b=requestAnimationFrame(V)}return o(),()=>{var z;h.forEach(L=>{i&&L.removeEventListener("scroll",o),s&&L.removeEventListener("resize",o)}),p?.(),(z=m)==null||z.disconnect(),m=null,c&&cancelAnimationFrame(b)}}var Si=di,$i=ui,qo=pi;var Ei=ci;var Ti=(t,e,o)=>{let r=new Map,i={platform:Fe,...o},s={...i.platform,_c:r};return li(t,e,{...i,platform:s})};function Oi(t){return vn(t)}function Wo(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function vn(t){for(let e=t;e;e=Wo(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Wo(t);e;e=Wo(e)){if(!(e instanceof Element))continue;let o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||o.filter!=="none"||e.tagName==="BODY"))return e}return null}function _n(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t}var I=class extends w{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),r=0,i=0,s=0,a=0,u=0,c=0,d=0,h=0;o?t.top<e.top?(r=t.left,i=t.bottom,s=t.right,a=t.bottom,u=e.left,c=e.top,d=e.right,h=e.top):(r=e.left,i=e.bottom,s=e.right,a=e.bottom,u=t.left,c=t.top,d=t.right,h=t.top):t.left<e.left?(r=t.right,i=t.top,s=e.left,a=e.top,u=t.right,c=t.bottom,d=e.left,h=e.bottom):(r=e.right,i=e.top,s=t.left,a=t.top,u=e.right,c=e.bottom,d=t.left,h=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||_n(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&(this.cleanup=Ci(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Ho({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(qo({apply:({rects:o})=>{let r=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${o.reference.width}px`:"",this.popup.style.height=i?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push($i({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Si({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(qo({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Ei({element:this.arrowEl,padding:this.arrowPadding}));let e=this.strategy==="absolute"?o=>Fe.getOffsetParent(o,Oi):Fe.getOffsetParent;Ti(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Rt(pt({},Fe),{getOffsetParent:e})}).then(({x:o,y:r,middlewareData:i,placement:s})=>{let a=getComputedStyle(this).direction==="rtl",u={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${o}px`,top:`${r}px`}),this.arrow){let c=i.arrow.x,d=i.arrow.y,h="",p="",v="",m="";if(this.arrowPlacement==="start"){let b=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=a?b:"",m=a?"":b}else if(this.arrowPlacement==="end"){let b=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=a?"":b,m=a?b:"",v=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(m=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":"",h=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(m=typeof c=="number"?`${c}px`:"",h=typeof d=="number"?`${d}px`:"");Object.assign(this.arrowEl.style,{top:h,right:p,bottom:v,left:m,[u]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return y`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${M({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${M({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?y`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};I.styles=ri;n([k(".popup")],I.prototype,"popup",2);n([k(".popup__arrow")],I.prototype,"arrowEl",2);n([l()],I.prototype,"anchor",2);n([l({type:Boolean,reflect:!0})],I.prototype,"active",2);n([l({reflect:!0})],I.prototype,"placement",2);n([l({reflect:!0})],I.prototype,"strategy",2);n([l({type:Number})],I.prototype,"distance",2);n([l({type:Number})],I.prototype,"skidding",2);n([l({type:Boolean})],I.prototype,"arrow",2);n([l({attribute:"arrow-placement"})],I.prototype,"arrowPlacement",2);n([l({attribute:"arrow-padding",type:Number})],I.prototype,"arrowPadding",2);n([l({type:Boolean})],I.prototype,"flip",2);n([l({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],I.prototype,"flipFallbackPlacements",2);n([l({attribute:"flip-fallback-strategy"})],I.prototype,"flipFallbackStrategy",2);n([l({type:Object})],I.prototype,"flipBoundary",2);n([l({attribute:"flip-padding",type:Number})],I.prototype,"flipPadding",2);n([l({type:Boolean})],I.prototype,"shift",2);n([l({type:Object})],I.prototype,"shiftBoundary",2);n([l({attribute:"shift-padding",type:Number})],I.prototype,"shiftPadding",2);n([l({attribute:"auto-size"})],I.prototype,"autoSize",2);n([l()],I.prototype,"sync",2);n([l({type:Object})],I.prototype,"autoSizeBoundary",2);n([l({attribute:"auto-size-padding",type:Number})],I.prototype,"autoSizePadding",2);n([l({attribute:"hover-bridge",type:Boolean})],I.prototype,"hoverBridge",2);var Mi=new Map,wn=new WeakMap;function xn(t){return t??{keyframes:[],options:{duration:0}}}function zi(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function N(t,e){Mi.set(t,xn(e))}function W(t,e,o){let r=wn.get(t);if(r?.[e])return zi(r[e],o.dir);let i=Mi.get(e);return i?zi(i,o.dir):{keyframes:[],options:{duration:0}}}function it(t,e){return new Promise(o=>{function r(i){i.target===t&&(t.removeEventListener(e,r),o())}t.addEventListener(e,r)})}function K(t,e,o){return new Promise(r=>{if(o?.duration===1/0)throw new Error("Promise-based animations must be finite.");let i=t.animate(e,Rt(pt({},o),{duration:An()?0:o.duration}));i.addEventListener("cancel",r,{once:!0}),i.addEventListener("finish",r,{once:!0})})}function Ko(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function An(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Y(t){return Promise.all(t.getAnimations().map(e=>new Promise(o=>{e.cancel(),requestAnimationFrame(o)})))}function Jo(t,e){return t.map(o=>Rt(pt({},o),{height:o.height==="auto"?`${e}px`:o.height}))}var st=class extends w{constructor(){super(),this.localize=new H(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){let t=Ko(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let t=Ko(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await Y(this.body),this.body.hidden=!1,this.popup.active=!0;let{keyframes:o,options:r}=W(this,"tooltip.show",{dir:this.localize.dir()});await K(this.popup.popup,o,r),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await Y(this.body);let{keyframes:o,options:r}=W(this,"tooltip.hide",{dir:this.localize.dir()});await K(this.popup.popup,o,r),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,it(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,it(this,"sl-after-hide")}render(){return y`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${M({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};st.styles=oi;st.dependencies={"sl-popup":I};n([k("slot:not([name])")],st.prototype,"defaultSlot",2);n([k(".tooltip__body")],st.prototype,"body",2);n([k("sl-popup")],st.prototype,"popup",2);n([l()],st.prototype,"content",2);n([l()],st.prototype,"placement",2);n([l({type:Boolean,reflect:!0})],st.prototype,"disabled",2);n([l({type:Number})],st.prototype,"distance",2);n([l({type:Boolean,reflect:!0})],st.prototype,"open",2);n([l({type:Number})],st.prototype,"skidding",2);n([l()],st.prototype,"trigger",2);n([l({type:Boolean})],st.prototype,"hoist",2);n([S("open",{waitUntilFirstUpdate:!0})],st.prototype,"handleOpenChange",1);n([S(["content","distance","hoist","placement","skidding"])],st.prototype,"handleOptionsChange",1);n([S("disabled")],st.prototype,"handleDisabledChange",1);N("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});N("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});st.define("sl-tooltip");var Pi=A`
  ${C}

  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`;var _t=class extends w{constructor(){super(...arguments),this.localize=new H(this),this.open=!1,this.disabled=!1}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(let e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver.disconnect()}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}async handleOpenChange(){if(this.open){if(this.details.open=!0,this.emit("sl-show",{cancelable:!0}).defaultPrevented){this.open=!1,this.details.open=!1;return}await Y(this.body);let{keyframes:e,options:o}=W(this,"details.show",{dir:this.localize.dir()});await K(this.body,Jo(e,this.body.scrollHeight),o),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:!0}).defaultPrevented){this.details.open=!0,this.open=!0;return}await Y(this.body);let{keyframes:e,options:o}=W(this,"details.hide",{dir:this.localize.dir()});await K(this.body,Jo(e,this.body.scrollHeight),o),this.body.style.height="auto",this.details.open=!1,this.emit("sl-after-hide")}}async show(){if(!(this.open||this.disabled))return this.open=!0,it(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,it(this,"sl-after-hide")}render(){let t=this.localize.dir()==="rtl";return y`
      <details
        part="base"
        class=${M({details:!0,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":t})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};_t.styles=Pi;_t.dependencies={"sl-icon":G};n([k(".details")],_t.prototype,"details",2);n([k(".details__header")],_t.prototype,"header",2);n([k(".details__body")],_t.prototype,"body",2);n([k(".details__expand-icon-slot")],_t.prototype,"expandIconSlot",2);n([l({type:Boolean,reflect:!0})],_t.prototype,"open",2);n([l()],_t.prototype,"summary",2);n([l({type:Boolean,reflect:!0})],_t.prototype,"disabled",2);n([S("open",{waitUntilFirstUpdate:!0})],_t.prototype,"handleOpenChange",1);N("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});N("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});_t.define("sl-details");var Li=A`
  ${C}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;var jt=class extends w{constructor(){super(...arguments),this.localize=new H(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return y`
      <span
        part="base"
        class=${M({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?y`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};jt.styles=Li;jt.dependencies={"sl-icon-button":Q};n([l({reflect:!0})],jt.prototype,"variant",2);n([l({reflect:!0})],jt.prototype,"size",2);n([l({type:Boolean,reflect:!0})],jt.prototype,"pill",2);n([l({type:Boolean})],jt.prototype,"removable",2);jt.define("sl-tag");var Ri=A`
  ${C}

  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;var _o=class extends w{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(t){let e=["menuitem","menuitemcheckbox"],o=t.composedPath().find(i=>{var s;return e.includes(((s=i?.getAttribute)==null?void 0:s.call(i,"role"))||"")});if(!o)return;let r=o;r.type==="checkbox"&&(r.checked=!r.checked),this.emit("sl-select",{detail:{item:r}})}handleKeyDown(t){if(t.key==="Enter"||t.key===" "){let e=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),e?.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){let e=this.getAllItems(),o=this.getCurrentItem(),r=o?e.indexOf(o):0;e.length>0&&(t.preventDefault(),t.stopPropagation(),t.key==="ArrowDown"?r++:t.key==="ArrowUp"?r--:t.key==="Home"?r=0:t.key==="End"&&(r=e.length-1),r<0&&(r=e.length-1),r>e.length-1&&(r=0),this.setCurrentItem(e[r]),e[r].focus())}}handleMouseDown(t){let e=t.target;this.isMenuItem(e)&&this.setCurrentItem(e)}handleSlotChange(){let t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0])}isMenuItem(t){var e;return t.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((e=t.getAttribute("role"))!=null?e:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>t.getAttribute("tabindex")==="0")}setCurrentItem(t){this.getAllItems().forEach(o=>{o.setAttribute("tabindex",o===t?"0":"-1")})}render(){return y`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};_o.styles=Ri;n([k("slot")],_o.prototype,"defaultSlot",2);_o.define("sl-menu");var Di=A`
  ${C}

  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;var He=class extends w{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};He.styles=Di;n([l({type:Boolean,reflect:!0})],He.prototype,"vertical",2);n([S("vertical")],He.prototype,"handleVerticalChange",1);He.define("sl-divider");var Ue=class extends w{constructor(){super(...arguments),this.localize=new H(this),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";let t=["","kilo","mega","giga","tera"],e=["","kilo","mega","giga","tera","peta"],o=this.unit==="bit"?t:e,r=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),o.length-1)),i=o[r]+this.unit,s=parseFloat((this.value/Math.pow(1e3,r)).toPrecision(3));return this.localize.number(s,{style:"unit",unit:i,unitDisplay:this.display})}};n([l({type:Number})],Ue.prototype,"value",2);n([l()],Ue.prototype,"unit",2);n([l()],Ue.prototype,"display",2);Ue.define("sl-format-bytes");var wt=class extends w{constructor(){super(...arguments),this.localize=new H(this),this.value=0,this.type="decimal",this.noGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};n([l({type:Number})],wt.prototype,"value",2);n([l()],wt.prototype,"type",2);n([l({attribute:"no-grouping",type:Boolean})],wt.prototype,"noGrouping",2);n([l()],wt.prototype,"currency",2);n([l({attribute:"currency-display"})],wt.prototype,"currencyDisplay",2);n([l({attribute:"minimum-integer-digits",type:Number})],wt.prototype,"minimumIntegerDigits",2);n([l({attribute:"minimum-fraction-digits",type:Number})],wt.prototype,"minimumFractionDigits",2);n([l({attribute:"maximum-fraction-digits",type:Number})],wt.prototype,"maximumFractionDigits",2);n([l({attribute:"minimum-significant-digits",type:Number})],wt.prototype,"minimumSignificantDigits",2);n([l({attribute:"maximum-significant-digits",type:Number})],wt.prototype,"maximumSignificantDigits",2);wt.define("sl-format-number");var Vi=A`
  ${C}

  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition:
      400ms width,
      400ms background-color;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  .progress-bar--indeterminate.progress-bar--rtl .progress-bar__indicator {
    animation-name: indeterminate-rtl;
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--sl-color-neutral-0);
    }

    .progress-bar__indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      right: -50%;
      width: 50%;
    }
    75%,
    100% {
      right: 100%;
      width: 50%;
    }
  }
`;var Ii="important",kn=" !"+Ii,Bi=Dt(class extends kt{constructor(t){if(super(t),t.type!==ht.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{let r=t[o];return r==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in e){let i=e[r];if(i!=null){this.ft.add(r);let s=typeof i=="string"&&i.endsWith(kn);r.includes("-")||s?o.setProperty(r,s?i.slice(0,-11):i,s?Ii:""):o[r]=i}}return ct}});var be=class extends w{constructor(){super(...arguments),this.localize=new H(this),this.value=0,this.indeterminate=!1,this.label=""}render(){return y`
      <div
        part="base"
        class=${M({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate,"progress-bar--rtl":this.localize.dir()==="rtl"})}
        role="progressbar"
        title=${_(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${Bi({width:`${this.value}%`})}>
          ${this.indeterminate?"":y` <slot part="label" class="progress-bar__label"></slot> `}
        </div>
      </div>
    `}};be.styles=Vi;n([l({type:Number,reflect:!0})],be.prototype,"value",2);n([l({type:Boolean,reflect:!0})],be.prototype,"indeterminate",2);n([l()],be.prototype,"label",2);be.define("sl-progress-bar");var Ni=A`
  ${C}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`;var ye=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),St=class extends w{constructor(){super(...arguments),this.hasSlotController=new rt(this,"icon","suffix"),this.localize=new H(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await Y(this.base),this.base.hidden=!1;let{keyframes:t,options:e}=W(this,"alert.show",{dir:this.localize.dir()});await K(this.base,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),await Y(this.base);let{keyframes:t,options:e}=W(this,"alert.hide",{dir:this.localize.dir()});await K(this.base,t,e),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,it(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,it(this,"sl-after-hide")}async toast(){return new Promise(t=>{ye.parentElement===null&&document.body.append(ye),ye.appendChild(this),requestAnimationFrame(()=>{this.clientWidth,this.show()}),this.addEventListener("sl-after-hide",()=>{ye.removeChild(this),t(),ye.querySelector("sl-alert")===null&&ye.remove()},{once:!0})})}render(){return y`
      <div
        part="base"
        class=${M({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":this.variant==="primary","alert--success":this.variant==="success","alert--neutral":this.variant==="neutral","alert--warning":this.variant==="warning","alert--danger":this.variant==="danger"})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?y`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}
      </div>
    `}};St.styles=Ni;St.dependencies={"sl-icon-button":Q};n([k('[part~="base"]')],St.prototype,"base",2);n([l({type:Boolean,reflect:!0})],St.prototype,"open",2);n([l({type:Boolean,reflect:!0})],St.prototype,"closable",2);n([l({reflect:!0})],St.prototype,"variant",2);n([l({type:Number})],St.prototype,"duration",2);n([S("open",{waitUntilFirstUpdate:!0})],St.prototype,"handleOpenChange",1);n([S("duration")],St.prototype,"handleDurationChange",1);N("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});N("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});St.define("sl-alert");var ve=A`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;var Fi=A`
  ${C}
  ${ve}

  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;var _e=(t="value")=>(e,o)=>{let r=e.constructor,i=r.prototype.attributeChangedCallback;r.prototype.attributeChangedCallback=function(s,a,u){var c;let d=r.getPropertyOptions(t),h=typeof d.attribute=="string"?d.attribute:t;if(s===h){let p=d.converter||Nt,m=(typeof p=="function"?p:(c=p?.fromAttribute)!=null?c:Nt.fromAttribute)(u,d.type);this[t]!==m&&(this[o]=m)}i.call(this,s,a,u)}};var se=Dt(class extends kt{constructor(t){if(super(t),t.type!==ht.PROPERTY&&t.type!==ht.ATTRIBUTE&&t.type!==ht.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!uo(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===ct||e===j)return e;let o=t.element,r=t.name;if(t.type===ht.PROPERTY){if(e===o[r])return ct}else if(t.type===ht.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(r))return ct}else if(t.type===ht.ATTRIBUTE&&o.getAttribute(r)===e+"")return ct;return Qr(t),e}});var D=class extends w{constructor(){super(...arguments),this.formControlController=new Tt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new rt(this,"help-text","label"),this.hasFocus=!1,this.title="",this.name="",this.value="",this.size="medium",this.filled=!1,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.form="",this.required=!1,this.spellcheck=!0,this.defaultValue=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.formControlController.updateValidity()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}setTextareaHeight(){this.resize==="auto"?(this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=void 0}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleRowsChange(){this.setTextareaHeight()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){if(t){typeof t.top=="number"&&(this.input.scrollTop=t.top),typeof t.left=="number"&&(this.input.scrollLeft=t.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,r="preserve"){let i=e??this.input.selectionStart,s=o??this.input.selectionEnd;this.input.setRangeText(t,i,s,r),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight())}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e;return y`
      <div
        part="form-control"
        class=${M({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":o,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${M({textarea:!0,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${_(this.name)}
              .value=${se(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${_(this.placeholder)}
              rows=${_(this.rows)}
              minlength=${_(this.minlength)}
              maxlength=${_(this.maxlength)}
              autocapitalize=${_(this.autocapitalize)}
              autocorrect=${_(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${_(this.spellcheck)}
              enterkeyhint=${_(this.enterkeyhint)}
              inputmode=${_(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};D.styles=Fi;n([k(".textarea__control")],D.prototype,"input",2);n([Z()],D.prototype,"hasFocus",2);n([l()],D.prototype,"title",2);n([l()],D.prototype,"name",2);n([l()],D.prototype,"value",2);n([l({reflect:!0})],D.prototype,"size",2);n([l({type:Boolean,reflect:!0})],D.prototype,"filled",2);n([l()],D.prototype,"label",2);n([l({attribute:"help-text"})],D.prototype,"helpText",2);n([l()],D.prototype,"placeholder",2);n([l({type:Number})],D.prototype,"rows",2);n([l()],D.prototype,"resize",2);n([l({type:Boolean,reflect:!0})],D.prototype,"disabled",2);n([l({type:Boolean,reflect:!0})],D.prototype,"readonly",2);n([l({reflect:!0})],D.prototype,"form",2);n([l({type:Boolean,reflect:!0})],D.prototype,"required",2);n([l({type:Number})],D.prototype,"minlength",2);n([l({type:Number})],D.prototype,"maxlength",2);n([l()],D.prototype,"autocapitalize",2);n([l()],D.prototype,"autocorrect",2);n([l()],D.prototype,"autocomplete",2);n([l({type:Boolean})],D.prototype,"autofocus",2);n([l()],D.prototype,"enterkeyhint",2);n([l({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],D.prototype,"spellcheck",2);n([l()],D.prototype,"inputmode",2);n([_e()],D.prototype,"defaultValue",2);n([S("disabled",{waitUntilFirstUpdate:!0})],D.prototype,"handleDisabledChange",1);n([S("rows",{waitUntilFirstUpdate:!0})],D.prototype,"handleRowsChange",1);n([S("value",{waitUntilFirstUpdate:!0})],D.prototype,"handleValueChange",1);D.define("sl-textarea");var Hi=A`
  ${C}

  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;var Ui=new WeakMap;function ji(t){let e=Ui.get(t);return e||(e=window.getComputedStyle(t,null),Ui.set(t,e)),e}function Cn(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});let e=ji(t);return e.visibility!=="hidden"&&e.display!=="none"}function Sn(t){let e=ji(t),{overflowY:o,overflowX:r}=e;return o==="scroll"||r==="scroll"?!0:o!=="auto"||r!=="auto"?!1:t.scrollHeight>t.clientHeight&&o==="auto"||t.scrollWidth>t.clientWidth&&r==="auto"}function $n(t){let e=t.tagName.toLowerCase(),o=Number(t.getAttribute("tabindex"));return t.hasAttribute("tabindex")&&(isNaN(o)||o<=-1)||t.hasAttribute("disabled")||t.closest("[inert]")||e==="input"&&t.getAttribute("type")==="radio"&&!t.hasAttribute("checked")||!Cn(t)?!1:(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:Sn(t)}function qi(t){var e,o;let r=wo(t),i=(e=r[0])!=null?e:null,s=(o=r[r.length-1])!=null?o:null;return{start:i,end:s}}function En(t,e){var o;return((o=t.getRootNode({composed:!0}))==null?void 0:o.host)!==e}function wo(t){let e=new WeakMap,o=[];function r(i){if(i instanceof Element){if(i.hasAttribute("inert")||i.closest("[inert]")||e.has(i))return;e.set(i,!0),!o.includes(i)&&$n(i)&&o.push(i),i instanceof HTMLSlotElement&&En(i,t)&&i.assignedElements({flatten:!0}).forEach(s=>{r(s)}),i.shadowRoot!==null&&i.shadowRoot.mode==="open"&&r(i.shadowRoot)}for(let s of i.children)r(s)}return r(t),o.sort((i,s)=>{let a=Number(i.getAttribute("tabindex"))||0;return(Number(s.getAttribute("tabindex"))||0)-a})}var ut=class extends w{constructor(){super(...arguments),this.localize=new H(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=t=>{var e;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}setTimeout(()=>{var o,r,i;let s=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?(i=(r=document.activeElement)==null?void 0:r.shadowRoot)==null?void 0:i.activeElement:document.activeElement;(!this.containingElement||s?.closest(this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=t=>{let e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){let t=this.trigger.assignedElements({flatten:!0})[0];typeof t?.focus=="function"&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}let e=this.getMenu();if(e){let o=e.getAllItems(),r=o[0],i=o[o.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),o.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(r),r.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(i),i.focus())}))}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){let e=this.trigger.assignedElements({flatten:!0}).find(r=>qi(r).start),o;if(e){switch(e.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":o=e.button;break;default:o=e}o.setAttribute("aria-haspopup","true"),o.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,it(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,it(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Y(this),this.panel.hidden=!1,this.popup.active=!0;let{keyframes:t,options:e}=W(this,"dropdown.show",{dir:this.localize.dir()});await K(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Y(this);let{keyframes:t,options:e}=W(this,"dropdown.hide",{dir:this.localize.dir()});await K(this.popup.popup,t,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return y`
      <sl-popup
        part="base"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        class=${M({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};ut.styles=Hi;ut.dependencies={"sl-popup":I};n([k(".dropdown")],ut.prototype,"popup",2);n([k(".dropdown__trigger")],ut.prototype,"trigger",2);n([k(".dropdown__panel")],ut.prototype,"panel",2);n([l({type:Boolean,reflect:!0})],ut.prototype,"open",2);n([l({reflect:!0})],ut.prototype,"placement",2);n([l({type:Boolean,reflect:!0})],ut.prototype,"disabled",2);n([l({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],ut.prototype,"stayOpenOnSelect",2);n([l({attribute:!1})],ut.prototype,"containingElement",2);n([l({type:Number})],ut.prototype,"distance",2);n([l({type:Number})],ut.prototype,"skidding",2);n([l({type:Boolean})],ut.prototype,"hoist",2);n([S("open",{waitUntilFirstUpdate:!0})],ut.prototype,"handleOpenChange",1);N("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});N("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});ut.define("sl-dropdown");var Wi=A`
  ${C}

  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;var je=(t,e)=>{let o=t._$AN;if(o===void 0)return!1;for(let r of o)r._$AO?.(e,!1),je(r,e);return!0},xo=t=>{let e,o;do{if((e=t._$AM)===void 0)break;o=e._$AN,o.delete(t),t=e}while(o?.size===0)},Ki=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(o===void 0)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),zn(e)}};function Tn(t){this._$AN!==void 0?(xo(this),this._$AM=t,Ki(this)):this._$AM=t}function On(t,e=!1,o=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(e)if(Array.isArray(r))for(let s=o;s<r.length;s++)je(r[s],!1),xo(r[s]);else r!=null&&(je(r,!1),xo(r));else je(this,t)}var zn=t=>{t.type==ht.CHILD&&(t._$AP??=On,t._$AQ??=Tn)},Ao=class extends kt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,o,r){super._$AT(e,o,r),Ki(this),this.isConnected=e._$AU}_$AO(e,o=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),o&&(je(this,e),xo(this))}setValue(e){if(uo(this._$Ct))this._$Ct._$AI(e,this);else{let o=[...this._$Ct._$AH];o[this._$Ci]=e,this._$Ct._$AI(o,this,0)}}disconnected(){}reconnected(){}};var Ji=()=>new Qo,Qo=class{},Go=new WeakMap,Gi=Dt(class extends Ao{render(t){return j}update(t,[e]){let o=e!==this.Y;return o&&this.Y!==void 0&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.Y=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),j}rt(t){if(typeof this.Y=="function"){let e=this.ht??globalThis,o=Go.get(e);o===void 0&&(o=new WeakMap,Go.set(e,o)),o.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),o.set(this.Y,t),t!==void 0&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){return typeof this.Y=="function"?Go.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var Qi=class{constructor(t,e,o){this.popupRef=Ji(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=r=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${r.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${r.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=r=>{switch(r.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":r.target!==this.host&&(r.preventDefault(),r.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(r);break;default:break}},this.handleClick=r=>{var i;r.target===this.host?(r.preventDefault(),r.stopPropagation()):r.target instanceof Element&&(r.target.tagName==="sl-menu-item"||(i=r.target.role)!=null&&i.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=r=>{r.relatedTarget&&r.relatedTarget instanceof Element&&this.host.contains(r.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=r=>{r.stopPropagation()},this.handlePopupReposition=()=>{let r=this.host.renderRoot.querySelector("slot[name='submenu']"),i=r?.assignedElements({flatten:!0}).filter(h=>h.localName==="sl-menu")[0],s=this.localize.dir()==="rtl";if(!i)return;let{left:a,top:u,width:c,height:d}=i.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${s?a+c:a}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${u}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${s?a+c:a}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${u+d}px`)},(this.host=t).addController(this),this.hasSlotController=e,this.localize=o}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(t){let e=this.host.renderRoot.querySelector("slot[name='submenu']");if(!e){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let o=null;for(let r of e.assignedElements())if(o=r.querySelectorAll("sl-menu-item, [role^='menuitem']"),o.length!==0)break;if(!(!o||o.length===0)){o[0].setAttribute("tabindex","0");for(let r=1;r!==o.length;++r)o[r].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?o[0]instanceof HTMLElement&&o[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{o[0]instanceof HTMLElement&&o[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate())}enableSubmenu(t=!0){t?this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay):this.setSubmenuState(!0)}disableSubmenu(){clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var t;if(!((t=this.host.parentElement)!=null&&t.computedStyleMap))return;let e=this.host.parentElement.computedStyleMap(),r=["padding-top","border-top-width","margin-top"].reduce((i,s)=>{var a;let u=(a=e.get(s))!=null?a:new CSSUnitValue(0,"px"),d=(u instanceof CSSUnitValue?u:new CSSUnitValue(0,"px")).to("px");return i-d.value},0);this.skidding=r}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){let t=this.localize.dir()==="ltr";return this.isConnected?y`
      <sl-popup
        ${Gi(this.popupRef)}
        placement=${t?"right-start":"left-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:y` <slot name="submenu" hidden></slot> `}};var ft=class extends w{constructor(){super(...arguments),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.localize=new H(this),this.hasSlotController=new rt(this,"submenu"),this.submenuController=new Qi(this,this.hasSlotController,this.localize),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},this.handleMouseOver=t=>{this.focus(),t.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){let t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return Hr(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){let t=this.localize.dir()==="rtl",e=this.submenuController.isExpanded();return y`
      <div
        id="anchor"
        part="base"
        class=${M({"menu-item":!0,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":e})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!e}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${t?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?y` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};ft.styles=Wi;ft.dependencies={"sl-icon":G,"sl-popup":I,"sl-spinner":Zt};n([k("slot:not([name])")],ft.prototype,"defaultSlot",2);n([k(".menu-item")],ft.prototype,"menuItem",2);n([l()],ft.prototype,"type",2);n([l({type:Boolean,reflect:!0})],ft.prototype,"checked",2);n([l()],ft.prototype,"value",2);n([l({type:Boolean,reflect:!0})],ft.prototype,"loading",2);n([l({type:Boolean,reflect:!0})],ft.prototype,"disabled",2);n([S("checked")],ft.prototype,"handleCheckedChange",1);n([S("disabled")],ft.prototype,"handleDisabledChange",1);n([S("type")],ft.prototype,"handleTypeChange",1);ft.define("sl-menu-item");var Yi=A`
  ${C}

  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;function*Yo(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Br(Yo(t.shadowRoot.activeElement))))}function Mn(){return[...Yo()].pop()}var qe=[],ko=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var o;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;let r=Mn();if(this.previousFocus=r,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";let i=wo(this.element),s=i.findIndex(u=>u===r);this.previousFocus=this.currentFocus;let a=this.tabDirection==="forward"?1:-1;for(;;){s+a>=i.length?s=0:s+a<0?s=i.length-1:s+=a,this.previousFocus=this.currentFocus;let u=i[s];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||u&&this.possiblyHasTabbableChildren(u))return;e.preventDefault(),this.currentFocus=u,(o=this.currentFocus)==null||o.focus({preventScroll:!1});let c=[...Yo()];if(c.includes(this.currentFocus)||!c.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){qe.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){qe=qe.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return qe[qe.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){let t=wo(this.element);if(!this.element.matches(":focus-within")){let e=t[0],o=t[t.length-1],r=this.tabDirection==="forward"?e:o;typeof r?.focus=="function"&&(this.currentFocus=r,r.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}};var Xo=new Set;function Pn(){let t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function ne(t){if(Xo.add(t),!document.body.classList.contains("sl-scroll-lock")){let e=Pn();document.body.classList.add("sl-scroll-lock"),document.body.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function ae(t){Xo.delete(t),Xo.size===0&&(document.body.classList.remove("sl-scroll-lock"),document.body.style.removeProperty("--sl-scroll-lock-size"))}function Xi(t){return t.charAt(0).toUpperCase()+t.slice(1)}var gt=class extends w{constructor(){super(...arguments),this.hasSlotController=new rt(this,"footer"),this.localize=new H(this),this.modal=new ko(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1,this.handleDocumentKeyDown=t=>{this.contained||t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopImmediatePropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.drawer.hidden=!this.open,this.open&&(this.addOpenListeners(),this.contained||(this.modal.activate(),ne(this)))}disconnectedCallback(){var t;super.disconnectedCallback(),ae(this),(t=this.closeWatcher)==null||t.destroy()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){let o=W(this,"drawer.denyClose",{dir:this.localize.dir()});K(this.panel,o.keyframes,o.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.contained||(this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard"))):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;document.removeEventListener("keydown",this.handleDocumentKeyDown),(t=this.closeWatcher)==null||t.destroy()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),ne(this));let t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([Y(this.drawer),Y(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});let e=W(this,`drawer.show${Xi(this.placement)}`,{dir:this.localize.dir()}),o=W(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([K(this.panel,e.keyframes,e.options),K(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.contained||(this.modal.deactivate(),ae(this)),await Promise.all([Y(this.drawer),Y(this.overlay)]);let t=W(this,`drawer.hide${Xi(this.placement)}`,{dir:this.localize.dir()}),e=W(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([K(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),K(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.drawer.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1;let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.emit("sl-after-hide")}}handleNoModalChange(){this.open&&!this.contained&&(this.modal.activate(),ne(this)),this.open&&this.contained&&(this.modal.deactivate(),ae(this))}async show(){if(!this.open)return this.open=!0,it(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,it(this,"sl-after-hide")}render(){return y`
      <div
        part="base"
        class=${M({drawer:!0,"drawer--open":this.open,"drawer--top":this.placement==="top","drawer--end":this.placement==="end","drawer--bottom":this.placement==="bottom","drawer--start":this.placement==="start","drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":this.localize.dir()==="rtl","drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${_(this.noHeader?this.label:void 0)}
          aria-labelledby=${_(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":y`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${()=>this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};gt.styles=Yi;gt.dependencies={"sl-icon-button":Q};n([k(".drawer")],gt.prototype,"drawer",2);n([k(".drawer__panel")],gt.prototype,"panel",2);n([k(".drawer__overlay")],gt.prototype,"overlay",2);n([l({type:Boolean,reflect:!0})],gt.prototype,"open",2);n([l({reflect:!0})],gt.prototype,"label",2);n([l({reflect:!0})],gt.prototype,"placement",2);n([l({type:Boolean,reflect:!0})],gt.prototype,"contained",2);n([l({attribute:"no-header",type:Boolean,reflect:!0})],gt.prototype,"noHeader",2);n([S("open",{waitUntilFirstUpdate:!0})],gt.prototype,"handleOpenChange",1);n([S("contained",{waitUntilFirstUpdate:!0})],gt.prototype,"handleNoModalChange",1);N("drawer.showTop",{keyframes:[{opacity:0,translate:"0 -100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});N("drawer.hideTop",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 -100%"}],options:{duration:250,easing:"ease"}});N("drawer.showEnd",{keyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});N("drawer.hideEnd",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],options:{duration:250,easing:"ease"}});N("drawer.showBottom",{keyframes:[{opacity:0,translate:"0 100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});N("drawer.hideBottom",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 100%"}],options:{duration:250,easing:"ease"}});N("drawer.showStart",{keyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});N("drawer.hideStart",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],options:{duration:250,easing:"ease"}});N("drawer.denyClose",{keyframes:[{scale:1},{scale:1.01},{scale:1}],options:{duration:250}});N("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});N("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});gt.define("sl-drawer");var Zi=A`
  ${C}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;var we=class extends w{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return y`
      <span
        part="base"
        class=${M({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};we.styles=Zi;n([l({reflect:!0})],we.prototype,"variant",2);n([l({type:Boolean,reflect:!0})],we.prototype,"pill",2);n([l({type:Boolean,reflect:!0})],we.prototype,"pulse",2);we.define("sl-badge");var ts=A`
  ${C}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;var $t=class extends w{constructor(){super(...arguments),this.hasSlotController=new rt(this,"footer"),this.localize=new H(this),this.modal=new ko(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),ne(this))}disconnectedCallback(){var t;super.disconnectedCallback(),this.modal.deactivate(),ae(this),(t=this.closeWatcher)==null||t.destroy()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){let o=W(this,"dialog.denyClose",{dir:this.localize.dir()});K(this.panel,o.keyframes,o.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),ne(this);let t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([Y(this.dialog),Y(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});let e=W(this,"dialog.show",{dir:this.localize.dir()}),o=W(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([K(this.panel,e.keyframes,e.options),K(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([Y(this.dialog),Y(this.overlay)]);let t=W(this,"dialog.hide",{dir:this.localize.dir()}),e=W(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([K(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),K(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,ae(this);let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,it(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,it(this,"sl-after-hide")}render(){return y`
      <div
        part="base"
        class=${M({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${_(this.noHeader?this.label:void 0)}
          aria-labelledby=${_(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":y`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};$t.styles=ts;$t.dependencies={"sl-icon-button":Q};n([k(".dialog")],$t.prototype,"dialog",2);n([k(".dialog__panel")],$t.prototype,"panel",2);n([k(".dialog__overlay")],$t.prototype,"overlay",2);n([l({type:Boolean,reflect:!0})],$t.prototype,"open",2);n([l({reflect:!0})],$t.prototype,"label",2);n([l({attribute:"no-header",type:Boolean,reflect:!0})],$t.prototype,"noHeader",2);n([S("open",{waitUntilFirstUpdate:!0})],$t.prototype,"handleOpenChange",1);N("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});N("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});N("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});N("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});N("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});$t.define("sl-dialog");var es=A`
  ${C}
  ${ve}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear:not(.input__clear--visible) {
    visibility: hidden;
  }

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;var O=class extends w{constructor(){super(...arguments),this.formControlController=new Tt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new rt(this,"help-text","label"),this.localize=new H(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change"),this.input.focus(),t.stopPropagation()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){let e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,r="preserve"){let i=e??this.input.selectionStart,s=o??this.input.selectionEnd;this.input.setRangeText(t,i,s,r),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e,i=this.clearable&&!this.disabled&&!this.readonly,s=i&&(typeof this.value=="number"||this.value.length>0);return y`
      <div
        part="form-control"
        class=${M({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":o,"form-control--has-help-text":r})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${M({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${_(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${_(this.placeholder)}
              minlength=${_(this.minlength)}
              maxlength=${_(this.maxlength)}
              min=${_(this.min)}
              max=${_(this.max)}
              step=${_(this.step)}
              .value=${se(this.value)}
              autocapitalize=${_(this.autocapitalize)}
              autocomplete=${_(this.autocomplete)}
              autocorrect=${_(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${_(this.pattern)}
              enterkeyhint=${_(this.enterkeyhint)}
              inputmode=${_(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${i?y`
                  <button
                    part="clear-button"
                    class=${M({input__clear:!0,"input__clear--visible":s})}
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?y`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?y`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:y`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};O.styles=es;O.dependencies={"sl-icon":G};n([k(".input__control")],O.prototype,"input",2);n([Z()],O.prototype,"hasFocus",2);n([l()],O.prototype,"title",2);n([l({reflect:!0})],O.prototype,"type",2);n([l()],O.prototype,"name",2);n([l()],O.prototype,"value",2);n([_e()],O.prototype,"defaultValue",2);n([l({reflect:!0})],O.prototype,"size",2);n([l({type:Boolean,reflect:!0})],O.prototype,"filled",2);n([l({type:Boolean,reflect:!0})],O.prototype,"pill",2);n([l()],O.prototype,"label",2);n([l({attribute:"help-text"})],O.prototype,"helpText",2);n([l({type:Boolean})],O.prototype,"clearable",2);n([l({type:Boolean,reflect:!0})],O.prototype,"disabled",2);n([l()],O.prototype,"placeholder",2);n([l({type:Boolean,reflect:!0})],O.prototype,"readonly",2);n([l({attribute:"password-toggle",type:Boolean})],O.prototype,"passwordToggle",2);n([l({attribute:"password-visible",type:Boolean})],O.prototype,"passwordVisible",2);n([l({attribute:"no-spin-buttons",type:Boolean})],O.prototype,"noSpinButtons",2);n([l({reflect:!0})],O.prototype,"form",2);n([l({type:Boolean,reflect:!0})],O.prototype,"required",2);n([l()],O.prototype,"pattern",2);n([l({type:Number})],O.prototype,"minlength",2);n([l({type:Number})],O.prototype,"maxlength",2);n([l()],O.prototype,"min",2);n([l()],O.prototype,"max",2);n([l()],O.prototype,"step",2);n([l()],O.prototype,"autocapitalize",2);n([l()],O.prototype,"autocorrect",2);n([l()],O.prototype,"autocomplete",2);n([l({type:Boolean})],O.prototype,"autofocus",2);n([l()],O.prototype,"enterkeyhint",2);n([l({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],O.prototype,"spellcheck",2);n([l()],O.prototype,"inputmode",2);n([S("disabled",{waitUntilFirstUpdate:!0})],O.prototype,"handleDisabledChange",1);n([S("step",{waitUntilFirstUpdate:!0})],O.prototype,"handleStepChange",1);n([S("value",{waitUntilFirstUpdate:!0})],O.prototype,"handleValueChange",1);O.define("sl-input");var os=A`
  ${C}

  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;var nt=class extends w{constructor(){super(...arguments),this.formControlController=new Tt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){return y`
      <label
        part="base"
        class=${M({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
      >
        <input
          class="checkbox__input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${_(this.value)}
          .indeterminate=${se(this.indeterminate)}
          .checked=${se(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @input=${this.handleInput}
          @invalid=${this.handleInvalid}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span
          part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
          class="checkbox__control"
        >
          ${this.checked?y`
                <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
              `:""}
          ${!this.checked&&this.indeterminate?y`
                <sl-icon
                  part="indeterminate-icon"
                  class="checkbox__indeterminate-icon"
                  library="system"
                  name="indeterminate"
                ></sl-icon>
              `:""}
        </span>

        <div part="label" class="checkbox__label">
          <slot></slot>
        </div>
      </label>
    `}};nt.styles=os;nt.dependencies={"sl-icon":G};n([k('input[type="checkbox"]')],nt.prototype,"input",2);n([Z()],nt.prototype,"hasFocus",2);n([l()],nt.prototype,"title",2);n([l()],nt.prototype,"name",2);n([l()],nt.prototype,"value",2);n([l({reflect:!0})],nt.prototype,"size",2);n([l({type:Boolean,reflect:!0})],nt.prototype,"disabled",2);n([l({type:Boolean,reflect:!0})],nt.prototype,"checked",2);n([l({type:Boolean,reflect:!0})],nt.prototype,"indeterminate",2);n([_e("checked")],nt.prototype,"defaultChecked",2);n([l({reflect:!0})],nt.prototype,"form",2);n([l({type:Boolean,reflect:!0})],nt.prototype,"required",2);n([S("disabled",{waitUntilFirstUpdate:!0})],nt.prototype,"handleDisabledChange",1);n([S(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],nt.prototype,"handleStateChange",1);nt.define("sl-checkbox");Zt.define("sl-spinner");var rs=A`
  ${C}
  ${ve}

  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;var at=class extends w{constructor(){super(...arguments),this.formControlController=new Tt(this),this.hasSlotController=new rt(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=!1,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=!1}get validity(){let t=this.required&&!this.value;return this.customValidityMessage!==""?Fr:t?Nr:de}get validationMessage(){let t=this.required&&!this.value;return this.customValidityMessage!==""?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){let e=t.target.closest("sl-radio, sl-radio-button"),o=this.getAllRadios(),r=this.value;e.disabled||(this.value=e.value,o.forEach(i=>i.checked=i===e),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(t){var e;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;let o=this.getAllRadios().filter(u=>!u.disabled),r=(e=o.find(u=>u.checked))!=null?e:o[0],i=t.key===" "?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,s=this.value,a=o.indexOf(r)+i;a<0&&(a=o.length-1),a>o.length-1&&(a=0),this.getAllRadios().forEach(u=>{u.checked=!1,this.hasButtonGroup||(u.tabIndex=-1)}),this.value=o[a].value,o[a].checked=!0,this.hasButtonGroup?o[a].shadowRoot.querySelector("button").focus():(o[a].tabIndex=0,o[a].focus()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault()}handleLabelClick(){let t=this.getAllRadios(),o=t.find(r=>r.checked)||t[0];o&&o.focus()}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}async syncRadioElements(){var t,e;let o=this.getAllRadios();if(await Promise.all(o.map(async r=>{await r.updateComplete,r.checked=r.value===this.value,r.size=this.size})),this.hasButtonGroup=o.some(r=>r.tagName.toLowerCase()==="sl-radio-button"),o.length>0&&!o.some(r=>r.checked))if(this.hasButtonGroup){let r=(t=o[0].shadowRoot)==null?void 0:t.querySelector("button");r&&(r.tabIndex=0)}else o[0].tabIndex=0;if(this.hasButtonGroup){let r=(e=this.shadowRoot)==null?void 0:e.querySelector("sl-button-group");r&&(r.disableRole=!0)}}syncRadios(){if(customElements.get("sl-radio")&&customElements.get("sl-radio-button")){this.syncRadioElements();return}customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios())}updateCheckedRadio(){this.getAllRadios().forEach(e=>e.checked=e.value===this.value),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){let t=this.required&&!this.value,e=this.customValidityMessage!=="";return t||e?(this.formControlController.emitInvalidEvent(),!1):!0}getForm(){return this.formControlController.getForm()}reportValidity(){let t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=!0,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=this.label?!0:!!t,r=this.helpText?!0:!!e,i=y`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return y`
      <fieldset
        part="form-control"
        class=${M({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--radio-group":!0,"form-control--has-label":o,"form-control--has-help-text":r})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?y`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${i}
                </sl-button-group>
              `:i}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};at.styles=rs;at.dependencies={"sl-button-group":Ut};n([k("slot:not([name])")],at.prototype,"defaultSlot",2);n([k(".radio-group__validation-input")],at.prototype,"validationInput",2);n([Z()],at.prototype,"hasButtonGroup",2);n([Z()],at.prototype,"errorMessage",2);n([Z()],at.prototype,"defaultValue",2);n([l()],at.prototype,"label",2);n([l({attribute:"help-text"})],at.prototype,"helpText",2);n([l()],at.prototype,"name",2);n([l({reflect:!0})],at.prototype,"value",2);n([l({reflect:!0})],at.prototype,"size",2);n([l({reflect:!0})],at.prototype,"form",2);n([l({type:Boolean,reflect:!0})],at.prototype,"required",2);n([S("size",{waitUntilFirstUpdate:!0})],at.prototype,"handleSizeChange",1);n([S("value")],at.prototype,"handleValueChange",1);at.define("sl-radio-group");var is=A`
  ${co}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`;var xt=class extends w{constructor(){super(...arguments),this.hasSlotController=new rt(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.checked=!1,this.disabled=!1,this.size="medium",this.pill=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleClick(t){if(this.disabled){t.preventDefault(),t.stopPropagation();return}this.checked=!0}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){return Ht`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked?" button--checked":""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${M({button:!0,"button--default":!0,"button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${_(this.value)}
          tabindex="${this.checked?"0":"-1"}"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};xt.styles=is;n([k(".button")],xt.prototype,"input",2);n([k(".hidden-input")],xt.prototype,"hiddenInput",2);n([Z()],xt.prototype,"hasFocus",2);n([l({type:Boolean,reflect:!0})],xt.prototype,"checked",2);n([l()],xt.prototype,"value",2);n([l({type:Boolean,reflect:!0})],xt.prototype,"disabled",2);n([l({reflect:!0})],xt.prototype,"size",2);n([l({type:Boolean,reflect:!0})],xt.prototype,"pill",2);n([S("disabled",{waitUntilFirstUpdate:!0})],xt.prototype,"handleDisabledChange",1);xt.define("sl-radio-button");var ss=A`
  ${C}

  :host {
    display: block;
  }
`;var Zo=new Map;function ns(t,e="cors"){let o=Zo.get(t);if(o!==void 0)return Promise.resolve(o);let r=fetch(t,{mode:e}).then(async i=>{let s={ok:i.ok,status:i.status,html:await i.text()};return Zo.set(t,s),s});return Zo.set(t,r),r}var le=class extends w{constructor(){super(...arguments),this.mode="cors",this.allowScripts=!1}executeScript(t){let e=document.createElement("script");[...t.attributes].forEach(o=>e.setAttribute(o.name,o.value)),e.textContent=t.textContent,t.parentNode.replaceChild(e,t)}async handleSrcChange(){try{let t=this.src,e=await ns(t,this.mode);if(t!==this.src)return;if(!e.ok){this.emit("sl-error",{detail:{status:e.status}});return}this.innerHTML=e.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(o=>this.executeScript(o)),this.emit("sl-load")}catch{this.emit("sl-error",{detail:{status:-1}})}}render(){return y`<slot></slot>`}};le.styles=ss;n([l()],le.prototype,"src",2);n([l()],le.prototype,"mode",2);n([l({attribute:"allow-scripts",type:Boolean})],le.prototype,"allowScripts",2);n([S("src")],le.prototype,"handleSrcChange",1);le.define("sl-include");var sr=ur(er(),1);function qt(t){var e=String(t);if(e==="[object Object]")try{e=JSON.stringify(t)}catch{}return e}var Ln=function(){function t(){}return t.prototype.isSome=function(){return!1},t.prototype.isNone=function(){return!0},t.prototype[Symbol.iterator]=function(){return{next:function(){return{done:!0,value:void 0}}}},t.prototype.unwrapOr=function(e){return e},t.prototype.expect=function(e){throw new Error("".concat(e))},t.prototype.unwrap=function(){throw new Error("Tried to unwrap None")},t.prototype.map=function(e){return this},t.prototype.mapOr=function(e,o){return e},t.prototype.mapOrElse=function(e,o){return e()},t.prototype.or=function(e){return e},t.prototype.orElse=function(e){return e()},t.prototype.andThen=function(e){return this},t.prototype.toResult=function(e){return Et(e)},t.prototype.toString=function(){return"None"},t}(),P=new Ln;Object.freeze(P);var Rn=function(){function t(e){if(!(this instanceof t))return new t(e);this.value=e}return t.prototype.isSome=function(){return!0},t.prototype.isNone=function(){return!1},t.prototype[Symbol.iterator]=function(){var e=Object(this.value);return Symbol.iterator in e?e[Symbol.iterator]():{next:function(){return{done:!0,value:void 0}}}},t.prototype.unwrapOr=function(e){return this.value},t.prototype.expect=function(e){return this.value},t.prototype.unwrap=function(){return this.value},t.prototype.map=function(e){return tt(e(this.value))},t.prototype.mapOr=function(e,o){return o(this.value)},t.prototype.mapOrElse=function(e,o){return o(this.value)},t.prototype.or=function(e){return this},t.prototype.orElse=function(e){return this},t.prototype.andThen=function(e){return e(this.value)},t.prototype.toResult=function(e){return At(this.value)},t.prototype.safeUnwrap=function(){return this.value},t.prototype.toString=function(){return"Some(".concat(qt(this.value),")")},t.EMPTY=new t(void 0),t}(),tt=Rn,We;(function(t){function e(){for(var i=[],s=0;s<arguments.length;s++)i[s]=arguments[s];for(var a=[],u=0,c=i;u<c.length;u++){var d=c[u];if(d.isSome())a.push(d.value);else return d}return tt(a)}t.all=e;function o(){for(var i=[],s=0;s<arguments.length;s++)i[s]=arguments[s];for(var a=0,u=i;a<u.length;a++){var c=u[a];return c.isSome(),c}return P}t.any=o;function r(i){return i instanceof tt||i===P}t.isOption=r})(We||(We={}));var Dn=function(){function t(e){if(!(this instanceof t))return new t(e);this.error=e;var o=new Error().stack.split(`
`).slice(2);o&&o.length>0&&o[0].includes("ErrImpl")&&o.shift(),this._stack=o.join(`
`)}return t.prototype.isOk=function(){return!1},t.prototype.isErr=function(){return!0},t.prototype[Symbol.iterator]=function(){return{next:function(){return{done:!0,value:void 0}}}},t.prototype.else=function(e){return e},t.prototype.unwrapOr=function(e){return e},t.prototype.expect=function(e){throw new Error("".concat(e," - Error: ").concat(qt(this.error),`
`).concat(this._stack),{cause:this.error})},t.prototype.expectErr=function(e){return this.error},t.prototype.unwrap=function(){throw new Error("Tried to unwrap Error: ".concat(qt(this.error),`
`).concat(this._stack),{cause:this.error})},t.prototype.unwrapErr=function(){return this.error},t.prototype.map=function(e){return this},t.prototype.andThen=function(e){return this},t.prototype.mapErr=function(e){return new Et(e(this.error))},t.prototype.mapOr=function(e,o){return e},t.prototype.mapOrElse=function(e,o){return e(this.error)},t.prototype.or=function(e){return e},t.prototype.orElse=function(e){return e(this.error)},t.prototype.toOption=function(){return P},t.prototype.toString=function(){return"Err(".concat(qt(this.error),")")},Object.defineProperty(t.prototype,"stack",{get:function(){return"".concat(this,`
`).concat(this._stack)},enumerable:!1,configurable:!0}),t.prototype.toAsyncResult=function(){return new or(this)},t.EMPTY=new t(void 0),t}();var Et=Dn,Vn=function(){function t(e){if(!(this instanceof t))return new t(e);this.value=e}return t.prototype.isOk=function(){return!0},t.prototype.isErr=function(){return!1},t.prototype[Symbol.iterator]=function(){var e=Object(this.value);return Symbol.iterator in e?e[Symbol.iterator]():{next:function(){return{done:!0,value:void 0}}}},t.prototype.else=function(e){return this.value},t.prototype.unwrapOr=function(e){return this.value},t.prototype.expect=function(e){return this.value},t.prototype.expectErr=function(e){throw new Error(e)},t.prototype.unwrap=function(){return this.value},t.prototype.unwrapErr=function(){throw new Error("Tried to unwrap Ok: ".concat(qt(this.value)),{cause:this.value})},t.prototype.map=function(e){return new At(e(this.value))},t.prototype.andThen=function(e){return e(this.value)},t.prototype.mapErr=function(e){return this},t.prototype.mapOr=function(e,o){return o(this.value)},t.prototype.mapOrElse=function(e,o){return o(this.value)},t.prototype.or=function(e){return this},t.prototype.orElse=function(e){return this},t.prototype.toOption=function(){return tt(this.value)},t.prototype.safeUnwrap=function(){return this.value},t.prototype.toString=function(){return"Ok(".concat(qt(this.value),")")},t.prototype.toAsyncResult=function(){return new or(this)},t.EMPTY=new t(void 0),t}();var At=Vn,Ke;(function(t){function e(){for(var a=[],u=0;u<arguments.length;u++)a[u]=arguments[u];for(var c=[],d=0,h=a;d<h.length;d++){var p=h[d];if(p.isOk())c.push(p.value);else return p}return new At(c)}t.all=e;function o(){for(var a=[],u=0;u<arguments.length;u++)a[u]=arguments[u];for(var c=[],d=0,h=a;d<h.length;d++){var p=h[d];if(p.isOk())return p;c.push(p.error)}return new Et(c)}t.any=o;function r(a){try{return new At(a())}catch(u){return new Et(u)}}t.wrap=r;function i(a){try{return a().then(function(u){return new At(u)}).catch(function(u){return new Et(u)})}catch(u){return Promise.resolve(new Et(u))}}t.wrapAsync=i;function s(a){return a instanceof Et||a instanceof At}t.isResult=s})(Ke||(Ke={}));var ls=function(t,e,o,r){function i(s){return s instanceof o?s:new o(function(a){a(s)})}return new(o||(o=Promise))(function(s,a){function u(h){try{d(r.next(h))}catch(p){a(p)}}function c(h){try{d(r.throw(h))}catch(p){a(p)}}function d(h){h.done?s(h.value):i(h.value).then(u,c)}d((r=r.apply(t,e||[])).next())})},cs=function(t,e){var o={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},r,i,s,a;return a={next:u(0),throw:u(1),return:u(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function u(d){return function(h){return c([d,h])}}function c(d){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,d[0]&&(o=0)),o;)try{if(r=1,i&&(s=d[0]&2?i.return:d[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,d[1])).done)return s;switch(i=0,s&&(d=[d[0]&2,s.value]),d[0]){case 0:case 1:s=d;break;case 4:return o.label++,{value:d[1],done:!1};case 5:o.label++,i=d[1],d=[0];continue;case 7:d=o.ops.pop(),o.trys.pop();continue;default:if(s=o.trys,!(s=s.length>0&&s[s.length-1])&&(d[0]===6||d[0]===2)){o=0;continue}if(d[0]===3&&(!s||d[1]>s[0]&&d[1]<s[3])){o.label=d[1];break}if(d[0]===6&&o.label<s[1]){o.label=s[1],s=d;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(d);break}s[2]&&o.ops.pop(),o.trys.pop();continue}d=e.call(t,o)}catch(h){d=[6,h],i=0}finally{r=s=0}if(d[0]&5)throw d[1];return{value:d[0]?d[1]:void 0,done:!0}}},or=function(){function t(e){this.promise=Promise.resolve(e)}return t.prototype.andThen=function(e){var o=this;return this.thenInternal(function(r){return ls(o,void 0,void 0,function(){var i;return cs(this,function(s){return r.isErr()?[2,r]:(i=e(r.value),[2,i instanceof t?i.promise:i])})})})},t.prototype.map=function(e){var o=this;return this.thenInternal(function(r){return ls(o,void 0,void 0,function(){var i;return cs(this,function(s){switch(s.label){case 0:return r.isErr()?[2,r]:(i=At,[4,e(r.value)]);case 1:return[2,i.apply(void 0,[s.sent()])]}})})})},t.prototype.thenInternal=function(e){return new t(this.promise.then(e))},t}();function bt(t){return Object.assign(t.prototype,{find:function(e){for(let o of this)if(e(o))return tt(o);return P},count:function(e){return this.reduce((o,r)=>(e(r)&&o++,o),0)},reduce:function(e,o){let r=o;for(let i of this)r=e(r,i);return r},every:function(e){return!this.any(o=>!e(o))},any:function(e){for(let o of this)if(e(o))return!0;return!1},map:function(e){return this.filterMap(o=>tt(e(o)))},filter:function(e){return this.filterMap(o=>e(o)?tt(o):P)},enumerate:function(){let e=this;return bt(function*(){let o=0;for(let r of e)yield[o,r],o++})()},filterMap:function(e){let o=this;return bt(function*(){for(let r of o){let i=e(r);i.isSome()&&(yield i.unwrap())}})()},sort:function(e){let o=this.toArray();return o.sort(e),o},toArray:function(){return[...this]}}),t}Array.prototype.as_iter||(Array.prototype.as_iter=function(){let t=this;return bt(function*(){for(let e of t)yield e})()});Set.prototype.as_iter||(Set.prototype.as_iter=function(){let t=this;return bt(function*(){for(let e of t)yield e})()});Map.prototype.as_iter||(Map.prototype.as_iter=function(){let t=this;return bt(function*(){for(let e of t)yield e})()});var xe=/.^/,us={Av1:{name:"Av1",type:"video",mimetype:/av01.*/i,defacto_container:"WebM"},H264:{name:"H264",type:"video",mimetype:/avc1.*/i,defacto_container:"Mp4"},H263:{name:"H263",type:"video",mimetype:xe,defacto_container:"3gp"},H265:{name:"H265",type:"video",mimetype:/(hvc1|hevc|h265|h\.265).*/i,defacto_container:"Mp4"},MP4V:{name:"MP4V",type:"video",mimetype:/mp4v\.20.*/i,defacto_container:"Mp4"},MPEG1:{name:"MPEG1",type:"video",mimetype:xe,defacto_container:"Mpeg"},MPEG2:{name:"MPEG2",type:"video",mimetype:xe,defacto_container:"Mpeg"},Theora:{name:"Theora",type:"video",mimetype:/theora/i,defacto_container:"Ogg"},VP8:{name:"VP8",type:"video",mimetype:/vp0?8.*/i,defacto_container:"WebM"},VP9:{name:"VP9",type:"video",mimetype:/vp0?9.*/i,defacto_container:"WebM"},unknown:{name:"unknown",type:"video",mimetype:xe,defacto_container:"Mp4"}},ds={AAC:{name:"AAC",type:"audio",mimetype:/(aac|mp4a.40).*/i,defacto_container:"Mp4"},PCM:{name:"PCM",type:"audio",mimetype:/pcm.*/i,defacto_container:"Wav"},FLAC:{name:"FLAC",type:"audio",mimetype:/flac/i,defacto_container:"Flac"},MP3:{name:"MP3",type:"audio",mimetype:/(\.?mp3|mp4a\.69|mp4a\.6b).*/i,defacto_container:"Mpeg"},Opus:{name:"Opus",type:"audio",mimetype:/(opus|(mp4a\.ad.*))/i,defacto_container:"Ogg"},Vorbis:{name:"Vorbis",type:"audio",mimetype:/vorbis/i,defacto_container:"Ogg"},Wav:{name:"Wav",type:"audio",mimetype:xe,defacto_container:"Wav"},unknown:{name:"unknown",type:"audio",mimetype:xe,defacto_container:"Mp4"}},ps=bt(function*(){for(let t of Object.keys(us))yield us[t]}),hs=bt(function*(){for(let t of Object.keys(ds))yield ds[t]});var ms={Mp4:{name:"Mp4",extension:"mp4",audio_only_extension:"mp3",defacto_codecs:{audio:P,video:P},supported_video_codecs:["H264","H265","Av1","MP4V","MPEG2","unknown"],supported_audio_codecs:["Opus","MP3","FLAC","AAC","unknown"],mimetype:/(?:x-)?mp4/i},Mkv:{name:"Mkv",extension:"mkv",audio_only_extension:"mp3",defacto_codecs:{audio:P,video:P},supported_video_codecs:ps().filter(t=>t.name!="unknown").map(t=>t.name).toArray(),supported_audio_codecs:hs().filter(t=>t.name!="unknown").map(t=>t.name).toArray(),mimetype:/(?:x-)?matroska/i},WebM:{name:"WebM",extension:"webm",audio_only_extension:"oga",defacto_codecs:{audio:P,video:P},supported_video_codecs:["H264","VP8","VP9","Av1"],supported_audio_codecs:["Opus","Vorbis"],mimetype:/(?:x-)?webm/i},M2TS:{name:"M2TS",extension:"mt2s",audio_only_extension:"mp3",defacto_codecs:{audio:P,video:P},supported_video_codecs:["H264","H265","Av1","MP4V","MPEG2","VP9","unknown"],supported_audio_codecs:["Opus","MP3","FLAC","AAC"],mimetype:/(?:x-)?mts/i},MP2T:{name:"MP2T",extension:"mp2t",audio_only_extension:"mp3",defacto_codecs:{audio:tt("MP3"),video:tt("H264")},supported_video_codecs:["MPEG2","MPEG1"],supported_audio_codecs:["MP3"],mimetype:/(?:x-)?mp2t/i},Flash:{name:"Flash",extension:"flv",audio_only_extension:"mp3",defacto_codecs:{audio:P,video:P},supported_video_codecs:["H264"],supported_audio_codecs:["AAC"],mimetype:/(?:x-)?flv/i},M4V:{name:"M4V",extension:"m4v",audio_only_extension:"mp3",defacto_codecs:{audio:P,video:P},supported_video_codecs:["H264","H265","Av1","MP4V","MPEG2"],supported_audio_codecs:["Opus","MP3","FLAC","AAC"],mimetype:/(?:x-)?m4v/i},M4A:{name:"M4A",extension:"m4a",other_extensions:["aac"],audio_only_extension:"m4a",defacto_codecs:{audio:tt("AAC"),video:P},supported_video_codecs:[],supported_audio_codecs:["Opus","MP3","FLAC","AAC","unknown"],mimetype:/(?:x-)?m4a/i},Flac:{name:"Flac",extension:"flac",audio_only_extension:"flac",defacto_codecs:{audio:tt("FLAC"),video:P},supported_video_codecs:[],supported_audio_codecs:["FLAC"],mimetype:/(?:x-)?flac/i},Mpeg:{name:"Mpeg",extension:"mpeg",audio_only_extension:"mp3",defacto_codecs:{audio:tt("MP3"),video:tt("H264")},supported_video_codecs:["MPEG2","MPEG1"],supported_audio_codecs:["MP3"],mimetype:/(?:x-)?mpeg/i},Ogg:{name:"Ogg",extension:"ogv",audio_only_extension:"oga",defacto_codecs:{audio:P,video:P},supported_video_codecs:["VP9","VP8","Theora"],supported_audio_codecs:["Opus","Vorbis","FLAC"],mimetype:/(?:x-)?og./i},Wav:{name:"Wav",extension:"wav",audio_only_extension:"wav",defacto_codecs:{audio:tt("Wav"),video:P},supported_video_codecs:[],supported_audio_codecs:["Wav","PCM"],mimetype:/(?:x-)?(?:pn-)?wave?/i},"3gp":{name:"3gp",extension:"3gpp",audio_only_extension:"mp3",defacto_codecs:{audio:P,video:P},supported_video_codecs:["H264","H263","MP4V","VP8"],supported_audio_codecs:["MP3","AAC"],mimetype:/(?:x-)?3gpp2?/i},QuickTime:{name:"QuickTime",extension:"mov",audio_only_extension:"mp3",defacto_codecs:{audio:P,video:P},supported_video_codecs:["MPEG1","MPEG2"],supported_audio_codecs:[],mimetype:/(?:x-)?mov/i}},In=bt(function*(){for(let t of Object.keys(ms))yield t}),mA=bt(function*(){for(let t of In())yield ms[t]});var fs={240:{id:"240",loose_name:"Small"},360:{id:"360",loose_name:"SD"},480:{id:"480",loose_name:"SD"},720:{id:"720",loose_name:"HD"},1080:{id:"1080",loose_name:"FullHD"},1440:{id:"1440",loose_name:"UHD"},2160:{id:"2160",loose_name:"4K"},4320:{id:"4320",loose_name:"8K"}};var Bn=bt(function*(){for(let t of Object.keys(fs))yield t}),_A=bt(function*(){for(let t of Bn())yield fs[t]});var Hn=ur(er(),1);function ir(t,e){if(t==null||e===null||e===void 0)return t===e;if(t.constructor!==e.constructor)return!1;if(t instanceof Function||t instanceof RegExp)return t===e;if(t===e||t.valueOf()===e.valueOf())return!0;if(Array.isArray(t)&&t.length!==e.length||t instanceof Date||!(t instanceof Object)||!(e instanceof Object))return!1;let o=Object.keys(t),r=Object.keys(e).every(s=>o.indexOf(s)!==-1),i=o.every(s=>ir(t[s],e[s]));return r&&i}async function rr(t){let e=await sr.storage[t.where].get(t.name);if(t.name in e){let o=e[t.name];return t.hooks?t.hooks.getter(o,t):o}return t.default()}function gs(t,e){sr.storage[t.where].onChanged.addListener(o=>{let r=o[t.name];if(r){if(ir(r.oldValue,r.newValue))return;typeof r.newValue>"u"?e(t.default()):t.hooks?e(t.hooks.getter(r.newValue,t)):e(r.newValue)}})}var nr={name:"theme",default:()=>"system",where:"local"};Pe("/content2/shoelace/");var bs=window.matchMedia("(prefers-color-scheme:dark)"),ys=bs.matches,ar=await rr(nr),lr=()=>{let t=ar=="dark"||ar=="system"&&ys;document.documentElement.classList.toggle("sl-theme-dark",t)};bs.addEventListener("change",t=>{ys=t.matches,lr()});gs(nr,t=>{ar=t,lr()});lr();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
