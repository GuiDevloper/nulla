import './Application.css'
import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack'

import Home from './Home'

declare function Head(): NullstackNode

class Application extends Nullstack {

  prepare({ page }: NullstackClientContext) {
    page.locale = '{{PROJECT_LANG}}'
  }

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </head>
    )
  }

  render() {
    return (
      <main>
        <Head />
        <Home route="/" greeting="'Hello World!' - Nulla" />
      </main>
    )
  }

}

export default Application
