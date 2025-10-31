import { ProductCard } from "./ProductCard";

// Mock product data with cat-themed items
const products = [
  {
    id: '1',
    name: '喵咪水润面膜 🐱',
    description: '深层补水，让肌肤如小猫般柔软',
    points: 180,
    originalPrice: 89,
    image: 'https://images.unsplash.com/photo-1642177116193-c93e662f0924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwc2tpbmNhcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTg4NzU4NTJ8MA&ixlib=rb-4.1.0&q=80&w=400',
    isLimited: true,
    rating: 4.8,
    soldCount: 2341
  },
  {
    id: '2',
    name: '猫咪眼影盘 ✨',
    description: '12色猫咪主题，打造迷人猫眼妆',
    points: 350,
    originalPrice: 168,
    image: 'https://images.unsplash.com/photo-1600637070413-0798fafbb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBjb3NtZXRpY3MlMjBtYWtldXB8ZW58MXx8fHwxNzU4ODc1ODUzfDA&ixlib=rb-4.1.0&q=80&w=400',
    isLimited: false,
    rating: 4.9,
    soldCount: 1829
  },
  {
    id: '3',
    name: '粉色猫爪护手霜 🐾',
    description: '可爱猫爪造型，滋润双手',
    points: 120,
    originalPrice: 58,
    image: 'https://images.unsplash.com/photo-1652500965593-58e2b71d3cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwY2F0JTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzU4ODc1ODUzfDA&ixlib=rb-4.1.0&q=80&w=400',
    isLimited: false,
    rating: 4.7,
    soldCount: 3567
  },
  {
    id: '4',
    name: '猫咪精华液礼盒 🎁',
    description: '三瓶装精华，全效护肤套装',
    points: 580,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1625141976586-ff3f03d2f4d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBiZWF1dHklMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTg4NzU4NTN8MA&ixlib=rb-4.1.0&q=80&w=400',
    isLimited: true,
    rating: 4.9,
    soldCount: 967
  },
  {
    id: '5',
    name: '猫面膜限定版 😸',
    description: '可爱猫咪图案，深层清洁毛孔',
    points: 200,
    originalPrice: 98,
    image: 'https://images.unsplash.com/photo-1658273842927-8563a8f5a052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBmYWNlJTIwbWFzayUyMGJlYXV0eXxlbnwxfHx8fDE3NTg4NzU4NTZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    isLimited: true,
    rating: 4.8,
    soldCount: 1456
  },
  {
    id: '6',
    name: '猫咪唇釉套装 💋',
    description: '六色猫咪系列，持久显色',
    points: 280,
    originalPrice: 138,
    image: 'https://images.unsplash.com/photo-1630573133526-8d090e0269af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwbHV4dXJ5JTIwY29zbWV0aWNzfGVufDF8fHx8MTc1ODg3NTg1Nnww&ixlib=rb-4.1.0&q=80&w=400',
    isLimited: false,
    rating: 4.6,
    soldCount: 2134
  }
];

interface ProductGridProps {
  category: string;
}

export function ProductGrid({ category }: ProductGridProps) {
  // Filter products based on category (simplified for demo)
  const filteredProducts = category === 'limited' 
    ? products.filter(p => p.isLimited)
    : products;

  return (
    <div className="px-4 pb-20">
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}