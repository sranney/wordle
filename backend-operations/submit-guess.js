import wordBank from '../backend-assets/wordbank'
import fs from 'fs'
import { chosenWordsPath } from '../backend-assets/constants'
import { v4 as uuid } from 'uuid'

const determineLetterAccuracy = (currentWord, index, newGuess) => {
  let accuracy = 0
  if(currntWord[index] === letter.toUpperCase()) {
    accuracy++
  }
  if(currentWord.includes(letter.toUpperCase())) {
    accuracy++
  }
  return accuracy
}

const parseGuess = (currentWord, newGuess) => {
  const guessArray = [...newGuess].map((letter, index) => ({
    id: uuid(),
    value: letter.toUpperCase(),
    accuracy: determineLetterAccuracy(currentWord, index, newGuess)
  }))
  return ({
    id: uuid(),
    guessArray
  })
}

export default function (newGuess) {
  const chosenWordsFileContents = fs.readFileSync(chosenWordsPath, 'utf8')
  const chosenWordsArrayified = JSON.stringify(chosenWordsFileContents).replace(/\"/g,'').split('\\n')
    .map(word => word.toLowerCase())
    .filter(word => word.length === 5)
  const currentWord = chosenWordsArrayified.slice(-1)
  if(wordBank.includes(newGuess.toLowerCase())) {
    if(currentWord.toLowerCase() === newGuess.toLowerCase()) {
      return {
        message: 'wordle successfully guessed',
        previousGuessArray: parseGuess(currentWord, newGuess)
      }
    }
  } else {
    return {
      message: 'word is not in word bank'
    }
  }
  console.log(newGuess)
}