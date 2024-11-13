import axios from "axios";

const BASE_URL = 'https://youtube138.p.rapidapi.com';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const options = {
  params: {
    hl: 'en',
    gl: 'US',
    maxResults: 50
  },
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'youtube138.p.rapidapi.com'
  }
};

export const fetchDataFromApi = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};

