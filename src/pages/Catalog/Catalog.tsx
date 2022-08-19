import { FC, useState, useEffect } from "react"

import { useLocation } from "react-router-dom"
import { usePageTitle } from "../../hooks/usePageTitle"

import { Recommended } from "./section-recommended/Recommended"
import { Products } from "./section-products/Products"
import { ShowMap } from "./section-showmap/ShowMap"
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs"

import { path } from "../../constants/pages"
import classes from "./Catalog.module.scss"
import { Filter } from "../../components/FilterUI/Filter/Filter";

export const Catalog: FC = () => {
  const location = useLocation()
  const [crumbsTitle, setCrumbsTitle] = useState<string>()

  const breadCrumbsItems = [
    {
      id: 0,
      title: 'Home',
      path: '/',
    },
    {
      id: 1,
      title: crumbsTitle,
    },

  ];

  const { title } = usePageTitle()

  useEffect(() => {
    switch (location.pathname) {
      case path.APARTMENTS:
        setCrumbsTitle('Квартиры')
        break;
      case path.COTTAGES:
        setCrumbsTitle('Коттеджи и усадьбы')
        break;
      case path.BATHS:
        setCrumbsTitle('Бани и Сауны')
        break;
      case path.CARS:
        setCrumbsTitle('Авто на прокат')
        break;
      default:
    }

  }, [location.pathname]);

  return (
    <>
      <section className={classes.recommendWrapper}>
        <div className="container">
          <Breadcrumbs breadCrumbsItems={breadCrumbsItems} />
          <h3 className={classes.title}>
            {title}
          </h3>
        </div>
        <Recommended />
      </section>
      <section className={classes.filterWrapper}>
        <div className="container">
          <Filter />
        </div>
      </section>
      <Products />
      <ShowMap />
    </>
  )
}

