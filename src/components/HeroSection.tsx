import { Button } from "@/components/ui/button";
import heroImage from "@/assets/candle-jewelry-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-oak-cream/50 min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="text-sm font-medium text-oak-stone uppercase tracking-wider">
            Premium Candles & Jewelry
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Light Up Your World
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Premium candles, elegant home decor gift packs & beautiful jewelry for every occasion.
          </p>
          <Button variant="hero" size="lg" className="mt-8">
            <a href="/shop" className="text-white">Shop Collection</a>
          </Button>
        </div>

        {/* Right Image */}
        <div className="relative">
            <img 
              src={heroImage} 
              alt="Premium candles and jewelry display"
              className="w-full h-[500px] object-cover rounded-lg shadow-elegant"
            />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;