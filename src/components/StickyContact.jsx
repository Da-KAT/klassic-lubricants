'use client'

const PHONE = '233240333888' // digits only, with country code
const WA_TEXT = "Hello Klassic Lubricants, I'd like to make an enquiry."

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.800 1 1-3.700-.2-.4a9.800 9.800 0 0 1-1.500-5.200c0-5.400 4.400-9.800 9.900-9.800 2.600 0 5.100 1 6.900 2.900a9.700 9.700 0 0 1 2.900 6.900c0 5.400-4.500 9.900-9.900 9.900zm5.400-7.400c-.3-.1-1.800-.9-2-1s-.5-.1-.7.1-.8 1-1 1.200-.4.200-.7.100a8 8 0 0 1-4-3.500c-.3-.5.300-.5.900-1.600.1-.2 0-.4 0-.5l-.9-2.200c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400s-1 1-1 2.500 1.100 2.900 1.200 3.100c.1.200 2.100 3.200 5.100 4.500 1.900.8 2.600.9 3.600.7.600-.1 1.800-.7 2-1.400.3-.7.300-1.300.2-1.400-.1-.2-.3-.2-.6-.4z" />
  </svg>
)

export default function StickyContact() {
  return (
    <>
      <style>{`
        .sc-wrap {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          z-index: 60;
          display: flex;
          background: #14161b;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .sc-btn {
          flex: 1;
          min-height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
        }
        .sc-call { background: var(--orange, #FF6B00); color: #fff; }
        .sc-wa   { background: #25D366; color: #0b1f12; }
        .sc-spacer { height: calc(56px + env(safe-area-inset-bottom, 0px)); }

        @media (min-width: 769px) {
          .sc-wrap {
            top: 50%; bottom: auto; right: auto;
            transform: translateY(-50%);
            flex-direction: column;
            background: transparent;
            border-top: none;
            padding-bottom: 0;
          }
          .sc-btn {
            flex: none;
            width: 56px;
            justify-content: flex-start;
            padding: 0 18px;
            overflow: hidden;
            transition: width .3s ease;
          }
          .sc-btn:hover, .sc-btn:focus-visible { width: 180px; }
          .sc-spacer { display: none; }
        }
      `}</style>

      <nav className="sc-wrap" aria-label="Quick contact">
        <a className="sc-btn sc-call" href={`tel:+${PHONE}`}>
          <PhoneIcon /> <span>Call us</span>
        </a>
        <a
          className="sc-btn sc-wa"
          href={`https://wa.me/${PHONE}?text=${encodeURIComponent(WA_TEXT)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon /> <span>WhatsApp</span>
        </a>
      </nav>
      <div className="sc-spacer" aria-hidden="true" />
    </>
  )
}