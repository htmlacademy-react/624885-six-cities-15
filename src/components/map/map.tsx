import 'leaflet/dist/leaflet.css';

import leaflet, { LayerGroup } from 'leaflet';
import { useEffect, useRef } from 'react';

import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import useMap from '../../hooks/use-map';
import { CityType, MapOffer } from '../../types/offers';

type MapProps = {
  city: CityType;
  offers: MapOffer[];
  selectedOffer: string | undefined;
  page: string;
};

const defaultCustomIcon = new leaflet.Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new leaflet.Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

export default function Map({ city, offers, selectedOffer, page }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(city, mapRef);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [city, map]);

  useEffect(() => {
    markerLayer.current.clearLayers();
    if (map) {
      offers.forEach((offer): void => {
        leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude
          }
        )
          .setIcon(offer.id === selectedOffer ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer.current);
      });
    }
  }, [selectedOffer, map, offers]);

  return <section className={`${page}__map map`} ref={mapRef}></section>;
}
