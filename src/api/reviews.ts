import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// GET
export const fetchReviews = async () => {
  const res = await api.get('/reviews');
  return res.data;
};

// POST
export const createReview = async (data: any) => {
  const res = await api.post('/reviews', data);
  return res.data;
};
