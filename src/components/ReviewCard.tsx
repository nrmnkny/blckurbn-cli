import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface Review {
  review_id: number;
  artist_name: string;
  track_title: string;
  review_text: string;
  rating: number;
  reviewer_name: string;
  listenUrl?: string;
  coverArtUrl?: string;
  views?: number;
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const [coverUrl, setCoverUrl] = useState<string>(review.coverArtUrl || '');
  useEffect(() => {
    if (review.listenUrl?.includes('open.spotify.com')) {
      fetch(
        `https://open.spotify.com/oembed?url=${encodeURIComponent(
          review.listenUrl
        )}`
      )
        .then(r => r.json())
        .then(data => setCoverUrl(data.thumbnail_url))
        .catch(() => setCoverUrl('/fallback-cover.png'));
    } else if (!coverUrl) {
      setCoverUrl('/fallback-cover.png');
    }
  }, [review.listenUrl, coverUrl]);

  return (
    <Link to={`/reviews/${review.review_id}`}>
      <div className="h-full flex flex-col bg-gray-900 border border-yellow-700 rounded-2xl p-6 hover:border-yellow-500 transition-shadow shadow-md">
        <img
          src={coverUrl}
          alt={`${review.track_title} cover`}
          className="w-full h-40 object-cover rounded-lg mb-4 flex-shrink-0"
          loading="lazy"
        />

        <h3 className="text-xl font-bold text-yellow-400 mb-1">
          {review.track_title}
        </h3>
        <p className="text-sm text-yellow-300 mb-3">{review.artist_name}</p>

        <p className="flex-1 text-gray-300 italic text-sm leading-relaxed mb-4">
          "{review.review_text.slice(0, 120)}…"
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>⭐ {review.rating}/5</span>
          <span>👁 {review.views ?? 0}</span>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
