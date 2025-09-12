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
              alt="Indian craftsman's hands working with traditional materials"
              className="w-full h-[500px] object-cover rounded-lg shadow-soft"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Rooted in Tradition
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At DecoMart, we believe your home should reflect India's rich cultural heritage. 
              We source the finest natural materials and partner with skilled artisans across 
              India to create authentic pieces that bring warmth, character, and tradition to your space.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every product tells a story of craftsmanship passed down through generations, 
              combining traditional techniques with contemporary design to create timeless home decor 
              that celebrates India's artistic legacy.
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