'use client'

import {
  useState,
  useRef,
  useLayoutEffect,
  Suspense,
} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  PRODUCTS,
  BRAND_ACCENT,
} from '@/app/data/products'
import Nav from '@/components/Nav'


/* =========================================================
   OIL STRUCTURE

   Virgin:
   - Benzol

   Recycled:
   - Boss
   - Lex
   - CCG
   - High Speed
   ========================================================= */

const OIL_SOURCES = [
  'All',
  'Virgin Oils',
  'Recycled Oils',
]

const SOURCE_VALUES = {
  'Virgin Oils': 'virgin',
  'Recycled Oils': 'recycled',
}

const RECYCLED_BRANDS = [
  'Boss',
  'Flex',
  'CTG',
  'Hi-Speed',
]

const SHOP_CATEGORIES = [
  'ATF',
  'Brake Fluid',
  'Engine Oil',
  'Gear Oil',
  'Grease',
  'Others',
]


/* =========================================================
   SLIDING TABS
   ========================================================= */

function SlidingTabs({
  items,
  active,
  onChange,
}) {
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
        borderBottom: '1px solid rgba(255,255,255,0.08)',
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
          data-active={active === item ? 'true' : 'false'}
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
            padding: '0.6rem 1.25rem',
            whiteSpace: 'nowrap',
            color: active === item ? '#fff' : 'var(--muted)',
            transition: 'color 0.15s ease',
          }}>
          {item}
        </button>
      ))}
    </div>
  )
}


/* =========================================================
   DROPDOWN PILL

   NOTE: no fixed minWidth anymore — pills flex to share
   the row on mobile (via className), and only get a fixed
   min-width back on md+ screens.
   ========================================================= */

function FilterPill({
  value,
  placeholder,
  options,
  onChange,
}) {
  return (
    <div
      className="min-w-0 flex-1 md:flex-none"
      style={{
        position: 'relative',
        display: 'inline-flex',
      }}>

      <select
        className="w-full md:w-auto md:min-w-[145px]"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          background: 'var(--bg-2)',
          color: value ? 'var(--text)' : 'var(--muted)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '999px',
          padding: '0.55rem 2.25rem 0.55rem 1rem',
          fontSize: '10px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        <option value="All">
          All
        </option>

        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Dropdown arrow */}

      <span
        style={{
          position: 'absolute',
          right: '0.85rem',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: 'var(--muted)',
          fontSize: '9px',
        }}>
        ▼
      </span>

    </div>
  )
}


/* =========================================================
   FILTER TABS
   ========================================================= */

function FilterTabs({
  activeSource,
  setActiveSource,

  activeBrand,
  setActiveBrand,

  activeCategory,
  setActiveCategory,
}) {
  const isVirgin = activeSource === 'Virgin Oils'

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* =================================================
          PRIMARY FILTER
          VIRGIN / RECYCLED
          ================================================= */}

      <SlidingTabs
        items={OIL_SOURCES}
        active={activeSource}
        onChange={source => {
          setActiveSource(source)

          /*
           * Reset brand when changing source.
           * Virgin has no brand selector.
           */
          setActiveBrand('')

          /*
           * Keep category when switching sources.
           * This makes the filter feel less destructive.
           */
        }}
      />


      {/* =================================================
          DROPDOWN FILTERS

          flex-nowrap so the two pills stay side by side
          on mobile instead of wrapping to their own lines.
          ================================================= */}

      <div
        className="flex flex-nowrap items-center gap-2 mt-2 pb-1">

        {/* BRAND — RECYCLED ONLY */}

        {!isVirgin && (
          <FilterPill
            value={activeBrand}
            placeholder="Select Brand"
            options={RECYCLED_BRANDS}
            onChange={setActiveBrand}
          />
        )}


        {/* CATEGORY */}

        <FilterPill
          value={activeCategory}
          placeholder="Select Category"
          options={SHOP_CATEGORIES}
          onChange={setActiveCategory}
        />

      </div>

    </div>
  )
}


/* =========================================================
   SHOP
   ========================================================= */

function ShopInner() {
  const searchParams = useSearchParams()
  const router = useRouter()


  /* =======================================================
     FILTER STATE
     ======================================================= */

  const initialSource = searchParams.get('source')
  const initialBrand = searchParams.get('brand')
  const initialCategory = searchParams.get('category')

  const [activeSource, setActiveSource] = useState(
    initialSource === 'recycled'
      ? 'Recycled Oils'
      : initialSource === 'virgin'
        ? 'Virgin Oils'
        : 'All'
  )

  const [activeBrand, setActiveBrand] = useState(initialBrand || '')
  const [activeCategory, setActiveCategory] = useState(initialCategory || '')

  const [navHeight, setNavHeight] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(0)

  const headerRef = useRef(null)


  /* =======================================================
     FILTER PRODUCTS
     ======================================================= */

  const filtered = PRODUCTS.filter(product => {
    const selectedType = SOURCE_VALUES[activeSource]

    const sourceMatch =
      activeSource === 'All' || product.type === selectedType

    const brandMatch =
      !activeBrand ||
      activeBrand === 'All' ||
      product.brand === activeBrand

    const categoryMatch =
      !activeCategory ||
      activeCategory === 'All' ||
      product.category === activeCategory

    return sourceMatch && brandMatch && categoryMatch
  })


  /* =======================================================
     NAV HEIGHT

     The fixed header block below needs an explicit `top`
     equal to the fixed nav's height, or it sits flush
     against the very top of the viewport (behind the nav)
     instead of just under it.
     ======================================================= */

  useLayoutEffect(() => {
    const measureNav = () => {
      const nav =
        document.querySelector('nav') ||
        document.querySelector('header')

      if (!nav) return

      setNavHeight(nav.getBoundingClientRect().height)
    }

    measureNav()

    window.addEventListener('resize', measureNav)

    return () => {
      window.removeEventListener('resize', measureNav)
    }
  }, [])


  /* =======================================================
     HEADER BLOCK HEIGHT

     Since the header (title + filter tabs) is now taken
     out of normal flow via `position: fixed`, nothing below
     it knows to leave room for it. We measure its rendered
     height here and use it to pad the scrollable content,
     so the grid starts right below the header instead of
     underneath it.

     Recomputed on navHeight changes (nav height affects
     nothing here directly, but keeps this effect re-running
     alongside layout changes) and on activeSource, since
     toggling the brand pill can, in edge cases, affect
     wrapping/height on very narrow viewports.
     ======================================================= */

  useLayoutEffect(() => {
    const measureHeader = () => {
      const header = headerRef.current
      if (!header) return

      setHeaderHeight(header.getBoundingClientRect().height)
    }

    measureHeader()

    window.addEventListener('resize', measureHeader)

    return () => {
      window.removeEventListener('resize', measureHeader)
    }
  }, [navHeight, activeSource])


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main
      style={{
        background: 'var(--bg)',
        minHeight: '100svh',
      }}>

      <Nav />


      {/* =================================================
          FIXED HEADER BLOCK

          Contains the page title/count AND the filter tabs
          as one unit, pinned below the nav. Content in the
          grid below scrolls underneath this — it never
          moves, it's simply not part of the scroll flow.
          ================================================= */}

      <div
        ref={headerRef}
        style={{
          position: 'fixed',
          top: `${navHeight}px`,
          left: 0,
          right: 0,
          zIndex: 20,
          background: 'var(--bg)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>

        {/* =============================================
            HEADER ROW — stacked on every breakpoint.
            Title kept small (see fontSize below) so this
            whole block stays short even on desktop.
            ============================================= */}

        <div
          className="px-6 md:px-20"
          style={{
            paddingTop: '1.1rem',
            paddingBottom: '0.5rem',
          }}>

          {/* PAGE HEADER */}

          <div>
            <h1
              className="leading-none"
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
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
              {filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>


          {/* FILTER TABS */}

          <div className="mt-2">
            <FilterTabs
              activeSource={activeSource}
              setActiveSource={setActiveSource}
              activeBrand={activeBrand}
              setActiveBrand={setActiveBrand}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

        </div>

      </div>


      {/* =================================================
          SCROLLABLE CONTENT

          paddingTop = navHeight + headerHeight, so the grid
          starts exactly below the fixed nav + header block
          instead of being hidden underneath it.
          ================================================= */}

      <div style={{ paddingTop: `${navHeight + headerHeight}px` }}>

        {filtered.length > 0 ? (

          <div
            className="product-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4 md:px-20 pb-20"
            style={{
              columnGap: '12px',
              rowGap: '12px',
              background: 'var(--bg)',
              paddingTop: '0.75rem',
            }}>

            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => router.push(`/shop/${product.id}`)}
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

      </div>

    </main>
  )
}


/* =========================================================
   PAGE
   ========================================================= */

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopInner />
    </Suspense>
  )
}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function ProductCard({
  product,
  onClick,
}) {
  const accent = BRAND_ACCENT[product.brand]

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
        transition: 'background 0.2s ease',
        minWidth: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--bg-3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--bg-2)'
      }}>

      {/* Product image */}

      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          background: accent + '0d',
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
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '0.15rem 0.35rem',
            }}>
            {size}
          </span>
        ))}

      </div>

    </div>
  )
}