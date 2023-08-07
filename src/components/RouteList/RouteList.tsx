import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './RouteList.module.scss';
import { routerSelector, selectedRouteSelector } from '../../store/reducers/routerSlice';
import { setPolyline } from '../../store/reducers/mapSlice';
import IRoute from '../../models/IRoute';

export const RouteList: React.FC = () => {
  const routes = useSelector(routerSelector);
  const selectedRoute = useSelector(selectedRouteSelector);

  const dispatch = useDispatch();

  const handleButtonClick = (route: IRoute) => {
    dispatch(setPolyline(route));
  };

  return (
    <div className={styles.container}>
        {routes.map((route) => (
          <Button className={styles.btn}
          key={route.name}
          type={selectedRoute === route.name ? "primary" : "default"}
          block
          onClick={selectedRoute === route.name ? undefined : () => handleButtonClick(route)}
        >
          {route.name}
        </Button>
        ))}
    </div>
  );
};
