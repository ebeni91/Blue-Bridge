export interface Product {
  id: number;
  name: string;
  amharic_name?: string;
  category: string;
  quantity: number;
  unit: string;
  quality: string;
  ask_price: number;
  listing_price?: number;
  description: string;
  image_url?: string;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  farmer_id: number;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 
  | 'marketplace' 
  | 'swap' 
  | 'chat' 
  | 'product-details' 
  | 'favorites' 
  | 'cart' 
  | 'checkout' 
  | 'profile' 
  | 'agent-dashboard' 
  | 'admin-dashboard' 
  | 'superadmin-dashboard' // <--- NEW
  | 'help-center' 
  | 'terms' 
  | 'privacy' 
  | 'shipping' 
  | 'return-policy';