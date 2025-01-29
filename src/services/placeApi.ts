import {Geometry} from '../redux/features/places/placesSlice';

const API_KEY = 'YOUR_API_KEY_HERE';

export interface Place {
  id: string;
  title: string;
  description?: string;
  geometry?: Geometry;
}

export const getAutocompleteResults = async (
  query: string,
): Promise<Place[]> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error(`Error fetching places: ${response.statusText}`);
  }
  const data = await response.json();
  return data.predictions.map((place: any) => ({
    id: place.place_id,
    title: place.structured_formatting.main_text,
    description: place?.structured_formatting?.secondary_text,
  }));
};

export const getPlaceDetailsResults = async (
  placeId: string,
): Promise<Geometry> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error(`Error fetching places: ${response.statusText}`);
  }
  const data = await response.json();
  const geometry = data.result.geometry;
  if (geometry) {
    return geometry;
  } else {
    throw new Error('Coordinates not available');
  }
};
