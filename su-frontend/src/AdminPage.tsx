import { useState, useEffect, useCallback } from 'react'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'


type Lang = 'en' | 'ru'

const adminTranslations = {
  en: {
    title: 'Admin Panel',
    subtitle: 'Manage events, questionnaires and applications',
    logout: 'Logout',
    login_title: 'Admin Login',
    login_desc: 'Enter your credentials to access the panel',
    username_placeholder: 'Username',
    password_placeholder: 'Password',
    login_btn: 'Login',
    logout_btn: 'Logout',
    error: 'Invalid username or password',
    placeholder: 'Event and questionnaire management coming soon.',
    admin_panel_desc: 'Manage events and questionnaires',
    exprt_btn: "Export Questionnaires to CSV",
  },
  ru: {
    title: 'Панель администратора',
    subtitle: 'Управление событиями, анкетами и заявками',
    logout: 'Выйти',
    login_title: 'Вход для администратора',
    login_desc: 'Введите логин и пароль для доступа к панели',
    username_placeholder: 'Логин',
    password_placeholder: 'Пароль',
    login_btn: 'Войти',
    logout_btn: 'Выйти',
    error: 'Неверный логин или пароль',
    placeholder: 'Тут появится управление событиями и анкетами.',
    admin_panel_desc: 'Управление событиями и анкетами',
    exprt_btn: "Экспорт анкет в CSV",
  }
}

const QUESTIONNAIRES_DATA = [
  {
    id: 'q1',
    titleEn: 'Academic Experience Survey',
    titleRu: 'Опрос об учёбе',
    questions: [
      { id: 'q1_1', textEn: 'How would you rate teaching quality?', textRu: 'Как вы оцениваете качество преподавания?', type: 'single', options: 'Excellent | Good | Average | Poor', required: true },
      { id: 'q1_2', textEn: 'Which subjects are most challenging?', textRu: 'Какие предметы сложнее всего?', type: 'multiple', options: 'Calculus | Linear Algebra | Algorithms | Physics | English', required: false },
      { id: 'q1_3', textEn: 'Suggestions for Student Union?', textRu: 'Пожелания студенческому совету?', type: 'text', options: '', required: false },
    ]
  },
  {
    id: 'q2',
    titleEn: 'SU IT Internship Application',
    titleRu: 'Заявка на стажировку в SU IT',
    questions: [
      { id: 'q2_1', textEn: 'Your frontend experience level?', textRu: 'Ваш уровень опыта во фронтенде?', type: 'single', options: 'Beginner | Intermediate | Advanced', required: true },
      { id: 'q2_2', textEn: 'Which technologies do you know?', textRu: 'Какие технологии вы знаете?', type: 'multiple', options: 'TypeScript/React | Tailwind | Node.js | PostgreSQL | Docker', required: false },
      { id: 'q2_3', textEn: 'GitHub or portfolio link', textRu: 'Ссылка на GitHub или портфолио', type: 'text', options: '', required: true },
    ]
  }
]

const exportToCSV = () => {
  const rows: string[] = []
 
  rows.push([
    'Questionnaire ID',
    'Title EN',
    'Title RU', 
    'Question ID',
    'Question EN',
    'Question RU',
    'Type',
    'Required',
    'Options'
  ].join(';'))

  for (const q of QUESTIONNAIRES_DATA) {
    for (const question of q.questions) {
      rows.push([
        q.id,
        `"${q.titleEn}"`,   
        `"${q.titleRu}"`,
        question.id,
        `"${question.textEn}"`,
        `"${question.textRu}"`,
        question.type,
        question.required ? 'yes' : 'no',
        `"${question.options}"`
      ].join(';'))
    }
  }

  const csv = rows.join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'questionnaires.csv'
  link.click()
  URL.revokeObjectURL(url)
}


function AdminPage({ lang }: { lang: Lang }) {
  const t = adminTranslations[lang]
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoggedIn) handleLogin()
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [username, password, isLoggedIn])
  const handleLogin = useCallback(() => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError(t.error)
    }
  }, [username, password, t.error])

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
          <h2 style={{ marginBottom: 4 }}>{t.login_title}</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 24 }}>
            {t.login_desc}
          </p>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.username_placeholder}
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
            placeholder={t.password_placeholder}
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
            {t.login_btn}
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
          <h2 style={{ color: 'white', margin: 0 }}>{t.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '4px 0 0' }}>
            {t.subtitle}
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
          {t.logout_btn}
        </button>
      </div>

      <div className="donation-card">
        <p>{t.admin_panel_desc}</p>
        <br />
        <button className="btn" onClick={exportToCSV}>
            📥 {t.exprt_btn}
        </button>
      </div>
      </div>
  )
}

export default AdminPage