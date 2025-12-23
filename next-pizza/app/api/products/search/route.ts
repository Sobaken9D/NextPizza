// роуты нужны для отлавливания запросов
import {prisma} from '@/prisma/prisma-client';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || '';

  const products = await prisma.product.findMany({
    where: {
      name: { // делаем сравнение includes по продуктам
        contains: query,
        mode: 'insensitive', // регистрозависимость
      },
    },
    take: 5, // только 5 продуктов
  });

  return NextResponse.json(products);
}

// /api/products/search?query=<сырная>