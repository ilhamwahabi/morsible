import { getLanguageCode } from "../../utils/language";

describe('return relevant language code given country code', () => {
  it("return correct Indonesian code", () => {
    expect(getLanguageCode("id")).toEqual("id-ID")
  })

  it("return correct English code", () => {
    expect(getLanguageCode("us")).toEqual("en-US")
  })
})