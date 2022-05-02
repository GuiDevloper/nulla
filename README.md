# Nulla

![Nullstack's waifu Nulla-chan](https://raw.githubusercontent.com/nullstack/nullstack.github.io/7e47095fb480fc4ae62089501e782a836eae764d/public/nullachan.png)

CLI for Nullstack fed by Nulla-chan powers and will.

<div align="right">
  <a href="./README.BR.md">
    <img src="./docs/btn-br.png" alt="go to pt-BR version" width="180px">
  </a>
</div>

## Usage

Before calling Nulla you need a [Nullstack](https://nullstack.app) project.

Run Nulla in it's root, or adding to your `scripts` in **package.json**.

Nulla can understand a series of commands, which currently are:

```sh
npx nulla -v # shows Nulla version
npx nulla help # shows help information

# Generates deploy files
npx nulla new-ci vercel
# The same as above, but for Heroku
npx nulla new-ci heroku
```

You can also install it globally for the future:

```sh
npm install nulla -g # using npm
yarn global add nulla # or, using Yarn
```

with it installed, you can directly run, like:

```sh
nulla help
```

## Tutorials with Nulla

 - [Vercel Deploy](./docs/en-US/deploy-vercel.md)
 - [Heroku Deploy](./docs/en-US/deploy-heroku.md)
 - [Netlify Deploy](./docs/en-US/deploy-netlify.md)

## [to-do](https://github.com/GuiDevloper/nulla/issues/1)
