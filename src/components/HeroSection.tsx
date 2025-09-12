import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-living-room.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-oak-cream/50 min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="text-sm font-medium text-oak-stone uppercase tracking-wider">
            Best Wooden Products
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            The Heart of Your Home
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Curated decor for a life of simple, enduring beauty.
          </p>
          <Button variant="hero" size="lg" className="mt-8">
            Shop New Arrivals
          </Button>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img 
            src={heroImage} 
            alt="Oak home decor in a cozy living room setting"
            className="w-full h-[500px] object-cover rounded-lg shadow-elegant"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;