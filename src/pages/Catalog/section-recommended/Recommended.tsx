import { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/redux-hooks"

import { setSelectedData } from "../../../store/reducers/filterReducer"

import { recommend } from "../../../data/recommendate"

import classes from "./Recommended.module.scss"
import { IconSvg } from "../../../components/IconSvg/IconSvg"


type IProps = {
  name?: string,
  key?: string
  room?: string,
  area?: string,
  [index: string]: string | undefined
}

export const Recommended: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  const [isActive, setIsActive] = useState<number>()
  const { stateData } = useAppSelector(state => state.filter)

  const clickHandler = (item: IProps, key: string) => {
    dispatch(setSelectedData({
      ...stateData,
      [key]: item[key]
    }))
  }
  return (
    <div className="container">
      <h3 className={classes.title}>Рекомендуем посмотреть</h3>
      <ul className={classes.list}>
        {recommend?.map((item, index) => {
          return (
            <li
              key={item.name}
              onClick={() => { clickHandler(item, item.key); setIsActive(index) }}
              className={classes.listItem}
            >
              {item.name}
              {isActive === index && <IconSvg id="#cross" className={classes.cross} />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}