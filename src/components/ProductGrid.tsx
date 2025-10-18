import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Our Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.slice(0, 5).map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group cursor-pointer">
              <div className="relative mb-4 overflow-hidden rounded-lg bg-oak-cream/20">
                <img 
                  src={product.image_url || '/placeholder.svg'} 
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
                  {renderStars(5)}
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-foreground">₹{product.price.toFixed(0)}</span>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full bg-oak-warm hover:bg-oak-warm/90 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image_url: product.image_url || '/placeholder.svg',
                      category: product.category
                    });
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;