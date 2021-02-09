import React, { useState } from 'react'

import { textToMorse, morseToText } from "./utils";

function App() {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')

  return (
    <div>
      <header>
        Semar
      </header>
      <main>
        <input
          type="text"
          placeholder="Masukkan Teks"
          value={text}
          onChange={event => {
            setText(event.target.value)
            setMorse(textToMorse(event.target.value))
          }}
        />
        <input
          type="text"
          placeholder="Kode Morse"
          value={morse}
          onChange={event => {
            setMorse(event.target.value)
            setText(morseToText(event.target.value))
          }}
        />
      </main>
    </div>
  )
}

export default App
