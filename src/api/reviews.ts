import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// GET all reviews
export const fetchReviews = async () => {
  const res = await api.get('/reviews');
  return res.data;
};

// POST a new review
export const createReview = async (data: any) => {
  const res = await api.post('/reviews', data);
  return res.data;
};
