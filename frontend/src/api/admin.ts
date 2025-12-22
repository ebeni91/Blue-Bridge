import client from './client';

// ... (Keep existing getPendingProducts and updateProductStatus) ...
export const getPendingProducts = async () => {
  const response = await client.get('/marketplace/pending');
  return response.data;
};

export const updateProductStatus = async (productId: number, status: 'approved' | 'rejected', listingPrice?: number) => {
  const response = await client.put(`/marketplace/${productId}/status`, null, {
    params: { status, listing_price: listingPrice }
  });
  return response.data;
};

// --- NEW SUPERADMIN FUNCTIONS ---
export const getAllUsers = async () => {
  const response = await client.get('/users/');
  return response.data;
};

export const updateUserRole = async (userId: number, role: string) => {
  const response = await client.put(`/users/${userId}/role`, null, {
    params: { role }
  });
  return response.data;
};