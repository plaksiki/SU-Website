import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import './App.css'
import AdminPage from './AdminPage'
import { useNavigate } from 'react-router-dom'

const deptImages = import.meta.glob('./assets/**/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
function getPhoto(path: string): string | undefined { return deptImages[path] }

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
    dept_active_desc: "Organizing events, sports activities, and campus life.",
    dept_media_desc: "Designing merchandise and running social networks.",
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
    dep_core: "View department →",
    ceo_title: "Student Union Leadership",
    ceo_role_ceo: "SU President",
    ceo_role_assistant: "Assistant to the President",
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
    dept_active_desc: "Организация мероприятий, спортивных активностей и студенческой жизни.",
    dept_media_desc: "Дизайн мерча и ведение социальных сетей.",
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
    dep_core: "Перейти в департамент →",
    ceo_title: "Руководство Студенческого Союза",
    ceo_role_ceo: "Президент СС",
    ceo_role_assistant: "Помощник президента",
  }
}

interface Event {
  id: string
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
    id: "minecraft-event",
    name: "Minecraft Event",
    date: "2026-10-01",
    image: "",
    color: "#16a34a",
    location: "IU Gaming Room",
    description: "Join us for a fun Minecraft building competition! All skill levels welcome. Prizes for the best builds."
  },
  {
    id: "csgo-event",
    name: "CS:GO Event",
    date: "2026-11-01",
    image: "",
    color: "#0891b2",
    location: "IU Esports Arena",
    description: "Competitive CS:GO tournament. Form your team and compete for the championship title and exclusive IU merchandise."
  },
  {
    id: "hackathon-event",
    name: "Hackathon",
    date: "2025-12-01",
    image: "",
    color: "#7c3aed",
    location: "IU Co-working Area",
    description: "48-hour hackathon. Build innovative solutions for university life. Mentors available throughout the event."
  },
]

interface Member {
  name: string
  role?: string
  photo?: string
}

const getDepartments = (t: T) => [
  {
    id: 1, slug: "su-core", name: "SU Core", tag: "SU.CORE", icon: "🛡️", description: t.dept_core_desc,
    members: [
      { name: "Andrew Gekhtin", role: "COO", photo: "./assets/Core/Andrew.png" },
      { name: "Amelia Gizatullina", role: "Assistant", photo: "./assets/Core/Amelia.jpeg" },
      { name: "Timur Bikmetov", photo: "./assets/Core/Timur.jpg" },
      { name: "Egor Shvetsov", photo: "./assets/Core/Egor.jpeg" },
      { name: "Anna Zyrianova", photo: "./assets/Core/Anna.jpg" },
      { name: "Valerii Tiniakov", photo: "./assets/Core/Valerii.jpg" },
      { name: "Yaroslav Moskvin", photo: "./assets/Core/Yaroslav.jpg" },
      { name: "Albert Khechoyan", photo: "./assets/Core/Albert.jpeg" },
      { name: "Takhir Salikhov", photo: "./assets/Core/Takhir.jpg" },
      { name: "Dmitrii Malofeev", photo: "./assets/Core/Dmitrii.jpeg" },
      { name: "Esdras Diffouo Fopa", photo: "./assets/Core/Esdras.JPG" },
      { name: "Telman Nuruzov", photo: "./assets/Core/Telman.jpg" },
    ] as Member[]
  },
  {
    id: 2, slug: "su-active", name: "SU Active", tag: "SU.ACTIVE", icon: "⚡", description: t.dept_active_desc,
    members: [
      { name: "Maria Martianova", role: "COO", photo: "./assets/Active/Maria.JPG" },
      { name: "Irina Perekrestova", role: "Assistant", photo: "./assets/Active/Irina.JPG" },
      { name: "Albina Fadeeva", photo: "./assets/Active/Albina.jpg" },
      { name: "Aliya Khadeeva", photo: "./assets/Active/Aliya.JPG" },
      { name: "Georgy Pyanov", photo: "./assets/Active/Georgii.jpg" },
      { name: "Kristina Ushakova", photo: "./assets/Active/Kristina.JPG" },
      { name: "Marina Alexandrova", photo: "./assets/Active/Marina.JPG" },
      { name: "Darina Luchinina", role: "Intern", photo: "./assets/Active/Darina.JPG" },
      { name: "Askar Aitov", role: "Intern", photo: "./assets/Active/Askar.JPG" },
      { name: "Svetlana Yakusheva", role: "Intern", photo: "./assets/Active/Svetlana.JPG" },
      { name: "Amaliya Kharisova", role: "Intern", photo: "./assets/Active/Amalia.JPG" },
      { name: "Roman Titov", role: "Intern", photo: "./assets/Active/Roman.jpg" },
      { name: "Maria Karpova", role: "Intern", photo: "./assets/Active/Maria2.jpg" },
      { name: "Ekaterina Efremova", role: "Intern", photo: "./assets/Active/Ekaterina.JPG" },
      { name: "Arsenii Shchekin", role: "Intern", photo: "./assets/Active/Arsenii.JPG" },
      { name: "Anastasiya Kalashnikova", role: "Intern", photo: "./assets/Active/Anastasia.JPG" },
      { name: "Maximilian Mifsud Bonici", role: "Intern", photo: "./assets/Active/Maximilian.JPG" },
    ] as Member[]
  },
  {
    id: 3, slug: "su-media", name: "SU Media", tag: "SU.MEDIA", icon: "📸", description: t.dept_media_desc,
    members: [
      { name: "Silvia Fedorovskaya", role: "COO", photo: "./assets/Media/Silvia.jpg" },
      { name: "Egor Lesnykh", role: "Assistant", photo: "./assets/Media/Egor(1).jpg" },
      { name: "Ksenia Minaeva", photo: "./assets/Media/Ksenia.jpeg" },
      { name: "Daniyar Fairushin", photo: "./assets/Media/Daniyar.jpg" },
      { name: "Yana Birkina", photo: "./assets/Media/Yana.jpg" },
    ] as Member[]
  },
]

const today = new Date()
const eventsWithStatus = events.map(event => ({
  ...event,
  isActive: new Date(event.date) >= today
}))


interface BackendQuestionnaire {
  id: number
  title: string
  description: string
  startedAt: string
  finishedAt: string
}

interface BackendQuestion {
  id: number
  questionnaireId: number
  text: string
  questionType: 'single_choice' | 'multiple_choice' | 'open_text'
  orderIndex: number
}

interface BackendOption {
  id: number
  questionId: number
  text: string
  orderIndex: number
}

type Lang = 'en' | 'ru'
type T = typeof translations.en

function localize(text: string, lang: Lang): string {
  const parts = text.split(' | ')
  if (parts.length === 1) return text
  return lang === 'ru' ? (parts[0] || text) : (parts[1] || parts[0] || text)
}

function PollsPage({ t, lang }: { t: T; lang: Lang }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | number | number[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [backendPolls, setBackendPolls] = useState<BackendQuestionnaire[]>([])
  const [questions, setQuestions] = useState<BackendQuestion[]>([])
  const [options, setOptions] = useState<Record<number, BackendOption[]>>({})
  const [loading, setLoading] = useState(true)
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/questionnaires`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setBackendPolls(data)
        setLoading(false)
      })
      .catch(() => { setFetchError(true); setLoading(false) })
  }, [])

  const loadQuestionnaire = async (id: string) => {
    setQuestionsLoading(true)
    setQuestions([])
    setOptions({})
    setSelectedId(id)
    try {
      const qs: BackendQuestion[] = await fetch(`${API_URL}/question/by-questionnaire/${id}`).then(r => r.json())
      setQuestions(qs.sort((a, b) => a.orderIndex - b.orderIndex))

      const optsByQuestion: Record<number, BackendOption[]> = {}
      await Promise.all(
        qs.filter(q => q.questionType !== 'open_text').map(async q => {
          const opts: BackendOption[] = await fetch(`${API_URL}/options/by-question/${q.id}`).then(r => r.json())
          optsByQuestion[q.id] = opts.sort((a, b) => a.orderIndex - b.orderIndex)
        })
      )
      setOptions(optsByQuestion)
    } catch {
      // вопросы не загрузились
    }
    setQuestionsLoading(false)
  }

  const handleSingle = (qid: number, optionId: number) => {
    setAnswers(p => ({ ...p, [qid]: optionId }))
    setErrors(p => ({ ...p, [qid]: false }))
  }

  const handleMultiple = (qid: number, optionId: number) => {
    setAnswers(p => {
      const cur = (p[qid] as number[]) || []
      return { ...p, [qid]: cur.includes(optionId) ? cur.filter(o => o !== optionId) : [...cur, optionId] }
    })
  }

  const handleText = (qid: number, val: string) => {
    setAnswers(p => ({ ...p, [qid]: val }))
    setErrors(p => ({ ...p, [qid]: false }))
  }

  const handleSubmit = async () => {
    if (!selectedId || questions.length === 0) return
    const errs: Record<string, boolean> = {}
    for (const q of questions) {
      const v = answers[q.id]
      if (!v || (Array.isArray(v) && !v.length) || v === '') errs[q.id] = true
    }
    if (Object.keys(errs).length) { setErrors(errs); return }

    try {
      const responseRes = await fetch(`${API_URL}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionnaireId: Number(selectedId) })
      })
      if (!responseRes.ok) throw new Error('Failed to create response')
      const responseData = await responseRes.json()
      const responseId = responseData.id

      await Promise.all(
        questions.map(q => {
          const value = answers[q.id]
          if (q.questionType === 'open_text') {
            return fetch(`${API_URL}/answers`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ responseId, questionId: q.id, text_answer: value as string, optionId: null })
            })
          } else if (q.questionType === 'multiple_choice') {
            return Promise.all((value as number[]).map(optionId =>
              fetch(`${API_URL}/answers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ responseId, questionId: q.id, text_answer: null, optionId })
              })
            ))
          } else {
            return fetch(`${API_URL}/answers`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ responseId, questionId: q.id, text_answer: null, optionId: value as number })
            })
          }
        })
      )
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
  }

  const handleBack = () => {
    setSelectedId(null)
    setAnswers({})
    setSubmitted(false)
    setErrors({})
    setQuestions([])
    setOptions({})
  }

  const selectedPoll = backendPolls.find(p => String(p.id) === selectedId)

  // Нет выбранного опросника - показываем список
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
          <div key={poll.id} className="event-card" style={{ cursor: 'pointer' }} onClick={() => loadQuestionnaire(String(poll.id))}>
            <span className="badge badge-upcoming">Live</span>
            <h2>{localize(poll.title, lang)}</h2>
            <p>{localize(poll.description, lang)}</p>
            <br />
            <button className="btn" style={{ fontSize: 14 }}>{lang === 'en' ? 'Open →' : 'Открыть →'}</button>
          </div>
        ))}
      </div>
    </div>
  )

  // Загружаются вопросы
  if (questionsLoading) return (
    <div className="container">
      <p style={{ textAlign: 'center', color: '#64748b', marginTop: 40 }}>Loading...</p>
    </div>
  )

  // Отправлено
  if (submitted) return (
    <div className="container">
      <div className="donation-card" style={{ marginTop: 40 }}>
        <h3 style={{ color: '#40ba21' }}>✓ {t.submitted}</h3>
        <br />
        <button className="btn" onClick={handleBack}>{lang === 'en' ? '← Back to polls' : '← К опросникам'}</button>
      </div>
    </div>
  )

  // Форма опросника
  return (
    <div className="container">
      <button onClick={handleBack} style={{ background: 'none', border: 'none', color: '#40ba21', fontWeight: 'bold', cursor: 'pointer', marginBottom: 16 }}>
        ← {lang === 'en' ? 'Back' : 'Назад'}
      </button>
      <div className="hero" style={{ padding: 40 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>{selectedPoll ? localize(selectedPoll.title, lang) : ''}</h1>
        <p style={{ marginBottom: 32 }}>{selectedPoll ? localize(selectedPoll.description, lang) : ''}</p>
        {questions.map((q, idx) => {
          const opts = options[q.id] || []
          const hasErr = errors[q.id]
          return (
            <div key={q.id} style={{ marginBottom: 28 }}>
              <p style={{ fontWeight: 600, marginBottom: 10, color: hasErr ? '#dc2626' : '#1e293b' }}>
                {idx + 1}. {localize(q.text, lang)}
              </p>
              {q.questionType === 'single_choice' && opts.map(opt => (
                <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                  <input type="radio" name={String(q.id)} checked={answers[q.id] === opt.id} onChange={() => handleSingle(q.id, opt.id)} style={{ accentColor: '#40ba21' }} />
                  {localize(opt.text, lang)}
                </label>
              ))}
              {q.questionType === 'multiple_choice' && opts.map(opt => {
                const sel = (answers[q.id] as number[]) || []
                return (
                  <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                    <input type="checkbox" checked={sel.includes(opt.id)} onChange={() => handleMultiple(q.id, opt.id)} style={{ accentColor: '#40ba21' }} />
                    {localize(opt.text, lang)}
                  </label>
                )
              })}
              {q.questionType === 'open_text' && (
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

function DepartmentPage({ t }: { t: T; lang?: Lang }) {
  const { slug } = useParams()
  const dept = getDepartments(t).find(d => d.slug === slug)

  if (!dept) return (
    <div className="container">
      <h2>Department not found</h2>
      <Link to="/" className="btn">← Back</Link>
    </div>
  )

  return (
    <div className="container">
      <Link to="/" style={{ color: '#40ba21', fontWeight: 'bold', textDecoration: 'none' }}>
        ← {t.home}
      </Link>
      <div className="event-full-page" style={{ marginTop: 20 }}>
        <div className="event-full-header" style={{ background: 'linear-gradient(135deg, #40ba21, #166534)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{dept.icon}</div>
          <span className="dept-tag" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{dept.tag}</span>
          <h1 style={{ color: 'white', fontSize: 36, fontWeight: 900, margin: '8px 0' }}>{dept.name}</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>{dept.description}</p>
        </div>
        <div className="event-full-body">
          <h3 style={{ marginBottom: 16, color: '#1e293b' }}>{t.members}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {dept.members.map((member, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                {member.photo && getPhoto(member.photo)
                  ? <img src={getPhoto(member.photo)} alt={member.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  : <div style={{ width: 40, height: 40, borderRadius: '50%', background: member.role === 'Intern' ? '#94a3b8' : '#40ba21', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', flexShrink: 0 }}>{member.name[0]}</div>
                }
                <div>
                  <span style={{ fontWeight: 500, color: '#1e293b', display: 'block' }}>{member.name}</span>
                  {member.role && <span style={{ fontSize: 12, color: member.role === 'Intern' ? '#94a3b8' : '#40ba21', fontWeight: 600 }}>{member.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DepartmentCard(props: { slug: string; name: string; tag: string; icon: string; description: string; t: T }) {
  return (
    <Link to={`/departments/${props.slug}`} style={{ textDecoration: 'none', flex: 1, minWidth: 220 }}>
      <div className="dept-card">
        <div className="dept-icon">{props.icon}</div>
        <span className="dept-tag">{props.tag}</span>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <span className="dept-toggle">{props.t.dep_core}</span>
      </div>
    </Link>
  )
}

function Navbar({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: T }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)
  const navigate = useNavigate()

  const handleLogoClick = () => {
    const newCount = logoClicks + 1
    setLogoClicks(newCount)
    if (newCount === 3) {
      navigate('/admin')
      setLogoClicks(0)
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-logo" style={{ textDecoration: 'none' }} onClick={handleLogoClick}>
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

const ceoMembers: Member[] = [
  { name: "Alena Petrenko", role: "SU:CEO", photo: "./assets/Alena.jpg" },
  { name: "Ilya Kachalin", role: "Assistant", photo: "./assets/Ilia.jpg" },
]

function HomePage({ t }: { t: T }) {
  return (
    <div className="container">
      <div className="hero">
        <h1>{t.hero_title} <span className="green">{t.hero_subtitle}</span></h1>
        <p>{t.hero_desc}</p>
        <Link to="/events" className="btn">{t.view_events}</Link>
      </div>
      <div className="section-title">
        <h2>{t.ceo_title}</h2>
      </div>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
        {ceoMembers.map((m, i) => {
          const photo = m.photo ? getPhoto(m.photo) : undefined
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              {photo
                ? <img src={photo} alt={m.name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid #40ba21' }} />
                : <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#40ba21', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 36, fontWeight: 'bold' }}>{m.name[0]}</div>
              }
              <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 15 }}>{m.name}</span>
              <span style={{ fontSize: 12, color: '#40ba21', fontWeight: 600 }}>{m.role}</span>
            </div>
          )
        })}
      </div>
      <div className="section-title">
        <h2>{t.org_title}</h2>
        <p>{t.org_desc}</p>
      </div>
      <div className="departments">
        {getDepartments(t).map(dept => (
          <DepartmentCard key={dept.id} slug={dept.slug} name={dept.name} tag={dept.tag} icon={dept.icon} description={dept.description} t={t} />
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

function EventPage({ t }: { t: T }) {
  const { id } = useParams()
  const event = eventsWithStatus.find(e => e.id === id)

  if (!event) return (
    <div className="container">
      <h2>Event not found</h2>
      <Link to="/events" className="btn">← Back to Events</Link>
    </div>
  )

  return (
    <div className="container">
      <Link to="/events" style={{ color: '#40ba21', fontWeight: 'bold', textDecoration: 'none' }}>
        ← {t.events}
      </Link>
      <div className="event-full-page">
        <div className="event-full-header" style={{ background: `linear-gradient(135deg, ${event.color}, ${event.color}99)` }}>
          <span className={`badge ${event.isActive ? 'badge-upcoming' : 'badge-passed'}`}>
            {event.isActive ? t.upcoming : t.passed}
          </span>
          <h1>{event.name}</h1>
          <p>📅 {event.date} &nbsp; 📍 {event.location}</p>
        </div>
        <div className="event-full-body">
          <p>{event.description}</p>
        </div>
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
          <Link key={index} to={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
            <div className="event-card" style={{ cursor: 'pointer', height: '100%' }}>
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
          </Link>
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

function Footer() {
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
          <p>📍 Room 67</p>
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
        <Route path="/departments/:slug" element={<DepartmentPage t={t} lang={lang} />} />
        <Route path="/events/:id" element={<EventPage t={t} />} />
        <Route path="/history" element={<HistoryPage t={t} lang={lang} />} />
        <Route path="/" element={<HomePage t={t} />} />
        <Route path="/events" element={<EventsPage t={t} />} />
        <Route path="/polls" element={<PollsPage t={t} lang={lang} />} />
        <Route path="/donations" element={<DonationsPage t={t} />} />
        <Route path="/admin" element={<AdminPage lang={lang} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App