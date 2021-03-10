import React, { useState } from 'react'
import tw from 'twin.macro'
import dynamic from 'next/dynamic'
import { FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
// handle issue: https://github.com/JedWatson/react-select/issues/3590
const Select = dynamic(() => import("react-select"), { ssr: false });
import { Emoji } from 'emoji-mart'

import { getInvalidChar, getInvalidMorse, textToMorse, morseToText } from "../utils";
// this component use client-side library so we should using dynamic import with ssr disabled
const SpeechRecorder = dynamic(() => import('../components/SpeechRecorder'), { ssr: false })
import MorsePlayer from '../components/MorsePlayer'
import TextPlayer from '../components/TextPlayer';

const options = [
  { value: 'indonesia', label: <div tw="flex items-center"><Emoji emoji='flag-id' set='twitter' size={16} /><span tw="ml-3">Indonesia</span></div> },
  { value: 'english', label: <div tw="flex items-center"><Emoji emoji='flag-us' set='twitter' size={16} /><span tw="ml-3">English</span></div>  },
]

function App() {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')
  const [language, setLanguage] = useState(options[0])

  return (
    <div tw="min-h-screen flex flex-col">
      <header tw="bg-blue-500">
        <div tw="container mx-auto py-8 px-8 flex flex-col lg:flex-row justify-between lg:items-end">
          <div tw="text-white">
            <h1 tw="text-4xl lg:text-5xl tracking-wide">Semar</h1>
            <p tw="lg:text-lg mt-2 tracking-wide">fast and reliable morse decoder</p>
          </div>
          <div tw="w-48 mt-6 lg:mt-0">
            <Select
              options={options}
              value={language}
              onChange={setLanguage}
              isSearchable={false}
            />
          </div>
        </div>
      </header>
      <main tw="bg-gray-50 flex-1 flex flex-col justify-center">
        <div tw="container mx-auto py-8 lg:py-10 px-8 flex flex-col lg:flex-row lg:items-end justify-between lg:mt-4 ">
          <div tw="flex flex-col lg:w-5/12">
            <div tw="flex items-end mb-4 lg:mb-6">
              <h2 tw="text-2xl lg:text-3xl text-gray-800 mr-auto pb-1 border-b-2 border-gray-800">Teks</h2>
              <SpeechRecorder
                language={language.value}
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
              tw="h-4row lg:h-6row border border-gray-400 rounded-2xl resize-none p-4 tracking-wider uppercase focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              css={[getInvalidChar(text).length > 0 && tw`border-red-600 focus:ring-red-500`]}
              onChange={event => {
                const textInput = event.target.value

                setText(textInput)
                setMorse(textToMorse(textInput))
              }}
            />
            <span css={[tw`mt-4 text-center text-sm lg:text-base`, getInvalidChar(text).length === 0 && tw`opacity-0`]}>
              Karakter { 
                getInvalidChar(text).map((item, index) => (
                  <>
                    { index > 0 && <span>, </span> }
                    <span tw="text-red-600 font-bold">{item}</span>
                  </>
                ))
              } tidak memiliki kode morse
            </span>
          </div>
          <div tw="flex flex-col lg:w-5/12 mt-8 lg:mt-0">
            <div tw="flex items-end mb-4 lg:mb-6">
              <h2 tw="text-2xl lg:text-3xl text-gray-800 mr-auto pb-1 border-b-2 border-gray-800">Morse</h2>
              <MorsePlayer morse={morse} />
            </div>
            <textarea
              placeholder="Kode Morse"
              value={morse}
              tw="h-4row lg:h-6row border border-gray-400 rounded-2xl resize-none p-4 tracking-wider uppercase focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={event => {
                const morseInput = event.target.value;
                if (!(/^[\.\- /]*$/g.test(morseInput))) return

                setMorse(morseInput)
                setText(morseToText(morseInput).toUpperCase())
              }}
            />
            <span css={[tw`mt-4 text-center text-sm lg:text-base`, getInvalidMorse(morse).length === 0 && tw`opacity-0`]}>
              Morse { 
                getInvalidMorse(morse).map((item, index) => (
                  <>
                    { index > 0 && <span>, </span> }
                    <span tw="text-red-600 font-bold">{item}</span>
                  </>
                ))
              } tidak memiliki karakter alfabet
            </span>
          </div>
        </div>
        <div tw="container mx-auto pb-8 lg:pb-10 px-8">
          <p tw="mx-auto w-max">
            Semar menggunakan {" "}
            <a
              href="https://www.itu.int/dms_pubrec/itu-r/rec/m/R-REC-M.1677-1-200910-I!!PDF-E.pdf"
              target="_blank"
              tw="pb-1 border-b-2 border-gray-800"
            >
              <span>standar konvensi ITU</span> 
            </a>
          </p>
        </div>
      </main>
      <footer tw="text-center text-white py-12 mt-auto bg-gray-800">
        <div tw="flex flex-col lg:flex-row justify-around container mx-auto px-8">
          <div tw="order-2 mt-12 lg:mt-0">
            <p tw="mt-2">&copy; Ilham Wahabi 2021. All Rights Reserved.</p>
            <div tw="mt-6 flex justify-center">
              <a href="https://iwgx.io" target="_blank">
                <FaGlobe size="24" />
              </a>
              <a href="https://twitter.com/ilhamwahabigx" target="_blank" tw="ml-8">
                <FaTwitter size="24" />
              </a>
              <a href="https://github.com/iwgx" target="_blank" tw="ml-8">
                <FaGithub size="24" />
              </a>
            </div>
          </div>
          <div tw="order-1 lg:order-2">
            <p tw="mt-2 border-white border-b-1 pb-1 w-max mx-auto">Sponsor this project</p>
            <div tw="mt-4 lg:mt-5">
              <p>Your logo with link will be added here</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
