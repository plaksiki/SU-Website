import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

const translations = {
  en: {
    home: "Home",
    events: "Events",
    support: "Support Us",
    hero_title: "Empowering the",
    hero_subtitle: "Student Community",
    hero_desc: "Your gateway to student governance, campus events, and department initiatives.",
    view_events: "View Events →",
    org_title: "Student Union Organization",
    org_desc: "SU is structured to support our university community.",
    events_title: "Events",
    events_desc: "Stay updated with all SU events",
    all: "All",
    upcoming: "Upcoming",
    passed: "Passed",
    show_members: "▼ Show members",
    hide: "▲ Hide",
    members: "Members:",
    donate_title: "Support Us",
    donate_desc: "Help us make student life better at Innopolis University",
    qr_title: "Scan QR to Donate",
    qr_desc: "Every contribution helps us organize better events.",
    qr_note: "Scan the QR code with your phone camera or banking app",
    dept_core_desc: "Managing strategic objectives and administration.",
    dept_it_desc: "Engineering digital solutions for students.",
    dept_media_desc: "Designing merchandise and running social networks.",
    dept_sport_desc: "Organizing sports events and activities.",
    polls: "Polls",
    polls_title: "Questionnaires",
    polls_desc: "Share your opinion — all responses are anonymous",
    submit: "Submit",
    submitted: "Thank you! Response submitted.",
    required: "This field is required",
  },
  ru: {
    home: "Главная",
    events: "Мероприятия",
    support: "Поддержать нас",
    hero_title: "Объединяем",
    hero_subtitle: "Студенческое сообщество",
    hero_desc: "Ваш портал для студенческого управления, мероприятий и инициатив.",
    view_events: "Смотреть мероприятия →",
    org_title: "Организация Студенческого Союза",
    org_desc: "СС поддерживает университетское сообщество.",
    events_title: "Мероприятия",
    events_desc: "Следите за всеми событиями СС",
    
    all: "Все",
    upcoming: "Предстоящие",
    passed: "Прошедшие",
    show_members: "▼ Показать участников",
    hide: "▲ Скрыть",
    members: "Участники:",
    donate_title: "Поддержать нас",
    donate_desc: "Помогите нам сделать студенческую жизнь лучше",
    qr_title: "Отсканируйте QR для доната",
    qr_desc: "Каждый вклад помогает организовать лучшие мероприятия.",
    qr_note: "Отсканируйте QR код камерой телефона или банковским приложением",
    dept_core_desc: "Управление стратегическими целями и администрацией.",
    dept_it_desc: "Разработка цифровых решений для студентов.",
    dept_media_desc: "Дизайн мерча и ведение социальных сетей.",
    dept_sport_desc: "Организация спортивных мероприятий и активностей.",
    polls: "Опросники",
    polls_title: "Опросники",
    polls_desc: "Поделитесь мнением — все ответы анонимны",
    submit: "Отправить",
    submitted: "Спасибо! Ответ отправлен.",
    required: "Это поле обязательно",
  }
}

const events = [
  { name: "Minecraft Event", date: "2026-10-01" },
  { name: "CS:GO Event", date: "2026-11-01" },
  { name: "Hackathon", date: "2025-12-01" },
]

const getDepartments = (t: T) => [
  { id: 1, name: "SU Core", description: t.dept_core_desc, members: ["Alice Johnson", "Bob Smith", "Carol White"] },
  { id: 2, name: "SU IT", description: t.dept_it_desc, members: ["David Lee", "Emma Davis", "Frank Miller"] },
  { id: 3, name: "SU Media", description: t.dept_media_desc, members: ["Grace Wilson", "Henry Brown", "Ivy Taylor"] },
  { id: 4, name: "SU Sport", description: t.dept_sport_desc, members: ["Jack Anderson", "Kate Thomas", "Liam Jackson"] },
]

const today = new Date()
const eventsWithStatus = events.map(event => ({
  ...event,
  isActive: new Date(event.date) >= today
}))
type QuestionType = 'single' | 'multiple' | 'text'

interface Question {
  id: string
  textEn: string
  textRu: string
  type: QuestionType
  optionsEn?: string[]
  optionsRu?: string[]
  required: boolean
}

interface Questionnaire {
  id: string
  titleEn: string
  titleRu: string
  descriptionEn: string
  descriptionRu: string
  questions: Question[]
}

const QUESTIONNAIRES: Questionnaire[] = [
  {
    id: 'q1',
    titleEn: 'Academic Experience Survey',
    titleRu: 'Опрос об учёбе',
    descriptionEn: 'Help us understand how studies are going this semester.',
    descriptionRu: 'Помогите нам понять, как проходит учёба в этом семестре.',
    questions: [
      {
        id: 'q1_1',
        textEn: 'How would you rate the overall quality of teaching?',
        textRu: 'Как вы оцениваете качество преподавания в целом?',
        type: 'single',
        optionsEn: ['Excellent', 'Good', 'Average', 'Poor'],
        optionsRu: ['Отлично', 'Хорошо', 'Удовлетворительно', 'Плохо'],
        required: true,
      },
      {
        id: 'q1_2',
        textEn: 'Which subjects feel most challenging? (select all that apply)',
        textRu: 'Какие предметы даются сложнее всего? (выберите все подходящие)',
        type: 'multiple',
        optionsEn: ['Calculus', 'Linear Algebra', 'Algorithms & Data Structures', 'Physics', 'English'],
        optionsRu: ['Математический анализ', 'Линейная алгебра', 'Алгоритмы и структуры данных', 'Физика', 'Английский'],
        required: false,
      },
      {
        id: 'q1_3',
        textEn: 'Any suggestions for the Student Union?',
        textRu: 'Есть ли пожелания студенческому совету?',
        type: 'text',
        required: false,
      },
    ],
  },
  {
    id: 'q2',
    titleEn: 'SU IT Internship Application',
    titleRu: 'Заявка на стажировку в SU IT',
    descriptionEn: 'Apply to join the IT department of the Student Union.',
    descriptionRu: 'Подайте заявку в IT-отдел студенческого совета.',
    questions: [
      {
        id: 'q2_1',
        textEn: 'What is your experience level with frontend development?',
        textRu: 'Каков ваш уровень опыта во фронтенд-разработке?',
        type: 'single',
        optionsEn: ['Beginner (just learning)', 'Intermediate (built React apps before)', 'Advanced (production experience)'],
        optionsRu: ['Начинающий (только учусь)', 'Средний (делал React-проекты)', 'Продвинутый (боевой опыт)'],
        required: true,
      },
      {
        id: 'q2_2',
        textEn: 'Which technologies do you know?',
        textRu: 'Какие технологии вы знаете?',
        type: 'multiple',
        optionsEn: ['TypeScript / React', 'Tailwind CSS', 'Node.js Express', 'PostgreSQL', 'Docker'],
        optionsRu: ['TypeScript / React', 'Tailwind CSS', 'Node.js Express', 'PostgreSQL', 'Docker'],
        required: false,
      },
      {
        id: 'q2_3',
        textEn: 'Link to your GitHub or portfolio',
        textRu: 'Ссылка на ваш GitHub или портфолио',
        type: 'text',
        required: true,
      },
    ],
  },
]

function PollsPage({ t, lang }: { t: T; lang: Lang }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const selected = QUESTIONNAIRES.find(q => q.id === selectedId)

  const handleSingle = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    setErrors(prev => ({ ...prev, [questionId]: false }))
  }

  const handleMultiple = (questionId: string, option: string) => {
    setAnswers(prev => {
      const current = (prev[questionId] as string[]) || []
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option]
      return { ...prev, [questionId]: updated }
    })
  }

  const handleText = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    setErrors(prev => ({ ...prev, [questionId]: false }))
  }

  const handleSubmit = () => {
    if (!selected) return
    const newErrors: Record<string, boolean> = {}
    for (const q of selected.questions) {
      if (!q.required) continue
      const val = answers[q.id]
      if (!val || (Array.isArray(val) && val.length === 0) || val === '') {
        newErrors[q.id] = true
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    console.log('Response:', { questionnaireId: selectedId, answers })
    setSubmitted(true)
  }

  const handleBack = () => {
    setSelectedId(null)
    setAnswers({})
    setSubmitted(false)
    setErrors({})
  }

  if (!selectedId) {
    return (
      <div className="container">
        <div className="section-title">
          <h2>{t.polls_title}</h2>
          <p>{t.polls_desc}</p>
        </div>
        <div className="events-list">
          {QUESTIONNAIRES.map(q => (
            <div key={q.id} className="event-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedId(q.id)}>
              <span className="badge badge-upcoming">
                {q.questions.length} {lang === 'en' ? 'questions' : 'вопросов'}
              </span>
              <h2>{lang === 'en' ? q.titleEn : q.titleRu}</h2>
              <p>{lang === 'en' ? q.descriptionEn : q.descriptionRu}</p>
              <br />
              <button className="btn" style={{ fontSize: 14 }}>
                {lang === 'en' ? 'Open →' : 'Открыть →'}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="container">
        <div className="donation-card" style={{ marginTop: 40 }}>
          <h3 style={{ color: '#40ba21' }}>✓ {t.submitted}</h3>
          <br />
          <button className="btn" onClick={handleBack}>
            {lang === 'en' ? '← Back to polls' : '← К опросникам'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <button
        onClick={handleBack}
        style={{ background: 'none', border: 'none', color: '#40ba21', fontWeight: 'bold', cursor: 'pointer', marginBottom: 16 }}
      >
        ← {lang === 'en' ? 'Back' : 'Назад'}
      </button>
      <div className="hero" style={{ padding: 40 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>
          {lang === 'en' ? selected.titleEn : selected.titleRu}
        </h1>
        <p style={{ marginBottom: 32 }}>
          {lang === 'en' ? selected.descriptionEn : selected.descriptionRu}
        </p>

        {selected.questions.map((q, idx) => {
          const options = lang === 'en' ? q.optionsEn : q.optionsRu
          const hasError = errors[q.id]
          return (
            <div key={q.id} style={{ marginBottom: 28 }}>
              <p style={{ fontWeight: 600, marginBottom: 10, color: hasError ? '#dc2626' : '#1e293b' }}>
                {idx + 1}. {lang === 'en' ? q.textEn : q.textRu}
                {q.required && <span style={{ color: '#dc2626' }}> *</span>}
              </p>

              {/* Single choice */}
              {q.type === 'single' && options?.map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleSingle(q.id, opt)}
                    style={{ accentColor: '#40ba21' }}
                  />
                  {opt}
                </label>
              ))}

              {/* Multiple choice */}
              {q.type === 'multiple' && options?.map(opt => {
                const selected_opts = (answers[q.id] as string[]) || []
                return (
                  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      value={opt}
                      checked={selected_opts.includes(opt)}
                      onChange={() => handleMultiple(q.id, opt)}
                      style={{ accentColor: '#40ba21' }}
                    />
                    {opt}
                  </label>
                )
              })}

              {/* Open text */}
              {q.type === 'text' && (
                <textarea
                  rows={3}
                  value={(answers[q.id] as string) || ''}
                  onChange={e => handleText(q.id, e.target.value)}
                  placeholder={lang === 'en' ? 'Your answer...' : 'Ваш ответ...'}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: `1px solid ${hasError ? '#dc2626' : '#e2e8f0'}`,
                    fontFamily: 'Arial, sans-serif',
                    fontSize: 14,
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
              )}

              {hasError && (
                <p style={{ color: '#dc2626', fontSize: 13, marginTop: 4 }}>{t.required}</p>
              )}
            </div>
          )
        })}

        <button className="btn" onClick={handleSubmit}>{t.submit}</button>
      </div>
    </div>
  )
}
type Lang = 'en' | 'ru'
type T = typeof translations.en

function DepartmentCard(props: { name: string; description: string; members: string[]; t: T }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="dept-card" onClick={() => setIsOpen(!isOpen)}>
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      {isOpen && (
        <div className="dept-members">
          <h4>{props.t.members}</h4>
          {props.members.map((member, index) => (
            <p key={index}>👤 {member}</p>
          ))}
        </div>
      )}
      <span className="dept-toggle">{isOpen ? props.t.hide : props.t.show_members}</span>
    </div>
  )
}

function Navbar({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: T }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="logo-box">IU</span>
        <span className="logo-text">Student Union Portal</span>
      </div>
      <div className="nav-links">
        <Link to="/">{t.home}</Link>
        <Link to="/events">{t.events}</Link>
        <Link to="/polls">{t.polls}</Link>
        <Link to="/donations">{t.support}</Link>
        <button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}>
          {lang === 'en' ? 'RU' : 'EN'}
        </button>
      </div>
    </nav>
  )
}

function HomePage({ t }: { t: T }) {
  return (
    <div className="container">
      <div className="hero">
        <h1>{t.hero_title} <span className="green">{t.hero_subtitle}</span></h1>
        <p>{t.hero_desc}</p>
        <Link to="/events" className="btn">{t.view_events}</Link>
      </div>
      <div className="section-title">
        <h2>{t.org_title}</h2>
        <p>{t.org_desc}</p>
      </div>
      <div className="departments">
        {getDepartments(t).map(dept => (
          <DepartmentCard key={dept.id} name={dept.name} description={dept.description} members={dept.members} t={t} />
        ))}
      </div>
    </div>
  )
}

function EventsPage({ t }: { t: T }) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'passed'>('all')
  const visibleEvents = eventsWithStatus.filter(event => {
    if (filter === 'upcoming') return event.isActive
    if (filter === 'passed') return !event.isActive
    return true
  })
  return (
    <div className="container">
      <div className="section-title">
        <h2>{t.events_title}</h2>
        <p>{t.events_desc}</p>
      </div>
      <div className="filter-buttons">
        <button className={`btn-outline ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>{t.all}</button>
        <button className={`btn-outline ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>{t.upcoming}</button>
        <button className={`btn-outline ${filter === 'passed' ? 'active' : ''}`} onClick={() => setFilter('passed')}>{t.passed}</button>
      </div>
      <div className="events-list">
        {visibleEvents.map((event, index) => (
          <div key={index} className="event-card">
            <span className={`badge ${event.isActive ? 'badge-upcoming' : 'badge-passed'}`}>
              {event.isActive ? t.upcoming : t.passed}
            </span>
            <h2>{event.name}</h2>
            <p>📅 {event.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonationsPage({ t }: { t: T }) {
  return (
    <div className="container">
      <div className="section-title">
        <h2>{t.donate_title}</h2>
        <p>{t.donate_desc}</p>
      </div>
      <div className="donation-card">
        <h3>{t.qr_title}</h3>
        <p>{t.qr_desc}</p>
        <div className="qr-placeholder">
          <p>QR Code</p>
        </div>
        <p className="donation-note">{t.qr_note}</p>
      </div>
    </div>
  )
}

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const t = translations[lang]

  return (
    <BrowserRouter>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Routes>
        <Route path="/" element={<HomePage t={t} />} />
        <Route path="/events" element={<EventsPage t={t} />} />
        <Route path="/polls" element={<PollsPage t={t} lang={lang} />} />
        <Route path="/donations" element={<DonationsPage t={t} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App