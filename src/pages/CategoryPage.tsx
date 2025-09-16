import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Filter, Grid, List } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Category products data
const categoryProducts = {
  candles: [
    {
      id: 1,
      name: "Lavender Scented Candle",
      category: "Premium Candles",
      price: 1299.00,
      originalPrice: null,
      image: "/src/assets/premium-candles.jpg",
      rating: 5,
      discount: null,
      inStock: true,
      slug: "lavender-candle"
    },
    {
      id: 2,
      name: "Vanilla Bean Candle",
      category: "Premium Candles",
      price: 1199.00,
      originalPrice: 1599.00,
      image: "/src/assets/soy-candle.jpg",
      rating: 4,
      discount: "25% OFF",
      inStock: true,
      slug: "vanilla-candle"
    },
    {
      id: 3,
      name: "Tea Light Set (6 pcs)",
      category: "Candle Collection",
      price: 899.00,
      originalPrice: null,
      image: "/src/assets/tea-lights.jpg",
      rating: 5,
      discount: null,
      inStock: true,
      slug: "tea-light-set"
    }
  ],
  jewelry: [
    {
      id: 4,
      name: "Gold Drop Earrings",
      category: "Designer Jewelry",
      price: 2499.00,
      originalPrice: 3499.00,
      image: "/src/assets/earrings-collection.jpg",
      rating: 5,
      discount: "29% OFF",
      inStock: true,
      slug: "gold-earrings"
    },
    {
      id: 5,
      name: "Silver Hoop Earrings",
      category: "Fashion Jewelry",
      price: 1599.00,
      originalPrice: null,
      image: "/src/assets/ceramic-bowl.jpg",
      rating: 4,
      discount: null,
      inStock: true,
      slug: "silver-hoops"
    }
  ],
  "gift-packs": [
    {
      id: 6,
      name: "Romantic Evening Gift Pack",
      category: "Gift Collections",
      price: 2899.00,
      originalPrice: 3899.00,
      image: "/src/assets/gift-packs.jpg",
      rating: 5,
      discount: "26% OFF",
      inStock: true,
      slug: "romantic-gift-pack"
    },
    {
      id: 7,
      name: "Home Decor Essentials",
      category: "Gift Collections",
      price: 1999.00,
      originalPrice: null,
      image: "/src/assets/ceramic-planter.jpg",
      rating: 4,
      discount: null,
      inStock: true,
      slug: "home-essentials"
    }
  ]
};

const categoryTitles = {
  candles: "Premium Candles",
  jewelry: "Designer Jewelry",
  "gift-packs": "Gift Packs & Collections"
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const products = category ? categoryProducts[category as keyof typeof categoryProducts] || [] : [];
  const categoryTitle = category ? categoryTitles[category as keyof typeof categoryTitles] || 'Products' : 'Products';

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (!category || !categoryProducts[category as keyof typeof categoryProducts]) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
            <Button variant="hero" onClick={() => window.location.href = '/shop'}>
              Browse All Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foregroup">
          <a href="/" className="hover:text-oak-warm">Home</a>
          <span className="mx-2">/</span>
          <a href="/shop" className="hover:text-oak-warm">Shop</a>
          <span className="mx-2">/</span>
          <span className="text-foreground">{categoryTitle}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{categoryTitle}</h1>
          <p className="text-muted-foreground">
            Discover our curated collection of {categoryTitle.toLowerCase()} designed to bring elegance and style to your life.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <span className="text-sm text-muted-foreground">
              {products.length} products found
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest First</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative mb-4 overflow-hidden rounded-lg bg-oak-cream/20">
                  {product.discount && (
                    <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs">
                      {product.discount}
                    </Badge>
                  )}
                  <a href={`/product/${product.slug}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                
                <div className="space-y-2">
                  <a href={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-foreground group-hover:text-oak-warm transition-colors">
                      {product.name}
                    </h3>
                  </a>
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
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product.id} className="bg-card border border-border rounded-lg p-6 flex gap-6">
                <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg bg-oak-cream/20">
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs">
                      {product.discount}
                    </Badge>
                  )}
                  <a href={`/product/${product.slug}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <a href={`/product/${product.slug}`}>
                      <h3 className="text-xl font-semibold text-foreground hover:text-oak-warm transition-colors">
                        {product.name}
                      </h3>
                    </a>
                    <p className="text-muted-foreground">{product.category}</p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-foreground">₹{product.price.toFixed(0)}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{product.originalPrice.toFixed(0)}
                      </span>
                    )}
                  </div>
                  
                  <Button className="bg-oak-warm hover:bg-oak-warm/90 text-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add To Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;