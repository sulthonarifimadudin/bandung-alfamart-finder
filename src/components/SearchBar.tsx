import { Search, MapPin } from "lucide-react";

interface AlfamartLocation {
  id: number;
  nama: string;
  alamat: string;
  lat: number;
  lng: number;
}

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  results: AlfamartLocation[];
  onSelect: (loc: AlfamartLocation) => void;
}

const SearchBar = ({ query, onQueryChange, results, onSelect }: SearchBarProps) => {
  return (
    <div className="search-panel">
      <div className="search-header">
        <div className="search-logo">
          <MapPin className="logo-icon" />
          <h1 className="logo-text">Alfamart Bandung</h1>
        </div>
        <p className="search-subtitle">Pemetaan Lokasi Alfamart di Kota Bandung</p>
      </div>

      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Cari Alfamart..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="location-list">
        {results.length === 0 ? (
          <p className="no-results">Tidak ada hasil ditemukan.</p>
        ) : (
          results.map((loc) => (
            <button
              key={loc.id}
              className="location-item"
              onClick={() => onSelect(loc)}
            >
              <MapPin className="item-icon" />
              <div className="item-info">
                <span className="item-name">{loc.nama}</span>
                <span className="item-address">{loc.alamat}</span>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="search-footer">
        <span>{results.length} lokasi ditemukan</span>
      </div>
    </div>
  );
};

export default SearchBar;
