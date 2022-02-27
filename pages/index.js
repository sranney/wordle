import { useEffect, useReducer } from 'react'
import SetOfFutureGuesses from '../components/SetOfFutureGuesses'
import PreviousGuesses from '../components/PreviousGuesses'
import CurrentGuess from '../components/CurrentGuess'
import { NOT_IN_BANK, SUBMISSION_RESULT, WIN } from '../constants/submission-results'

const USER_UPDATED_CURRENT_GUESS = 'User Updated Current Guess'
const USER_SUBMITTED_NEW_APPROVED_GUESS = 'User Successfully Submitted New Guess'

const guessReducer = ({previousGuessArray, countOfFutureGuesses}, {type, payload}) => {
  if(type === USER_UPDATED_CURRENT_GUESS) {
    return {
      previousGuessArray,
      countOfFutureGuesses,
      currentGuess: payload
    }
  } else if(type === USER_SUBMITTED_NEW_APPROVED_GUESS) {
    return {
      previousGuessArray: [...previousGuessArray, payload],
      countOfFutureGuesses: 6 - (previousGuessArray.length + 1) - 1,
      currentGuess: ''
    }
  }
}

export default function Home() {
  const [{previousGuessArray, countOfFutureGuesses, currentGuess }, dispatch] = useReducer(guessReducer, {
    previousGuessArray: [],
    countOfFutureGuesses: 5,
    currentGuess: ''
  })

  useEffect(() => {
    const keyDownHandler = ({key}) => {
      if(key.match(/^[A-Za-z]$/) && currentGuess.length < 5) {
        dispatch({type: USER_UPDATED_CURRENT_GUESS, payload: `${currentGuess}${key.toUpperCase()}`})
      } else if (key === 'Enter' && currentGuess.length === 5) {
        fetch('/api/submit-guess', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({guess: currentGuess})
        })
        .then(res => res.json())
        .then(res => {
          if(res.result.message !== NOT_IN_BANK) {
            dispatch({type: USER_SUBMITTED_NEW_APPROVED_GUESS, payload: res.result.previousGuessArray})
          }
        }).catch(err => console.error(err))
      } else if (key === 'Backspace') {
        dispatch({type: USER_UPDATED_CURRENT_GUESS, payload: currentGuess.slice(0,-1)})
      }
    }
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [currentGuess])

  return <div>
    <PreviousGuesses previousGuessArray={previousGuessArray}/>
    <CurrentGuess currentGuess={currentGuess}/>
    <SetOfFutureGuesses numberOfGuesses={countOfFutureGuesses} />
  </div>
}
