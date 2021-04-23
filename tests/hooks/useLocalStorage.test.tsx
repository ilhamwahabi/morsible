import { renderHook, act } from '@testing-library/preact-hooks'

import { useLocalStorage } from '../../hooks/useLocalStorage'

test('should return correct value from localStorage', () => {
  const { result } = renderHook(() => useLocalStorage("key", "value"))

  expect(result.current[0]).toBe("value")

  act(() => {
    result.current[1]("new value")
  })

  expect(result.current[0]).toBe("new value")
})