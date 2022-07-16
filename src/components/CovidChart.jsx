import React from 'react'

import AppContext from '../context/AppContext'
import StackedChart from '../charts/StackedChart'
import { useContext } from 'react'

function CovidChart() {
  const { data } = useContext(AppContext)
  return (
    <div className='c-container'>
      <StackedChart data={data} />
    </div>
  )
}

export default CovidChart
