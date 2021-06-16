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
npx nulla help # exibe informação de ajuda

npx nulla start # inicia servidor dev webpack assistindo arquivos
npx nulla build # constrói projeto nullstack para produção

# instala e adiciona plugin de elemento ao index.js usando Yarn
npx nulla add nullstack-vueable

# o mesmo, mas usando 'npm install'
npx nulla add nullstack-vueable -n

# Gera arquivo de automação de deploy para Github
npx nulla new-ci vercel
# O mesmo que acima, mas para Heroku
npx nulla new-ci heroku

# constrói e faz deploy de projeto pra vercel localmente
# (cli da vercel logada é necessário)
npx nulla deploy vercel

# Constrói projeto no Git para ser usado pelo próprio CI/CD da Vercel
# (é uma boa prática usar uma versão fixa)
npx nulla@0.7.2 deploy vercel --cd
```

Você também pode instalá-la globalmente para o futuro:

```sh
npm install nulla -g # usando npm
yarn global add nulla # ou, usando Yarn
```

com ela instalada, você pode executar diretamente, como:

```sh
nulla start
```

## Tutoriais

 - [Vercel Deploy](./docs/pt-BR/deploy-vercel.md)
 - [Heroku Deploy](./docs/pt-BR/deploy-heroku.md)
 - [Netlify Deploy](./docs/pt-BR/deploy-netlify.md)

## [to-do](https://github.com/GuiDevloper/nulla/issues/1)
