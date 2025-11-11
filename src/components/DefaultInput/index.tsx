import styles from './styles.module.css'


type DefaultInputProps = {
  label?: string
  id: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string;
} & React.ComponentProps<'input'>

export function DefaultInput({ label, id, value, onChange, ...rest }: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input className={styles.input} id={id} value={value} onChange={onChange} {...rest} />
    </>
  )
}