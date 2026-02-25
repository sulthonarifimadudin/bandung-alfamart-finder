import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowLeft } from "lucide-react";
import alfamartData from "@/data/alfamart.json";
import MapComponent from "@/components/MapComponent";

interface AlfamartLocation {
  id: number;
  nama: string;
  alamat: string;
  lat: number;
  lng: number;
}

const MapPage = () => {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<AlfamartLocation | null>(null);
  const [locations] = useState<AlfamartLocation[]>(alfamartData);
  const navigate = useNavigate();

  const filteredLocations = useMemo(() => {
    if (!query.trim()) return locations;
    const q = query.toLowerCase();
    return locations.filter(
      (loc) =>
        loc.nama.toLowerCase().includes(q) ||
        loc.alamat.toLowerCase().includes(q)
    );
  }, [query, locations]);

  return (
    <div className="map-page">
      {/* Sidebar */}
      <aside className="map-sidebar">
        <div className="map-sidebar-header">
          <div className="sidebar-top-row">
            <div className="sidebar-logo">
              <div className="sidebar-logo-icon">
                <MapPin size={16} />
              </div>
              <span className="sidebar-logo-text">AlfaMap</span>
            </div>
            <button className="sidebar-back" onClick={() => navigate("/")} title="Kembali ke Home">
              <ArrowLeft size={18} />
            </button>
          </div>
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Cari lokasi Alfamart..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="location-list">
          {filteredLocations.length === 0 ? (
            <p className="no-results">Tidak ada lokasi ditemukan.</p>
          ) : (
            filteredLocations.map((loc) => (
              <button
                key={loc.id}
                className={`location-item ${selectedLocation?.id === loc.id ? "location-item-active" : ""}`}
                onClick={() => setSelectedLocation(loc)}
              >
                <div className="item-marker">
                  <MapPin size={18} />
                </div>
                <div className="item-info">
                  <span className="item-name">{loc.nama}</span>
                  <span className="item-address">{loc.alamat}</span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <span className="sidebar-footer-text">{filteredLocations.length} lokasi</span>
          <span className="sidebar-footer-badge">OpenStreetMap</span>
        </div>
      </aside>

      {/* Map */}
      <div className="map-wrapper">
        <MapComponent
          locations={filteredLocations}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
};

export default MapPage;
