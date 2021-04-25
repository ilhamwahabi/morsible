import { render, fireEvent } from '@testing-library/preact'

import SpeechRecorder from '../../components/SpeechRecorder'

test('change button status when clicked', () => {
  const { queryByText, getByText } = render(
    <SpeechRecorder language="us" updateText={() => {}} setIsHold={() => {}} />
  )

  expect(queryByText("Stop")).toBeNull()
  expect(getByText("Play")).toBeInTheDocument()

  fireEvent.click(getByText("Play"))

  expect(queryByText("Play")).toBeNull()
  expect(getByText("Stop")).toBeInTheDocument()
})