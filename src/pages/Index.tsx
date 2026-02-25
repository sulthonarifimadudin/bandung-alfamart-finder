import { useState, useEffect, useMemo } from "react";
import alfamartData from "@/data/alfamart.json";
import SearchBar from "@/components/SearchBar";
import MapComponent from "@/components/MapComponent";

interface AlfamartLocation {
  id: number;
  nama: string;
  alamat: string;
  lat: number;
  lng: number;
}

const Index = () => {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<AlfamartLocation | null>(null);
  const [locations] = useState<AlfamartLocation[]>(alfamartData);

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
    <div className="app-layout">
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        results={filteredLocations}
        onSelect={setSelectedLocation}
      />
      <div className="map-wrapper">
        <MapComponent
          locations={filteredLocations}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
};

export default Index;
