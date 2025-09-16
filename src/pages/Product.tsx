import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Product data - in a real app, this would come from an API
const products = {
  "lavender-candle": {
    id: 1,
    name: "Lavender Scented Candle",
    category: "Premium Candles",
    price: 1299.00,
    originalPrice: null,
    images: [
      "/src/assets/premium-candles.jpg",
      "/src/assets/soy-candle.jpg",
      "/src/assets/tea-lights.jpg"
    ],
    rating: 5,
    reviews: 128,
    discount: null,
    inStock: true,
    description: "Transform your space with our premium lavender scented candle. Hand-poured with natural soy wax and infused with pure lavender essential oil for a calming, luxurious experience.",
    features: [
      "100% Natural Soy Wax",
      "Pure Lavender Essential Oil",
      "45-50 Hour Burn Time",
      "Hand-Poured in Small Batches",
      "Elegant Glass Container"
    ],
    specifications: {
      "Burn Time": "45-50 hours",
      "Wax Type": "100% Soy Wax",
      "Fragrance": "Pure Lavender Essential Oil",
      "Container": "Premium Glass Jar",
      "Dimensions": "3.5\" x 4\" (9cm x 10cm)"
    }
  },
  "gold-earrings": {
    id: 2,
    name: "Gold Drop Earrings",
    category: "Designer Jewelry",
    price: 2499.00,
    originalPrice: 3499.00,
    images: [
      "/src/assets/earrings-collection.jpg",
      "/src/assets/ceramic-bowl.jpg"
    ],
    rating: 5,
    reviews: 89,
    discount: "29% OFF",
    inStock: true,
    description: "Elegant gold-plated drop earrings that add sophistication to any outfit. Crafted with attention to detail and designed for comfortable all-day wear.",
    features: [
      "18K Gold Plated",
      "Hypoallergenic Materials",
      "Lightweight Design",
      "Secure Backing",
      "Gift Box Included"
    ],
    specifications: {
      "Material": "18K Gold Plated Brass",
      "Length": "2 inches (5cm)",
      "Weight": "8 grams per pair",
      "Backing": "Butterfly Clasp",
      "Care": "Keep dry, avoid perfumes"
    }
  }
} as const;

const Product = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = productId ? products[productId as keyof typeof products] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Button variant="hero" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <a href="/" className="hover:text-oak-warm">Home</a>
          <span className="mx-2">/</span>
          <a href="/shop" className="hover:text-oak-warm">Shop</a>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-oak-cream/20 rounded-lg overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-oak-cream/20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-oak-warm' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-oak-warm font-medium uppercase tracking-wider">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-foreground mt-2">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-foreground">
                ₹{product.price.toFixed(0)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toFixed(0)}
                  </span>
                  {product.discount && (
                    <Badge className="bg-red-500 text-white">
                      {product.discount}
                    </Badge>
                  )}
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 text-center min-w-[50px]">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="flex-1"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ₹{(product.price * quantity).toFixed(0)}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-oak-warm rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-8">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-border">
                <span className="font-medium text-foreground">{key}</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;