# Minimal configuration for an ExpressJS website

This is a minimal template for a website powered by Node 16.x, ExpressJS and Pug template engine.

## <a name="environment"></a> Environment Variables

- PORT : Port on which the site is accessible with local developement. Don't provide it once hosted, as the host will automatically provide one.
- NODE_ENV : Environnement of the application (`production` once deployed, `developement` while on local)
- LOG_LEVEL : Level of debugging. Values can be (in order of inclusion) `debug`, `verbose`, `info`(default), `warn`, `error`. e.g : `debug` level will show all other levels of debugging. `info` will only show `info`, `warn` and `error` levels of debug.
- CDN_URL : Hosting URL folder for static assets, if needed.

- APPLICATION_URL : Absolute URL of the application. Moslty used for email's images path and CSP directives
- SESSION_SECRET : Secret string to encode sessions
- COOKIE_SECRET : Secret string to encode cookies
- GRAPHQL_TOKEN_SECRET : Secret string to encode JWT tokens
- USE_LOCAL_SSL_CERT : Does the app use the provided SSL Certificate (stored in the `./keys` folder) or not (`true`/`false`(default))
- FORCE_SSL_REDIRECTION : Set to `true` to force SSL redirection of all requests (`true`(default)/`false`)
- REDIRECT_TO_DOMAIN : Provide a domain to 301 redirect all requests to this specific domain (in case of multiple domains for the same site).
- LOCALE_DOMAINS : Activate locale support via specific domains. The definition of locale is made via a string that represents an object with the format : `[{"domain":"localhost","locale":"fr_fr"}]`.
- LOCALE_SUBFOLDERS : Activate locale support via subfolders. The definition of locale is made via a string that represent an object with the format : `[{"folder":"fr","locale":"fr_fr"},{"folder":"en","locale":"en_en"}]`.
- SHARE_CACHE_VERSION : Update this version number to force the cache of the meta crawlers (Facebook, Twitter, LinkedIn, etc...)
- KEEP_AWAKE : Set to `true` for keeping the application "awake" in Heroku environnement

- DATABASE_URL : The connection URL for the mysql database, with the syntax : `mysql://user:password@host:port/database`
- DATABASE_USE_SSL : Should the connection use the Amazon AWS SSL certificate or not (`true`(default)/`false`)

- ACTIVE_MAIL : Whether the mails should really be send or not (`true`(default)/`false`)
- SUPPORT_EMAIL : The default email recipient of the application. Multiple emails could be provided, comma separated.
- MAILGUN_SMTP_LOGIN : The login of the SMTP service.
- MAILGUN_SMTP_PASSWORD : The password of the SMTP service.
- MAILGUN_SMTP_SERVER : The host of the SMTP service (defaults to `smtp.eu.mailgun.org`).

- REACT_ENVIRONMENT : Environment of the `react-cmp` framework, i.e. the folder where the server must grab the built React files (`production`/`development`)
- REACT_PUBLIC_URL : The **very same** URL used when building the React files of the `react-cmp` framework. Used by the regexp expression in the `react-loader` middleware to identify the files to inject in the template.

- MARVEL_PUBLIC_KEY : The public key of the Marvel account.
- MARVEL_PRIVATE_KEY : The private key of the Marvel account.
- MARVEL_FETCH_CHARACTER : Should the server load a random Marvel character at startup (`true`(default)/`false`)
- MARVEL_FETCH_COMICS : Should the server load a random Marvel comics at startup (`true`(default)/`false`)

## <a name="config"></a> Configuration file

The `config.js` file at the root of the project can be edited to update the default values of the environment variables.
Along the environment variables, some other configuration can be set :

### dataPolicy

Update the data policy infos according to the website needs. Those informations are used to generate the data policy page.

### cspDirectives

Add the URLs, domains or hosts that are allowed, according to the website needs, for each directive:

- `scriptSrc`: The scripts that are allowed to be loaded
- `imgSrc`: The images that are allowed to be loaded
- `connectSrc`: The APIs that are allowed to be fetched
- `frameSrc`: The iframes that are allowed to be displayed

## Testing

Run `npm test` to run the test suites. Update the `jest.testRegex` property in the `package.json` file to target the scripts that will be tested.

Run `npm test -- --watch` to run the test suite with each file update.

To watch only a specific test file and all its related tests, run `npm test -- --watch --findRelatedTests PATH/TO/FILE.js`.
To watch only a specific folder and all its related tests, run `npm test -- --watch --findRelatedTests PATH/TO/FOLDER/**/*`.
To watch only a specific test file, run `npm test -- --watch --runTestsByPath PATH/TO/FILE.test.js`.

Add `--verbose` option to log all the tests' names even if multiple files are tested.

**Please note** that the jest package must match the Create React App one to avoid incompatibilities.

### References

- https://testing.googleblog.com/