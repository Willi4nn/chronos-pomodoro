import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'

type AvailableThemes = 'light' | 'dark'

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(
    () => localStorage.getItem('theme') as AvailableThemes || 'dark'
  )

  const ThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />
  }

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'))
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <nav className={styles.menu}>
      <a className={styles.link} href="#" aria-label='Ir para a home' title='Ir para a home'>
        <HouseIcon />
      </a>
      <a className={styles.link} href="#" aria-label='Ir para o histórico' title='Ir para o histórico'>
        <HistoryIcon />
      </a>
      <a className={styles.link} href="#" aria-label='Ir para as configurações' title='Ir para as configurações'>
        <SettingsIcon />
      </a>
      <a className={styles.link} href="#" aria-label='Ir para o tema claro' title='Mudar tema' onClick={toggleTheme}>
        {ThemeIcon[theme]}
      </a>
    </nav>
  )
}