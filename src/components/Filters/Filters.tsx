import CheckboxInput from '../CheckboxInput'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { filtersSlice } from '../../store/reducers/filtersSlice.ts'

import classes from './Filters.module.scss'

const Filters = () => {
  const { noTransfer, oneTransfer, twoTransfer, threeTransfer } = useAppSelector((state) => state.filtersReducer)

  const dispatch = useAppDispatch()
  const allFilters = noTransfer === true && oneTransfer === true && twoTransfer === true && threeTransfer === true
  return (
    <div className={classes.filters}>
      <h3 className={classes.filters__header}>Количество пересадок</h3>
      <CheckboxInput
        name={'all'}
        description={'Все'}
        checked={allFilters}
        changeHandler={(e) => dispatch(filtersSlice.actions.allFilters(e.target.checked))}
      />
      <CheckboxInput
        name={'no-transfer'}
        description={'Без пересадок'}
        checked={noTransfer}
        changeHandler={(e) => dispatch(filtersSlice.actions.noTransfer(e.target.checked))}
      />
      <CheckboxInput
        name={'one-transfer'}
        description={'1 пересадка'}
        checked={oneTransfer}
        changeHandler={(e) => dispatch(filtersSlice.actions.oneTransfer(e.target.checked))}
      />
      <CheckboxInput
        name={'two-transfer'}
        description={'2 пересадки'}
        checked={twoTransfer}
        changeHandler={(e) => dispatch(filtersSlice.actions.twoTransfer(e.target.checked))}
      />
      <CheckboxInput
        name={'three-transfer'}
        description={'3 пересадки'}
        checked={threeTransfer}
        changeHandler={(e) => dispatch(filtersSlice.actions.threeTransfer(e.target.checked))}
      />
    </div>
  )
}

export default Filters
