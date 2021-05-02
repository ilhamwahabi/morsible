import { GlobalStyles } from 'twin.macro'
import splitbee from '@splitbee/web';
import Head from 'next/head';

splitbee.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
})

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="text,morse,speech,translator,translate,decoder,accessibility,fast,reliable,iwgx,itu,english,indonesia,pwa,sound,audio,trakteer,donate,ko-fi" />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel="manifest" href="/manifest.json" />
        <meta name='theme-color' content='#f9fafb' />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
        
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@ilhamwahabigx' />
        
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='iwgx' />
        
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='msapplication-TileColor' content='#f9fafb' />
        <meta name='msapplication-square150x150logo' content='/icons/mstile-150x150.png' />

        <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#7b7b7b"></link>

        {/* <!-- title --> */}
        <title>Semar - Morse App</title>
        <meta property='og:title' content='Semar - Morse App' />
        <meta name='twitter:title' content='Semar - Morse App' />
        <meta name='application-name' content='Semar - Morse App' />
        <meta name='apple-mobile-web-app-title' content='Semar - Morse App' />

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
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default App