import { GlobalStyles } from 'twin.macro'
import splitbee from '@splitbee/web';
import Head from 'next/head';

splitbee.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
})

const App = ({ Component, pageProps }) => {
  // fix `Reference error: window is not defined` although we not use SSR 
  if (typeof window === 'undefined') return <div />

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="text,morse,speech,translator,translate,decoder,accessibility,fast,reliable,iwgx,itu,english,indonesia,pwa,sound,audio,trakteer,donate,ko-fi" />
        <link rel="shortcut icon" href="favicon.ico" />

        {/* <!-- title --> */}
        <title>Semar - Morse App</title>
        <meta property='og:title' content='Semar - Morse App' />
        <meta name='twitter:title' content='Semar - Morse App' />
        
        {/* <!-- url --> */}
        <link rel='canonical' href='https://semar.iwgx.io' />
        <meta property='og:url' content='https://semar.iwgx.io' />
        <meta name='twitter:url' content='https://semar.iwgx.io' />
        
        {/* <!-- description --> */}
        <meta name='description' content='Fast and reliable morse translator with speech functionality' />
        <meta property='og:description' content='Fast and reliable morse translator with speech functionality' />
        <meta name='twitter:description' content='Fast and reliable morse translator with speech functionality' />
        
        {/* <!-- image --> */}
        <meta property="og:image" content="https://i.ibb.co/tY8jSh0/semar-card.png" />
        <meta name="twitter:image" content="https://i.ibb.co/tY8jSh0/semar-card.png" />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@ilhamwahabigx' />

        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='iwgx' />

        <link rel="manifest" href="/manifest.json" />
        <meta name='theme-color' content='#f9fafb' />
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon-180x180.png' />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default App