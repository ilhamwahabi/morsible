import React, { useState } from 'react'
import 'twin.macro'

import { textToMorse, morseToText } from "../utils";

function App() {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')

  return (
    <div tw="container mx-auto py-8 px-8">
      <header>
        <h1 tw="text-4xl">Semar</h1>
      </header>
      <main tw="flex flex-col lg:flex-row lg:items-end justify-between mt-8">
        <div tw="flex flex-col lg:w-5/12">
          <textarea
            placeholder="Masukkan Teks"
            value={text}
            rows={8}
            tw="border border-gray-300 rounded-2xl resize-none p-4"
            onChange={event => {
              setText(event.target.value)
              setMorse(textToMorse(event.target.value))
            }}
          />
        </div>
        <div tw="flex flex-col lg:w-5/12 mt-10 lg:mt-0">
          <button tw="border bg-blue-500 text-white rounded-xl w-min px-8 py-2 mb-4 lg:mb-8">Play</button>
          <textarea
            placeholder="Kode Morse"
            value={morse}
            rows={8}
            tw="border border-gray-300 rounded-2xl resize-none p-4"
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
