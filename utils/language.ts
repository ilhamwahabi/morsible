export type TCountryCode = "id" | "us"
export type TLanguageName = "Indonesia" | "English"
export type TLanguageCode = "id-ID" | "en-US"

export function getLanguageCode (language: TCountryCode): TLanguageCode {
  switch (language) {
    case "id": return "id-ID"
    case "us": return "en-US"
    default: return;
  }
}