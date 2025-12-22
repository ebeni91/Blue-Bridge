import client from './client';

export const registerFarmer = async (data: any) => {
  const response = await client.post('/farmers/', data);
  return response.data;
};

export const getMyFarmers = async () => {
  const response = await client.get('/farmers/my-farmers');
  return response.data;
};

export const addProduct = async (data: any) => {
  const response = await client.post('/marketplace/', data);
  return response.data;
};

export const getMyListings = async () => {
  const response = await client.get('/marketplace/my-listings');
  return response.data;
};