import { useState } from "react";
import { Search, Filter, Grid3X3, List, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import product images
import keyHolder from "@/assets/wooden-tray.jpg";
import flowerPot from "@/assets/ceramic-planter.jpg";
import wallDecor from "@/assets/forest-print.jpg";
import frame from "@/assets/ceramic-bowl.jpg";

const products = [
  {
    id: 1,
    name: "Wooden Key Holder",
    category: "Wood Decor",
    price: 899,
    originalPrice: 1299,
    image: keyHolder,
    rating: 4.5,
    discount: "31% OFF",
    material: "Sheesham Wood",
    description: "Handcrafted wooden key holder with traditional Indian design"
  },
  {
    id: 2,
    name: "Ceramic Flower Pot",
    category: "Planters",
    price: 649,
    originalPrice: null,
    image: flowerPot,
    rating: 4.8,
    discount: null,
    material: "Ceramic",
    description: "Beautiful ceramic flower pot with ethnic patterns"
  },
  {
    id: 3,
    name: "Wall Art Frame",
    category: "Wall Decor",
    price: 1299,
    originalPrice: 1899,
    image: wallDecor,
    rating: 4.6,
    discount: "32% OFF",
    material: "Wood & Glass",
    description: "Elegant wall art frame with traditional motifs"
  },
  {
    id: 4,
    name: "Decorative Bowl",
    category: "Tableware",
    price: 799,
    originalPrice: null,
    image: frame,
    rating: 4.7,
    discount: null,
    material: "Ceramic",
    description: "Handpainted decorative bowl for home decoration"
  },
  {
    id: 5,
    name: "Brass Statue",
    category: "Statues",
    price: 2499,
    originalPrice: 3199,
    image: keyHolder,
    rating: 4.9,
    discount: "22% OFF",
    material: "Brass",
    description: "Traditional brass statue for spiritual decoration"
  },
  {
    id: 6,
    name: "Bamboo Organizer",
    category: "Wood Decor",
    price: 549,
    originalPrice: null,
    image: flowerPot,
    rating: 4.4,
    discount: null,
    material: "Bamboo",
    description: "Eco-friendly bamboo organizer for small items"
  }
];

const categories = ["All", "Wood Decor", "Planters", "Wall Decor", "Statues", "Tableware"];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ));
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
        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-4 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex gap-4 items-center">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={`group cursor-pointer ${viewMode === "list" ? "flex gap-6 p-4 border rounded-lg" : ""}`}>
              <div className={`relative overflow-hidden rounded-lg bg-oak-cream/20 ${viewMode === "list" ? "w-48 h-48 flex-shrink-0" : "mb-4"}`}>
                {product.discount && (
                  <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs">
                    {product.discount}
                  </Badge>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${viewMode === "list" ? "h-48" : "h-64"}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-foreground group-hover:text-oak-warm transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">{product.category} • {product.material}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-foreground">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                
                <Button size="sm" className="w-full bg-oak-warm hover:bg-oak-warm/90 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add To Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Shop;