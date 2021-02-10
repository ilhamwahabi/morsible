import { GlobalStyles } from 'twin.macro'
import splitbee from '@splitbee/web';
import 'typeface-roboto'

splitbee.init()

const App = ({ Component, pageProps }) => (
  <div>
    <GlobalStyles />
    <Component {...pageProps} />
  </div>
)

export default App