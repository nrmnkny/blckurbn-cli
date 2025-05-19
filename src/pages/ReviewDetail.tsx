// src/pages/ReviewDetail.tsx
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
  spotify_url?: string;
  youtube_url?: string;
  cover_art_url?: string;
  views?: number;
}

interface Comment {
  comment_id: number;
  user_id:    number;
  username:   string;
  body:       string;
  created_at: string;
}

const ReviewDetail: React.FC = () => {
  const { id } = useParams<'id'>();
  const [review, setReview]     = useState<Review | null>(null);
  const [coverUrl, setCoverUrl] = useState('/fallback-cover.png');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);

  // Comments state
  const [comments, setComments]     = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  // Load review
  useEffect(() => {
    if (!id) return;
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/reviews/${id}`)
      .then(async res => {
        const data: any = res.data;
        setReview(data);

        // Determine cover art
        if (data.cover_art_url) {
          setCoverUrl(data.cover_art_url);
        } else if (data.spotify_url) {
          const oembed = await fetch(
            `https://open.spotify.com/oembed?url=${encodeURIComponent(data.spotify_url)}`
          ).then(r => r.json()).catch(() => null);
          setCoverUrl(oembed?.thumbnail_url || '/fallback-cover.png');
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  // Load comments
  useEffect(() => {
    if (!id) return;
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/reviews/${id}/comments`)
      .then(res => setComments(res.data))
      .catch(err => console.error('Error loading comments:', err));
  }, [id]);

  // Post comment
  const postComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/reviews/${id}/comments`,
        { body: newComment }
      );
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment');
    }
  };

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

      {/* Review Card */}
      <div className="max-w-3xl mx-auto bg-[#0f172a] rounded-2xl shadow-xl overflow-hidden mb-12">
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

          <div className="flex justify-between items-center text-gray-400 text-sm border-t border-yellow-700 pt-4 mb-6">
            <span>
              Reviewed by{' '}
              <span className="text-yellow-300">{review.reviewer_name}</span>
            </span>
            <span>⭐ {review.rating}/5</span>
            {typeof review.views === 'number' && <span>👁 {review.views}</span>}
          </div>

          {review.spotify_url && (
            <a
              href={review.spotify_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition"
            >
              ▶ Listen on Spotify
            </a>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Comments</h3>

        {/* Comment form */}
        {localStorage.getItem('token') ? (
          <div className="mb-8 space-y-2">
            <textarea
              rows={3}
              className="w-full p-4 bg-[#1e293b] text-white rounded-lg"
              placeholder="Add your comment…"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button
              onClick={postComment}
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-yellow-400 text-black rounded-lg disabled:opacity-50"
            >
              Post Comment
            </button>
          </div>
        ) : (
          <p className="italic text-gray-400 mb-6">
            <Link to="/login" className="text-yellow-400 hover:underline">Log in</Link> to leave a comment.
          </p>
        )}

        {/* Comments list */}
        <ul className="space-y-6">
          {comments.map(c => (
            <li key={c.comment_id} className="bg-[#1e293b] p-6 rounded-2xl border border-yellow-500">
              <p className="italic text-sm text-gray-400 mb-2">
                {c.username} • {new Date(c.created_at).toLocaleString()}
              </p>
              <p className="text-gray-200">{c.body}</p>
            </li>
          ))}
          {comments.length === 0 && (
            <p className="text-gray-400 italic">No comments yet — be the first!</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default ReviewDetail;