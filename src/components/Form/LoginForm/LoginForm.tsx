import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../../hooks/redux/redux-hooks";
import { SubmitHandler, useForm } from "react-hook-form"
import { setIsActive } from "../../../store/reducers/modalReducer"
import { Input } from "../../ui-kit/Input/Input"
import { Button } from "../../ui-kit/Button/Button"
import { IFormFields } from "../../../Interfaces/IFormFields"

import cn from "classnames"
import classes from "./LoginForm.module.scss"

export const LoginForm = () => {
  const [active, setActive] = useState(false)
  const dispatch = useAppDispatch()

  const { register, formState: { errors }, reset, handleSubmit }
    =
    useForm<IFormFields>({ mode: "onSubmit" })

  useEffect(() => {
    if (
      errors.login ||
      errors.email ||
      errors.password ||
      errors.confirmPassword) {
      dispatch(setIsActive(false))
    }
  }, [dispatch, errors])

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    if (
      data.login &&
      data.email &&
      data.password &&
      data.confirmPassword
      !== "") {
      dispatch(setIsActive(true))
    }
    reset()
  }
  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("login", {
          required: true,
          minLength: 4
        })}
        error={errors.login}
        className={classes.input}
        placeholder="Логин"
        iconId="#user"
      />
      <Input
        type="password"
        {...register("password", {
          required: true,
          minLength: 5
        })}
        className={classes.input}
        error={errors.password}
        placeholder="Пароль"
        iconId="#password"
      />
      <div className={classes.flex}>
        <div className={classes.rememberMy}>
          <Button
            className={cn(classes.switch, {
              [classes.switchActive]: active
            })}
            onClick={() => setActive((prevState) => !prevState)} />
          <span className={classes.text}>Запомнить меня</span>
        </div>
        <Link to={"/"} className={classes.link}>Забыли пароль?</Link>
      </div>
      <Button
        type="submit"
        className={classes.button}
        onClick={() => dispatch(setIsActive(true))}
      >
        Войти
      </Button>
      <>
        <span className={cn(classes.text, classes.mr)}>Еще нет аккаунта?</span>
        <Link to={"/registration"} className={classes.link}>Создайте акканут</Link>
      </>
    </form>
  )
}
