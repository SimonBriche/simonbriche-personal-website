"use strict";(self.webpackChunkreact_cmp=self.webpackChunkreact_cmp||[]).push([[497],{497:function(e,t,n){n.r(t);var a=n(861),s=n(152),o=n(757),i=n.n(o),l=n(791),c=n(212),r=n(184);t.default=function(e){var t=(0,l.useRef)(null),n=e.bridgeEvent,o=e.section,d=(0,l.useState)(null),u=(0,s.Z)(d,2),m=u[0],h=u[1];return(0,l.useEffect)((function(){(0,a.Z)(i().mark((function e(){var n,a;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n='{\n        portfolio(filtering:{field: "section", operator:EQUAL,value:"'.concat(o,'"},orderBy:{sort:PRIORITY, direction:ASC}){\n          data{id, name, client, pitch, description, thumbnail, types, images, technology_ids}\n        }\n      }'),e.next=3,fetch("".concat("https://simonbriche.herokuapp.com","/graphql?query=").concat(encodeURIComponent(n)));case 3:return e.next=5,e.sent.json();case 5:a=e.sent,h(a.data.portfolio.data),(0,c.Fq)(t.current);case 8:case"end":return e.stop()}}),e)})))().catch((function(e){console.log("fail to fetch",e)}))}),[o]),(0,r.jsx)("ul",{className:"list-unstyled text-nowrap d-flex align-items-stretch",ref:t,children:m&&m.map((function(e){return(0,r.jsx)("li",{className:"d-inline-block mb-3",children:(0,r.jsxs)("div",{className:"card gallery-item noselect mt-3 mx-3 rounded border-0 shadow h-100",onClick:function(t){return function(e,t){var a=new CustomEvent("openGalleryModal",{detail:t});n.dispatchEvent(a)}(0,e)},children:[(0,r.jsx)("img",{className:"card-img-top rounded-top lazyload fade","data-src":"".concat("https://simonbriche.herokuapp.com","/assets/images/gallery/").concat(e.thumbnail),alt:e.name,loading:"lazy"}),(0,r.jsx)("div",{className:"card-body text-start rounded-bottom pb-0",children:(0,r.jsxs)("ul",{className:"list-unstyled text-wrap",children:[(0,r.jsx)("li",{children:(0,r.jsxs)("h5",{className:"mb-0",children:[(0,r.jsx)("small",{children:"client: "}),(0,r.jsx)("span",{className:"text-red",children:e.client})]})}),(0,r.jsxs)("li",{children:[(0,r.jsx)("small",{children:"name: "}),(0,r.jsx)("strong",{children:e.name})]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("small",{children:"types: "}),(0,r.jsx)("span",{children:e.types.join(", ")})]})]})})]})},e.id)}))})}},212:function(e,t,n){n.d(t,{O6:function(){return s},Fq:function(){return o}});var a={isBootstrapAvailable:function(e){return!e||!!(window.bootstrap&&window.bootstrap.Modal&&window.bootstrap.Modal.VERSION)&&window.bootstrap.Modal.VERSION.localeCompare(e,void 0,{numeric:!0,sensitivity:"base"})>=0},lazyLoadImages:function(e){"loading"in HTMLImageElement.prototype?e.querySelectorAll("img.lazyload").forEach((function(e){e.onload=function(){this.classList&&this.classList.add("show")},e.src=e.dataset.src})):n.e(504).then(n.t.bind(n,504,23))}},s=a.isBootstrapAvailable,o=a.lazyLoadImages}}]);
//# sourceMappingURL=497.23095970.chunk.js.map