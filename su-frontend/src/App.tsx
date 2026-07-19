import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import suLogo from './assets/Logo.png'
import './App.css'
import AdminPage from './AdminPage'
import { useNavigate } from 'react-router-dom'

const deptImages = import.meta.glob('./assets/**/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
function getPhoto(path: string): string | undefined { return deptImages[path] }

function thumborUrl(src: string, width: number, height: number): string {
  if (!src || import.meta.env.DEV) return src
  const fullSrc = src.startsWith('http') ? src : `${window.location.origin}${src}`
  return `/thumbor/unsafe/${width}x${height}/${fullSrc}`
}

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

interface SuEvent {
  id: string
  name: string
  date: string
  color: string
  location: string
  description: string
  isActive?: boolean
  photoUrls?: string[]
  galleryUrl?: string
}

interface BackendEvent {
  id: number
  title: string
  description: string
  eventTime: string
  eventLocation: string
  finishedAt: string | null
  photoUrls?: string | null
  galleryUrl?: string | null
}

const EVENT_COLORS = ['#16a34a', '#0891b2', '#7c3aed', '#dc2626', '#d97706', '#0d9488']

function mapBackendEvent(e: BackendEvent, idx: number): SuEvent {
  const date = e.eventTime ? e.eventTime.split('T')[0] : ''
  return {
    id: String(e.id),
    name: e.title,
    date,
    color: EVENT_COLORS[idx % EVENT_COLORS.length],
    location: e.eventLocation || '',
    description: e.description || '',
    isActive: e.finishedAt ? new Date(e.finishedAt) >= new Date() : (date ? new Date(date) >= new Date() : true),
    photoUrls: e.photoUrls ? e.photoUrls.split('\n').map(s => s.trim()).filter(s => s) : [],
    galleryUrl: e.galleryUrl || '',
  }
}

interface Member {
  name: string
  role?: string
  photo?: string
  bio?: string
}

const getDepartments = (t: T) => [
  {
    id: 1, slug: "su-core", name: "SU Core", tag: "SU.CORE", icon: "🛡️", description: t.dept_core_desc,
    members: [
      { name: "Andrew Gekhtin", role: "COO", photo: "./assets/Core/Andrew.png", bio: "Good time of the day! My name is Andrew, and I'm a second year cybersecurity student. I've been working in SU:Core throughout the Spring semester and contributed to several vital cases, like potential increase of dormitory accommodation prices and modernization of Shishkin Park. Starting from April 18th, 2026, I serve as the COO of SU:Core. For any inquiries, I highly encourage you to contact me. Let us continue making Innopolis University a distinguished and comfortable place for students!" },
      { name: "Amelia Gizatullina", role: "Assistant", photo: "./assets/Core/Amelia.jpeg", bio: "Hii!! I am Amelia Gizatullina, a first year student at Innopolis University. I am also a Deputy Head of SU:Core. For me Student Union is about improving student life, representing students' interests, and building effective communication between students and the administration. So, that's why I am here for you!!" },
      { name: "Timur Bikmetov", photo: "./assets/Core/Timur.jpg", bio: "Hi everyone! I'm Timur Bikmetov, a second-year bachelor's student. I've helped organize several events and olympiads. As a member of SU, I'll be happy to support you with any questions or challenges that come up. See you! :)" },
      { name: "Egor Shvetsov", photo: "./assets/Core/Egor.jpeg", bio: "I like working in the student council because I get to participate in negotiations with the administration. It's an exciting opportunity to contribute to the development of the student community and ensure that our voices are heard. Additionally, I enjoy resolving conflict situations — it allows me to use my problem-solving skills and help create a harmonious and supportive environment for all students." },
      { name: "Anna Zyrianova", photo: "./assets/Core/Anna.jpg", bio: "Hi! My name is Anna, and I'm a second-year student. I joined SU:Core last Fall and since then have focused primarily on facilitating discussions with the university administration. I'm passionate about understanding how things work behind the scenes at our university and am dedicated to improving student life." },
      { name: "Valerii Tiniakov", photo: "./assets/Core/Valerii.jpg", bio: "Hello there! I'm Valerii Tiniakov, a second-year student. I joined the Student Union to actively contribute to the development of our university environment. I believe that even small changes can make a big difference. I'm here to apply my skills to help solve problems and bring fresh initiatives to life." },
      { name: "Yaroslav Moskvin", photo: "./assets/Core/Yaroslav.jpg", bio: "sup 😝" },
      { name: "Albert Khechoyan", photo: "./assets/Core/Albert.jpeg", bio: "Hello everyone! I'm Albert Khechoyan, a second-year CBS student. I joined the SU:Core team because I want to contribute to solving challenges within our student community. I'm here to support every student and help make university life better for everyone. Feel free to reach out! ❤️" },
      { name: "Takhir Salikhov", photo: "./assets/Core/Takhir.jpg", bio: "Hello everybody! I am a B25-MFAI student Salikhov Tahir. I am pleased to help the Innopolis University community, so I joined SU." },
      { name: "Dmitrii Malofeev", photo: "./assets/Core/Dmitrii.jpeg", bio: "Hello there! I'm Dmitrii, a first-year DSAI student. Since joining SU:Core, my responsibilities have grown from handling internal university documents to developing technical projects and platforms for the Student Union. I am here to apply my skills to help solve problems and make student life more comfortable and modern." },
      { name: "Esdras Diffouo Fopa", photo: "./assets/Core/Esdras.JPG", bio: "Studying abroad comes with many challenges; the language barrier is only the tip of the iceberg. Through the 319 Team, Russian language courses, and fellowship programs, IU already does a lot to support the international student community — and that is commendable. Hi, I'm Esdras, and I'm eager to contribute to making IU feel like home. For everyone." },
      { name: "Telman Nuruzov", photo: "./assets/Core/Telman.jpg", bio: "👋 Hi! My name is Telman, and I'm a second-year bachelor's student. I recently joined Student Union because I'm highly motivated by the opportunity to make a real contribution to improving student life and see a meaningful impact from my work. I hope to be a useful part of the team and work together to make student life even better. Good luck everyone 🤙" },
    ] as Member[]
  },
  {
    id: 2, slug: "su-active", name: "SU Active", tag: "SU.ACTIVE", icon: "⚡", description: t.dept_active_desc,
    members: [
      { name: "Maria Martianova", role: "COO", photo: "./assets/Active/Maria2.jpg", bio: "Hey! My name's Masha, but you can call me Marusya). I'm a first-year bachelor's student and also the COO of SU:Active. I'm a very active person with a huge desire to make students' lives more exciting. I'm so happy to be a part of our student community! 🫶🏻" },
      { name: "Irina Perekrestova", role: "Assistant", photo: "./assets/Active/Irina.JPG", bio: "hey everyone im ira and ive been part of su:active for a year now 😛 My main responsibility is event area decoration, but i also try to take active part in team coordination and newbie onboarding process. Love organising stuff, creating fun decorations and watching it all come together! хихи хаха" },
      { name: "Albina Fadeeva", photo: "./assets/Active/Albina.jpg", bio: "Hi!! My name is Albina. I joined SU to take part in organizing events. I always have a lot of ideas, especially for handmade master classes and fun activities. SU:Active is a great opportunity to bring my ideas to life and bring joy to others." },
      { name: "Aliya Khadeeva", photo: "./assets/Active/Aliya.JPG", bio: "Hello! Aliya Khadeeva here, a second-year student and part of SU:Active. I'm involved in various initiatives and truly enjoy making university life more fun and exciting." },
      { name: "Georgy Pyanov", photo: "./assets/Active/Georgii.jpg" },
      { name: "Kristina Ushakova", photo: "./assets/Active/Kristina.JPG", bio: "Hi everyone! My name is Kristina, and I'm a second-year bachelor's student. I've always loved taking part in different activities, and here in Innopolis I realized I want more than just to participate — I want to help make those moments happen. That's why I'm part of SU:Active!" },
      { name: "Marina Alexandrova", photo: "./assets/Active/Marina.JPG" },
      { name: "Darina Luchinina", role: "Intern", photo: "./assets/Active/Darina.JPG", bio: "Hi, I'm Darina, a first-year bachelor student))) I recently joined SU:Active because I have always been interested in organizing university events. I think it's very exciting. Well, I'm eager to meet new people here and gain new experiences. I believe that SU will give me this opportunity!" },
      { name: "Askar Aitov", role: "Intern", photo: "./assets/Active/Askar.JPG", bio: "Hi! My name is Askar, and I'm a first-year bachelor's student. I'm very excited to join the Student Union. I'm an active person and enjoy participating in the organization of various events. I hope that, together as a team, we will create engaging, memorable, and enjoyable events for all students." },
      { name: "Svetlana Yakusheva", role: "Intern", photo: "./assets/Active/Svetlana.JPG", bio: "Hi, I'm Sveta. I am full of different ideas, especially for decorations and workshops. I hope that being a part of SU:Active is a great opportunity to show my skills." },
      { name: "Amaliya Kharisova", role: "Intern", photo: "./assets/Active/Amalia.JPG", bio: "Hi! I'm Amaliya, second-year student and part of SU:Active. I joined the team because I genuinely love organizing activities and making things happen behind the scenes. My role is to ensure smooth communication with our volunteers, help create engaging master classes, and support the team in bringing different event activities." },
      { name: "Roman Titov", role: "Intern", photo: "./assets/Active/Roman.jpg", bio: "Good time of day! Roman here, a second-year student and creative chaos. After almost two years of just attending classes, I decided it was time to actually do something. I'm a dancer, a designer, a video editor, a photographer, and honestly a little bit of everything else. In SU:Active, I'm exactly the same: no fixed role, just wherever I'm needed. Chill but creative, that's the deal 🙂" },
      { name: "Maria Karpova", role: "Intern", photo: "./assets/Active/Maria.JPG", bio: "heyy! my name is Maria, I'm a second-year bachelor's student, part of the scenario team and the biggest math analysis fan here. hope you enjoy our work 🪷" },
      { name: "Ekaterina Efremova", role: "Intern", photo: "./assets/Active/Ekaterina.JPG", bio: "Hi! I'm Katya, a first-year bachelor's student. I love technical subjects like calculus and physics, but creativity has always been with me too. Fun fact: I spent ten years at art school (graduated with honors) and nearly went into architecture. I also enjoy social activities: events, performing, helping others. That's why I joined SU:Active — to grow, try new things, and share joy." },
      { name: "Arsenii Shchekin", role: "Intern", photo: "./assets/Active/Arsenii.JPG", bio: "Hello. I'm Arsenii. My goal is to bring positive to people's life and to create fun memories. I believe that life is about having fun." },
      { name: "Anastasiya Kalashnikova", role: "Intern", photo: "./assets/Active/Anastasia.JPG", bio: "My name is Nastya, I love making things with my hands, mostly knitting or crocheting. I also read books, watch movies, do calisthenics and actively trying myself in something new." },
      { name: "Maximilian Mifsud Bonici", role: "Intern", photo: "./assets/Active/Maximilian.JPG", bio: "Hallo! I'm Maximilian, and am a British second year student. I joined SU:active because I saw the cool events being held on a constant basis and thought it would be nice to be a part of the process. Ready to be of service 🫡" },
    ] as Member[]
  },
  {
    id: 3, slug: "su-media", name: "SU Media", tag: "SU.MEDIA", icon: "📸", description: t.dept_media_desc,
    members: [
      { name: "Silvia Fedorovskaya", role: "COO", photo: "./assets/Media/Silvia.jpg", bio: "My name is Silvia; I love creating content and I'm the COO of SU:Media. I joined the Student Union to cover our activities in the media, raise our profile and gain experience. I'm also involved with Innopolis City Media and act as the SMM ambassador coordinator." },
      { name: "Egor Lesnykh", role: "Assistant", photo: "./assets/Media/Egor.jpg", bio: "Hey, I'm Egor, a first-year bachelor student. I've recently joined SU:Media because I'm really astonished by video content and social medias. My goal is to provide students and other people info about our SU in a visual-catchy way." },
      { name: "Ksenia Minaeva", photo: "./assets/Media/Ksenia.jpeg", bio: "Hi everyone! I'm Kseniia. I really like photography! and because of this i'm in SU:Media. I like creating photos for students and give them some sort of memories from university events!!" },
      { name: "Daniyar Fairushin", photo: "./assets/Media/Daniyar.jpg", bio: "Hi there, I'm Daniyar. One of my favorite things to do is photography, that's why I'm here." },
      { name: "Yana Birkina", photo: "./assets/Media/Yana.jpg", bio: "Hi, I'm Yana, and I've recently joined the SU:Media team. As a photographer, I want to capture the real atmosphere of university events — the emotions, details, and moments that make student life memorable." },
      { name: "Egor Khramtsov", photo: "./assets/Media/Egor(1).jpg", bio: "Hi! I'm Egor, a second-year student. I enjoy taking photos at events to capture good moments and create lasting memories for people." },
    ] as Member[]
  },
]



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
  const navigate = useNavigate()
  const [backendPolls, setBackendPolls] = useState<BackendQuestionnaire[]>(() => {
    try { return JSON.parse(localStorage.getItem('admin_questionnaires') || '[]') } catch { return [] }
  })
  const [fetchError] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/questionnaires`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setBackendPolls(data) })
      .catch(() => {})
  }, [])

  // Публичный список: сначала убираем опросники с истёкшим сроком (finishedAt в
  // прошлом), затем сортируем оставшиеся по дате создания — новые первыми.
  // Истёкшие остаются в БД (нужны для админки/экспорта) — здесь только скрываются.
  // Время фиксируем один раз при монтировании (ленивый init — чистый рендер).
  const [now] = useState(() => Date.now())
  const visiblePolls = [...backendPolls]
    .filter(p => {
      if (!p.finishedAt) return true // без даты окончания — бессрочный, показываем
      const end = new Date(p.finishedAt).getTime()
      return isNaN(end) || end > now // невалидную дату не считаем истёкшей
    })
    .sort((a, b) => {
      const ta = a.startedAt ? new Date(a.startedAt).getTime() : Number(a.id) || 0
      const tb = b.startedAt ? new Date(b.startedAt).getTime() : Number(b.id) || 0
      return tb - ta
    })

  return (
    <div style={{ width: '100%', padding: '40px 32px', boxSizing: 'border-box' as const }}>
      <style>{`.polls-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; } @media(max-width:900px){.polls-grid{grid-template-columns:repeat(2,1fr)}} @media(max-width:560px){.polls-grid{grid-template-columns:1fr}}`}</style>
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>{t.polls_title}</h1>
        <p style={{ color: '#64748b', fontSize: 15, margin: 0 }}>{t.polls_desc}</p>
      </div>
      {fetchError && <p style={{ textAlign: 'center', color: '#dc2626' }}>Could not connect to server.</p>}
      {!fetchError && visiblePolls.length === 0 && (
        <p style={{ textAlign: 'center', color: '#64748b' }}>
          {lang === 'en' ? 'No active questionnaires right now.' : 'Сейчас нет активных опросников.'}
        </p>
      )}
      <div className="polls-grid">
        {visiblePolls.map(poll => (
          <div key={poll.id} style={{
            background: 'white', borderRadius: 20, overflow: 'hidden',
            border: '1px solid #e8edf2', cursor: 'pointer', display: 'flex', flexDirection: 'column',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
            onClick={() => navigate(`/polls/${poll.id}`)}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '' }}
          >
            <div style={{
              background: 'linear-gradient(160deg, #40ba21ee, #14532d99)',
              padding: '22px 22px 22px', minHeight: 200,
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
              <div style={{ position: 'absolute', bottom: -25, right: 30, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <span style={{
                alignSelf: 'flex-start',
                background: 'rgba(255,255,255,0.28)', backdropFilter: 'blur(6px)',
                color: 'white', fontWeight: 800, fontSize: 10,
                letterSpacing: '1.5px', padding: '5px 13px', borderRadius: 20, textTransform: 'uppercase',
              }}>Live</span>
              <h3 style={{ color: 'white', fontSize: 22, fontWeight: 900, margin: 0, lineHeight: 1.2, position: 'relative' }}>
                {localize(poll.title, lang)}
              </h3>
            </div>
            <div style={{ padding: '16px 22px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
              <p style={{ color: '#64748b', fontSize: 14, margin: 0, lineHeight: 1.5 }}>{localize(poll.description, lang)}</p>
              <span style={{ color: '#40ba21', fontWeight: 700, fontSize: 13 }}>{lang === 'en' ? 'Open →' : 'Открыть →'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function parseCachedPoll(id: string) {
  try {
    const cached = JSON.parse(localStorage.getItem('admin_questionnaires') || '[]')
    const found = cached.find((q: { id: string }) => String(q.id) === id)
    if (!found) return { poll: null, questions: [], options: {} }
    const questions: BackendQuestion[] = found.questions?.map((q: { id: string; text: string; type: string }, i: number) => ({
      id: Number(q.id) || i + 1,
      questionnaireId: Number(id),
      text: q.text,
      questionType: q.type as 'single_choice' | 'multiple_choice' | 'open_text',
      orderIndex: i + 1,
    })) || []
    const options: Record<number, BackendOption[]> = {}
    found.questions?.forEach((q: { id: string; type: string; options: string[] }, i: number) => {
      if (q.type !== 'open_text' && q.options?.length) {
        options[Number(q.id) || i + 1] = q.options.map((text: string, j: number) => ({
          id: j + 1, questionId: Number(q.id) || i + 1, text, orderIndex: j + 1,
        }))
      }
    })
    return { poll: found as BackendQuestionnaire, questions, options }
  } catch { return { poll: null, questions: [], options: {} } }
}

function PollDetailPage({ t, lang }: { t: T; lang: Lang }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<Record<string, string | number | number[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const cached = id ? parseCachedPoll(id) : { poll: null, questions: [], options: {} }
  const [poll, setPoll] = useState<BackendQuestionnaire | null>(cached.poll)
  const [questions, setQuestions] = useState<BackendQuestion[]>(cached.questions)
  const [options, setOptions] = useState<Record<number, BackendOption[]>>(cached.options)

  useEffect(() => {
    if (!id) return

    // Обновляем с сервера в фоне
    fetch(`${API_URL}/questionnaires`)
      .then(r => r.ok ? r.json() : null)
      .then((data: BackendQuestionnaire[] | null) => {
        if (data) {
          const found = data.find(q => String(q.id) === id)
          if (found) setPoll(found)
        }
      })
      .catch(() => {})

    fetch(`${API_URL}/question/by-questionnaire/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(async (qs: BackendQuestion[] | null) => {
        // `[]` — тоже истина, поэтому пустой ответ раньше затирал вопросы,
        // отрисованные из кэша, и форма оставалась без единого вопроса.
        if (!qs || qs.length === 0) return
        setQuestions(qs.sort((a, b) => a.orderIndex - b.orderIndex))
        // У серверных вопросов свои id, а `answers` хранится по id из кэша.
        // Не сбросив их, ответы «повисают» и валидация ругается на
        // заполненные вопросы.
        setAnswers({})
        setErrors({})
        const optsByQuestion: Record<number, BackendOption[]> = {}
        await Promise.all(
          qs.filter(q => q.questionType !== 'open_text').map(async q => {
            const opts: BackendOption[] = await fetch(`${API_URL}/options/by-question/${q.id}`).then(r => r.json())
            optsByQuestion[q.id] = opts.sort((a, b) => a.orderIndex - b.orderIndex)
          })
        )
        setOptions(optsByQuestion)
      })
      .catch(() => {})
  }, [id])

  const handleSingle = (qid: number, optionId: number) => {
    setAnswers(p => ({ ...p, [qid]: optionId }))
    setErrors(p => ({ ...p, [qid]: false }))
  }

  const handleMultiple = (qid: number, optionId: number) => {
    setAnswers(p => {
      const cur = (p[qid] as number[]) || []
      return { ...p, [qid]: cur.includes(optionId) ? cur.filter(o => o !== optionId) : [...cur, optionId] }
    })
    setErrors(p => ({ ...p, [qid]: false }))
  }

  const handleText = (qid: number, val: string) => {
    setAnswers(p => ({ ...p, [qid]: val }))
    setErrors(p => ({ ...p, [qid]: false }))
  }

  const handleSubmit = async () => {
    if (!id || questions.length === 0) return
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
        body: JSON.stringify({ questionnaireId: Number(id) })
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
              body: JSON.stringify({ responseId, questionId: q.id, textAnswer: value as string, optionId: null })
            })
          } else if (q.questionType === 'multiple_choice') {
            return Promise.all((value as number[]).map(optionId =>
              fetch(`${API_URL}/answers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ responseId, questionId: q.id, textAnswer: null, optionId })
              })
            ))
          } else {
            return fetch(`${API_URL}/answers`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ responseId, questionId: q.id, textAnswer: null, optionId: value as number })
            })
          }
        })
      )
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
  }

  if (submitted) return (
    <div className="container">
      <div className="donation-card" style={{ marginTop: 40 }}>
        <h3 style={{ color: '#40ba21' }}>✓ {t.submitted}</h3>
        <br />
        <button className="btn" onClick={() => navigate('/polls')}>{lang === 'en' ? '← Back to polls' : '← К опросникам'}</button>
      </div>
    </div>
  )

  return (
    <div className="container">
      <button onClick={() => navigate('/polls')} style={{ background: 'none', border: 'none', color: '#40ba21', fontWeight: 'bold', cursor: 'pointer', marginBottom: 16 }}>
        ← {lang === 'en' ? 'Back' : 'Назад'}
      </button>
      <div className="hero" style={{ padding: 40 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>{poll ? localize(poll.title, lang) : ''}</h1>
        <p style={{ marginBottom: 32 }}>{poll ? localize(poll.description, lang) : ''}</p>
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

const DEPT_ACCENTS: Record<string, string> = {
  'su-core':   'linear-gradient(135deg, #14532d 0%, #40ba21 100%)',
  'su-active': 'linear-gradient(135deg, #40ba21 0%, #86efac 100%)',
  'su-media':  'linear-gradient(135deg, #166534 0%, #15803d 100%)',
}

function MemberModal({ member, slug, onClose }: { member: Member; slug: string; onClose: () => void }) {
  const originalPhoto = member.photo ? getPhoto(member.photo) : undefined
  const photo = originalPhoto ? thumborUrl(originalPhoto, 200, 200) : undefined
  const accent = DEPT_ACCENTS[slug] || 'linear-gradient(135deg, #40ba21, #166534)'
  const isIntern = member.role === 'Intern'
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: 460, borderRadius: 24, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {/* Цветная шапка с фото */}
        <div style={{ background: accent, padding: '36px 32px 48px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <div style={{ position: 'absolute', bottom: -36, left: '50%', transform: 'translateX(-50%)' }}>
            <MemberAvatar photo={photo} originalPhoto={originalPhoto} name={member.name} size={72} color="white" border="3px solid white" />
          </div>
        </div>
        {/* Контент */}
        <div style={{ padding: '52px 32px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {member.role && (
            <span style={{
              fontSize: 11, fontWeight: 800, letterSpacing: '1.5px',
              color: isIntern ? '#94a3b8' : '#40ba21',
              textTransform: 'uppercase',
            }}>{member.role}</span>
          )}
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0, textAlign: 'center' }}>{member.name}</h2>
          {member.bio && (
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.75, textAlign: 'center', marginTop: 4 }}>{member.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function DepartmentPage({ t }: { t: T; lang?: Lang }) {
  const { slug } = useParams()
  const dept = getDepartments(t).find(d => d.slug === slug)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const accent = DEPT_ACCENTS[slug || ''] || 'linear-gradient(135deg, #40ba21, #166534)'

  if (!dept) return (
    <div className="container">
      <h2>Department not found</h2>
      <Link to="/" className="btn">← Back</Link>
    </div>
  )

  // Разбиваем на leadership и остальных
  const leaders = dept.members.filter(m => m.role && m.role !== 'Intern')
  const regular = dept.members.filter(m => !m.role)
  const interns = dept.members.filter(m => m.role === 'Intern')

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Компактный hero — карточка, не полоса */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px 0' }}>
        <Link to="/" style={{ color: '#40ba21', fontWeight: 600, textDecoration: 'none', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
          ← {t.home}
        </Link>
        <div style={{
          background: accent,
          borderRadius: 24,
          padding: '40px 48px',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 48,
        }}>
          {/* Декор */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -30, right: '20%', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          <div style={{ position: 'relative' }}>
            <span style={{
              display: 'inline-block',
              fontSize: 11, fontWeight: 800, letterSpacing: '2px',
              color: 'rgba(255,255,255,0.75)',
              background: 'rgba(255,255,255,0.15)',
              padding: '4px 12px', borderRadius: 20,
              marginBottom: 16,
            }}>{dept.tag}</span>
            <h1 style={{ color: 'white', fontSize: 40, fontWeight: 900, margin: '0 0 10px', lineHeight: 1.1 }}>{dept.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, maxWidth: 500, lineHeight: 1.6, margin: '0 0 24px' }}>{dept.description}</p>
            <div style={{ display: 'flex', gap: 24 }}>
              <div>
                <span style={{ color: 'white', fontWeight: 900, fontSize: 26, display: 'block', lineHeight: 1 }}>{dept.members.length}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600 }}>MEMBERS</span>
              </div>
              {interns.length > 0 && (
                <div>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: 26, display: 'block', lineHeight: 1 }}>{interns.length}</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600 }}>INTERNS</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Члены */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px 60px' }}>
        {/* Leadership */}
        {leaders.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 13, fontWeight: 800, letterSpacing: '2px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 20 }}>Leadership</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {leaders.map((member, i) => <MemberCard key={i} member={member} slug={slug || ''} onClick={() => setSelectedMember(member)} />)}
            </div>
          </div>
        )}

        {/* Regular members */}
        {regular.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 13, fontWeight: 800, letterSpacing: '2px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 20 }}>{t.members}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
              {regular.map((member, i) => <MemberCard key={i} member={member} slug={slug || ''} onClick={() => setSelectedMember(member)} />)}
            </div>
          </div>
        )}

        {/* Interns */}
        {interns.length > 0 && (
          <div>
            <h2 style={{ fontSize: 13, fontWeight: 800, letterSpacing: '2px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 20 }}>Interns</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
              {interns.map((member, i) => <MemberCard key={i} member={member} slug={slug || ''} onClick={() => setSelectedMember(member)} />)}
            </div>
          </div>
        )}
      </div>

      {selectedMember && <MemberModal member={selectedMember} slug={slug || ''} onClose={() => setSelectedMember(null)} />}
    </div>
  )
}

function MemberAvatar({ photo, originalPhoto, name, size, color, border }: { photo?: string; originalPhoto?: string; name: string; size: number; color: string; border?: string }) {
  const [loaded, setLoaded] = useState(false)
  const fontSize = size * 0.36
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', position: 'relative', flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize, fontWeight: 800,
        border: border || 'none', boxSizing: 'border-box',
        position: 'absolute', inset: 0,
      }}>{name[0]}</div>
      {photo && (
        <img
          src={photo}
          alt={name}
          onLoad={() => setLoaded(true)}
          onError={e => { if (originalPhoto && e.currentTarget.src !== originalPhoto) e.currentTarget.src = originalPhoto; else setLoaded(false) }}
          style={{
            width: size, height: size, borderRadius: '50%', objectFit: 'cover',
            imageOrientation: 'from-image',
            border: border || 'none', boxSizing: 'border-box',
            position: 'absolute', inset: 0,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        />
      )}
    </div>
  )
}

function MemberCard({ member, slug, onClick, avatarSize = 72 }: { member: Member; slug: string; onClick: () => void; avatarSize?: number }) {
  const originalPhoto = member.photo ? getPhoto(member.photo) : undefined
  const photo = originalPhoto ? thumborUrl(originalPhoto, avatarSize * 2, avatarSize * 2) : undefined
  const hasBio = !!member.bio
  const isIntern = member.role === 'Intern'
  const accent = DEPT_ACCENTS[slug] || '#40ba21'
  const avatarColor = isIntern ? '#94a3b8' : (accent.includes('1d4ed8') ? '#1d4ed8' : '#40ba21')

  return (
    <div
      onClick={() => hasBio && onClick()}
      style={{
        background: 'white', borderRadius: 16, padding: '20px 16px',
        border: '1px solid #e2e8f0', textAlign: 'center',
        cursor: hasBio ? 'pointer' : 'default',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}
      onMouseEnter={e => { if (hasBio) { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)' } }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '' }}
    >
      <MemberAvatar photo={photo} originalPhoto={originalPhoto} name={member.name} size={avatarSize} color={avatarColor} border={`2.5px solid ${avatarColor}`} />
      <div>
        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: 14, lineHeight: 1.3, display: 'block' }}>{member.name}</span>
        {member.role && <span style={{ fontSize: 11, color: avatarColor, fontWeight: 700, letterSpacing: '0.5px' }}>{member.role}</span>}
      </div>
      {hasBio && <span style={{ fontSize: 11, color: '#94a3b8' }}>tap to read →</span>}
    </div>
  )
}

function DepartmentCard(props: { slug: string; name: string; tag: string; icon: string; description: string; t: T }) {
  const accent = DEPT_ACCENTS[props.slug] || 'linear-gradient(135deg, #40ba21, #166534)'
  return (
    <Link to={`/departments/${props.slug}`} style={{ textDecoration: 'none', flex: 1, minWidth: 260 }}>
      <div style={{
        background: 'white', borderRadius: 20, overflow: 'hidden',
        border: '1px solid #e2e8f0', height: '100%',
        display: 'flex', flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '' }}
      >
        <div style={{ background: accent, padding: '28px 28px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', top: 20, right: 20, width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 10 }}>{props.tag}</span>
          <h3 style={{ color: 'white', fontSize: 24, fontWeight: 900, margin: 0 }}>{props.name}</h3>
        </div>
        <div style={{ padding: '20px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{props.description}</p>
          <span style={{ color: '#40ba21', fontWeight: 700, fontSize: 14 }}>
            {props.t.dep_core}
          </span>
        </div>
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
      navigate('/su-panel-x7k2')
      setLogoClicks(0)
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-logo" style={{ textDecoration: 'none' }} onClick={handleLogoClick}>
        <img src={suLogo} alt="SU Logo" style={{ width: 36, height: 36, objectFit: 'contain' }} />
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
  { name: "Alena Petrenko", role: "SU:CEO", photo: "./assets/Alena.jpg", bio: "Working as a SU:CEO has its ups and downs, but I enjoy the process of learning and excited to continue creating a better environment for all the students" },
  { name: "Ilya Kachalin", role: "Assistant", photo: "./assets/Ilia.jpg", bio: "heyy! my name is Ilya and I am the Executive Assistant of SU. I am also the guy that enjoys a lot of things: events, photography, editing, writing, documenting, even something as ordinary as talking to people. that is why I am here – to provide as much value as I can within and beyond SU – through actions and vision, through advice and experience, through being by your side." },
]

function HomePage({ t }: { t: T }) {
  const [selectedCeo, setSelectedCeo] = useState<Member | null>(null)
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
        {ceoMembers.map((m, i) => (
          <MemberCard key={i} member={m} slug="su-core" onClick={() => setSelectedCeo(m)} avatarSize={100} />
        ))}
      </div>
      {selectedCeo && <MemberModal member={selectedCeo} slug="su-core" onClose={() => setSelectedCeo(null)} />}
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

function EventPage({ t, lang, events }: { t: T; lang: Lang; events: SuEvent[] }) {
  const { id } = useParams()
  const event = events.find(e => e.id === id)
  const [lightbox, setLightbox] = useState<string | null>(null)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!event) return (
    <div className="container">
      <h2>Event not found</h2>
      <Link to="/events" className="btn">← Back to Events</Link>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 32px 60px' }}>
        <Link to="/events" style={{ color: '#40ba21', fontWeight: 600, textDecoration: 'none', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
          ← {t.events}
        </Link>
        <div style={{ background: 'white', borderRadius: 24, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          {/* Цветная шапка */}
          <div style={{
            background: `linear-gradient(135deg, ${event.color}, ${event.color}bb)`,
            padding: '40px 40px 36px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
              color: 'white', fontWeight: 800, fontSize: 11, letterSpacing: '1.5px',
              padding: '5px 14px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 16,
            }}>
              {event.isActive ? t.upcoming : t.passed}
            </span>
            <h1 style={{ color: 'white', fontSize: 36, fontWeight: 900, margin: '0 0 16px', lineHeight: 1.1 }}>
              {localize(event.name, lang)}
            </h1>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                📅 {event.date}
              </span>
              {event.location && (
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                  📍 {localize(event.location, lang)}
                </span>
              )}
            </div>
          </div>
          {/* Описание */}
          <div style={{ padding: '32px 40px' }}>
            <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.8, margin: 0 }}>{localize(event.description, lang)}</p>
          </div>
          {/* Галерея — только для прошедших ивентов */}
          {!event.isActive && ((event.photoUrls && event.photoUrls.length > 0) || event.galleryUrl) && (
            <div style={{ padding: '0 40px 40px' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
                {lang === 'en' ? 'Photos' : 'Фотографии'}
              </h3>
              {event.photoUrls && event.photoUrls.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
                  {event.photoUrls.map((url, i) => (
                    <img
                      key={i}
                      src={thumborUrl(url, 600, 400)}
                      alt=""
                      onClick={() => setLightbox(url)}
                      style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 12, border: '1px solid #e2e8f0', display: 'block', cursor: 'pointer' }}
                      onError={e => { (e.currentTarget as HTMLImageElement).src = url }}
                    />
                  ))}
                </div>
              )}
              {lightbox && (
                <div
                  onClick={() => setLightbox(null)}
                  style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
                >
                  <img
                    src={lightbox}
                    alt=""
                    onClick={e => e.stopPropagation()}
                    style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 12, objectFit: 'contain' }}
                  />
                  <button
                    onClick={() => setLightbox(null)}
                    style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: 'white', fontSize: 32, cursor: 'pointer', lineHeight: 1 }}
                  >×</button>
                </div>
              )}
              {event.galleryUrl && (
                <a
                  href={event.galleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    color: '#40ba21', fontWeight: 700, fontSize: 14, textDecoration: 'none',
                  }}
                >
                  📷 {lang === 'en' ? 'View all photos →' : 'Все фотографии →'}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EventsPage({ t, lang, events }: { t: T; lang: Lang; events: SuEvent[] }) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'passed'>('all')

  const visibleEvents = events.filter(event => {
    if (filter === 'upcoming') return event.isActive
    if (filter === 'passed') return !event.isActive
    return true
  })

  return (
    <div style={{ width: '100%', padding: '40px 32px', boxSizing: 'border-box' as const }}>
      <style>{`
        .events-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .events-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .events-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>{t.events_title}</h1>
        <p style={{ color: '#64748b', fontSize: 15, margin: 0 }}>{t.events_desc}</p>
      </div>

      <div style={{ display: 'inline-flex', gap: 4, marginBottom: 36, background: '#f1f5f9', padding: '4px', borderRadius: 12 }}>
        {(['all', 'upcoming', 'passed'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '8px 22px', borderRadius: 9, border: 'none', cursor: 'pointer',
            fontWeight: 700, fontSize: 13,
            background: filter === f ? 'white' : 'transparent',
            color: filter === f ? '#0f172a' : '#94a3b8',
            boxShadow: filter === f ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.15s ease',
          }}>
            {f === 'all' ? t.all : f === 'upcoming' ? t.upcoming : t.passed}
          </button>
        ))}
      </div>

      {events.length === 0 && <p style={{ textAlign: 'center', color: '#64748b', marginTop: 32 }}>No events yet.</p>}

      <div className="events-grid">
        {visibleEvents.map((event, index) => (
          <Link key={index} to={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: 20, overflow: 'hidden',
              border: '1px solid #e8edf2', height: '100%', display: 'flex', flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '' }}
            >
              <div style={{
                background: `linear-gradient(160deg, ${event.color}ee 0%, ${event.color}88 100%)`,
                padding: '22px 22px 22px',
                minHeight: 200,
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                <div style={{ position: 'absolute', bottom: -25, right: 30, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

                <span style={{
                  alignSelf: 'flex-start',
                  background: event.isActive ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(6px)',
                  color: 'white', fontWeight: 800, fontSize: 10,
                  letterSpacing: '1.5px', padding: '5px 13px', borderRadius: 20,
                  textTransform: 'uppercase',
                }}>
                  {event.isActive ? t.upcoming : t.passed}
                </span>

                <h3 style={{ color: 'white', fontSize: 22, fontWeight: 900, margin: 0, lineHeight: 1.2, position: 'relative' }}>
                  {localize(event.name, lang)}
                </h3>
              </div>

              <div style={{ padding: '16px 22px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#475569', fontSize: 13 }}>
                    <span style={{ width: 20, height: 20, background: '#f1f5f9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>📅</span>
                    {event.date}
                  </div>
                  {event.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#475569', fontSize: 13 }}>
                      <span style={{ width: 20, height: 20, background: '#f1f5f9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>📍</span>
                      {localize(event.location, lang)}
                    </div>
                  )}
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#40ba21', fontWeight: 700, fontSize: 13 }}>
                  {lang === 'en' ? 'Details' : 'Подробнее'} →
                </span>
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

function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', padding: 32 }}>
      <div style={{ fontSize: 80, fontWeight: 800, color: '#40ba21', lineHeight: 1 }}>404</div>
      <div style={{ fontSize: 22, fontWeight: 600 }}>Page not found</div>
      <div style={{ color: '#6b7280', fontSize: 15 }}>The page you're looking for doesn't exist.</div>
      <button className="btn" onClick={() => navigate('/')} style={{ marginTop: 8 }}>Back to Home</button>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={suLogo} alt="SU Logo" style={{ width: 36, height: 36, objectFit: 'contain' }} />
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
  const [events, setEvents] = useState<SuEvent[]>([])
  const t = translations[lang]

  useEffect(() => {
    // загружаем сразу при монтировании, а потом периодически перезапрашиваем,
    // чтобы isActive пересчитывался заново и событие, у которого кончился дедлайн,
    // само переехало в «Прошедшие», без обновления страницы вручную.
    const loadEvents = () => {
      fetch(`${API_URL}/events`)
        .then(r => r.ok ? r.json() : null)
        .then((data: BackendEvent[] | null) => {
          if (data) setEvents(data.map(mapBackendEvent))
        })
        .catch(() => {})
    }

    loadEvents()
    const intervalId = setInterval(loadEvents, 60_000) // каждую минуту пересчитываем, кто сейчас актуален, а кто уже прошел
    window.addEventListener('admin-events-changed', loadEvents)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('admin-events-changed', loadEvents)
    }
  }, [])

  return (
    <BrowserRouter>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Routes>
        <Route path="/departments/:slug" element={<DepartmentPage t={t} lang={lang} />} />
        <Route path="/events/:id" element={<EventPage t={t} lang={lang} events={events} />} />
        <Route path="/history" element={<HistoryPage t={t} lang={lang} />} />
        <Route path="/" element={<HomePage t={t} />} />
        <Route path="/events" element={<EventsPage t={t} lang={lang} events={events} />} />
        <Route path="/polls" element={<PollsPage t={t} lang={lang} />} />
        <Route path="/polls/:id" element={<PollDetailPage t={t} lang={lang} />} />
        <Route path="/donations" element={<DonationsPage t={t} />} />
        <Route path="/su-panel-x7k2" element={<AdminPage lang={lang} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App