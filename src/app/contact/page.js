'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import StickyContact from '@/components/StickyContact'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_ID'

const EMAILS = ['info@benzolghana.com', 'benzol.lubricantsgh@gmail.com']

const BRANCHES = [
  {
    name: 'Greater Accra',
    color: '#E31B23',
    ink: '#fff',
    phone: '+233 240 333 888',
    address: 'Lucy Plaza, Mataheho Afienya Road, Tema. Close to Hot Oven Bakery',
    maps: 'Lucy Plaza, Mataheho Afienya Road, Tema, Ghana',
  },
  {
    name: 'Kumasi',
    color: '#C9A84C',
    ink: '#14161b',
    phone: '+233 240 333 087',
    address: 'Suame Magazine Road, Alhaji Abu Building',
    maps: 'Suame Magazine Road, Kumasi, Ghana',
  },
  {
    name: 'Tamale',
    color: '#1A6BFF',
    ink: '#fff',
    phone: '+233 240 333 016',
    address: 'Dungu, Cemetery Road. Close to Zoomlion main office',
    maps: 'Dungu Cemetery Road, Tamale, Ghana',
  },
]

const HOURS = 'Monday – Saturday, 7:00 am – 5:00 pm'

const mapsUrl = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

const telHref = (p) => 'tel:' + p.replace(/\s/g, '')

const field = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '2px',
  padding: '0.9rem 1rem',
  color: '#F2F1EE',
  fontSize: '16px', // 16px stops iOS Safari zooming on focus
  fontFamily: 'inherit',
  outline: 'none',
  colorScheme: 'dark',
}

const label = {
  display: 'block',
  fontSize: '11px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '0.5rem',
}

export default function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error()
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Nav />
      <style>{`
        /* form fixes: dropdown list + browser autofill were rendering light-on-light */
        .contact-input:focus { border-color: var(--orange) !important; }
        .contact-input::placeholder { color: #6b6e76; }
        .contact-input option { background: #14161b; color: #F2F1EE; }
        .contact-input:-webkit-autofill,
        .contact-input:-webkit-autofill:hover,
        .contact-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #F2F1EE;
          caret-color: #F2F1EE;
          -webkit-box-shadow: 0 0 0 1000px #1c1f26 inset;
          transition: background-color 9999s ease-out 0s;
        }

        .branch-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-left: 1px solid rgba(255,255,255,0.06);
        }
        .branch-card {
          position: relative;
          padding: 3rem 2.5rem 2.5rem;
          border-right: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .branch-bar { position: absolute; top: 0; left: 0; right: 0; height: 4px; }
        .branch-link { color: var(--text); text-decoration: none; overflow-wrap: anywhere; }
        .branch-link:hover { text-decoration: underline; }
        .map-btn {
          display: flex; align-items: center; justify-content: center;
          min-height: 48px;
          border: 1px solid var(--accent);
          border-radius: 0;
          color: var(--text);
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          text-decoration: none;
          transition: background .25s, color .25s;
        }
        .map-btn:hover { background: var(--accent); color: var(--ink); }
        .send-btn { transition: opacity .25s; }

        @media (max-width: 768px) {
          .branch-grid { grid-template-columns: 1fr; }
          .branch-card { padding: 2.25rem 1.25rem 1.5rem; gap: 1.25rem; }
        }
      `}</style>

      {/* HEADER */}
      <header
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(7rem, 12vw, 10rem) 2rem 4rem',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
            marginBottom: '1rem',
          }}
        >
          Get in Touch
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.8rem, 6.5vw, 7rem)',
            lineHeight: 1,
            margin: '0 0 2rem',
          }}
        >
          Contact Us
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: '520px', lineHeight: 1.7 }}>
          For any kind of query, reach the branch closest to you or send us a
          message below.
        </p>
      </header>

      {/* BRANCHES */}
      <section style={{ padding: '0 2rem 6rem' }} className="branch-wrap">
        <div className="branch-grid">
          {BRANCHES.map((b) => (
            <article
              key={b.name}
              className="branch-card"
              style={{ '--accent': b.color, '--ink': b.ink }}
            >
              <div className="branch-bar" style={{ background: b.color }} />

              <h2
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '2.25rem',
                  letterSpacing: '0.04em',
                  color: 'var(--text)',
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {b.name}
              </h2>

              <dl
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--muted)',
                  flex: 1,
                  margin: 0,
                }}
              >
                <Row title="Phone">
                  <a className="branch-link" href={telHref(b.phone)}>
                    {b.phone}
                  </a>
                </Row>
                <Row title="Email">
                  {EMAILS.map((m) => (
                    <a key={m} className="branch-link" href={`mailto:${m}`} style={{ display: 'block' }}>
                      {m}
                    </a>
                  ))}
                </Row>
                <Row title="Address">{b.address}</Row>
                <Row title="Hours">{HOURS}</Row>
              </dl>

              <a
                href={mapsUrl(b.maps)}
                target="_blank"
                rel="noopener noreferrer"
                className="map-btn"
              >
                Open in Google Maps ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section
        style={{
          background: 'var(--bg-2)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '6rem 2rem',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              lineHeight: 1,
              margin: '0 0 2.5rem',
            }}
          >
            Send a Message
          </h2>

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: '1.25rem',
              }}
            >
              <div>
                <label htmlFor="name" style={label}>Name</label>
                <input id="name" name="name" required autoComplete="name" className="contact-input" style={field} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="phone" style={label}>Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" className="contact-input" style={field} placeholder="Optional" />
              </div>
            </div>

            <div>
              <label htmlFor="email" style={label}>Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" className="contact-input" style={field} placeholder="you@example.com" />
            </div>

            <div>
              <label htmlFor="branch" style={label}>Branch</label>
              <select id="branch" name="branch" className="contact-input" style={field} defaultValue="Any">
                <option value="Any">Any branch</option>
                {BRANCHES.map((b) => (
                  <option key={b.name} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" style={label}>Message</label>
              <textarea id="message" name="message" required rows={6} className="contact-input" style={{ ...field, resize: 'vertical' }} placeholder="How can we help?" />
            </div>

            {/* honeypot: bots fill it, people never see it */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="send-btn"
              style={{
                minHeight: '52px',
                background: 'var(--orange)',
                color: '#fff',
                border: 'none',
                borderRadius: 0,
                fontSize: '12px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                cursor: status === 'sending' ? 'wait' : 'pointer',
                opacity: status === 'sending' ? 0.6 : 1,
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Send Now'}
            </button>

            <p
              role="status"
              aria-live="polite"
              style={{ minHeight: '1.5rem', fontSize: '0.9rem', margin: 0, color: status === 'error' ? '#E31B23' : 'var(--muted)' }}
            >
              {status === 'sent' && "Message sent. We'll get back to you shortly."}
              {status === 'error' && 'Something went wrong. Please try again or call a branch directly.'}
            </p>
          </form>
        </div>
      </section>

      <StickyContact />
    </main>
  )
}

function Row({ title, children }) {
  return (
    <div>
      <dt style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.25rem', opacity: 0.8 }}>
        {title}
      </dt>
      <dd style={{ margin: 0 }}>{children}</dd>
    </div>
  )
}