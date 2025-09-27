-- Add more advanced features to the database
-- Create analytics table for tracking business metrics
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add inventory tracking table
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  movement_type TEXT NOT NULL CHECK (movement_type IN ('in', 'out', 'adjustment')),
  quantity INTEGER NOT NULL,
  reason TEXT,
  previous_stock INTEGER NOT NULL,
  new_stock INTEGER NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(product_id, user_id)
);

-- Add sales reports view
CREATE OR REPLACE VIEW public.sales_summary AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as total_orders,
  SUM(total) as total_revenue,
  AVG(total) as average_order_value
FROM public.orders 
WHERE status NOT IN ('cancelled')
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- Add product performance view
CREATE OR REPLACE VIEW public.product_performance AS
SELECT 
  p.id,
  p.name,
  p.category,
  p.price,
  p.stock,
  COUNT(oi.id) as total_sold,
  SUM(oi.quantity) as total_quantity_sold,
  SUM(oi.price * oi.quantity) as total_revenue,
  AVG(r.rating) as average_rating,
  COUNT(r.id) as review_count
FROM public.products p
LEFT JOIN public.order_items oi ON p.id = oi.product_id
LEFT JOIN public.orders o ON oi.order_id = o.id AND o.status NOT IN ('cancelled')
LEFT JOIN public.reviews r ON p.id = r.product_id
GROUP BY p.id, p.name, p.category, p.price, p.stock
ORDER BY total_revenue DESC NULLS LAST;

-- Enable RLS for new tables
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS policies for analytics
CREATE POLICY "Admin can manage analytics" ON public.analytics
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- RLS policies for inventory movements
CREATE POLICY "Admin can manage inventory movements" ON public.inventory_movements
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- RLS policies for reviews
CREATE POLICY "Users can view all reviews" ON public.reviews
FOR SELECT USING (true);

CREATE POLICY "Users can create their own reviews" ON public.reviews
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON public.reviews
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all reviews" ON public.reviews
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Add triggers for inventory tracking
CREATE OR REPLACE FUNCTION public.track_inventory_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.stock != NEW.stock THEN
    INSERT INTO public.inventory_movements (
      product_id,
      movement_type,
      quantity,
      reason,
      previous_stock,
      new_stock,
      created_by
    ) VALUES (
      NEW.id,
      CASE 
        WHEN NEW.stock > OLD.stock THEN 'in'
        ELSE 'out'
      END,
      ABS(NEW.stock - OLD.stock),
      'Stock update',
      OLD.stock,
      NEW.stock,
      auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER products_inventory_tracking
  AFTER UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.track_inventory_changes();

-- Add updated_at trigger for reviews
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();