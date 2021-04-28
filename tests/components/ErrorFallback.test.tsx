import { render } from '@testing-library/preact'

import ErrorFallback from '../../components/ErrorFallback'

test('display the correct passed error text', () => {
  const { getByText } = render(
    <ErrorFallback error={new Error("test")} resetErrorBoundary={() => {}} />
  )

  expect(getByText(/test/i)).toBeInTheDocument()
})