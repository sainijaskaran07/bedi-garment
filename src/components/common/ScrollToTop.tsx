import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Force immediate viewport reset to top on page navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // Instant snap to top
    })
  }, [pathname])

  return null
}

export default ScrollToTop
