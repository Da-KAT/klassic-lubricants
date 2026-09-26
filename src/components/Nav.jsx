'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/#contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(10px)',
        }}
      >

        {/* Logo + Brand Name */}
        <div className="z-[110] flex items-center">

          {/* Mobile logo + brand */}
          <div className="md:hidden flex items-center">
            <img
              src="/logo (2).png"
              alt="Klassic Lubricants"
              className="h-8 w-auto object-contain"
            />

            <span
              style={{
                marginLeft: '9px',
                color: '#f0f0f0',
                fontFamily: 'Arial Narrow, Helvetica Neue, Arial, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                textShadow: '0 1px 8px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>KLASSIC</span>
              <span>LUBRICANTS</span>
            </span>
          </div>

          {/* Desktop logo + brand */}
          <div className="hidden md:flex items-center">
            <img
              src="/logo (2).png"
              alt="Klassic Lubricants"
              className="h-10 w-auto object-contain"
            />

            <span
              style={{
                marginLeft: '12px',
                color: '#f0f0f0',
                fontFamily: 'Arial Narrow, Helvetica Neue, Arial, sans-serif',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                textShadow: '0 1px 8px rgba(0,0,0,0.4)',
              }}
            >
              KLASSIC LUBRICANTS
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map(link => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm tracking-widest uppercase hover:text-orange-500 transition-colors"
                style={{ color: 'var(--text)' }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(prev => !prev)}
          className="md:hidden flex flex-col gap-1.5 z-[110] relative p-2"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              open ? 'rotate-45 translate-y-2' : ''
            }`}
          />

          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />

          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              open ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Dark backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] md:hidden"
            style={{
              background: 'rgba(0,0,0,0.4)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed top-0 right-0 h-full z-[90] md:hidden flex flex-col justify-center gap-8 px-10"
            style={{
              width: '70%',
              background: 'rgba(10,10,10,0.97)',
            }}
          >
            {links.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-2xl tracking-widest uppercase hover:text-orange-500 transition-colors"
                style={{
                  color: 'var(--text)',
                  fontFamily: 'var(--font-bebas)',
                }}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
