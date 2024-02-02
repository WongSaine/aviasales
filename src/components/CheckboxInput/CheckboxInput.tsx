import React, { ChangeEventHandler } from 'react'

import classes from './CheckboxInput.module.scss'

interface Props {
  name: string
  description: string
  checked: boolean
  changeHandler?: ChangeEventHandler<HTMLInputElement>
}

const CheckboxInput: React.FC<Props> = ({ name, description, checked, changeHandler }: Props) => {
  return (
    <>
      <input type="checkbox" id={`checkbox_${name}`} name={name} checked={checked} onChange={changeHandler} />
      <label htmlFor={`checkbox_${name}`} className={classes.checkboxInput}>
        {description}
      </label>
    </>
  )
}

export default CheckboxInput
