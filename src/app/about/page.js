'use client'

import { useEffect, useRef } from 'react'
import Nav from '@/components/Nav'

function WavesCanvas({ color1, color2, color3 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let frame
    let startTime = null

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const wave = ({
      time,
      color,
      speed,
      amplitude,
      wavelength,
      offset,
    }) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      ctx.beginPath()
      ctx.moveTo(0, h)

      for (let x = 0; x <= w; x += 2) {
        const y =
          h * 0.72 +
          Math.sin(
            (x / wavelength) * Math.PI * 2 +
              time * speed +
              offset
          ) *
            amplitude

        ctx.lineTo(x, y)
      }

      ctx.lineTo(w, h)
      ctx.closePath()

      ctx.fillStyle = color
      ctx.fill()
    }

    const animate = (ts) => {
      if (!startTime) startTime = ts

      const t = (ts - startTime) / 1000

      ctx.clearRect(
        0,
        0,
        canvas.clientWidth,
        canvas.clientHeight
      )

      wave({
        time: t,
        color: color1,
        speed: 0.32,
        amplitude: 45,
        wavelength: 700,
        offset: 0,
      })

      wave({
        time: t,
        color: color2,
        speed: 0.22,
        amplitude: 38,
        wavelength: 850,
        offset: 2.1,
      })

      wave({
        time: t,
        color: color3,
        speed: 0.17,
        amplitude: 50,
        wavelength: 780,
        offset: 4,
      })

      frame = requestAnimationFrame(animate)
    }

    resize()

    window.addEventListener('resize', resize)

    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [color1, color2, color3])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}

const PILLARS = [
  {
    title: 'Proven Quality',
    text: 'Premium base oils and advanced additive technology. Superior protection across all operating conditions.',
  },
  {
    title: 'Industry Expertise',
    text: 'Qualified petroleum engineers who know the difference between spec-sheet performance and real-world results.',
  },
  {
    title: 'Reliable Supply',
    text: 'Strict quality control and a distribution network that covers Accra, Kumasi, and Tamale.',
  },
  {
    title: 'Cost Efficiency',
    text: 'Longer service intervals, lower maintenance costs — value that shows up on the balance sheet.',
  },
  {
    title: 'Customer Focus',
    text: 'Responsive service and technical support matched to your operation, not a generic FAQ.',
  },
  {
    title: 'Sustainability',
    text: 'Efficient lubrication means fewer top-ups, less waste, and lower emissions over the life of the machine.',
  },
]

export default function AboutPage() {
  return (
    <main
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          padding: '0 2rem 5rem',
        }}
      >
        <WavesCanvas
          color1="rgba(255,107,0,0.18)"
          color2="rgba(201,168,76,0.22)"
          color3="rgba(26,107,255,0.18)"
        />

        <div
          className="about-hero-content"
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Logo / image placeholder */}
          <div
            className="about-logo-placeholder"
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              maxWidth: '420px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.025)',
              borderRadius: '2px',
              marginBottom: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.25)',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Klassic Logo
          </div>

          <h1
            className="about-hero-title"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2.8rem, 6.5vw, 7rem)',
              lineHeight: 1,
              color: 'var(--text)',
              marginBottom: '2rem',
            }}
          >
            Built for the demands of motion
          </h1>

          <p
            style={{
              maxWidth: '520px',
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--muted)',
            }}
          >
            For over a decade, Klassic Lubricants has supplied quality
            lubrication across Ghana — automotive, transport, industrial,
            mining. Our products keep machines protected and ready for the
            work ahead.
          </p>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="about-stats-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            padding: '0 2rem',
          }}
        >
          {[
            {
              stat: '9+',
              label: 'Years in business',
              accent: 'var(--orange)',
            },
            {
              stat: '3,500+',
              label: 'Clients served',
              accent: 'var(--gold)',
            },
            {
              stat: '47+',
              label: 'Products stocked',
              accent: 'var(--blue)',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="about-stat"
              style={{
                padding: '3rem 2rem',
                borderRight:
                  i < 2
                    ? '1px solid rgba(255,255,255,0.06)'
                    : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(3rem, 5vw, 5rem)',
                  color: item.accent,
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {item.stat}
              </span>

              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginTop: '0.4rem',
                  display: 'block',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────── */}
      <section
        style={{
          padding: '7rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          className="about-story-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'start',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                lineHeight: 1,
                marginBottom: '2rem',
              }}
            >
              Our Story
            </h2>

            <p
              style={{
                color: 'var(--muted)',
                lineHeight: 1.75,
                marginBottom: '1.25rem',
              }}
            >
              Klassic Lubricants began as a straightforward bet: that
              Ghana&apos;s workshops and fleets deserved lubricants that
              actually performed — not just passed inspection. We built
              our distribution around that idea, starting in Kumasi and
              expanding north and south as the business earned the trust.
            </p>

            <p
              style={{
                color: 'var(--muted)',
                lineHeight: 1.75,
              }}
            >
              Today our team of qualified petroleum engineers works across
              three branches, advising customers — not just selling to them.
              We carry Benzol, Boss, and CTG because they hold up. Full stop.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
          >
            {[
              {
                heading: 'What we carry',
                items: [
                  'Diesel & motor engine oils',
                  'Gear & hydraulic oils',
                  'ATF & transmission fluids',
                  'Brake fluids & coolants',
                  'Motorcycle 2T & 4T oils',
                  'Greases & specialty products',
                ],
              },
              {
                heading: 'Who we serve',
                items: [
                  'Automotive workshops & dealerships',
                  'Commercial transport fleets',
                  'Industrial & mining operations',
                  'Agricultural equipment users',
                ],
              },
            ].map((col, i) => (
              <div
                key={i}
                style={{
                  padding: '2rem 0',
                  borderTop:
                    '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--orange)',
                    marginBottom: '1rem',
                  }}
                >
                  {col.heading}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  {col.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        color: 'var(--muted)',
                        fontSize: '0.9rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY KLASSIC ──────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-2)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '7rem 2rem',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <div
            className="why-klassic-heading"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '2rem',
              marginBottom: '4rem',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--orange)',
                  marginBottom: '1rem',
                }}
              >
                The Klassic Difference
              </p>

              <h2
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                Why Klassic
              </h2>
            </div>
          </div>

          <div
            className="why-klassic-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {PILLARS.map((p, i) => (
              <div
                key={i}
                style={{
                  padding: '2.5rem',
                  minHeight: '220px',
                  borderRight:
                    '1px solid rgba(255,255,255,0.06)',
                  borderBottom:
                    '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-bebas)',
                      fontSize: '1.1rem',
                      color: 'var(--orange)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    0{i + 1}
                  </span>

                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {p.title}
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--muted)',
                    lineHeight: 1.65,
                    maxWidth: '32ch',
                    margin: 0,
                  }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESPONSIVE ───────────────────────────────────────── */}
      <style jsx>{`
        .about-hero-title {
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .about-hero-content {
            max-width: 100%;
          }

          .about-hero-title {
            white-space: normal;
            text-align: left;
            font-size: clamp(2.8rem, 12vw, 4.5rem);
            line-height: 0.95;
            max-width: 100%;
            margin-top: 0.75rem !important;
          }

          .about-logo-placeholder {
            width: min(100%, 260px) !important;
            aspect-ratio: 1 / 1 !important;
            margin-bottom: 3.5rem !important;
          }

          .about-hero-content > p:last-child {
            max-width: 100% !important;
          }

          /* Two-column mobile stats.
             The third stat naturally moves into column one. */
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 0 !important;
          }

          .about-stat {
            padding: 2.25rem 1.25rem !important;
            border-right: 1px solid rgba(255,255,255,0.06) !important;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }

          /* Remove the right border from every second item */
          .about-stat:nth-child(2n) {
            border-right: none !important;
          }

          /* Keep the final single item aligned to the first column */
          .about-stat:last-child {
            grid-column: 1;
          }

          .about-story-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }

          .why-klassic-heading {
            margin-bottom: 3rem !important;
          }

          .why-klassic-grid {
            grid-template-columns: 1fr !important;
          }

          .why-klassic-grid > div {
            min-height: 190px !important;
          }
        }

        @media (max-width: 480px) {
          .about-hero-title {
            font-size: clamp(2.7rem, 13vw, 4rem);
          }

          .about-logo-placeholder {
            width: 220px !important;
            margin-bottom: 3.25rem !important;
          }

          .about-stat {
            padding: 2rem 1rem !important;
          }

          .about-stat span:last-child {
            font-size: 9px !important;
            letter-spacing: 1.5px !important;
          }

          .why-klassic-grid > div {
            padding: 2rem !important;
          }
        }
      `}</style>
    </main>
  )
}

