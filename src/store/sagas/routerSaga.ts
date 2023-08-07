import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  setPolyline,
  setLoading,
  setError,
  setBounds,
} from '../reducers/mapSlice';
import { setSelectedRoute } from '../reducers/routerSlice';
import routesApi from '../../api/api';
import IRoute from '../../models/IRoute';

type RouteCode = {
  code: string;
  routes: {
    distance: number;
    duration: number;
    geometry: {
      coordinates: number[][];
      type: string;
    };
    legs: object[];
    weight: number;
    weight_name: string;
  }[];
  length: number;
  waypoints: object[];
};

function* fetchRoute(action: PayloadAction<IRoute>) {
  try {
    yield put(setLoading(true));
    const response: RouteCode = yield call(routesApi.getRoute, action.payload);

    const points = response.routes[0].geometry.coordinates.map((arr) => [
      arr[1],
      arr[0],
    ]);

    const bounds = points.reduce(
      (acc, [lng, lat]) => [
        [Math.min(acc[0][0], lng), Math.min(acc[0][1], lat)],
        [Math.max(acc[1][0], lng), Math.max(acc[1][1], lat)],
      ],
      [
        [Number.MAX_VALUE, Number.MAX_VALUE],
        [Number.MIN_VALUE, Number.MIN_VALUE],
      ]
    );

    yield all([
      put(setSelectedRoute(action.payload.name)),
      put(setBounds(bounds)),
      put(setLoading(false)),
      put(setPolyline(points)),
    ]);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setError(error.message));
    } else {
      yield put(setError(String(error)));
    }
    yield put(setLoading(false));
  }
}

export default function* mapSaga() {
  yield takeLatest(setPolyline, fetchRoute);
}
