'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/dashboard'); // редирект на защищённую страницу после логина
    } else {
      setError(data.error || 'Ошибка входа');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: 400, margin: 'auto', padding: '1rem'}}>
      <h1>Вход</h1>
      <label>Email:<br/>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <br /><br />
      <label>Пароль:<br/>
        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br /><br />
      <button type="submit">Войти</button>
      {error && <p style={{color:'red'}}>{error}</p>}
    </form>
  );
}
