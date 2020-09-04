!function(){"use strict";const t={cardSource:"https://github.com/maxwroc/battery-state-card/releases/download/v1.4.0/battery-state-card.js",config:'type: "battery-state-card"\ntitle: Filters\nsort_by_level: "asc"\nbulk_rename:\n  - from: "Battery Level" # simple string replace (note: "to" is not required if you want to remove string)\n    to: "sensor"\n  - from: "/\\\\s(temperature|temp)\\\\s/" # regular expression\n    to: " temp. "\nfilter:\n  include: # filters for auto-adding\n    - name: entity_id # entities which id ends with "_battery_level"\n      operator: matches\n      value: "*_battery_level"\n    - name: attributes.device_class # and entities which device_class attribute equals "battery"\n      value: "battery"\n    - name: attributes.battery_level\n  exclude:\n    - name: state\n      value: 100',hassState:{"switch.living_room":{entity_id:"switch.living_room",state:"off",attributes:{temperature:0,battery_level:60,device_class:"battery",friendly_name:"Living room switch"}},"sensor.motion_sensor_battery_level":{entity_id:"sensor.motion_sensor_battery_level",state:22,attributes:{friendly_name:"Motion sensor Battery Level"}},"sensor.living_room_temp":{entity_id:"sensor.living_room_temp",state:40,attributes:{friendly_name:"Living room temperature Battery Level",device_class:"battery"}},"switch.living_room2":{entity_id:"switch.living_room2",state:"off",attributes:{temperature:0,battery_level:100,device_class:"battery",friendly_name:"Living room switch 2"}},"sensor.motion_sensor_battery_level2":{entity_id:"sensor.motion_sensor_battery_level2",state:100,attributes:{friendly_name:"Motion sensor Battery Level 2"}},"sensor.living_room_temp2":{entity_id:"sensor.living_room_temp2",state:100,attributes:{friendly_name:"Living room temperature Battery Level 2",device_class:"battery"}}}};class e{static getData(){const e=new URL(location.href).searchParams.get("key");return e?i.get(e):new Promise((e,i)=>{e(s.get()||t)})}static onSave(t){return i.save(t)}static onUpdate(t){s.save(t)}}class s{static get(){const t=localStorage.getItem(s.key);return t?JSON.parse(t):null}static save(t){localStorage.setItem(s.key,JSON.stringify(t))}}s.key="config";class i{static save(t){return new Promise((e,s)=>{$.ajax({url:"https://api.jsonbin.io/b",method:"POST",contentType:"application/json",headers:{"secret-key":i.secret},data:JSON.stringify(t)}).done(t=>e(t)).fail(t=>s(t))})}static get(t){return new Promise((e,s)=>{$.ajax({url:"https://api.jsonbin.io/b/"+t,headers:{"secret-key":i.secret}}).done(t=>e(t)).fail(t=>s(t))})}}i.secret="$2b$10$/FL2EcEvEoUO19I7bO5da.q0YYqAgmTANU2kvh.WBP8FYTdP.6UYa";const r=new class{constructor(){this.elem=null}container(){return this.elem&&(this.elem=$("#errorLog")),this.elem}log(t){let e=this.container().text();e&&(e+="\n"),this.container().text(e+t)}clear(){this.container().text("")}};class n{constructor(t){this.cardSource="",this.cardType="",this.card=null,this.config=null,this.cardLoaded=!1,this.cardSource=t.cardSource,this.addCardSource(t.cardSource),this.editor={config:new CodeFlask("#configEditor",{language:"yaml",lineNumbers:!0}),state:new CodeFlask("#haStateEditor",{language:"json",lineNumbers:!0})},this.editor.config.addLanguage("yaml",CodeLangs.languages.yaml),this.editor.config.updateCode(t.config),this.editor.state.addLanguage("json",CodeLangs.languages.json),this.editor.state.updateCode(JSON.stringify(t.hassState,null,2)),this.editor.config.onUpdate(()=>this.updateConfig()),this.editor.state.onUpdate(()=>this.updateState()),$("#save").click(()=>this.save(t)),this.updateConfig()}addCardSource(t){const e=document.createElement("script");e.setAttribute("src",t),e.setAttribute("type","text/javascript"),$("head").append(e)}loadCard(){this.cardLoaded=!1,customElements.whenDefined(this.cardType).then(()=>{this.card=document.createElement(this.cardType.replace("custom:","")),this.card.setConfig(this.config),$("#cardContainer").html("").append(this.card),this.cardLoaded=!0,this.updateConfig()})}updateConfig(){let t=-1;try{if(this.config=jsyaml.load(this.editor.config.getCode()),!this.config.type)throw new Error("Missing propery 'type' in card configuration");if(this.config.type!=this.cardType)return this.cardType=this.config.type,void this.loadCard();if(!this.cardLoaded)return;try{this.card.setConfig(this.config)}catch(t){r.log("Error updating card config: "+t.message)}this.updateState()}catch(e){e.mark?t=e.mark.line:console.log(e)}setTimeout(()=>{$("#configEditor .codeflask__lines__line").each((e,s)=>{$(s).css("backgroundColor",e==t?"#ffacac":"none")})})}updateState(){if(!this.cardLoaded)return;const t=this.editor.state.getCode();let s=-1;try{const s={states:JSON.parse(t),localize:t=>`[${t}]`};try{this.card.hass=s}catch(t){r.log("Error setting card state: "+t.message)}e.onUpdate({cardSource:this.cardSource,config:this.editor.config.getCode(),hassState:JSON.parse(this.editor.state.getCode())})}catch(e){const i="in JSON at position ",r=e.message.indexOf(i);if(-1!=r){const n=Number(e.message.substr(r+i.length));s=t.split("\n").length-t.substr(n).split("\n").length}else console.log(e)}setTimeout(()=>{$("#haStateEditor .codeflask__lines__line").each((t,e)=>{$(e).css("backgroundColor",t==s?"#ffacac":"none")})})}save(t){$("#save").prop("disabled",!0),e.onSave({cardSource:t.cardSource,config:this.editor.config.getCode(),hassState:JSON.parse(this.editor.state.getCode())}).then(t=>{$("#save").prop("disabled",!1);let e="Something went wrong";try{if(t.success){const s=new URL(location.href);s.searchParams.set("key",t.id),e=s.href,document.title=this.cardType+" - Lovelace card tester",window.history.replaceState(null,document.title,e)}else console.log(t),e="Failed to save the data"}catch(t){e="Error: "+t.message}$("#savedLink").val(e)}).catch(t=>{$("#save").prop("disabled",!1),r.log(t.message)})}}
/*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
const o="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,a=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},l=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${l}--\x3e`,d=new RegExp(`${l}|${c}`),h="$lit$";class p{constructor(t,e){this.parts=[],this.element=e;const s=[],i=[],r=document.createTreeWalker(e.content,133,null,!1);let n=0,o=-1,a=0;const{strings:c,values:{length:p}}=t;for(;a<p;){const t=r.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)u(e[t].name,h)&&i++;for(;i-- >0;){const e=c[a],s=y.exec(e)[2],i=s.toLowerCase()+h,r=t.getAttribute(i);t.removeAttribute(i);const n=r.split(d);this.parts.push({type:"attribute",index:o,name:s,strings:n}),a+=n.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),r.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(l)>=0){const i=t.parentNode,r=e.split(d),n=r.length-1;for(let e=0;e<n;e++){let s,n=r[e];if(""===n)s=g();else{const t=y.exec(n);null!==t&&u(t[2],h)&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-h.length)+t[3]),s=document.createTextNode(n)}i.insertBefore(s,t),this.parts.push({type:"node",index:++o})}""===r[n]?(i.insertBefore(g(),t),s.push(t)):t.data=r[n],a+=n}}else if(8===t.nodeType)if(t.data===l){const e=t.parentNode;null!==t.previousSibling&&o!==n||(o++,e.insertBefore(g(),t)),n=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(s.push(t),o--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(l,e+1));)this.parts.push({type:"node",index:-1}),a++}}else r.currentNode=i.pop()}for(const t of s)t.parentNode.removeChild(t)}}const u=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},m=t=>-1!==t.index,g=()=>document.createComment(""),y=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function f(t,e){const{element:{content:s},parts:i}=t,r=document.createTreeWalker(s,133,null,!1);let n=v(i),o=i[n],a=-1,l=0;const c=[];let d=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-l,n=v(i,n),o=i[n]}c.forEach(t=>t.parentNode.removeChild(t))}const _=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},v=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(m(e))return s}return-1};
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
const S=new WeakMap,b=t=>"function"==typeof t&&S.has(t),V={},w={};
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
class H{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],s=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let r,n=0,a=0,l=i.nextNode();for(;n<s.length;)if(r=s[n],m(r)){for(;a<r.index;)a++,"TEMPLATE"===l.nodeName&&(e.push(l),i.currentNode=l.content),null===(l=i.nextNode())&&(i.currentNode=e.pop(),l=i.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));n++}else this.__parts.push(void 0),n++;return o&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */const C=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),x=` ${l} `;class A{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let i=0;i<t;i++){const t=this.strings[i],r=t.lastIndexOf("\x3c!--");s=(r>-1||s)&&-1===t.indexOf("--\x3e",r+1);const n=y.exec(t);e+=null===n?t+(s?x:c):t.substr(0,n.index)+n[1]+n[2]+h+n[3]+l}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==C&&(e=C.createHTML(e)),t.innerHTML=e,t}}
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */const P=t=>null===t||!("object"==typeof t||"function"==typeof t),N=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class M{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new T(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!N(t))return t}let i="";for(let r=0;r<e;r++){i+=t[r];const e=s[r];if(void 0!==e){const t=e.value;if(P(t)||!N(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class T{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===V||P(t)&&t===this.value||(this.value=t,b(t)||(this.committer.dirty=!0))}commit(){for(;b(this.value);){const t=this.value;this.value=V,t(this)}this.value!==V&&this.committer.commit()}}class E{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(g()),this.endNode=t.appendChild(g())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=g()),t.__insert(this.endNode=g())}insertAfterPart(t){t.__insert(this.startNode=g()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;b(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=V,t(this)}const t=this.__pendingValue;t!==V&&(P(t)?t!==this.value&&this.__commitText(t):t instanceof A?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):N(t)?this.__commitIterable(t):t===w?(this.value=w,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof H&&this.value.template===e)this.value.update(t.values);else{const s=new H(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const r of t)s=e[i],void 0===s&&(s=new E(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(r),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){a(this.startNode.parentNode,t.nextSibling,this.endNode)}}class k{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;b(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=V,t(this)}if(this.__pendingValue===V)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=V}}class L extends M{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new O(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class O extends T{}let U=!1;(()=>{try{const t={get capture(){return U=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class j{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;b(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=V,t(this)}if(this.__pendingValue===V)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=R(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=V}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const R=t=>t&&(U?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */;function Z(t){let e=q.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},q.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(l);return s=e.keyString.get(i),void 0===s&&(s=new p(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const q=new Map,z=new WeakMap;
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */const F=new
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
class{handleAttributeExpressions(t,e,s,i){const r=e[0];if("."===r){return new L(t,e.slice(1),s).parts}if("@"===r)return[new j(t,e.slice(1),i.eventContext)];if("?"===r)return[new k(t,e.slice(1),s)];return new M(t,e,s).parts}handleTextExpression(t){return new E(t)}};
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I=(t,...e)=>new A(t,e,"html",F)
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */,B=(t,e)=>`${t}--${e}`;let J=!0;void 0===window.ShadyCSS?J=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),J=!1);const W=t=>e=>{const s=B(e.type,t);let i=q.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},q.set(s,i));let r=i.stringsArray.get(e.strings);if(void 0!==r)return r;const n=e.strings.join(l);if(r=i.keyString.get(n),void 0===r){const s=e.getTemplateElement();J&&window.ShadyCSS.prepareTemplateDom(s,t),r=new p(e,s),i.keyString.set(n,r)}return i.stringsArray.set(e.strings,r),r},D=["html","svg"],Y=new Set,G=(t,e,s)=>{Y.add(t);const i=s?s.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:n}=r;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<n;t++){const e=r[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{D.forEach(e=>{const s=q.get(B(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),f(t,s)})})})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:r}=t;if(null==s)return void i.appendChild(e);const n=document.createTreeWalker(i,133,null,!1);let o=v(r),a=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===s&&(a=_(e),s.parentNode.insertBefore(e,s));-1!==o&&r[o].index===l;){if(a>0){for(;-1!==o;)r[o].index+=a,o=v(r,o);return}o=v(r,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),f(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const K={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},Q=(t,e)=>e!==t&&(e==e||t==t),X={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:Q},tt="finalized";class et extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=X){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdateInternal(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||X}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(tt)||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=Q){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||K,r="function"==typeof i?i:i.fromAttribute;return r?r(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||K.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=X){const i=this.constructor,r=i._attributeNameForProperty(t,s);if(void 0!==r){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const r=this.constructor;s=s||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}et.finalized=!0;
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
const st=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(s){s.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};
/**
  @license
  Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at
  http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
  http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
  found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
  part of the polymer project is also subject to an additional IP rights grant
  found at http://polymer.github.io/PATENTS.txt
  */
const it=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol();class nt{constructor(t,e){if(e!==rt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(it?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ot=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof nt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new nt(s,rt)};
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const at={};class lt extends et{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t),s),s=e(t,new Set),i=[];s.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!it){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new nt(String(e),rt)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?it?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==at&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return at}}lt.finalized=!0,lt.render=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const i=s.scopeName,r=z.has(e),n=J&&11===e.nodeType&&!!e.host,o=n&&!Y.has(i),l=o?document.createDocumentFragment():e;if(((t,e,s)=>{let i=z.get(e);void 0===i&&(a(e,e.firstChild),z.set(e,i=new E(Object.assign({templateFactory:Z},s))),i.appendInto(e)),i.setValue(t),i.commit()})(t,l,Object.assign({templateFactory:W(i)},s)),o){const t=z.get(l);z.delete(l);const s=t.value instanceof H?t.value.template:void 0;G(i,l,s),a(e,e.firstChild),e.appendChild(l),z.set(e,t)}!r&&n&&window.ShadyCSS.styleElement(e.host)};class ct extends lt{constructor(){super(...arguments),this.css=ot,this.html=I}}ct.prototype.css=ot,ct.prototype.html=I;class dt extends lt{constructor(){super(...arguments),this.icons={"mdi:battery-outline":"M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery-10":"M16,18H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery-20":"M16,17H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery-30":"M16,15H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery-40":"M16,14H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery-50":"M16,13H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery-60":"M16,12H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery-70":"M16,10H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery-80":"M16,9H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery-90":"M16,8H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery":"M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","mdi:battery-charging-outline":"M23.05,11H20.05V4L15.05,14H18.05V22M12,20H4L4.05,6H12.05M12.72,4H11.05V2H5.05V4H3.38A1.33,1.33 0 0,0 2.05,5.33V20.67C2.05,21.4 2.65,22 3.38,22H12.72C13.45,22 14.05,21.4 14.05,20.67V5.33A1.33,1.33 0 0,0 12.72,4Z","mdi:battery-charging-10":"M23.05,11H20.05V4L15.05,14H18.05V22M12,18H4L4.05,6H12.05M12.72,4H11.05V2H5.05V4H3.38A1.33,1.33 0 0,0 2.05,5.33V20.67C2.05,21.4 2.65,22 3.38,22H12.72C13.45,22 14.05,21.4 14.05,20.67V5.33A1.33,1.33 0 0,0 12.72,4Z","mdi:battery-charging-20":"M23.05,11H20.05V4L15.05,14H18.05V22M12.05,17H4.05V6H12.05M12.72,4H11.05V2H5.05V4H3.38A1.33,1.33 0 0,0 2.05,5.33V20.67C2.05,21.4 2.65,22 3.38,22H12.72C13.45,22 14.05,21.4 14.05,20.67V5.33A1.33,1.33 0 0,0 12.72,4Z","mdi:battery-charging-30":"M12,15H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4M23,11H20V4L15,14H18V22L23,11Z","mdi:battery-charging-40":"M23,11H20V4L15,14H18V22M12,13H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z","mdi:battery-charging-50":"M23,11H20V4L15,14H18V22M12,13H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z","mdi:battery-charging-60":"M12,11H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4M23,11H20V4L15,14H18V22L23,11Z","mdi:battery-charging-70":"M12,10H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4M23,11H20V4L15,14H18V22L23,11Z","mdi:battery-charging-80":"M23,11H20V4L15,14H18V22M12,9H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z","mdi:battery-charging-90":"M23,11H20V4L15,14H18V22M12,8H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z","mdi:battery-charging-100":"M23,11H20V4L15,14H18V22M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z"},this.icon=""}static get styles(){return ot`
        :host {
            display: block;
            align-items: center;
            justify-content: center;
            position: relative;
            vertical-align: middle;
            fill: currentcolor;
            width: var(--mdc-icon-size, 24px);
            height: var(--mdc-icon-size, 24px);
            margin: 13px;
        }
        `}render(){return I`<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="${this.icons[this.icon]}" /></svg>`}}var ht;!function(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);n>3&&o&&Object.defineProperty(e,s,o)}([(ht={type:String},(t,e)=>void 0!==e?((t,e,s)=>{e.constructor.createProperty(s,t)})(ht,t,e):st(ht,t))],dt.prototype,"icon",void 0),customElements.define("home-assistant-main",class extends ct{render(){return I`<p>home-assistant-main</p>`}}),customElements.define("ha-card",class extends lt{static get styles(){return ot`
        :host {
            display: block;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: #434954;
            margin: 10px;
        }
        .card-header, :host ::slotted(.card-header) {
            color: var(--ha-card-header-color, --primary-text-color);
            font-family: var(--ha-card-header-font-family, inherit);
            font-size: var(--ha-card-header-font-size, 24px);
            letter-spacing: -0.012em;
            line-height: 32px;
            display: block;
            padding: 24px 16px 16px;
        }
        :host ::slotted(.card-content) {
            padding: 16px;
        }
        :host ::slotted(.card-content:not(:first-child)), slot:not(:first-child)::slotted(.card-content) {
            padding-top: 0px;
            margin-top: -8px;
        }
        `}render(){return I`<slot></slot>`}}),customElements.define("ha-icon",dt),$(()=>{e.getData().then(t=>new n(t)).catch(t=>{r.log("string"!=typeof t?JSON.stringify(t):t)})})}();
//# sourceMappingURL=index.js.map
