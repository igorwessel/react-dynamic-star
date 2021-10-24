import * as React from 'react'

let counter = 0

export const useId = (prefix?: string) => {
  const [id, setId] = React.useState(counter)

  React.useEffect(() => {
    setId(++counter)
  }, [])

  return React.useMemo(() => `${prefix ? prefix + '_' : ''}${id}`, [prefix, id])
}
