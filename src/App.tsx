import Header from './components/Header'
import Filters from './components/Filters'
import TicketTypes from './components/TicketTypes'
import TicketsList from './components/TicketsList'
import { useAppDispatch, useAppSelector } from './hooks'
import ErrorMessage from './components/ErrorMessage'
import { ticketsSlice } from './store/reducers/ticketsSlice.ts'

function App() {
  const { error } = useAppSelector((state) => state.ticketReducer)
  const dispatch = useAppDispatch()
  const addMoreTicketsHandler = () => {
    dispatch(ticketsSlice.actions.loadMoreTickets())
  }
  return (
    <>
      <Header />

      {error && (
        <div className={'container'}>
          <ErrorMessage error={error} />
        </div>
      )}

      <div className="container page">
        <aside className="sidebar">
          <Filters />
        </aside>
        <main className="content">
          <TicketTypes />
          <TicketsList />
          <button type="button" className={'btn'} onClick={addMoreTicketsHandler}>
            Показать еще 5 билетов!
          </button>
        </main>
      </div>
    </>
  )
}
export default App
