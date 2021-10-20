import * as React from 'react'

const idContext = React.createContext({ value: 0 })

export const useId = (prefix?: string) => {
  const context = React.useContext(idContext)
  const [id, setId] = React.useState(context.value)

  React.useEffect(() => {
    setId(++context.value)
  }, [context])

  return React.useMemo(() => `${prefix ? prefix + '_' : prefix}${id}`, [prefix, id])
}
