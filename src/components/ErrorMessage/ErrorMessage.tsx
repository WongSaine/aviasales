import classes from './ErrorMessage.module.scss'

interface Props {
  error: string
}

const ErrorMessage = ({ error }: Props) => {
  return <p className={classes.error}>{error}</p>
}

export default ErrorMessage
