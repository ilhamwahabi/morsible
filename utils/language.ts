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