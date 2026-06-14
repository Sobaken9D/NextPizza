import {z} from 'zod';

export const passwordSchema = z.string().min(4, { message: 'Введите корректный пароль' });

export const formLoginSchema = z.object({
  email: z.string().email({message: 'Введите корректную почту'}),
  password: passwordSchema
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
      confirmPassword: passwordSchema
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

// .refine(...) — это кастомная проверка, которая запускается после того, как все поля успешно заполнили.
// path: ['confirmPassword'] указывает React Hook Form, что если пароли разные, ошибку «Пароли не совпадают» нужно повесить конкретно на инпут подтверждения пароля, а не на всю форму целиком.

export const formUpdateProfileSchema = z
  .object({
    fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
    email: z.string().email({ message: 'Введите корректную почту' }),
    currentPassword: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })
  .refine((data) => !data.password || (data.password && data.currentPassword), {
    message: 'Введите текущий пароль для изменения на новый',
    path: ['currentPassword'],
  });

export type TFormUpdateProfileValues = z.infer<typeof formUpdateProfileSchema>;
export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;