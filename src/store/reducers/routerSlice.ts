import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import routesData from '../../data/routes.json';
import IRoute from '../../models/IRoute';

interface RouterState {
  routes: IRoute[];
  selectedRoute: string;
  isLoading: boolean;
  error: string;
}

const initialState: RouterState = {
  routes: routesData.routes as IRoute[],
  selectedRoute: '',
  isLoading: false,
  error: '',
};

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload;
  }}
});

export default routerSlice.reducer;

// Actions
export const { setSelectedRoute } =  routerSlice.actions;

// Selectors
export const routerSelector = (state: RootState) => state.routerReducer.routes;
export const selectedRouteSelector = (state: RootState) => state.routerReducer.selectedRoute;
