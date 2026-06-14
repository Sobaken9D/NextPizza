'use client';

import {User} from "@prisma/client";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  formUpdateProfileSchema,
  TFormUpdateProfileValues
} from "@/shared/components/shared/modals/forms/schemas";
import toast from "react-hot-toast";
import {updateUserInfo} from "@/app/actions";
import {Button, Container, FormInput, Title} from "@/shared/components";
import {authClient} from "@/shared/lib/auth/auth-client";
import {useRouter} from "next/navigation";

interface Props {
  data: User;
}

export const ProfileForm = ({data}: Props) => {
  const router = useRouter();

  const form = useForm<TFormUpdateProfileValues>({
    resolver: zodResolver(formUpdateProfileSchema),
    defaultValues: {
      fullName: data.fullName || '',
      email: data.email || '',
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: TFormUpdateProfileValues) => {
    try {
      await updateUserInfo({
        email: values.email,
        fullName: values.fullName,
        password: values.password || undefined,
        currentPassword: values.currentPassword || undefined,
      });

      toast.success('Данные успешно обновлены! 📝');

      // Очищаем только поля паролей
      form.reset({
        fullName: values.fullName,
        email: values.email,
        currentPassword: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <Container className="my-10">
      <Title
        text={`Личные данные | #${data.id}`}
        size="md"
        className="font-bold"
      />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            name="email"
            label="E-Mail"
            required
          />
          <FormInput
            name="fullName"
            label="Полное имя"
            required
          />

          <hr className="my-2 border-gray-200" />

          <FormInput
            type="password"
            name="currentPassword"
            label="Текущий пароль"
          />
          <FormInput
            type="password"
            name="password"
            label="Новый пароль"
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Повторите новый пароль"
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-5"
            type="submit"
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};