import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, LogOut, Settings, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { allProducts } from '@/data/products';

const Header = () => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount, isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleProductClick = (slug: string) => {
    navigate(`/product/${slug}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-background border-b border-border">
      {/* Top Bar */}
      <div className="border-b border-border bg-muted/30 px-6 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-muted-foreground">
          <span>Call Us Free 24/7: +91 98765 43210</span>
          <div className="hidden sm:flex items-center gap-4">
            <span>Free Shipping</span>
            <span>Today's Deal</span>
            <span>INR ₹</span>
            <span>Hindi | English</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-oak-warm rounded-full"></div>
              <span className="text-2xl font-bold text-foreground">OAK</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 ml-12">
              <Link to="/shop" className="text-foreground hover:text-oak-warm transition-colors text-sm font-medium">Shop</Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="text-foreground hover:text-oak-warm transition-colors text-sm font-medium flex items-center gap-1">
                  Candles
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/categories/candles">All Candles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/shop?category=Premium Candles">Premium Candles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/shop?category=Candle Collection">Tea Lights</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="text-foreground hover:text-oak-warm transition-colors text-sm font-medium flex items-center gap-1">
                  Jewelry
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/categories/jewelry">All Jewelry</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/shop?category=Designer Jewelry">Designer</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/shop?category=Fashion Jewelry">Fashion</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="text-foreground hover:text-oak-warm transition-colors text-sm font-medium flex items-center gap-1">
                  Gift Packs
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/categories/gift-packs">All Gifts</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/shop?category=Gift Collections">Gift Collections</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/about" className="text-foreground hover:text-oak-warm transition-colors text-sm font-medium">About</Link>
              <Link to="/contact" className="text-foreground hover:text-oak-warm transition-colors text-sm font-medium">Contact</Link>
              {isAdmin && (
                <Link to="/admin" className="text-oak-warm font-medium text-sm">Admin</Link>
              )}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search - Desktop */}
              <div className="hidden sm:block relative">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    className="w-48 lg:w-64 pl-10 py-2"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>

                {/* Search Results Dropdown */}
                {searchOpen && (searchQuery || searchResults.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50">
                    {searchResults.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleProductClick(product.slug)}
                            className="w-full px-4 py-3 text-left hover:bg-muted/50 border-b border-border last:border-b-0 transition-colors"
                          >
                            <div className="flex gap-3">
                              <img
                                src={product.image_url || '/placeholder.svg'}
                                alt={product.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-foreground truncate">{product.name}</p>
                                <p className="text-xs text-muted-foreground">₹{product.price.toFixed(0)}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : searchQuery ? (
                      <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                        No products found for "{searchQuery}"
                      </div>
                    ) : null}
                    <button
                      onClick={handleSearch}
                      className="w-full px-4 py-2 text-sm font-medium text-oak-warm hover:bg-muted/50 border-t border-border"
                    >
                      Search all results
                    </button>
                  </div>
                )}

                {/* Click outside to close */}
                {searchOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSearchOpen(false)}
                  />
                )}
              </div>

              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>

              {/* User Menu */}
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
                      <div className="text-muted-foreground text-xs">{user.email}</div>
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
                <Button asChild variant="ghost" size="sm" className="gap-2 hidden sm:flex">
                  <Link to="/auth" className="flex items-center">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline">Login</span>
                  </Link>
                </Button>
              )}

              {/* Wishlist */}
              <Button asChild variant="ghost" size="icon" className="relative">
                <Link to="/wishlist" title="View Wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-xs rounded-full flex items-center justify-center text-white font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Cart */}
              <Button asChild variant="ghost" size="icon" className="relative">
                <Link to="/cart">
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-oak-warm text-xs rounded-full flex items-center justify-center text-white font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="sm:hidden mb-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </form>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden border-t border-border pt-4 pb-4 space-y-2">
              <Link
                to="/shop"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/categories/candles"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Candles
              </Link>
              <Link
                to="/categories/jewelry"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Jewelry
              </Link>
              <Link
                to="/categories/gift-packs"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gift Packs
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {!user && (
                <Link
                  to="/auth"
                  className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-oak-warm font-medium hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              {user && (
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
