import { Libraries, LoadScript } from "@react-google-maps/api";

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY as string;
const libraries = ["places"];

const GoogleMapsLoader = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoadScript
      googleMapsApiKey={MAPS_API_KEY}
      libraries={libraries as Libraries}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsLoader;
