import React, {useEffect, useState} from 'react'
import LeverForm from './LeverForm'
import axios from 'axios'
import { caps } from './constants'
import MetricsBlock from './MetricsBlock'


const App = () => {
  // const [backendData, setBackendData] = useState([{}])
  const [levers, setLevers] = useState({})
  const [dataState, setDataState] = useState({})
  const [prevState, setPrevState] = useState({})
  const [warnings, setWarnings] = useState({})
  const [waterYearType, setWaterYearType] = useState("dry")

  // const []

  const handleSubmit = (res) => {
    setLevers(res);
  }

  useEffect(() => {
    console.log(levers);
    const fetchData = async () => {
      if (levers) {
        const data = await axios.post("/submit", levers)

        setDataState(data.data.ds)
        setPrevState(data.data.prev_compare)
        setWarnings(data.data.warnings);
      }
    }
    
    fetchData();
  }, [levers])
  return (
    <div>
      <LeverForm handleSubmit={handleSubmit}></LeverForm>

      {(!dataState.scenario) ? (
        <p>nothing yet</p>
      ) : (
        <MetricsBlock wyt={waterYearType} ds={dataState} compare={prevState}></MetricsBlock>

      )}
    </div>
  )
}

export default App