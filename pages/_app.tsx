import { GlobalStyles } from 'twin.macro'
import splitbee from '@splitbee/web';
import Head from 'next/head';
import 'typeface-roboto'
import { appWithTranslation } from 'next-i18next'

import '../index.css'

splitbee.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
})

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name='description' content='Fast and Reliable Morse App' />
      <link rel="shortcut icon" href="favicon.ico" />
      <title>Semar | Morse app</title>
    </Head>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
)

export default appWithTranslation(App)