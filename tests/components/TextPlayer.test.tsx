import { render, fireEvent } from '@testing-library/preact'

import TextPlayer from '../../components/TextPlayer'

test('change button status when clicked', () => {
  const { queryByText, getByText } = render(
    <TextPlayer text="test" language="id" setIsHold={() => {}} />
  )

  expect(queryByText("Stop")).toBeNull()
  expect(getByText("Play")).toBeInTheDocument()

  fireEvent.click(getByText("Play"))

  expect(queryByText("Play")).toBeNull()
  expect(getByText("Stop")).toBeInTheDocument()
})