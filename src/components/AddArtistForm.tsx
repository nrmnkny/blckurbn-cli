// 📁 src/components/AddArtistForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AddArtistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    profile_picture: '',
    spotify_link: '',
    youtube_channel: '',
    instagram_link: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/artists`, formData);
      alert('Artist added!');
      setFormData({
        name: '',
        genre: '',
        profile_picture: '',
        spotify_link: '',
        youtube_channel: '',
        instagram_link: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add artist.');
    }
  };

  return (
    <section className="min-h-screen bg-black text-white py-16 px-4 flex justify-center items-start">
      <div className="w-full max-w-xl bg-gray-900 rounded-2xl p-8 shadow-lg border border-yellow-600">
        <h2 className="text-3xl font-bebas text-yellow-400 mb-8 text-center tracking-wide">
          Add New Artist
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['name', 'genre', 'profile_picture', 'spotify_link', 'youtube_channel', 'instagram_link'].map((field) => (
            <div key={field}>
              <label className="block text-sm text-yellow-300 mb-1 capitalize">
                {field.replace('_', ' ')}
              </label>
              <input
                name={field}
                type="text"
                value={(formData as any)[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder={`Enter ${field.replace('_', ' ')}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded-md transition"
          >
            Submit Artist
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddArtistForm;
