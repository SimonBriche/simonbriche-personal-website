'use strict';
(self.webpackChunkreact_cmp = self.webpackChunkreact_cmp || []).push([
  [542, 861],
  {
    542: (e, s, a) => {
      (a.r(s), a.d(s, { default: () => o }));
      a(43);
      const t = a.p + 'static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg';
      var n = a(861),
        l = a(579);
      const o = function (e) {
        return (0, l.jsx)('div', {
          className: 'App',
          children: (0, l.jsxs)('header', {
            className: 'App-header',
            children: [
              (0, l.jsx)('img', { src: t, className: 'App-logo', alt: 'logo' }),
              (0, l.jsxs)('p', {
                children: ['Edit ', (0, l.jsx)('code', { children: 'src/App.js' }), ' and save to reload.'],
              }),
              (0, l.jsx)('a', {
                className: 'App-link',
                href: 'https://reactjs.org',
                target: '_blank',
                rel: 'noopener noreferrer',
                children: 'Learn React',
              }),
              (0, l.jsx)(n.default, { bridgeEvent: e.bridgeEvent }),
            ],
          }),
        });
      };
    },
    689: (e, s, a) => {
      a.d(s, { I$: () => n, fB: () => o, sc: () => i, ud: () => l });
      const t = {
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
              const s = e.querySelectorAll('img.lazyload');
              (console.log('images', s),
                s.forEach((e) => {
                  ((e.onload = function () {
                    this.classList && this.classList.add('show');
                  }),
                    console.log('set img.src'),
                    (e.src = e.dataset.src));
                }));
            } else (a.e(508).then(a.t.bind(a, 508, 23)), console.log('import lazysizes'));
          },
          randomString: function (e) {
            const s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let a = '';
            for (let t = e; t > 0; --t) a += s[Math.round(61 * Math.random())];
            return a;
          },
          randomBetween: function (e, s) {
            return Math.ceil(s - Math.random() * (s - (e - 1)));
          },
        },
        n = t.isBootstrapAvailable,
        l = t.isJQueryAvailable,
        o = t.lazyLoadImages,
        i = t.randomBetween;
    },
    861: (e, s, a) => {
      (a.r(s), a.d(s, { default: () => o }));
      var t = a(43),
        n = a(689),
        l = a(579);
      const o = function (e) {
        const s = (0, t.useRef)(null),
          a = e.bridgeEvent,
          o = e.section,
          [i, c] = (0, t.useState)(null);
        return (
          (0, t.useEffect)(() => {
            (async () => {
              const e = '{\n        portfolio(filtering:{field: "section", operator:EQUAL, value:"'.concat(
                  o,
                  '"},orderBy:{sort:PRIORITY, direction:ASC}){\n          data{id, name, client, pitch, description, thumbnail, types, images, technology_ids}\n        }\n      }'
                ),
                s = await (
                  await fetch(
                    ''
                      .concat('https://site--server--pn9hc6z44glx.code.run', '/graphql?query=')
                      .concat(encodeURIComponent(e))
                  )
                ).json();
              c(s.data.portfolio.data);
            })().catch((e) => {
              console.log('fail to fetch', e);
            });
          }, [o]),
          (0, t.useEffect)(() => {
            i && (0, n.fB)(s.current);
          }, [i]),
          (0, l.jsx)('ul', {
            className: 'list-unstyled text-nowrap d-flex align-items-stretch',
            ref: s,
            children:
              i &&
              i.map((e) =>
                (0, l.jsx)(
                  'li',
                  {
                    className: 'd-inline-block mb-3',
                    children: (0, l.jsxs)('div', {
                      className: 'card gallery-item noselect mt-3 mx-3 rounded border-0 shadow h-100',
                      onClick: (s) =>
                        ((e, s) => {
                          const t = new CustomEvent('openGalleryModal', { detail: s });
                          a.dispatchEvent(t);
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
//# sourceMappingURL=542.24ca6818.chunk.js.map
