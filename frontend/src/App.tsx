import { HashRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Businesses from './pages/Businesses'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Home from './pages/Home'
import Process from './pages/Process'
import TopNav from './components/TopNav'
import Footer from './components/Footer'
import { useScrollToTopOnRouteChange } from './hooks/useScrollToTopOnRouteChange'

export default function App() {
  return (
    <HashRouter>
      <RouteChangeHandler />
      <TopNav />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/process" element={<Process />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}

function RouteChangeHandler() {
  useScrollToTopOnRouteChange()
  return null
}

