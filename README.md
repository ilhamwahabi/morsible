# Semar

Translator for text/voice <-> morse code, but with high performance; pwa support; and accessibility friendly.

Built for the sake of `IF4081 - Informatika untuk Komunitas` lectures, also to explore new tech stack and things about audio management in React.

Tech stack:

- `React` (hooks) + `Typescript` with `Next.js`
- `jotai` for state management
- `twin.macro` with `emotion` and `Tailwind CSS` for styling
- `Framer Motion` for animation
- `@testing-library/react` and `Jest` for testing
- `Splitbee` for analytics
- `Vercel` for deployment

## Usage

1. Clone this repo
2. Get Google API Key from Google Cloud Console then create `.env` file with variables

```
NEXT_PUBLIC_GOOGLE_API_KEY=xxxxxxxxxx
```

3. Install package, `npm install`
4. Run, `npm run dev`

Or open direcly here https://semar.iwgx.io
