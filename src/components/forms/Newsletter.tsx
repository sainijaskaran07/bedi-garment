import React, { useState } from 'react'

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1500)
  }

  return (
    <section 
      className="w-full bg-white py-12 md:py-16 border-b border-border-primary/50 select-none text-center"
      aria-label="Newsletter Subscription"
    >
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
          Stay Connected
        </span>
        
        {/* Large Editorial Typography */}
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-4 max-w-xl leading-none">
          Subscribe to our runway updates.
        </h2>
        
        <p className="text-xs md:text-sm text-brand-text-muted mt-6 max-w-md leading-relaxed font-body font-medium">
          Receive exclusive invitations to seasonal collections, custom uniform launches, and editorial design edits.
        </p>

        {/* Minimal Form */}
        <form 
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-md flex flex-col sm:flex-row items-stretch gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 h-12 px-5 text-xs font-heading font-medium tracking-wider bg-bg-secondary text-brand-text placeholder-brand-text-muted/40 rounded border border-border-primary/45 focus:outline-none focus:bg-white focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20"
            aria-label="Email address for newsletter"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="h-12 px-8 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded hover:bg-brand-accent transition-colors duration-300 disabled:bg-slate-300 focus:outline-none"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
          </button>
        </form>

        {/* Success feedback message */}
        {status === 'success' && (
          <p className="text-xs text-green-600 font-body font-bold mt-4 animate-fade-in">
            Thank you! You have successfully subscribed to our newsletter.
          </p>
        )}
      </div>
    </section>
  )
}
