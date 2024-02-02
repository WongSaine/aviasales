import { ReactNode } from 'react'

import classes from './Spiner.module.scss'

interface Props {
  children?: ReactNode
}

const Spinner = ({ children }: Props) => {
  return <div className={classes.ldsDualRing}>{children}</div>
}

export default Spinner
