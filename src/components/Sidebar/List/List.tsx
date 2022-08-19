import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/redux-hooks"
import { setSelectedData } from '../../../store/reducers/filterReducer'

import classes from './List.module.scss'

import { IData } from '../Sidebar'

interface IPropsList {
  array: IData
}

export const List: FC<IPropsList> = ({ array }) => {
  const dispatch = useAppDispatch()
  const { stateData } = useAppSelector(state => state.filter)

  return (
    <>
      <h3 className={classes.title}>
        {array?.title}
      </h3>
      <ul>
        {array?.list?.map((item) => {
          return (
            <li key={item.id} className={classes.item} >
              <Link to={item.path} className={classes.link} onClick={
                () => dispatch(setSelectedData({
                  ...stateData,
                  city: item.city,
                  type: item.type
                }))}>
                {item.value}
              </Link>
              <span className={classes.amount}>{item.amount}</span>
            </li>
          )
        })}
      </ul>
    </>
  )
}
