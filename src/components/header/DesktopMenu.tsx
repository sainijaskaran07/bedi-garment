import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

interface MenuItem {
  name: string
  href: string
  megaMenu?: {
    columns: {
      title: string
      items: { name: string; href: string }[]
    }[]
  }
}

const MENU_ITEMS: MenuItem[] = [
  {
    name: "Men",
    href: "/men",
    megaMenu: {
      columns: [
        {
          title: "Apparel",
          items: [
            { name: "Shirts", href: "/men?subcategory=shirts" },
            { name: "T-Shirts", href: "/men?subcategory=t-shirts" },
            { name: "Jeans", href: "/men?subcategory=jeans" },
            { name: "Jackets & Hoodies", href: "/men?subcategory=jackets" }
          ]
        },
        {
          title: "Traditional",
          items: [
            { name: "Suits & Blazers", href: "/men?subcategory=suits" },
            { name: "Kurtas & Pyjamas", href: "/men" }
          ]
        }
      ]
    }
  },
  {
    name: "Women",
    href: "/women",
    megaMenu: {
      columns: [
        {
          title: "Ethnic Wear",
          items: [
            { name: "Sarees & Kurtis", href: "/women?subcategory=sarees" },
            { name: "Salwar Suits", href: "/women?subcategory=suits" },
            { name: "Leggings & Dupattas", href: "/women" }
          ]
        },
        {
          title: "Western Wear",
          items: [
            { name: "Dresses", href: "/women?subcategory=dresses" },
            { name: "Shirts & Tops", href: "/women?subcategory=shirts" },
            { name: "Jackets & Cardigans", href: "/women?subcategory=jackets" }
          ]
        }
      ]
    }
  },
  {
    name: "Kids",
    href: "/kids",
    megaMenu: {
      columns: [
        {
          title: "Boys Clothing",
          items: [
            { name: "Shirts & Tees", href: "/kids?subcategory=shirts" },
            { name: "Pants & Denim", href: "/kids?subcategory=jeans" }
          ]
        },
        {
          title: "Girls Clothing",
          items: [
            { name: "Frocks & Dresses", href: "/kids?subcategory=dresses" },
            { name: "Kurtis & Ethnic", href: "/kids" }
          ]
        }
      ]
    }
  },
  {
    name: "Uniforms",
    href: "/uniforms",
    megaMenu: {
      columns: [
        {
          title: "Educational",
          items: [
            { name: "School Uniforms", href: "/uniforms?subcategory=school" },
            { name: "College Uniforms", href: "/uniforms?subcategory=school" }
          ]
        },
        {
          title: "Professional",
          items: [
            { name: "Office Uniforms", href: "/uniforms?subcategory=office" },
            { name: "Industrial Uniforms", href: "/uniforms?subcategory=industrial" }
          ]
        }
      ]
    }
  },
  {
    name: "Party Wear",
    href: "/party-wear",
    megaMenu: {
      columns: [
        {
          title: "Premium Festive",
          items: [
            { name: "Wedding Suits", href: "/party-wear?subcategory=wedding" },
            { name: "Designer Sherwanis", href: "/party-wear?subcategory=wedding" },
            { name: "Cocktail Gowns", href: "/party-wear?subcategory=wedding" }
          ]
        }
      ]
    }
  },
  { name: "Ethnic Wear", href: "/ethnic-wear" },
  { name: "Sale", href: "/sale" }
]

export const DesktopMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const location = useLocation()

  return (
    <div 
      className="relative hidden md:flex items-center justify-center border-t border-border-primary/50 bg-white"
      onMouseLeave={() => {
        setActiveMenu(null)
        setHoveredIndex(null)
      }}
    >
      <nav 
        className="flex items-center space-x-6 lg:space-x-8 xl:space-x-10 h-14"
        aria-label="Main Navigation"
      >
        {MENU_ITEMS.map((item, idx) => {
          const isSale = item.name.toLowerCase() === 'sale'
          const hasMega = !!item.megaMenu
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')

          return (
            <div
              key={item.name}
              className="h-full flex items-center"
              onMouseEnter={() => {
                setHoveredIndex(idx)
                if (hasMega) setActiveMenu(idx)
                else setActiveMenu(null)
              }}
            >
              <Link
                to={item.href}
                className={`relative py-2 font-heading text-xs font-semibold tracking-[0.2em] uppercase focus:outline-none transition-colors duration-300 ${
                  isActive 
                    ? 'text-brand-accent font-extrabold' 
                    : isSale 
                      ? 'text-red-600 hover:text-red-700' 
                      : 'text-brand-text hover:text-brand-accent'
                }`}
                aria-haspopup={hasMega ? 'true' : 'false'}
                aria-expanded={activeMenu === idx ? 'true' : 'false'}
              >
                {item.name}
                
                {/* Gliding Underline Animation */}
                {(hoveredIndex === idx || isActive) && (
                  <motion.div
                    layoutId="navUnderline"
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${isSale ? 'bg-red-600' : 'bg-brand-accent'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </div>
          )
        })}
      </nav>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {activeMenu !== null && MENU_ITEMS[activeMenu]?.megaMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-full left-0 w-full bg-bg-secondary border-b border-border-primary shadow-xl z-50 py-10 px-8 xl:px-16"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
              {MENU_ITEMS[activeMenu].megaMenu?.columns.map((col, cIdx) => (
                <div key={col.title + cIdx} className="space-y-4">
                  <h3 className="font-heading text-xs font-extrabold tracking-[0.2em] text-brand-text uppercase border-b border-border-primary/80 pb-2">
                    {col.title}
                  </h3>
                  <ul className="space-y-2">
                    {col.items.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          to={sub.href}
                          onClick={() => {
                            setActiveMenu(null)
                            setHoveredIndex(null)
                          }}
                          className="font-body text-xs text-brand-text-muted hover:text-brand-accent transition-colors duration-200"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Mega Menu Branding Card */}
              <div className="col-span-2 bg-white p-6 border border-border-primary flex flex-col justify-between rounded-sm">
                <div>
                  <h4 className="font-heading text-sm font-bold tracking-wider text-brand-text">
                    Bedi Garments Collection
                  </h4>
                  <p className="font-body text-xs text-brand-text-muted mt-2 leading-relaxed">
                    Premium clothing and customized uniforms stitched with perfection. Rooted in Anandpur Sahib, Punjab.
                  </p>
                </div>
                <Link
                  to={MENU_ITEMS[activeMenu].href}
                  onClick={() => {
                    setActiveMenu(null)
                    setHoveredIndex(null)
                  }}
                  className="font-heading text-[10px] font-bold tracking-[0.15em] text-brand-accent hover:underline uppercase mt-4 block"
                >
                  Explore All {MENU_ITEMS[activeMenu].name} &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
