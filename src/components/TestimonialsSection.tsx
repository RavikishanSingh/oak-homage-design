import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      text: "The quality of the candles is absolutely exceptional. The scents are long-lasting and the packaging is beautiful. Highly recommended!",
      image: "PS"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 5,
      text: "I purchased the jewelry collection for my wife's birthday. She loved it! The craftsmanship is incredible and delivery was quick.",
      image: "RK"
    },
    {
      id: 3,
      name: "Ananya Patel",
      rating: 5,
      text: "Best online shopping experience. The gift packs are perfect for any occasion and the customer service is outstanding.",
      image: "AP"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 4,
      text: "Great collection of home decor items. The prices are reasonable and the products are genuine. Will definitely buy again.",
      image: "VS"
    }
  ];

  return (
    <section className="py-20 bg-oak-cream/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of happy customers who love our products. Read their experiences and testimonials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-background border border-border rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground line-clamp-3">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-oak-warm text-white text-xs font-bold">
                    {testimonial.image}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have you tried our products? Share your experience with us!
          </p>
          <a
            href="/shop"
            className="inline-block px-8 py-3 bg-oak-warm text-white rounded-lg hover:bg-oak-warm/90 transition-colors font-medium"
          >
            Start Shopping Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
