import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught rendering error caught by ErrorBoundary:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF8] text-center px-4 select-none">
          <span className="text-4xl">⚠️</span>
          <h1 className="text-xl md:text-2xl font-heading font-extrabold uppercase tracking-widest text-brand-text mt-6">
            Something Went Wrong
          </h1>
          <p className="text-xs text-brand-text-muted max-w-sm mt-3 leading-relaxed font-medium">
            Our luxury apparel runway encountered an unexpected error. Please refresh the page or try again.
          </p>
          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-widest uppercase rounded hover:bg-brand-accent transition-colors shadow-md cursor-pointer"
            >
              Reload Page
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.href = '/'
              }}
              className="px-6 py-3 border border-brand-text text-brand-text text-[10px] font-heading font-extrabold tracking-widest uppercase rounded hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
