import { TimerIcon } from 'lucide-react'
import styles from './styles.module.css'

export function Logo() {
  return (
    <div className={styles.logo}>
      <a className={styles.link} href="#">
        <TimerIcon />
        <span>Chronos</span>
      </a>
    </div>
  )
} 