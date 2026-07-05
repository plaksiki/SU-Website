import { describe, it, expect } from 'vitest'


const events = [
  { name: "Minecraft Event", date: "2026-10-01" },
  { name: "CS:GO Event", date: "2026-11-01" },
  { name: "Hackathon", date: "2025-12-01" },
]

const today = new Date()
const eventsWithStatus = events.map(event => ({
  ...event,
  isActive: new Date(event.date) >= today
}))

describe('Event filtering', () => {
  it('upcoming filter shows only future events', () => {
    const upcoming = eventsWithStatus.filter(e => e.isActive)
    upcoming.forEach(e => {
      expect(new Date(e.date) >= today).toBe(true)
    })
  })

  it('passed filter shows only past events', () => {
    const passed = eventsWithStatus.filter(e => !e.isActive)
    passed.forEach(e => {
      expect(new Date(e.date) < today).toBe(true)
    })
  })

  it('Hackathon 2025 is marked as passed', () => {
    const hackathon = eventsWithStatus.find(e => e.name === 'Hackathon')
    expect(hackathon?.isActive).toBe(false)
  })

  it('Minecraft Event 2026 is marked as upcoming', () => {
    const minecraft = eventsWithStatus.find(e => e.name === 'Minecraft Event')
    expect(minecraft?.isActive).toBe(true)
  })
})

// QRT-5: Language Switching
const translations = {
  en: {
    home: "Home", events: "Events", support: "Support Us",
    polls: "Polls", history: "History", details: "Details →",
  },
  ru: {
    home: "Главная", events: "Мероприятия", support: "Поддержать нас",
    polls: "Опросники", history: "История", details: "Подробнее →",
  }
}

describe('Language Switching (QRT-5)', () => {
  it('EN and RU have the same keys', () => {
    const enKeys = Object.keys(translations.en).sort()
    const ruKeys = Object.keys(translations.ru).sort()
    expect(enKeys).toEqual(ruKeys)
  })

  it('No key returns undefined in EN', () => {
    Object.values(translations.en).forEach(val => {
      expect(val).toBeDefined()
      expect(val).not.toBe('')
    })
  })

  it('No key returns undefined in RU', () => {
    Object.values(translations.ru).forEach(val => {
      expect(val).toBeDefined()
      expect(val).not.toBe('')
    })
  })
})

// QRT-6: Questionnaire Validation
const validateAnswers = (
  questions: { id: string; required: boolean }[],
  answers: Record<string, string | string[]>
) => {
  const errors: Record<string, boolean> = {}
  for (const q of questions) {
    if (!q.required) continue
    const v = answers[q.id]
    if (!v || (Array.isArray(v) && !v.length) || v === '') {
      errors[q.id] = true
    }
  }
  return errors
}

describe('Questionnaire Validation (QRT-6)', () => {
  const questions = [
    { id: 'q1', required: true },
    { id: 'q2', required: false },
    { id: 'q3', required: true },
  ]

  it('empty required fields produce errors', () => {
    const errors = validateAnswers(questions, {})
    expect(errors['q1']).toBe(true)
    expect(errors['q3']).toBe(true)
  })

  it('optional fields do not produce errors when empty', () => {
    const errors = validateAnswers(questions, {})
    expect(errors['q2']).toBeUndefined()
  })

  it('filled required fields pass validation', () => {
    const errors = validateAnswers(questions, { q1: 'Good', q3: 'Some text' })
    expect(Object.keys(errors).length).toBe(0)
  })
})