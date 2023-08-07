import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { TileLayer, Polyline } from "react-leaflet";
import { useMap } from 'react-leaflet';
import { boundsSelector, polylineSelector } from "../../store/reducers/mapSlice";

const MapContent: FC = () => {
  const bounds = useSelector(boundsSelector);
  const points = useSelector(polylineSelector);
  const map = useMap();

  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  useEffect(() => {
    if (map && bounds) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);

  return (
    <>
      <TileLayer
        attribution={attribution}
        url={url}
      />
      {points.length > 0
        && <Polyline pathOptions={{ color: '#1677FF' }} positions={points} />}
    </>
  );
};

export default MapContent;
