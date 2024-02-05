import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import Ticket from '../Ticket'
import { fetchAndFilterTickets } from '../../store/reducers/ActionCreators.ts'
import { ticketsSlice } from '../../store/reducers/ticketsSlice.ts'

import classes from './TicketsList.module.scss'

const TicketsList = () => {
  const { tickets, stop, filteredTickets, ticketsPack } = useAppSelector((state) => state.ticketReducer)

  const filters = useAppSelector((state) => state.filtersReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!stop) {
      // @ts-ignore
      dispatch(fetchAndFilterTickets())
    }
  }, [tickets])

  useEffect(() => {
    if (!ticketsPack.length) {
      dispatch(ticketsSlice.actions.loadMoreTickets())
    }
  }, [filteredTickets])

  useEffect(() => {
    dispatch(ticketsSlice.actions.clearTicketsPack())
    dispatch(ticketsSlice.actions.filterTickets(filters))
  }, [filters])

  return (
    <>
      <ul className={classes.ticketList}>
        {ticketsPack.length ? (
          ticketsPack.map((ticket) => <Ticket key={window.crypto.randomUUID()} ticket={ticket} />)
        ) : (
          <li>Рейсов, подходящих под заданные фильтры, не найдено</li>
        )}
      </ul>
    </>
  )
}

export default TicketsList
