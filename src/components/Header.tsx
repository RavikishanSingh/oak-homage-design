import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const { cartCount } = useCart();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="w-full bg-background border-b border-border">
      {/* Top Bar */}
      <div className="border-b border-border bg-muted/30 px-6 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-muted-foreground">
          <span>Call Us Free 24/7: +91 98765 43210</span>
          <div className="flex items-center gap-4">
            <span>Free Shipping</span>
            <span>Today's Deal</span>
            <span>INR ₹</span>
            <span>Hindi | English</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-oak-warm rounded-full"></div>
            <span className="text-2xl font-bold text-foreground">OAK</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-foreground hover:text-oak-warm transition-colors">Shop</Link>
            <Link to="/categories/candles" className="text-foreground hover:text-oak-warm transition-colors">Candles</Link>
            <Link to="/categories/jewelry" className="text-foreground hover:text-oak-warm transition-colors">Jewelry</Link>
            <Link to="/categories/gift-packs" className="text-foreground hover:text-oak-warm transition-colors">Gift Packs</Link>
            <Link to="/about" className="text-foreground hover:text-oak-warm transition-colors">About</Link>
            <Link to="/contact" className="text-foreground hover:text-oak-warm transition-colors">Contact</Link>
            {isAdmin && (
              <Link to="/admin" className="text-oak-brown hover:text-oak-brown/80 transition-colors font-medium">
                Admin
              </Link>
            )}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Search className="h-5 w-5" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-3 py-2 text-sm">
                    <div className="font-medium">{profile?.full_name || 'User'}</div>
                    <div className="text-muted-foreground">{user.email}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost" size="icon">
                <Link to="/auth">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-oak-warm text-xs rounded-full flex items-center justify-center text-white">0</span>
            </Button>
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-oak-warm text-xs rounded-full flex items-center justify-center text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
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