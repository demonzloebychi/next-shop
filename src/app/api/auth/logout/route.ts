import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Выход выполнен' });
  response.cookies.set('token', '', {
    maxAge: 0,      // немедленное удаление cookie
    path: '/',      // обязательно путь совпадает с установкой cookie
    httpOnly: true, // если устанавливали так же
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
