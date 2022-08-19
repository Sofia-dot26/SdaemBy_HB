import { useState, useEffect } from 'react'
import { useAppDispatch } from "../../../hooks/redux/redux-hooks";
import { setIsActive } from "../../../store/reducers/modalReducer"
import { SubmitHandler, useForm } from "react-hook-form"
import Reaptcha from "reaptcha";
import { IFormFields } from "../../../Interfaces/IFormFields";
import { Input } from "../../ui-kit/Input/Input"
import { Button } from "../../ui-kit/Button/Button"
import { IconSvg } from "../../IconSvg/IconSvg";

import classes from "./RegistrationFrom.module.scss"
import cn from "classnames"
export const RegistrationForm = () => {

  const dispatch = useAppDispatch()

  const [verified, setVerified] = useState(false);
  const [errorText, setErrorText] = useState('')
  const [showError, setShowError] = useState(false)
  const onVerify = () => {
    setVerified(true);
  };
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


  useEffect(() => {
    if (
      errors.login ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      setErrorText("Ошибка ввода")
      setShowError(true)
    }
    else {
      setShowError(false)
    }
  }, [errors])

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
          minLength: {
            value: 4,
            message: "Ошибка ввода"
          },
        })}
        error={errors.login}
        iconId="#user"
        className={classes.input}
        placeholder="Логин"
      />
      <Input
        {...register('email', {
          required: true,
          pattern: {
            value: /^[_a-z0-9-+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
            message: 'Ошибка ввода',
          },
        })}
        error={errors.email}
        iconId="#mail"
        className={classes.input}
        placeholder="Электронная почта"
      />
      <Input
        {...register("password", {
          required: true,
          minLength: {
            value: 5,
            message: "Ошибка ввода"
          },
        })}
        error={errors.password}
        type="password"
        iconId="#password"
        className={classes.input}
        placeholder="Пароль"
      />
      <Input
        {...register("confirmPassword", {
          required: true,
          minLength: {
            value: 5,
            message: "Ошибка ввода"
          }
        })}
        error={errors.confirmPassword}
        type="password"
        iconId="#password"
        className={classes.input}
        placeholder="Повторите пароль"
      />
      <Reaptcha
        sitekey="6LdbXDohAAAAAOSRPg7cLWorWEB_GXXS9isiZ-eB"
        onVerify={onVerify}
      />
      {showError ?
        <div
          className={cn(classes.inputError, {
            [classes.showError]: showError
          })}>
          {errorText}
          <IconSvg id="#warning" className={classes.icon} />
        </div> : ""
      }
      <Button
        type="submit"
        className={classes.button}
        disabled={!verified}
      >
        Зарегистрироваться
      </Button>
    </form>
  )
}
