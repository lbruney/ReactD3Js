import { createContext, useState } from 'react'
import CovidDataJuly from '../data/data'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(CovidDataJuly)
  const [labels, setLabels] = useState({
    fullyVaxed:
      'Indiviudals who are fully vaccinated* but have not received a booster',
    oneBooster: 'Individuals who have received one booster doses',
    twoBooster: 'Individuals who have received two booster doses',
    additionalVax:
      'Individuals who have received additional doses beyond boosters'
  })

  return (
    <AppContext.Provider
      value={{
        data,
        labels
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
