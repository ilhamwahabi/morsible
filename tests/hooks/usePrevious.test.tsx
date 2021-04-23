import { renderHook } from '@testing-library/preact-hooks'

import { usePrevious } from '../../hooks/usePrevious'

test('should return undefined on initialized', () => {
  const { result: previous } = renderHook(() => usePrevious("default value"))

  expect(previous.current).toBe(undefined)
})