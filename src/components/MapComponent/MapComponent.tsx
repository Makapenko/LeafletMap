import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MapContainer } from "react-leaflet";
import { Spin } from 'antd';
import styles from './MapComponent.module.scss';
import { boundsSelector, isLoadingSelector, mapErrorSelector } from "../../store/reducers/mapSlice";
import MapContent from "../MapContent/MapContent";

export const MapComponent: FC = () => {
  const bounds = useSelector(boundsSelector);
  const isLoading = useSelector(isLoadingSelector);
  const mapError = useSelector(mapErrorSelector);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (mapError) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }, [mapError]);

  return (
    <div className={styles.container}>
      <MapContainer bounds={bounds} className={styles.mapContainer}>
        {isLoading ? <Spin size="large" className={styles.spin} /> : null}
        <MapContent />
      </MapContainer>
      {showError && <div className={styles.error}>{mapError}</div>}
    </div>
  );
};
