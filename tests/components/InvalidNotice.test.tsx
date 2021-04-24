import { render } from '@testing-library/preact'

import InvalidNotice from '../../components/InvalidNotice'

test('display correct pre and invalid text', () => {
  const { getByText } = render(
    <InvalidNotice pre="This is wrong" invalidItems={['*****']} />
  )

  expect(getByText("This is wrong")).toBeInTheDocument()
  expect(getByText("*****")).toBeInTheDocument()
})