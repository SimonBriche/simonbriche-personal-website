# Minimal configuration for an ExpressJS website

This is a minimal template for a website powered by Node 16.x, ExpressJS and Pug template engine.

## <a name="environment"></a> Environnement Variables
- PORT : Port on which the site is accessible with local developement. Don't provide it once hosted, as the host will automatically provide one.
- NODE_ENV : Environnement of the application (`production` once deployed, `developement` while on local)
- USE_LOCAL_SSL_CERT : Does the app use the provided SSL Certificate (stored in the `./keys` folder) or not (`true`/`false`(default))
- LOG_LEVEL : Level of debugging. Values can be (in order of inclusion) `debug`, `verbose`, `info`(default), `warn`, `error`. e.g : `debug` level will show all other levels of debugging. `info` will only show `info`, `warn` and `error` levels of debug.
- SESSION_SECRET : secret string to encode sessions
- COOKIE_SECRET : secret string to encode cookies
- USE_LOCAL_SSL_CERT : Used if you provide your own SSL cert (`true`/`false`(default))
- FORCE_SSL_REDIRECTION : Set to `true` to force SSL redirection of all requests (`true`(default)/`false`)
- DOMAIN : Provide a domain to 301 redirect all requests to this specific domain (in case of multiple domains for the same site).
