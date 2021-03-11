import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import useSound from 'use-sound'
import { FaPlay, FaStop } from "react-icons/fa";
import { useTranslation } from 'next-i18next';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface IProps {
  morse: string
}

function MorsePlayer({ morse }: IProps) {
  const [isPlaying, setIsPlaying] = useState({ status: false })

  const [playDot, dotData] = useSound('/dot.mp3');
  const [playDash, dashData] = useSound('/dash.mp3');

  const { t } = useTranslation('common')

  const play = async () => {
    let charIndex = 0
    while (charIndex < morse.length && isPlaying.status) {
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

    setIsPlaying({ status: false })
  }

  useEffect(() => { if (isPlaying.status) play() }, [isPlaying])

  const actionClickPlayButton = async () => {
    if (isPlaying.status) {
      // HACK: so state inside play function is mutated
      isPlaying.status = false

      if (dotData.isPlaying) dotData.stop()
      if (dashData.isPlaying) dashData.stop()
    } else {
      setIsPlaying({ status: true})
    }
  }

  return (
    <button
      disabled={morse === ""}
      tw="text-sm lg:text-base disabled:(opacity-50 cursor-not-allowed) transition-opacity duration-300 border text-white rounded-lg w-min px-4 lg:px-6 py-2 focus:(border-transparent ring-2 outline-none)"
      css={[isPlaying.status ? tw`bg-red-500 focus:ring-red-300` : tw`bg-blue-500 focus:ring-blue-300`]}
      onClick={actionClickPlayButton}
    >
      { 
        isPlaying.status
        ? <div tw="flex items-center"><FaStop size="14" /><span tw="ml-2">{ t('button.stop') }</span></div>
        : <div tw="flex items-center"><FaPlay size="14" /><span tw="ml-2">{ t('button.play') }</span></div>
      }
    </button>
  )
}

export default MorsePlayer
