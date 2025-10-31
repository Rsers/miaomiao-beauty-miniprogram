import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Sparkles, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  points: number;
  originalPrice: number;
  image: string;
  isLimited?: boolean;
  rating: number;
  soldCount: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative mb-3">
        <div className="aspect-square rounded-xl overflow-hidden bg-pink-50">
          <ImageWithFallback 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Limited Edition Badge */}
        {product.isLimited && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 px-2 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              限定
            </Badge>
          </div>
        )}
        
        {/* Rating */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs text-gray-700">{product.rating}</span>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-gray-800 line-clamp-2 leading-tight">{product.name}</h3>
        <p className="text-gray-500 text-xs line-clamp-1">{product.description}</p>
        
        {/* Sold Count */}
        <p className="text-gray-400 text-xs">已兑换 {product.soldCount}+</p>
        
        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-pink-600 font-bold text-lg">{product.points}</span>
            <span className="text-pink-500 text-sm">积分</span>
          </div>
          <div className="text-xs text-gray-400 line-through">
            ¥{product.originalPrice}
          </div>
        </div>
        
        {/* Purchase Button */}
        <Button 
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 rounded-xl py-2"
          size="sm"
        >
          立即兑换
        </Button>
      </div>
    </div>
  );
}