import React, { useEffect, useState } from 'react';
import { fetchReviews } from '../api/reviews.ts';

type Review = {
  review_id: number;
  artist_name: string;
  track_title: string;
  review_text: string;
  rating: number;
  reviewer_name: string;
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews()
      .then(data => setReviews(data))
      .catch(err => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <section id="reviews" className="text-white bg-black py-20 px-4">
      <h2 className="text-yellow-400 font-bebas text-4xl mb-10 text-center tracking-wide">
        Music Reviews
      </h2>

      <div className="space-y-8 max-w-4xl mx-auto">
        {reviews.map((rev) => (
          <div
            key={rev.review_id}
            className="border border-yellow-700 p-6 rounded-md bg-gray-900 shadow-md transition duration-300 hover:bg-gray-800"
          >
            <h3 className="text-2xl text-yellow-300 font-bebas mb-2">
              {rev.track_title} <span className="text-yellow-100">—</span> {rev.artist_name}
            </h3>

            <p className="text-sm text-gray-300 italic leading-relaxed">
              "{rev.review_text}"
            </p>

            <p className="text-xs text-gray-400 mt-4">
              Reviewed by: <span className="text-yellow-200">{rev.reviewer_name}</span> — ⭐ {rev.rating}/5
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
