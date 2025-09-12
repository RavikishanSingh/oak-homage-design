import { Button } from "@/components/ui/button";
import craftsmanImage from "@/assets/craftsman-hands.jpg";

const AboutSection = () => {
  return (
    <section className="py-16 bg-oak-cream/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img 
              src={craftsmanImage} 
              alt="Craftsman's hands working with oak wood"
              className="w-full h-[500px] object-cover rounded-lg shadow-soft"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Rooted in Quality
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Oak, we believe your home should be a sanctuary. We source the finest 
              natural materials and partner with skilled artisans to create timeless pieces 
              that bring warmth, character, and tranquility to your space.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every piece in our collection tells a story of craftsmanship, sustainability, 
              and the enduring beauty found in nature's simplest forms. From hand-turned 
              wooden bowls to carefully glazed ceramic vessels, each item is chosen for 
              its ability to transform a house into a home.
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