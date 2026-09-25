'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useAnimationFrame,
} from 'framer-motion'

function SineWave() {
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
      'rgba(255,107,0,0.12)'
    )

    gradient.addColorStop(
      1,
      'rgba(255,107,0,0)'
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

    ctx.strokeStyle = 'rgba(255,107,0,0.35)'
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

    ctx.strokeStyle = 'rgba(255,107,0,0.15)'
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

export default function Hero() {
  const heroRef = useRef(null)

  /*
    Hero controls its fade from its own
    0 → 100% scroll range.

    At the bottom of Hero:
    
    opacity = EXACTLY 0
  */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [1, 0.58, 0.12, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.97]
  )

  /*
    Very subtle upward movement as the Hero
    leaves the screen.
  */
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '-3%']
  )

  return (
    <section
      ref={heroRef}
      className="cinematic-snap relative"
      data-cinematic="hero"
      style={{
        height: '100svh',
        minHeight: '100svh',
        zIndex: 1,
        background: 'transparent',
      }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          opacity,
          scale,
          y,
          zIndex: 0,
          background: 'var(--bg)',
          pointerEvents: 'none',
        }}
      >
        {/* Blue glow beneath nav */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: '180px',
            background:
              'linear-gradient(to bottom, rgba(26,107,255,0.1), transparent)',
          }}
        />

        <SineWave />

        {/* ─────────────────────────
            CAR PLACEHOLDER
        ───────────────────────── */}

        <div
          className="absolute"
          style={{
            left: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '42%',
            aspectRatio: '16/9',
            background:
              'rgba(255,107,0,0.04)',
            border:
              '1px solid rgba(255,107,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--muted)',
            fontSize: '11px',
            letterSpacing: '3px',
          }}
        >
          CAR GRAPHIC
        </div>

        {/* ─────────────────────────
            MAIN CONTENT
        ───────────────────────── */}

        <div
          className="relative w-full h-full flex flex-col items-end justify-center px-8 md:px-20"
          style={{
            zIndex: 2,
            paddingTop: '80px',
          }}
        >
          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
            className="leading-none text-right"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize:
                'clamp(4rem, 11vw, 12rem)',
              color: 'var(--text)',
              letterSpacing: '0.02em',
            }}
          >
            Maximum
            <br />
            Performance
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.6,
            }}
            className="text-right mt-4"
            style={{
              color: 'var(--muted)',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              maxWidth: '280px',
            }}
          >
            Ghana's trusted distributor of
            premium lubricants for automotive,
            industrial and commercial use.
          </motion.p>
        </div>

        {/* ─────────────────────────
            SCROLL INDICATOR
        ───────────────────────── */}

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            zIndex: 2,
          }}
        >
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            style={{
              color: 'var(--orange)',
              fontSize: '20px',
            }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}