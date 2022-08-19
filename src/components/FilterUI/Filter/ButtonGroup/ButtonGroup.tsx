import { FC, useState } from "react"
import { useLocation } from "react-router";

import { IconSvg } from "../../../IconSvg/IconSvg";
import { Button } from "../../../ui-kit/Button/Button";

import { path } from "../../../../constants/pages";

import cn from "classnames"
import classes from "./ButtonGroup.module.scss"

export interface IPropsButtons {
  onHandleClick: () => void
}

export const ButtonGroup: FC<IPropsButtons> = ({ onHandleClick }) => {
  const location = useLocation()
  const homePath = location.pathname === path.HOME ? true : false
  const [openOptions, setOpenOptions] = useState(false)
  return (
    <div className={classes.buttons}>
      <Button className={cn(classes.optionButton, classes.four, {
        [classes.btnTransform]: !homePath,
        [classes.activeClass]: openOptions
      })}
        onClick={() => { onHandleClick(); setOpenOptions((prevState) => !prevState) }}
      >
        <span>Больше опций</span>
        <IconSvg id={"#options"} className={classes.optionsIcon} />
      </Button>

      {homePath ?
        <>
          <Button className={classes.mapButton}>
            На карте
            <IconSvg id={"#mark"} className={classes.mark} />
          </Button>
          <Button
            className={classes.showAllBtn}
            type="submit"
          >
            Показать
          </Button>
        </>
        :
        <>
          <Button
            className={classes.clearBtn}
          >
            Очистить
          </Button>
          <Button
            className={classes.showSelectedBtn}
            type="submit"
          >
            Показать объекты
          </Button>

        </>
      }
    </div>
  )
}