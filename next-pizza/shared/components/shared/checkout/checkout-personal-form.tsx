import {Input} from "@/shared/components/ui";
import React from "react";
import {useFormContext} from "react-hook-form";
import {WhiteBlock} from "@/shared/components/shared";
import {FormInput} from "@/shared/components/shared/form";

// InputHTMLAttributes - для того чтобы дать компоненту свойства HTML-тега (type, placeholder)
// <HTMLInputElement> - для того чтобы дать компоненту свойства объекта bp js (e.target.value)

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const CheckoutPersonalForm = ({className}: Props) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя"/>
        <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
}