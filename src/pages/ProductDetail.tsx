import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { generateSlug } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
      slug: "lavender-candle",
      specifications: {
        material: "100% Soy Wax",
        scent: "Lavender",
        duration: "40-50 hours",
        size: "250g",
        containerType: "Glass"
      },
      benefits: ["Long-lasting fragrance", "Natural soy wax", "Hand-poured", "Eco-friendly", "Perfect ambiance"]
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
      slug: "vanilla-candle",
      specifications: {
        material: "100% Soy Wax",
        scent: "Vanilla Bean",
        duration: "35-45 hours",
        size: "200g",
        containerType: "Glass"
      },
      benefits: ["Warm aroma", "Stress-relieving", "Hand-poured", "Long-lasting", "Perfect for relaxation"]
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
      slug: "tea-light-set",
      specifications: {
        material: "Paraffin Wax",
        quantity: "6 pieces",
        duration: "4 hours each",
        holders: "Included",
        containerType: "Aluminum"
      },
      benefits: ["Cost-effective", "Easy to use", "Multiple scents", "Included holders", "Versatile usage"]
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
      slug: "gold-earrings",
      specifications: {
        material: "18K Gold Plated",
        weight: "4.5g per pair",
        length: "4.5 cm",
        style: "Drop/Dangle",
        closure: "Stud post"
      },
      benefits: ["Handcrafted", "Premium quality", "Tarnish-resistant", "Lightweight", "Elegant design"]
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
      slug: "silver-hoops",
      specifications: {
        material: "Sterling Silver",
        weight: "3.2g per pair",
        diameter: "3.5 cm",
        style: "Hoop",
        closure: "Hinge clasp"
      },
      benefits: ["Versatile design", "Sterling silver", "Comfortable wear", "Modern style", "Everyday wear"]
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
      slug: "romantic-gift-pack",
      specifications: {
        includes: "2 candles, 1 jewelry piece, gift box",
        packaging: "Premium gift wrapping",
        occasion: "Romance, Anniversary",
        items: "3 pieces",
        boxSize: "25cm x 20cm x 10cm"
      },
      benefits: ["Perfect gift", "Premium packaging", "Multiple items", "Value for money", "Ready to give"]
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
      slug: "home-essentials",
      specifications: {
        includes: "3 items",
        packaging: "Eco-friendly box",
        occasion: "Home decor, Gifting",
        items: "Planters and candles",
        boxSize: "22cm x 18cm x 12cm"
      },
      benefits: ["Home beautification", "Eco-friendly", "Multiple items", "Quality products", "Great value"]
    }
  ]
};

const allProducts = Object.values(categoryProducts).flat();

const sampleReviews = [
  {
    id: 1,
    author: "Priya Singh",
    rating: 5,
    date: "2 weeks ago",
    title: "Absolutely love it!",
    comment: "The quality is exceptional. The earrings are beautifully crafted and very comfortable to wear. Highly recommended!",
    verified: true,
    helpful: 24
  },
  {
    id: 2,
    author: "Rajesh Kumar",
    rating: 5,
    date: "1 month ago",
    title: "Perfect gift for my wife",
    comment: "Purchased as an anniversary gift. My wife loved it. The packaging was elegant and the product quality is outstanding.",
    verified: true,
    helpful: 18
  },
  {
    id: 3,
    author: "Ananya Sharma",
    rating: 4,
    date: "2 months ago",
    title: "Great quality, fast delivery",
    comment: "Very satisfied with the purchase. The item arrived in perfect condition and sooner than expected. Would buy again.",
    verified: true,
    helpful: 12
  },
  {
    id: 4,
    author: "Vikram Patel",
    rating: 5,
    date: "2 months ago",
    title: "Worth every penny",
    comment: "The craftsmanship is incredible. This is a premium product that justifies its price. Excellent customer service too.",
    verified: true,
    helpful: 20
  }
];

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState(false);
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

  const getRelatedProducts = () => {
    if (!product) return [];
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
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
      toast({
        title: "Added to cart",
        description: `${product.name} x${quantity} added to your cart`,
      });
    }
  };

  const ratingDistribution = [
    { stars: 5, count: 85, percentage: 67 },
    { stars: 4, count: 30, percentage: 24 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 1 }
  ];

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

  const relatedProducts = getRelatedProducts();

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

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-oak-cream/20 rounded-lg overflow-hidden">
              <img 
                src={product.image_url || '/placeholder.svg'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                ({sampleReviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-foreground">
                  ₹{product.price.toFixed(0)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toFixed(0)}
                  </span>
                )}
              </div>
              {product.discount && (
                <p className="text-sm text-red-600 font-medium">{product.discount} OFF</p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description || 'No description available.'}
            </p>

            {/* Benefits */}
            {product.benefits && (
              <div className="grid grid-cols-2 gap-2">
                {product.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-oak-warm"></div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            )}

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
                  disabled={quantity >= product.stock}
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
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ₹{(product.price * quantity).toFixed(0)}
              </Button>
              <Button variant="outline" size="lg" className="w-14">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Shipping & Support Info */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-border py-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck className="w-6 h-6 text-oak-warm" />
                <span className="text-xs font-medium text-foreground">Free Shipping</span>
                <span className="text-xs text-muted-foreground">On orders above ₹500</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Shield className="w-6 h-6 text-oak-warm" />
                <span className="text-xs font-medium text-foreground">Secure Payment</span>
                <span className="text-xs text-muted-foreground">100% safe & secure</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw className="w-6 h-6 text-oak-warm" />
                <span className="text-xs font-medium text-foreground">Easy Returns</span>
                <span className="text-xs text-muted-foreground">30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section - Specifications, Shipping, etc */}
        <div className="border-t border-border pt-12 mb-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            {/* Specifications Tab */}
            <TabsContent value="specifications" className="space-y-6 py-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-6">Product Specifications</h3>
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                      <div key={key} className="border border-border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="font-semibold text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No specifications available.</p>
                )}
              </div>
            </TabsContent>

            {/* Shipping & Returns Tab */}
            <TabsContent value="shipping" className="space-y-6 py-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Shipping Information</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Delivery Time:</strong> 3-5 business days for orders within India</p>
                    <p><strong>Shipping Cost:</strong> FREE on orders above ₹500</p>
                    <p><strong>Standard Shipping:</strong> ₹50 for orders below ₹500</p>
                    <p><strong>Express Shipping:</strong> Available in major cities (additional charges apply)</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Returns & Exchange</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Return Period:</strong> 30 days from delivery</p>
                    <p><strong>Condition:</strong> Product must be unused and in original packaging</p>
                    <p><strong>Return Shipping:</strong> Free return shipping for defective items</p>
                    <p><strong>Refund:</strong> Processed within 5-7 business days after inspection</p>
                    <p className="text-sm pt-3"><strong>Note:</strong> Items showing signs of use or damage are not eligible for return.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Payment Methods</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>✓ Credit/Debit Cards</p>
                    <p>✓ Net Banking</p>
                    <p>✓ Digital Wallets (Apple Pay, Google Pay, etc.)</p>
                    <p>✓ EMI Options Available</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-8 py-8">
              {/* Rating Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Customer Reviews</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {renderStars(5)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {(sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length).toFixed(1)} out of 5
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Based on {sampleReviews.length} customer reviews</p>
                </div>

                <div className="space-y-3">
                  {ratingDistribution.map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground w-20">{rating.stars} stars</span>
                      <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-oak-warm h-full transition-all" 
                          style={{ width: `${rating.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">{rating.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-6">What customers say</h3>
                <div className="space-y-6">
                  {sampleReviews.slice(0, expandedReviews ? sampleReviews.length : 2).map((review) => (
                    <div key={review.id} className="border border-border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{review.author}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Verified Purchase</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        {renderStars(review.rating)}
                      </div>

                      <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                      <p className="text-muted-foreground text-sm mb-4">{review.comment}</p>

                      <button className="text-sm text-oak-warm hover:text-oak-warm/80">
                        👍 Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>

                {!expandedReviews && sampleReviews.length > 2 && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-6"
                    onClick={() => setExpandedReviews(true)}
                  >
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Show more reviews ({sampleReviews.length - 2} more)
                  </Button>
                )}

                {expandedReviews && sampleReviews.length > 2 && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-6"
                    onClick={() => setExpandedReviews(false)}
                  >
                    <ChevronDown className="w-4 h-4 mr-2 rotate-180" />
                    Show less
                  </Button>
                )}
              </div>

              {/* Write Review Button */}
              <div className="border-t border-border pt-6">
                <Button className="bg-oak-warm hover:bg-oak-warm/90">
                  Write a Review
                </Button>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-4 py-8">
              <div className="space-y-3">
                {[
                  {
                    q: "Is this product authentic?",
                    a: "Yes, all our products are 100% authentic and sourced directly from trusted manufacturers."
                  },
                  {
                    q: "What is your return policy?",
                    a: "We offer a 30-day money-back guarantee on all products. If you're not satisfied, return it in original condition for a full refund."
                  },
                  {
                    q: "How long does shipping take?",
                    a: "Standard delivery takes 3-5 business days within India. Express options available in selected cities."
                  },
                  {
                    q: "Can I track my order?",
                    a: "Yes, you'll receive a tracking ID via email and can track your order in real-time on our website."
                  },
                  {
                    q: "Is the payment secure?",
                    a: "Absolutely! We use industry-standard SSL encryption and partner with trusted payment gateways."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border border-border rounded-lg">
                    <button className="w-full p-4 flex items-center justify-between hover:bg-oak-cream/10 transition-colors">
                      <span className="font-semibold text-foreground text-left">{item.q}</span>
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <a 
                  key={prod.id} 
                  href={`/product/${prod.slug}`}
                  className="group cursor-pointer"
                >
                  <div className="relative mb-4 overflow-hidden rounded-lg bg-oak-cream/20">
                    <img 
                      src={prod.image_url || '/placeholder.svg'} 
                      alt={prod.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground group-hover:text-oak-warm transition-colors line-clamp-2">
                      {prod.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{prod.category}</p>
                    
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(prod.rating)}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">₹{prod.price.toFixed(0)}</span>
                      {prod.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{prod.originalPrice.toFixed(0)}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full bg-oak-warm hover:bg-oak-warm/90 text-white mt-3"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart({
                          id: prod.id,
                          name: prod.name,
                          price: prod.price,
                          image_url: prod.image_url || '/placeholder.svg',
                          category: prod.category
                        });
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
