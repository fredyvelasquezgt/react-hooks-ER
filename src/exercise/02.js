// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {

  

  const [name, setName] = React.useState(() => window.localStorage.getItem('name') || initialName)



  //side effect code that we want to render
  //sync my app to the localStorage
  React.useEffect(() => {
    window.localStorage.setItem('name', name); //name is a value that we want to store in localStorage
  })

 

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
