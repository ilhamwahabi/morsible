export type TCountryCode = "id" | "us"
export type TLanguageName = "Indonesia" | "English"
export type TLanguageCode = "id-ID" | "en-US"

export function getLanguageCode(language: TCountryCode): TLanguageCode {
  switch (language) {
    case "us": return "en-US"
    case "id": return "id-ID"
    default: return;
  }
}

export function getLanguageName(countryCode: TCountryCode): TLanguageName {
  switch (countryCode) {
    case "us": return "English"
    case "id": return "Indonesia"
    default: return;
  }
}