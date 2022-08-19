import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux/redux-hooks";

import { usePagination } from "../../../hooks/usePagination";
import { usePageTitle } from "../../../hooks/usePageTitle";

import { selectedValueForSort } from "../../../store/reducers/filterReducer";

import { DiffButtons } from "../section-diffbuttons/DiffButtons";
import { SelectSortPrice } from "../../../components/FilterUI/SelectSortPrice/SelectSortPrice";
import { TiledCards } from "../../../components/cards/TiledCards/TiledCards";
import { ListCards } from "../../../components/cards/ListCards/ListCards";
import { Pagination } from "../../../components/Pagination/Pagination";
import { ShareButtons } from "../../../components/ShareButtons/ShareButtons";

import { IResponseData } from "../../../Interfaces/IResponseData";
import classes from "./Products.module.scss"

import { SingleValue } from "react-select";
import { ISelectOption } from "../../../Interfaces/ISelectOption";

export const Products: FC = () => {
  const { title } = usePageTitle()
  const { active, filteredData } = useAppSelector(state => state.filter)
  const { error, loading } = useAppSelector(state => state.flats)

  const dispatch = useAppDispatch()
  const displayPerPage = active === "tiles" ? 6 : 3

  const { pageCount, slicedArray, handlePageChange, forcePage }
    = usePagination(displayPerPage, filteredData)

  const onChangeHandler = (newValue: SingleValue<ISelectOption>) => {
    dispatch(selectedValueForSort({
      value: newValue?.value,
      label: newValue?.value
    }))
  }
  return (
    <section>
      <div className="container">
        <div className={classes.flex}>
          <div className={classes.ml}>
            <SelectSortPrice onChangeHandler={onChangeHandler} />
          </div>
          <DiffButtons />
        </div>
        <h3 className={classes.title}>
          {filteredData && <span> Найдено {filteredData?.length} результата</span>}
        </h3>
        {active === "tiles" &&
          <div className={classes.tilesCardWrapper}>
            {slicedArray?.map((items: IResponseData) =>
              <TiledCards key={items.id} data={items} className={classes.shadow} />
            )}
          </div>
        }
        {active === "list" &&
          <div className={classes.listCardWrapper}>
            {slicedArray?.map((items: IResponseData) =>
              <ListCards key={items.id} data={items} className={classes.shadow} />
            )}
          </div>
        }
        <div className={classes.bottom}>
          <Pagination
            forcePage={forcePage - 1}
            pageCount={pageCount.length}
            onChange={handlePageChange}
          />
          <ShareButtons
            title={title}
            url={"https://sdaem.by/"}
          />
        </div>
      </div>
    </section>)
};

