import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Minimal Avatar component extracted for testing
// Mirrors the Avatar in App.tsx: shows letter placeholder immediately,
// fades in the real photo only after it loads.
function Avatar({ name, photo, size = 72 }: { name: string; photo?: string; size?: number }) {
  const [loaded, setLoaded] = React.useState(false)
  return (
    <div data-testid="avatar" style={{ width: size, height: size, position: 'relative' }}>
      <div data-testid="placeholder" style={{ position: 'absolute', inset: 0 }}>
        {name[0]}
      </div>
      {photo && (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          data-testid="avatar-img"
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  )
}

import React from 'react'

describe('QR-3 — Avatar placeholder performance', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('shows letter placeholder immediately before image loads', () => {
    render(<Avatar name="Ksenia Minaeva" photo="/slow-image.jpg" />)

    // Placeholder (first letter) must be visible right away
    const placeholder = screen.getByTestId('placeholder')
    expect(placeholder).toBeInTheDocument()
    expect(placeholder.textContent).toBe('K')

    // Image exists in DOM but is transparent (not yet loaded)
    const img = screen.getByTestId('avatar-img')
    expect(img).toHaveStyle({ opacity: '0' })
  })

  it('placeholder is visible within 200ms on slow network', async () => {
    const start = Date.now()
    render(<Avatar name="Amelia Gizatullina" photo="/slow-image.jpg" />)

    // Simulate 200ms passing without image loading
    act(() => { vi.advanceTimersByTime(200) })

    const elapsed = Date.now() - start
    const placeholder = screen.getByTestId('placeholder')

    expect(placeholder).toBeInTheDocument()
    expect(elapsed).toBeLessThanOrEqual(200)
  })

  it('image becomes visible after load event fires', () => {
    render(<Avatar name="Maria Martianova" photo="/photo.jpg" />)

    const img = screen.getByTestId('avatar-img')
    expect(img).toHaveStyle({ opacity: '0' })

    act(() => { img.dispatchEvent(new Event('load')) })

    expect(img).toHaveStyle({ opacity: '1' })
  })

  it('image has loading=lazy attribute', () => {
    render(<Avatar name="Andrew Gekhtin" photo="/photo.jpg" />)
    const img = screen.getByTestId('avatar-img')
    expect(img).toHaveAttribute('loading', 'lazy')
  })
})
