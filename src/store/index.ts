import { combineReducers, configureStore } from '@reduxjs/toolkit'

import filtersReducer from './reducers/filtersSlice.ts'
import ticketReducer from './reducers/ticketsSlice.ts'

const rootReducer = combineReducers({
  filtersReducer,
  ticketReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
