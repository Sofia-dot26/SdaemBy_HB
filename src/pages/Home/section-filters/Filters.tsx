import React, { FC} from "react"

import cn from "classnames"
import classes from "./Filters.module.scss"

import { Filter } from "../../../components/FilterUI/Filter/Filter"


export const Filters: FC = () => {
  

  return (
    <section className={cn(classes.inner, classes.container)}>
      <div>
        <h1 className={classes.heading}>Sdaem.by - у нас живут <span>ваши объявления</span></h1>
        <ul className={classes.list}>
          <li className={classes.listItem}>Квартиры на сутки</li>
          <li className={classes.listItem}>Коттеджы и усадьбы</li>
          <li className={classes.listItem}>Бани и сауны</li>
          <li className={classes.listItem}>Авто напрокат</li>
        </ul>
        <Filter />
      </div>
    </section>
  )
}



