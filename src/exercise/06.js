// useEffect: HTTP requests
// 💯 handle errors
// http://localhost:3000/isolated/final/06.extra-1.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

// class ErrorBoundary extends React.Component {
//   state = {error: null}
//   static getDerivedStateFromError(error) {
//     return {error}
//   }
//   render() {
//     const {error} = this.state;
//     if(error) {
//       return (
//         <this.props.FallbackComponent error={error} />
//       ) 
//     }
//     return this.props.children;
//   }
// }

function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div> 
  )
}

function PokemonInfo({pokemonName}) {
  
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null
  })

  const {status, pokemon, error} = state;


  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
  
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({pokemon, status: 'resolved'})
      },
      error => {      
        setState({error, status: 'rejected'})
      } 
    )
  }, [pokemonName])

  if(status === 'idle') {
    return 'Submit a Pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status == 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('this should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
      <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback} >
        <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>

      </div>
    </div>

  )
}

export default App
