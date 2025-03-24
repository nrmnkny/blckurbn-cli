import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Artist {
  artist_id: number;
  name: string;
  genre: string;
  profile_picture: string;
  spotify_link: string;
  youtube_channel: string;
  instagram_link: string;
}

interface EditArtistFormProps {
  artist: Artist | null;
  onClose: () => void;
  onUpdate: () => void;
}

const EditArtistForm: React.FC<EditArtistFormProps> = ({ artist, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Artist | null>(null);

  useEffect(() => {
    if (artist) {
      setFormData({ ...artist });
    }
  }, [artist]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData(prev => ({
      ...prev!,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return; // safety first
    if (!formData.artist_id) {
      alert("Artist ID is missing.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/artists/${formData.artist_id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate();
    } catch (err) {
      console.error('Edit failed:', err);
      alert('Failed to update artist.');
    }
  };

  // Don't render until formData is ready
  if (!formData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-yellow-400 font-bebas text-xl mb-4">Edit Artist</h3>

        {Object.entries(formData).map(([key, value]) => (
          key !== 'artist_id' && (
            <div key={key} className="mb-3">
              <label className="block text-sm capitalize mb-1">{key.replace('_', ' ')}</label>
              <input
                name={key}
                type="text"
                value={value}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-yellow-500"
              />
            </div>
          )
        ))}

        <div className="flex justify-end space-x-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-sm px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-sm px-3 py-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArtistForm;
