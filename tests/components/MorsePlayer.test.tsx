import { render, fireEvent } from '@testing-library/preact'

import MorsePlayer from '../../components/MorsePlayer'

test('change button status when clicked', () => {
  const { queryByText, getByText } = render(
    <MorsePlayer morse="..-" setIsHold={() => {}} />
  )

  expect(queryByText("Stop")).toBeNull()
  expect(getByText("Play")).toBeInTheDocument()

  fireEvent.click(getByText("Play"))

  expect(queryByText("Play")).toBeNull()
  expect(getByText("Stop")).toBeInTheDocument()
})