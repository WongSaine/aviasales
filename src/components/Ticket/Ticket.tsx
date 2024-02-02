import { addMinutes, format, minutesToHours } from 'date-fns'

import { declOfNum, numberWithSpaces } from '../../helpers'
import { ITicket, ITicketSegment } from '../../models/ITicket.ts'

import classes from './Ticket.module.scss'

interface Props {
  ticket: ITicket
}

const Ticket = ({ ticket }: Props) => {
  return (
    <article className={classes.ticket}>
      <header className={classes.ticket__header}>
        <span className={classes.ticket__price}>{numberWithSpaces(ticket.price)} Р</span>
        <img
          src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt="S7 Airlines"
          className={classes.ticket__componyLogo}
        />
      </header>

      {ticket.segments.map((segment: ITicketSegment, idx: number) => {
        const date = new Date(segment.date)
        const destinationDate = addMinutes(date, segment.duration)
        return (
          <div key={idx} className={classes.trip__content}>
            <div className={[classes.ticket__trip, classes.trip].join(' ')}>
              <div className={classes.trip__item}>
                <p className={classes.trip__header}>
                  {segment.origin} - {segment.destination}
                </p>
                <p className={classes.trip__content}>
                  {`${format(date, 'HH:mm')} - ${format(destinationDate, 'HH:mm')}`}
                </p>
              </div>
              <div className={classes.trip__item}>
                <p className={classes.trip__header}>В пути</p>
                <p className={classes.trip__content}>
                  {`${minutesToHours(segment.duration)}ч ${
                    ((segment.duration % minutesToHours(segment.duration)).toString().length > 1 ? '' : '0') +
                    (segment.duration % minutesToHours(segment.duration))
                  }м`}
                </p>
              </div>
              <div className={classes.trip__item}>
                <p className={classes.trip__header}>
                  {`${segment.stops.length > 0 ? segment.stops.length : 'Без'} ${declOfNum(segment.stops.length, [
                    'пересадка',
                    'пересадки',
                    'пересадок',
                  ])}`}
                </p>
                <p className={classes.trip__content}>{segment.stops.join(', ')}</p>
              </div>
            </div>
          </div>
        )
      })}
    </article>
  )
}

export default Ticket
