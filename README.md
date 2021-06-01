# Minimal configuration for an ExpressJS website

This is a minimal template for a website powered by Node 16.x, ExpressJS and Pug template engine.

## <a name="environment"></a> Environnement Variables
- PORT : Port on which the site is accessible with local developement. Don't provide it once hosted, as the host will automatically provide one.
- NODE_ENV : Environnement of the application (`production` once deployed, `developement` while on local)
- USE_LOCAL_SSL_CERT : Does the app use the provided SSL Certificate (stored in the `./keys` folder) or not (`true`/`false`(default))