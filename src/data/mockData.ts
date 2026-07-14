import type { Product } from '../types'

const RAW_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Classic Double-Breasted Blazer',
    slug: 'classic-double-breasted-blazer',
    category: 'men',
    subcategory: 'suits',
    brand: 'Bedi Heritage',
    collection: 'Summer Collection',
    price: 5499,
    originalPrice: 7999,
    discount: '31%',
    rating: 4.8,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Expertly tailored from premium wool-blend fabric, this double-breasted blazer offers a sharp, modern silhouette. Featuring gold-tone signature buttons, peak lapels, and double vents, it represents the pinnacle of luxury tailoring from Anandpur Sahib.',
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Navy Blue', hex: '#1e3a8a' },
      { name: 'Pitch Black', hex: '#111111' }
    ],
    inStock: true,
    qtyAvailable: 15,
    keywords: ['blazer', 'suit', 'men suit', 'formal wear', 'double breasted']
  },
  {
    id: 'prod-2',
    name: 'Luxe Linen Casual Shirt',
    slug: 'luxe-linen-casual-shirt',
    category: 'men',
    subcategory: 'shirts',
    brand: 'Bedi Classic',
    collection: 'Luxe Linen Series',
    price: 2499,
    originalPrice: 3499,
    discount: '28%',
    rating: 4.6,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Crafted from 100% organic European flax linen, this relaxed-fit casual shirt offers unmatched breathability and comfort. Perfect for hot summer days, it features a band collar, clean curved hem, and mother-of-pearl buttons.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ivory White', hex: '#f8f6f2' },
      { name: 'Olive Green', hex: '#3f6212' },
      { name: 'Sky Blue', hex: '#bae6fd' }
    ],
    inStock: true,
    qtyAvailable: 25,
    keywords: ['linen', 'shirt', 'casual shirt', 'men shirt', 'summer shirt']
  },
  {
    id: 'prod-3',
    name: 'Raw Selvedge Slim Jeans',
    slug: 'raw-selvedge-slim-jeans',
    category: 'men',
    subcategory: 'jeans',
    brand: 'Bedi Sport',
    collection: 'Urban Minimalist',
    price: 3999,
    rating: 4.7,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Stitched from 13.5oz Japanese raw selvedge denim, these jeans are designed to break in beautifully and form unique fade patterns over time. Styled in a clean slim fit with custom copper rivets and gold contrast stitching.',
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Indigo', hex: '#1e293b' }
    ],
    inStock: true,
    qtyAvailable: 10,
    keywords: ['jeans', 'denim', 'raw denim', 'selvedge', 'slim fit']
  },
  {
    id: 'prod-4',
    name: 'Heritage Banarasi Silk Saree',
    slug: 'heritage-banarasi-silk-saree',
    category: 'women',
    subcategory: 'sarees',
    brand: 'Bedi Heritage',
    collection: 'Festive Heritage',
    price: 8999,
    originalPrice: 12999,
    discount: '30%',
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Woven with gold and silver zari threads by master weavers, this heritage Banarasi silk saree features intricate floral and foliate motifs. A luxurious drape designed for weddings and grand ethnic celebrations.',
    sizes: ['One Size'],
    colors: [
      { name: 'Crimson Red', hex: '#991b1b' },
      { name: 'Royal Gold', hex: '#c9a227' }
    ],
    inStock: true,
    qtyAvailable: 8,
    keywords: ['saree', 'silk saree', 'banarasi', 'ethnic wear', 'women saree']
  },
  {
    id: 'prod-5',
    name: 'Handblock Print Kurti',
    slug: 'handblock-print-kurti',
    category: 'women',
    subcategory: 'kurtis',
    brand: 'Bedi Classic',
    collection: 'Luxe Linen Series',
    price: 1899,
    rating: 4.5,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'This lightweight cotton kurti features beautiful floral block printing handcrafted by local artisans. Featuring a comfortable straight fit, three-quarter sleeves, and a keyhole neckline.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Teal Green', hex: '#0f766e' },
      { name: 'Mustard Yellow', hex: '#ca8a04' }
    ],
    inStock: true,
    qtyAvailable: 30,
    keywords: ['kurti', 'ethnic wear', 'women kurti', 'cotton kurti', 'handblock']
  },
  {
    id: 'prod-6',
    name: 'Girls Floral Frock Dress',
    slug: 'girls-floral-frock-dress',
    category: 'kids',
    subcategory: 'dresses',
    brand: 'Bedi Classic',
    collection: 'Playtime Essentials',
    price: 1499,
    originalPrice: 1999,
    discount: '25%',
    rating: 4.4,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1622295057295-654a9f992a54?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'A charming frock dress for young girls made from soft, hypoallergenic combed cotton. Decorated with a lively spring floral print and featuring a back zipper closure and comfortable waist sash.',
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y'],
    colors: [
      { name: 'Rose Pink', hex: '#db2777' },
      { name: 'Sun Yellow', hex: '#eab308' }
    ],
    inStock: true,
    qtyAvailable: 18,
    keywords: ['kids', 'frock', 'girls dress', 'cotton frock', 'kids wear']
  },
  {
    id: 'prod-7',
    name: 'Premium School Uniform Set',
    slug: 'premium-school-uniform-set',
    category: 'uniforms',
    subcategory: 'school',
    brand: 'Royal Uniforms',
    collection: 'School Essentials',
    price: 1999,
    rating: 4.7,
    reviewCount: 56,
    images: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Our flagship school uniform set includes a premium anti-wrinkle blazer, structured trousers/skirt, and a breathable cotton-blend shirt. Designed to withstand daily school activities while keeping students smart and comfortable.',
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Navy & White', hex: '#1e293b' },
      { name: 'Maroon & Grey', hex: '#7f1d1d' }
    ],
    inStock: true,
    qtyAvailable: 120,
    keywords: ['uniform', 'school uniform', 'blazer', 'school tie', 'student wear']
  },
  {
    id: 'prod-8',
    name: 'Executive Office Shirt (Uniform)',
    slug: 'executive-office-shirt',
    category: 'uniforms',
    subcategory: 'office',
    brand: 'Royal Uniforms',
    collection: 'School Essentials',
    price: 1599,
    originalPrice: 2199,
    discount: '27%',
    rating: 4.6,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'An executive cotton oxford shirt designed for corporate workforces and office staff. Easy-iron fabric technology keeps it crease-free throughout the workday. Available for bulk customization.',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Executive Blue', hex: '#7dd3fc' },
      { name: 'Crisp White', hex: '#ffffff' }
    ],
    inStock: true,
    qtyAvailable: 80,
    keywords: ['uniform', 'office shirt', 'corporate uniform', 'work shirt']
  },
  {
    id: 'prod-9',
    name: 'Designer Velvet Wedding Sherwani',
    slug: 'designer-velvet-wedding-sherwani',
    category: 'party-wear',
    subcategory: 'wedding',
    brand: 'Bedi Heritage',
    collection: 'Evening Elegance',
    price: 14999,
    originalPrice: 19999,
    discount: '25%',
    rating: 5.0,
    reviewCount: 12,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'An exquisite hand-embroidered velvet sherwani tailored to perfection. Featuring premium zardozi embroidery on the collar and cuffs, paired with a matching pocket square and silk churidar.',
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Royal Emerald', hex: '#064e3b' },
      { name: 'Midnight Wine', hex: '#4c0519' }
    ],
    inStock: true,
    qtyAvailable: 5,
    keywords: ['sherwani', 'groom sherwani', 'wedding wear', 'party wear', 'ethnic sherwani']
  },
  {
    id: 'prod-10',
    name: 'Premium Woolen winter Trench Coat',
    slug: 'premium-woolen-winter-trench-coat',
    category: 'winter-wear',
    subcategory: 'jackets',
    brand: 'Bedi Classic',
    collection: 'Urban Minimalist',
    price: 6999,
    originalPrice: 9999,
    discount: '30%',
    rating: 4.8,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Designed to protect against extreme winter weather while keeping you looking stylish, this woolen trench coat features double-breasted buttons, a matching waistbelt, and soft premium inner lining.',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Camel Tan', hex: '#b45309' },
      { name: 'Charcoal Grey', hex: '#374151' }
    ],
    inStock: true,
    qtyAvailable: 12,
    keywords: ['winter wear', 'coat', 'trench coat', 'wool coat', 'jacket']
  },
  {
    id: 'prod-11',
    name: 'Kids School Uniform Skirt / Trouser',
    slug: 'kids-school-uniform-skirt-trouser',
    category: 'uniforms',
    subcategory: 'school',
    brand: 'Royal Uniforms',
    collection: 'School Essentials',
    price: 899,
    originalPrice: 1199,
    discount: '25%',
    rating: 4.5,
    reviewCount: 34,
    images: [
      'https://images.unsplash.com/photo-1622295057295-654a9f992a54?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Highly durable school uniform bottom wear made from stain-resistant poly-viscose fabric. Elasticated waistbands ensure comfort throughout the school day.',
    sizes: ['24', '26', '28', '30'],
    colors: [
      { name: 'Grey', hex: '#6b7280' },
      { name: 'Navy Blue', hex: '#1e3a8a' }
    ],
    inStock: true,
    qtyAvailable: 90,
    keywords: ['uniform', 'school trouser', 'school skirt', 'kids uniform']
  },
  {
    id: 'prod-12',
    name: 'Anarkali Festive Suit',
    slug: 'anarkali-festive-suit',
    category: 'ethnic-wear',
    subcategory: 'suits',
    brand: 'Bedi Heritage',
    collection: 'Festive Heritage',
    price: 4590,
    originalPrice: 5999,
    discount: '23%',
    rating: 4.8,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'An elegant long-flared Anarkali suit set in premium georgette fabric, adorned with gota-patti gold border detailing. Paired with matching silk pants and an organza dupatta.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Peach Gold', hex: '#fed7aa' },
      { name: 'Mint Green', hex: '#a7f3d0' }
    ],
    inStock: true,
    qtyAvailable: 15,
    keywords: ['anarkali', 'ethnic wear', 'suit set', 'women ethnic', 'festive suit']
  },
  {
    id: 'prod-13',
    name: 'Casual Crewneck T-Shirt (Clearance)',
    slug: 'casual-crewneck-t-shirt-clearance',
    category: 'sale',
    subcategory: 't-shirts',
    brand: 'Bedi Sport',
    collection: 'Urban Minimalist',
    price: 699,
    originalPrice: 1299,
    discount: '46%',
    rating: 4.3,
    reviewCount: 45,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'A 100% combed cotton basic t-shirt in a soft pre-shrunk finish. Offers a clean crew neckline and regular fit. Ideal for layering or casual everyday wear.',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Black', hex: '#1e293b' },
      { name: 'Heather Grey', hex: '#94a3b8' }
    ],
    inStock: true,
    qtyAvailable: 60,
    keywords: ['t-shirt', 'sale', 'cotton t-shirt', 'casual t-shirt', 'men basic']
  },
  {
    id: 'prod-14',
    name: 'Industrial Heavy Duty Safety Jacket',
    category: 'uniforms',
    subcategory: 'industrial',
    slug: 'industrial-safety-jacket',
    brand: 'Royal Uniforms',
    collection: 'School Essentials',
    price: 2199,
    rating: 4.8,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Flame-resistant and highly reflective high-visibility safety jacket designed for industrial plants, construction sites, and warehouses. Features reinforced stitching and multiple safety utility pockets.',
    sizes: ['L', 'XL', 'XXL'],
    colors: [
      { name: 'Neon Orange', hex: '#ea580c' },
      { name: 'Neon Yellow', hex: '#eab308' }
    ],
    inStock: true,
    qtyAvailable: 45,
    keywords: ['uniform', 'industrial jacket', 'safety jacket', 'high vis', 'workwear']
  },
  {
    id: 'prod-15',
    name: 'Luxe Cashmere Knit Sweater',
    slug: 'luxe-cashmere-knit-sweater',
    category: 'men',
    subcategory: 'sweaters',
    brand: 'Bedi Heritage',
    collection: 'Winter Capsule',
    price: 6999,
    originalPrice: 9999,
    discount: '30%',
    rating: 4.9,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Knitted from pure organic cashmere yarns sourced from the Himalayan foothills. Offers unparalleled insulation and luxurious softness. Styled in a tailored fit with a rib-knit mock neck.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Cream', hex: '#ede6db' },
      { name: 'Camel Tan', hex: '#c5a880' }
    ],
    inStock: true,
    qtyAvailable: 12,
    keywords: ['sweater', 'cashmere', 'knitwear', 'winter', 'men knit']
  },
  {
    id: 'prod-16',
    name: 'Royal Silk Anarkali Suit Set',
    slug: 'royal-silk-anarkali-suit-set',
    category: 'women',
    subcategory: 'suits',
    brand: 'Bedi Heritage',
    collection: 'Festive Heritage',
    price: 7499,
    originalPrice: 9999,
    discount: '25%',
    rating: 4.8,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'An elegant chanderi silk Anarkali suit set features hand-embroidered Gota Patti details, a match-tone organza dupatta, and comfortable churidar pants.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Gulabi Pink', hex: '#ec4899' },
      { name: 'Emerald Green', hex: '#047857' }
    ],
    inStock: true,
    qtyAvailable: 18,
    keywords: ['anarkali', 'silk suit', 'ethnic', 'salwar suit', 'festive']
  },
  {
    id: 'prod-17',
    name: 'Kids Cotton Floral Dress',
    slug: 'kids-cotton-floral-dress',
    category: 'kids',
    subcategory: 'dresses',
    brand: 'Bedi Kids',
    collection: 'Summer Playtime',
    price: 1299,
    originalPrice: 1799,
    discount: '27%',
    rating: 4.6,
    reviewCount: 14,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Delightful floral-printed dress stitched from breathable 100% organic cotton. Features a comfortable flared fit, a soft sash belt, and back button closures.',
    sizes: ['24', '26', '28', '30'],
    colors: [
      { name: 'Daisy Yellow', hex: '#fef08a' },
      { name: 'Sky Blue', hex: '#bae6fd' }
    ],
    inStock: true,
    qtyAvailable: 30,
    keywords: ['kids dress', 'girls dress', 'cotton dress', 'floral', 'summer kids']
  },
  {
    id: 'prod-18',
    name: 'Premium School Uniform Trouser',
    slug: 'premium-school-uniform-trouser',
    category: 'uniforms',
    subcategory: 'school',
    brand: 'Royal Uniforms',
    collection: 'School Essentials',
    price: 999,
    rating: 4.7,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Durable, double-stitched school uniform trousers crafted from high-viscous poly-cotton fabric. Breathable, crease-resistant, and featuring an adjustable waistband.',
    sizes: ['24', '26', '28', '30', '32'],
    colors: [
      { name: 'Steel Grey', hex: '#64748b' },
      { name: 'Navy Blue', hex: '#1e3a8a' }
    ],
    inStock: true,
    qtyAvailable: 50,
    keywords: ['uniform trouser', 'school pants', 'grey trousers', 'school wear']
  },
  {
    id: 'prod-19',
    name: 'Elegant Silk Party Gown',
    slug: 'elegant-silk-party-gown',
    category: 'party-wear',
    subcategory: 'wedding',
    brand: 'Bedi Heritage',
    collection: 'Festive Heritage',
    price: 8999,
    originalPrice: 11999,
    discount: '25%',
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Styled with a cascading drape, standard empire waistline, and shimmering silk finish. Ideal for weddings, receptions, and cocktail parties.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Crimson Red', hex: '#dc2626' },
      { name: 'Classic Gold', hex: '#d97706' }
    ],
    inStock: true,
    qtyAvailable: 10,
    keywords: ['party gown', 'gown', 'party wear', 'silk gown', 'wedding gown']
  },
  {
    id: 'prod-20',
    name: 'Premium Wool Trench Coat',
    slug: 'premium-wool-trench-coat',
    category: 'winter-wear',
    subcategory: 'jackets',
    brand: 'Bedi Classic',
    collection: 'Winter Capsule',
    price: 7999,
    originalPrice: 10999,
    discount: '27%',
    rating: 4.8,
    reviewCount: 17,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Stay warm in absolute style. This double-breasted wool-blend trench coat features a tailored waist belt, custom button cuffs, and deep lined wind pockets.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Camel Tan', hex: '#c5a880' },
      { name: 'Midnight Black', hex: '#0f172a' }
    ],
    inStock: true,
    qtyAvailable: 8,
    keywords: ['trench coat', 'wool coat', 'winter wear', 'men jacket', 'overcoat']
  },
  {
    id: 'prod-21',
    name: 'Traditional Punjabi Salwar Kameez',
    slug: 'traditional-punjabi-salwar-kameez',
    category: 'ethnic-wear',
    subcategory: 'suits',
    brand: 'Bedi Heritage',
    collection: 'Festive Heritage',
    price: 3499,
    originalPrice: 4499,
    discount: '22%',
    rating: 4.7,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Handcrafted Lucknowi-style border embroidery highlights this traditional Punjabi salwar suit. Comes with a matching pleated patiala salwar and chiffon dupatta.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mustard Yellow', hex: '#ca8a04' },
      { name: 'Phulkari Pink', hex: '#db2777' }
    ],
    inStock: true,
    qtyAvailable: 15,
    keywords: ['salwar kameez', 'ethnic wear', 'punjabi suit', 'patiala suit', 'suits']
  },
  {
    id: 'prod-22',
    name: 'Linen Lounge Trouser (Clearance)',
    slug: 'linen-lounge-trouser-clearance',
    category: 'sale',
    subcategory: 'trousers',
    brand: 'Bedi Classic',
    collection: 'Luxe Linen Series',
    price: 1299,
    originalPrice: 2499,
    discount: '48%',
    rating: 4.4,
    reviewCount: 26,
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    description: 'Pure breathable linen pants features a comfortable drawstring elastic waist and relaxed leg fit. Lightweight and pre-washed for extra skin comfort.',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal', hex: '#e2e8f0' },
      { name: 'Navy Blue', hex: '#1e3a8a' }
    ],
    inStock: true,
    qtyAvailable: 40,
    keywords: ['pants', 'linen pants', 'sale', 'clearance', 'lounge trousers']
  }
]

export const MOCK_PRODUCTS: Product[] = RAW_PRODUCTS.map(product => {
  // deterministic price between 100 and 5000 based on id
  let hash = 0;
  for (let i = 0; i < product.id.length; i++) {
    hash = product.id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const min = 100;
  const max = 5000;
  const rawPrice = min + (Math.abs(hash) % (max - min + 1));
  const price = Math.round(rawPrice / 50) * 50;

  // Let's set originalPrice if the product originally had one
  let originalPrice = undefined;
  if (product.originalPrice) {
    originalPrice = Math.round((price * 1.3) / 50) * 50;
    if (originalPrice > 5000) {
      originalPrice = 5000;
    }
  }

  // Ensure discount percentage is recalculated or set correctly
  let discount = product.discount;
  if (originalPrice && originalPrice > price) {
    discount = `${Math.round(((originalPrice - price) / originalPrice) * 100)}%`;
  }

  return {
    ...product,
    price: Math.min(Math.max(price, 100), 5000),
    originalPrice: originalPrice ? Math.min(Math.max(originalPrice, 100), 5000) : undefined,
    discount: discount
  };
});
