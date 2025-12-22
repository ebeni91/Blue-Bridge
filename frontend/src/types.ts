export interface Product {
  id: number;
  name: string;
  amharic_name?: string;
  category: string;
  quantity: number;
  unit: string;
  quality: string;
  ask_price: number;     // Price from Farmer
  listing_price?: number; // Final price from Admin
  description: string;
  image_url?: string;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  farmer_id: number;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// Added 'agent-dashboard' and 'admin-dashboard' to the View type
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
  | 'help-center' 
  | 'terms' 
  | 'privacy' 
  | 'shipping' 
  | 'return-policy';