import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Star, Eye, Trash2, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  products?: {
    name: string;
  };
  profiles?: {
    full_name: string;
    email: string;
  };
}

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data: reviewsData, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch related data separately
      const productIds = reviewsData?.map(r => r.product_id) || [];
      const userIds = reviewsData?.map(r => r.user_id) || [];

      const [{ data: products }, { data: profiles }] = await Promise.all([
        supabase.from('products').select('id, name').in('id', productIds),
        supabase.from('profiles').select('id, full_name, email').in('id', userIds)
      ]);

      // Merge data
      const enrichedReviews = reviewsData?.map(review => ({
        ...review,
        products: products?.find(p => p.id === review.product_id),
        profiles: profiles?.find(p => p.id === review.user_id)
      })) || [];

      setReviews(enrichedReviews);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch reviews',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Review deleted successfully'
      });
      fetchReviews();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to delete review',
        variant: 'destructive'
      });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingBadgeVariant = (rating: number) => {
    if (rating >= 4) return 'default';
    if (rating >= 3) return 'secondary';
    return 'destructive';
  };

  const getReviewStats = () => {
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;
    
    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: reviews.filter(review => review.rating === rating).length
    }));

    return { totalReviews, averageRating, ratingDistribution };
  };

  const stats = getReviewStats();

  if (loading) {
    return <div className="text-center py-8 text-oak-sage">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-oak-brown">Review Management</h2>
      </div>

      {/* Review Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-oak-brown/20">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-oak-sage">Total Reviews</p>
              <p className="text-3xl font-bold text-oak-brown">{stats.totalReviews}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-oak-brown/20">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-oak-sage">Average Rating</p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <p className="text-3xl font-bold text-oak-brown">{stats.averageRating.toFixed(1)}</p>
                {renderStars(Math.round(stats.averageRating))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-oak-brown/20">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-oak-sage text-center">Rating Distribution</p>
              {stats.ratingDistribution.reverse().map(({ rating, count }) => (
                <div key={rating} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <span>{rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card className="border-oak-brown/20">
        <CardHeader>
          <CardTitle className="text-oak-brown">All Reviews ({reviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    {review.products?.name || 'Unknown Product'}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {review.profiles?.full_name || 'Anonymous'}
                      </div>
                      <div className="text-sm text-oak-sage">
                        {review.profiles?.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      <Badge variant={getRatingBadgeVariant(review.rating)}>
                        {review.rating}/5
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate">
                      {review.comment || 'No comment'}
                    </p>
                  </TableCell>
                  <TableCell>
                    {format(new Date(review.created_at), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog 
                        open={isViewDialogOpen && selectedReview?.id === review.id} 
                        onOpenChange={(open) => {
                          setIsViewDialogOpen(open);
                          if (!open) setSelectedReview(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedReview(review)}
                            className="border-oak-brown/20 text-oak-brown hover:bg-oak-brown/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Details</DialogTitle>
                          </DialogHeader>
                          {selectedReview && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-oak-sage">Product</p>
                                  <p className="font-medium">{selectedReview.products?.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-oak-sage">Customer</p>
                                  <p className="font-medium">{selectedReview.profiles?.full_name}</p>
                                  <p className="text-sm text-oak-sage">{selectedReview.profiles?.email}</p>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-oak-sage">Rating</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  {renderStars(selectedReview.rating)}
                                  <span className="font-medium">{selectedReview.rating}/5</span>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-oak-sage">Comment</p>
                                <div className="mt-2 p-4 bg-oak-cream/20 rounded-lg border border-oak-brown/20">
                                  <p>{selectedReview.comment || 'No comment provided'}</p>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-oak-sage">Date</p>
                                <p>{format(new Date(selectedReview.created_at), 'MMMM dd, yyyy at HH:mm')}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteReview(review.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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

export default ReviewManagement;