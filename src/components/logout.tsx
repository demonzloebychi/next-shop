'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
      router.push('/login'); // редирект на страницу входа после логаута
    } else {
      alert('Ошибка выхода');
    }
  }

  return <button onClick={handleLogout}>Выйти</button>;
}
