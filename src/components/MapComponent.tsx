import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface AlfamartLocation {
  id: number;
  nama: string;
  alamat: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations: AlfamartLocation[];
  selectedLocation: AlfamartLocation | null;
}

const BANDUNG_CENTER: L.LatLngExpression = [-6.9175, 107.6191];
const DEFAULT_ZOOM = 13;

const MapComponent = ({ locations, selectedLocation }: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView(BANDUNG_CENTER, DEFAULT_ZOOM);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    locations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div class="popup-content">
            <h3 class="popup-title">${loc.nama}</h3>
            <p class="popup-address">${loc.alamat}</p>
            <div class="popup-coords">
              <span>Lat: ${loc.lat}</span>
              <span>Lng: ${loc.lng}</span>
            </div>
          </div>`
        );
      markersRef.current.push(marker);
    });
  }, [locations]);

  // Fly to selected location
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedLocation) return;
    map.flyTo([selectedLocation.lat, selectedLocation.lng], 16, { duration: 1.2 });

    // Open the popup for the selected marker
    markersRef.current.forEach((marker) => {
      const latlng = marker.getLatLng();
      if (latlng.lat === selectedLocation.lat && latlng.lng === selectedLocation.lng) {
        marker.openPopup();
      }
    });
  }, [selectedLocation]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;
