import { FC, useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/redux-hooks"
import { setSelectedData } from "../../../store/reducers/filterReducer"

import { IconSvg } from "../../IconSvg/IconSvg"
import classes from "./DropdownList.module.scss"

interface IList {
  title: string,
  isIcon?: boolean,
  list: {
    id: number,
    value: string,
    label: string,
    city: string,
    path: string
  }[]
}

interface IPropsDropdownList {
  menu: IList,
}
export const DropdownList: FC<IPropsDropdownList> = ({ menu }) => {
  const dispatch = useAppDispatch()
  const { stateData } = useAppSelector(state => state.filter)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutsideDropdown = (e: any) => {
      if (e.path[0] !== ref?.current) {
        setIsOpen(false)
      }
    }
    window.addEventListener('click', handleClickOutsideDropdown)
    return () => {
      window.removeEventListener('click', handleClickOutsideDropdown)
    }
  })

  return (
    <button
      className={classes.button}
      ref={ref}
      onClick={() => setIsOpen(prevState => !prevState)}
    >
      {menu?.title}
      {menu?.isIcon && <IconSvg id={"#mark"} className={classes.icon} />}
      {
        isOpen &&
        <ul className={classes.list}>
          {menu?.list.map((item: any) =>
            <li
              key={item.city}
              className={classes.listItem}
              onClick={() => {
                dispatch(setSelectedData({
                  ...stateData,
                  city: item.city
                }))
              }}
            >
              <Link to={item.path} className={classes.itemLink}>
                {item.value}
              </Link>
            </li>
          )}
        </ul>
      }
    </button>
  )
}