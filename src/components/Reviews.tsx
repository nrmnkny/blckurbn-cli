// src/components/Reviews.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Review {
  review_id: number;
  artist_name: string;
  track_title: string;
  review_text: string;
  rating: number;
  reviewer_name: string;
  coverArtUrl?: string;
  views?: number;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const fetchReviews = async (): Promise<Review[]> => {
  const res = await api.get<Review[]>('/reviews');
  return res.data;
};

const Spinner: React.FC = () => (
  <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <Link to={`/reviews/${review.review_id}`}>
      <div className="h-full flex flex-col bg-gray-900 border border-yellow-700 rounded-2xl p-6 hover:border-yellow-500 transition">
        <div className="flex items-start mb-4">
          <img
            src={review.coverArtUrl || '/fallback-cover.png'}
            alt={`${review.track_title} cover`}
            className="w-16 h-16 rounded-lg object-cover mr-4 flex-shrink-0"
            loading="lazy"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-yellow-400 leading-snug">
              {review.track_title}
            </h3>
            <p className="text-sm text-yellow-300">{review.artist_name}</p>
          </div>
          {typeof review.views === 'number' && (
            <span className="text-yellow-300 text-sm ml-2 flex items-center">
              👁 {review.views}
            </span>
          )}
        </div>

        <p className="flex-1 text-gray-300 italic text-sm leading-relaxed mb-4">
          "{review.review_text}"
        </p>

        <div className="mt-auto flex justify-between items-center text-xs text-gray-400">
          <span>
            Reviewed by <span className="text-yellow-200">{review.reviewer_name}</span>
          </span>
          <span>⭐ {review.rating}/5</span>
        </div>
      </div>
    </Link>
  );
};

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchReviews()
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reviews:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="flex justify-center items-center py-40 bg-black">
        <Spinner />
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-red-500 text-center py-40 bg-black">
        Whoops! Couldn’t load reviews. Please try again later.
      </section>
    );
  }

  return (
    <section id="reviews" className="text-white bg-black py-20 px-4">
      <h2 className="text-yellow-400 font-bebas text-4xl mb-12 text-center tracking-wide">
        Music Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map(r => (
          <ReviewCard key={r.review_id} review={r} />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
