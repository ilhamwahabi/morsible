import { useState } from 'react'
import tw from 'twin.macro'
import dynamic from 'next/dynamic'
import { FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
// handle issue: https://github.com/JedWatson/react-select/issues/3590
const Select = dynamic(() => import("react-select"), { ssr: false });
import toast, { Toaster } from 'react-hot-toast';

import { getInvalidChar, getInvalidMorse, textToMorse, morseToText, TCountryCode } from "../utils";
// this component use client-side library so we should using dynamic import with ssr disabled
const SpeechRecorder = dynamic(() => import('../components/SpeechRecorder'), { ssr: false })
import MorsePlayer from '../components/MorsePlayer'
import TextPlayer from '../components/TextPlayer';
import TextField from '../components/TextField';
import InvalidNotice from '../components/InvalidNotice';
import FieldLabel from '../components/FieldLabel';

function LocaleOption({ countryCode, label }: { countryCode: TCountryCode, label: string }) {
  return (
    <div tw="flex items-center">
      <img src={`/flag-${countryCode}.png`} width="20" height="20" alt="" />
      <span tw="ml-3">{ label }</span>
    </div>
  )
}

const options: { value: TCountryCode, label: React.ReactElement }[] = [
  { value: 'us', label: <LocaleOption label="English" countryCode="us" />  },
  { value: 'id', label: <LocaleOption label="Indonesia" countryCode="id" /> },
]

function App() {
  const [language, setLanguage] = useState(options[0])
  const [isHold, setIsHold] = useState(false)
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')

  return (
    <div tw="relative min-h-screen flex flex-col">
      <header tw="bg-gray-50">
        <div tw="container mx-auto py-8 px-8 flex flex-col lg:flex-row justify-between lg:items-end">
          <div tw="flex items-center">
            <img src="/icons/icon-72x72.png" alt="" tw="hidden lg:block mr-8" />
            <div tw="text-gray-900">
              <h1 tw="text-4xl lg:text-5xl tracking-wide">Semar</h1>
              <p tw="lg:text-lg mt-2 tracking-wide">fast and reliable morse translator</p>
            </div>
          </div>
          <div tw="w-44 mt-6 lg:mt-0">
            <Select
              options={options}
              value={language}
              onChange={setLanguage}
              isSearchable={false}
              aria-label="Languages"
            />
          </div>
        </div>
      </header>
      <main tw="bg-gray-50 flex-1 flex flex-col justify-center">
        <div tw="container mx-auto py-8 lg:py-10 px-8 flex flex-col lg:flex-row lg:items-end justify-between lg:mt-4">
          <div tw="flex flex-col lg:w-5/12">
            <div tw="flex items-end mb-4 lg:mb-6">
              <FieldLabel targetId="text" text="Text" />
              <SpeechRecorder
                language={language.value}
                updateText={(transcript) => {
                  setText(transcript)
                  setMorse(textToMorse(transcript))
                }}
                setIsHold={setIsHold}
              />
              <div tw="ml-4">
                <TextPlayer text={text} language={language.value} />
              </div>
            </div>
            <div tw="relative">
              <TextField
                id="text"
                placeholder="Any Text"
                value={text}
                isInvalid={getInvalidChar(text).length > 0}
                updateValue={(value) => {
                  setText(value)
                  setMorse(textToMorse(value))
                }}
              />
            </div>
            <InvalidNotice
              pre="Karakter berikut tidak memiliki kode morse : "
              invalidItems={getInvalidChar(text)}
            />
          </div>
          <div tw="flex flex-col lg:w-5/12 mt-8 lg:mt-0">
            <div tw="flex items-end mb-4 lg:mb-6">
              <FieldLabel targetId="morse" text="Morse" />
              <MorsePlayer morse={morse} />
            </div>
            <div tw="relative">
              <TextField
                id="morse"
                placeholder="Morse code"
                value={morse}
                isInvalid={getInvalidMorse(morse).length > 0}
                updateValue={(value) => {
                  if (!(/^[\.\- /]*$/g.test(value))) return toast.error("Please input valid morse character")
                  
                  setMorse(value)
                  setText(morseToText(value).toUpperCase())
                }}
              />
            </div>
            <InvalidNotice
              pre="Morse berikut tidak memiliki karakter alfabet : "
              invalidItems={getInvalidMorse(morse)}
            />
          </div>
        </div>
        <div tw="container mx-auto pb-8 lg:pb-10 px-8">
          <p tw="mx-auto w-max">
            Semar use {" "}
            <a
              href="https://www.itu.int/dms_pubrec/itu-r/rec/m/R-REC-M.1677-1-200910-I!!PDF-E.pdf"
              target="_blank"
              rel="noopener"
              tw="pb-1 border-b-2 border-gray-800"
            >
              <span>ITU convention standard</span> 
            </a>
          </p>
        </div>
      </main>
      <footer tw="text-center text-white py-12 mt-auto bg-gray-800">
        <div tw="flex flex-col lg:flex-row justify-around container mx-auto px-8">
          <div tw="order-2 mt-12 lg:mt-0">
            <p tw="mt-2 tracking-wide">&copy; Ilham Wahabi 2021. MIT Licensed.</p>
            <div tw="mt-6 flex justify-center">
              <a href="https://iwgx.io" target="_blank" rel="noopener" tw="hover:(opacity-60) transition-opacity" aria-label="Website">
                <FaGlobe size="24" />
              </a>
              <a href="https://twitter.com/ilhamwahabigx" target="_blank" rel="noopener" tw="ml-8 hover:(opacity-60) transition-opacity" aria-label="Twitter">
                <FaTwitter size="24" />
              </a>
              <a href="https://github.com/iwgx" target="_blank" rel="noopener" tw="ml-8 hover:(opacity-60) transition-opacity" aria-label="Github">
                <FaGithub size="24" />
              </a>
            </div>
          </div>
          <div tw="order-1 lg:order-2">
            <p tw="mt-2 border-white border-b-1 pb-1 w-max mx-auto">
              <a
                href={language.value === "us" ? "https://ko-fi.com/ilhamwahabi" : "https://trakteer.id/ilhamwahabi"}
                target="_blank"
                rel="noopener"
              >
                Buy me a coffee
              </a>
            </p>
            <p tw="mt-4 lg:mt-5 tracking-wide">
              Your donation help this project sustainable
            </p>
          </div>
        </div>
      </footer>
      <Toaster position="bottom-center" />
      { isHold ? <div tw="w-screen h-screen fixed bg-gray-900 opacity-40" /> : null }
    </div>
  )
}

export default App
