import * as React from 'react'

export const useBoolean = () => {
  const [boolean, setBoolean] = React.useState(false)

  const on = React.useCallback(() => setBoolean(true), [])

  const off = React.useCallback(() => setBoolean(false), [])

  const toggle = React.useCallback(() => setBoolean(!boolean), [boolean])

  return [boolean, { on, off, toggle }] as const
}
