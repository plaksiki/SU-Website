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
        <Route path="/donations" element={<DonationsPage t={t} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App