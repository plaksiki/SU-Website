import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://10.93.26.192:8080'

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
    close: "Close",
    location: "Location",
    details: "Details →",
    history: "History",
    history_title: "Our History",
    history_desc: "The story of Innopolis University Student Union",

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
    close: "Закрыть",
    location: "Место",
    details: "Подробнее →",
    history: "История",
    history_title: "Наша история",
    history_desc: "История Студенческого Союза Университета Иннополис",

  }
}

interface Event {
  name: string
  date: string
  image: string
  color: string
  location: string
  description: string
  isActive?: boolean
}

const events: Event[] = [
  {
    name: "Minecraft Event",
    date: "2026-10-01",
    image: "",
    color: "#16a34a",
    location: "IU Gaming Room",
    description: "Join us for a fun Minecraft building competition! All skill levels welcome. Prizes for the best builds."
  },
  {
    name: "CS:GO Event",
    date: "2026-11-01",
    image: "",
    color: "#0891b2",
    location: "IU Esports Arena",
    description: "Competitive CS:GO tournament. Form your team and compete for the championship title and exclusive IU merchandise."
  },
  {
    name: "Hackathon",
    date: "2025-12-01",
    image: "",
    color: "#7c3aed",
    location: "IU Co-working Area",
    description: "48-hour hackathon. Build innovative solutions for university life. Mentors available throughout the event."
  },
]

const getDepartments = (t: T) => [
  { id: 1, name: "SU Core", tag: "SU.CORE", icon: "🛡️", description: t.dept_core_desc, members: ["Alice Johnson", "Bob Smith", "Carol White"] },
  { id: 2, name: "SU IT", tag: "SU.IT", icon: "⚙️", description: t.dept_it_desc, members: ["David Lee", "Emma Davis", "Frank Miller"] },
  { id: 3, name: "SU Media", tag: "SU.MEDIA", icon: "📸", description: t.dept_media_desc, members: ["Grace Wilson", "Henry Brown", "Ivy Taylor"] },
  { id: 4, name: "SU Sport", tag: "SU.SPORT", icon: "⚽", description: t.dept_sport_desc, members: ["Jack Anderson", "Kate Thomas", "Liam Jackson"] },
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
        textEn: 'Which subjects feel most challenging?',
        textRu: 'Какие предметы даются сложнее всего?',
        type: 'multiple',
        optionsEn: ['Calculus', 'Linear Algebra', 'Algorithms', 'Physics', 'English'],
        optionsRu: ['Матанализ', 'Линейная алгебра', 'Алгоритмы', 'Физика', 'Английский'],
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
        textEn: 'Your frontend experience level?',
        textRu: 'Ваш уровень опыта во фронтенде?',
        type: 'single',
        optionsEn: ['Beginner', 'Intermediate', 'Advanced'],
        optionsRu: ['Начинающий', 'Средний', 'Продвинутый'],
        required: true,
      },
      {
        id: 'q2_2',
        textEn: 'Which technologies do you know?',
        textRu: 'Какие технологии вы знаете?',
        type: 'multiple',
        optionsEn: ['TypeScript / React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker'],
        optionsRu: ['TypeScript / React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker'],
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

interface BackendQuestionnaire {
  id: number
  title: string
  description: string
  startedAt: string
  finishedAt: string
}

// Модальное окно для ивента
function EventModal({ event, t, onClose }: { event: Event; t: T; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-image-placeholder" style={{ background: `linear-gradient(135deg, ${event.color}, ${event.color}99)` }}>
          <h2 style={{ color: 'white', fontSize: 28, fontWeight: 900 }}>{event.name}</h2>
        </div>
        <div className="modal-body">
          <span className={`badge ${event.isActive ? 'badge-upcoming' : 'badge-passed'}`}>
            {event.isActive ? t.upcoming : t.passed}
          </span>
          <p className="modal-meta" style={{ marginTop: 12 }}>📅 {event.date} &nbsp; 📍 {event.location}</p>
          <p className="modal-desc">{event.description}</p>
        </div>
      </div>
    </div>
  )
}

function PollsPage({ t, lang }: { t: T; lang: Lang }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [backendPolls, setBackendPolls] = useState<BackendQuestionnaire[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/questionnaire/1`)
      .then(res => { if (!res.ok) throw new Error('Failed'); return res.json() })
      .then(data => { setBackendPolls([data]); setLoading(false) })
      .catch(() => { setFetchError(true); setLoading(false) })
  }, [])

  const selected = QUESTIONNAIRES.find(q => q.id === selectedId)

  const handleSingle = (qid: string, val: string) => {
    setAnswers(p => ({ ...p, [qid]: val }))
    setErrors(p => ({ ...p, [qid]: false }))
  }
  const handleMultiple = (qid: string, opt: string) => {
    setAnswers(p => {
      const cur = (p[qid] as string[]) || []
      return { ...p, [qid]: cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt] }
    })
  }
  const handleText = (qid: string, val: string) => {
    setAnswers(p => ({ ...p, [qid]: val }))
    setErrors(p => ({ ...p, [qid]: false }))
  }
  const handleSubmit = () => {
    if (!selected) return
    const errs: Record<string, boolean> = {}
    for (const q of selected.questions) {
      if (!q.required) continue
      const v = answers[q.id]
      if (!v || (Array.isArray(v) && !v.length) || v === '') errs[q.id] = true
    }
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }
  const handleBack = () => { setSelectedId(null); setAnswers({}); setSubmitted(false); setErrors({}) }

  if (!selectedId) return (
    <div className="container">
      <div className="section-title">
        <h2>{t.polls_title}</h2>
        <p>{t.polls_desc}</p>
      </div>
      {loading && <p style={{ textAlign: 'center', color: '#64748b' }}>Loading...</p>}
      {fetchError && <p style={{ textAlign: 'center', color: '#dc2626' }}>Could not connect to server.</p>}
      <div className="events-list">
        {!loading && !fetchError && backendPolls.map(poll => (
          <div key={poll.id} className="event-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedId('q1')}>
            <span className="badge badge-upcoming">Live</span>
            <h2>{poll.title}</h2>
            <p>{poll.description}</p>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>📅 {new Date(poll.finishedAt).toLocaleDateString()}</p>
            <br />
            <button className="btn" style={{ fontSize: 14 }}>{lang === 'en' ? 'Open →' : 'Открыть →'}</button>
          </div>
        ))}
        {QUESTIONNAIRES.map(q => (
          <div key={q.id} className="event-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedId(q.id)}>
            <span className="badge badge-upcoming">{q.questions.length} {lang === 'en' ? 'questions' : 'вопросов'}</span>
            <h2>{lang === 'en' ? q.titleEn : q.titleRu}</h2>
            <p>{lang === 'en' ? q.descriptionEn : q.descriptionRu}</p>
            <br />
            <button className="btn" style={{ fontSize: 14 }}>{lang === 'en' ? 'Open →' : 'Открыть →'}</button>
          </div>
        ))}
      </div>
    </div>
  )

  if (submitted) return (
    <div className="container">
      <div className="donation-card" style={{ marginTop: 40 }}>
        <h3 style={{ color: '#40ba21' }}>✓ {t.submitted}</h3>
        <br />
        <button className="btn" onClick={handleBack}>{lang === 'en' ? '← Back to polls' : '← К опросникам'}</button>
      </div>
    </div>
  )

  return (
    <div className="container">
      <button onClick={handleBack} style={{ background: 'none', border: 'none', color: '#40ba21', fontWeight: 'bold', cursor: 'pointer', marginBottom: 16 }}>
        ← {lang === 'en' ? 'Back' : 'Назад'}
      </button>
      <div className="hero" style={{ padding: 40 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>{lang === 'en' ? selected!.titleEn : selected!.titleRu}</h1>
        <p style={{ marginBottom: 32 }}>{lang === 'en' ? selected!.descriptionEn : selected!.descriptionRu}</p>
        {selected!.questions.map((q, idx) => {
          const opts = lang === 'en' ? q.optionsEn : q.optionsRu
          const hasErr = errors[q.id]
          return (
            <div key={q.id} style={{ marginBottom: 28 }}>
              <p style={{ fontWeight: 600, marginBottom: 10, color: hasErr ? '#dc2626' : '#1e293b' }}>
                {idx + 1}. {lang === 'en' ? q.textEn : q.textRu}
                {q.required && <span style={{ color: '#dc2626' }}> *</span>}
              </p>
              {q.type === 'single' && opts?.map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                  <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={() => handleSingle(q.id, opt)} style={{ accentColor: '#40ba21' }} />
                  {opt}
                </label>
              ))}
              {q.type === 'multiple' && opts?.map(opt => {
                const sel = (answers[q.id] as string[]) || []
                return (
                  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                    <input type="checkbox" value={opt} checked={sel.includes(opt)} onChange={() => handleMultiple(q.id, opt)} style={{ accentColor: '#40ba21' }} />
                    {opt}
                  </label>
                )
              })}
              {q.type === 'text' && (
                <textarea rows={3} value={(answers[q.id] as string) || ''} onChange={e => handleText(q.id, e.target.value)}
                  placeholder={lang === 'en' ? 'Your answer...' : 'Ваш ответ...'}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${hasErr ? '#dc2626' : '#e2e8f0'}`, fontFamily: 'Arial, sans-serif', fontSize: 14, resize: 'vertical', outline: 'none' }} />
              )}
              {hasErr && <p style={{ color: '#dc2626', fontSize: 13, marginTop: 4 }}>{t.required}</p>}
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

function DepartmentCard(props: { name: string; tag: string; icon: string; description: string; members: string[]; t: T }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="dept-card" onClick={() => setIsOpen(!isOpen)}>
      <div className="dept-icon">{props.icon}</div>
      <span className="dept-tag">{props.tag}</span>
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      {isOpen && (
        <div className="dept-members">
          <h4>{props.t.members}</h4>
          {props.members.map((m, i) => <p key={i}>👤 {m}</p>)}
        </div>
      )}
      <span className="dept-toggle">{isOpen ? props.t.hide : props.t.show_members}</span>
    </div>
  )
}

function Navbar({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: T }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="logo-box">IU</span>
        <span className="logo-text">Student Union Portal</span>
      </div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>{t.home}</Link>
        <Link to="/history" onClick={() => setMenuOpen(false)}>{t.history}</Link>
        <Link to="/events" onClick={() => setMenuOpen(false)}>{t.events}</Link>
        <Link to="/polls" onClick={() => setMenuOpen(false)}>{t.polls}</Link>
        <Link to="/donations" onClick={() => setMenuOpen(false)}>{t.support}</Link>
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
          <DepartmentCard key={dept.id} name={dept.name} tag={dept.tag} icon={dept.icon} description={dept.description} members={dept.members} t={t} />
        ))}
      </div>
    </div>
  )
}

const historyEvents = [
  { year: "2013", titleEn: "University Founded", titleRu: "Основание университета", descEn: "Innopolis University was established as Russia's first IT-focused university.", descRu: "Университет Иннополис основан как первый в России IT-университет." },
  { year: "2015", titleEn: "Student Union Created", titleRu: "Создание Студенческого Союза", descEn: "The Student Union was formed to represent student interests and organize campus life.", descRu: "Студенческий Союз создан для представления интересов студентов." },
  { year: "2018", titleEn: "First Major Event", titleRu: "Первое крупное мероприятие", descEn: "SU organized the first university-wide hackathon with 200+ participants.", descRu: "СС организовал первый университетский хакатон с 200+ участниками." },
  { year: "2020", titleEn: "Online Transition", titleRu: "Переход в онлайн", descEn: "During the pandemic, SU successfully moved all activities online.", descRu: "Во время пандемии СС успешно перевёл все активности в онлайн." },
  { year: "2022", titleEn: "SU Portal Launch", titleRu: "Запуск портала СС", descEn: "Launch of the first digital platform for student governance and events.", descRu: "Запуск первой цифровой платформы для студенческого самоуправления." },
  { year: "2024", titleEn: "New Departments", titleRu: "Новые департаменты", descEn: "SU expanded with new departments: IT, Media, Sport, and Culture.", descRu: "СС расширился новыми департаментами: IT, Media, Спорт и Культура." },
  { year: "2026", titleEn: "Today", titleRu: "Сегодня", descEn: "SU continues to grow, now serving 1000+ students across all programs.", descRu: "СС продолжает развиваться, обслуживая 1000+ студентов всех программ." },
]

function HistoryPage({ t, lang }: { t: T; lang: Lang }) {
  return (
    <div className="history-page">
      <div className="container">
        <div className="section-title">
          <h2>{t.history_title}</h2>
          <p>{t.history_desc}</p>
        </div>
        <div className="timeline">
          {historyEvents.map((event, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-year">{event.year}</div>
              <div className="timeline-card">
                <h3>{lang === 'en' ? event.titleEn : event.titleRu}</h3>
                <p>{lang === 'en' ? event.descEn : event.descRu}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EventsPage({ t }: { t: T }) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'passed'>('all')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const visibleEvents = eventsWithStatus.filter(event => {
    if (filter === 'upcoming') return event.isActive
    if (filter === 'passed') return !event.isActive
    return true
  })

  return (
    <div className="container">
      {selectedEvent && <EventModal event={selectedEvent} t={t} onClose={() => setSelectedEvent(null)} />}
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
  <div key={index} className="event-card" onClick={() => setSelectedEvent(event)} style={{ cursor: 'pointer' }}>
    <div className="event-image-wrapper" style={{ background: `linear-gradient(135deg, ${event.color}, ${event.color}99)` }}>
      <h3 style={{ color: 'white', fontSize: 20, fontWeight: 900, padding: '0 16px' }}>{event.name}</h3>
      <span className={`event-badge ${event.isActive ? 'badge-upcoming' : 'badge-passed'}`}>
        {event.isActive ? t.upcoming : t.passed}
      </span>
    </div>
    <div className="event-card-body">
      <p>📅 {event.date} &nbsp; 📍 {event.location}</p>
      <span className="event-details-link">{t.details}</span>
    </div>
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
        <div className="qr-placeholder"><p>QR Code</p></div>
        <p className="donation-note">{t.qr_note}</p>
      </div>
    </div>
  )
}

function Footer({ t }: { t: T }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <span className="logo-box">IU</span>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Student Union Portal</span>
          </div>
          <p className="footer-subtitle">INNOPOLIS UNIVERSITY STUDENT UNION</p>
          <p className="footer-links-row">GOVERNANCE • ACTIVITY HUB • TRANSPARENCY</p>
        </div>
        <div className="footer-right">
          <p>📧 su@innopolis.university</p>
          <p>📍 Room 67 </p>
          <p>🕐 Tue & Thu 18:00 - 20:00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 IU Student Union</span>
        <span>Terms of Use · Privacy</span>
      </div>
    </footer>
  )
}

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const t = translations[lang]
  return (
    <BrowserRouter>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Routes>
        <Route path="/history" element={<HistoryPage t={t} lang={lang} />} />
        <Route path="/" element={<HomePage t={t} />} />
        <Route path="/events" element={<EventsPage t={t} />} />
        <Route path="/polls" element={<PollsPage t={t} lang={lang} />} />
        <Route path="/donations" element={<DonationsPage t={t} />} />
      </Routes>
      <Footer t={t} />
    </BrowserRouter>
  )
}

export default App