import { useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import tw from 'twin.macro'
import { FaMicrophone, FaStop } from "react-icons/fa";
import toast from 'react-hot-toast';

import { getLanguageCode, getLanguageName } from '../utils';

interface IProps {
  language: string,
  updateText: (text: string) => void
}

function Recorder({ updateText, language }: IProps) {
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    timeout: 10000,
    speechRecognitionProperties: {
      lang: getLanguageCode(language)
    },
    crossBrowser: true,
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    googleCloudRecognitionConfig: {
      languageCode: getLanguageCode(language)
    }
  });

  if (error) toast.error(`${error}`)

  useEffect(() => { updateText(results[results.length - 1] || "") }, [results])

  return (
    <div>
      <button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        tw="tracking-wider shadow-md text-sm lg:text-base border text-white rounded-lg w-28 lg:w-32 px-4 lg:px-6 py-2 focus:(border-transparent ring-2 outline-none) transition-colors duration-300"
        css={[isRecording ? tw`bg-red-600 focus:ring-red-300 hover:bg-red-700` : tw`bg-green-700 focus:ring-green-300 hover:bg-green-800` ]}
      >
        {
          isRecording
            ? <div tw="flex items-center"><FaStop size="14" /><span tw="ml-2 tracking-widest">Finish</span></div>
            : <div tw="flex items-center"><FaMicrophone /><span tw="ml-2">Speech</span></div>
        }
      </button>
    </div>
  )
}

export default Recorder
