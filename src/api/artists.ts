// src/api/artists.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const fetchArtists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/artists`);
    return response.data;
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }
};
