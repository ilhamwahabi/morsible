import { useState } from 'react'
import tw from 'twin.macro'
import { FaPlay, FaStop } from "react-icons/fa";
import toast from 'react-hot-toast';

import { TEvent } from '../utils/event';
import { getLanguageCode, TCountryCode } from '../utils/language';

const TEXT_TO_SPEECH_URL = "https://texttospeech.googleapis.com/v1beta1/text:synthesize"

interface IProps {
  text: string
  language: TCountryCode
  setIsHold: (isHold: { status: boolean, event?: TEvent }) => void
}

function TextPlayer(props: IProps) {
  const { text, language, setIsHold } = props;

  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement>(null)

  const play = async () => {
    try {
      const response = await fetch(
        `${TEXT_TO_SPEECH_URL}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            "audioConfig": {
              "audioEncoding": "LINEAR16",
              "pitch": 0,
              "speakingRate": 1
            },
            "input": {
              "text": text
            },
            "voice": {
              "languageCode": getLanguageCode(language),
              "name": `${getLanguageCode(language)}-Wavenet-C`
            }
          }
        )
      })

      const results = await response.json()
      const sound = new Audio("data:audio/wav;base64," + results.audioContent);
      sound.addEventListener('play', () => setIsPlaying(true))
      sound.addEventListener('pause', () => {
        setIsPlaying(false)
        setIsHold({ status: false })
      })
  
      setAudio(sound)
      await sound.play();
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  const stop = () => {
    audio.pause()
  }

  const actionClickPlayButton = async () => {
    if (text === "") return toast.error("Please input any text")
    
    if (!isPlaying) {
      setIsHold({ status: true, event: 'play-text' })
      setIsPlaying(true)
      play()
    }
    else {
      setIsHold({ status: false })
      setIsPlaying(false)
      stop()
    }
  }

  return (
    <>
      <button
        aria-label={isPlaying ? 'Stop play' : 'Play text'}
        tw="relative tracking-wider shadow-md text-sm lg:text-base transition-all duration-300 border text-white rounded-lg w-22 lg:w-28 px-4 lg:px-6 py-2 focus:(border-transparent ring-2 outline-none)"
        css={[isPlaying ? tw`bg-red-600 focus:ring-red-300 hover:bg-red-700 z-10` : tw`bg-blue-700 focus:ring-blue-300 hover:bg-blue-800`]}
        onClick={actionClickPlayButton}
      >
        { 
          isPlaying
          ? <div tw="flex items-center"><FaStop size="14" /><span tw="ml-2">Stop</span></div>
          : <div tw="flex items-center"><FaPlay size="14" /><span tw="ml-2 tracking-widest">Play</span></div>
        }
      </button>
    </>
  )
}

export default TextPlayer
