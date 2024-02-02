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
      <section className={classes.ticketList}>
        {ticketsPack.length ? (
          ticketsPack.map((ticket, idx) => <Ticket key={idx} ticket={ticket} />)
        ) : (
          <p>Рейсов, подходящих под заданные фильтры, не найдено</p>
        )}
      </section>
    </>
  )
}

export default TicketsList
