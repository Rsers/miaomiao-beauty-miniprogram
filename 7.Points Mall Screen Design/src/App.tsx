import { useState } from "react";
import { PointsHeader } from "./components/PointsHeader";
import { CategoryTabs } from "./components/CategoryTabs";
import { ProductGrid } from "./components/ProductGrid";
import { ArrowLeft, Search, ShoppingBag } from "lucide-react";

export default function App() {
  const [activeCategory, setActiveCategory] = useState('skincare');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-400 to-purple-500 max-w-sm mx-auto relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        <div className="text-center">
          <h1 className="text-white font-bold text-lg">喵喵积分商城</h1>
          <p className="text-white/80 text-sm">让美丽更有价值</p>
        </div>
        
        <div className="flex gap-2">
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative">
            <ShoppingBag className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">2</span>
            </div>
          </button>
        </div>
      </div>

      {/* Points Header */}
      <PointsHeader />

      {/* Category Tabs */}
      <CategoryTabs 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      {/* Special Banner */}
      <div className="mx-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">限时特惠 🎉</h3>
              <p className="text-white/90 text-sm">猫咪系列全场8折</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-xs">剩余时间</p>
              <p className="text-white font-bold">2天13小时</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid category={activeCategory} />
    </div>
  );
}