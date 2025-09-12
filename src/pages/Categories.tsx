import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import category images
import woodDecor from "@/assets/wooden-tray.jpg";
import ceramicItems from "@/assets/ceramic-bowl.jpg";
import wallArt from "@/assets/forest-print.jpg";
import planters from "@/assets/ceramic-planter.jpg";
import statues from "@/assets/elias-vase.jpg";
import frames from "@/assets/acorn-coasters.jpg";

const categories = [
  {
    id: 1,
    name: "Wood Decor",
    description: "Handcrafted wooden items including key holders, trays, and decorative pieces",
    image: woodDecor,
    itemCount: 45,
    featured: ["Sheesham Wood Key Holder", "Bamboo Organizer", "Wooden Wall Shelves"],
    priceRange: "₹299 - ₹2,999"
  },
  {
    id: 2,
    name: "Ceramic Items",
    description: "Beautiful ceramic bowls, vases, and decorative pieces with ethnic patterns",
    image: ceramicItems,
    itemCount: 38,
    featured: ["Hand-painted Bowls", "Ceramic Vases", "Traditional Diyas"],
    priceRange: "₹199 - ₹1,899"
  },
  {
    id: 3,
    name: "Wall Art & Frames",
    description: "Traditional and contemporary wall art, frames, and hanging decorations",
    image: wallArt,
    itemCount: 52,
    featured: ["Madhubani Paintings", "Wooden Frames", "Metal Wall Art"],
    priceRange: "₹499 - ₹3,499"
  },
  {
    id: 4,
    name: "Planters & Pots",
    description: "Indoor and outdoor planters, flower pots, and garden decor items",
    image: planters,
    itemCount: 29,
    featured: ["Ceramic Planters", "Hanging Pots", "Garden Accessories"],
    priceRange: "₹149 - ₹1,499"
  },
  {
    id: 5,
    name: "Statues & Figurines",
    description: "Religious and decorative statues, figurines, and spiritual items",
    image: statues,
    itemCount: 67,
    featured: ["Brass Statues", "Marble Figurines", "Wooden Carvings"],
    priceRange: "₹399 - ₹4,999"
  },
  {
    id: 6,
    name: "Photo Frames",
    description: "Elegant photo frames in various sizes and materials for your memories",
    image: frames,
    itemCount: 31,
    featured: ["Wooden Photo Frames", "Metal Frames", "Collage Frames"],
    priceRange: "₹99 - ₹999"
  }
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <div className="bg-oak-cream/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-foreground mb-4">Shop by Categories</h1>
          <p className="text-muted-foreground text-lg">
            Explore our curated collection of Indian handicrafts organized by category
          </p>
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Categories</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              <div className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-elegant transition-shadow duration-300">
                {/* Category Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute top-4 right-4 bg-oak-warm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {category.itemCount} Items
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-oak-warm transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>
                  
                  {/* Price Range */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-oak-warm">{category.priceRange}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-muted-foreground">4.5+</span>
                    </div>
                  </div>

                  {/* Featured Items */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Featured Items:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {category.featured.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-oak-warm rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-oak-warm hover:bg-oak-warm/90 text-white"
                    onClick={() => window.location.href = `/shop?category=${encodeURIComponent(category.name)}`}
                  >
                    Explore {category.name}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Most Popular Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {["Wood Decor", "Statues", "Wall Art", "Ceramic Items", "Planters", "Frames"].map((category, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-20 h-20 bg-oak-cream/40 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-oak-warm group-hover:text-white transition-colors">
                  <span className="text-2xl">🏺</span>
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-oak-warm transition-colors">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Benefits */}
        <div className="mt-16 bg-oak-cream/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Why Shop by Category?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-oak-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Focused Shopping</h3>
              <p className="text-sm text-muted-foreground">
                Find exactly what you're looking for with our organized categories
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-oak-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Quick Discovery</h3>
              <p className="text-sm text-muted-foreground">
                Discover new products and trends within your favorite categories
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-oak-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">💡</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Expert Curation</h3>
              <p className="text-sm text-muted-foreground">
                Each category is carefully curated by our home decor experts
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;