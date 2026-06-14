import {betterAuth} from "better-auth";
import {prismaAdapter} from "@better-auth/prisma-adapter";
import {prisma} from "@/prisma/prisma-client";

// Берем в серверных файлах
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  // настройка авторизации по почте
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },

  // настройка авторизации через провайдеры
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }
  },

  // связываем провайдеры, если поч та подтверждена
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"] // Автоматически связывать аккаунты для этих провайдеров
    }
  },

  // маппинг кастомных полей в сессию
  user: {
    additionalFields: {
      fullName: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "USER", // значение по умолчанию для новых пользователей
      },
    },
  },
});