import PropTypes from 'prop-types'
import styles from './styles/letter.module.css'

export default function Letter({letterValue = '', state = 'neutral'}) {
  return <div className={`${styles[state]} ${styles.letter}`}>{letterValue}</div>
}

Letter.propTypes = {
  letterValue: PropTypes.string,
  state: PropTypes.string
}