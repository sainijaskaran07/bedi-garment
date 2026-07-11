import React, { useState, useMemo } from 'react'
import { ArrowLeft, ChevronRight, Ruler, Award, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SEO } from '../../components/common'

interface BespokeStyle {
  id: string
  name: string
  description: string
  basePrice: number
  imageUrl: string
}

interface BespokeFabric {
  id: string
  name: string
  origin: string
  weight: string
}

const BESPOKE_STYLES: BespokeStyle[] = [
  { 
    id: 'suit', 
    name: 'Double-Breasted Blazer', 
    description: 'Tailored with peak lapels, signature gold buttons, and dual rear vents.', 
    basePrice: 5499,
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&h=800&q=80'
  },
  { 
    id: 'kurta', 
    name: 'Regal Kurta Pyjama', 
    description: 'Traditional Punjabi drapery, featuring hand-finished button loops and fine embroidery.', 
    basePrice: 3499,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&h=800&q=80'
  },
  { 
    id: 'bandhgala', 
    name: 'Heritage Bandhgala', 
    description: 'Structured high collar jacket representing the ultimate Indian royal silhouette.', 
    basePrice: 5999,
    imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&h=800&q=80'
  },
  { 
    id: 'uniform', 
    name: 'Institutional Blazer', 
    description: 'Built with heavy-duty fabrics, double stitching, and custom insignia fittings.', 
    basePrice: 2199,
    imageUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&h=800&q=80'
  }
]

const BESPOKE_FABRICS: BespokeFabric[] = [
  { id: 'linen', name: 'Premium Irish Linen', origin: 'Belfast, Ireland', weight: 'Lightweight (150 GSM)' },
  { id: 'wool', name: 'Super 120s Wool Blend', origin: 'Ludhiana, Punjab', weight: 'Medium weight (280 GSM)' },
  { id: 'cotton', name: 'Giza Combed Cotton', origin: 'Alexandria, Egypt', weight: 'Lightweight (120 GSM)' },
  { id: 'cashmere', name: 'Himalayan Cashmere', origin: 'Kashmir, India', weight: 'Heavyweight (320 GSM)' }
]

export const ArtOfTailoringPage: React.FC = () => {
  const navigate = useNavigate()
  
  // Bespoke Configurator State
  const [selectedStyle, setSelectedStyle] = useState<string>('suit')
  const [selectedFabric, setSelectedFabric] = useState<string>('wool')
  const [selectedFit, setSelectedFit] = useState<'slim' | 'regal' | 'classic'>('slim')

  const activeStyle = useMemo(() => {
    return BESPOKE_STYLES.find(s => s.id === selectedStyle) || BESPOKE_STYLES[0]
  }, [selectedStyle])

  const activeFabric = useMemo(() => {
    return BESPOKE_FABRICS.find(f => f.id === selectedFabric) || BESPOKE_FABRICS[0]
  }, [selectedFabric])

  return (
    <div className="bg-[#121212] text-white min-h-screen pb-20 select-none font-body">
      <SEO 
        title="The Art of Tailoring | Bedi Garments Bespoke Atelier" 
        description="Experience the legacy of bespoke tailoring at Bedi Garments Anandpur Sahib. Craft your customized blazers, wedding sherwanis, and luxury shirts."
        canonicalPath="/art-of-tailoring"
      />

      {/* Breadcrumbs (Dark Mode Theme) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider">
          <a href="/" className="hover:text-brand-accent">Home</a>
          <ChevronRight size={10} className="text-slate-600" />
          <span className="text-brand-accent font-extrabold">The Art of Tailoring</span>
        </div>

        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[10px] font-heading font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-colors duration-200 mt-4 focus:outline-none"
        >
          <ArrowLeft size={12} />
          <span>Go Back</span>
        </button>
      </div>

      {/* Editorial Luxury Header */}
      <div className="py-20 md:py-28 text-center border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.35em] text-brand-accent uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            Bespoke Atelier Since 1990
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold tracking-tight uppercase leading-none text-white">
            The Art <br />
            Of Tailoring
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto font-medium leading-relaxed">
            Where heritage textiles meet the rigorous geometry of Italian design. Every stitch is draft-patterned by hand in Anandpur Sahib, Punjab.
          </p>
        </div>
      </div>

      {/* Interactive Configurator Section: "Bespoke Builder" */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: Configuration Steps (7 Columns) */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Step 1: Select Silhouette */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-brand-accent">
              <span className="text-[10px] font-heading font-extrabold tracking-wider bg-brand-accent/10 border border-brand-accent/20 px-2 py-0.5 rounded-sm">Step 01</span>
              <h3 className="font-heading text-xs font-extrabold tracking-widest uppercase text-white">Choose Silhouette</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BESPOKE_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer focus:outline-none ${
                    selectedStyle === style.id
                      ? 'border-brand-accent bg-brand-accent/5'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <h4 className="font-heading text-sm font-extrabold uppercase text-white">{style.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium leading-relaxed">{style.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Fabric */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-brand-accent">
              <span className="text-[10px] font-heading font-extrabold tracking-wider bg-brand-accent/10 border border-brand-accent/20 px-2 py-0.5 rounded-sm">Step 02</span>
              <h3 className="font-heading text-xs font-extrabold tracking-widest uppercase text-white">Select Fabric Blend</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BESPOKE_FABRICS.map((fabric) => (
                <button
                  key={fabric.id}
                  onClick={() => setSelectedFabric(fabric.id)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer focus:outline-none ${
                    selectedFabric === fabric.id
                      ? 'border-brand-accent bg-brand-accent/5'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-heading text-sm font-extrabold uppercase text-white">{fabric.name}</h4>
                    <span className="text-[9px] text-brand-accent font-extrabold tracking-wider uppercase">{fabric.weight.split(' ')[0]}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">Origin: {fabric.origin}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Fit Cut */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-brand-accent">
              <span className="text-[10px] font-heading font-extrabold tracking-wider bg-brand-accent/10 border border-brand-accent/20 px-2 py-0.5 rounded-sm">Step 03</span>
              <h3 className="font-heading text-xs font-extrabold tracking-widest uppercase text-white">Configure Fitting Profile</h3>
            </div>
            <div className="flex gap-4">
              {(['slim', 'regal', 'classic'] as const).map((fit) => (
                <button
                  key={fit}
                  onClick={() => setSelectedFit(fit)}
                  className={`flex-1 py-4 text-center rounded-xl border text-[10px] font-heading font-extrabold tracking-wider uppercase transition-all cursor-pointer focus:outline-none ${
                    selectedFit === fit
                      ? 'border-brand-accent bg-brand-accent/5 text-brand-accent'
                      : 'border-white/10 bg-white/5 hover:border-white/30 text-slate-400'
                  }`}
                >
                  {fit} fit
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Bespoke Card Summary with Dynamic Image Preview (5 Columns) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="border border-white/10 rounded-[28px] overflow-hidden bg-[#181818] shadow-xl relative">
            
            {/* Dynamic Fitting Image Preview */}
            <div className="h-[300px] w-full relative">
              <img 
                src={activeStyle.imageUrl} 
                alt={`${activeStyle.name} preview`} 
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] font-heading font-extrabold tracking-widest uppercase text-brand-accent">Bespoke Summary</span>
                <span className="text-[9px] text-slate-500 font-mono">ID: BG-AT-1984</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[9px] text-slate-500 font-heading font-bold uppercase tracking-wider">Draft Profile</span>
                  <h4 className="text-lg font-heading font-extrabold text-white uppercase mt-1">
                    {activeStyle.name}
                  </h4>
                </div>

                <div>
                  <span className="text-[9px] text-slate-500 font-heading font-bold uppercase tracking-wider">Fabrication Specs</span>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    {activeFabric.name} &bull; {activeFabric.weight} ({activeFabric.origin})
                  </p>
                </div>

                <div>
                  <span className="text-[9px] text-slate-500 font-heading font-bold uppercase tracking-wider">Profile Cut</span>
                  <p className="text-xs text-slate-300 font-bold uppercase mt-1 tracking-wider">
                    {selectedFit} Fit Layout
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 font-heading font-bold uppercase tracking-wider">Estimated Tailoring Cost</span>
                  <p className="text-2xl font-heading font-extrabold text-brand-accent mt-0.5">
                    ₹{activeStyle.basePrice}
                  </p>
                </div>
                <button 
                  onClick={() => alert(`Your Bespoke tailoring profile has been saved. Please visit Gol Market Flagship or Agampur Chowk Outlet for physical measurement taking.`)}
                  className="px-6 h-12 bg-white text-[#121212] text-[10px] font-heading font-extrabold tracking-widest uppercase rounded-sm hover:bg-brand-accent hover:text-white transition-colors duration-300 cursor-pointer focus:outline-none"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Real Atelier Craftsmanship Gallery */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-white/5">
        <div className="text-center mb-16 space-y-2">
          <span className="text-[9px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Inside the Workshop
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold tracking-tight text-white uppercase">
            The Atelier Journal
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium">
            Take a look inside our Anandpur Sahib tailoring suites, where Master Drapers draft and assemble every garment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="overflow-hidden rounded-2xl aspect-[4/3] relative group border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=600&h=450&q=80" 
              alt="Pattern drafting and chalk markings" 
              className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-black/40 p-5 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h4 className="font-heading text-xs font-extrabold uppercase tracking-wider">01. Chalk Markings</h4>
              <p className="text-[10px] text-slate-300 mt-1">Tracing precise layout structures on linen sheets.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl aspect-[4/3] relative group border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&h=450&q=80" 
              alt="Tailoring machine stitching seams" 
              className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-black/40 p-5 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h4 className="font-heading text-xs font-extrabold uppercase tracking-wider">02. Needlework</h4>
              <p className="text-[10px] text-slate-300 mt-1">Sewing with a high density of 14 stitches per inch.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl aspect-[4/3] relative group border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1520638029055-f938be25d43d?auto=format&fit=crop&w=600&h=450&q=80" 
              alt="Steaming and finishing garments" 
              className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-black/40 p-5 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h4 className="font-heading text-xs font-extrabold uppercase tracking-wider">03. Steaming</h4>
              <p className="text-[10px] text-slate-300 mt-1">Pressing seams flat under high-temperature steam lines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Craftsmanship Benchmarks */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-12 border-t border-white/5 pt-20">
        <div className="text-center mb-16">
          <span className="text-[9px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            ATELIER BENCHMARKS
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold tracking-tight text-white mt-2 uppercase">
            Rigorous Tailoring Specs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Card 1 */}
          <div className="p-8 border border-white/5 rounded-2xl bg-white/[0.02] space-y-4">
            <div className="text-brand-accent">
              <Ruler size={24} />
            </div>
            <h3 className="font-heading text-sm font-extrabold text-white uppercase tracking-wider">
              1. 14 Stitches Per Inch
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              We employ a high-density sewing index (14-16 stitches per inch) ensuring seams remain completely flat, durable, and resistant to puckering over time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 border border-white/5 rounded-2xl bg-white/[0.02] space-y-4">
            <div className="text-brand-accent">
              <Award size={24} />
            </div>
            <h3 className="font-heading text-sm font-extrabold text-white uppercase tracking-wider">
              2. Floating Canvas Build
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Our bespoke blazers utilize a horsehair floating canvas lining instead of cheap fused interlining, allowing the jacket to drape naturally and adapt to your body shape.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 border border-white/5 rounded-2xl bg-white/[0.02] space-y-4">
            <div className="text-brand-accent">
              <CheckCircle size={24} />
            </div>
            <h3 className="font-heading text-sm font-extrabold text-white uppercase tracking-wider">
              3. Reinforced Button Loops
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              All buttons are hand-shanked and double-knotted. Curated school and corporate uniform options feature lock-stitched buttonholes for high-frequency wear.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default ArtOfTailoringPage
