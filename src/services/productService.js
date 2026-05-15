import { api } from '@/lib/api'

const demo = [
  {
    _id: 'p1',
    slug: 'linen-throw-oat',
    name: 'Linen throw — oat',
    price: 128,
    compareAt: 148,
    shopId: 's1',
    shopName: 'Nord Atelier',
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'home-decor',
    ratingAvg: 4.9,
    featured: true,
    trending: true,
    variants: [{ color: 'Oat', sku: 'THR-OAT' }],
  },
  {
    _id: 'p2',
    slug: 'sculpted-vase-stone',
    name: 'Sculpted vase — stone',
    price: 86,
    shopId: 's2',
    shopName: 'Still Room',
    images: [
      'https://images.unsplash.com/photo-1615876234888-fd9a39fda97f?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'house-accessories',
    ratingAvg: 4.8,
    featured: true,
    trending: false,
  },
  {
    _id: 'p3',
    slug: 'brass-pendant-mini',
    name: 'Brass pendant — mini',
    price: 210,
    shopId: 's3',
    shopName: 'Lumen Lane',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'lighting-decorations',
    ratingAvg: 4.7,
    featured: false,
    trending: true,
  },
  {
    _id: 'p4',
    slug: 'ceramic-serve-bowl',
    name: 'Ceramic serve bowl',
    price: 64,
    shopId: 's4',
    shopName: 'Kitchen Stories',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502848fcde?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'kitchen-essentials',
    ratingAvg: 4.6,
    featured: true,
    trending: true,
  },
  {
    _id: 'p5',
    slug: 'oak-side-table',
    name: 'Oak side table',
    price: 320,
    shopId: 's5',
    shopName: 'Form and Grain',
    images: [
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'furniture-accents',
    ratingAvg: 4.9,
    featured: false,
    trending: false,
  },
  {
    _id: 'p6',
    slug: 'smart-dimmer-kit',
    name: 'Smart dimmer kit',
    price: 94,
    shopId: 's6',
    shopName: 'Quiet Current',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80',
    ],
    category: 'smart-home',
    ratingAvg: 4.5,
    featured: true,
    trending: true,
  },
]

export async function fetchProducts(params = {}) {
  try {
    const { data } = await api.get('/products', { params })
    if (data?.items?.length) return data.items
  } catch {
    /* offline / API down — fall back */
  }
  return sortDemo(filterDemo(demo, params), params.sort)
}

export async function fetchProductBySlug(slug) {
  try {
    const { data } = await api.get(`/products/slug/${slug}`)
    if (data?.product) return data.product
  } catch {
    /* fallback */
  }
  return demo.find((p) => p.slug === slug) || null
}

function sortDemo(items, sort) {
  const list = [...items]
  if (sort === 'price_asc') list.sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
  return list
}

function filterDemo(items, { category, q, filter, minPrice, maxPrice, seller }) {
  let list = [...items]
  if (category) list = list.filter((p) => p.category === category)
  if (q) {
    const s = q.toLowerCase()
    list = list.filter((p) => p.name.toLowerCase().includes(s) || p.shopName.toLowerCase().includes(s))
  }
  if (filter === 'featured') list = list.filter((p) => p.featured)
  if (filter === 'trending') list = list.filter((p) => p.trending)
  if (minPrice != null) list = list.filter((p) => p.price >= Number(minPrice))
  if (maxPrice != null) list = list.filter((p) => p.price <= Number(maxPrice))
  if (seller) list = list.filter((p) => p.shopId === seller || p.shopName === seller)
  return list
}
