import { createContext, useState } from 'react'
import CovidDataJuly from '../data/data'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(CovidDataJuly)

  return (
    <AppContext.Provider
      value={{
        data
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
