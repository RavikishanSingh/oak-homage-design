import { useState, useEffect } from "react";
import { Search, Grid3X3, List, Star, ShoppingCart, Heart, Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Advanced filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('name').order('name');
      if (data) {
        setCategories(['All', ...data.map(cat => cat.name)]);
      }
    };
    fetchCategories();
  }, []);

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = selectedRating === "all" || (product.rating && product.rating >= parseInt(selectedRating));
      const matchesStock = !inStockOnly || product.stock > 0;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "newest") return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      return 0;
    });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} removed from wishlist`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        category: product.category,
        slug: generateSlug(product.name)
      });
      toast({
        title: "Added to wishlist",
        description: `${product.name} added to wishlist`,
      });
    }
  };

  const handleAddToCart = (product: any) => {
    if (product.stock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url || '/placeholder.svg',
        category: product.category
      });
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <div className="bg-oak-cream/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-foreground mb-4">Shop Indian Home Decor</h1>
          <p className="text-muted-foreground text-lg">Discover authentic Indian handicrafts for your home</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search products by name, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3"
          />
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`w-full lg:w-64 flex-shrink-0 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between lg:hidden">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-oak-warm text-white'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Min: ₹{priceRange[0]}</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Max: ₹{priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Rating</h3>
                <div className="space-y-2">
                  {['all', '4', '3', '2', '1'].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedRating === rating}
                        onCheckedChange={() => setSelectedRating(rating)}
                      />
                      <span className="text-sm text-foreground">
                        {rating === 'all' ? 'All Ratings' : `${rating}+ Stars`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock Filter */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={inStockOnly}
                    onCheckedChange={() => setInStockOnly(!inStockOnly)}
                  />
                  <span className="text-sm font-medium text-foreground">In Stock Only</span>
                </label>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setPriceRange([0, 5000]);
                  setSelectedRating("all");
                  setInStockOnly(false);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex gap-2 border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-80 rounded-lg" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                      viewMode === "list" ? "flex gap-6 p-4" : ""
                    }`}
                  >
                    {/* Image */}
                    <Link
                      to={`/product/${generateSlug(product.name)}`}
                      className={`relative overflow-hidden bg-oak-cream/20 flex-shrink-0 ${
                        viewMode === "list" ? "w-48 h-48 rounded-lg" : "mb-4 aspect-square rounded-t-none rounded-b-none"
                      }`}
                    >
                      {product.stock < 10 && product.stock > 0 && (
                        <div className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                          Only {product.stock} left
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          Out of Stock
                        </div>
                      )}
                      <img
                        src={product.image_url || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleWishlistToggle(product);
                        }}
                        className="absolute top-3 right-3 z-20 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isInWishlist(product.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-muted-foreground hover:text-red-500'
                          }`}
                        />
                      </button>
                    </Link>

                    {/* Content */}
                    <div className={`flex-1 space-y-2 ${viewMode === "grid" ? "p-4" : ""}`}>
                      <div>
                        <p className="text-xs text-oak-warm font-medium uppercase tracking-wider">
                          {product.category}
                        </p>
                        <Link
                          to={`/product/${generateSlug(product.name)}`}
                          className="font-semibold text-foreground group-hover:text-oak-warm transition-colors line-clamp-2 hover:underline"
                        >
                          {product.name}
                        </Link>
                      </div>

                      <div className="flex items-center gap-1">
                        {renderStars(product.rating || 5)}
                        <span className="text-xs text-muted-foreground ml-1">({product.rating || 5}.0)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-lg">₹{product.price.toFixed(0)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice.toFixed(0)}
                          </span>
                        )}
                      </div>

                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                      )}

                      <div className="flex gap-2 pt-3">
                        <Button
                          size="sm"
                          className="flex-1 bg-oak-warm hover:bg-oak-warm/90 text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          disabled={product.stock === 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setPriceRange([0, 5000]);
                    setSelectedRating("all");
                    setInStockOnly(false);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
