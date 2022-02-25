import PropTypes from 'prop-types'
import Letter from './Letter'
import rowStyles from './styles/row.module.css'
export default function CurrentGuess ({currentGuess}) {
  console.log('currentGuess', currentGuess)
  const currentGuessLength = currentGuess.length
  const emptyLetterPlaceholderArray = Array.from(new Array(5 - currentGuessLength), () => '')
  const currentGuessRowArray = [...currentGuess, ...emptyLetterPlaceholderArray]
  const letterArray = currentGuessRowArray.map((character, index) => console.log('character', character) || <Letter key={index} letterValue={character} />)
  console.log('currentGuessRowArray', currentGuessRowArray)
  return <div className={rowStyles.row}>{letterArray}</div>
}

CurrentGuess.propTypes = {
  currentGuess: PropTypes.string
}