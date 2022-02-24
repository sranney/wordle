import Letter from './letter'
import { v4 as uuid } from 'uuid'
import styles from './styles/row.module.css'

export default function FutureGuess() {
  return (
    <div className={styles.row}>
      {Array.from(new Array(5), _ => <Letter key={uuid()} />)}
    </div>
  )
}