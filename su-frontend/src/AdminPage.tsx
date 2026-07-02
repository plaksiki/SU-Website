import { useState } from 'react'

//заглушка
const MOCK_ADMIN_PASSWORD = 'admin123'

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (password === MOCK_ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Неверный пароль')
    }
  }

  // если не вошел
  if (!isLoggedIn) {
    return (
      <div className="container">
        <h2>Вход для администратора</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
        <button className="btn" onClick={handleLogin}>Войти</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    )
  }

  // если вошел
  return (
    <div className="container">
      <h1>Админ-панель</h1>
      <p>Добро пожаловать! Тут будет управление событиями, анкетами и т.д.</p>
    </div>
  )
}

export default AdminPage