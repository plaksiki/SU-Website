import { useState, useEffect } from 'react'

const API_URL = 'http://10.93.26.192:8080'

interface Event {
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


const exportToCSV = async () => {
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
    rows.push(['Questionnaire', 'Question', 'Answer'].join(';'))

    for (const questionnaire of questionnaires) {
      const questionnaireResponses = responses.filter((r: {questionnaireId: number}) => r.questionnaireId === questionnaire.id)
      const questionnaireQuestions = questionsMap[questionnaire.id] || []

      for (const response of questionnaireResponses) {
        const responseAnswers = answers.filter((a: {responseId: number}) => a.responseId === response.id)
        for (const answer of responseAnswers) {
          const question = questionnaireQuestions.find((q: {id: number}) => q.id === answer.questionId)
          let answerText = answer.text_answer || ''
          if (answer.optionId) {
            const opts = optionsMap[answer.questionId] || []
            const option = opts.find((o: {id: number, text: string}) => o.id === answer.optionId)
            answerText = option ? option.text : String(answer.optionId)
          }
          rows.push([
            `"${questionnaire.title}"`,
            `"${question?.text || ''}"`,
            `"${answerText}"`
          ].join(';'))
        }
      }
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
    alert('\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430')
  }
}


function AdminPage({ lang }: { lang: Lang }) {
  const t = adminTranslations[lang]
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('admin_logged_in') === 'true')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [events, setEvents] = useState<Event[]>([])
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
    }
  }, [isLoggedIn])

  const handleDeleteQuestionnaire = async (id: string) => {
    if (!confirm('Удалить опросник?')) return
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
    setQFormError('Заполните название и описание опросника')
    return
  }
  if (draftQuestions.length === 0) {
    setQFormError('Добавьте хотя бы один вопрос')
    return
  }

  setQFormError('')

  try {
    // 1. Создаём опросник на бэкенде
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

    // 2. Создаём вопросы на бэкенде
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

    // 3. Создаём варианты ответа
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

    // 4. Сохраняем локально
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

  const handleAddEvent = () => {
    if (!newTitle || !newDate || !newLocation || !newDescription) {
      setFormError('Пожалуйста, заполните все обязательные поля')
      return
    }
    setFormError('')

    const event: Event =  {
      id: Date.now().toString(),
      title: newTitle,
      date: newDate,
      location: newLocation,
      description: newDescription
    }
    setEvents((prevEvents) => [event,...prevEvents])
    setNewTitle('')
    setNewDate('')
    setNewLocation('')
    setNewDescription('')
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
          <p style = {{color: '#475569', fontSize: 12, margin: '4px 0 0' }}>
            Вы вошли как: <strong style={{color: '#40ba21'}}>{username}</strong>
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
<h3 style={{ marginBottom: 16 }}>Создать событие</h3>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Название события"
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
          placeholder="Место проведения"
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Описание события"
          rows={3}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
        />

        <button className="btn" onClick={handleAddEvent} style={{ width: '100%' }}>
          Создать событие
        </button>

        {formError && (
          <p style={{ color: '#dc2626', fontSize: 13, marginTop: 12, fontWeight: 600 }}>{formError}</p>
        )}

        {events.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ marginBottom: 16 }}>Список событий ({events.length})</h3>
            {events.map((event) => (
              <div key={event.id} style={{ padding: 16, border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 12 }}>
                <strong>{event.title}</strong>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0' }}>
                  {event.date} {event.location && `${event.location}`}
                </p>
                {event.description && <p style={{ fontSize: 14 }}>{event.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="donation-card" style={{ marginTop: 32 }}>
        <h3 style={{ marginBottom: 16 }}>Создать опросник</h3>

        <input
          type="text"
          value={qTitle}
          onChange={(e) => setQTitle(e.target.value)}
          placeholder="Название опросника"
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
        />

        <textarea
          value={qDescription}
          onChange={(e) => setQDescription(e.target.value)}
          placeholder="Описание опросника"
          rows={2}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 20, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
        />

        <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Добавить вопрос</p>

          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Текст вопроса"
            style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
          />

          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
          >
            <option value="open_text">Развёрнутый ответ</option>
            <option value="single_choice">Один вариант</option>
            <option value="multiple_choice">Несколько вариантов</option>
          </select>

          {questionType !== 'open_text' && (
            <input
              type="text"
              value={optionsInput}
              onChange={(e) => setOptionsInput(e.target.value)}
              placeholder="Варианты ответа через запятую: Да, Нет, Не знаю"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
            />
          )}

          <button
            onClick={handleAddQuestion}
            style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(64,186,33,0.3)', background: 'white', color: '#40ba21', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
          >
            + Добавить вопрос
          </button>
        </div>

        {draftQuestions.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              Вопросы в опроснике ({draftQuestions.length})
            </p>
            {draftQuestions.map((q, index) => (
              <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 14 }}>{index + 1}. {q.text}</span>
                <button
                  onClick={() => handleRemoveQuestion(q.id)}
                  style={{ border: 'none', background: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 13 }}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}

        <button className="btn" onClick={handleCreateQuestionnaire} style={{ width: '100%' }}>
          Создать опросник
        </button>

        {qFormError && (
          <p style={{ color: '#dc2626', fontSize: 13, marginTop: 12, fontWeight: 600 }}>
            {qFormError}
          </p>
        )}

        {questionnaires.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ marginBottom: 16 }}>Опросники ({questionnaires.length})</h3>
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
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}

        <p>{t.admin_panel_desc}</p>
        <br />
        <button className="btn" onClick={exportToCSV}>
          📄 {t.exprt_btn}
        </button>
      </div>
    </div>
  )
}

export default AdminPage