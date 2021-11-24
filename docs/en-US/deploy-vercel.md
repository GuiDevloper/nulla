## Vercel Deploy

Vercel is one very tested hosting service and fits with Nullstack serverless feature.

Since v0.11.5 Nullstack already supports the way Vercel deploy apps.

So, simply follow the default guide, with details [here](https://github.com/Mortaro/nullstack-vercel) and below:

Create `api/nullstack.js` to export the production application server

```js
import application from '../.production/server'

export default application.server;
```

Add the following `vercel.json` to the root folder in order to redirect all requests to nullstack:

```json
{
  "version": 2,
  "functions": {
    "api/nullstack.js": {
      "includeFiles": "**/**"
    }
  },
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "(.*)",
      "dest": "api/nullstack.js"
    }
  ]
}
```

Rename `build` to `vercel-build` in package.json scripts

```json
  "scripts": {
    "start": "npx nullstack start",
    "vercel-build": "npx nullstack build --mode=ssr"
  }
```

And ready to go! You can upload to an repository and [integrate Vercel](https://vercel.com/docs#deploy-an-existing-project) or do a local deploy with [Vercel CLI](https://docs.netlify.com/cli/get-started).

### Configuring Environment Variables

By default, Nullstack needs variables as the project name and domain.

Variables can be configured when importing an app from Github, or in project's settings page, know more in [Vercel documentation](https://vercel.com/docs/environment-variables).

## Deprecated Guide

For compatibility, we'll be mantaining the old tutorials here:

Having your project in a online repository, run in the terminal opened at it's folder:

```sh
npx nulla new-ci vercel
```

It generates the **.github** folder which [Github uses](https://docs.github.com/en/actions/learn-github-actions) to understand how to build the Nullstack app.

Committing the new folder, Github gonna run another Nulla command, moving your code to a new branch called `vercel-deploy`, building into the perfect state for [Vercel Github Integration](https://vercel.com/docs#deploy-an-existing-project) to be connected to it.

### Manual Deploy

If for some reason you only want to deploy manually from local environment, then there are other steps, take a look at [Vercel CLI docs](https://vercel.com/cli) for getting ready and run in the terminal opened at project folder:

```sh
npx nulla deploy vercel
```

It installs dependencies (if needed), run your build command, and make a Vercel deploy (creating project if inexistent).

With everything going nicely, you gonna have the link of your deployed site at clipboard, project at your [Vercel Dashboard](https://vercel.com/dashboard) and even environment variables (if there's a local **.env** file) configured.

With every change to be deployed you gonna need to run this deploy command.

> Tip: it can be used as a **package.json** script too

### Caveats

By default, Vercel tries to build & deploy every branch, but only `vercel-deploy` have the state to be deployed.

Read [how to ignore a build step](https://vercel.com/docs/platform/projects#ignored-build-step) and in this project setting set the following to cancel every deploy not coming from that branch.

```sh
bash -c 'if [[ $VERCEL_GIT_COMMIT_REF == "vercel-deploy" ]]; then exit 1; fi'
```

Currently Vercel only supports deploying Nullstack apps running in serverless mode.

We keep working on research for turning possible deploy of other Nullstack build modes, together with making the whole process easier.
