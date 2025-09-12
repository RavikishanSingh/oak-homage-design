import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-oak-charcoal text-oak-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Shop */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-oak-stone">
              <li><a href="#" className="hover:text-oak-light transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Ceramics</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Wood Art</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Candles</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Planters</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Collections</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-oak-stone">
              <li><a href="#" className="hover:text-oak-light transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Care Instructions</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-oak-stone">
              <li><a href="#" className="hover:text-oak-light transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Craftsmen</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-oak-light transition-colors">Wholesale</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Join Our Community</h3>
            <p className="text-sm text-oak-stone mb-4">
              Subscribe to receive updates on new arrivals, special offers, and artisan stories.
            </p>
            <div className="flex gap-2 mb-6">
              <Input 
                placeholder="Enter your email" 
                className="bg-oak-stone/20 border-oak-stone text-oak-cream placeholder:text-oak-stone/60"
              />
              <Button variant="hero" size="sm">
                Subscribe
              </Button>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-oak-stone hover:text-oak-light">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-oak-stone hover:text-oak-light">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-oak-stone hover:text-oak-light">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-oak-stone/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-oak-warm rounded-full"></div>
            <span className="text-xl font-bold">Oak</span>
          </div>
          <p className="text-sm text-oak-stone">
            © 2024 Oak. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;