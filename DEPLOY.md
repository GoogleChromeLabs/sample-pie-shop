# Deploying

## AppEngine staging

There's an instance deployed to the AppEngine "Standard" environment on the
"nodejs8" runtime. This is defined in [`app.yaml`](app.yaml). This is available
at https://pie-shop-app-staging.appspot.com/

First, ensure you have the `gcloud` command installed as per [the instructions
here](https://cloud.google.com/sdk/gcloud/). If you already have the command
installed, it's a good idea to make sure the components are up to date by
running `gcloud components update`.

Run `gcloud init` and when prompted to select a cloud project either pick
`pie-shop-app-staging` (available to you if you're on the team) or `Create a new
project`.

*Note:* You will need to ensure billing is enabled for a new project before you
deploy.

AppEngine deploys to a read-only filesystem which means you need to deploy a
locally built version of the app. The [`.gcloudignore`](.gcloudignore) file is
set up to deploy only the resources needed in production. To build and deploy
the app into the currently selected project, run the following commands from the
top-level directory of the project:

```sh
rm -rf node_modules && \
npm ci && \
npm run clean && \
npm run lint && \
npm run build:prod && \
gcloud app deploy
```
