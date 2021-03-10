import { GlobalStyles } from 'twin.macro'
import splitbee from '@splitbee/web';
import Head from 'next/head';
import 'typeface-roboto'
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
      <link rel="shortcut icon" href="favicon.ico" />
      <title>Semar | Morse translator</title>
    </Head>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
)

export default App