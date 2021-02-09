import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { morseToText, textToMorse } from "./index";

const fromMorseToText = suite('fromMorseToText')

const testCase = [
  ['IF4081', '.. ..-. ....- ----- ---.. .----'],
  ['iwgx', '.. .-- --. -..-'],
  ['Semar - Morse translator', '... . -- .- .-. / -....- / -- --- .-. ... . / - .-. .- -. ... .-.. .- - --- .-.'],
]

fromMorseToText('', () => {
  assert.is(morseToText(testCase[0][1]), testCase[0][0])
})

fromMorseToText.run()