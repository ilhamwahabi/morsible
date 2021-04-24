import { render } from '@testing-library/preact'

import FieldLabel from '../../components/FieldLabel'

test('display the correct passed text', () => {
  const { getByText } = render(
    <FieldLabel targetId="text" text="Text" />
  )

  expect(getByText("Text")).toBeInTheDocument()
})