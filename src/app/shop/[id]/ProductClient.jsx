'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND_ACCENT } from '@/app/data/products'

export default function ProductClient({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const accent = BRAND_ACCENT[product.brand]
  const router = useRouter()

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.brand} ${product.name} (${selectedSize}). Please provide pricing and availability.`
  )

  const whatsappUrl = `https://wa.me/233XXXXXXXXX?text=${whatsappMessage}`

  return (
    <div
      className="px-8 md:px-20"
      style={{
        paddingTop: '96px',
        paddingBottom: '4rem',
      }}
    >
      {/* Back */}
      <button
        onClick={() => router.push('/shop')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--muted)',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: 0,
        }}
      >
        ← Back to Shop
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1fr)',
          gap: '4rem',
          alignItems: 'start',
        }}
        className="flex flex-col md:grid"
      >
        {/* =================================================
            PRODUCT IMAGE
            ================================================= */}
        <div
          style={{
            width: '100%',
            maxWidth: '480px',
            aspectRatio: '1 / 1',
            background: accent + '0d',
            border: `1px solid ${accent}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--muted)',
            fontSize: '11px',
            letterSpacing: '3px',
            overflow: 'hidden',
            margin: '0 auto',
          }}
        >
          PRODUCT IMAGE
        </div>

        {/* =================================================
            PRODUCT INFO
            ================================================= */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {/* Brand + category */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.35rem',
            }}
          >
            {/* Brand */}
            <button
              onClick={() =>
                router.push(
                  `/shop?brand=${product.brand}`
                )
              }
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: accent,
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              {product.brand}
            </button>

            {/* Category */}
            <button
              onClick={() =>
                router.push(
                  `/shop?category=${encodeURIComponent(
                    product.category
                  )}`
                )
              }
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: 'var(--muted)',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {product.category}
            </button>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize:
                'clamp(2.5rem, 5vw, 4.5rem)',
              color: 'var(--text)',
              lineHeight: 1,
            }}
          >
            {product.name}
          </h1>

          {/* =================================================
              AVAILABILITY
              ================================================= */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                color: 'var(--muted)',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              Availability:
            </span>

            <span
              style={{
                color: 'var(--text)',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {product.availability}
            </span>
          </div>

          {/* =================================================
              SIZE SELECTOR
              ================================================= */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Size
            </span>

            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  style={{
                    background:
                      selectedSize === size
                        ? accent
                        : 'transparent',
                    border: `1px solid ${
                      selectedSize === size
                        ? accent
                        : 'rgba(255,255,255,0.1)'
                    }`,
                    color:
                      selectedSize === size
                        ? '#fff'
                        : 'var(--muted)',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    transition:
                      'all 0.2s ease',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              height: '1px',
              background:
                'rgba(255,255,255,0.06)',
            }}
          />

          {/* =================================================
              CTAs
              ================================================= */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                '1fr 1fr',
              gap: '0.75rem',
            }}
          >
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25D366',
                color: '#fff',
                padding:
                  '0.875rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.01em',
                textDecoration: 'none',
                textAlign: 'center',
                transition:
                  'opacity 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'center',
                gap: '0.4rem',
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.opacity =
                  '0.85')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.opacity =
                  '1')
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>

              WhatsApp
            </a>

            {/* Call */}
            <a
              href="tel:+233XXXXXXXXX"
              style={{
                background:
                  'transparent',
                border: `1px solid ${accent}`,
                color: 'var(--text)',
                padding:
                  '0.875rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.01em',
                textDecoration: 'none',
                textAlign: 'center',
                transition:
                  'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'center',
                gap: '0.4rem',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background =
                  accent
                e.currentTarget.style.color =
                  '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background =
                  'transparent'
                e.currentTarget.style.color =
                  'var(--text)'
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>

              Call to Order
            </a>
          </div>

          <div
            style={{
              height: '1px',
              background:
                'rgba(255,255,255,0.06)',
            }}
          />

          {/* =================================================
              META
              ================================================= */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                color: 'var(--muted)',
                fontSize: '12px',
              }}
            >
              Brand:{' '}
              <span
                style={{
                  color: 'var(--text)',
                }}
              >
                {product.brand}
              </span>
            </span>

            <span
              style={{
                color: 'var(--muted)',
                fontSize: '12px',
              }}
            >
              Category:{' '}
              <span
                style={{
                  color: 'var(--text)',
                }}
              >
                {product.category}
              </span>
            </span>

            <span
              style={{
                color: 'var(--muted)',
                fontSize: '12px',
              }}
            >
              Available sizes:{' '}
              <span
                style={{
                  color: 'var(--text)',
                }}
              >
                {product.sizes.join(', ')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
