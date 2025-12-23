'use strict';
(self.webpackChunkreact_cmp = self.webpackChunkreact_cmp || []).push([
  [861],
  {
    689: (e, t, a) => {
      a.d(t, { I$: () => n, fB: () => o, sc: () => i, ud: () => l });
      const s = {
          isBootstrapAvailable: (e) =>
            !e ||
            (!!(window.bootstrap && window.bootstrap.Modal && window.bootstrap.Modal.VERSION) &&
              window.bootstrap.Modal.VERSION.localeCompare(e, void 0, { numeric: !0, sensitivity: 'base' }) >= 0),
          isJQueryAvailable: (e) =>
            !e ||
            (!!(window.$ && window.$.fn && window.$.fn.jquery) &&
              window.$.fn.jquery.localeCompare(e, void 0, { numeric: !0, sensitivity: 'base' }) >= 0),
          lazyLoadImages: (e) => {
            if ('loading' in HTMLImageElement.prototype) {
              console.log('loading in. HTMLImageElement', e);
              const t = e.querySelectorAll('img.lazyload');
              (console.log('images', t),
                t.forEach((e) => {
                  ((e.onload = function () {
                    this.classList && this.classList.add('show');
                  }),
                    console.log('set img.src'),
                    (e.src = e.dataset.src));
                }));
            } else (a.e(508).then(a.t.bind(a, 508, 23)), console.log('import lazysizes'));
          },
          randomString: function (e) {
            const t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let a = '';
            for (let s = e; s > 0; --s) a += t[Math.round(61 * Math.random())];
            return a;
          },
          randomBetween: function (e, t) {
            return Math.ceil(t - Math.random() * (t - (e - 1)));
          },
        },
        n = s.isBootstrapAvailable,
        l = s.isJQueryAvailable,
        o = s.lazyLoadImages,
        i = s.randomBetween;
    },
    861: (e, t, a) => {
      (a.r(t), a.d(t, { default: () => o }));
      var s = a(43),
        n = a(689),
        l = a(579);
      const o = function (e) {
        const t = (0, s.useRef)(null),
          a = e.bridgeEvent,
          o = e.section,
          [i, c] = (0, s.useState)(null);
        return (
          (0, s.useEffect)(() => {
            (async () => {
              const e = '{\n        portfolio(filtering:{field: "section", operator:EQUAL, value:"'.concat(
                  o,
                  '"},orderBy:{sort:PRIORITY, direction:ASC}){\n          data{id, name, client, pitch, description, thumbnail, types, images, technology_ids}\n        }\n      }'
                ),
                t = await (
                  await fetch(
                    ''
                      .concat('https://site--server--pn9hc6z44glx.code.run', '/graphql?query=')
                      .concat(encodeURIComponent(e))
                  )
                ).json();
              c(t.data.portfolio.data);
            })().catch((e) => {
              console.log('fail to fetch', e);
            });
          }, [o]),
          (0, s.useEffect)(() => {
            i && (0, n.fB)(t.current);
          }, [i]),
          (0, l.jsx)('ul', {
            className: 'list-unstyled text-nowrap d-flex align-items-stretch',
            ref: t,
            children:
              i &&
              i.map((e) =>
                (0, l.jsx)(
                  'li',
                  {
                    className: 'd-inline-block mb-3',
                    children: (0, l.jsxs)('div', {
                      className: 'card gallery-item noselect mt-3 mx-3 rounded border-0 shadow h-100',
                      onClick: (t) =>
                        ((e, t) => {
                          const s = new CustomEvent('openGalleryModal', { detail: t });
                          a.dispatchEvent(s);
                        })(0, e),
                      children: [
                        (0, l.jsx)('img', {
                          className: 'card-img-top rounded-top lazyload fade',
                          'data-src': ''
                            .concat('https://site--server--pn9hc6z44glx.code.run', '/assets/images/gallery/')
                            .concat(e.thumbnail),
                          alt: e.name,
                          loading: 'lazy',
                        }),
                        (0, l.jsx)('div', {
                          className: 'card-body text-start rounded-bottom pb-0',
                          children: (0, l.jsxs)('ul', {
                            className: 'list-unstyled text-wrap',
                            children: [
                              (0, l.jsx)('li', {
                                children: (0, l.jsxs)('h5', {
                                  className: 'mb-0',
                                  children: [
                                    (0, l.jsx)('small', { children: 'client: ' }),
                                    (0, l.jsx)('span', { className: 'text-red', children: e.client }),
                                  ],
                                }),
                              }),
                              (0, l.jsxs)('li', {
                                children: [
                                  (0, l.jsx)('small', { children: 'name: ' }),
                                  (0, l.jsx)('strong', { children: e.name }),
                                ],
                              }),
                              (0, l.jsxs)('li', {
                                children: [
                                  (0, l.jsx)('small', { children: 'types: ' }),
                                  (0, l.jsx)('span', { children: e.types.join(', ') }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  },
                  e.id
                )
              ),
          })
        );
      };
    },
  },
]);
//# sourceMappingURL=861.4710569c.chunk.js.map
