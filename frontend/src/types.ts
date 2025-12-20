export type View = 'marketplace' | 'swap' | 'chat' | 'product-details' | 'favorites' | 'cart' | 'checkout' | 'profile' | 'help-center' | 'terms' | 'privacy' | 'shipping' | 'return-policy';

export interface Product {
  id: number;
  name: string;
  amharicName: string;
  category: string;
  price: number;
  unit: string;
  farmer: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}