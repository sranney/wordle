import { useEffect, useReducer } from 'react'
import SetOfFutureGuesses from '../components/SetOfFutureGuesses'
import { v4 as uuid } from 'uuid'
import PreviousGuesses from '../components/PreviousGuesses'

const USER_UPDATED_CURRENT_GUESS = 'User Updated Current Guess'
const USER_SUBMITTED_NEW_APPROVED_GUESS = 'User Successfully Submitted New Guess'

const guessReducer = ({previousGuesses, countOfFutureGuesses}, {type, payload}) => {
  if(type === USER_UPDATED_CURRENT_GUESS) {
    return {
      previousGuesses,
      countOfFutureGuesses,
      currentGuess: payload
    }
  } else if(type === USER_SUBMITTED_NEW_APPROVED_GUESS) {
    return {
      previousGuesses: [...previousGuesses, payload],
      countOfFutureGuesses: 6 - (previousGuesses.length + 1) - 1,
      currentGuess: Array.from(new Array(5), () => ({id: uuid(), value: ''}))
    }
  }
}

export default function Home() {
  const [{previousGuessArray, countOfFutureGuesses, currentGuess }, dispatch] = useReducer(guessReducer, {
    previousGuessArray: [[{id: 'abc-123', value: 'a', accuracy: 1}, {id: 'bcd-234', value: 'a', accuracy: 0}, {id: 'cde-345', value: 'a', accuracy: 0}, {id: 'def-456', value: 'a', accuracy: 0}, {id: 'efg-567', value: 'a', accuracy: 0}, {id: 'fgh-678', value: 'a', accuracy: 0}]],
    countOfFutureGuesses: 5,
    currentGuess: ''
  })

  useEffect(() => {
    window.addEventListener('keydown', ({key}) => {
      if(key.match(/^[A-Za-z]+$/)) {
        console.log('is alpha - ', key)
      }
    })
  }, [USER_UPDATED_CURRENT_GUESS, USER_SUBMITTED_NEW_APPROVED_GUESS])

  return <div>
    <PreviousGuesses previousGuessArray={previousGuessArray}/>
    <CurrentGuess currentGuess={currentGuess}/>
    <SetOfFutureGuesses numberOfGuesses={countOfFutureGuesses} />
  </div>
}
