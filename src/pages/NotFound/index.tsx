import React from 'react'
import { SEO } from '../../components/common'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-white min-h-[70vh] flex flex-col items-center justify-center text-center p-8 select-none text-brand-text font-body">
      <SEO 
        title="Page Not Found | Bedi Garments" 
        description="The page you are looking for does not exist on Bedi Garments. Please navigate back to our homepage."
      />
      <div className="space-y-6 max-w-md">
        <span className="inline-block text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase bg-bg-secondary px-3 py-1.5 rounded-sm">
          Error 404
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight leading-none uppercase">
          Page Not Found
        </h1>
        <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed max-w-sm mx-auto font-medium">
          The editorial collection page or uniform query you are attempting to locate is unavailable or has been relocated.
        </p>
        <div className="pt-4">
          <a
            href="/"
            className="inline-block px-8 py-3.5 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded shadow-md hover:bg-brand-accent transition-all duration-300 focus:outline-none"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
