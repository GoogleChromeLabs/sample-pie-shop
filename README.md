# Online store PWA sample.
test

This sample will attempt to demonstrate some best practices on the web, taking
into account the specific requirements of an e-commerce site. It will also
demonstrate some useful features enabled by new technologies and APIs on the
web.

## Development

Create a fork of the original
[GoogleChromeLabs/sample-pie-shop](https://github.com/GoogleChromeLabs/sample-pie-shop)
and clone to your development environment.

### Installing dependencies

Enter the project directory and run `npm` to install the dependencies.

```sh
cd sample-pie-shop
npm i
```

### Running the development server

The `serve` target will build the site and serve it locally while watching for
any changes. Once the script completes the initial build, the site should be
available on <http://localhost:3000/>.

You have to provide path to the firebase keys file as an env variable.

```sh
FB_KEYS=full-path-to-fb-keys-json-file npm run serve
```

Check [`package.json`](package.json) for the other build targets.

### Run pie generation pipeline

Make sure you have firebase private key stored somewhere. Provide path
to the firebase keys file as an env variable.

```sh
FB_KEYS=full-path-to-fb-keys-json-file npm run tools:import_products
```
