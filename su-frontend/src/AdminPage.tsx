import { useState, useEffect } from 'react'

const API_URL = 'http://10.93.26.192:8080'

interface SuEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
}
type QuestionType = 'open_text' | 'single_choice' | 'multiple_choice'

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
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'


type Lang = 'en' | 'ru'

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
    admin_panel_desc: 'Manage events and questionnaires',
    exprt_btn: 'Export Questionnaires to CSV',
    logged_in_as: 'Logged in as:',
    create_event: 'Create Event',
    event_title_placeholder: 'Event title',
    event_location_placeholder: 'Location',
    event_description_placeholder: 'Event description',
    event_list: 'Events',
    create_questionnaire: 'Create Questionnaire',
    q_title_placeholder: 'Questionnaire title (RU | EN)',
    q_desc_placeholder: 'Questionnaire description (RU | EN)',
    bilingual_hint: 'For bilingual support use format: Русский текст | English text',
    add_question_label: 'Add question',
    question_text_placeholder: 'Question text (RU | EN)',
    type_open: 'Open answer',
    type_single: 'Single choice',
    type_multiple: 'Multiple choice',
    options_placeholder: 'Options (RU | EN) separated by commas: Да | Yes, Нет | No',
    add_question_btn: '+ Add question',
    questions_in_draft: 'Questions in draft',
    delete: 'Delete',
    create_q_btn: 'Create questionnaire',
    questionnaires_list: 'Questionnaires',
    confirm_delete: 'Delete this questionnaire?',
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
    admin_panel_desc: 'Управление событиями и анкетами',
    exprt_btn: 'Экспорт анкет в CSV',
    logged_in_as: 'Вы вошли как:',
    create_event: 'Создать событие',
    event_title_placeholder: 'Название события',
    event_location_placeholder: 'Место проведения',
    event_description_placeholder: 'Описание события',
    event_list: 'Список событий',
    create_questionnaire: 'Создать опросник',
    q_title_placeholder: 'Название опросника (РУ | EN)',
    q_desc_placeholder: 'Описание опросника (РУ | EN)',
    bilingual_hint: 'Для двуязычности используйте формат: Русский текст | English text',
    add_question_label: 'Добавить вопрос',
    question_text_placeholder: 'Текст вопроса (РУ | EN)',
    type_open: 'Развёрнутый ответ',
    type_single: 'Один вариант',
    type_multiple: 'Несколько вариантов',
    options_placeholder: 'Варианты (РУ | EN) через запятую: Да | Yes, Нет | No',
    add_question_btn: '+ Добавить вопрос',
    questions_in_draft: 'Вопросы в опроснике',
    delete: 'Удалить',
    create_q_btn: 'Создать опросник',
    questionnaires_list: 'Опросники',
    confirm_delete: 'Удалить опросник?',
    form_error_fields: 'Пожалуйста, заполните все обязательные поля',
    form_error_questions: 'Добавьте хотя бы один вопрос',
    form_error_q_fields: 'Заполните название и описание опросника',
    fetch_error: 'Не удалось загрузить данные с сервера',
  }
}


const exportToCSV = async (fetchErrorMsg: string) => {
  try {
    const [questionnaires, answers, responses] = await Promise.all([
      fetch(`${API_URL}/questionnaires`).then(r => r.json()),
      fetch(`${API_URL}/answers`).then(r => r.json()),
      fetch(`${API_URL}/responses`).then(r => r.json()),
    ])

    const questionsMap: Record<number, {id: number, text: string}[]> = {}
    const optionsMap: Record<number, {id: number, text: string}[]> = {}

    await Promise.all(
      questionnaires.map(async (q: {id: number}) => {
        const qs = await fetch(`${API_URL}/question/by-questionnaire/${q.id}`).then(r => r.json())
        questionsMap[q.id] = qs
        await Promise.all(
          qs.map(async (question: {id: number, questionType: string}) => {
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
      const questionnaireResponses = responses.filter((r: {questionnaireId: number}) => r.questionnaireId === questionnaire.id)
      const questionnaireQuestions = (questionsMap[questionnaire.id] || []) as {id: number, text: string}[]
      if (questionnaireResponses.length === 0) continue

      // Заголовок секции: название опросника
      rows.push('')
      rows.push(`"${questionnaire.title}"`)

      // Шапка колонок: Ответ # | вопрос1 | вопрос2 | ...
      const header = ['Ответ #', ...questionnaireQuestions.map((q: {text: string}) => `"${q.text}"`)].join(';')
      rows.push(header)

      // Одна строка = один пользователь
      questionnaireResponses.forEach((response: {id: number}, idx: number) => {
        const responseAnswers = answers.filter((a: {responseId: number}) => a.responseId === response.id)
        const rowCells = [`${idx + 1}`, ...questionnaireQuestions.map((q: {id: number}) => {
          const ans = responseAnswers.find((a: {questionId: number}) => a.questionId === q.id)
          if (!ans) return '""'
          if (ans.optionId) {
            const opts = optionsMap[q.id] || []
            const option = opts.find((o: {id: number, text: string}) => o.id === ans.optionId)
            return `"${option ? option.text : ans.optionId}"`
          }
          // multiple choice: может быть несколько ответов на один вопрос
          const allAnswersForQ = responseAnswers.filter((a: {questionId: number, optionId: number | null}) => a.questionId === q.id && a.optionId)
          if (allAnswersForQ.length > 1) {
            const opts = optionsMap[q.id] || []
            const texts = allAnswersForQ.map((a: {optionId: number}) => {
              const o = opts.find((opt: {id: number, text: string}) => opt.id === a.optionId)
              return o ? o.text : a.optionId
            })
            return `"${texts.join(', ')}"`
          }
          return `"${ans.textAnswer || ''}"`
        })]
        rows.push(rowCells.join(';'))
      })
    }

    const csv = rows.join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
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


function AdminPage({ lang, onEventsChange }: { lang: Lang; onEventsChange?: (events: SuEvent[]) => void }) {
  const t = adminTranslations[lang]
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('admin_logged_in') === 'true')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [events, setEvents] = useState<SuEvent[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [formError, setFormError] = useState('')
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const [qTitle, setQTitle] = useState('')
  const [qDescription, setQDescription] = useState('')
  const [draftQuestions, setDraftQuestions] = useState<Question[]>([])
  const [questionText, setQuestionText] = useState('')
  const [questionType, setQuestionType] = useState<QuestionType>('open_text')
  const [optionsInput, setOptionsInput] = useState('')
  const [qFormError, setQFormError] = useState('')

  const refreshEvents = () => {
    fetch(`${API_URL}/events`)
      .then(r => r.json())
      .then((data: {id: number, title: string, description: string, eventTime: string, eventLocation: string}[]) => {
        const mapped = data.map(e => ({
          id: e.id.toString(),
          title: e.title,
          date: e.eventTime ? e.eventTime.split('T')[0] : '',
          location: e.eventLocation || '',
          description: e.description || '',
        }))
        setEvents(mapped)
        onEventsChange?.(mapped as SuEvent[])
      })
      .catch(() => {})
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${API_URL}/questionnaires`)
        .then(r => r.json())
        .then(data => setQuestionnaires(data.map((q: {id: number, title: string, description: string}) => ({
          id: q.id.toString(),
          title: q.title,
          description: q.description,
          questions: []
        }))))
        .catch(() => {})
      refreshEvents()
    }
  }, [isLoggedIn])

  const handleDeleteQuestionnaire = async (id: string) => {
    if (!confirm(t.confirm_delete)) return
    try {
      await fetch(`${API_URL}/questionnaire/${id}`, { method: 'DELETE' })
      setQuestionnaires(prev => prev.filter(q => q.id !== id))
    } catch {
      setQuestionnaires(prev => prev.filter(q => q.id !== id))
    }
  }

  const handleAddQuestion = () => {
  if (!questionText) return

  const question: Question = {
    id: Date.now().toString(),
    text: questionText,
    type: questionType,
    options: questionType === 'open_text'
      ? []
      : optionsInput.split(',').map((opt) => opt.trim()).filter((opt) => opt !== '')
  }

  setDraftQuestions((prev) => [...prev, question])

  setQuestionText('')
  setQuestionType('open_text')
  setOptionsInput('')
}
const handleRemoveQuestion = (id: string) => {
  setDraftQuestions((prev) => prev.filter((q) => q.id !== id))
}
const handleCreateQuestionnaire = async () => {
  if (!qTitle || !qDescription) {
    setQFormError(t.form_error_q_fields)
    return
  }
  if (draftQuestions.length === 0) {
    setQFormError(t.form_error_questions)
    return
  }

  setQFormError('')

  try {
    // Создаём опросник на бэкенде
    const res = await fetch(`${API_URL}/questionnaire`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: qTitle,
        description: qDescription,
        startedAt: new Date().toISOString(),
        finishedAt: null
      })
    })

    if (!res.ok) throw new Error('Failed to create questionnaire')
    const created = await res.json()

    // Создаём вопросы на бэкенде
    const typeMap: Record<string, string> = {
      text: 'open_text',
      single: 'single_choice',
      multiple: 'multiple_choice'
    }

    const createdQuestions = await Promise.all(
      draftQuestions.map((q, index) =>
        fetch(`${API_URL}/questions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionnaireId: created.id,
            text: q.text,
            questionType: typeMap[q.type] || q.type,
            orderIndex: index + 1
          })
        }).then(r => r.json())
      )
    )

    // Создаём варианты ответа
    await Promise.all(
      createdQuestions.flatMap((createdQ, index) => {
        const q = draftQuestions[index]
        if (q.options.length === 0) return []
        return q.options.map((optText, optIndex) =>
          fetch(`${API_URL}/options`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questionId: createdQ.id,
              text: optText,
              orderIndex: optIndex + 1
            })
          })
        )
      })
    )

    // Сохраняем локально
    const questionnaire: Questionnaire = {
      id: created.id.toString(),
      title: qTitle,
      description: qDescription,
      questions: draftQuestions
    }
    setQuestionnaires(prev => [questionnaire, ...prev])
    setQTitle('')
    setQDescription('')
    setDraftQuestions([])
    setQFormError('')

  } catch {
    const questionnaire: Questionnaire = {
      id: Date.now().toString(),
      title: qTitle,
      description: qDescription,
      questions: draftQuestions
    }
    setQuestionnaires(prev => [questionnaire, ...prev])
    setQTitle('')
    setQDescription('')
    setDraftQuestions([])
  }
}


  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      localStorage.setItem('admin_logged_in', 'true')
      setError('')
    } else {
      setError(t.error)
    }
  }

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoggedIn) handleLogin()
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [username, password, isLoggedIn])

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

  const handleAddEvent = async () => {
    if (!newTitle || !newDate || !newLocation || !newDescription) {
      setFormError(t.form_error_fields)
      return
    }
    setFormError('')
    try {
      await fetch(`${API_URL}/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          eventTime: new Date(newDate).toISOString().replace('Z', ''),
          eventLocation: newLocation,
        })
      })
      refreshEvents()
    } catch {
      refreshEvents()
    }
    setNewTitle('')
    setNewDate('')
    setNewLocation('')
    setNewDescription('')
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Удалить событие?')) return
    try {
      await fetch(`${API_URL}/event/${id}`, { method: 'DELETE' })
    } catch { /* ignore */ }
    refreshEvents()
  }

  return (
    
    <div className="container">
      <div style={{
        background: 'rgba(64,186,33,0.08)',
        color: '#0f172a',
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
<h2 style={{ color: '#0f172a', margin: 0 }}>{t.title}</h2>
        <p style={{ color: '#475569', fontSize: 13, margin: '4px 0 0' }}>
          {t.subtitle}
        </p>
          <p style={{ color: '#475569', fontSize: 12, margin: '4px 0 0' }}>
            {t.logged_in_as} <strong style={{ color: '#40ba21' }}>{username}</strong>
          </p>
        </div>
        <button
          onClick={() => {
            setIsLoggedIn(false)
            localStorage.removeItem('admin_logged_in')
            setUsername('')
            setPassword('')
          }}
          style={{
            padding: '10px 20px',
            borderRadius: 12,
            border: '1px solid rgba(64,186,33,0.3)',
            background: 'white',
            color: '#40ba21',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer'
          }}
        >
          {t.logout_btn}
        </button>
      </div>

      <div className="donation-card">
        <h3 style={{ marginBottom: 16 }}>{t.create_event}</h3>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder={t.event_title_placeholder}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
        />
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder={t.event_location_placeholder}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder={t.event_description_placeholder}
          rows={3}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
        />

        <button className="btn" onClick={handleAddEvent} style={{ width: '100%' }}>
          {t.create_event}
        </button>

        {formError && (
          <p style={{ color: '#dc2626', fontSize: 13, marginTop: 12, fontWeight: 600 }}>{formError}</p>
        )}

        {events.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ marginBottom: 16 }}>{t.event_list} ({events.length})</h3>
            {events.map((event) => (
              <div key={event.id} style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{event.title}</strong>
                  <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0' }}>
                    {event.date} {event.location && `· ${event.location}`}
                  </p>
                  {event.description && <p style={{ fontSize: 14 }}>{event.description}</p>}
                </div>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  style={{ border: 'none', background: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 13, fontWeight: 600, flexShrink: 0 }}
                >
                  {t.delete}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="donation-card" style={{ marginTop: 32 }}>
        <h3 style={{ marginBottom: 8 }}>{t.create_questionnaire}</h3>
        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 16, padding: '8px 12px', background: '#f1f5f9', borderRadius: 8 }}>
          💡 {t.bilingual_hint}
        </p>

        <input
          type="text"
          value={qTitle}
          onChange={(e) => setQTitle(e.target.value)}
          placeholder={t.q_title_placeholder}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
        />

        <textarea
          value={qDescription}
          onChange={(e) => setQDescription(e.target.value)}
          placeholder={t.q_desc_placeholder}
          rows={2}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 20, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
        />

        <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t.add_question_label}</p>

          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder={t.question_text_placeholder}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
          />

          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
          >
            <option value="open_text">{t.type_open}</option>
            <option value="single_choice">{t.type_single}</option>
            <option value="multiple_choice">{t.type_multiple}</option>
          </select>

          {questionType !== 'open_text' && (
            <input
              type="text"
              value={optionsInput}
              onChange={(e) => setOptionsInput(e.target.value)}
              placeholder={t.options_placeholder}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
            />
          )}

          <button
            onClick={handleAddQuestion}
            style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(64,186,33,0.3)', background: 'white', color: '#40ba21', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
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
              <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 14 }}>{index + 1}. {q.text}</span>
                <button
                  onClick={() => handleRemoveQuestion(q.id)}
                  style={{ border: 'none', background: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 13 }}
                >
                  {t.delete}
                </button>
              </div>
            ))}
          </div>
        )}

        <button className="btn" onClick={handleCreateQuestionnaire} style={{ width: '100%' }}>
          {t.create_q_btn}
        </button>

        {qFormError && (
          <p style={{ color: '#dc2626', fontSize: 13, marginTop: 12, fontWeight: 600 }}>
            {qFormError}
          </p>
        )}

        {questionnaires.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ marginBottom: 16 }}>{t.questionnaires_list} ({questionnaires.length})</h3>
            {questionnaires.map((qn) => (
              <div key={qn.id} style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{qn.title}</strong>
                  <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0' }}>{qn.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteQuestionnaire(qn.id)}
                  style={{ border: 'none', background: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
                >
                  {t.delete}
                </button>
              </div>
            ))}
          </div>
        )}

        <p>{t.admin_panel_desc}</p>
        <br />
        <button className="btn" onClick={() => exportToCSV(t.fetch_error)}>
          📄 {t.exprt_btn}
        </button>
      </div>
    </div>
  )
}

export default AdminPage