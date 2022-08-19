import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux/redux-hooks";
import { setSelectedData } from "../../../store/reducers/filterReducer";
import { fetchFlats } from "../../../store/thunks/flatThunk";

import { Autocomplete } from "../../../components/Autocomplete/Autocomplete";
import { Carousel } from "../../../components/Carousel/Carousel";

import { ISelectOption } from "../../../Interfaces/ISelectOption";
import { SingleValue } from "react-select";

import { metroOptions, areaOptions } from "../../../data/dataOptions"

import cn from "classnames"
import classes from "./Rent.module.scss"

export const Rent: FC = () => {
  const dispatch = useAppDispatch()
  const { stateData, filteredData } = useAppSelector(state => state.filter)

  let [defMetro] = useState({ value: "Метро", label: "Метро" })
  let [defArea] = useState({ value: "Район", label: "Район" })
  let metroValue = stateData.metro ? { value: stateData.metro, label: stateData.metro } : defMetro
  let areaValue = stateData.area ? { value: stateData.area, label: stateData.area } : defArea

  useEffect(() => {
    dispatch(fetchFlats())
  }, [dispatch])

  const onChangeHandler = (newValue: SingleValue<ISelectOption>) => {
    if (newValue) {
      let key: string | number | symbol | undefined | any = newValue.key
      dispatch(setSelectedData({
        ...stateData,
        [key]: newValue?.value,
      }))
    }
  }
  return (
    <section className={classes.wrapper}>
      <div className={"container"}>
        <div className={classes.rent}>
          <div className={classes.flex}>
            <div className={classes.titleWrapper}>
              <p className={classes.subtitle}>Квартиры на сутки</p>
              <h3 className={classes.title}>Аренда квратир в Минске</h3>
            </div>
            <div className={classes.selectWrapper}>
              <div className={classes.autocomplete}>
                <Autocomplete
                  value={metroValue}
                  options={metroOptions}
                  placeholder={"Выберите"}
                  classNames={cn(classes.selectMetro)}
                  onChange={(newValue) => onChangeHandler(newValue)}
                />
              </div>
              <div className={classes.autocomplete}>
                <Autocomplete
                  value={areaValue}
                  options={areaOptions}
                  placeholder={"Выберите"}
                  classNames={cn(classes.selectArea)}
                  onChange={(newValue) => onChangeHandler(newValue)}
                />
              </div>
            </div>
          </div>
          <Carousel
            data={filteredData}
          />
          <div className={classes.offers}>
            <div className={classes.row}>
              <span>{filteredData?.length}</span>
              <span>+</span>
              <p>Предложений по Минску</p>
            </div>
            <Link to={"/catalog/flats"} className={classes.seeAllBtn}>
              Посмотреть все
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}