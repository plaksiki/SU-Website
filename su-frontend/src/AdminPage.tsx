import { useState, useEffect } from 'react'

const API_URL = 'http://10.93.26.192:8080'
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

type QuestionType = 'open_text' | 'single_choice' | 'multiple_choice'
type Lang = 'en' | 'ru'

interface SuEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
}

interface Question {
  id: string
  text: string
  type: QuestionType
  options: string[]
}

interface Questionnaire {
  id: string
  title: string
  description: string
  questions: Question[]
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const adminTranslations = {
  en: {
    title: 'Admin Panel',
    subtitle: 'Manage events, questionnaires and applications',
    login_title: 'Admin Login',
    login_desc: 'Enter your credentials to access the panel',
    username_placeholder: 'Username',
    password_placeholder: 'Password',
    login_btn: 'Login',
    logout_btn: 'Logout',
    error: 'Invalid username or password',
    logged_in_as: 'Logged in as:',
    nav_event_create: 'Create event',
    nav_event_list: 'Events',
    nav_q_create: 'Create questionnaire',
    nav_q_list: 'Questionnaires',
    refresh_btn: '↻ Refresh',
    create_event: 'Create Event',
    event_title_placeholder: 'Title (Название | Title)',
    event_location_placeholder: 'Location (Место | Location)',
    event_description_placeholder: 'Description (Описание | Description)',
    event_bilingual_hint: 'For bilingual support use format: Русский | English',
    event_start_date: 'Start date',
    event_end_date: 'End date (when it moves to "Past")',
    event_list: 'Events',
    no_events: 'No events yet.',
    confirm_delete_event: 'Delete this event?',
    create_questionnaire: 'Create Questionnaire',
    q_title_placeholder: 'Questionnaire title (RU | EN)',
    q_desc_placeholder: 'Questionnaire description (RU | EN)',
    bilingual_hint: 'For bilingual support use format: Русский текст | English text',
    add_question_label: 'Add question',
    question_text_placeholder: 'Question text (RU | EN)',
    type_open: 'Open answer',
    type_single: 'Single choice',
    type_multiple: 'Multiple choice',
    options_placeholder: 'Options separated by commas: Yes, No, Maybe',
    add_question_btn: '+ Add question',
    questions_in_draft: 'Questions in draft',
    delete: 'Delete',
    create_q_btn: 'Create questionnaire',
    questionnaires_list: 'Questionnaires',
    no_questionnaires: 'No questionnaires yet.',
    confirm_delete: 'Delete this questionnaire?',
    export_btn: 'Export all to CSV',
    form_error_fields: 'Please fill in all required fields',
    form_error_questions: 'Add at least one question',
    form_error_q_fields: 'Fill in questionnaire title and description',
    fetch_error: 'Failed to load data from server',
  },
  ru: {
    title: 'Панель администратора',
    subtitle: 'Управление событиями, анкетами и заявками',
    login_title: 'Вход для администратора',
    login_desc: 'Введите логин и пароль для доступа к панели',
    username_placeholder: 'Логин',
    password_placeholder: 'Пароль',
    login_btn: 'Войти',
    logout_btn: 'Выйти',
    error: 'Неверный логин или пароль',
    logged_in_as: 'Вы вошли как:',
    nav_event_create: 'Создать событие',
    nav_event_list: 'События',
    nav_q_create: 'Создать опросник',
    nav_q_list: 'Опросники',
    refresh_btn: '↻ Обновить',
    create_event: 'Создать событие',
    event_title_placeholder: 'Название (Название | Title)',
    event_location_placeholder: 'Место (Место | Location)',
    event_description_placeholder: 'Описание (Описание | Description)',
    event_bilingual_hint: 'Для двуязычности используйте формат: Русский | English',
    event_start_date: 'Дата начала',
    event_end_date: 'Дата окончания (когда перейдёт в «Прошедшие»)',
    event_list: 'Список событий',
    no_events: 'Событий пока нет.',
    confirm_delete_event: 'Удалить это событие?',
    create_questionnaire: 'Создать опросник',
    q_title_placeholder: 'Название опросника (РУ | EN)',
    q_desc_placeholder: 'Описание опросника (РУ | EN)',
    bilingual_hint: 'Для двуязычности используйте формат: Русский текст | English text',
    add_question_label: 'Добавить вопрос',
    question_text_placeholder: 'Текст вопроса (РУ | EN)',
    type_open: 'Развёрнутый ответ',
    type_single: 'Один вариант',
    type_multiple: 'Несколько вариантов',
    options_placeholder: 'Варианты через запятую: Да, Нет, Может быть',
    add_question_btn: '+ Добавить вопрос',
    questions_in_draft: 'Вопросы в опроснике',
    delete: 'Удалить',
    create_q_btn: 'Создать опросник',
    questionnaires_list: 'Опросники',
    no_questionnaires: 'Опросников пока нет.',
    confirm_delete: 'Удалить опросник?',
    export_btn: 'Экспорт всех в CSV',
    form_error_fields: 'Пожалуйста, заполните все обязательные поля',
    form_error_questions: 'Добавьте хотя бы один вопрос',
    form_error_q_fields: 'Заполните название и описание опросника',
    fetch_error: 'Не удалось загрузить данные с сервера',
  },
}

// ============================================================================
// CSV EXPORT (all questionnaires)
// ============================================================================

const exportToCSV = async (fetchErrorMsg: string) => {
  try {
    const [questionnaires, answers, responses] = await Promise.all([
      fetch(`${API_URL}/questionnaires`).then(r => r.json()),
      fetch(`${API_URL}/answers`).then(r => r.json()),
      fetch(`${API_URL}/responses`).then(r => r.json()),
    ])

    const questionsMap: Record<number, { id: number; text: string }[]> = {}
    const optionsMap: Record<number, { id: number; text: string }[]> = {}

    await Promise.all(
      questionnaires.map(async (q: { id: number }) => {
        const qs = await fetch(`${API_URL}/question/by-questionnaire/${q.id}`).then(r => r.json())
        questionsMap[q.id] = qs
        await Promise.all(
          qs.map(async (question: { id: number; questionType: string }) => {
            if (question.questionType !== 'open_text') {
              const opts = await fetch(`${API_URL}/options/by-question/${question.id}`).then(r => r.json())
              optionsMap[question.id] = opts
            }
          })
        )
      })
    )

    const rows: string[] = []

    for (const questionnaire of questionnaires) {
      const questionnaireResponses = responses.filter(
        (r: { questionnaireId: number }) => r.questionnaireId === questionnaire.id
      )
      const questionnaireQuestions = (questionsMap[questionnaire.id] || []) as { id: number; text: string }[]
      if (questionnaireResponses.length === 0) continue

      rows.push('')
      rows.push(`"${questionnaire.title}"`)
      const header = ['Ответ #', ...questionnaireQuestions.map((q: { text: string }) => `"${q.text}"`)].join(';')
      rows.push(header)

      questionnaireResponses.forEach((response: { id: number }, idx: number) => {
        const responseAnswers = answers.filter((a: { responseId: number }) => a.responseId === response.id)
        const rowCells = [
          `${idx + 1}`,
          ...questionnaireQuestions.map((q: { id: number }) => {
            const ans = responseAnswers.find((a: { questionId: number }) => a.questionId === q.id)
            if (!ans) return '""'
            const allAnswersForQ = responseAnswers.filter(
              (a: { questionId: number; optionId: number | null }) => a.questionId === q.id && a.optionId
            )
            if (allAnswersForQ.length > 1) {
              const opts = optionsMap[q.id] || []
              const texts = allAnswersForQ.map((a: { optionId: number }) => {
                const o = opts.find((opt: { id: number; text: string }) => opt.id === a.optionId)
                return o ? o.text : a.optionId
              })
              return `"${texts.join(', ')}"`
            }
            if (ans.optionId) {
              const opts = optionsMap[q.id] || []
              const option = opts.find((o: { id: number; text: string }) => o.id === ans.optionId)
              return `"${option ? option.text : ans.optionId}"`
            }
            return `"${ans.textAnswer || ''}"`
          }),
        ]
        rows.push(rowCells.join(';'))
      })
    }

    const csv = rows.join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'answers.csv'
    link.click()
    URL.revokeObjectURL(url)
  } catch {
    alert(fetchErrorMsg)
  }
}

// ============================================================================
// STYLES
// ============================================================================

const ADMIN_STYLES = `
.admin-shell {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  box-sizing: border-box;
  padding: 0 clamp(16px, 3vw, 48px) 64px;
}
.admin-topbar {
  background: rgba(64,186,33,0.08);
  border-radius: 24px;
  padding: 28px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin: 24px 0;
}
.admin-nav {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 24px;
}
.admin-nav-btn {
  flex: 0 0 auto;
  padding: 12px 20px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #475569;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.admin-nav-btn.active {
  background: #40ba21;
  border-color: #40ba21;
  color: white;
}
.admin-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  width: 100%;
}
.admin-field-label { font-size: 12px; color: #64748b; margin: 0 0 4px; }
.admin-hint { font-size: 12px; color: #94a3b8; margin-bottom: 12px; }
.admin-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  margin-bottom: 12px;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
}
.admin-error { color: #dc2626; font-size: 13px; margin-top: 12px; font-weight: 600; }
.admin-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}
.admin-list-card {
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.admin-list-card-actions {
  display: flex;
  gap: 16px;
  margin-top: auto;
  padding-top: 8px;
}
.admin-link-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  padding: 0;
}
@media (max-width: 640px) {
  .admin-card { padding: 20px; }
}
`

// ============================================================================
// MAIN COMPONENT
// ============================================================================

type AdminView = 'event_create' | 'event_list' | 'q_create' | 'q_list'

function AdminPage({ lang, onEventsChange }: { lang: Lang; onEventsChange?: (events: unknown[]) => void }) {
  const t = adminTranslations[lang]
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('admin_logged_in') === 'true')
  const [username, setUsername] = useState(() =>
    localStorage.getItem('admin_logged_in') === 'true' ? ADMIN_USERNAME : ''
  )
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [view, setView] = useState<AdminView>('event_create')

  const [events, setEvents] = useState<SuEvent[]>(() => {
    try { return JSON.parse(localStorage.getItem('admin_events') || '[]') } catch { return [] }
  })
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>(() => {
    try { return JSON.parse(localStorage.getItem('admin_questionnaires') || '[]') } catch { return [] }
  })

  // Event create form
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newFinishedAt, setNewFinishedAt] = useState('')
  const [eventFormError, setEventFormError] = useState('')

  // Questionnaire create form
  const [qTitle, setQTitle] = useState('')
  const [qDescription, setQDescription] = useState('')
  const [draftQuestions, setDraftQuestions] = useState<Question[]>([])
  const [questionText, setQuestionText] = useState('')
  const [questionType, setQuestionType] = useState<QuestionType>('open_text')
  const [optionsInput, setOptionsInput] = useState('')
  const [qFormError, setQFormError] = useState('')

  const saveEvents = (list: SuEvent[]) => {
    setEvents(list)
    localStorage.setItem('admin_events', JSON.stringify(list))
    onEventsChange?.(list)
  }

  const saveQuestionnaires = (list: Questionnaire[]) => {
    setQuestionnaires(list)
    localStorage.setItem('admin_questionnaires', JSON.stringify(list))
  }

  const refreshEvents = () => {
    fetch(`${API_URL}/events`)
      .then(r => r.json())
      .then((data: { id: number; title: string; description: string; eventTime: string; eventLocation: string }[]) => {
        const mapped = data.map(e => ({
          id: e.id.toString(),
          title: e.title,
          date: e.eventTime ? e.eventTime.split('T')[0] : '',
          location: e.eventLocation || '',
          description: e.description || '',
        }))
        saveEvents(mapped)
      })
      .catch(() => {})
  }

  const refreshQuestionnaires = () => {
    fetch(`${API_URL}/questionnaires`)
      .then(r => r.json())
      .then(data =>
        saveQuestionnaires(
          data.map((q: { id: number; title: string; description: string }) => ({
            id: q.id.toString(),
            title: q.title,
            description: q.description,
            questions: [],
          }))
        )
      )
      .catch(() => {})
  }

  useEffect(() => {
    if (isLoggedIn) {
      refreshEvents()
      refreshQuestionnaires()
    }
  }, [isLoggedIn])

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      localStorage.setItem('admin_logged_in', 'true')
      setLoginError('')
    } else {
      setLoginError(t.error)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('admin_logged_in')
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isLoggedIn) handleLogin()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password, isLoggedIn])

  // ========== EVENT HANDLERS ==========

  const handleAddEvent = async () => {
    if (!newTitle || !newDate || !newLocation || !newDescription) {
      setEventFormError(t.form_error_fields)
      return
    }
    setEventFormError('')

    const localEvent: SuEvent = {
      id: Date.now().toString(),
      title: newTitle,
      date: newDate.split('T')[0],
      location: newLocation,
      description: newDescription,
    }

    // Обновляем UI сразу, не ждём сервер
    saveEvents([localEvent, ...events])
    setNewTitle('')
    setNewDate('')
    setNewLocation('')
    setNewDescription('')
    setNewFinishedAt('')
    setView('event_list')

    // Отправляем на сервер в фоне
    fetch(`${API_URL}/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        eventTime: new Date(newDate).toISOString().replace('Z', ''),
        eventLocation: newLocation,
        finishedAt: newFinishedAt ? new Date(newFinishedAt).toISOString().replace('Z', '') : null,
      }),
    }).then(() => refreshEvents()).catch(() => {})
  }

  const handleDeleteEvent = (id: string) => {
    if (!confirm(t.confirm_delete_event)) return
    saveEvents(events.filter(e => e.id !== id))
    fetch(`${API_URL}/event/${id}`, { method: 'DELETE' }).catch(() => {})
  }

  // ========== QUESTION HANDLERS ==========

  const handleAddQuestion = () => {
    if (!questionText) return
    const question: Question = {
      id: Date.now().toString(),
      text: questionText,
      type: questionType,
      options:
        questionType === 'open_text'
          ? []
          : optionsInput
              .split(',')
              .map(o => o.trim())
              .filter(o => o !== ''),
    }
    setDraftQuestions(prev => [...prev, question])
    setQuestionText('')
    setQuestionType('open_text')
    setOptionsInput('')
  }

  const handleRemoveQuestion = (id: string) => {
    setDraftQuestions(prev => prev.filter(q => q.id !== id))
  }

  const handleCreateQuestionnaire = () => {
    if (!qTitle || !qDescription) {
      setQFormError(t.form_error_q_fields)
      return
    }
    if (draftQuestions.length === 0) {
      setQFormError(t.form_error_questions)
      return
    }
    setQFormError('')

    const localId = Date.now().toString()
    const snapshot = { title: qTitle, description: qDescription, questions: [...draftQuestions] }

    // Обновляем UI сразу
    saveQuestionnaires([{ id: localId, ...snapshot }, ...questionnaires])
    setQTitle('')
    setQDescription('')
    setDraftQuestions([])
    setView('q_list')

    // Отправляем на сервер в фоне
    fetch(`${API_URL}/questionnaire`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: snapshot.title,
        description: snapshot.description,
        startedAt: new Date().toISOString().replace('Z', ''),
        finishedAt: null,
      }),
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(created =>
        Promise.all(
          snapshot.questions.map((q, index) =>
            fetch(`${API_URL}/questions`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                questionnaireId: created.id,
                text: q.text,
                questionType: q.type,
                orderIndex: index + 1,
              }),
            }).then(r => r.json())
          )
        ).then(createdQuestions =>
          Promise.all(
            createdQuestions.flatMap((createdQ, index) => {
              const q = snapshot.questions[index]
              if (q.options.length === 0) return []
              return q.options.map((optText, optIndex) =>
                fetch(`${API_URL}/options`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ questionId: createdQ.id, text: optText, orderIndex: optIndex + 1 }),
                })
              )
            })
          )
        )
      )
      .catch(() => {})
  }

  const handleDeleteQuestionnaire = (id: string) => {
    if (!confirm(t.confirm_delete)) return
    saveQuestionnaires(questionnaires.filter(q => q.id !== id))
    fetch(`${API_URL}/questionnaire/${id}`, { method: 'DELETE' }).catch(() => {})
  }

  // ========== LOGIN VIEW ==========

  if (!isLoggedIn) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
        <div style={{
          background: 'white', borderRadius: 24, padding: 40, maxWidth: 380,
          width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: 'rgba(64,186,33,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: 24,
          }}>🔒</div>
          <h2 style={{ marginBottom: 4 }}>{t.login_title}</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 24 }}>{t.login_desc}</p>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder={t.username_placeholder}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={t.password_placeholder}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
          />
          <button className="btn" onClick={handleLogin} style={{ width: '100%' }}>{t.login_btn}</button>
          {loginError && <p style={{ color: '#dc2626', fontSize: 13, marginTop: 12, fontWeight: 600 }}>{loginError}</p>}
        </div>
      </div>
    )
  }

  // ========== MAIN PANEL VIEW ==========

  const typeLabel = (type: QuestionType) =>
    type === 'open_text' ? t.type_open : type === 'single_choice' ? t.type_single : t.type_multiple

  const navItems: { key: AdminView; label: string }[] = [
    { key: 'event_create', label: t.nav_event_create },
    { key: 'event_list', label: `${t.nav_event_list} (${events.length})` },
    { key: 'q_create', label: t.nav_q_create },
    { key: 'q_list', label: `${t.nav_q_list} (${questionnaires.length})` },
  ]

  return (
    <div className="admin-shell">
      <style>{ADMIN_STYLES}</style>

      <div className="admin-topbar">
        <div>
          <h2 style={{ color: '#0f172a', margin: 0 }}>{t.title}</h2>
          <p style={{ color: '#475569', fontSize: 13, margin: '4px 0 0' }}>{t.subtitle}</p>
          <p style={{ color: '#475569', fontSize: 12, margin: '4px 0 0' }}>
            {t.logged_in_as} <strong style={{ color: '#40ba21' }}>{username}</strong>
          </p>
        </div>
        <button onClick={handleLogout} className="admin-nav-btn">{t.logout_btn}</button>
      </div>

      <div className="admin-nav">
        {navItems.map(item => (
          <button
            key={item.key}
            className={`admin-nav-btn${view === item.key ? ' active' : ''}`}
            onClick={() => setView(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* EVENT CREATE */}
      {view === 'event_create' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 16 }}>{t.create_event}</h3>
          <p className="admin-hint">{t.event_bilingual_hint}</p>
          <input type="text" className="admin-input" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder={t.event_title_placeholder} />
          <input type="text" className="admin-input" value={newLocation} onChange={e => setNewLocation(e.target.value)} placeholder={t.event_location_placeholder} />
          <textarea className="admin-input" value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder={t.event_description_placeholder} rows={3} style={{ resize: 'vertical' }} />
          <p className="admin-field-label">{t.event_start_date}</p>
          <input type="datetime-local" className="admin-input" value={newDate} onChange={e => setNewDate(e.target.value)} max="9999-12-31T23:59" />
          <p className="admin-field-label">{t.event_end_date}</p>
          <input type="datetime-local" className="admin-input" value={newFinishedAt} onChange={e => setNewFinishedAt(e.target.value)} max="9999-12-31T23:59" />
          <button className="btn" onClick={handleAddEvent} style={{ width: '100%' }}>{t.create_event}</button>
          {eventFormError && <p className="admin-error">{eventFormError}</p>}
        </div>
      )}

      {/* EVENTS LIST */}
      {view === 'event_list' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0 }}>{t.event_list} ({events.length})</h3>
            <button className="admin-nav-btn" onClick={refreshEvents}>{t.refresh_btn}</button>
          </div>
          {events.length === 0 && <p className="admin-hint">{t.no_events}</p>}
          <div className="admin-list-grid">
            {events.map(event => (
              <div key={event.id} className="admin-list-card">
                <strong>{event.title}</strong>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
                  {event.date}{event.location && ` · ${event.location}`}
                </p>
                {event.description && <p style={{ fontSize: 14, margin: 0 }}>{event.description}</p>}
                <div className="admin-list-card-actions">
                  <button className="admin-link-btn" style={{ color: '#dc2626' }} onClick={() => handleDeleteEvent(event.id)}>
                    {t.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUESTIONNAIRE CREATE */}
      {view === 'q_create' && (
        <div className="admin-card">
          <h3 style={{ marginBottom: 8 }}>{t.create_questionnaire}</h3>
          <p className="admin-hint" style={{ padding: '8px 12px', background: '#f1f5f9', borderRadius: 8 }}>
            💡 {t.bilingual_hint}
          </p>
          <input type="text" className="admin-input" value={qTitle} onChange={e => setQTitle(e.target.value)} placeholder={t.q_title_placeholder} />
          <textarea className="admin-input" value={qDescription} onChange={e => setQDescription(e.target.value)} placeholder={t.q_desc_placeholder} rows={2} style={{ resize: 'vertical' }} />

          <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t.add_question_label}</p>
            <input type="text" className="admin-input" value={questionText} onChange={e => setQuestionText(e.target.value)} placeholder={t.question_text_placeholder} />
            <select
              value={questionType}
              onChange={e => setQuestionType(e.target.value as QuestionType)}
              className="admin-input"
            >
              <option value="open_text">{t.type_open}</option>
              <option value="single_choice">{t.type_single}</option>
              <option value="multiple_choice">{t.type_multiple}</option>
            </select>
            {questionType !== 'open_text' && (
              <input
                type="text"
                className="admin-input"
                value={optionsInput}
                onChange={e => setOptionsInput(e.target.value)}
                placeholder={t.options_placeholder}
              />
            )}
            <button
              type="button"
              className="admin-nav-btn active"
              onClick={handleAddQuestion}
            >
              {t.add_question_btn}
            </button>
          </div>

          {draftQuestions.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                {t.questions_in_draft} ({draftQuestions.length})
              </p>
              {draftQuestions.map((q, index) => (
                <div key={q.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12, border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 8,
                }}>
                  <span style={{ fontSize: 14, flex: 1 }}>
                    {index + 1}. {q.text}
                    <span style={{ color: '#94a3b8' }}> — {typeLabel(q.type)}</span>
                  </span>
                  <button type="button" className="admin-link-btn" style={{ color: '#dc2626' }} onClick={() => handleRemoveQuestion(q.id)}>
                    {t.delete}
                  </button>
                </div>
              ))}
            </div>
          )}

          <button className="btn" onClick={handleCreateQuestionnaire} style={{ width: '100%' }}>
            {t.create_q_btn}
          </button>
          {qFormError && <p className="admin-error">{qFormError}</p>}
        </div>
      )}

      {/* QUESTIONNAIRES LIST */}
      {view === 'q_list' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ margin: 0 }}>{t.questionnaires_list} ({questionnaires.length})</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="admin-nav-btn" onClick={refreshQuestionnaires}>{t.refresh_btn}</button>
              <button className="admin-nav-btn active" onClick={() => exportToCSV(t.fetch_error)}>
                📄 {t.export_btn}
              </button>
            </div>
          </div>
          {questionnaires.length === 0 && <p className="admin-hint">{t.no_questionnaires}</p>}
          <div className="admin-list-grid">
            {questionnaires.map(qn => (
              <div key={qn.id} className="admin-list-card">
                <strong>{qn.title}</strong>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{qn.description}</p>
                <div className="admin-list-card-actions">
                  <button className="admin-link-btn" style={{ color: '#dc2626' }} onClick={() => handleDeleteQuestionnaire(qn.id)}>
                    {t.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
