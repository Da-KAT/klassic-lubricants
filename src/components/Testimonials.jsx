'use client'

import { motion } from 'framer-motion'

// ============================================================
// TESTIMONIALS
// No avatars — name, role, quote only
// Increase readability with larger quote, more spacing
// ============================================================

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Klassic has been our go-to supplier for three years. Consistent quality, fast delivery, no complaints.',
    name: 'Kwame A.',
    role: 'Fleet Manager, Accra',
  },
  {
    id: 2,
    quote: 'The Benzol engine oils have noticeably improved the performance of our workshop vehicles.',
    name: 'Emmanuel T.',
    role: 'Workshop Owner, Kumasi',
  },
  {
    id: 3,
    quote: 'Reliable, professional, and the prices are competitive. Highly recommend for bulk orders.',
    name: 'Ama S.',
    role: 'Procurement Officer, Tamale',
  },
]

export default function Testimonials() {
  return (
    <section
      className="px-8 md:px-20 py-24"
      style={{ background: 'var(--bg-2)' }}>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 leading-none"
        style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--text)' }}>
        What Clients Say
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col gap-6 p-8"
            style={{
              background: 'var(--bg)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>

            {/* Quote mark */}
            <span style={{ color: 'var(--orange)', fontSize: '2rem', lineHeight: 1 }}>"</span>

            {/* Quote */}
            <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.8' }}>
              {t.quote}
            </p>

            {/* Separator */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

            {/* Attribution */}
            <div className="flex flex-col gap-1">
              <span style={{ color: 'var(--text)', fontSize: '0.85rem', fontWeight: 600 }}>
                {t.name}
              </span>
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                {t.role}
              </span>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  )
}