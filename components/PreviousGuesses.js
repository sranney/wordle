import PropTypes from 'prop-types'
import Letter from './Letter'
import containerStyles from './styles/row.module.css'

const accuracyArray = ['neutral', 'in-word', 'correct']

export default function PreviousGuesses({previousGuessArray}) {
  return (
    <>
      {
        previousGuessArray.map(guess => (
          <div className={containerStyles.row}>
            {guess.map(letter => (
              <Letter 
                key={letter.id} 
                letterValue={letter.value} 
                state={accuracyArray[letter.accuracy]}
              />)
            )}
          </div>
        ))
      }
    </>
  )
}

PreviousGuesses.propTypes = {
  previousGuessArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    accuracy: PropTypes.number
  }))).isRequired
}