import React, { useState } from 'react'
import { ArrowLeft, ChevronRight, Ruler, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SEO } from '../../components/common'

interface SizingChart {
  title: string
  subtitle: string
  headers: string[]
  rows: string[][]
}

const CATEGORY_CHARTS: Record<string, SizingChart[]> = {
  women: [
    {
      title: "Salwar Suits & Anarkalis",
      subtitle: "Standard measurements for Kurtis, Kameez, and Anarkali suits.",
      headers: ["Standard Size", "India Size", "Chest (inches)", "Waist (inches)", "Hip (inches)", "Shoulder (inches)"],
      rows: [
        ["XS", "34", "34\"", "28\"", "36\"", "13.5\""],
        ["S", "36", "36\"", "30\"", "38\"", "14\""],
        ["M", "38", "38\"", "32\"", "40\"", "14.5\""],
        ["L", "40", "40\"", "34\"", "42\"", "15\""],
        ["XL", "42", "42\"", "36\"", "44\"", "15.5\""],
        ["XXL", "44", "44\"", "38\"", "46\"", "16\""],
        ["3XL", "46", "46\"", "40\"", "48\"", "16.5\""]
      ]
    },
    {
      title: "Sarees & Lehengas",
      subtitle: "Standard fit specs for premium sarees and bridal/festive lehengas.",
      headers: ["Garment Type", "Standard Length", "Blouse / Choli Size", "Skirt Waist (Lehenga)", "Skirt Length"],
      rows: [
        ["Classic Saree", "5.5 Meters", "Unstitched (0.8m)", "Free Size (Drape)", "40\" - 42\""],
        ["Lehenga Choli (S)", "Skirt / Blouse", "36\" Bust", "30\"", "40\""],
        ["Lehenga Choli (M)", "Skirt / Blouse", "38\" Bust", "32\"", "41\""],
        ["Lehenga Choli (L)", "Skirt / Blouse", "40\" Bust", "34\"", "42\""],
        ["Lehenga Choli (XL)", "Skirt / Blouse", "42\" Bust", "36\"", "42\""]
      ]
    }
  ],
  men: [
    {
      title: "Kurta Pyjamas & Sherwanis",
      subtitle: "Traditional ethnic wear sizing matching collar and chest proportions.",
      headers: ["Size Label", "Chest Size (inches)", "Collar (inches)", "Sleeve Length", "Kurta Length"],
      rows: [
        ["36 (S)", "36\"", "14.5\"", "24\"", "38\""],
        ["38 (M)", "38\"", "15\"", "24.5\"", "40\""],
        ["40 (L)", "40\"", "15.5\"", "25\"", "42\""],
        ["42 (XL)", "42\"", "16\"", "25.5\"", "44\""],
        ["44 (XXL)", "44\"", "16.5\"", "26\"", "46\""],
        ["46 (3XL)", "46\"", "17\"", "26.5\"", "47\""]
      ]
    },
    {
      title: "Formal Suits, Blazers & Jackets",
      subtitle: "Tailored fit dimensions for corporate wear, blazers, and winter coats.",
      headers: ["Suit Size", "Chest (inches)", "Shoulder Width", "Sleeve Length", "Blazer Length"],
      rows: [
        ["36", "36\"", "16.5\"", "24.5\"", "28.5\""],
        ["38", "38\"", "17.25\"", "25\"", "29.25\""],
        ["40", "40\"", "18\"", "25.5\"", "30\""],
        ["42", "42\"", "18.75\"", "26\"", "30.75\""],
        ["44", "44\"", "19.5\"", "26.5\"", "31.5\""],
        ["46", "46\"", "20.25\"", "27\"", "32.25\""]
      ]
    }
  ],
  kids: [
    {
      title: "Kids' Ethnic & Western Wear",
      subtitle: "Age-wise standard dimensions for boys' kurtas and girls' lehnga/dresses.",
      headers: ["Age Group", "Standard Height", "Chest (inches)", "Waist (inches)", "Kurta / Dress Length"],
      rows: [
        ["2 - 3 Years", "36\" - 38\"", "22\"", "21\"", "20\""],
        ["4 - 5 Years", "40\" - 43\"", "24\"", "22\"", "22\""],
        ["6 - 7 Years", "44\" - 47\"", "26\"", "23\"", "25\""],
        ["8 - 9 Years", "48\" - 51\"", "28\"", "24\"", "28\""],
        ["10 - 11 Years", "52\" - 55\"", "30\"", "25\"", "31\""],
        ["12 - 13 Years", "56\" - 59\"", "32\"", "26\"", "34\""]
      ]
    }
  ],
  uniforms: [
    {
      title: "Academic & Institutional Uniform Shirts",
      subtitle: "Size parameters for boys and girls school shirts.",
      headers: ["Collar Size (inches)", "Suggested Age", "Chest (inches)", "Length (inches)"],
      rows: [
        ["22", "3 - 4 Years", "26\"", "16\""],
        ["24", "5 - 6 Years", "28\"", "18\""],
        ["26", "7 - 8 Years", "30\"", "20\""],
        ["28", "9 - 10 Years", "32\"", "22\""],
        ["30", "11 - 12 Years", "34\"", "24\""],
        ["32", "XS / Teenager", "36\"", "26\""],
        ["34", "Small (S)", "38\"", "28\""],
        ["36", "Medium (M)", "40\"", "29\""],
        ["38 - 44", "Adult Sizes", "42\" - 48\"", "30\" - 33\""]
      ]
    },
    {
      title: "Uniform Trousers, Skirts & Blazers",
      subtitle: "Fit specifications for formal academic bottoms and institutional blazers.",
      headers: ["Waist Size (inches)", "Age Group", "Skirt Length (inches)", "Pants Length (inches)", "Blazer Chest"],
      rows: [
        ["20", "3 - 4 Years", "12\"", "22\"", "24\""],
        ["22", "5 - 6 Years", "14\"", "25\"", "26\""],
        ["24", "7 - 8 Years", "16\"", "28\"", "28\""],
        ["26", "9 - 10 Years", "18\"", "31\"", "30\""],
        ["28", "11 - 12 Years", "20\"", "34\"", "32\""],
        ["30 - 36", "Teen / Adult", "22\"", "37\" - 41\"", "34\" - 40\""]
      ]
    }
  ]
}

export const SizeGuidePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'women' | 'men' | 'kids' | 'uniforms'>('women')
  const navigate = useNavigate()

  const currentCharts = CATEGORY_CHARTS[activeCategory]

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <SEO 
        title="Size & Fit Guide | Bedi Garments" 
        description="View sizing charts and measurements for Salwar Suits, Sarees, Men's Kurtas, Blazers, Kids' traditional attire, and academic school uniforms at Bedi Garments."
        canonicalPath="/size-guide"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-brand-text-muted uppercase tracking-wider">
          <a href="/" className="hover:text-brand-accent">Home</a>
          <ChevronRight size={10} className="text-slate-400" />
          <span className="text-brand-text font-extrabold">Size & Fit Directory</span>
        </div>

        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[10px] font-heading font-bold tracking-widest uppercase hover:text-brand-accent transition-colors duration-200 mt-4 focus:outline-none"
        >
          <ArrowLeft size={12} />
          <span>Go Back</span>
        </button>
      </div>

      {/* Editorial Header Banner */}
      <div className="bg-bg-secondary py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Fit & Dimensions
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
            Size & Fit Directory
          </h1>
          <p className="text-brand-text-muted text-xs md:text-sm mt-4 max-w-lg mx-auto font-medium leading-relaxed">
            Find the perfect fit for our complete wardrobe. Compare measurements across traditional ethnic wear, corporate suits, kids' collections, and school uniforms.
          </p>
        </div>
      </div>

      {/* Size Guide Workspace */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        
        {/* Navigation Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-border-primary/50 mb-12">
          {(Object.keys(CATEGORY_CHARTS) as Array<'women' | 'men' | 'kids' | 'uniforms'>).map((catKey) => {
            const labels: Record<string, string> = {
              women: "Sarees & Suits",
              men: "Men's Ethnic & Suits",
              kids: "Kids' Collection",
              uniforms: "Academic Uniforms"
            }
            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                className={`pb-4 px-5 text-[10px] font-heading font-extrabold tracking-widest uppercase border-b-2 transition-all cursor-pointer ${
                  activeCategory === catKey
                    ? 'border-brand-accent text-brand-text font-black'
                    : 'border-transparent text-brand-text-muted hover:text-brand-text'
                }`}
              >
                {labels[catKey]}
              </button>
            )
          })}
        </div>

        {/* Dynamic Measurement Tables Grid */}
        <div className="space-y-12">
          {currentCharts.map((chart, idx) => (
            <div 
              key={idx}
              className="bg-[#FAFAF8] rounded-[24px] border border-border-primary/50 overflow-hidden shadow-sm p-6 md:p-8 space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-border-primary/30 pb-4">
                <div className="flex items-center space-x-2.5 text-brand-accent">
                  <Ruler size={16} />
                  <h2 className="font-heading text-xs font-extrabold tracking-widest uppercase text-brand-text">
                    {chart.title}
                  </h2>
                </div>
                <span className="text-[10px] text-brand-text-muted font-medium italic">
                  {chart.subtitle}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border-primary/60 pb-3 text-[10px] font-heading font-extrabold tracking-wider text-brand-text uppercase">
                      {chart.headers.map((h, hIdx) => (
                        <th key={hIdx} className="pb-3 px-4 first:pl-0 last:pr-0">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-primary/30 font-body text-brand-text-muted">
                    {chart.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-black/[0.01]">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-3.5 px-4 first:pl-0 last:pr-0 font-medium">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Measurement and Fitting Instructions */}
        <div className="mt-20 border-t border-border-primary/50 pt-16 space-y-8">
          <div className="flex items-center space-x-2.5 text-brand-text">
            <Info size={16} className="text-brand-accent" />
            <h3 className="font-heading text-xs font-extrabold tracking-widest uppercase">
              Measurement Guidelines & Fitting Tips
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-medium text-brand-text-muted leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                1. Bust & Chest
              </h4>
              <p>
                Measure around the fullest part of the bust/chest keeping the tape level. Especially crucial for Salwar kameez blouses and Sherwani fitting sets.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                2. Waist & Hips
              </h4>
              <p>
                Measure the narrowest part of your waist for trousers, skirts, or lehenga drawstrings. Wrap around the widest part of the hips for slim-fit kurtas.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                3. Length & Drape
              </h4>
              <p>
                Measure from the shoulder center down to the floor for full-length suits and sherwanis. Standard sarees are unstitched to drape adaptively.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SizeGuidePage
