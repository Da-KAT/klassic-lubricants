'use client'

import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  Suspense,
} from 'react'
import { createPortal } from 'react-dom'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  PRODUCTS,
  BRAND_ACCENT,
  CATEGORIES,
  BRANDS,
} from '@/app/data/products'
import Nav from '@/components/Nav'

function SlidingTabs({ items, active, onChange }) {
  const containerRef = useRef(null)

  const [inkStyle, setInkStyle] = useState({
    left: 0,
    width: 0,
  })

  useLayoutEffect(() => {
    const updateInk = () => {
      const container = containerRef.current
      if (!container) return

      const activeBtn = container.querySelector(
        '[data-active="true"]'
      )

      if (!activeBtn) return

      setInkStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      })
    }

    updateInk()

    window.addEventListener('resize', updateInk)

    return () => {
      window.removeEventListener('resize', updateInk)
    }
  }, [active, items])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'flex',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        borderBottom:
          '1px solid rgba(255,255,255,0.08)',
        width: '100%',
      }}>
      <motion.div
        animate={{
          left: inkStyle.left,
          width: inkStyle.width,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 35,
        }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          background: 'var(--orange)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {items.map(item => (
        <button
          key={item}
          data-active={
            active === item ? 'true' : 'false'
          }
          onClick={() => onChange(item)}
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            padding: '0.75rem 1.5rem',
            whiteSpace: 'nowrap',
            color:
              active === item
                ? '#fff'
                : 'var(--muted)',
            transition: 'color 0.15s ease',
          }}>
          {item}
        </button>
      ))}
    </div>
  )
}

function FilterTabs({
  activeBrand,
  setActiveBrand,
  activeCategory,
  setActiveCategory,
  isFixed = false,
  navHeight = 0,
}) {
  const content = (
    <>
      <div className="px-6 md:px-20">
        <SlidingTabs
          items={BRANDS}
          active={activeBrand}
          onChange={setActiveBrand}
        />
      </div>

      <div className="px-6 md:px-20">
        <SlidingTabs
          items={CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>
    </>
  )

  const filterStyle = {
    background: 'var(--bg)',
    width: '100%',
    boxSizing: 'border-box',
    opacity: 1,
  }

  if (!isFixed) {
    return (
      <div style={filterStyle}>
        {content}
      </div>
    )
  }

  return createPortal(
    <div
      style={{
        ...filterStyle,
        position: 'fixed',
        top: `${navHeight}px`,
        left: 0,
        right: 0,
        zIndex: 9999,

        borderBottom:
          '1px solid rgba(255,255,255,0.06)',

        boxShadow:
          '0 8px 20px rgba(0,0,0,0.12)',
      }}>
      {content}
    </div>,
    document.body
  )
}

function ShopInner() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [activeBrand, setActiveBrand] =
    useState(
      searchParams.get('brand') || 'All'
    )

  const [activeCategory, setActiveCategory] =
    useState(
      searchParams.get('category') || 'All'
    )

  const filterRef = useRef(null)

  const [isStuck, setIsStuck] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const [filterHeight, setFilterHeight] =
    useState(0)

  const filtered = PRODUCTS.filter(product => {
    const brandMatch =
      activeBrand === 'All' ||
      product.brand === activeBrand

    const categoryMatch =
      activeCategory === 'All' ||
      product.category === activeCategory

    return brandMatch && categoryMatch
  })

  /*
   * Find the Nav height so the sticky tabs
   * sit directly underneath it.
   */
  useLayoutEffect(() => {
    const measureNav = () => {
      const nav =
        document.querySelector('nav') ||
        document.querySelector('header')

      if (!nav) return

      setNavHeight(
        nav.getBoundingClientRect().height
      )
    }

    measureNav()

    window.addEventListener(
      'resize',
      measureNav
    )

    return () => {
      window.removeEventListener(
        'resize',
        measureNav
      )
    }
  }, [])

  /*
   * Measure the filter bar itself.
   */
  useLayoutEffect(() => {
    const measureFilter = () => {
      if (!filterRef.current) return

      setFilterHeight(
        filterRef.current.getBoundingClientRect()
          .height
      )
    }

    measureFilter()

    const observer =
      'ResizeObserver' in window
        ? new ResizeObserver(measureFilter)
        : null

    if (observer && filterRef.current) {
      observer.observe(filterRef.current)
    }

    window.addEventListener(
      'resize',
      measureFilter
    )

    return () => {
      observer?.disconnect()

      window.removeEventListener(
        'resize',
        measureFilter
      )
    }
  }, [])

  /*
   * Detect when the tabs have reached the bottom
   * of the Nav.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current) return

      const rect =
        filterRef.current.getBoundingClientRect()

      /*
       * Once the top of the filter reaches the
       * bottom of the Nav, make the fixed copy appear.
       */
      const shouldStick =
        rect.top <= navHeight

      setIsStuck(shouldStick)
    }

    handleScroll()

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    window.addEventListener(
      'resize',
      handleScroll
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )

      window.removeEventListener(
        'resize',
        handleScroll
      )
    }
  }, [navHeight])

  return (
    <main
      style={{
        background: 'var(--bg)',
        minHeight: '100svh',
      }}>
      <Nav />

      {/* =================================================
          PAGE HEADER
          ================================================= */}
      <div
        className="px-6 md:px-20"
        style={{
          paddingTop: '96px',
          paddingBottom: '0.5rem',
        }}>
        <h1
          className="leading-none"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize:
              'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--text)',
          }}>
          Our Products
        </h1>

        <p
          style={{
            color: 'var(--muted)',
            fontSize: '0.75rem',
            marginTop: '0.15rem',
          }}>
          {filtered.length} product
          {filtered.length !== 1
            ? 's'
            : ''}{' '}
          found
        </p>
      </div>

      {/* =================================================
          ORIGINAL FILTER BAR
          
          This stays exactly where it belongs in the
          document and scrolls normally.
          ================================================= */}
      <div
        ref={filterRef}
        style={{
          position: 'relative',
          zIndex: 20,
          background: 'var(--bg)',
        }}>
        <FilterTabs
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      {/* =================================================
          FIXED COPY

          Only exists while the original tabs have
          reached the Nav.
          ================================================= */}
      {isStuck && (
        <FilterTabs
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isFixed
          navHeight={navHeight}
        />
      )}

      {/* =================================================
          PRODUCT GRID
          ================================================= */}
      {filtered.length > 0 ? (
        <div
          className="product-grid px-4 md:px-20 pb-20"
          style={{
            display: 'grid',

            // Mobile = exactly 2 columns
            gridTemplateColumns:
              'repeat(2, minmax(0, 1fr))',

            // Space between columns
            columnGap: '12px',

            // Space between rows
            rowGap: '12px',

            background: 'var(--bg)',
          }}>
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() =>
                router.push(
                  `/shop/${product.id}`
                )
              }
            />
          ))}
        </div>
      ) : (
        <div
          className="px-6 md:px-20 py-20"
          style={{
            color: 'var(--muted)',
            fontSize: '0.875rem',
          }}>
          No products match this filter.
        </div>
      )}
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopInner />
    </Suspense>
  )
}

function ProductCard({ product, onClick }) {
  const accent =
    BRAND_ACCENT[product.brand]

  return (
    <div
      className="product-card"
      onClick={onClick}
      style={{
        background: 'var(--bg-2)',
        padding: '0.8rem',

        cursor: 'pointer',

        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',

        transition:
          'background 0.2s ease',

        minWidth: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background =
          'var(--bg-3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background =
          'var(--bg-2)'
      }}>
      {/* Product image */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1',

          background:
            accent + '0d',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          color: 'var(--muted)',
          fontSize: '9px',
          letterSpacing: '2px',
        }}>
        IMG
      </div>

      {/* Brand */}
      <span
        style={{
          color: accent,
          fontSize: '9px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
        {product.brand}
      </span>

      {/* Product name */}
      <span
        style={{
          color: 'var(--text)',
          fontSize: '0.78rem',
          fontWeight: 600,
          lineHeight: 1.3,
        }}>
        {product.name}
      </span>

      {/* Sizes */}
      <div
        style={{
          display: 'flex',
          gap: '0.3rem',
          flexWrap: 'wrap',
        }}>
        {product.sizes.map(size => (
          <span
            key={size}
            style={{
              fontSize: '8px',
              letterSpacing: '0.7px',

              color: 'var(--muted)',

              border:
                '1px solid rgba(255,255,255,0.08)',

              padding:
                '0.15rem 0.35rem',
            }}>
            {size}
          </span>
        ))}
      </div>
    </div>
  )
}
