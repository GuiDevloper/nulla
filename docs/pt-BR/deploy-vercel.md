## Vercel Deploy

O Vercel é um serviço de hospedagem muito testado e se encaixa no recurso serverless do Nullstack.

Desde a v0.11.5, o Nullstack já suporta a maneira como o Vercel faz *deploy* de aplicativos.

Então, você pode simplesmente seguir o guia padrão com detalhes [aqui](https://github.com/Mortaro/nullstack-vercel) e abaixo

Crie um `api/nullstack.js` para exportar o servidor do aplicativo em modo produção (*production*)

```js
import application from '../.production/server'

export default application.server;
```

Adicione o seguinte `vercel.json` à pasta raiz para redirecionar todas as requisições para o nullstack:

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

Renomeie `build` para `vercel-build` nos `scripts` do package.json

```json
  "scripts": {
    "start": "npx nullstack start",
    "vercel-build": "npx nullstack build --mode=ssr"
  }
```

E pronto! Pode enviar para um repositório e [integrar o Vercel](https://vercel.com/docs#deploy-an-existing-project) ou realizar deploy localmente com o [Vercel CLI](https://docs.netlify.com/cli/get-started).

### Configurando Variáveis de Ambiente

Por padrão, o Nullstack precisa de variáveis como o nome do projeto e domínio.

Variáveis podem ser configuradas ao importar um app do Github, ou na página de configurações do projeto, saiba mais na [documentação do Vercel](https://vercel.com/docs/environment-variables).

## Guia Obsoleto

Para compatibilidade, manteremos os tutoriais antigos aqui:

Tendo seu projeto em um repositório online, execute no terminal aberto em sua pasta:

```sh
npx nulla new-ci vercel
```

Ele gera a pasta **.github** que o [Github usa](https://docs.github.com/pt/actions/learn-github-actions) para entender como construir o app Nullstack.

Enviando a nova pasta via commit, o Github executará outro comando da Nulla, movendo seu código para um novo branch chamado `vercel-deploy`, contruindo no estado perfeito para que a [Integração do Vercel com Github](https://vercel.com/docs#deploy-an-existing-project) seja conectada a ele.

### Deploy Manual

Se por algum motivo você quiser apenas fazer deploy manualmente do ambiente local, então há outras etapas, dê uma olhada na [documentação da CLI do Vercel](https://docs.netlify.com/cli/get-started/#run-builds-locally) para se preparar e execute no terminal aberto na pasta do projeto:

```sh
npx nulla deploy vercel
```

Ele instala dependências (se necessário), executa o seu comando `build` e faz um deploy do Vercel (criando projeto se não existir).

Com tudo indo bem, você terá o link do seu site hospedado na área de transferência, projeto em seu [Vercel Dashboard](https://vercel.com/dashboard) e até mesmo variáveis de ambiente (se houver um arquivo **.env** local) configurado.

A cada mudança a ser entregue, você precisará executar este comando de deploy.

> Dica: ele também pode ser usado como um script no **package.json**

### Ressalvas

Por padrão, Vercel tenta fazer build & deploy de cada branch, mas apenas `vercel-deploy` tem o estado para ser entregue.

Leia [como ignorar uma etapa de construção](https://vercel.com/docs/platform/projects#ignored-build-step) e nesta configuração de projeto defina o seguinte para cancelar cada deploy não proveniente desse branch.

```sh
bash -c 'if [[ $VERCEL_GIT_COMMIT_REF == "vercel-deploy" ]]; then exit 1; fi'
```

Atualmente, o Vercel suporta apenas o deploy de apps Nullstack em execução no modo serverless.

Continuamos trabalhando em pesquisas para tornar possível o deploy de outros modos de construção do Nullstack, além de tornar todo o processo mais fácil.
