export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface Term {
  offset: number;
  value: string;
}

export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text?: string; // Optional because not all predictions have a secondary text
}

export interface Prediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}

// https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJOwE7_GTtwokRFq0uOwLSE9g&key=KEY_GOES_HERE" dont need to use this
// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=whitesands&key=AIzaSyBiP63-_7kIjIPqqAtamMmH0zEOv2ic2rM
// https://maps.googleapis.com/maps/api/place/details/json?place_id=PLACE_ID&key=YOUR_API_KEY
