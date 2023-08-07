import { FC } from "react";
import { useSelector } from "react-redux";
import { MapContainer } from "react-leaflet";
import { Spin } from 'antd';
import styles from './MapComponent.module.scss';
import { boundsSelector, isLoadingSelector } from "../../store/reducers/mapSlice";
import MapContent from "../MapContent/MapContent";

export const MapComponent: FC = () => {
  const bounds = useSelector(boundsSelector);
  const isLoading = useSelector(isLoadingSelector);
  isLoadingSelector

  return (
    <div className={styles.container}>
      <MapContainer bounds={bounds} className={styles.mapContainer}>
        {isLoading ? <Spin size="large" className={styles.spin} /> : null}
        <MapContent />
      </MapContainer>
    </div>
  );
};
