import { FC, useState, useEffect, ChangeEvent } from "react"

import { useAppDispatch, useAppSelector } from "../../hooks/redux/redux-hooks"
import { createSearchParams, useSearchParams } from "react-router-dom"

import { usePagination } from "../../hooks/usePagination"


import { Button } from "../../components/ui-kit/Button/Button"
import { IconSvg } from "../../components/IconSvg/IconSvg"
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs"


import { Pagination } from "../../components/Pagination/Pagination"
import { NewsList } from "../../components/NewsList/NewsList"

import { fetchNews } from "../../store/thunks/newsThunk";

import cn from "classnames"
import classes from "./News.module.scss"
import { setFilterValue } from "../../store/reducers/newsReducer"
import { INews } from "../../Interfaces/INews"



export const News: FC = () => {
  const dispatch = useAppDispatch()
  const { news, loading, error } = useAppSelector((state) => state.news);
  const isLoading = loading ? "Идет загрузка данных" : ''

  const [searchParams, setSearchParams] = useSearchParams("");
  const [inputValue, setInputValue] = useState<string>('')

  let valueFromUrlParams = searchParams.get("filter") || ''


  const [filteredData, setFilterdData] = useState<INews[]>();


  const handleSearchNews = () => {
    let filteredNewsData = news?.filter((news) => {
      const regExp = new RegExp(inputValue, "i");
      return regExp.test(news.title);
    });
    setFilterdData(filteredNewsData);
    dispatch(setFilterValue(valueFromUrlParams));
  };

  const { handlePageChange, pageCount, slicedArray, forcePage } = usePagination(9, filteredData)

  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch])

  useEffect(() => {
    if (inputValue === '') {
      dispatch(setFilterValue(inputValue));
      setFilterdData(news)
    }
  }, [dispatch, inputValue, news])


  const breadCrumbsItems = [
    {
      id: 0,
      title: 'Home',
      path: '/',
    },
    {
      id: 1,
      title: "Новости",
    }

  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
    setSearchParams(createSearchParams({ filter: e.target.value }));
  }

  return (
    <section className={classes.wrapper}>
      <div className={cn("container", classes.container)}>
        <div>
          <Breadcrumbs breadCrumbsItems={breadCrumbsItems} />
          <div className={classes.flex}>
            <h3>
              Новости
            </h3>
            <form className={classes.searchForm}>
              <input className={classes.searchInput}
                type="text"
                placeholder="Поиск по статьям"
                value={inputValue}
                onChange={handleChange}
              />
              <Button
                className={classes.searchBtn}
                onClick={handleSearchNews}
                type={"button"}
              >
                <IconSvg
                  id={"#search"}
                  className={classes.searchIcon} />
              </Button>
            </form>
          </div >
          {isLoading}
          {error && <h1 className={classes.error}>Error Page: {error}</h1>}
          <NewsList
            newsList={slicedArray}
          />
        </div>
        <div className={classes.mt}>
          <Pagination
            forcePage={forcePage - 1}
            pageCount={pageCount.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}


