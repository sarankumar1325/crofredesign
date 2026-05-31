import Nav from './components/nav/Nav'
import Hero from './components/hero/Hero'
import CodeSection from './components/code-snippet/CodeSection'
import ModelTableSection from './components/features/ModelTableSection'
import PricingSection from './components/pricing/PricingSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ backgroundColor: '#08080F', minHeight: '100dvh' }}>
      <Nav />
      <Hero />
      <CodeSection />
      <ModelTableSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
