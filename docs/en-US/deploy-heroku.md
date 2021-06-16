# Heroku Deploy

Heroku has a great Github Continuous Integration with Nullstack and is recommended for server-side rendered apps.

When in your Nullstack project, run in the terminal:

```sh
npx nulla new-ci heroku
```

It generates the **Procfile** which Heroku uses to understand how to run the build created by Nullstack.

Then all you need to do is commit that file to your Github repository, open your [Heroku Dashboard](https://dashboard.heroku.com/apps) and connect a new app to the repository.

> Optionally enable automatic deploys from the branch of your choice

If for some reason you only want to deploy manually from local environment, then there are more steps, as shown below.

## Manual Deploy

Having the [Heroku CLI installed](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) you can run these steps, as described in [Heroku Deploy Documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app).

```sh
heroku create
```

In a Nullstack project without git repository, you need to initiate one:

```sh
git init
git add .
git commit -m "Initial deploy"
```

And has to push the project to `heroku` remote:

> Appending `-u` it will always push to heroku

```sh
git push heroku main
```

> Tip: to see your branch, run `git branch --show-current`

Then, making sure the project has resources to run, just open in browser:

```sh
heroku ps:scale web=1
heroku open
```

After this being set, every change you commit is going to run build & deploy and you can change settings in [Heroku Dashboard](https://dashboard.heroku.com/apps).

## Configuring Environment Variables

By default, Nullstack needs variables as the project name and domain.

As described in [Heroku Config Vars docs](https://devcenter.heroku.com/articles/config-vars#managing-config-vars), there are many ways of configuring them in Heroku.

Here is an example of configuring in terminal at project folder:

```sh
heroku config:set NULLSTACK_PROJECT_NAME="Nullstack Heroku"
```

## Caveats

Currently Heroku only supports server-side rendered building of Nullstack apps.

We keep working on research for turning possible deploy of other Nullstack build modes.
