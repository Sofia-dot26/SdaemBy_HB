import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/redux-hooks";
import { setSelectedData } from "../../../store/reducers/filterReducer";

import { SelectGroup } from "../MoreOptions/SelectGroup/SelectGroup";
import { Checkbox } from "../../ui-kit/Checkbox/Checkbox";

import { SingleValue } from "react-select";
import { ISelectOption } from "../../../Interfaces/ISelectOption";


import { kitchen, games } from "../../../data/checkbox";
import classes from "./MoreOptions.module.scss"

export const MoreOptions: FC = () => {

  const dispatch = useAppDispatch()
  const { stateData } = useAppSelector(state => state.filter)

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
    <>
      <div className={classes.selectWrapper}>
        <SelectGroup onChangeHandler={onChangeHandler} />
      </div>
      <div className={classes.checkboxWrapper}>
        <Checkbox
          data={kitchen}
        />
        <Checkbox
          data={games}
        />
      </div>
    </>

  );
};

