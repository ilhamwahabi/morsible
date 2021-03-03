import { useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import tw from 'twin.macro'
import { FaMicrophone, FaStop } from "react-icons/fa";

interface IProps {
  updateText: (text: string[]) => void
}

function Recorder({ updateText }: IProps) {
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    timeout: 10000,
    crossBrowser: true,
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    googleCloudRecognitionConfig: {
      languageCode: 'id-ID'
    }
  });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  useEffect(() => { updateText(results) }, [results])

  return (
    <div>
      <button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        tw="border  text-white rounded-lg px-6 py-2 mb-4 lg:mb-6 focus:(border-transparent ring-2 outline-none)"
        css={[isRecording ? tw`bg-red-500 focus:ring-red-300` : tw`bg-green-500 focus:ring-green-300` ]}
      >
        { 
          isRecording
            ? <div tw="flex items-center"><FaStop size="14" /><span tw="ml-2">Berhenti</span></div>
            : <div tw="flex items-center"><FaMicrophone /><span tw="ml-2">Rekam</span></div>
        }
      </button>
    </div>
  )
}

export default Recorder
