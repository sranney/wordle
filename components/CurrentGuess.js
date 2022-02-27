import PropTypes from 'prop-types'
import Letter from './Letter'
import rowStyles from './styles/row.module.css'
export default function CurrentGuess ({currentGuess}) {
  const currentGuessLength = currentGuess.length
  const emptyLetterPlaceholderArray = Array.from(new Array(5 - currentGuessLength), () => '')
  const currentGuessRowArray = [...currentGuess, ...emptyLetterPlaceholderArray]
  const letterArray = currentGuessRowArray.map((character, index) => <Letter key={index} letterValue={character} />)
  return <div className={rowStyles.row}>{letterArray}</div>
}

CurrentGuess.propTypes = {
  currentGuess: PropTypes.string
}