import invert from "lodash/invert";

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

export const getInvalidChar = (text: string): string[] => {
  let invalidChar = [];

  for (const char of text) {
    const character = char.toLowerCase()
    if (!charMapper[character] && !invalidChar.includes(character) && character !== '\n') invalidChar.push(character)
  }

  return invalidChar;
}

export const getInvalidMorse = (morse: string) => {
  let invalidMorse = [];

  const splitted = morse.split(' ')
  for (let index = 0; index < splitted.length; index++) {
    const fragment = splitted[index]
    if (!morseMapper[fragment] && fragment !== "" && !invalidMorse.includes(fragment)) invalidMorse.push(fragment)
  }

  return invalidMorse;
}

export const textToMorse = (text: string): string => {
  let morseResult = [];

  for (const char of text) {
    const character = char.toLowerCase()
    if (charMapper[character]) morseResult.push(charMapper[character])
  }
  
  return morseResult.join(' ');
}

export const morseToText = (morse: string): string => {
  let morseResult = [];

  const splitted = morse.split(' ')
  for (let index = 0; index < splitted.length; index++) {
    const fragment = splitted[index]
    if (morseMapper[fragment]) morseResult.push(morseMapper[fragment])
  }
  
  return morseResult.join('');
}

export function getLanguageCode (language: string) {
  if (language === "id") return "id-ID"
  else if (language === "en") return "en-US"
  else return ""
}
export function getLanguageName(countryCode: string) {
  switch (countryCode) {
    case "en": return "English"
    case "id": return "Indonesia"
    default: return "";
  }
}