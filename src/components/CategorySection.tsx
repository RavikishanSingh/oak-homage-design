import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import premiumCandles from "@/assets/premium-candles.jpg";
import earringsCollection from "@/assets/earrings-collection.jpg";
import giftPacks from "@/assets/gift-packs.jpg";
import teaLights from "@/assets/tea-lights.jpg";
import ceramicBowl from "@/assets/ceramic-bowl.jpg";

const categories = [
  { 
    name: "Premium Candles", 
    items: "45 Items", 
    image: premiumCandles 
  },
  { 
    name: "Earrings", 
    items: "128 Items", 
    image: earringsCollection 
  },
  { 
    name: "Gift Packs", 
    items: "32 Items", 
    image: giftPacks 
  },
  { 
    name: "Tea Lights", 
    items: "24 Items", 
    image: teaLights 
  },
  { 
    name: "Home Decor", 
    items: "18 Items", 
    image: ceramicBowl 
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Shop By Category</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-oak-cream/30 aspect-square mb-4">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">({category.items})</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;