import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/redux-hooks"
import { MoreOptions } from "../MoreOptions/MoreOptions"
import { ButtonGroup } from "./ButtonGroup/ButtonGroup"
import { InputGroup } from "./InputGroup/InputGroup"
import { SelectGroup } from "./SelectGroup/SelectGroup"

import { path } from "../../../constants/pages"
import cn from "classnames"
import { setSelectedData } from "../../../store/reducers/filterReducer"
import { useLocation, useNavigate } from "react-router-dom"
import { SingleValue } from "react-select"
import { ISelectOption } from "../../../Interfaces/ISelectOption"

import classes from "./Filter.module.scss"
import { useFilter } from "../../../hooks/useFilter"

export const Filter = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { filteredProducts } = useFilter()
  const homePath = location.pathname === "/" ? true : false
  const { stateData } = useAppSelector(state => state.filter)
  const [openOptions, setOptions] = useState(false)


  const onChangeHandler = (newValue: SingleValue<ISelectOption>) => {
    if (newValue) {
      let key: string | number | symbol | undefined | any = newValue.key
      dispatch(setSelectedData({
        ...stateData,
        [key]: newValue?.value,
      }))
    }
  }

  const onHandleSubmit = (e: any) => {
    e.preventDefault()
    filteredProducts()
    if (location.pathname === path.HOME)
      navigate("/catalog/flats")
  }

  const onHandleClick = () => {
    setOptions((prevState) => !prevState)
  }

  return (
    <form onSubmit={onHandleSubmit}>
      <div className={cn(classes.wrapper, {
        [classes._radiusNone]: openOptions,
        [classes.wrapperTransform]: !homePath
      })}>
        <div className={classes.content}>
          <SelectGroup onChangeHandler={onChangeHandler} />
          <InputGroup onChangeHandler={onChangeHandler} />
          <ButtonGroup onHandleClick={onHandleClick} />
        </div>
      </div>
      {openOptions && <MoreOptions />}
    </form>
  )
}