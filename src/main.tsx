import React from 'react'
import ReactDOM from 'react-dom'
import splitbee from '@splitbee/web';

import './index.css'
import App from './App'

splitbee.init()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
