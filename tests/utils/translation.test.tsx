import { textToMorse, morseToText } from '../../utils/translation';

const testCase = [
  ['IF4081', '.. ..-. ....- ----- ---.. .----'],
  ['iwgx', '.. .-- --. -..-'],
  ['Semar - Morse translator', '... . -- .- .-. / -....- / -- --- .-. ... . / - .-. .- -. ... .-.. .- - --- .-.'],
]

describe('translate text to morse correctly', () => {
  it(`translate ${testCase[0][0]}`, () => {
    expect(textToMorse(testCase[0][0])).toEqual(testCase[0][1])
  })

  it(`translate ${testCase[1][0]}`, () => {
    expect(textToMorse(testCase[1][0])).toEqual(testCase[1][1])
  })

  it(`translate ${testCase[2][0]}`, () => {
    expect(textToMorse(testCase[2][0])).toEqual(testCase[2][1])
  })
})

describe('translate morse to text correctly', () => {
  it(`translate ${testCase[0][1]}`, () => {
    expect(morseToText(testCase[0][1])).toEqual(testCase[0][0].toLowerCase())
  })

  it(`translate ${testCase[1][1]}`, () => {
    expect(morseToText(testCase[1][1])).toEqual(testCase[1][0].toLowerCase())
  })

  it(`translate ${testCase[2][1]}`, () => {
    expect(morseToText(testCase[2][1])).toEqual(testCase[2][0].toLowerCase())
  })
})