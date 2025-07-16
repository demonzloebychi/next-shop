'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage('');
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Регистрация прошла успешно');
      setEmail('');
      setPassword('');
    } else {
      setError(data.error || 'Ошибка регистрации');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '1rem' }}>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:<br />
          <input
            type="email"
            
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <br /><br />
        <label>
          Пароль:<br />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <br /><br />
        <button type="submit">Зарегистрироваться</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
