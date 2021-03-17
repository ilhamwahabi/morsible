import { useState } from 'react'
import 'twin.macro'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
// handle issue: https://github.com/JedWatson/react-select/issues/3590
const Select = dynamic(() => import("react-select"), { ssr: false });
import { Emoji } from 'emoji-mart'
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getInvalidChar, getInvalidMorse, textToMorse, morseToText } from "../utils";
// this component use client-side library so we should using dynamic import with ssr disabled
const SpeechRecorder = dynamic(() => import('../components/SpeechRecorder'), { ssr: false })
import MorsePlayer from '../components/MorsePlayer'
import TextPlayer from '../components/TextPlayer';
import TextField from '../components/TextField';
import InvalidNotice from '../components/InvalidNotice';
import FieldLabel from '../components/FieldLabel';

function LocaleOption({ countryCode, label }) {
  return (
    <div tw="flex items-center">
      <Emoji emoji={`flag-${countryCode}`} set='twitter' size={16} />
      <span tw="ml-3">{ label }</span>
    </div>
  )
}

const options = [
  { value: 'id', label: <LocaleOption label="Indonesia" countryCode="id" /> },
  { value: 'en', label: <LocaleOption label="English" countryCode="us" />  },
]

function App() {
  const router = useRouter()

  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')

  const { t } = useTranslation('common')

  return (
    <div tw="min-h-screen flex flex-col">
      <header tw="bg-blue-500">
        <div tw="container mx-auto py-8 px-8 flex flex-col lg:flex-row justify-between lg:items-end">
          <div tw="text-white">
            <h1 tw="text-4xl lg:text-5xl tracking-wide">Semar</h1>
            <p tw="lg:text-lg mt-2 tracking-wide">{ t('subtitle') }</p>
          </div>
          <div tw="w-48 mt-6 lg:mt-0">
            <Select
              options={options}
              value={options[router.locale === "en" ? 1 : 0]}
              onChange={(value: any) => {
                if (value.value === "id") router.push('/', null, { locale: 'id' })  
                else if (value.value === "en") { router.push('/', null, { locale: 'en' })}
              }}
              isSearchable={false}
              aria-label="Languages"
            />
          </div>
        </div>
      </header>
      <main tw="bg-gray-50 flex-1 flex flex-col justify-center">
        <div tw="container mx-auto py-8 lg:py-10 px-8 flex flex-col lg:flex-row lg:items-end justify-between lg:mt-4 ">
          <div tw="flex flex-col lg:w-5/12">
            <div tw="flex items-end mb-4 lg:mb-6">
              <FieldLabel targetId="text" text={t('text.title')} />
              <SpeechRecorder
                language={router.locale}
                updateText={(transcript) => {
                  setText(transcript.join('\n'))
                  setMorse(textToMorse(transcript.join('\n')))
                }}
              />
              <div tw="ml-4">
                <TextPlayer text={text} language={router.locale} />
              </div>
            </div>
            <div tw="relative">
              <TextField
                id="text"
                placeholder={t('text.placeholder')}
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
              <FieldLabel targetId="morse" text={t('morse.title')} />
              <MorsePlayer morse={morse} />
            </div>
            <div tw="relative">
              <TextField
                id="morse"
                placeholder={t('morse.placeholder')}
                value={morse}
                isInvalid={getInvalidMorse(morse).length > 0}
                updateValue={(value) => {
                  if (!(/^[\.\- /]*$/g.test(value))) return toast.error("Karakter tidak valid")
                  
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
            { t('disclaimer.pre') }
            <a
              href="https://www.itu.int/dms_pubrec/itu-r/rec/m/R-REC-M.1677-1-200910-I!!PDF-E.pdf"
              target="_blank"
              rel="noopener"
              tw="pb-1 border-b-2 border-gray-800"
            >
              <span>{ t('disclaimer.link') }</span> 
            </a>
          </p>
        </div>
      </main>
      <footer tw="text-center text-white py-12 mt-auto bg-gray-800">
        <div tw="flex flex-col lg:flex-row justify-around container mx-auto px-8">
          <div tw="order-2 mt-12 lg:mt-0">
            <p tw="mt-2 tracking-wide">&copy; Ilham Wahabi 2021. { t('footer.license') }</p>
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
                href={router.locale === "en" ? "https://ko-fi.com/ilhamwahabi" : "https://trakteer.id/ilhamwahabi"}
                target="_blank"
                rel="noopener"
              >
                { t('footer.sponsor.main') }
              </a>
            </p>
            <p tw="mt-4 lg:mt-5 tracking-wide">
              { t('footer.sponsor.caption') }
            </p>
          </div>
        </div>
      </footer>
      <Toaster position="bottom-center" />
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default App
