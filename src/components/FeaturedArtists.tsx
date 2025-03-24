import React, { useEffect, useState } from 'react';
import { fetchArtists } from '../api/artists.ts';
import { isAuthenticated } from '../utils/auth.ts';
import { useLocation } from 'react-router-dom';
import EditArtistForm from './EditArtistForm.tsx';

const FeaturedArtists = () => {
  const [artists, setArtists] = useState([]);
  const [editingArtist, setEditingArtist] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchArtists()
      .then(setArtists)
      .catch(console.error);
  }, [triggerRefresh]);

  const showEditButton = isAuthenticated() && location.pathname === '/admin';

  return (
    <section id="artists" className="bg-black text-white py-20 px-4">
      <h2 className="text-yellow-400 font-bebas text-3xl text-center mb-10">Featured Artists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {artists.map((artist: any) => (
          <div
            key={artist.artist_id}
            className="bg-gray-900 rounded-lg shadow-md overflow-hidden p-4 border border-yellow-800"
          >
            <img
              src={artist.profile_picture || '/placeholder.jpg'}
              alt={artist.name}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h3 className="text-xl text-yellow-300 font-bebas">{artist.name}</h3>
            <p className="text-sm text-gray-400 mb-2">{artist.genre}</p>
            <div className="flex space-x-3 mt-2">
              {artist.spotify_link && (
                <a
                  href={artist.spotify_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-400 hover:text-green-200"
                >
                  Spotify
                </a>
              )}
              {artist.youtube_channel && (
                <a
                  href={artist.youtube_channel}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-400 hover:text-red-200"
                >
                  YouTube
                </a>
              )}
              {artist.instagram_link && (
                <a
                  href={artist.instagram_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-400 hover:text-pink-200"
                >
                  Instagram
                </a>
              )}
            </div>

            {showEditButton && (
              <button
                onClick={() => setEditingArtist(artist)}
                className="mt-4 text-yellow-400 hover:text-yellow-200 text-sm"
              >
                ✏️ Edit
              </button>
            )}
          </div>
        ))}
      </div>

      {editingArtist && (
        <EditArtistForm
          artist={editingArtist}
          onClose={() => setEditingArtist(null)}
          onUpdate={() => {
            setEditingArtist(null);
            setTriggerRefresh(!triggerRefresh);
          }}
        />
      )}
    </section>
  );
};

export default FeaturedArtists;
