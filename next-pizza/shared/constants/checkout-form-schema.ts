import {z} from "zod";

// под капотом создается объект конфигуратор (checkoutFormSchema - js объект)
// checkoutFormSchema - нужна для resolver (для рантайм проверки)
export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
  lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
  email: z.string().email({ message: 'Введите корректную почту' }),
  phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
  address: z.string().min(5, { message: 'Введите корректный адрес' }),
  comment: z.string().optional(),
});

// z.infer - создает typescript тип из объекта
// CheckoutFormValues - нужно для подсказок typescript
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
// typeof checkoutFormSchema - запишется огромный внутренний тип самого Zod: ZodObject<{ firstName: ZodString; ... }, "strip", ZodTypeAny>
