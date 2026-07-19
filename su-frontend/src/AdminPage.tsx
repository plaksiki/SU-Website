import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react'

const API_URL = 'http://10.93.26.192:8080'
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

// Бэкенд хранит даты как LocalDateTime — «стенные» часы без таймзоны
// ("2026-07-19T15:30:00"). Значение <input type="datetime-local"> уже в этом
// формате, поэтому его нельзя гонять через Date/toISOString(): это переводит
// время в UTC и сдвигает дату на offset таймзоны (в MSK — на 3 часа назад).
// Отдаём строку как есть, добивая секунды.
const toLocalDateTime = (value: string): string | null => {
  if (!value) return null
  return value.length === 16 ? `${value}:00` : value
}

// Текущий момент в том же формате (локальные часы, без Z).
const nowAsLocalDateTime = (): string => {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

type QuestionType = 'open_text' | 'single_choice' | 'multiple_choice'
type Lang = 'en' | 'ru'

interface SuEvent {
  id: string
  title: string
  date: string
  eventTime?: string
  finishedAt?: string
  location: string
  description: string
  photoUrls?: string
  galleryUrl?: string
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
  startedAt?: string
  finishedAt?: string
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
    event_photos_placeholder: 'Photo URLs (one per line)',
    event_photos_hint: 'Paste photo URLs here — one per line. They will appear as a gallery on the event page.',
    event_gallery_placeholder: 'Link to full photo album (e.g. Yandex Disk)',
    edit: 'Edit',
    save: 'Save changes',
    edit_event: 'Edit Event',
    edit_questionnaire: 'Edit Questionnaire',
    cancel: 'Cancel',
    event_list: 'Events',
    no_events: 'No events yet.',
    confirm_delete_event: 'Delete this event?',
    create_questionnaire: 'Create Questionnaire',
    q_title_placeholder: 'Questionnaire title (RU | EN)',
    q_desc_placeholder: 'Questionnaire description (RU | EN)',
    bilingual_hint: 'For bilingual support use format: Русский текст | English text',
    add_question_label: 'New question',
    question_text_placeholder: 'Question text (RU | EN)',
    type_open: 'Open answer',
    type_single: 'Single choice',
    type_multiple: 'Multiple choice',
    options_placeholder: 'Options separated by commas: Yes, No, Maybe',
    add_question_btn: '+ Add this question to the list above',
    questions_in_draft: 'Questions in this questionnaire',
    no_draft_questions: 'No questions added yet — build the first one below, it will appear here.',
    delete: 'Delete',
    create_q_btn: 'Create questionnaire',
    questionnaires_list: 'Questionnaires',
    q_position_label: '#',
    no_questionnaires: 'No questionnaires yet.',
    confirm_delete: 'Delete this questionnaire?',
    export_btn: 'Export all to CSV',
    export_one_btn: 'Export CSV',
    exporting: 'Exporting…',
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
    event_photos_placeholder: 'Ссылки на фото (по одной на строку)',
    event_photos_hint: 'Вставьте ссылки на фото — по одной на строку. Они покажутся галереей на странице ивента.',
    event_gallery_placeholder: 'Ссылка на полный альбом (например, Яндекс Диск)',
    edit: 'Редактировать',
    save: 'Сохранить',
    edit_event: 'Редактировать событие',
    edit_questionnaire: 'Редактировать опросник',
    cancel: 'Отмена',
    event_list: 'Список событий',
    no_events: 'Событий пока нет.',
    confirm_delete_event: 'Удалить это событие?',
    create_questionnaire: 'Создать опросник',
    q_title_placeholder: 'Название опросника (РУ | EN)',
    q_desc_placeholder: 'Описание опросника (РУ | EN)',
    bilingual_hint: 'Для двуязычности используйте формат: Русский текст | English text',
    add_question_label: 'Новый вопрос',
    question_text_placeholder: 'Текст вопроса (РУ | EN)',
    type_open: 'Развёрнутый ответ',
    type_single: 'Один вариант',
    type_multiple: 'Несколько вариантов',
    options_placeholder: 'Варианты через запятую: Да, Нет, Может быть',
    add_question_btn: '+ Добавить этот вопрос в список выше',
    questions_in_draft: 'Вопросы в этом опроснике',
    no_draft_questions: 'Пока нет ни одного вопроса — соберите первый ниже, он появится здесь.',
    delete: 'Удалить',
    create_q_btn: 'Создать опросник',
    questionnaires_list: 'Опросники',
    q_position_label: '№',
    no_questionnaires: 'Опросников пока нет.',
    confirm_delete: 'Удалить опросник?',
    export_btn: 'Экспорт всех в CSV',
    export_one_btn: 'Скачать CSV',
    exporting: 'Экспортируем…',
    form_error_fields: 'Пожалуйста, заполните все обязательные поля',
    form_error_questions: 'Добавьте хотя бы один вопрос',
    form_error_q_fields: 'Заполните название и описание опросника',
    fetch_error: 'Не удалось загрузить данные с сервера',
  },
}

// ============================================================================
// CSV EXPORT (общие хелперы + экспорт всех / экспорт одного опросника)
// ============================================================================

type ApiQuestion = { id: number; text: string; questionType: string }
type ApiOption = { id: number; text: string }
type ApiAnswer = { responseId: number; questionId: number; optionId: number | null; textAnswer?: string }
type ApiResponse = { id: number; questionnaireId: number }

// Строит CSV-строки (заголовок опросника + шапка + ответы) для ОДНОГО опросника.
// Используется и полным экспортом (для каждого опросника по очереди),
// и точечным экспортом одного опросника — поэтому вынесено отдельно,
// чтобы не дублировать логику сопоставления ответов/вариантов.
const buildCsvRowsForQuestionnaire = (
  title: string,
  questions: ApiQuestion[],
  responses: ApiResponse[],
  answers: ApiAnswer[],
  optionsMap: Record<number, ApiOption[]>
): string[] => {
  const rows: string[] = []
  rows.push(`"${title}"`)
  rows.push(['Ответ #', ...questions.map(q => `"${q.text}"`)].join(';'))

  responses.forEach((response, idx) => {
    const responseAnswers = answers.filter(a => a.responseId === response.id)
    const rowCells = [
      `${idx + 1}`,
      ...questions.map(q => {
        const ans = responseAnswers.find(a => a.questionId === q.id)
        if (!ans) return '""'
        const allAnswersForQ = responseAnswers.filter(a => a.questionId === q.id && a.optionId)
        if (allAnswersForQ.length > 1) {
          const opts = optionsMap[q.id] || []
          const texts = allAnswersForQ.map(a => {
            const o = opts.find(opt => opt.id === a.optionId)
            return o ? o.text : a.optionId
          })
          return `"${texts.join(', ')}"`
        }
        if (ans.optionId) {
          const opts = optionsMap[q.id] || []
          const option = opts.find(o => o.id === ans.optionId)
          return `"${option ? option.text : ans.optionId}"`
        }
        return `"${ans.textAnswer || ''}"`
      }),
    ]
    rows.push(rowCells.join(';'))
  })

  return rows
}

// Скачивает готовые CSV-строки как файл (BOM в начале нужен, чтобы Excel
// правильно определил UTF-8 и не показывал кракозябры с кириллицей).
const downloadCsv = (rows: string[], filename: string) => {
  const csv = rows.join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

// Экспорт ВСЕХ опросников разом (как было раньше, просто переиспользует хелперы выше)
const exportToCSV = async (fetchErrorMsg: string) => {
  try {
    const [questionnaires, answers, responses] = await Promise.all([
      fetch(`${API_URL}/questionnaires`).then(r => r.json()),
      fetch(`${API_URL}/answers`).then(r => r.json()),
      fetch(`${API_URL}/responses`).then(r => r.json()),
    ])

    const questionsMap: Record<number, ApiQuestion[]> = {}
    const optionsMap: Record<number, ApiOption[]> = {}

    await Promise.all(
      questionnaires.map(async (q: { id: number }) => {
        const qs = await fetch(`${API_URL}/question/by-questionnaire/${q.id}`).then(r => r.json())
        questionsMap[q.id] = qs
        await Promise.all(
          qs.map(async (question: ApiQuestion) => {
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
        (r: ApiResponse) => r.questionnaireId === questionnaire.id
      )
      const questionnaireQuestions = questionsMap[questionnaire.id] || []
      if (questionnaireResponses.length === 0) continue

      rows.push('')
      rows.push(
        ...buildCsvRowsForQuestionnaire(
          questionnaire.title,
          questionnaireQuestions,
          questionnaireResponses,
          answers,
          optionsMap
        )
      )
    }

    downloadCsv(rows, 'answers.csv')
  } catch {
    alert(fetchErrorMsg)
  }
}

// Экспорт результатов ОДНОГО опросника по его id.
// Опросник и его вопросы берём точечно (GET /questionnaire/{id} и
// /question/by-questionnaire/{id}), а ответы/варианты фильтруем на фронте,
// т.к. backend пока не отдаёт их списком с фильтром по questionnaireId.
const exportQuestionnaireToCSV = async (
  questionnaireId: string,
  fallbackTitle: string,
  fetchErrorMsg: string
) => {
  try {
    const [questionnaire, questions, answers, responses] = await Promise.all([
      fetch(`${API_URL}/questionnaire/${questionnaireId}`).then(r => r.json()),
      fetch(`${API_URL}/question/by-questionnaire/${questionnaireId}`).then(r => r.json()),
      fetch(`${API_URL}/answers`).then(r => r.json()),
      fetch(`${API_URL}/responses`).then(r => r.json()),
    ])

    const optionsMap: Record<number, ApiOption[]> = {}
    await Promise.all(
      questions.map(async (question: ApiQuestion) => {
        if (question.questionType !== 'open_text') {
          const opts = await fetch(`${API_URL}/options/by-question/${question.id}`).then(r => r.json())
          optionsMap[question.id] = opts
        }
      })
    )

    const questionnaireResponses = responses.filter(
      (r: ApiResponse) => r.questionnaireId === questionnaire.id
    )

    const rows = buildCsvRowsForQuestionnaire(
      questionnaire.title || fallbackTitle,
      questions,
      questionnaireResponses,
      answers,
      optionsMap
    )

    const safeTitle = (questionnaire.title || fallbackTitle || 'questionnaire')
      .replace(/[^\p{L}\p{N}_-]+/gu, '_')
      .slice(0, 60)
    downloadCsv(rows, `${safeTitle}_${questionnaireId}.csv`)
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
.admin-btn-outline {
  width: 100%;
  padding: 12px 20px;
  border-radius: 14px;
  border: 1.5px dashed #40ba21;
  background: white;
  color: #40ba21;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: background .15s ease;
}
.admin-btn-outline:hover { background: rgba(64,186,33,0.06); }
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

// Сортировка опросников по дате создания: самый новый — первым.
// Берём startedAt (проставляется при создании), а если его нет —
// падаем на числовой id (у свежесозданных локальных это Date.now(), т.е. тоже «свежесть»).
const questionnaireSortKey = (q: Questionnaire) =>
  q.startedAt ? new Date(q.startedAt).getTime() : Number(q.id) || 0
const sortQuestionnaires = (list: Questionnaire[]) =>
  [...list].sort((a, b) => questionnaireSortKey(b) - questionnaireSortKey(a))

// Поле выбора даты-времени: своя иконка слева, нативная иконка браузера справа
// скрыта через обрезку контейнера (см. .dt-field в index.css). Клик по иконке
// слева (левые ~40px) открывает нативный календарь через showPicker().
function DateTimeField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const offsetX = e.clientX - e.currentTarget.getBoundingClientRect().left
    const el = ref.current
    if (offsetX <= 40 && el && typeof el.showPicker === 'function') el.showPicker()
  }
  return (
    <div className="dt-field" onClick={handleClick}>
      <input
        ref={ref}
        type="datetime-local"
        value={value}
        onChange={e => onChange(e.target.value)}
        max="9999-12-31T23:59"
      />
    </div>
  )
}

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
    try { return sortQuestionnaires(JSON.parse(localStorage.getItem('admin_questionnaires') || '[]')) } catch { return [] }
  })

  // Event create form
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newFinishedAt, setNewFinishedAt] = useState('')
  const [newPhotoUrls, setNewPhotoUrls] = useState('')
  const [newPhotoFiles, setNewPhotoFiles] = useState<File[]>([])
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  const [newGalleryUrl, setNewGalleryUrl] = useState('')
  const [eventFormError, setEventFormError] = useState('')

  // Edit event state
  const [editingEvent, setEditingEvent] = useState<SuEvent | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editFinishedAt, setEditFinishedAt] = useState('')
  const [editPhotoUrls, setEditPhotoUrls] = useState('')
  const [editGalleryUrl, setEditGalleryUrl] = useState('')

  // Edit questionnaire state
  const [editingQuestionnaire, setEditingQuestionnaire] = useState<Questionnaire | null>(null)
  const [editQTitle, setEditQTitle] = useState('')
  const [editQDescription, setEditQDescription] = useState('')
  const [editQQuestions, setEditQQuestions] = useState<Question[]>([])
  const [editQStartedAt, setEditQStartedAt] = useState('')
  const [editQFinishedAt, setEditQFinishedAt] = useState('')
  const [editQNewText, setEditQNewText] = useState('')
  const [editQNewType, setEditQNewType] = useState<QuestionType>('open_text')
  const [editQNewOptions, setEditQNewOptions] = useState('')
  const [editQEditingId, setEditQEditingId] = useState<string | null>(null)
  const [editQEditText, setEditQEditText] = useState('')
  const [editQEditType, setEditQEditType] = useState<QuestionType>('open_text')
  const [editQEditOptions, setEditQEditOptions] = useState('')

  // Questionnaire create form
  const [qTitle, setQTitle] = useState('')
  const [qDescription, setQDescription] = useState('')
  const [qStartedAt, setQStartedAt] = useState('')
  const [qFinishedAt, setQFinishedAt] = useState('')
  const [draftQuestions, setDraftQuestions] = useState<Question[]>([])
  const [questionText, setQuestionText] = useState('')
  const [questionType, setQuestionType] = useState<QuestionType>('open_text')
  const [optionsInput, setOptionsInput] = useState('')
  const [qFormError, setQFormError] = useState('')

  // id опросника, который сейчас экспортируется (чтобы показать "…" на кнопке
  // и не дать нажать её повторно, пока идёт запрос к бэку)
  const [exportingId, setExportingId] = useState<string | null>(null)

  const handleExportQuestionnaire = async (qn: Questionnaire) => {
    if (exportingId) return
    setExportingId(qn.id)
    try {
      await exportQuestionnaireToCSV(qn.id, qn.title, t.fetch_error)
    } finally {
      setExportingId(null)
    }
  }

  const saveEvents = (list: SuEvent[]) => {
    setEvents(list)
    localStorage.setItem('admin_events', JSON.stringify(list))
    onEventsChange?.(list)
  }

  const saveQuestionnaires = (list: Questionnaire[]) => {
    const sorted = sortQuestionnaires(list)
    setQuestionnaires(sorted)
    localStorage.setItem('admin_questionnaires', JSON.stringify(sorted))
  }

  // Функциональный вариант: нужен там, где новое значение зависит от текущего
  // списка, а тот мог измениться, пока шли фоновые запросы к серверу.
  const updateQuestionnaires = (fn: (prev: Questionnaire[]) => Questionnaire[]) => {
    setQuestionnaires(prev => {
      const sorted = sortQuestionnaires(fn(prev))
      localStorage.setItem('admin_questionnaires', JSON.stringify(sorted))
      return sorted
    })
  }

  const refreshEvents = () => {
    fetch(`${API_URL}/events`)
      .then(r => r.json())
      .then((data: { id: number; title: string; description: string; eventTime: string; finishedAt?: string; eventLocation: string }[]) => {
        const mapped = data.map(e => ({
          id: e.id.toString(),
          title: e.title,
          date: e.eventTime ? e.eventTime.split('T')[0] : '',
          eventTime: e.eventTime ?? undefined,
          finishedAt: e.finishedAt ?? undefined,
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
      .then((data: { id: number; title: string; description: string; startedAt?: string; finishedAt?: string }[]) =>
        updateQuestionnaires(prev =>
          data.map(q => ({
            id: q.id.toString(),
            title: q.title,
            description: q.description,
            startedAt: q.startedAt,
            finishedAt: q.finishedAt,
            // Сервер не отдаёт вопросы вместе с опросником; сохраняем уже
            // известные локально, чтобы не затирать кэш пустым списком.
            questions: prev.find(x => x.id === q.id.toString())?.questions ?? [],
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
      eventTime: newDate,
      finishedAt: newFinishedAt || undefined,
      location: newLocation,
      description: newDescription,
      photoUrls: newPhotoUrls.trim() || undefined,
      galleryUrl: newGalleryUrl.trim() || undefined,
    }

    // Обновляем UI сразу, не ждём сервер
    saveEvents([localEvent, ...events])
    const filesToUpload = [...newPhotoFiles]
    setNewTitle('')
    setNewDate('')
    setNewLocation('')
    setNewDescription('')
    setNewFinishedAt('')
    setNewPhotoUrls('')
    setNewPhotoFiles([])
    setNewGalleryUrl('')
    setView('event_list')

    // Сохраняем данные для использования после создания
    const eventData = {
      title: newTitle,
      description: newDescription,
      eventTime: toLocalDateTime(newDate),
      eventLocation: newLocation,
      finishedAt: toLocalDateTime(newFinishedAt),
      galleryUrl: newGalleryUrl || null,
    }

    // Отправляем на сервер в фоне
    fetch(`${API_URL}/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...eventData, photoUrls: null }),
    })
      .then(r => r.json())
      .then(async created => {
        if (filesToUpload.length > 0) {
          const urls = await uploadPhotosToEvent(String(created.id), filesToUpload)
          if (urls.length > 0) {
            await fetch(`${API_URL}/event/${created.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...eventData, photoUrls: urls.join('\n') }),
            })
          }
        }
        refreshEvents()
      })
      .catch(() => {})
  }

  const uploadPhotosToEvent = async (eventId: string, files: File[]): Promise<string[]> => {
    if (files.length === 0) return []
    const formData = new FormData()
    files.forEach(f => formData.append('files', f))
    const res = await fetch(`${API_URL}/event/${eventId}/photos`, { method: 'POST', body: formData })
    if (!res.ok) return []
    return res.json()
  }

  const handleDeleteEvent = (id: string) => {
    if (!confirm(t.confirm_delete_event)) return
    saveEvents(events.filter(e => e.id !== id))
    fetch(`${API_URL}/event/${id}`, { method: 'DELETE' }).catch(() => {})
  }

  const handleStartEditQ = async (qn: Questionnaire) => {
    setEditingQuestionnaire(qn)
    setEditQTitle(qn.title)
    setEditQDescription(qn.description)
    setEditQStartedAt(qn.startedAt ? qn.startedAt.slice(0, 16) : '')
    setEditQFinishedAt(qn.finishedAt ? qn.finishedAt.slice(0, 16) : '')
    setEditQNewText('')
    setEditQNewType('open_text')
    setEditQNewOptions('')

    // Сначала показываем из localStorage если есть
    setEditQQuestions([...qn.questions])

    // Затем подгружаем с бэкенда
    try {
      const qs: { id: number; text: string; questionType: string }[] = await fetch(`${API_URL}/question/by-questionnaire/${qn.id}`).then(r => r.json())
      const sorted = qs.sort((a, b) => a.id - b.id)
      const questions: Question[] = await Promise.all(sorted.map(async q => {
        let options: string[] = []
        if (q.questionType !== 'open_text') {
          const opts: { text: string }[] = await fetch(`${API_URL}/options/by-question/${q.id}`).then(r => r.json())
          options = opts.map(o => o.text)
        }
        return { id: String(q.id), text: q.text, type: q.questionType as QuestionType, options }
      }))
      setEditQQuestions(questions)
    } catch { /* keep localStorage version */ }
  }

  const handleEditQAddQuestion = () => {
    if (!editQNewText.trim()) return
    const newQ: Question = {
      id: Date.now().toString(),
      text: editQNewText.trim(),
      type: editQNewType,
      options: editQNewType !== 'open_text' ? editQNewOptions.split(',').map(s => s.trim()).filter(Boolean) : [],
    }
    setEditQQuestions(prev => [...prev, newQ])
    setEditQNewText('')
    setEditQNewOptions('')
  }

  const handleEditQRemoveQuestion = (id: string) => {
    setEditQQuestions(prev => prev.filter(q => q.id !== id))
    if (editQEditingId === id) setEditQEditingId(null)
  }

  const handleEditQStartEdit = (q: Question) => {
    setEditQEditingId(q.id)
    setEditQEditText(q.text)
    setEditQEditType(q.type)
    setEditQEditOptions(q.options.join(', '))
  }

  const handleEditQSaveQuestion = (id: string) => {
    setEditQQuestions(prev => prev.map(q => q.id === id
      ? { ...q, text: editQEditText, type: editQEditType, options: editQEditType !== 'open_text' ? editQEditOptions.split(',').map(s => s.trim()).filter(Boolean) : [] }
      : q
    ))
    setEditQEditingId(null)
  }

  const handleSaveEditQ = async () => {
    if (!editingQuestionnaire) return
    const updated = { ...editingQuestionnaire, title: editQTitle, description: editQDescription, questions: editQQuestions, startedAt: editQStartedAt || editingQuestionnaire.startedAt, finishedAt: editQFinishedAt || undefined }
    saveQuestionnaires(questionnaires.map(q => q.id === editingQuestionnaire.id ? updated : q))
    setEditingQuestionnaire(null)

    // Сохраняем на бэкенд
    try {
      await fetch(`${API_URL}/questionnaire/${editingQuestionnaire.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editQTitle,
          description: editQDescription,
          startedAt: toLocalDateTime(editQStartedAt),
          finishedAt: toLocalDateTime(editQFinishedAt),
        }),
      })

      // Обновляем каждый существующий вопрос (у которого id — числовой, т.е. пришёл с бэкенда)
      await Promise.all(editQQuestions.map(async (q, i) => {
        const numId = Number(q.id)
        if (!isNaN(numId) && numId > 1000000000) return // временный id от Date.now() — пропускаем
        if (!isNaN(numId)) {
          await fetch(`${API_URL}/question/${numId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: q.text, questionType: q.type, questionnaireId: Number(editingQuestionnaire.id), orderIndex: i + 1 }),
          })
          // Обновляем options для вопросов с вариантами
          if (q.type !== 'open_text' && q.options.length > 0) {
            const existingOpts: { id: number; text: string }[] = await fetch(`${API_URL}/options/by-question/${numId}`).then(r => r.json()).catch(() => [])
            await Promise.all(q.options.map(async (text, j) => {
              if (existingOpts[j]) {
                await fetch(`${API_URL}/option/${existingOpts[j].id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ text, questionId: numId, orderIndex: j + 1 }),
                })
              } else {
                await fetch(`${API_URL}/options`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ text, questionId: numId, orderIndex: j + 1 }),
                })
              }
            }))
          }
        }
      }))
    } catch { /* локальное сохранение уже выполнено */ }
  }

  const handleEditPhotoUpload = async (files: FileList | null) => {
    if (!files || !editingEvent) return
    setUploadingPhotos(true)
    const urls = await uploadPhotosToEvent(editingEvent.id, Array.from(files))
    if (urls.length > 0) {
      const current = editPhotoUrls.trim()
      setEditPhotoUrls(current ? `${current}\n${urls.join('\n')}` : urls.join('\n'))
    }
    setUploadingPhotos(false)
  }

  const handleDeleteEditPhoto = async (url: string) => {
    if (!editingEvent) return
    await fetch(`${API_URL}/event/${editingEvent.id}/photos?url=${encodeURIComponent(url)}`, { method: 'DELETE' })
    setEditPhotoUrls(editPhotoUrls.split('\n').filter(u => u.trim() !== url).join('\n'))
  }

  const handleStartEdit = (event: SuEvent) => {
    setEditingEvent(event)
    setEditTitle(event.title)
    setEditLocation(event.location)
    setEditDescription(event.description)
    setEditDate(event.eventTime ? event.eventTime.slice(0, 16) : (event.date ? `${event.date}T00:00` : ''))
    setEditFinishedAt(event.finishedAt ? event.finishedAt.slice(0, 16) : '')
    setEditPhotoUrls(event.photoUrls || '')
    setEditGalleryUrl(event.galleryUrl || '')
  }

  const handleSaveEdit = () => {
    if (!editingEvent) return
    const updated: SuEvent = {
      ...editingEvent,
      title: editTitle,
      location: editLocation,
      description: editDescription,
      date: editDate ? editDate.split('T')[0] : editingEvent.date,
      // Сохраняем и полную дату-время начала — иначе при повторном Edit
      // время подтягивалось из устаревшего eventTime и «сбрасывалось».
      eventTime: editDate || editingEvent.eventTime,
      photoUrls: editPhotoUrls.trim() || undefined,
      galleryUrl: editGalleryUrl.trim() || undefined,
    }
    saveEvents(events.map(e => e.id === updated.id ? updated : e))
    fetch(`${API_URL}/event/${editingEvent.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        eventTime: toLocalDateTime(editDate),
        eventLocation: editLocation,
        finishedAt: toLocalDateTime(editFinishedAt),
        photoUrls: editPhotoUrls.trim() || null,
        galleryUrl: editGalleryUrl.trim() || null,
      }),
    }).catch(() => {})
    setEditingEvent(null)
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
    // Даты держим в том же «стенном» формате, что и бэкенд, — иначе список
    // после создания покажет время, сдвинутое на offset таймзоны.
    const startedAt = toLocalDateTime(qStartedAt) ?? nowAsLocalDateTime()
    const finishedAt = toLocalDateTime(qFinishedAt)
    const snapshot = { title: qTitle, description: qDescription, questions: [...draftQuestions] }

    // Обновляем UI сразу. finishedAt обязательно кладём в локальную запись:
    // без него дата окончания «пропадала» до следующей перезагрузки админки.
    saveQuestionnaires([
      { id: localId, startedAt, finishedAt: finishedAt ?? undefined, ...snapshot },
      ...questionnaires,
    ])
    setQTitle('')
    setQDescription('')
    setQStartedAt('')
    setQFinishedAt('')
    setDraftQuestions([])
    setView('q_list')

    // Отправляем на сервер в фоне
    fetch(`${API_URL}/questionnaire`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: snapshot.title,
        description: snapshot.description,
        startedAt,
        finishedAt,
      }),
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(created => {
        // Меняем временный id (Date.now()) на настоящий сразу, как узнали его:
        // по нему строятся ссылки публичной страницы и запросы на редактирование.
        updateQuestionnaires(prev =>
          prev.map(q => q.id === localId ? { ...q, id: String(created.id) } : q)
        )
        return Promise.all(
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
      })
      // Подтягиваем сохранённую версию с сервера, чтобы список показывал
      // именно то, что лежит в БД (а не оптимистичный локальный снимок).
      .then(() => refreshQuestionnaires())
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
          <DateTimeField value={newDate} onChange={setNewDate} />
          <p className="admin-field-label">{t.event_photos_placeholder}</p>
          <input type="file" accept="image/*" multiple className="admin-input" onChange={e => setNewPhotoFiles(Array.from(e.target.files || []))} style={{ padding: 8 }} />
          {newPhotoFiles.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              {newPhotoFiles.map((f, i) => (
                <img key={i} src={URL.createObjectURL(f)} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
              ))}
            </div>
          )}
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
          {/* Edit modal */}
          {editingEvent && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
              <div style={{ background: 'white', borderRadius: 24, padding: 32, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}>
                <h3 style={{ marginBottom: 16 }}>{t.edit_event}</h3>
                <p className="admin-hint">{t.event_bilingual_hint}</p>
                <input type="text" className="admin-input" value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder={t.event_title_placeholder} />
                <input type="text" className="admin-input" value={editLocation} onChange={e => setEditLocation(e.target.value)} placeholder={t.event_location_placeholder} />
                <textarea className="admin-input" value={editDescription} onChange={e => setEditDescription(e.target.value)} placeholder={t.event_description_placeholder} rows={3} style={{ resize: 'vertical' }} />
                <p className="admin-field-label">{t.event_start_date}</p>
                <DateTimeField value={editDate} onChange={setEditDate} />
                <p className="admin-field-label">{t.event_photos_placeholder}</p>
                {editPhotoUrls && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                    {editPhotoUrls.split('\n').filter(u => u.trim()).map((url, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img src={url.trim()} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                        <button onClick={() => handleDeleteEditPhoto(url.trim())} style={{ position: 'absolute', top: -6, right: -6, background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12, lineHeight: '20px', padding: 0 }}>×</button>
                      </div>
                    ))}
                  </div>
                )}
                <input type="file" accept="image/*" multiple className="admin-input" onChange={e => handleEditPhotoUpload(e.target.files)} disabled={uploadingPhotos} style={{ padding: 8 }} />
                {uploadingPhotos && <p className="admin-hint">Uploading...</p>}
                <input type="text" className="admin-input" value={editGalleryUrl} onChange={e => setEditGalleryUrl(e.target.value)} placeholder={t.event_gallery_placeholder} />
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn" onClick={handleSaveEdit} style={{ flex: 1 }}>{t.save}</button>
                  <button className="admin-nav-btn" onClick={() => setEditingEvent(null)} style={{ flex: 1 }}>{t.cancel}</button>
                </div>
              </div>
            </div>
          )}

          <div className="admin-list-grid">
            {events.map((event, index) => (
              <div key={event.id} className="admin-list-card">
                <strong>{index + 1}. {event.title}</strong>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
                  {event.date}{event.location && ` · ${event.location}`}
                </p>
                {event.description && <p style={{ fontSize: 14, margin: 0 }}>{event.description}</p>}
                <div className="admin-list-card-actions">
                  <button className="admin-link-btn" style={{ color: '#40ba21' }} onClick={() => handleStartEdit(event)}>
                    {t.edit}
                  </button>
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
          <p className="admin-field-label">{t.event_start_date}</p>
          <DateTimeField value={qStartedAt} onChange={setQStartedAt} />
          <p className="admin-field-label">{t.event_end_date}</p>
          <DateTimeField value={qFinishedAt} onChange={setQFinishedAt} />

          {/* Список вопросов, которые УЖЕ войдут в опросник — показываем его первым и всегда,
              чтобы было наглядно видно: то, что ты добавляешь ниже, попадает именно сюда,
              а не создаёт отдельный опросник. */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              {t.questions_in_draft} ({draftQuestions.length})
            </p>
            {draftQuestions.length === 0 && (
              <p className="admin-hint" style={{ margin: 0 }}>{t.no_draft_questions}</p>
            )}
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
              className="admin-btn-outline"
              onClick={handleAddQuestion}
            >
              {t.add_question_btn}
            </button>
          </div>

          <button className="btn" onClick={handleCreateQuestionnaire} style={{ width: '100%' }}>
            {t.create_q_btn}
          </button>
          {qFormError && <p className="admin-error">{qFormError}</p>}
        </div>
      )}

      {/* QUESTIONNAIRES LIST */}
      {view === 'q_list' && (
        <div>
          {/* Edit questionnaire modal */}
          {editingQuestionnaire && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
              <div style={{ background: 'white', borderRadius: 24, padding: 32, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
                <h3 style={{ marginBottom: 16 }}>{t.edit_questionnaire}</h3>
                <p className="admin-hint">{t.bilingual_hint}</p>
                <input type="text" className="admin-input" value={editQTitle} onChange={e => setEditQTitle(e.target.value)} placeholder={t.q_title_placeholder} />
                <textarea className="admin-input" value={editQDescription} onChange={e => setEditQDescription(e.target.value)} placeholder={t.q_desc_placeholder} rows={2} style={{ resize: 'vertical' }} />
                <p className="admin-field-label">{t.event_start_date}</p>
                <DateTimeField value={editQStartedAt} onChange={setEditQStartedAt} />
                <p className="admin-field-label">{t.event_end_date}</p>
                <DateTimeField value={editQFinishedAt} onChange={setEditQFinishedAt} />

                {/* Existing questions */}
                <p style={{ fontSize: 13, fontWeight: 600, margin: '16px 0 8px' }}>{t.questions_in_draft} ({editQQuestions.length})</p>
                {editQQuestions.length === 0 && <p className="admin-hint">{t.no_draft_questions}</p>}
                {editQQuestions.map((q, index) => (
                  <div key={q.id} style={{ padding: 12, border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 8 }}>
                    {editQEditingId === q.id ? (
                      <div>
                        <input type="text" className="admin-input" value={editQEditText} onChange={e => setEditQEditText(e.target.value)} />
                        <select value={editQEditType} onChange={e => setEditQEditType(e.target.value as QuestionType)} className="admin-input">
                          <option value="open_text">{t.type_open}</option>
                          <option value="single_choice">{t.type_single}</option>
                          <option value="multiple_choice">{t.type_multiple}</option>
                        </select>
                        {editQEditType !== 'open_text' && (
                          <input type="text" className="admin-input" value={editQEditOptions} onChange={e => setEditQEditOptions(e.target.value)} placeholder={t.options_placeholder} />
                        )}
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button type="button" className="admin-link-btn" style={{ color: '#40ba21' }} onClick={() => handleEditQSaveQuestion(q.id)}>{t.save}</button>
                          <button type="button" className="admin-link-btn" style={{ color: '#94a3b8' }} onClick={() => setEditQEditingId(null)}>{t.cancel}</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 14, flex: 1 }}>
                          {index + 1}. {q.text}
                          <span style={{ color: '#94a3b8' }}> — {typeLabel(q.type)}</span>
                        </span>
                        <button type="button" className="admin-link-btn" style={{ color: '#40ba21' }} onClick={() => handleEditQStartEdit(q)}>{t.edit}</button>
                        <button type="button" className="admin-link-btn" style={{ color: '#dc2626' }} onClick={() => handleEditQRemoveQuestion(q.id)}>{t.delete}</button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add new question */}
                <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, margin: '12px 0 16px' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t.add_question_label}</p>
                  <input type="text" className="admin-input" value={editQNewText} onChange={e => setEditQNewText(e.target.value)} placeholder={t.question_text_placeholder} />
                  <select value={editQNewType} onChange={e => setEditQNewType(e.target.value as QuestionType)} className="admin-input">
                    <option value="open_text">{t.type_open}</option>
                    <option value="single_choice">{t.type_single}</option>
                    <option value="multiple_choice">{t.type_multiple}</option>
                  </select>
                  {editQNewType !== 'open_text' && (
                    <input type="text" className="admin-input" value={editQNewOptions} onChange={e => setEditQNewOptions(e.target.value)} placeholder={t.options_placeholder} />
                  )}
                  <button type="button" className="admin-btn-outline" onClick={handleEditQAddQuestion}>{t.add_question_btn}</button>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn" onClick={handleSaveEditQ} style={{ flex: 1 }}>{t.save}</button>
                  <button className="admin-nav-btn" onClick={() => setEditingQuestionnaire(null)} style={{ flex: 1 }}>{t.cancel}</button>
                </div>
              </div>
            </div>
          )}

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
            {questionnaires.map((qn, index) => (
              <div key={qn.id} className="admin-list-card">
                <strong>{qn.title}</strong>
                <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>
                  {t.q_position_label} {index + 1}
                </p>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{qn.description}</p>
                <div className="admin-list-card-actions">
                  <button className="admin-link-btn" style={{ color: '#40ba21' }} onClick={() => handleStartEditQ(qn)}>
                    {t.edit}
                  </button>
                  <button
                    className="admin-link-btn"
                    style={{ color: '#40ba21' }}
                    disabled={exportingId === qn.id}
                    onClick={() => handleExportQuestionnaire(qn)}
                  >
                    {exportingId === qn.id ? t.exporting : `📥 ${t.export_one_btn}`}
                  </button>
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
