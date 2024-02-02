import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../index.ts'
import { ticketsSlice } from './ticketsSlice.ts'

const createTicketsFetch = () => {
  let searchId: string
  //@ts-ignore
  const callback = async (_, thunkAPI) => {
    try {
      if (!searchId) {
        const response = await axios.get('https://aviasales-test-api.kata.academy/search')
        searchId = response.data.searchId
      }

      const response = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
      return response.data
    } catch (e) {
      if (e.response.status === 500) {
        return await callback(_, thunkAPI)
      }
      return thunkAPI.rejectWithValue(e.message)
    }
  }

  return callback
}

export const fetchTickets = createAsyncThunk('tickets/fetchPart', createTicketsFetch())

export const fetchAndFilterTickets = createAsyncThunk('tickets/fetchAndFilter', async (_, thunkAPI) => {
  await thunkAPI.dispatch(fetchTickets(undefined))
  thunkAPI.dispatch(ticketsSlice.actions.filterTickets((thunkAPI.getState() as RootState).filtersReducer))
})
