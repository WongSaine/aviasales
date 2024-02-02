export interface ITicketSegment {
  date: string
  destination: string
  duration: number
  origin: string
  stops: string[]
}

export interface ITicket {
  carrier: string
  price: number
  segments: ITicketSegment[]
}
