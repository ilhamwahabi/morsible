import React, { useState } from 'react'
import { invert } from "lodash-es";

const charMapper: { [key: string]: string } = {
  'a': '.-',	
  'b': '-...',	
  'c': '-.-.',	
  'd': '-..',	
  'e': '.',	
  'f': '..-.',
  'g': '--.',	
  'h': '....',	
  'i': '..',	
  'j': '.---',	
  'k': '-.-',	
  'l': '.-..',
  'm': '--',	
  'n': '-.',	
  'o': '---',	
  'p': '.--.',	
  'q': '--.-',	
  'r': '.-.',
  's': '...',	
  't': '-',	
  'u': '..-',	
  'v': '...-',	
  'w': '.--',	
  'x': '-..-',
  'y': '-.--',	
  'z': '--..',
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
  " ": '/'
}

const morseMapper: { [key: string]: string } = invert(charMapper)

const textToMorse = (text: string): string => {
  let morseResult = [];

  for (const char of text) {
    if (charMapper[char]) morseResult.push(charMapper[char])
  }
  
  return morseResult.join(' ');
}

const morseToText = (morse: string): string => {
  let morseResult = [];

  const splitted = morse.split(' ')
  for (let index = 0; index < splitted.length; index++) {
    if (morseMapper[splitted[index]]) morseResult.push(morseMapper[splitted[index]])
  }
  
  return morseResult.join('');
}

function App() {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')

  return (
    <div>
      <header>
        Semar
      </header>
      <main>
        <input
          type="text"
          placeholder="Masukkan Teks"
          value={text}
          onChange={event => {
            setText(event.target.value)
            setMorse(textToMorse(event.target.value))
          }}
        />
        <input
          type="text"
          placeholder="Kode Morse"
          value={morse}
          onChange={event => {
            setMorse(event.target.value)
            setText(morseToText(event.target.value))
          }}
        />
      </main>
    </div>
  )
}

export default App
