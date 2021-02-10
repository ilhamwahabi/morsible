import React, { useState } from 'react'
import 'twin.macro'

import { textToMorse, morseToText } from "../utils";

function App() {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')

  return (
    <div className="App__container">
      <header className="App__header">
        Semar
      </header>
      <main className="App__main">
        <div>
          <textarea
            placeholder="Masukkan Teks"
            value={text}
            rows={8}
            onChange={event => {
              setText(event.target.value)
              setMorse(textToMorse(event.target.value))
            }}
          />
        </div>
        <div tw="flex flex-col">
          <button>Play</button>
          <textarea
            placeholder="Kode Morse"
            value={morse}
            rows={8}
            onChange={event => {
              setMorse(event.target.value)
              setText(morseToText(event.target.value))
            }}
          />
        </div>
      </main>
    </div>
  )
}

export default App
