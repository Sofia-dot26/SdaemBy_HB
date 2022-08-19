import { FC, useEffect } from "react"
import { useParams } from "react-router"

import { useAppDispatch, useAppSelector } from "../../../hooks/redux/redux-hooks"
import { fetchNews } from "../../../store/thunks/newsThunk"

import { Breadcrumbs } from "../../../components/Breadcrumbs/Breadcrumbs"
import { ShareButtons } from "../../../components/ShareButtons/ShareButtons"

import cn from "classnames"
import classes from "./Detail.module.scss"


export const Detail: FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const { news, loading, error } = useAppSelector(state => state.news)

  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch])
  const detail = news.find((news) => news.id === Number(id));

  const breadCrumbsItems = [
    {
      id: 0,
      title: 'Home',
      path: '/',
    },
    {
      id: 1,
      title: 'Новости',
      path: '/news',

    },
    {
      id: 2,
      title: detail?.title,
    },
  ];

  return (
    <section className={classes.wrapper}>
      <div className={cn("container", classes.container)}>
        <Breadcrumbs breadCrumbsItems={breadCrumbsItems} />
        <h3>
          {detail ? detail.title : ''}
        </h3>
        <div className={classes.flex}>
          <div className={classes.date}>
            {detail ? detail.date : '14 Января 2008'}
          </div>
          <ShareButtons
            url={"https://sdaem.by/novosti"}
            title={detail?.title}
            image={detail?.image}
          />
        </div>
        {<h1>{error}</h1>}
        <>
          <div className={classes.newsImg}>
            <img src={`/${detail?.image}`} alt="картинка" />
          </div>
          <div>
            <p className={classes.fullText}>{detail?.fullText}</p>
          </div>
        </>
      </div>
    </section >
  )
}