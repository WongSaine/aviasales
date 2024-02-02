import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export enum OrderFilter {
  LOWCOST = 'lowcost',
  FASTES = 'fastes',
  OPTIMAL = 'optimal',
}

export interface IFilters {
  noTransfer: boolean
  oneTransfer: boolean
  twoTransfer: boolean
  threeTransfer: boolean
  order: OrderFilter
}

const initialState: IFilters = {
  noTransfer: true,
  oneTransfer: true,
  twoTransfer: true,
  threeTransfer: true,
  order: OrderFilter.LOWCOST,
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<OrderFilter>) {
      state.order = action.payload
    },
    allFilters(state, action: PayloadAction<boolean>) {
      state.noTransfer = action.payload
      state.oneTransfer = action.payload
      state.twoTransfer = action.payload
      state.threeTransfer = action.payload
    },
    noTransfer(state, action: PayloadAction<boolean>) {
      state.noTransfer = action.payload
    },
    oneTransfer(state, action: PayloadAction<boolean>) {
      state.oneTransfer = action.payload
    },
    twoTransfer(state, action: PayloadAction<boolean>) {
      state.twoTransfer = action.payload
    },
    threeTransfer(state, action: PayloadAction<boolean>) {
      state.threeTransfer = action.payload
    },
  },
})
export default filtersSlice.reducer
