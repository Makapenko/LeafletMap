import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { OsrmRouteResponse } from '../../models/OsrmRouteResponse';
import { RootState } from '../store';
import { LatLngExpression } from 'leaflet';

type Bounds = [[number, number], [number, number]];

type MapState = {
  bounds: Bounds;
  polyline: LatLngExpression[];
  isLoading: boolean;
  error: string | null;
};

const initialState: MapState = {
  bounds: [
    [60.0926, 29.7185],
    [59.7947, 30.6252] 
  ],
  polyline: [],
  isLoading: false,
  error: null,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setPolyline: (state, action) => {
      state.polyline = action.payload;
    },
    setBounds: (state, action) => {
      state.bounds = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default mapSlice.reducer;

// Actions
export const { setPolyline, setBounds, setLoading, setError } =
  mapSlice.actions;

//Selectors
export const polylineSelector = (state: RootState) => state.mapReducer.polyline;
export const boundsSelector = (state: RootState) => state.mapReducer.bounds;
export const isLoadingSelector = (state: RootState) => state.mapReducer.isLoading;
export const mapErrorSelector = (state: RootState) => state.mapReducer.error;
