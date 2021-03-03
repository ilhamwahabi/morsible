import React, { useState } from 'react'
import tw from 'twin.macro'
import dynamic from 'next/dynamic'

// this component use client-side library so we should using dynamic import with ssr disabled
const SpeechRecorder = dynamic(() => import('../components/SpeechRecorder'), { ssr: false })
import { getInvalidChar, getInvalidMorse, textToMorse, morseToText } from "../utils";
import MorsePlayer from '../components/MorsePlayer'
import TextPlayer from '../components/TextPlayer';

function App() {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')

  return (
    <div tw="container mx-auto py-8 px-8">
      <header>
        <h1 tw="text-4xl">Semar</h1>
      </header>
      <main tw="flex flex-col lg:flex-row lg:items-end justify-between mt-16">
        <div tw="flex flex-col lg:w-5/12">
          <div tw="flex">
            <SpeechRecorder
              updateText={(transcript) => {
                setText(transcript.join('\n'))
                setMorse(textToMorse(transcript.join('\n')))
              }}
            />
            <div tw="ml-4">
              <TextPlayer text={text} />
            </div>
          </div>
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
          <MorsePlayer morse={morse} />
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
