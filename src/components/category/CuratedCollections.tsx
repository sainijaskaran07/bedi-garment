import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { SectionHeader } from '../common'
import { ProductCard } from '../cards'
import collectionsData from '../../data/collections.json'
import { MOCK_PRODUCTS } from '../../data'

interface Collection {
  id: number
  name: string
  badge: string
  description: string
  imageUrl: string
  price: string
  link: string
}

export const CuratedCollections: React.FC = () => {
  const getProductForCollection = (colId: number) => {
    if (colId === 1) return MOCK_PRODUCTS.find(p => p.id === 'prod-1')
    if (colId === 2) return MOCK_PRODUCTS.find(p => p.id === 'prod-4')
    if (colId === 3) return MOCK_PRODUCTS.find(p => p.id === 'prod-6')
    if (colId === 4) return MOCK_PRODUCTS.find(p => p.id === 'prod-7')
    return undefined
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }
  return (
    <section 
      className="w-full bg-white py-16 md:py-24 border-b border-border-primary/50 select-none overflow-hidden"
      aria-label="Curated Fashion Collections"
    >
      <div className="max-w-[1550px] mx-auto px-4 md:px-8">
        
        {/* Reusable Section Header for Consistency */}
        <SectionHeader 
          badge="Occasions & Generation Edits"
          title="Curated Collections"
          ctaText="View All Collections"
          ctaLink="/shop"
        />

        {/* Collection Cards Grid Container */}
        {/* Mobile: horizontal swipe scroll, Tablet/Desktop: multi-column grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="flex lg:grid overflow-x-auto lg:overflow-x-visible overflow-y-hidden snap-x snap-mandatory lg:snap-none gap-4 md:gap-8 pb-6 lg:pb-0 scrollbar-none lg:grid-cols-4 w-full after:content-[''] after:w-4 md:after:w-8 after:flex-shrink-0"
        >
          {(collectionsData as Collection[]).map((col) => (
            <ProductCard
              key={col.id}
              id={col.id}
              name={col.name}
              badge={col.badge}
              description={col.description}
              imageUrl={col.imageUrl}
              price={`Starts ${col.price}`}
              link={col.link}
              product={getProductForCollection(col.id)}
            />
          ))}
        </motion.div>
        
      </div>
    </section>
  )
}

export default CuratedCollections
