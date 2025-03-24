import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditArtistForm from './EditArtistForm.tsx';
import AddArtistForm from './AddArtistForm.tsx';
import { fetchArtists } from '../api/artists.ts';
import { isAuthenticated } from '../utils/auth.ts';

const AdminArtistManager = () => {
  const [artists, setArtists] = useState([]);
  const [editingArtist, setEditingArtist] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  useEffect(() => {
    fetchArtists()
      .then(setArtists)
      .catch(console.error);
  }, [triggerRefresh]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this artist?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/artists/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTriggerRefresh(!triggerRefresh);
    } catch (err) {
      console.error(err);
      alert('Delete failed.');
    }
  };

  return (
    <section className="bg-black text-white py-12 px-4 min-h-screen">
      {/* Submit Form */}
      <div className="max-w-4xl mx-auto mb-12 bg-gray-900 p-6 rounded-lg border border-yellow-800 shadow-md">
        <AddArtistForm />
      </div>

      {/* Dashboard Title */}
      <h2 className="text-yellow-400 font-bebas text-3xl text-center mb-10 border-b border-yellow-700 pb-2">
        Admin Artist Dashboard
      </h2>

      {/* Artist Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {artists.map((artist: any) => (
          <div
            key={artist.artist_id}
            className="bg-gray-900 rounded-lg shadow-lg overflow-hidden p-4 border border-yellow-800 flex flex-col justify-between"
          >
            <img
              src={artist.profile_picture || '/placeholder.jpg'}
              alt={artist.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h4 className="text-yellow-200 text-xl font-bebas">{artist.name}</h4>
            <p className="text-sm text-gray-400 mb-4">{artist.genre}</p>
            <div className="flex justify-between mt-auto">
              <button
                onClick={() => setEditingArtist(artist)}
                className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 text-sm"
              >
                <span>✏️</span> <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(artist.artist_id)}
                className="flex items-center space-x-1 text-red-500 hover:text-red-300 text-sm"
              >
                <span>🗑</span> <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit */}
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

export default AdminArtistManager;
