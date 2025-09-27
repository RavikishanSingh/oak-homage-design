import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductManagement from '@/components/admin/ProductManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import UserManagement from '@/components/admin/UserManagement';
import DashboardStats from '@/components/admin/DashboardStats';
import AdvancedAnalytics from '@/components/admin/AdvancedAnalytics';
import InventoryManagement from '@/components/admin/InventoryManagement';
import ReviewManagement from '@/components/admin/ReviewManagement';

const Admin = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-oak-brown mx-auto mb-4"></div>
          <p className="text-oak-sage">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-oak-brown mb-2">Admin Dashboard</h1>
          <p className="text-oak-sage">Manage your OAK store</p>
        </div>

        <DashboardStats />

        <Card className="mt-8 border-oak-brown/20">
          <CardHeader>
            <CardTitle className="text-oak-brown">Management Tools</CardTitle>
            <CardDescription>Manage products, categories, orders, and users</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-7 text-xs">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-6">
                <AdvancedAnalytics />
              </TabsContent>

              <TabsContent value="products" className="mt-6">
                <ProductManagement />
              </TabsContent>
              
              <TabsContent value="categories" className="mt-6">
                <CategoryManagement />
              </TabsContent>

              <TabsContent value="inventory" className="mt-6">
                <InventoryManagement />
              </TabsContent>
              
              <TabsContent value="orders" className="mt-6">
                <OrderManagement />
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <ReviewManagement />
              </TabsContent>
              
              <TabsContent value="users" className="mt-6">
                <UserManagement />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;