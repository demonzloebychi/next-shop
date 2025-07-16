import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, createJWT } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 });
  }

  const validPassword = await verifyPassword(password, user.password);

  if (!validPassword) {
    return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 });
  }

  const token = createJWT({ id: user.id, email: user.email });

  const response = NextResponse.json({ message: 'Успешный вход' });
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60, // 1 час
    sameSite: 'strict',
  });

  return response;
}
