import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-background border-b border-border">
      {/* Top Bar */}
      <div className="border-b border-border bg-muted/30 px-6 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-muted-foreground">
          <span>Call Us Free 24/7: (555) 123-456-789</span>
          <div className="flex items-center gap-4">
            <span>Contact Us</span>
            <span>Today's Deal</span>
            <span>USD</span>
            <span>English</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-oak-warm rounded-full"></div>
            <span className="text-2xl font-bold text-foreground">Oak</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-oak-warm transition-colors">Shop</a>
            <a href="#" className="text-foreground hover:text-oak-warm transition-colors">New Arrivals</a>
            <a href="#" className="text-foreground hover:text-oak-warm transition-colors">Collections</a>
            <a href="#" className="text-foreground hover:text-oak-warm transition-colors">Our Story</a>
            <a href="#" className="text-foreground hover:text-oak-warm transition-colors">Contact</a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-oak-warm text-xs rounded-full flex items-center justify-center text-white">0</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-oak-warm text-xs rounded-full flex items-center justify-center text-white">0</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;