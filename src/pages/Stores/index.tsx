import React from 'react'
import { ArrowLeft, ChevronRight, Compass, Phone } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { SEO } from '../../components/common'

interface Store {
  id: number
  name: string
  city: string
  address: string
  phone: string
  imageUrl: string
  mapUrl: string
  hours: string
  slug: string
  landmark: string
}

const STORES_DATA: Store[] = [
  {
    id: 1,
    name: "Gol Market Flagship",
    city: "Anandpur Sahib",
    address: "Main Bazaar, Gol Market, Anandpur Sahib, Punjab 140118",
    phone: "+91 74660-70001",
    imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&h=1000&q=80",
    mapUrl: "https://maps.google.com/?q=Bedi+Garments+Gol+Market+Anandpur+Sahib",
    hours: "Open Today 10:00 AM – 9:00 PM",
    slug: "gol-market-flagship",
    landmark: "Opposite Gurudwara Sis Ganj Sahib Road"
  },
  {
    id: 2,
    name: "Agampur Chowk Outlet",
    city: "Anandpur Sahib",
    address: "Agampur Chowk, Bypass Road, Anandpur Sahib, Punjab 140118",
    phone: "+91 77101-60001",
    imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&w=800&h=1000&q=80",
    mapUrl: "https://maps.google.com/?q=Bedi+Garments+Agampur+Chowk+Anandpur+Sahib",
    hours: "Open Today 10:00 AM – 9:00 PM",
    slug: "agampur-chowk-outlet",
    landmark: "Near Agampur Bypass Chowk"
  }
]

export const StoresPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <SEO 
        title="Our Showroom Directory | Bedi Garments" 
        description="Find addresses, hours, landmarks, and contact numbers for Bedi Garments Gol Market Flagship and Agampur Chowk Outlet showrooms in Anandpur Sahib."
        canonicalPath="/stores"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-brand-text-muted uppercase tracking-wider">
          <a href="/" className="hover:text-brand-accent">Home</a>
          <ChevronRight size={10} className="text-slate-400" />
          <span className="text-brand-text font-extrabold">Store Directory</span>
        </div>

        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[10px] font-heading font-bold tracking-widest uppercase hover:text-brand-accent transition-colors duration-200 mt-4 focus:outline-none"
        >
          <ArrowLeft size={12} />
          <span>Go Back</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-[#FAFAF8] border-b border-border-primary/50 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Punjab Showrooms
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
            Our Store Directory
          </h1>
          <p className="text-brand-text-muted text-xs md:text-sm mt-4 max-w-lg mx-auto font-medium leading-relaxed">
            Visit our flagship showrooms in Anandpur Sahib for wedding custom fittings, school uniform listings, and design collections.
          </p>
        </div>
      </div>

      {/* Stores List Grid */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {STORES_DATA.map((store) => (
            <div 
              key={store.id}
              className="bg-[#FAFAF8] rounded-[24px] border border-border-primary/60 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              {/* Image */}
              <div className="h-[280px] w-full overflow-hidden relative">
                <img 
                  src={store.imageUrl} 
                  alt={store.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <h2 className="font-heading text-lg font-extrabold text-brand-text uppercase">
                      {store.name}
                    </h2>
                    <span className="text-[10px] font-heading font-extrabold tracking-wider text-brand-accent uppercase mt-1 inline-block">
                      {store.city} Showroom
                    </span>
                  </div>

                  <p className="text-xs text-brand-text-muted leading-relaxed font-medium">
                    {store.address}
                  </p>

                  <div className="text-[11px] space-y-1 text-slate-500 font-medium">
                    <p><strong>Landmark:</strong> {store.landmark}</p>
                    <p><strong>Hours:</strong> {store.hours}</p>
                  </div>
                </div>

                <div className="border-t border-border-primary/30 pt-4 flex flex-col sm:flex-row gap-3 mt-4">
                  {/* Phone */}
                  <a 
                    href={`tel:${store.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex-1 h-10 border border-border-primary text-brand-text text-[10px] font-heading font-extrabold tracking-wider uppercase rounded flex items-center justify-center space-x-1.5 hover:bg-slate-100 transition-colors"
                  >
                    <Phone size={12} />
                    <span>Call Store</span>
                  </a>

                  {/* Details Link */}
                  <Link 
                    to={`/store/${store.slug}`}
                    className="flex-1 h-10 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-wider uppercase rounded flex items-center justify-center space-x-1.5 hover:bg-brand-accent transition-colors"
                  >
                    <Compass size={12} />
                    <span>View Showroom</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default StoresPage
