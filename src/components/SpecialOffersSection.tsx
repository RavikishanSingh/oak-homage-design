import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SpecialOffersSection = () => {
  const offers = [
    {
      id: 1,
      title: "Summer Collection",
      description: "Fresh and vibrant candles perfect for sunny days",
      discount: "Up to 30%",
      color: "from-orange-100 to-amber-100",
      image: "/src/assets/premium-candles.jpg",
      link: "/shop?category=Premium Candles"
    },
    {
      id: 2,
      title: "Premium Jewelry Sale",
      description: "Handcrafted jewelry at amazing prices",
      discount: "Save ₹1000",
      color: "from-yellow-100 to-orange-100",
      image: "/src/assets/earrings-collection.jpg",
      link: "/shop?category=Designer Jewelry"
    },
    {
      id: 3,
      title: "Gift Collections",
      description: "Perfect for every occasion and celebration",
      discount: "Up to 40% OFF",
      color: "from-pink-100 to-orange-100",
      image: "/src/assets/gift-packs.jpg",
      link: "/categories/gift-packs"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="bg-oak-light text-oak-charcoal mb-4">Special Offers</Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">Limited Time Deals</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't miss out on our special offers and exclusive deals available for a limited time only.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              to={offer.link}
              className="group relative overflow-hidden rounded-lg h-64 sm:h-80 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="space-y-3">
                  <Badge className="w-fit bg-oak-warm text-white">{offer.discount}</Badge>
                  <h3 className="text-2xl font-bold text-white">{offer.title}</h3>
                  <p className="text-white/90 text-sm">{offer.description}</p>
                  <div className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
                    Shop Now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-20 bg-gradient-to-r from-oak-warm/10 to-oak-light/10 rounded-xl p-8 md:p-12 border border-oak-warm/20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">Get Exclusive Deals</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter and get exclusive discounts, new product launches, and special offers directly in your inbox.
            </p>
            <form className="flex gap-2 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-oak-warm"
              />
              <Button className="bg-oak-warm hover:bg-oak-warm/90">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
