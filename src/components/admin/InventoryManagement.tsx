import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, AlertTriangle, Package, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { format } from 'date-fns';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

interface InventoryMovement {
  id: string;
  product_id: string;
  movement_type: string;
  quantity: number;
  reason: string;
  previous_stock: number;
  new_stock: number;
  created_at: string;
  products?: {
    name: string;
  };
}

const InventoryManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const [adjustmentData, setAdjustmentData] = useState({
    quantity: '',
    reason: '',
    movement_type: 'adjustment' as 'in' | 'out' | 'adjustment'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch products with stock levels
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, category, stock, price')
        .order('stock');

      if (productsError) throw productsError;

      // Fetch recent inventory movements
      const { data: movementsData, error: movementsError } = await supabase
        .from('inventory_movements')
        .select(`
          *,
          products(name)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (movementsError) throw movementsError;

      setProducts(productsData || []);
      setMovements(movementsData || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch inventory data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStockAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) return;

    const quantity = parseInt(adjustmentData.quantity);
    if (isNaN(quantity) || quantity === 0) {
      toast({
        title: 'Error',
        description: 'Please enter a valid quantity',
        variant: 'destructive'
      });
      return;
    }

    let newStock: number;
    let movementType: string;

    if (adjustmentData.movement_type === 'in') {
      newStock = selectedProduct.stock + quantity;
      movementType = 'in';
    } else if (adjustmentData.movement_type === 'out') {
      newStock = Math.max(0, selectedProduct.stock - quantity);
      movementType = 'out';
    } else {
      newStock = quantity;
      movementType = 'adjustment';
    }

    try {
      // Update product stock
      const { error: updateError } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', selectedProduct.id);

      if (updateError) throw updateError;

      toast({
        title: 'Success',
        description: 'Stock level updated successfully'
      });

      resetForm();
      fetchData();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setAdjustmentData({
      quantity: '',
      reason: '',
      movement_type: 'adjustment'
    });
    setSelectedProduct(null);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { status: 'Out of Stock', color: 'destructive' };
    if (stock <= 5) return { status: 'Low Stock', color: 'secondary' };
    if (stock <= 20) return { status: 'Medium Stock', color: 'outline' };
    return { status: 'In Stock', color: 'default' };
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'in': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'out': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Package className="h-4 w-4 text-blue-600" />;
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-oak-sage">Loading inventory...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-oak-brown">Inventory Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-oak-brown hover:bg-oak-brown/90">
              <Plus className="h-4 w-4 mr-2" />
              Adjust Stock
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Stock Adjustment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleStockAdjustment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  value={selectedProduct?.id || ''}
                  onValueChange={(value) => {
                    const product = products.find(p => p.id === value);
                    setSelectedProduct(product || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} (Current: {product.stock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProduct && (
                <div className="p-3 bg-oak-cream/20 rounded-lg border border-oak-brown/20">
                  <p className="text-sm text-oak-sage">
                    Current Stock: <span className="font-semibold text-oak-brown">{selectedProduct.stock}</span>
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="movement_type">Adjustment Type</Label>
                <Select
                  value={adjustmentData.movement_type}
                  onValueChange={(value: 'in' | 'out' | 'adjustment') =>
                    setAdjustmentData({ ...adjustmentData, movement_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in">Stock In (+)</SelectItem>
                    <SelectItem value="out">Stock Out (-)</SelectItem>
                    <SelectItem value="adjustment">Set Exact Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">
                  {adjustmentData.movement_type === 'adjustment' ? 'New Stock Level' : 'Quantity'}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={adjustmentData.quantity}
                  onChange={(e) => setAdjustmentData({ ...adjustmentData, quantity: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  value={adjustmentData.reason}
                  onChange={(e) => setAdjustmentData({ ...adjustmentData, reason: e.target.value })}
                  placeholder="Enter reason for stock adjustment..."
                  rows={2}
                />
              </div>

              <Button type="submit" className="w-full bg-oak-brown hover:bg-oak-brown/90">
                Update Stock
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stock Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-oak-brown/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-oak-sage">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.stock === 0).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-oak-brown/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-oak-sage">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {products.filter(p => p.stock > 0 && p.stock <= 5).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-oak-brown/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-oak-sage">Total Products</p>
                <p className="text-2xl font-bold text-oak-brown">
                  {products.length}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-oak-brown/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-oak-sage">Total Stock Value</p>
                <p className="text-2xl font-bold text-green-600">
                  ${products.reduce((sum, p) => sum + (p.stock * p.price), 0).toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Levels Table */}
      <Card className="border-oak-brown/20">
        <CardHeader>
          <CardTitle className="text-oak-brown">Current Stock Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-bold">{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.color as any}>
                        {stockStatus.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${(product.stock * product.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDialogOpen(true);
                        }}
                        className="border-oak-brown/20 text-oak-brown hover:bg-oak-brown/10"
                      >
                        Adjust
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Movements */}
      <Card className="border-oak-brown/20">
        <CardHeader>
          <CardTitle className="text-oak-brown">Recent Inventory Movements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Previous</TableHead>
                <TableHead>New</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell className="font-medium">
                    {movement.products?.name || 'Unknown Product'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getMovementIcon(movement.movement_type)}
                      <span className="capitalize">{movement.movement_type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.previous_stock}</TableCell>
                  <TableCell>{movement.new_stock}</TableCell>
                  <TableCell>{movement.reason}</TableCell>
                  <TableCell>
                    {format(new Date(movement.created_at), 'MMM dd, HH:mm')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;