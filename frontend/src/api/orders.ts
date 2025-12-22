import client from './client';

export const placeOrder = async (orderData: any) => {
  const response = await client.post('/orders/', orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await client.get('/orders/my-orders');
  return response.data;
};