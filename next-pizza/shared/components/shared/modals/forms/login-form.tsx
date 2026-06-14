'use client';

import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {
  formLoginSchema,
  TFormLoginValues
} from "@/shared/components/shared/modals/forms/schemas";
import {Button, FormInput, Title} from "@/shared/components";
import toast from "react-hot-toast";
import {authClient} from "@/shared/lib/auth/auth-client";

interface Props {
  // VoidFunction - аллисас для () => void
  onClose?: VoidFunction;
}

export const LoginForm = ({onClose}: Props) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const {error} = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title
              text="Вход в аккаунт"
              size="md"
              className="font-bold"
            />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput
          name="email"
          label="E-Mail"
          required
        />
        <FormInput
          name="password"
          label="Пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
}