import { ChangeEvent } from 'react'

import { filtersSlice, OrderFilter } from '../../store/reducers/filtersSlice.ts'
import { useAppDispatch, useAppSelector } from '../../hooks'

import classes from './TicketTypes.module.scss'

const TicketTypes = () => {
  const { order } = useAppSelector((state) => state.filtersReducer)
  const dispatch = useAppDispatch()
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filtersSlice.actions.setOrder(e.target.value as OrderFilter))
  }
  return (
    <div className={classes.ticketTypes}>
      <input
        type="radio"
        name="ticket-type"
        value={OrderFilter.LOWCOST}
        className={classes.ticketTypes__radio}
        checked={order === OrderFilter.LOWCOST}
        onChange={changeValue}
        id="lowcost"
      />
      <label htmlFor="lowcost" className={classes.ticketTypes__label}>
        Самый дешевый
      </label>
      <input
        type="radio"
        name="ticket-type"
        value={OrderFilter.FASTES}
        className={classes.ticketTypes__radio}
        checked={order === OrderFilter.FASTES}
        onChange={changeValue}
        id="fast"
      />
      <label htmlFor="fast" className={[classes.ticketTypes__label, classes.bordered].join(' ')}>
        Самый быстрый
      </label>
      <input
        type="radio"
        name="ticket-type"
        value={OrderFilter.OPTIMAL}
        className={classes.ticketTypes__radio}
        checked={order === OrderFilter.OPTIMAL}
        onChange={changeValue}
        id="optimal"
      />
      <label htmlFor="optimal" className={classes.ticketTypes__label}>
        Оптимальный
      </label>
    </div>
  )
}

export default TicketTypes
