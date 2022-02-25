import { useEffect, useReducer } from 'react'
import SetOfFutureGuesses from '../components/SetOfFutureGuesses'
import { v4 as uuid } from 'uuid'
import PreviousGuesses from '../components/PreviousGuesses'
import CurrentGuess from '../components/CurrentGuess'

const USER_UPDATED_CURRENT_GUESS = 'User Updated Current Guess'
const USER_SUBMITTED_NEW_APPROVED_GUESS = 'User Successfully Submitted New Guess'

const guessReducer = ({previousGuessArray, countOfFutureGuesses, currentGuess}, {type, payload}) => {
  if(type === USER_UPDATED_CURRENT_GUESS) {
    return {
      previousGuessArray,
      countOfFutureGuesses,
      currentGuess: payload
    }
  } else if(type === USER_SUBMITTED_NEW_APPROVED_GUESS) {
    return {
      previousGuessArray: [...previousGuesses, payload],
      countOfFutureGuesses: 6 - (previousGuesses.length + 1) - 1,
      currentGuess: Array.from(new Array(5), () => ({id: uuid(), value: ''}))
    }
  }
}

export default function Home() {
  const [{previousGuessArray, countOfFutureGuesses, currentGuess }, dispatch] = useReducer(guessReducer, {
    previousGuessArray: [
      [
        {id: 'abc-123', value: 'A', accuracy: 1},
        {id: 'bcd-234', value: 'B', accuracy: 0},
        {id: 'cde-345', value: 'C', accuracy: 2},
        {id: 'def-456', value: 'D', accuracy: 0},
        {id: 'efg-567', value: 'E', accuracy: 0}
      ]
    ],
    countOfFutureGuesses: 5,
    currentGuess: ''
  })

  const keyDownHandler = ({key}) => {
    if(key.match(/^[A-Za-z]$/) && currentGuess.length < 5) {
      dispatch({type: USER_UPDATED_CURRENT_GUESS, payload: `${currentGuess}${key.toUpperCase()}`})
    } else if (key === 'Enter') {
      console.log('user pressed enter')
    } else if (key === 'Backspace') {
      dispatch({type: USER_UPDATED_CURRENT_GUESS, payload: currentGuess.slice(0,-1)})
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [currentGuess])

  return <div>
    <PreviousGuesses previousGuessArray={previousGuessArray}/>
    <CurrentGuess currentGuess={currentGuess}/>
    <SetOfFutureGuesses numberOfGuesses={countOfFutureGuesses} />
  </div>
}
