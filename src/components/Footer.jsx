'use client'

const LINKS = ['Home', 'Brands', 'Shop', 'About', 'Contact']

const BRANCHES = [
  { city: 'Accra', phone: '+233 XX XXX XXXX', address: 'Placeholder Address, Accra' },
  { city: 'Kumasi', phone: '+233 XX XXX XXXX', address: 'Placeholder Address, Kumasi' },
  { city: 'Tamale', phone: '+233 XX XXX XXXX', address: 'Placeholder Address, Tamale' },
]

const FORMSPREE_URL = 'https://formspree.io/f/YOUR_ID_HERE'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="px-8 md:px-20 py-16"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>

      <div className="flex flex-col md:flex-row gap-0">

        {/* Left */}
        <div
          className="flex flex-col gap-10 flex-1 pr-0 md:pr-16 pb-12 md:pb-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
          <div
            className="tracking-widest"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', color: 'var(--text)' }}>
            KLASSIC LUBRICANTS
          </div>

          <div className="flex flex-col gap-3">
            {LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity w-fit"
                style={{ color: 'var(--muted)' }}>
                {link}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            {BRANCHES.map(branch => (
              <div key={branch.city} className="flex flex-col gap-1">
                <span
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: 'var(--orange)' }}>
                  {branch.city}
                </span>
                <span className="text-sm" style={{ color: 'var(--muted)' }}>
                  {branch.address}
                </span>
                <a
                  href={`tel:${branch.phone}`}
                  className="text-sm hover:opacity-70 transition-opacity w-fit"
                  style={{ color: 'var(--text)' }}>
                  {branch.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical separator — desktop only */}
        <div
          className="hidden md:block flex-shrink-0"
          style={{
            width: '1px',
            background: 'rgba(255,255,255,0.06)',
            alignSelf: 'stretch',
          }}
        />

        {/* Right */}
        <div className="flex flex-col gap-6 flex-1 pl-0 md:pl-16 pt-12 md:pt-0">
          <h3
            className="leading-none"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--text)',
            }}>
            Get a Quote
          </h3>

          <form action={FORMSPREE_URL} method="POST" className="flex flex-col gap-4">
            {[
              { name: 'name', placeholder: 'Your Name', type: 'text' },
              { name: 'email', placeholder: 'Email or Phone', type: 'text' },
              { name: 'company', placeholder: 'Company (optional)', type: 'text' },
            ].map(field => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 text-sm outline-none"
                style={{
                  background: 'var(--bg-2)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text)',
                }}
              />
            ))}

            <textarea
              name="message"
              placeholder="What products are you interested in?"
              rows={4}
              className="w-full px-4 py-3 text-sm outline-none resize-none"
              style={{
                background: 'var(--bg-2)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text)',
              }}
            />

            <button
              type="submit"
              className="px-6 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-80 w-fit"
              style={{ background: 'var(--orange)', color: '#fff' }}>
              Send Request
            </button>
          </form>
        </div>

      </div>

      {/* Bottom bar */}
      <div
        className="mt-16 pt-6 flex flex-col md:flex-row justify-between gap-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="text-xs" style={{ color: 'var(--muted)' }}>
          © 2025 Klassic Lubricants. All rights reserved.
        </span>
        <span className="text-xs" style={{ color: 'var(--muted)' }}>
          Accra · Kumasi · Tamale
        </span>
      </div>

    </footer>
  )
}