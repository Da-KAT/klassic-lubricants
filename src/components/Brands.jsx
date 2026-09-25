'use client'

import { useRef } from 'react'

import {
  motion,
  useScroll,
  useTransform,
  useAnimationFrame,
} from 'framer-motion'

function SineWave({ color }) {
  const canvasRef = useRef(null)

  useAnimationFrame((t) => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const W = canvas.width
    const H = canvas.height

    ctx.clearRect(0, 0, W, H)

    const centerY = H / 2

    /* ─────────────────────────────
       FILLED WAVE
    ───────────────────────────── */

    ctx.beginPath()
    ctx.moveTo(0, centerY)

    for (let x = 0; x <= W; x++) {
      const y =
        centerY +
        Math.sin(
          (x / W) * Math.PI * 3 +
            t / 1200
        ) *
          40

      ctx.lineTo(x, y)
    }

    const gradient = ctx.createLinearGradient(
      0,
      centerY,
      0,
      H
    )

    gradient.addColorStop(
      0,
      `${color}22`
    )

    gradient.addColorStop(
      1,
      'rgba(0,0,0,0)'
    )

    ctx.lineTo(W, H)
    ctx.lineTo(0, H)
    ctx.closePath()

    ctx.fillStyle = gradient
    ctx.fill()

    /* ─────────────────────────────
       MAIN WAVE
    ───────────────────────────── */

    ctx.beginPath()
    ctx.moveTo(0, centerY)

    for (let x = 0; x <= W; x++) {
      const y =
        centerY +
        Math.sin(
          (x / W) * Math.PI * 3 +
            t / 1200
        ) *
          40

      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = `${color}55`
    ctx.lineWidth = 1.5
    ctx.stroke()

    /* ─────────────────────────────
       SECONDARY WAVE
    ───────────────────────────── */

    ctx.beginPath()
    ctx.moveTo(0, centerY)

    for (let x = 0; x <= W; x++) {
      const y =
        centerY +
        Math.sin(
          (x / W) * Math.PI * 3 +
            t / 900 +
            1.5
        ) *
          25

      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = `${color}33`
    ctx.lineWidth = 1
    ctx.stroke()
  })

  return (
    <canvas
      ref={canvasRef}
      width={1400}
      height={800}
      className="absolute inset-0 w-full h-full"
      style={{
        pointerEvents: 'none',
      }}
    />
  )
}

/* ═══════════════════════════════════════
   BENZOL
═══════════════════════════════════════ */

function BenzolPanel() {
  const ref = useRef(null)

  /*
    The important part:

    Benzol's animation is calculated while
    the page moves from the bottom of Hero
    through the Benzol section.

    Progress:

    0       = Benzol is below screen
    0.5     = Benzol is perfectly centered
    1       = Benzol is leaving
  */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  /*
    Slide upward while entering.
  */
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['100%', '0%', '-8%']
  )

  /*
    Fade IN while Hero disappears.

    At exactly 0.5:

      opacity = 1
  */
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.34, 0.5, 0.72, 1],
    [0, 0.15, 0.65, 1, 0.65, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.96, 1, 0.98]
  )

  return (
    <section
      ref={ref}
      className="cinematic-snap relative"
      data-cinematic="benzol"
      style={{
        height: '100svh',
        minHeight: '100svh',
        zIndex: 2,
        background: 'transparent',
      }}
    >
      <motion.div
        className="absolute inset-0 flex items-center px-8 md:px-20 overflow-hidden"
        style={{
          y,
          opacity,
          scale,
        }}
      >
        <SineWave color="#C9A84C" />

        <div
          className="relative z-10 w-full flex flex-col gap-10 items-center md:flex-row"
        >
          {/* Car */}
          <div
            style={{
              width: '38%',
              minWidth: '200px',
              aspectRatio: '16/9',
              background:
                'rgba(201,168,76,0.04)',
              border:
                '1px solid rgba(201,168,76,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted)',
              fontSize: '11px',
              letterSpacing: '3px',
              flexShrink: 0,
            }}
          >
            BENZOL CAR
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4">
            <span
              className="text-xs tracking-widest uppercase"
              style={{
                color: '#C9A84C',
              }}
            >
              Benzol
            </span>

            <h2
              className="leading-none"
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize:
                  'clamp(3rem, 7vw, 7rem)',
                color: 'var(--text)',
              }}
            >
              Refined Excellence
            </h2>

            <p
              className="text-sm max-w-sm"
              style={{
                color: 'var(--muted)',
                lineHeight: '1.7',
              }}
            >
              Benzol's premium formulations keep
              engines running cleaner for longer.
              The preferred choice for passenger
              and commercial vehicles.
            </p>

            <a
              href="#shop"
              className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity w-fit"
              style={{
                color: '#C9A84C',
              }}
            >
              See Products →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════
   BOSS
═══════════════════════════════════════ */

function BossPanel() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  /*
    Boss enters from below while Benzol
    leaves.

    At progress 0.5 Boss is perfectly
    centered.
  */
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['100%', '0%', '0%']
  )

  /*
    Boss fades in during the Benzol → Boss
    transition.

    Once Boss is centered it remains almost
    completely visible while the user begins
    normal scrolling toward Products.
  */
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.34, 0.5, 0.88, 1],
    [0, 0.15, 0.65, 1, 1, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.96, 1, 0.985]
  )

  return (
    <section
      ref={ref}
      className="cinematic-snap relative"
      data-cinematic="boss"
      style={{
        height: '100svh',
        minHeight: '100svh',
        zIndex: 3,
        background: 'transparent',
      }}
    >
      <motion.div
        className="absolute inset-0 flex items-center px-8 md:px-20 overflow-hidden"
        style={{
          y,
          opacity,
          scale,
        }}
      >
        <SineWave color="#1A6BFF" />

        <div
          className="relative z-10 w-full flex flex-col gap-10 items-center md:flex-row-reverse"
        >
          {/* Car */}
          <div
            style={{
              width: '38%',
              minWidth: '200px',
              aspectRatio: '16/9',
              background:
                'rgba(26,107,255,0.04)',
              border:
                '1px solid rgba(26,107,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted)',
              fontSize: '11px',
              letterSpacing: '3px',
              flexShrink: 0,
            }}
          >
            BOSS CAR
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4">
            <span
              className="text-xs tracking-widest uppercase"
              style={{
                color: '#1A6BFF',
              }}
            >
              Boss
            </span>

            <h2
              className="leading-none"
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize:
                  'clamp(3rem, 7vw, 7rem)',
                color: 'var(--text)',
              }}
            >
              Engineered for Power
            </h2>

            <p
              className="text-sm max-w-sm"
              style={{
                color: 'var(--muted)',
                lineHeight: '1.7',
              }}
            >
              Boss lubricants deliver high-performance
              protection for demanding engines.
              Trusted by workshops and fleet operators
              across Ghana.
            </p>

            <a
              href="#shop"
              className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity w-fit"
              style={{
                color: '#1A6BFF',
              }}
            >
              See Products →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default function Brands() {
  return (
    <div
      id="brands"
      style={{
        position: 'relative',
      }}
    >
      <BenzolPanel />
      <BossPanel />
    </div>
  )
}