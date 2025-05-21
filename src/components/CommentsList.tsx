import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Comment {
  comment_id: number;
  body: string;
  user_id: number;
  username: string;
  created_at: string;
}

export default function CommentsList({ reviewId }: { reviewId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/reviews/${reviewId}/comments`)
      .then(res => setComments(res.data))
      .catch(err => console.error('Comments fetch error', err));
  }, [reviewId]);

  if (!comments.length) {
    return <p className="text-sm text-gray-500">No comments yet.</p>;
  }

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      {comments.map(c => (
        <div key={c.comment_id} className="p-3 border rounded">
          <p className="text-sm">
            <strong>{c.username}</strong>{' '}
            <em>{new Date(c.created_at).toLocaleString()}</em>
          </p>
          <p className="mt-1">{c.body}</p>
        </div>
      ))}
    </div>
  );
}
