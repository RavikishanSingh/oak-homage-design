import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import eliasVase from "@/assets/elias-vase.jpg";
import ceramicBowl from "@/assets/ceramic-bowl.jpg";
import acornCoasters from "@/assets/acorn-coasters.jpg";
import soyCandle from "@/assets/soy-candle.jpg";
import ceramicPlanter from "@/assets/ceramic-planter.jpg";

const products = [
  {
    id: 1,
    name: "Lavender Scented Candle",
    category: "Premium Candles",
    price: 1299.00,
    originalPrice: null,
    image: eliasVase,
    rating: 5,
    discount: null
  },
  {
    id: 2,
    name: "Gold Drop Earrings",
    category: "Designer Jewelry",
    price: 2499.00,
    originalPrice: 3499.00,
    image: ceramicBowl,
    rating: 5,
    discount: "29% OFF"
  },
  {
    id: 3,
    name: "Home Decor Gift Pack",
    category: "Gift Collections",
    price: 1899.00,
    originalPrice: 2499.00,
    image: acornCoasters,
    rating: 5,
    discount: "24% OFF"
  },
  {
    id: 4,
    name: "Tea Light Set",
    category: "Candle Collection",
    price: 899.00,
    originalPrice: null,
    image: soyCandle,
    rating: 4,
    discount: null
  },
  {
    id: 5,
    name: "Silver Hoop Earrings",
    category: "Fashion Jewelry",
    price: 1599.00,
    originalPrice: null,
    image: ceramicPlanter,
    rating: 5,
    discount: null
  }
];

const ProductGrid = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-8">
            <button className="text-foreground border-b-2 border-oak-warm pb-2 font-medium">Premium Candles</button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">Designer Jewelry</button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">Gift Packs</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden rounded-lg bg-oak-cream/20">
                {product.discount && (
                  <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs">
                    {product.discount}
                  </Badge>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground group-hover:text-oak-warm transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(product.rating)}
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-foreground">₹{product.price.toFixed(0)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toFixed(0)}
                    </span>
                  )}
                </div>
                
                <Button size="sm" className="w-full bg-oak-warm hover:bg-oak-warm/90 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add To Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;