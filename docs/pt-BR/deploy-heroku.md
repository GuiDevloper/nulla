# Heroku Deploy

O Heroku tem uma integração contínua do Github ótima com o Nullstack e é recomendado para aplicativos renderizados do lado do servidor.

Quando estiver em seu projeto Nullstack, execute no terminal:

```sh
npx nulla new-ci heroku
```

Ele gera o **Procfile** que o Heroku usa para entender como rodar o build criado pelo Nullstack.

Então, tudo que você precisa fazer é fazer *commit* desse arquivo para o seu repositório Github, abrir seu [Dashboard Heroku](https://dashboard.heroku.com/apps) e conectar um novo aplicativo ao repositório.

> Opcionalmente, habilite deploys automáticos do branch de sua escolha

Se por algum motivo você quiser apenas fazer deploy manualmente do ambiente local, há mais etapas, conforme mostrado abaixo.

## Deploy Manual

Tendo a [CLI do Heroku instalada](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) você pode executar estes passos, como descrito na [Documentação de Deploy do Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app).

```sh
heroku create
```

Em um projeto Nullstack sem repositório git, você precisa iniciar um:

```sh
git init
git add .
git commit -m "Initial deploy"
```

E tem de fazer push do projeto para o remoto `heroku`:

> Adicionando `-u` sempre fará push para o heroku

```sh
git push heroku main
```

> Dica: para ver seu branch, execute `git branch --show-current`

Em seguida, certificando-se de que o projeto possui recursos para executar, basta abrir no navegador:

```sh
heroku ps:scale web=1
heroku open
```

Depois de definir isso, cada mudança que você enviar via commit executará build & deploy e você pode alterar configurações no [Dashboard Heroku](https://dashboard.heroku.com/apps).

## Configurando Variáveis de Ambiente

Por padrão, o Nullstack precisa de variáveis como o nome do projeto e domínio.

Como descrito na documentação de [Configuração de Vars do Heroku](https://devcenter.heroku.com/articles/config-vars#managing-config-vars), existem muitas formas de configurá-las no Heroku.

Aqui está um exemplo configurando no terminal na pasta do projeto:

```sh
heroku config:set NULLSTACK_PROJECT_NAME="Nullstack Heroku"
```

## Ressalvas

Atualmente, o Heroku suporta apenas a construção renderizada do lado do servidor de aplicativos Nullstack.

Continuamos trabalhando em pesquisas para tornar possível o deploy de outros modos de construção do Nullstack.
