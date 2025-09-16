import { Button } from "@/components/ui/button";
import candleMaking from "@/assets/candle-making.jpg";

const AboutSection = () => {
  return (
    <section className="py-16 bg-oak-cream/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img 
              src={candleMaking} 
              alt="Artisan candle making process"
              className="w-full h-[500px] object-cover rounded-lg shadow-soft"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Crafted with Love
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At DecoMart, we believe your space should reflect beauty and elegance. 
              We create premium candles, curate stunning jewelry, and design beautiful gift packs 
              that bring warmth, style, and joy to your everyday moments.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every candle is hand-poured with natural ingredients, every piece of jewelry is 
              carefully selected for its beauty, and every gift pack is thoughtfully curated 
              to create magical experiences for you and your loved ones.
            </p>
            <Button variant="hero" size="lg">
              Learn Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;