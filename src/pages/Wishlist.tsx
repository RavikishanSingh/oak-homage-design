import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, Trash2 } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} added to your cart`,
    });
  };

  const renderStars = (rating: number = 5) => {
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

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-oak-warm">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Wishlist</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length === 0
              ? "Your wishlist is empty"
              : `You have ${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} in your wishlist`}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-muted/30 rounded-lg p-12 text-center">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save your favorite products to view them later
            </p>
            <Button asChild className="bg-oak-warm hover:bg-oak-warm/90">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Actions */}
            <div className="mb-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => clearWishlist()}
              >
                Clear Wishlist
              </Button>
            </div>

            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {wishlistItems.map((item) => (
                <div key={item.id} className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <Link to={`/product/${item.slug}`} className="relative block overflow-hidden bg-oak-cream/20 aspect-square">
                    <img
                      src={item.image_url || '/placeholder.svg'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </Link>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-oak-warm font-medium uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <Link
                        to={`/product/${item.slug}`}
                        className="text-sm font-semibold text-foreground group-hover:text-oak-warm transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">
                        ₹{item.price.toFixed(0)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-oak-warm hover:bg-oak-warm/90 text-white"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-10"
                        onClick={() => {
                          removeFromWishlist(item.id);
                          toast({
                            title: "Removed from wishlist",
                            description: `${item.name} removed from wishlist`,
                          });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Ready to buy? Add all items to cart or continue shopping
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
                <Button
                  className="bg-oak-warm hover:bg-oak-warm/90"
                  onClick={() => {
                    wishlistItems.forEach(item => handleAddToCart(item));
                    clearWishlist();
                  }}
                >
                  Add All to Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
