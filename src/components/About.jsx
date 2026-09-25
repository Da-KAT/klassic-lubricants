'use client'

import { useEffect, useRef } from 'react'

function AboutWaves() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    let animationFrame
    let startTime = null

    const resize = () => {
      const rect = canvas.getBoundingClientRect()

      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawWave = ({
      time,
      color,
      speed,
      amplitude,
      wavelength,
      offset,
      opacity,
    }) => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      /*
       * The wave sits around the middle of the canvas.
       * Everything BELOW the wave is filled.
       *
       * There is deliberately NO stroke.
       */
      const centerY = height * 0.52

      ctx.beginPath()

      ctx.moveTo(0, height)

      for (let x = 0; x <= width; x += 2) {
        const wave =
          Math.sin(
            (x / wavelength) * Math.PI * 2 +
              time * speed +
              offset
          ) * amplitude

        const y = centerY + wave

        ctx.lineTo(x, y)
      }

      ctx.lineTo(width, height)
      ctx.closePath()

      ctx.fillStyle = color
      ctx.fill()
    }

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp

      const elapsed = timestamp - startTime

      const width = canvas.clientWidth
      const height = canvas.clientHeight

      ctx.clearRect(0, 0, width, height)

      /*
       * Very subtle layered fills.
       *
       * No strokes.
       * No outlines.
       * Each moves at a different speed.
       */

      drawWave({
        time: elapsed / 1000,
        color: 'rgba(255, 106, 0, 0.18)',
        speed: 0.32,
        amplitude: 45,
        wavelength: 700,
        offset: 0,
        opacity: 0.055,
      })

      drawWave({
        time: elapsed / 1000,
        color: 'rgba(201, 168, 76, 0.26)',
        speed: 0.22,
        amplitude: 38,
        wavelength: 850,
        offset: 2.1,
        opacity: 0.045,
      })

      drawWave({
        time: elapsed / 1000,
        color: 'rgba(26, 106, 255, 0.21)',
        speed: 0.17,
        amplitude: 50,
        wavelength: 780,
        offset: 4,
        opacity: 0.05,
      })

      animationFrame = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="about-waves"
    />
  )
}

export default function About() {
  return (
    <section className="about-section">

      {/* Animated waves behind everything */}
      <AboutWaves />

      <div className="about-inner">

        {/* Label */}
        <div className="about-label">
          {/* Removed the about-label-line span here */}
          <span>ABOUT KLASSIC</span>
        </div>

        {/* Main content */}
        <div className="about-main">

          <div className="about-heading">
            <h2>
              BUILT FOR
              <br />
              THE DEMANDS
              <br />
              <span>OF MOTION.</span>
            </h2>
          </div>

          <div className="about-copy">

            <p className="about-intro">
              For over a decade, Klassic Lubricants has supplied
              quality lubrication solutions across Ghana, serving
              automotive, transport, industrial and mining
              applications.
            </p>

            <p className="about-description">
              From engine oils and gear fluids to hydraulic oils
              and coolants, our products are selected to keep
              machines protected, efficient and ready for the
              work ahead.
            </p>

            <a
              href="/about"
              className="about-link"
              style={{ fontSize: '1.2rem' }}
            >
              OUR STORY
              <span>→</span>
            </a>

          </div>

        </div>

        {/* Stats */}
        <div className="about-stats">

          <div className="about-stat">
            <span className="about-stat-number">
              9+
            </span>

            <span className="about-stat-label" style={{ fontSize: '1.1rem' }}>
              YEARS OF EXPERIENCE
            </span>
          </div>

          <div className="about-stat">
            <span className="about-stat-number">
              3,500+
            </span>

            <span className="about-stat-label" style={{ fontSize: '1.1rem' }}>
              HAPPY CLIENTS
            </span>
          </div>

          <div className="about-stat">
            <span className="about-stat-number">
              47+
            </span>

            <span className="about-stat-label" style={{ fontSize: '1.1rem' }}>
              PRODUCTS
            </span>
          </div>

        </div>

      </div>
    </section>
  )
}