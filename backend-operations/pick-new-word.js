import wordBank from '../backend-assets/wordbank'
import fs from 'fs'
import { chosenWordsPath } from '../backend-assets/constants'

const CHOSEN_WORD_COUNT_THRESHOLD = 28

export default async function() {
  // read contents of word.txt - this tells us words picked in the past
  const chosenWordsFileContents = fs.readFileSync(chosenWordsPath, 'utf8')
  const chosenWordsArrayified = JSON.stringify(chosenWordsFileContents).replace(/\"/g,'').split('\\n').map(word => word.toLowerCase()).filter(word => word.length === 5)
  // we don't want to allow any of the last 14 words to be chosen again
  const barredWords = chosenWordsArrayified.length < CHOSEN_WORD_COUNT_THRESHOLD
    ? chosenWordsArrayified
    : chosenWordsArrayified.slice(-CHOSEN_WORD_COUNT_THRESHOLD)
  let newChosenWord
  do {
    newChosenWord = wordBank[Math.floor(Math.random()*500)]
  } while (barredWords.includes(newChosenWord))
  fs.appendFileSync(chosenWordsPath, newChosenWord.toUpperCase() + '\n')
}