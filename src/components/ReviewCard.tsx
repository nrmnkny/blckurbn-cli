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
  const [coverUrl, setCoverUrl] = useState<string>('');

  useEffect(() => {
    // ✅ Prefer Cloudinary coverArtUrl first
    if (review.coverArtUrl && review.coverArtUrl.startsWith('http')) {
      setCoverUrl(review.coverArtUrl);
    }
    // ✅ Fallback to Spotify thumbnail if coverArtUrl is missing
    else if (review.listenUrl?.includes('open.spotify.com')) {
      fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(review.listenUrl)}`)
        .then(res => res.json())
        .then(data => {
          if (data.thumbnail_url) {
            setCoverUrl(data.thumbnail_url);
          } else {
            setCoverUrl('/fallback-cover.png');
          }
        })
        .catch(() => setCoverUrl('/fallback-cover.png'));
    }
    // ✅ Final fallback
    else {
      setCoverUrl('/fallback-cover.png');
    }
  }, [review.coverArtUrl, review.listenUrl]);

  return (
    <Link to={`/reviews/${review.review_id}`}>
      <div className="h-full flex flex-col bg-[#0f172a] rounded-xl border border-yellow-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

        <div className="flex items-start p-5 pb-0">
          <img
            src={coverUrl}
            alt={`${review.track_title} cover`}
            className="w-20 h-20 object-cover rounded-xl mr-4"
            loading="lazy"
          />

          <div className="flex-1">
            <h3 className="text-2xl text-yellow-400 font-bebas tracking-wide leading-tight">
              {review.track_title}
            </h3>
            <p className="text-sm text-yellow-300">{review.artist_name}</p>
          </div>

          {typeof review.views === 'number' && (
            <div className="text-yellow-300 text-sm ml-2 flex items-center">
              👁 {review.views}
            </div>
          )}
        </div>

        <div className="px-5 pt-3 pb-5 flex-1 flex flex-col justify-between">
          <div className="text-gray-200 text-sm italic mb-4 leading-relaxed">
            "{review.review_text.slice(0, 160)}…"
          </div>

          <div className="flex justify-between text-xs text-gray-400 border-t border-yellow-700 pt-3">
            <span>
              Reviewed by{' '}
              <span className="text-yellow-300">{review.reviewer_name}</span>
            </span>
            <span>⭐ {review.rating}/5</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
