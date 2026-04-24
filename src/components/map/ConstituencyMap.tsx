'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ConstituencyMap.module.css';

const INDIA_CENTER = { lat: 22.5, lng: 82.0 };
const INITIAL_ZOOM = 5;

interface StateInfo {
  name: string;
  seats: number;
  phases: string;
}

const STATE_DATA: Record<string, StateInfo> = {
  'Uttar Pradesh': { name: 'Uttar Pradesh', seats: 80, phases: '1-7' },
  'Maharashtra': { name: 'Maharashtra', seats: 48, phases: '1-5' },
  'West Bengal': { name: 'West Bengal', seats: 42, phases: '1-7' },
  'Bihar': { name: 'Bihar', seats: 40, phases: '1-5' },
  'Tamil Nadu': { name: 'Tamil Nadu', seats: 39, phases: '1' },
  'Madhya Pradesh': { name: 'Madhya Pradesh', seats: 29, phases: '1-4' },
  'Karnataka': { name: 'Karnataka', seats: 28, phases: '1-3' },
  'Gujarat': { name: 'Gujarat', seats: 26, phases: '1-3' },
  'Rajasthan': { name: 'Rajasthan', seats: 25, phases: '1-2' },
  'Andhra Pradesh': { name: 'Andhra Pradesh', seats: 25, phases: '4' },
  'Odisha': { name: 'Odisha', seats: 21, phases: '1-4' },
  'Kerala': { name: 'Kerala', seats: 20, phases: '2' },
  'Telangana': { name: 'Telangana', seats: 17, phases: '4' },
  'Assam': { name: 'Assam', seats: 14, phases: '1-3' },
  'Jharkhand': { name: 'Jharkhand', seats: 14, phases: '1-5' },
  'Punjab': { name: 'Punjab', seats: 13, phases: '7' },
  'Delhi': { name: 'Delhi', seats: 7, phases: '6' },
};

export function ConstituencyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError('Google Maps API key not configured.');
      return;
    }

    async function initMap() {
      try {
        const { Loader } = await import('@googlemaps/js-api-loader');
        const loader = new Loader({ apiKey: apiKey!, version: 'weekly' });
        const google = await loader.load();

        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: INDIA_CENTER,
          zoom: INITIAL_ZOOM,
          styles: [
            { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c2410c' }] },
            { featureType: 'water', stylers: [{ color: '#dbeafe' }] },
            { featureType: 'landscape', stylers: [{ color: '#f8fafc' }] },
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        // Add markers for major states
        Object.values(STATE_DATA).forEach((state) => {
          const coords = getApproxCoords(state.name);
          if (!coords) return;

          const marker = new google.maps.Marker({
            position: coords,
            map,
            title: `${state.name} — ${state.seats} seats`,
            label: { text: String(state.seats), color: '#fff', fontSize: '10px', fontWeight: '700' },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#f97316',
              fillOpacity: 0.9,
              strokeColor: '#c2410c',
              strokeWeight: 2,
              scale: Math.max(12, state.seats / 3),
            },
          });

          marker.addListener('click', () => setSelectedState(state));
        });

        setIsLoaded(true);
      } catch (err) {
        console.error('Map error:', err);
        setError('Failed to load Google Maps.');
      }
    }

    initMap();
  }, []);

  // Fallback: state list view
  if (error) {
    return (
      <div className={styles.fallback}>
        <h3 className={styles.fallbackTitle}>📍 Constituency Data by State</h3>
        <p className={styles.fallbackNote}>{error} Showing data in list view.</p>
        <div className={styles.stateGrid}>
          {Object.values(STATE_DATA).map((state) => (
            <div key={state.name} className={`card ${styles.stateCard}`}>
              <h4>{state.name}</h4>
              <div className={styles.stateMeta}>
                <span className="badge badge-primary">{state.seats} seats</span>
                <span className="badge badge-info">Phase {state.phases}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map} role="application" aria-label="Constituency map of India" />
      {!isLoaded && (
        <div className={styles.loading}>
          <div className="animate-spin" style={{ fontSize: '2rem' }}>🗺️</div>
          <p>Loading map...</p>
        </div>
      )}
      {selectedState && (
        <div className={styles.infoPanel} role="dialog" aria-label={`${selectedState.name} info`}>
          <button className={styles.closeInfo} onClick={() => setSelectedState(null)} aria-label="Close">✕</button>
          <h3>{selectedState.name}</h3>
          <div className={styles.infoStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{selectedState.seats}</span>
              <span className={styles.statLabel}>Lok Sabha Seats</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{selectedState.phases}</span>
              <span className={styles.statLabel}>Polling Phase(s)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getApproxCoords(name: string): { lat: number; lng: number } | null {
  const coords: Record<string, { lat: number; lng: number }> = {
    'Uttar Pradesh': { lat: 26.8, lng: 80.9 },
    'Maharashtra': { lat: 19.7, lng: 75.7 },
    'West Bengal': { lat: 22.9, lng: 87.8 },
    'Bihar': { lat: 25.6, lng: 85.1 },
    'Tamil Nadu': { lat: 11.1, lng: 78.6 },
    'Madhya Pradesh': { lat: 23.5, lng: 78.5 },
    'Karnataka': { lat: 15.3, lng: 75.7 },
    'Gujarat': { lat: 22.2, lng: 71.2 },
    'Rajasthan': { lat: 27.0, lng: 74.2 },
    'Andhra Pradesh': { lat: 15.9, lng: 79.7 },
    'Odisha': { lat: 20.9, lng: 84.0 },
    'Kerala': { lat: 10.8, lng: 76.3 },
    'Telangana': { lat: 18.1, lng: 79.0 },
    'Assam': { lat: 26.2, lng: 92.9 },
    'Jharkhand': { lat: 23.6, lng: 85.3 },
    'Punjab': { lat: 31.1, lng: 75.3 },
    'Delhi': { lat: 28.7, lng: 77.1 },
  };
  return coords[name] || null;
}
