// src/api/reviews.ts
import axios from 'axios';

export interface Review {
  review_id: number;
  artist_name: string;
  track_title: string;
  review_text: string;
  rating: number;
  reviewer_name: string;
  views?: number;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchReviews = async (): Promise<Review[]> => {
  const res = await api.get<Review[]>('/reviews');
  return res.data;
};
