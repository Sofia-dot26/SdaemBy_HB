import React from 'react'
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/redux-hooks"
import { setSelectedData } from "../../../store/reducers/filterReducer"
import { Button } from "../../../components/ui-kit/Button/Button"
import { IconSvg } from "../../../components/IconSvg/IconSvg"

import flatImage from "../../../assets/images/promo-1.png"
import cottagesImage from "../../../assets/images/promo-2.png"
import bathsImage from "../../../assets/images/promo-3.png"
import carImage from "../../../assets/images/promo-4.png"

import { path } from "../../../constants/pages"
import classes from "./GalleryAdsCards.module.scss"

const data = [
  { name: "Минск", path: path.APARTMENTS, city: "Минск" },
  { name: "Витебск", path: path.APARTMENTS, city: "Витебск" },
  { name: "Гродно", path: path.APARTMENTS, city: "Гродно" },
  { name: "Гомель", path: path.APARTMENTS, city: "Гомель" },
  { name: "Брест", path: path.APARTMENTS, city: "Брест" },
  { name: "Могилев", path: path.APARTMENTS, city: "Могилев" },
]
export const GalleryAdsCards = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { stateData } = useAppSelector(state => state.filter)
  return (
    <div className={classes.cards}>
      <div className={classes.topRow}>
        <div className={classes.apartments}>
          <p className={classes.subtitle}>СНЯТЬ КВАРТИРУ</p>
          <h3 className={classes.title}>Квартиры на сутки</h3>
          <ul className={classes.list}>
            {
              data.map((item) =>
                <li key={item.name} className={classes.listItem}>
                  <Button onClick={() => {
                    navigate(path.APARTMENTS);
                    dispatch(setSelectedData({
                      ...stateData,
                      city: item.city
                    }))
                  }} className={classes.button}>
                    {item.name}
                  </Button>
                </li>
              )}
          </ul>
          <img src={flatImage} alt="аренда квартир" />
        </div>
        <div className={classes.cottages}>
          <p className={classes.subtitle}>СНЯТЬ КОТТЕДЖ НА ПРАЗДНИК</p>
          <h3 className={classes.title}>Коттеджи и усадьбы</h3>
          <img src={cottagesImage} alt="снять коттедж на праздник" />
          <Button className={classes.jumpButton} onClick={() => navigate(path.COTTAGES)}>
            <IconSvg id={"#arrow"} className={classes.arrow} />
          </Button>
        </div>
      </div>
      <div className={classes.bottomRow}>
        <div className={classes.baths}>
          <p className={classes.subtitle}>ПОПАРИТЬСЯ В БAНЕ С ДРУЗЬЯМИ</p>
          <h3 className={classes.title}>Бани и сауны</h3>
          <img src={bathsImage} alt="аренда бань и саун" />
          <Button className={classes.jumpButton} onClick={() => navigate(path.BATHS)}>
            <IconSvg id={"#arrow"} className={classes.arrow} />
          </Button>
        </div>
        <div className={classes.cars}>
          <p className={classes.subtitle}>EСЛИ СРОЧНО НУЖНА МАШИНА</p>
          <h3 className={classes.title}>Авто на прокат</h3>
          <img src={carImage} alt="авто на прокат" />
          <Button className={classes.jumpButton} onClick={() => navigate(path.CARS)}>
            <IconSvg id={"#arrow"} className={classes.arrow} />
          </Button>
        </div>
      </div>
    </div >
  )
}
