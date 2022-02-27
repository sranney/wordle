import { useEffect, useReducer } from 'react'
import SetOfFutureGuesses from '../components/SetOfFutureGuesses'
import PreviousGuesses from '../components/PreviousGuesses'
import CurrentGuess from '../components/CurrentGuess'
import { NOT_IN_BANK } from '../constants/submission-results'

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

const RESET_POPUP = 'RESET_POPUP'
const SET_POPUP = 'SET_POPUP'

const popupReducer = ( _, { type, payload = null } ) => {
  if(type === RESET_POPUP) {
    return {
      showPopupMessage: false,
      popupMessageString: ''
    }
  } else if (type === SET_POPUP) {
    return {
      showPopupMessage: true,
      popupMessageString: payload
    }
  }
}

export default function Home() {
  const [ { showPopupMessage, popupMessageString }, updatePopupState] = useReducer(popupReducer, {
    showPopupMessage: false,
    popupMessageString: ''
  })
  const [{previousGuessArray, countOfFutureGuesses, currentGuess }, dispatch] = useReducer(guessReducer, {
    previousGuessArray: [],
    countOfFutureGuesses: 5,
    currentGuess: ''
  })

  useEffect(() => {
    const keyDownHandler = ({key}) => {
      if(key.match(/^[A-Za-z]$/) && currentGuess.length < 5 && !showPopupMessage) {
        dispatch({type: USER_UPDATED_CURRENT_GUESS, payload: `${currentGuess}${key.toUpperCase()}`})
      } else if (key === 'Enter' && currentGuess.length === 5 && !showPopupMessage) {
        fetch('/api/submit-guess', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({guess: currentGuess})
        })
        .then(res => res.json())
        .then(res => {
          if(res.result.message !== NOT_IN_BANK) {
            dispatch({type: USER_SUBMITTED_NEW_APPROVED_GUESS, payload: res.result.previousGuessArray})
          } else {
            updatePopupState({type: SET_POPUP, payload: res.result.message})
          }
        }).catch(err => console.error(err))
      } else if (key === 'Backspace' && !showPopupMessage) {
        dispatch({type: USER_UPDATED_CURRENT_GUESS, payload: currentGuess.slice(0,-1)})
      }
    }
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [currentGuess, showPopupMessage])
  useEffect(() => {
    if (showPopupMessage) {
      setTimeout(() => updatePopupState({type: RESET_POPUP}), 2000)
    }
  }, [showPopupMessage])


  return <div>
    <PreviousGuesses previousGuessArray={previousGuessArray}/>
    <CurrentGuess currentGuess={currentGuess}/>
    <SetOfFutureGuesses numberOfGuesses={countOfFutureGuesses} />
    <div>{popupMessageString}</div>
  </div>
}
