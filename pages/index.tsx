import React, { useState } from 'react'
import useSound from 'use-sound'
import tw from 'twin.macro'
import dynamic from 'next/dynamic'
const Recorder = dynamic(() => import('../components/Recorder'), { ssr: false })

import { getInvalidChar, getInvalidMorse, textToMorse, morseToText } from "../utils";

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')

  const [playDot, dotData] = useSound('/dot.mp3');
  const [playDash, dashData] = useSound('/dash.mp3');

  const playMorse = async () => {
    for (const char of morse) {
      if (char === ".") {
        playDot()
        await timeout(dotData.duration);
      } else if (char === '-') {
        playDash()
        await timeout(dashData.duration);
      } else if (char === ' ') {
        await timeout(250)
      } else if (char === "/") {
        await timeout(150)
      }
    }
  }

  return (
    <div tw="container mx-auto py-8 px-8">
      <header>
        <h1 tw="text-4xl">Semar</h1>
      </header>
      <main tw="flex flex-col lg:flex-row lg:items-end justify-between mt-8">
        <div tw="flex flex-col lg:w-5/12">
          <Recorder
            updateText={(transcript) => {
              setText(transcript.join('\n'))
              setMorse(textToMorse(transcript.join('\n')))
            }}
          />
          <textarea
            placeholder="Masukkan Teks"
            value={text}
            rows={6}
            tw="border border-gray-300 rounded-2xl resize-none p-4 tracking-wider uppercase focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={event => {
              const textInput = event.target.value

              setText(textInput)
              setMorse(textToMorse(textInput))
            }}
          />
          <span css={[tw`mt-4 text-center`, getInvalidChar(text).length === 0 && tw`opacity-0`]}>
            Karakter { 
              getInvalidChar(text).map((item, index) => (<>
                { index > 0 && <span>, </span> }
                <span tw="text-red-600 font-bold">{item}</span>
              </>))
            } tidak memiliki kode morse
          </span>
        </div>
        <div tw="flex flex-col lg:w-5/12 mt-10 lg:mt-0">
          <button
            tw="border bg-blue-500 text-white rounded-lg w-min px-6 py-2 mb-4 lg:mb-6 focus:border-transparent focus:ring-2 focus:ring-blue-300 focus:outline-none"
            onClick={playMorse}
          >
            Putar
          </button>
          <textarea
            placeholder="Kode Morse"
            value={morse}
            rows={6}
            tw="border border-gray-300 rounded-2xl resize-none p-4 tracking-wider uppercase focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={event => {
              const morseInput = event.target.value;
              if (!(/^[\.\- /]*$/g.test(morseInput))) return

              setMorse(morseInput)
              setText(morseToText(morseInput).toUpperCase())
            }}
          />
          <span css={[tw`mt-4 text-center`, getInvalidMorse(morse).length === 0 && tw`opacity-0`]}>
            Morse { 
              getInvalidMorse(morse).map((item, index) => (<>
                { index > 0 && <span>, </span> }
                <span tw="text-red-600 font-bold">{item}</span>
              </>))
            } tidak memiliki karakter alfabet
          </span>
        </div>
      </main>
    </div>
  )
}

export default App
