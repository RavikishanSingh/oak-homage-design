import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import acornCoasters from "@/assets/acorn-coasters.jpg";
import stoneCoasters from "@/assets/stone-coasters.jpg";
import soyCandle from "@/assets/soy-candle.jpg";

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* First Row - Knitted Cord Coasters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src={acornCoasters} 
              alt="Acorn wooden coasters"
              className="w-full h-[400px] object-cover rounded-lg shadow-soft"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <Badge className="bg-oak-light text-oak-charcoal">Flat Discount 30%</Badge>
            <h3 className="text-3xl font-bold text-foreground">
              Acorn Wooden Coasters
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Handcrafted from premium oak wood, these coasters bring natural warmth 
              to your home while protecting your surfaces with timeless style.
            </p>
            <Button variant="hero">Shop Now</Button>
          </div>
        </div>

        {/* Second Row - Two Products Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stone Coasters */}
          <div className="bg-oak-cream/30 rounded-lg p-8 relative overflow-hidden">
            <div className="relative z-10">
              <Badge className="bg-oak-warm text-white mb-4">25% Discount</Badge>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Natural Stone Coasters
              </h4>
              <Button variant="outline" size="sm">Shop Now</Button>
            </div>
            <img 
              src={stoneCoasters} 
              alt="Natural stone coasters"
              className="absolute right-0 top-0 w-1/2 h-full object-cover"
            />
          </div>

          {/* Soy Candle */}
          <div className="bg-oak-light/40 rounded-lg p-8 relative overflow-hidden">
            <div className="relative z-10">
              <Badge className="bg-oak-warm text-white mb-4">35% Discount</Badge>
              <h4 className="text-xl font-bold text-foreground mb-2">
                Artisan Soy Candles
              </h4>
              <Button variant="outline" size="sm">Shop Now</Button>
            </div>
            <img 
              src={soyCandle} 
              alt="Artisan soy candle"
              className="absolute right-0 top-0 w-1/2 h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;