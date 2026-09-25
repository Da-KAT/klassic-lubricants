import Nav from '@/components/Nav'
import CinematicStage from '@/components/CinematicStage'
import ProductStrip from '@/components/ProductStrip'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />

      <main style={{ background: 'var(--bg)' }}>
        <CinematicStage />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'var(--bg)',
          }}
        >
          <ProductStrip />
          <About />
          <Testimonials />
          <Footer />
        </div>
      </main>
    </>
  )
}