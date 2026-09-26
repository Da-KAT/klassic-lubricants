'use client'

import Link from 'next/link'
import { PRODUCTS, BRAND_ACCENT } from '@/app/data/products'

function ProductCard({ product }) {
  const accent = BRAND_ACCENT[product.brand]

  return (
    <Link
      href={`/shop/${product.id}`}
      className="flex flex-col gap-3 p-4 transition-all hover:-translate-y-1"
      style={{
        background: 'var(--bg-2)',
        border: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        minWidth: 0,
        textDecoration: 'none',
      }}
    >
      {/* Product image */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          background: accent + '0d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ) : (
          <span
            style={{
              color: 'var(--muted)',
              fontSize: '9px',
              letterSpacing: '2px',
            }}
          >
            IMG
          </span>
        )}
      </div>

      {/* Brand */}
      <span
        className="text-xs tracking-widest uppercase"
        style={{
          color: accent,
        }}
      >
        {product.brand}
      </span>

      {/* Product name */}
      <span
        className="text-base font-semibold leading-tight"
        style={{
          color: 'var(--text)',
        }}
      >
        {product.name}
      </span>

      {/* Sizes */}
      <div
        style={{
          display: 'flex',
          gap: '0.3rem',
          flexWrap: 'wrap',
        }}
      >
        {product.sizes?.map(size => (
          <span
            key={size}
            style={{
              fontSize: '8px',
              letterSpacing: '0.7px',
              color: 'var(--muted)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '0.15rem 0.35rem',
            }}
          >
            {size}
          </span>
        ))}
      </div>
    </Link>
  )
}

export default function ProductStrip() {
  // Pull directly from the same PRODUCTS source
  // used by the Shop page and product detail pages.
  const featuredProducts = PRODUCTS.slice(0, 6)

  return (
    <section
      id="shop"
      className="px-8 md:px-20 py-20"
      style={{
        background: 'var(--bg)',
      }}
    >
      <div className="flex items-end justify-between mb-8">
        <h2
          className="leading-none"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: 'var(--text)',
          }}
        >
          Our Products
        </h2>

        <Link
          href="/shop"
          className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
          style={{
            color: 'var(--orange)',
            textDecoration: 'none',
          }}
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {featuredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}
