'use client'

import { useEffect, useRef } from 'react'

function SineWave({ color, canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animId

    const animate = (t) => {
      const ctx = canvas.getContext('2d')
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      const centerY = H / 2

      // ==================================================
      // MAIN WAVE — FILLED + SUBTLE TOP OUTLINE
      // ==================================================

      ctx.beginPath()
      ctx.moveTo(0, centerY)

      for (let x = 0; x <= W; x++) {
        const y =
          centerY +
          Math.sin((x / W) * Math.PI * 3 + t / 1200) * 40

        ctx.lineTo(x, y)
      }

      ctx.lineTo(W, H)
      ctx.lineTo(0, H)
      ctx.closePath()

      const mainGradient = ctx.createLinearGradient(
        0,
        centerY,
        0,
        H
      )

      mainGradient.addColorStop(0, color + '22')
      mainGradient.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.fillStyle = mainGradient
      ctx.fill()

      // --------------------------------------------------
      // SUBTLE TOP OUTLINE ONLY
      // --------------------------------------------------

      ctx.beginPath()
      ctx.moveTo(0, centerY)

      for (let x = 0; x <= W; x++) {
        const y =
          centerY +
          Math.sin((x / W) * Math.PI * 3 + t / 1200) * 40

        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = color + '45'
      ctx.lineWidth = 1
      ctx.stroke()

      // ==================================================
      // SECONDARY WAVE — FILLED ONLY
      // ==================================================

      const secondaryColor =
        color === '#E31B23'
          ? '#1A6BFF'
          : color

      ctx.beginPath()
      ctx.moveTo(0, centerY)

      for (let x = 0; x <= W; x++) {
        const y =
          centerY +
          Math.sin(
            (x / W) * Math.PI * 3 +
              t / 900 +
              1.5
          ) * 25

        ctx.lineTo(x, y)
      }

      ctx.lineTo(W, H)
      ctx.lineTo(0, H)
      ctx.closePath()

      const secondaryGradient = ctx.createLinearGradient(
        0,
        centerY,
        0,
        H
      )

      secondaryGradient.addColorStop(
        0,
        secondaryColor + '16'
      )

      secondaryGradient.addColorStop(
        1,
        'rgba(0,0,0,0)'
      )

      ctx.fillStyle = secondaryGradient
      ctx.fill()

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animId)
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      width={1400}
      height={800}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}


export default function CinematicStage() {
  const heroRef = useRef(null)
  const benzolRef = useRef(null)
  const bossRef = useRef(null)

  const heroCanvas = useRef(null)
  const benzolCanvas = useRef(null)
  const bossCanvas = useRef(null)

  const sentinelRef = useRef(null)

  const currentRef = useRef(0)
  const isAnimatingRef = useRef(false)

  // Buffer used when leaving Boss → Products
  const productsScrollBufferRef = useRef(0)
  const releaseProductsRef = useRef(false)

  useEffect(() => {
    const scenes = [
      heroRef.current,
      benzolRef.current,
      bossRef.current,
    ]

    /*
     * Keep the cinematic sequence pinned to the top of
     * the document while we're inside it.
     */
    function lockScroll() {
      if (window.scrollY !== 0) {
        window.scrollTo({
          top: 0,
          behavior: 'instant',
        })
      }
    }

    /*
     * Transition between cinematic scenes.
     */
    function goTo(index) {
      if (
        isAnimatingRef.current ||
        index === currentRef.current
      ) {
        return
      }

      if (index < 0 || index > 2) {
        return
      }

      isAnimatingRef.current = true

      const prev = scenes[currentRef.current]
      const next = scenes[index]

      const goingForward =
        index > currentRef.current

      // Hide previous scene
      prev.style.opacity = '0'

      if (currentRef.current !== 0) {
        prev.style.transform = goingForward
          ? 'translateY(-50px)'
          : 'translateY(50px)'
      }

      /*
       * Start incoming scene from the correct direction.
       */
      next.style.transform = goingForward
        ? 'translateY(50px)'
        : 'translateY(-50px)'

      setTimeout(() => {
        next.style.opacity = '1'
        next.style.transform = 'translateY(0)'

        currentRef.current = index

        setTimeout(() => {
          isAnimatingRef.current = false
        }, 600)
      }, 50)
    }

    function onWheel(e) {
      const current = currentRef.current

      const atFirst = current === 0
      const atLast = current === 2

      /*
       * ==================================================
       * RETURNING FROM PRODUCTS
       * ==================================================
       */
      if (window.scrollY > 0) {
        return
      }

      /*
       * ==================================================
       * BOSS → PRODUCTS
       * ==================================================
       */
      if (atLast && e.deltaY > 0) {
        const BUFFER = 180

        if (!releaseProductsRef.current) {
          e.preventDefault()

          productsScrollBufferRef.current += e.deltaY

          if (
            productsScrollBufferRef.current >= BUFFER
          ) {
            productsScrollBufferRef.current = 0
            releaseProductsRef.current = true
          }

          return
        }

        releaseProductsRef.current = false
        productsScrollBufferRef.current = 0

        return
      }

      /*
       * If the user starts scrolling back upward while
       * we're on Boss, completely reset the Products buffer.
       */
      if (atLast && e.deltaY < 0) {
        productsScrollBufferRef.current = 0
        releaseProductsRef.current = false
      }

      /*
       * ==================================================
       * HERO → TOP
       * ==================================================
       */
      if (atFirst && e.deltaY < 0) {
        e.preventDefault()
        return
      }

      /*
       * ==================================================
       * CINEMATIC TRANSITIONS
       * ==================================================
       */
      e.preventDefault()

      if (e.deltaY > 0) {
        goTo(current + 1)
      } else if (e.deltaY < 0) {
        goTo(current - 1)
      }
    }

    /*
     * Keep the cinematic sequence locked at scrollY = 0
     * until Boss releases the page.
     */
    function onScroll() {
      if (currentRef.current < 2) {
        lockScroll()
      }
    }

    /*
     * ==================================================
     * TOUCH SUPPORT
     * ==================================================
     */
    let touchStartY = 0

    function onTouchStart(e) {
      touchStartY = e.touches[0].clientY
    }

    function onTouchEnd(e) {
      const delta =
        touchStartY - e.changedTouches[0].clientY

      if (Math.abs(delta) < 30) {
        return
      }

      if (window.scrollY > 0) {
        return
      }

      const current = currentRef.current

      /*
       * Boss → Products.
       */
      if (current === 2 && delta > 0) {
        return
      }

      /*
       * Hero → nothing above.
       */
      if (current === 0 && delta < 0) {
        e.preventDefault()
        return
      }

      e.preventDefault()

      if (delta > 0) {
        goTo(current + 1)
      } else if (delta < 0) {
        goTo(current - 1)
      }
    }

    window.addEventListener(
      'wheel',
      onWheel,
      { passive: false }
    )

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    )

    window.addEventListener(
      'touchstart',
      onTouchStart,
      { passive: true }
    )

    window.addEventListener(
      'touchend',
      onTouchEnd,
      { passive: false }
    )

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  /*
   * ======================================================
   * SCENE STYLE
   * ======================================================
   */
  const sceneStyle = (initial = true) => ({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    opacity: initial ? 1 : 0,
    transform: initial
      ? 'translateY(0)'
      : 'translateY(50px)',
    transition:
      'opacity 0.6s ease, transform 0.6s ease',
  })

  return (
    <>
      <div
        id="home"
        style={{
          position: 'relative',
          height: '100svh',
          overflow: 'hidden',
          background: 'var(--bg)',
        }}
      >

        {/* ================================================
            HERO
        ================================================= */}

        <div
          ref={heroRef}
          style={sceneStyle(true)}
        >
          {/* HERO WAVE — RED */}
          <SineWave
            color="#E31B23"
            canvasRef={heroCanvas}
          />

          {/* HERO TOP GLOW — BLUE */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '180px',
              background:
                'linear-gradient(to bottom, rgba(26,107,255,0.1), transparent)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          <img
            src="/cars/stack2.png"
            alt="Car"
            style={{
              position: 'absolute',
              left: '2%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '42%',
              height: 'auto',
              objectFit: 'contain',
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              paddingRight:
                'clamp(2rem, 5vw, 5rem)',
              paddingTop: '80px',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize:
                  'clamp(4rem, 9vw, 10rem)',
                color: 'var(--text)',
                lineHeight: 1,
                textAlign: 'right',
                letterSpacing: '0.02em',
              }}
            >
              Maximum
              <br />
              Performance
            </h1>

            <p
              style={{
                color: 'var(--muted)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                maxWidth: '280px',
                textAlign: 'right',
                marginTop: '1rem',
              }}
            >
              Ghana's trusted distributor of premium
              lubricants for automotive, industrial and
              commercial use.
            </p>
          </div>

          {/* HERO SCROLL ARROW — RED */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#E31B23',
              fontSize: '20px',
              zIndex: 2,
              animation: 'bounce 1.5s infinite',
            }}
          >
            ↓
          </div>
        </div>

        {/* ================================================
            BENZOL
        ================================================= */}

        <div
          ref={benzolRef}
          style={sceneStyle(false)}
        >
          {/* BENZOL WAVE — UNCHANGED GOLD */}
          <SineWave
            color="#C9A84C"
            canvasRef={benzolCanvas}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
              padding:
                '0 clamp(2rem, 5vw, 5rem)',
            }}
          >
            <img
              src="/cars/benz2.png"
              alt="Benzol car"
              style={{
                width: '38%',
                minWidth: '200px',
                height: 'auto',
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  color: '#C9A84C',
                  fontSize: '25px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                }}
              >
                Benzol
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize:
                    'clamp(3rem, 7vw, 7rem)',
                  color: 'var(--text)',
                  lineHeight: 1,
                }}
              >
                Refined Excellence
              </h2>

              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  maxWidth: '360px',
                }}
              >
                Benzol's premium formulations keep
                engines running cleaner for longer.
                The preferred choice for passenger and
                commercial vehicles.
              </p>

              <a
                href="#shop"
                style={{
                  color: '#C9A84C',
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                See Products →
              </a>
            </div>
          </div>
        </div>

        {/* ================================================
            BOSS
        ================================================= */}

        <div
          ref={bossRef}
          style={sceneStyle(false)}
        >
          {/* BOSS WAVE — UNCHANGED BLUE */}
          <SineWave
            color="#1A6BFF"
            canvasRef={bossCanvas}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
              flexDirection: 'row-reverse',
              padding:
                '0 clamp(2rem, 5vw, 5rem)',
            }}
          >
            <img
              src="/cars/boss2.png"
              alt="Boss car"
              style={{
                width: '38%',
                minWidth: '200px',
                height: 'auto',
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  color: '#1A6BFF',
                  fontSize: '25px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                }}
              >
                Boss
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize:
                    'clamp(3rem, 7vw, 7rem)',
                  color: 'var(--text)',
                  lineHeight: 1,
                }}
              >
                Engineered for Power
              </h2>

              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  maxWidth: '360px',
                }}
              >
                Boss lubricants deliver high-performance
                protection for demanding engines.
                Trusted by workshops and fleet operators
                across Ghana.
              </p>

              <a
                href="#shop"
                style={{
                  color: '#1A6BFF',
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                See Products →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          SENTINEL
      ================================================= */}

      <div
        ref={sentinelRef}
        style={{
          height: '1px',
          position: 'relative',
          zIndex: 0,
        }}
      />
    </>
  )
}