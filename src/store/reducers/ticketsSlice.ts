import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { ITicket } from '../../models/ITicket.ts'
import { fetchTickets } from './ActionCreators.ts'
import { IFilters, OrderFilter } from './filtersSlice.ts'

interface IResponse {
  tickets: ITicket[]
  stop: boolean
}

interface ITicketsStore {
  tickets: ITicket[]
  isLoading: boolean
  error: string
  stop: boolean
  filteredTickets: ITicket[]
  ticketsPack: ITicket[]
  page: number
}

const initialState: ITicketsStore = {
  error: '',
  isLoading: false,
  tickets: [],
  stop: false,
  filteredTickets: [],
  ticketsPack: [],
  page: 0,
}

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    clearTicketsPack(state) {
      state.page = 0
      state.ticketsPack = []
    },
    loadMoreTickets(state) {
      function* getTicketsPack() {
        const count = state.page
        const step = 5

        if (count >= state.filteredTickets.length) {
          return state.filteredTickets
        }

        const tmpArr: ITicket[] = state.ticketsPack.slice()

        for (let i = count; i < count + step; i++) {
          tmpArr.push(state.filteredTickets[i])
        }
        state.page += step
        yield Array.from(new Set(tmpArr))
      }

      const generator = getTicketsPack()

      state.ticketsPack = generator.next().value as ITicket[]
    },

    filterTickets(state, action: PayloadAction<IFilters>) {
      const filtered = state.tickets.filter((ticket: ITicket) => {
        return (
          (action.payload.noTransfer &&
            ticket.segments[0].stops.length === 0 &&
            ticket.segments[1].stops.length === 0) ||
          (action.payload.oneTransfer &&
            ticket.segments[0].stops.length === 1 &&
            ticket.segments[1].stops.length === 1) ||
          (action.payload.twoTransfer &&
            ticket.segments[0].stops.length === 2 &&
            ticket.segments[1].stops.length === 2) ||
          (action.payload.threeTransfer &&
            ticket.segments[0].stops.length === 3 &&
            ticket.segments[1].stops.length === 3)
        )
      })

      let sort: (a: ITicket, b: ITicket) => number
      let meanPrice: number
      let meanDuration: number
      switch (action.payload.order) {
        case OrderFilter.FASTES:
          sort = (a: ITicket, b: ITicket) =>
            a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
          break
        case OrderFilter.OPTIMAL:
          meanPrice =
            state.filteredTickets.reduce((acc, ticket) => acc + ticket.price, 0) / state.filteredTickets.length
          meanDuration =
            state.filteredTickets.reduce(
              (acc, ticket) => acc + ticket.segments[0].duration + ticket.segments[1].duration,
              0
            ) / state.filteredTickets.length
          sort = (a: ITicket, b: ITicket) => {
            const aNum = a.price / meanPrice + (a.segments[0].duration + a.segments[1].duration) / meanDuration
            const bNum = b.price / meanPrice + (b.segments[0].duration + b.segments[1].duration) / meanDuration

            return aNum - bNum
          }
          break
        case OrderFilter.LOWCOST:
        default:
          sort = (a: ITicket, b: ITicket) => a.price - b.price
          break
      }
      state.filteredTickets = filtered.sort(sort)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.fulfilled.type, (state, action: PayloadAction<IResponse>) => {
      state.isLoading = false
      state.error = ''
      state.tickets = [...state.tickets, ...action.payload.tickets]
      state.stop = action.payload.stop
    })
    builder.addCase(fetchTickets.pending.type, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchTickets.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export default ticketsSlice.reducer
