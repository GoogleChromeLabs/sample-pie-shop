# Online store PWA sample

This sample demonstrates best practices for e-commerce websites.

It also demonstrates some useful features enabled by new technologies and APIs
on the web.

## Development

Create a fork of the original project
[GoogleChromeLabs/sample-pie-shop](https://github.com/GoogleChromeLabs/sample-pie-shop)
and clone to your development environment.

### Install dependencies

Change to the top level project directory run the following:

```sh
cd sample-pie-shop
npm ci
```

*Note:* This will install the dependencies as per the `package-lock.json`
whereas `npm install` will update them. If you need to update the dependencies,
submit the updated `package-lock.json` as a new PR.

### Run the development server

The project uses [Firebase Cloud
Firestore](https://firebase.google.com/docs/firestore/) for product data. You
will need to create a project and download the JSON configuration for the Admin
SDK. You can do this in the [Firebase
console](https://console.firebase.google.com/project/YOUR-PROJECT-NAME/settings/serviceaccounts/adminsdk)
using the **Generate new private key** button. Save this to
`src/data/firebase-admin-key.json`.

The `serve` target will build the site and serve it locally while watching for
any changes. Once the script completes the initial build, the site should be
available at [localhost:3000](http://localhost:3000/).

```sh
npm run serve
```

*Note:* You can override the default location for the config file by specifying
a path in the `FB_KEYS` environment variable.

```sh
FB_KEYS=/path/to/alternative-key.json npm run serve
```

Check
[`package.json`](https://github.com/GoogleChromeLabs/sample-pie-shop/blob/master/package.json)
for the other build targets.

### Import data to the database

Sample data for products, product categories and homepage content is stored as
JSON in the
[`/src/data`](https://github.com/GoogleChromeLabs/sample-pie-shop/tree/master/src/data)
directory.

You can import (upload) this data to the remote Firestore database by running
the following Node scripts from the
[`/tools`](https://github.com/GoogleChromeLabs/sample-pie-shop/tree/master/tools)
directory:

```sh
cd tools
node import_home.js
node import_products.js
```

### Images

Images are served from
[Cloudinary](https://res.cloudinary.com/pieshop/f_auto,dpr_auto,q_auto:eco/w_500/GGOEYXXX0938.png)
and displayed responsively using the `srcset` and `sizes` attributes in
combination with
[`lazy-img`](https://github.com/GoogleChromeLabs/sample-pie-shop/blob/master/src/client/js/lazy-img.js)
for lazy loading.

## Deploying

See [`DEPLOY.mb`](DEPLOY.md).
