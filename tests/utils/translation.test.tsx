import { textToMorse, morseToText, getInvalidChar } from '../../utils/translation';

const [case1, case2, case3] = [
  ['IF4081', '.. ..-. ....- ----- ---.. .----'],
  ['iwgx', '.. .-- --. -..-'],
  ['Semar - Morse translator', '... . -- .- .-. / -....- / -- --- .-. ... . / - .-. .- -. ... .-.. .- - --- .-.'],
]

describe('translate text to morse correctly', () => {
  it(`translate ${case1[0]}`, () => {
    expect(textToMorse(case1[0])).toEqual(case1[1])
  })

  it(`translate ${case2[0]}`, () => {
    expect(textToMorse(case2[0])).toEqual(case2[1])
  })

  it(`translate ${case3[0]}`, () => {
    expect(textToMorse(case3[0])).toEqual(case3[1])
  })
})

describe('translate morse to text correctly', () => {
  it(`translate ${case1[1]}`, () => {
    expect(morseToText(case1[1])).toEqual(case1[0].toLowerCase())
  })

  it(`translate ${case2[1]}`, () => {
    expect(morseToText(case2[1])).toEqual(case2[0].toLowerCase())
  })

  it(`translate ${case3[1]}`, () => {
    expect(morseToText(case3[1])).toEqual(case3[0].toLowerCase())
  })
})

describe('return array of invalid characters when any character invalid', () => {
  it('return invalid characters', () => {
    expect(getInvalidChar("^1 Bintang *")).toEqual(["^", "*"])
  })

  it('return empty array', () => {
    expect(getInvalidChar("7u5t a n0rm4l t3xt")).toEqual([])
  })
})