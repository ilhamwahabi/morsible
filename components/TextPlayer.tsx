import axios from 'axios'
import { useState } from 'react'
import tw from 'twin.macro'

interface IProps {
  text: string
}

function TextPlayer({ text }: IProps) {
  const [isPlaying, setIsPlaying] = useState(false)

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
        "name": "id-ID-Wavenet-D"
      }
    })

    setIsPlaying(true)
    const sound = new Audio("data:audio/wav;base64," + response.data.audioContent);
    await sound.play();
    sound.addEventListener('ended', () => setIsPlaying(false))
  }

  const actionClickPlayButton = async () => {
    if (!isPlaying) play()
  }

  return (
    <button
      tw="border text-white rounded-lg w-min px-6 py-2 mb-4 lg:mb-6 focus:(border-transparent ring-2 outline-none)"
      css={[isPlaying ? tw`bg-red-500 focus:ring-red-300` : tw`bg-blue-500 focus:ring-blue-300`]}
      onClick={actionClickPlayButton}
    >
      { isPlaying ? 'Berhenti' : 'Putar' }
    </button>
  )
}

export default TextPlayer
