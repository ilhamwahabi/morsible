import { useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import tw from 'twin.macro'

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
    googleApiKey: "AIzaSyCF8wT4zBN8FuBInmBr9KJA_-XloRqRoGQ",
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
        {isRecording ? 'Berhenti Rekam' : 'Mulai Rekam'}
      </button>
    </div>
  )
}

export default Recorder
