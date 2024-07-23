import { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useGeolocated } from "react-geolocated";
import "./courtmap.styles.scss";
import { Court } from "../../models/mapModels";
import InputField from "../../assets/accentcomponents/InputField/InputField";

const courts: Court[] = [
  {
    id: "1",
    title: "Court 1",
    lat: 37.7749,
    lng: -122.4194,
    rating: 4.5,
    description: "Great court with lots of space.",
    image: "url-to-image-1",
  },
  {
    id: "2",
    title: "Court 2",
    lat: 37.7849,
    lng: -122.4094,
    rating: 4.0,
    description: "Nice court in a good location.",
    image: "url-to-image-2",
  },
];

export default function CourtMap() {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[] | null>(
    []
  );

  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (coords) {
      setCurrentLocation({ lat: coords.latitude, lng: coords.longitude });
    }
  }, [coords]);

  const findPlaces = (lat: number, lng: number) => {
    const map = new google.maps.Map(document.createElement("div"));
    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: new google.maps.LatLng(lat, lng),
      radius: 5000,
      types: ["stadium", "store"],
      keyword: "pickleball",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  };

  return (
    <div className="court-map">
      <div className="sidebar">
        <InputField
          type="text"
          label="Search location"
          value={""}
          onChange={() => {}}
        />
        <div className="court-list">
          {courts.map((court) => (
            <div key={court.id} className="court-item">
              <img src={court.image} alt={court.title} />
              <div>
                <h3>{court.title}</h3>
                <p>{court.description}</p>
                <p>Rating: {court.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={{ width: "100%" }}
        zoom={13}
        center={currentLocation}
        options={{ streetViewControl: false }}
        onLoad={() => {
          if (coords) {
            findPlaces(coords.latitude, coords.longitude);
          }
        }}
      >
        {places &&
          places.map((place, index) => {
            return place.geometry && place.geometry.location ? (
              <Marker
                key={index}
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }}
                onClick={() =>
                  setSelectedCourt({
                    id: place.place_id || index.toString(),
                    title: place.name || "Unknown",
                    lat: place.geometry?.location
                      ? place.geometry.location.lat()
                      : 0,
                    lng: place.geometry?.location
                      ? place.geometry.location.lng()
                      : 0,
                    rating: place.rating || 0,
                    description: place.vicinity || "",
                    image: place.icon || "https://via.placeholder.com/150",
                  } as Court)
                }
              />
            ) : null;
          })}

        {selectedCourt && (
          <InfoWindow
            position={{
              lat: selectedCourt.lat,
              lng: selectedCourt.lng,
            }}
            onCloseClick={() => setSelectedCourt(null)}
          >
            <div>
              <h3>{selectedCourt.title}</h3>
              <p>Rating: {selectedCourt.rating}</p>
              <img
                src={selectedCourt.image}
                alt={selectedCourt.title}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
