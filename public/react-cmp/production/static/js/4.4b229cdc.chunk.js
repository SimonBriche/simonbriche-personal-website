(this["webpackJsonpreact-cmp"]=this["webpackJsonpreact-cmp"]||[]).push([[4],{13:function(t,e,r){t.exports=r(14)},14:function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(I){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof y?e:y,a=Object.create(o.prototype),i=new k(n||[]);return a._invoke=function(t,e,r){var n=h;return function(o,a){if(n===f)throw new Error("Generator is already running");if(n===m){if("throw"===o)throw a;return P()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=E(i,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var s=u(t,e,r);if("normal"===s.type){if(n=r.done?m:d,s.arg===p)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=m,r.method="throw",r.arg=s.arg)}}}(t,r,i),a}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(I){return{type:"throw",arg:I}}}t.wrap=l;var h="suspendedStart",d="suspendedYield",f="executing",m="completed",p={};function y(){}function b(){}function v(){}var g={};s(g,a,(function(){return this}));var j=Object.getPrototypeOf,x=j&&j(j(_([])));x&&x!==r&&n.call(x,a)&&(g=x);var w=v.prototype=y.prototype=Object.create(g);function O(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function N(t,e){function r(o,a,i,c){var s=u(t[o],t,a);if("throw"!==s.type){var l=s.arg,h=l.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(h).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,c)}))}c(s.arg)}var o;this._invoke=function(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}}function E(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,E(t,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var o=u(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,p;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function _(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:P}}function P(){return{value:e,done:!0}}return b.prototype=v,s(w,"constructor",v),s(v,"constructor",b),b.displayName=s(v,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,s(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},O(N.prototype),s(N.prototype,i,(function(){return this})),t.AsyncIterator=N,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new N(l(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},O(w),s(w,c,"Generator"),s(w,a,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=_,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(S),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(s&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:_(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=n}catch(o){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},15:function(t,e,r){"use strict";function n(t,e,r,n,o,a,i){try{var c=t[a](i),s=c.value}catch(l){return void r(l)}c.done?e(s):Promise.resolve(s).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,a){var i=t.apply(e,r);function c(t){n(i,o,a,c,s,"next",t)}function s(t){n(i,o,a,c,s,"throw",t)}c(void 0)}))}}r.d(e,"a",(function(){return o}))},16:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=t[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(s){o=!0,a=s}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}}(t,e)||function(t,e){if(t){if("string"===typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.d(e,"a",(function(){return o}))},22:function(t,e,r){"use strict";r.r(e);var n=r(13),o=r.n(n),a=r(15),i=r(16),c=r(1),s={isBootstrapAvailable:function(t){return!t||!!(window.bootstrap&&window.bootstrap.Modal&&window.bootstrap.Modal.VERSION)&&(console.log("BS current version",window.bootstrap.Modal.VERSION),window.bootstrap.Modal.VERSION.localeCompare(t,void 0,{numeric:!0,sensitivity:"base"})>=0)}},l=s.isBootstrapAvailable,u=r(0);e.default=function(t){var e=t.bridgeEvent,r=Object(c.useState)(null),n=Object(i.a)(r,2),s=n[0],h=n[1],d=Object(c.useState)(null),f=Object(i.a)(d,2),m=f[0],p=f[1],y=Object(c.useState)(null),b=Object(i.a)(y,2),v=b[0],g=b[1];return Object(c.useEffect)((function(){l("5")?h(new window.bootstrap.Modal(document.getElementById("modal-portfolio"),{keyboard:!1,backdrop:!1})):console.warn("Bootstrap 5 must be loaded to use GalleryPostModal component")}),[]),Object(c.useEffect)((function(){if(e&&s){var t;e.addEventListener("openGalleryModal",(function(e){p(e.detail),(t||(t=new Promise((function(t,e){Object(a.a)(o.a.mark((function e(){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,fetch("/graphql?query=".concat(encodeURIComponent("{\n                technologies{\n                  data {id, name, link, thumbnail}\n                }\n              }")));case 3:return e.next=5,e.sent.json();case 5:r=e.sent,t(r.data.technologies.data);case 7:case"end":return e.stop()}}),e)})))().catch(e)}))),t).then((function(t){g(e.detail.technology_ids.map((function(e){return t.find((function(t){return t.id===e}))})))}),(function(t){console.log("fail to get technologies",t)})),s.show(),document.querySelectorAll(".footer-interface").forEach((function(t){return t.classList.toggle("open")}))}))}}),[e,s]),Object(u.jsx)("div",{id:"modal-portfolio",className:"modal modal-interface fade",tabIndex:"-1","aria-labelledby":"modalPortfolio","aria-hidden":"true",children:Object(u.jsx)("div",{className:"modal-dialog",children:Object(u.jsx)("div",{className:"modal-content",children:Object(u.jsx)("div",{className:"modal-body",children:m&&Object(u.jsxs)("div",{className:"card portfolio-focus soft flat rounded border-0 mx-sm-auto",children:[Object(u.jsx)("img",{className:"card-img-top rounded-top",src:"".concat("https://localhost:3000/","assets/images/gallery/").concat(m.thumbnail),alt:m.name}),Object(u.jsxs)("div",{className:"card-body bg-white rounded-bottom",children:[Object(u.jsx)("h2",{className:"card-title text-red",children:Object(u.jsx)("strong",{children:m.name})}),Object(u.jsx)("h4",{children:m.client}),m.pitch&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h6",{className:"text-red mb-0",children:"En r\xe9sum\xe9"}),Object(u.jsx)("div",{className:"card-text mb-3",children:m.pitch})]}),m.description&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h6",{className:"text-red mb-0",children:"Plus en d\xe9tails"}),Object(u.jsx)("div",{className:"card-text mb-3",children:m.description})]}),Object(u.jsxs)("div",{id:"portfolio-carousel",className:"carousel slide","data-bs-ride":"carousel",children:[Object(u.jsx)("div",{className:"carousel-inner",children:m.images&&m.images.map((function(t,e){return Object(u.jsx)("div",{className:"carousel-item ".concat(0===e?"active":""),children:Object(u.jsx)("img",{className:"d-block w-100",src:"".concat("https://localhost:3000/","assets/images/gallery/").concat(t),alt:"".concat(m.client,"-").concat(e)})},"carousel-image-".concat(e))}))}),m.images&&m.images.length>0&&Object(u.jsxs)("div",{className:"carousel-control-container",children:[Object(u.jsxs)("button",{className:"carousel-control-prev carousel-control rounded-circle m-2",type:"button","data-bs-target":"#portfolio-carousel","data-bs-slide":"prev",children:[Object(u.jsx)("i",{className:"fas fa-chevron-left text-red","aria-hidden":"true"}),Object(u.jsx)("span",{className:"visually-hidden",children:"Previous"})]}),Object(u.jsxs)("button",{className:"carousel-control-next carousel-control rounded-circle m-2",type:"button","data-bs-target":"#portfolio-carousel","data-bs-slide":"next",children:[Object(u.jsx)("i",{className:"fas fa-chevron-right text-red","aria-hidden":"true"}),Object(u.jsx)("span",{className:"visually-hidden",children:"Next"})]})]})]}),m.types&&Object(u.jsx)("div",{className:"tags",children:Object(u.jsx)("ul",{className:"list-inline",children:m.types.map((function(t,e){return Object(u.jsx)("li",{className:"list-inline-item",children:Object(u.jsx)("span",{className:"badge bg-secondary rounded-pill",children:t})},"carousel-type-".concat(e))}))})}),v&&Object(u.jsxs)("div",{className:"techno",children:[Object(u.jsx)("i",{className:"small",children:"Built with"}),Object(u.jsx)("ul",{className:"list-inline mb-0",children:v.map((function(t,e){return Object(u.jsx)("li",{className:"list-inline-item",children:Object(u.jsx)("img",{className:"stack-logo bg-white rounded-circle me-2",src:"".concat("https://localhost:3000/","assets/images/stack/").concat(t.thumbnail),alt:"".concat(t.name,"-").concat(e)})},"carousel-technology-".concat(e))}))})]})]})]})})})})})}}}]);
//# sourceMappingURL=4.4b229cdc.chunk.js.map