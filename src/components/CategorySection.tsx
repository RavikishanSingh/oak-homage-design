import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import eliasVase from "@/assets/elias-vase.jpg";
import ceramicBowl from "@/assets/ceramic-bowl.jpg";
import forestPrint from "@/assets/forest-print.jpg";
import ceramicPlanter from "@/assets/ceramic-planter.jpg";
import woodenTray from "@/assets/wooden-tray.jpg";

const categories = [
  { 
    name: "Ceramic Art", 
    items: "12 Items", 
    image: eliasVase 
  },
  { 
    name: "Literature Art", 
    items: "8 Items", 
    image: ceramicBowl 
  },
  { 
    name: "Wall Art", 
    items: "15 Items", 
    image: forestPrint 
  },
  { 
    name: "Planters", 
    items: "9 Items", 
    image: ceramicPlanter 
  },
  { 
    name: "Wooden Art", 
    items: "20 Items", 
    image: woodenTray 
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