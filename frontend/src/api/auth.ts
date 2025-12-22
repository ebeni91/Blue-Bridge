import client from './client';

// Login expects form-data (username/password)
export const login = async (phone_number: string, password: string) => {
  // OAuth2 expects form data, not JSON
  const formData = new FormData();
  formData.append('username', phone_number); // Backend maps 'username' to phone_number
  formData.append('password', password);

  const response = await client.post('/auth/login', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  // Save Token to LocalStorage so we stay logged in
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }
  
  return response.data;
};

// Signup expects JSON
export const signup = async (userData: any) => {
  const response = await client.post('/auth/signup', userData);
  return response.data;
};

// Get Current User (to check if token is valid)
export const getCurrentUser = async () => {
  const response = await client.get('/users/me'); // We need to add this endpoint to backend later
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};