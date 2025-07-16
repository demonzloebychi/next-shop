import { redirect } from 'next/navigation';
import { getUserFromCookie } from '@/lib/auth';
import LogoutButton from '@/components/logout';

export default async function DashboardPage() { // async функция!
  const user = await getUserFromCookie();

  if (!user) {
    redirect('/login');
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '1rem' }}>
      <h1>Добро пожаловать, {user.email}!</h1>
      <p>Это защищённая страница, доступная только авторизованным пользователям.</p>
      <LogoutButton />
    </div>
  );
}
