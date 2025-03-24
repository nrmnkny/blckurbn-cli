// src/pages/AdminDashboard.tsx
import React from 'react';
import AdminArtistManager from '../components/AdminArtistManager.tsx';
import AdminReviewManager from '../components/AdminReviewManager.tsx';

const AdminDashboard = () => {
  return (
    <div className="bg-black text-white min-h-screen py-10 px-4">
      <h1 className="text-yellow-400 text-3xl font-bebas text-center mb-10">ADMIN DASHBOARD</h1>

      <section className="mb-16">
        <h2 className="text-yellow-300 text-2xl font-bebas mb-4">🎤 Artist Management</h2>
        <AdminArtistManager />
      </section>

      <section>
        <h2 className="text-yellow-300 text-2xl font-bebas mb-4">📝 Review Management</h2>
        <AdminReviewManager />
      </section>
    </div>
  );
};

export default AdminDashboard;
