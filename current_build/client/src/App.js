import React, {useEffect, useState} from 'react'
import LeverForm from './LeverForm'
import axios from 'axios'
import { caps } from './constants'

const App = () => {
  // const [backendData, setBackendData] = useState([{}])
  const [levers, setLevers] = useState({})
  const [dataState, setDataState] = useState({})
  const [prevState, setPrevState] = useState({})
  const [warnings, setWarnings] = useState({})

  // const []

  const handleSubmit = (res) => {
    setLevers(res);
  }

  useEffect(() => {
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

      {(typeof dataState === 'undefined') ? (
        <p>nothing yet</p>
      ) : (
          <p>{dataState.scenario}</p>
      )}
    </div>
  )
}

export default App