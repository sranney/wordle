import wordBank from '../backend-assets/wordbank'
import fs from 'fs'
import { chosenWordsPath } from '../backend-assets/constants'

export default async function() {
  // read contents of word.txt - this tells us words picked in the past
  const chosenWordsFileContents = fs.readFileSync(chosenWordsPath, 'utf8')
  const chosenWordsArrayified = JSON.stringify(chosenWordsFileContents).replace(/\"/g,'').split('\\n').map(word => word.toLowerCase()).filter(word => word.length === 5)
  // we don't want to allow any of the last 14 words to be chosen again
  const barredWords = chosenWordsArrayified.length < 14
    ? chosenWordsArrayified
    : chosenWordsArrayified.slice(-14)
  let newChosenWord
  do {
    newChosenWord = wordBank[Math.floor(Math.random()*500)]
  } while (barredWords.includes(newChosenWord))
  fs.appendFileSync(chosenWordsPath, newChosenWord.toUpperCase() + '\n')
}