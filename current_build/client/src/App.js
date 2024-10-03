import React, {useEffect, useState} from 'react'
import LeverForm from './LeverForm'
import axios from 'axios'
import MetricsBlock from './MetricsBlock'
import WarningsBlock from './WarningsBlock'


const App = () => {
  // const [backendData, setBackendData] = useState([{}])
  const [levers, setLevers] = useState({})
  const [dataState, setDataState] = useState({})
  const [prevState, setPrevState] = useState({})
  const [warnings, setWarnings] = useState({})
  const [waterYearType, setWaterYearType] = useState("dry")

  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "1fr 0.75fr 0.65fr",
      gridTemplateRows: "0.1fr 1fr",
  }
  
  }


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
    <div >
      <LeverForm handleSubmit={handleSubmit}></LeverForm>

      {(!dataState.scenario) ? (
        <p>No data to display</p>
      ) : (
        <div style={styles.container}>
          <div style={{gridColumn: "1 / -1", backgroundColor: "rgb(240, 240, 250)", margin: "5px"}}> selection block </ div>
          <div style={{backgroundColor: "rgb(240, 240, 250)", margin: "5px"}}>Reservoir block</ div>
          <MetricsBlock wyt={waterYearType} ds={dataState} compare={prevState}></MetricsBlock>
          <WarningsBlock warnings={warnings}></WarningsBlock>
        </div>
      )}
    </div>
  )
}

export default App