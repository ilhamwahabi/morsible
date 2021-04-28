import { fireEvent, render } from '@testing-library/preact'

import TextField from '../../components/TextField'

test('invoke updateValue on changed', () => {
  const handler = jest.fn()

  const { container: { firstChild: input } } = render(
    <TextField
      id="text"
      placeholder="Any Text"
      value={""}
      isInvalid={false}
      isHold={{ status: false }}
      updateValue={handler}
    />
  )

  fireEvent.input(input, { target: { value: 'test' } })

  expect(handler).toHaveBeenCalledTimes(1)
})