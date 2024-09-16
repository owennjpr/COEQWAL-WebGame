import React, {useEffect, useState} from 'react'
import LeverForm from './LeverForm'

const App = () => {
  // const [backendData, setBackendData] = useState([{}])
  const [levers, setLevers] = useState({})

  const handleSubmit = (res) => {
    setLevers(res);
  }

  useEffect(() => {
    // fetch("/api").then(
    //   response => response.json()
    // ).then(
    //   data => {
    //     setBackendData(data);
    //   }
    // )
    console.log(levers);
  }, [levers])
  return (
    <div>
      <LeverForm handleSubmit={handleSubmit}></LeverForm>

      {/* {(typeof backendData.data === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.data.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )} */}
    </div>
  )
}

export default App