import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface Review {
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

const fetchReviewById = async (id: number): Promise<Review> => {
  const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/reviews/${id}`);
  const data = res.data;

  // Convert snake_case to camelCase
  return {
    ...data,
    coverArtUrl: data.cover_art_url,
  };
};

const fetchSpotifyCover = async (url: string): Promise<string> => {
  const oembed = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`)
    .then(res => res.json())
    .catch(() => null);
  return oembed?.thumbnail_url || '/fallback-cover.png';
};

const ReviewDetail: React.FC = () => {
  const { id } = useParams<'id'>();
  const [review, setReview] = useState<Review | null>(null);
  const [coverUrl, setCoverUrl] = useState<string>('/fallback-cover.png');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchReviewById(+id)
      .then(async (r) => {
        setReview(r);

        if (r.coverArtUrl && r.coverArtUrl.startsWith('http')) {
          setCoverUrl(r.coverArtUrl);
        } else if (r.listenUrl?.includes('open.spotify.com')) {
          const spotifyCover = await fetchSpotifyCover(r.listenUrl);
          setCoverUrl(spotifyCover);
        } else {
          setCoverUrl('/fallback-cover.png');
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="text-red-500 text-center py-40 bg-black">
        Oops—couldn't load that review. Try again later.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-4 py-10">
      <Link to="/reviews" className="inline-block mb-6 text-yellow-400 hover:underline">
        ← Back to Reviews
      </Link>

      <div className="max-w-3xl mx-auto bg-[#0f172a] rounded-2xl shadow-xl overflow-hidden">
        <img
          src={coverUrl}
          alt={`${review.track_title} cover`}
          className="w-full h-64 object-cover rounded-t-2xl"
          loading="lazy"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bebas text-yellow-400 mb-1">
            {review.track_title}
          </h1>
          <h2 className="text-xl text-yellow-200 mb-6">{review.artist_name}</h2>

          <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-line italic mb-8">
            {review.review_text}
          </p>

          <div className="flex flex-wrap justify-between items-center text-gray-400 text-sm border-t border-yellow-700 pt-4 mb-6">
            <span>
              Reviewed by{' '}
              <span className="text-yellow-300">{review.reviewer_name}</span>
            </span>
            <span>⭐ {review.rating}/5</span>
            {typeof review.views === 'number' && (
              <span>👁 {review.views}</span>
            )}
          </div>

          {review.listenUrl && (
            <a
              href={review.listenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition"
            >
              ▶ Listen on Spotify
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewDetail;
