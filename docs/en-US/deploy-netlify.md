# Netlify Deploy

Netlify has one of best UIs and is recommended for static-generated sites.

There's no need to run a Nulla command when deploying a SSG there and deploy tutorials are valid.

Having your project in a online repository, follow the [steps to connect Netlify](https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git) to it and add a command like following in the build:

```sh
npx nullstack build --mode=ssg --output=ssg
```

And the folder **ssg** as directory to be published.

## Manual Deploy

If for some reason you only want to deploy manually from local environment, then there are more steps, take a look at [Netlify CLI docs](https://docs.netlify.com/cli/get-started/#run-builds-locally).

## Configuring Environment Variables

By default, Nullstack needs variables as the project name and domain.

Follow the [Netlify guide](https://docs.netlify.com/configure-builds/environment-variables/) to configure variables using Netlify UI.

## Caveats

Currently Netlify only supports static-generating of Nullstack sites.

We keep working on research for turning possible deploy of other Nullstack build modes, like the specific feature Netlify Functions.