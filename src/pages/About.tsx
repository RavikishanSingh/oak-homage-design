import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Award, Truck, Shield } from "lucide-react";
import craftsmanImage from "@/assets/craftsman-hands.jpg";
import heroImage from "@/assets/hero-living-room.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-oak-cream/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-6">About DecoMart</h1>
              <p className="text-lg text-muted-foreground mb-6">
                DecoMart is India's premier destination for authentic handcrafted home decor. We bring you 
                the finest collection of traditional and contemporary Indian handicrafts, each piece telling 
                a story of our rich cultural heritage.
              </p>
              <p className="text-muted-foreground">
                Founded in 2020, we work directly with skilled artisans across India to bring you unique, 
                high-quality home decor items that add warmth and character to your living spaces.
              </p>
            </div>
            <div>
              <img 
                src={heroImage} 
                alt="Traditional Indian home decor setup" 
                className="rounded-lg shadow-soft w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              To preserve and promote Indian craftsmanship while making authentic handicrafts 
              accessible to modern homes worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={craftsmanImage} 
                alt="Skilled artisan at work" 
                className="rounded-lg shadow-soft w-full h-96 object-cover"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Empowering Artisans</h3>
                <p className="text-muted-foreground">
                  We work directly with over 500 skilled craftsmen across 15 states in India, 
                  ensuring fair wages and sustainable livelihoods for traditional artisans.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Every product undergoes rigorous quality checks to ensure you receive only 
                  the finest handcrafted items that meet international standards.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Sustainable Practices</h3>
                <p className="text-muted-foreground">
                  We promote eco-friendly materials and traditional techniques that have been 
                  passed down through generations, supporting sustainable craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-oak-cream/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose DecoMart?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-oak-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Authentic Craftsmanship</h3>
              <p className="text-muted-foreground">
                100% genuine handcrafted products made by skilled Indian artisans
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-oak-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free delivery across India for orders above ₹999
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-oak-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">
                30-day return policy with full money-back guarantee
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-oak-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Customer Support</h3>
              <p className="text-muted-foreground">
                24/7 dedicated customer support in Hindi and English
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Journey</h2>
          
          <div className="space-y-8 text-left">
            <div className="border-l-4 border-oak-warm pl-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">2020 - The Beginning</h4>
              <p className="text-muted-foreground">
                Started with a vision to connect traditional Indian artisans with modern consumers, 
                beginning with just 5 craftsmen from Rajasthan.
              </p>
            </div>
            
            <div className="border-l-4 border-oak-warm pl-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">2021 - Expansion</h4>
              <p className="text-muted-foreground">
                Expanded our network to include artisans from Gujarat, Uttar Pradesh, and West Bengal, 
                growing our collection to over 200 unique products.
              </p>
            </div>
            
            <div className="border-l-4 border-oak-warm pl-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">2022 - Recognition</h4>
              <p className="text-muted-foreground">
                Received the "Best E-commerce Platform for Handicrafts" award from the Ministry of Textiles, 
                Government of India.
              </p>
            </div>
            
            <div className="border-l-4 border-oak-warm pl-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">2023 - Present</h4>
              <p className="text-muted-foreground">
                Today, we work with over 500 artisans across 15 states, offering more than 1000 unique products 
                and serving customers across India and internationally.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;