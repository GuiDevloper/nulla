# Nulla

![Nullstack's waifu Nulla-chan](https://raw.githubusercontent.com/nullstack/nullstack.github.io/7e47095fb480fc4ae62089501e782a836eae764d/public/nullachan.png)

CLI para o Nullstack alimentada pelos poderes e vontades da Nulla-chan.

<div align="right">
  <a href="./README.md">
    <img src="./docs/btn-en.png" alt="go to en-US version" width="180px">
  </a>
</div>

## Uso

Antes de chamar a Nulla, você precisa de um projeto [Nullstack](https://nullstack.app).

Execute a Nulla em sua raiz ou adicione aos seus `scripts` em **package.json**.

Nulla pode entender uma série de comandos, que atualmente são:

```sh
npx nulla -v # exibe a versão da Nulla
npx nulla -h # exibe informação de ajuda

# Gera arquivos de deploy
npx nulla new-ci vercel
# O mesmo que acima, mas para Heroku
npx nulla new-ci heroku
```

Você também pode instalá-la globalmente para o futuro:

```sh
npm install nulla -g # usando npm
yarn global add nulla # ou, usando Yarn
```

com ela instalada, você pode executar diretamente, como:

```sh
nulla --help
```

## Tutoriais

 - [Vercel Deploy](./docs/pt-BR/deploy-vercel.md)
 - [Heroku Deploy](./docs/pt-BR/deploy-heroku.md)
 - [Netlify Deploy](./docs/pt-BR/deploy-netlify.md)

## [to-do](https://github.com/GuiDevloper/nulla/issues/1)
