import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import useSound from 'use-sound'

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface IProps {
  morse: string
}

function MorsePlayer({ morse }: IProps) {
  const [isPlayingMorse, setIsPlayingMorse] = useState({ status: false })

  const [playDot, dotData] = useSound('/dot.mp3');
  const [playDash, dashData] = useSound('/dash.mp3');

  const playMorse = async () => {
    let charIndex = 0
    while (charIndex < morse.length && isPlayingMorse.status) {
      const char = morse[charIndex]

      if (char === ".") {
        playDot()
        await timeout(dotData.duration);
      } else if (char === '-') {
        playDash()
        await timeout(dashData.duration);
      } else if (char === ' ') {
        await timeout(250)
      } else if (char === "/") {
        await timeout(150)
      }

      charIndex++
    }

    setIsPlayingMorse({ status: false })
  }

  useEffect(() => { if (isPlayingMorse.status) playMorse() }, [isPlayingMorse])

  const actionClickMorseButton = async () => {
    if (isPlayingMorse.status) {
      // HACK: so state inside playMorse function is mutated
      isPlayingMorse.status = false

      if (dotData.isPlaying) dotData.stop()
      if (dashData.isPlaying) dashData.stop()
    } else {
      setIsPlayingMorse({ status: true})
    }
  }

  return (
    <button
      tw="border text-white rounded-lg w-min px-6 py-2 mb-4 lg:mb-6 focus:(border-transparent ring-2 outline-none)"
      css={[isPlayingMorse.status ? tw`bg-red-500 focus:ring-red-300` : tw`bg-blue-500 focus:ring-blue-300`]}
      onClick={actionClickMorseButton}
    >
      { isPlayingMorse.status ? 'Berhenti' : 'Putar' }
    </button>
  )
}

export default MorsePlayer
