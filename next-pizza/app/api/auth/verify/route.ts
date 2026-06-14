import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Код верификации отсутствует' }, { status: 400 });
    }

    const verificationRecord = await prisma.verification.findFirst({
      where: {
        value: code,
      },
    });

    if (!verificationRecord || verificationRecord.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Неверный или просроченный код' }, { status: 400 });
    }

    await prisma.user.update({
      where: {
        email: verificationRecord.identifier,
      },
      data: {
        emailVerified: true, // Новое поле вместо verified: new Date()
      },
    });

    await prisma.verification.delete({
      where: {
        id: verificationRecord.id,
      },
    });

    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (error) {
    console.error(error);
    console.log('[VERIFY_GET] Server error', error);
  }
}