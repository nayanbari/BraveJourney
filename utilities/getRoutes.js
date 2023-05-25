import axios from 'axios';
import { GOOGLE_MAPS_KEY } from '@env'

const getRoutesFromGoogleMaps = async (origin, destination) => {
  const apiKey = GOOGLE_MAPS_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}&alternatives=true`;

  try {
    const response = await axios.get(apiUrl);
    const routes = response.data.routes;
    return routes;
  } catch (error) {
    console.error('Error retrieving routes from Google Maps API:', error);
    return [];
  }
};

export default getRoutesFromGoogleMaps;