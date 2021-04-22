import { getLanguageCode, getLanguageName } from "../../utils/language";

describe('return relevant language code when given country code', () => {
  it("return correct English code", () => {
    expect(getLanguageCode("us")).toEqual("en-US")
  })

  it("return correct Indonesian code", () => {
    expect(getLanguageCode("id")).toEqual("id-ID")
  })
})

describe('return relevant language name when given country code', () => {
  it("return correct English name", () => {
    expect(getLanguageName("us")).toEqual("English")
  })

  it("return correct Indonesia name", () => {
    expect(getLanguageName("id")).toEqual("Indonesia")
  })
})