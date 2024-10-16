// @notus.sh/cocooned@2.4.0 downloaded from https://ga.jspm.io/npm:@notus.sh/cocooned@2.4.0/index.js

class Emitter{constructor(t=["cocooned"]){this.#t=t}emit(t,e,i={}){return!this.#e(t,e,i).some((t=>t.defaultPrevented))}#t;#e(t,e,i={}){const r=this.#i(e,i);r.forEach((e=>this.#r(t,e)));return r}#r(t,e){return t.dispatchEvent(e)}#i(t,e){return this.#t.map((i=>this.#n(`${i}:${t}`,e)))}#n(t,e){return new CustomEvent(t,{bubbles:true,cancelable:true,detail:e})}}function uuidv4(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)))}function hideMarkedForDestruction(t,e){e.forEach((e=>{const i=e.querySelector('input[type=hidden][name$="[_destroy]"]');i!==null&&i.getAttribute("value")==="true"&&t.hide(e,{animate:false})}))}function defaultAnimator(t,e=false){e&&(t.dataset.cocoonedScrollHeight=t.scrollHeight);return[{height:`${t.dataset.cocoonedScrollHeight}px`,opacity:1},{height:`${t.dataset.cocoonedScrollHeight}px`,opacity:0},{height:0,opacity:0}]}const t=Object.create(null);class Base{static get defaultOptions(){const t=document.createElement("div");return{animate:"animate"in t&&typeof t.animate==="function",animator:defaultAnimator,duration:450}}static get eventNamespaces(){return["cocooned"]}static get selectors(){return{container:["[data-cocooned-container]",".cocooned-container"],item:["[data-cocooned-item]",".cocooned-item"]}}static getInstance(e){return t[e]}constructor(t,e){this._container=t;this._uuid=uuidv4();this._options=this.constructor._normalizeOptions({...this.constructor.defaultOptions,..."cocoonedOptions"in t.dataset?JSON.parse(t.dataset.cocoonedOptions):{},...e||{}})}get container(){return this._container}get options(){return this._options}start(){this.container.dataset.cocoonedContainer=true;this.container.dataset.cocoonedUuid=this._uuid;t[this._uuid]=this;const hideDestroyed=()=>{hideMarkedForDestruction(this,this.items)};hideDestroyed();this.container.ownerDocument.addEventListener("page:load",hideDestroyed);this.container.ownerDocument.addEventListener("turbo:load",hideDestroyed);this.container.ownerDocument.addEventListener("turbolinks:load",hideDestroyed)}notify(t,e,i){return this._emitter.emit(t,e,i)}get items(){return Array.from(this.container.querySelectorAll(this._selector("item"))).filter((t=>this.toContainer(t)===this.container)).filter((t=>!("display"in t.style&&t.style.display==="none")))}toContainer(t){return t.closest(this._selector("container"))}toItem(t){return t.closest(this._selector("item"))}contains(t){return this.items.includes(this.toItem(t))}hide(t,e={}){const i=this._animationOptions(e);const r=i.animator(t,true);const after=()=>{t.style.display="none"};return i.animate?t.animate(r,i.duration).finished.then(after).then((()=>t)):Promise.resolve(after()).then((()=>t))}show(t,e={}){const i=this._animationOptions(e);const r=i.animator(t,false).reverse();const before=()=>{t.style.display=null};const n=Promise.resolve(before());return i.animate?n.then((()=>t.animate(r,i.duration).finished)).then((()=>t)):n.then((()=>t))}static _normalizeOptions(t){return t}_container;_options;__uuid;__emitter;get _emitter(){typeof this.__emitter==="undefined"&&(this.__emitter=new Emitter(this.constructor.eventNamespaces));return this.__emitter}_selectors(t){return this.constructor.selectors[t]}_selector(t){return this._selectors(t).join(", ")}_animationOptions(t){const e=(({animate:t,animator:e,duration:i})=>({animate:t,animator:e,duration:i}))(this._options);return{...e,...t}}}class Trigger{constructor(t,e){this._trigger=t;this._cocooned=e}get trigger(){return this._trigger}handle(t){throw new TypeError("handle() must be defined in subclasses")}_cocooned;_trigger;get _item(){return this._cocooned.toItem(this._trigger)}get _notified(){return this._item}_notify(t,e){return this._cocooned.notify(this._notified,t,this._eventData(e))}_eventData(t){return{link:this._trigger,node:this._item,cocooned:this._cocooned,originalEvent:t}}_hide(t,e){return this._cocooned.hide(t,e)}_show(t,e){return this._cocooned.show(t,e)}}class Builder{constructor(t,e){this.#s=t;this.#o=e}build(t){const e=this.#s.cloneNode(true);this.#a(e,t);return e}#s;#o;#a(t,e){this.#o.forEach((i=>{t.querySelectorAll(`${i.tag}[${i.attribute}]`).forEach((t=>i.apply(t,e)))}));t.querySelectorAll("template").forEach((t=>{this.#a(t.content,e)}))}}class Traverser{constructor(t,e){this.#c=t;this.#d=e}resolve(t){if(this.#d in this.#c&&typeof this.#c[this.#d]==="function")return this._tryMethod(this.#d,t);if(this.#d in this.#c)return this._tryProperty(this.#d);const e=`_${this.#d}`;return e in this?this[e](t):null}#c;#d;_tryMethod(t,e){try{const i=this.#c[t](e);if(i instanceof HTMLElement)return i}catch(t){}return null}_tryProperty(t){const e=this.#c[t];return e instanceof HTMLElement?e:null}_parent(t){return this.#c.parentElement.matches(t)?this.#c.parentElement:null}_prev(t){return this.#c.previousElementSibling.matches(t)?this.#c.previousElementSibling:null}_next(t){return this.#c.nextElementSibling.matches(t)?this.#c.nextElementSibling:null}_siblings(t){return this.#c.parentElement.querySelector(t)}}class Deprecator{logger;package;version;constructor(t,e,i){this.version=t;this.package=e;this.logger=i}warn(t,e=null){if(t in this.#e)return;const i=`${t}. It will be removed from ${this.package} ${this.version}`;const r=e!==null?`, use ${e} instead`:"";this.logger.warn(`DEPRECATION WARNING: ${i}${r}.`);this.#e[t]=true}#e=Object.create(null)}const e=Object.create(null);function deprecator(t,i="Cocooned",r=console){const n=[t,i].join("#");n in e||(e[n]=new Deprecator(t,i,r));return e[n]}class Extractor{constructor(t,e){this.#l=t;this.#h=e}extract(){return["builder","count","node","method"].reduce(((t,e)=>{const i=`_extract${e.charAt(0).toUpperCase()+e.slice(1)}`;const r=this[i]();r!==null&&(t[e]=r);return t}),{})}#h;#l;get#u(){return this.#l.dataset}_extractBuilder(){if(!("template"in this.#u&&"association"in this.#u))return null;const find=t=>t?.querySelector(`template[data-name="${this.#u.template}"]`);const t=find(this.#h.toItem(this.#l))||find(document);return t===null?null:new Builder(t.content,this.#h.replacementsFor(`new_${this.#u.association}`))}_extractCount(){return"associationInsertionCount"in this.#u?parseInt(this.#u.associationInsertionCount,10):"count"in this.#u?parseInt(this.#u.count,10):null}_extractMethod(){return"associationInsertionMethod"in this.#u?this.#u.associationInsertionMethod:"before"}_extractNode(){if(!("associationInsertionNode"in this.#u))return this.#l.parentElement;const t=this.#u.associationInsertionNode;if(t==="this")return this.#l;if(!("associationInsertionTraversal"in this.#u))return this.#l.ownerDocument.querySelector(t);deprecator("3.0").warn("associationInsertionTraversal is deprecated");const e=new Traverser(this.#l,this.#u.associationInsertionTraversal);return e.resolve(t)}}class Validator{static validates(t){const e=new Validator(t);return e.validates()}constructor(t){this.#m=t}validates(){const t=new Set(Object.keys(this.#m));const e=new Set(["builder","count","node","method"]);const i=new Set(Array.from(e.values()).filter((e=>!t.has(e))));if(i.size!==0)throw new TypeError(`Missing options: ${Array.from(i.values()).join(", ")}`);this._validateBuilder();this._validateMethod()}#m;_validateBuilder(){const t=this.#m.builder;if(!(t instanceof Builder))throw new TypeError(`Invalid builder option: instance of Builder expected, got ${t.constructor.name}`)}_validateMethod(){const t=this.#m.method;const e=["after","before","append","prepend","replaceWith"];if(!e.includes(t))throw new TypeError(`Invalid method option: expected one of ${e.join(", ")}, got ${t}`)}}let i=0;function uniqueId(){return`${(new Date).getTime()}${i++}`}class Add extends Trigger{static create(t,e){const i=new Extractor(t,e);return new Add(t,e,i.extract())}constructor(t,e,i={}){super(t,e);this.#m={...this.#m,...i};Validator.validates(this.#m)}get insertionNode(){return this.#m.node}handle(t){for(let e=0;e<this.#m.count;e++){this.#p=this._build();if(!this._notify("before-insert",t))return false;this._insert();this._notify("after-insert",t)}}#p;#m={count:1};get _item(){return this.#p}get _notified(){return this.#m.node}_insert(){this.#m.node[this.#m.method](this._item)}_build(){return this.#m.builder.build(uniqueId()).firstElementChild}}class Remove extends Trigger{handle(t){if(!this._notify("before-remove",t))return false;this._hide(this._item).then((()=>{this._remove();this._notify("after-remove",t)}))}#g;get _notified(){typeof this.#g==="undefined"&&(this.#g=this._item.parentElement);return this.#g}_remove(){this._removable()?this._item.remove():this._markForDestruction()}_removable(){return this._trigger.matches(".dynamic")||"cocoonedPersisted"in this._trigger.dataset&&this._trigger.dataset.cocoonedPersisted==="false"}_markForDestruction(){this._item.querySelector('input[type=hidden][name$="[_destroy]"]').setAttribute("value","true");this._item.querySelectorAll("input[required], select[required]").forEach((t=>t.removeAttribute("required")))}}const r=/[\\^$.*+?()[\]{}|]/g;const n=RegExp(r.source);class Replacement{attribute;tag;constructor({tag:t="*",attribute:e,association:i,delimiters:r}){this.attribute=e;this.tag=t;this.#_=i;this.#f=r[0];this.#v=r[r.length-1]}apply(t,e){const i=t.getAttribute(this.attribute);this.#y.test(i)&&t.setAttribute(this.attribute,i.replace(this.#y,this.#b(e)))}#_;#f;#v;#b(t){return`${this.#f}${t}${this.#v}$1`}get#y(){const t=this.#E(`${this.#f}${this.#_}${this.#v}`);return new RegExp(`${t}(.*?)`,"g")}#E(t){return t&&n.test(t)?t.replace(r,"\\$&"):t||""}}function clickHandler$1(t){return e=>{e.preventDefault();t(e)}}function delegatedClickHandler(t,e){const i=clickHandler$1(e);return e=>{const{target:r}=e;r.closest(t)!==null&&i(e)}}function itemDelegatedClickHandler(t,e,i){const r=delegatedClickHandler(e,i);return e=>{t.contains(e.target)&&r(e)}}const coreMixin=t=>class extends t{static registerReplacement({tag:t="*",attribute:e,delimiters:i}){this.__replacements.push({tag:t,attribute:e,delimiters:i})}static get replacements(){return this.__replacements}static replacementsFor(t){return this.replacements.map((e=>new Replacement({association:t,...e})))}static get selectors(){return{...super.selectors,"triggers.add":['[data-cocooned-trigger="add"]',".cocooned-add"],"triggers.remove":['[data-cocooned-trigger="remove"]',".cocooned-remove"]}}start(){super.start();this.addTriggers=Array.from(this.container.ownerDocument.querySelectorAll(this._selector("triggers.add"))).map((t=>Add.create(t,this))).filter((t=>this.toContainer(t.insertionNode)===this.container));this.addTriggers.forEach((t=>t.trigger.addEventListener("click",clickHandler$1((e=>t.handle(e))))));this.container.addEventListener("click",itemDelegatedClickHandler(this,this._selector("triggers.remove"),(t=>{const e=new Remove(t.target,this);e.handle(t)})))}replacementsFor(t){return this.constructor.replacementsFor(t)}static __replacements=[{tag:"label",attribute:"for",delimiters:["_"]},{tag:"*",attribute:"id",delimiters:["_"]},{tag:"*",attribute:"name",delimiters:["[","]"]},{tag:"trix-editor",attribute:"input",delimiters:["_"]}]};let s=class Cocooned extends(coreMixin(Base)){static create(t,e){if("cocoonedUuid"in t.dataset)return Cocooned.getInstance(t.dataset.cocoonedUuid);const i=new this.constructor(t,e);i.start();return i}static start(){document.querySelectorAll("[data-cocooned-container], [data-cocooned-options]").forEach((t=>this.constructor.create(t)))}};const limitMixin=t=>class extends t{static get defaultOptions(){return{...super.defaultOptions,limit:false}}start(){super.start();this.options.limit!==false&&this.container.addEventListener("cocooned:before-insert",(t=>{if(!(this.items.length<this.options.limit)){t.preventDefault();this.notify(this.container,"limit-reached",t.detail)}}))}};class Move extends Trigger{handle(t){if(this._pivotItem!==null){if(!this._notify("before-move",t))return false;this._hide(this._item).then((()=>{this._move();this._show(this._item).then((()=>this._notify("after-move",t)))}))}}get _pivotItem(){throw new TypeError("_pivotItem() must be defined in subclasses")}_move(){throw new TypeError("_move() must be defined in subclasses")}_findPivotItem(t,e){let i=t;do{i=i[e];if(i!==null&&this._cocooned.contains(i))break}while(i!==null);return i}}class Up extends Move{#w;get _pivotItem(){typeof this.#w==="undefined"&&(this.#w=this._findPivotItem(this._item,"previousElementSibling"));return this.#w}_move(){this._pivotItem.before(this._item)}}class Down extends Move{#w;get _pivotItem(){typeof this.#w==="undefined"&&(this.#w=this._findPivotItem(this._item,"nextElementSibling"));return this.#w}_move(){this._pivotItem.after(this._item)}}class Reindexer{constructor(t,e=0){this.#h=t;this.#x=e}reindex(t){if(!this.#I("before-reindex",t))return false;this.#$.forEach(((t,e)=>t.setAttribute("value",e+this.#x)));this.#I("after-reindex",t)}#h;#x;get#$(){return this.#D.map((t=>t.querySelector('input[name$="[position]"]')))}get#D(){return this.#h.items}#I(t,e){return this.#h.notify(this.#h.container,t,this.#A(e))}#A(t){return{nodes:this.#D,cocooned:this.#h,originalEvent:t}}}function clickHandler(t,e,i){return itemDelegatedClickHandler(t,e,(e=>{const r=new i(e.target,t);r.handle(e)}))}const reorderableMixin=t=>class extends t{static get defaultOptions(){return{...super.defaultOptions,reorderable:false}}static get selectors(){return{...super.selectors,"triggers.up":['[data-cocooned-trigger="up"]',".cocooned-move-up"],"triggers.down":['[data-cocooned-trigger="down"]',".cocooned-move-down"]}}start(){super.start();if(this.options.reorderable===false)return;this.container.addEventListener("cocooned:after-insert",(t=>this._reindexer.reindex(t)));this.container.addEventListener("cocooned:after-remove",(t=>this._reindexer.reindex(t)));this.container.addEventListener("cocooned:after-move",(t=>this._reindexer.reindex(t)));const t=this.container.closest("form");t!==null&&t.addEventListener("submit",(t=>this._reindexer.reindex(t)));this.container.addEventListener("click",clickHandler(this,this._selector("triggers.up"),Up));this.container.addEventListener("click",clickHandler(this,this._selector("triggers.down"),Down))}static _normalizeOptions(t){const e=super._normalizeOptions(t);typeof e.reorderable==="boolean"&&e.reorderable&&(e.reorderable={startAt:1});return e}#S;get _reindexer(){typeof this.#S==="undefined"&&(this.#S=new Reindexer(this,this.options.reorderable.startAt));return this.#S}};const cocoonSupportMixin=t=>class extends t{static get eventNamespaces(){return[...super.eventNamespaces,"cocoon"]}static get selectors(){const t=super.selectors;t.item.push(".nested-fields");t["triggers.add"].push(".add_fields");t["triggers.remove"].push(".remove_fields");return t}};class Cocooned extends(reorderableMixin(limitMixin(cocoonSupportMixin(s)))){static create(t,e={}){if("cocoonedUuid"in t.dataset)return Cocooned.getInstance(t.dataset.cocoonedUuid);const i=new Cocooned(t,e);i.start();return i}static start(){document.querySelectorAll("[data-cocooned-container], [data-cocooned-options]").forEach((t=>Cocooned.create(t)))}}export{Cocooned as default};

