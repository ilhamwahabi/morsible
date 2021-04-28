import { render } from '@testing-library/preact'

import SelectLanguage from '../../components/SelectLanguage'

test('not displayed at first time because dynamic', () => {
  const { container: { firstChild } } = render(
    <SelectLanguage language="us" setLanguage={() => {}} />
  )

  expect(firstChild).toBeNull()
})