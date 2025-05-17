import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.tsx';
import Landing from './pages/Landing.tsx';
import ReviewsPage from './pages/ReviewsPage.tsx';
import FeaturedArtists from './components/FeaturedArtists.tsx';
import AdminArtistManager from './components/AdminArtistManager.tsx';
import LoginForm from './components/LoginForm.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import ReviewDetail from './pages/ReviewDetail.tsx'; 

// import ArtistsPage from './pages/ArtistsPage';
// import VideosPage from './pages/VideosPage';
// import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/reviews/:id" element={<ReviewDetail />} />
        <Route path="/artists" element={<FeaturedArtists />} />

        <Route
          path="/login"
          element={<LoginForm onLogin={() => window.location.href = '/admin'} />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <div className="bg-black min-h-screen text-white py-10 px-4">
                <h2 className="text-yellow-400 font-bebas text-3xl text-center mb-8">Admin Dashboard</h2>
                <AdminArtistManager />
              </div>
            </ProtectedRoute>
          }
        />

        {/* 
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
