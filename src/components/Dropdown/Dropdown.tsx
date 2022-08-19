import { FC, useState, useEffect } from "react"

import { DropdownList } from "./DropdownList/DropdownList";

import classes from "./Dropdown.module.scss"

export const Dropdown: FC = () => {


  const [menu, setMenu] = useState<any>([])

  useEffect(() => {
    fetch("/api/menu")
      .then(response => response.json())
      .then(data => setMenu(data))
  }, [])

  return (
    <div className={classes.flex}>
      <DropdownList menu={menu[0]} />
      <DropdownList menu={menu[1]} />
      <DropdownList menu={menu[2]} />
      <DropdownList menu={menu[3]} />
    </div >
  )
}