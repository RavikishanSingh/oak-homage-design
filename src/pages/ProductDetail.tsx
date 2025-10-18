import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { generateSlug } from "@/lib/utils";

const categoryProducts = {
  candles: [
    {
      id: 1,
      name: "Lavender Scented Candle",
      category: "Premium Candles",
      price: 1299.00,
      originalPrice: null,
      image_url: "/src/assets/premium-candles.jpg",
      rating: 5,
      discount: null,
      stock: 15,
      description: "Premium lavender scented candle made from natural soy wax. Long-lasting fragrance with elegant glass container.",
      slug: "lavender-candle"
    },
    {
      id: 2,
      name: "Vanilla Bean Candle",
      category: "Premium Candles",
      price: 1199.00,
      originalPrice: 1599.00,
      image_url: "/src/assets/soy-candle.jpg",
      rating: 4,
      discount: "25% OFF",
      stock: 8,
      description: "Warm vanilla bean scented candle perfect for creating a cozy atmosphere.",
      slug: "vanilla-candle"
    },
    {
      id: 3,
      name: "Tea Light Set (6 pcs)",
      category: "Candle Collection",
      price: 899.00,
      originalPrice: null,
      image_url: "/src/assets/tea-lights.jpg",
      rating: 5,
      discount: null,
      stock: 20,
      description: "Set of 6 premium tea lights in elegant holders. Perfect for any occasion.",
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
      image_url: "/src/assets/earrings-collection.jpg",
      rating: 5,
      discount: "29% OFF",
      stock: 5,
      description: "Stunning gold drop earrings with intricate details. Handcrafted with premium materials.",
      slug: "gold-earrings"
    },
    {
      id: 5,
      name: "Silver Hoop Earrings",
      category: "Fashion Jewelry",
      price: 1599.00,
      originalPrice: null,
      image_url: "/src/assets/ceramic-bowl.jpg",
      rating: 4,
      discount: null,
      stock: 12,
      description: "Classic silver hoop earrings with a modern twist. Perfect for everyday wear.",
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
      image_url: "/src/assets/gift-packs.jpg",
      rating: 5,
      discount: "26% OFF",
      stock: 7,
      description: "Curated gift pack with premium candles and jewelry for a romantic evening.",
      slug: "romantic-gift-pack"
    },
    {
      id: 7,
      name: "Home Decor Essentials",
      category: "Gift Collections",
      price: 1999.00,
      originalPrice: null,
      image_url: "/src/assets/ceramic-planter.jpg",
      rating: 4,
      discount: null,
      stock: 10,
      description: "Essential home decor items to create a beautiful and welcoming space.",
      slug: "home-essentials"
    }
  ]
};

const allProducts = Object.values(categoryProducts).flat();

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const hardcodedProduct = allProducts.find(p => p.slug === productId);

      if (hardcodedProduct) {
        setProduct(hardcodedProduct);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (!error && data) {
        const supabaseProduct = data.find(p => generateSlug(p.name) === productId);
        if (supabaseProduct) {
          setProduct(supabaseProduct);
          setLoading(false);
          return;
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url || '/placeholder.svg',
        category: product.category
      }, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <a href="/" className="hover:text-oak-warm">Home</a>
          <span className="mx-2">/</span>
          <a href="/shop" className="hover:text-oak-warm">Shop</a>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-oak-cream/20 rounded-lg overflow-hidden">
              <img 
                src={product.image_url || '/placeholder.svg'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-oak-warm font-medium uppercase tracking-wider">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-foreground mt-2">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(5)}
              </div>
              <span className="text-sm text-muted-foreground">
                (128 reviews)
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-foreground">
                ₹{product.price.toFixed(0)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description || 'No description available.'}
            </p>

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
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="flex-1"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ₹{(product.price * quantity).toFixed(0)}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
