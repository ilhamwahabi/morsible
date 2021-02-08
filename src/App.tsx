import React, { useEffect, useState } from 'react'

const textToMorse = (text: string): string => {
  const mapper: { [key: string]: string } = {
    'a':	'.-',	
    'b':	'-...',	
    'c':	'-.-.',	
    'd':	'-..',	
    'e':	'.',	
    'f':	'..-.',
    'g':	'--.',	
    'h':	'....',	
    'i':	'..',	
    'j':	'.---',	
    'k':	'-.-',	
    'l':	'.-..',
    'm':	'--',	
    'n':	'-.',	
    'o':	'---',	
    'p':	'.--.',	
    'q':	'--.-',	
    'r':	'.-.',
    's':	'...',	
    't':	'-',	
    'u':	'..-',	
    'v':	'...-',	
    'w':	'.--',	
    'x':	'-..-',
    'y':	'-.--',	
    'z':	'--..',
    '0': '-----',	
    '1': '.----',	
    "2": '..---',	
    "3": '...--',	
    "4": '....-',	
    "5": '.....',
    "6": '-....',	
    "7": '--...',	
    "8": '---..',	
    "9": '----.',
    ".": '.-.-.-',	
    ",": '--..--',	
    "?": '..--..',	
    "'": '.----.',	
    "!": '-.-.--',	
    "/": '-..-.',
    "(": '-.--.',	
    ")": '-.--.-',	
    "&": '.-...',	
    ":": '---...',	
    ";": '-.-.-.',	
    "=": '-...-',
    "+": '.-.-.',	
    "-": '-....-',	
    "_": '..--.-',	
    '"': '.-..-.',	
    "$": '...-..-',	
    "@": '.--.-.',
    "¿": '..-.-',	
    "¡": '--...-',
    " ": ' / '
  }

  let morseResult = '';

  for (const char of text) {
    if (mapper[char]) morseResult += mapper[char]
  }
  
  return morseResult;
}

function App() {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')

  useEffect(() => {
    setMorse(textToMorse(text))
  }, [text])

  return (
    <div>
      <header>
        Semar
      </header>
      <main>
        <input type="text" placeholder="Masukkan Teks" value={text} onChange={event => setText(event.target.value)} />
        <input type="text" placeholder="Keluaran Kode Morse" disabled value={morse} onChange={event => setMorse(event.target.value)} />
      </main>
    </div>
  )
}

export default App
