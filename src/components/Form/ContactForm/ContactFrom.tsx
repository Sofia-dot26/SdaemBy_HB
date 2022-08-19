import { useEffect } from "react"
import { useAppDispatch } from "../../../hooks/redux/redux-hooks"
import { SubmitHandler, useForm } from "react-hook-form"

import { setIsActive } from "../../../store/reducers/modalReducer"
import { Button } from "../../ui-kit/Button/Button"
import { Input } from "../../ui-kit/Input/Input"

import { IFormFields } from "../../../Interfaces/IFormFields"

import cn from "classnames"
import classes from "./ContactForm.module.scss"

export const ContactFrom = () => {
  const dispatch = useAppDispatch()


  const { register, formState: { errors }, reset, handleSubmit }
    =
    useForm<IFormFields>({ mode: "onSubmit" })

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    if (data.name && data.email && data.message !== "") {
      dispatch(setIsActive(true))
    }
    reset()
  }
  useEffect(() => {
    if (errors.name || errors.email || errors.message) {
      dispatch(setIsActive(false))
    }
  }, [dispatch, errors])


  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.flex}>
        <Input
          label="Ваше имя"
          id="#name"
          {...register("name", {
            required: true,
            pattern: {
              value: /^[a-zA-Zа-яёА-ЯЁ]{3,15}$/,
              message: ''
            },
          })}
          error={errors.name}
          iconId="#user"
          placeholder="Введите"
        />
        <Input
          label="Ваша электронная почта"
          id="#email"
          {...register('email', {
            required: true,
            pattern: {
              value: /^[_a-z0-9-+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
              message: '',
            },
          })}
          error={errors.email}
          iconId="#mail"
          placeholder="Введите"
        />
      </div>
      <div className={cn(classes.textAreaWrapper, {})}>
        <label htmlFor="#message" className={classes.textAreaTitle}>Ваше сообщение</label>
        <textarea
          id="#message"
          className={cn(classes.textarea, {
            [classes.error]: errors.message
          })}
          {...register("message", {
            required: true,
            pattern: {
              value: /^[0-9a-zA-Zа-яёА-ЯЁ ,.]{3,1000}$/,
              message: ""
            },
          })}
          placeholder="Сообщение"
        />
      </div>
      <Button
        className={classes.button}
        type="submit"
      >
        Отправить
      </Button>
    </form>
  )
}