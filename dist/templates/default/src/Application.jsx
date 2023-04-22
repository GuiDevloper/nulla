import './Application.css'
import Nullstack from 'nullstack'

import Home from './Home'

class Application extends Nullstack {

  prepare({ page }) {
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
