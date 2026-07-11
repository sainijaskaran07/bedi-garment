import { BrowserRouter } from 'react-router-dom'
import { ShopProvider } from './context'
import { HelmetProvider } from 'react-helmet-async'
import { Navbar } from './components/header'
import { Footer } from './components/footer'
import { ScrollToTop, ErrorBoundary } from './components/common'
import { AppRoutes } from './routes'

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <ScrollToTop />
          <ShopProvider>
            <div className="min-h-screen bg-bg-primary text-brand-text font-body antialiased flex flex-col justify-between">
              <div className="flex-grow">
                {/* Sticky Header Navigation */}
                <Navbar />

                {/* Dynamic Router Mapping */}
                <AppRoutes />
              </div>

              {/* Luxury Editorial Footer */}
              <Footer />
            </div>
          </ShopProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  )
}
