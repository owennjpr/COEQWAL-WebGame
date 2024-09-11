import React, {useEffect, useState} from 'react'

const App = () => {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, [])
  return (
    <div>
      {(typeof backendData.data === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.data.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
    </div>
  )
}

export default App