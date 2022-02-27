import PropTypes from 'prop-types'
import Letter from './Letter'
import containerStyles from './styles/row.module.css'

const accuracyArray = ['neutral', 'in-word', 'correct']

export default function PreviousGuesses({previousGuessArray}) {
  return (
    <>
      {
        previousGuessArray.map(guess => (
          <div key={guess.id} className={containerStyles.row}>
            {guess.result.map(letterData => (
              <Letter 
                key={letterData.id} 
                letterValue={letterData.value} 
                state={accuracyArray[letterData.accuracy]}
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