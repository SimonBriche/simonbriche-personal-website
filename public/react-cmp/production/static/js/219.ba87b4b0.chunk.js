'use strict';
(self.webpackChunkreact_cmp = self.webpackChunkreact_cmp || []).push([
  [219],
  {
    219: (e, t, a) => {
      (a.r(t), a.d(t, { default: () => l }));
      var s = a(43),
        n = a(689),
        o = a(579);
      const l = (e) => {
        const t = e.bridgeEvent,
          [a, l] = (0, s.useState)(null),
          [c, i] = (0, s.useState)(null),
          [r, d] = (0, s.useState)(!1),
          [p, m] = (0, s.useState)(!1);
        ((0, s.useEffect)(() => {
          (0, n.I$)('5') && (0, n.ud)('3') ?
            (async () => {
              const e = await (
                await fetch(
                  ''
                    .concat('https://site--server--pn9hc6z44glx.code.run', '/graphql?query=')
                    .concat(
                      encodeURIComponent(
                        '{\n          portfolioSearchFields{\n            clients, types\n          }\n        }'
                      )
                    )
                )
              ).json();
              i(e.data.portfolioSearchFields);
            })().catch((e) => {
              console.log('getSearchFields error', e);
            })
          : console.warn('Bootstrap 5 and jQuery 3 must be loaded to use GalleryFilter component');
        }, []),
          (0, s.useEffect)(() => {
            c && (console.log('searchFields updated', c), window.$('.selectfilter').selectpicker());
          }, [c]));
        const h = (0, s.useCallback)(
          (e, s) => {
            (async () => {
              (m(!0), d(!0));
              const n = await u(e, s || a),
                o = new CustomEvent('onGalleryTilesEvent', {
                  detail: { tiles: n.tiles, after: n.after, hasNextPage: n.hasNextPage, isTilesAppended: !!e },
                });
              (t.dispatchEvent(o), d(!1), s && l(s));
            })().catch((e) => console.log(e));
          },
          [t, a]
        );
        (0, s.useEffect)(() => {
          const e = (e) => {
            e.detail && e.detail.after ? h(e.detail.after) : h(null, (0, n.sc)(1, 1e3));
          };
          return (
            t.addEventListener('onShowMoreTilesEvent', e),
            () => {
              t.removeEventListener('onShowMoreTilesEvent', e);
            }
          );
        }, [t, h]);
        const u = (e, t) =>
          new Promise((a, s) => {
            (async () => {
              const n = [],
                o = window.$('#clients-search').val(),
                l = window.$('#projects-search').val();
              let c = 'orderBy:{sort:RAND, direction:ASC, seed:"'.concat(t, '"}');
              (o.length > 0 && n.push('{field: "client", operator:IN, value:'.concat(JSON.stringify(o), '}')),
                l.length > 0 && n.push('{field: "types", operator:IN, value:'.concat(JSON.stringify(l), '}')),
                (o.length > 0 || l.length > 0) && (c = 'orderBy:{sort:CLIENT, direction:ASC}'));
              const i = '{\n          portfolio(\n            first: 12\n            '
                  .concat(c, '\n            ')
                  .concat(e ? 'after:"'.concat(e, '"') : '', '\n            ')
                  .concat(
                    n.length > 0 ? 'filtering:['.concat(n.join(','), ']') : '',
                    '\n          ){\n            data{id, name, client, pitch, description, thumbnail, types, images, technology_ids},\n            pageInfo{\n              endCursor,\n              hasNextPage\n            }\n          }\n        }'
                  ),
                r = await (
                  await fetch(
                    ''
                      .concat('https://site--server--pn9hc6z44glx.code.run', '/graphql?query=')
                      .concat(encodeURIComponent(i))
                  )
                ).json();
              r.data.portfolio.data ?
                a({
                  tiles: r.data.portfolio.data,
                  after: r.data.portfolio.pageInfo ? r.data.portfolio.pageInfo.endCursor : null,
                  hasNextPage: r.data.portfolio.pageInfo ? r.data.portfolio.pageInfo.hasNextPage : null,
                })
              : s(new Error(r.errors));
            })().catch(s);
          });
        return (0, o.jsx)(o.Fragment, {
          children:
            c ?
              (0, o.jsxs)('div', {
                id: 'gallery-filters',
                className: 'd-flex flex-column flex-sm-row justify-content-center',
                children: [
                  (0, o.jsx)('select', {
                    id: 'clients-search',
                    className: 'selectfilter mb-3 mb-sm-0 mx-auto ms-sm-0 me-sm-3',
                    'data-style': 'btn-soft',
                    'data-none-selected-text': 'Tous les clients',
                    'data-actions-box': 'true',
                    'data-select-all-text': 'Cocher',
                    'data-deselect-all-text': 'D\xe9cocher',
                    multiple: !0,
                    children: c.clients.map((e, t) => (0, o.jsx)('option', { children: e }, 'client-'.concat(t))),
                  }),
                  (0, o.jsx)('select', {
                    id: 'projects-search',
                    className: 'selectfilter mb-3 mb-sm-0 mx-auto ms-sm-0 me-sm-3',
                    'data-style': 'btn-soft',
                    'data-none-selected-text': 'Tous les projets',
                    'data-actions-box': 'true',
                    'data-select-all-text': 'Cocher',
                    'data-deselect-all-text': 'D\xe9cocher',
                    multiple: !0,
                    children: c.types.map((e, t) => (0, o.jsx)('option', { children: e }, 'type-'.concat(t))),
                  }),
                  p &&
                    (0, o.jsxs)('button', {
                      onClick: () => {
                        r || h(null, (0, n.sc)(1, 1e3));
                      },
                      className: 'btn btn-custom btn-soft text-red '.concat(r ? 'pending' : ''),
                      disabled: r,
                      children: [
                        (0, o.jsx)('span', {
                          className: 'pending-spinner',
                          children: (0, o.jsx)('i', { className: 'fas fa-spinner fa-spin' }),
                        }),
                        (0, o.jsx)('i', { className: 'fas fa-search' }),
                      ],
                    }),
                ],
              })
            : (0, o.jsx)('div', {
                className: 'cmp-loader',
                children: (0, o.jsxs)('div', {
                  className: 'lds-ring',
                  children: [
                    (0, o.jsx)('div', {}),
                    (0, o.jsx)('div', {}),
                    (0, o.jsx)('div', {}),
                    (0, o.jsx)('div', {}),
                  ],
                }),
              }),
        });
      };
    },
    689: (e, t, a) => {
      a.d(t, { I$: () => n, fB: () => l, sc: () => c, ud: () => o });
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
        o = s.isJQueryAvailable,
        l = s.lazyLoadImages,
        c = s.randomBetween;
    },
  },
]);
//# sourceMappingURL=219.ba87b4b0.chunk.js.map
