'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

function SineWave({ color, canvasRef, mobileCenter = 0.45 }) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = 0, H = 0, animId

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const isRed = color === '#E31B23'

    const animate = (t) => {
      ctx.clearRect(0, 0, W, H)

      const mobile = W < 768
      const centerY = H * (mobile ? mobileCenter : 0.5)
      // Fixed wavelength: same as the old desktop look, never compressed
      const k = (Math.PI * 2) / (Math.max(W, 1400) / 1.5)

      const yAt = (x, speed, phase, amp, off = 0) =>
        centerY + off + Math.sin(x * k + t / speed + phase) * amp

      const trace = (speed, phase, amp, off = 0) => {
        ctx.moveTo(0, yAt(0, speed, phase, amp, off))
        for (let x = 1; x <= W; x++) {
          ctx.lineTo(x, yAt(x, speed, phase, amp, off))
        }
      }

      const fillWave = (speed, phase, amp, off, colorStr, topA, topY, botY) => {
        ctx.beginPath()
        trace(speed, phase, amp, off)
        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.closePath()
        const g = ctx.createLinearGradient(0, topY, 0, botY)
        g.addColorStop(0, colorStr + topA)
        g.addColorStop(1, colorStr + '00')
        ctx.fillStyle = g
        ctx.fill()
      }

      // ---------- SECONDARY (drawn first, sits behind) ----------
      if (isRed) {
        // Blue only appears ABOVE the red wave edge -> no overlap, no purple
        ctx.save()
        ctx.beginPath()
        trace(1200, 0, 40)
        ctx.lineTo(W, 0)
        ctx.lineTo(0, 0)
        ctx.closePath()
        ctx.clip()
        fillWave(900, 1.5, 30, -25, '#1A6BFF', '60', centerY - 55, centerY + 40)
        ctx.restore()
      } else {
        fillWave(900, 1.5, 25, 0, color, '30', centerY, H)
      }

      // ---------- MAIN WAVE ----------
      fillWave(1200, 0, 40, 0, color, '50', centerY, H)

      // Top outline
      ctx.beginPath()
      trace(1200, 0, 40)
      ctx.strokeStyle = color + 'C0'
      ctx.lineWidth = 2
      ctx.stroke()

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [color, mobileCenter])

  return (
    <canvas
      ref={canvasRef}
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

  const isMobileRef = useRef(false)

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

    function isMobile() {

      return window.matchMedia('(max-width: 767px)').matches

    }

    isMobileRef.current = isMobile()

    function lockScroll() {

      if (isMobileRef.current) return

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

      requestAnimationFrame(() => {

        next.style.opacity = '1'

        next.style.transform = 'translateY(0)'

        currentRef.current = index

        setTimeout(() => {

          isAnimatingRef.current = false

        }, 720)

      })

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

    let touchStartX = 0

function onTouchStart(e) {

  isMobileRef.current = isMobile()

  // Let navigation and mobile menu handle their own touches.

  if (e.target.closest('nav, .mobile-menu')) {

    return

  }

  if (isMobileRef.current && window.scrollY === 0) {

    e.preventDefault()

  }

  touchStartY = e.touches[0].clientY

  touchStartX = e.touches[0].clientX

}

function onTouchEnd(e) {

  // Never let the cinematic controller process nav touches.

  if (e.target.closest('nav, .mobile-menu')) {

    return

  }

  const delta = touchStartY - e.changedTouches[0].clientY

  const horizontalDelta = Math.abs(

    touchStartX - e.changedTouches[0].clientX

  )

  if (Math.abs(delta) < 30 || horizontalDelta > Math.abs(delta)) {

    return

  }

  const mobile = isMobileRef.current

  /*

   * On mobile, touchstart is prevented so the browser never

   * begins a competing native scroll. The cinematic controller

   * owns the Hero → Benzol → Boss sequence.

   */

  if (mobile) {

    if (window.scrollY > 0) {

      // Already released into Products — let native scroll take over.

      return

    }

    const current = currentRef.current

    if (current === 2 && delta > 0) {

      productsScrollBufferRef.current += Math.abs(delta)

      if (productsScrollBufferRef.current >= 140) {

        productsScrollBufferRef.current = 0

        releaseProductsRef.current = true

        window.scrollTo({

          top: window.innerHeight,

          behavior: 'smooth',

        })

      }

      return

    }

    if (current === 2 && delta < 0) {

      productsScrollBufferRef.current = 0

      releaseProductsRef.current = false

    }

    if (current === 0 && delta < 0) {

      return

    }

    if (isAnimatingRef.current) return

    if (delta > 0) {

      goTo(current + 1)

    } else {

      goTo(current - 1)

    }

    return

  }

  if (window.scrollY > 0) {

    return

  }

  const current = currentRef.current

  if (current === 2 && delta > 0) {

    return

  }

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

function onTouchMove(e) {

  // Navigation owns its own touch gestures.

  if (e.target.closest('nav, .mobile-menu')) {

    return

  }

  if (

    isMobileRef.current &&

    window.scrollY === 0 &&

    currentRef.current < 2

  ) {

    e.preventDefault()

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

      { passive: false }

    )

    window.addEventListener(

      'touchend',

      onTouchEnd,

      { passive: false }

    )

    window.addEventListener(

      'touchmove',

      onTouchMove,

      { passive: false }

    )

    return () => {

      window.removeEventListener('wheel', onWheel)

      window.removeEventListener('scroll', onScroll)

      window.removeEventListener('touchstart', onTouchStart)

      window.removeEventListener('touchend', onTouchEnd)

      window.removeEventListener('touchmove', onTouchMove)

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

      'opacity 0.72s cubic-bezier(0.22, 1, 0.36, 1), transform 0.72s cubic-bezier(0.22, 1, 0.36, 1)',

  })

  return (

    <>

      <style>{`

        #home {
          --bg: #14161b;
          --text: #F2F1EE;
          --muted: #A3A6AE;
        }

        /* Brand sections: keep the image and copy in one row on desktop. */
        #home .brand-layout {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          align-items: center !important;
          gap: clamp(1.25rem, 3vw, 2.5rem) !important;
        }

        #home .brand-image {
          display: block;
          flex: 0 0 38%;
          width: 38% !important;
          min-width: 0 !important;
          max-width: 38%;
          height: auto;
          object-fit: contain;
        }

        #home .brand-copy {
          flex: 1 1 0;
          min-width: 0;
        }

        #home .brand-copy h2 {
          overflow-wrap: normal;
          word-break: normal;
        }

        @media (max-width: 767px) {
          #home .brand-layout {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: auto !important;
          flex-direction: column !important;
          flex-wrap: nowrap !important;
          justify-content: center !important;
          align-items: center !important;
          box-sizing: border-box;
          padding: 10rem 1.25rem !important;
          gap: 0.75rem !important;
          }
          /* Unwrap the copy block so its children can be reordered around the image */
          #home .brand-copy { display: contents; }
          #home .brand-copy > * { align-self: center; text-align: center; }

          #home .brand-copy span {
            order: -1; /* brand name now sits above the image */
            font-size: 30px !important;
            letter-spacing: 4px !important;
            font-weight: 600;
          }
          #home .brand-image {
            order: 0;
            flex: 0 0 auto;
            width: min(86%, 390px) !important;
            max-width: 390px;
            min-width: 0 !important;
          }
          #home .brand-copy h2 {
            order: 1;
            font-size: clamp(2.6rem, 9.5vw, 4rem) !important;
          }
          #home .brand-copy p { order: 2; max-width: 340px !important; }
          #home .brand-copy a { order: 3; }

          #home {

            touch-action: none;

          }

          #home .hero-car {

            left: 50% !important;

            top: 20% !important;

            width: 84% !important;

            transform: translateX(-50%) !important;

          }

          #home .hero-copy {

            position: absolute !important;

            top: 47% !important;

            left: 0 !important;

            width: 100% !important;

            padding: 0 1.25rem !important;

            align-items: center !important;

            justify-content: center !important;

            text-align: center !important;

          }

          #home .hero-copy h1 {

            font-size: clamp(3.5rem, 18vw, 5.5rem) !important;

            text-align: center !important;

          }

          #home .hero-copy p {

            max-width: 300px !important;

            text-align: center !important;

            margin-top: 0.85rem !important;

          }

          #home .hero-car,

          #home .hero-copy {

            will-change: transform, opacity;

          }

        }

      `}</style>

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

            mobileCenter={0.41}

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

                'linear-gradient(to bottom, rgba(26,107,255,0.16), transparent)',

              zIndex: 1,

              pointerEvents: 'none',

            }}

          />

<img

  src="/cars/stack2.png"

  alt="Car"

  className="hero-car"

  style={{

    position: 'absolute',

    left: '28%',

    top: '50%',

    transform: 'translate(-50%, -50%)',

    width: '50%',

    height: 'auto',

    objectFit: 'contain',

    zIndex:0,

  }}

/>

          <div

            className="hero-copy"

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

            mobileCenter={0.46}

          />

          <div

            className="brand-layout"

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

              className="brand-image"

              style={{

                width: '38%',

                minWidth: '200px',

                height: 'auto',

                objectFit: 'contain',

                flexShrink: 0,

              }}

            />

            <div

              className="brand-copy"

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

{/* <Link
  href="/shop"
  style={{
    color: '#C9A84C',
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    textDecoration: 'none',
  }}
>
  See Products →
</Link> */}

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

            mobileCenter={0.46}

          />

          <div

            className="brand-layout"

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

              className="brand-image"

              style={{

                width: '38%',

                minWidth: '200px',

                height: 'auto',

                objectFit: 'contain',

                flexShrink: 0,

              }}

            />

            <div

              className="brand-copy"

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

<Link
  href="/shop"
  style={{
    color: '#1A6BFF',
    fontSize: '11px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    textDecoration: 'none',
  }}
>
  See Products →
</Link>

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