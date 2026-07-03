import { useState } from 'react'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Неверный логин или пароль')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
        <div style={{
          background: 'white',
          borderRadius: 24,
          padding: 40,
          maxWidth: 380,
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'rgba(64,186,33,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 24
          }}>
            🔒
          </div>
          <h2 style={{ marginBottom: 4 }}>Вход для администратора</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 24 }}>
            Введите логин и пароль для доступа к панели
          </p>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Логин"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              fontSize: 14,
              marginBottom: 12,
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              fontSize: 14,
              marginBottom: 12,
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          <button className="btn" onClick={handleLogin} style={{ width: '100%' }}>
            Войти
          </button>
          {error && (
            <p style={{ color: '#dc2626', fontSize: 13, marginTop: 12, fontWeight: 600 }}>
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div style={{
        background: '#0B1F3F',
        color: 'white',
        borderRadius: 24,
        padding: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <h2 style={{ color: 'white', margin: 0 }}>Панель администратора</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '4px 0 0' }}>
            Управление событиями, анкетами и заявками
          </p>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          style={{
            padding: '10px 20px',
            borderRadius: 12,
            border: 'none',
            background: 'rgba(255,255,255,0.15)',
            color: 'white',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer'
          }}
        >
          Выйти
        </button>
      </div>

      <div className="donation-card">
        <p>Тут появится управление событиями и анкетами.</p>
      </div>
    </div>
  )
}

export default AdminPage