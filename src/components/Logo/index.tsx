import { TimerIcon } from 'lucide-react'
import { RouterLink } from '../RouterLink'
import styles from './styles.module.css'

export function Logo() {
  return (
    <div className={styles.logo}>
      <RouterLink className={styles.link} href="/">
        <TimerIcon />
        <span>Chronos</span>
      </RouterLink>
    </div>
  )
} 