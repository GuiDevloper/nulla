# Nulla

![Nullstack's waifu Nulla-chan](https://raw.githubusercontent.com/nullstack/nullstack.github.io/7e47095fb480fc4ae62089501e782a836eae764d/public/nullachan.png)

Nullstack CLI fed by Nulla-chan powers and will

## Usage

Before calling Nulla you need a [Nullstack](https://nullstack.app) project.

Run Nulla in it's root, or adding to your `scripts` in **package.json**.

Nulla can understand a series of commands, which currently are:

```sh
npx nulla -v # shows Nulla version

npx nulla start # start webpack dev server watching files
npx nulla build # build nullstack project for production

# install & add element plugin to index.js using Yarn
npx nulla add nullstack-vueable

# the same, but using 'npm install'
npx nulla add nullstack-vueable -n
```

You can also install it globally for the future:

```sh
npm install nulla -g # using npm
yarn global add nulla # or, using Yarn
```

with it installed, you can directly run, like:

```sh
nulla start
```

## [to-do](https://github.com/GuiDevloper/nulla/issues/1)
