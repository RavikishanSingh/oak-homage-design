import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from 'lucide-react';

interface SalesSummary {
  date: string;
  total_orders: number;
  total_revenue: number;
  average_order_value: number;
}

interface ProductPerformance {
  id: string;
  name: string;
  category: string;
  total_sold: number;
  total_revenue: number;
  average_rating: number;
}

const AdvancedAnalytics = () => {
  const [salesData, setSalesData] = useState<SalesSummary[]>([]);
  const [productData, setProductData] = useState<ProductPerformance[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['hsl(var(--oak-brown))', 'hsl(var(--oak-sage))', 'hsl(var(--oak-cream))', '#8884d8', '#82ca9d'];

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch sales summary
      const { data: sales } = await supabase
        .from('sales_summary')
        .select('*')
        .limit(30);

      // Fetch product performance
      const { data: products } = await supabase
        .from('product_performance')
        .select('*')
        .limit(10);

      // Fetch category performance
      const { data: productsData } = await supabase
        .from('products')
        .select('category');

      const categoryPerformance = productsData ? (() => {
        const categoryCounts = productsData.reduce((acc: any, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});
        
        return Object.entries(categoryCounts).map(([name, value]) => ({
          name,
          value
        }));
      })() : [];

      setSalesData(sales || []);
      setProductData(products || []);
      setCategoryData(categoryPerformance || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTrend = (data: SalesSummary[]) => {
    if (data.length < 2) return 0;
    const latest = data[0]?.total_revenue || 0;
    const previous = data[1]?.total_revenue || 0;
    return ((latest - previous) / previous) * 100;
  };

  const trend = calculateTrend(salesData);

  if (loading) {
    return <div className="text-center py-8 text-oak-sage">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-oak-brown">Advanced Analytics</h2>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-oak-brown/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-oak-sage">Revenue Trend</p>
                <p className="text-2xl font-bold text-oak-brown">
                  {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
                </p>
              </div>
              {trend > 0 ? (
                <TrendingUp className="h-8 w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-oak-brown/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-oak-sage">Avg Order Value</p>
                <p className="text-2xl font-bold text-oak-brown">
                  ${salesData[0]?.average_order_value?.toFixed(2) || '0.00'}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-oak-brown/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-oak-sage">Top Products</p>
                <p className="text-2xl font-bold text-oak-brown">{productData.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-oak-brown/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-oak-sage">Categories</p>
                <p className="text-2xl font-bold text-oak-brown">{categoryData.length}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="categories">Category Distribution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-6">
          <Card className="border-oak-brown/20">
            <CardHeader>
              <CardTitle className="text-oak-brown">Sales Trend (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salesData.slice(0, 30).reverse()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--oak-brown) / 0.2)" />
                  <XAxis dataKey="date" stroke="hsl(var(--oak-brown))" />
                  <YAxis stroke="hsl(var(--oak-brown))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--oak-brown) / 0.2)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line type="monotone" dataKey="total_revenue" stroke="hsl(var(--oak-brown))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-oak-brown/20">
            <CardHeader>
              <CardTitle className="text-oak-brown">Order Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData.slice(0, 15).reverse()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--oak-brown) / 0.2)" />
                  <XAxis dataKey="date" stroke="hsl(var(--oak-brown))" />
                  <YAxis stroke="hsl(var(--oak-brown))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--oak-brown) / 0.2)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="total_orders" fill="hsl(var(--oak-sage))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <Card className="border-oak-brown/20">
            <CardHeader>
              <CardTitle className="text-oak-brown">Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={productData.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--oak-brown) / 0.2)" />
                  <XAxis dataKey="name" stroke="hsl(var(--oak-brown))" />
                  <YAxis stroke="hsl(var(--oak-brown))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--oak-brown) / 0.2)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="total_revenue" fill="hsl(var(--oak-brown))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6">
          <Card className="border-oak-brown/20">
            <CardHeader>
              <CardTitle className="text-oak-brown">Product Distribution by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;