import React from 'react'
import { Link } from 'react-router-dom'

export const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center justify-center select-none focus:outline-none"
      aria-label="Bedi Garments Home"
    >
      <img
        src="/logo.png"
        alt="Bedi Garments Logo"
        className="h-20 md:h-28 w-auto object-contain transition-transform duration-300 hover:scale-103"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </Link>
  )
}
