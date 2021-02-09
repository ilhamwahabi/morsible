import { textToMorse, morseToText } from './index';

const testCase = [
  ['IF4081', '.. ..-. ....- ----- ---.. .----'],
  ['iwgx', '.. .-- --. -..-'],
  ['Semar - Morse translator', '... . -- .- .-. / -....- / -- --- .-. ... . / - .-. .- -. ... .-.. .- - --- .-.'],
]

describe('translate text to morse correctly', async () => {
  it(`translate ${testCase[0][0]}`, () => {
    expect(textToMorse(testCase[0][0])).toEqual(testCase[0][1])
  })
})