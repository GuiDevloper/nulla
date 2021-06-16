# Netlify Deploy

Netlify tem uma das melhores UIs e é recomendado para geração de sites estáticos.

Não há necessidade de executar um comando da Nulla ao fazer deploy de um SSG lá e os tutoriais de deploy são válidos.

Tendo seu projeto em um repositório online, siga os [passos para conectar o Netlify](https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git) a ele e adicionar um comando como o seguinte a build:

```sh
npx nullstack build --mode=ssg --output=ssg
```

E a pasta **ssg** como o diretório a ser publicado.

## Deploy Manual

Se por algum motivo você quiser apenas fazer deploy manualmente do ambiente local, então há mais etapas, dê uma olhada na [documentação da CLI do Netlify](https://docs.netlify.com/cli/get-started/#run-builds-locally).

## Configurando Variáveis de Ambiente

Por padrão, o Nullstack precisa de variáveis como o nome do projeto e domínio.

Siga o [guia do Netlify](https://docs.netlify.com/configure-builds/environment-variables/) para configurar variáveis usando a UI do Netlify.

## Ressalvas

Atualmente, o Netlify suporta apenas a geração de sites Nullstack estáticos.

Continuamos trabalhando em pesquisas para tornar possível o deploy de outros modos de construção do Nullstack e recursos como o específico Netlify Functions.
