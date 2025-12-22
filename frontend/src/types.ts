export type View = 'marketplace' | 'swap' | 'chat' | 'product-details' | 'favorites' | 'cart' | 'checkout' | 'profile' | 'help-center' | 'terms' | 'privacy' | 'shipping' | 'return-policy';

// Add or Update the Product interface
export interface Product {
  id: number; // Python sends a number ID
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