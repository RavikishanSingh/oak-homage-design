import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import premiumCandles from "@/assets/premium-candles.jpg";
import earringsCollection from "@/assets/earrings-collection.jpg";
import giftPacks from "@/assets/gift-packs.jpg";

const FeaturedProducts = () => {
  const { products: featuredProducts, loading } = useProducts(undefined, true);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* First Row - Premium Candles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src={premiumCandles} 
              alt="Premium scented candles collection"
              className="w-full h-[400px] object-cover rounded-lg shadow-soft"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <Badge className="bg-oak-light text-oak-charcoal">Special Discount 35%</Badge>
            <h3 className="text-3xl font-bold text-foreground">
              Premium Scented Candles
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Handcrafted premium candles with long-lasting fragrances. Made from natural 
              soy wax in elegant glass containers to create the perfect ambiance for your home.
            </p>
            <Button variant="hero">
              <a href="/shop" className="text-white">Shop Now</a>
            </Button>
          </div>
        </div>

        {/* Second Row - Two Products Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Earrings Collection */}
          <div className="bg-oak-cream/30 rounded-lg p-8 relative overflow-hidden">
            <div className="relative z-10">
              <Badge className="bg-oak-warm text-white mb-4">30% Discount</Badge>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Designer Earrings
              </h4>
              <Button variant="outline" size="sm">
                <a href="/categories/jewelry">Shop Now</a>
              </Button>
            </div>
            <img 
              src={earringsCollection} 
              alt="Designer earrings collection"
              className="absolute right-0 top-0 w-1/2 h-full object-cover"
            />
          </div>

          {/* Gift Packs */}
          <div className="bg-oak-light/40 rounded-lg p-8 relative overflow-hidden">
            <div className="relative z-10">
              <Badge className="bg-oak-warm text-white mb-4">40% Discount</Badge>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Gift Packs
              </h4>
              <Button variant="outline" size="sm">
                <a href="/categories/gift-packs">Shop Now</a>
              </Button>
            </div>
            <img 
              src={giftPacks} 
              alt="Home decor gift packs"
              className="absolute right-0 top-0 w-1/2 h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;