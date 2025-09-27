-- Fix the security definer views by removing them and creating regular views
DROP VIEW IF EXISTS public.sales_summary;
DROP VIEW IF EXISTS public.product_performance;

-- Create regular views instead of security definer views
CREATE VIEW public.sales_summary AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as total_orders,
  SUM(total) as total_revenue,
  AVG(total) as average_order_value
FROM public.orders 
WHERE status NOT IN ('cancelled')
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

CREATE VIEW public.product_performance AS
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