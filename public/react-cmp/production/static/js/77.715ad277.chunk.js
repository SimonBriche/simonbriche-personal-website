"use strict";(self.webpackChunkreact_cmp=self.webpackChunkreact_cmp||[]).push([[77],{77:function(e,t,n){n.r(t);var r=n(152),a=n(791),l=n(212),o=n(184);t.default=function(e){var t=(0,a.useRef)(null),n=e.bridgeEvent,i=(0,a.useState)(null),s=(0,r.Z)(i,2),c=s[0],u=s[1],d=(0,a.useState)(null),m=(0,r.Z)(d,2),f=m[0],h=m[1],p=(0,a.useState)(null),v=(0,r.Z)(p,2),y=v[0],b=v[1],w=function(e){var t=new CustomEvent("onShowMoreTilesEvent",{detail:{after:e}});n.dispatchEvent(t)};return(0,a.useEffect)((function(){var e=function(e){u((function(t){return e.detail.isTilesAppended?t.concat(e.detail.tiles):e.detail.tiles})),h(e.detail.hasNextPage),b(e.detail.after),(0,l.Fq)(t.current)};return n.addEventListener("onGalleryTilesEvent",e),function(){n.removeEventListener("onGalleryTilesEvent",e)}}),[n]),(0,o.jsxs)("div",{className:"gallery-container container-fluid",children:[(0,o.jsx)("div",{className:"row justify-content-center",ref:t,children:c?c.length>0?c.map((function(e){return(0,o.jsx)("div",{className:"col-12 col-sm-6 col-md-4 col-lg-3 mb-3",children:(0,o.jsxs)("div",{className:"card gallery-item noselect mt-3 mx-auto rounded border-0 shadow h-100",onClick:function(t){return function(e,t){var r=new CustomEvent("openGalleryModal",{detail:t});n.dispatchEvent(r)}(0,e)},children:[(0,o.jsx)("img",{className:"card-img-top rounded-top lazyload fade","data-src":"".concat("https://site--server--pn9hc6z44glx.code.run","/assets/images/gallery/").concat(e.thumbnail),alt:e.name,loading:"lazy"}),(0,o.jsx)("div",{className:"card-body text-start rounded-bottom pb-0",children:(0,o.jsxs)("ul",{className:"list-unstyled text-wrap",children:[(0,o.jsx)("li",{children:(0,o.jsxs)("h5",{className:"mb-0",children:[(0,o.jsx)("small",{children:"client: "}),(0,o.jsx)("span",{className:"text-red",children:e.client})]})}),(0,o.jsxs)("li",{children:[(0,o.jsx)("small",{children:"name: "}),(0,o.jsx)("strong",{children:e.name})]}),(0,o.jsxs)("li",{children:[(0,o.jsx)("small",{children:"types: "}),(0,o.jsx)("span",{children:e.types.join(", ")})]})]})})]})},e.id)})):(0,o.jsx)("div",{className:"col-12 text-center",children:(0,o.jsx)("div",{className:"soft d-inline-block my-2 p-3 rounded",children:"Z...zut ! Aucune r\xe9alisation ne correspond \xe0 cette recherche \ud83d\ude05"})}):(0,o.jsx)("div",{className:"col-12 text-center",children:(0,o.jsx)("button",{onClick:function(){return w()},className:"btn btn-custom btn-soft",children:"Lancez une premi\xe8re recherche \ud83d\udd0d"})})}),(0,o.jsxs)("div",{className:"text-center mt-3",children:[c&&c.length>0&&(0,o.jsx)("button",{onClick:function(){var e=window.pageYOffset+document.getElementById("gallery-filters").getBoundingClientRect().top-20;window.scrollTo(0,e)},className:"btn btn-custom btn-soft m-3",children:"Retour au filtres"}),f&&(0,o.jsx)("button",{onClick:function(){return w(y)},className:"btn btn-custom btn-soft m-3",children:"Plus de projets"})]})]})}},212:function(e,t,n){n.d(t,{O6:function(){return a},KK:function(){return l},Fq:function(){return o},W7:function(){return i}});var r={isBootstrapAvailable:function(e){return!e||!!(window.bootstrap&&window.bootstrap.Modal&&window.bootstrap.Modal.VERSION)&&window.bootstrap.Modal.VERSION.localeCompare(e,void 0,{numeric:!0,sensitivity:"base"})>=0},isJQueryAvailable:function(e){return!e||!!(window.$&&window.$.fn&&window.$.fn.jquery)&&window.$.fn.jquery.localeCompare(e,void 0,{numeric:!0,sensitivity:"base"})>=0},lazyLoadImages:function(e){"loading"in HTMLImageElement.prototype?e.querySelectorAll("img.lazyload").forEach((function(e){e.onload=function(){this.classList&&this.classList.add("show")},e.src=e.dataset.src})):n.e(504).then(n.t.bind(n,504,23))},randomString:function(e){for(var t="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",n="",r=e;r>0;--r)n+=t[Math.round(Math.random()*(t.length-1))];return n},randomBetween:function(e,t){return Math.ceil(t-Math.random()*(t-(e-1)))}},a=r.isBootstrapAvailable,l=r.isJQueryAvailable,o=r.lazyLoadImages,i=r.randomBetween},152:function(e,t,n){function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(s){i=!0,a=s}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return l}}(e,t)||function(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.d(t,{Z:function(){return a}})}}]);
//# sourceMappingURL=77.715ad277.chunk.js.map