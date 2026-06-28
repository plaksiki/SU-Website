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