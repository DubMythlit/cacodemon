import React, { createContext, useState } from 'react'

export const MutateContext = createContext(null)

export function MutateProvider({ children }) {
  const [mutateTimestamp, setMutateTimestamp] = useState(0)

  const mutate = () => {
    setMutateTimestamp(Date.now())
  }

  return (
    <MutateContext.Provider value={{ mutateTimestamp, mutate }}>
      {children}
    </MutateContext.Provider>
  )
}
