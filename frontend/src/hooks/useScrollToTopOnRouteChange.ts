import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToTopOnRouteChange() {
  const location = useLocation()

  useEffect(() => {
    // GitHub Pages is static, so HashRouter handles routing; reset scroll for a "page-like" feel.
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname, location.search, location.hash])
}

