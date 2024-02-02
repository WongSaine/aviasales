import logo from '../../assets/logo.svg'
import { useAppSelector } from '../../hooks'
import Spinner from '../Spinner'

import classes from './Header.module.scss'

const Header = () => {
  const { stop } = useAppSelector((state) => state.ticketReducer)

  return (
    <header className={classes.header}>
      {!stop ? (
        <Spinner>
          <img src={logo} alt="AviaSales" className={classes.header__logo} />
        </Spinner>
      ) : (
        <img src={logo} alt="AviaSales" className={classes.header__logo} />
      )}
    </header>
  )
}

export default Header
