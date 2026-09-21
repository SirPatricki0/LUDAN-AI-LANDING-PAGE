import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import Manifesto from './components/Manifesto.jsx'
import Services from './components/Services.jsx'
import Method from './components/Method.jsx'
import Calculator from './components/Calculator.jsx'
import Commitments from './components/Commitments.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Manifesto />
        <Services />
        <Method />
        <Calculator />
        <Commitments />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
