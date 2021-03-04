import axios from 'axios'
import { useState } from 'react'
import tw from 'twin.macro'
import { FaPlay, FaStop } from "react-icons/fa";

interface IProps {
  text: string
}

function TextPlayer({ text }: IProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement>(null)

  const play = async () => {
    const response = await axios.post(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`, {
      "audioConfig": {
        "audioEncoding": "LINEAR16",
        "pitch": 0,
        "speakingRate": 1
      },
      "input": {
        "text": text
      },
      "voice": {
        "languageCode": "id-ID",
        "name": "id-ID-Wavenet-C"
      }
    })

    const sound = new Audio("data:audio/wav;base64," + response.data.audioContent);
    sound.addEventListener('play', () => setIsPlaying(true))
    sound.addEventListener('pause', () => setIsPlaying(false))

    setAudio(sound)
    await sound.play();
  }

  const stop = () => {
    audio.pause()
  }

  const actionClickPlayButton = async () => {
    if (!isPlaying) play()
    else stop()
  }

  return (
    <button
      disabled={text === ""}
      tw="disabled:(opacity-50 cursor-not-allowed) transition-opacity duration-300 border text-white rounded-lg w-min px-6 py-2 mb-4 lg:mb-6 focus:(border-transparent ring-2 outline-none)"
      css={[isPlaying ? tw`bg-red-500 focus:ring-red-300` : tw`bg-blue-500 focus:ring-blue-300`]}
      onClick={actionClickPlayButton}
    >
      { isPlaying
        ? <div tw="flex items-center"><FaStop size="14" /><span tw="ml-2">Berhenti</span></div>
        : <div tw="flex items-center"><FaPlay size="14" /><span tw="ml-2">Putar</span></div>
      }
    </button>
  )
}

export default TextPlayer
