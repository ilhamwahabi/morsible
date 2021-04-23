import { renderHook, act } from '@testing-library/preact-hooks'
import { useState } from 'react'

import { useDidMount } from '../../hooks/useDidMount'

test('should increase counter when deps changed and rerender', () => {
  const { result: counter } = renderHook(() => useState(0))
  const { result: state } = renderHook(() => useState("old value"))
  const { rerender } = renderHook(
    () => useDidMount(() => { counter.current[1](counter.current[0] + 1) }, [state.current[0]])
  )

  act(() => {
    state.current[1]("new value")
  })

  rerender()

  expect(state.current[0]).toBe("new value")
  expect(counter.current[0]).toBe(1)
})