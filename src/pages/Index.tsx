import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import SpecialOffersSection from "@/components/SpecialOffersSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductGrid from "@/components/ProductGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategorySection />
      <SpecialOffersSection />
      <FeaturedProducts />
      <ProductGrid />
      <TestimonialsSection />
      <AboutSection />
      <Footer />
    </main>
  );
};

export default Index;
