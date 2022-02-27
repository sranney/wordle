import wordBank from '../backend-assets/wordbank'
import fs from 'fs'
import { chosenWordsPath } from '../backend-assets/constants'
import { v4 as uuid } from 'uuid'
import { NOT_IN_BANK, SUBMISSION_RESULT, WIN } from '../constants/submission-results'

const parseGuess = (currentWord, newGuess) => {
  const guessArray = [...newGuess].reduce((accuracyArray, letter, index) => {
    // check that letter in currentWord is present at the same index as in newGuess
    let accuracyData
    if(currentWord[index] === letter) {
      accuracyArray.currentWordIndexTaken[index] = true
      accuracyData = {
        id: uuid(),
        value: letter.toUpperCase(),
        accuracy: 2
      }
    } else if(!currentWord.includes(letter)) {
      accuracyData = {
        id: uuid(),
        value: letter.toUpperCase(),
        accuracy: 0
      }
    } else {
      const freeLetterIndex = [...currentWord].findIndex((currentWordLetter, currentWordIndex) =>
        currentWordLetter === letter && !accuracyArray.currentWordIndexTaken[currentWordIndex]
      )
      if ( freeLetterIndex > 0 ) {
        accuracyArray.currentWordIndexTaken[freeLetterIndex] = true
      }
      accuracyData = {
        id: uuid(),
        value: letter.toUpperCase(),
        accuracy: freeLetterIndex > 0 ? 1 : 0
      }
    }
    accuracyArray.result[index] = accuracyData
    return accuracyArray
  }, {result: Array(5), currentWordIndexTaken: Array.from({length: 5}, Boolean)})
  const { result } = guessArray
  return {
    id: uuid(),
    result
  }
}

export default function (newGuess) {
  const newGuessTransformed = newGuess.toLowerCase()
  const chosenWordsFileContents = fs.readFileSync(chosenWordsPath, 'utf8')
  const chosenWordsArrayified = JSON.stringify(chosenWordsFileContents).replace(/\"/g,'').split('\\n')
    .map(word => word.toLowerCase())
    .filter(word => word.length === 5)
  const currentWord = chosenWordsArrayified.slice(-1)[0]
  if(wordBank.includes(newGuess.toLowerCase())) {
    const parsedGuessData = parseGuess(currentWord, newGuessTransformed)
    return {
      message: currentWord !== newGuessTransformed ? SUBMISSION_RESULT : WIN,
      previousGuessArray: parsedGuessData
    }
  } else {
    return {
      message: NOT_IN_BANK,
      previousGuessArray: null
    }
  }
}