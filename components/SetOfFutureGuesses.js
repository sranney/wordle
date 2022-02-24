import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

import FutureGuess from './FutureGuess'

export default function SetOfFutureGuesses({numberOfGuesses}) {
  return <>
    {
      Array.from(new Array(numberOfGuesses), _ => <FutureGuess key={uuid()} />)
    }
  </>
}

SetOfFutureGuesses.propTypes = {
  numberOfGuesses: PropTypes.number.isRequired
}