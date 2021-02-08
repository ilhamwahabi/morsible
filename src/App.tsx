import React, { useState } from 'react'
import 'twin.macro'

function App() {
  const [text, setText] = useState('')

  return (
    <div>
      <input
        type="text"
        placeholder="Masukkan Teks"
        value={text}
        tw="border"
        onChange={event => setText(event.target.value)}
      />
    </div>
  )
}

export default App
