import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "./redux/redux-hooks";
import {
  setFilteredData,
  setDublicateData,
} from "../store/reducers/filterReducer";
import { useLocation } from "react-router";
import { path } from "../constants/pages";
import { IResponseData } from "../Interfaces/IResponseData";
import { fetchFlats } from "../store/thunks/flatThunk";
import { fetchCottages } from "../store/thunks/cottagesThunk";
import { fetchBaths } from "../store/thunks/bathsThunk";
import { fetchCars } from "../store/thunks/carsThunk";

export const useFilter = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { flats } = useAppSelector((state) => state.flats);
  const { cottages } = useAppSelector((state) => state.cottages);
  const { baths } = useAppSelector((state) => state.baths);
  const { cars } = useAppSelector((state) => state.cars);
  const { filteredData, duplicateData, stateData, sortValue } = useAppSelector(
    (state) => state.filter
  );
  const [currentFetchData, setCurrentFetchData] = useState<IResponseData[]>();

  useEffect(() => {
    switch (location.pathname) {
      case path.APARTMENTS:
        dispatch(fetchFlats());
        break;
      case path.COTTAGES:
        dispatch(fetchCottages());
        break;
      case path.BATHS:
        dispatch(fetchBaths());
        break;
      case path.CARS:
        dispatch(fetchCars());
        break;
      default:
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    switch (location.pathname) {
      case path.HOME:
        return setCurrentFetchData(flats);
      case path.APARTMENTS:
        return setCurrentFetchData(flats);
      case path.COTTAGES:
        return setCurrentFetchData(cottages);
      case path.BATHS:
        return setCurrentFetchData(baths);
      case path.CARS:
        return setCurrentFetchData(cars);
    }
  }, [baths, cars, cottages, flats, location.pathname]);

  useEffect(() => {
    filteredProducts();
  }, [currentFetchData, dispatch, stateData.city]);

  // Фильтрация
  const filteredProducts = () => {
    let filtered = currentFetchData
      ?.filter((item: { city: string }) =>
        stateData.city ? item.city === stateData.city : true
      )
      .filter((item: { room: string }) =>
        stateData.room ? parseInt(item.room) === parseInt(stateData.room) : true
      )
      .filter((item: { price: string }) =>
        stateData.priceMin && stateData?.priceMax
          ? parseInt(item.price) >= parseInt(stateData.priceMin) &&
            parseInt(item.price) <= parseInt(stateData.priceMax)
          : true
      )
      .filter((item: { metro: string }) =>
        stateData.metro ? item.metro === stateData.metro : true
      )
      .filter((item: { area: string }) =>
        stateData.area ? item.area === stateData.area : true
      )
      .filter((item: { type: string }) =>
        stateData.type ? item.type === stateData.type : true
      )
      .filter((item: { capacity: string }) =>
        stateData.capacity
          ? item.capacity.split(" ")[0] === stateData.capacity
          : true
      );

    dispatch(setFilteredData(filtered));
    dispatch(setDublicateData(filtered));
  };

  //Сортировка по цене
  useEffect(() => {
    const filtered = [...filteredData];
    if (sortValue.value === "По возрастанию цены") {
      filtered.sort((a: any, b: any) => a.price - b.price);
      dispatch(setFilteredData(filtered));
    } else if (sortValue.value === "По убыванию цены") {
      filtered.sort((a: any, b: any) => b.price - a.price);
      dispatch(setFilteredData(filtered));
    } else {
      dispatch(setFilteredData(duplicateData));
    }
  }, [dispatch, sortValue]);

  return {
    filteredProducts,
  };
};
